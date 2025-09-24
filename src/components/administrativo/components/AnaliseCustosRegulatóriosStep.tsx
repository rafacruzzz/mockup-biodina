import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AnaliseCustosRegulatóriosStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const AnaliseCustosRegulatóriosStep = ({ data, onChange }: AnaliseCustosRegulatóriosStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(numericValue) / 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custos Regulatórios</CardTitle>
          <div className="text-sm text-muted-foreground">
            Analise todos os custos envolvidos no processo regulatório.
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taxaRegistroAnvisa">Taxa de Registro ANVISA</Label>
              <Input
                id="taxaRegistroAnvisa"
                value={data.taxaRegistroAnvisa || ""}
                onChange={(e) => handleInputChange('taxaRegistroAnvisa', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="taxaRevalidacaoAnvisa">Taxa de Revalidação ANVISA</Label>
              <Input
                id="taxaRevalidacaoAnvisa"
                value={data.taxaRevalidacaoAnvisa || ""}
                onChange={(e) => handleInputChange('taxaRevalidacaoAnvisa', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="custoBoasPraticas">Boas Práticas</Label>
              <Input
                id="custoBoasPraticas"
                value={data.custoBoasPraticas || ""}
                onChange={(e) => handleInputChange('custoBoasPraticas', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custoOrganismoCertificador">Organismo Certificador</Label>
              <Input
                id="custoOrganismoCertificador"
                value={data.custoOrganismoCertificador || ""}
                onChange={(e) => handleInputChange('custoOrganismoCertificador', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="custoOrganismoCertificador2">Organismo Certificador</Label>
              <Input
                id="custoOrganismoCertificador2"
                value={data.custoOrganismoCertificador2 || ""}
                onChange={(e) => handleInputChange('custoOrganismoCertificador2', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custoLaboratorio">Laboratório</Label>
              <Input
                id="custoLaboratorio"
                value={data.custoLaboratorio || ""}
                onChange={(e) => handleInputChange('custoLaboratorio', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label htmlFor="prazoRegistro">Prazo Estimado para Registro (meses)</Label>
            <Input
              id="prazoRegistro"
              type="number"
              value={data.prazoRegistro || ""}
              onChange={(e) => handleInputChange('prazoRegistro', e.target.value)}
              placeholder="Ex: 12"
            />
          </div>

          <div>
            <Label htmlFor="observacoesCustosRegulatórios">Observações sobre Custos Regulatórios</Label>
            <Textarea
              id="observacoesCustosRegulatórios"
              value={data.observacoesCustosRegulatórios || ""}
              onChange={(e) => handleInputChange('observacoesCustosRegulatórios', e.target.value)}
              placeholder="Detalhes adicionais sobre os custos regulatórios..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Análise de Viabilidade Regulatória</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="complexidadeRegulatoria">Complexidade Regulatória</Label>
            <Textarea
              id="complexidadeRegulatoria"
              value={data.complexidadeRegulatoria || ""}
              onChange={(e) => handleInputChange('complexidadeRegulatoria', e.target.value)}
              placeholder="Avalie a complexidade do processo regulatório..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="riscosRegulatórios">Riscos Regulatórios Identificados</Label>
            <Textarea
              id="riscosRegulatórios"
              value={data.riscosRegulatórios || ""}
              onChange={(e) => handleInputChange('riscosRegulatórios', e.target.value)}
              placeholder="Liste os principais riscos regulatórios..."
              rows={3}
            />
          </div>


          <div>
            <Label htmlFor="conclusaoViabilidadeRegulatoria">Conclusão da Viabilidade Regulatória</Label>
            <Textarea
              id="conclusaoViabilidadeRegulatoria"
              value={data.conclusaoViabilidadeRegulatoria || ""}
              onChange={(e) => handleInputChange('conclusaoViabilidadeRegulatoria', e.target.value)}
              placeholder="Conclusão sobre a viabilidade regulatória do produto..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};