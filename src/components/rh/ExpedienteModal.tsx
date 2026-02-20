import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Clock } from "lucide-react";
import { diasSemana, ExpedienteHorario } from "@/types/expediente";
import ExpedienteDadosTab from "./tabs/ExpedienteDadosTab";
import ExpedienteHorarioTab from "./tabs/ExpedienteHorarioTab";

interface ExpedienteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpedienteModal = ({ isOpen, onClose }: ExpedienteModalProps) => {
  const [formData, setFormData] = useState({
    dados: {
      nome: '',
      observacoes: ''
    },
    horarios: diasSemana.map(dia => ({
      dia,
      ativo: false,
      primeiroTurno: {
        inicio: '08:00',
        fim: '12:00'
      },
      segundoTurno: {
        inicio: '13:00',
        fim: '18:00'
      }
    })) as ExpedienteHorario[]
  });

  const handleDadosChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dados: {
        ...prev.dados,
        [field]: value
      }
    }));
  };

  const handleHorarioChange = (diaIndex: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      horarios: prev.horarios.map((horario, index) => {
        if (index === diaIndex) {
          if (field.includes('.')) {
            const [parent, child] = field.split('.');
            if (parent === 'primeiroTurno' || parent === 'segundoTurno') {
              return {
                ...horario,
                [parent]: {
                  ...horario[parent],
                  [child]: value
                }
              };
            }
          }
          return {
            ...horario,
            [field]: value
          };
        }
        return horario;
      })
    }));
  };

  const handleAplicarTodos = () => {
    // Encontrar o primeiro horário ativo para usar como modelo
    const primeiroHorarioAtivo = formData.horarios.find(h => h.ativo);
    
    let horariosModelo;
    if (primeiroHorarioAtivo) {
      // Se já existe um dia ativo, usar seus horários como modelo
      horariosModelo = {
        primeiroTurno: { ...primeiroHorarioAtivo.primeiroTurno },
        segundoTurno: { ...primeiroHorarioAtivo.segundoTurno }
      };
    } else {
      // Se nenhum dia estiver ativo, usar horários padrão
      horariosModelo = {
        primeiroTurno: {
          inicio: '08:00',
          fim: '12:00'
        },
        segundoTurno: {
          inicio: '13:00',
          fim: '18:00'
        }
      };
    }

    // Ativar todos os dias com os horários modelo
    setFormData(prev => ({
      ...prev,
      horarios: prev.horarios.map(horario => ({
        ...horario,
        ativo: true,
        primeiroTurno: { ...horariosModelo.primeiroTurno },
        segundoTurno: { ...horariosModelo.segundoTurno }
      }))
    }));
  };

  const handleSave = () => {
    console.log('Salvando expediente:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-imuv-cyan/10 rounded-lg">
              <Clock className="h-6 w-6 text-imuv-cyan" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-imuv-blue">
                Novo Expediente
              </DialogTitle>
              <p className="text-gray-600">Configure os horários de trabalho</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="dados" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="dados">
                Dados
              </TabsTrigger>
              <TabsTrigger value="horario">
                Horário
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="dados" className="mt-0">
                <ExpedienteDadosTab 
                  formData={formData.dados}
                  onInputChange={handleDadosChange}
                />
              </TabsContent>

              <TabsContent value="horario" className="mt-0">
                <ExpedienteHorarioTab 
                  formData={formData.horarios}
                  onInputChange={handleHorarioChange}
                  onAplicarTodos={handleAplicarTodos}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-imuv-cyan hover:bg-imuv-cyan/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Expediente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpedienteModal;
