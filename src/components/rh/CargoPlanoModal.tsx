
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Briefcase, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { planosCarreira } from "@/data/planosCarreira";

interface NivelData {
  nivel: number;
  valorMinimo: string;
  valorMaximo: string;
  requisitos: string;
}

interface CargoPlanoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CargoPlanoModal = ({ isOpen, onClose }: CargoPlanoModalProps) => {
  const [formData, setFormData] = useState({
    planoCarreiraId: '',
    cargo: '',
    salarioBase: '',
    cbo: ''
  });

  const [niveis, setNiveis] = useState<NivelData[]>([
    { nivel: 1, valorMinimo: '', valorMaximo: '', requisitos: '' },
    { nivel: 2, valorMinimo: '', valorMaximo: '', requisitos: '' },
    { nivel: 3, valorMinimo: '', valorMaximo: '', requisitos: '' },
    { nivel: 4, valorMinimo: '', valorMaximo: '', requisitos: '' },
    { nivel: 5, valorMinimo: '', valorMaximo: '', requisitos: '' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNivelChange = (index: number, field: keyof NivelData, value: string) => {
    setNiveis(prev => prev.map((nivel, i) => 
      i === index ? { ...nivel, [field]: value } : nivel
    ));
  };

  const handleSave = () => {
    if (!formData.planoCarreiraId || !formData.cargo || !formData.salarioBase) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Validar se pelo menos um nível foi preenchido
    const niveisPreenchidos = niveis.filter(n => n.valorMinimo && n.valorMaximo);
    if (niveisPreenchidos.length === 0) {
      toast.error("Preencha pelo menos um nível de progressão");
      return;
    }

    console.log('Salvando cargo:', { formData, niveis: niveisPreenchidos });
    toast.success("Cargo cadastrado com sucesso!");
    
    // Reset form
    setFormData({
      planoCarreiraId: '',
      cargo: '',
      salarioBase: '',
      cbo: ''
    });
    setNiveis([
      { nivel: 1, valorMinimo: '', valorMaximo: '', requisitos: '' },
      { nivel: 2, valorMinimo: '', valorMaximo: '', requisitos: '' },
      { nivel: 3, valorMinimo: '', valorMaximo: '', requisitos: '' },
      { nivel: 4, valorMinimo: '', valorMaximo: '', requisitos: '' },
      { nivel: 5, valorMinimo: '', valorMaximo: '', requisitos: '' }
    ]);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-imuv-cyan/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-imuv-cyan" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-imuv-blue">
                Novo Cargo no Plano
              </DialogTitle>
              <p className="text-gray-600">Cadastre um novo cargo com seus níveis de progressão</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados básicos do cargo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="planoCarreiraId">Plano de Carreira *</Label>
              <Select value={formData.planoCarreiraId} onValueChange={(value) => handleInputChange('planoCarreiraId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  {planosCarreira.map((plano) => (
                    <SelectItem key={plano.id} value={plano.id.toString()}>
                      {plano.nome} - {plano.empresa} ({plano.uf})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Nome do Cargo *</Label>
              <Input
                id="cargo"
                value={formData.cargo}
                onChange={(e) => handleInputChange('cargo', e.target.value)}
                placeholder="Ex: Analista Administrativo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salarioBase">Salário Base *</Label>
              <Input
                id="salarioBase"
                type="number"
                step="0.01"
                value={formData.salarioBase}
                onChange={(e) => handleInputChange('salarioBase', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cbo">CBO</Label>
              <Input
                id="cbo"
                value={formData.cbo}
                onChange={(e) => handleInputChange('cbo', e.target.value)}
                placeholder="Ex: 2521-05"
              />
            </div>
          </div>

          {/* Níveis de progressão */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Níveis de Progressão</h3>
              <span className="text-sm text-gray-500">(Preencha os níveis desejados)</span>
            </div>

            <div className="space-y-3">
              {niveis.map((nivel, index) => (
                <div key={nivel.nivel} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nível {nivel.nivel}</Label>
                    <div className="bg-white p-2 rounded border text-center font-semibold">
                      {nivel.nivel}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Valor Mínimo</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={nivel.valorMinimo}
                      onChange={(e) => handleNivelChange(index, 'valorMinimo', e.target.value)}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Valor Máximo</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={nivel.valorMaximo}
                      onChange={(e) => handleNivelChange(index, 'valorMaximo', e.target.value)}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Requisitos</Label>
                    <Input
                      value={nivel.requisitos}
                      onChange={(e) => handleNivelChange(index, 'requisitos', e.target.value)}
                      placeholder="Ex: 6 meses de experiência"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-imuv-cyan hover:bg-imuv-cyan/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Cargo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CargoPlanoModal;
