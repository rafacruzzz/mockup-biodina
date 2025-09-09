import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle,
  Clock,
  Computer,
  User
} from "lucide-react";
import { tiModules } from "@/data/tiModules";

const PainelSeguranca = () => {
  const [activeTab, setActiveTab] = useState('incidentes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // Dados de segurança do módulo
  const incidentesData = tiModules.seguranca.subModules.incidentes.data || [];
  const auditoriaData = tiModules.seguranca.subModules.auditoria.data || [];
  const antivirusData = tiModules.seguranca.subModules.antivirus.data || [];

  const getCriticidadeColor = (criticidade: string) => {
    switch (criticidade) {
      case 'critica': return 'bg-red-500 text-white';
      case 'alta': return 'bg-orange-500 text-white';
      case 'media': return 'bg-yellow-500 text-white';
      case 'baixa': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIncidenteColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-red-100 text-red-800';
      case 'investigando': return 'bg-yellow-100 text-yellow-800';
      case 'resolvido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusAcessoColor = (status: string) => {
    switch (status) {
      case 'sucesso': return 'bg-green-100 text-green-800';
      case 'falha': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusAntivirusColor = (status: string) => {
    switch (status) {
      case 'atualizado': return 'bg-green-100 text-green-800';
      case 'desatualizado': return 'bg-yellow-100 text-yellow-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  // Estatísticas gerais
  const stats = {
    incidentes: {
      total: incidentesData.length,
      novos: incidentesData.filter((i: any) => i.status === 'novo').length,
      investigando: incidentesData.filter((i: any) => i.status === 'investigando').length,
      resolvidos: incidentesData.filter((i: any) => i.status === 'resolvido').length
    },
    antivirus: {
      total: antivirusData.length,
      atualizados: antivirusData.filter((a: any) => a.status === 'atualizado').length,
      problemas: antivirusData.filter((a: any) => a.status !== 'atualizado').length
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Painel de Controle de Segurança
          </CardTitle>
          <p className="text-muted-foreground">
            Monitoramento e gestão de segurança da informação
          </p>
        </CardHeader>
      </Card>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Incidentes Novos</p>
                <p className="text-2xl font-bold text-red-600">{stats.incidentes.novos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Em Investigação</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.incidentes.investigando}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Computer className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Antivírus OK</p>
                <p className="text-2xl font-bold text-green-600">{stats.antivirus.atualizados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Problemas AV</p>
                <p className="text-2xl font-bold text-orange-600">{stats.antivirus.problemas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="incidentes">Registro de Incidentes</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoria de Acessos</TabsTrigger>
          <TabsTrigger value="antivirus">Status do Antivírus</TabsTrigger>
        </TabsList>

        {/* Aba 1: Registro de Incidentes */}
        <TabsContent value="incidentes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alertas de Segurança</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar incidentes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="investigando">Investigando</SelectItem>
                      <SelectItem value="resolvido">Resolvido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tipo de Alerta</TableHead>
                    <TableHead>Detalhe do Incidente</TableHead>
                    <TableHead>Criticidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidentesData.map((incidente: any) => (
                    <TableRow key={incidente.id}>
                      <TableCell className="text-sm">
                        {formatDateTime(incidente.dataHora)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {incidente.tipo.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{incidente.detalhes}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCriticidadeColor(incidente.criticidade)}>
                          {incidente.criticidade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusIncidenteColor(incidente.status)}>
                          {incidente.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {incidente.responsavel || (
                          <Badge variant="secondary">Não atribuído</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Investigar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 2: Auditoria de Acessos */}
        <TabsContent value="auditoria">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Log de Acessos aos Sistemas</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar por usuário..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="sucesso">Sucesso</SelectItem>
                      <SelectItem value="falha">Falha</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Sistema</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditoriaData.map((log: any) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {log.usuario}
                        </div>
                      </TableCell>
                      <TableCell>{log.sistema}</TableCell>
                      <TableCell className="text-sm">
                        {formatDateTime(log.dataHora)}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {log.ip}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusAcessoColor(log.status)}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {log.detalhes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 3: Status do Antivírus */}
        <TabsContent value="antivirus">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monitoramento de Endpoints</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar estação..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status AV" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="atualizado">Atualizado</SelectItem>
                      <SelectItem value="desatualizado">Desatualizado</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Atualizar Todos</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estação de Trabalho</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Status do Antivírus</TableHead>
                    <TableHead>Versão</TableHead>
                    <TableHead>Última Verificação</TableHead>
                    <TableHead>Ameaças</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {antivirusData.map((endpoint: any) => (
                    <TableRow key={endpoint.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Computer className="h-4 w-4" />
                          {endpoint.estacaoTrabalho}
                        </div>
                      </TableCell>
                      <TableCell>{endpoint.usuario}</TableCell>
                      <TableCell>
                        <Badge className={getStatusAntivirusColor(endpoint.status)}>
                          {endpoint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {endpoint.versaoAntivirus}
                        </code>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDateTime(endpoint.ultimaVerificacao)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {endpoint.ameacasDetectadas > 0 && (
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                          )}
                          <span className={endpoint.ameacasDetectadas > 0 ? 'text-red-600 font-medium' : ''}>
                            {endpoint.ameacasDetectadas}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {endpoint.observacoes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PainelSeguranca;