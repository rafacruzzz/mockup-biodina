import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface AnaliseCientificaStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const AnaliseCientificaStep = ({ data, onChange }: AnaliseCientificaStepProps) => {
  const [analises, setAnalises] = useState(data.analiseCientifica || []);

  const perguntasPredefinidas = [
    "O produto possui registro vigente na ANVISA?",
    "As especificações técnicas estão de acordo com as normas brasileiras?",
    "A documentação técnica está completa e atualizada?",
    "O fabricante possui certificação ISO 13485?",
    "Existe comprovação de eficácia e segurança do produto?",
    "O produto atende aos requisitos da RDC relevante?",
    "As instruções de uso estão em português e completas?",
    "Existe análise de biocompatibilidade (quando aplicável)?",
    "O produto possui estudos clínicos comprobatórios?",
    "A rotulagem está conforme a legislação brasileira?"
  ];

  const handleAnaliseChange = (index: number, field: string, value: string) => {
    const updatedAnalises = [...analises];
    if (!updatedAnalises[index]) {
      updatedAnalises[index] = {};
    }
    updatedAnalises[index] = {
      ...updatedAnalises[index],
      pergunta: perguntasPredefinidas[index],
      [field]: value
    };
    setAnalises(updatedAnalises);
    onChange({ ...data, analiseCientifica: updatedAnalises });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Validado':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'Parcialmente Validado':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Não Validado':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validado':
        return 'bg-green-500';
      case 'Parcialmente Validado':
        return 'bg-yellow-500';
      case 'Não Validado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Análise Científica do Produto</CardTitle>
          <div className="text-sm text-muted-foreground">
            Avalie cada aspecto científico e técnico do produto do fornecedor.
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {perguntasPredefinidas.map((pergunta, index) => {
              const analise = analises[index] || {};
              return (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">
                          Questão {index + 1}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {pergunta}
                        </p>
                      </div>
                      {analise.statusValidacao && (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(analise.statusValidacao)}
                          <Badge className={getStatusColor(analise.statusValidacao) + " text-white"}>
                            {analise.statusValidacao}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`resposta-${index}`}>Resposta *</Label>
                      <Textarea
                        id={`resposta-${index}`}
                        value={analise.resposta || ""}
                        onChange={(e) => handleAnaliseChange(index, 'resposta', e.target.value)}
                        placeholder="Forneça uma resposta detalhada para esta questão..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`status-${index}`}>Status de Validação *</Label>
                        <Select 
                          value={analise.statusValidacao || ""} 
                          onValueChange={(value) => handleAnaliseChange(index, 'statusValidacao', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Validado">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Validado
                              </div>
                            </SelectItem>
                            <SelectItem value="Parcialmente Validado">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                Parcialmente Validado
                              </div>
                            </SelectItem>
                            <SelectItem value="Não Validado">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-600" />
                                Não Validado
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`observacoes-${index}`}>Observações</Label>
                        <Textarea
                          id={`observacoes-${index}`}
                          value={analise.observacoes || ""}
                          onChange={(e) => handleAnaliseChange(index, 'observacoes', e.target.value)}
                          placeholder="Observações adicionais..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo da Análise Científica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Validado', 'Parcialmente Validado', 'Não Validado'].map((status) => {
              const count = analises.filter(analise => analise?.statusValidacao === status).length;
              return (
                <div key={status} className="text-center">
                  <div className={`w-12 h-12 rounded-full ${getStatusColor(status)} mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg`}>
                    {count}
                  </div>
                  <p className="text-sm font-medium">{status}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Conclusão da Análise Científica</h4>
            <Textarea
              value={data.conclusaoAnaliseCientifica || ""}
              onChange={(e) => onChange({ ...data, conclusaoAnaliseCientifica: e.target.value })}
              placeholder="Escreva uma conclusão geral da análise científica..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};