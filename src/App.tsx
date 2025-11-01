import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { Layout } from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { AdminRoute } from "./components/routes/AdminRoute";
import Profile from "./pages/Profile";
import MyOrders from "./pages/Orders/MyOrders";
import Checkout from "./pages/Checkout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminUsers from "./pages/Admin/Users";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="perfil" element={<Profile />} />
          <Route path="meus-pedidos" element={<MyOrders />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="usuarios" element={<AdminUsers />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
