
export type UserRole = "Admin" | "Client" | "Tester" | "Employee";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // solo se usa en registro/login
  role: UserRole;
  test_subject_status: boolean;
  allergic_reactions: string;
  purchase_history: string[]; // IDs de órdenes
}
