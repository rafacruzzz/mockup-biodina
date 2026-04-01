import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TemplateTrainamentoProps {
  dataRegistro?: string;
  nomeInstrutor?: string;
  observacoes?: string;
  onChangeData?: (value: string) => void;
  onChangeInstrutor?: (value: string) => void;
  onChangeObservacoes?: (value: string) => void;
}

export const TemplateTrainamentoOsmoTECH = ({
  dataRegistro = "",
  nomeInstrutor = "",
  observacoes = "",
  onChangeData,
  onChangeInstrutor,
  onChangeObservacoes,
}: TemplateTrainamentoProps) => {
  const topicos = [
    "Introdução ao sistema OsmoTECH",
    "Princípios de medição de osmolalidade",
    "Preparo e manuseio de amostras",
    "Operação do equipamento e interface",
    "Calibração e verificação do sistema",
    "Controle de qualidade interno",
    "Manutenção preventiva e limpeza",
    "Resolução de problemas e alarmes",
    "Gerenciamento de reagentes e consumíveis",
    "Registro e documentação de resultados"
  ];

  return (
    <Card className="border-biodina-blue/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Registro de Treinamento - OsmoTECH</CardTitle>
          <Badge variant="outline" className="bg-biodina-blue/10 text-biodina-blue">
            Osmometria
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Data do Treinamento</Label>
            <Input type="date" value={dataRegistro} onChange={(e) => onChangeData?.(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Nome do Instrutor</Label>
            <Input value={nomeInstrutor} onChange={(e) => onChangeInstrutor?.(e.target.value)} placeholder="Nome completo do instrutor" />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Informações do Equipamento</h4>
          <p className="text-sm text-muted-foreground">
            Sistema de medição de osmolalidade para análises laboratoriais.
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
          <p className="text-sm">4 horas (Treinamento inicial completo)</p>
          <p className="text-sm text-muted-foreground mt-1">
            2 horas (Treinamento de nova equipe - conteúdo resumido)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Observações</Label>
          <Textarea value={observacoes} onChange={(e) => onChangeObservacoes?.(e.target.value)} placeholder="Observações sobre o treinamento..." rows={3} />
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Observações Importantes</h4>
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
