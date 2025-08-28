import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useRHModules } from "@/hooks/useRHModules";

interface NiveisProgressaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  cargoId?: string;
  cargoNome?: string;
}

interface NivelEdicao {
  id: number;
  cargoId: string;
  cargo: string;
  nivel: string;
  valorMinimo: any;
  valorMaximo: any;
  requisitos: any;
}

const NiveisProgressaoModal = ({ isOpen, onClose, cargoId, cargoNome }: NiveisProgressaoModalProps) => {
  const { rhModules } = useRHModules();
  const [niveis, setNiveis] = useState<NivelEdicao[]>([]);

  const handleAddNivel = () => {
    const novoNivel: NivelEdicao = {
      id: Date.now(),
      cargoId: cargoId || '',
      cargo: cargoNome || '',
      nivel: `Nível ${niveis.length + 1}`,
      valorMinimo: 0,
      valorMaximo: 0,
      requisitos: ''
    };
    setNiveis([...niveis, novoNivel]);
  };

  const handleUpdateNivel = (index: number, field: keyof NivelEdicao, value: any) => {
    const updatedNiveis = niveis.map((nivel, i) => 
      i === index ? { ...nivel, [field]: value } : nivel
    );
    setNiveis(updatedNiveis);
  };

  const handleRemoveNivel = (index: number) => {
    setNiveis(niveis.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const niveisParaSalvar = niveis.map(nivel => ({
      cargoId: nivel.cargoId,
      cargo: nivel.cargo,
      nivel: nivel.nivel,
      valorMinimo: nivel.valorMinimo,
      valorMaximo: nivel.valorMaximo,
      requisitos: nivel.requisitos,
      id: nivel.id
    }));
    setNiveis(niveisParaSalvar);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Níveis de Progressão - {cargoNome}</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Defina os níveis de progressão para este cargo</CardTitle>
          </CardHeader>
          <CardContent>
            {niveis.map((nivel, index) => (
              <div key={nivel.id} className="mb-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">{nivel.nivel}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`valorMinimo-${index}`}>Valor Mínimo</Label>
                    <Input
                      type="number"
                      id={`valorMinimo-${index}`}
                      value={nivel.valorMinimo}
                      onChange={(e) => handleUpdateNivel(index, 'valorMinimo', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`valorMaximo-${index}`}>Valor Máximo</Label>
                    <Input
                      type="number"
                      id={`valorMaximo-${index}`}
                      value={nivel.valorMaximo}
                      onChange={(e) => handleUpdateNivel(index, 'valorMaximo', e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor={`requisitos-${index}`}>Requisitos</Label>
                  <Textarea
                    id={`requisitos-${index}`}
                    value={nivel.requisitos}
                    onChange={(e) => handleUpdateNivel(index, 'requisitos', e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-4"
                  onClick={() => handleRemoveNivel(index)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover Nível
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddNivel}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Nível
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NiveisProgressaoModal;
