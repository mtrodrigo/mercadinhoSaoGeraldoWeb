import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export const AdminRoute = () => {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-green-600">
        Carregando dados do usuário...
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
