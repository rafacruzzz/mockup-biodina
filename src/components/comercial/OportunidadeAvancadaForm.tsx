import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Save, Plus, Edit, Upload, Download, Eye, Lock, CheckCircle, ChevronRight, Calendar, AlertTriangle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TabelaLicitantes from "../licitacao/TabelaLicitantes";
import ConcorrenteModal from "./ConcorrenteModal";
import ChatInterno from "./ChatInterno";
import PedidoForm from "./PedidoForm";

interface OportunidadeAvancadaFormProps {
  oportunidadeId?: number;
  oportunidade?: any;
  onClose?: () => void;
  onSave?: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidadeId, oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState("detalhes");
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [concorrentes, setConcorrentes] = useState([
    { id: 1, nome: "Concorrente A", preco: 1500, pontosFortes: "Qualidade", pontosFracos: "Preço" },
    { id: 2, nome: "Concorrente B", preco: 1400, pontosFortes: "Preço", pontosFracos: "Atendimento" },
  ]);
  const [licitantes, setLicitantes] = useState([
    { 
      id: 1, 
      licitacaoId: 1, 
      empresa: "Empresa A", 
      cnpj: "12.345.678/0001-90", 
      marca: "Marca X", 
      modelo: "Modelo Y", 
      valorEntrada: 1200, 
      valorFinal: 1100, 
      status: "habilitado" as const, 
      ranking: 1 
    },
    { 
      id: 2, 
      licitacaoId: 1, 
      empresa: "Empresa B", 
      cnpj: "98.765.432/0001-09", 
      marca: "Marca Z", 
      modelo: "Modelo W", 
      valorEntrada: 1300, 
      valorFinal: 1200, 
      status: "inabilitado" as const, 
      ranking: 2 
    }
  ]);
  const [produtos, setProdutos] = useState([
    { id: 1, licitanteId: 1, codigo: "PROD001", descricao: "Produto 1", marca: "Marca X", modelo: "Modelo Y", quantidade: 2, valorUnitario: 550, valorTotal: 1100, especificacoes: "Especificações do produto 1" },
    { id: 2, licitanteId: 2, codigo: "PROD002", descricao: "Produto 2", marca: "Marca Z", modelo: "Modelo W", quantidade: 1, valorUnitario: 1200, valorTotal: 1200, especificacoes: "Especificações do produto 2" }
  ]);

  const [detalhesForm, setDetalhesForm] = useState({
    nomeOportunidade: "Oportunidade Teste",
    cliente: "Cliente ABC",
    dataIdentificacao: "2024-01-01",
    probabilidade: 75,
    valorEstimado: 50000,
    status: "em_analise",
    segmento: "Governo",
    fonte: "Indicação",
    etapaVenda: "Qualificação",
    dataFechamento: "2024-03-31",
    prioridade: "alta",
    tipoContrato: "Compra",
    consultorResponsavel: "João da Silva",
    descricaoDetalhada: "Descrição detalhada da oportunidade...",
    observacoesInternas: "Observações internas relevantes...",
    termosCondicoes: "Termos e condições da proposta...",
  });

  const statusOptions = [
    { value: "em_analise", label: "Em Análise" },
    { value: "qualificacao", label: "Qualificação" },
    { value: "proposta", label: "Proposta" },
    { value: "negociacao", label: "Negociação" },
    { value: "ganho", label: "Ganho" },
    { value: "perda", label: "Perda" },
    { value: "cancelada", label: "Cancelada" },
  ];

  const effectiveId = oportunidadeId || oportunidade?.id || 1;

  const handleConcorrentesChange = (newConcorrentes: any[]) => {
    setConcorrentes(prev => [...prev, ...newConcorrentes]);
  };

  const handleLicitantesChange = (newLicitantes: any[]) => {
    setLicitantes(newLicitantes);
  };

