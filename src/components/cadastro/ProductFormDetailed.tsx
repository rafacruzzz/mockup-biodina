
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { X, Save, Upload } from "lucide-react";

interface ProductFormDetailedProps {
  onClose: () => void;
}

const ProductFormDetailed = ({ onClose }: ProductFormDetailedProps) => {
  const [formData, setFormData] = useState({
    // Aba Geral
    nome: "",
    categoria: "",
    unidade: "",
    fabricante: "",
    codigo_interno: "",
    codigo_barras: "",
    ativo: true,
    
    // Aba Preços e Estoque
    preco_venda: "",
    preco_custo: "",
    estoque_minimo: "",
    estoque_atual: "",
    
    // Aba Observações
    observacoes: "",
    arquivos: []
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando produto:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-biodina-blue">Cadastro de Produto</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="geral">Geral</TabsTrigger>
              <TabsTrigger value="precos">Preços e Estoque</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nome">Nome do Produto *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Ex: Paracetamol 500mg"
                  />
                </div>

                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analgesicos">Analgésicos</SelectItem>
                      <SelectItem value="antibioticos">Antibióticos</SelectItem>
                      <SelectItem value="anti-inflamatorios">Anti-inflamatórios</SelectItem>
                      <SelectItem value="vitaminas">Vitaminas</SelectItem>
                      <SelectItem value="equipamentos">Equipamentos Médicos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="unidade">Unidade</Label>
                  <Select value={formData.unidade} onValueChange={(value) => handleInputChange("unidade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caixa">Caixa</SelectItem>
                      <SelectItem value="frasco">Frasco</SelectItem>
                      <SelectItem value="ampola">Ampola</SelectItem>
                      <SelectItem value="unidade">Unidade</SelectItem>
                      <SelectItem value="kit">Kit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fabricante">Fabricante</Label>
                  <Input
                    id="fabricante"
                    value={formData.fabricante}
                    onChange={(e) => handleInputChange("fabricante", e.target.value)}
                    placeholder="Ex: EMS, Eurofarma, Pfizer"
                  />
                </div>

                <div>
                  <Label htmlFor="codigo_interno">Código Interno</Label>
                  <Input
                    id="codigo_interno"
                    value={formData.codigo_interno}
                    onChange={(e) => handleInputChange("codigo_interno", e.target.value)}
                    placeholder="Ex: MED001"
                  />
                </div>

                <div>
                  <Label htmlFor="codigo_barras">Código de Barras</Label>
                  <Input
                    id="codigo_barras"
                    value={formData.codigo_barras}
                    onChange={(e) => handleInputChange("codigo_barras", e.target.value)}
                    placeholder="Ex: 7891234567890"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) => handleInputChange("ativo", checked)}
                  />
                  <Label htmlFor="ativo">Produto Ativo</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="precos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preco_venda">Preço de Venda (R$)</Label>
                  <Input
                    id="preco_venda"
                    type="number"
                    step="0.01"
                    value={formData.preco_venda}
                    onChange={(e) => handleInputChange("preco_venda", e.target.value)}
                    placeholder="Ex: 12.50"
                  />
                </div>

                <div>
                  <Label htmlFor="preco_custo">Preço de Custo (R$)</Label>
                  <Input
                    id="preco_custo"
                    type="number"
                    step="0.01"
                    value={formData.preco_custo}
                    onChange={(e) => handleInputChange("preco_custo", e.target.value)}
                    placeholder="Ex: 8.50"
                  />
                </div>

                <div>
                  <Label htmlFor="estoque_minimo">Estoque Mínimo</Label>
                  <Input
                    id="estoque_minimo"
                    type="number"
                    value={formData.estoque_minimo}
                    onChange={(e) => handleInputChange("estoque_minimo", e.target.value)}
                    placeholder="Ex: 10"
                  />
                </div>

                <div>
                  <Label htmlFor="estoque_atual">Estoque Atual</Label>
                  <Input
                    id="estoque_atual"
                    type="number"
                    value={formData.estoque_atual}
                    onChange={(e) => handleInputChange("estoque_atual", e.target.value)}
                    placeholder="Ex: 250"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="observacoes" className="space-y-6">
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  rows={6}
                  placeholder="Informações adicionais sobre o produto..."
                />
              </div>

              <div>
                <Label>Arquivos Anexos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                  <Button variant="outline" size="sm">
                    Selecionar Arquivos
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Produto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormDetailed;
