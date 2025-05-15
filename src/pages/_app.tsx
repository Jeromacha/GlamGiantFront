// src/pages/_app.tsx
import "@/styles/globals.css"; // asegúrate de que esta ruta sea correcta
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
