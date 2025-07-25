import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ProductTabProps } from "@/types/product";
import { useState } from "react";
import UnidadeMedidaSelect from "@/components/estoque/UnidadeMedidaSelect";

const DadosGeraisTab = ({ formData, onInputChange }: ProductTabProps) => {
  const [tagInput, setTagInput] = useState("");

  const familiasProduto = [
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

  const fabricantes = [
    { id: "1", nome: "EMS S.A.", cnpj: "57.507.378/0001-83" },
    { id: "2", nome: "Eurofarma Laboratórios S.A.", cnpj: "61.190.096/0001-92" },
    { id: "3", nome: "Pfizer Brasil Ltda.", cnpj: "46.070.868/0001-69" },
    { id: "4", nome: "Biosintética Farmacêutica Ltda.", cnpj: "53.162.095/0001-06" },
    { id: "5", nome: "Germed Farmacêutica Ltda.", cnpj: "17.562.075/0001-69" }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="codigo" className="text-sm font-semibold">Código *</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => onInputChange('codigo', e.target.value)}
                placeholder="Ex: PRD001"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familiaProduto" className="text-sm font-semibold">Família de Produto *</Label>
              <Select value={formData.familiaProduto} onValueChange={(value) => onInputChange('familiaProduto', value)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione a família" />
                </SelectTrigger>
                <SelectContent>
                  {familiasProduto.map((familia) => (
                    <SelectItem key={familia} value={familia}>{familia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca" className="text-sm font-semibold">Marca</Label>
              <Select value={formData.marca} onValueChange={(value) => onInputChange('marca', value)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione a marca" />
                </SelectTrigger>
                <SelectContent>
                  {marcas.map((marca) => (
                    <SelectItem key={marca} value={marca}>{marca}</SelectItem>
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
                placeholder="Ex: Modelo ABC"
                className="border-gray-300"
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
            </div>

            <UnidadeMedidaSelect
              value={formData.unidadeMedida}
              onValueChange={(value) => onInputChange('unidadeMedida', value)}
              label="Unidade de Medida"
              placeholder="Selecione a unidade"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-sm font-semibold">Descrição *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => onInputChange('descricao', e.target.value)}
              placeholder="Descreva detalhadamente o produto..."
              className="border-gray-300 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="descritivoBreve" className="text-sm font-semibold">Descritivo Breve</Label>
              <Textarea
                id="descritivoBreve"
                value={formData.descritivoBreve}
                onChange={(e) => onInputChange('descritivoBreve', e.target.value)}
                placeholder="Descrição resumida do produto..."
                className="border-gray-300"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descritivoCompleto" className="text-sm font-semibold">Descritivo Completo</Label>
              <Textarea
                id="descritivoCompleto"
                value={formData.descritivoCompleto}
                onChange={(e) => onInputChange('descritivoCompleto', e.target.value)}
                placeholder="Descrição detalhada e completa do produto..."
                className="border-gray-300"
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-semibold">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
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
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma tag e pressione Enter"
                className="border-gray-300"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Adicionar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Informações do Fabricante */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue">🏭 Informações do Fabricante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fabricante" className="text-sm font-semibold">Fabricante</Label>
              <Select value={formData.fabricanteId} onValueChange={(value) => onInputChange('fabricanteId', value)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione o fabricante" />
                </SelectTrigger>
                <SelectContent>
                  {fabricantes.map((fabricante) => (
                    <SelectItem key={fabricante.id} value={fabricante.id}>
                      {fabricante.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoProdutoFabricante" className="text-sm font-semibold">Código do Produto (Fabricante)</Label>
              <Input
                id="codigoProdutoFabricante"
                value={formData.codigoProdutoFabricante}
                onChange={(e) => onInputChange('codigoProdutoFabricante', e.target.value)}
                placeholder="Código interno do fabricante"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeProdutoFabricante" className="text-sm font-semibold">Nome do Produto (Fabricante)</Label>
              <Input
                id="nomeProdutoFabricante"
                value={formData.nomeProdutoFabricante}
                onChange={(e) => onInputChange('nomeProdutoFabricante', e.target.value)}
                placeholder="Nome usado pelo fabricante"
                className="border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DadosGeraisTab;
