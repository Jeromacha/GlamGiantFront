// src/components/auth/LoginForm.tsx
import { useState } from "react";
import Input from "../ui/input";
import Button from "@/components/ui/button";
import { login } from "@/services/authService"; // cuando esté implementado

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
      // Aquí podrías guardar el token, redirigir, etc.
    } catch (err: any) {
      setError("Credenciales inválidas o error del servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit">Iniciar sesión</Button>
    </form>
  );
}
