import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UnidadeMedidaSelect from "@/components/estoque/UnidadeMedidaSelect";
import { modules } from "@/data/cadastroModules";
import { useToast } from "@/hooks/use-toast";
import { useDraft } from "@/hooks/useDraft";
import { DraftIndicator, DraftSaveButton } from "@/components/cadastro/DraftIndicator";
import { FileText } from "lucide-react";

interface ProdutoUsoConsumoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProdutoUsoConsumoModal = ({ isOpen, onClose }: ProdutoUsoConsumoModalProps) => {
  const { toast } = useToast();
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [unidade, setUnidade] = useState("");

  // Hook de rascunho
  const { 
    hasDraft, 
    draftInfo, 
    saveDraft, 
    loadDraft, 
    discardDraft, 
    clearDraftOnSave 
  } = useDraft<{ nome: string; categoria: string; unidade: string }>({
    moduleName: 'cadastro',
    entityType: 'produtos_uso_consumo',
    expirationDays: 7
  });

  const handleRestoreDraft = () => {
    const draftData = loadDraft();
    if (draftData) {
      setNome(draftData.nome);
      setCategoria(draftData.categoria);
      setUnidade(draftData.unidade);
    }
  };

  const handleSaveDraft = () => {
    saveDraft({ nome, categoria, unidade });
  };

  // Pegar categorias do módulo de categorias
  const categorias = modules.categorias?.subModules?.categorias?.data || [];

  const handleSalvar = () => {
    if (!nome || !categoria || !unidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de salvar.",
        variant: "destructive",
      });
      return;
    }

    // Implementar lógica de salvamento
    console.log("Produto de Uso e Consumo salvo:", { nome, categoria, unidade });
    
    toast({
      title: "Produto cadastrado",
      description: "Produto de uso e consumo cadastrado com sucesso!",
    });

    clearDraftOnSave();
    handleClose();
  };

  const isFormEmpty = !nome && !categoria && !unidade;

  const handleClose = () => {
    setNome("");
    setCategoria("");
    setUnidade("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Produto de Uso e Consumo</DialogTitle>
        </DialogHeader>

        {/* Draft Indicator */}
        {hasDraft && (
          <DraftIndicator
            hasDraft={hasDraft}
            draftInfo={draftInfo}
            onRestore={handleRestoreDraft}
            onDiscard={discardDraft}
          />
        )}

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do produto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <UnidadeMedidaSelect
            value={unidade}
            onValueChange={setUnidade}
            label="Unidade *"
            placeholder="Selecione a unidade"
          />
        </div>

        <div className="flex justify-end gap-3">
          <DraftSaveButton
            onSaveDraft={handleSaveDraft}
            disabled={isFormEmpty}
          />
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar}>
            Salvar Produto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProdutoUsoConsumoModal;