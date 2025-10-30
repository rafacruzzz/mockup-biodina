
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Key, ArrowRight, User } from "lucide-react";
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
    
    // Redireciona diretamente para BI sem verificação
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login bem-sucedido",
        description: "Você foi conectado com sucesso.",
      });
      navigate("/bi-geral");
    }, 800);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-imuv-blue mb-2">Bem-vindo</h1>
        <p className="text-gray-600">Acesse sua conta para continuar</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="pl-12 h-12 bg-gray-50 border-gray-200 text-imuv-blue placeholder:text-gray-400 focus:border-imuv-gold focus:ring-imuv-gold rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              className="pl-12 pr-12 h-12 bg-gray-50 border-gray-200 text-imuv-blue placeholder:text-gray-400 focus:border-imuv-gold focus:ring-imuv-gold rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <a href="#" className="text-sm text-imuv-gold hover:text-imuv-gold/80 font-medium transition-colors">
            Esqueci minha senha
          </a>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-imuv-gold hover:bg-imuv-gold/90 text-white font-semibold flex items-center justify-center gap-2 h-12 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? "Entrando..." : "Entrar"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
        
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">ou continue com</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3 h-12 rounded-xl transition-all duration-200"
        >
          <User className="h-5 w-5" />
          Entrar com Google
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
