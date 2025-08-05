
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Eye, Edit, Trash2, Download, Link, Users, FileText, Clock, Filter } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { Curriculo } from '@/types/processoSeletivo';

interface FiltrosCurriculo {
  busca: string;
  departamento: string;
  status: string;
  fonte: string;
}

const BancoCurriculos: React.FC = () => {
  const { curriculos, buscarCurriculos } = useProcessoSeletivo();
  const [filtros, setFiltros] = useState<FiltrosCurriculo>({
    busca: '',
    departamento: '',
    status: '',
    fonte: ''
  });
  const [curriculoSelecionado, setCurriculoSelecionado] = useState<Curriculo | null>(null);
  const [modalVisualizacao, setModalVisualizacao] = useState(false);

  const curriculosFiltrados = useMemo(() => {
    return buscarCurriculos(filtros);
  }, [curriculos, filtros, buscarCurriculos]);

  const estatisticas = useMemo(() => {
    const total = curriculos.length;
    const novos = curriculos.filter(c => c.status === 'novo').length;
    const emAnalise = curriculos.filter(c => c.status === 'em-analise').length;
    const aprovados = curriculos.filter(c => c.status === 'aprovado').length;
    
    return { total, novos, emAnalise, aprovados };
  }, [curriculos]);

  const departamentos = useMemo(() => {
    const deps = [...new Set(curriculos.map(c => c.departamento))];
    return deps.sort();
  }, [curriculos]);

  const getStatusColor = (status: Curriculo['status']) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'em-analise': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'aprovado': return 'bg-green-100 text-green-700 border-green-200';
      case 'reprovado': return 'bg-red-100 text-red-700 border-red-200';
      case 'contratado': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSourceIcon = (fonte: Curriculo['fonte']) => {
    switch (fonte) {
      case 'site': return '🌐';
      case 'linkedin': return '💼';
      case 'indicacao': return '👥';
      case 'manual': return '📝';
      default: return '📄';
    }
  };

  const handleVisualizarCurriculo = (curriculo: Curriculo) => {
    setCurriculoSelecionado(curriculo);
    setModalVisualizacao(true);
  };

  const handleGerarLinkPublico = () => {
    const linkId = Math.random().toString(36).substring(7);
    const linkCompleto = `${window.location.origin}/candidatura/${linkId}`;
    
    navigator.clipboard.writeText(linkCompleto);
    // Aqui você pode adicionar um toast de sucesso
    console.log('Link copiado:', linkCompleto);
  };

  return (
    <div className="space-y-6">
      {/* Header e Estatísticas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Banco de Currículos</h2>
          <p className="text-gray-600">Gerencie os currículos recebidos e organize por departamento</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGerarLinkPublico}>
            <Link className="h-4 w-4 mr-2" />
            Gerar Link Público
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Currículo
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{estatisticas.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Novos</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estatisticas.novos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Em Análise</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estatisticas.emAnalise}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aprovados</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estatisticas.aprovados}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email, habilidades..."
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Select
              value={filtros.departamento}
              onValueChange={(value) => setFiltros({ ...filtros, departamento: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os departamentos</SelectItem>
                {departamentos.map(dep => (
                  <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filtros.status}
              onValueChange={(value) => setFiltros({ ...filtros, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="em-analise">Em Análise</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="reprovado">Reprovado</SelectItem>
                <SelectItem value="contratado">Contratado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={filtros.fonte}
              onValueChange={(value) => setFiltros({ ...filtros, fonte: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as fontes</SelectItem>
                <SelectItem value="site">Site</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indicacao">Indicação</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Currículos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Currículos ({curriculosFiltrados.length})</span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo Desejado</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Data de Envio</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {curriculosFiltrados.map((curriculo) => (
                  <TableRow key={curriculo.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{curriculo.nome}</div>
                        <div className="text-sm text-gray-500">{curriculo.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{curriculo.cargoDesejado}</TableCell>
                    <TableCell>{curriculo.departamento}</TableCell>
                    <TableCell>{curriculo.experiencia}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(curriculo.status)}>
                        {curriculo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        {getSourceIcon(curriculo.fonte)}
                        <span className="capitalize">{curriculo.fonte}</span>
                      </span>
                    </TableCell>
                    <TableCell>{new Date(curriculo.dataEnvio).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleVisualizarCurriculo(curriculo)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
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

      {/* Modal de Visualização de Currículo */}
      <Dialog open={modalVisualizacao} onOpenChange={setModalVisualizacao}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Currículo</DialogTitle>
          </DialogHeader>
          
          {curriculoSelecionado && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{curriculoSelecionado.nome}</h3>
                  <p className="text-gray-600">{curriculoSelecionado.cargoDesejado}</p>
                  <Badge className={getStatusColor(curriculoSelecionado.status)} variant="outline">
                    {curriculoSelecionado.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Data de Envio</p>
                  <p className="font-medium">{new Date(curriculoSelecionado.dataEnvio).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Informações de Contato</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {curriculoSelecionado.email}</p>
                    <p><strong>Telefone:</strong> {curriculoSelecionado.telefone}</p>
                    <p><strong>CPF:</strong> {curriculoSelecionado.cpf}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Informações Profissionais</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Departamento:</strong> {curriculoSelecionado.departamento}</p>
                    <p><strong>Experiência:</strong> {curriculoSelecionado.experiencia}</p>
                    <p><strong>Escolaridade:</strong> {curriculoSelecionado.escolaridade}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Habilidades</h4>
                <div className="flex flex-wrap gap-2">
                  {curriculoSelecionado.habilidades.map((habilidade, index) => (
                    <Badge key={index} variant="outline">
                      {habilidade}
                    </Badge>
                  ))}
                </div>
              </div>

              {curriculoSelecionado.observacoes && (
                <div>
                  <h4 className="font-semibold mb-2">Observações</h4>
                  <p className="text-sm text-gray-600">{curriculoSelecionado.observacoes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BancoCurriculos;
