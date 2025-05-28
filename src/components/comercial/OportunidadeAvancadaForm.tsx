
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
    // Triagem
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nome: oportunidade?.nome || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    fonteLead: oportunidade?.fonteLead || '',
    ativo: oportunidade?.ativo || true,
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    produtosServicos: oportunidade?.produtosServicos || [],
    valorNegocio: oportunidade?.valorNegocio || 0,
    metodoContato: oportunidade?.metodoContato || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || [],
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || 'em_triagem',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    dataVisita: oportunidade?.dataVisita || '',
    termometro: oportunidade?.termometro || 50,
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    chaveLicitacao: oportunidade?.chaveLicitacao || '',
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    // Geral
    cliente: oportunidade?.cliente || '',
    representanteComercial: oportunidade?.representanteComercial || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    fornecedor: oportunidade?.fornecedor || '',
    tipoAplicacao: oportunidade?.tipoAplicacao || 'venda',
    tipoOportunidadeGeral: oportunidade?.tipoOportunidadeGeral || 'pontual',
    dataAbertura: oportunidade?.dataAbertura || '',
    dataContato: oportunidade?.dataContato || '',
    valorProposta: oportunidade?.valorProposta || 0
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
    setFormData({...formData, cliente: value});
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="triagem">Triagem</TabsTrigger>
                <TabsTrigger value="analise">Análise Técnica</TabsTrigger>
                <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="triagem" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                      <Input
                        id="cpfCnpj"
                        value={formData.cpfCnpj}
                        onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleClienteChange(e.target.value)}
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
                      />
                    </div>

                    <div>
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="uf">UF</Label>
                      <Select value={formData.uf} onValueChange={(value) => setFormData({...formData, uf: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="chaveLicitacao">Chave da Licitação</Label>
                      <Input
                        id="chaveLicitacao"
                        value={formData.chaveLicitacao}
                        onChange={(e) => handleChaveLicitacaoChange(e.target.value)}
                        placeholder="Digite a chave da licitação"
                      />
                      {formData.chaveLicitacao && formData.chaveLicitacao !== '123' && (
                        <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Nenhuma licitação anterior
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fonteLead">Fonte do Lead</Label>
                      <Select value={formData.fonteLead} onValueChange={(value) => setFormData({...formData, fonteLead: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="site">Site</SelectItem>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="parceiro">Parceiro</SelectItem>
                          <SelectItem value="indicacao">Indicação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ativo" 
                        checked={formData.ativo}
                        onCheckedChange={(checked) => setFormData({...formData, ativo: checked as boolean})}
                      />
                      <Label htmlFor="ativo">Ativo</Label>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valorNegocio">Valor do Negócio (R$)</Label>
                      <Input
                        id="valorNegocio"
                        type="number"
                        value={formData.valorNegocio}
                        onChange={(e) => setFormData({...formData, valorNegocio: Number(e.target.value)})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_triagem">Em Triagem</SelectItem>
                          <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                          <SelectItem value="encerrada">Encerrada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
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
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                      rows={3}
                    />
                  </div>

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

              <TabsContent value="geral" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input
                        id="cliente"
                        value={formData.cliente}
                        onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="representanteComercial">Representante Comercial</Label>
                      <Input
                        id="representanteComercial"
                        value={formData.representanteComercial}
                        onChange={(e) => setFormData({...formData, representanteComercial: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="familiaComercial">Família Comercial</Label>
                      <Input
                        id="familiaComercial"
                        value={formData.familiaComercial}
                        onChange={(e) => setFormData({...formData, familiaComercial: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fornecedor">Fornecedor</Label>
                      <Input
                        id="fornecedor"
                        value={formData.fornecedor}
                        onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tipoAplicacao">Tipo da Aplicação</Label>
                      <Select value={formData.tipoAplicacao} onValueChange={(value) => setFormData({...formData, tipoAplicacao: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venda">Venda</SelectItem>
                          <SelectItem value="locacao">Locação</SelectItem>
                          <SelectItem value="servico">Serviço</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tipoOportunidadeGeral">Tipo de Oportunidade</Label>
                      <Select value={formData.tipoOportunidadeGeral} onValueChange={(value) => setFormData({...formData, tipoOportunidadeGeral: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pontual">Pontual</SelectItem>
                          <SelectItem value="periodica">Periódica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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
                </div>

                <div>
                  <Label htmlFor="valorProposta">Valor da Proposta (R$)</Label>
                  <Input
                    id="valorProposta"
                    type="number"
                    value={formData.valorProposta}
                    onChange={(e) => setFormData({...formData, valorProposta: Number(e.target.value)})}
                  />
                </div>
              </TabsContent>

              <TabsContent value="documentos" className="mt-6">
                <div className="space-y-6">
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
