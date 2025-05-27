
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, Upload, Image } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormDetailedProps {
  onClose: () => void;
}

const ProductFormDetailed = ({ onClose }: ProductFormDetailedProps) => {
  const [formData, setFormData] = useState({
    // Dados Básicos
    codigo: "",
    nome: "",
    descricao: "",
    marca: "",
    categoria: "",
    subcategoria: "",
    tipo: "medicamento",
    status: "ativo",
    
    // Características Físicas
    peso: "",
    largura: "",
    altura: "",
    comprimento: "",
    cor: "",
    tamanho: "",
    
    // Dados Comerciais
    precoCompra: "",
    precoVenda: "",
    margemLucro: "",
    promocional: false,
    precoPromocional: "",
    
    // Estoque
    estoque: "",
    estoqueMinimo: "",
    estoqueMaximo: "",
    localizacao: "",
    lote: "",
    dataValidade: "",
    
    // Fiscais
    ncm: "",
    cest: "",
    cfop: "",
    cst: "",
    aliquotaIcms: "",
    aliquotaIpi: "",
    aliquotaPis: "",
    aliquotaCofins: "",
    
    // Medicamento Específico
    principioAtivo: "",
    dosagem: "",
    formaFarmaceutica: "",
    laboratorio: "",
    registroAnvisa: "",
    tarja: "",
    prescricao: "",
    controlado: false,
    
    // Fornecedor
    fornecedorPrincipal: "",
    codigoFornecedor: "",
    tempoEntrega: "",
    
    // Outros
    observacoes: "",
    garantia: "",
    manual: "",
    certificacao: ""
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-biodina-blue">Cadastro de Produto</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <Tabs defaultValue="basicos" className="p-6">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="basicos">Dados Básicos</TabsTrigger>
              <TabsTrigger value="comerciais">Comerciais</TabsTrigger>
              <TabsTrigger value="estoque">Estoque</TabsTrigger>
              <TabsTrigger value="fiscais">Fiscais</TabsTrigger>
              <TabsTrigger value="medicamento">Medicamento</TabsTrigger>
              <TabsTrigger value="outros">Outros</TabsTrigger>
            </TabsList>

            <TabsContent value="basicos">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas do Produto</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="codigo">Código do Produto*</Label>
                    <Input
                      id="codigo"
                      value={formData.codigo}
                      onChange={(e) => handleInputChange("codigo", e.target.value)}
                      placeholder="Ex: MED001"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nome">Nome do Produto*</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      placeholder="Ex: Paracetamol 500mg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="marca">Marca</Label>
                    <Input
                      id="marca"
                      value={formData.marca}
                      onChange={(e) => handleInputChange("marca", e.target.value)}
                      placeholder="Ex: Genérico"
                    />
                  </div>

                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analgesicos">Analgésicos</SelectItem>
                        <SelectItem value="antibioticos">Antibióticos</SelectItem>
                        <SelectItem value="anti-inflamatorios">Anti-inflamatórios</SelectItem>
                        <SelectItem value="antiacidos">Antiácidos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                        <SelectItem value="descontinuado">Descontinuado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-3">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => handleInputChange("descricao", e.target.value)}
                      placeholder="Descrição detalhada do produto"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="peso">Peso (g)</Label>
                    <Input
                      id="peso"
                      type="number"
                      value={formData.peso}
                      onChange={(e) => handleInputChange("peso", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cor">Cor</Label>
                    <Input
                      id="cor"
                      value={formData.cor}
                      onChange={(e) => handleInputChange("cor", e.target.value)}
                      placeholder="Ex: Branco"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tamanho">Tamanho</Label>
                    <Input
                      id="tamanho"
                      value={formData.tamanho}
                      onChange={(e) => handleInputChange("tamanho", e.target.value)}
                      placeholder="Ex: 10x5cm"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comerciais">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="precoCompra">Preço de Compra (R$)</Label>
                    <Input
                      id="precoCompra"
                      type="number"
                      step="0.01"
                      value={formData.precoCompra}
                      onChange={(e) => handleInputChange("precoCompra", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="precoVenda">Preço de Venda (R$)</Label>
                    <Input
                      id="precoVenda"
                      type="number"
                      step="0.01"
                      value={formData.precoVenda}
                      onChange={(e) => handleInputChange("precoVenda", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="margemLucro">Margem de Lucro (%)</Label>
                    <Input
                      id="margemLucro"
                      type="number"
                      value={formData.margemLucro}
                      onChange={(e) => handleInputChange("margemLucro", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="promocional"
                      checked={formData.promocional}
                      onCheckedChange={(checked) => handleInputChange("promocional", checked as boolean)}
                    />
                    <Label htmlFor="promocional">Produto Promocional</Label>
                  </div>

                  {formData.promocional && (
                    <div>
                      <Label htmlFor="precoPromocional">Preço Promocional (R$)</Label>
                      <Input
                        id="precoPromocional"
                        type="number"
                        step="0.01"
                        value={formData.precoPromocional}
                        onChange={(e) => handleInputChange("precoPromocional", e.target.value)}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="fornecedorPrincipal">Fornecedor Principal</Label>
                    <Select value={formData.fornecedorPrincipal} onValueChange={(value) => handleInputChange("fornecedorPrincipal", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fornecedor1">Fornecedor Medicamentos ABC Ltda</SelectItem>
                        <SelectItem value="fornecedor2">Distribuidora Pharma Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="codigoFornecedor">Código do Fornecedor</Label>
                    <Input
                      id="codigoFornecedor"
                      value={formData.codigoFornecedor}
                      onChange={(e) => handleInputChange("codigoFornecedor", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tempoEntrega">Tempo de Entrega (dias)</Label>
                    <Input
                      id="tempoEntrega"
                      type="number"
                      value={formData.tempoEntrega}
                      onChange={(e) => handleInputChange("tempoEntrega", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estoque">
              <Card>
                <CardHeader>
                  <CardTitle>Controle de Estoque</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="estoque">Estoque Atual</Label>
                    <Input
                      id="estoque"
                      type="number"
                      value={formData.estoque}
                      onChange={(e) => handleInputChange("estoque", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="estoqueMinimo">Estoque Mínimo</Label>
                    <Input
                      id="estoqueMinimo"
                      type="number"
                      value={formData.estoqueMinimo}
                      onChange={(e) => handleInputChange("estoqueMinimo", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="estoqueMaximo">Estoque Máximo</Label>
                    <Input
                      id="estoqueMaximo"
                      type="number"
                      value={formData.estoqueMaximo}
                      onChange={(e) => handleInputChange("estoqueMaximo", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="localizacao">Localização</Label>
                    <Input
                      id="localizacao"
                      value={formData.localizacao}
                      onChange={(e) => handleInputChange("localizacao", e.target.value)}
                      placeholder="Ex: Prateleira A1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lote">Lote</Label>
                    <Input
                      id="lote"
                      value={formData.lote}
                      onChange={(e) => handleInputChange("lote", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataValidade">Data de Validade</Label>
                    <Input
                      id="dataValidade"
                      type="date"
                      value={formData.dataValidade}
                      onChange={(e) => handleInputChange("dataValidade", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fiscais">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Fiscais</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="ncm">NCM</Label>
                    <Input
                      id="ncm"
                      value={formData.ncm}
                      onChange={(e) => handleInputChange("ncm", e.target.value)}
                      placeholder="Ex: 30049099"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cest">CEST</Label>
                    <Input
                      id="cest"
                      value={formData.cest}
                      onChange={(e) => handleInputChange("cest", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cfop">CFOP</Label>
                    <Input
                      id="cfop"
                      value={formData.cfop}
                      onChange={(e) => handleInputChange("cfop", e.target.value)}
                      placeholder="Ex: 5102"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cst">CST</Label>
                    <Input
                      id="cst"
                      value={formData.cst}
                      onChange={(e) => handleInputChange("cst", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="aliquotaIcms">Alíquota ICMS (%)</Label>
                    <Input
                      id="aliquotaIcms"
                      type="number"
                      step="0.01"
                      value={formData.aliquotaIcms}
                      onChange={(e) => handleInputChange("aliquotaIcms", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="aliquotaIpi">Alíquota IPI (%)</Label>
                    <Input
                      id="aliquotaIpi"
                      type="number"
                      step="0.01"
                      value={formData.aliquotaIpi}
                      onChange={(e) => handleInputChange("aliquotaIpi", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="aliquotaPis">Alíquota PIS (%)</Label>
                    <Input
                      id="aliquotaPis"
                      type="number"
                      step="0.01"
                      value={formData.aliquotaPis}
                      onChange={(e) => handleInputChange("aliquotaPis", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="aliquotaCofins">Alíquota COFINS (%)</Label>
                    <Input
                      id="aliquotaCofins"
                      type="number"
                      step="0.01"
                      value={formData.aliquotaCofins}
                      onChange={(e) => handleInputChange("aliquotaCofins", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medicamento">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Específicas do Medicamento</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="principioAtivo">Princípio Ativo</Label>
                    <Input
                      id="principioAtivo"
                      value={formData.principioAtivo}
                      onChange={(e) => handleInputChange("principioAtivo", e.target.value)}
                      placeholder="Ex: Paracetamol"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dosagem">Dosagem</Label>
                    <Input
                      id="dosagem"
                      value={formData.dosagem}
                      onChange={(e) => handleInputChange("dosagem", e.target.value)}
                      placeholder="Ex: 500mg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="formaFarmaceutica">Forma Farmacêutica</Label>
                    <Select value={formData.formaFarmaceutica} onValueChange={(value) => handleInputChange("formaFarmaceutica", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprimido">Comprimido</SelectItem>
                        <SelectItem value="capsula">Cápsula</SelectItem>
                        <SelectItem value="xarope">Xarope</SelectItem>
                        <SelectItem value="injecao">Injeção</SelectItem>
                        <SelectItem value="pomada">Pomada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="laboratorio">Laboratório</Label>
                    <Input
                      id="laboratorio"
                      value={formData.laboratorio}
                      onChange={(e) => handleInputChange("laboratorio", e.target.value)}
                      placeholder="Ex: EMS Pharma"
                    />
                  </div>

                  <div>
                    <Label htmlFor="registroAnvisa">Registro ANVISA</Label>
                    <Input
                      id="registroAnvisa"
                      value={formData.registroAnvisa}
                      onChange={(e) => handleInputChange("registroAnvisa", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tarja">Tarja</Label>
                    <Select value={formData.tarja} onValueChange={(value) => handleInputChange("tarja", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="livre">Livre</SelectItem>
                        <SelectItem value="vermelha">Vermelha</SelectItem>
                        <SelectItem value="preta">Preta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="prescricao">Prescrição</Label>
                    <Select value={formData.prescricao} onValueChange={(value) => handleInputChange("prescricao", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="livre">Venda Livre</SelectItem>
                        <SelectItem value="com_receita">Com Receita</SelectItem>
                        <SelectItem value="receita_especial">Receita Especial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="controlado"
                      checked={formData.controlado}
                      onCheckedChange={(checked) => handleInputChange("controlado", checked as boolean)}
                    />
                    <Label htmlFor="controlado">Medicamento Controlado</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outros">
              <Card>
                <CardHeader>
                  <CardTitle>Outras Informações</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="garantia">Garantia</Label>
                    <Input
                      id="garantia"
                      value={formData.garantia}
                      onChange={(e) => handleInputChange("garantia", e.target.value)}
                      placeholder="Ex: 12 meses"
                    />
                  </div>

                  <div>
                    <Label htmlFor="certificacao">Certificação</Label>
                    <Input
                      id="certificacao"
                      value={formData.certificacao}
                      onChange={(e) => handleInputChange("certificacao", e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange("observacoes", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Imagem do Produto</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-600">Clique ou arraste uma imagem aqui</p>
                      <Button variant="outline" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
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
