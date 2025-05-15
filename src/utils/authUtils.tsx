
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getUserRole = (token: string): string | null => {
  const user: any = getUserFromToken(token);
  return user?.role || null;
};

export const isAuthorized = (token: string, allowedRoles: string[]) => {
  const role = getUserRole(token);
  return allowedRoles.includes(role ?? "");
};
