import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ProductTest {
  id: string;
  tester_id: string;
  product_id: string;
  reaction: string;
  rating: number;
  survival_status: boolean;
  tester: {
    id: string;
    nombre: string;
    email: string;
    tester_type: string;
  };
  product: {
    id: string;
    name: string;
    category: string;
    durability_score: number;
    safety_score: number;
    magical_score: number;
  };
}

export const getAllProductTests = async (): Promise<ProductTest[]> => {
  const res = await axios.get<ProductTest[]>(`${API_URL}/product-tests`);
  return res.data;
};

export const createProductTest = async (testData: Omit<ProductTest, "id" | "tester" | "product">): Promise<ProductTest> => {
  const res = await axios.post<ProductTest>(`${API_URL}/product-tests`, testData);
  return res.data;
};

export const updateProductTest = async (
  id: string,
  testData: Partial<Omit<ProductTest, "id" | "tester" | "product">>
): Promise<ProductTest> => {
  const res = await axios.patch<ProductTest>(`${API_URL}/product-tests/${id}`, testData);
  return res.data;
};

export const deleteProductTest = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/product-tests/${id}`);
};
