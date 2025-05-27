import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  rol?: string;
  iat?: number;
  exp?: number;
}

export const getUserFromToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

export const getUserRole = (token: string): string | null => {
  const user = getUserFromToken(token);
  return user?.rol || null;
};

export const isAuthorized = (token: string, allowedRoles: string[]): boolean => {
  const role = getUserRole(token);
  return allowedRoles.includes(role ?? "");
};
