// src/components/auth/RegisterForm.tsx
import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    // Aquí podrías llamar a register()
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <Input
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Correo"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <Button type="submit">Registrarse</Button>
    </form>
  );
}
