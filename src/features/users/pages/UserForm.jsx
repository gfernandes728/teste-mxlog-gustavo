import { 
  useEffect, 
  useState
} from "react";
import { 
  useNavigate, 
  useParams 
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { 
  createUser, 
  updateUser, 
  getUserById 
} from "../api/user.api";
import LogoutButton from "../components/LogoutButton";

export default function UserForm() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const isEdit = !!id;

  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    setLoading(true);
    const res = await getUserById(id);
    reset(res.data); 
    setLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateUser(id, data);
      } else {
        await createUser(data);
      }

      navigate("/users");
    } catch (error) {
      const message =
        error?.response?.data ||
        (isEdit ? "Erro ao editar usuário" : "Erro ao criar usuário");

      alert(message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  function createNavigateButton(label, route, className) {
    return (
      <button 
        type="button"
        className={`btn btn-${className} me-2`}
        onClick={() => navigate(route)}
      >
        {label}
      </button>
    );
  }

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
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEdit ? "Editar Usuário" : "Novo Usuário"}</h2>

        <div>
          {createNavigateButton("Voltar", "/users", "outline-secondary")}
          {createNavigateButton("+ Novo", "/user", "success")}

          <LogoutButton />
        </div>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {createInput("Nome", "name", "Digite o nome")}
            {createInput("Email", "email", "Digite o email")}
            {createInput("Senha", "password", "Digite a senha", "password")}

            {/* Botões */}
            <div className="d-flex justify-content-end">
              {createNavigateButton("Cancelar", "/users", "secondary")}

              <button 
                type="submit"
                className="btn btn-primary"
              >
                {isEdit ? "Atualizar" : "Criar"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}