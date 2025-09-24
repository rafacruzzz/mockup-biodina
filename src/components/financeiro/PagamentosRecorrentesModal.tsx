import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Calendar, Building, Zap, Wifi, Car } from 'lucide-react';
import { MoneyInput } from '@/components/ui/money-input';
import { PagamentoRecorrente } from '@/types/financeiro';

interface PagamentosRecorrentesModalProps {
  open: boolean;
  onClose: () => void;
}

export const PagamentosRecorrentesModal: React.FC<PagamentosRecorrentesModalProps> = ({ open, onClose }) => {
  const [pagamentos, setPagamentos] = useState<PagamentoRecorrente[]>([
    {
      id: '1',
      nome: 'Energia Elétrica - Matriz',
      tipo: 'luz',
      fornecedor: 'Cemig',
      valor: 2500.00,
      diaVencimento: 15,
      departamentoId: 'administrativo',
      ativo: true,
      dataInicio: new Date('2024-01-01'),
      observacoes: 'Conta da matriz - consumo médio mensal'
    },
    {
      id: '2',
      nome: 'Aluguel Galpão',
      tipo: 'aluguel',
      fornecedor: 'Imobiliária Santos',
      valor: 15000.00,
      diaVencimento: 5,
      departamentoId: 'administrativo',
      ativo: true,
      dataInicio: new Date('2024-01-01')
    },
    {
      id: '3',
      nome: 'Internet Corporativa',
      tipo: 'internet',
      fornecedor: 'Oi Fibra',
      valor: 899.90,
      diaVencimento: 10,
      departamentoId: 'ti',
      ativo: true,
      dataInicio: new Date('2024-01-01')
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'outros' as PagamentoRecorrente['tipo'],
    fornecedor: '',
    valor: '',
    diaVencimento: '',
    departamentoId: '',
    observacoes: ''
  });

  const resetForm = () => {
    setFormData({
      nome: '',
      tipo: 'outros',
      fornecedor: '',
      valor: '',
      diaVencimento: '',
      departamentoId: '',
      observacoes: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    const novoPagamento: PagamentoRecorrente = {
      id: editingId || Date.now().toString(),
      nome: formData.nome,
      tipo: formData.tipo,
      fornecedor: formData.fornecedor,
      valor: parseFloat(formData.valor) || 0,
      diaVencimento: parseInt(formData.diaVencimento),
      departamentoId: formData.departamentoId,
      ativo: true,
      dataInicio: new Date(),
      observacoes: formData.observacoes || undefined
    };

    if (editingId) {
      setPagamentos(prev => prev.map(p => p.id === editingId ? novoPagamento : p));
    } else {
      setPagamentos(prev => [...prev, novoPagamento]);
    }

    resetForm();
  };

  const handleEdit = (pagamento: PagamentoRecorrente) => {
    setFormData({
      nome: pagamento.nome,
      tipo: pagamento.tipo,
      fornecedor: pagamento.fornecedor,
      valor: pagamento.valor.toString(),
      diaVencimento: pagamento.diaVencimento.toString(),
      departamentoId: pagamento.departamentoId,
      observacoes: pagamento.observacoes || ''
    });
    setEditingId(pagamento.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pagamento recorrente?')) {
      setPagamentos(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleAtivo = (id: string) => {
    setPagamentos(prev => prev.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    ));
  };

  const getTipoIcon = (tipo: PagamentoRecorrente['tipo']) => {
    switch (tipo) {
      case 'luz': return <Zap className="h-4 w-4" />;
      case 'agua': return <Building className="h-4 w-4" />;
      case 'aluguel': return <Building className="h-4 w-4" />;
      case 'telefonia': return <Building className="h-4 w-4" />;
      case 'internet': return <Wifi className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTotalMensal = () => {
    return pagamentos
      .filter(p => p.ativo)
      .reduce((total, p) => total + p.valor, 0);
  };

  const getProximoVencimento = (diaVencimento: number) => {
    const hoje = new Date();
    const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, diaVencimento);
    const mesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), diaVencimento);
    
    return mesAtual > hoje ? mesAtual : proximoMes;
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestão de Pagamentos Recorrentes</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Mensal Ativo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(getTotalMensal())}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pagamentos.filter(p => p.ativo).length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Próximos Vencimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pagamentos.filter(p => {
                    const proximo = getProximoVencimento(p.diaVencimento);
                    const hoje = new Date();
                    const diferenca = proximo.getTime() - hoje.getTime();
                    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
                    return dias <= 7 && p.ativo;
                  }).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Botão Novo */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pagamentos Cadastrados</h3>
            <Button onClick={() => setShowForm(true)} disabled={showForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Pagamento Recorrente
            </Button>
          </div>

          {/* Formulário */}
          {showForm && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>
                  {editingId ? 'Editar' : 'Novo'} Pagamento Recorrente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome do Pagamento *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Ex: Energia Elétrica - Matriz"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipo">Tipo *</Label>
                    <Select value={formData.tipo} onValueChange={(value: any) => setFormData({...formData, tipo: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agua">Água</SelectItem>
                        <SelectItem value="luz">Energia Elétrica</SelectItem>
                        <SelectItem value="aluguel">Aluguel</SelectItem>
                        <SelectItem value="telefonia">Telefonia</SelectItem>
                        <SelectItem value="internet">Internet</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fornecedor">Fornecedor *</Label>
                    <Input
                      id="fornecedor"
                      value={formData.fornecedor}
                      onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                      placeholder="Nome da empresa/fornecedor"
                    />
                  </div>

                  <div>
                    <Label htmlFor="departamento">Departamento Responsável *</Label>
                    <Select value={formData.departamentoId} onValueChange={(value) => setFormData({...formData, departamentoId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrativo">Administrativo</SelectItem>
                        <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="valor">Valor Mensal *</Label>
                    <MoneyInput
                      value={formData.valor}
                      onChange={(value) => setFormData({...formData, valor: value})}
                      currency="BRL"
                    />
                  </div>

                  <div>
                    <Label htmlFor="diaVencimento">Dia do Vencimento *</Label>
                    <Select value={formData.diaVencimento} onValueChange={(value) => setFormData({...formData, diaVencimento: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Dia do mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 28}, (_, i) => i + 1).map(day => (
                          <SelectItem key={day} value={day.toString()}>
                            Dia {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                    placeholder="Informações adicionais sobre este pagamento"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.nome || !formData.fornecedor || !formData.valor || !formData.diaVencimento || !formData.departamentoId}
                  >
                    {editingId ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabela de Pagamentos */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Próximo</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagamentos.map((pagamento) => {
                    const proximoVencimento = getProximoVencimento(pagamento.diaVencimento);
                    const hoje = new Date();
                    const diferenca = proximoVencimento.getTime() - hoje.getTime();
                    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
                    
                    return (
                      <TableRow key={pagamento.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={pagamento.ativo}
                              onCheckedChange={() => toggleAtivo(pagamento.id)}
                            />
                            <Badge variant={pagamento.ativo ? 'default' : 'secondary'} className={pagamento.ativo ? 'bg-green-100 text-green-800' : ''}>
                              {pagamento.ativo ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getTipoIcon(pagamento.tipo)}
                            {pagamento.nome}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {pagamento.tipo.charAt(0).toUpperCase() + pagamento.tipo.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{pagamento.fornecedor}</TableCell>
                        <TableCell className="font-mono">
                          {formatCurrency(pagamento.valor)}
                        </TableCell>
                        <TableCell>Dia {pagamento.diaVencimento}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className={dias <= 7 && pagamento.ativo ? 'text-red-600 font-medium' : ''}>
                              {proximoVencimento.toLocaleDateString('pt-BR')}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {dias <= 0 ? 'Vencido' : `em ${dias} dias`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {pagamento.departamentoId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(pagamento)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(pagamento.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};