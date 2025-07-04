import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, FileText, Users, DollarSign, Clock, AlertTriangle, CheckCircle, X, Save, Plus, Trash2, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import TabelaLicitantes from '../licitacao/TabelaLicitantes';
import { Licitante, ProdutoLicitacao } from '@/types/licitacao';
import ConcorrenteModal from './ConcorrenteModal';

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onSave: (data: any) => void;
  onClose: () => void;
  readOnly?: boolean;
}

const OportunidadeAvancadaForm = ({ oportunidade, onSave, onClose, readOnly = false }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  
  const [formData, setFormData] = useState({
    // Dados Básicos
    nomeOportunidade: oportunidade?.nomeOportunidade || '',
    cliente: oportunidade?.cliente || '',
    // nomeFantasia: oportunidade?.nomeFantasia || '', // Campo potencialmente não utilizado - comentado para otimização
    descricao: oportunidade?.descricao || '',
    valor: oportunidade?.valor || 0,
    dataLimite: oportunidade?.dataLimite || '',
    status: oportunidade?.status || 'Em Análise',
    prioridade: oportunidade?.prioridade || 'Média',
    probabilidade: oportunidade?.probabilidade || 50,
    
    // Dados de Contato
    contato: oportunidade?.contato || '',
    telefone: oportunidade?.telefone || '',
    email: oportunidade?.email || '',
    endereco: oportunidade?.endereco || '',
    
    // Informações Comerciais
    origem: oportunidade?.origem || '',
    // colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || [], // Array vazio sem interface - comentado para otimização
    tags: oportunidade?.tags || '',
    observacoes: oportunidade?.observacoes || '',
    
    // Específicos para Licitação
    tipoLicitacao: oportunidade?.tipoLicitacao || '',
    numeroEdital: oportunidade?.numeroEdital || '',
    orgaoLicitante: oportunidade?.orgaoLicitante || '',
    modalidadeLicitacao: oportunidade?.modalidadeLicitacao || '',
    criterioJulgamento: oportunidade?.criterioJulgamento || '',
    situacaoPregao: oportunidade?.situacaoPregao || '',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataEntrega: oportunidade?.dataEntrega || '',
    localEntrega: oportunidade?.localEntrega || '',
    garantiaExigida: oportunidade?.garantiaExigida || '',
    valorEstimado: oportunidade?.valorEstimado || 0,
    resumoEdital: oportunidade?.resumoEdital || '',
    // NOVO CAMPO: Análise Técnica para Licitação (diferente do campo na aba Análise Técnica-Científica)
    analiseTecnicaLicitacao: oportunidade?.analiseTecnicaLicitacao || '',
    impugnacaoEdital: oportunidade?.impugnacaoEdital || '',
    recursoAdministrativo: oportunidade?.recursoAdministrativo || '',
    
    // Análise Técnica-Científica (campo existente mantido)
    analiseTecnica: oportunidade?.analiseTecnica || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    especificacoesTecnicas: oportunidade?.especificacoesTecnicas || '',
    normalizacao: oportunidade?.normalizacao || '',
    
    // Proposta Comercial
    proposta: oportunidade?.proposta || '',
    condicoesPagamento: oportunidade?.condicoesPagamento || '',
    prazoEntrega: oportunidade?.prazoEntrega || '',
    validadeProposta: oportunidade?.validadeProposta || '',
    
    // Negociação
    historicoNegociacao: oportunidade?.historicoNegociacao || '',
    proximosPassos: oportunidade?.proximosPassos || '',
    
    // Gestão e Controle
    responsavel: oportunidade?.responsavel || '',
    equipe: oportunidade?.equipe || '',
    // fluxoTrabalho: oportunidade?.fluxoTrabalho || '', // Mencionado como controlado por RH/Gestor mas editável - manter por ora
    
    // Documentos e Anexos
    documentos: oportunidade?.documentos || [],
    anexos: oportunidade?.anexos || [],
    
    // Concorrentes
    concorrentes: oportunidade?.concorrentes || [],
    
    // Produtos/Licitantes para Licitação
    licitantes: oportunidade?.licitantes || [
      {
        empresa: '',
        produto: '',
        valor: 0,
        status: 'pendente' as const,
        dataSubmissao: '',
        observacoes: ''
      }
    ] as Licitante[]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nomeOportunidade.trim()) {
      toast.error('Nome da oportunidade é obrigatório');
      return;
    }
    
    if (!formData.cliente.trim()) {
      toast.error('Cliente é obrigatório');
      return;
    }

    onSave(formData);
    toast.success('Oportunidade salva com sucesso!');
  };

  const isTriagemComplete = () => {
    return formData.nomeOportunidade && 
           formData.cliente && 
           formData.valor > 0;
  };

  const handleAddConcorrente = (concorrente: any) => {
    setFormData(prev => ({
      ...prev,
      concorrentes: [...prev.concorrentes, { ...concorrente, id: Date.now() }]
    }));
    toast.success('Concorrente adicionado com sucesso!');
  };

  const handleRemoveConcorrente = (index: number) => {
    setFormData(prev => ({
      ...prev,
      concorrentes: prev.concorrentes.filter((_, i) => i !== index)
    }));
    toast.success('Concorrente removido com sucesso!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b sticky top-0 bg-white z-10">
          <CardTitle className="text-xl font-bold text-purple-600">
            {oportunidade ? 'Editar' : 'Nova'} Oportunidade Comercial
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="licitacao">Licitação</TabsTrigger>
              <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
              <TabsTrigger value="proposta">Proposta</TabsTrigger>
              <TabsTrigger value="negociacao">Negociação</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-6 mt-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeOportunidade">Nome da Oportunidade *</Label>
                  <Input
                    id="nomeOportunidade"
                    value={formData.nomeOportunidade}
                    onChange={(e) => handleInputChange('nomeOportunidade', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => handleInputChange('cliente', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="valor">Valor Estimado (R$)</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={formData.valor}
                    onChange={(e) => handleInputChange('valor', Number(e.target.value))}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dataLimite">Data Limite</Label>
                  <Input
                    id="dataLimite"
                    type="date"
                    value={formData.dataLimite}
                    onChange={(e) => handleInputChange('dataLimite', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)} disabled={readOnly}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Em Análise">Em Análise</SelectItem>
                      <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                      <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                      <SelectItem value="Ganha">Ganha</SelectItem>
                      <SelectItem value="Perdida">Perdida</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select value={formData.prioridade} onValueChange={(value) => handleInputChange('prioridade', value)} disabled={readOnly}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Crítica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="probabilidade">Probabilidade (%)</Label>
                  <Input
                    id="probabilidade"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.probabilidade}
                    onChange={(e) => handleInputChange('probabilidade', Number(e.target.value))}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Dados de Contato */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Dados de Contato</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contato">Pessoa de Contato</Label>
                    <Input
                      id="contato"
                      value={formData.contato}
                      onChange={(e) => handleInputChange('contato', e.target.value)}
                      disabled={readOnly}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      disabled={readOnly}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={readOnly}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      disabled={readOnly}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Informações Adicionais</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="origem">Origem</Label>
                    <Select value={formData.origem} onValueChange={(value) => handleInputChange('origem', value)} disabled={readOnly}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indicação">Indicação</SelectItem>
                        <SelectItem value="Site">Site</SelectItem>
                        <SelectItem value="Telefone">Telefone</SelectItem>
                        <SelectItem value="E-mail">E-mail</SelectItem>
                        <SelectItem value="Feira/Evento">Feira/Evento</SelectItem>
                        <SelectItem value="Parceiro">Parceiro</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input
                      id="responsavel"
                      value={formData.responsavel}
                      onChange={(e) => handleInputChange('responsavel', e.target.value)}
                      disabled={readOnly}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    disabled={readOnly}
                    placeholder="Separar tags por vírgulas"
                    className="mt-1"
                  />
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    disabled={readOnly}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    disabled={readOnly}
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="licitacao" className="space-y-6 mt-6">
              {/* Dados da Licitação */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoLicitacao">Tipo de Licitação</Label>
                  <Select value={formData.tipoLicitacao} onValueChange={(value) => handleInputChange('tipoLicitacao', value)} disabled={readOnly}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pregão Eletrônico">Pregão Eletrônico</SelectItem>
                      <SelectItem value="Pregão Presencial">Pregão Presencial</SelectItem>
                      <SelectItem value="Concorrência">Concorrência</SelectItem>
                      <SelectItem value="Tomada de Preços">Tomada de Preços</SelectItem>
                      <SelectItem value="Convite">Convite</SelectItem>
                      <SelectItem value="Concurso">Concurso</SelectItem>
                      <SelectItem value="RDC">RDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="numeroEdital">Número do Edital</Label>
                  <Input
                    id="numeroEdital"
                    value={formData.numeroEdital}
                    onChange={(e) => handleInputChange('numeroEdital', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgaoLicitante">Órgão Licitante</Label>
                  <Input
                    id="orgaoLicitante"
                    value={formData.orgaoLicitante}
                    onChange={(e) => handleInputChange('orgaoLicitante', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="modalidadeLicitacao">Modalidade</Label>
                  <Select value={formData.modalidadeLicitacao} onValueChange={(value) => handleInputChange('modalidadeLicitacao', value)} disabled={readOnly}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Menor Preço">Menor Preço</SelectItem>
                      <SelectItem value="Melhor Técnica">Melhor Técnica</SelectItem>
                      <SelectItem value="Técnica e Preço">Técnica e Preço</SelectItem>
                      <SelectItem value="Maior Lance">Maior Lance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="criterioJulgamento">Critério de Julgamento</Label>
                  <Input
                    id="criterioJulgamento"
                    value={formData.criterioJulgamento}
                    onChange={(e) => handleInputChange('criterioJulgamento', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="situacaoPregao">Situação do Pregão</Label>
                  <Select value={formData.situacaoPregao} onValueChange={(value) => handleInputChange('situacaoPregao', value)} disabled={readOnly}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a situação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aberto">Aberto</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                      <SelectItem value="Homologado">Homologado</SelectItem>
                      <SelectItem value="Adjudicado">Adjudicado</SelectItem>
                      <SelectItem value="Deserto">Deserto</SelectItem>
                      <SelectItem value="Fracassado">Fracassado</SelectItem>
                      <SelectItem value="Revogado">Revogado</SelectItem>
                      <SelectItem value="Anulado">Anulado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Datas e Prazos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataAbertura">Data de Abertura</Label>
                  <Input
                    id="dataAbertura"
                    type="datetime-local"
                    value={formData.dataAbertura}
                    onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dataEntrega">Data de Entrega</Label>
                  <Input
                    id="dataEntrega"
                    type="date"
                    value={formData.dataEntrega}
                    onChange={(e) => handleInputChange('dataEntrega', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="localEntrega">Local de Entrega</Label>
                  <Input
                    id="localEntrega"
                    value={formData.localEntrega}
                    onChange={(e) => handleInputChange('localEntrega', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="garantiaExigida">Garantia Exigida</Label>
                  <Input
                    id="garantiaExigida"
                    value={formData.garantiaExigida}
                    onChange={(e) => handleInputChange('garantiaExigida', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="valorEstimado">Valor Estimado da Licitação (R$)</Label>
                <Input
                  id="valorEstimado"
                  type="number"
                  value={formData.valorEstimado}
                  onChange={(e) => handleInputChange('valorEstimado', Number(e.target.value))}
                  disabled={readOnly}
                  className="mt-1"
                />
              </div>

              {/* Campos de Texto Longo */}
              <div>
                <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                <Textarea
                  id="resumoEdital"
                  value={formData.resumoEdital}
                  onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                />
              </div>

              {/* NOVO CAMPO: Análise Técnica (Licitação) - Diferente do campo na aba Análise Técnica-Científica */}
              <div>
                <Label htmlFor="analiseTecnicaLicitacao">Análise Técnica</Label>
                <Textarea
                  id="analiseTecnicaLicitacao"
                  value={formData.analiseTecnicaLicitacao}
                  onChange={(e) => handleInputChange('analiseTecnicaLicitacao', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                  placeholder="Análise técnica específica para esta licitação..."
                />
              </div>

              <div>
                <Label htmlFor="impugnacaoEdital">Impugnação do Edital</Label>
                <Textarea
                  id="impugnacaoEdital"
                  value={formData.impugnacaoEdital}
                  onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="recursoAdministrativo">Recurso Administrativo</Label>
                <Textarea
                  id="recursoAdministrativo"
                  value={formData.recursoAdministrativo}
                  onChange={(e) => handleInputChange('recursoAdministrativo', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                />
              </div>

              {/* Tabela de Licitantes */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Licitantes e Propostas</h3>
                <TabelaLicitantes
                  licitantes={formData.licitantes}
                  onLicitantesChange={(licitantes) => handleInputChange('licitantes', licitantes)}
                  readOnly={readOnly}
                />
              </div>
            </TabsContent>

            <TabsContent value="analise-tecnica" className="space-y-6 mt-6">
              {/* Análise Técnica-Científica (campo existente mantido) */}
              <div>
                <Label htmlFor="analiseTecnica">Análise Técnica-Científica</Label>
                <Textarea
                  id="analiseTecnica"
                  value={formData.analiseTecnica}
                  onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                  disabled={readOnly}
                  rows={6}
                  className="mt-1"
                  placeholder="Análise técnica-científica detalhada..."
                />
              </div>

              <div>
                <Label htmlFor="caracteristicas">Características do Produto/Serviço</Label>
                <Textarea
                  id="caracteristicas"
                  value={formData.caracteristicas}
                  onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="especificacoesTecnicas">Especificações Técnicas</Label>
                <Textarea
                  id="especificacoesTecnicas"
                  value={formData.especificacoesTecnicas}
                  onChange={(e) => handleInputChange('especificacoesTecnicas', e.target.value)}
                  disabled={readOnly}
                  rows={6}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="normalizacao">Normalização e Regulamentação</Label>
                <Textarea
                  id="normalizacao"
                  value={formData.normalizacao}
                  onChange={(e) => handleInputChange('normalizacao', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </TabsContent>

            <TabsContent value="proposta" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="proposta">Detalhes da Proposta</Label>
                <Textarea
                  id="proposta"
                  value={formData.proposta}
                  onChange={(e) => handleInputChange('proposta', e.target.value)}
                  disabled={readOnly}
                  rows={6}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                  <Textarea
                    id="condicoesPagamento"
                    value={formData.condicoesPagamento}
                    onChange={(e) => handleInputChange('condicoesPagamento', e.target.value)}
                    disabled={readOnly}
                    rows={3}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                  <Input
                    id="prazoEntrega"
                    value={formData.prazoEntrega}
                    onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
                    disabled={readOnly}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="validadeProposta">Validade da Proposta</Label>
                <Input
                  id="validadeProposta"
                  value={formData.validadeProposta}
                  onChange={(e) => handleInputChange('validadeProposta', e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
              </div>

              {/* Análise de Concorrentes */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Análise de Concorrentes</h3>
                  {!readOnly && (
                    <Button 
                      onClick={() => setShowConcorrenteModal(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  )}
                </div>

                {formData.concorrentes.length > 0 ? (
                  <div className="space-y-3">
                    {formData.concorrentes.map((concorrente, index) => (
                      <div key={index} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-3 gap-4 flex-1">
                            <div>
                              <p className="font-medium">{concorrente.nome}</p>
                              <p className="text-sm text-gray-600">{concorrente.produto}</p>
                            </div>
                            <div>
                              <p className="font-medium">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                }).format(concorrente.preco)}
                              </p>
                            </div>
                            <div>
                              <Badge 
                                className={`${
                                  concorrente.preco > formData.valor 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-green-100 text-green-700'
                                }`}
                              >
                                {concorrente.preco > formData.valor ? 'Maior' : 'Menor'} que nossa proposta
                              </Badge>
                            </div>
                          </div>
                          {!readOnly && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveConcorrente(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum concorrente adicionado ainda
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="negociacao" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="historicoNegociacao">Histórico de Negociação</Label>
                <Textarea
                  id="historicoNegociacao"
                  value={formData.historicoNegociacao}
                  onChange={(e) => handleInputChange('historicoNegociacao', e.target.value)}
                  disabled={readOnly}
                  rows={6}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="proximosPassos">Próximos Passos</Label>
                <Textarea
                  id="proximosPassos"
                  value={formData.proximosPassos}
                  onChange={(e) => handleInputChange('proximosPassos', e.target.value)}
                  disabled={readOnly}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="equipe">Equipe Envolvida</Label>
                <Input
                  id="equipe"
                  value={formData.equipe}
                  onChange={(e) => handleInputChange('equipe', e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-6 mt-6">
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Documentos e Anexos</h3>
                <div className="border-2 border-dashed border-gray-300 p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Arraste arquivos aqui ou clique para selecionar</p>
                  <Button className="mt-2" disabled={readOnly}>
                    <Upload className="h-4 w-4 mr-2" />
                    Fazer Upload
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            
            {!readOnly && (
              <>
                <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                
                {isTriagemComplete() && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar para Próxima Fase
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Concorrente */}
      {showConcorrenteModal && (
        <ConcorrenteModal
          onClose={() => setShowConcorrenteModal(false)}
          onSave={handleAddConcorrente}
          valorReferencia={formData.valor}
        />
      )}
    </div>
  );
};

export default OportunidadeAvancadaForm;
