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

      // Guardar rol en localStorage 
      localStorage.setItem("rol", res.user.rol);

      // Redirección según el rol
      if (res.user.rol === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/default");
      }
    } catch (err: any) {
      console.error("Error login:", err.response?.data || err.message);
      setError("Credenciales inválidas o error del servidor.");
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
