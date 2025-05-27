import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE = `${API_URL}/order-and-transactions`;

export interface Order {
  id: string;
  clientId?: string;
  productIds?: string[];
  total_amount: number;
  payment_status: "Refunded" | "Paid" | "Failed";

  client?: {
    id: string;
    nombre: string;
    email: string;
  };
  products?: {
    id: string;
    name: string;
  }[];
}

// 🔐 Configuración con token desde localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllOrders = async (): Promise<Order[]> => {
  const res = await axios.get<Order[]>(BASE, getAuthConfig());
  return res.data;
};

export const createOrder = async (
  orderData: Omit<Order, "id" | "client" | "products">
): Promise<Order> => {
  const res = await axios.post<Order>(BASE, orderData, getAuthConfig());
  return res.data;
};

export const updateOrder = async (
  id: string,
  data: Partial<Omit<Order, "id" | "client" | "products">>
): Promise<Order> => {
  const res = await axios.patch<Order>(`${BASE}/${id}`, data, getAuthConfig());
  return res.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await axios.delete(`${BASE}/${id}`, getAuthConfig());
};
