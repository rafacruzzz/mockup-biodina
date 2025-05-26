
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X, Package, DollarSign, Warehouse, FileText } from "lucide-react";

const ProductForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    nome: "",
    valorVenda: "",
    estoque: "",
    estoqueDisponivel: "",
    unidadeMedida: "",
    peso: "",
    largura: "",
    altura: "",
    comprimento: "",
    codigo: "",
    ncm: "",
    ean: "",
    numeroSerie: "",
    controladoPorLote: false,
    tipoCodigoNumeroSerie: "",
    marca: "",
    tipoProduto: "",
    familiaProduto: "",
    grupoProduto: "",
    subgrupoProduto: "",
    tipoDesconto: "",
    descontoMaximo: "",
    precoCusto: "",
    fretePagoCompra: "",
    ipi: "",
    icms: "",
    seguroPagoCompra: "",
    despesasOperacionais: "",
    precoCustoComAcrescimos: "",
    tipoLucro: "",
    mvaLucro: "",
    calcularValorVendaAuto: false,
    calcularCustoTotalAuto: false,
    informacao: "",
    observacao: "",
    tags: "",
    ativo: true
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do produto:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-biodina-gold/10 rounded-lg">
                <Package className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-biodina-blue">Novo Produto</h2>
                <p className="text-gray-600">Cadastre um novo produto no sistema</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-biodina-gold" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="nome">Nome do Produto *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>
              <div>
                <Label htmlFor="codigo">Código</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange("codigo", e.target.value)}
                  placeholder="PRD001"
                />
              </div>
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Select onValueChange={(value) => handleInputChange("marca", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marca1">Marca A</SelectItem>
                    <SelectItem value="marca2">Marca B</SelectItem>
                    <SelectItem value="marca3">Marca C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tipoProduto">Tipo do Produto</Label>
                <Select onValueChange={(value) => handleInputChange("tipoProduto", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produto">Produto</SelectItem>
                    <SelectItem value="servico">Serviço</SelectItem>
                    <SelectItem value="kit">Kit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unidadeMedida">Unidade de Medida</Label>
                <Select onValueChange={(value) => handleInputChange("unidadeMedida", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="UN, KG, L..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UN">Unidade (UN)</SelectItem>
                    <SelectItem value="KG">Quilograma (KG)</SelectItem>
                    <SelectItem value="L">Litro (L)</SelectItem>
                    <SelectItem value="M">Metro (M)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Valores e Estoque */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-biodina-gold" />
                Valores e Estoque
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="valorVenda">Valor de Venda</Label>
                <Input
                  id="valorVenda"
                  type="number"
                  step="0.01"
                  value={formData.valorVenda}
                  onChange={(e) => handleInputChange("valorVenda", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="precoCusto">Preço de Custo</Label>
                <Input
                  id="precoCusto"
                  type="number"
                  step="0.01"
                  value={formData.precoCusto}
                  onChange={(e) => handleInputChange("precoCusto", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="estoque">Estoque</Label>
                <Input
                  id="estoque"
                  type="number"
                  value={formData.estoque}
                  onChange={(e) => handleInputChange("estoque", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="estoqueDisponivel">Estoque Disponível</Label>
                <Input
                  id="estoqueDisponivel"
                  type="number"
                  value={formData.estoqueDisponivel}
                  onChange={(e) => handleInputChange("estoqueDisponivel", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="descontoMaximo">Desconto Máximo (%)</Label>
                <Input
                  id="descontoMaximo"
                  type="number"
                  step="0.01"
                  value={formData.descontoMaximo}
                  onChange={(e) => handleInputChange("descontoMaximo", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="mvaLucro">MVA Lucro (%)</Label>
                <Input
                  id="mvaLucro"
                  type="number"
                  step="0.01"
                  value={formData.mvaLucro}
                  onChange={(e) => handleInputChange("mvaLucro", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="calcularValorVendaAuto"
                  checked={formData.calcularValorVendaAuto}
                  onCheckedChange={(checked) => handleInputChange("calcularValorVendaAuto", checked)}
                />
                <Label htmlFor="calcularValorVendaAuto" className="text-sm">
                  Calcular valor de venda automaticamente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="calcularCustoTotalAuto"
                  checked={formData.calcularCustoTotalAuto}
                  onCheckedChange={(checked) => handleInputChange("calcularCustoTotalAuto", checked)}
                />
                <Label htmlFor="calcularCustoTotalAuto" className="text-sm">
                  Calcular custo total automaticamente
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Dimensões e Códigos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-biodina-gold" />
                Dimensões e Códigos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  step="0.001"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  placeholder="0,000"
                />
              </div>
              <div>
                <Label htmlFor="largura">Largura (cm)</Label>
                <Input
                  id="largura"
                  type="number"
                  step="0.01"
                  value={formData.largura}
                  onChange={(e) => handleInputChange("largura", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input
                  id="altura"
                  type="number"
                  step="0.01"
                  value={formData.altura}
                  onChange={(e) => handleInputChange("altura", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="comprimento">Comprimento (cm)</Label>
                <Input
                  id="comprimento"
                  type="number"
                  step="0.01"
                  value={formData.comprimento}
                  onChange={(e) => handleInputChange("comprimento", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="ncm">NCM</Label>
                <Input
                  id="ncm"
                  value={formData.ncm}
                  onChange={(e) => handleInputChange("ncm", e.target.value)}
                  placeholder="00000000"
                />
              </div>
              <div>
                <Label htmlFor="ean">EAN</Label>
                <Input
                  id="ean"
                  value={formData.ean}
                  onChange={(e) => handleInputChange("ean", e.target.value)}
                  placeholder="7890000000000"
                />
              </div>
              <div>
                <Label htmlFor="numeroSerie">Número de Série</Label>
                <Input
                  id="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={(e) => handleInputChange("numeroSerie", e.target.value)}
                  placeholder="SN001"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="controladoPorLote"
                  checked={formData.controladoPorLote}
                  onCheckedChange={(checked) => handleInputChange("controladoPorLote", checked)}
                />
                <Label htmlFor="controladoPorLote" className="text-sm">
                  Controlado por lote
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="informacao">Informação</Label>
                <Textarea
                  id="informacao"
                  value={formData.informacao}
                  onChange={(e) => handleInputChange("informacao", e.target.value)}
                  placeholder="Informações técnicas do produto..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="observacao">Observação</Label>
                <Textarea
                  id="observacao"
                  value={formData.observacao}
                  onChange={(e) => handleInputChange("observacao", e.target.value)}
                  placeholder="Observações internas..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="eletrônico, importado, premium..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) => handleInputChange("ativo", checked)}
                />
                <Label htmlFor="ativo">Produto ativo</Label>
                <Badge className={formData.ativo ? "bg-green-500" : "bg-red-500"}>
                  {formData.ativo ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} className="px-8">
              Cancelar
            </Button>
            <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90 px-8">
              <Save className="h-4 w-4 mr-2" />
              Salvar Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
