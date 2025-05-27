import { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { login } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);

      // Guardar token
      localStorage.setItem("token", res.access_token);

      // Guardar rol
      localStorage.setItem("rol", res.user.rol);

      // Redirección según el rol
      if (res.user.rol === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/default");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } }, message?: string };
        console.error("Error login:", axiosErr.response?.data || axiosErr.message);
        setError("Credenciales inválidas o error del servidor.");
      } else {
        console.error("Error inesperado:", err);
        setError("Error inesperado al iniciar sesión.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <Input
        label="Correo"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit" className="w-full text-black bg-[#FFD700] hover:bg-[#e6c200]">
        Iniciar sesión
      </Button>
    </form>
  );
}
