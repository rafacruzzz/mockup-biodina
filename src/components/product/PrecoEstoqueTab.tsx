
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoneyInput } from "@/components/ui/money-input";
import { ProductTabProps } from "@/types/product";

const PrecoEstoqueTab = ({ formData, onInputChange }: ProductTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">💰 Preço e Estoque</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="precoUnitarioVenda" className="text-sm font-semibold">Preço Unitário de Venda *</Label>
            <MoneyInput
              value={formData.precoUnitarioVenda.toString()}
              onChange={(value) => onInputChange('precoUnitarioVenda', parseFloat(value) / 100 || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estoqueFisico" className="text-sm font-semibold">Estoque Físico</Label>
            <Input
              id="estoqueFisico"
              type="number"
              value={formData.estoqueFisico}
              onChange={(e) => onInputChange('estoqueFisico', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Quantidade em estoque</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reservado" className="text-sm font-semibold">Reservado</Label>
            <Input
              id="reservado"
              type="number"
              value={formData.reservado}
              onChange={(e) => onInputChange('reservado', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Quantidade reservada</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estoqueDisponivel" className="text-sm font-semibold">Estoque Disponível</Label>
            <Input
              id="estoqueDisponivel"
              type="number"
              value={formData.estoqueDisponivel}
              readOnly
              className="border-gray-300 bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">Calculado automaticamente</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-biodina-blue mb-2">Cálculo do Estoque Disponível</h4>
          <p className="text-sm text-gray-600">
            Estoque Disponível = Estoque Físico - Reservado
          </p>
          <p className="text-sm font-medium text-biodina-blue mt-1">
            {formData.estoqueFisico} - {formData.reservado} = {formData.estoqueDisponivel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrecoEstoqueTab;
