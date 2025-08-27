
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Package, Clock, AlertTriangle, CheckCircle, FileText, Truck, ArrowRight } from 'lucide-react';
import { getEmprestimosPendentesRetorno, calcularDiasRetornoPendente, Emprestimo } from '@/data/emprestimos';

const ControleRetornosTab = () => {
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<Emprestimo | null>(null);
  const [observacoesRecebimento, setObservacoesRecebimento] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const emprestimosRetorno = getEmprestimosPendentesRetorno();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'devolvido_nf': return 'bg-yellow-500';
      case 'devolvido': return 'bg-orange-500';
      case 'retorno_efetivado': return 'bg-green-500';
      case 'retorno_parcial': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'devolvido_nf': return 'DANFE Registrada';
      case 'devolvido': return 'Devolvido';
      case 'retorno_efetivado': return 'Retorno Efetivado';
      case 'retorno_parcial': return 'Retorno Parcial';
      default: return status;
    }
  };

  const getPrioridadeAlerta = (dias: number) => {
    if (dias >= 10) return { color: 'text-red-600', icon: AlertTriangle, label: 'Crítico' };
    if (dias >= 5) return { color: 'text-yellow-600', icon: Clock, label: 'Atenção' };
    return { color: 'text-blue-600', icon: FileText, label: 'Normal' };
  };

  const formatCurrency = (value: number, currency: 'BRL' | 'USD') => {
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleMarcarRecebido = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsConfirmModalOpen(true);
  };

  const confirmarRecebimento = () => {
    if (!selectedEmprestimo) return;
    
    // Aqui seria feita a integração com o backend para:
    // 1. Atualizar o status do empréstimo para 'retorno_efetivado'
    // 2. Criar movimentação de entrada no estoque
    // 3. Registrar data_entrada_fisica e observações
    
    console.log('Confirmando recebimento:', {
      numeroProcesso: selectedEmprestimo.numeroProcesso,
      observacoes: observacoesRecebimento,
      dataRecebimento: new Date().toISOString()
    });

    setIsConfirmModalOpen(false);
    setSelectedEmprestimo(null);
    setObservacoesRecebimento('');
  };

  // Calcular estatísticas
  const stats = {
    total: emprestimosRetorno.length,
    criticos: emprestimosRetorno.filter(emp => calcularDiasRetornoPendente(emp) >= 10).length,
    atencao: emprestimosRetorno.filter(emp => {
      const dias = calcularDiasRetornoPendente(emp);
      return dias >= 5 && dias < 10;
    }).length,
    valorTotalPendente: emprestimosRetorno.reduce((sum, emp) => sum + emp.valorEmprestimo, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header com Alertas */}
      {emprestimosRetorno.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>{emprestimosRetorno.length} empréstimos</strong> têm DANFE de retorno registrada mas ainda não foram recebidos fisicamente no estoque.
            {stats.criticos > 0 && (
              <span className="block mt-1 font-semibold text-red-600">
                {stats.criticos} casos críticos (há mais de 10 dias)
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Retornos Pendentes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.criticos}</div>
                <div className="text-sm text-gray-600">Casos Críticos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.atencao}</div>
                <div className="text-sm text-gray-600">Atenção (5-9 dias)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-biodina-blue" />
              <div>
                <div className="text-lg font-bold text-biodina-blue">
                  {formatCurrency(stats.valorTotalPendente, 'USD')}
                </div>
                <div className="text-sm text-gray-600">Valor Pendente</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Retornos Pendentes */}
      {emprestimosRetorno.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Controle de Retornos Físicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Processo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>DANFE Retorno</TableHead>
                    <TableHead>Dias Pendente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emprestimosRetorno.map((emprestimo) => {
                    const diasPendente = calcularDiasRetornoPendente(emprestimo);
                    const prioridade = getPrioridadeAlerta(diasPendente);
                    const IconePrioridade = prioridade.icon;
                    
                    return (
                      <TableRow key={emprestimo.numeroProcesso} className={diasPendente >= 10 ? 'bg-red-50' : diasPendente >= 5 ? 'bg-yellow-50' : ''}>
                        <TableCell className="font-medium">{emprestimo.numeroProcesso}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{emprestimo.nomeCliente}</div>
                            <div className="text-sm text-gray-500">{emprestimo.cnpjCliente}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{emprestimo.referenciaProdutoEmprestado}</div>
                            <div className="text-sm text-gray-500">{emprestimo.descricaoProdutoEmprestado}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(emprestimo.status)} text-white`}>
                            {getStatusLabel(emprestimo.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {emprestimo.numeroDanfeRetorno || '-'}
                          {emprestimo.dataRetorno && (
                            <div className="text-sm text-gray-500">
                              {formatDate(emprestimo.dataRetorno)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1 ${prioridade.color}`}>
                            <IconePrioridade className="h-4 w-4" />
                            <span className="font-medium">{diasPendente} dias</span>
                          </div>
                          <div className="text-xs text-gray-500">{prioridade.label}</div>
                        </TableCell>
                        <TableCell>{formatCurrency(emprestimo.valorEmprestimo, emprestimo.moeda)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                            <FileText className="h-3 w-3 text-yellow-500" />
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                            <Package className="h-3 w-3 text-gray-400" />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Emprestado → DANFE → Estoque
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            className="bg-biodina-gold hover:bg-biodina-gold/90"
                            onClick={() => handleMarcarRecebido(emprestimo)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Marcar Recebido
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Todos os Retornos Efetivados
            </h3>
            <p className="text-gray-500">
              Não há empréstimos com retorno pendente de recebimento físico no estoque.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal de Confirmação de Recebimento */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Confirmar Recebimento Físico
            </DialogTitle>
          </DialogHeader>
          
          {selectedEmprestimo && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm">
                  <div><strong>Processo:</strong> {selectedEmprestimo.numeroProcesso}</div>
                  <div><strong>Cliente:</strong> {selectedEmprestimo.nomeCliente}</div>
                  <div><strong>Produto:</strong> {selectedEmprestimo.referenciaProdutoEmprestado}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Observações do Recebimento</label>
                <Textarea
                  value={observacoesRecebimento}
                  onChange={(e) => setObservacoesRecebimento(e.target.value)}
                  placeholder="Estado do material, conformidades, observações gerais..."
                  rows={3}
                />
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Esta ação irá criar automaticamente uma movimentação de entrada no estoque 
                  e atualizar o status para "Retorno Efetivado".
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarRecebimento} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar Recebimento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ControleRetornosTab;
