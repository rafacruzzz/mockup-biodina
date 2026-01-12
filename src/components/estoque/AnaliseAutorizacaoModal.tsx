import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  Lock, 
  FileText, 
  Truck, 
  Wallet, 
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  AlertTriangle
} from "lucide-react";
import { 
  PedidoAdministrativo, 
  ItemPedidoAdministrativo, 
  StatusPedidoAdministrativo,
  LoteAutorizado 
} from "@/types/estoque";
import { mockCNPJs, mockDepositos } from "@/data/estoqueModules";
import SelecionarLotesModal from "./SelecionarLotesModal";
import { toast } from "@/hooks/use-toast";

interface AnaliseAutorizacaoModalProps {
  pedido: PedidoAdministrativo;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ItemAutorizacaoState {
  quantidade_autorizada: number;
  unidade_origem: string;
  deposito_origem: string;
  lotes_autorizados: LoteAutorizado[];
  observacoes: string;
}

const AnaliseAutorizacaoModal = ({ pedido, isOpen, onOpenChange }: AnaliseAutorizacaoModalProps) => {
  const [observacoesAdm, setObservacoesAdm] = useState(pedido.observacoes_administrativas || "");
  const [justificativaRejeicao, setJustificativaRejeicao] = useState("");
  const [showRejeicaoModal, setShowRejeicaoModal] = useState(false);
  const [selectedItemForLotes, setSelectedItemForLotes] = useState<ItemPedidoAdministrativo | null>(null);
  const [showLotesModal, setShowLotesModal] = useState(false);
  
  const [itensAutorizacao, setItensAutorizacao] = useState<{[key: number]: ItemAutorizacaoState}>(() => {
    const initial: {[key: number]: ItemAutorizacaoState} = {};
    pedido.itens.forEach(item => {
      initial[item.id] = {
        quantidade_autorizada: item.quantidade_autorizada || item.quantidade_pedido,
        unidade_origem: item.unidade_origem || "",
        deposito_origem: item.deposito_origem || "",
        lotes_autorizados: item.lotes_autorizados || [],
        observacoes: item.observacoes_item || ""
      };
    });
    return initial;
  });

  const isReadOnly = pedido.status !== StatusPedidoAdministrativo.PENDENTE_ANALISE;

  const handleAtualizarQuantidade = (itemId: number, quantidade: number) => {
    if (isReadOnly) return;
    setItensAutorizacao(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantidade_autorizada: quantidade }
    }));
  };

  const handleAtualizarUnidadeOrigem = (itemId: number, unidade: string) => {
    if (isReadOnly) return;
    setItensAutorizacao(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], unidade_origem: unidade, deposito_origem: "" }
    }));
  };

  const handleAtualizarDeposito = (itemId: number, deposito: string) => {
    if (isReadOnly) return;
    setItensAutorizacao(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], deposito_origem: deposito }
    }));
  };

  const handleSelecionarLotes = (item: ItemPedidoAdministrativo) => {
    if (isReadOnly) return;
    setSelectedItemForLotes(item);
    setShowLotesModal(true);
  };

  const handleLotesSelecionados = (lotes: LoteAutorizado[]) => {
    if (!selectedItemForLotes) return;
    setItensAutorizacao(prev => ({
      ...prev,
      [selectedItemForLotes.id]: { 
        ...prev[selectedItemForLotes.id], 
        lotes_autorizados: lotes 
      }
    }));
    setShowLotesModal(false);
  };

  const getDepositosPorCnpj = (cnpjCodigo: string) => {
    const cnpj = mockCNPJs.find(c => c.codigo === cnpjCodigo);
    if (!cnpj) return [];
    return mockDepositos.filter(d => d.cnpj_id === cnpj.id);
  };

  const handleAutorizar = () => {
    // Validar se todos os itens têm unidade de origem
    const itensInvalidos = pedido.itens.filter(item => {
      const estado = itensAutorizacao[item.id];
      return !estado.unidade_origem || estado.quantidade_autorizada <= 0;
    });

    if (itensInvalidos.length > 0) {
      toast({
        title: "Validação",
        description: "Todos os itens devem ter uma unidade de origem e quantidade autorizada.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pedido Autorizado",
      description: `Pedido ${pedido.numero_pedido} foi autorizado e encaminhado para separação.`
    });
    onOpenChange(false);
  };

  const handleRejeitar = () => {
    if (!justificativaRejeicao.trim()) {
      toast({
        title: "Justificativa Obrigatória",
        description: "Informe o motivo da rejeição do pedido.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pedido Rejeitado",
      description: `Pedido ${pedido.numero_pedido} foi rejeitado e devolvido ao comercial.`
    });
    setShowRejeicaoModal(false);
    onOpenChange(false);
  };

  const getValidadeFormatada = (lotes: LoteAutorizado[]) => {
    if (!lotes || lotes.length === 0) return "Não definida";
    // Retorna a menor validade entre os lotes
    const menorValidade = lotes.reduce((min, lote) => {
      return lote.validade < min ? lote.validade : min;
    }, lotes[0].validade);
    return new Date(menorValidade).toLocaleDateString('pt-BR');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-biodina-blue flex items-center gap-3">
              Análise do Pedido {pedido.numero_pedido}
              {isReadOnly && (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                  <Lock className="h-3 w-3 mr-1" />
                  Somente Leitura
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="flex w-full overflow-x-auto mb-6">
              <TabsTrigger value="geral" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="produtos" className="min-w-fit whitespace-nowrap">
                Produtos
              </TabsTrigger>
              <TabsTrigger value="informacoes-nf" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Informações NF
              </TabsTrigger>
              <TabsTrigger value="frete" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Frete
              </TabsTrigger>
              <TabsTrigger value="pagamento" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Pagamento
              </TabsTrigger>
              <TabsTrigger value="acompanhamento" className="min-w-fit whitespace-nowrap flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Acompanhamento
              </TabsTrigger>
            </TabsList>

            {/* Aba Geral (BLOQUEADA) */}
            <TabsContent value="geral" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Informações do Pedido
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Código do Pedido</Label>
                    <Input value={pedido.numero_pedido} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Cliente</Label>
                    <Input value={pedido.cliente} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Vendedor</Label>
                    <Input value={pedido.vendedor} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Data do Pedido</Label>
                    <Input 
                      value={new Date(pedido.data_pedido).toLocaleDateString('pt-BR')} 
                      disabled 
                      className="bg-muted" 
                    />
                  </div>
                  <div>
                    <Label>Estado do Cliente</Label>
                    <Input value={pedido.cliente_estado || "N/A"} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>NOP</Label>
                    <Input value={pedido.nop || "N/A"} disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Observações do Comercial</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={pedido.observacoes_comercial || 'Sem observações'}
                    disabled
                    className="bg-muted"
                    rows={3}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Observações Administrativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={observacoesAdm}
                    onChange={(e) => setObservacoesAdm(e.target.value)}
                    disabled={isReadOnly}
                    className={isReadOnly ? "bg-muted" : ""}
                    rows={3}
                    placeholder="Adicione observações sobre a análise deste pedido..."
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Produtos (EDITÁVEL) */}
            <TabsContent value="produtos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Produtos do Pedido - Autorização</span>
                    {!isReadOnly && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Defina a quantidade e origem para cada item
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Un.</TableHead>
                          <TableHead>Est. Disp.</TableHead>
                          <TableHead>Val. Mín. Exigida</TableHead>
                          <TableHead>Qtd. Pedido</TableHead>
                          <TableHead>Qtd. a Autorizar</TableHead>
                          <TableHead>Unidade Origem</TableHead>
                          <TableHead>Depósito</TableHead>
                          <TableHead>Lotes</TableHead>
                          <TableHead>Val. Autorizada</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pedido.itens.map((item) => {
                          const estado = itensAutorizacao[item.id];
                          const depositos = getDepositosPorCnpj(estado?.unidade_origem || "");

                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.codigo_produto}</TableCell>
                              <TableCell>
                                <div className="max-w-[180px]">
                                  <p className="truncate">{item.descricao_produto}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{item.unidade}</Badge>
                              </TableCell>
                              <TableCell>
                                <span className="text-green-600 font-medium">{item.estoque_disponivel}</span>
                              </TableCell>
                              <TableCell>
                                {item.validade_minima_exigida ? (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(item.validade_minima_exigida).toLocaleDateString('pt-BR')}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">N/A</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-biodina-gold text-white">
                                  {item.quantidade_pedido}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min="0"
                                  max={item.quantidade_pedido}
                                  value={estado?.quantidade_autorizada || 0}
                                  onChange={(e) => handleAtualizarQuantidade(item.id, parseInt(e.target.value) || 0)}
                                  disabled={isReadOnly}
                                  className={`w-20 ${isReadOnly ? 'bg-muted' : ''}`}
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={estado?.unidade_origem || ""}
                                  onValueChange={(value) => handleAtualizarUnidadeOrigem(item.id, value)}
                                  disabled={isReadOnly}
                                >
                                  <SelectTrigger className={`w-[180px] ${isReadOnly ? 'bg-muted' : ''}`}>
                                    <SelectValue placeholder="Selecionar..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockCNPJs.map((cnpj) => (
                                      <SelectItem key={cnpj.id} value={cnpj.codigo}>
                                        {cnpj.nome} ({cnpj.estado})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={estado?.deposito_origem || ""}
                                  onValueChange={(value) => handleAtualizarDeposito(item.id, value)}
                                  disabled={isReadOnly || !estado?.unidade_origem}
                                >
                                  <SelectTrigger className={`w-[160px] ${isReadOnly ? 'bg-muted' : ''}`}>
                                    <SelectValue placeholder="Depósito..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {depositos.map((dep) => (
                                      <SelectItem key={dep.id} value={dep.nome}>
                                        {dep.nome}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSelecionarLotes(item)}
                                  disabled={isReadOnly}
                                >
                                  {estado?.lotes_autorizados?.length 
                                    ? `${estado.lotes_autorizados.length} lote(s)` 
                                    : "Selecionar"}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">
                                  {getValidadeFormatada(estado?.lotes_autorizados || [])}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Informações NF (BLOQUEADA) */}
            <TabsContent value="informacoes-nf" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Configurações de Estoque
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Validade Mínima Global</Label>
                    <Input 
                      value={pedido.validade_minima_global 
                        ? new Date(pedido.validade_minima_global).toLocaleDateString('pt-BR')
                        : 'Não definida'
                      } 
                      disabled 
                      className="bg-muted" 
                    />
                  </div>
                  <div>
                    <Label>Previsão de Consumo</Label>
                    <Input value="30 dias" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Tem Validade Mínima</Label>
                    <Input value={pedido.validade_minima_global ? "Sim" : "Não"} disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Complementares</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value="Informações adicionais da NF serão preenchidas automaticamente."
                    disabled
                    className="bg-muted"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Frete (BLOQUEADA) */}
            <TabsContent value="frete" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Informações de Frete
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Tipo de Frete</Label>
                    <Input value="CIF" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Transportadora</Label>
                    <Input value={pedido.transportadora || "A definir"} disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Prazo de Entrega</Label>
                    <Input value="5 dias úteis" disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label>Endereço Completo</Label>
                      <Input 
                        value={pedido.endereco_cliente || "Endereço não informado"} 
                        disabled 
                        className="bg-muted" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Pagamento (BLOQUEADA) */}
            <TabsContent value="pagamento" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Condições de Pagamento
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Forma de Pagamento</Label>
                    <Input value="Boleto Bancário" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Condição</Label>
                    <Input value="30/60/90 dias" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label>Conta Bancária</Label>
                    <Input value="Banco do Brasil - Ag 1234" disabled className="bg-muted" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Acompanhamento (BLOQUEADA) */}
            <TabsContent value="acompanhamento" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline do Pedido
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50">
                      <Lock className="h-3 w-3 mr-1" />
                      Somente Leitura
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Pedido Criado</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(pedido.data_pedido).toLocaleDateString('pt-BR')} - Por {pedido.vendedor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Aguardando Análise Administrativa</p>
                        <p className="text-sm text-muted-foreground">Status atual</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer com ações */}
          {!isReadOnly && (
            <DialogFooter className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button variant="outline" onClick={() => toast({ title: "Rascunho Salvo" })}>
                Salvar Rascunho
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setShowRejeicaoModal(true)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Rejeitar Pedido
              </Button>
              <Button 
                onClick={handleAutorizar}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Autorizar Pedido
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Rejeição */}
      <Dialog open={showRejeicaoModal} onOpenChange={setShowRejeicaoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Rejeitar Pedido
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Informe o motivo da rejeição. O pedido será devolvido ao comercial.
            </p>
            <Textarea
              value={justificativaRejeicao}
              onChange={(e) => setJustificativaRejeicao(e.target.value)}
              placeholder="Justificativa obrigatória..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejeicaoModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRejeitar}>
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Seleção de Lotes */}
      {selectedItemForLotes && (
        <SelecionarLotesModal
          isOpen={showLotesModal}
          onOpenChange={setShowLotesModal}
          item={selectedItemForLotes}
          lotesJaSelecionados={itensAutorizacao[selectedItemForLotes.id]?.lotes_autorizados || []}
          onConfirmar={handleLotesSelecionados}
        />
      )}
    </>
  );
};

export default AnaliseAutorizacaoModal;
