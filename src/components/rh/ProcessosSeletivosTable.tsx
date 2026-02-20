
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Eye, Calendar, Users, User, Building2 } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ProcessoSeletivo } from '@/types/processoSeletivo';
import ConfigurarEtapasModal from './ConfigurarEtapasModal';

interface ProcessosSeletivosTableProps {
  onViewProcess: (processoId: string) => void;
}

const ProcessosSeletivosTable: React.FC<ProcessosSeletivosTableProps> = ({ onViewProcess }) => {
  const { processosSeletivos } = useProcessoSeletivo();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: ProcessoSeletivo['status']) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'pausado': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'finalizado': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusText = (status: ProcessoSeletivo['status']) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'pausado': return 'Pausado';
      case 'finalizado': return 'Finalizado';
      default: return status;
    }
  };

  const filteredProcessos = useMemo(() => {
    return processosSeletivos.filter(processo => {
      const matchesSearch = searchTerm === '' || 
        processo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.responsavel.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || processo.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [processosSeletivos, searchTerm, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCandidatosCount = (processo: ProcessoSeletivo) => {
    return processo.candidatos.length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Processos Seletivos</h2>
          <p className="text-gray-600">Gerencie todos os processos seletivos da empresa</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-imuv-blue hover:bg-imuv-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Processo Seletivo
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, cargo, departamento ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo Seletivo</TableHead>
                <TableHead>Cargo/Departamento</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Candidatos</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcessos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Nenhum processo seletivo encontrado com os filtros aplicados.'
                      : 'Nenhum processo seletivo encontrado. Crie o primeiro processo!'
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredProcessos.map((processo) => (
                  <TableRow key={processo.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-semibold text-gray-900">{processo.titulo}</div>
                        <div className="text-sm text-gray-500">{processo.vagas} vaga(s)</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{processo.cargo}</div>
                          <div className="text-sm text-gray-500">{processo.departamento}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(processo.dataInicio)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(processo.status)} border`}>
                        {getStatusText(processo.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{getCandidatosCount(processo)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{processo.responsavel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewProcess(processo.id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Ver Processo
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Novo Processo */}
      <ConfigurarEtapasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        processo={null}
      />
    </div>
  );
};

export default ProcessosSeletivosTable;
