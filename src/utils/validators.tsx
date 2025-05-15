
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string) => password.length >= 6;

export const isEmpty = (value: any) =>
  value === undefined || value === null || value === "";
