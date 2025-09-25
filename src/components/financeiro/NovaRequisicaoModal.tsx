// Modal para criação de nova requisição de pagamento - Sistema multi-step

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, ArrowRight, Upload, X, Check, AlertTriangle,
  Building, Users, FileText, DollarSign, Calendar
} from 'lucide-react';

import {
  TipoRequisicao,
  VinculacaoRequisicao,
  TipoDocumento,
  DOCUMENTOS_OBRIGATORIOS
} from '@/types/financeiro';

import {
  mockProjetos,
  mockDepartamentos,
  mockFornecedores,
  gerarProximoNumeroRequisicao
} from '@/data/contasPagarData';

interface NovaRequisicaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  tipo: TipoRequisicao | '';
  vinculacao: VinculacaoRequisicao | '';
  projeto?: string;
  departamento?: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  fornecedor?: string;
  observacoes: string;
  cotacoes: Cotacao[];
  justificativaCotacao: string;
  documentos: DocumentoUpload[];
}

interface Cotacao {
  id: string;
  fornecedor: string;
  valor: number;
  prazoEntrega: number;
  condicoesPagamento: string;
  observacoes: string;
}

interface DocumentoUpload {
  tipo: TipoDocumento;
  nome: string;
  arquivo?: File;
  obrigatorio: boolean;
  uploaded: boolean;
}

const ETAPAS = [
  { id: 1, titulo: 'Tipo e Vinculação', descricao: 'Selecione o tipo e vinculação obrigatória' },
  { id: 2, titulo: 'Dados da Requisição', descricao: 'Informações detalhadas da requisição' },
  { id: 3, titulo: 'Cotações (se aplicável)', descricao: 'Mínimo 3 cotações para suprimentos' },
  { id: 4, titulo: 'Documentos', descricao: 'Upload dos documentos obrigatórios' },
  { id: 5, titulo: 'Revisão', descricao: 'Confirme todas as informações' }
];

