import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);