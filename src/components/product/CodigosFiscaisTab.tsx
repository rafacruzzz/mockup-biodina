
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductTabProps } from "@/types/product";

const CodigosFiscaisTab = ({ formData, onInputChange }: ProductTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">🧾 Códigos Fiscais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="codigoNCM" className="text-sm font-semibold">Código NCM *</Label>
            <Input
              id="codigoNCM"
              value={formData.codigoNCM}
              onChange={(e) => onInputChange('codigoNCM', e.target.value)}
              placeholder="0000.00.00"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Nomenclatura Comum do Mercosul</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cest" className="text-sm font-semibold">CEST</Label>
            <Input
              id="cest"
              value={formData.cest}
              onChange={(e) => onInputChange('cest', e.target.value)}
              placeholder="00.000.00"
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Código Especificador da Substituição Tributária</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="codigoEANPrimaria" className="text-sm font-semibold">Código EAN (GTIN) - Cx Primária</Label>
            <Input
              id="codigoEANPrimaria"
              value={formData.codigoEANPrimaria}
              onChange={(e) => onInputChange('codigoEANPrimaria', e.target.value)}
              placeholder="7891234567890"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="codigoEANSecundaria" className="text-sm font-semibold">Código EAN (GTIN) - Cx Secundária</Label>
            <Input
              id="codigoEANSecundaria"
              value={formData.codigoEANSecundaria}
              onChange={(e) => onInputChange('codigoEANSecundaria', e.target.value)}
              placeholder="7891234567891"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="codigoEANEmbarque" className="text-sm font-semibold">Código EAN (GTIN) - Cx Embarque</Label>
            <Input
              id="codigoEANEmbarque"
              value={formData.codigoEANEmbarque}
              onChange={(e) => onInputChange('codigoEANEmbarque', e.target.value)}
              placeholder="7891234567892"
              className="border-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodigosFiscaisTab;
