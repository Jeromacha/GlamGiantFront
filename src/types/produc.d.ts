
export type ProductCategory =
  | "Lipstick"
  | "Foundation"
  | "Eyeshadow"
  | "Mascara"
  | "Blush";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  stock: number;
  warehouse_location: string;
  durability_score: number; // 1-10
}
