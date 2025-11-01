import { NavLink } from "react-router";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCube,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const navItems = [
  {
    to: ".",
    label: "Visão Geral",
    icon: HiOutlineHomeModern,
    end: true,
  },
  {
    to: "produtos",
    label: "Produtos",
    icon: HiOutlineCube,
  },
  {
    to: "pedidos",
    label: "Pedidos",
    icon: HiOutlineClipboardDocumentList,
  },
  {
    to: "usuarios",
    label: "Usuários",
    icon: HiOutlineUserGroup,
  },
];

const activeClass =
  "bg-green-100 text-green-700 border-l-4 border-green-500 font-semibold";

export const AdminSidebar = () => {
  return (
    <aside className="w-full rounded-xl border border-green-100 bg-white lg:w-72 lg:border-r lg:border-green-100 lg:bg-white">
      <div className="px-6 py-5 border-b border-green-100">
        <h2 className="text-xl font-semibold text-green-700">Painel Admin</h2>
        <p className="text-sm text-gray-500">
          Gerencie produtos, pedidos e usuários em um só lugar.
        </p>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-green-50 hover:text-green-700 ${
                isActive ? activeClass : "text-gray-600"
              }`
            }
          >
            <Icon className="text-lg" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
