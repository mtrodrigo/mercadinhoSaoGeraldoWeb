import { Outlet } from "react-router";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 lg:min-h-[70vh] lg:flex-row">
      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
        <AdminSidebar />
      </div>
      <main className="flex-1 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-green-700">
              Olá, {user?.nome ?? "Administrador"}!
            </h1>
            <p className="text-sm text-gray-500">
              Gerencie o Mercadinho São Geraldo com facilidade e segurança.
            </p>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