const NovaRequisicaoModal = ({ isOpen, onClose }: NovaRequisicaoModalProps) => {
  const { toast } = useToast();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tipo: '',
    vinculacao: '',
    descricao: '',
    valor: 0,
    dataVencimento: '',
    observacoes: '',
    cotacoes: [],
    justificativaCotacao: '',
    documentos: []
  });

  const resetForm = () => {
    setEtapaAtual(1);
    setFormData({
      tipo: '',
      vinculacao: '',
      descricao: '',
      valor: 0,
      dataVencimento: '',
      observacoes: '',
      cotacoes: [],
      justificativaCotacao: '',
      documentos: []
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const proximaEtapa = () => {
    if (validarEtapa()) {
      if (etapaAtual === 2 && formData.tipo !== TipoRequisicao.SUPRIMENTOS) {
        // Pular etapa de cotações se não for suprimentos
        setEtapaAtual(4);
      } else {
        setEtapaAtual(etapaAtual + 1);
      }
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual === 4 && formData.tipo !== TipoRequisicao.SUPRIMENTOS) {
      // Voltar direto para etapa 2 se não for suprimentos
      setEtapaAtual(2);
    } else {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const validarEtapa = (): boolean => {
    switch (etapaAtual) {
      case 1:
        if (!formData.tipo || !formData.vinculacao) {
          toast({
            title: "Campos obrigatórios",
            description: "Selecione o tipo de requisição e a vinculação.",
            variant: "destructive"
          });
          return false;
        }
        if (formData.vinculacao === VinculacaoRequisicao.PROJETO_CLIENTE && !formData.projeto) {
          toast({
            title: "Projeto obrigatório", 
            description: "Selecione o projeto para requisições vinculadas a cliente.",
            variant: "destructive"
          });
          return false;
        }
        if (formData.vinculacao === VinculacaoRequisicao.CENTRO_CUSTO_INTERNO && !formData.departamento) {
          toast({
            title: "Departamento obrigatório",
            description: "Selecione o departamento para requisições de centro de custo.",
            variant: "destructive"
          });
          return false;
        }
        return true;

      case 2:
        if (!formData.descricao || !formData.valor || !formData.dataVencimento) {
          toast({
            title: "Campos obrigatórios",
            description: "Preencha descrição, valor e data de vencimento.",
            variant: "destructive"
          });
          return false;
        }
        return true;

      case 3:
        if (formData.tipo === TipoRequisicao.SUPRIMENTOS) {
          if (formData.cotacoes.length < 3 && !formData.justificativaCotacao) {
            toast({
              title: "Cotações obrigatórias",
              description: "Para suprimentos é obrigatório 3 cotações OU justificativa.",
              variant: "destructive"
            });
            return false;
          }
        }
        return true;

      case 4:
        const documentosObrigatorios = DOCUMENTOS_OBRIGATORIOS[formData.tipo as TipoRequisicao] || [];
        const documentosUploadedObrigatorios = formData.documentos.filter(
          doc => doc.obrigatorio && doc.uploaded
        );
        
        if (documentosUploadedObrigatorios.length < documentosObrigatorios.length) {
          toast({
            title: "Documentos obrigatórios",
            description: "Faça upload de todos os documentos obrigatórios.",
            variant: "destructive"
          });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const adicionarCotacao = () => {
    if (formData.cotacoes.length < 3) {
      const novaCotacao: Cotacao = {
        id: `COT-${Date.now()}`,
        fornecedor: '',
        valor: 0,
        prazoEntrega: 0,
        condicoesPagamento: '',
        observacoes: ''
      };
      setFormData(prev => ({
        ...prev,
        cotacoes: [...prev.cotacoes, novaCotacao]
      }));
    }
  };

  const removerCotacao = (id: string) => {
    setFormData(prev => ({
      ...prev,
      cotacoes: prev.cotacoes.filter(cot => cot.id !== id)
    }));
  };

  const atualizarCotacao = (id: string, campo: string, valor: any) => {
    setFormData(prev => ({
      ...prev,
      cotacoes: prev.cotacoes.map(cot => 
        cot.id === id ? { ...cot, [campo]: valor } : cot
      )
    }));
  };

  const inicializarDocumentos = () => {
    if (formData.tipo && formData.documentos.length === 0) {
      const documentosObrigatorios = DOCUMENTOS_OBRIGATORIOS[formData.tipo as TipoRequisicao] || [];
      const novosDocumentos: DocumentoUpload[] = documentosObrigatorios.map(tipo => ({
        tipo,
        nome: '',
        obrigatorio: true,
        uploaded: false
      }));
      
      setFormData(prev => ({
        ...prev,
        documentos: novosDocumentos
      }));
    }
  };

  const handleFileUpload = (tipo: TipoDocumento, file: File) => {
    setFormData(prev => ({
      ...prev,
      documentos: prev.documentos.map(doc => 
        doc.tipo === tipo 
          ? { ...doc, arquivo: file, nome: file.name, uploaded: true }
          : doc
      )
    }));
  };

  const submeterRequisicao = () => {
    if (!validarEtapa()) return;

    // Simular envio da requisição
    const novaRequisicao = {
      ...formData,
      numeroRequisicao: gerarProximoNumeroRequisicao(),
      dataCreacao: new Date(),
      id: `REQ-${Date.now()}`
    };

    console.log('Nova requisição:', novaRequisicao);
    
    toast({
      title: "Requisição criada!",
      description: `Requisição ${novaRequisicao.numeroRequisicao} criada com sucesso.`,
    });

    handleClose();
  };

  // Renderização das etapas
  const renderEtapa1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipo de Requisição *</Label>
          <Select 
            value={formData.tipo} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value as TipoRequisicao }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TipoRequisicao).map(tipo => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Vinculação *</Label>
          <Select 
            value={formData.vinculacao} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, vinculacao: value as VinculacaoRequisicao }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a vinculação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={VinculacaoRequisicao.PROJETO_CLIENTE}>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Projeto/Cliente
                </div>
              </SelectItem>
              <SelectItem value={VinculacaoRequisicao.CENTRO_CUSTO_INTERNO}>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Centro de Custo Interno
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.vinculacao === VinculacaoRequisicao.PROJETO_CLIENTE && (
        <div className="space-y-2">
          <Label>Projeto/Cliente *</Label>
          <Select 
            value={formData.projeto} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, projeto: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o projeto" />
            </SelectTrigger>
            <SelectContent>
              {mockProjetos.map(projeto => (
                <SelectItem key={projeto.id} value={projeto.id}>
                  <div>
                    <div className="font-medium">{projeto.nome}</div>
                    <div className="text-sm text-muted-foreground">{projeto.cliente.nome}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {formData.vinculacao === VinculacaoRequisicao.CENTRO_CUSTO_INTERNO && (
        <div className="space-y-2">
          <Label>Departamento *</Label>
          <Select 
            value={formData.departamento} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, departamento: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o departamento" />
            </SelectTrigger>
            <SelectContent>
              {mockDepartamentos.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {formData.tipo && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Requisitos Especiais</h4>
                <div className="text-sm text-blue-700 mt-1">
                  {formData.tipo === TipoRequisicao.SUPRIMENTOS && 
                    "Para suprimentos é obrigatório apresentar 3 cotações ou justificativa."}
                  {[TipoRequisicao.PASSAGEM, TipoRequisicao.HOSPEDAGEM].includes(formData.tipo as TipoRequisicao) && 
                    "Passagens e hospedagem devem ser obrigatoriamente vinculadas a projetos."}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderEtapa2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Descrição da Requisição *</Label>
        <Textarea
          placeholder="Descreva detalhadamente o que está sendo solicitado..."
          value={formData.descricao}
          onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          className="min-h-20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Valor (R$) *</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={formData.valor || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, valor: parseFloat(e.target.value) || 0 }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Data de Vencimento *</Label>
          <Input
            type="date"
            value={formData.dataVencimento}
            onChange={(e) => setFormData(prev => ({ ...prev, dataVencimento: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Fornecedor (se conhecido)</Label>
        <Select 
          value={formData.fornecedor} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, fornecedor: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o fornecedor" />
          </SelectTrigger>
          <SelectContent>
            {mockFornecedores.map(fornecedor => (
              <SelectItem key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea
          placeholder="Informações adicionais, urgência, condições especiais..."
          value={formData.observacoes}
          onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderEtapa3 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Cotações</h3>
          <p className="text-sm text-muted-foreground">
            Mínimo 3 cotações obrigatórias para suprimentos
          </p>
        </div>
        {formData.cotacoes.length < 3 && (
          <Button onClick={adicionarCotacao} variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Adicionar Cotação
          </Button>
        )}
      </div>

      {formData.cotacoes.map((cotacao, index) => (
        <Card key={cotacao.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Cotação {index + 1}</CardTitle>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => removerCotacao(cotacao.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fornecedor</Label>
                <Input
                  placeholder="Nome do fornecedor"
                  value={cotacao.fornecedor}
                  onChange={(e) => atualizarCotacao(cotacao.id, 'fornecedor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={cotacao.valor || ''}
                  onChange={(e) => atualizarCotacao(cotacao.id, 'valor', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prazo de Entrega (dias)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={cotacao.prazoEntrega || ''}
                  onChange={(e) => atualizarCotacao(cotacao.id, 'prazoEntrega', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Condições de Pagamento</Label>
                <Input
                  placeholder="ex: 30 dias"
                  value={cotacao.condicoesPagamento}
                  onChange={(e) => atualizarCotacao(cotacao.id, 'condicoesPagamento', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                placeholder="Informações adicionais da cotação..."
                value={cotacao.observacoes}
                onChange={(e) => atualizarCotacao(cotacao.id, 'observacoes', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {formData.cotacoes.length < 3 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">Justificativa para Menos de 3 Cotações</h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Se não for possível obter 3 cotações, forneça uma justificativa:
                </p>
                <Textarea
                  placeholder="Explique por que não foi possível obter 3 cotações..."
                  value={formData.justificativaCotacao}
                  onChange={(e) => setFormData(prev => ({ ...prev, justificativaCotacao: e.target.value }))}
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderEtapa4 = () => {
    // Inicializar documentos na primeira renderização da etapa
    if (formData.documentos.length === 0) {
      inicializarDocumentos();
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Documentos Obrigatórios</h3>
          <p className="text-sm text-muted-foreground">
            Faça upload de todos os documentos necessários
          </p>
        </div>

        <div className="space-y-4">
          {formData.documentos.map((documento) => (
            <Card key={documento.tipo}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {documento.tipo.replace('_', ' ').toUpperCase()}
                        {documento.obrigatorio && <span className="text-red-500 ml-1">*</span>}
                      </div>
                      {documento.nome && (
                        <div className="text-sm text-muted-foreground">{documento.nome}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {documento.uploaded ? (
                      <Badge className="bg-green-500">
                        <Check className="h-3 w-3 mr-1" />
                        Enviado
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pendente</Badge>
                    )}
                    
                    <input
                      type="file"
                      id={`file-${documento.tipo}`}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(documento.tipo, file);
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => document.getElementById(`file-${documento.tipo}`)?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {documento.uploaded ? 'Substituir' : 'Upload'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Formatos Aceitos</h4>
                <p className="text-sm text-blue-700">
                  PDF, DOC, DOCX, JPG, JPEG, PNG - Tamanho máximo: 10MB por arquivo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderEtapa5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Revisão da Requisição</h3>
        <p className="text-sm text-muted-foreground">
          Confirme todas as informações antes de submeter
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Tipo:</span> {formData.tipo?.replace('_', ' ').toUpperCase()}
              </div>
              <div>
                <span className="font-medium">Valor:</span> R$ {formData.valor?.toFixed(2)}
              </div>
              <div>
                <span className="font-medium">Vencimento:</span> {formData.dataVencimento}
              </div>
              <div>
                <span className="font-medium">Vinculação:</span> {
                  formData.vinculacao === VinculacaoRequisicao.PROJETO_CLIENTE ? 'Projeto/Cliente' : 'Centro de Custo'
                }
              </div>
            </div>
            <div className="pt-2">
              <span className="font-medium">Descrição:</span>
              <p className="text-sm text-muted-foreground mt-1">{formData.descricao}</p>
            </div>
          </CardContent>
        </Card>

        {formData.tipo === TipoRequisicao.SUPRIMENTOS && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cotações</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.cotacoes.length > 0 ? (
                <div className="space-y-2">
                  {formData.cotacoes.map((cotacao, index) => (
                    <div key={cotacao.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{cotacao.fornecedor}</span>
                      <span className="font-medium">R$ {cotacao.valor?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Justificativa: {formData.justificativaCotacao}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {formData.documentos.map((doc) => (
                <div key={doc.tipo} className="flex justify-between items-center">
                  <span className="text-sm">{doc.tipo.replace('_', ' ').toUpperCase()}</span>
                  <Badge className={doc.uploaded ? 'bg-green-500' : 'bg-red-500'}>
                    {doc.uploaded ? 'Enviado' : 'Pendente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Nova Requisição de Pagamento
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {ETAPAS.map((etapa, index) => (
              <div key={etapa.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${etapaAtual >= etapa.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {etapaAtual > etapa.id ? <Check className="h-4 w-4" /> : etapa.id}
                </div>
                {index < ETAPAS.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2
                    ${etapaAtual > etapa.id ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(etapaAtual / ETAPAS.length) * 100} className="mb-2" />
          <div className="text-center">
            <h3 className="font-medium">{ETAPAS[etapaAtual - 1]?.titulo}</h3>
            <p className="text-sm text-muted-foreground">{ETAPAS[etapaAtual - 1]?.descricao}</p>
          </div>
        </div>

        {/* Conteúdo da Etapa */}
        <div className="min-h-96">
          {etapaAtual === 1 && renderEtapa1()}
          {etapaAtual === 2 && renderEtapa2()}
          {etapaAtual === 3 && renderEtapa3()}
          {etapaAtual === 4 && renderEtapa4()}  
          {etapaAtual === 5 && renderEtapa5()}
        </div>

        {/* Botões de Navegação */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={etapaAtual === 1 ? handleClose : etapaAnterior}
          >
            {etapaAtual === 1 ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </>
            )}
          </Button>

          <Button
            onClick={etapaAtual === 5 ? submeterRequisicao : proximaEtapa}
            className="bg-biodina-gold hover:bg-biodina-gold/90"
          >
            {etapaAtual === 5 ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Submeter Requisição
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaRequisicaoModal;