import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/dashboard/admin", label: "Inicio" },
  { href: "/users", label: "Usuarios" },
  { href: "/products", label: "Productos" },
  { href: "/tests", label: "Pruebas" },
  { href: "/orders", label: "Órdenes" },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    router.push("/");
  };

  return (
    <aside className="h-screen w-64 bg-black p-4 border-r border-[#DAA85B] fixed top-0 left-0 text-white flex flex-col justify-between">
      <div>
        <Link
          href="/dashboard/admin"
          className="text-lg font-bold mb-6 text-title hover:underline block"
        >
          GlamGiant
        </Link>
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md hover:bg-[#330800] transition ${
                router.pathname === link.href ? "bg-[#330800] text-title" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="w-full px-3 py-2 rounded-md bg-black hover:bg-[#330800] transition"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
