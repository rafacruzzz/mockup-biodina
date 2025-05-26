
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 bg-biodina-darkblue relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/e11acdc5-5efc-406a-aa43-b4299398ecb9.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7
        }}
      />
      
      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-biodina-darkblue/80 via-biodina-blue/60 to-biodina-darkblue/90 z-0" />
      
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-3xl font-bold text-biodina-gold tracking-tight">Biodina</h2>
        <p className="text-gray-300 text-sm mt-1">Sistemas Inteligentes</p>
      </div>
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/20 shadow-2xl z-10 animate-fade-in">
        <LoginForm />
      </div>
      
      <div className="absolute bottom-6 text-center w-full z-10">
        <p className="text-gray-300 text-sm">© 2025 Biodina. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;
