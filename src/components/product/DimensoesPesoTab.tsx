
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductTabProps } from "@/types/product";

const DimensoesPesoTab = ({ formData, onInputChange }: ProductTabProps) => {
  const renderBlock = (
    title: string,
    prefix: 'ComEmb' | 'SemEmb',
    emoji: string
  ) => {
    const peso_liq = `pesoLiquido${prefix}` as keyof typeof formData;
    const peso_bruto = `pesoBruto${prefix}` as keyof typeof formData;
    const altura = `altura${prefix}` as keyof typeof formData;
    const largura = `largura${prefix}` as keyof typeof formData;
    const prof = `profundidade${prefix}` as keyof typeof formData;

    const h = Number(formData[altura]) || 0;
    const w = Number(formData[largura]) || 0;
    const d = Number(formData[prof]) || 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue text-base">{emoji} {title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Peso Líquido (kg)</Label>
              <Input type="number" step="0.01" value={formData[peso_liq] as number} onChange={(e) => onInputChange(peso_liq as any, parseFloat(e.target.value) || 0)} placeholder="0.00" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Peso Bruto (kg)</Label>
              <Input type="number" step="0.01" value={formData[peso_bruto] as number} onChange={(e) => onInputChange(peso_bruto as any, parseFloat(e.target.value) || 0)} placeholder="0.00" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Altura (cm)</Label>
              <Input type="number" step="0.01" value={formData[altura] as number} onChange={(e) => onInputChange(altura as any, parseFloat(e.target.value) || 0)} placeholder="0.00" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Largura (cm)</Label>
              <Input type="number" step="0.01" value={formData[largura] as number} onChange={(e) => onInputChange(largura as any, parseFloat(e.target.value) || 0)} placeholder="0.00" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Profundidade (cm)</Label>
              <Input type="number" step="0.01" value={formData[prof] as number} onChange={(e) => onInputChange(prof as any, parseFloat(e.target.value) || 0)} placeholder="0.00" className="border-gray-300" />
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Volume calculado:</span> {(h * w * d / 1000000).toFixed(4)} m³</div>
              <div><span className="font-medium">Peso cubado:</span> {(h * w * d / 1000000 * 300).toFixed(2)} kg</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {renderBlock("Dimensões e Peso — Com Embalagem", "ComEmb", "📦")}
      {renderBlock("Dimensões e Peso — Sem Embalagem", "SemEmb", "📏")}
    </div>
  );
};

export default DimensoesPesoTab;
