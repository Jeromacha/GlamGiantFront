
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6" style={{ color: "#FFD700" }}>
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg" style={{ textShadow: "0 0 0px #fff700, 0 0 20px #ffd700" }}>
        Bienvenido a GlamGiant
      </h1>
      <p className="mb-12 text-lg max-w-xl text-center" style={{ textShadow: "0 0 6px #fff700" }}>
        Tu plataforma para controlar todo el imperio de maquillaje con ética y poder.
      </p>
      <nav className="flex flex-col gap-4">
        <Link
          href="/login"
          className="px-6 py-3 border border-white  font-semibold rounded-md hover:bg-purple-100 transition"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 border border-white font-semibold rounded-md hover:bg-white hover:text-purple-700 transition"
        >
          Crear cuenta
        </Link>
        <Link
          href="/dashboard/admin"
          className="px-6 py-3  border border-white bg-opacity-70 font-semibold rounded-md hover:bg-purple-800 transition"
        >
          Ir al Dashboard Admin
        </Link>
      </nav>
    </main>
  );
}
