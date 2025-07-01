import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import TabelaLicitantes from "@/components/licitacao/TabelaLicitantes";
import { Licitante, ProdutoLicitacao } from "@/types/licitacao";
import { 
  CalendarIcon, FileText, AlertCircle, DollarSign, Building,
  MapPin, Phone, Calendar as CalendarLucide, User, Target, 
  TrendingUp, CheckCircle, XCircle, Clock, Gavel, Scale,
  Trophy, Package
} from "lucide-react";

interface OportunidadeAvancadaFormProps {
  isOpen?: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ isOpen = true, oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [formData, setFormData] = useState({
    // Dados básicos
    codigo: '',
    nomeInstituicao: '',
    contato: '',
    responsavel: '',
    origem: '',
    uf: '',
    municipio: '',
    linkEdital: '',
    objetoLicitacao: '',
    numeroItem: '',
    empresaConcorrente: '',
    palavraChave: '',
    status: 'triagem' as 'triagem' | 'acompanhamento' | 'finalizada' | 'convertida',
    motivoDecisao: '',
    observacoes: '',
    dataAbertura: '',
    dataContato: '',
    
    // Campos obrigatórios
    situacaoPregao: 'aberto' as 'aberto' | 'suspenso' | 'cancelado' | 'homologado' | 'deserto' | 'fracassado' | 'revogado',
    statusLicitacao: 'aguardando_abertura' as 'aguardando_abertura' | 'em_andamento' | 'fase_habilitacao' | 'fase_proposta' | 'julgamento' | 'recurso' | 'homologacao' | 'adjudicacao' | 'contratacao' | 'finalizado',
    haviaContratoAnterior: false,
    resumoEdital: '',
    analiseTecnica: '',
    
    // Campos de estratégia (NOVOS)
    estrategiaValorEntrada: 0,
    estrategiaValorFinal: 0,
    estrategiaObjetivo: '',
    estrategiaRisco: 'medio' as 'baixo' | 'medio' | 'alto',
    
    // Dados específicos da licitação
    numeroPregao: '',
    numeroProcesso: '',
    dataLicitacao: undefined as Date | undefined,
    tipoLicitacao: 'pregao_eletronico',
    modalidade: 'menor_preco',
    orgaoResponsavel: '',
    valorEstimado: 0,
    criterioJulgamento: 'menor_preco',
    participacaoME: false,
    licitacaoExclusivaME: false,
    licitacaoSustentavel: false,
    
    // Análises
    resumoObjeto: '',
    resumoEdital: '',
    impugnacaoEdital: '',
    analiseMercado: '',
    analiseEstrategia: '',
    analiseRisco: '',
    observacoesGerais: '',
    
    // Controle interno
    requerAprovacao: false,
    aprovadoPor: '',
    dataAprovacao: undefined as Date | undefined,
    motivoRejeicao: '',
    
    // Acompanhamento
    proximosPrazos: '',
    alertas: '',
    
    // Timeline
    dataPublicacao: undefined as Date | undefined,
    dataAbertura: undefined as Date | undefined,
    dataEntregaProposta: undefined as Date | undefined,
    dataResultado: undefined as Date | undefined,
    
    // Concorrentes
    principaisConcorrentes: '',
    
    // Contatos
    contatoResponsavel: '',
    telefoneContato: '',
    emailContato: '',
    
    // Documentação
    documentosNecessarios: '',
    documentosEnviados: false,
    
    // Valores
    valorProposta: 0,
    margemLucro: 0,
    custoEstimado: 0,
    
    // Status final
    resultadoFinal: 'em_andamento',
    motivoPerda: '',
    licoeAprendidas: ''
  });
  
  const [licitantes, setLicitantes] = useState<Licitante[]>([]);
  const [produtos, setProdutos] = useState<ProdutoLicitacao[]>([]);
  const [showCalendar, setShowCalendar] = useState('');

