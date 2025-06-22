
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pedido } from "@/types/compras";

interface PedidoDetalhesModalProps {
  pedido: Pedido;
  onClose: () => void;
}

const PedidoDetalhesModal = ({ pedido, onClose }: PedidoDetalhesModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Detalhes do Pedido - {pedido.numero_pedido}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número do Pedido
              </label>
              <p className="text-sm text-gray-900">{pedido.numero_pedido}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HOP
              </label>
              <p className="text-sm text-gray-900">{pedido.hop}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendedor
              </label>
              <p className="text-sm text-gray-900">{pedido.vendedor}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <p className="text-sm text-gray-900">{pedido.cliente}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Entrega
              </label>
              <p className="text-sm text-gray-900">{pedido.data_entrega}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transportadora
              </label>
              <p className="text-sm text-gray-900">{pedido.transportadora}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Região
              </label>
              <p className="text-sm text-gray-900">{pedido.regiao}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                pedido.status === 'Finalizado' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {pedido.status}
              </span>
            </div>
          </div>

          {/* Informações de Localização */}
          {(pedido.bairro || pedido.cidade || pedido.cep) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Localização</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pedido.bairro && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro
                    </label>
                    <p className="text-sm text-gray-900">{pedido.bairro}</p>
                  </div>
                )}
                {pedido.cidade && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <p className="text-sm text-gray-900">{pedido.cidade}</p>
                  </div>
                )}
                {pedido.cep && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <p className="text-sm text-gray-900">{pedido.cep}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Informações de Peso */}
          {(pedido.peso_bruto || pedido.peso_liquido) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Peso</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pedido.peso_bruto && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso Bruto (kg)
                    </label>
                    <p className="text-sm text-gray-900">{pedido.peso_bruto}</p>
                  </div>
                )}
                {pedido.peso_liquido && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso Líquido (kg)
                    </label>
                    <p className="text-sm text-gray-900">{pedido.peso_liquido}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Itens do Pedido */}
          {pedido.itens && pedido.itens.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Itens do Pedido</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Lote</TableHead>
                      <TableHead>Data Validade</TableHead>
                      <TableHead>Nº Série</TableHead>
                      <TableHead>Depósito</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Quantidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedido.itens.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.codigo}</TableCell>
                        <TableCell>{item.descricao}</TableCell>
                        <TableCell>{item.lote}</TableCell>
                        <TableCell>{item.data_validade}</TableCell>
                        <TableCell>{item.numero_serie}</TableCell>
                        <TableCell>{item.deposito}</TableCell>
                        <TableCell>{item.localizacao}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetalhesModal;
