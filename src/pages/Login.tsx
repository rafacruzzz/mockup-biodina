import LoginForm from "@/components/LoginForm";
import logoBranca from "@/assets/logos/branca.png";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 relative overflow-hidden bg-gradient-to-br from-imuv-dark via-imuv-navy to-imuv-dark">
      {/* Subtle geometric pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0BB8F6 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #0000FE 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-imuv-cyan/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-imuv-blue/10 rounded-full blur-3xl z-0" />
      
      {/* Header with white logo */}
      <div className="absolute top-8 left-8 z-10">
        <img src={logoBranca} alt="iMuv" className="h-10 drop-shadow-lg" />
        <p className="text-imuv-cyan text-sm mt-2 font-medium tracking-wide">Sistemas Inteligentes</p>
      </div>
      
      {/* Login form container */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/20 shadow-2xl z-10 animate-fade-in">
        <LoginForm />
        
        {/* Link para Cadastro */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Ainda não tem conta?{" "}
          <a href="/register/wf-1" className="text-imuv-cyan hover:underline font-medium">
            Cadastre-se
          </a>
        </p>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <p className="text-gray-400 text-sm">© 2025 iMuv. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;
