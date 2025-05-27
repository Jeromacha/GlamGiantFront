import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { createOrder, updateOrder, Order } from "@/services/orderService";
import { User } from "@/types/user";
import { Product } from "@/types/product";

interface Props {
  order?: Order;
  clients: User[];
  products: Product[];
  onSuccess: () => void;
}


const paymentOptions = ["PAID", "PENDING", "FAILED"];

export default function OrderForm({ order, clients, products, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    clientId: "",
    productIds: [] as string[],
    total_amount: 0,
    payment_status: "PAID" as "PAID" | "PENDING" | "FAILED",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (order) {
      setFormData({
        clientId: order.client?.id || "",
        productIds: order.products?.map((p) => p.id) || [],
        total_amount: Number(order.total_amount) || 0,
        payment_status: order.payment_status as "PAID" | "PENDING" | "FAILED",
      });
    }
  }, [order]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "total_amount" ? parseFloat(value) : value,
    }));
  };

  const handleProductSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prev) => ({
      ...prev,
      productIds: selectedOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (order) {
        await updateOrder(order.id, formData);
      } else {
        await createOrder(formData);
      }
      onSuccess();
    } catch (err: any) {
      console.error("❌ Error al guardar pedido:", err.response?.data || err.message);
      setError("Error al guardar pedido: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <label className="block text-sm font-semibold">Cliente</label>
      <select
        name="clientId"
        value={formData.clientId}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-black/40 border border-white text-white"
      >
        <option value="">Selecciona un cliente</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre || c.nombre} ({c.email})
          </option>
        ))}
      </select>

      <label className="block text-sm font-semibold">Productos</label>
      <select
        multiple
        value={formData.productIds}
        onChange={handleProductSelection}
        className="w-full p-2 rounded bg-black/40 border border-white text-white h-32"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <Input
        label="Total (USD)"
        name="total_amount"
        type="number"
        step="0.01"
        value={formData.total_amount}
        onChange={handleChange}
        required
      />

      <label className="block text-sm font-semibold">Estado de pago</label>
      <select
        name="payment_status"
        value={formData.payment_status}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black/40 border border-white text-white"
      >
        {paymentOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <Button type="submit" className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black">
        {order ? "Actualizar pedido" : "Crear pedido"}
      </Button>
    </form>
  );
}
