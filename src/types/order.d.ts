
export type PaymentStatus = "Paid" | "Refunded" | "Failed";

export interface Order {
  id: string;
  client_id: string;
  products: string[]; // IDs de productos
  total_amount: number;
  payment_status: PaymentStatus;
}
