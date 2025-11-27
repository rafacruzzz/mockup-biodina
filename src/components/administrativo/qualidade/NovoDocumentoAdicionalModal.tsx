import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface NovoDocumentoAdicionalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (nome: string, descricao: string, requerAssinatura: boolean, arquivo?: File) => void;
}

export const NovoDocumentoAdicionalModal = ({
  open,
  onOpenChange,
  onAdd
}: NovoDocumentoAdicionalModalProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [requerAssinatura, setRequerAssinatura] = useState(false);
  const [arquivo, setArquivo] = useState<File | undefined>();

  const handleSubmit = () => {
    if (!nome.trim()) {
      toast.error("Por favor, informe o nome do documento");
      return;
    }

    onAdd(nome, descricao, requerAssinatura, arquivo);
    
    // Reset form
    setNome("");
    setDescricao("");
    setRequerAssinatura(false);
    setArquivo(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Documento Adicional</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome-documento">Nome do Documento *</Label>
            <Input
              id="nome-documento"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Laudo Técnico"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao-documento">Descrição (opcional)</Label>
            <Textarea
              id="descricao-documento"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Informações adicionais sobre o documento"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="requer-assinatura"
              checked={requerAssinatura}
              onCheckedChange={(checked) => setRequerAssinatura(checked as boolean)}
            />
            <Label
              htmlFor="requer-assinatura"
              className="text-sm font-normal cursor-pointer"
            >
              Este documento requer assinatura digital
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arquivo-upload">Arquivo (opcional)</Label>
            <div className="flex items-center gap-2">
              <label
                htmlFor="arquivo-upload"
                className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-muted/50"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {arquivo ? arquivo.name : "Selecionar arquivo"}
                </span>
              </label>
              <input
                id="arquivo-upload"
                type="file"
                className="hidden"
                onChange={(e) => setArquivo(e.target.files?.[0])}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              {arquivo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setArquivo(undefined)}
                >
                  Remover
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Adicionar Documento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
