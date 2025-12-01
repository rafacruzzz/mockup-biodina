import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Produto } from "@/types/produto";
import { Save, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface TermoReferenciaModalProps {
  open: boolean;
  onClose: () => void;
  termo: any;
  onSalvar: (termo: any) => void;
  produto: Produto;
}

const modelosDisponiveis = [
  "TR para ABL 9",
  "TR para ABL 90",
  "TR para Agulhas - Todos os calibres",
  "TR para AQT 90",
  "TR para Aquisição de Reagentes para Imunoensaio",
  "TR para DxH520",
];

interface ItemEspecificacao {
  id: string;
  descricao: string;
  justificativa: string;
}

export function TermoReferenciaModal({
  open,
  onClose,
  termo,
  onSalvar,
  produto,
}: TermoReferenciaModalProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    modelo: "",
    objeto: "",
    justificativa: "",
    quantidade: "",
    especificacoes: [] as ItemEspecificacao[],
    observacoes: "",
  });

  useEffect(() => {
    if (termo) {
      setFormData({
        titulo: termo.titulo || "",
        modelo: termo.modelo || "",
        objeto: termo.conteudo?.objeto || "",
        justificativa: termo.conteudo?.justificativa || "",
        quantidade: termo.conteudo?.quantidade || "",
        especificacoes: termo.conteudo?.especificacoes || [],
        observacoes: termo.conteudo?.observacoes || "",
      });
    } else {
      setFormData({
        titulo: "",
        modelo: "",
        objeto: "",
        justificativa: "",
        quantidade: "",
        especificacoes: [],
        observacoes: "",
      });
    }
  }, [termo, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const adicionarEspecificacao = () => {
    const novaEspecificacao: ItemEspecificacao = {
      id: `espec-${Date.now()}`,
      descricao: "",
      justificativa: "",
    };
    setFormData((prev) => ({
      ...prev,
      especificacoes: [...prev.especificacoes, novaEspecificacao],
    }));
  };

  const removerEspecificacao = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      especificacoes: prev.especificacoes.filter((e) => e.id !== id),
    }));
  };

  const atualizarEspecificacao = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      especificacoes: prev.especificacoes.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const handleSubmit = () => {
    if (!formData.titulo.trim()) {
      toast.error("Informe o título do termo de referência");
      return;
    }

    if (!formData.modelo) {
      toast.error("Selecione o modelo do termo de referência");
      return;
    }

    const novoTermo = {
      id: termo?.id || `tr-${Date.now()}`,
      titulo: formData.titulo,
      modelo: formData.modelo,
      criadoPor: "Usuário Atual",
      data: new Date(),
      conteudo: {
        objeto: formData.objeto,
        justificativa: formData.justificativa,
        quantidade: formData.quantidade,
        especificacoes: formData.especificacoes,
        observacoes: formData.observacoes,
      },
    };

    onSalvar(novoTermo);
    toast.success(termo ? "Termo atualizado" : "Termo de referência criado com sucesso");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {termo ? "Editar Termo de Referência" : "Novo Termo de Referência"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Título */}
          <div>
            <Label htmlFor="titulo">Título do Termo de Referência *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              placeholder="Ex: TR para Aquisição de ABL800 FLEX"
              className="mt-2"
            />
          </div>

          {/* Modelo */}
          <div>
            <Label htmlFor="modelo">Modelo do Termo *</Label>
            <Select value={formData.modelo} onValueChange={(value) => handleInputChange("modelo", value)}>
              <SelectTrigger id="modelo" className="mt-2">
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                {modelosDisponiveis.map((modelo) => (
                  <SelectItem key={modelo} value={modelo}>
                    {modelo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Objeto */}
          <div>
            <Label htmlFor="objeto">1. Objeto</Label>
            <Textarea
              id="objeto"
              value={formData.objeto}
              onChange={(e) => handleInputChange("objeto", e.target.value)}
              placeholder="Descreva o objeto do termo de referência"
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* Justificativa */}
          <div>
            <Label htmlFor="justificativa">2. Justificativa</Label>
            <Textarea
              id="justificativa"
              value={formData.justificativa}
              onChange={(e) => handleInputChange("justificativa", e.target.value)}
              placeholder="Justificativa da aquisição"
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Quantidade */}
          <div>
            <Label htmlFor="quantidade">3. Quantidade</Label>
            <Input
              id="quantidade"
              value={formData.quantidade}
              onChange={(e) => handleInputChange("quantidade", e.target.value)}
              placeholder="Ex: 01 (uma) unidade"
              className="mt-2"
            />
          </div>

          {/* Especificações Técnicas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>4. Especificações Técnicas</Label>
              <Button type="button" variant="outline" size="sm" onClick={adicionarEspecificacao}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Especificação
              </Button>
            </div>

            {formData.especificacoes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
                Nenhuma especificação adicionada. Clique em "Adicionar Especificação" para começar.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.especificacoes.map((espec, index) => (
                  <div key={espec.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        Especificação {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removerEspecificacao(espec.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={espec.descricao}
                        onChange={(e) =>
                          atualizarEspecificacao(espec.id, "descricao", e.target.value)
                        }
                        placeholder="Descreva a especificação técnica"
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Justificativa</Label>
                      <Textarea
                        value={espec.justificativa}
                        onChange={(e) =>
                          atualizarEspecificacao(espec.id, "justificativa", e.target.value)
                        }
                        placeholder="Justifique a necessidade desta especificação"
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">5. Observações Complementares</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Observações adicionais"
              className="mt-2 min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            {termo ? "Atualizar" : "Salvar"} Termo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
