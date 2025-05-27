import Link from "next/link";

export default function AccesoDenegadoPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-black/40 text-white">
      <div className="bg-red-800/80 p-8 rounded-lg shadow-lg border border-red-300">
        <h1 className="text-4xl font-bold mb-4 text-red-300">Acceso denegado</h1>
        <p className="text-lg mb-6">
          Este sistema es exclusivo para administradores de GlamGiant. Tu rol no tiene acceso autorizado.
        </p>
        <Link
          href="/login"
          className="px-6 py-3 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}
