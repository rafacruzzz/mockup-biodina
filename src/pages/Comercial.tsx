import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash2, Users, Target, TrendingUp, DollarSign, FileText, Phone, Mail, MapPin, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OportunidadeAvancadaForm from '@/components/comercial/OportunidadeAvancadaForm';
import PedidoModalBridge from '@/components/comercial/PedidoModalBridge';

interface Oportunidade {
  id: number;
  nome: string;
  cliente: string;
  dataAbertura: string;
  responsavel: string;
  status: string;
  probabilidade: number;
  valorEstimado: number;
}

const Comercial = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isOportunidadeModalOpen, setIsOportunidadeModalOpen] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<Oportunidade | null>(null);
  const [isAvancadaModalOpen, setIsAvancadaModalOpen] = useState(false);

  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [pedidoOportunidade, setPedidoOportunidade] = useState<any>(null);

  useEffect(() => {
    // Dados mockados para oportunidades
    const mockOportunidades: Oportunidade[] = [
      { id: 1, nome: 'Desenvolvimento de Software', cliente: 'Empresa A', dataAbertura: '2024-01-15', responsavel: 'João Silva', status: 'Em Andamento', probabilidade: 75, valorEstimado: 50000 },
      { id: 2, nome: 'Consultoria em Marketing Digital', cliente: 'Empresa B', dataAbertura: '2024-02-01', responsavel: 'Maria Santos', status: 'Proposta Enviada', probabilidade: 50, valorEstimado: 30000 },
      { id: 3, nome: 'Implementação de CRM', cliente: 'Empresa C', dataAbertura: '2024-02-10', responsavel: 'Carlos Oliveira', status: 'Negociação', probabilidade: 90, valorEstimado: 75000 },
      { id: 4, nome: 'Treinamento de Equipes', cliente: 'Empresa D', dataAbertura: '2024-03-01', responsavel: 'Ana Paula', status: 'Concluída', probabilidade: 100, valorEstimado: 20000 },
      { id: 5, nome: 'Desenvolvimento de App Mobile', cliente: 'Empresa E', dataAbertura: '2024-03-15', responsavel: 'Ricardo Alves', status: 'Em Andamento', probabilidade: 60, valorEstimado: 60000 },
    ];
    setOportunidades(mockOportunidades);
  }, []);

  const filteredOportunidades = oportunidades.filter(oportunidade => {
    const searchMatch = oportunidade.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oportunidade.cliente.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = filterStatus ? oportunidade.status === filterStatus : true;
    return searchMatch && statusMatch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const handleOpenOportunidadeModal = () => {
    setIsOportunidadeModalOpen(true);
  };

  const handleCloseOportunidadeModal = () => {
    setIsOportunidadeModalOpen(false);
    setSelectedOportunidade(null);
  };

  const handleSaveOportunidade = (oportunidadeData: Oportunidade) => {
    console.log('Salvando oportunidade:', oportunidadeData);
    // Aqui você pode implementar a lógica para salvar a oportunidade
    setIsOportunidadeModalOpen(false);
    setSelectedOportunidade(null);
    toast({
      title: "Oportunidade salva com sucesso!",
      description: "A oportunidade foi adicionada/atualizada na lista.",
    });
  };

  const handleEditOportunidade = (oportunidade: Oportunidade) => {
    setSelectedOportunidade(oportunidade);
    setIsOportunidadeModalOpen(true);
  };

  const handleDeleteOportunidade = (id: number) => {
    console.log('Deletando oportunidade com ID:', id);
    // Aqui você pode implementar a lógica para deletar a oportunidade
    toast({
      title: "Oportunidade deletada!",
      description: "A oportunidade foi removida da lista.",
    });
  };

  const handleOpenAvancadaModal = (oportunidade: Oportunidade) => {
    setSelectedOportunidade(oportunidade);
    setIsAvancadaModalOpen(true);
  };

  const handleCloseAvancadaModal = () => {
    setIsAvancadaModalOpen(false);
    setSelectedOportunidade(null);
  };

  const handleSaveAvancada = (avancadaData: any) => {
    console.log('Salvando dados avançados:', avancadaData);
    // Aqui você pode implementar a lógica para salvar os dados avançados
    setIsAvancadaModalOpen(false);
    setSelectedOportunidade(null);
    toast({
      title: "Dados avançados salvos!",
      description: "Os dados avançados da oportunidade foram atualizados.",
    });
  };

  const handleGerarPedido = (oportunidade: any) => {
    setPedidoOportunidade(oportunidade);
    setShowPedidoForm(true);
  };

  const handleSavePedido = (pedidoData: any) => {
    console.log('Salvando pedido:', pedidoData);
    // Aqui você pode implementar a lógica para salvar o pedido
    setShowPedidoForm(false);
    setPedidoOportunidade(null);
    toast({
      title: "Pedido criado com sucesso!",
      description: "O pedido foi gerado a partir da oportunidade.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r flex-none h-full p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Comercial</h2>
        </div>
        <Button variant="outline" className="w-full justify-start mb-2" onClick={handleOpenOportunidadeModal}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Oportunidade
        </Button>
        <Input
          type="search"
          placeholder="Buscar oportunidade..."
          className="mb-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Select value={filterStatus} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
            <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
            <SelectItem value="Negociação">Negociação</SelectItem>
            <SelectItem value="Concluída">Concluída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-4">
          <h1 className="text-2xl font-semibold">Oportunidades</h1>
        </div>

        <main className="flex-1 p-4 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor Estimado</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOportunidades.map(oportunidade => (
                <TableRow key={oportunidade.id}>
                  <TableCell>{oportunidade.nome}</TableCell>
                  <TableCell>{oportunidade.cliente}</TableCell>
                  <TableCell>{oportunidade.dataAbertura}</TableCell>
                  <TableCell>{oportunidade.responsavel}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{oportunidade.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">R$ {oportunidade.valorEstimado.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditOportunidade(oportunidade)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenAvancadaModal(oportunidade)}>
                          <Target className="h-4 w-4 mr-2" />
                          Dados Avançados
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleGerarPedido(oportunidade)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Gerar Pedido
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteOportunidade(oportunidade.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>

        <Dialog open={isOportunidadeModalOpen} onOpenChange={setIsOportunidadeModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedOportunidade ? 'Editar Oportunidade' : 'Nova Oportunidade'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input type="text" id="name" defaultValue={selectedOportunidade?.nome} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Cliente
                </Label>
                <Input type="text" id="customer" defaultValue={selectedOportunidade?.cliente} className="col-span-3" />
              </div>
              {/* Adicione os outros campos do formulário aqui */}
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={handleCloseOportunidadeModal}>
                Cancelar
              </Button>
              <Button className="ml-2" onClick={() => handleSaveOportunidade({
                id: selectedOportunidade?.id || oportunidades.length + 1,
                nome: 'Nome da Oportunidade', // Substitua pelos valores dos inputs
                cliente: 'Nome do Cliente', // Substitua pelos valores dos inputs
                dataAbertura: '2024-01-01', // Substitua pelos valores dos inputs
                responsavel: 'Nome do Responsável', // Substitua pelos valores dos inputs
                status: 'Em Andamento', // Substitua pelos valores dos inputs
                probabilidade: 50, // Substitua pelos valores dos inputs
                valorEstimado: 100000, // Substitua pelos valores dos inputs
              })}>
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAvancadaModalOpen} onOpenChange={setIsAvancadaModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Dados Avançados da Oportunidade</DialogTitle>
            </DialogHeader>
            {selectedOportunidade && (
              <OportunidadeAvancadaForm
                oportunidade={selectedOportunidade}
                onSave={handleSaveAvancada}
                onClose={handleCloseAvancadaModal}
              />
            )}
          </DialogContent>
        </Dialog>

        {showPedidoForm && (
          <PedidoModalBridge
            isOpen={showPedidoForm}
            onClose={() => {
              setShowPedidoForm(false);
              setPedidoOportunidade(null);
            }}
            onSave={handleSavePedido}
            oportunidade={pedidoOportunidade}
          />
        )}
      </div>
    </div>
  );
};

export default Comercial;
