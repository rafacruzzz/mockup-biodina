import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Package,
  Building2,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Download,
  AlertTriangle
} from "lucide-react";
import { PedidoEntradaMercadoria } from "@/types/faturamento";
import ConfirmacaoNFModal from "@/components/estoque/ConfirmacaoNFModal";
import { useToast } from "@/hooks/use-toast";

interface DetalhesEntradaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pedido: PedidoEntradaMercadoria | null;
  onConfirmarEntrada: (pedidoId: string) => void;
  onCancelar: (pedidoId: string) => void;
}

const DetalhesEntradaModal = ({
  isOpen,
  onOpenChange,
  pedido,
  onConfirmarEntrada,
  onCancelar
}: DetalhesEntradaModalProps) => {
  const [nfModalOpen, setNfModalOpen] = useState(false);
  const { toast } = useToast();

  if (!pedido) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aguardando Entrada':
        return 'bg-yellow-100 text-yellow-800';
      case 'NF Recebida':
        return 'bg-blue-100 text-blue-800';
      case 'Entrada Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGerarNF = () => {
    toast({
      title: "NF de Entrada Gerada",
      description: `NF de entrada gerada com sucesso para ${pedido.numeroPedido}`,
    });
    onConfirmarEntrada(pedido.id);
    setNfModalOpen(false);
    onOpenChange(false);
  };

  const handleConfirmarEntrada = () => {
    toast({
      title: "Entrada Confirmada",
      description: `Entrada confirmada para ${pedido.numeroPedido}`,
    });
    onConfirmarEntrada(pedido.id);
    onOpenChange(false);
  };

  const handleCancelar = () => {
    if (confirm('Tem certeza que deseja cancelar este pedido de entrada?')) {
      toast({
        title: "Pedido Cancelado",
        description: `Pedido ${pedido.numeroPedido} cancelado`,
        variant: "destructive"
      });
      onCancelar(pedido.id);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Detalhes da Entrada - {pedido.numeroPedido}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status e Tipo */}
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(pedido.status)}>
                {pedido.status}
              </Badge>
              <Badge variant="outline">{pedido.tipo}</Badge>
              <Badge variant="secondary">{pedido.categoria}</Badge>
            </div>

            {/* Dados do Fornecedor */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Dados do Fornecedor
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Fornecedor</p>
                  <p className="font-medium">{pedido.fornecedor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CNPJ</p>
                  <p className="font-medium">{pedido.cnpjFornecedor}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Dados da NF */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados da Nota Fiscal
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Número NF</p>
                  <p className="font-medium">{pedido.numeroNF || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data Emissão</p>
                  <p className="font-medium">{formatDate(pedido.dataEmissao)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data Entrada</p>
                  <p className="font-medium">{formatDate(pedido.dataEntrada)}</p>
                </div>
                {pedido.chaveAcesso && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Chave de Acesso</p>
                    <p className="font-medium font-mono text-xs">{pedido.chaveAcesso}</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Itens */}
            <div className="space-y-3">
              <h3 className="font-semibold">Itens da Entrada</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                    <TableHead className="text-right">Valor Unit.</TableHead>
                    <TableHead className="text-right">Valor Total</TableHead>
                    <TableHead>CFOP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedido.itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.codigo}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell className="text-center">{item.quantidade}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.valorTotal)}</TableCell>
                      <TableCell>{item.cfop}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            {/* Totais */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Totais
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Valor Mercadorias</p>
                  <p className="text-lg font-bold">{formatCurrency(pedido.valorTotal)}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Impostos</p>
                  <p className="text-lg font-bold">{formatCurrency(pedido.valorImpostos)}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(pedido.valorTotal + pedido.valorImpostos)}
                  </p>
                </div>
              </div>
            </div>

            {/* Observações */}
            {pedido.observacoes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Observações
                  </h3>
                  <p className="text-sm text-muted-foreground">{pedido.observacoes}</p>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            
            {pedido.chaveAcesso && (
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Baixar XML
              </Button>
            )}

            {pedido.status === 'Aguardando Entrada' && (
              <Button onClick={() => setNfModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Gerar NF de Entrada
              </Button>
            )}

            {pedido.status === 'NF Recebida' && (
              <Button onClick={handleConfirmarEntrada} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar Entrada
              </Button>
            )}

            {pedido.status !== 'Cancelado' && pedido.status !== 'Entrada Confirmada' && (
              <Button variant="destructive" onClick={handleCancelar}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmacaoNFModal
        isOpen={nfModalOpen}
        onOpenChange={setNfModalOpen}
        onConfirm={handleGerarNF}
      />
    </>
  );
};

export default DetalhesEntradaModal;
