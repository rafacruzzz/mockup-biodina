
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Package, Calendar } from "lucide-react";
import { ItemPedidoSeparacao, EstoqueDisponivel } from "@/types/estoque";
import { mockEstoquesDisponiveis } from "@/data/estoqueModules";

interface EstoqueDisponivelModalProps {
  item: ItemPedidoSeparacao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EstoqueDisponivelModal = ({ item, isOpen, onOpenChange }: EstoqueDisponivelModalProps) => {
  const [quantidadeSeparar, setQuantidadeSeparar] = useState(0);
  const [numeroSerie, setNumeroSerie] = useState("");
  const [estoquesSelecionados, setEstoquesSelecionados] = useState<{[key: number]: number}>({});

  // Simular estoques disponíveis para o item
  const estoquesDisponiveis: EstoqueDisponivel[] = mockEstoquesDisponiveis.map(estoque => ({
    ...estoque,
    id: estoque.id + item.id * 10 // Gerar IDs únicos
  }));

  const handleSelecionarEstoque = (estoqueId: number, quantidade: number) => {
    setEstoquesSelecionados(prev => ({
      ...prev,
      [estoqueId]: quantidade
    }));
  };

  const getTotalSelecionado = () => {
    return Object.values(estoquesSelecionados).reduce((sum, qty) => sum + qty, 0);
  };

  const getValidadeAlert = (estoque: EstoqueDisponivel) => {
    if (!estoque.data_validade) return null;
    
    const diasParaVencimento = estoque.dias_para_vencimento || 0;
    if (diasParaVencimento <= 30) {
      return <AlertTriangle className="h-4 w-4 text-red-500" title={`Vence em ${diasParaVencimento} dias`} />;
    } else if (diasParaVencimento <= 90) {
      return <AlertTriangle className="h-4 w-4 text-orange-500" title={`Vence em ${diasParaVencimento} dias`} />;
    }
    return null;
  };

  const handleConfirmarSeparacao = () => {
    console.log("Separação confirmada:", {
      item: item.codigo_produto,
      estoquesSelecionados,
      numeroSerie,
      totalSeparado: getTotalSelecionado()
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Selecionar Estoque - {item.codigo_produto}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Item */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Produto</p>
                  <p className="font-medium">{item.descricao_produto}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantidade Solicitada</p>
                  <p className="font-medium">{item.quantidade_solicitada}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Já Separado</p>
                  <p className="font-medium">{item.quantidade_separada}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estoque Disponível */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Estoques Disponíveis</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Depósito</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Disponível</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Qtde a Separar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estoquesDisponiveis.map((estoque) => (
                  <TableRow key={estoque.id}>
                    <TableCell className="font-medium">{estoque.cnpj}</TableCell>
                    <TableCell>{estoque.deposito}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {estoque.lote}
                        {getValidadeAlert(estoque)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {estoque.data_validade ? new Date(estoque.data_validade).toLocaleDateString('pt-BR') : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>{estoque.localizacao_fisica}</TableCell>
                    <TableCell>{estoque.quantidade_disponivel}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{estoque.tipo_estoque}</Badge>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={estoque.quantidade_disponivel}
                        value={estoquesSelecionados[estoque.id] || 0}
                        onChange={(e) => handleSelecionarEstoque(estoque.id, parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Resumo da Separação */}
          {getTotalSelecionado() > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-separado">Total a Separar</Label>
                    <Input
                      id="total-separado"
                      value={getTotalSelecionado()}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numero-serie">Número de Série (opcional)</Label>
                    <Input
                      id="numero-serie"
                      value={numeroSerie}
                      onChange={(e) => setNumeroSerie(e.target.value)}
                      placeholder="Digite o número de série se aplicável"
                    />
                  </div>
                </div>

                {getTotalSelecionado() > (item.quantidade_solicitada - item.quantidade_separada) && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <p className="text-sm text-yellow-800">
                        Atenção: Quantidade selecionada ({getTotalSelecionado()}) é maior que a necessária ({item.quantidade_solicitada - item.quantidade_separada})
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmarSeparacao}
              disabled={getTotalSelecionado() === 0}
              className="bg-biodina-blue hover:bg-biodina-blue/90"
            >
              Confirmar Separação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstoqueDisponivelModal;
