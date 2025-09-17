import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface ReuniãoDiretoriaStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const ReuniãoDiretoriaStep = ({ data, onChange }: ReuniãoDiretoriaStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const getDeliberacaoColor = (deliberacao: string) => {
    switch (deliberacao) {
      case 'Aprovado':
        return 'bg-green-500';
      case 'Aprovado com Ajustes':
        return 'bg-yellow-500';
      case 'Reprovado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDeliberacaoIcon = (deliberacao: string) => {
    switch (deliberacao) {
      case 'Aprovado':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'Aprovado com Ajustes':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Reprovado':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informações da Reunião</CardTitle>
          <div className="text-sm text-muted-foreground">
            Registre os detalhes da reunião da diretoria para deliberação final.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataReuniao">Data da Reunião *</Label>
              <Input
                id="dataReuniao"
                type="date"
                value={data.dataReuniao || ""}
                onChange={(e) => handleInputChange('dataReuniao', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="horarioReuniao">Horário da Reunião</Label>
              <Input
                id="horarioReuniao"
                type="time"
                value={data.horarioReuniao || ""}
                onChange={(e) => handleInputChange('horarioReuniao', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="participantesReuniao">Participantes da Reunião</Label>
            <Textarea
              id="participantesReuniao"
              value={data.participantesReuniao || ""}
              onChange={(e) => handleInputChange('participantesReuniao', e.target.value)}
              placeholder="Liste os participantes da reunião..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="apresentacaoConsolidada">Apresentação Consolidada</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Faça upload da apresentação consolidada
                </p>
                <p className="text-xs text-gray-500">
                  PDF, PPT, PPTX até 50MB
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                <FileText className="mr-2 h-4 w-4" />
                Selecionar Arquivo
              </Button>
            </div>
            {data.apresentacaoConsolidada && (
              <div className="mt-2 text-sm text-green-600">
                ✓ Arquivo anexado: {data.apresentacaoConsolidada}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Discussão Estratégica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="discussaoEstrategica">Resumo da Discussão *</Label>
            <Textarea
              id="discussaoEstrategica"
              value={data.discussaoEstrategica || ""}
              onChange={(e) => handleInputChange('discussaoEstrategica', e.target.value)}
              placeholder="Descreva os principais pontos discutidos na reunião..."
              rows={6}
              required
            />
          </div>

          <div>
            <Label htmlFor="questoesLevantadas">Questões Levantadas</Label>
            <Textarea
              id="questoesLevantadas"
              value={data.questoesLevantadas || ""}
              onChange={(e) => handleInputChange('questoesLevantadas', e.target.value)}
              placeholder="Liste as principais questões e dúvidas levantadas..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="respostasEsclarecimentos">Respostas e Esclarecimentos</Label>
            <Textarea
              id="respostasEsclarecimentos"
              value={data.respostasEsclarecimentos || ""}
              onChange={(e) => handleInputChange('respostasEsclarecimentos', e.target.value)}
              placeholder="Registre as respostas e esclarecimentos fornecidos..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Deliberação Final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="deliberacao">Deliberação *</Label>
            <Select 
              value={data.deliberacao || ""} 
              onValueChange={(value) => handleInputChange('deliberacao', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a deliberação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aprovado">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Aprovado
                  </div>
                </SelectItem>
                <SelectItem value="Aprovado com Ajustes">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Aprovado com Ajustes
                  </div>
                </SelectItem>
                <SelectItem value="Reprovado">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Reprovado
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            {data.deliberacao && (
              <div className="mt-2">
                <Badge className={getDeliberacaoColor(data.deliberacao) + " text-white"}>
                  {getDeliberacaoIcon(data.deliberacao)}
                  <span className="ml-2">{data.deliberacao}</span>
                </Badge>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="justificativaDeliberacao">Justificativa da Deliberação *</Label>
            <Textarea
              id="justificativaDeliberacao"
              value={data.justificativaDeliberacao || ""}
              onChange={(e) => handleInputChange('justificativaDeliberacao', e.target.value)}
              placeholder="Justifique a deliberação da diretoria..."
              rows={5}
              required
            />
          </div>

          {data.deliberacao === 'Aprovado com Ajustes' && (
            <div>
              <Label htmlFor="ajustesNecessarios">Ajustes Necessários</Label>
              <Textarea
                id="ajustesNecessarios"
                value={data.ajustesNecessarios || ""}
                onChange={(e) => handleInputChange('ajustesNecessarios', e.target.value)}
                placeholder="Detalhe os ajustes que devem ser implementados..."
                rows={4}
              />
            </div>
          )}

          {data.deliberacao === 'Reprovado' && (
            <div>
              <Label htmlFor="motivosReprovacao">Motivos da Reprovação</Label>
              <Textarea
                id="motivosReprovacao"
                value={data.motivosReprovacao || ""}
                onChange={(e) => handleInputChange('motivosReprovacao', e.target.value)}
                placeholder="Detalhe os motivos que levaram à reprovação..."
                rows={4}
              />
            </div>
          )}

          <div>
            <Label htmlFor="condicoesImplementacao">Condições para Implementação</Label>
            <Textarea
              id="condicoesImplementacao"
              value={data.condicoesImplementacao || ""}
              onChange={(e) => handleInputChange('condicoesImplementacao', e.target.value)}
              placeholder="Liste as condições estabelecidas para implementação..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registros e Follow-up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="registroEmAta"
                  checked={data.registroEmAta || false}
                  onCheckedChange={(checked) => handleInputChange('registroEmAta', checked)}
                />
                <Label htmlFor="registroEmAta">Registro em Ata *</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="atualizacaoERP"
                  checked={data.atualizacaoERP || false}
                  onCheckedChange={(checked) => handleInputChange('atualizacaoERP', checked)}
                />
                <Label htmlFor="atualizacaoERP">Atualização no ERP *</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="comunicacaoEquipes"
                  checked={data.comunicacaoEquipes || false}
                  onCheckedChange={(checked) => handleInputChange('comunicacaoEquipes', checked)}
                />
                <Label htmlFor="comunicacaoEquipes">Comunicação às Equipes</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="responsavelImplementacao">Responsável pela Implementação</Label>
              <Input
                id="responsavelImplementacao"
                value={data.responsavelImplementacao || ""}
                onChange={(e) => handleInputChange('responsavelImplementacao', e.target.value)}
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="proximasAcoes">Próximas Ações</Label>
            <Textarea
              id="proximasAcoes"
              value={data.proximasAcoes || ""}
              onChange={(e) => handleInputChange('proximasAcoes', e.target.value)}
              placeholder="Liste as próximas ações a serem tomadas..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prazoImplementacao">Prazo para Implementação</Label>
              <Input
                id="prazoImplementacao"
                type="date"
                value={data.prazoImplementacao || ""}
                onChange={(e) => handleInputChange('prazoImplementacao', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dataProximaRevisao">Data da Próxima Revisão</Label>
              <Input
                id="dataProximaRevisao"
                type="date"
                value={data.dataProximaRevisao || ""}
                onChange={(e) => handleInputChange('dataProximaRevisao', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="observacoesFinais">Observações Finais</Label>
            <Textarea
              id="observacoesFinais"
              value={data.observacoesFinais || ""}
              onChange={(e) => handleInputChange('observacoesFinais', e.target.value)}
              placeholder="Observações complementares sobre a deliberação..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-base text-green-800">Processo Concluído</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-green-700">
            <p className="mb-2">
              ✅ O processo de Due Diligence foi concluído com sucesso.
            </p>
            <p className="mb-2">
              📋 Todos os dados foram registrados e a deliberação da diretoria foi documentada.
            </p>
            <p>
              🔄 O sistema será atualizado automaticamente com a decisão final.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};