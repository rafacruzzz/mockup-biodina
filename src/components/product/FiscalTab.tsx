
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FiscalTabProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const FiscalTab = ({ formData, onInputChange }: FiscalTabProps) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Informações Fiscais Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Fiscais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="grupoTributario">Grupo Tributário</Label>
            <Select onValueChange={(value) => onInputChange("grupoTributario", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grupo1">Grupo Tributário A</SelectItem>
                <SelectItem value="grupo2">Grupo Tributário B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cfopPadrao">CFOP Padrão</Label>
            <Input
              id="cfopPadrao"
              value={formData.cfopPadrao}
              onChange={(e) => onInputChange("cfopPadrao", e.target.value)}
              placeholder="5102"
            />
          </div>
          <div>
            <Label htmlFor="ncm">Código NCM</Label>
            <Input
              id="ncm"
              value={formData.ncm}
              onChange={(e) => onInputChange("ncm", e.target.value)}
              placeholder="00000000"
            />
          </div>
          <div>
            <Label htmlFor="cest">Código CEST</Label>
            <Input
              id="cest"
              value={formData.cest}
              onChange={(e) => onInputChange("cest", e.target.value)}
              placeholder="0000000"
            />
          </div>
          <div>
            <Label htmlFor="origemMercadoria">Origem da Mercadoria</Label>
            <Select onValueChange={(value) => onInputChange("origemMercadoria", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - Nacional</SelectItem>
                <SelectItem value="1">1 - Estrangeira (importação direta)</SelectItem>
                <SelectItem value="2">2 - Estrangeira (adquirida no mercado interno)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="situacaoTributariaIPI">Situação Tributária IPI</Label>
            <Select onValueChange={(value) => onInputChange("situacaoTributariaIPI", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="00">00 - Entrada com recuperação de crédito</SelectItem>
                <SelectItem value="49">49 - Outras entradas</SelectItem>
                <SelectItem value="50">50 - Saída tributada</SelectItem>
                <SelectItem value="99">99 - Outras saídas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Códigos e Benefícios */}
      <Card>
        <CardHeader>
          <CardTitle>Códigos e Benefícios</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="exTipi">EX TIPI</Label>
            <Input
              id="exTipi"
              value={formData.exTipi}
              onChange={(e) => onInputChange("exTipi", e.target.value)}
              placeholder="00"
            />
          </div>
          <div>
            <Label htmlFor="codigoBeneficioFiscal">Código de Benefício Fiscal</Label>
            <Input
              id="codigoBeneficioFiscal"
              value={formData.codigoBeneficioFiscal}
              onChange={(e) => onInputChange("codigoBeneficioFiscal", e.target.value)}
              placeholder="Digite o código"
            />
          </div>
          <div>
            <Label htmlFor="fabricante">Fabricante</Label>
            <Input
              id="fabricante"
              value={formData.fabricante}
              onChange={(e) => onInputChange("fabricante", e.target.value)}
              placeholder="Nome do fabricante"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="produzidoEscalaNaoRelevante"
              checked={formData.produzidoEscalaNaoRelevante}
              onCheckedChange={(checked) => onInputChange("produzidoEscalaNaoRelevante", checked)}
            />
            <Label htmlFor="produzidoEscalaNaoRelevante">Produzido em Escala Não Relevante</Label>
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais NFe */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais para NFe</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="informacoesAdicionaisNFe"
            value={formData.informacoesAdicionaisNFe}
            onChange={(e) => onInputChange("informacoesAdicionaisNFe", e.target.value)}
            placeholder="Informações que aparecerão na NFe..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Seção Avançado */}
      <Card>
        <CardHeader>
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <CardTitle>Configurações Avançadas</CardTitle>
              <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exigeRastreabilidadeLotes"
                      checked={formData.exigeRastreabilidadeLotes}
                      onCheckedChange={(checked) => onInputChange("exigeRastreabilidadeLotes", checked)}
                    />
                    <Label htmlFor="exigeRastreabilidadeLotes">Produto exige rastreabilidade de lotes?</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exigeGrupoMed"
                      checked={formData.exigeGrupoMed}
                      onCheckedChange={(checked) => onInputChange("exigeGrupoMed", checked)}
                    />
                    <Label htmlFor="exigeGrupoMed">Exige Grupo MED</Label>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FiscalTab;
