import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export default function LogoutButton() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <button
      type="button"
      className="btn btn-outline-danger"
      onClick={handleLogout}
    >
      Sair
    </button>
  );
}