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

  function createPublicRoute(path, element) {
    return (
      <Route
        path={path}
        element={
          <PublicRoute>
            {element}
          </PublicRoute>
        }
      />
    );
  }

  function createPrivateRoute(path, element) {
    return (
      <Route
        path={path}
        element={
          <PrivateRoute>
            {element}
          </PrivateRoute>
        }
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* rotas públicas */}
        {createPublicRoute("/", <Login />)}
        {createPublicRoute("/login", <Login />)}

        {/* rotas protegidas */}
        {createPrivateRoute("/users", <Dashboard />)}
        {createPrivateRoute("/user", <UserForm />)}
        {createPrivateRoute("/user/:id/edit", <UserForm />)}
      </Routes>
    </BrowserRouter>
  );
}