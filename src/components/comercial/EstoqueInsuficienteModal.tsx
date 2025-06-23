
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, ArrowRight, Bell } from "lucide-react";

interface EstoqueInsuficienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto: {
    codigo: string;
    descricao: string;
  };
  quantidadeSolicitada: number;
  estoqueDisponivel: number;
  estoquesPorCnpj?: Array<{
    cnpj: string;
    nomeEmpresa: string;
    quantidade: number;
  }>;
  onAjustarQuantidade: (novaQuantidade: number) => void;
  onSolicitarReposicao: () => void;
  onDividirPedido?: (distribuicao: Array<{ cnpj: string; quantidade: number }>) => void;
}

const EstoqueInsuficienteModal = ({
  isOpen,
  onClose,
  produto,
  quantidadeSolicitada,
  estoqueDisponivel,
  estoquesPorCnpj = [],
  onAjustarQuantidade,
  onSolicitarReposicao,
  onDividirPedido
}: EstoqueInsuficienteModalProps) => {
  
  const handleAjustarQuantidade = () => {
    onAjustarQuantidade(estoqueDisponivel);
    onClose();
  };

  const handleSolicitarReposicao = () => {
    onSolicitarReposicao();
    onClose();
  };

  const temEstoqueEmOutrosCnpjs = estoquesPorCnpj.some(e => e.quantidade > 0);
  
  const calcularDistribuicao = () => {
    let restante = quantidadeSolicitada;
    const distribuicao: Array<{ cnpj: string; nomeEmpresa: string; quantidade: number }> = [];
    
    estoquesPorCnpj.forEach(estoque => {
      if (restante > 0 && estoque.quantidade > 0) {
        const quantidadeUsada = Math.min(restante, estoque.quantidade);
        distribuicao.push({
          cnpj: estoque.cnpj,
          nomeEmpresa: estoque.nomeEmpresa,
          quantidade: quantidadeUsada
        });
        restante -= quantidadeUsada;
      }
    });
    
    return { distribuicao, consegueAtender: restante === 0 };
  };

  const { distribuicao, consegueAtender } = calcularDistribuicao();

  const handleDividirPedido = () => {
    if (onDividirPedido) {
      onDividirPedido(distribuicao.map(d => ({ cnpj: d.cnpj, quantidade: d.quantidade })));
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Estoque Insuficiente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Problema */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-red-600" />
              <span className="font-mono text-sm">{produto.codigo}</span>
            </div>
            <h3 className="font-semibold mb-3">{produto.descricao}</h3>
            
            <div className="flex items-center justify-between text-sm">
              <span>Quantidade solicitada:</span>
              <Badge variant="destructive">{quantidadeSolicitada} un</Badge>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span>Estoque disponível:</span>
              <Badge variant="outline" className="bg-white">
                {estoqueDisponivel} un
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-red-200">
              <span className="font-medium">Diferença:</span>
              <Badge variant="destructive">
                -{quantidadeSolicitada - estoqueDisponivel} un
              </Badge>
            </div>
          </div>

          {/* Opções de Solução */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Opções disponíveis:</h4>
            
            {/* Ajustar Quantidade */}
            <Button
              variant="outline"
              className="w-full justify-between h-auto p-4"
              onClick={handleAjustarQuantidade}
              disabled={estoqueDisponivel === 0}
            >
              <div className="text-left">
                <div className="font-medium">Ajustar Quantidade</div>
                <div className="text-sm text-gray-600">
                  Reduzir para {estoqueDisponivel} unidades disponíveis
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Solicitar Reposição */}
            <Button
              variant="outline"
              className="w-full justify-between h-auto p-4"
              onClick={handleSolicitarReposicao}
            >
              <div className="text-left">
                <div className="font-medium">Solicitar Reposição</div>
                <div className="text-sm text-gray-600">
                  Notificar setor de compras sobre necessidade
                </div>
              </div>
              <Bell className="h-4 w-4" />
            </Button>

            {/* Dividir Pedido (se houver estoque em outros CNPJs) */}
            {temEstoqueEmOutrosCnpjs && consegueAtender && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <Button
                  variant="outline"
                  className="w-full justify-between h-auto p-4 mb-3"
                  onClick={handleDividirPedido}
                >
                  <div className="text-left">
                    <div className="font-medium">Dividir Pedido</div>
                    <div className="text-sm text-gray-600">
                      Atender usando estoque de múltiplas filiais
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <div className="text-sm">
                  <div className="font-medium mb-2">Distribuição proposta:</div>
                  <div className="space-y-1">
                    {distribuicao.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{item.nomeEmpresa}:</span>
                        <Badge variant="outline" className="bg-white">
                          {item.quantidade} un
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão Cancelar */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstoqueInsuficienteModal;
