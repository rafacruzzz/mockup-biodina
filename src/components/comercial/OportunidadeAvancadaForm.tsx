import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, Calendar, AlertTriangle, Info } from 'lucide-react';
import TabelaLicitantes from './TabelaLicitantes';
import ChatInterno from './ChatInterno';
import { toast } from "sonner";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [formData, setFormData] = useState({
    // Dados do Cliente
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    
    // Dados da Oportunidade
    fonteLead: oportunidade?.fonteLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    metodoContato: oportunidade?.metodoContato || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || '',
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Dados Específicos da Licitação
    numeroPregao: oportunidade?.numeroPregao || '',
    objetoLicitacao: oportunidade?.objetoLicitacao || '',
    tipoLicitacao: oportunidade?.tipoLicitacao || '',
    modalidadeLicitacao: oportunidade?.modalidadeLicitacao || '',
    regimeExecucao: oportunidade?.regimeExecucao || '',
    criterioJulgamento: oportunidade?.criterioJulgamento || '',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataLimiteImpugnacao: oportunidade?.dataLimiteImpugnacao || '',
    dataLimitePedidoEsclarecimentos: oportunidade?.dataLimitePedidoEsclarecimentos || '',
    valorEstimado: oportunidade?.valorEstimado || 0,
    nomeInstituicao: oportunidade?.nomeInstituicao || '',
    enderecoInstituicao: oportunidade?.enderecoInstituicao || '',
    responsavelLicitacao: oportunidade?.responsavelLicitacao || '',
    telefoneContato: oportunidade?.telefoneContato || '',
    emailContato: oportunidade?.emailContato || '',
    situacaoPregao: oportunidade?.situacaoPregao || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    analiseTecnica: oportunidade?.analiseTecnica || '',
    impugnacaoEdital: oportunidade?.impugnacaoEdital || '',
    estrategiaComercial: oportunidade?.estrategiaComercial || '',
    valorEntrada: oportunidade?.valorEntrada || 0,
    valorMinimoFinal: oportunidade?.valorMinimoFinal || 0,
    estrategiaValorFinal: oportunidade?.estrategiaValorFinal || 0,
    observacoes: oportunidade?.observacoes || '',
    
    // Organização
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    statusLicitacao: oportunidade?.statusLicitacao || 'em_andamento',
    descricao: oportunidade?.descricao || '',
    dataVisita: oportunidade?.dataVisita || '',
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Modalidade
    modalidade: 'licitacao'
  });

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      
      // Verificar se status foi alterado para "ganho"
      if (field === 'statusLicitacao' && value === 'ganho') {
        // Mostrar toast de confirmação
        toast.success("Licitação ganha! Será criada automaticamente uma entrada no Comercial Administrativo.", {
          duration: 4000,
        });
      }
      
      return newData;
    });
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      concorrentes,
      id: oportunidade?.id || Date.now(),
    };
    
    // Se status for "ganho", marcar para conversão automática
    if (formData.statusLicitacao === 'ganho') {
      dataToSave.status = 'convertida';
      dataToSave.autoConvert = true;
    }
    
    onSave(dataToSave);
    onClose();
  };

  const adicionarConcorrente = () => {
    setConcorrentes([...concorrentes, { 
      nome: '', 
      produto: '', 
      preco: 0 
    }]);
  };

  const removerConcorrente = (index: number) => {
    setConcorrentes(concorrentes.filter((_, i) => i !== index));
  };

  const atualizarConcorrente = (index: number, campo: string, valor: any) => {
    const novosConcorrentes = [...concorrentes];
    novosConcorrentes[index] = { ...novosConcorrentes[index], [campo]: valor };
    setConcorrentes(novosConcorrentes);
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'bg-red-500';
    if (valor < 60) return 'bg-yellow-500';
    if (valor < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
            </span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="licitantes" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Licitantes
            </TabsTrigger>
            <TabsTrigger value="historico-chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Histórico/Chat
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dados-gerais" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dados do Cliente */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                      <Input
                        id="cpfCnpj"
                        value={formData.cpfCnpj}
                        onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                        placeholder="Digite o CPF ou CNPJ"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                      <Input
                        id="nomeFantasia"
                        value={formData.nomeFantasia}
                        onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                        placeholder="Digite o nome"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="razaoSocial">Razão Social</Label>
                    <Input
                      id="razaoSocial"
                      value={formData.razaoSocial}
                      onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                      placeholder="Digite a razão social"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="endereco">Endereço do Cliente</Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => handleInputChange('endereco', e.target.value)}
                        placeholder="Digite o endereço"
                      />
                    </div>
                    <div>
                      <Label htmlFor="uf">UF</Label>
                      <Select value={formData.uf} onValueChange={(value) => handleInputChange('uf', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="RS">RS</SelectItem>
                          <SelectItem value="PR">PR</SelectItem>
                          <SelectItem value="SC">SC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Digite o e-mail"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        placeholder="Digite o telefone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="Digite o website"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ativo"
                      checked={formData.ativo}
                      onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                    />
                    <Label htmlFor="ativo">Cliente Ativo</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Dados da Licitação */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Licitação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numeroPregao">Número do Pregão *</Label>
                      <Input
                        id="numeroPregao"
                        value={formData.numeroPregao}
                        onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                        placeholder="Digite o número do pregão"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tipoLicitacao">Tipo de Licitação</Label>
                      <Select value={formData.tipoLicitacao} onValueChange={(value) => handleInputChange('tipoLicitacao', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pregao_eletronico">Pregão Eletrônico</SelectItem>
                          <SelectItem value="pregao_presencial">Pregão Presencial</SelectItem>
                          <SelectItem value="concorrencia">Concorrência</SelectItem>
                          <SelectItem value="tomada_precos">Tomada de Preços</SelectItem>
                          <SelectItem value="convite">Convite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
                    <Textarea
                      id="objetoLicitacao"
                      value={formData.objetoLicitacao}
                      onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                      placeholder="Descreva o objeto da licitação"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="modalidadeLicitacao">Modalidade</Label>
                      <Select value={formData.modalidadeLicitacao} onValueChange={(value) => handleInputChange('modalidadeLicitacao', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menor_preco">Menor Preço</SelectItem>
                          <SelectItem value="melhor_tecnica">Melhor Técnica</SelectItem>
                          <SelectItem value="tecnica_preco">Técnica e Preço</SelectItem>
                          <SelectItem value="maior_desconto">Maior Desconto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="regimeExecucao">Regime de Execução</Label>
                      <Select value={formData.regimeExecucao} onValueChange={(value) => handleInputChange('regimeExecucao', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empreitada_global">Empreitada por Preço Global</SelectItem>
                          <SelectItem value="empreitada_unitario">Empreitada por Preço Unitário</SelectItem>
                          <SelectItem value="tarefa">Tarefa</SelectItem>
                          <SelectItem value="administracao_direta">Administração Direta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="criterioJulgamento">Critério de Julgamento</Label>
                      <Select value={formData.criterioJulgamento} onValueChange={(value) => handleInputChange('criterioJulgamento', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menor_preco">Menor Preço</SelectItem>
                          <SelectItem value="melhor_tecnica">Melhor Técnica</SelectItem>
                          <SelectItem value="tecnica_preco">Técnica e Preço</SelectItem>
                          <SelectItem value="maior_desconto">Maior Desconto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="valorEstimado">Valor Estimado</Label>
                      <Input
                        id="valorEstimado"
                        type="number"
                        value={formData.valorEstimado}
                        onChange={(e) => handleInputChange('valorEstimado', parseFloat(e.target.value) || 0)}
                        placeholder="Digite o valor estimado"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dataAbertura">Data de Abertura</Label>
                      <Input
                        id="dataAbertura"
                        type="date"
                        value={formData.dataAbertura}
                        onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataLimiteImpugnacao">Limite Impugnação</Label>
                      <Input
                        id="dataLimiteImpugnacao"
                        type="date"
                        value={formData.dataLimiteImpugnacao}
                        onChange={(e) => handleInputChange('dataLimiteImpugnacao', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataLimitePedidoEsclarecimentos">Limite Esclarecimentos</Label>
                      <Input
                        id="dataLimitePedidoEsclarecimentos"
                        type="date"
                        value={formData.dataLimitePedidoEsclarecimentos}
                        onChange={(e) => handleInputChange('dataLimitePedidoEsclarecimentos', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="situacaoPregao">Situação do Pregão</Label>
                    <Select value={formData.situacaoPregao} onValueChange={(value) => handleInputChange('situacaoPregao', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a situação atual" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operacao">Em Operação</SelectItem>
                        <SelectItem value="etapa_lances">Etapa de Lances</SelectItem>
                        <SelectItem value="visualizacao_propostas">Visualização de Propostas</SelectItem>
                        <SelectItem value="aceitacao_propostas">Aceitação de Propostas</SelectItem>
                        <SelectItem value="habilitacao">Habilitação de Fornecedores</SelectItem>
                        <SelectItem value="negociacao_preco">Negociação de Preço</SelectItem>
                        <SelectItem value="recurso">Recursos</SelectItem>
                        <SelectItem value="juizo_admissibilidade">Juízo de Admissibilidade</SelectItem>
                        <SelectItem value="homologado">Homologação</SelectItem>
                        <SelectItem value="adjudicacao">Adjudicação</SelectItem>
                        <SelectItem value="empenho">Empenho</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Instituição Responsável */}
              <Card>
                <CardHeader>
                  <CardTitle>Instituição Responsável</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
                    <Input
                      id="nomeInstituicao"
                      value={formData.nomeInstituicao}
                      onChange={(e) => handleInputChange('nomeInstituicao', e.target.value)}
                      placeholder="Digite o nome da instituição"
                    />
                  </div>

                  <div>
                    <Label htmlFor="enderecoInstituicao">Endereço da Instituição</Label>
                    <Input
                      id="enderecoInstituicao"
                      value={formData.enderecoInstituicao}
                      onChange={(e) => handleInputChange('enderecoInstituicao', e.target.value)}
                      placeholder="Digite o endereço"
                    />
                  </div>

                  <div>
                    <Label htmlFor="responsavelLicitacao">Responsável pela Licitação</Label>
                    <Input
                      id="responsavelLicitacao"
                      value={formData.responsavelLicitacao}
                      onChange={(e) => handleInputChange('responsavelLicitacao', e.target.value)}
                      placeholder="Digite o nome do responsável"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefoneContato">Telefone de Contato</Label>
                      <Input
                        id="telefoneContato"
                        value={formData.telefoneContato}
                        onChange={(e) => handleInputChange('telefoneContato', e.target.value)}
                        placeholder="Digite o telefone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailContato">E-mail de Contato</Label>
                      <Input
                        id="emailContato"
                        type="email"
                        value={formData.emailContato}
                        onChange={(e) => handleInputChange('emailContato', e.target.value)}
                        placeholder="Digite o e-mail"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumo e Análise */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo e Análise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                    <Textarea
                      id="resumoEdital"
                      value={formData.resumoEdital}
                      onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                      placeholder="Resumo executivo do edital"
                      rows={4}
                    />
                  </div>

                  {/* Novo campo de resumo técnico */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Resumo da Área Técnica</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Este campo contém o resumo das definições e recomendações da área técnica para esta licitação.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="analiseTecnica">Análise Técnica</Label>
                    <Textarea
                      id="analiseTecnica"
                      value={formData.analiseTecnica}
                      onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                      placeholder="Análise técnica detalhada"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="impugnacaoEdital">Impugnação do Edital</Label>
                    <Textarea
                      id="impugnacaoEdital"
                      value={formData.impugnacaoEdital}
                      onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
                      placeholder="Detalhes sobre impugnações"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Análise de Estratégia */}
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Estratégia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="estrategiaComercial">Estratégia Comercial</Label>
                    <Textarea
                      id="estrategiaComercial"
                      value={formData.estrategiaComercial}
                      onChange={(e) => handleInputChange('estrategiaComercial', e.target.value)}
                      placeholder="Descreva a estratégia comercial"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valorEntrada">Valor para Entrada</Label>
                      <Input
                        id="valorEntrada"
                        type="number"
                        value={formData.valorEntrada}
                        onChange={(e) => handleInputChange('valorEntrada', parseFloat(e.target.value) || 0)}
                        placeholder="Valor inicial"
                      />
                    </div>
                    <div>
                      <Label htmlFor="valorMinimoFinal">Valor Mínimo Final</Label>
                      <Input
                        id="valorMinimoFinal"
                        type="number"
                        value={formData.valorMinimoFinal}
                        onChange={(e) => handleInputChange('valorMinimoFinal', parseFloat(e.target.value) || 0)}
                        placeholder="Valor mínimo"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="estrategiaValorFinal">Estratégia - Valor Final</Label>
                    <Input
                      id="estrategiaValorFinal"
                      type="number"
                      value={formData.estrategiaValorFinal}
                      onChange={(e) => handleInputChange('estrategiaValorFinal', parseFloat(e.target.value) || 0)}
                      placeholder="Digite o valor final da estratégia"
                    />
                  </div>

                  <div>
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange('observacoes', e.target.value)}
                      placeholder="Observações gerais"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Análise da Concorrência e Organização */}
              <Card>
                <CardHeader>
                  <CardTitle>Análise da Concorrência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {concorrentes.map((concorrente, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">Concorrente {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removerConcorrente(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Nome do concorrente"
                            value={concorrente.nome}
                            onChange={(e) => atualizarConcorrente(index, 'nome', e.target.value)}
                          />
                          <Input
                            placeholder="Produto do concorrente"
                            value={concorrente.produto}
                            onChange={(e) => atualizarConcorrente(index, 'produto', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Preço praticado"
                            value={concorrente.preco}
                            onChange={(e) => atualizarConcorrente(index, 'preco', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={adicionarConcorrente}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="Digite as tags separadas por vírgula"
                      />
                    </div>

                    <div>
                      <Label htmlFor="caracteristicas">Características</Label>
                      <Textarea
                        id="caracteristicas"
                        value={formData.caracteristicas}
                        onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                        placeholder="Descreva as características"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        placeholder="Descrição geral da licitação"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dataVisita">Data da Visita</Label>
                      <Input
                        id="dataVisita"
                        type="date"
                        value={formData.dataVisita}
                        onChange={(e) => handleInputChange('dataVisita', e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="propostaNegociacao"
                        checked={formData.propostaNegociacao}
                        onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
                      />
                      <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
                    </div>

                    <div>
                      <Label htmlFor="termometro" className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        Termômetro: {formData.termometro}°
                      </Label>
                      <div className="mt-2">
                        <input
                          type="range"
                          id="termometro"
                          min="0"
                          max="100"
                          value={formData.termometro}
                          onChange={(e) => handleInputChange('termometro', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0°</span>
                          <span>50°</span>
                          <span>100°</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div 
                          className={`w-4 h-4 rounded-full ${getTermometroColor(formData.termometro)}`}
                          title={`Termômetro: ${formData.termometro}°`}
                        />
                        <span className="text-sm text-gray-600">
                          {formData.termometro < 30 ? 'Frio' : 
                           formData.termometro < 60 ? 'Morno' : 
                           formData.termometro < 80 ? 'Quente' : 'Muito Quente'}
                        </span>
                      </div>
                    </div>

                    {/* Status da Licitação - Movido para o final */}
                    <div>
                      <Label htmlFor="statusLicitacao">Status da Licitação</Label>
                      <Select value={formData.statusLicitacao} onValueChange={(value) => handleInputChange('statusLicitacao', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="fracassado">Fracassado</SelectItem>
                          <SelectItem value="suspenso">Suspenso</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                          <SelectItem value="ganho">Ganho</SelectItem>
                          <SelectItem value="perda">Perda</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.statusLicitacao === 'ganho' && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-700 font-medium">
                              Licitação Ganha - Será criado automaticamente no Comercial Administrativo
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="licitantes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Licitantes</CardTitle>
              </CardHeader>
              <CardContent>
                <TabelaLicitantes />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico-chat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico e Chat Interno</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                  <Button variant="outline">
                    Selecionar Arquivos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            {oportunidade ? 'Atualizar' : 'Salvar'} Licitação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeAvancadaForm;
