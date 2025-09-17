import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface AnaliseLogisticaStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const AnaliseLogisticaStep = ({ data, onChange }: AnaliseLogisticaStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custos Logísticos</CardTitle>
          <div className="text-sm text-muted-foreground">
            Analise todos os custos envolvidos no processo logístico.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="custoFreteInternacional">Frete Internacional</Label>
              <Input
                id="custoFreteInternacional"
                value={data.custoFreteInternacional || ""}
                onChange={(e) => handleInputChange('custoFreteInternacional', e.target.value)}
                placeholder="USD$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custoSeguroInternacional">Seguro Internacional</Label>
              <Input
                id="custoSeguroInternacional"
                value={data.custoSeguroInternacional || ""}
                onChange={(e) => handleInputChange('custoSeguroInternacional', e.target.value)}
                placeholder="USD$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taxasImportacao">Taxas de Importação (%)</Label>
              <Input
                id="taxasImportacao"
                type="number"
                value={data.taxasImportacao || ""}
                onChange={(e) => handleInputChange('taxasImportacao', e.target.value)}
                placeholder="Ex: 12"
              />
            </div>

            <div>
              <Label htmlFor="custoDesembaraco">Desembaraço Aduaneiro</Label>
              <Input
                id="custoDesembaraco"
                value={data.custoDesembaraco || ""}
                onChange={(e) => handleInputChange('custoDesembaraco', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="custoArmazenagem">Armazenagem (mensal)</Label>
              <Input
                id="custoArmazenagem"
                value={data.custoArmazenagem || ""}
                onChange={(e) => handleInputChange('custoArmazenagem', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custoDistribuicaoNacional">Distribuição Nacional</Label>
              <Input
                id="custoDistribuicaoNacional"
                value={data.custoDistribuicaoNacional || ""}
                onChange={(e) => handleInputChange('custoDistribuicaoNacional', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Planejamento Logístico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tempoTransitoInternacional">Tempo de Trânsito Internacional (dias)</Label>
              <Input
                id="tempoTransitoInternacional"
                type="number"
                value={data.tempoTransitoInternacional || ""}
                onChange={(e) => handleInputChange('tempoTransitoInternacional', e.target.value)}
                placeholder="Ex: 30"
              />
            </div>

            <div>
              <Label htmlFor="frequenciaReposicao">Frequência de Reposição</Label>
              <Select 
                value={data.frequenciaReposicao || ""} 
                onValueChange={(value) => handleInputChange('frequenciaReposicao', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Bimestral">Bimestral</SelectItem>
                  <SelectItem value="Trimestral">Trimestral</SelectItem>
                  <SelectItem value="Semestral">Semestral</SelectItem>
                  <SelectItem value="Anual">Anual</SelectItem>
                  <SelectItem value="Sob Demanda">Sob Demanda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loteMinimo">Lote Mínimo de Pedido</Label>
              <Input
                id="loteMinimo"
                type="number"
                value={data.loteMinimo || ""}
                onChange={(e) => handleInputChange('loteMinimo', e.target.value)}
                placeholder="Ex: 50"
              />
            </div>

            <div>
              <Label htmlFor="estoqueSeguranca">Estoque de Segurança (dias)</Label>
              <Input
                id="estoqueSeguranca"
                type="number"
                value={data.estoqueSeguranca || ""}
                onChange={(e) => handleInputChange('estoqueSeguranca', e.target.value)}
                placeholder="Ex: 60"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="condicoesArmazenamento">Condições de Armazenamento</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="temperaturaControlada"
                  checked={data.temperaturaControlada || false}
                  onCheckedChange={(checked) => handleInputChange('temperaturaControlada', checked)}
                />
                <Label htmlFor="temperaturaControlada">Temperatura Controlada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="umidadeControlada"
                  checked={data.umidadeControlada || false}
                  onCheckedChange={(checked) => handleInputChange('umidadeControlada', checked)}
                />
                <Label htmlFor="umidadeControlada">Umidade Controlada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="protecaoLuz"
                  checked={data.protecaoLuz || false}
                  onCheckedChange={(checked) => handleInputChange('protecaoLuz', checked)}
                />
                <Label htmlFor="protecaoLuz">Proteção contra Luz</Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoesArmazenamento">Observações sobre Armazenamento</Label>
            <Textarea
              id="observacoesArmazenamento"
              value={data.observacoesArmazenamento || ""}
              onChange={(e) => handleInputChange('observacoesArmazenamento', e.target.value)}
              placeholder="Detalhes específicos sobre condições de armazenamento..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riscos e Contingências</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="riscosLogisticos">Riscos Logísticos Identificados</Label>
            <Textarea
              id="riscosLogisticos"
              value={data.riscosLogisticos || ""}
              onChange={(e) => handleInputChange('riscosLogisticos', e.target.value)}
              placeholder="Liste os principais riscos logísticos..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="planoContingencia">Plano de Contingência</Label>
            <Textarea
              id="planoContingencia"
              value={data.planoContingencia || ""}
              onChange={(e) => handleInputChange('planoContingencia', e.target.value)}
              placeholder="Descreva as ações de contingência para os riscos identificados..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="fornecedoresAlternativos">Fornecedores/Parceiros Alternativos</Label>
            <Textarea
              id="fornecedoresAlternativos"
              value={data.fornecedoresAlternativos || ""}
              onChange={(e) => handleInputChange('fornecedoresAlternativos', e.target.value)}
              placeholder="Liste fornecedores ou parceiros alternativos..."
              rows={3}
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="conclusaoAnaliseLogistica">Conclusão da Análise Logística</Label>
            <Textarea
              id="conclusaoAnaliseLogistica"
              value={data.conclusaoAnaliseLogistica || ""}
              onChange={(e) => handleInputChange('conclusaoAnaliseLogistica', e.target.value)}
              placeholder="Conclusão geral sobre a viabilidade logística..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};