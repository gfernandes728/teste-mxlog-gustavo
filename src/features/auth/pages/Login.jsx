import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const result = await login(data);
      signIn(result);
      navigate("/users");
    } catch(error) {
      const message =
        error?.response?.data ||
        "Erro ao logar usuário";

      alert(message);
    }
  };

  function createInput(label, data, holder, type = "text") {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          {...register(data)}
          type={type}
          className="form-control"
          placeholder={holder}
        />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {createInput("Email", "email", "Digite seu email")}
          {createInput("Senha", "password", "Digite sua senha", "password")}

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}