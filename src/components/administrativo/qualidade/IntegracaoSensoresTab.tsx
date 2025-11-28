import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Thermometer, Droplets, AlertTriangle, CheckCircle, XCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Sensor {
  id: string;
  nome: string;
  tipo: 'temperatura' | 'umidade' | 'pressao' | 'outro';
  localizacao: string;
  valorAtual: number;
  unidade: string;
  limiteMinimo: number;
  limiteMaximo: number;
  ativo: boolean;
  alarmeAtivo: boolean;
  ultimaLeitura: string;
}

export const IntegracaoSensoresTab = () => {
  const { toast } = useToast();
  const [sensores, setSensores] = useState<Sensor[]>([
    {
      id: '1',
      nome: 'Câmara Fria - Setor A',
      tipo: 'temperatura',
      localizacao: 'Armazém Principal - Corredor A',
      valorAtual: 4.2,
      unidade: '°C',
      limiteMinimo: 2,
      limiteMaximo: 8,
      ativo: true,
      alarmeAtivo: false,
      ultimaLeitura: new Date().toISOString()
    },
    {
      id: '2',
      nome: 'Umidade Câmara Fria - Setor A',
      tipo: 'umidade',
      localizacao: 'Armazém Principal - Corredor A',
      valorAtual: 65,
      unidade: '%',
      limiteMinimo: 40,
      limiteMaximo: 70,
      ativo: true,
      alarmeAtivo: false,
      ultimaLeitura: new Date().toISOString()
    },
    {
      id: '3',
      nome: 'Câmara Fria - Setor B',
      tipo: 'temperatura',
      localizacao: 'Armazém Principal - Corredor B',
      valorAtual: 9.5,
      unidade: '°C',
      limiteMinimo: 2,
      limiteMaximo: 8,
      ativo: true,
      alarmeAtivo: true,
      ultimaLeitura: new Date(Date.now() - 300000).toISOString()
    }
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoSensor, setNovoSensor] = useState<Omit<Sensor, 'id' | 'valorAtual' | 'alarmeAtivo' | 'ultimaLeitura'>>({
    nome: '',
    tipo: 'temperatura',
    localizacao: '',
    unidade: '°C',
    limiteMinimo: 0,
    limiteMaximo: 100,
    ativo: true
  });

  const adicionarSensor = () => {
    if (!novoSensor.nome || !novoSensor.localizacao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome e localização do sensor.",
        variant: "destructive"
      });
      return;
    }

    const sensor: Sensor = {
      ...novoSensor,
      id: Date.now().toString(),
      valorAtual: 0,
      alarmeAtivo: false,
      ultimaLeitura: new Date().toISOString()
    };

    setSensores([...sensores, sensor]);
    setNovoSensor({
      nome: '',
      tipo: 'temperatura',
      localizacao: '',
      unidade: '°C',
      limiteMinimo: 0,
      limiteMaximo: 100,
      ativo: true
    });
    setMostrarFormulario(false);

    toast({
      title: "Sensor adicionado",
      description: "O sensor foi cadastrado com sucesso."
    });
  };

  const toggleSensorAtivo = (id: string) => {
    setSensores(sensores.map(s => 
      s.id === id ? { ...s, ativo: !s.ativo } : s
    ));
  };

  const getStatusSensor = (sensor: Sensor) => {
    if (!sensor.ativo) return 'inativo';
    if (sensor.alarmeAtivo) return 'alarme';
    if (sensor.valorAtual < sensor.limiteMinimo || sensor.valorAtual > sensor.limiteMaximo) return 'alerta';
    return 'normal';
  };

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'temperatura':
        return <Thermometer className="h-5 w-5" />;
      case 'umidade':
        return <Droplets className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Integração com Sensores e Máquinas</h3>
          <p className="text-sm text-muted-foreground">
            Monitore temperatura, umidade e outros parâmetros em tempo real
          </p>
        </div>
        <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Sensor
        </Button>
      </div>

      {mostrarFormulario && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Sensor</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Câmara Fria - Setor A"
                  value={novoSensor.nome}
                  onChange={(e) => setNovoSensor({ ...novoSensor, nome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Sensor</Label>
                <select
                  id="tipo"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={novoSensor.tipo}
                  onChange={(e) => setNovoSensor({ 
                    ...novoSensor, 
                    tipo: e.target.value as any,
                    unidade: e.target.value === 'temperatura' ? '°C' : e.target.value === 'umidade' ? '%' : ''
                  })}
                >
                  <option value="temperatura">Temperatura</option>
                  <option value="umidade">Umidade</option>
                  <option value="pressao">Pressão</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="localizacao">Localização</Label>
              <Input
                id="localizacao"
                placeholder="Ex: Armazém Principal - Corredor A"
                value={novoSensor.localizacao}
                onChange={(e) => setNovoSensor({ ...novoSensor, localizacao: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade</Label>
                <Input
                  id="unidade"
                  placeholder="°C, %, bar"
                  value={novoSensor.unidade}
                  onChange={(e) => setNovoSensor({ ...novoSensor, unidade: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limiteMinimo">Limite Mínimo</Label>
                <Input
                  id="limiteMinimo"
                  type="number"
                  value={novoSensor.limiteMinimo}
                  onChange={(e) => setNovoSensor({ ...novoSensor, limiteMinimo: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limiteMaximo">Limite Máximo</Label>
                <Input
                  id="limiteMaximo"
                  type="number"
                  value={novoSensor.limiteMaximo}
                  onChange={(e) => setNovoSensor({ ...novoSensor, limiteMaximo: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarSensor}>
                Adicionar Sensor
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensores.map((sensor) => {
          const status = getStatusSensor(sensor);
          
          return (
            <Card key={sensor.id} className={`p-6 ${
              status === 'alarme' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' :
              status === 'alerta' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
              status === 'inativo' ? 'border-gray-300 bg-gray-50 dark:bg-gray-950/20' :
              'border-green-500 bg-green-50 dark:bg-green-950/20'
            }`}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      status === 'alarme' ? 'bg-red-200 dark:bg-red-900/40' :
                      status === 'alerta' ? 'bg-yellow-200 dark:bg-yellow-900/40' :
                      status === 'inativo' ? 'bg-gray-200 dark:bg-gray-900/40' :
                      'bg-green-200 dark:bg-green-900/40'
                    }`}>
                      {getIconeTipo(sensor.tipo)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{sensor.nome}</h4>
                      <p className="text-sm text-muted-foreground">{sensor.localizacao}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {status === 'alarme' && (
                      <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
                    )}
                    {status === 'alerta' && (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    )}
                    {status === 'normal' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {status === 'inativo' && (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Valor Atual</span>
                    <span className="text-2xl font-bold">
                      {sensor.valorAtual} {sensor.unidade}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Limites</span>
                    <span>
                      {sensor.limiteMinimo} - {sensor.limiteMaximo} {sensor.unidade}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Última leitura</span>
                    <span>
                      {new Date(sensor.ultimaLeitura).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Label htmlFor={`sensor-${sensor.id}`} className="text-sm cursor-pointer">
                    Sensor ativo
                  </Label>
                  <Switch
                    id={`sensor-${sensor.id}`}
                    checked={sensor.ativo}
                    onCheckedChange={() => toggleSensorAtivo(sensor.id)}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {sensores.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum sensor cadastrado</p>
            <p className="text-sm">Adicione sensores para monitorar temperatura, umidade e outros parâmetros</p>
          </div>
        </Card>
      )}
    </div>
  );
};
