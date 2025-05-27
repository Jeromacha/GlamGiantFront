import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "@/services/userService";
import { User } from "@/types/user";
import Table from "@/components/ui/table";
import DashboardLayout from "../dashboard";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import UserForm from "@/components/forms/userForm";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-title">Usuarios</h1>
        <Button
          onClick={handleCreate}
          className="bg-[#DAA85B] hover:bg-[#e6c200] text-black"
        >
          Agregar usuario
        </Button>
      </div>

      <Table headers={["Nombre", "Correo", "Rol", "Acciones"]}>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-4 py-2 border-b text-white">{user.nombre || user.nombre}</td>
            <td className="px-4 py-2 border-b text-white">{user.email}</td>
            <td className="px-4 py-2 border-b text-white">{user.rol}</td>
            <td className="px-4 py-2 border-b text-white">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(user)}
                  className="bg-[#c28f42] hover:bg-[#e6c200] text-black"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-900 hover:bg-red-800 text-white"
                >
                  Eliminar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          user={editingUser ?? undefined}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchUsers();
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
