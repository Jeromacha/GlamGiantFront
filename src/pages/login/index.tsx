
import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Iniciar sesión</h2>
        <LoginForm />
      </div>
    </div>
  );
}
