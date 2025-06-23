
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Building2,
  Archive,
  Clock,
  Calculator,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { EstoqueVendivel, UnidadeVenda } from "@/types/comercial";

interface DetalhesEstoqueProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  produto: {
    codigo: string;
    descricao: string;
    categoria: string;
    fabricante: string;
  };
  estoque: EstoqueVendivel;
  onAdicionarProduto: (
    codigo: string, 
    quantidade: number, 
    unidade: UnidadeVenda, 
    desconto: number, 
    observacoes: string
  ) => void;
}

const DetalhesEstoqueProduto = ({ 
  isOpen, 
  onClose, 
  produto, 
  estoque, 
  onAdicionarProduto 
}: DetalhesEstoqueProdutoProps) => {
  const [quantidade, setQuantidade] = useState(1);
  const [unidade, setUnidade] = useState<UnidadeVenda>(UnidadeVenda.UNIDADE);
  const [desconto, setDesconto] = useState(0);
  const [observacoes, setObservacoes] = useState('');

  const precoComDesconto = estoque.precoSugerido * (1 - desconto / 100);
  const totalCalculado = precoComDesconto * quantidade;

  const handleAdicionar = () => {
    onAdicionarProduto(produto.codigo, quantidade, unidade, desconto, observacoes);
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getEstoqueIcon = (quantidade: number) => {
    if (quantidade === 0) return <XCircle className="h-5 w-5 text-red-500" />;
    if (quantidade < 50) return <AlertCircle className="h-5 w-5 text-orange-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const getEstoqueColor = (quantidade: number) => {
    if (quantidade === 0) return "text-red-600";
    if (quantidade < 50) return "text-orange-600";
    return "text-green-600";
  };

  const getAlertaSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case 'alta': return 'bg-red-50 border-red-200 text-red-800';
      case 'media': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'baixa': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getUnidadeLabel = (unidade: UnidadeVenda) => {
    switch (unidade) {
      case UnidadeVenda.UNIDADE: return 'Unidade';
      case UnidadeVenda.CAIXA: return 'Caixa';
      case UnidadeVenda.FRASCO: return 'Frasco';
      case UnidadeVenda.KIT: return 'Kit';
      default: return 'Unidade';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Package className="h-6 w-6 text-biodina-gold" />
            Detalhes do Produto - <span className="font-mono text-biodina-gold">{produto.codigo}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
          {/* COLUNA 1: INFORMAÇÕES BÁSICAS E ESTOQUE */}
          <div className="space-y-4">
            {/* Card Principal do Produto */}
            <Card className="border-biodina-gold/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-biodina-gold">
                  <Package className="h-5 w-5" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Código</div>
                  <div className="font-mono text-lg font-bold">{produto.codigo}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Descrição</div>
                  <div className="font-semibold text-gray-900">{produto.descricao}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Categoria</div>
                    <Badge variant="outline" className="text-xs">{produto.categoria}</Badge>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Fabricante</div>
                    <div className="text-sm font-medium">{produto.fabricante}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estoque Vendível - Destaque */}
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  {getEstoqueIcon(estoque.totalDisponivel)}
                  Estoque Vendível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className={`text-4xl font-bold ${getEstoqueColor(estoque.totalDisponivel)}`}>
                    {estoque.totalDisponivel}
                  </div>
                  <div className="text-sm text-gray-600">unidades disponíveis</div>
                  {estoque.totalReservado > 0 && (
                    <div className="text-xs text-orange-600 mt-1">
                      ({estoque.totalReservado} reservadas)
                    </div>
                  )}
                </div>

                <Separator className="my-3" />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Por Empresa</span>
                  </div>
                  <div className="space-y-2">
                    {estoque.estoquesPorCnpj.map((cnpjEstoque, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 px-2 bg-white rounded border">
                        <span className="text-sm font-medium">{cnpjEstoque.nomeEmpresa}</span>
                        <Badge variant="outline" className="bg-green-50">
                          {cnpjEstoque.quantidade} un
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localização e Preço */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Localização</div>
                    <div className="text-sm font-medium">{estoque.localizacaoFisica}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Preço Sugerido</div>
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(estoque.precoSugerido)}
                    </div>
                  </div>
                </div>

                {estoque.exigeNumeroSerie && (
                  <>
                    <Separator />
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      🔢 Exige Nº de Série
                    </Badge>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* COLUNA 2: LOTES E TIPOS DE ESTOQUE */}
          <div className="space-y-4">
            {/* Lotes Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Archive className="h-5 w-5 text-biodina-gold" />
                  Lotes Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {estoque.lotes.length > 0 ? (
                  estoque.lotes.map((lote, idx) => (
                    <div key={idx} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold bg-white px-2 py-1 rounded">
                            {lote.lote}
                          </span>
                          {lote.alertaValidade && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Vencendo
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="bg-green-50">
                          {lote.quantidade} un
                        </Badge>
                      </div>
                      {lote.dataValidade && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>Vence: {formatDate(lote.dataValidade)}</span>
                          {lote.diasParaVencimento && (
                            <span className="ml-2 text-gray-500">
                              ({lote.diasParaVencimento} dias)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Archive className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Nenhum lote disponível</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tipos de Estoque */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tipos de Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {estoque.tiposEstoque.map((tipo, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{tipo.tipo}</span>
                    <Badge variant="outline">{tipo.quantidade} un</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Unidades de Venda */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Unidades de Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {estoque.unidadesDisponiveis.map((unidDisp, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{getUnidadeLabel(unidDisp.unidade)}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{unidDisp.quantidade}</div>
                      {unidDisp.fatorConversao > 1 && (
                        <div className="text-xs text-gray-500">
                          ({unidDisp.fatorConversao} un cada)
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* COLUNA 3: ALERTAS, HISTÓRICO E FORMULÁRIO */}
          <div className="space-y-4">
            {/* Alertas */}
            {estoque.alertas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Alertas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {estoque.alertas.map((alerta, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-lg p-3 ${getAlertaSeveridadeColor(alerta.severidade)}`}
                    >
                      <p className="text-xs font-medium">{alerta.mensagem}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Reservas Ativas */}
            {estoque.reservasAtivas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Reservas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {estoque.reservasAtivas.map((reserva, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-blue-50 rounded border">
                      <span className="text-sm font-mono">{reserva.pedidoId}</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {reserva.quantidade} un
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Histórico de Vendas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Últimas Vendas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {estoque.historicoVendas.slice(0, 4).map((venda, idx) => (
                  <div key={idx} className="border-b pb-2 last:border-b-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-gray-500">{formatDate(venda.data)}</span>
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(venda.precoVenda)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {venda.cliente} • {venda.quantidade} un
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Formulário de Adição */}
            <Card className="border-biodina-gold/30 bg-biodina-gold/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-biodina-gold">
                  <Calculator className="h-5 w-5" />
                  Adicionar ao Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="quantidade" className="text-xs">Quantidade *</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      value={quantidade}
                      onChange={(e) => setQuantidade(Number(e.target.value))}
                      min="1"
                      max={estoque.totalDisponivel}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unidade" className="text-xs">Unidade *</Label>
                    <Select value={unidade} onValueChange={(value: UnidadeVenda) => setUnidade(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {estoque.unidadesDisponiveis.map((unidDisp) => (
                          <SelectItem key={unidDisp.unidade} value={unidDisp.unidade}>
                            {getUnidadeLabel(unidDisp.unidade)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="desconto" className="text-xs">Desconto (%)</Label>
                  <Input
                    id="desconto"
                    type="number"
                    value={desconto}
                    onChange={(e) => setDesconto(Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes" className="text-xs">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Ex: Cliente exige validade mínima de 6 meses"
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div className="text-center py-2">
                  <div className="text-xs text-gray-500 mb-1">Total Calculado</div>
                  <div className="text-2xl font-bold text-biodina-gold">
                    {formatCurrency(totalCalculado)}
                  </div>
                  {desconto > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Desconto: {desconto}% | Preço unit.: {formatCurrency(precoComDesconto)}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAdicionar}
                    disabled={quantidade > estoque.totalDisponivel || quantidade < 1}
                    className="flex-1 bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    Adicionar ao Pedido
                  </Button>
                </div>

                {quantidade > estoque.totalDisponivel && (
                  <div className="text-xs text-red-600 text-center bg-red-50 p-2 rounded">
                    ⚠️ Quantidade maior que estoque disponível
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesEstoqueProduto;
