// src/pages/dashboard/admin-page.tsx
import DashboardLayout from "./dashboardpage";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-purple-700">Bienvenido, usuario</h1>
      <p className="mt-2 text-gray-600">Aquí puedes comprar y ver tus productos.</p>
    </DashboardLayout>
  );
}
