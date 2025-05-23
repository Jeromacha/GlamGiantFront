import { useState, useEffect } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { createProduct, updateProduct } from "@/services/productService";
import { Product, ProductInput } from "@/types/product";

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
      const { id, ...rest } = product;
      setFormData(rest);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (err: any) {
      console.error("Error al guardar producto:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
      <Input label="Categoría" name="category" value={formData.category} onChange={handleChange} required />
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
      <Button type="submit" className="w-full bg-[#FFD700] text-black hover:bg-[#e6c200]">
        {product ? "Actualizar producto" : "Crear producto"}
      </Button>
    </form>
  );
}
