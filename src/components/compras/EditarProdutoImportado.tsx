
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, Calendar, Hash, Percent } from "lucide-react";

interface EditarProdutoImportadoProps {
  produto: any;
  onClose: () => void;
  onSave: (produto: any) => void;
}

const EditarProdutoImportado = ({ produto, onClose, onSave }: EditarProdutoImportadoProps) => {
  const [produtoEditado, setProdutoEditado] = useState({ 
    ...produto,
    // Ensure tipoProduto has a default value if undefined
    tipoProduto: produto.tipoProduto || "Medicamento"
  });

  const handleSave = () => {
    onSave(produtoEditado);
  };

  const updateField = (field: string, value: any) => {
    setProdutoEditado(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAliquota = (field: string, value: number) => {
    setProdutoEditado(prev => ({
      ...prev,
      aliquotas: {
        ...prev.aliquotas,
        [field]: value
      }
    }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-biodina-blue flex items-center gap-2">
            <Badge className="h-5 w-5" />
            Editar Produto Importado
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="identificacao" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="identificacao">Identificação</TabsTrigger>
            <TabsTrigger value="controle">Controle de Lote/Série</TabsTrigger>
            <TabsTrigger value="aliquotas">Alíquotas</TabsTrigger>
          </TabsList>

          <TabsContent value="identificacao" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigoFornecedor">Código do Fornecedor</Label>
                <Input
                  id="codigoFornecedor"
                  value={produtoEditado.codigoFornecedor || ''}
                  onChange={(e) => updateField('codigoFornecedor', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo">Código do Produto</Label>
                <Input
                  id="codigo"
                  value={produtoEditado.codigo || ''}
                  onChange={(e) => updateField('codigo', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Nome do Produto</Label>
                <Input
                  id="descricao"
                  value={produtoEditado.descricao || ''}
                  onChange={(e) => updateField('descricao', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorUnitario">Valor Unitário</Label>
                <Input
                  id="valorUnitario"
                  type="number"
                  step="0.01"
                  value={produtoEditado.valorUnitario || ''}
                  onChange={(e) => updateField('valorUnitario', parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={produtoEditado.quantidade || ''}
                  onChange={(e) => updateField('quantidade', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ncm">NCM</Label>
                <Input
                  id="ncm"
                  value={produtoEditado.ncm || ''}
                  onChange={(e) => updateField('ncm', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoBarras">Código de Barras</Label>
                <Input
                  id="codigoBarras"
                  value={produtoEditado.codigoBarras || ''}
                  onChange={(e) => updateField('codigoBarras', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoProduto">Tipo do Produto</Label>
                <Select 
                  value={produtoEditado.tipoProduto} 
                  onValueChange={(value) => updateField('tipoProduto', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medicamento">Medicamento</SelectItem>
                    <SelectItem value="Equipamento">Equipamento</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Consumível">Consumível</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="controladoPorLote"
                    checked={produtoEditado.controladoPorLote || false}
                    onCheckedChange={(checked) => updateField('controladoPorLote', checked)}
                  />
                  <Label htmlFor="controladoPorLote">Controlado por lote</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requerNumeroSerie"
                    checked={produtoEditado.requerNumeroSerie || false}
                    onCheckedChange={(checked) => updateField('requerNumeroSerie', checked)}
                  />
                  <Label htmlFor="requerNumeroSerie">Requer número de série</Label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="controle" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Controle de Lote e Série</span>
              </div>
              <p className="text-sm text-blue-600">
                Gerencie as informações de rastreabilidade do produto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lote" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Lote
                  {produtoEditado.controladoPorLote && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  id="lote"
                  value={produtoEditado.lote || ''}
                  onChange={(e) => updateField('lote', e.target.value)}
                  className="bg-yellow-50 border-yellow-200"
                  required={produtoEditado.controladoPorLote}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroSerie" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Número de Série
                  {produtoEditado.requerNumeroSerie && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  id="numeroSerie"
                  value={produtoEditado.numeroSerie || ''}
                  onChange={(e) => updateField('numeroSerie', e.target.value)}
                  className="bg-blue-50 border-blue-200"
                  required={produtoEditado.requerNumeroSerie}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataValidade" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data de Validade
                </Label>
                <Input
                  id="dataValidade"
                  type="date"
                  value={produtoEditado.dataValidade || ''}
                  onChange={(e) => updateField('dataValidade', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataFabricacao" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data de Fabricação
                </Label>
                <Input
                  id="dataFabricacao"
                  type="date"
                  value={produtoEditado.dataFabricacao || ''}
                  onChange={(e) => updateField('dataFabricacao', e.target.value)}
                />
              </div>
            </div>

            {(produtoEditado.controladoPorLote || produtoEditado.requerNumeroSerie) && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  ✓ Este produto está configurado para controle de rastreabilidade
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="aliquotas" className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Percent className="h-4 w-4" />
                <span className="font-medium">Alíquotas Fiscais</span>
              </div>
              <p className="text-sm text-purple-600">
                Configure as alíquotas de impostos do produto
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icms">% ICMS</Label>
                <Input
                  id="icms"
                  type="number"
                  step="0.01"
                  value={produtoEditado.aliquotas?.icms || 0}
                  onChange={(e) => updateAliquota('icms', parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipi">% IPI</Label>
                <Input
                  id="ipi"
                  type="number"
                  step="0.01"
                  value={produtoEditado.aliquotas?.ipi || 0}
                  onChange={(e) => updateAliquota('ipi', parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pis">% PIS</Label>
                <Input
                  id="pis"
                  type="number"
                  step="0.01"
                  value={produtoEditado.aliquotas?.pis || 0}
                  onChange={(e) => updateAliquota('pis', parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cofins">% COFINS</Label>
                <Input
                  id="cofins"
                  type="number"
                  step="0.01"
                  value={produtoEditado.aliquotas?.cofins || 0}
                  onChange={(e) => updateAliquota('cofins', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Resumo das Alíquotas</h4>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ICMS:</span>
                  <span className="ml-2 font-medium">{produtoEditado.aliquotas?.icms || 0}%</span>
                </div>
                <div>
                  <span className="text-gray-600">IPI:</span>
                  <span className="ml-2 font-medium">{produtoEditado.aliquotas?.ipi || 0}%</span>
                </div>
                <div>
                  <span className="text-gray-600">PIS:</span>
                  <span className="ml-2 font-medium">{produtoEditado.aliquotas?.pis || 0}%</span>
                </div>
                <div>
                  <span className="text-gray-600">COFINS:</span>
                  <span className="ml-2 font-medium">{produtoEditado.aliquotas?.cofins || 0}%</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-biodina-blue hover:bg-biodina-blue/90">
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditarProdutoImportado;
