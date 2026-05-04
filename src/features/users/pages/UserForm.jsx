import { 
  useEffect, 
  useState, 
  useContext 
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
import { AuthContext } from "../../auth/context/AuthContext";

export default function UserForm() {
  const { signOut } = useContext(AuthContext);
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

   const handleLogout = () => {
    signOut();
    navigate("/login");
  };

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

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEdit ? "Editar Usuário" : "Novo Usuário"}</h2>

        <div>
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate("/users")}
          >
            Voltar
          </button>

          <button 
            className="btn btn-success me-2"
            onClick={() => navigate("/user")}
          >
            + Novo
          </button>

          <button 
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
          
            {/* Nome */}
            <div className="mb-3">
              <label className="form-label">Nome</label>
                <input
                  {...register("name")}
                  className="form-control"
                  placeholder="Digite o nome"
                />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                  {...register("email")}
                  className="form-control"
                  placeholder="Digite o email"
              />
            </div>

            {/* Senha */}
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                  {...register("password")}
                  className="form-control"
                  placeholder="Digite a senha"
              />
            </div>

            {/* Botões */}
            <div className="d-flex justify-content-end">
              <button 
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/users")}
              >
                Cancelar
              </button>

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