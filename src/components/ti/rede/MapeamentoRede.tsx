import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Cloud, Shield, Router, Wifi, AlertTriangle } from "lucide-react";
import { tiModules } from "@/data/tiModules";

const MapeamentoRede = () => {
  const [localidadeSelecionada, setLocalidadeSelecionada] = useState('RJ');
  
  // Dados da rede do módulo
  const elementosRede = tiModules.rede.subModules.topologia.data || [];

  const getIconeElemento = (tipo: string) => {
    switch (tipo) {
      case 'internet': return <Cloud className="h-8 w-8 text-blue-500" />;
      case 'firewall': return <Shield className="h-8 w-8 text-red-500" />;
      case 'switch': return <Router className="h-8 w-8 text-green-500" />;
      case 'access_point': return <Wifi className="h-8 w-8 text-purple-500" />;
      case 'servidor': return <Router className="h-8 w-8 text-gray-600" />;
      default: return <Router className="h-8 w-8 text-gray-400" />;
    }
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'online': return 'border-green-500 bg-green-50';
      case 'offline': return 'border-red-500 bg-red-50';
      case 'alerta': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'offline': return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
      case 'alerta': return <Badge className="bg-yellow-100 text-yellow-800">Alerta</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>;
    }
  };

  // Conexões entre elementos (linhas do diagrama)
  const conexoes = [
    { origem: 'internet', destino: 'firewall-01' },
    { origem: 'firewall-01', destino: 'switch-01' },
    { origem: 'switch-01', destino: 'ap-01' },
    { origem: 'switch-01', destino: 'ap-02' }
  ];

  const desenharLinha = (origem: any, destino: any) => {
    return (
      <line
        key={`${origem.id}-${destino.id}`}
        x1={origem.x}
        y1={origem.y}
        x2={destino.x}
        y2={destino.y}
        stroke="#6b7280"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    );
  };

  const renderLinhas = () => {
    return conexoes.map(conexao => {
      const origem = elementosRede.find((el: any) => el.id === conexao.origem);
      const destino = elementosRede.find((el: any) => el.id === conexao.destino);
      
      if (origem && destino) {
        return desenharLinha(origem, destino);
      }
      return null;
    });
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mapeamento da Rede Corporativa</CardTitle>
              <p className="text-muted-foreground mt-1">
                Visualização gráfica da infraestrutura de rede por localidade
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-64">
                <Select value={localidadeSelecionada} onValueChange={setLocalidadeSelecionada}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a Unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RJ">Rio de Janeiro - RJ</SelectItem>
                    <SelectItem value="SP">São Paulo - SP</SelectItem>
                    <SelectItem value="DEMAIS">Demais Localidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Registrar Incidente de Rede
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Área do diagrama */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 min-h-[600px] relative overflow-hidden">
            {/* SVG para as linhas de conexão */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {renderLinhas()}
            </svg>

            {/* Elementos da rede */}
            {elementosRede.map((elemento: any) => (
              <Popover key={elemento.id}>
                <PopoverTrigger asChild>
                  <div
                    className={`absolute cursor-pointer transition-all hover:scale-110 ${getCorStatus(elemento.status)}`}
                    style={{
                      left: elemento.x - 30,
                      top: elemento.y - 30,
                      zIndex: 10
                    }}
                  >
                    <div className="w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-white shadow-md hover:shadow-lg">
                      {getIconeElemento(elemento.tipo)}
                    </div>
                    <div className="text-center mt-1">
                      <p className="text-xs font-medium text-gray-700 truncate w-16">
                        {elemento.nome}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                
                <PopoverContent className="w-80" side="right">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{elemento.nome}</h4>
                      {getStatusBadge(elemento.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID do Ativo:</span>
                        <span className="font-medium">{elemento.id.toUpperCase()}</span>
                      </div>
                      
                      {elemento.ip && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Endereço IP:</span>
                          <span className="font-mono text-xs">{elemento.ip}</span>
                        </div>
                      )}
                      
                      {elemento.pontosEmUso && elemento.pontosTotal && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pontos em Uso:</span>
                          <span className="font-medium">
                            {elemento.pontosEmUso}/{elemento.pontosTotal}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Localização:</span>
                        <span className="font-medium">{elemento.localizacao}</span>
                      </div>
                      
                      {elemento.ultimaQueda && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Última Queda:</span>
                          <span className="text-red-600 text-xs">{elemento.ultimaQueda}</span>
                        </div>
                      )}
                    </div>
                    
                    {elemento.pontosEmUso && elemento.pontosTotal && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Utilização</span>
                          <span>{Math.round((elemento.pontosEmUso / elemento.pontosTotal) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ 
                              width: `${(elemento.pontosEmUso / elemento.pontosTotal) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        Detalhes
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Reiniciar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}

            {/* Legenda */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg border shadow-md p-4">
              <h5 className="font-semibold text-sm mb-3">Legenda</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Alerta</span>
                </div>
              </div>
            </div>

            {/* Informações da localidade */}
            <div className="absolute top-4 left-4 bg-white rounded-lg border shadow-md p-4">
              <h5 className="font-semibold text-sm mb-2">Localidade: {localidadeSelecionada}</h5>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Elementos ativos: {elementosRede.filter((el: any) => el.status === 'online').length}</p>
                <p>Total de elementos: {elementosRede.length}</p>
                <p>Última atualização: {new Date().toLocaleTimeString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapeamentoRede;