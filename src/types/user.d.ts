import { UserRole } from "@/types/enums/user-role.enum";
import { TesterType } from "@/types/enums/tester-type.enum";

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  tester_type?: TesterType;
  test_subject_status?: boolean;
  allergic_reactions?: string;
  purchase_history?: string[];
}
