import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { RamalTelefone } from "@/types/ti";

interface EditarRamalModalProps {
  open: boolean;
  onClose: () => void;
  ramal: RamalTelefone | null;
}

export const EditarRamalModal = ({ open, onClose, ramal }: EditarRamalModalProps) => {
  const [formData, setFormData] = useState({
    numeroRamal: "",
    usuarioAssociado: "",
    setor: "",
    modeloAparelho: "",
    status: "",
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

  useEffect(() => {
    if (ramal) {
      setFormData({
        numeroRamal: ramal.numeroRamal,
        usuarioAssociado: ramal.usuarioAssociado || "",
        setor: ramal.setor,
        modeloAparelho: ramal.modeloAparelho,
        status: ramal.status,
        localizacao: ramal.localizacao,
        observacoes: ramal.observacoes || ""
      });
    }
  }, [ramal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Sucesso",
      description: "Ramal atualizado com sucesso!"
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!ramal) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Ramal {ramal.numeroRamal}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numeroRamal">Número do Ramal</Label>
            <Input
              id="numeroRamal"
              value={formData.numeroRamal}
              onChange={(e) => handleInputChange("numeroRamal", e.target.value)}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usuarioAssociado">Usuário Associado</Label>
            <Input
              id="usuarioAssociado"
              value={formData.usuarioAssociado}
              onChange={(e) => handleInputChange("usuarioAssociado", e.target.value)}
              placeholder="Nome do usuário responsável"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="setor">Setor</Label>
            <Select value={formData.setor} onValueChange={(value) => handleInputChange("setor", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {setores.map(setor => (
                  <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modeloAparelho">Modelo do Aparelho</Label>
            <Select value={formData.modeloAparelho} onValueChange={(value) => handleInputChange("modeloAparelho", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {modelosAparelho.map(modelo => (
                  <SelectItem key={modelo} value={modelo}>{modelo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operacional">Operacional</SelectItem>
                <SelectItem value="com_defeito">Com Defeito</SelectItem>
                <SelectItem value="em_manutencao">Em Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="localizacao">Localização</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) => handleInputChange("localizacao", e.target.value)}
              placeholder="Ex: Sala 101 - Comercial"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
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
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};