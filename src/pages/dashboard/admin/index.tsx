
import DashboardLayout from "..";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-yellow-300">Bienvenido, Admin</h1>
      <p className="mt-2 text-gray-600">Aquí puedes gestionar usuarios, productos y más.</p>
    </DashboardLayout>
  );
}
