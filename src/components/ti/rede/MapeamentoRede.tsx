import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Cloud, Shield, Network, Wifi, Server, AlertTriangle } from 'lucide-react';
import { ElementoRede, TipoElementoRede, StatusElementoRede } from '@/types/ti';

// Mock data para elementos da rede
const mockElementosRede: ElementoRede[] = [
  {
    id: 'internet-1',
    idAtivo: 'NET-001',
    tipo: TipoElementoRede.INTERNET,
    status: StatusElementoRede.ONLINE,
    posicao: { x: 50, y: 20 }
  },
  {
    id: 'firewall-1',
    idAtivo: 'FW-001',
    tipo: TipoElementoRede.FIREWALL,
    status: StatusElementoRede.ONLINE,
    pontosEmUso: 2,
    pontosTotal: 8,
    ultimaQueda: '2024-01-10T15:30:00',
    posicao: { x: 50, y: 35 }
  },
  {
    id: 'switch-1',
    idAtivo: 'SW-001',
    tipo: TipoElementoRede.SWITCH,
    status: StatusElementoRede.ONLINE,
    pontosEmUso: 18,
    pontosTotal: 24,
    ultimaQueda: '2024-01-08T09:15:00',
    posicao: { x: 30, y: 55 }
  },
  {
    id: 'switch-2',
    idAtivo: 'SW-002',
    tipo: TipoElementoRede.SWITCH,
    status: StatusElementoRede.MANUTENCAO,
    pontosEmUso: 0,
    pontosTotal: 24,
    ultimaQueda: '2024-01-15T10:00:00',
    posicao: { x: 70, y: 55 }
  },
  {
    id: 'ap-1',
    idAtivo: 'AP-001',
    tipo: TipoElementoRede.ACCESS_POINT,
    status: StatusElementoRede.ONLINE,
    pontosEmUso: 15,
    pontosTotal: 50,
    posicao: { x: 20, y: 75 }
  },
  {
    id: 'ap-2',
    idAtivo: 'AP-002',
    tipo: TipoElementoRede.ACCESS_POINT,
    status: StatusElementoRede.ONLINE,
    pontosEmUso: 23,
    pontosTotal: 50,
    posicao: { x: 80, y: 75 }
  },
  {
    id: 'srv-1',
    idAtivo: 'SRV-001',
    tipo: TipoElementoRede.SERVIDOR,
    status: StatusElementoRede.ONLINE,
    posicao: { x: 50, y: 75 }
  }
];

const getElementIcon = (tipo: TipoElementoRede) => {
  switch (tipo) {
    case TipoElementoRede.INTERNET: return Cloud;
    case TipoElementoRede.FIREWALL: return Shield;
    case TipoElementoRede.SWITCH: return Network;
    case TipoElementoRede.ACCESS_POINT: return Wifi;
    case TipoElementoRede.SERVIDOR: return Server;
    default: return Network;
  }
};

const getStatusColor = (status: StatusElementoRede) => {
  switch (status) {
    case StatusElementoRede.ONLINE: return 'text-green-600 fill-green-600';
    case StatusElementoRede.OFFLINE: return 'text-red-600 fill-red-600';
    case StatusElementoRede.MANUTENCAO: return 'text-yellow-600 fill-yellow-600';
    default: return 'text-gray-600 fill-gray-600';
  }
};

const ElementoRedeComponent: React.FC<{ elemento: ElementoRede }> = ({ elemento }) => {
  const Icon = getElementIcon(elemento.tipo);
  const colorClass = getStatusColor(elemento.status);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div 
          className="absolute cursor-pointer hover:scale-110 transition-transform"
          style={{ 
            left: `${elemento.posicao.x}%`, 
            top: `${elemento.posicao.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Icon className={`h-8 w-8 ${colorClass}`} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">ID do Ativo: {elemento.idAtivo}</h4>
            <Badge variant={elemento.status === StatusElementoRede.ONLINE ? 'default' : 'destructive'}>
              {elemento.status === StatusElementoRede.ONLINE ? 'Online' : 
               elemento.status === StatusElementoRede.OFFLINE ? 'Offline' : 'Manutenção'}
            </Badge>
          </div>
          
          {elemento.pontosEmUso !== undefined && elemento.pontosTotal && (
            <div>
              <p className="text-sm text-muted-foreground">Pontos em Uso:</p>
              <p className="font-medium">{elemento.pontosEmUso}/{elemento.pontosTotal}</p>
            </div>
          )}
          
          {elemento.ultimaQueda && (
            <div>
              <p className="text-sm text-muted-foreground">Última Queda:</p>
              <p className="font-medium">{new Date(elemento.ultimaQueda).toLocaleString('pt-BR')}</p>
            </div>
          )}

          <Button size="sm" variant="outline" className="w-full">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Registrar Incidente
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const MapeamentoRede: React.FC = () => {
  const [localidadeSelecionada, setLocalidadeSelecionada] = useState('RJ');

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mapeamento da Rede Corporativa</CardTitle>
          <CardDescription>
            Visualização gráfica da infraestrutura de rede por localidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtro de Localidade */}
          <div className="mb-6">
            <Select value={localidadeSelecionada} onValueChange={setLocalidadeSelecionada}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecione a Unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RJ">RJ - Rio de Janeiro</SelectItem>
                <SelectItem value="SP">SP - São Paulo</SelectItem>
                <SelectItem value="OUTRAS">Demais Localidades</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Área do Diagrama */}
          <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-white border-2 border-dashed border-border rounded-lg overflow-hidden">
            {/* Linhas de conexão */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Internet -> Firewall */}
              <line x1="50%" y1="20%" x2="50%" y2="35%" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Firewall -> Switches */}
              <line x1="50%" y1="35%" x2="30%" y2="55%" stroke="#94a3b8" strokeWidth="2" />
              <line x1="50%" y1="35%" x2="70%" y2="55%" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Switch1 -> AP1 */}
              <line x1="30%" y1="55%" x2="20%" y2="75%" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Switch2 -> AP2 e Servidor */}
              <line x1="70%" y1="55%" x2="80%" y2="75%" stroke="#94a3b8" strokeWidth="2" />
              <line x1="70%" y1="55%" x2="50%" y2="75%" stroke="#94a3b8" strokeWidth="2" />
            </svg>

            {/* Elementos da Rede */}
            {mockElementosRede.map((elemento) => (
              <ElementoRedeComponent key={elemento.id} elemento={elemento} />
            ))}

            {/* Labels dos níveis */}
            <div className="absolute left-4 top-4 space-y-16 text-xs text-muted-foreground">
              <div>Internet</div>
              <div>Segurança</div>
              <div>Core Network</div>
              <div>Access Layer</div>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Internet</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span className="text-sm">Firewall</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-600" />
              <span className="text-sm">Switch</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-600" />
              <span className="text-sm">Access Point</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-orange-600" />
              <span className="text-sm">Servidor</span>
            </div>
          </div>

          {/* Status da Rede */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status Geral</span>
                  <Badge variant="default">Operacional</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Equipamentos Online</span>
                  <span className="font-bold text-green-600">6/7</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Última Verificação</span>
                  <span className="text-sm">{new Date().toLocaleTimeString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapeamentoRede;