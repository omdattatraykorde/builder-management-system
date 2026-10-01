import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import CustomerPage from "../pages/customers/CustomerPage";
import ProjectsPage from "../pages/projects/ProjectsPage";
import WorkersPage from "../pages/workers/WorkersPage";
import MaterialsPage from "../pages/materials/MaterialsPage";
import ExpensesPage from "../pages/expenses/ExpensesPage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import SiteWorkspace from "../pages/sites/SiteWorkspace";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={<DashboardPage />}
          />

          {/* Account */}
          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="change-password"
            element={<ChangePasswordPage />}
          />

          {/* Sites */}
          <Route
            path="projects"
            element={<ProjectsPage />}
          />

          <Route
            path="sites/:id"
            element={<SiteWorkspace />}
          />

          {/* Customers */}
          <Route
            path="customers"
            element={<CustomerPage />}
          />

          {/* Workers */}
          <Route
            path="workers"
            element={<WorkersPage />}
          />

          {/* Materials */}
          <Route
            path="materials"
            element={<MaterialsPage />}
          />

          {/* Expenses */}
          <Route
            path="expenses"
            element={<ExpensesPage />}
          />

          {/* Payments */}
          <Route
            path="payments"
            element={<PaymentsPage />}
          />

        </Route>

        {/* Invalid Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;