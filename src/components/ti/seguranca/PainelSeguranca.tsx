import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Shield, Eye, Search, Filter } from 'lucide-react';
import { IncidenteSeguranca, AuditoriaAcesso, StatusAntivirus, TipoIncidenteSeguranca, StatusIncidenteSeguranca } from '@/types/ti';

// Mock data
const mockIncidentes: IncidenteSeguranca[] = [
  {
    id: 'SEC-001',
    tipo: TipoIncidenteSeguranca.ACESSO_SUSPEITO,
    descricao: 'Login fora do horário comercial - João Silva',
    status: StatusIncidenteSeguranca.NOVO,
    dataDeteccao: '2024-01-15T22:30:00',
    gravidade: 'media'
  },
  {
    id: 'SEC-002',
    tipo: TipoIncidenteSeguranca.FIREWALL,
    descricao: 'Tentativa de acesso bloqueada - IP 192.168.1.100',
    status: StatusIncidenteSeguranca.EM_INVESTIGACAO,
    dataDeteccao: '2024-01-15T14:15:00',
    investigador: 'Carlos Security',
    gravidade: 'alta'
  },
  {
    id: 'SEC-003',
    tipo: TipoIncidenteSeguranca.MALWARE,
    descricao: 'Arquivo suspeito detectado na estação WS-045',
    status: StatusIncidenteSeguranca.RESOLVIDO,
    dataDeteccao: '2024-01-15T09:45:00',
    investigador: 'Maria Security',
    resolucao: 'Arquivo removido e estação limpa',
    gravidade: 'critica'
  }
];

const mockAuditoriaAcessos: AuditoriaAcesso[] = [
  {
    id: 'AUD-001',
    usuario: 'joao.silva',
    sistema: 'ERP Financeiro',
    dataHora: '2024-01-15T08:30:00',
    enderecoIP: '192.168.1.50',
    status: 'sucesso'
  },
  {
    id: 'AUD-002',
    usuario: 'maria.santos',
    sistema: 'Sistema RH',
    dataHora: '2024-01-15T08:25:00',
    enderecoIP: '192.168.1.75',
    status: 'sucesso'
  },
  {
    id: 'AUD-003',
    usuario: 'usuario.teste',
    sistema: 'ERP Financeiro',
    dataHora: '2024-01-15T03:15:00',
    enderecoIP: '10.0.0.15',
    status: 'falha',
    tentativas: 5
  }
];

const mockStatusAntivirus: StatusAntivirus[] = [
  {
    id: 'AV-001',
    estacaoTrabalho: 'WS-001',
    usuario: 'João Silva',
    status: 'atualizado',
    ultimaVerificacao: '2024-01-15T06:00:00',
    versaoDefinicoes: '2024.01.15.001'
  },
  {
    id: 'AV-002',
    estacaoTrabalho: 'WS-002',
    usuario: 'Maria Santos',
    status: 'desatualizado',
    ultimaVerificacao: '2024-01-10T06:00:00',
    versaoDefinicoes: '2024.01.10.001'
  },
  {
    id: 'AV-003',
    estacaoTrabalho: 'WS-003',
    usuario: 'Carlos Tech',
    status: 'inativo',
    ultimaVerificacao: '2024-01-05T06:00:00',
    versaoDefinicoes: '2024.01.05.001',
    ameacasDetectadas: 2
  }
];

