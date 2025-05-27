import Sidebar from "@/components/layout/aside";
import Footer from "@/components/layout/footer";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rol = localStorage.getItem("rol");

    if (rol === "ADMIN") {
      setAuthorized(true);
    } else {
      router.replace("/dashboard/default");
    }

    setLoading(false);
  }, [router]);

  // 🔄 Mientras carga/verifica, no mostramos nada
  if (loading) return null;

  // ⛔ Si no es admin, no renderizamos el layout (redirigido arriba)
  if (!authorized) return null;

  // ✅ Si es admin, renderizamos normalmente
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen w-full">
        <main className="flex-1 p-6" style={{ backgroundColor: "#581304" }}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
