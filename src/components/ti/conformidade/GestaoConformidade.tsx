import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Paperclip, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { ControleConformidade, TipoNorma, StatusControle } from '@/types/ti';

// Mock data para controles de conformidade
const mockControles: ControleConformidade[] = [
  {
    id: 'CTRL-001',
    norma: TipoNorma.ISO_27001,
    idControle: 'A.9.1.1',
    descricao: 'Política de controle de acesso',
    status: StatusControle.IMPLEMENTADO,
    responsavel: 'Carlos Silva - CISO',
    dataUltimaRevisao: '2024-01-15',
    evidencias: ['politica-acesso-v2.1.pdf', 'matriz-acesso-sistemas.xlsx'],
    observacoes: 'Política revisada e aprovada pelo comitê de segurança'
  },
  {
    id: 'CTRL-002',
    norma: TipoNorma.ISO_27001,
    idControle: 'A.9.2.1',
    descricao: 'Registro e cancelamento do registro de usuário',
    status: StatusControle.EM_ANDAMENTO,
    responsavel: 'Maria Santos - TI',
    evidencias: ['procedimento-cadastro-usuarios.pdf'],
    observacoes: 'Aguardando implementação do novo sistema de gestão de usuários'
  },
  {
    id: 'CTRL-003',
    norma: TipoNorma.LGPD,
    idControle: 'ART.37',
    descricao: 'Relatório de Impacto à Proteção de Dados Pessoais',
    status: StatusControle.NAO_IMPLEMENTADO,
    responsavel: 'Ana Costa - DPO',
    evidencias: [],
    observacoes: 'Pendente contratação de consultoria especializada'
  },
  {
    id: 'CTRL-004',
    norma: TipoNorma.LGPD,
    idControle: 'ART.41',
    descricao: 'Comunicação de incidente de segurança',
    status: StatusControle.IMPLEMENTADO,
    responsavel: 'Carlos Silva - CISO',
    dataUltimaRevisao: '2024-01-10',
    evidencias: ['procedimento-comunicacao-incidentes.pdf', 'template-notificacao-anpd.docx'],
    observacoes: 'Procedimento testado e validado com a ANPD'
  },
  {
    id: 'CTRL-005',
    norma: TipoNorma.PCI_DSS,
    idControle: '1.1.1',
    descricao: 'Estabelecer e implementar padrões de configuração de firewall',
    status: StatusControle.NAO_APLICAVEL,
    responsavel: 'João Tech - Infraestrutura',
    evidencias: [],
    observacoes: 'Empresa não processa cartões de crédito diretamente'
  }
];

const normasLabels = {
  [TipoNorma.ISO_27001]: 'ISO 27001',
  [TipoNorma.LGPD]: 'LGPD',
  [TipoNorma.GDPR]: 'GDPR',
  [TipoNorma.PCI_DSS]: 'PCI-DSS'
};

const statusLabels = {
  [StatusControle.IMPLEMENTADO]: 'Implementado',
  [StatusControle.NAO_IMPLEMENTADO]: 'Não Implementado',
  [StatusControle.EM_ANDAMENTO]: 'Em Andamento',
  [StatusControle.NAO_APLICAVEL]: 'Não Aplicável'
};

const GestaoConformidade: React.FC = () => {
  const [normaSelecionada, setNormaSelecionada] = useState<TipoNorma>(TipoNorma.ISO_27001);
  const [controles, setControles] = useState(mockControles);

  const controlesFiltrados = controles.filter(controle => controle.norma === normaSelecionada);

  const getStatusBadgeVariant = (status: StatusControle) => {
    switch (status) {
      case StatusControle.IMPLEMENTADO: return 'default';
      case StatusControle.NAO_IMPLEMENTADO: return 'destructive';
      case StatusControle.EM_ANDAMENTO: return 'secondary';
      case StatusControle.NAO_APLICAVEL: return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: StatusControle) => {
    switch (status) {
      case StatusControle.IMPLEMENTADO: return <CheckCircle className="h-4 w-4 text-green-600" />;
      case StatusControle.NAO_IMPLEMENTADO: return <XCircle className="h-4 w-4 text-red-600" />;
      case StatusControle.EM_ANDAMENTO: return <Clock className="h-4 w-4 text-yellow-600" />;
      case StatusControle.NAO_APLICAVEL: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  const calcularProgresso = (norma: TipoNorma) => {
    const controlesNorma = controles.filter(c => c.norma === norma);
    const controlesImplementados = controlesNorma.filter(c => c.status === StatusControle.IMPLEMENTADO);
    const controlesAplicaveis = controlesNorma.filter(c => c.status !== StatusControle.NAO_APLICAVEL);
    
    if (controlesAplicaveis.length === 0) return 0;
    
    return Math.round((controlesImplementados.length / controlesAplicaveis.length) * 100);
  };

  const atualizarStatusControle = (controleId: string, novoStatus: StatusControle) => {
    setControles(prev => 
      prev.map(controle => 
        controle.id === controleId 
          ? { 
              ...controle, 
              status: novoStatus,
              dataUltimaRevisao: novoStatus === StatusControle.IMPLEMENTADO ? new Date().toISOString().split('T')[0] : controle.dataUltimaRevisao
            }
          : controle
      )
    );
  };

  const progressoAtual = calcularProgresso(normaSelecionada);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Conformidade e Riscos</CardTitle>
          <CardDescription>
            Gerencie e audite a conformidade com as principais normas de segurança
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtro de Norma */}
          <div className="mb-6">
            <Select 
              value={normaSelecionada} 
              onValueChange={(value) => setNormaSelecionada(value as TipoNorma)}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecione a norma" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(normasLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Barra de Progresso */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Progresso de Conformidade - {normasLabels[normaSelecionada]}
                  </h3>
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {progressoAtual}%
                  </Badge>
                </div>
                <Progress value={progressoAtual} className="h-3" />
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {controlesFiltrados.filter(c => c.status === StatusControle.IMPLEMENTADO).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Implementados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {controlesFiltrados.filter(c => c.status === StatusControle.EM_ANDAMENTO).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Em Andamento</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {controlesFiltrados.filter(c => c.status === StatusControle.NAO_IMPLEMENTADO).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Não Implementados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">
                      {controlesFiltrados.filter(c => c.status === StatusControle.NAO_APLICAVEL).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Não Aplicáveis</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Controles */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID do Controle</TableHead>
                  <TableHead>Descrição do Controle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Evidências</TableHead>
                  <TableHead>Última Revisão</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {controlesFiltrados.map((controle) => (
                  <TableRow key={controle.id}>
                    <TableCell className="font-mono font-medium">
                      {controle.idControle}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={controle.descricao}>
                        {controle.descricao}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(controle.status)}
                          <Badge variant={getStatusBadgeVariant(controle.status)}>
                            {statusLabels[controle.status]}
                          </Badge>
                        </div>
                        <Select 
                          value={controle.status} 
                          onValueChange={(value) => atualizarStatusControle(controle.id, value as StatusControle)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusLabels).map(([key, label]) => (
                              <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {controle.responsavel || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                          <span className="ml-1 text-xs">
                            {controle.evidencias.length}
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {controle.dataUltimaRevisao 
                        ? new Date(controle.dataUltimaRevisao).toLocaleDateString('pt-BR')
                        : '-'
                      }
                    </TableCell>
                    <TableCell className="max-w-xs">
                      {controle.observacoes && (
                        <div className="truncate text-sm text-muted-foreground" title={controle.observacoes}>
                          {controle.observacoes}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {controlesFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum controle encontrado para a norma selecionada.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GestaoConformidade;