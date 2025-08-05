import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  FileText, 
  Upload, 
  Eye, 
  User, 
  Calendar,
  Clock,
  AlertCircle,
  Download,
  UserPlus
} from 'lucide-react';
import { checklistDocumentosAdmissao } from '@/data/processoSeletivo';
import { useColaborador } from '@/contexts/ColaboradorContext';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ColaboradorData, DocumentoAnexo } from '@/types/colaborador';
import { useToast } from '@/hooks/use-toast';
import ColaboradorModal from './ColaboradorModal';

interface CandidatoAdmissao {
  candidato: any;
  curriculo: any;
  processo: string;
  dataAprovacao: string;
  statusAdmissao: 'documentos-pendentes' | 'documentos-completos' | 'aguardando-assinatura' | 'admitido';
  documentosRecebidos: number;
  totalDocumentos: number;
  salarioDefinitivo?: string;
  cargoDefinitivo?: string;
}

interface AdmissaoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidatoAdmissao: CandidatoAdmissao | null;
}

const AdmissaoDetailsModal = ({ isOpen, onClose, candidatoAdmissao }: AdmissaoDetailsModalProps) => {
  const [observacoes, setObservacoes] = useState('');
  const [salarioFinal, setSalarioFinal] = useState('');
  const [cargoFinal, setCargoFinal] = useState('');
  const [colaboradorModalOpen, setColaboradorModalOpen] = useState(false);
  const [colaboradorData, setColaboradorData] = useState<ColaboradorData | null>(null);
  
  const { adicionarColaborador } = useColaborador();
  const { atualizarStatusAdmissao } = useProcessoSeletivo();
  const { toast } = useToast();

  if (!candidatoAdmissao) return null;

  const { candidato, curriculo, processo, statusAdmissao } = candidatoAdmissao;

  // Mock dos documentos - na implementação real, isso viria do contexto
  const documentos = checklistDocumentosAdmissao.map((doc, index) => ({
    ...doc,
    id: `doc-${index}`,
    recebido: Math.random() > 0.3, // Simula alguns documentos já recebidos
    arquivo: Math.random() > 0.5 ? 'documento.pdf' : undefined,
    dataRecebimento: Math.random() > 0.5 ? new Date().toISOString() : undefined
  }));

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

  const documentosRecebidos = documentos.filter(d => d.recebido).length;
  const progressoDocumentos = Math.round((documentosRecebidos / documentos.length) * 100);

  const criarColaboradorData = (): ColaboradorData => {
    // Mapeia os documentos de admissão para anexos do colaborador
    const anexosDocumentacao: DocumentoAnexo[] = documentos
      .filter(doc => doc.recebido)
      .map(doc => ({
        id: doc.id,
        nome: doc.nome,
        tipo: 'pdf',
        tamanho: 1024,
        dataUpload: doc.dataRecebimento || new Date().toISOString(),
        categoria: 'admissao',
        observacoes: doc.observacoes,
        arquivo: null
      }));

    return {
      dadosPessoais: {
        nome: curriculo.nome,
        cpf: curriculo.cpf,
        pis: '',
        idade: '',
        dataNascimento: '',
        genero: '',
        etnia: '',
        rg: '',
        orgaoExpedidorRg: '',
        ufEmissorRg: '',
        dataExpedicaoRg: '',
        naturalidade: '',
        nomeMae: '',
        nomePai: '',
        cid: '',
        email: curriculo.email,
        telefone: curriculo.telefone,
        endereco: '',
        bairro: '',
        observacoes: observacoes
      },
      dadosProfissionais: {
        empresa: 'Biodina',
        uf: 'SP',
        setor: curriculo.departamento,
        funcao: cargoFinal || candidatoAdmissao.cargoDefinitivo || curriculo.cargoDesejado,
        cargo: cargoFinal || candidatoAdmissao.cargoDefinitivo || curriculo.cargoDesejado,
        nivel: 'Junior',
        cbo: '',
        compativelFuncao: true,
        funcoesDesempenhadas: '',
        dataAdmissao: new Date().toISOString().split('T')[0],
        dataCadastro: new Date().toISOString().split('T')[0],
        tempoCasa: '0 anos',
        ultimaPromocao: '',
        previsaoFerias: ''
      },
      dadosFinanceiros: {
        salarioBase: salarioFinal || candidatoAdmissao.salarioDefinitivo || '0,00',
        adicionalNivel: '0,00',
        insalubridade: '0,00',
        sobreaviso: '0,00',
        salarioBruto: salarioFinal || candidatoAdmissao.salarioDefinitivo || '0,00',
        valorHoraTrabalhada: '0,00',
        pisoSalarial: '0,00',
        mediaSalarial: '0,00',
        dependentesIR: '0'
      },
      dadosBancarios: {
        banco: '',
        tipoConta: 'Corrente',
        agencia: '',
        conta: ''
      },
      formacaoEscolaridade: {
        escolaridade: curriculo.escolaridade,
        possuiDiploma: false
      },
      beneficios: {
        tipoPlano: '',
        quantidadeDependentesPlano: '0'
      },
      documentacao: {
        anexos: anexosDocumentacao
      }
    };
  };

  const handleCadastrarColaborador = () => {
    const colaboradorDados = criarColaboradorData();
    setColaboradorData(colaboradorDados);
    setColaboradorModalOpen(true);
  };

  const handleSalvarColaborador = (dados: ColaboradorData) => {
    // Adiciona o colaborador no contexto
    const colaboradorId = adicionarColaborador(dados);
    
    // Atualiza o status de admissão
    atualizarStatusAdmissao(candidato.id, candidato.processoSeletivoId, 'admitido');
    
    // Mostra toast de sucesso
    toast({
      title: "Colaborador cadastrado com sucesso!",
      description: `${dados.dadosPessoais.nome} foi adicionado ao sistema.`,
    });
    
    // Fecha os modais
    setColaboradorModalOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Processo de Admissão</DialogTitle>
              <Badge className={getStatusColor(statusAdmissao)}>
                {getStatusText(statusAdmissao)}
              </Badge>
            </div>
          </DialogHeader>

          <Tabs defaultValue="geral" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
              <TabsTrigger value="documentos">
                Documentos ({documentosRecebidos}/{documentos.length})
              </TabsTrigger>
              <TabsTrigger value="aprovacao">Dados da Aprovação</TabsTrigger>
              <TabsTrigger value="finalizacao">Finalização</TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações do Candidato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Nome</Label>
                      <p className="text-sm font-semibold">{curriculo.nome}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <p className="text-sm">{curriculo.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Telefone</Label>
                      <p className="text-sm">{curriculo.telefone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">CPF</Label>
                      <p className="text-sm">{curriculo.cpf}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Processo Seletivo</Label>
                      <p className="text-sm font-semibold">{processo}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Data de Aprovação</Label>
                      <p className="text-sm">{new Date(candidatoAdmissao.dataAprovacao).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Progresso da Documentação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Documentos Coletados</span>
                      <span className="text-sm text-gray-600">
                        {documentosRecebidos} de {documentos.length}
                      </span>
                    </div>
                    <Progress value={progressoDocumentos} className="h-3" />
                    <p className="text-xs text-gray-500">
                      {progressoDocumentos}% dos documentos necessários foram coletados
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-4">
              <div className="grid gap-4">
                {documentos.map((documento) => (
                  <Card key={documento.id} className={documento.recebido ? 'border-green-200 bg-green-50' : 'border-gray-200'}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${documento.recebido ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {documento.recebido ? <CheckCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{documento.nome}</h4>
                              {documento.obrigatorio && (
                                <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">{documento.observacoes}</p>
                            {documento.dataRecebimento && (
                              <p className="text-xs text-green-600 mt-1">
                                Recebido em: {new Date(documento.dataRecebimento).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {documento.recebido ? (
                            <>
                              {documento.arquivo && (
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aprovacao" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Contratação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cargo-final">Cargo Definitivo</Label>
                      <Input
                        id="cargo-final"
                        value={cargoFinal}
                        onChange={(e) => setCargoFinal(e.target.value)}
                        placeholder={candidatoAdmissao.cargoDefinitivo || curriculo.cargoDesejado}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salario-final">Salário Definitivo</Label>
                      <Input
                        id="salario-final"
                        value={salarioFinal}
                        onChange={(e) => setSalarioFinal(e.target.value)}
                        placeholder={candidatoAdmissao.salarioDefinitivo || 'R$ 0,00'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="observacoes">Observações da Contratação</Label>
                    <Textarea
                      id="observacoes"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Adicione observações sobre a contratação, condições especiais, data de início, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finalizacao" className="space-y-4">
              {statusAdmissao === 'admitido' ? (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800">Candidato Admitido</h3>
                    </div>
                    <p className="text-green-700 mb-4">
                      Este candidato foi admitido com sucesso. Todos os documentos foram coletados e o processo foi finalizado.
                    </p>
                    <Button onClick={handleCadastrarColaborador} className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Cadastrar como Colaborador no Sistema
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      Finalização do Processo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Status Atual: {getStatusText(statusAdmissao)}</h4>
                      <p className="text-sm text-yellow-700">
                        {statusAdmissao === 'documentos-pendentes' && 'Ainda existem documentos pendentes. Complete a coleta de documentos antes de prosseguir.'}
                        {statusAdmissao === 'documentos-completos' && 'Todos os documentos foram coletados. Proceda com a assinatura do contrato.'}
                        {statusAdmissao === 'aguardando-assinatura' && 'Aguardando assinatura do contrato. Finalize o processo após a assinatura.'}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={statusAdmissao !== 'documentos-completos'}
                      >
                        Gerar Contrato de Trabalho
                      </Button>
                      
                      <Button 
                        className="w-full"
                        disabled={statusAdmissao !== 'aguardando-assinatura'}
                      >
                        Finalizar Admissão
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            {(statusAdmissao === 'documentos-completos' || statusAdmissao === 'aguardando-assinatura') && (
              <Button onClick={handleCadastrarColaborador}>
                <UserPlus className="h-4 w-4 mr-2" />
                Cadastrar Colaborador
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ColaboradorModal
        isOpen={colaboradorModalOpen}
        onClose={() => setColaboradorModalOpen(false)}
        editMode={false}
        colaboradorData={colaboradorData || undefined}
        onSave={handleSalvarColaborador}
      />
    </>
  );
};

export default AdmissaoDetailsModal;
