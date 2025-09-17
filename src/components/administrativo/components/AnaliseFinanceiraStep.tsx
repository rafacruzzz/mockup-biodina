import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AnaliseFinanceiraStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const AnaliseFinanceiraStep = ({ data, onChange }: AnaliseFinanceiraStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const calculateROI = () => {
    const investimento = parseFloat(data.investimentoInicial?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const receitaAnual = parseFloat(data.receitaAnualProjetada?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const custoAnual = parseFloat(data.custoAnualTotal?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    
    if (investimento > 0) {
      const lucroAnual = receitaAnual - custoAnual;
      const roi = (lucroAnual / investimento) * 100;
      return roi.toFixed(2);
    }
    return "0.00";
  };

  const calculatePayback = () => {
    const investimento = parseFloat(data.investimentoInicial?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const receitaAnual = parseFloat(data.receitaAnualProjetada?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const custoAnual = parseFloat(data.custoAnualTotal?.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    
    const lucroAnual = receitaAnual - custoAnual;
    
    if (lucroAnual > 0) {
      const payback = investimento / lucroAnual;
      return payback.toFixed(1);
    }
    return "N/A";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Investimento Inicial</CardTitle>
          <div className="text-sm text-muted-foreground">
            Analise todos os custos iniciais necessários para iniciar a operação.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="investimentoInicial">Investimento Inicial Total</Label>
              <Input
                id="investimentoInicial"
                value={data.investimentoInicial || ""}
                onChange={(e) => handleInputChange('investimentoInicial', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="capitalGiro">Capital de Giro</Label>
              <Input
                id="capitalGiro"
                value={data.capitalGiro || ""}
                onChange={(e) => handleInputChange('capitalGiro', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="custosRegulatóriosIniciais">Custos Regulatórios Iniciais</Label>
              <Input
                id="custosRegulatóriosIniciais"
                value={data.custosRegulatóriosIniciais || ""}
                onChange={(e) => handleInputChange('custosRegulatóriosIniciais', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custosMarketingLancamento">Marketing de Lançamento</Label>
              <Input
                id="custosMarketingLancamento"
                value={data.custosMarketingLancamento || ""}
                onChange={(e) => handleInputChange('custosMarketingLancamento', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="outrosInvestimentos">Outros Investimentos</Label>
            <Textarea
              id="outrosInvestimentos"
              value={data.outrosInvestimentos || ""}
              onChange={(e) => handleInputChange('outrosInvestimentos', e.target.value)}
              placeholder="Descreva outros investimentos necessários..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Projeção Financeira</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="receitaAnualProjetada">Receita Anual Projetada (Ano 1)</Label>
              <Input
                id="receitaAnualProjetada"
                value={data.receitaAnualProjetada || ""}
                onChange={(e) => handleInputChange('receitaAnualProjetada', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custoAnualTotal">Custo Anual Total</Label>
              <Input
                id="custoAnualTotal"
                value={data.custoAnualTotal || ""}
                onChange={(e) => handleInputChange('custoAnualTotal', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="lucroAnualProjetado">Lucro Anual Projetado</Label>
              <Input
                id="lucroAnualProjetado"
                value={data.lucroAnualProjetado || ""}
                onChange={(e) => handleInputChange('lucroAnualProjetado', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="crescimentoAno2">Crescimento Projetado Ano 2 (%)</Label>
              <Input
                id="crescimentoAno2"
                type="number"
                value={data.crescimentoAno2 || ""}
                onChange={(e) => handleInputChange('crescimentoAno2', e.target.value)}
                placeholder="Ex: 25"
              />
            </div>

            <div>
              <Label htmlFor="crescimentoAno3">Crescimento Projetado Ano 3 (%)</Label>
              <Input
                id="crescimentoAno3"
                type="number"
                value={data.crescimentoAno3 || ""}
                onChange={(e) => handleInputChange('crescimentoAno3', e.target.value)}
                placeholder="Ex: 35"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Indicadores Financeiros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <Label className="text-sm font-medium text-muted-foreground">ROI (Return on Investment)</Label>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {calculateROI()}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Retorno sobre investimento anual
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <Label className="text-sm font-medium text-muted-foreground">Payback</Label>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                {calculatePayback()} {calculatePayback() !== "N/A" ? "anos" : ""}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Tempo de retorno do investimento
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="margemLucroProjetada">Margem de Lucro Projetada (%)</Label>
              <Input
                id="margemLucroProjetada"
                type="number"
                value={data.margemLucroProjetada || ""}
                onChange={(e) => handleInputChange('margemLucroProjetada', e.target.value)}
                placeholder="Ex: 35"
              />
            </div>

            <div>
              <Label htmlFor="pontoEquilibrio">Ponto de Equilíbrio (unidades/mês)</Label>
              <Input
                id="pontoEquilibrio"
                type="number"
                value={data.pontoEquilibrio || ""}
                onChange={(e) => handleInputChange('pontoEquilibrio', e.target.value)}
                placeholder="Ex: 25"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Análise de Riscos Financeiros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="riscosFinanceiros">Riscos Financeiros Identificados</Label>
            <Textarea
              id="riscosFinanceiros"
              value={data.riscosFinanceiros || ""}
              onChange={(e) => handleInputChange('riscosFinanceiros', e.target.value)}
              placeholder="Liste os principais riscos financeiros do projeto..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="estrategiasMitigacao">Estratégias de Mitigação</Label>
            <Textarea
              id="estrategiasMitigacao"
              value={data.estrategiasMitigacao || ""}
              onChange={(e) => handleInputChange('estrategiasMitigacao', e.target.value)}
              placeholder="Descreva as estratégias para mitigar os riscos financeiros..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="cenarios">Análise de Cenários</Label>
            <Textarea
              id="cenarios"
              value={data.cenarios || ""}
              onChange={(e) => handleInputChange('cenarios', e.target.value)}
              placeholder="Descreva cenários otimista, realista e pessimista..."
              rows={4}
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="recomendacaoFinanceira">Recomendação Financeira</Label>
            <Textarea
              id="recomendacaoFinanceira"
              value={data.recomendacaoFinanceira || ""}
              onChange={(e) => handleInputChange('recomendacaoFinanceira', e.target.value)}
              placeholder="Forneça sua recomendação financeira baseada na análise..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo Executivo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Investimento</div>
              <div className="font-semibold">{data.investimentoInicial || "R$ 0,00"}</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">ROI Anual</div>
              <div className="font-semibold text-green-600">{calculateROI()}%</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Payback</div>
              <div className="font-semibold text-blue-600">{calculatePayback()} anos</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Receita Ano 1</div>
              <div className="font-semibold">{data.receitaAnualProjetada || "R$ 0,00"}</div>
            </div>
          </div>

          <div>
            <Label htmlFor="conclusaoFinanceira">Conclusão da Análise Financeira</Label>
            <Textarea
              id="conclusaoFinanceira"
              value={data.conclusaoFinanceira || ""}
              onChange={(e) => handleInputChange('conclusaoFinanceira', e.target.value)}
              placeholder="Conclusão geral sobre a viabilidade financeira do projeto..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};