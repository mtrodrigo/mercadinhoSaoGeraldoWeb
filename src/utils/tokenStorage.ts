const STORAGE_KEY = "mercadinho.auth";

type StoredAuth = {
  accessToken: string;
  refreshToken?: string;
};

export function saveTokens(accessToken: string, refreshToken?: string) {
  const payload: StoredAuth = { accessToken, refreshToken };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearTokens() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getStoredTokens(): StoredAuth | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredAuth;
  } catch (error) {
    console.warn("Não foi possível ler os tokens armazenados", error);
    return null;
  }
}
