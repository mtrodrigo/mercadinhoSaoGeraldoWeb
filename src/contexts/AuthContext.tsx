import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
  Contact,
  LoginCredentials,
  RegisterPayload,
  UpdateContactPayload,
  UpdateProfilePayload,
  User,
} from "../types/api";
import {
  getContact as fetchContact,
  getProfile,
  login as loginRequest,
  register as registerRequest,
  updateContact as updateContactRequest,
  updateProfile as updateProfileRequest,
} from "../services/auth";
import {
  clearTokens,
  getStoredTokens,
  saveTokens,
} from "../utils/tokenStorage";

export type RegisterWithContactPayload = RegisterPayload & {
  contato?: UpdateContactPayload;
};

type AuthContextValue = {
  user: User | null;
  contact: Contact | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterWithContactPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  updateContact: (payload: UpdateContactPayload) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function safeLoadContact(): Promise<Contact | null> {
  try {
    const contact = await fetchContact();
    return contact;
  } catch (error) {
    console.warn("Não foi possível carregar o contato do usuário", error);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
      const contactData = await safeLoadContact();
      setContact(contactData);
    } catch (error) {
      console.error("Erro ao carregar perfil", error);
      clearTokens();
      setUser(null);
      setContact(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredTokens();
    if (stored?.accessToken) {
      loadProfile().catch((error) => {
        console.error("Erro ao inicializar autenticação", error);
        setInitializing(false);
      });
    } else {
      setInitializing(false);
    }
  }, [loadProfile]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setAuthLoading(true);
      try {
        const response = await loginRequest(credentials);
        saveTokens(response.accessToken, response.refreshToken);
        setUser(response.user);
        const contactData = await safeLoadContact();
        setContact(contactData);
        await queryClient.invalidateQueries();
      } finally {
        setAuthLoading(false);
      }
    },
    [queryClient]
  );

  const register = useCallback(
    async ({ contato, ...payload }: RegisterWithContactPayload) => {
      setAuthLoading(true);
      try {
        const response = await registerRequest(payload);

        if (response.accessToken) {
          saveTokens(response.accessToken, response.refreshToken);
          await loadProfile();
        } else {
          await login({ email: payload.email, password: payload.password });
        }

        if (contato) {
          const updatedContact = await updateContactRequest(contato);
          setContact(updatedContact);
        }
      } finally {
        setAuthLoading(false);
      }
    },
    [loadProfile, login]
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setContact(null);
    queryClient.clear();
  }, [queryClient]);

  const refreshProfile = useCallback(async () => {
    setAuthLoading(true);
    try {
      await loadProfile();
    } finally {
      setAuthLoading(false);
    }
  }, [loadProfile]);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    setAuthLoading(true);
    try {
      const updated = await updateProfileRequest(payload);
      setUser(updated);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const updateContact = useCallback(async (payload: UpdateContactPayload) => {
    setAuthLoading(true);
    try {
      const updated = await updateContactRequest(payload);
      setContact(updated);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      contact,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "Admin",
      isLoading: initializing || authLoading,
      login,
      register,
      logout,
      refreshProfile,
      updateProfile,
      updateContact,
    }),
    [
      authLoading,
      contact,
      initializing,
      login,
      logout,
      refreshProfile,
      register,
      updateContact,
      updateProfile,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
