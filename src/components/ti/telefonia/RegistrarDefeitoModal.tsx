import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { RamalTelefone } from "@/types/ti";

interface RegistrarDefeitoModalProps {
  open: boolean;
  onClose: () => void;
  ramal: RamalTelefone | null;
}

export const RegistrarDefeitoModal = ({ open, onClose, ramal }: RegistrarDefeitoModalProps) => {
  const [formData, setFormData] = useState({
    tipoProblema: "",
    prioridade: "",
    descricaoProblema: "",
    observacoes: ""
  });

  const tiposProblema = [
    "Sem tom/linha",
    "Display com defeito", 
    "Problemas de áudio",
    "Botões não funcionam",
    "Não completa ligações",
    "Aparelho não liga",
    "Problemas de rede",
    "Outros"
  ];

  const prioridades = [
    { value: "baixa", label: "Baixa", description: "Não impacta o trabalho" },
    { value: "media", label: "Média", description: "Impacto moderado" },
    { value: "alta", label: "Alta", description: "Impede o trabalho" },
    { value: "critica", label: "Crítica", description: "Ramal essencial parado" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipoProblema || !formData.prioridade || !formData.descricaoProblema) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Aqui implementaria a criação do chamado de TI pré-preenchido
    toast({
      title: "Chamado Aberto",
      description: `Chamado #${Math.floor(Math.random() * 10000)} criado para o ramal ${ramal?.numeroRamal}`
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
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Registrar Defeito - Ramal {ramal.numeroRamal}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informações do Ramal */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Informações do Ramal</h4>
            <div className="text-sm space-y-1">
              <div><strong>Número:</strong> {ramal.numeroRamal}</div>
              <div><strong>Usuário:</strong> {ramal.usuarioAssociado || "Não associado"}</div>
              <div><strong>Setor:</strong> {ramal.setor}</div>
              <div><strong>Localização:</strong> {ramal.localizacao}</div>
              <div><strong>Modelo:</strong> {ramal.modeloAparelho}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoProblema">Tipo do Problema *</Label>
            <Select value={formData.tipoProblema} onValueChange={(value) => handleInputChange("tipoProblema", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo do problema" />
              </SelectTrigger>
              <SelectContent>
                {tiposProblema.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridade">Prioridade *</Label>
            <Select value={formData.prioridade} onValueChange={(value) => handleInputChange("prioridade", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                {prioridades.map(prioridade => (
                  <SelectItem key={prioridade.value} value={prioridade.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{prioridade.label}</span>
                      <span className="text-xs text-gray-500">{prioridade.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricaoProblema">Descrição do Problema *</Label>
            <Textarea
              id="descricaoProblema"
              value={formData.descricaoProblema}
              onChange={(e) => handleInputChange("descricaoProblema", e.target.value)}
              placeholder="Descreva detalhadamente o problema identificado..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Adicionais</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Informações adicionais que possam ajudar na resolução..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Este defeito será automaticamente registrado como um chamado de TI 
              na categoria "Telefonia" com todas as informações do ramal pré-preenchidas.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Registrar Defeito
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};