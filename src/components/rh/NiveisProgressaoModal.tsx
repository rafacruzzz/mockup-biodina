
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, TrendingUp, Edit } from "lucide-react";
import { toast } from "sonner";
import { modules } from "@/data/rhModules";

interface NivelEdicao {
  id: number;
  cargoId: number;
  cargo: string;
  nivel: number;
  valorMinimo: string;
  valorMaximo: string;
  requisitos?: string;
}

interface NiveisProgressaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NiveisProgressaoModal = ({ isOpen, onClose }: NiveisProgressaoModalProps) => {
  const [cargoSelecionado, setCargoSelecionado] = useState('');
  const [niveisEdicao, setNiveisEdicao] = useState<NivelEdicao[]>([]);

  const cargosDisponiveis = modules.planosCarreira.subModules.cargos.data;
  const todosNiveis = modules.planosCarreira.subModules.niveis.data;

  useEffect(() => {
    if (cargoSelecionado) {
      const cargoId = parseInt(cargoSelecionado);
      const niveisCargo = todosNiveis
        .filter(nivel => nivel.cargoId === cargoId)
        .map(nivel => ({
          ...nivel,
          valorMinimo: nivel.valorMinimo.toString(),
          valorMaximo: nivel.valorMaximo.toString(),
          requisitos: nivel.requisitos || ''
        }));
      
      setNiveisEdicao(niveisCargo);
    } else {
      setNiveisEdicao([]);
    }
  }, [cargoSelecionado]);

  const handleNivelChange = (index: number, field: keyof NivelEdicao, value: string) => {
    setNiveisEdicao(prev => prev.map((nivel, i) => 
      i === index ? { ...nivel, [field]: value } : nivel
    ));
  };

  const handleSave = () => {
    if (!cargoSelecionado) {
      toast.error("Selecione um cargo para gerenciar os níveis");
      return;
    }

    // Validar valores
    const niveisInvalidos = niveisEdicao.filter(nivel => 
      !nivel.valorMinimo || !nivel.valorMaximo || 
      parseFloat(nivel.valorMinimo) > parseFloat(nivel.valorMaximo)
    );

    if (niveisInvalidos.length > 0) {
      toast.error("Verifique os valores dos níveis. Valor mínimo deve ser menor que o máximo");
      return;
    }

    console.log('Salvando níveis:', niveisEdicao);
    toast.success("Níveis de progressão atualizados com sucesso!");
    
    onClose();
  };

  const cargoInfo = cargosDisponiveis.find(c => c.id.toString() === cargoSelecionado);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-imuv-cyan/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-imuv-cyan" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-imuv-blue">
                Gerenciar Níveis de Progressão
              </DialogTitle>
              <p className="text-gray-600">Edite os valores e requisitos dos níveis</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seleção do cargo */}
          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Select value={cargoSelecionado} onValueChange={setCargoSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cargo para gerenciar os níveis" />
              </SelectTrigger>
              <SelectContent>
                {cargosDisponiveis.map((cargo) => (
                  <SelectItem key={cargo.id} value={cargo.id.toString()}>
                    {cargo.cargo} - {cargo.planoCarreira}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Informações do cargo selecionado */}
          {cargoInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Informações do Cargo</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Cargo:</span>
                  <p className="font-medium">{cargoInfo.cargo}</p>
                </div>
                <div>
                  <span className="text-blue-600">Plano:</span>
                  <p className="font-medium">{cargoInfo.planoCarreira}</p>
                </div>
                <div>
                  <span className="text-blue-600">Salário Base:</span>
                  <p className="font-medium">
                    R$ {cargoInfo.salarioBase.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabela de níveis */}
          {niveisEdicao.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-imuv-cyan" />
                <h3 className="text-lg font-semibold">Níveis de Progressão</h3>
              </div>

              <div className="space-y-3">
                {niveisEdicao.map((nivel, index) => (
                  <div key={nivel.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border rounded-lg bg-gray-50">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Nível</Label>
                      <div className="bg-white p-2 rounded border text-center font-semibold text-imuv-blue">
                        {nivel.nivel}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Valor Mínimo *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={nivel.valorMinimo}
                        onChange={(e) => handleNivelChange(index, 'valorMinimo', e.target.value)}
                        placeholder="R$ 0,00"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Valor Máximo *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={nivel.valorMaximo}
                        onChange={(e) => handleNivelChange(index, 'valorMaximo', e.target.value)}
                        placeholder="R$ 0,00"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Faixa Calculada</Label>
                      <div className="bg-green-50 p-2 rounded border text-center text-sm">
                        {nivel.valorMinimo && nivel.valorMaximo ? 
                          `R$ ${((parseFloat(nivel.valorMinimo) + parseFloat(nivel.valorMaximo)) / 2).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}` 
                          : 'R$ 0,00'
                        }
                      </div>
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

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Dica:</strong> Os valores são usados para calcular a sugestão salarial no cadastro de colaboradores. 
                  O sistema utiliza a média entre valor mínimo e máximo de cada nível.
                </p>
              </div>
            </div>
          )}

          {niveisEdicao.length === 0 && cargoSelecionado && (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum nível encontrado para este cargo</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-imuv-cyan hover:bg-imuv-cyan/90"
            disabled={niveisEdicao.length === 0}
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NiveisProgressaoModal;
