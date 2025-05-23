import axios from "axios";
import { Product, ProductInput } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API_URL}/productos`, {
    headers: authHeader(),
  });
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`${API_URL}/productos/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const createProduct = async (
  productData: ProductInput
): Promise<Product> => {
  const res = await axios.post<Product>(`${API_URL}/productos`, productData, {
    headers: authHeader(),
  });
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: ProductInput
): Promise<Product> => {
  const res = await axios.patch<Product>(`${API_URL}/productos/${id}`, data, {
    headers: authHeader(),
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/productos/${id}`, {
    headers: authHeader(),
  });
};
