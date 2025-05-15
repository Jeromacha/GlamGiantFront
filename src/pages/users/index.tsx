
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/userService";
import { User } from "@/types/user";
import Table from "@/components/ui/table";
import DashboardLayout from "../dashboard/dashboardPage";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4 text-purple-700">Usuarios</h1>
      <Table headers={["Nombre", "Correo", "Rol"]}>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-4 py-2 border-b">{user.name}</td>
            <td className="px-4 py-2 border-b">{user.email}</td>
            <td className="px-4 py-2 border-b">{user.role}</td>
          </tr>
        ))}
      </Table>
    </DashboardLayout>
  );
}
