
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save, Upload, Plus, Send, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import LicitacaoValidationModal from "./LicitacaoValidationModal";
import ConcorrenteModal from "./ConcorrenteModal";
import ChatInterno from "./ChatInterno";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (oportunidade: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [formData, setFormData] = useState({
    tipoOportunidade: oportunidade?.tipoOportunidade || '',
    // Dados do Cliente
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nome: oportunidade?.nome || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    // Dados do Lead/Negócio
    fonteLead: oportunidade?.fonteLead || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    metodoContato: oportunidade?.metodoContato || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || [],
    produtosServicos: oportunidade?.produtosServicos || [],
    valorNegocio: oportunidade?.valorNegocio || 0,
    procurandoPor: oportunidade?.procurandoPor || '',
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    // Dados do Processo
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    dataVisita: oportunidade?.dataVisita || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || 'em_triagem',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    chaveLicitacao: oportunidade?.chaveLicitacao || '',
    // Dados Técnicos
    analiseTecnica: oportunidade?.analiseTecnica || '',
    termometro: oportunidade?.termometro || 50,
    resultadoOportunidade: oportunidade?.resultadoOportunidade || '',
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    // Campos para Importação Direta
    fornecedorInternacional: oportunidade?.fornecedorInternacional || '',
    moeda: oportunidade?.moeda || 'USD',
    numeroInvoice: oportunidade?.numeroInvoice || '',
    numeroDI: oportunidade?.numeroDI || '',
    dataChegadaEstimada: oportunidade?.dataChegadaEstimada || ''
  });

  const [showLicitacaoModal, setShowLicitacaoModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [concorrentes, setConcorrentes] = useState([]);
  const [clienteValidation, setClienteValidation] = useState('');

  const handleChaveLicitacaoChange = (value: string) => {
    setFormData({...formData, chaveLicitacao: value});
    if (value === '123') {
      setShowLicitacaoModal(true);
    }
  };

  const handleClienteChange = (value: string) => {
    setFormData({...formData, nome: value});
    if (value.toLowerCase().includes('sabesp')) {
      setClienteValidation('Cliente com pendência financeira');
    } else {
      setClienteValidation('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddConcorrente = (concorrente: any) => {
    setConcorrentes([...concorrentes, { ...concorrente, id: Date.now() }]);
  };

  const getTermometroColor = (value: number) => {
    if (value < 30) return 'bg-red-500';
    if (value < 60) return 'bg-yellow-500';
    if (value < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl">
              {oportunidade ? 'Editar Oportunidade Comercial' : 'Nova Oportunidade Comercial'}
            </CardTitle>
            <Badge variant="outline" className="text-biodina-blue border-biodina-blue">
              {formData.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Oportunidade - Campo Inicial Obrigatório */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="tipoOportunidade" className="text-lg font-semibold">Tipo de Oportunidade *</Label>
              <Select value={formData.tipoOportunidade} onValueChange={(value) => setFormData({...formData, tipoOportunidade: value})} required>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o tipo de oportunidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="licitacao">Licitação</SelectItem>
                  <SelectItem value="importacao_direta">Importação Direta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="triagem" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="triagem">Dados Gerais e Triagem</TabsTrigger>
                <TabsTrigger value="analise">Análise Técnica</TabsTrigger>
                <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="triagem" className="space-y-8 mt-6">
                {/* Chave da Licitação */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label htmlFor="chaveLicitacao" className="text-lg font-semibold">Chave da Licitação</Label>
                    <Input
                      id="chaveLicitacao"
                      value={formData.chaveLicitacao}
                      onChange={(e) => handleChaveLicitacaoChange(e.target.value)}
                      placeholder="Digite a chave da licitação"
                      className="mt-2"
                    />
                    {formData.chaveLicitacao && formData.chaveLicitacao !== '123' && (
                      <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Nenhuma licitação anterior
                      </p>
                    )}
                  </div>
                </div>

                {/* Dados do Cliente */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Dados do Cliente</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                      <Input
                        id="cpfCnpj"
                        value={formData.cpfCnpj}
                        onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                        placeholder="000.000.000-00 ou 00.000.000/0001-00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleClienteChange(e.target.value)}
                        placeholder="Nome do cliente"
                      />
                      {clienteValidation && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          {clienteValidation}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                      <Input
                        id="nomeFantasia"
                        value={formData.nomeFantasia}
                        onChange={(e) => setFormData({...formData, nomeFantasia: e.target.value})}
                        placeholder="Nome fantasia"
                      />
                    </div>

                    <div>
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
                        placeholder="Razão social"
                      />
                    </div>

                    <div>
                      <Label htmlFor="endereco">Endereço Completo</Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                        placeholder="Endereço completo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="uf">UF</Label>
                      <Select value={formData.uf} onValueChange={(value) => setFormData({...formData, uf: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@exemplo.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        placeholder="https://exemplo.com.br"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ativo" 
                        checked={formData.ativo}
                        onCheckedChange={(checked) => setFormData({...formData, ativo: checked as boolean})}
                      />
                      <Label htmlFor="ativo">Cliente Ativo</Label>
                    </div>
                  </div>
                </div>

                {/* Dados do Lead/Negócio */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Dados do Lead/Negócio</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fonteLead">Fonte do Lead</Label>
                      <Select value={formData.fonteLead} onValueChange={(value) => setFormData({...formData, fonteLead: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a fonte" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="site">Site</SelectItem>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="parceiro">Parceiro</SelectItem>
                          <SelectItem value="indicacao">Indicação</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="feira">Feira/Evento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                      <Select value={formData.segmentoLead} onValueChange={(value) => setFormData({...formData, segmentoLead: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hospitalar">Hospitalar</SelectItem>
                          <SelectItem value="laboratorio">Laboratório</SelectItem>
                          <SelectItem value="veterinario">Veterinário</SelectItem>
                          <SelectItem value="industria">Indústria</SelectItem>
                          <SelectItem value="universidade">Universidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="metodoContato">Método de Contato</Label>
                      <Select value={formData.metodoContato} onValueChange={(value) => setFormData({...formData, metodoContato: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="email">E-mail</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="teams">Teams/Zoom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="valorNegocio">Valor do Negócio (R$)</Label>
                      <Input
                        id="valorNegocio"
                        type="number"
                        value={formData.valorNegocio}
                        onChange={(e) => setFormData({...formData, valorNegocio: Number(e.target.value)})}
                        placeholder="0,00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="procurandoPor">Procurando por (Contatos vinculados)</Label>
                      <Input
                        id="procurandoPor"
                        value={formData.procurandoPor}
                        onChange={(e) => setFormData({...formData, procurandoPor: e.target.value})}
                        placeholder="Equipamentos médicos, serviços..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="Tag1, Tag2, Tag3"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="caracteristicas">Características</Label>
                    <Textarea
                      id="caracteristicas"
                      value={formData.caracteristicas}
                      onChange={(e) => setFormData({...formData, caracteristicas: e.target.value})}
                      placeholder="Descreva as características específicas..."
                      rows={2}
                    />
                  </div>
                </div>

                {/* Dados do Processo */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Dados do Processo</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dataInicio">Data de Início</Label>
                      <Input
                        id="dataInicio"
                        type="date"
                        value={formData.dataInicio}
                        onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dataLimite">Data Limite</Label>
                      <Input
                        id="dataLimite"
                        type="date"
                        value={formData.dataLimite}
                        onChange={(e) => setFormData({...formData, dataLimite: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dataVisita">Data da Visita</Label>
                      <Input
                        id="dataVisita"
                        type="date"
                        value={formData.dataVisita}
                        onChange={(e) => setFormData({...formData, dataVisita: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
                      <Select value={formData.fluxoTrabalho} onValueChange={(value) => setFormData({...formData, fluxoTrabalho: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_triagem">Em Triagem</SelectItem>
                          <SelectItem value="qualificacao">Qualificação</SelectItem>
                          <SelectItem value="proposta">Proposta</SelectItem>
                          <SelectItem value="negociacao">Negociação</SelectItem>
                          <SelectItem value="fechamento">Fechamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_triagem">Em Triagem</SelectItem>
                          <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
                          <SelectItem value="ganha">Ganha</SelectItem>
                          <SelectItem value="perdida">Perdida</SelectItem>
                          <SelectItem value="finalizada">Finalizada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="propostaNegociacao" 
                        checked={formData.propostaNegociacao}
                        onCheckedChange={(checked) => setFormData({...formData, propostaNegociacao: checked as boolean})}
                      />
                      <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição da Oportunidade</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                      placeholder="Descreva detalhadamente a oportunidade..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Análise Técnica */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Análise Técnica</h3>
                  <div>
                    <Label htmlFor="analiseTecnica">Análise Técnica-Científica</Label>
                    <Textarea
                      id="analiseTecnica"
                      value={formData.analiseTecnica}
                      onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
                      placeholder="Descreva a análise técnica da oportunidade..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-base font-medium">Análise da Concorrência</Label>
                      <Button 
                        type="button"
                        onClick={() => setShowConcorrenteModal(true)}
                        className="bg-biodina-gold hover:bg-biodina-gold/90"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Concorrente
                      </Button>
                    </div>

                    {concorrentes.length > 0 && (
                      <div className="space-y-3">
                        {concorrentes.map((concorrente: any) => (
                          <div key={concorrente.id} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{concorrente.nome}</h4>
                                <p className="text-sm text-gray-600">{concorrente.produto}</p>
                                <p className="text-sm font-medium">
                                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(concorrente.preco)}
                                </p>
                              </div>
                              <Badge 
                                className={concorrente.preco > formData.valorNegocio ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
                              >
                                {concorrente.preco > formData.valorNegocio ? 'Acima' : 'Abaixo'} do nosso valor
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Campos específicos para Importação Direta */}
                {formData.tipoOportunidade === 'importacao_direta' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Dados de Importação</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fornecedorInternacional">Fornecedor Internacional</Label>
                        <Input
                          id="fornecedorInternacional"
                          value={formData.fornecedorInternacional}
                          onChange={(e) => setFormData({...formData, fornecedorInternacional: e.target.value})}
                          placeholder="Nome do fornecedor internacional"
                        />
                      </div>

                      <div>
                        <Label htmlFor="moeda">Moeda</Label>
                        <Select value={formData.moeda} onValueChange={(value) => setFormData({...formData, moeda: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - Libra Esterlina</SelectItem>
                            <SelectItem value="JPY">JPY - Iene Japonês</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="numeroInvoice">Número do Invoice</Label>
                        <Input
                          id="numeroInvoice"
                          value={formData.numeroInvoice}
                          onChange={(e) => setFormData({...formData, numeroInvoice: e.target.value})}
                          placeholder="Número do invoice"
                        />
                      </div>

                      <div>
                        <Label htmlFor="numeroDI">Número da DI</Label>
                        <Input
                          id="numeroDI"
                          value={formData.numeroDI}
                          onChange={(e) => setFormData({...formData, numeroDI: e.target.value})}
                          placeholder="Número da Declaração de Importação"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dataChegadaEstimada">Data de Chegada Estimada</Label>
                        <Input
                          id="dataChegadaEstimada"
                          type="date"
                          value={formData.dataChegadaEstimada}
                          onChange={(e) => setFormData({...formData, dataChegadaEstimada: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Termômetro e Resultado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Avaliação da Oportunidade</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="block mb-2">Termômetro de Oportunidade: {formData.termometro}%</Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={formData.termometro}
                          onChange={(e) => setFormData({...formData, termometro: Number(e.target.value)})}
                          className="flex-1"
                        />
                        <div className={`w-6 h-6 rounded-full ${getTermometroColor(formData.termometro)}`}></div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="resultadoOportunidade">Resultado da Oportunidade</Label>
                      <Select value={formData.resultadoOportunidade} onValueChange={(value) => setFormData({...formData, resultadoOportunidade: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o resultado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ganho">Ganho</SelectItem>
                          <SelectItem value="perda">Perda</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.resultadoOportunidade === 'ganho' && (
                    <div>
                      <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
                      <Select value={formData.motivoGanho} onValueChange={(value) => setFormData({...formData, motivoGanho: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o motivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="melhor_preco">Melhor Preço</SelectItem>
                          <SelectItem value="melhor_qualidade">Melhor Qualidade</SelectItem>
                          <SelectItem value="prazo_entrega">Prazo de Entrega</SelectItem>
                          <SelectItem value="relacionamento">Relacionamento</SelectItem>
                          <SelectItem value="suporte_tecnico">Suporte Técnico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.resultadoOportunidade === 'perda' && (
                    <div>
                      <Label htmlFor="motivoPerda">Motivo da Perda</Label>
                      <Select value={formData.motivoPerda} onValueChange={(value) => setFormData({...formData, motivoPerda: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o motivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preco_alto">Preço Alto</SelectItem>
                          <SelectItem value="prazo_entrega">Prazo de Entrega</SelectItem>
                          <SelectItem value="especificacao">Especificação Técnica</SelectItem>
                          <SelectItem value="concorrencia">Concorrência</SelectItem>
                          <SelectItem value="orcamento_cancelado">Orçamento Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Upload de Documentos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Upload de Documentos</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Arraste arquivos aqui ou clique para fazer upload</p>
                    <p className="text-sm text-gray-400 mt-2">Edital, Proposta, Ata, Contrato, Termo</p>
                    <Button variant="outline" className="mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar Arquivos
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analise" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="analiseTecnica">Análise Técnica-Científica</Label>
                  <Textarea
                    id="analiseTecnica"
                    value={formData.analiseTecnica}
                    onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
                    rows={4}
                    placeholder="Descreva a análise técnica da oportunidade..."
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Concorrentes</h3>
                    <Button 
                      type="button"
                      onClick={() => setShowConcorrenteModal(true)}
                      className="bg-biodina-gold hover:bg-biodina-gold/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  </div>

                  {concorrentes.length > 0 && (
                    <div className="space-y-3">
                      {concorrentes.map((concorrente: any) => (
                        <div key={concorrente.id} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{concorrente.nome}</h4>
                              <p className="text-sm text-gray-600">{concorrente.produto}</p>
                              <p className="text-sm font-medium">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(concorrente.preco)}
                              </p>
                            </div>
                            <Badge 
                              className={concorrente.preco > formData.valorNegocio ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
                            >
                              {concorrente.preco > formData.valorNegocio ? 'Maior' : 'Menor'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="historico" className="mt-6">
                <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
              </TabsContent>

              <TabsContent value="documentos" className="mt-6">
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500">Documentos enviados no chat interno aparecerão aqui</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Oportunidade
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showLicitacaoModal && (
        <LicitacaoValidationModal
          onClose={() => setShowLicitacaoModal(false)}
          chave={formData.chaveLicitacao}
        />
      )}

      {showConcorrenteModal && (
        <ConcorrenteModal
          onClose={() => setShowConcorrenteModal(false)}
          onSave={handleAddConcorrente}
          valorReferencia={formData.valorNegocio}
        />
      )}
    </div>
  );
};

export default OportunidadeAvancadaForm;