  const handleProdutosChange = (newProdutos: any[]) => {
    setProdutos(newProdutos);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...detalhesForm,
        concorrentes,
        licitantes,
        produtos
      });
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Oportunidade #{effectiveId}</CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="detalhes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="licitacao">Licitação</TabsTrigger>
              <TabsTrigger value="concorrentes">Concorrentes</TabsTrigger>
              <TabsTrigger value="chat">Chat Interno</TabsTrigger>
              <TabsTrigger value="pedido">Pedido</TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes">
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeOportunidade">Nome da Oportunidade</Label>
                  <Input
                    id="nomeOportunidade"
                    value={detalhesForm.nomeOportunidade}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, nomeOportunidade: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    value={detalhesForm.cliente}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, cliente: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dataIdentificacao">Data de Identificação</Label>
                  <Input
                    type="date"
                    id="dataIdentificacao"
                    value={detalhesForm.dataIdentificacao}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, dataIdentificacao: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="probabilidade">Probabilidade (%)</Label>
                  <Slider
                    defaultValue={[detalhesForm.probabilidade]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setDetalhesForm({ ...detalhesForm, probabilidade: value[0] })}
                  />
                  <p className="text-sm text-gray-500">
                    {detalhesForm.probabilidade}%
                  </p>
                </div>
                <div>
                  <Label htmlFor="valorEstimado">Valor Estimado</Label>
                  <Input
                    type="number"
                    id="valorEstimado"
                    value={detalhesForm.valorEstimado}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, valorEstimado: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={detalhesForm.status} onValueChange={(value) => setDetalhesForm({ ...detalhesForm, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="segmento">Segmento</Label>
                  <Input
                    id="segmento"
                    value={detalhesForm.segmento}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, segmento: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="fonte">Fonte</Label>
                  <Input
                    id="fonte"
                    value={detalhesForm.fonte}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, fonte: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="etapaVenda">Etapa de Venda</Label>
                  <Input
                    id="etapaVenda"
                    value={detalhesForm.etapaVenda}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, etapaVenda: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dataFechamento">Data de Fechamento</Label>
                  <Input
                    type="date"
                    id="dataFechamento"
                    value={detalhesForm.dataFechamento}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, dataFechamento: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select value={detalhesForm.prioridade} onValueChange={(value) => setDetalhesForm({ ...detalhesForm, prioridade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
                  <Input
                    id="tipoContrato"
                    value={detalhesForm.tipoContrato}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, tipoContrato: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="consultorResponsavel">Consultor Responsável</Label>
                  <Input
                    id="consultorResponsavel"
                    value={detalhesForm.consultorResponsavel}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, consultorResponsavel: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="descricaoDetalhada">Descrição Detalhada</Label>
                  <Textarea
                    id="descricaoDetalhada"
                    value={detalhesForm.descricaoDetalhada}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, descricaoDetalhada: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="observacoesInternas">Observações Internas</Label>
                  <Textarea
                    id="observacoesInternas"
                    value={detalhesForm.observacoesInternas}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, observacoesInternas: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="termosCondicoes">Termos e Condições</Label>
                  <Textarea
                    id="termosCondicoes"
                    value={detalhesForm.termosCondicoes}
                    onChange={(e) => setDetalhesForm({ ...detalhesForm, termosCondicoes: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
              <Button onClick={handleSave}>Salvar Detalhes</Button>
            </TabsContent>

            <TabsContent value="licitacao">
              <TabelaLicitantes 
                licitacaoId={effectiveId}
                licitantes={licitantes}
                produtos={produtos}
                onLicitantesChange={handleLicitantesChange}
                onProdutosChange={handleProdutosChange}
              />
            </TabsContent>

            <TabsContent value="concorrentes">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Concorrentes</h2>
                  <Button onClick={() => setShowConcorrenteModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Concorrente
                  </Button>
                </div>
                <ConcorrenteModal
                  isOpen={showConcorrenteModal}
                  onOpenChange={setShowConcorrenteModal}
                  onConcorrentesChange={handleConcorrentesChange}
                  valorReferencia={detalhesForm.valorEstimado}
                />
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Pontos Fortes</TableHead>
                        <TableHead>Pontos Fracos</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {concorrentes.map((concorrente) => (
                        <TableRow key={concorrente.id}>
                          <TableCell className="font-medium">{concorrente.nome}</TableCell>
                          <TableCell>{concorrente.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                          <TableCell>{concorrente.pontosFortes}</TableCell>
                          <TableCell>{concorrente.pontosFracos}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <ChatInterno oportunidadeId={effectiveId} />
            </TabsContent>

            <TabsContent value="pedido">
              <PedidoForm 
                oportunidade={{ 
                  id: effectiveId, 
                  ...detalhesForm,
                  concorrentes,
                  licitantes,
                  produtos 
                }} 
                onClose={handleClose}
                onSave={handleSave}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OportunidadeAvancadaForm;
