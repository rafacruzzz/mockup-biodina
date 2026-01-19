import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, Search, Filter, Plus, FileText, 
  CheckCircle, Clock, AlertTriangle, User, Eye, Send, XCircle, Building2
} from "lucide-react";
import { mockServicosFaturamento } from "@/data/faturamentoModules";
import { ServicoFaturamento } from "@/types/faturamento";
import CancelamentoNotaServicoModal from "./modals/CancelamentoNotaServicoModal";
import VisualizarServicoModal from "./modals/VisualizarServicoModal";
import NovoServicoModal from "./modals/NovoServicoModal";
import { useEmpresa } from "@/contexts/EmpresaContext";

const ServicosFaturamento = () => {
  const { empresaAtual, filialAtual } = useEmpresa();
  const empresaAtivaId = filialAtual?.id || empresaAtual?.id || '';
  const nomeEmpresaAtiva = filialAtual?.nome || empresaAtual?.razaoSocial || 'Empresa';
  
  // Filtrar serviços por empresa ativa
  const servicosEmpresa = useMemo(() => 
    mockServicosFaturamento.filter(s => s.empresaId === empresaAtivaId),
    [empresaAtivaId]
  );
  
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [modalCancelamentoOpen, setModalCancelamentoOpen] = useState(false);
  const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false);
  const [modalNovoServicoOpen, setModalNovoServicoOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<ServicoFaturamento | null>(null);

  const statusColors = {
    'Iniciado': 'bg-blue-500',
    'Em Andamento': 'bg-yellow-500',
    'Concluído': 'bg-purple-500',
    'Aprovado': 'bg-green-500',
    'Faturado': 'bg-gray-500'
  };

  const statusIcons = {
    'Iniciado': Clock,
    'Em Andamento': AlertTriangle,
    'Concluído': CheckCircle,
    'Aprovado': CheckCircle,
    'Faturado': FileText
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const servicosFiltrados = servicosEmpresa.filter(servico => {
    if (filtroStatus !== 'todos' && servico.status.toLowerCase().replace(' ', '_') !== filtroStatus) {
      return false;
    }
    if (pesquisa && !servico.cliente.toLowerCase().includes(pesquisa.toLowerCase()) && 
        !servico.descricao.toLowerCase().includes(pesquisa.toLowerCase())) {
      return false;
    }
    return true;
  });

  const totais = {
    emAndamento: servicosEmpresa.filter(s => s.status === 'Em Andamento').length,
    concluido: servicosEmpresa.filter(s => s.status === 'Concluído').length,
    aprovado: servicosEmpresa.filter(s => s.status === 'Aprovado').length,
    valorTotal: servicosEmpresa.reduce((sum, s) => sum + s.valor, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Faturamento de Serviços</h1>
            <Badge variant="outline" className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {nomeEmpresaAtiva}
            </Badge>
          </div>
          <p className="text-gray-600">Gestão de serviços prestados e emissão de NFS-e</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setModalNovoServicoOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-yellow-600">{totais.emAndamento}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-purple-600">{totais.concluido}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-green-600">{totais.aprovado}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totais.valorTotal)}</p>
              </div>
              <Settings className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Pesquisar por cliente ou descrição do serviço..." 
                  className="pl-10"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="iniciado">Iniciado</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluído">Concluído</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="faturado">Faturado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Serviços */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Serviços em Execução
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Conclusão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicosFiltrados.map((servico) => {
                const StatusIcon = statusIcons[servico.status as keyof typeof statusIcons];
                return (
                  <TableRow key={servico.id}>
                    <TableCell>
                      <div className="max-w-48 truncate" title={servico.descricao}>
                        <span className="font-medium">{servico.descricao}</span>
                      </div>
                    </TableCell>
                    <TableCell>{servico.cliente}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        {servico.responsavel}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">{formatCurrency(servico.valor)}</TableCell>
                    <TableCell>{new Date(servico.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      {servico.dataConclusao ? 
                        new Date(servico.dataConclusao).toLocaleDateString('pt-BR') : 
                        <span className="text-gray-400">Em andamento</span>
                      }
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[servico.status as keyof typeof statusColors]} text-white flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {servico.status}
                      </Badge>
                    </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setServicoSelecionado(servico);
                              setModalVisualizarOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        {(servico.status === 'Concluído' || servico.status === 'Aprovado' || servico.status === 'Faturado') && servico.numeroNFSe && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => {
                              setServicoSelecionado(servico);
                              setModalCancelamentoOpen(true);
                            }}
                          >
                            <XCircle className="h-4 w-4" />
                            Cancelar Nota
                          </Button>
                        )}
                        {servico.status === 'Aprovado' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <FileText className="h-4 w-4" />
                            Emitir NFS-e
                          </Button>
                        )}
                        {servico.status === 'Concluído' && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Send className="h-4 w-4" />
                            Enviar Aprovação
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Card de Retenções */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Retenções Municipais (NFS-e)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">ISS (5%)</h4>
              <p className="text-2xl font-bold text-blue-700">R$ 1.180,00</p>
              <p className="text-sm text-blue-600">Total retido este mês</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">PIS (0,65%)</h4>
              <p className="text-2xl font-bold text-green-700">R$ 153,40</p>
              <p className="text-sm text-green-600">Total retido este mês</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">COFINS (3%)</h4>
              <p className="text-2xl font-bold text-purple-700">R$ 708,00</p>
              <p className="text-sm text-purple-600">Total retido este mês</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Fluxo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fluxo de Faturamento de Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">1. Iniciado</h4>
              <p className="text-blue-700">Serviço contratado e em início</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">2. Em Andamento</h4>
              <p className="text-yellow-700">Execução do serviço pelo responsável</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">3. Concluído</h4>
              <p className="text-purple-700">Serviço finalizado aguardando aprovação</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">4. Aprovado</h4>
              <p className="text-green-700">Cliente aprovou o serviço prestado</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">5. Faturado</h4>
              <p className="text-gray-700">NFS-e emitida e título gerado</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <NovoServicoModal
        isOpen={modalNovoServicoOpen}
        onClose={() => setModalNovoServicoOpen(false)}
        onSalvar={(servico) => {
          console.log('Novo serviço criado:', servico);
        }}
      />

      {servicoSelecionado && (
        <>
          <CancelamentoNotaServicoModal
            isOpen={modalCancelamentoOpen}
            onClose={() => {
              setModalCancelamentoOpen(false);
              setServicoSelecionado(null);
            }}
            servico={{
              servicoId: servicoSelecionado.id,
              descricaoServico: servicoSelecionado.descricao,
              cliente: servicoSelecionado.cliente,
              valor: servicoSelecionado.valor,
              numeroNFSe: servicoSelecionado.numeroNFSe,
              dataEmissao: servicoSelecionado.dataConclusao
            }}
            onCancelar={(dados) => {
              console.log('Cancelamento solicitado:', dados);
            }}
          />
          
          <VisualizarServicoModal
            isOpen={modalVisualizarOpen}
            onClose={() => {
              setModalVisualizarOpen(false);
              setServicoSelecionado(null);
            }}
            servico={servicoSelecionado}
          />
        </>
      )}
    </div>
  );
};

export default ServicosFaturamento;