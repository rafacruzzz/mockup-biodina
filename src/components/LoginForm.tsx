
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Key, ArrowRight, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login bem-sucedido",
        description: "Você foi conectado com sucesso.",
      });
      navigate("/bi-geral"); // Redirect to BI Geral module
    }, 1500);
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Entrar</h1>
        <p className="text-gray-300">Acesse sua conta para continuar</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="email"
            placeholder="E-mail"
            className="pl-10 bg-biodina-darkblue/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-biodina-gold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="pl-10 pr-10 bg-biodina-darkblue/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-biodina-gold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="flex justify-end">
          <a href="#" className="text-sm text-biodina-gold hover:underline">
            Esqueci minha senha
          </a>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-biodina-gold hover:bg-biodina-gold/90 text-biodina-darkblue font-medium flex items-center justify-center gap-2 h-11"
        >
          {isLoading ? "Entrando..." : "Entrar"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
        
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-3 text-gray-400 text-sm">ou continue com</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-gray-700 bg-biodina-darkblue/50 text-white hover:bg-biodina-darkblue hover:text-white flex items-center justify-center gap-2 h-11"
        >
          <LogIn className="h-5 w-5" />
          Entrar com Google
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
