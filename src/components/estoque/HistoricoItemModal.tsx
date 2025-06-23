
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ArrowRight, Calendar, User, MapPin } from "lucide-react";
import { ItemPedidoSeparacao } from "@/types/estoque";

interface HistoricoItemModalProps {
  item: ItemPedidoSeparacao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MovimentacaoHistorico {
  id: number;
  data: string;
  tipo: 'entrada' | 'saida' | 'transferencia' | 'ajuste';
  descricao: string;
  quantidade: number;
  lote: string;
  origem?: string;
  destino?: string;
  usuario: string;
  documento?: string;
}

const HistoricoItemModal = ({ item, isOpen, onOpenChange }: HistoricoItemModalProps) => {
  // Mock data para o histórico
  const historicoMovimentacoes: MovimentacaoHistorico[] = [
    {
      id: 1,
      data: "2025-06-20",
      tipo: "entrada",
      descricao: "Entrada por compra",
      quantidade: 500,
      lote: "L2305",
      destino: "WebMED RJ - Prateleira A2",
      usuario: "Ana Costa",
      documento: "NF 001234"
    },
    {
      id: 2,
      data: "2025-06-19",
      tipo: "transferencia",
      descricao: "Transferência entre depósitos",
      quantidade: 100,
      lote: "L2305",
      origem: "WebMED RJ - Prateleira A2",
      destino: "WebMED RJ - Câmara Fria 1",
      usuario: "Carlos Mendes",
      documento: "MOV-001478"
    },
    {
      id: 3,
      data: "2025-06-18",
      tipo: "saida",
      descricao: "Saída por venda",
      quantidade: 50,
      lote: "L2305",
      origem: "WebMED RJ - Câmara Fria 1",
      usuario: "Thaís Silva",
      documento: "PED-85690"
    },
    {
      id: 4,
      data: "2025-06-17",
      tipo: "ajuste",
      descricao: "Ajuste de inventário",
      quantidade: 10,
      lote: "L2305",
      origem: "WebMED RJ - Câmara Fria 1",
      usuario: "Janaína Santos",
      documento: "AJU-001"
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'entrada':
        return '↗️';
      case 'saida':
        return '↙️';
      case 'transferencia':
        return '↔️';
      case 'ajuste':
        return '⚖️';
      default:
        return '📦';
    }
  };

  const getTipoBadge = (tipo: string) => {
    const tipoConfig = {
      entrada: { label: "Entrada", className: "bg-green-100 text-green-800" },
      saida: { label: "Saída", className: "bg-red-100 text-red-800" },
      transferencia: { label: "Transferência", className: "bg-blue-100 text-blue-800" },
      ajuste: { label: "Ajuste", className: "bg-orange-100 text-orange-800" }
    };

    const config = tipoConfig[tipo as keyof typeof tipoConfig] || tipoConfig.entrada;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Histórico de Movimentações - {item.codigo_produto}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Item */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Código do Produto</p>
                  <p className="text-lg font-semibold">{item.codigo_produto}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Descrição</p>
                  <p className="font-medium">{item.descricao_produto}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline de Movimentações */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Timeline de Movimentações</h3>
            <div className="space-y-4">
              {historicoMovimentacoes.map((movimentacao, index) => (
                <Card key={movimentacao.id} className="relative">
                  <CardContent className="pt-6">
                    {/* Linha do timeline */}
                    {index < historicoMovimentacoes.length - 1 && (
                      <div className="absolute left-8 top-16 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    {/* Ponto do timeline */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-biodina-blue rounded-full border-2 border-white shadow-sm"></div>
                    
                    <div className="ml-12">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getTipoIcon(movimentacao.tipo)}</span>
                          <div>
                            <p className="font-semibold">{movimentacao.descricao}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {getTipoBadge(movimentacao.tipo)}
                              <span className="text-sm text-gray-500">Lote: {movimentacao.lote}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {movimentacao.tipo === 'saida' ? '-' : '+'}{movimentacao.quantidade}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(movimentacao.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{movimentacao.usuario}</span>
                        </div>
                        {movimentacao.origem && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>De: {movimentacao.origem}</span>
                          </div>
                        )}
                        {movimentacao.destino && (
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                            <span>Para: {movimentacao.destino}</span>
                          </div>
                        )}
                        {movimentacao.documento && (
                          <div className="col-span-full">
                            <Badge variant="outline" className="text-xs">
                              Doc: {movimentacao.documento}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoricoItemModal;
