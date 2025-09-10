import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  CheckCircle,
  Clock,
  Computer,
  User,
  Lock,
  UserCheck,
  Activity
} from "lucide-react";
import { tiModules } from "@/data/tiModules";

const PainelSeguranca = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados consolidados de segurança
  const segurancaData = tiModules.seguranca.data || [];
  const incidentesData = segurancaData.filter((item: any) => item.tipo === 'incidente') || [];
  const auditoriaData = segurancaData.filter((item: any) => item.tipo === 'auditoria') || [];
  const antivirusData = segurancaData.filter((item: any) => item.tipo === 'antivirus') || [];
  const conformidadeData = segurancaData.filter((item: any) => item.tipo === 'conformidade') || [];

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

  // Estatísticas consolidadas
  const stats = {
    incidentes: {
      total: incidentesData.length,
      novos: incidentesData.filter((i: any) => i.status === 'novo').length,
      investigando: incidentesData.filter((i: any) => i.status === 'investigando').length,
      resolvidos: incidentesData.filter((i: any) => i.status === 'resolvido').length,
      criticos: incidentesData.filter((i: any) => i.criticidade === 'critica').length
    },
    antivirus: {
      total: antivirusData.length,
      atualizados: antivirusData.filter((a: any) => a.status === 'atualizado').length,
      problemas: antivirusData.filter((a: any) => a.status !== 'atualizado').length
    },
    auditoria: {
      total: auditoriaData.length,
      sucessos: auditoriaData.filter((a: any) => a.status === 'sucesso').length,
      falhas: auditoriaData.filter((a: any) => a.status === 'falha').length
    },
    conformidade: {
      total: conformidadeData.length,
      implementados: conformidadeData.filter((c: any) => c.status === 'implementado').length,
      pendentes: conformidadeData.filter((c: any) => c.status !== 'implementado').length
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
            Monitoramento consolidado de segurança, alertas, conformidade, antivírus, auditoria de login, bloqueio de contas e registro de incidentes
          </p>
        </CardHeader>
      </Card>

      {/* Cards de estatísticas consolidadas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Incidentes Críticos</p>
                <p className="text-2xl font-bold text-red-600">{stats.incidentes.criticos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
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
        
        <Card className="border-l-4 border-l-green-500">
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
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Problemas AV</p>
                <p className="text-2xl font-bold text-orange-600">{stats.antivirus.problemas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Falhas Login</p>
                <p className="text-2xl font-bold text-blue-600">{stats.auditoria.falhas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Conformidade</p>
                <p className="text-2xl font-bold text-purple-600">{stats.conformidade.implementados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Alertas Críticos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel de Incidentes Críticos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Incidentes de Segurança
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Novo Incidente
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidentesData.slice(0, 5).map((incidente: any) => (
                <div key={incidente.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className={getCriticidadeColor(incidente.criticidade)}>
                      {incidente.criticidade}
                    </Badge>
                    <div>
                      <p className="font-medium">{incidente.tipoIncidente?.replace('_', ' ')}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-md">
                        {incidente.detalhes}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusIncidenteColor(incidente.status)}>
                      {incidente.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(incidente.dataHora)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Painel de Conformidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              Status da Conformidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">ISO 27001</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  85% Implementado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">LGPD</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  92% Implementado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SOX</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  67% Implementado
                </Badge>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4">
                <Activity className="h-4 w-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Monitoramento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auditoria de Acessos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Auditoria de Acessos
              </CardTitle>
              <div className="flex gap-2">
                <Input placeholder="Buscar usuário..." className="w-40" />
                <Button size="sm" variant="outline">
                  <Lock className="h-4 w-4" />
                  Bloquear Conta
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
                  <TableHead>Status</TableHead>
                  <TableHead>Horário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditoriaData.slice(0, 6).map((log: any) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span className="text-sm">{log.usuario}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{log.sistema}</TableCell>
                    <TableCell>
                      <Badge className={getStatusAcessoColor(log.status)} variant="secondary">
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(log.dataHora).toLocaleTimeString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Status Antivírus */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Computer className="h-5 w-5 text-green-600" />
                Monitoramento Antivírus
              </CardTitle>
              <Button size="sm" variant="outline">
                Atualizar Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ameaças</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {antivirusData.slice(0, 6).map((endpoint: any) => (
                  <TableRow key={endpoint.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Computer className="h-3 w-3" />
                        <span className="text-sm">{endpoint.estacaoTrabalho}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusAntivirusColor(endpoint.status)} variant="secondary">
                        {endpoint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {endpoint.ameacasDetectadas > 0 && (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        )}
                        <span className={endpoint.ameacasDetectadas > 0 ? 'text-red-600 font-medium text-sm' : 'text-sm'}>
                          {endpoint.ameacasDetectadas}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PainelSeguranca;