const PainelSeguranca: React.FC = () => {
  const [filtros, setFiltros] = useState({
    incidentes: { status: '', gravidade: '' },
    auditoria: { usuario: '', status: '' },
    antivirus: { status: '' }
  });

  const getGravidadeBadge = (gravidade: string) => {
    switch (gravidade) {
      case 'critica': return <Badge variant="destructive">Crítica</Badge>;
      case 'alta': return <Badge variant="default">Alta</Badge>;
      case 'media': return <Badge variant="secondary">Média</Badge>;
      case 'baixa': return <Badge variant="outline">Baixa</Badge>;
      default: return <Badge variant="outline">{gravidade}</Badge>;
    }
  };

  const getStatusIncidenteBadge = (status: StatusIncidenteSeguranca) => {
    switch (status) {
      case StatusIncidenteSeguranca.NOVO: return <Badge variant="destructive">Novo</Badge>;
      case StatusIncidenteSeguranca.EM_INVESTIGACAO: return <Badge variant="default">Em Investigação</Badge>;
      case StatusIncidenteSeguranca.RESOLVIDO: return <Badge variant="secondary">Resolvido</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusAntivirusBadge = (status: string) => {
    switch (status) {
      case 'atualizado': return <Badge variant="default">Atualizado</Badge>;
      case 'desatualizado': return <Badge variant="secondary">Desatualizado</Badge>;
      case 'inativo': return <Badge variant="destructive">Inativo</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Painel de Controle de Segurança
          </CardTitle>
          <CardDescription>
            Monitoramento e gestão de segurança da informação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="incidentes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="incidentes">Registro de Incidentes</TabsTrigger>
              <TabsTrigger value="auditoria">Auditoria de Acessos</TabsTrigger>
              <TabsTrigger value="antivirus">Status do Antivírus</TabsTrigger>
            </TabsList>

            {/* Aba Registro de Incidentes */}
            <TabsContent value="incidentes" className="space-y-4">
              {/* Filtros */}
              <div className="flex gap-4">
                <Select 
                  value={filtros.incidentes.status} 
                  onValueChange={(value) => setFiltros(prev => ({ 
                    ...prev, 
                    incidentes: { ...prev.incidentes, status: value } 
                  }))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os Status</SelectItem>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="em_investigacao">Em Investigação</SelectItem>
                    <SelectItem value="resolvido">Resolvido</SelectItem>
                  </SelectContent>
                </Select>

                <Select 
                  value={filtros.incidentes.gravidade} 
                  onValueChange={(value) => setFiltros(prev => ({ 
                    ...prev, 
                    incidentes: { ...prev.incidentes, gravidade: value } 
                  }))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por Gravidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as Gravidades</SelectItem>
                    <SelectItem value="critica">Crítica</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabela de Incidentes */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo de Alerta</TableHead>
                      <TableHead>Detalhe do Incidente</TableHead>
                      <TableHead>Gravidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Investigador</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIncidentes.map((incidente) => (
                      <TableRow key={incidente.id}>
                        <TableCell className="font-mono">{incidente.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {incidente.tipo.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{incidente.descricao}</TableCell>
                        <TableCell>{getGravidadeBadge(incidente.gravidade)}</TableCell>
                        <TableCell>{getStatusIncidenteBadge(incidente.status)}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(incidente.dataDeteccao).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell>{incidente.investigador || '-'}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Aba Auditoria de Acessos */}
            <TabsContent value="auditoria" className="space-y-4">
              {/* Filtros */}
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por usuário"
                    value={filtros.auditoria.usuario}
                    onChange={(e) => setFiltros(prev => ({ 
                      ...prev, 
                      auditoria: { ...prev.auditoria, usuario: e.target.value } 
                    }))}
                    className="pl-10 w-64"
                  />
                </div>

                <Select 
                  value={filtros.auditoria.status} 
                  onValueChange={(value) => setFiltros(prev => ({ 
                    ...prev, 
                    auditoria: { ...prev.auditoria, status: value } 
                  }))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os Status</SelectItem>
                    <SelectItem value="sucesso">Sucesso</SelectItem>
                    <SelectItem value="falha">Falha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabela de Auditoria */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Sistema</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Endereço IP</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tentativas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAuditoriaAcessos.map((acesso) => (
                      <TableRow key={acesso.id}>
                        <TableCell className="font-medium">{acesso.usuario}</TableCell>
                        <TableCell>{acesso.sistema}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(acesso.dataHora).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{acesso.enderecoIP}</TableCell>
                        <TableCell>
                          <Badge variant={acesso.status === 'sucesso' ? 'default' : 'destructive'}>
                            {acesso.status === 'sucesso' ? 'Sucesso' : 'Falha'}
                          </Badge>
                        </TableCell>
                        <TableCell>{acesso.tentativas || 1}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Aba Status do Antivírus */}
            <TabsContent value="antivirus" className="space-y-4">
              {/* Filtros */}
              <div className="flex gap-4">
                <Select 
                  value={filtros.antivirus.status} 
                  onValueChange={(value) => setFiltros(prev => ({ 
                    ...prev, 
                    antivirus: { ...prev.antivirus, status: value } 
                  }))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os Status</SelectItem>
                    <SelectItem value="atualizado">Atualizado</SelectItem>
                    <SelectItem value="desatualizado">Desatualizado</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabela de Status do Antivírus */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estação de Trabalho</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Status do Antivírus</TableHead>
                      <TableHead>Última Verificação</TableHead>
                      <TableHead>Versão das Definições</TableHead>
                      <TableHead>Ameaças Detectadas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStatusAntivirus.map((status) => (
                      <TableRow key={status.id}>
                        <TableCell className="font-mono">{status.estacaoTrabalho}</TableCell>
                        <TableCell>{status.usuario}</TableCell>
                        <TableCell>{getStatusAntivirusBadge(status.status)}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(status.ultimaVerificacao).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{status.versaoDefinicoes}</TableCell>
                        <TableCell>
                          {status.ameacasDetectadas ? (
                            <Badge variant="destructive">{status.ameacasDetectadas}</Badge>
                          ) : (
                            <span className="text-muted-foreground">0</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PainelSeguranca;