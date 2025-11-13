import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const TemplateTrainamentoDxH520 = () => {
  const topicos = [
    "Princípios de funcionamento do sistema",
    "Preparo e manuseio de amostras",
    "Calibração e controle de qualidade",
    "Operação do software (versão 3.x)",
    "Interpretação de resultados",
    "Manutenção preventiva básica",
    "Resolução de problemas comuns",
    "Limpeza e desinfecção do equipamento",
    "Gerenciamento de reagentes e consumíveis",
    "Registro e documentação de resultados"
  ];

  return (
    <Card className="border-biodina-blue/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Registro de Treinamento - DxH 520</CardTitle>
          <Badge variant="outline" className="bg-biodina-blue/10 text-biodina-blue">
            Hematologia
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Informações do Equipamento</h4>
          <p className="text-sm text-muted-foreground">
            Sistema automatizado para análise hematológica com tecnologia de citometria de fluxo.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Conteúdo Programático do Treinamento</h4>
          <div className="space-y-2">
            {topicos.map((topico, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-biodina-green mt-0.5 flex-shrink-0" />
                <span className="text-sm">{topico}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Carga Horária Recomendada</h4>
          <p className="text-sm">8 horas (Treinamento inicial completo)</p>
          <p className="text-sm text-muted-foreground mt-1">
            4 horas (Treinamento de nova equipe - conteúdo resumido)
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
            Observações Importantes
          </h4>
          <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-200">
            <li>• Lista de presença obrigatória com assinatura dos participantes</li>
            <li>• Fotografias devem documentar todas as etapas do treinamento</li>
            <li>• Certificado será emitido após conclusão do treinamento</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
