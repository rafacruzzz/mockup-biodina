import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AnaliseComercialStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const AnaliseComercialStep = ({ data, onChange }: AnaliseComercialStepProps) => {
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
          <CardTitle className="text-base">Análise de Mercado</CardTitle>
          <div className="text-sm text-muted-foreground">
            Avalie o potencial comercial do produto no mercado brasileiro.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tamanhoMercado">Tamanho do Mercado Alvo</Label>
              <Input
                id="tamanhoMercado"
                value={data.tamanhoMercado || ""}
                onChange={(e) => handleInputChange('tamanhoMercado', e.target.value)}
                placeholder="Ex: R$ 100 milhões"
              />
            </div>

            <div>
              <Label htmlFor="crescimentoMercado">Taxa de Crescimento do Mercado (%)</Label>
              <Input
                id="crescimentoMercado"
                type="number"
                value={data.crescimentoMercado || ""}
                onChange={(e) => handleInputChange('crescimentoMercado', e.target.value)}
                placeholder="Ex: 15"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="segmentoAlvo">Segmento Alvo</Label>
            <Select 
              value={data.segmentoAlvo || ""} 
              onValueChange={(value) => handleInputChange('segmentoAlvo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hospitalar">Hospitalar</SelectItem>
                <SelectItem value="Clínicas">Clínicas</SelectItem>
                <SelectItem value="Laboratórios">Laboratórios</SelectItem>
                <SelectItem value="Home Care">Home Care</SelectItem>
                <SelectItem value="Governo">Governo</SelectItem>
                <SelectItem value="Múltiplos Segmentos">Múltiplos Segmentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="analiseCompetitiva">Análise Competitiva</Label>
            <Textarea
              id="analiseCompetitiva"
              value={data.analiseCompetitiva || ""}
              onChange={(e) => handleInputChange('analiseCompetitiva', e.target.value)}
              placeholder="Descreva os principais concorrentes e suas características..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Precificação e Rentabilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="precoFornecedor">Preço do Fornecedor (FOB)</Label>
              <Input
                id="precoFornecedor"
                value={data.precoFornecedor || ""}
                onChange={(e) => handleInputChange('precoFornecedor', e.target.value)}
                placeholder="USD$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="custoImportacao">Custo de Importação</Label>
              <Input
                id="custoImportacao"
                value={data.custoImportacao || ""}
                onChange={(e) => handleInputChange('custoImportacao', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="precoVendaSugerido">Preço de Venda Sugerido</Label>
              <Input
                id="precoVendaSugerido"
                value={data.precoVendaSugerido || ""}
                onChange={(e) => handleInputChange('precoVendaSugerido', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="margemLucroBruta">Margem de Lucro Bruta (%)</Label>
              <Input
                id="margemLucroBruta"
                type="number"
                value={data.margemLucroBruta || ""}
                onChange={(e) => handleInputChange('margemLucroBruta', e.target.value)}
                placeholder="Ex: 45"
              />
            </div>

            <div>
              <Label htmlFor="volumeVendasEstimado">Volume de Vendas Estimado (anual)</Label>
              <Input
                id="volumeVendasEstimado"
                type="number"
                value={data.volumeVendasEstimado || ""}
                onChange={(e) => handleInputChange('volumeVendasEstimado', e.target.value)}
                placeholder="Ex: 100"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="receitaEstimadaAnual">Receita Estimada Anual</Label>
            <Input
              id="receitaEstimadaAnual"
              value={data.receitaEstimadaAnual || ""}
              onChange={(e) => handleInputChange('receitaEstimadaAnual', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Estratégia Comercial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="canaisDistribuicao">Canais de Distribuição</Label>
            <Textarea
              id="canaisDistribuicao"
              value={data.canaisDistribuicao || ""}
              onChange={(e) => handleInputChange('canaisDistribuicao', e.target.value)}
              placeholder="Descreva os canais de distribuição planejados..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="estrategiaMarketing">Estratégia de Marketing</Label>
            <Textarea
              id="estrategiaMarketing"
              value={data.estrategiaMarketing || ""}
              onChange={(e) => handleInputChange('estrategiaMarketing', e.target.value)}
              placeholder="Descreva a estratégia de marketing e comunicação..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="vantagensCompetitivas">Vantagens Competitivas</Label>
            <Textarea
              id="vantagensCompetitivas"
              value={data.vantagensCompetitivas || ""}
              onChange={(e) => handleInputChange('vantagensCompetitivas', e.target.value)}
              placeholder="Liste as principais vantagens competitivas do produto..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="riscosComerciais">Riscos Comerciais</Label>
            <Textarea
              id="riscosComerciais"
              value={data.riscosComerciais || ""}
              onChange={(e) => handleInputChange('riscosComerciais', e.target.value)}
              placeholder="Identifique os principais riscos comerciais..."
              rows={3}
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="conclusaoAnaliseComercial">Conclusão da Análise Comercial</Label>
            <Textarea
              id="conclusaoAnaliseComercial"
              value={data.conclusaoAnaliseComercial || ""}
              onChange={(e) => handleInputChange('conclusaoAnaliseComercial', e.target.value)}
              placeholder="Conclusão geral sobre a viabilidade comercial do produto..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};