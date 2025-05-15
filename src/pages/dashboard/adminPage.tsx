
import DashboardLayout from "./dashboardPage";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-purple-700">Bienvenido, Admin</h1>
      <p className="mt-2 text-gray-600">Aquí puedes gestionar usuarios, productos y más.</p>
    </DashboardLayout>
  );
}
