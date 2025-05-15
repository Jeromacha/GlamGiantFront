
import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Crear cuenta</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
