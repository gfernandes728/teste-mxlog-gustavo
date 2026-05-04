import { deleteUser } from "../api/user.api";

export default function DeleteUserButton({ id, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm("Deseja excluir?")) return;

    try {
      await deleteUser(id);
      onDeleted();
    } catch (error) {
      const message =
        error?.response?.data ||
        "Erro ao excluir usuário";

      alert(message);
    }
  };

  return <button onClick={handleDelete}>Excluir</button>;
}