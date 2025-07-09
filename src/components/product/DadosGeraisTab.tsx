
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductTabProps } from "@/types/product";

const DadosGeraisTab = ({ formData, onInputChange }: ProductTabProps) => {
  const familiasProduto = [
    "Medicamentos",
    "Equipamentos Médicos",
    "Materiais Hospitalares",
    "Produtos de Higiene",
    "Suplementos"
  ];

  const marcas = [
    "EMS",
    "Eurofarma",
    "Medley",
    "Germed",
    "Biosintética"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">🟦 Dados Gerais do Produto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="codigo" className="text-sm font-semibold">Código *</Label>
            <Input
              id="codigo"
              value={formData.codigo}
              onChange={(e) => onInputChange('codigo', e.target.value)}
              placeholder="Ex: PRD001"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="familiaProduto" className="text-sm font-semibold">Família de Produto *</Label>
            <Select value={formData.familiaProduto} onValueChange={(value) => onInputChange('familiaProduto', value)}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Selecione a família" />
              </SelectTrigger>
              <SelectContent>
                {familiasProduto.map((familia) => (
                  <SelectItem key={familia} value={familia}>{familia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marca" className="text-sm font-semibold">Marca</Label>
            <Select value={formData.marca} onValueChange={(value) => onInputChange('marca', value)}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>
              <SelectContent>
                {marcas.map((marca) => (
                  <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelo" className="text-sm font-semibold">Modelo</Label>
            <Input
              id="modelo"
              value={formData.modelo}
              onChange={(e) => onInputChange('modelo', e.target.value)}
              placeholder="Ex: Modelo ABC"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="vendidoPorUnidade"
                checked={formData.vendidoPorUnidade}
                onCheckedChange={(checked) => onInputChange('vendidoPorUnidade', checked)}
              />
              <Label htmlFor="vendidoPorUnidade" className="text-sm font-semibold">
                Vendido por Unidade
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao" className="text-sm font-semibold">Descrição *</Label>
          <Textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) => onInputChange('descricao', e.target.value)}
            placeholder="Descreva detalhadamente o produto..."
            className="border-gray-300 min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DadosGeraisTab;
