import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Webform } from "@/types/super";
import { useToast } from "@/hooks/use-toast";
import { formatarCNPJCPF, validarCNPJ, validarCPF, validarSenhaForte } from "@/utils/webformUtils";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Mock - Em produção, buscar do backend
import { webformsMock } from "@/data/superModules";

const Register = () => {
  const { webformId } = useParams<{ webformId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [webform, setWebform] = useState<Webform | null>(null);
  const [loading, setLoading] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    cnpjCpf: "",
    usuario: "",
    email: "",
    base: "",
    senha: "",
  });

  useEffect(() => {
    // Buscar webform pelo ID
    const webformEncontrado = webformsMock.find(w => w.id === webformId);
    
    if (!webformEncontrado) {
      toast({
        title: "Webform Não Encontrado",
        description: "O link que você acessou não é válido.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (webformEncontrado.status !== 'ativo') {
      toast({
        title: "Webform Inativo",
        description: "Este formulário de cadastro não está mais disponível.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setWebform(webformEncontrado);
    
    // Incrementar contador de acessos (em produção, fazer via API)
    console.log("Acesso ao webform:", webformEncontrado.titulo);
  }, [webformId, navigate, toast]);

  const handleEmailChange = (email: string) => {
    setFormData({
      ...formData,
      email,
      usuario: email, // Auto-preencher usuário com o email
    });
  };

  const handleCnpjCpfChange = (value: string) => {
    const formatted = formatarCNPJCPF(value);
    setFormData({ ...formData, cnpjCpf: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações
    if (!formData.nome.trim()) {
      toast({
        title: "Erro de Validação",
        description: "O nome da empresa é obrigatório.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const cnpjCpfLimpo = formData.cnpjCpf.replace(/\D/g, '');
    const isCNPJ = cnpjCpfLimpo.length === 14;
    const isCPF = cnpjCpfLimpo.length === 11;

    if (!validarCNPJ(formData.cnpjCpf) && !validarCPF(formData.cnpjCpf)) {
      toast({
        title: "CNPJ/CPF Inválido",
        description: "Por favor, insira um CNPJ (14 dígitos) ou CPF (11 dígitos) válido.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        title: "E-mail Inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.base.trim()) {
      toast({
        title: "Base Obrigatória",
        description: "Por favor, defina um nome para a base de dados.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const validacaoSenha = validarSenhaForte(formData.senha);
    if (!validacaoSenha.valida) {
      toast({
        title: "Senha Fraca",
        description: validacaoSenha.mensagem,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simular criação de empresa
    setTimeout(() => {
      toast({
        title: "Cadastro Realizado com Sucesso! 🎉",
        description: webform?.trial 
          ? `Sua conta foi criada com ${webform.diasTrial} dias de trial gratuito.`
          : "Sua conta foi criada com sucesso. Faça login para acessar.",
      });
      
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  if (!webform) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
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
      
      <div className="absolute inset-0 bg-gradient-to-br from-biodina-darkblue/40 via-transparent to-biodina-darkblue/40 z-0" />
      
      {/* Header */}
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">iMuv</h2>
        <p className="text-gray-200 text-sm mt-1 drop-shadow">Sistemas Inteligentes</p>
      </div>
      
      {/* Form Container */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/20 shadow-2xl z-10 animate-fade-in">
        {/* Header do Form */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{webform.titulo}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Cadastre sua empresa e comece a usar agora
          </p>
          {webform.trial && (
            <Badge className="mt-3 bg-green-500">
              🎁 Trial Gratuito de {webform.diasTrial} dias
            </Badge>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informações da Empresa */}
          <div className="space-y-4 border-b pb-4">
            <h3 className="text-sm font-semibold text-gray-700">Informações da Empresa</h3>
            
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                placeholder="Inserir Nome da Empresa"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpjCpf">CNPJ ou CPF *</Label>
              <Input
                id="cnpjCpf"
                placeholder="Enter CNPJ Or CPF"
                value={formData.cnpjCpf}
                onChange={(e) => handleCnpjCpfChange(e.target.value)}
                maxLength={18}
                required
              />
            </div>
          </div>

          {/* Informações de Login */}
          <div className="space-y-4 border-b pb-4">
            <h3 className="text-sm font-semibold text-gray-700">Informações de Login</h3>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Inserir e-mail"
                value={formData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usuario">Usuário *</Label>
              <Input
                id="usuario"
                placeholder="clari@imuv.me"
                value={formData.usuario}
                readOnly
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Gerado automaticamente a partir do seu e-mail
              </p>
            </div>
          </div>

          {/* Base e Senha */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base">Base *</Label>
              <Input
                id="base"
                placeholder="Enter newcrm"
                value={formData.base}
                onChange={(e) => setFormData({ ...formData, base: e.target.value.toLowerCase().replace(/\s/g, '') })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Nome da base de dados da sua empresa (sem espaços)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha *</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={senhaVisivel ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setSenhaVisivel(!senhaVisivel)}
                >
                  {senhaVisivel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="senhaVisivel"
                  checked={senhaVisivel}
                  onCheckedChange={(checked) => setSenhaVisivel(checked as boolean)}
                />
                <Label htmlFor="senhaVisivel" className="text-sm font-normal cursor-pointer">
                  Senha Visível
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Mínimo 8 caracteres, 1 maiúscula e 1 número
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem uma conta?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Fazer Login
          </a>
        </p>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <p className="text-gray-200 text-sm drop-shadow">© 2025 iMuv. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Register;
