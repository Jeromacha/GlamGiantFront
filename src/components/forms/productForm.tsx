import { useState, useEffect } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { createProduct, updateProduct } from "@/services/productService";
import { Product, ProductInput } from "@/types/product";
import { ProductType } from "@/types/enums/productType";

interface Props {
  product?: Product;
  onSuccess: () => void;
}

export default function ProductForm({ product, onSuccess }: Props) {
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    category: "",
    stock: 0,
    warehouse_location: "",
    durability_score: 0,
    safety_score: 0,
    magical_score: 0,
  });

  useEffect(() => {
    if (product) {
      const correctedCategory = Object.values(ProductType).includes(product.category as ProductType)
        ? (product.category as ProductType)
        : "Lipstick";

      setFormData({
        ...product,
        category: correctedCategory,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["stock", "durability_score", "safety_score", "magical_score"].includes(name)
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      onSuccess();
    } catch (err: unknown) {
      const error = err as { response?: { data: string }; message: string };
      console.error("Error al guardar producto:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />

      <label className="block text-sm font-semibold text-title">Categoría</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-black/40 border border-[#c28f42] text-white"
      >
        <option value="">Selecciona una categoría</option>
        {Object.values(ProductType).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Input label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
      <Input
        label="Ubicación en bodega"
        name="warehouse_location"
        value={formData.warehouse_location}
        onChange={handleChange}
        required
      />
      <Input
        label="Durabilidad"
        name="durability_score"
        type="number"
        min={0}
        max={10}
        value={formData.durability_score}
        onChange={handleChange}
        required
      />
      <Input
        label="Seguridad"
        name="safety_score"
        type="number"
        min={0}
        max={10}
        value={formData.safety_score}
        onChange={handleChange}
        required
      />
      <Input
        label="Puntaje mágico"
        name="magical_score"
        type="number"
        min={0}
        max={10}
        value={formData.magical_score}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full bg-[#c28f42] text-black hover:bg-[#c28f42]">
        {product ? "Actualizar producto" : "Crear producto"}
      </Button>
    </form>
  );
}
