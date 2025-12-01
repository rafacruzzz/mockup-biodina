import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { ProductTabProps } from "@/types/product";
import { useState } from "react";

const DadosGeraisTab = ({ formData, onInputChange }: ProductTabProps) => {
  const [tagInput, setTagInput] = useState("");

  const linhasProduto = [
    "Medicamentos",
    "Equipamentos Médicos",
    "Materiais Hospitalares",
    "Produtos de Higiene",
    "Suplementos"
  ];

  const marcas = [
    "EMS",
    "Eurofarma",
    "Medley",
    "Germed",
    "Biosintética"
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      onInputChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue">🟦 Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="codigo" className="text-sm font-semibold">Código do Produto *</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => onInputChange('codigo', e.target.value)}
                  placeholder="Ex: PROD001"
                  className="border-gray-300"
                />
                <p className="text-xs text-gray-500">Código interno único do produto</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linhaProduto" className="text-sm font-semibold">Linha de Produto *</Label>
                <Select value={formData.linhaProduto} onValueChange={(value) => onInputChange('linhaProduto', value)}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Selecione a linha" />
                  </SelectTrigger>
                  <SelectContent>
                    {linhasProduto.map((linha) => (
                      <SelectItem key={linha} value={linha}>
                        {linha}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marca" className="text-sm font-semibold">Marca *</Label>
                <Select value={formData.marca} onValueChange={(value) => onInputChange('marca', value)}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {marcas.map((marca) => (
                      <SelectItem key={marca} value={marca}>
                        {marca}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelo" className="text-sm font-semibold">Modelo</Label>
                <Input
                  id="modelo"
                  value={formData.modelo}
                  onChange={(e) => onInputChange('modelo', e.target.value)}
                  placeholder="Ex: XYZ-2024"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modeloProdutoMedico" className="text-sm font-semibold">Modelo de Produto Médico</Label>
                <Input
                  id="modeloProdutoMedico"
                  value={formData.modeloProdutoMedico}
                  onChange={(e) => onInputChange('modeloProdutoMedico', e.target.value)}
                  placeholder="Modelo do produto médico"
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nomeProdutoFabricante" className="text-sm font-semibold">Nome do produto (fabricante) *</Label>
                <Input
                  id="nomeProdutoFabricante"
                  value={formData.nomeProdutoFabricante}
                  onChange={(e) => onInputChange('nomeProdutoFabricante', e.target.value)}
                  placeholder="Nome do produto conforme fabricante"
                  className="border-gray-300"
                />
                <p className="text-xs text-gray-500">Nome oficial do produto pelo fabricante</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-sm font-semibold">Nome do produto (Anvisa) *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => onInputChange('descricao', e.target.value)}
                  placeholder="Descrição técnica detalhada do produto"
                  className="border-gray-300 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeMarketing" className="text-sm font-semibold">Nome de Marketing</Label>
                <Input
                  id="nomeMarketing"
                  value={formData.nomeMarketing}
                  onChange={(e) => onInputChange('nomeMarketing', e.target.value)}
                  placeholder="Nome comercial do produto"
                  className="border-gray-300"
                />
                <p className="text-xs text-gray-500">Nome usado para divulgação e marketing</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descritivoBreve" className="text-sm font-semibold">Descritivo Breve</Label>
                <Textarea
                  id="descritivoBreve"
                  value={formData.descritivoBreve}
                  onChange={(e) => onInputChange('descritivoBreve', e.target.value)}
                  placeholder="Breve descrição do produto (1-2 linhas)"
                  className="border-gray-300 min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descritivoCompleto" className="text-sm font-semibold">Descritivo Completo</Label>
                <Textarea
                  id="descritivoCompleto"
                  value={formData.descritivoCompleto}
                  onChange={(e) => onInputChange('descritivoCompleto', e.target.value)}
                  placeholder="Descrição completa e detalhada para marketing"
                  className="border-gray-300 min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Tags do Produto</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Adicione palavras-chave para facilitar a busca
                  </p>
                  
                  {/* Lista de tags existentes */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 text-gray-500 hover:text-gray-700"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Adicionar nova tag */}
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite uma tag e pressione Enter"
                      className="border-gray-300"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddTag} 
                      variant="outline"
                      disabled={!tagInput.trim()}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Switch
                  id="vendidoPorUnidade"
                  checked={formData.vendidoPorUnidade}
                  onCheckedChange={(checked) => onInputChange('vendidoPorUnidade', checked)}
                />
                <Label htmlFor="vendidoPorUnidade" className="text-sm font-medium">
                  Vendido por unidade
                </Label>
              </div>

              {!formData.vendidoPorUnidade && (
                <div className="space-y-2">
                  <Label htmlFor="comoEVendido" className="text-sm font-semibold">Como é vendido *</Label>
                  <Input
                    id="comoEVendido"
                    value={formData.comoEVendido || ''}
                    onChange={(e) => onInputChange('comoEVendido', e.target.value)}
                    placeholder="Ex: Por metro, por quilograma, por pacote de 10..."
                    className="border-gray-300"
                  />
                  <p className="text-xs text-gray-500">Descreva a forma de venda do produto</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DadosGeraisTab;