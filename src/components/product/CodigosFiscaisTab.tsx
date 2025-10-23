
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

          <div className="space-y-2">
            <Label htmlFor="origemProdutoICMS" className="text-sm font-semibold">Origem do Produto Conforme ICMS</Label>
            <Select
              value={formData.origemProdutoICMS}
              onValueChange={(value) => onInputChange('origemProdutoICMS', value)}
            >
              <SelectTrigger id="origemProdutoICMS" className="border-gray-300">
                <SelectValue placeholder="Selecione a origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - Nacional, exceto as indicadas nos códigos 3 a 5</SelectItem>
                <SelectItem value="1">1 - Estrangeira - Importação direta, exceto a indicada no código 6</SelectItem>
                <SelectItem value="2">2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</SelectItem>
                <SelectItem value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%</SelectItem>
                <SelectItem value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes</SelectItem>
                <SelectItem value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</SelectItem>
                <SelectItem value="6">6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX</SelectItem>
                <SelectItem value="7">7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX</SelectItem>
                <SelectItem value="8">8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodigosFiscaisTab;
