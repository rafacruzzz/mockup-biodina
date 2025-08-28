import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { DocumentoAnexo } from '@/types/colaborador';
import { useUsers } from '@/hooks/useUsers';
import UserModal from '@/components/cadastro/UserModal';

interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  vaga: string;
  idade?: number;
  escolaridade?: string;
  curriculo?: DocumentoAnexo;
  documentos?: DocumentoAnexo[];
}

const Admissao = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([
    {
      id: '1',
      nome: 'Candidato A',
      email: 'candidatoa@email.com',
      telefone: '(11) 99999-9999',
      vaga: 'Analista de Sistemas',
      idade: 25,
      escolaridade: 'superior-completo'
    },
    {
      id: '2',
      nome: 'Candidato B',
      email: 'candidatob@email.com',
      telefone: '(11) 88888-8888',
      vaga: 'Coordenador Comercial',
      idade: 30,
      escolaridade: 'pos-graduacao'
    }
  ]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [vaga, setVaga] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const { adicionarUser } = useUsers();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState(null);

  const handleAddCandidato = () => {
    if (!nome || !email || !telefone || !vaga) {
      toast({
        title: "Erro ao adicionar candidato",
        description: "Preencha todos os campos para adicionar um candidato.",
        variant: "destructive",
      })
      return;
    }

    const novoCandidato: Candidato = {
      id: Date.now().toString(),
      nome,
      email,
      telefone,
      vaga
    };
    setCandidatos(prev => [...prev, novoCandidato]);
    setNome('');
    setEmail('');
    setTelefone('');
    setVaga('');
    setIsModalOpen(false);

    toast({
      title: "Candidato adicionado",
      description: "Candidato adicionado com sucesso.",
    })
  };

  const handleCurriculoUpload = (candidatoId: string, file: File) => {
    const documento: DocumentoAnexo = {
      id: Date.now().toString(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      categoria: 'curriculo',
      arquivo: file,
      validadeIndeterminada: true
    };

    setCandidatos(prev =>
      prev.map(candidato =>
        candidato.id === candidatoId ? { ...candidato, curriculo: documento } : candidato
      )
    );
  };

  const handleDocumentoUpload = (candidatoId: string, file: File) => {
    const documento: DocumentoAnexo = {
      id: Date.now().toString(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      categoria: 'documento',
      arquivo: file,
      validadeIndeterminada: true
    };

    setCandidatos(prev =>
      prev.map(candidato => {
        if (candidato.id === candidatoId) {
          const documentos = candidato.documentos ? [...candidato.documentos, documento] : [documento];
          return { ...candidato, documentos: documentos };
        }
        return candidato;
      })
    );
  };

  const handleCadastrarColaborador = (candidatoId: string) => {
    const candidato = candidatos.find(c => c.id === candidatoId);
    if (!candidato) return;

    // Criar dados do usuário baseado no candidato
    const novoUserData = {
      nome: candidato.nome,
      email: candidato.email,
      cpf: candidato.telefone,
      telefone: candidato.telefone,
      isActive: true,
      userType: 'usuario',
      status: 'Novo' as const,
      moduleAccess: [],
      dadosPessoais: {
        nome: candidato.nome,
        cpf: candidato.telefone,
        pis: '',
        idade: candidato.idade?.toString() || '',
        dataNascimento: '',
        estadoCivil: '',
        nacionalidade: 'Brasileira',
        genero: '',
        etnia: '',
        rg: '',
        orgaoExpedidorRg: '',
        ufEmissorRg: '',
        dataExpedicaoRg: '',
        naturalidade: '',
        nomeMae: '',
        nomePai: '',
        cep: '',
        endereco: '',
        numeroResidencia: '',
        complemento: '',
        bairro: '',
        pcd: '',
        doencaPreExistente: '',
        email: candidato.email,
        telefone: candidato.telefone,
        observacoes: ''
      },
      dadosProfissionais: {
        empresa: 'Biodina',
        uf: 'SP',
        setor: '',
        funcao: '',
        cargo: '',
        nivel: '',
        cbo: '',
        compativelFuncao: false,
        funcoesDesempenhadas: '',
        dataAdmissao: new Date().toISOString().split('T')[0],
        dataCadastro: new Date().toISOString().split('T')[0],
        tempoCasa: '',
        ultimaPromocao: '',
        previsaoFerias: '',
        tipoUsuario: '',
        sindicatoVinculado: '',
        regimeTrabalho: '',
        horarioTrabalho: '',
        cargaHorariaSemanal: '',
        origemContratacao: 'Processo Seletivo'
      },
      dadosFinanceiros: {
        salarioBase: '',
        adicionalNivel: '',
        insalubridade: '',
        sobreaviso: '',
        salarioBruto: '',
        valorHoraTrabalhada: '',
        pisoSalarial: '',
        mediaSalarial: '',
        dependentesIR: [],
        adiantamentoSalarial: false
      },
      dadosBancarios: {
        banco: '',
        tipoConta: '',
        agencia: '',
        conta: ''
      },
      formacaoEscolaridade: {
        escolaridade: candidato.escolaridade || '',
        possuiDiploma: false,
        curriculo: candidato.curriculo,
        comprovantesEscolaridade: []
      },
      beneficios: {
        tipoPlano: '',
        quantidadeDependentesPlano: '',
        valeTransporte: {
          modalidade: '',
          dataSolicitacaoCartao: '',
          dataPagamento: ''
        },
        valeAlimentacao: {
          dataSolicitacaoCartao: '',
          dataPagamento: ''
        },
        planoSaude: {
          operadora: '',
          dataSolicitacao: '',
          vigenciaInicio: '',
          tipoPlano: '',
          possuiDependentes: false,
          dependentes: []
        }
      },
      documentacao: {
        anexos: candidato.documentos || [],
        solicitadoParaDPEm: new Date().toISOString().split('T')[0],
        solicitadoPor: 'RH - Processo Seletivo',
        motivoContratacao: 'Aprovação em Processo Seletivo',
        observacoesGerais: `Candidato aprovado no processo seletivo para a vaga: ${candidato.vaga}`,
        exameAdmissional: {
          data: '',
          local: '',
          horario: ''
        }
      },
      dadosTI: {
        servidorAcesso: '',
        permissoesNecessarias: '',
        restricoes: '',
        pastasAcesso: '',
        emailCorporativo: '',
        ramal: ''
      }
    };

    setNewUserData(novoUserData);
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setNewUserData(null);
  };

  const handleSaveUser = () => {
    if (newUserData) {
      adicionarUser(newUserData);
      setIsUserModalOpen(false);
      setNewUserData(null);
      
      // Mostrar mensagem de sucesso
      console.log('Usuário cadastrado com sucesso!');
    }
  };

  return (
    <>
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Processo de Admissão</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Candidato
          </Button>
        </div>

        <Separator className="my-4" />

        <Table>
          <TableCaption>Lista de candidatos aprovados no processo seletivo.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Vaga</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidatos.map((candidato) => (
              <TableRow key={candidato.id}>
                <TableCell className="font-medium">{candidato.nome}</TableCell>
                <TableCell>{candidato.email}</TableCell>
                <TableCell>{candidato.telefone}</TableCell>
                <TableCell>{candidato.vaga}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Currículo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Currículo do Candidato</DialogTitle>
                          <DialogDescription>
                            Anexe o currículo do candidato para facilitar o processo de admissão.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nome" className="text-right">
                              Currículo
                            </Label>
                            <Input
                              type="file"
                              id="curriculo"
                              className="col-span-3"
                              onChange={(e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handleCurriculoUpload(candidato.id, file);
                              }}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Documentos
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Documentos do Candidato</DialogTitle>
                          <DialogDescription>
                            Anexe os documentos do candidato para facilitar o processo de admissão.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nome" className="text-right">
                              Documento
                            </Label>
                            <Input
                              type="file"
                              id="documento"
                              className="col-span-3"
                              onChange={(e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handleDocumentoUpload(candidato.id, file);
                              }}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="default" size="sm" onClick={() => handleCadastrarColaborador(candidato.id)}>
                      <User className="h-4 w-4 mr-2" />
                      Cadastrar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex justify-end space-x-2">
                  <div>Total de candidatos:</div>
                  <Badge variant="secondary">{candidatos.length}</Badge>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Candidato</DialogTitle>
            <DialogDescription>
              Adicione um novo candidato para o processo de admissão.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefone" className="text-right">
                Telefone
              </Label>
              <Input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vaga" className="text-right">
                Vaga
              </Label>
              <Select onValueChange={(value) => setVaga(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a vaga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analista de Sistemas">Analista de Sistemas</SelectItem>
                  <SelectItem value="Coordenador Comercial">Coordenador Comercial</SelectItem>
                  <SelectItem value="Assistente de RH">Assistente de RH</SelectItem>
                  <SelectItem value="Operador de Estoque">Operador de Estoque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" onClick={handleAddCandidato}>
            Adicionar Candidato
          </Button>
        </DialogContent>
      </Dialog>
      
      {/* Modal do Usuário */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        userData={newUserData}
        editMode={false}
        showCredentials={false} // Não mostrar credenciais na admissão inicial
      />
    </>
  );
};

export default Admissao;
