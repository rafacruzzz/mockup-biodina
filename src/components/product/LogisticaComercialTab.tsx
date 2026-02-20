import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductTabProps } from "@/types/product";

const LogisticaComercialTab = ({ formData, onInputChange }: ProductTabProps) => {
  const tiposItemBlocoK = [
    "00 - Mercadoria para Revenda", "01 - Matéria Prima", "02 - Embalagem",
    "03 - Produto em Processo", "04 - Produto Acabado", "05 - Subproduto",
    "06 - Produto Intermediário", "07 - Material de Uso e Consumo", "08 - Ativo Imobilizado",
    "09 - Serviços", "10 - Outros insumos", "99 - Outras"
  ];
  const origenseMercadoria = [
    "0 - Nacional", "1 - Estrangeira - Importação direta", "2 - Estrangeira - Adquirida no mercado interno",
    "3 - Nacional - Mercadoria com Conteúdo de Importação superior a 40%", "4 - Nacional - Produção básica",
    "5 - Nacional - Produção por encomenda", "6 - Estrangeira - Importação direta sem similar nacional",
    "7 - Estrangeira - Adquirida no mercado interno sem similar nacional",
    "8 - Nacional - Mercadoria com Conteúdo de Importação superior a 70%"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-imuv-blue">🚚 Logística e Comercial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="diasGarantia" className="text-sm font-semibold">Dias de Garantia</Label>
            <Input id="diasGarantia" type="number" value={formData.diasGarantia} onChange={(e) => onInputChange('diasGarantia', parseInt(e.target.value) || 0)} placeholder="0" className="border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leadtimeRessuprimento" className="text-sm font-semibold">Leadtime de Ressuprimento</Label>
            <Input id="leadtimeRessuprimento" type="number" value={formData.leadtimeRessuprimento} onChange={(e) => onInputChange('leadtimeRessuprimento', parseInt(e.target.value) || 0)} placeholder="0" className="border-gray-300" />
            <p className="text-xs text-gray-500">Dias para reposição</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="diasCrossdocking" className="text-sm font-semibold">Dias de Crossdocking</Label>
            <Input id="diasCrossdocking" type="number" value={formData.diasCrossdocking} onChange={(e) => onInputChange('diasCrossdocking', parseInt(e.target.value) || 0)} placeholder="0" className="border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoItemBlocoK" className="text-sm font-semibold">Tipo do Item (Bloco K)</Label>
            <Select value={formData.tipoItemBlocoK} onValueChange={(value) => onInputChange('tipoItemBlocoK', value)}>
              <SelectTrigger className="border-gray-300"><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
              <SelectContent>{tiposItemBlocoK.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="origemMercadoria" className="text-sm font-semibold">Origem da Mercadoria</Label>
            <Select value={formData.origemMercadoria} onValueChange={(value) => onInputChange('origemMercadoria', value)}>
              <SelectTrigger className="border-gray-300"><SelectValue placeholder="Selecione a origem" /></SelectTrigger>
              <SelectContent>{origenseMercadoria.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-imuv-blue">Configurações Comerciais</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="cupomFiscalPDV" checked={formData.cupomFiscalPDV} onCheckedChange={(checked) => onInputChange('cupomFiscalPDV', checked)} />
              <Label htmlFor="cupomFiscalPDV" className="text-sm font-semibold">Cupom Fiscal (PDV)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="marketplace" checked={formData.marketplace} onCheckedChange={(checked) => onInputChange('marketplace', checked)} />
              <Label htmlFor="marketplace" className="text-sm font-semibold">Marketplace</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogisticaComercialTab;
