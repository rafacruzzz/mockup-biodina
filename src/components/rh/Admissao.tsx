
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search,
  UserPlus,
  Eye
} from 'lucide-react';
import AdmissaoDetailsModal from './AdmissaoDetailsModal';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { useColaboradores } from '@/contexts/ColaboradoresContext';
import { useToast } from '@/hooks/use-toast';

const Admissao = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidato, setSelectedCandidato] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { processosSeletivos, obterStatusAdmissao, atualizarStatusAdmissao } = useProcessoSeletivo();
  const { adicionarColaborador } = useColaboradores();
  const { toast } = useToast();

  // Obter candidatos aprovados de todos os processos
  const candidatosAprovados = useMemo(() => {
    const candidatos: any[] = [];
    
    processosSeletivos.forEach(processo => {
      const candidatosAprovadosProcesso = processo.candidatos.filter(
        candidato => candidato.status === 'aprovado'
      );
      
      candidatosAprovadosProcesso.forEach(candidato => {
        const statusAdmissao = obterStatusAdmissao(candidato.id);
        
        candidatos.push({
          candidato,
          curriculo: candidato.curriculo || {
            nome: candidato.nome || 'Nome não informado',
            email: candidato.email || 'Email não informado',
            telefone: candidato.telefone || 'Telefone não informado',
            cpf: candidato.cpf || 'CPF não informado',
            cargoDesejado: candidato.cargo || 'Cargo não informado',
            departamento: candidato.departamento || 'Departamento não informado'
          },
          processo: processo.cargo,
          dataAprovacao: candidato.dataUltimaAtualizacao || new Date().toISOString(),
          statusAdmissao,
          documentosRecebidos: Math.floor(Math.random() * 8) + 5,
          totalDocumentos: 12,
          salarioDefinitivo: `R$ ${(Math.random() * 5000 + 3000).toFixed(2)}`,
          cargoDefinitivo: candidato.cargo || processo.cargo
        });
      });
    });
    
    return candidatos;
  }, [processosSeletivos, obterStatusAdmissao]);

  // Filtrar candidatos baseado no termo de busca
  const candidatosFiltrados = useMemo(() => {
    if (!searchTerm) return candidatosAprovados;
    
    return candidatosAprovados.filter(item =>
      item.curriculo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.curriculo.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [candidatosAprovados, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'documentos-pendentes': return 'bg-red-100 text-red-700 border-red-200';
      case 'documentos-completos': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'aguardando-assinatura': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'admitido': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'documentos-pendentes': return 'Documentos Pendentes';
      case 'documentos-completos': return 'Documentos Completos';
      case 'aguardando-assinatura': return 'Aguardando Assinatura';
      case 'admitido': return 'Admitido';
      default: return status;
    }
  };

  const handleStatusUpdate = (candidatoId: string, novoStatus: string) => {
    console.log('Atualizando status do candidato na tabela:', candidatoId, novoStatus);
    atualizarStatusAdmissao(candidatoId, novoStatus);
  };

  const handleCadastrarColaborador = (candidatoAdmissao: any) => {
    console.log('Cadastrando colaborador direto da tabela:', candidatoAdmissao);
    
    // Atualizar status para admitido
    atualizarStatusAdmissao(candidatoAdmissao.candidato.id, 'admitido');
    
    // Criar novo colaborador
    const novoColaborador = {
      nome: candidatoAdmissao.curriculo.nome,
      cargo: candidatoAdmissao.cargoDefinitivo || candidatoAdmissao.curriculo.cargoDesejado,
      departamento: candidatoAdmissao.curriculo.departamento,
      email: candidatoAdmissao.curriculo.email,
      telefone: candidatoAdmissao.curriculo.telefone,
      dataAdmissao: new Date().toISOString(),
      status: 'Novo' as const,
      documentos: []
    };
    
    adicionarColaborador(novoColaborador);
    
    toast({
      title: "Colaborador cadastrado com sucesso!",
      description: `${candidatoAdmissao.curriculo.nome} foi adicionado ao módulo de colaboradores.`,
    });
  };

  const handleViewDetails = (candidato: any) => {
    setSelectedCandidato(candidato);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processo de Admissão</h1>
          <p className="text-gray-600">Gerencie a admissão de candidatos aprovados</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email ou processo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidato</TableHead>
              <TableHead>Processo Seletivo</TableHead>
              <TableHead>Data de Aprovação</TableHead>
              <TableHead>Status da Admissão</TableHead>
              <TableHead>Documentos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidatosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {searchTerm ? 'Nenhum candidato encontrado com os critérios de busca.' : 'Nenhum candidato aprovado aguardando admissão.'}
                </TableCell>
              </TableRow>
            ) : (
              candidatosFiltrados.map((candidatoAdmissao) => (
                <TableRow key={candidatoAdmissao.candidato.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{candidatoAdmissao.curriculo.nome}</div>
                      <div className="text-sm text-gray-500">{candidatoAdmissao.curriculo.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{candidatoAdmissao.processo}</div>
                  </TableCell>
                  <TableCell>
                    {new Date(candidatoAdmissao.dataAprovacao).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(candidatoAdmissao.statusAdmissao)}>
                      {getStatusText(candidatoAdmissao.statusAdmissao)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {candidatoAdmissao.documentosRecebidos}/{candidatoAdmissao.totalDocumentos}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((candidatoAdmissao.documentosRecebidos / candidatoAdmissao.totalDocumentos) * 100)}% completo
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(candidatoAdmissao)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      
                      {candidatoAdmissao.statusAdmissao !== 'admitido' && (
                        <Button
                          size="sm"
                          onClick={() => handleCadastrarColaborador(candidatoAdmissao)}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Cadastrar Colaborador
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdmissaoDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidatoAdmissao={selectedCandidato}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default Admissao;
