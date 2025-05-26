
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 text-glow
    ">
      <div className="w-150 h-125 flex flex-col justify-center items-center bg-black/60 text-center border-2 border-glow rounded-lg p-8 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg text-glow">
          Bienvenido a GlamGiant
        </h1>
        <p className="mb-12 text-lg max-w-xl text-center text-subtle-glow">
          Tu plataforma para controlar todo el imperio de maquillaje con ética y poder.
        </p>
        <nav className="flex flex-col gap-5 items-center">
          <Link href="/login" className="btn-link">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn-link">
            Crear cuenta
          </Link>
          
        </nav>
      </div>

    </main>
  );
}
