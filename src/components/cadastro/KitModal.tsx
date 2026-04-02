import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "@/components/ui/money-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Package, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { modules } from "@/data/cadastroModules";

interface KitProduto {
  id: string;
  codigo: string;
  nome: string;
  incluirNoPedido: boolean;
  quantidade: string;
  qtdItens: string;
}

interface KitFormData {
  nome: string;
  sku: string;
  descricao: string;
  precoBase: string;
  produtos: KitProduto[];
}

interface KitModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: KitFormData | null;
}

const KitModal: React.FC<KitModalProps> = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState<KitFormData>(editData || {
    nome: "",
    sku: "",
    descricao: "",
    precoBase: "",
    produtos: []
  });
  const [showProductSelector, setShowProductSelector] = useState(false);

  const availableProducts = modules.produtos?.subModules?.produtos?.data || [];

  const handleFieldChange = (field: keyof KitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addProduto = (product: { id: string; codigo: string; nome: string }) => {
    if (formData.produtos.some(p => p.id === product.id)) return;
    setFormData(prev => ({
      ...prev,
      produtos: [...prev.produtos, { ...product, incluirNoPedido: true, quantidade: "1", qtdItens: "1" }]
    }));
  };

  const removeProduto = (id: string) => {
    setFormData(prev => ({ ...prev, produtos: prev.produtos.filter(p => p.id !== id) }));
  };

  const updateProduto = (id: string, field: keyof KitProduto, value: any) => {
    setFormData(prev => ({
      ...prev,
      produtos: prev.produtos.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const totalProdutos = formData.produtos.length;
  const totalIncluidos = formData.produtos.filter(p => p.incluirNoPedido).length;

  const handleSave = () => {
    if (!formData.nome.trim()) {
      toast({ title: "Nome do Kit é obrigatório", variant: "destructive" });
      return;
    }
    if (!formData.sku.trim()) {
      toast({ title: "SKU do Kit é obrigatório", variant: "destructive" });
      return;
    }
    toast({ title: editData ? "Kit atualizado com sucesso!" : "Kit criado com sucesso!" });
    onClose();
  };

  const handleClose = () => {
    setFormData({ nome: "", sku: "", descricao: "", precoBase: "", produtos: [] });
    setShowProductSelector(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {editData ? "Editar Kit" : "Novo Kit"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-4">
            {/* Informações do Kit */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Informações do Kit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Kit *</Label>
                    <Input
                      value={formData.nome}
                      onChange={e => handleFieldChange("nome", e.target.value)}
                      placeholder="Ex: Kit Diagnóstico Completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU do Kit *</Label>
                    <Input
                      value={formData.sku}
                      onChange={e => handleFieldChange("sku", e.target.value)}
                      placeholder="Ex: KIT-001"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Descrição</Label>
                    <Textarea
                      value={formData.descricao}
                      onChange={e => handleFieldChange("descricao", e.target.value)}
                      placeholder="Descrição do kit..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço Base (R$)</Label>
                    <MoneyInput
                      value={formData.precoBase}
                      onChange={v => handleFieldChange("precoBase", v)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Produtos do Kit */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">
                    Produtos do Kit
                  </CardTitle>
                  <Button type="button" size="sm" onClick={() => setShowProductSelector(!showProductSelector)} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Adicionar Produto
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showProductSelector && (
                  <ProductSelector
                    availableProducts={availableProducts}
                    selectedIds={formData.produtos.map(p => p.id)}
                    onSelect={addProduto}
                    onClose={() => setShowProductSelector(false)}
                  />
                )}

                {formData.produtos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhum produto adicionado ao kit</p>
                    <p className="text-sm">Clique em "Adicionar Produto" para começar</p>
                  </div>
                ) : (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[140px]">Código do Produto</TableHead>
                          <TableHead>Nome do Produto (Anvisa)</TableHead>
                          <TableHead className="w-[130px] text-center">Incluir no Pedido</TableHead>
                          <TableHead className="w-[100px] text-center">Quantidade</TableHead>
                          <TableHead className="w-[100px] text-center">Qtd. Itens</TableHead>
                          <TableHead className="w-[60px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.produtos.map(produto => (
                          <TableRow key={produto.id}>
                            <TableCell className="font-mono text-sm">{produto.codigo}</TableCell>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={produto.incluirNoPedido}
                                  onCheckedChange={(checked) => updateProduto(produto.id, "incluirNoPedido", !!checked)}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="1"
                                value={produto.quantidade}
                                onChange={e => updateProduto(produto.id, "quantidade", e.target.value)}
                                className="h-8 w-20 mx-auto text-center"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="1"
                                value={produto.qtdItens}
                                onChange={e => updateProduto(produto.id, "qtdItens", e.target.value)}
                                className="h-8 w-20 mx-auto text-center"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeProduto(produto.id)}
                                className="h-7 w-7 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumo */}
            {formData.produtos.length > 0 && (
              <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3 text-sm">
                <span className="font-medium">Resumo do Kit</span>
                <div className="flex gap-6 text-muted-foreground">
                  <span><strong className="text-foreground">{totalProdutos}</strong> produto(s) no kit</span>
                  <span><strong className="text-foreground">{totalIncluidos}</strong> marcado(s) para pedido</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>
            {editData ? "Salvar Kit" : "Criar Kit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/* ---- Seletor de Produtos inline ---- */
interface ProductSelectorProps {
  availableProducts: any[];
  selectedIds: string[];
  onSelect: (product: { id: string; codigo: string; nome: string }) => void;
  onClose: () => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  availableProducts, selectedIds, onSelect, onClose
}) => {
  const [search, setSearch] = useState("");

  const filtered = availableProducts.filter(p => {
    const nome = (p.nomeProduto || p.nome || "").toLowerCase();
    const codigo = (p.codigo || p.sku || "").toLowerCase();
    return nome.includes(search.toLowerCase()) || codigo.includes(search.toLowerCase());
  });

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou código..."
              className="h-8 pl-7 text-xs"
            />
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} className="h-8 text-xs">
            Fechar
          </Button>
        </div>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">Nenhum produto encontrado</p>
          )}
          {filtered.map(p => {
            const productId = String(p.id);
            const isSelected = selectedIds.includes(productId);
            const productName = p.nomeProduto || p.nome || `Produto ${p.id}`;
            const productCode = p.codigo || p.sku || `COD-${p.id}`;
            return (
              <div
                key={p.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-xs"
                onClick={() => !isSelected && onSelect({ id: productId, codigo: productCode, nome: productName })}
              >
                <Checkbox checked={isSelected} disabled={isSelected} />
                <span className="font-mono text-muted-foreground">{productCode}</span>
                <span className={isSelected ? "text-muted-foreground" : ""}>{productName}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default KitModal;
