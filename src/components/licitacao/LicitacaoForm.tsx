
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Licitacao, LicitacaoFormData } from "@/types/licitacao";
import { X, Save, FileText, Users, History, Trophy, AlertTriangle } from "lucide-react";
import TabelaLicitantes from "./TabelaLicitantes";

interface LicitacaoFormProps {
  licitacao?: Licitacao;
  onClose: () => void;
  onSave: (licitacao: Partial<LicitacaoFormData>) => void;
}

const LicitacaoForm = ({ licitacao, onClose, onSave }: LicitacaoFormProps) => {
  const [formData, setFormData] = useState<LicitacaoFormData>({
    numeroPregao: licitacao?.numeroPregao || '',
    nomeInstituicao: licitacao?.nomeInstituicao || '',
    uf: licitacao?.uf || '',
    municipio: licitacao?.municipio || '',
    linkEdital: licitacao?.linkEdital || '',
    objetoLicitacao: licitacao?.objetoLicitacao || '',
    numeroItem: licitacao?.numeroItem || '',
    empresaConcorrente: licitacao?.empresaConcorrente || '',
    palavraChave: licitacao?.palavraChave || '',
    status: licitacao?.status || 'triagem',
    situacaoPregao: licitacao?.situacaoPregao || 'aberto',
    statusLicitacao: licitacao?.statusLicitacao || 'aguardando_abertura',
    haviaContratoAnterior: licitacao?.haviaContratoAnterior || false,
    resumoEdital: licitacao?.resumoEdital || '',
    analiseTecnica: licitacao?.analiseTecnica || '',
    estrategiaValorEntrada: licitacao?.estrategiaValorEntrada || 0,
    estrategiaValorFinal: licitacao?.estrategiaValorFinal || 0,
    estrategiaObjetivo: licitacao?.estrategiaObjetivo || '',
    estrategiaRisco: licitacao?.estrategiaRisco || 'medio',
    motivoDecisao: licitacao?.motivoDecisao || '',
    observacoes: licitacao?.observacoes || '',
    dataAbertura: licitacao?.dataAbertura || '',
    dataContato: licitacao?.dataContato || '',
    licitantes: [],
    produtos: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Detectar se status mudou para "convertida" para automação
    const shouldCreateComercialProcess = formData.status === 'convertida' && licitacao?.status !== 'convertida';
    
    const dataToSave = {
      ...formData,
      ultimaAlteracao: new Date().toISOString().split('T')[0],
      alteradoPor: 'Usuário Atual', // Em uma aplicação real, viria do contexto de usuário
      inclusao: licitacao?.inclusao || new Date().toISOString().split('T')[0],
      incluidoPor: licitacao?.incluidoPor || 'Usuário Atual'
    };

    if (shouldCreateComercialProcess) {
      // Lógica de automação será implementada no componente pai
      console.log('Criando processo comercial automático para licitação convertida');
    }

    onSave(dataToSave);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'triagem': return 'bg-yellow-500';
      case 'acompanhamento': return 'bg-blue-500';
      case 'finalizada': return 'bg-gray-500';
      case 'convertida': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSituacaoLabel = (situacao: string) => {
    const labels = {
      'aberto': 'Aberto',
      'suspenso': 'Suspenso',
      'cancelado': 'Cancelado',
      'homologado': 'Homologado',
      'deserto': 'Deserto',
      'fracassado': 'Fracassado',
      'revogado': 'Revogado'
    };
    return labels[situacao as keyof typeof labels] || situacao;
  };

  const getStatusLicitacaoLabel = (status: string) => {
    const labels = {
      'aguardando_abertura': 'Aguardando Abertura',
      'em_andamento': 'Em Andamento',
      'fase_habilitacao': 'Fase de Habilitação',
      'fase_proposta': 'Fase de Proposta',
      'julgamento': 'Julgamento',
      'recurso': 'Recurso',
      'homologacao': 'Homologação',
      'adjudicacao': 'Adjudicação',
      'contratacao': 'Contratação',
      'finalizado': 'Finalizado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'baixo': return 'bg-green-500';
      case 'medio': return 'bg-yellow-500';
      case 'alto': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const isFormValid = () => {
    return formData.numeroPregao && formData.nomeInstituicao && formData.resumoEdital && formData.analiseTecnica;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>
              {licitacao ? 'Editar Licitação' : 'Nova Licitação'}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={`${getStatusColor(formData.status)} text-white`}>
                {formData.status}
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-700">
                {getSituacaoLabel(formData.situacaoPregao)}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Informações Gerais
              </TabsTrigger>
              <TabsTrigger value="analise" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Análise e Estratégia
              </TabsTrigger>
              <TabsTrigger value="licitantes" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Licitantes
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-6 mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Identificação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Identificação da Licitação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numeroPregao">Nº do Pregão/Licitação *</Label>
                        <Input
                          id="numeroPregao"
                          value={formData.numeroPregao}
                          onChange={(e) => setFormData({...formData, numeroPregao: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroItem">Nº do Item/Lote</Label>
                        <Input
                          id="numeroItem"
                          value={formData.numeroItem}
                          onChange={(e) => setFormData({...formData, numeroItem: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
                      <Input
                        id="nomeInstituicao"
                        value={formData.nomeInstituicao}
                        onChange={(e) => setFormData({...formData, nomeInstituicao: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Input
                          id="uf"
                          value={formData.uf}
                          onChange={(e) => setFormData({...formData, uf: e.target.value})}
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="municipio">Município</Label>
                        <Input
                          id="municipio"
                          value={formData.municipio}
                          onChange={(e) => setFormData({...formData, municipio: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="linkEdital">Link do Edital</Label>
                      <Input
                        id="linkEdital"
                        type="url"
                        value={formData.linkEdital}
                        onChange={(e) => setFormData({...formData, linkEdital: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Status e Situação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status e Situação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="status">Status Interno</Label>
                        <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="triagem">Em triagem</SelectItem>
                            <SelectItem value="acompanhamento">Em acompanhamento</SelectItem>
                            <SelectItem value="finalizada">Finalizada</SelectItem>
                            <SelectItem value="convertida">Convertida em oportunidade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="situacaoPregao">Situação do Pregão</Label>
                        <Select value={formData.situacaoPregao} onValueChange={(value: any) => setFormData({...formData, situacaoPregao: value})}>
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
                        <Label htmlFor="statusLicitacao">Status da Licitação</Label>
                        <Select value={formData.statusLicitacao} onValueChange={(value: any) => setFormData({...formData, statusLicitacao: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aguardando_abertura">Aguardando Abertura</SelectItem>
                            <SelectItem value="em_andamento">Em Andamento</SelectItem>
                            <SelectItem value="fase_habilitacao">Fase de Habilitação</SelectItem>
                            <SelectItem value="fase_proposta">Fase de Proposta</SelectItem>
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dataAbertura">Data de Abertura</Label>
                        <Input
                          id="dataAbertura"
                          type="date"
                          value={formData.dataAbertura}
                          onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataContato">Data de Contato</Label>
                        <Input
                          id="dataContato"
                          type="date"
                          value={formData.dataContato}
                          onChange={(e) => setFormData({...formData, dataContato: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="haviaContratoAnterior"
                        checked={formData.haviaContratoAnterior}
                        onCheckedChange={(checked) => setFormData({...formData, haviaContratoAnterior: checked})}
                      />
                      <Label htmlFor="haviaContratoAnterior">Havia Contrato Anterior?</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Objeto e Detalhes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Objeto e Detalhes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
                      <Textarea
                        id="objetoLicitacao"
                        value={formData.objetoLicitacao}
                        onChange={(e) => setFormData({...formData, objetoLicitacao: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="resumoEdital">Resumo do Edital *</Label>
                      <Textarea
                        id="resumoEdital"
                        value={formData.resumoEdital}
                        onChange={(e) => setFormData({...formData, resumoEdital: e.target.value})}
                        rows={4}
                        placeholder="Resumo detalhado do edital, principais pontos e requisitos..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="empresaConcorrente">Empresa Concorrente</Label>
                        <Input
                          id="empresaConcorrente"
                          value={formData.empresaConcorrente}
                          onChange={(e) => setFormData({...formData, empresaConcorrente: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="palavraChave">Palavra-chave do Produto/Serviço</Label>
                        <Input
                          id="palavraChave"
                          value={formData.palavraChave}
                          onChange={(e) => setFormData({...formData, palavraChave: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {formData.status === 'finalizada' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Finalização</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="motivoDecisao">Motivo da Decisão</Label>
                        <Textarea
                          id="motivoDecisao"
                          value={formData.motivoDecisao}
                          onChange={(e) => setFormData({...formData, motivoDecisao: e.target.value})}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                      rows={3}
                      placeholder="Observações adicionais..."
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                    disabled={!isFormValid()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Licitação
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="analise" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Análise Técnica</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.analiseTecnica}
                    onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
                    rows={6}
                    placeholder="Análise técnica detalhada do edital, requisitos, pontos de atenção..."
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estratégia Comercial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div className="grid grid-cols-3 gap-4">
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
                        {formatCurrency(formData.estrategiaValorEntrada || 0)}
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
                        {formatCurrency(formData.estrategiaValorFinal || 0)}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="estrategiaRisco">Nível de Risco</Label>
                      <Select value={formData.estrategiaRisco} onValueChange={(value: any) => setFormData({...formData, estrategiaRisco: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixo">Baixo</SelectItem>
                          <SelectItem value="medio">Médio</SelectItem>
                          <SelectItem value="alto">Alto</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge className={`${getRiscoColor(formData.estrategiaRisco || 'medio')} text-white mt-2`}>
                        Risco {formData.estrategiaRisco || 'médio'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="licitantes" className="mt-6">
              <TabelaLicitantes 
                licitacaoId={licitacao?.id || 0}
                licitantes={formData.licitantes || []}
                produtos={formData.produtos || []}
                onLicitantesChange={(licitantes) => setFormData({...formData, licitantes})}
                onProdutosChange={(produtos) => setFormData({...formData, produtos})}
              />
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Controle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Inclusão</Label>
                      <p className="text-sm text-gray-600">
                        {licitacao?.inclusao || 'Nova licitação'} - {licitacao?.incluidoPor || 'Usuário Atual'}
                      </p>
                    </div>
                    <div>
                      <Label>Última Alteração</Label>
                      <p className="text-sm text-gray-600">
                        {licitacao?.ultimaAlteracao || 'Não alterado'} - {licitacao?.alteradoPor || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Histórico detalhado de alterações será implementado aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicitacaoForm;
