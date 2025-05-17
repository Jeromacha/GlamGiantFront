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

  return (
    <aside className="h-screen w-64 bg-black p-4 border-r border-[#FFD700] fixed top-0 left-0 text-white">
      <h2 className="text-lg font-bold mb-6 text-[#FFD700]">GlamGiant</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md hover:bg-[#4B0E20] transition ${
              router.pathname === link.href ? "bg-[#4B0E20] text-[#FFD700]" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
