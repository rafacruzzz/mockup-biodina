
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 bg-biodina-darkblue relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/e11acdc5-5efc-406a-aa43-b4299398ecb9.png" 
          alt="Mapa do Brasil em rede" 
          className="w-full h-full object-cover opacity-75"
        />
      </div>
      
      <div className="absolute top-6 left-6 z-10">
        <h2 className="text-2xl font-bold text-biodina-gold tracking-tight">Biodina</h2>
      </div>
      
      <div className="w-full max-w-md bg-biodina-blue/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 shadow-xl z-10">
        <LoginForm />
      </div>
      
      <div className="absolute bottom-4 text-center w-full z-10">
        <p className="text-gray-400 text-sm">© 2025 Biodina. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;
