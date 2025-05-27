import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard";
import Table from "@/components/ui/table";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import OrderForm from "@/components/forms/orderForm";
import { Order, getAllOrders, deleteOrder } from "@/services/orderService";
import { getAllUsers } from "@/services/userService";
import { getAllProducts } from "@/services/productService";
import { User } from "@/types/user";
import { Product } from "@/types/product";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const fetchAll = async () => {
    const [orderList, userList, productList] = await Promise.all([
      getAllOrders(),
      getAllUsers(),
      getAllProducts(),
    ]);
    setOrders(orderList);
    setClients(userList); // Puedes filtrar por CLIENT si quieres
    setProducts(productList);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    fetchAll();
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-title">Pedidos</h1>
        <Button onClick={handleCreate} className="bg-[#DAA85B] hover:bg-[#e6c200] text-black">
          Crear pedido
        </Button>
      </div>

      <Table headers={["Cliente", "Productos", "Total", "Estado", "Acciones"]}>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="px-4 py-2 border-b text-white">
              {order.client?.nombre} ({order.client?.email})
            </td>
            <td className="px-4 py-2 border-b text-white">
              {order.products?.map((p) => p.name).join(", ")}
            </td>
            <td className="px-4 py-2 border-b text-white">${order.total_amount}</td>
            <td className="px-4 py-2 border-b text-white">{order.payment_status}</td>
            <td className="px-4 py-2 border-b text-white">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(order)}
                  className="bg-[#c28f42] hover:bg-[#e6c200] text-black"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-900 hover:bg-red-800 text-white"
                >
                  Eliminar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderForm
          order={editingOrder ?? undefined}
          clients={clients}
          products={products}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchAll();
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
