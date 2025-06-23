import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, History, Trash2, AlertTriangle, CheckCircle, FileSpreadsheet, Printer, RefreshCw, Package } from "lucide-react";
import { FormMovimentacao, TipoMovimentacao, ItemMovimentacao } from "@/types/estoque";
import { mockCNPJs, mockDepositos } from "@/data/estoqueModules";
import { estoqueModules } from "@/data/estoqueModules";
import HistoricoMovimentacoesModal from "./HistoricoMovimentacoesModal";
import ConfirmacaoNFModal from "./ConfirmacaoNFModal";
import { useToast } from "@/hooks/use-toast";

interface MovimentacaoEstoqueFormProps {
  onClose?: () => void;
}

const MovimentacaoEstoqueForm = ({ onClose }: MovimentacaoEstoqueFormProps) => {
  const { toast } = useToast();
  const [isHistoricoOpen, setIsHistoricoOpen] = useState(false);
  const [isConfirmacaoNFOpen, setIsConfirmacaoNFOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [nfGeradaMatriz, setNfGeradaMatriz] = useState(false);
  const [formData, setFormData] = useState<FormMovimentacao>({
    data_movimentacao: new Date().toISOString().split('T')[0],
    tipo_movimentacao: TipoMovimentacao.ENTRE_DEPOSITOS,
    cnpj_origem: '',
    deposito_origem: '',
    cnpj_destino: '',
    deposito_destino: '',
    motivo_movimentacao: '',
    nf_vinculada: '',
    pedido_vinculado: '',
    responsavel: '',
    itens: []
  });

  // Fix the data access to use posicao_atual instead of visao_geral
  const posicaoEstoque = estoqueModules.posicao_estoque?.subModules?.posicao_atual?.data || [];

  // Filter products to ensure no empty codes
  const validProducts = posicaoEstoque.filter(produto => 
    produto.produto_codigo && produto.produto_codigo.trim() !== ''
  );

  // Filtrar depósitos baseado no CNPJ selecionado
  const getDepositosByCNPJ = (cnpjNome: string) => {
    const cnpj = mockCNPJs.find(c => c.nome === cnpjNome);
    return cnpj ? mockDepositos.filter(d => d.cnpj_id === cnpj.id) : [];
  };

  // Detectar automaticamente o tipo de movimentação
  const detectarTipoMovimentacao = (cnpjOrigemNome: string, cnpjDestinoNome: string) => {
    if (cnpjOrigemNome && cnpjDestinoNome) {
      return cnpjOrigemNome === cnpjDestinoNome ? TipoMovimentacao.ENTRE_DEPOSITOS : TipoMovimentacao.ENTRE_CNPJS;
    }
    return TipoMovimentacao.ENTRE_DEPOSITOS;
  };

  // Verificar se pode confirmar movimentação
  const podeConfirmarMovimentacao = () => {
    const nfVinculadaPreenchida = formData.nf_vinculada.trim() !== '';
    return (nfVinculadaPreenchida || nfGeradaMatriz) && formData.itens.length > 0;
  };

  const handleCNPJChange = (field: 'cnpj_origem' | 'cnpj_destino', value: string) => {
    const newFormData = { ...formData, [field]: value };
    
    // Limpar depósito correspondente
    if (field === 'cnpj_origem') {
      newFormData.deposito_origem = '';
    } else {
      newFormData.deposito_destino = '';
    }
    
    // Auto-detectar tipo de movimentação
    if (newFormData.cnpj_origem && newFormData.cnpj_destino) {
      newFormData.tipo_movimentacao = detectarTipoMovimentacao(newFormData.cnpj_origem, newFormData.cnpj_destino);
    }
    
    setFormData(newFormData);
  };

  const adicionarItem = () => {
    const novoItem: ItemMovimentacao = {
      produto_codigo: '',
      produto_descricao: '',
      lote: '',
      data_validade: null,
      quantidade_disponivel: 0,
      quantidade_movimentar: 0,
      motivo_item: ''
    };
    
    setFormData({
      ...formData,
      itens: [...formData.itens, novoItem]
    });
  };

  const removerItem = (index: number) => {
    const novosItens = formData.itens.filter((_, i) => i !== index);
    setFormData({ ...formData, itens: novosItens });
  };

  const atualizarItem = (index: number, campo: keyof ItemMovimentacao, valor: any) => {
    const novosItens = [...formData.itens];
    novosItens[index] = { ...novosItens[index], [campo]: valor };
    
    // If the product changes, fetch data from the stock
    if (campo === 'produto_codigo') {
      const produtoEstoque = posicaoEstoque.find(p => p.produto_codigo === valor);
      if (produtoEstoque) {
        novosItens[index].produto_descricao = produtoEstoque.produto_descricao;
        novosItens[index].lote = produtoEstoque.lote;
        novosItens[index].data_validade = produtoEstoque.data_validade;
        novosItens[index].quantidade_disponivel = produtoEstoque.quantidade_disponivel;
      }
    }
    
    setFormData({ ...formData, itens: novosItens });
  };

  const validarEstoque = async () => {
    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      const itensInvalidos = formData.itens.filter(item => 
        item.quantidade_movimentar > item.quantidade_disponivel
      );
      
      if (itensInvalidos.length > 0) {
        toast({
          title: "Estoque insuficiente",
          description: `${itensInvalidos.length} item(ns) com quantidade indisponível`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Validação concluída",
          description: "Todos os itens possuem estoque disponível",
        });
      }
      
      setIsValidating(false);
    }, 1500);
  };

  const confirmarMovimentacao = () => {
    toast({
      title: "Movimentação confirmada",
      description: "A movimentação foi processada com sucesso",
    });
    if (onClose) {
      onClose();
    }
  };

  const gerarNF = () => {
    toast({
      title: "NF de Transferência",
      description: "Nota fiscal de transferência gerada",
    });
  };

  const darEntradaComNF = () => {
    setIsConfirmacaoNFOpen(true);
  };

  const handleConfirmarGeracaoNF = () => {
    setNfGeradaMatriz(true);
    toast({
      title: "NF da Matriz gerada",
      description: "Nota fiscal da matriz foi gerada e anexada ao movimento",
    });
  };

  const imprimirComprovante = () => {
    toast({
      title: "Comprovante interno",
      description: "Comprovante da movimentação gerado",
    });
  };

  const getCorTipoMovimentacao = () => {
    return formData.tipo_movimentacao === TipoMovimentacao.ENTRE_CNPJS 
      ? "border-l-blue-500 bg-blue-50" 
      : "border-l-green-500 bg-green-50";
  };

  const getBadgeValidade = (dataValidade: string | null) => {
    if (!dataValidade) return null;
    
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diasRestantes = Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diasRestantes < 0) {
      return <Badge variant="destructive" className="text-xs">Vencido</Badge>;
    } else if (diasRestantes <= 30) {
      return <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">Vence em {diasRestantes}d</Badge>;
    } else {
      return <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Válido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Cabeçalho */}
      <Card className={`${getCorTipoMovimentacao()} border-l-4`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Nova Movimentação de Estoque</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Tipo: <span className="font-medium">
                {formData.tipo_movimentacao === TipoMovimentacao.ENTRE_CNPJS ? 'Entre CNPJs' : 'Entre Depósitos'}
              </span>
            </p>
          </div>
          <Button variant="outline" onClick={() => setIsHistoricoOpen(true)}>
            <History className="h-4 w-4 mr-2" />
            Ver Histórico
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="data">Data da Movimentação</Label>
              <Input
                id="data"
                type="date"
                value={formData.data_movimentacao}
                onChange={(e) => setFormData({ ...formData, data_movimentacao: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="cnpj-origem">CNPJ Origem</Label>
              <Select value={formData.cnpj_origem} onValueChange={(value) => handleCNPJChange('cnpj_origem', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o CNPJ origem" />
                </SelectTrigger>
                <SelectContent>
                  {mockCNPJs.filter(cnpj => cnpj.nome && cnpj.nome.trim() !== '').map(cnpj => (
                    <SelectItem key={cnpj.id} value={cnpj.nome}>{cnpj.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deposito-origem">Depósito Origem</Label>
              <Select 
                value={formData.deposito_origem} 
                onValueChange={(value) => setFormData({ ...formData, deposito_origem: value })}
                disabled={!formData.cnpj_origem}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o depósito origem" />
                </SelectTrigger>
                <SelectContent>
                  {getDepositosByCNPJ(formData.cnpj_origem)
                    .filter(deposito => deposito.nome && deposito.nome.trim() !== '')
                    .map(deposito => (
                    <SelectItem key={deposito.id} value={deposito.nome}>{deposito.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="cnpj-destino">CNPJ Destino</Label>
              <Select value={formData.cnpj_destino} onValueChange={(value) => handleCNPJChange('cnpj_destino', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o CNPJ destino" />
                </SelectTrigger>
                <SelectContent>
                  {mockCNPJs.filter(cnpj => cnpj.nome && cnpj.nome.trim() !== '').map(cnpj => (
                    <SelectItem key={cnpj.id} value={cnpj.nome}>{cnpj.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deposito-destino">Depósito Destino</Label>
              <Select 
                value={formData.deposito_destino} 
                onValueChange={(value) => setFormData({ ...formData, deposito_destino: value })}
                disabled={!formData.cnpj_destino}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o depósito destino" />
                </SelectTrigger>
                <SelectContent>
                  {getDepositosByCNPJ(formData.cnpj_destino)
                    .filter(deposito => deposito.nome && deposito.nome.trim() !== '')
                    .map(deposito => (
                    <SelectItem key={deposito.id} value={deposito.nome}>{deposito.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nf-vinculada" className="flex items-center gap-2">
                NF Vinculada
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Obrigatória para movimentações entre CNPJs</p>
                  </TooltipContent>
                </Tooltip>
                {nfGeradaMatriz && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    NF Gerada
                  </Badge>
                )}
              </Label>
              <Input
                id="nf-vinculada"
                value={formData.nf_vinculada}
                onChange={(e) => setFormData({ ...formData, nf_vinculada: e.target.value })}
                placeholder="Número da NF"
                required={formData.tipo_movimentacao === TipoMovimentacao.ENTRE_CNPJS}
              />
            </div>

            <div>
              <Label htmlFor="pedido-vinculado">Pedido Vinculado</Label>
              <Input
                id="pedido-vinculado"
                value={formData.pedido_vinculado}
                onChange={(e) => setFormData({ ...formData, pedido_vinculado: e.target.value })}
                placeholder="Número do pedido"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="motivo">Motivo da Movimentação</Label>
            <Textarea
              id="motivo"
              value={formData.motivo_movimentacao}
              onChange={(e) => setFormData({ ...formData, motivo_movimentacao: e.target.value })}
              placeholder="Descreva o motivo da movimentação..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Tabela de Itens */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Itens da Movimentação</CardTitle>
          <Button onClick={adicionarItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </CardHeader>
        <CardContent>
          {formData.itens.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum item adicionado</p>
              <p className="text-sm">Clique em "Adicionar Item" para começar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Qtde Disponível</TableHead>
                    <TableHead>Qtde a Movimentar</TableHead>
                    <TableHead>Motivo do Item</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.itens.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select 
                          value={item.produto_codigo} 
                          onValueChange={(value) => atualizarItem(index, 'produto_codigo', value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Selecione o produto" />
                          </SelectTrigger>
                          <SelectContent>
                            {validProducts.map(produto => (
                              <SelectItem key={produto.id} value={produto.produto_codigo}>
                                {produto.produto_codigo} - {produto.produto_descricao}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">{item.lote}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.data_validade ? (
                            <>
                              <span className="text-xs text-gray-600">
                                {new Date(item.data_validade).toLocaleDateString('pt-BR')}
                              </span>
                              {getBadgeValidade(item.data_validade)}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">Sem validade</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{item.quantidade_disponivel}</span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={item.quantidade_disponivel}
                          value={item.quantidade_movimentar}
                          onChange={(e) => atualizarItem(index, 'quantidade_movimentar', parseInt(e.target.value) || 0)}
                          className={`w-24 ${item.quantidade_movimentar > item.quantidade_disponivel ? 'border-red-500' : ''}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.motivo_item || ''}
                          onChange={(e) => atualizarItem(index, 'motivo_item', e.target.value)}
                          placeholder="Motivo específico"
                          className="w-32"
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removerItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card 3: Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Ações da Movimentação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={validarEstoque} disabled={isValidating || formData.itens.length === 0}>
              {isValidating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Validar Estoque
            </Button>
            
            <Button 
              onClick={confirmarMovimentacao} 
              className="bg-green-600 hover:bg-green-700"
              disabled={!podeConfirmarMovimentacao()}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar Movimentação
            </Button>
            
            <Button variant="outline" onClick={darEntradaComNF}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Gerar NF de Transferência
            </Button>
            
            <Button variant="outline" onClick={imprimirComprovante}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir Comprovante Interno
            </Button>
          </div>
        </CardContent>
      </Card>

      <HistoricoMovimentacoesModal 
        isOpen={isHistoricoOpen}
        onOpenChange={setIsHistoricoOpen}
      />

      <ConfirmacaoNFModal 
        isOpen={isConfirmacaoNFOpen}
        onOpenChange={setIsConfirmacaoNFOpen}
        onConfirm={handleConfirmarGeracaoNF}
      />
    </div>
  );
};

export default MovimentacaoEstoqueForm;
