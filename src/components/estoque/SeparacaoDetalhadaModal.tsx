
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Package, AlertCircle, CheckCircle, Clock, Printer, Eye } from "lucide-react";
import { PedidoSeparacao, ItemPedidoSeparacao, StatusItemSeparacao } from "@/types/estoque";
import EstoqueDisponivelModal from "./EstoqueDisponivelModal";
import SolicitacaoReposicaoModal from "./SolicitacaoReposicaoModal";
import HistoricoItemModal from "./HistoricoItemModal";

interface SeparacaoDetalhadaModalProps {
  pedido: PedidoSeparacao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SeparacaoDetalhadaModal = ({ pedido, isOpen, onOpenChange }: SeparacaoDetalhadaModalProps) => {
  const [selectedItem, setSelectedItem] = useState<ItemPedidoSeparacao | null>(null);
  const [showEstoqueModal, setShowEstoqueModal] = useState(false);
  const [showReposicaoModal, setShowReposicaoModal] = useState(false);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);

  const getStatusIcon = (status: StatusItemSeparacao) => {
    switch (status) {
      case StatusItemSeparacao.SEPARADO:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case StatusItemSeparacao.INDISPONIVEL:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case StatusItemSeparacao.PARCIAL:
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: StatusItemSeparacao) => {
    const statusConfig = {
      [StatusItemSeparacao.PENDENTE]: { label: "Pendente", className: "bg-gray-100 text-gray-800" },
      [StatusItemSeparacao.SEPARADO]: { label: "Separado", className: "bg-green-100 text-green-800" },
      [StatusItemSeparacao.INDISPONIVEL]: { label: "Indisponível", className: "bg-red-100 text-red-800" },
      [StatusItemSeparacao.PARCIAL]: { label: "Parcial", className: "bg-orange-100 text-orange-800" }
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleSeparar = (item: ItemPedidoSeparacao) => {
    setSelectedItem(item);
    setShowEstoqueModal(true);
  };

  const handleSolicitarReposicao = (item: ItemPedidoSeparacao) => {
    setSelectedItem(item);
    setShowReposicaoModal(true);
  };

  const handleVerHistorico = (item: ItemPedidoSeparacao) => {
    setSelectedItem(item);
    setShowHistoricoModal(true);
  };

  const progressPercentage = (pedido.progresso.separados / pedido.progresso.total) * 100;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-biodina-blue">
              Separação do Pedido {pedido.numero_pedido}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Cabeçalho do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Informações do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nº Pedido / NOP</p>
                    <p className="text-lg font-semibold">{pedido.numero_pedido} / {pedido.nop}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cliente</p>
                    <p className="font-medium">{pedido.cliente}</p>
                    <p className="text-sm text-gray-600">{pedido.endereco_cliente}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vendedor</p>
                    <p className="font-medium">{pedido.vendedor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Data de Entrega</p>
                    <p className="font-medium">{new Date(pedido.data_entrega).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Volumes / Peso</p>
                    <p className="font-medium">{pedido.quantidade_volumes} vol. / {pedido.peso_bruto}kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Região</p>
                    <p className="font-medium">{pedido.regiao}</p>
                  </div>
                </div>
                
                {pedido.observacoes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Observações de Separação</p>
                      <p className="text-sm bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                        {pedido.observacoes}
                      </p>
                    </div>
                  </>
                )}

                <Separator className="my-4" />
                
                {/* Progresso */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-500">Progresso da Separação</p>
                    <p className="text-sm font-medium">{pedido.progresso.separados}/{pedido.progresso.total} itens</p>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Itens do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Qtde Solicitada</TableHead>
                      <TableHead>Qtde Separada</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedido.itens.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.codigo_produto}</TableCell>
                        <TableCell>{item.descricao_produto}</TableCell>
                        <TableCell>{item.quantidade_solicitada}</TableCell>
                        <TableCell>{item.quantidade_separada}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            {getStatusBadge(item.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {item.status !== StatusItemSeparacao.SEPARADO && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleSeparar(item)}
                                  className="bg-biodina-gold hover:bg-biodina-gold/90"
                                >
                                  Separar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSolicitarReposicao(item)}
                                >
                                  Solicitar Reposição
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleVerHistorico(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Rodapé com Ações */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-3">
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Etiqueta de Separação
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Etiqueta de Expedição
                </Button>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Fechar
                </Button>
                <Button 
                  className="bg-biodina-blue hover:bg-biodina-blue/90"
                  disabled={pedido.progresso.separados === 0}
                >
                  Finalizar Separação
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedItem && (
        <>
          <EstoqueDisponivelModal
            item={selectedItem}
            isOpen={showEstoqueModal}
            onOpenChange={setShowEstoqueModal}
          />
          <SolicitacaoReposicaoModal
            item={selectedItem}
            isOpen={showReposicaoModal}
            onOpenChange={setShowReposicaoModal}
          />
          <HistoricoItemModal
            item={selectedItem}
            isOpen={showHistoricoModal}
            onOpenChange={setShowHistoricoModal}
          />
        </>
      )}
    </>
  );
};

export default SeparacaoDetalhadaModal;
