
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductTabProps } from "@/types/product";

const ApresentacoesTab = ({ formData, onInputChange }: ProductTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">📦 Apresentações do Produto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="apresentacaoPrimaria" className="text-sm font-semibold">Apresentação Primária</Label>
            <Input
              id="apresentacaoPrimaria"
              value={formData.apresentacaoPrimaria}
              onChange={(e) => onInputChange('apresentacaoPrimaria', e.target.value)}
              placeholder="Ex: Blister 10 comprimidos"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Menor unidade de venda</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apresentacaoSecundaria" className="text-sm font-semibold">Apresentação Secundária</Label>
            <Input
              id="apresentacaoSecundaria"
              value={formData.apresentacaoSecundaria}
              onChange={(e) => onInputChange('apresentacaoSecundaria', e.target.value)}
              placeholder="Ex: Caixa com 5 blisters"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Agrupamento intermediário</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apresentacaoEmbarque" className="text-sm font-semibold">Apresentação de Embarque</Label>
            <Input
              id="apresentacaoEmbarque"
              value={formData.apresentacaoEmbarque}
              onChange={(e) => onInputChange('apresentacaoEmbarque', e.target.value)}
              placeholder="Ex: Caixa master com 20 unidades"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Unidade de transporte/estoque</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApresentacoesTab;
