
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
  Calculator
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

  const getAlertaSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalhes do Produto - {produto.codigo}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Informações Básicas e Estoque */}
          <div className="space-y-4">
            {/* Informações do Produto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-semibold">Código</Label>
                  <p className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{produto.codigo}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Descrição</Label>
                  <p className="text-sm">{produto.descricao}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-semibold">Categoria</Label>
                    <p className="text-sm">{produto.categoria}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Fabricante</Label>
                    <p className="text-sm">{produto.fabricante}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estoque Vendível */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Estoque Vendível
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {estoque.totalDisponivel}
                  </div>
                  <div className="text-sm text-gray-500">unidades disponíveis</div>
                  <div className="text-xs text-gray-400 mt-1">
                    (Reservado: {estoque.totalReservado} un)
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-sm font-semibold flex items-center gap-1 mb-2">
                    <Building2 className="h-3 w-3" />
                    Por Empresa
                  </Label>
                  {estoque.estoquesPorCnpj.map((cnpjEstoque, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <span className="text-sm">{cnpjEstoque.nomeEmpresa}</span>
                      <Badge variant="outline" className="text-xs">
                        {cnpjEstoque.quantidade} un
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{estoque.localizacaoFisica}</p>
                {estoque.exigeNumeroSerie && (
                  <Badge className="mt-2 bg-orange-100 text-orange-800">
                    Exige Nº de Série
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna 2: Lotes e Tipos de Estoque */}
          <div className="space-y-4">
            {/* Lotes Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  Lotes Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {estoque.lotes.map((lote, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-sm font-semibold">{lote.lote}</span>
                      <Badge variant="outline">{lote.quantidade} un</Badge>
                    </div>
                    {lote.dataValidade && (
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>Vence: {formatDate(lote.dataValidade)}</span>
                        {lote.alertaValidade && (
                          <Badge className="bg-red-100 text-red-800 ml-2">
                            {lote.diasParaVencimento} dias
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tipos de Estoque */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tipos de Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {estoque.tiposEstoque.map((tipo, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm">{tipo.tipo}</span>
                    <Badge variant="outline">{tipo.quantidade} un</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Unidades Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Unidades de Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {estoque.unidadesDisponiveis.map((unidDisp, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm">{getUnidadeLabel(unidDisp.unidade)}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{unidDisp.quantidade}</div>
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

          {/* Coluna 3: Histórico, Preços e Formulário */}
          <div className="space-y-4">
            {/* Alertas */}
            {estoque.alertas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Alertas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {estoque.alertas.map((alerta, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-lg p-2 ${getAlertaSeveridadeColor(alerta.severidade)}`}
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
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Reservas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {estoque.reservasAtivas.map((reserva, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{reserva.pedidoId}</span>
                      <span>{reserva.quantidade} un</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Histórico de Vendas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Últimas Vendas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {estoque.historicoVendas.slice(0, 3).map((venda, idx) => (
                  <div key={idx} className="border-b pb-2 last:border-b-0">
                    <div className="flex justify-between text-sm">
                      <span>{formatDate(venda.data)}</span>
                      <span className="font-medium">{formatCurrency(venda.precoVenda)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {venda.cliente} • {venda.quantidade} un
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Formulário de Adição */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Adicionar ao Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(estoque.precoSugerido)}
                  </div>
                  <div className="text-xs text-gray-500">preço sugerido</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="quantidade">Quantidade *</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      value={quantidade}
                      onChange={(e) => setQuantidade(Number(e.target.value))}
                      min="1"
                      max={estoque.totalDisponivel}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unidade">Unidade *</Label>
                    <Select value={unidade} onValueChange={(value: UnidadeVenda) => setUnidade(value)}>
                      <SelectTrigger>
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
                  <Label htmlFor="desconto">Desconto (%)</Label>
                  <Input
                    id="desconto"
                    type="number"
                    value={desconto}
                    onChange={(e) => setDesconto(Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Ex: Cliente exige validade mínima de 6 meses"
                    rows={2}
                  />
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-sm text-gray-500">Total Calculado</div>
                  <div className="text-xl font-bold text-biodina-gold">
                    {formatCurrency(totalCalculado)}
                  </div>
                  {desconto > 0 && (
                    <div className="text-xs text-gray-500">
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
                    Adicionar
                  </Button>
                </div>

                {quantidade > estoque.totalDisponivel && (
                  <div className="text-xs text-red-600 text-center">
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
