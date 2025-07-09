
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductTabProps } from "@/types/product";

const DimensoesPesoTab = ({ formData, onInputChange }: ProductTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">⚖️ Dimensões e Peso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pesoLiquido" className="text-sm font-semibold">Peso Líquido (kg)</Label>
            <Input
              id="pesoLiquido"
              type="number"
              step="0.01"
              value={formData.pesoLiquido}
              onChange={(e) => onInputChange('pesoLiquido', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pesoBruto" className="text-sm font-semibold">Peso Bruto (kg)</Label>
            <Input
              id="pesoBruto"
              type="number"
              step="0.01"
              value={formData.pesoBruto}
              onChange={(e) => onInputChange('pesoBruto', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="altura" className="text-sm font-semibold">Altura (cm)</Label>
            <Input
              id="altura"
              type="number"
              step="0.01"
              value={formData.altura}
              onChange={(e) => onInputChange('altura', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="largura" className="text-sm font-semibold">Largura (cm)</Label>
            <Input
              id="largura"
              type="number"
              step="0.01"
              value={formData.largura}
              onChange={(e) => onInputChange('largura', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profundidade" className="text-sm font-semibold">Profundidade (cm)</Label>
            <Input
              id="profundidade"
              type="number"
              step="0.01"
              value={formData.profundidade}
              onChange={(e) => onInputChange('profundidade', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="border-gray-300"
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-biodina-blue mb-2">Informações de Dimensões</h4>
          <p className="text-sm text-gray-600 mb-2">
            Essas informações são essenciais para cálculos de frete e armazenamento.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Volume calculado:</span> {(formData.altura * formData.largura * formData.profundidade / 1000000).toFixed(4)} m³
            </div>
            <div>
              <span className="font-medium">Peso cubado:</span> {(formData.altura * formData.largura * formData.profundidade / 1000000 * 300).toFixed(2)} kg
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensoesPesoTab;
