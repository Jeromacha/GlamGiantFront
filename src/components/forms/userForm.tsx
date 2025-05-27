import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { createUser, updateUser } from "@/services/userService";
import { User } from "@/types/user";
import { UserRole } from "@/types/enums/userRol";
import { TesterType } from "@/types/enums/testerType";

interface Props {
  user?: User;
  onSuccess: () => void;
}

const roles = ["ADMIN", "CLIENT", "EMPLOYEE", "TESTER"];
const testerTypes = ["NORMAL", "DWARF", "SPECIAL"];

export default function UserForm({ user, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "CLIENT",
    tester_type: "",
    test_subject_status: false,
    allergic_reactions: "",
    purchase_history: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre|| "",
        email: user.email || "",
        password: "",
        rol: user.rol || "CLIENT",
        tester_type: user.tester_type || "",
        test_subject_status: user.test_subject_status || false,
        allergic_reactions: user.allergic_reactions || "",
        purchase_history: (user.purchase_history || []).join(", "),
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    const newValue =
      type === "checkbox" ? checked :
      name === "purchase_history" ? value : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const dataToSend: any = {
      ...formData,
      rol: formData.rol as UserRole,
      purchase_history: formData.purchase_history
        ? formData.purchase_history.split(",").map((item) => item.trim())
        : [],
    };

    // ✅ Solo agregar tester_type si tiene valor, si no, eliminarlo
    if (formData.tester_type) {
      dataToSend.tester_type = formData.tester_type as TesterType;
    } else {
      delete dataToSend.tester_type;
    }

    try {
      if (user) {
        await updateUser(user.id, dataToSend);
      } else {
        await createUser(dataToSend);
      }
      onSuccess();
    } catch (err: any) {
      console.error("❌ Error al guardar usuario:", err.response?.data || err.message);
      setError("Error al guardar usuario: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
      <Input label="Correo" name="email" value={formData.email} onChange={handleChange} required type="email" />
      <Input label="Contraseña" name="password" value={formData.password} onChange={handleChange} required type="password" />

      <label className="block text-sm text-title font-semibold">Rol</label>
      <select name="rol" value={formData.rol} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border border-[#c28f42] text-white">
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      <label className="block text-sm text-title font-semibold">Tipo de Tester</label>
      <select name="tester_type" value={formData.tester_type} onChange={handleChange} className="w-full p-2 rounded bg-black/40 border border-[#c28f42] text-white">
        <option value="">Ninguno</option>
        {testerTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="test_subject_status"
          checked={formData.test_subject_status}
          onChange={handleChange}
        />
        <span className="text-sm">¿Es sujeto de prueba?</span>
      </label>

      <Input
        label="Reacciones alérgicas"
        name="allergic_reactions"
        value={formData.allergic_reactions}
        onChange={handleChange}
      />

      <Input
        label="Historial de compras (separado por comas)"
        name="purchase_history"
        value={formData.purchase_history}
        onChange={handleChange}
      />

      <Button type="submit" className="w-full bg-[#c28f42] hover:bg-[#c28f42] text-black">
        {user ? "Actualizar usuario" : "Crear usuario"}
      </Button>
    </form>
  );
}
