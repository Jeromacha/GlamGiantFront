export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  warehouse_location: string;
  durability_score: number;
  safety_score: number;
  magical_score: number;
}

export type ProductInput = Omit<Product, "id">;
