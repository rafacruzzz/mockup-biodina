
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ProductTabProps } from "@/types/product";
import { useState } from "react";

const ApresentacoesTab = ({ formData, onInputChange }: ProductTabProps) => {
  const [novaReferencia, setNovaReferencia] = useState("");

  const handleAddReferencia = () => {
    if (novaReferencia.trim() && !formData.referenciasComercializadas.includes(novaReferencia.trim())) {
      onInputChange('referenciasComercializadas', [...formData.referenciasComercializadas, novaReferencia.trim()]);
      setNovaReferencia("");
    }
  };

  const handleRemoveReferencia = (referenciaToRemove: string) => {
    onInputChange('referenciasComercializadas', 
      formData.referenciasComercializadas.filter(ref => ref !== referenciaToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddReferencia();
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Apresentações Básicas */}
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

      {/* Card Informações Complementares */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue">📋 Informações Complementares</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Referências Comercializadas</Label>
              <p className="text-xs text-gray-500 mb-2">
                Liste todas as referências/variações comercializadas deste produto
              </p>
              
              {/* Lista de referências existentes */}
              {formData.referenciasComercializadas.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                  {formData.referenciasComercializadas.map((referencia, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {referencia}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveReferencia(referencia)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Adicionar nova referência */}
              <div className="flex gap-2">
                <Input
                  value={novaReferencia}
                  onChange={(e) => setNovaReferencia(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: REF001 - Caixa 20 comprimidos"
                  className="border-gray-300"
                />
                <Button 
                  type="button" 
                  onClick={handleAddReferencia} 
                  variant="outline"
                  disabled={!novaReferencia.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApresentacoesTab;
