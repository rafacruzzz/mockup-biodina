
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Key, ArrowRight, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthDemo } from "@/hooks/useAuthDemo";
import { useUser } from "@/contexts/UserContext";
import { Badge } from "@/components/ui/badge";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthDemo();
  const { updateUser } = useUser();

  // Credenciais de demonstração
  const demoAccounts = [
    {
      email: "ana.assessora@imuv.com.br",
      password: "demo123",
      profile: {
        id: "resp-008",
        email: "ana.assessora@imuv.com.br",
        nome: "Ana Assessora",
        role: 'assessor' as const
      }
    },
    {
      email: "mariana.gestora@imuv.com.br",
      password: "demo123",
      profile: {
        id: "resp-009",
        email: "mariana.gestora@imuv.com.br",
        nome: "Mariana Gestora",
        role: 'gestor_assessoria' as const
      }
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Verificar se é um dos usuários de demonstração
    const demoUser = demoAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    setTimeout(() => {
      setIsLoading(false);
      
      if (demoUser) {
        setCurrentUser(demoUser.profile);
        toast({
          title: "Login bem-sucedido",
          description: `Bem-vinda, ${demoUser.profile.nome}!`,
        });
        navigate("/bi-geral");
      } else if (email === "super@super.com.br" && password === "super") {
        // Login do usuário SUPER (acesso ao módulo SUPER)
        updateUser({
          id: 'user-master',
          name: 'Admin Master',
          email: 'super@super.com.br',
          username: 'admin.master',
          empresaId: 'master-001',
          role: 'Super Admin',
        });
        
        // Definir empresa master para acesso ao SUPER
        localStorage.setItem('empresaAtualId', 'master-001');
        
        toast({
          title: "Login SUPER bem-sucedido",
          description: "Bem-vindo, Admin Master!",
        });
        navigate("/super");
      } else if (email === "danilo@tecnologiadc.com.br" && password === "123") {
        // Login do usuário master Danilo Silva (empresa iMuv)
        updateUser({
          id: 'user-biodina',
          name: 'Danilo Silva',
          email: 'danilo@tecnologiadc.com.br',
          username: 'danilo.silva',
          empresaId: 'master-001',
          role: 'Gerente de TI',
        empresasVinculadas: [
            { id: 'master-001', tipo: 'principal', nome: 'iMuv Master', moduleAccess: [] },
            { id: 'filial-sp-001', tipo: 'filial', nome: 'iMuv - Filial São Paulo', moduleAccess: [] },
            { id: 'filial-rj-001', tipo: 'filial', nome: 'iMuv - Filial Rio de Janeiro', moduleAccess: [] },
            { id: 'filial-mg-001', tipo: 'filial', nome: 'iMuv - Filial Belo Horizonte', moduleAccess: [] },
            { id: 'filial-pr-001', tipo: 'filial', nome: 'iMuv - Filial Curitiba', moduleAccess: [] }
          ]
        });
        
        // Garantir que a empresa correta seja carregada
        localStorage.setItem('empresaAtualId', 'master-001');
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo de volta, Danilo!",
        });
        navigate("/bi-geral");
      } else if (email === "admin@biodina.com.br" && password === "admin123") {
        // Login alternativo para o usuário master
        updateUser({
          id: 'user-master',
          name: 'Admin Master',
          email: 'admin@biodina.com.br',
          username: 'admin.master',
          empresaId: 'master-001',
          role: 'Super Admin',
        });
        
        localStorage.setItem('empresaAtualId', 'master-001');
        
        toast({
          title: "Login SUPER bem-sucedido",
          description: "Bem-vindo, Admin Master!",
        });
        navigate("/super");
      } else {
        toast({
          title: "Erro ao fazer login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-biodina-blue mb-2">Bem-vindo</h1>
        <p className="text-gray-600">Acesse sua conta para continuar</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="pl-12 h-12 bg-gray-50 border-gray-200 text-biodina-blue placeholder:text-gray-400 focus:border-biodina-gold focus:ring-biodina-gold rounded-xl"
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
              className="pl-12 pr-12 h-12 bg-gray-50 border-gray-200 text-biodina-blue placeholder:text-gray-400 focus:border-biodina-gold focus:ring-biodina-gold rounded-xl"
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
          <a href="#" className="text-sm text-biodina-gold hover:text-biodina-gold/80 font-medium transition-colors">
            Esqueci minha senha
          </a>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-biodina-gold hover:bg-biodina-gold/90 text-white font-semibold flex items-center justify-center gap-2 h-12 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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
