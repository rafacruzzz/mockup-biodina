import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Building, User, Phone, Mail, FileText, DollarSign, Clock, 
         AlertTriangle, CheckCircle, XCircle, Target, Briefcase, TrendingUp, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LicitacaoValidationModal from "./LicitacaoValidationModal";
import ConcorrenteModal from "./ConcorrenteModal";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('geral');
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [editingConcorrente, setEditingConcorrente] = useState<any>(null);

  const [formData, setFormData] = useState({
    // Informações Gerais
    numeroOportunidade: oportunidade?.codigo || '',
    clienteRazaoSocial: oportunidade?.cliente || '',
    clienteCnpj: '',
    responsavelContato: oportunidade?.responsavel || '',
    telefoneContato: oportunidade?.contato || '',
    emailContato: '',
    enderecoCompleto: '',
    observacoesCliente: '',
    
    // Dados da Licitação
    numeroPregao: '',
    objetoLicitacao: '',
    dataAberturaProposta: '',
    dataLimiteEntrega: '',
    valorEstimado: oportunidade?.valor || 0,
    modalidadeLicitacao: 'pregao_eletronico',
    orgaoLicitante: '',
    linkEdital: '',
    situacaoAtual: 'elaboracao_proposta',
    
    // Resultado e Status
    resultadoOportunidade: oportunidade?.resultadoOportunidade || 'em_andamento',
    
    // Estratégia Comercial
    estrategiaComercial: 'competitiva',
    margemLucro: 15,
    prazoEntregaProposto: 30,
    condicoesPagamento: '30_dias',
    garantiaOfertada: '12_meses',
    certificacaoNecessaria: false,
    validadeProposta: 60,
    
    // Análise de Concorrência
    concorrentes: [] as any[],
    vantagemCompetitiva: '',
    riscosConcorrencia: '',
    
    // Produtos/Serviços
    produtosServicos: [] as any[],
    especificacoesTecnicas: '',
    documentacaoTecnica: '',
    
    // Estratégia de Preço
    custoProduto: 0,
    custoOperacional: 0,
    custoLogistica: 0,
    margem: 0,
    precoFinal: 0,
    justificativaPreco: '',
    
    // Dados Adicionais
    fonteLead: oportunidade?.fonteLead || '',
    segmento: oportunidade?.segmento || '',
    probabilidadeGanho: 50,
    proximaAcao: '',
    dataProximaAcao: '',
    
    // Motivos Fracasso (aparecem quando resultadoOportunidade é 'perda')
    motivosPerdaLicitacao: [] as string[],
    outroMotivoPerda: '',
    
    // Observações
    observacoesGerais: oportunidade?.descricao || '',
    historicoContatos: [] as any[],
    
    // Campos calculados
    valorTotalProposta: 0,
    prazoTotalExecucao: 0
  });

  useEffect(() => {
    // Calcular preco final sempre que custos ou margem mudarem
    calcularPrecoFinal();
  }, [formData.custoProduto, formData.custoOperacional, formData.custoLogistica, formData.margem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações específicas para licitação
    if (!formData.numeroPregao || !formData.objetoLicitacao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o número do pregão e objeto da licitação",
        variant: "destructive"
      });
      return;
    }

    setShowValidationModal(true);
  };

  const handleValidationConfirm = () => {
    setShowValidationModal(false);
    
    const dadosCompletos = {
      ...formData,
      tipo: 'licitacao',
      modalidade: 'licitacao'
    };
    
    onSave(dadosCompletos);
    
    toast({
      title: "Sucesso",
      description: "Oportunidade de licitação salva com sucesso!",
      variant: "default"
    });
  };

  const adicionarConcorrente = () => {
    setEditingConcorrente(null);
    setShowConcorrenteModal(true);
  };

  const editarConcorrente = (concorrente: any, index: number) => {
    setEditingConcorrente({ ...concorrente, index });
    setShowConcorrenteModal(true);
  };

  const salvarConcorrente = (concorrenteData: any) => {
    if (editingConcorrente && editingConcorrente.index !== undefined) {
      // Editando concorrente existente
      const novosConcorrentes = [...formData.concorrentes];
      novosConcorrentes[editingConcorrente.index] = concorrenteData;
      setFormData(prev => ({ ...prev, concorrentes: novosConcorrentes }));
    } else {
      // Adicionando novo concorrente
      setFormData(prev => ({
        ...prev,
        concorrentes: [...prev.concorrentes, concorrenteData]
      }));
    }
    setShowConcorrenteModal(false);
    setEditingConcorrente(null);
  };

  const removerConcorrente = (index: number) => {
    const novosConcorrentes = formData.concorrentes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, concorrentes: novosConcorrentes }));
  };

  const calcularPrecoFinal = () => {
    const { custoProduto, custoOperacional, custoLogistica, margem } = formData;
    const custoTotal = custoProduto + custoOperacional + custoLogistica;
    const precoFinal = custoTotal * (1 + margem / 100);
    
    setFormData(prev => ({
      ...prev,
      precoFinal,
      valorTotalProposta: precoFinal
    }));
  };

  const motivosDisponiveis = [
    'Preço não competitivo',
    'Documentação incompleta',
    'Não atendimento às especificações técnicas',
    'Prazo de entrega inadequado',
    'Falta de certificação necessária',
    'Problemas na habilitação jurídica',
    'Concorrência muito forte',
    'Mudança nos requisitos do edital',
    'Cancelamento da licitação',
    'Outros'
  ];

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-biodina-blue" />
              {oportunidade ? 'Editar Oportunidade - Licitação' : 'Nova Oportunidade - Licitação'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="geral" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Geral
                </TabsTrigger>
                <TabsTrigger value="licitacao" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Licitação
                </TabsTrigger>
                <TabsTrigger value="estrategia" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Estratégia
                </TabsTrigger>
                <TabsTrigger value="concorrencia" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Concorrência
                </TabsTrigger>
                <TabsTrigger value="produtos" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Financeiro
                </TabsTrigger>
              </TabsList>

              {/* Aba Geral */}
              <TabsContent value="geral" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Informações do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numeroOportunidade">Número da Oportunidade</Label>
                        <Input
                          id="numeroOportunidade"
                          value={formData.numeroOportunidade}
                          onChange={(e) => setFormData(prev => ({ ...prev, numeroOportunidade: e.target.value }))}
                          placeholder="Ex: OPP-2024-001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="clienteRazaoSocial">Razão Social do Cliente *</Label>
                        <Input
                          id="clienteRazaoSocial"
                          value={formData.clienteRazaoSocial}
                          onChange={(e) => setFormData(prev => ({ ...prev, clienteRazaoSocial: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="clienteCnpj">CNPJ</Label>
                        <Input
                          id="clienteCnpj"
                          value={formData.clienteCnpj}
                          onChange={(e) => setFormData(prev => ({ ...prev, clienteCnpj: e.target.value }))}
                          placeholder="00.000.000/0000-00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="segmento">Segmento</Label>
                        <Select value={formData.segmento} onValueChange={(value) => setFormData(prev => ({ ...prev, segmento: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o segmento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospitalar">Hospitalar</SelectItem>
                            <SelectItem value="laboratorial">Laboratorial</SelectItem>
                            <SelectItem value="universitario">Universitário</SelectItem>
                            <SelectItem value="governamental">Governamental</SelectItem>
                            <SelectItem value="privado">Privado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="responsavelContato">Responsável pelo Contato</Label>
                        <Input
                          id="responsavelContato"
                          value={formData.responsavelContato}
                          onChange={(e) => setFormData(prev => ({ ...prev, responsavelContato: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefoneContato">Telefone de Contato</Label>
                        <Input
                          id="telefoneContato"
                          value={formData.telefoneContato}
                          onChange={(e) => setFormData(prev => ({ ...prev, telefoneContato: e.target.value }))}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emailContato">E-mail de Contato</Label>
                        <Input
                          id="emailContato"
                          type="email"
                          value={formData.emailContato}
                          onChange={(e) => setFormData(prev => ({ ...prev, emailContato: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fonteLead">Fonte do Lead</Label>
                        <Select value={formData.fonteLead} onValueChange={(value) => setFormData(prev => ({ ...prev, fonteLead: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Como chegou até nós?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="site">Site</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="cold_call">Cold Call</SelectItem>
                            <SelectItem value="licitacao">Licitação</SelectItem>
                            <SelectItem value="referencia">Referência</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="enderecoCompleto">Endereço Completo</Label>
                      <Textarea
                        id="enderecoCompleto"
                        value={formData.enderecoCompleto}
                        onChange={(e) => setFormData(prev => ({ ...prev, enderecoCompleto: e.target.value }))}
                        placeholder="Endereço completo com CEP"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="observacoesCliente">Observações sobre o Cliente</Label>
                      <Textarea
                        id="observacoesCliente"
                        value={formData.observacoesCliente}
                        onChange={(e) => setFormData(prev => ({ ...prev, observacoesCliente: e.target.value }))}
                        placeholder="Informações relevantes sobre o cliente..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Status da Oportunidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="resultadoOportunidade">Resultado da Oportunidade *</Label>
                        <Select 
                          value={formData.resultadoOportunidade} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, resultadoOportunidade: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o resultado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="em_andamento">Em Andamento</SelectItem>
                            <SelectItem value="ganho">Ganho</SelectItem>
                            <SelectItem value="perda">Perda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="probabilidadeGanho">Probabilidade de Ganho (%)</Label>
                        <Input
                          id="probabilidadeGanho"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.probabilidadeGanho}
                          onChange={(e) => setFormData(prev => ({ ...prev, probabilidadeGanho: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    {/* Motivos do Fracasso - aparece quando Resultado da Oportunidade é 'perda' */}
                    {formData.resultadoOportunidade === 'perda' && (
                      <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-700 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Motivos da Perda do Pregão
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {motivosDisponiveis.map((motivo) => (
                            <div key={motivo} className="flex items-center space-x-2">
                              <Checkbox
                                id={motivo}
                                checked={formData.motivosPerdaLicitacao.includes(motivo)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData(prev => ({
                                      ...prev,
                                      motivosPerdaLicitacao: [...prev.motivosPerdaLicitacao, motivo]
                                    }));
                                  } else {
                                    setFormData(prev => ({
                                      ...prev,
                                      motivosPerdaLicitacao: prev.motivosPerdaLicitacao.filter(m => m !== motivo)
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={motivo} className="text-sm">{motivo}</Label>
                            </div>
                          ))}
                        </div>
                        
                        {formData.motivosPerdaLicitacao.includes('Outros') && (
                          <div>
                            <Label htmlFor="outroMotivoPerda">Especificar outro motivo</Label>
                            <Textarea
                              id="outroMotivoPerda"
                              value={formData.outroMotivoPerda}
                              onChange={(e) => setFormData(prev => ({ ...prev, outroMotivoPerda: e.target.value }))}
                              placeholder="Descreva o motivo específico..."
                              rows={2}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="proximaAcao">Próxima Ação</Label>
                        <Input
                          id="proximaAcao"
                          value={formData.proximaAcao}
                          onChange={(e) => setFormData(prev => ({ ...prev, proximaAcao: e.target.value }))}
                          placeholder="Ex: Agendar reunião, enviar proposta..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataProximaAcao">Data da Próxima Ação</Label>
                        <Input
                          id="dataProximaAcao"
                          type="date"
                          value={formData.dataProximaAcao}
                          onChange={(e) => setFormData(prev => ({ ...prev, dataProximaAcao: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Licitação */}
              <TabsContent value="licitacao" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Dados da Licitação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numeroPregao">Número do Pregão *</Label>
                        <Input
                          id="numeroPregao"
                          value={formData.numeroPregao}
                          onChange={(e) => setFormData(prev => ({ ...prev, numeroPregao: e.target.value }))}
                          placeholder="Ex: 001/2024"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="modalidadeLicitacao">Modalidade da Licitação</Label>
                        <Select 
                          value={formData.modalidadeLicitacao} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, modalidadeLicitacao: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pregao_eletronico">Pregão Eletrônico</SelectItem>
                            <SelectItem value="pregao_presencial">Pregão Presencial</SelectItem>
                            <SelectItem value="concorrencia">Concorrência</SelectItem>
                            <SelectItem value="tomada_precos">Tomada de Preços</SelectItem>
                            <SelectItem value="convite">Convite</SelectItem>
                            <SelectItem value="leilao">Leilão</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
                      <Textarea
                        id="objetoLicitacao"
                        value={formData.objetoLicitacao}
                        onChange={(e) => setFormData(prev => ({ ...prev, objetoLicitacao: e.target.value }))}
                        placeholder="Descreva detalhadamente o objeto da licitação..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="orgaoLicitante">Órgão Licitante</Label>
                        <Input
                          id="orgaoLicitante"
                          value={formData.orgaoLicitante}
                          onChange={(e) => setFormData(prev => ({ ...prev, orgaoLicitante: e.target.value }))}
                          placeholder="Nome do órgão responsável"
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
                        <Input
                          id="valorEstimado"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.valorEstimado}
                          onChange={(e) => setFormData(prev => ({ ...prev, valorEstimado: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dataAberturaProposta">Data de Abertura das Propostas</Label>
                        <Input
                          id="dataAberturaProposta"
                          type="datetime-local"
                          value={formData.dataAberturaProposta}
                          onChange={(e) => setFormData(prev => ({ ...prev, dataAberturaProposta: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataLimiteEntrega">Data Limite para Entrega</Label>
                        <Input
                          id="dataLimiteEntrega"
                          type="date"
                          value={formData.dataLimiteEntrega}
                          onChange={(e) => setFormData(prev => ({ ...prev, dataLimiteEntrega: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="linkEdital">Link do Edital</Label>
                        <Input
                          id="linkEdital"
                          type="url"
                          value={formData.linkEdital}
                          onChange={(e) => setFormData(prev => ({ ...prev, linkEdital: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="situacaoAtual">Situação Atual</Label>
                        <Select 
                          value={formData.situacaoAtual} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, situacaoAtual: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="elaboracao_proposta">Elaboração da Proposta</SelectItem>
                            <SelectItem value="proposta_enviada">Proposta Enviada</SelectItem>
                            <SelectItem value="abertura_propostas">Abertura das Propostas</SelectItem>
                            <SelectItem value="habilitacao">Fase de Habilitação</SelectItem>
                            <SelectItem value="recurso">Fase de Recurso</SelectItem>
                            <SelectItem value="homologacao">Homologação</SelectItem>
                            <SelectItem value="adjudicacao">Adjudicação</SelectItem>
                            <SelectItem value="assinatura_contrato">Assinatura do Contrato</SelectItem>
                            <SelectItem value="finalizado">Finalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Estratégia */}
              <TabsContent value="estrategia" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Estratégia Comercial
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="estrategiaComercial">Estratégia Comercial</Label>
                        <Select 
                          value={formData.estrategiaComercial} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, estrategiaComercial: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="competitiva">Competitiva</SelectItem>
                            <SelectItem value="diferenciada">Diferenciada</SelectItem>
                            <SelectItem value="parceria">Parceria</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="margemLucro">Margem de Lucro (%)</Label>
                        <Input
                          id="margemLucro"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.margemLucro}
                          onChange={(e) => setFormData(prev => ({ ...prev, margemLucro: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="prazoEntregaProposto">Prazo de Entrega Proposto (dias)</Label>
                        <Input
                          id="prazoEntregaProposto"
                          type="number"
                          min="0"
                          value={formData.prazoEntregaProposto}
                          onChange={(e) => setFormData(prev => ({ ...prev, prazoEntregaProposto: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                        <Select 
                          value={formData.condicoesPagamento} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, condicoesPagamento: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30_dias">30 dias</SelectItem>
                            <SelectItem value="60_dias">60 dias</SelectItem>
                            <SelectItem value="90_dias">90 dias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="garantiaOfertada">Garantia Ofertada</Label>
                        <Select 
                          value={formData.garantiaOfertada} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, garantiaOfertada: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12_meses">12 meses</SelectItem>
                            <SelectItem value="24_meses">24 meses</SelectItem>
                            <SelectItem value="36_meses">36 meses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                          id="certificacaoNecessaria"
                          checked={formData.certificacaoNecessaria}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, certificacaoNecessaria: !!checked }))}
                        />
                        <Label htmlFor="certificacaoNecessaria">Certificação Necessária</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="validadeProposta">Validade da Proposta (dias)</Label>
                      <Input
                        id="validadeProposta"
                        type="number"
                        min="0"
                        value={formData.validadeProposta}
                        onChange={(e) => setFormData(prev => ({ ...prev, validadeProposta: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Concorrência */}
              <TabsContent value="concorrencia" className="space-y-6">
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Análise de Concorrência
                    </CardTitle>
                    <Button size="sm" onClick={adicionarConcorrente}>Adicionar Concorrente</Button>
                  </CardHeader>
                  <CardContent>
                    {formData.concorrentes.length === 0 && (
                      <p className="text-gray-500">Nenhum concorrente adicionado.</p>
                    )}
                    {formData.concorrentes.length > 0 && (
                      <div className="space-y-2">
                        {formData.concorrentes.map((concorrente, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                            <div>
                              <p className="font-medium">{concorrente.nome}</p>
                              <p className="text-sm text-gray-600">{concorrente.observacoes}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => editarConcorrente(concorrente, index)}>Editar</Button>
                              <Button size="sm" variant="destructive" onClick={() => removerConcorrente(index)}>Remover</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Produtos */}
              <TabsContent value="produtos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Produtos/Serviços
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="produtosServicos">Produtos e Serviços</Label>
                      <Textarea
                        id="produtosServicos"
                        value={formData.produtosServicos.join(", ")}
                        onChange={(e) => setFormData(prev => ({ ...prev, produtosServicos: e.target.value.split(",").map(s => s.trim()) }))}
                        placeholder="Liste os produtos e serviços separados por vírgula"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="especificacoesTecnicas">Especificações Técnicas</Label>
                      <Textarea
                        id="especificacoesTecnicas"
                        value={formData.especificacoesTecnicas}
                        onChange={(e) => setFormData(prev => ({ ...prev, especificacoesTecnicas: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentacaoTecnica">Documentação Técnica</Label>
                      <Textarea
                        id="documentacaoTecnica"
                        value={formData.documentacaoTecnica}
                        onChange={(e) => setFormData(prev => ({ ...prev, documentacaoTecnica: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Financeiro */}
              <TabsContent value="financeiro" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Estratégia de Preço
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="custoProduto">Custo do Produto (R$)</Label>
                        <Input
                          id="custoProduto"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.custoProduto}
                          onChange={(e) => setFormData(prev => ({ ...prev, custoProduto: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="custoOperacional">Custo Operacional (R$)</Label>
                        <Input
                          id="custoOperacional"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.custoOperacional}
                          onChange={(e) => setFormData(prev => ({ ...prev, custoOperacional: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="custoLogistica">Custo Logística (R$)</Label>
                        <Input
                          id="custoLogistica"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.custoLogistica}
                          onChange={(e) => setFormData(prev => ({ ...prev, custoLogistica: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="margem">Margem (%)</Label>
                        <Input
                          id="margem"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.margem}
                          onChange={(e) => setFormData(prev => ({ ...prev, margem: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="precoFinal">Preço Final (R$)</Label>
                      <Input
                        id="precoFinal"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.precoFinal}
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="justificativaPreco">Justificativa do Preço</Label>
                      <Textarea
                        id="justificativaPreco"
                        value={formData.justificativaPreco}
                        onChange={(e) => setFormData(prev => ({ ...prev, justificativaPreco: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>

            <Separator />

            <div>
              <Label htmlFor="observacoesGerais">Observações Gerais</Label>
              <Textarea
                id="observacoesGerais"
                value={formData.observacoesGerais}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoesGerais: e.target.value }))}
                placeholder="Informações adicionais sobre a oportunidade..."
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-blue hover:bg-biodina-blue/90">
                Salvar Oportunidade
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <LicitacaoValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onConfirm={handleValidationConfirm}
        dadosLicitacao={formData}
      />

      <ConcorrenteModal
        isOpen={showConcorrenteModal}
        onClose={() => {
          setShowConcorrenteModal(false);
          setEditingConcorrente(null);
        }}
        onSave={salvarConcorrente}
        concorrente={editingConcorrente}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
