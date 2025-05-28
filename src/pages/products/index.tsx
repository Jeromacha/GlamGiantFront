import { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
} from "@/services/productService";
import { Product } from "@/types/product";
import Table from "@/components/ui/table";
import DashboardLayout from "../dashboard";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import ProductForm from "@/components/forms/productForm"; 

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-title">Productos</h1>
        <Button onClick={handleCreate}>Agregar producto</Button>
      </div>

      <Table
        headers={[
          "Nombre",
          "Categoría",
          "Stock",
          "Ubicación",
          "Durabilidad",
          "Seguridad",
          "Magia",
          "Acciones",
        ]}
      >
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-2 border-b text-white">{product.name}</td>
            <td className="px-4 py-2 border-b text-white">{product.category}</td>
            <td className="px-4 py-2 border-b text-white">{product.stock}</td>
            <td className="px-4 py-2 border-b text-white">
              {product.warehouse_location}
            </td>
            <td className="px-4 py-2 border-b text-white">
              {product.durability_score}
            </td>
            <td className="px-4 py-2 border-b text-white">
              {product.safety_score}
            </td>
            <td className="px-4 py-2 border-b text-white">
              {product.magical_score}
            </td>
            <td className="px-4 py-2 border-b text-white">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(product)}
                  className="bg-[#c28f42] hover:bg-[#e6c200] text-black"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
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
        <ProductForm
          product={editingProduct ?? undefined}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchProducts();
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
