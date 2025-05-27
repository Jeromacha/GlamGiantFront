export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string) => password.length >= 6;

export const isEmpty = (value: string | undefined | null) =>
  value === undefined || value === null || value === "";