  useEffect(() => {
    if (oportunidade) {
      setFormData({
        codigo: oportunidade.codigo || '',
        nomeInstituicao: oportunidade.nomeInstituicao || '',
        contato: oportunidade.contato || '',
        responsavel: oportunidade.responsavel || '',
        origem: oportunidade.origem || '',
        uf: oportunidade.uf || '',
        municipio: oportunidade.municipio || '',
        linkEdital: oportunidade.linkEdital || '',
        objetoLicitacao: oportunidade.objetoLicitacao || '',
        numeroItem: oportunidade.numeroItem || '',
        empresaConcorrente: oportunidade.empresaConcorrente || '',
        palavraChave: oportunidade.palavraChave || '',
        status: oportunidade.status || 'triagem',
        motivoDecisao: oportunidade.motivoDecisao || '',
        observacoes: oportunidade.observacoes || '',
        dataAbertura: oportunidade.dataAbertura || '',
        dataContato: oportunidade.dataContato || '',
        situacaoPregao: oportunidade.situacaoPregao || 'aberto',
        statusLicitacao: oportunidade.statusLicitacao || 'aguardando_abertura',
        haviaContratoAnterior: oportunidade.haviaContratoAnterior || false,
        resumoEdital: oportunidade.resumoEdital || '',
        analiseTecnica: oportunidade.analiseTecnica || '',
        estrategiaValorEntrada: oportunidade.estrategiaValorEntrada || 0,
        estrategiaValorFinal: oportunidade.estrategiaValorFinal || 0,
        estrategiaObjetivo: oportunidade.estrategiaObjetivo || '',
        estrategiaRisco: oportunidade.estrategiaRisco || 'medio',
        numeroPregao: oportunidade.numeroPregao || '',
        numeroProcesso: oportunidade.numeroProcesso || '',
        dataLicitacao: oportunidade.dataLicitacao ? new Date(oportunidade.dataLicitacao) : undefined,
        tipoLicitacao: oportunidade.tipoLicitacao || 'pregao_eletronico',
        modalidade: oportunidade.modalidade || 'menor_preco',
        orgaoResponsavel: oportunidade.orgaoResponsavel || '',
        valorEstimado: oportunidade.valorEstimado || 0,
        criterioJulgamento: oportunidade.criterioJulgamento || 'menor_preco',
        participacaoME: oportunidade.participacaoME || false,
        licitacaoExclusivaME: oportunidade.licitacaoExclusivaME || false,
        licitacaoSustentavel: oportunidade.licitacaoSustentavel || false,
        resumoObjeto: oportunidade.resumoObjeto || '',
        impugnacaoEdital: oportunidade.impugnacaoEdital || '',
        analiseMercado: oportunidade.analiseMercado || '',
        analiseEstrategia: oportunidade.analiseEstrategia || '',
        analiseRisco: oportunidade.analiseRisco || '',
        observacoesGerais: oportunidade.observacoesGerais || '',
        requerAprovacao: oportunidade.requerAprovacao || false,
        aprovadoPor: oportunidade.aprovadoPor || '',
        dataAprovacao: oportunidade.dataAprovacao ? new Date(oportunidade.dataAprovacao) : undefined,
        motivoRejeicao: oportunidade.motivoRejeicao || '',
        proximosPrazos: oportunidade.proximosPrazos || '',
        alertas: oportunidade.alertas || '',
        dataPublicacao: oportunidade.dataPublicacao ? new Date(oportunidade.dataPublicacao) : undefined,
        dataAbertura: oportunidade.dataAbertura ? new Date(oportunidade.dataAbertura) : undefined,
        dataEntregaProposta: oportunidade.dataEntregaProposta ? new Date(oportunidade.dataEntregaProposta) : undefined,
        dataResultado: oportunidade.dataResultado ? new Date(oportunidade.dataResultado) : undefined,
        principaisConcorrentes: oportunidade.principaisConcorrentes || '',
        contatoResponsavel: oportunidade.contatoResponsavel || '',
        telefoneContato: oportunidade.telefoneContato || '',
        emailContato: oportunidade.emailContato || '',
        documentosNecessarios: oportunidade.documentosNecessarios || '',
        documentosEnviados: oportunidade.documentosEnviados || false,
        valorProposta: oportunidade.valorProposta || 0,
        margemLucro: oportunidade.margemLucro || 0,
        custoEstimado: oportunidade.custoEstimado || 0,
        resultadoFinal: oportunidade.resultadoFinal || 'em_andamento',
        motivoPerda: oportunidade.motivoPerda || '',
        licoeAprendidas: oportunidade.licoeAprendidas || ''
      });
      setLicitantes(oportunidade.licitantes || []);
      setProdutos(oportunidade.produtos || []);
    }
  }, [oportunidade]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSubmit = () => {
    const dataToSave = {
      ...formData,
      licitantes,
      produtos
    };
    onSave(dataToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            {oportunidade ? 'Editar Licitação' : 'Nova Licitação'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="analise">Análise</TabsTrigger>
            <TabsTrigger value="estrategia">Estratégia</TabsTrigger>
            <TabsTrigger value="licitantes">Licitantes</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
                <Input
                  id="nomeInstituicao"
                  value={formData.nomeInstituicao}
                  onChange={(e) => setFormData({...formData, nomeInstituicao: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="numeroPregao">Número do Pregão *</Label>
                <Input
                  id="numeroPregao"
                  value={formData.numeroPregao}
                  onChange={(e) => setFormData({...formData, numeroPregao: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="situacaoPregao">Situação do Pregão *</Label>
                <Select 
                  value={formData.situacaoPregao} 
                  onValueChange={(value: 'aberto' | 'suspenso' | 'cancelado' | 'homologado' | 'deserto' | 'fracassado' | 'revogado') => 
                    setFormData({...formData, situacaoPregao: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="homologado">Homologado</SelectItem>
                    <SelectItem value="deserto">Deserto</SelectItem>
                    <SelectItem value="fracassado">Fracassado</SelectItem>
                    <SelectItem value="revogado">Revogado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="statusLicitacao">Status da Licitação *</Label>
                <Select 
                  value={formData.statusLicitacao} 
                  onValueChange={(value: 'aguardando_abertura' | 'em_andamento' | 'fase_habilitacao' | 'fase_proposta' | 'julgamento' | 'recurso' | 'homologacao' | 'adjudicacao' | 'contratacao' | 'finalizado') => 
                    setFormData({...formData, statusLicitacao: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aguardando_abertura">Aguardando Abertura</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="fase_habilitacao">Fase Habilitação</SelectItem>
                    <SelectItem value="fase_proposta">Fase Proposta</SelectItem>
                    <SelectItem value="julgamento">Julgamento</SelectItem>
                    <SelectItem value="recurso">Recurso</SelectItem>
                    <SelectItem value="homologacao">Homologação</SelectItem>
                    <SelectItem value="adjudicacao">Adjudicação</SelectItem>
                    <SelectItem value="contratacao">Contratação</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="haviaContratoAnterior"
                checked={formData.haviaContratoAnterior}
                onCheckedChange={(checked) => setFormData({...formData, haviaContratoAnterior: checked})}
              />
              <Label htmlFor="haviaContratoAnterior">Havia contrato anterior?</Label>
            </div>

            <div>
              <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
              <Textarea
                id="objetoLicitacao"
                value={formData.objetoLicitacao}
                onChange={(e) => setFormData({...formData, objetoLicitacao: e.target.value})}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="detalhes" className="space-y-6">
            {/* Campos de detalhes podem ser adicionados aqui conforme necessidade */}
          </TabsContent>

          <TabsContent value="analise" className="space-y-6">
            <div>
              <Label htmlFor="resumoEdital">Resumo do Edital *</Label>
              <Textarea
                id="resumoEdital"
                value={formData.resumoEdital}
                onChange={(e) => setFormData({...formData, resumoEdital: e.target.value})}
                rows={4}
                placeholder="Descreva os principais pontos do edital..."
                required
              />
            </div>

            <div>
              <Label htmlFor="analiseTecnica">Análise Técnica *</Label>
              <Textarea
                id="analiseTecnica"
                value={formData.analiseTecnica}
                onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
                rows={4}
                placeholder="Análise técnica detalhada da oportunidade..."
                required
              />
            </div>
          </TabsContent>

          <TabsContent value="estrategia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Estratégia Comercial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estrategiaValorEntrada">Valor de Entrada</Label>
                    <Input
                      id="estrategiaValorEntrada"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.estrategiaValorEntrada}
                      onChange={(e) => setFormData({...formData, estrategiaValorEntrada: parseFloat(e.target.value) || 0})}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(formData.estrategiaValorEntrada)}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="estrategiaValorFinal">Valor Final</Label>
                    <Input
                      id="estrategiaValorFinal"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.estrategiaValorFinal}
                      onChange={(e) => setFormData({...formData, estrategiaValorFinal: parseFloat(e.target.value) || 0})}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(formData.estrategiaValorFinal)}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="estrategiaRisco">Nível de Risco</Label>
                  <Select 
                    value={formData.estrategiaRisco} 
                    onValueChange={(value: 'baixo' | 'medio' | 'alto') => 
                      setFormData({...formData, estrategiaRisco: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixo">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          Baixo
                        </div>
                      </SelectItem>
                      <SelectItem value="medio">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          Médio
                        </div>
                      </SelectItem>
                      <SelectItem value="alto">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          Alto
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="estrategiaObjetivo">Objetivo Estratégico</Label>
                  <Textarea
                    id="estrategiaObjetivo"
                    value={formData.estrategiaObjetivo}
                    onChange={(e) => setFormData({...formData, estrategiaObjetivo: e.target.value})}
                    rows={3}
                    placeholder="Descreva o objetivo estratégico para esta licitação..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licitantes" className="space-y-6">
            <TabelaLicitantes
              licitacaoId={oportunidade?.id || 0}
              licitantes={licitantes}
              produtos={produtos}
              onLicitantesChange={setLicitantes}
              onProdutosChange={setProdutos}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-biodina-gold hover:bg-biodina-gold/90">
            Salvar Licitação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeAvancadaForm;
