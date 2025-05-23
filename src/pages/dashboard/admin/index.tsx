import DashboardLayout from "../index";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      {/* Bloque superior con logo y bienvenida */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-black/40 p-6 rounded-lg border border-[#DAA520] shadow-lg">
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="Logo de GlamGiant"
            width={150}
            height={150}
            className="rounded-lg border border-[#DAA520]"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-yellow-300 mb-2">
            ¡El sistema le da la bienvenida a Manuela, la líder!
          </h1>
          <p className="text-white text-md text-subtle-glow">
            Aquí puedes gestionar usuarios, productos, pruebas y pedidos de GlamGiant.
          </p>
        </div>
      </div>

      {/* Descripción institucional */}
      <div className="mt-10 bg-black/50 text-white p-6 rounded-lg border border-[#FFD700] shadow">
        <h2 className="text-2xl font-semibold text-glow mb-4">¿Qué es GlamGiant?</h2>
        <p className="leading-relaxed text-justify">
          <strong>GlamGiant</strong> es una plataforma de gestión integral diseñada para el mundo del maquillaje y la belleza.
          Desde la administración de productos hasta el seguimiento de pruebas dermatológicas y control de órdenes,
          GlamGiant empodera a su equipo para llevar la excelencia a cada cliente. Este sistema está hecho para liderar,
          adaptarse y brillar con cada decisión que tomas.
        </p>
      </div>
    </DashboardLayout>
  );
}
