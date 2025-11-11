import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface NovoCenarioModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (cenario: CenarioFormData) => void;
}

interface CenarioFormData {
  nome: string;
  aliquotaICMS: number;
  aliquotaPIS: number;
  aliquotaCOFINS: number;
  aliquotaIPI: number;
  regime: string;
  tipo: string;
}

const NovoCenarioModal = ({ open, onClose, onSave }: NovoCenarioModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CenarioFormData>({
    nome: "",
    aliquotaICMS: 0,
    aliquotaPIS: 0,
    aliquotaCOFINS: 0,
    aliquotaIPI: 0,
    regime: "",
    tipo: ""
  });

  const handleInputChange = (field: keyof CenarioFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.regime || !formData.tipo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha Nome, Regime e Tipo",
        variant: "destructive"
      });
      return;
    }
    
    onSave(formData);
    onClose();
    
    // Limpar formulário
    setFormData({
      nome: "",
      aliquotaICMS: 0,
      aliquotaPIS: 0,
      aliquotaCOFINS: 0,
      aliquotaIPI: 0,
      regime: "",
      tipo: ""
    });

    toast({
      title: "Sucesso",
      description: "Cenário fiscal criado com sucesso"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Cenário Fiscal</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              placeholder="Ex: Nota Fiscal Eletrônica - NFe"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
            />
          </div>

          {/* Alíquotas - Grid 2 colunas */}
          <div className="grid grid-cols-2 gap-4">
            {/* %ICMS */}
            <div className="space-y-2">
              <Label htmlFor="icms">% ICMS</Label>
              <div className="relative">
                <Input
                  id="icms"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.aliquotaICMS || ""}
                  onChange={(e) => handleInputChange("aliquotaICMS", parseFloat(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            {/* %PIS */}
            <div className="space-y-2">
              <Label htmlFor="pis">% PIS</Label>
              <div className="relative">
                <Input
                  id="pis"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.aliquotaPIS || ""}
                  onChange={(e) => handleInputChange("aliquotaPIS", parseFloat(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            {/* %COFINS */}
            <div className="space-y-2">
              <Label htmlFor="cofins">% COFINS</Label>
              <div className="relative">
                <Input
                  id="cofins"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.aliquotaCOFINS || ""}
                  onChange={(e) => handleInputChange("aliquotaCOFINS", parseFloat(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            {/* %IPI */}
            <div className="space-y-2">
              <Label htmlFor="ipi">% IPI</Label>
              <div className="relative">
                <Input
                  id="ipi"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.aliquotaIPI || ""}
                  onChange={(e) => handleInputChange("aliquotaIPI", parseFloat(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
          </div>

          {/* Regime e Tipo - Grid 2 colunas */}
          <div className="grid grid-cols-2 gap-4">
            {/* Regime */}
            <div className="space-y-2">
              <Label htmlFor="regime">Regime *</Label>
              <Select 
                value={formData.regime} 
                onValueChange={(value) => handleInputChange("regime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o regime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 - Simples</SelectItem>
                  <SelectItem value="1">1 - Normal</SelectItem>
                  <SelectItem value="2">2 - MEI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select 
                value={formData.tipo} 
                onValueChange={(value) => handleInputChange("tipo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produto">Produto</SelectItem>
                  <SelectItem value="Serviço">Serviço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Cenário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoCenarioModal;
