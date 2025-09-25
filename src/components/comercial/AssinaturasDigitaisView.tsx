import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileSignature, 
  Upload, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Plus,
  Search,
  Eye,
  Send,
  Download,
  FileText,
  Calendar,
  TrendingUp
} from "lucide-react";
import { documentosAssinatura, processosAssinatura, relatorioAssinaturas } from "@/data/assinaturasData";

const AssinaturasDigitaisView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assinado': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pendente_assinatura': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'parcialmente_assinado': return <Users className="h-4 w-4 text-blue-500" />;
      case 'rejeitado': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'vencido': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assinado': return 'bg-green-500';
      case 'pendente_assinatura': return 'bg-orange-500';
      case 'parcialmente_assinado': return 'bg-blue-500';
      case 'rejeitado': return 'bg-red-500';
      case 'vencido': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'rascunho': return 'Rascunho';
      case 'pendente_assinatura': return 'Pendente';
      case 'parcialmente_assinado': return 'Parcial';
      case 'assinado': return 'Assinado';
      case 'rejeitado': return 'Rejeitado';
      case 'vencido': return 'Vencido';
      default: return status;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'proposta': return 'Proposta';
      case 'contrato': return 'Contrato';
      case 'aditivo': return 'Aditivo';
      case 'termo': return 'Termo';
      default: return 'Outros';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'urgente': return 'text-red-600 bg-red-50';
      case 'alta': return 'text-orange-600 bg-orange-50';
      case 'media': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredDocumentos = documentosAssinatura.filter(doc => {
    const matchesSearch = doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.signatarios.some(s => s.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'todos' || doc.status === statusFilter;
    const matchesTipo = tipoFilter === 'todos' || doc.tipo_documento === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  // Estatísticas
  const totalDocumentos = documentosAssinatura.length;
  const documentosAssinados = documentosAssinatura.filter(d => d.status === 'assinado').length;
  const documentosPendentes = documentosAssinatura.filter(d => d.status === 'pendente_assinatura').length;
  const documentosVencidos = documentosAssinatura.filter(d => d.status === 'vencido').length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-biodina-blue mb-2">Assinaturas Digitais</h1>
        <p className="text-gray-600">Central de gestão de assinaturas digitais e aprovações</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-blue-500" />
              Total de Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalDocumentos}
            </div>
            <p className="text-xs text-gray-600 mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Assinados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documentosAssinados}
            </div>
            <p className="text-xs text-gray-600 mt-1">Taxa: {((documentosAssinados / totalDocumentos) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {documentosPendentes}
            </div>
            <p className="text-xs text-gray-600 mt-1">Aguardando assinatura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {documentosVencidos}
            </div>
            <p className="text-xs text-gray-600 mt-1">Precisam de atenção</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documentos" className="w-full">
        <TabsList>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="processos">Processos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-1 min-w-64">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por título ou signatário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="rascunho">Rascunho</SelectItem>
                    <SelectItem value="pendente_assinatura">Pendente</SelectItem>
                    <SelectItem value="parcialmente_assinado">Parcial</SelectItem>
                    <SelectItem value="assinado">Assinado</SelectItem>
                    <SelectItem value="rejeitado">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    <SelectItem value="proposta">Proposta</SelectItem>
                    <SelectItem value="contrato">Contrato</SelectItem>
                    <SelectItem value="aditivo">Aditivo</SelectItem>
                    <SelectItem value="termo">Termo</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Documento
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos para Assinatura</CardTitle>
              <CardDescription>
                Lista de todos os documentos em processo de assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Signatários</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead className="w-32">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocumentos.map((documento) => (
                    <TableRow key={documento.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{documento.titulo}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(documento.data_criacao).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTipoLabel(documento.tipo_documento)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{documento.signatarios.length}</span>
                          <div className="text-xs text-gray-500">
                            ({documento.signatarios.filter(s => s.status === 'assinado').length} assinados)
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {documento.valor_documento ? formatCurrency(documento.valor_documento) : '-'}
                      </TableCell>
                      <TableCell>
                        {documento.data_limite ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {new Date(documento.data_limite).toLocaleDateString('pt-BR')}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(documento.status)}
                          <Badge className={getStatusColor(documento.status)}>
                            {getStatusLabel(documento.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPrioridadeColor(documento.prioridade)}>
                          {documento.prioridade.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" title="Visualizar">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" title="Enviar lembrete">
                            <Send className="h-3 w-3" />
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

        <TabsContent value="processos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos de Assinatura</CardTitle>
              <CardDescription>
                Acompanhe conjuntos de documentos por projeto ou cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processosAssinatura.map((processo) => (
                  <Card key={processo.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{processo.nome}</CardTitle>
                          <CardDescription>{processo.descricao}</CardDescription>
                        </div>
                        <Badge className={
                          processo.status_geral === 'concluido' ? 'bg-green-500' :
                          processo.status_geral === 'em_andamento' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }>
                          {processo.status_geral}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progresso</span>
                            <span className="text-sm text-gray-600">{processo.progresso_percentual}%</span>
                          </div>
                          <Progress value={processo.progresso_percentual} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div>Responsável: {processo.responsavel}</div>
                          <div>Documentos: {processo.documentos.length}</div>
                          <div>Iniciado: {new Date(processo.data_inicio).toLocaleDateString('pt-BR')}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-biodina-blue" />
                  Estatísticas do Período
                </CardTitle>
                <CardDescription>
                  {new Date(relatorioAssinaturas.periodo.inicio).toLocaleDateString('pt-BR')} - {' '}
                  {new Date(relatorioAssinaturas.periodo.fim).toLocaleDateString('pt-BR')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{relatorioAssinaturas.total_documentos}</div>
                    <div className="text-sm text-blue-800">Total Documentos</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{relatorioAssinaturas.taxa_conclusao}%</div>
                    <div className="text-sm text-green-800">Taxa de Conclusão</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">{relatorioAssinaturas.tempo_medio_assinatura}h</div>
                  <div className="text-sm text-orange-800">Tempo Médio de Assinatura</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assinaturas por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Digital</span>
                    <Badge>{relatorioAssinaturas.assinaturas_por_tipo.digital}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Eletrônica</span>
                    <Badge>{relatorioAssinaturas.assinaturas_por_tipo.eletronica}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Física</span>
                    <Badge>{relatorioAssinaturas.assinaturas_por_tipo.fisica}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuracoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>
                Configure modelos, fluxos de aprovação e integrações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileSignature className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Configuração de modelos e certificados digitais</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssinaturasDigitaisView;