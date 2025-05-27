import DashboardLayout from "../index";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-black/40 p-6 rounded-lg border border-[#DAA520] shadow-lg">
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="Logo de GlamGiant"
            width={150}
            height={150}
            className="rounded-lg border border-[#DAA85B]"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-title mb-2">
            Manuela, la Líder, da la bienvenida a su equipo de administradores.

          </h1>
          <p className="text-white text-md text-subtle-glow">
            Este sistema es una herramienta clave para mantener la excelencia que caracteriza a GlamGiant.
             Úsalo con criterio, compromiso y visión.


          </p>
        </div>
      </div>

      {/* Descripción institucional */}
      <div className="mt-10 bg-black/50 text-white p-6 rounded-lg border border-[#DAA85B] shadow">
        <h2 className="text-2xl font-semibold text-title mb-4">GlamGiant no es solo una empresa: es una visión de excelencia.
</h2>
        <p className="leading-relaxed text-justify">
          Bajo el liderazgo de Manuela, cada producto, cada decisión y cada acción están al servicio de la belleza, la ética y la innovación. 
          Aquí no se improvisa: se lidera con propósito, se actúa con rigor y se brilla con orgullo.
          Fundada por una mujer decidida a transformar la industria del maquillaje, GlamGiant nació con una misión clara: elevar los estándares del cuidado estético sin comprometer la responsabilidad ni la transparencia.
          Cada fórmula, cada campaña y cada integrante del equipo reflejan el legado de esa visión: una belleza que no se vende, se construye.
          En este sistema se concentra más que logística o datos: se custodia el corazón de una marca que cree que el poder del maquillaje va más allá de la superficie. Aquí, el compromiso con la excelencia no es una opción, es el requisito mínimo. 
          Porque Manuela la Líder solo acepta lo mejor.


        </p>
      </div>
    </DashboardLayout>
  );
}
