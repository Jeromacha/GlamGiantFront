import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-black/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-glow">
          Inicia sesión en GlamGiant
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
