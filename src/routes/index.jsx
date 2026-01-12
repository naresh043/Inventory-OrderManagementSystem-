import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../pages/Login";
import PrivateRoute from "../components/auth/PrivateRoute";
import MainLayout from "../layout/MainLayout";

import ProductsPage from "../pages/products/ProductsPage";
import UsersPage from "../pages/users/UserPage";
import StocksPage from "../pages/stocks/StocksPage";
import OrdersPage from "../pages/orders/OrdersPage";

import { roleDashboardMap } from "../utils/roleDashboardMap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const RoleDashboard = () => {
  const {user } = useContext(AuthContext)
  console.log(user,"1231451")
  const Dashboard = roleDashboardMap[user?.role];

  return Dashboard ? <Dashboard /> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* 🔥 SINGLE DASHBOARD ROUTE */}
          <Route index element={<RoleDashboard />} />

          {/* USERS (ADMIN ONLY) */}
          <Route
            path="/users"
            element={
              <PrivateRoute roles={["admin"]}>
                <UsersPage />
              </PrivateRoute>
            }
          />

          {/* PRODUCTS (ADMIN, SALES, VIEWER) */}
          <Route
            path="/products"
            element={
              <PrivateRoute roles={["admin", "sales", "viewer","warehouse"]}>
                <ProductsPage />
              </PrivateRoute>
            }
          />

          {/* ORDERS (ADMIN, SALES, VIEWER) */}
          <Route
            path="/orders"
            element={
              <PrivateRoute roles={["admin", "sales", "viewer"]}>
                <OrdersPage />
              </PrivateRoute>
            }
          />

          {/* STOCK (ADMIN, WAREHOUSE) */}
          <Route
            path="/stock"
            element={
              <PrivateRoute roles={["admin", "sales", "viewer","warehouse"]}>
                <StocksPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
