import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, ShoppingCart, Package, FileText, Truck, BarChart } from "lucide-react";
import { ProdutoPedido, PedidoEmprestimo } from "@/types/comercial";
import { toast } from "sonner";

// Importar os componentes das abas do PedidoModal (vamos reutilizá-los)
import AdicionarProdutoModal from "./AdicionarProdutoModal";
import AcompanhamentoPedidoTab from "./components/AcompanhamentoPedidoTab";

interface PedidoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pedido: PedidoEmprestimo) => void;
  pedidoInicial?: PedidoEmprestimo | null;
  dadosEmprestimo: {
    numeroProcesso: string;
    cliente: string;
    cnpj: string;
    moeda: 'BRL' | 'USD';
  };
}

const PedidoEmprestimoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  pedidoInicial,
  dadosEmprestimo 
}: PedidoEmprestimoModalProps) => {
  const [activeTab, setActiveTab] = useState("geral");
  const [produtos, setProdutos] = useState<ProdutoPedido[]>(pedidoInicial?.produtos || []);
  const [isAdicionarProdutoOpen, setIsAdicionarProdutoOpen] = useState(false);

  // Estados Aba Geral
  const [observacoesGerais, setObservacoesGerais] = useState(pedidoInicial?.observacoesGerais || '');
  const [vendedor, setVendedor] = useState(pedidoInicial?.vendedor || 'Usuário Atual');

  // Estados Informações NF
  const [naturezaOperacao, setNaturezaOperacao] = useState(pedidoInicial?.naturezaOperacao || '');
  const [emailsNF, setEmailsNF] = useState(pedidoInicial?.emailsNF || '');
  const [formaPagamentoNF, setFormaPagamentoNF] = useState(pedidoInicial?.formaPagamentoNF || '');

  // Estados Frete
  const [tipoFrete, setTipoFrete] = useState(pedidoInicial?.tipoFrete || '');
  const [prazoEntrega, setPrazoEntrega] = useState(pedidoInicial?.prazoEntrega || '');
  const [enderecoEntrega, setEnderecoEntrega] = useState(pedidoInicial?.enderecoEntrega || '');

  const handleAdicionarProduto = (produto: ProdutoPedido) => {
    setProdutos(prev => [...prev, { ...produto, id: Date.now() }]);
    setIsAdicionarProdutoOpen(false);
  };

  const handleRemoverProduto = (id: number) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const calcularTotal = () => {
    return produtos.reduce((total, produto) => total + produto.precoFinal, 0);
  };

  const handleSalvarPedido = () => {
    if (produtos.length === 0) {
      toast.error("Adicione pelo menos um produto ao pedido");
      return;
    }

    const pedido: PedidoEmprestimo = {
      id: pedidoInicial?.id || Date.now(),
      numeroOportunidade: `EMP-${dadosEmprestimo.numeroProcesso}-${String(Date.now()).slice(-3)}`,
      cliente: dadosEmprestimo.cliente,
      vendedor,
      dataVenda: new Date().toISOString().split('T')[0],
      status: 'rascunho',
      produtos,
      valorTotal: calcularTotal(),
      observacoesGerais,
      naturezaOperacao,
      emailsNF,
      formaPagamentoNF,
      tipoFrete,
      prazoEntrega,
      enderecoEntrega,
      emprestimoId: dadosEmprestimo.numeroProcesso,
      projetoOrigem: dadosEmprestimo.numeroProcesso
    };

    onSave(pedido);
    toast.success(pedidoInicial ? "Pedido atualizado com sucesso!" : "Pedido criado com sucesso!");
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: dadosEmprestimo.moeda
    }).format(value);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {pedidoInicial ? 'Editar Pedido do Empréstimo' : 'Novo Pedido do Empréstimo'}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Empréstimo: {dadosEmprestimo.numeroProcesso} • Cliente: {dadosEmprestimo.cliente}
            </p>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="produtos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="informacoes-nf" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Informações NF
              </TabsTrigger>
              <TabsTrigger value="frete" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Frete
              </TabsTrigger>
              <TabsTrigger value="acompanhamento" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Acompanhamento
              </TabsTrigger>
            </TabsList>

            {/* Aba Geral */}
            <TabsContent value="geral" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Cliente</label>
                  <input 
                    type="text" 
                    value={dadosEmprestimo.cliente} 
                    disabled 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Vendedor</label>
                  <input 
                    type="text" 
                    value={vendedor}
                    onChange={(e) => setVendedor(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Observações Gerais</label>
                <textarea
                  value={observacoesGerais}
                  onChange={(e) => setObservacoesGerais(e.target.value)}
                  placeholder="Observações sobre o pedido..."
                  rows={4}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
            </TabsContent>

            {/* Aba Produtos */}
            <TabsContent value="produtos" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Produtos do Pedido</h3>
                <Button onClick={() => setIsAdicionarProdutoOpen(true)}>
                  <Package className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>

              {produtos.length === 0 ? (
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhum produto adicionado</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsAdicionarProdutoOpen(true)}
                  >
                    Adicionar Primeiro Produto
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {produtos.map((produto) => (
                    <div key={produto.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{produto.descricao}</p>
                        <p className="text-sm text-muted-foreground">
                          Ref: {produto.referencia} • Qtd: {produto.quantidade} • {formatCurrency(produto.precoFinal)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoverProduto(produto.id)}
                        className="text-red-600"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                  <div className="border-t pt-4 flex justify-between items-center font-bold">
                    <span>Total do Pedido:</span>
                    <span className="text-xl text-biodina-blue">{formatCurrency(calcularTotal())}</span>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Aba Informações NF */}
            <TabsContent value="informacoes-nf" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Natureza da Operação</label>
                  <input
                    type="text"
                    value={naturezaOperacao}
                    onChange={(e) => setNaturezaOperacao(e.target.value)}
                    placeholder="Ex: Venda, Remessa para demonstração..."
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">E-mails para Envio da NF</label>
                  <input
                    type="text"
                    value={emailsNF}
                    onChange={(e) => setEmailsNF(e.target.value)}
                    placeholder="email1@example.com, email2@example.com"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Forma de Pagamento</label>
                  <input
                    type="text"
                    value={formaPagamentoNF}
                    onChange={(e) => setFormaPagamentoNF(e.target.value)}
                    placeholder="À vista, parcelado..."
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Aba Frete */}
            <TabsContent value="frete" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tipo de Frete</label>
                  <select
                    value={tipoFrete}
                    onChange={(e) => setTipoFrete(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="">Selecione...</option>
                    <option value="cif">CIF - Pago pelo remetente</option>
                    <option value="fob">FOB - Pago pelo destinatário</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Prazo de Entrega</label>
                  <input
                    type="text"
                    value={prazoEntrega}
                    onChange={(e) => setPrazoEntrega(e.target.value)}
                    placeholder="Ex: 5 dias úteis"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Endereço de Entrega</label>
                  <textarea
                    value={enderecoEntrega}
                    onChange={(e) => setEnderecoEntrega(e.target.value)}
                    placeholder="Endereço completo de entrega..."
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Aba Acompanhamento */}
            <TabsContent value="acompanhamento" className="mt-6">
              <AcompanhamentoPedidoTab 
                pedido={{
                  id: pedidoInicial?.id || 0,
                  numeroOportunidade: `EMP-${dadosEmprestimo.numeroProcesso}`,
                  cliente: dadosEmprestimo.cliente,
                  vendedor,
                  dataVenda: new Date().toISOString().split('T')[0],
                  status: 'rascunho',
                  produtos,
                  valorTotal: calcularTotal()
                }}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSalvarPedido} className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Save className="h-4 w-4 mr-2" />
              {pedidoInicial ? 'Atualizar' : 'Salvar'} Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdicionarProdutoModal
        isOpen={isAdicionarProdutoOpen}
        onClose={() => setIsAdicionarProdutoOpen(false)}
        onAdicionarProduto={handleAdicionarProduto}
      />
    </>
  );
};

export default PedidoEmprestimoModal;
