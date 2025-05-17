
import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-black/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-glow">Crear cuenta</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
