
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen w-full login-bg flex items-center justify-center p-4 md:p-6">
      <div className="absolute top-6 left-6">
        <h2 className="text-2xl font-bold text-biodina-gold tracking-tight">Biodina</h2>
      </div>
      
      <div className="w-full max-w-md bg-biodina-blue/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 shadow-xl">
        <LoginForm />
      </div>
      
      <div className="absolute bottom-4 text-center w-full">
        <p className="text-gray-400 text-sm">© 2025 Biodina. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;
