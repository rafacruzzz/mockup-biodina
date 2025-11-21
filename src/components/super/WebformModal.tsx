import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Webform } from "@/types/super";
import { useToast } from "@/hooks/use-toast";
import { gerarLinkWebform, copiarLinkWebform } from "@/utils/webformUtils";
import { Copy, ExternalLink } from "lucide-react";

interface WebformModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (webformData: Omit<Webform, "id" | "dataCriacao" | "totalAcessos" | "totalCadastros">) => void;
  webformParaEditar?: Webform;
}

export const WebformModal = ({ open, onOpenChange, onSave, webformParaEditar }: WebformModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: "",
    status: "ativo" as "ativo" | "inativo",
    tipo: "criar_base" as const,
    trial: true,
    diasTrial: 7,
    descricao: "",
    linkUnico: "",
  });

  const [linkGerado, setLinkGerado] = useState("");

  useEffect(() => {
    if (webformParaEditar) {
      setFormData({
        titulo: webformParaEditar.titulo,
        status: webformParaEditar.status,
        tipo: webformParaEditar.tipo,
        trial: webformParaEditar.trial,
        diasTrial: webformParaEditar.diasTrial,
        descricao: webformParaEditar.descricao,
        linkUnico: webformParaEditar.linkUnico,
      });
      setLinkGerado(gerarLinkWebform(webformParaEditar.id));
    } else {
      setFormData({
        titulo: "",
        status: "ativo",
        tipo: "criar_base",
        trial: true,
        diasTrial: 7,
        descricao: "",
        linkUnico: "",
      });
      setLinkGerado("");
    }
  }, [webformParaEditar, open]);

  const handleSubmit = () => {
    if (!formData.titulo.trim()) {
      toast({
        title: "Erro de Validação",
        description: "O título é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (formData.trial && (formData.diasTrial < 1 || formData.diasTrial > 365)) {
      toast({
        title: "Erro de Validação",
        description: "Os dias de trial devem estar entre 1 e 365.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    
    if (!webformParaEditar) {
      toast({
        title: "Webform Criado!",
        description: "Link gerado com sucesso. Copie e compartilhe!",
      });
    } else {
      toast({
        title: "Webform Atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    }
    
    onOpenChange(false);
  };

  const handleCopiarLink = async () => {
    const sucesso = await copiarLinkWebform(linkGerado);
    if (sucesso) {
      toast({
        title: "Link Copiado!",
        description: "Link copiado para a área de transferência.",
      });
    }
  };

  const handleAbrirLink = () => {
    window.open(linkGerado, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {webformParaEditar ? "Editar Webform" : "Novo Webform"}
          </DialogTitle>
          <DialogDescription>
            {webformParaEditar 
              ? "Edite as informações do webform de cadastro." 
              : "Crie um novo webform para captação de leads e cadastro de empresas."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Seção Principal */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                placeholder="Ex: Evento Old, Site Institucional, Instagram"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "ativo" | "inativo") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="criar_base">Criar Base</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Por enquanto, apenas o tipo "Criar Base" está disponível.
              </p>
            </div>
          </div>

          {/* Seção Trial */}
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label>Trial *</Label>
              <RadioGroup
                value={formData.trial ? "sim" : "nao"}
                onValueChange={(value) => setFormData({ ...formData, trial: value === "sim" })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="trial-sim" />
                  <Label htmlFor="trial-sim" className="font-normal cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="trial-nao" />
                  <Label htmlFor="trial-nao" className="font-normal cursor-pointer">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.trial && (
              <div className="space-y-2">
                <Label htmlFor="diasTrial">Dias do Trial</Label>
                <Input
                  id="diasTrial"
                  type="number"
                  min={1}
                  max={365}
                  value={formData.diasTrial}
                  onChange={(e) => setFormData({ ...formData, diasTrial: parseInt(e.target.value) || 7 })}
                />
              </div>
            )}
          </div>

          {/* Seção Descrição */}
          <div className="space-y-2 border-t pt-4">
            <Label htmlFor="descricao">Descrição (opcional)</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição interna para identificação..."
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              maxLength={500}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {formData.descricao.length}/500 caracteres
            </p>
          </div>

          {/* Link Gerado (apenas para edição) */}
          {webformParaEditar && linkGerado && (
            <div className="space-y-2 border-t pt-4">
              <Label>Link do Webform</Label>
              <div className="flex gap-2">
                <Input
                  value={linkGerado}
                  readOnly
                  className="bg-muted"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopiarLink}
                  title="Copiar Link"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAbrirLink}
                  title="Abrir Link"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {webformParaEditar ? "Salvar Alterações" : "Criar Webform"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
