
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, MessageCircle, Upload, ShoppingCart, Shield, 
  Thermometer, User, Building, Calendar, AlertTriangle
} from "lucide-react";

interface LicitacaoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const LicitacaoForm = ({ isOpen, onClose, onSave, oportunidade }: LicitacaoFormProps) => {
  const [faseAtiva, setFaseAtiva] = useState<'triagem' | 'participacao'>(
    oportunidade?.faseAtiva || 'triagem'
  );
  const [ferramentaAtiva, setFerramentaAtiva] = useState('dados_gerais');
  const [aprovacaoSolicitada, setAprovacaoSolicitada] = useState(false);
  const [senhaGestor, setSenhaGestor] = useState('');

  const [formData, setFormData] = useState({
    // Dados básicos
    modalidade: 'licitacao',
    faseAtiva: oportunidade?.faseAtiva || 'triagem',
    
    // Dados do Cliente (Triagem)
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    
    // Dados da Oportunidade (Triagem)
    fonteLead: oportunidade?.fonteLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    metodoContato: oportunidade?.metodoContato || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    responsaveis: oportunidade?.responsaveis || [],
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Organização (Triagem)
    tags: oportunidade?.tags || [],
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    statusTriagem: oportunidade?.statusTriagem || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Campos específicos de Licitação (Triagem)
    dataLicitacao: oportunidade?.dataLicitacao || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    impugnacaoEdital: oportunidade?.impugnacaoEdital || '',
    analiseEstrategia: oportunidade?.analiseEstrategia || '',
    naturezaOperacao: oportunidade?.naturezaOperacao || '',
    numeroPregao: oportunidade?.numeroPregao || '',
    numeroProcesso: oportunidade?.numeroProcesso || '',
    numeroUASG: oportunidade?.numeroUASG || '',
    qualSite: oportunidade?.qualSite || '',
    permiteAdesao: oportunidade?.permiteAdesao || false,
    obsAdesao: oportunidade?.obsAdesao || '',
    produtos: oportunidade?.produtos || [],
    valorEstimado: oportunidade?.valorEstimado || 0,
    qtdEquipamentos: oportunidade?.qtdEquipamentos || 0,
    qtdExames: oportunidade?.qtdExames || 0,
    contratoAnterior: oportunidade?.contratoAnterior || false,
    marcaModeloAnterior: oportunidade?.marcaModeloAnterior || '',
    propostaEmNegociacao: oportunidade?.propostaEmNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Análise Técnica (Triagem)
    analiseTecnica: oportunidade?.analiseTecnica || '',
    concorrentes: oportunidade?.concorrentes || [],
    
    // Campos de Participação (pós-aprovação)
    statusParticipacao: oportunidade?.statusParticipacao || 'em_acompanhamento',
    situacaoPregao: oportunidade?.situacaoPregao || '',
    manifestacaoRecurso: oportunidade?.manifestacaoRecurso || '',
    statusLicitacao: oportunidade?.statusLicitacao || '',
    motivosFracasso: oportunidade?.motivosFracasso || '',
    licitantes: oportunidade?.licitantes || [],
    dataAssinatura: oportunidade?.dataAssinatura || '',
    observacaoGeral: oportunidade?.observacaoGeral || '',
    
    // Campos condicionais
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canRequestApproval = () => {
    return (
      formData.statusTriagem === 'em_triagem' &&
      formData.cpfCnpj.trim() !== '' &&
      formData.nomeFantasia.trim() !== '' &&
      formData.valorNegocio > 0
    );
  };

  const handleSolicitarAprovacao = () => {
    if (canRequestApproval()) {
      setAprovacaoSolicitada(true);
    }
  };

  const handleConfirmarAprovacao = () => {
    if (senhaGestor === 'gestor123') { // Senha fictícia
      setFaseAtiva('participacao');
      setFormData(prev => ({ ...prev, faseAtiva: 'participacao' }));
      setAprovacaoSolicitada(false);
      setSenhaGestor('');
      setFerramentaAtiva('dados_gerais');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const isTriagemReadOnly = faseAtiva === 'participacao';
  const isPedidosEnabled = formData.statusParticipacao === 'ganha';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
          </DialogTitle>
        </DialogHeader>

        {/* Master Tabs */}
        <div className="border-b">
          <div className="flex items-center space-x-1">
            <Button
              variant={faseAtiva === 'triagem' ? 'default' : 'ghost'}
              className={`${
                faseAtiva === 'triagem' 
                  ? 'bg-biodina-blue text-white' 
                  : isTriagemReadOnly 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'hover:bg-gray-100'
              }`}
              disabled={isTriagemReadOnly}
            >
              TRIAGEM
            </Button>
            {faseAtiva === 'participacao' && (
              <span className="text-gray-400 mx-2">→</span>
            )}
            <Button
              variant={faseAtiva === 'participacao' ? 'default' : 'ghost'}
              className={`${
                faseAtiva === 'participacao' 
                  ? 'bg-biodina-blue text-white' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              disabled={faseAtiva !== 'participacao'}
            >
              PARTICIPAÇÃO
            </Button>
          </div>
        </div>

        {/* Tool Tabs */}
        <Tabs value={ferramentaAtiva} onValueChange={setFerramentaAtiva} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dados_gerais" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="analise_tecnica" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Análise Técnica
            </TabsTrigger>
            <TabsTrigger value="historico_chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Histórico/Chat
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documentos
            </TabsTrigger>
            <TabsTrigger 
              value="pedidos" 
              className="flex items-center gap-2"
              disabled={!isPedidosEnabled}
            >
              <ShoppingCart className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="dados_gerais" className="space-y-6 p-1">
              {faseAtiva === 'triagem' ? (
                <>
                  {/* Dados do Cliente - Triagem */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Dados do Cliente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpj"
                          value={formData.cpfCnpj}
                          onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                        <Input
                          id="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="razaoSocial">Razão Social</Label>
                        <Input
                          id="razaoSocial"
                          value={formData.razaoSocial}
                          onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Input
                          id="uf"
                          value={formData.uf}
                          onChange={(e) => handleInputChange('uf', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dados Específicos da Licitação - Triagem */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Dados da Licitação</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dataLicitacao">Data da Licitação</Label>
                        <Input
                          id="dataLicitacao"
                          type="date"
                          value={formData.dataLicitacao}
                          onChange={(e) => handleInputChange('dataLicitacao', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroPregao">Nº Pregão/INEX/ATA/SRP</Label>
                        <Input
                          id="numeroPregao"
                          value={formData.numeroPregao}
                          onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numeroProcesso">Nº Processo</Label>
                        <Input
                          id="numeroProcesso"
                          value={formData.numeroProcesso}
                          onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorEstimado">Valor Estimado</Label>
                        <Input
                          id="valorEstimado"
                          type="number"
                          value={formData.valorEstimado}
                          onChange={(e) => handleInputChange('valorEstimado', parseFloat(e.target.value) || 0)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="qtdEquipamentos">Qtd Equipamentos</Label>
                        <Input
                          id="qtdEquipamentos"
                          type="number"
                          value={formData.qtdEquipamentos}
                          onChange={(e) => handleInputChange('qtdEquipamentos', parseInt(e.target.value) || 0)}
                          disabled={isTriagemReadOnly}
                        />
                      </div>
                      <div>
                        <Label htmlFor="statusTriagem">Status</Label>
                        <Select 
                          value={formData.statusTriagem} 
                          onValueChange={(value) => handleInputChange('statusTriagem', value)}
                          disabled={isTriagemReadOnly}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="em_triagem">Em Triagem</SelectItem>
                            <SelectItem value="aguardando_aprovacao">Aguardando Aprovação</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Botão de Aprovação */}
                  {faseAtiva === 'triagem' && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-center">
                          <Button
                            onClick={handleSolicitarAprovacao}
                            disabled={!canRequestApproval()}
                            className="bg-biodina-gold hover:bg-biodina-gold/90 flex items-center gap-2"
                          >
                            <Shield className="h-4 w-4" />
                            Solicitar Aprovação para Participação
                          </Button>
                        </div>
                        {!canRequestApproval() && (
                          <div className="text-center mt-2 text-sm text-red-500">
                            Preencha todos os campos obrigatórios para solicitar aprovação
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  {/* Dados de Participação */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Status da Participação</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="statusParticipacao">Status</Label>
                        <Select 
                          value={formData.statusParticipacao} 
                          onValueChange={(value) => handleInputChange('statusParticipacao', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                            <SelectItem value="ganha">Ganha</SelectItem>
                            <SelectItem value="perdida">Perdida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="situacaoPregao">Situação do Pregão</Label>
                        <Select 
                          value={formData.situacaoPregao} 
                          onValueChange={(value) => handleInputChange('situacaoPregao', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="em_andamento">Em Andamento</SelectItem>
                            <SelectItem value="suspenso">Suspenso</SelectItem>
                            <SelectItem value="concluido">Concluído</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campos Condicionais */}
                  {formData.statusParticipacao === 'ganha' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Motivo do Ganho</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={formData.motivoGanho}
                          onChange={(e) => handleInputChange('motivoGanho', e.target.value)}
                          placeholder="Descreva os motivos que levaram ao ganho desta licitação..."
                        />
                      </CardContent>
                    </Card>
                  )}

                  {formData.statusParticipacao === 'perdida' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Motivo de Perda</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={formData.motivoPerda}
                          onChange={(e) => handleInputChange('motivoPerda', e.target.value)}
                          placeholder="Descreva os motivos que levaram à perda desta licitação..."
                        />
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="analise_tecnica" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Técnica-Científica</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.analiseTecnica}
                    onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                    placeholder="Descreva a análise técnica-científica da licitação..."
                    rows={10}
                    disabled={isTriagemReadOnly && faseAtiva === 'participacao'}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico_chat" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Histórico/Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Funcionalidade de chat/histórico será implementada
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Funcionalidade de upload de documentos será implementada
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pedidos" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Pedidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPedidosEnabled ? (
                    <div className="text-center text-gray-500 py-8">
                      Funcionalidade de gerenciamento de pedidos será implementada
                    </div>
                  ) : (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Os pedidos só podem ser gerenciados quando o status da participação for "Ganha".
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            Salvar
          </Button>
        </div>
      </DialogContent>

      {/* Modal de Aprovação */}
      {aprovacaoSolicitada && (
        <Dialog open={aprovacaoSolicitada} onOpenChange={() => setAprovacaoSolicitada(false)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Aprovação para Participação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="senhaGestor">Senha do Gestor</Label>
              <Input
                id="senhaGestor"
                type="password"
                value={senhaGestor}
                onChange={(e) => setSenhaGestor(e.target.value)}
                placeholder="Digite a senha do gestor"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setAprovacaoSolicitada(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleConfirmarAprovacao}>
                  Confirmar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default LicitacaoForm;
