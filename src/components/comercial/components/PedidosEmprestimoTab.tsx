import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Pencil, Trash2, Package, Calendar, DollarSign } from "lucide-react";
import { PedidoEmprestimo } from "@/types/comercial";

interface PedidosEmprestimoTabProps {
  moeda: 'BRL' | 'USD';
  onMoedaChange: (moeda: 'BRL' | 'USD') => void;
  valorTotal: number;
  pedidos: PedidoEmprestimo[];
  onCriarNovoPedido: () => void;
  onVisualizarPedido: (pedido: PedidoEmprestimo) => void;
  onEditarPedido: (pedido: PedidoEmprestimo) => void;
  onRemoverPedido: (pedidoId: number) => void;
}

const PedidosEmprestimoTab = ({
  moeda,
  onMoedaChange,
  valorTotal,
  pedidos,
  onCriarNovoPedido,
  onVisualizarPedido,
  onEditarPedido,
  onRemoverPedido
}: PedidosEmprestimoTabProps) => {
  
  const formatCurrency = (value: number, currency: 'BRL' | 'USD') => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Configuração do Empréstimo */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Moeda *</Label>
            <RadioGroup value={moeda} onValueChange={(value) => onMoedaChange(value as 'BRL' | 'USD')}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BRL" id="moeda-brl" />
                  <Label htmlFor="moeda-brl" className="cursor-pointer">Real (R$)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="USD" id="moeda-usd" />
                  <Label htmlFor="moeda-usd" className="cursor-pointer">Dólar (USD)</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Valor Total do Empréstimo</Label>
            <div className="bg-background border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-biodina-blue">
                    {formatCurrency(valorTotal, moeda)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Calculado automaticamente com base nos pedidos
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-biodina-gold" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pedidos Vinculados */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">
            Pedidos Vinculados ({pedidos.length})
          </Label>
          <Button 
            onClick={onCriarNovoPedido}
            className="bg-biodina-gold hover:bg-biodina-gold/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Novo Pedido
          </Button>
        </div>

        {pedidos.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Nenhum pedido adicionado</p>
              <p className="text-sm text-muted-foreground mb-4">
                Clique em "Criar Novo Pedido" para adicionar o primeiro pedido ao empréstimo
              </p>
              <Button 
                onClick={onCriarNovoPedido}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Pedido
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {pedidos.map((pedido) => (
              <Card key={pedido.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-biodina-blue" />
                        <div>
                          <p className="font-semibold text-lg">
                            Pedido #{pedido.numeroOportunidade}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {pedido.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Cliente</p>
                          <p className="font-medium">{pedido.cliente}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vendedor</p>
                          <p className="font-medium">{pedido.vendedor}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{pedido.produtos?.length || 0} produtos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-biodina-blue">
                            {formatCurrency(pedido.valorTotal, moeda)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onVisualizarPedido(pedido)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditarPedido(pedido)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoverPedido(pedido.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {pedidos.length > 0 && (
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Resumo do Empréstimo
                </p>
                <p className="text-lg font-semibold text-green-900 dark:text-green-100 mt-1">
                  {pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'} • {formatCurrency(valorTotal, moeda)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PedidosEmprestimoTab;
