import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import {
  createProductTest,
  updateProductTest,
  ProductTest,
} from "@/services/productTestService";

interface Props {
  test?: ProductTest;
  testers: User[];
  products: Product[];
  onSuccess: () => void;
}

export default function ProductTestForm({ test, testers, products, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    tester_id: "",
    product_id: "",
    reaction: "",
    rating: 0,
    survival_status: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (test) {
      setFormData({
        tester_id: test.tester_id,
        product_id: test.product_id,
        reaction: test.reaction,
        rating: test.rating,
        survival_status: test.survival_status,
      });
    }
  }, [test]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const newValue =
      type === "checkbox" ? checked :
      name === "rating" ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (test) {
        await updateProductTest(test.id, formData);
      } else {
        await createProductTest(formData);
      }
      onSuccess();
    } catch (err: any) {
      console.error("❌ Error al guardar prueba:", err.response?.data || err.message);
      setError("Error al guardar prueba: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <label className="block text-sm font-semibold">Tester</label>
      <select
        name="tester_id"
        value={formData.tester_id}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-black/40 border border-[#c28f42] text-white"
      >
        <option value="">Seleccione un tester</option>
        {testers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre || t.nombre} ({t.email})
          </option>
        ))}
      </select>

      <label className="block text-sm font-semibold">Producto</label>
      <select
        name="product_id"
        value={formData.product_id}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-black/40 border border-[#c28f42] text-white"
      >
        <option value="">Seleccione un producto</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <Input
        label="Reacción"
        name="reaction"
        value={formData.reaction}
        onChange={handleChange}
        required
      />

      <Input
        label="Calificación (0-10)"
        name="rating"
        type="number"
        min={0}
        max={10}
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="survival_status"
          checked={formData.survival_status}
          onChange={handleChange}
        />
        <span className="text-sm">¿Sobrevivió a la prueba?</span>
      </label>

      <Button type="submit" className="w-full bg-[#c28f42] hover:bg-[#c28f42] text-black">
        {test ? "Actualizar prueba" : "Registrar prueba"}
      </Button>
    </form>
  );
}
