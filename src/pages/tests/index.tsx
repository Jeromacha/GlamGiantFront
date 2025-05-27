import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard";
import Table from "@/components/ui/table";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import ProductTestForm from "@/components/forms/productTestForm";
import { ProductTest, getAllProductTests, deleteProductTest } from "@/services/productTestService";
import { getAllUsers } from "@/services/userService";
import { getAllProducts } from "@/services/productService";
import { User } from "@/types/user";
import { Product } from "@/types/product";

export default function TestManagementPage() {
  const [tests, setTests] = useState<ProductTest[]>([]);
  const [testers, setTesters] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<ProductTest | null>(null);

  const fetchAll = async () => {
    const [testList, userList, productList] = await Promise.all([
      getAllProductTests(),
      getAllUsers(),
      getAllProducts(),
    ]);
    setTests(testList);
    setTesters(userList.filter((u) => u.rol === "TESTER"));
    setProducts(productList);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = () => {
    setEditingTest(null);
    setIsModalOpen(true);
  };

  const handleEdit = (test: ProductTest) => {
    setEditingTest(test);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProductTest(id);
    fetchAll();
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-title">Pruebas de Producto</h1>
        <Button onClick={handleCreate} className="bg-[#DAA85B] hover:bg-[#DAA75B8B] text-black">
          Registrar prueba
        </Button>
      </div>

      <Table
        headers={["Tester", "Producto", "Reacción", "Calificación", "¿Sobrevivió?", "Acciones"]}
      >
        {tests.map((test) => (
          <tr key={test.id}>
            <td className="px-4 py-2 border-b text-white">
              {test.tester?.nombre} ({test.tester?.tester_type})
            </td>
            <td className="px-4 py-2 border-b text-white">{test.product?.name}</td>
            <td className="px-4 py-2 border-b text-white">{test.reaction}</td>
            <td className="px-4 py-2 border-b text-white">{test.rating}/10</td>
            <td className="px-4 py-2 border-b text-white">
              {test.survival_status ? "✅" : "❌"}
            </td>
            <td className="px-4 py-2 border-b text-white">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(test)}
                  className="bg-[#c28f42] hover:bg-[#e6c200] text-black"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(test.id)}
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
        <ProductTestForm
          test={editingTest ?? undefined}
          testers={testers}
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
