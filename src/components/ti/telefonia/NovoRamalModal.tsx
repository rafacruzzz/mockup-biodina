import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface NovoRamalModalProps {
  open: boolean;
  onClose: () => void;
}

export const NovoRamalModal = ({ open, onClose }: NovoRamalModalProps) => {
  const [formData, setFormData] = useState({
    numeroRamal: "",
    usuarioAssociado: "",
    setor: "",
    modeloAparelho: "",
    localizacao: "",
    observacoes: ""
  });

  const setores = [
    "Comercial",
    "RH",
    "Financeiro",
    "TI",
    "Administrativo",
    "Diretoria",
    "Recepção",
    "Almoxarifado",
    "Jurídico"
  ];

  const modelosAparelho = [
    "Cisco IP Phone 7940",
    "Cisco IP Phone 7962",
    "Cisco IP Phone 8845",
    "Yealink T46G",
    "Yealink T54W",
    "Grandstream GXP2170",
    "Intelbras TIP 200",
    "Intelbras TIP 300"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.numeroRamal || !formData.setor || !formData.modeloAparelho || !formData.localizacao) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Aqui implementaria a criação do ramal
    toast({
      title: "Sucesso",
      description: "Novo ramal adicionado com sucesso!"
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Ramal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numeroRamal">Número do Ramal *</Label>
            <Input
              id="numeroRamal"
              value={formData.numeroRamal}
              onChange={(e) => handleInputChange("numeroRamal", e.target.value)}
              placeholder="Ex: 2001"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usuarioAssociado">Usuário Associado (Opcional)</Label>
            <Input
              id="usuarioAssociado"
              value={formData.usuarioAssociado}
              onChange={(e) => handleInputChange("usuarioAssociado", e.target.value)}
              placeholder="Nome do usuário responsável"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="setor">Setor *</Label>
            <Select value={formData.setor} onValueChange={(value) => handleInputChange("setor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {setores.map(setor => (
                  <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modeloAparelho">Modelo do Aparelho *</Label>
            <Select value={formData.modeloAparelho} onValueChange={(value) => handleInputChange("modeloAparelho", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                {modelosAparelho.map(modelo => (
                  <SelectItem key={modelo} value={modelo}>{modelo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="localizacao">Localização *</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) => handleInputChange("localizacao", e.target.value)}
              placeholder="Ex: Sala 101 - Comercial"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações (Opcional)</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Observações sobre o ramal"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar Ramal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};