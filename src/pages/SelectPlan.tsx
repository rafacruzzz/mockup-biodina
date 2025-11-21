import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { Webform, Plano } from "@/types/super";
import { webformsMock, planosMock } from "@/data/superModules";
import { useToast } from "@/hooks/use-toast";

const SelectPlan = () => {
  const { webformId } = useParams<{ webformId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [webform, setWebform] = useState<Webform | null>(null);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar webform
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
        description: "Este formulário não está mais disponível.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Se já tem plano atrelado, redireciona direto para register
    if (webformEncontrado.planoId) {
      navigate(`/register/${webformId}`);
      return;
    }

    setWebform(webformEncontrado);
    setPlanos(planosMock);
    setLoading(false);
  }, [webformId, navigate, toast]);

  const handleSelectPlan = (planId: string) => {
    navigate(`/register/${webformId}?planId=${planId}`);
  };

  if (loading || !webform) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  // Determinar plano mais escolhido (primeiro da lista)
  const maisEscolhidoId = planos[0]?.id;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-900 via-biodina-darkblue/20 to-gray-900">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Escolha o plano ideal para sua empresa
        </h1>
        <p className="text-gray-300">
          Planos mensais automáticos com 24 meses de vigência - sem burocracia.
        </p>
      </div>

      {/* Cards de Planos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {planos.map((plano, index) => {
          const isMaisEscolhido = plano.id === maisEscolhidoId;
          
          return (
            <Card
              key={plano.id}
              className={`relative transition-all hover:scale-105 ${
                isMaisEscolhido 
                  ? 'border-2 border-biodina-blue shadow-xl' 
                  : 'border border-gray-200'
              }`}
            >
              {isMaisEscolhido && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  MAIS ESCOLHIDO
                </Badge>
              )}

              <CardHeader className="text-center space-y-2 pt-6">
                <p className="text-sm text-muted-foreground">
                  1 a {plano.quantidadeFiliais === -1 ? '∞' : plano.quantidadeFiliais} colaboradores
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg text-muted-foreground">R$</span>
                  <span className="text-5xl font-bold text-gray-900">
                    {plano.valor.toFixed(2).split('.')[0]}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    ,{plano.valor.toFixed(2).split('.')[1]}
                  </span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Benefícios */}
                <div className="space-y-2 min-h-[180px]">
                  {plano.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{beneficio}</span>
                    </div>
                  ))}
                </div>

                {/* Trial Badge */}
                {plano.diasTrialGratuito > 0 && (
                  <Badge variant="outline" className="w-full justify-center">
                    🎁 {plano.diasTrialGratuito} dias de trial gratuito
                  </Badge>
                )}

                {/* Botão */}
                <Button
                  onClick={() => handleSelectPlan(plano.id)}
                  className={`w-full ${
                    isMaisEscolhido 
                      ? 'bg-biodina-blue hover:bg-biodina-blue/90' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  Assinar agora
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer Link */}
      <p className="text-center text-sm text-white mt-8">
        Já tem uma conta?{" "}
        <a href="/login" className="text-biodina-blue hover:underline font-medium">
          Fazer Login
        </a>
      </p>
    </div>
  );
};

export default SelectPlan;
