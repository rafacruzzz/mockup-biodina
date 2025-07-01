import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, Briefcase, Target, FileText, Users, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import OportunidadeForm from '@/components/comercial/OportunidadeForm';
import ContratacaoSimplesForm from '@/components/comercial/ContratacaoSimplesForm';
import OportunidadeAvancadaForm from '@/components/comercial/OportunidadeAvancadaForm';
import { toast } from "sonner";

interface Oportunidade {
  id: number;
  nomeFantasia: string;
  modalidade: string;
  valorNegocio: number;
  status: string;
  dataInicio: string;
  colaboradoresResponsaveis: string;
  termometro: number;
}

const Comercial = () => {
  const [activeTab, setActiveTab] = useState('oportunidades');
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [comercialAdministrativo, setComercialAdministrativo] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isContratacaoFormOpen, setIsContratacaoFormOpen] = useState(false);
  const [isLicitacaoFormOpen, setIsLicitacaoFormOpen] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const handleCreateOportunidade = (data: any) => {
    const newOportunidade = {
      ...data,
      id: Date.now(),
    };
    setOportunidades(prev => [...prev, newOportunidade]);
    toast.success('Oportunidade criada com sucesso!');
  };

  const handleCreateComercialAdministrativo = (data: any) => {
    const newComercialAdministrativo = {
      ...data,
      id: Date.now(),
      codigoVinculado: data.codigoVinculado || `CA-${Date.now()}`,
      origemLicitacao: data.origemLicitacao || false
    };
    setComercialAdministrativo(prev => [...prev, newComercialAdministrativo]);
    
    // Abrir automaticamente o formulário de Comercial Administrativo
    setSelectedOportunidade(newComercialAdministrativo);
    setIsContratacaoFormOpen(true);
    
    toast.success('Entrada criada automaticamente no Comercial Administrativo!');
  };

  const handleSaveComercialAdministrativo = (data: any) => {
    if (selectedOportunidade) {
      setComercialAdministrativo(prev => 
        prev.map(item => item.id === selectedOportunidade.id ? { ...data, id: selectedOportunidade.id } : item)
      );
      toast.success('Comercial Administrativo atualizado com sucesso!');
    } else {
      handleCreateComercialAdministrativo(data);
    }
  };

  const handleSaveLicitacao = (data: any) => {
    if (selectedOportunidade) {
      setOportunidades(prev => 
        prev.map(opp => opp.id === selectedOportunidade.id ? { ...data, id: selectedOportunidade.id } : opp)
      );
      toast.success('Licitação atualizada com sucesso!');
    } else {
      handleCreateOportunidade(data);
    }
  };

  const handleEditOportunidade = (oportunidade: any) => {
    setSelectedOportunidade(oportunidade);
    if (oportunidade.modalidade === 'licitacao') {
      setIsLicitacaoFormOpen(true);
    } else if (oportunidade.modalidade === 'contratacao_simples') {
      setIsContratacaoFormOpen(true);
    } else {
      setIsFormOpen(true);
    }
  };

  const handleDeleteOportunidade = (id: number) => {
    setOportunidades(prev => prev.filter(opp => opp.id !== id));
    toast.success('Oportunidade removida com sucesso!');
  };

  const closeAllModals = () => {
    setIsFormOpen(false);
    setIsContratacaoFormOpen(false);
    setIsLicitacaoFormOpen(false);
    setSelectedOportunidade(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_triagem': return 'bg-yellow-500';
      case 'em_acompanhamento': return 'bg-blue-500';
      case 'ganha': return 'bg-green-500';
      case 'perdida': return 'bg-red-500';
      case 'cancelada': return 'bg-gray-500';
      case 'em_andamento': return 'bg-blue-500';
      case 'ganho': return 'bg-green-500';
      case 'perda': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'text-red-500';
    if (valor < 60) return 'text-yellow-500';
    if (valor < 80) return 'text-orange-500';
    return 'text-green-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredOportunidades = oportunidades.filter(opp => {
    const matchesSearch = opp.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredComercialAdministrativo = comercialAdministrativo.filter(item => {
    const matchesSearch = item.nomeFantasia?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Comercial</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="oportunidades" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Oportunidades
            </TabsTrigger>
            <TabsTrigger value="comercial-administrativo" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Comercial Administrativo
            </TabsTrigger>
            <TabsTrigger value="licitacoes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Licitações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="oportunidades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestão de Oportunidades</span>
                  <Button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Oportunidade
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar oportunidades..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="em_triagem">Em Triagem</SelectItem>
                      <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                      <SelectItem value="ganha">Ganha</SelectItem>
                      <SelectItem value="perdida">Perdida</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Modalidade</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead>Termômetro</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOportunidades.map((oportunidade) => (
                        <TableRow key={oportunidade.id}>
                          <TableCell className="font-medium">{oportunidade.nomeFantasia}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {oportunidade.modalidade === 'contratacao_simples' ? 'Contratação Simples' : 
                               oportunidade.modalidade === 'licitacao' ? 'Licitação' : 
                               'Importação Direta'}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(oportunidade.valorNegocio)}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(oportunidade.status)} text-white`}>
                              {oportunidade.status?.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {oportunidade.dataInicio ? new Date(oportunidade.dataInicio).toLocaleDateString('pt-BR') : '-'}
                          </TableCell>
                          <TableCell>{oportunidade.colaboradoresResponsaveis}</TableCell>
                          <TableCell>
                            <span className={`font-medium ${getTermometroColor(oportunidade.termometro)}`}>
                              {oportunidade.termometro}°
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditOportunidade(oportunidade)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteOportunidade(oportunidade.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comercial-administrativo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Comercial Administrativo</span>
                  <Button 
                    onClick={() => setIsContratacaoFormOpen(true)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Comercial Administrativo
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar no comercial administrativo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="em_triagem">Em Triagem</SelectItem>
                      <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                      <SelectItem value="ganha">Ganha</SelectItem>
                      <SelectItem value="perdida">Perdida</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredComercialAdministrativo.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.nomeFantasia}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {item.codigoVinculado}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(item.valorNegocio || 0)}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(item.status || 'em_triagem')} text-white`}>
                              {(item.status || 'em_triagem')?.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.origemLicitacao ? "default" : "secondary"}>
                              {item.origemLicitacao ? 'Licitação' : 'Direto'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item.dataInicio ? new Date(item.dataInicio).toLocaleDateString('pt-BR') : '-'}
                          </TableCell>
                          <TableCell>{item.colaboradoresResponsaveis}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditOportunidade({ ...item, modalidade: 'contratacao_simples' })}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setComercialAdministrativo(prev => prev.filter(ca => ca.id !== item.id));
                                  toast.success('Item removido com sucesso!');
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licitacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestão de Licitações</span>
                  <Button 
                    onClick={() => setIsLicitacaoFormOpen(true)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Licitação
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar licitações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="ganho">Ganho</SelectItem>
                      <SelectItem value="perda">Perda</SelectItem>
                      <SelectItem value="fracassado">Fracassado</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Nº Pregão</TableHead>
                        <TableHead>Valor Estimado</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data Abertura</TableHead>
                        <TableHead>Instituição</TableHead>
                        <TableHead>Termômetro</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {oportunidades
                        .filter(opp => opp.modalidade === 'licitacao')
                        .filter(opp => {
                          const matchesSearch = opp.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
                          const matchesStatus = statusFilter === 'todos' || opp.status === statusFilter;
                          return matchesSearch && matchesStatus;
                        })
                        .map((licitacao: any) => (
                        <TableRow key={licitacao.id}>
                          <TableCell className="font-medium">{licitacao.nomeFantasia}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {licitacao.numeroPregao || '-'}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(licitacao.valorEstimado || 0)}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(licitacao.statusLicitacao || licitacao.status)} text-white`}>
                              {(licitacao.statusLicitacao || licitacao.status || 'em_andamento')?.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {licitacao.dataAbertura ? new Date(licitacao.dataAbertura).toLocaleDateString('pt-BR') : '-'}
                          </TableCell>
                          <TableCell>{licitacao.nomeInstituicao || '-'}</TableCell>
                          <TableCell>
                            <span className={`font-medium ${getTermometroColor(licitacao.termometro || 50)}`}>
                              {licitacao.termometro || 50}°
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditOportunidade(licitacao)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteOportunidade(licitacao.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modais */}
        {isFormOpen && (
          <OportunidadeForm
            onClose={closeAllModals}
            onSave={handleCreateOportunidade}
            oportunidade={selectedOportunidade}
          />
        )}

        {isContratacaoFormOpen && (
          <ContratacaoSimplesForm
            isOpen={isContratacaoFormOpen}
            onClose={closeAllModals}
            onSave={handleSaveComercialAdministrativo}
            oportunidade={selectedOportunidade}
          />
        )}

        {isLicitacaoFormOpen && (
          <OportunidadeAvancadaForm
            oportunidade={selectedOportunidade}
            onClose={closeAllModals}
            onSave={handleSaveLicitacao}
            onCreateComercialAdministrativo={handleCreateComercialAdministrativo}
          />
        )}
      </div>
    </SidebarLayout>
  );
};

export default Comercial;
