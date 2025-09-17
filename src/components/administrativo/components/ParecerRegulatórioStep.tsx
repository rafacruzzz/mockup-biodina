import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface ParecerRegulatórioStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const ParecerRegulatórioStep = ({ data, onChange }: ParecerRegulatórioStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const getRecomendacaoColor = (recomendacao: string) => {
    switch (recomendacao) {
      case 'Aprovar':
        return 'bg-green-500';
      case 'Aprovar com Ressalvas':
        return 'bg-yellow-500';
      case 'Rejeitar':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRecomendacaoIcon = (recomendacao: string) => {
    switch (recomendacao) {
      case 'Aprovar':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'Aprovar com Ressalvas':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Rejeitar':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Análise Regulatória Consolidada</CardTitle>
          <div className="text-sm text-muted-foreground">
            Consolide todas as análises anteriores em um parecer técnico final.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="responsavelParecer">Responsável pelo Parecer</Label>
              <Input
                id="responsavelParecer"
                value={data.responsavelParecer || ""}
                onChange={(e) => handleInputChange('responsavelParecer', e.target.value)}
                placeholder="Nome do responsável técnico"
              />
            </div>

            <div>
              <Label htmlFor="dataParecer">Data do Parecer</Label>
              <Input
                id="dataParecer"
                type="date"
                value={data.dataParecer || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('dataParecer', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="resumoAnalisesTecnicas">Resumo das Análises Técnicas</Label>
            <Textarea
              id="resumoAnalisesTecnicas"
              value={data.resumoAnalisesTecnicas || ""}
              onChange={(e) => handleInputChange('resumoAnalisesTecnicas', e.target.value)}
              placeholder="Resumo consolidado das análises científica, de custos regulatórios, comercial e logística..."
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="pontosFortes">Pontos Fortes Identificados</Label>
            <Textarea
              id="pontosFortes"
              value={data.pontosFortes || ""}
              onChange={(e) => handleInputChange('pontosFortes', e.target.value)}
              placeholder="Liste os principais pontos fortes do produto/fornecedor..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="pontosFracos">Pontos Fracos e Riscos</Label>
            <Textarea
              id="pontosFracos"
              value={data.pontosFracos || ""}
              onChange={(e) => handleInputChange('pontosFracos', e.target.value)}
              placeholder="Liste os principais pontos fracos e riscos identificados..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recomendação Final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="recomendacaoFinal">Recomendação</Label>
            <Select 
              value={data.recomendacaoFinal || ""} 
              onValueChange={(value) => handleInputChange('recomendacaoFinal', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a recomendação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aprovar">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Aprovar
                  </div>
                </SelectItem>
                <SelectItem value="Aprovar com Ressalvas">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Aprovar com Ressalvas
                  </div>
                </SelectItem>
                <SelectItem value="Rejeitar">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Rejeitar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            {data.recomendacaoFinal && (
              <div className="mt-2">
                <Badge className={getRecomendacaoColor(data.recomendacaoFinal) + " text-white"}>
                  {getRecomendacaoIcon(data.recomendacaoFinal)}
                  <span className="ml-2">{data.recomendacaoFinal}</span>
                </Badge>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="justificativaRecomendacao">Justificativa da Recomendação</Label>
            <Textarea
              id="justificativaRecomendacao"
              value={data.justificativaRecomendacao || ""}
              onChange={(e) => handleInputChange('justificativaRecomendacao', e.target.value)}
              placeholder="Justifique tecnicamente a recomendação apresentada..."
              rows={5}
              required
            />
          </div>

          {data.recomendacaoFinal === 'Aprovar com Ressalvas' && (
            <div>
              <Label htmlFor="condicoesAprovacao">Condições para Aprovação</Label>
              <Textarea
                id="condicoesAprovacao"
                value={data.condicoesAprovacao || ""}
                onChange={(e) => handleInputChange('condicoesAprovacao', e.target.value)}
                placeholder="Liste as condições que devem ser atendidas para aprovação..."
                rows={4}
              />
            </div>
          )}

          <div>
            <Label htmlFor="proximosPassos">Próximos Passos</Label>
            <Textarea
              id="proximosPassos"
              value={data.proximosPassos || ""}
              onChange={(e) => handleInputChange('proximosPassos', e.target.value)}
              placeholder="Descreva os próximos passos do processo..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Anexos e Documentação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="documentosAnexos">Documentos de Referência</Label>
            <Textarea
              id="documentosAnexos"
              value={data.documentosAnexos || ""}
              onChange={(e) => handleInputChange('documentosAnexos', e.target.value)}
              placeholder="Liste os documentos utilizados como referência para este parecer..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="observacoesAdicionais">Observações Adicionais</Label>
            <Textarea
              id="observacoesAdicionais"
              value={data.observacoesAdicionais || ""}
              onChange={(e) => handleInputChange('observacoesAdicionais', e.target.value)}
              placeholder="Observações complementares ao parecer..."
              rows={3}
            />
          </div>

          <Separator />

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Assinatura Digital</h4>
            <div className="text-sm text-muted-foreground">
              <p>Este parecer será assinado digitalmente pelo responsável técnico.</p>
              <p className="mt-1">Data: {new Date().toLocaleDateString('pt-BR')}</p>
              <p>Responsável: {data.responsavelParecer || "[A definir]"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};