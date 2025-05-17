import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { login } from "@/services/authService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      console.log("Login exitoso:", res);
    } catch (err: any) {
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
      <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black">
        Iniciar sesión
      </Button>
    </form>
  );
}
