
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
      <DialogContent className="max-w-[1400px] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Package className="h-7 w-7 text-biodina-gold" />
            Detalhes do Produto
          </DialogTitle>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-mono text-lg font-bold bg-biodina-gold/10 px-3 py-1 rounded">
              {produto.codigo}
            </span>
            <Badge variant="outline" className="text-sm">
              {produto.categoria}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-8 py-6">
          {/* COLUNA 1: INFORMAÇÕES BÁSICAS E ESTOQUE */}
          <div className="space-y-6">
            {/* Informações do Produto */}
            <Card className="border-2 border-biodina-gold/20 bg-biodina-gold/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-biodina-gold">
                  <Package className="h-5 w-5" />
                  Informações do Produto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {produto.descricao}
                  </h3>
                  <div className="text-sm text-gray-600">
                    <strong>Fabricante:</strong> {produto.fabricante}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-semibold text-gray-700">Localização</div>
                    <div className="text-sm text-gray-600">{estoque.localizacaoFisica}</div>
                  </div>
                </div>

                {estoque.exigeNumeroSerie && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    🔢 Exige Número de Série
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Estoque Disponível - Destaque */}
            <Card className="border-2 border-green-200 bg-green-50/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  {getEstoqueIcon(estoque.totalDisponivel)}
                  Estoque Disponível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-5xl font-bold ${getEstoqueColor(estoque.totalDisponivel)} mb-2`}>
                    {estoque.totalDisponivel}
                  </div>
                  <div className="text-sm text-gray-600">unidades disponíveis</div>
                  {estoque.totalReservado > 0 && (
                    <div className="text-sm text-orange-600 mt-1 bg-orange-50 px-2 py-1 rounded">
                      {estoque.totalReservado} unidades reservadas
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Distribuição por Filial</span>
                  </div>
                  <div className="space-y-3">
                    {estoque.estoquesPorCnpj.map((cnpjEstoque, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg border shadow-sm">
                        <div>
                          <div className="font-medium text-sm">{cnpjEstoque.nomeEmpresa}</div>
                          <div className="text-xs text-gray-500">{cnpjEstoque.cnpj}</div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                          {cnpjEstoque.quantidade} un
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preço */}
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Preço Sugerido</div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(estoque.precoSugerido)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* COLUNA 2: LOTES, TIPOS DE ESTOQUE E UNIDADES */}
          <div className="space-y-6">
            {/* Lotes Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Archive className="h-5 w-5 text-biodina-gold" />
                  Lotes Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {estoque.lotes.length > 0 ? (
                  estoque.lotes.map((lote, idx) => (
                    <div key={idx} className="border-2 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold bg-white px-3 py-1 rounded border">
                            {lote.lote}
                          </span>
                          {lote.alertaValidade && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Vencendo
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                          {lote.quantidade} unidades
                        </Badge>
                      </div>
                      {lote.dataValidade && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded">
                          <Calendar className="h-4 w-4" />
                          <span><strong>Validade:</strong> {formatDate(lote.dataValidade)}</span>
                          {lote.diasParaVencimento && (
                            <span className="ml-2 text-gray-500">
                              ({lote.diasParaVencimento} dias restantes)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Archive className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Nenhum lote disponível</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tipos de Estoque */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipos de Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {estoque.tiposEstoque.map((tipo, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <span className="font-medium">{tipo.tipo}</span>
                    <Badge variant="outline" className="bg-blue-50">
                      {tipo.quantidade} un
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Unidades de Venda */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Unidades de Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {estoque.unidadesDisponiveis.map((unidDisp, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <span className="font-medium">{getUnidadeLabel(unidDisp.unidade)}</span>
                    <div className="text-right">
                      <div className="font-semibold">{unidDisp.quantidade}</div>
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
          <div className="space-y-6">
            {/* Alertas */}
            {estoque.alertas.length > 0 && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas Importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {estoque.alertas.map((alerta, idx) => (
                    <div 
                      key={idx} 
                      className={`border-2 rounded-lg p-4 ${getAlertaSeveridadeColor(alerta.severidade)}`}
                    >
                      <p className="text-sm font-medium">{alerta.mensagem}</p>
                      <div className="text-xs mt-1 opacity-75">
                        Severidade: {alerta.severidade.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Reservas Ativas */}
            {estoque.reservasAtivas.length > 0 && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Clock className="h-5 w-5" />
                    Reservas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {estoque.reservasAtivas.map((reserva, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <span className="font-mono text-sm font-medium">{reserva.pedidoId}</span>
                        <div className="text-xs text-gray-600">{formatDate(reserva.dataReserva)}</div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {reserva.quantidade} un
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Histórico de Vendas */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="h-5 w-5" />
                  Histórico de Vendas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {estoque.historicoVendas.slice(0, 4).map((venda, idx) => (
                  <div key={idx} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{formatDate(venda.data)}</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(venda.precoVenda)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="font-medium">{venda.cliente}</div>
                      <div className="text-gray-500">{venda.quantidade} unidades</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Formulário de Adição */}
            <Card className="border-2 border-biodina-gold bg-biodina-gold/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-biodina-gold">
                  <Calculator className="h-5 w-5" />
                  Adicionar ao Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantidade" className="text-sm font-medium">Quantidade *</Label>
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
                    <Label htmlFor="unidade" className="text-sm font-medium">Unidade *</Label>
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
                  <Label htmlFor="desconto" className="text-sm font-medium">Desconto (%)</Label>
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
                  <Label htmlFor="observacoes" className="text-sm font-medium">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Ex: Cliente exige validade mínima de 6 meses"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div className="text-center py-4 bg-white rounded-lg border-2 border-biodina-gold/20">
                  <div className="text-sm text-gray-500 mb-1">Total Calculado</div>
                  <div className="text-3xl font-bold text-biodina-gold">
                    {formatCurrency(totalCalculado)}
                  </div>
                  {desconto > 0 && (
                    <div className="text-sm text-gray-500 mt-2">
                      Desconto: {desconto}% | Preço unit.: {formatCurrency(precoComDesconto)}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAdicionar}
                    disabled={quantidade > estoque.totalDisponivel || quantidade < 1}
                    className="flex-1 bg-biodina-gold hover:bg-biodina-gold/90 text-white"
                  >
                    Adicionar ao Pedido
                  </Button>
                </div>

                {quantidade > estoque.totalDisponivel && (
                  <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded border border-red-200">
                    ⚠️ Quantidade maior que estoque disponível ({estoque.totalDisponivel} unidades)
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
