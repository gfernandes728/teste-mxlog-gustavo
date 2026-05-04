import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/users/pages/Dashboard";
import UserForm from "../features/users/pages/UserForm";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas públicas */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* rotas protegidas */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/:id/edit"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}