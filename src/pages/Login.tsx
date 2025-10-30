
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 bg-gray-900 relative overflow-hidden">
      {/* Background Image with proper sizing */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/e11acdc5-5efc-406a-aa43-b4299398ecb9.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      />
      
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-biodina-darkblue/40 via-transparent to-biodina-darkblue/40 z-0" />
      
      {/* Header with company branding */}
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">iMuv</h2>
        <p className="text-gray-200 text-sm mt-1 drop-shadow">Sistemas Inteligentes</p>
      </div>
      
      {/* Login form container */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/20 shadow-2xl z-10 animate-fade-in">
        <LoginForm />
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <p className="text-gray-200 text-sm drop-shadow">© 2025 iMuv. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;
