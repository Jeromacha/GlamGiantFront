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

      // ✅ Guardar token
      localStorage.setItem("token", res.access_token);

      console.log("Login exitoso:", res);

      // ✅ Redirigir al dashboard
      router.push("/dashboard/admin");
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
      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
      >
        Iniciar sesión
      </Button>
    </form>
  );
}
