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
import { Plus, Trash2, ChevronDown, ChevronUp, Package, X, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { modules } from "@/data/cadastroModules";

interface SlotProduto {
  id: number;
  nome: string;
}

interface Slot {
  id: string;
  nome: string;
  qtdMinima: string;
  qtdMaxima: string;
  produtos: SlotProduto[];
  expanded: boolean;
  showProductSelector: boolean;
}

interface KitFormData {
  nome: string;
  sku: string;
  descricao: string;
  precoBase: string;
  slots: Slot[];
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
    slots: []
  });

  const availableProducts = modules.produtos?.subModules?.produtos?.data || [];

  const handleFieldChange = (field: keyof KitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSlot = () => {
    const newSlot: Slot = {
      id: `slot-${Date.now()}`,
      nome: "",
      qtdMinima: "1",
      qtdMaxima: "1",
      produtos: [],
      expanded: true,
      showProductSelector: false
    };
    setFormData(prev => ({ ...prev, slots: [...prev.slots, newSlot] }));
  };

  const removeSlot = (slotId: string) => {
    setFormData(prev => ({ ...prev, slots: prev.slots.filter(s => s.id !== slotId) }));
  };

  const updateSlot = (slotId: string, field: keyof Slot, value: any) => {
    setFormData(prev => ({
      ...prev,
      slots: prev.slots.map(s => s.id === slotId ? { ...s, [field]: value } : s)
    }));
  };

  const toggleSlotExpand = (slotId: string) => {
    updateSlot(slotId, "expanded", !formData.slots.find(s => s.id === slotId)?.expanded);
  };

  const toggleProductSelector = (slotId: string) => {
    const slot = formData.slots.find(s => s.id === slotId);
    updateSlot(slotId, "showProductSelector", !slot?.showProductSelector);
  };

  const addProductToSlot = (slotId: string, product: SlotProduto) => {
    setFormData(prev => ({
      ...prev,
      slots: prev.slots.map(s => {
        if (s.id !== slotId) return s;
        if (s.produtos.some(p => p.id === product.id)) return s;
        return { ...s, produtos: [...s.produtos, product] };
      })
    }));
  };

  const removeProductFromSlot = (slotId: string, productId: number) => {
    setFormData(prev => ({
      ...prev,
      slots: prev.slots.map(s => {
        if (s.id !== slotId) return s;
        return { ...s, produtos: s.produtos.filter(p => p.id !== productId) };
      })
    }));
  };

  const totalSlots = formData.slots.length;
  const totalProducts = formData.slots.reduce((acc, s) => acc + s.produtos.length, 0);

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
    setFormData({ nome: "", sku: "", descricao: "", precoBase: "", slots: [] });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
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

            {/* Slots de Componentes */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">
                    Slots de Componentes
                  </CardTitle>
                  <Button type="button" size="sm" onClick={addSlot} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Adicionar Slot
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.slots.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhum slot configurado</p>
                    <p className="text-sm">Clique em "Adicionar Slot" para começar</p>
                  </div>
                )}

                {formData.slots.map((slot, index) => (
                  <Card key={slot.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-2 pt-3 px-4">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleSlotExpand(slot.id)}
                          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
                        >
                          {slot.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          Slot {index + 1}{slot.nome ? ` — ${slot.nome}` : ""}
                          <span className="text-xs text-muted-foreground font-normal">
                            ({slot.produtos.length} produto(s))
                          </span>
                        </button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSlot(slot.id)}
                          className="h-7 w-7 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    {slot.expanded && (
                      <CardContent className="px-4 pb-4 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Nome do Slot *</Label>
                            <Input
                              value={slot.nome}
                              onChange={e => updateSlot(slot.id, "nome", e.target.value)}
                              placeholder="Ex: Reagentes"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Qtd. Mínima</Label>
                            <Input
                              type="number"
                              min="1"
                              value={slot.qtdMinima}
                              onChange={e => updateSlot(slot.id, "qtdMinima", e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Qtd. Máxima</Label>
                            <Input
                              type="number"
                              min="1"
                              value={slot.qtdMaxima}
                              onChange={e => updateSlot(slot.id, "qtdMaxima", e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Produtos vinculados */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs font-semibold">Produtos neste slot</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => toggleProductSelector(slot.id)}
                              className="gap-1 h-7 text-xs"
                            >
                              <Plus className="h-3 w-3" />
                              Adicionar Produtos
                            </Button>
                          </div>

                          {slot.produtos.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {slot.produtos.map(p => (
                                <span
                                  key={p.id}
                                  className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                                >
                                  {p.nome}
                                  <button
                                    type="button"
                                    onClick={() => removeProductFromSlot(slot.id, p.id)}
                                    className="hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}

                          {slot.produtos.length === 0 && !slot.showProductSelector && (
                            <p className="text-xs text-muted-foreground italic">
                              Nenhum produto vinculado a este slot.
                            </p>
                          )}

                          {/* Seletor de produtos */}
                          {slot.showProductSelector && (
                            <ProductSelector
                              availableProducts={availableProducts}
                              selectedIds={slot.produtos.map(p => p.id)}
                              onSelect={product => addProductToSlot(slot.id, product)}
                              onClose={() => toggleProductSelector(slot.id)}
                            />
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Resumo */}
            {formData.slots.length > 0 && (
              <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3 text-sm">
                <span className="font-medium">Resumo do Kit</span>
                <div className="flex gap-6 text-muted-foreground">
                  <span><strong className="text-foreground">{totalSlots}</strong> slot(s) configurado(s)</span>
                  <span><strong className="text-foreground">{totalProducts}</strong> produto(s) vinculado(s)</span>
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
  selectedIds: number[];
  onSelect: (product: SlotProduto) => void;
  onClose: () => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  availableProducts, selectedIds, onSelect, onClose
}) => {
  const [search, setSearch] = useState("");

  const filtered = availableProducts.filter(p =>
    (p.nome || p.nomeProduto || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar produto..."
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
            const isSelected = selectedIds.includes(p.id);
            const productName = p.nomeProduto || p.nome || `Produto ${p.id}`;
            return (
              <div
                key={p.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-xs"
                onClick={() => !isSelected && onSelect({ id: p.id, nome: productName })}
              >
                <Checkbox checked={isSelected} disabled={isSelected} />
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
