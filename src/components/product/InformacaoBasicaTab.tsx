
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, X, Info } from "lucide-react";

interface InformacaoBasicaTabProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const InformacaoBasicaTab = ({ formData, onInputChange }: InformacaoBasicaTabProps) => {
  const handleFornecedorAdd = () => {
    const novoFornecedor = { id: Date.now().toString(), cnpj: "", nome: "" };
    onInputChange("fornecedores", [...formData.fornecedores, novoFornecedor]);
  };

  const handleFornecedorRemove = (id: string) => {
    onInputChange("fornecedores", formData.fornecedores.filter((f: any) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Principais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Label htmlFor="nome">Nome do Produto *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => onInputChange("nome", e.target.value)}
              placeholder="Digite o nome do produto"
              required
            />
          </div>
          <div>
            <Label htmlFor="codigo">Código *</Label>
            <Input
              id="codigo"
              value={formData.codigo}
              onChange={(e) => onInputChange("codigo", e.target.value)}
              placeholder="PRD001"
              required
            />
          </div>
          <div>
            <Label htmlFor="codigoVendedor">Código do Vendedor</Label>
            <Input
              id="codigoVendedor"
              value={formData.codigoVendedor}
              onChange={(e) => onInputChange("codigoVendedor", e.target.value)}
              placeholder="VEND001"
            />
          </div>
          <div>
            <Label htmlFor="marca">Marca</Label>
            <Select onValueChange={(value) => onInputChange("marca", value)}>
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
          <div className="flex items-center space-x-2">
            <Switch
              id="ativo"
              checked={formData.ativo}
              onCheckedChange={(checked) => onInputChange("ativo", checked)}
            />
            <Label htmlFor="ativo">Produto Ativo</Label>
            <Badge className={formData.ativo ? "bg-green-500" : "bg-red-500"}>
              {formData.ativo ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Classificação */}
      <Card>
        <CardHeader>
          <CardTitle>Classificação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tipoProduto">Tipo do Produto</Label>
            <Select onValueChange={(value) => onInputChange("tipoProduto", value)}>
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
            <Label htmlFor="familiaProduto">Família do Produto</Label>
            <Select onValueChange={(value) => onInputChange("familiaProduto", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a família" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="familia1">Família A</SelectItem>
                <SelectItem value="familia2">Família B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="grupoProduto">Grupo do Produto</Label>
            <Select onValueChange={(value) => onInputChange("grupoProduto", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grupo1">Grupo A</SelectItem>
                <SelectItem value="grupo2">Grupo B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subgrupoProduto">Subgrupo do Produto</Label>
            <Select onValueChange={(value) => onInputChange("subgrupoProduto", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o subgrupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subgrupo1">Subgrupo A</SelectItem>
                <SelectItem value="subgrupo2">Subgrupo B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="unidadeMedidaTributavel">Unidade de Medida (Tributável) *</Label>
            <Select onValueChange={(value) => onInputChange("unidadeMedidaTributavel", value)}>
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
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => onInputChange("tags", e.target.value)}
              placeholder="eletrônico, importado, premium..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Estoque e Vendas */}
      <Card>
        <CardHeader>
          <CardTitle>Estoque e Vendas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="estoqueDisponivel">Estoque Disponível</Label>
            <Input
              id="estoqueDisponivel"
              type="number"
              value={formData.estoqueDisponivel}
              onChange={(e) => onInputChange("estoqueDisponivel", e.target.value)}
              placeholder="0"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="estoqueMinimo">Estoque Mínimo</Label>
            <Input
              id="estoqueMinimo"
              type="number"
              value={formData.estoqueMinimo}
              onChange={(e) => onInputChange("estoqueMinimo", e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="descontoPercentual">Desconto Padrão (%)</Label>
            <Input
              id="descontoPercentual"
              type="number"
              step="0.01"
              value={formData.descontoPercentual}
              onChange={(e) => onInputChange("descontoPercentual", e.target.value)}
              placeholder="0,00"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="visivelVenda"
              checked={formData.visivelVenda}
              onCheckedChange={(checked) => onInputChange("visivelVenda", checked)}
            />
            <Label htmlFor="visivelVenda">Visível na Venda</Label>
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="unidadeMedidaComercial">Unidade de Medida (Comercial) *</Label>
              <Select onValueChange={(value) => onInputChange("unidadeMedidaComercial", value)}>
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
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Label htmlFor="fatorConversao">Fator de Conversão</Label>
                <Input
                  id="fatorConversao"
                  type="number"
                  step="0.001"
                  value={formData.fatorConversao}
                  onChange={(e) => onInputChange("fatorConversao", e.target.value)}
                  placeholder="1"
                />
              </div>
              <Info className="h-4 w-4 text-gray-400 mt-6" />
            </div>
            <div>
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                id="peso"
                type="number"
                step="0.001"
                value={formData.peso}
                onChange={(e) => onInputChange("peso", e.target.value)}
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
                onChange={(e) => onInputChange("largura", e.target.value)}
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
                onChange={(e) => onInputChange("altura", e.target.value)}
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
                onChange={(e) => onInputChange("comprimento", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="controladoPorDimensao"
                checked={formData.controladoPorDimensao}
                onCheckedChange={(checked) => onInputChange("controladoPorDimensao", checked)}
              />
              <Label htmlFor="controladoPorDimensao">Controlado por dimensão</Label>
            </div>
            <div>
              <Label htmlFor="ean">EAN - Código de Barras</Label>
              <Input
                id="ean"
                value={formData.ean}
                onChange={(e) => onInputChange("ean", e.target.value)}
                placeholder="7890000000000"
              />
            </div>
            <div>
              <Label htmlFor="tipoCodigoNumeroSerie">Tipo de Código</Label>
              <Select onValueChange={(value) => onInputChange("tipoCodigoNumeroSerie", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ean13">EAN-13</SelectItem>
                  <SelectItem value="ean8">EAN-8</SelectItem>
                  <SelectItem value="upc">UPC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="controladoPorLote"
                checked={formData.controladoPorLote}
                onCheckedChange={(checked) => onInputChange("controladoPorLote", checked)}
              />
              <Label htmlFor="controladoPorLote">Controlado por lote</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="informacao">Informação</Label>
            <Textarea
              id="informacao"
              value={formData.informacao}
              onChange={(e) => onInputChange("informacao", e.target.value)}
              placeholder="Informações gerais do produto..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="observacao">Observação</Label>
            <Textarea
              id="observacao"
              value={formData.observacao}
              onChange={(e) => onInputChange("observacao", e.target.value)}
              placeholder="Observações adicionais..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload de Imagem */}
      <Card>
        <CardHeader>
          <CardTitle>Imagem do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Arraste uma imagem aqui ou clique para selecionar</p>
            <Button variant="outline" size="sm">
              Selecionar Imagem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custos e Precificação */}
      <Card>
        <CardHeader>
          <CardTitle>Custos e Precificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="calcularCustoTotalAuto"
                checked={formData.calcularCustoTotalAuto}
                onCheckedChange={(checked) => onInputChange("calcularCustoTotalAuto", checked)}
              />
              <Label htmlFor="calcularCustoTotalAuto">Calcular custo total automaticamente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="calcularValorVendaAuto"
                checked={formData.calcularValorVendaAuto}
                onCheckedChange={(checked) => onInputChange("calcularValorVendaAuto", checked)}
              />
              <Label htmlFor="calcularValorVendaAuto">Calcular valor de venda automaticamente</Label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="precoCusto">Preço de Custo</Label>
              <Input
                id="precoCusto"
                type="number"
                step="0.01"
                value={formData.precoCusto}
                onChange={(e) => onInputChange("precoCusto", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="fretePagoCompra">Frete Pago na Compra</Label>
              <Input
                id="fretePagoCompra"
                type="number"
                step="0.01"
                value={formData.fretePagoCompra}
                onChange={(e) => onInputChange("fretePagoCompra", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="seguroPagoCompra">Seguro Pago na Compra</Label>
              <Input
                id="seguroPagoCompra"
                type="number"
                step="0.01"
                value={formData.seguroPagoCompra}
                onChange={(e) => onInputChange("seguroPagoCompra", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="ipi">IPI (%)</Label>
              <Input
                id="ipi"
                type="number"
                step="0.01"
                value={formData.ipi}
                onChange={(e) => onInputChange("ipi", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="icms">ICMS (%)</Label>
              <Input
                id="icms"
                type="number"
                step="0.01"
                value={formData.icms}
                onChange={(e) => onInputChange("icms", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="despesasOperacionais">Despesas Operacionais</Label>
              <Input
                id="despesasOperacionais"
                type="number"
                step="0.01"
                value={formData.despesasOperacionais}
                onChange={(e) => onInputChange("despesasOperacionais", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="precoCustoComAcrescimos">Preço de Custo com Acréscimos</Label>
              <Input
                id="precoCustoComAcrescimos"
                type="number"
                step="0.01"
                value={formData.precoCustoComAcrescimos}
                onChange={(e) => onInputChange("precoCustoComAcrescimos", e.target.value)}
                placeholder="0,00"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="tipoLucro">Tipo de Lucro</Label>
              <Select onValueChange={(value) => onInputChange("tipoLucro", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentual">Percentual</SelectItem>
                  <SelectItem value="valor">Valor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mvaLucro">(MVA) Lucro</Label>
              <Input
                id="mvaLucro"
                type="number"
                step="0.01"
                value={formData.mvaLucro}
                onChange={(e) => onInputChange("mvaLucro", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="valorVenda">Valor de Venda</Label>
              <Input
                id="valorVenda"
                type="number"
                step="0.01"
                value={formData.valorVenda}
                onChange={(e) => onInputChange("valorVenda", e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="tipoDesconto">Tipo de Desconto</Label>
              <Select onValueChange={(value) => onInputChange("tipoDesconto", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentual">Percentual</SelectItem>
                  <SelectItem value="valor">Valor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="descontoMaximo">Desconto Máximo</Label>
              <Input
                id="descontoMaximo"
                type="number"
                step="0.01"
                value={formData.descontoMaximo}
                onChange={(e) => onInputChange("descontoMaximo", e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fornecedores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Fornecedores
            <Button onClick={handleFornecedorAdd} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.fornecedores.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum fornecedor adicionado</p>
          ) : (
            <div className="space-y-3">
              {formData.fornecedores.map((fornecedor: any) => (
                <div key={fornecedor.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      placeholder="CNPJ do fornecedor"
                      value={fornecedor.cnpj}
                      onChange={(e) => {
                        const updated = formData.fornecedores.map((f: any) =>
                          f.id === fornecedor.id ? { ...f, cnpj: e.target.value } : f
                        );
                        onInputChange("fornecedores", updated);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Nome do fornecedor"
                      value={fornecedor.nome}
                      onChange={(e) => {
                        const updated = formData.fornecedores.map((f: any) =>
                          f.id === fornecedor.id ? { ...f, nome: e.target.value } : f
                        );
                        onInputChange("fornecedores", updated);
                      }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFornecedorRemove(fornecedor.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integrações */}
      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="integracaoWoocommerce">Integração WooCommerce</Label>
            <Select onValueChange={(value) => onInputChange("integracaoWoocommerce", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma integração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loja1">Loja Principal</SelectItem>
                <SelectItem value="loja2">Loja Secundária</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InformacaoBasicaTab;
