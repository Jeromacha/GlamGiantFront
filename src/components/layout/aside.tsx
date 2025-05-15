
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/dashboard/admin", label: "Dashboard" },
  { href: "/users", label: "Usuarios" },
  { href: "/products", label: "Productos" },
  { href: "/tests", label: "Pruebas" },
  { href: "/orders", label: "Órdenes" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 h-screen  text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">GlamGiant</h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded ${
              router.pathname === link.href ? "" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
