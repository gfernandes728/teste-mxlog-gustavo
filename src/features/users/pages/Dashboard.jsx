import { 
  useEffect, 
  useState, 
  useContext 
} from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/user.api";
import { AuthContext } from "../../auth/context/AuthContext";
import DeleteUserButton from "../components/DeleteUserButton";

export default function Dashboard() {
  const [data, setData] = useState({ data: [], total: 0, page: 0, pageSize: 0 });
  const [page, setPage] = useState(1);
  const { signOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await getUsers({ page });
      setData(res.data);
    } catch (error) {
      const message =
        error?.response?.data ||
        "Erro ao carregar usuários";

      alert(message);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuários</h2>

        <div>
          <button 
            className="btn btn-success me-2"
            onClick={() => navigate("/user")}
          >
            + Novo Usuário
          </button>

          <button 
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th className="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.data.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
              data.data.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => navigate(`/users/${u.id}/edit`)}
                    >
                      Editar
                    </button>

                    <DeleteUserButton 
                      id={u.id} 
                      onDeleted={loadUsers} 
                    />
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button 
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Anterior
        </button>

        <span>Página {page}</span>

        <button 
          className="btn btn-outline-secondary"
          onClick={() => setPage(p => p + 1)}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}