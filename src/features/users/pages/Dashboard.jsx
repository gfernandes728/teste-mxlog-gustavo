import { 
  useEffect, 
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/user.api";
import DeleteUserButton from "../components/DeleteUserButton";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const [data, setData] = useState({ data: [], total: 0, page: 0, pageSize: 0, totalPages: 0 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await getUsers({ page, pageSize, search });
      setData(res.data);
    } catch (error) {
      const message =
        error?.response?.data ||
        "Erro ao carregar usuários";

      alert(message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, pageSize]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      loadUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

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

  function createPaginatedButton(label, disabled, click) {
    return (
      <button 
        type="button"
        className="btn btn-outline-secondary"
        disabled={disabled}
        onClick={click}
      >
        {label}
      </button>
    );
  }
 
  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuários</h2>

        <div>
          {createNavigateButton("+ Novo Usuário", "/user", "success")}

          <LogoutButton />
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex align-items-center">
          <label className="me-2">Itens por página:</label>

          <select
            className="form-select w-auto"
            value={pageSize}
            onChange={(e) => {
            setPage(1);
            setPageSize(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
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
                    {createNavigateButton("Editar", `/user/${u.id}/edit`, "sm btn-primary")}

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
        {createPaginatedButton("Anterior", page === 1, () => setPage(p => p - 1))}
        <span>Página {page} de {data.totalPages}</span>
        {createPaginatedButton("Próximo", page === data.totalPages, () => setPage(p => p + 1))}
      </div>
    </div>
  );
}