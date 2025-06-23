
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TransferenciaEstadoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cnpjEmissor: string;
  cnpjEstoque: string;
  produtoDescricao: string;
  quantidade: number;
  onRedirecionarMovimentacao: () => void;
}

const TransferenciaEstadoModal = ({
  isOpen,
  onOpenChange,
  cnpjEmissor,
  cnpjEstoque,
  produtoDescricao,
  quantidade,
  onRedirecionarMovimentacao
}: TransferenciaEstadoModalProps) => {
  
  const handleRedirecionamento = () => {
    onRedirecionarMovimentacao();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            CNPJ Emissor Incompatível
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Transferência Obrigatória</h3>
                  <p className="text-sm text-yellow-700">
                    O estoque selecionado não pertence ao CNPJ emissor da nota fiscal.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-800 mb-3">
                  <strong>Situação:</strong> Você está tentando separar <span className="font-semibold text-blue-600">{quantidade} unidades</span> do CNPJ{" "}
                  <span className="font-semibold">{cnpjEstoque}</span>,
                  mas o emissor da nota fiscal é <span className="font-semibold text-green-600">{cnpjEmissor}</span>.
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono text-xs">{cnpjEstoque}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">{cnpjEmissor}</span>
                </div>

                <p className="text-gray-700">
                  <strong>Produto:</strong> {produtoDescricao}
                </p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Solução:</strong> Transfira o estoque para o CNPJ emissor <span className="font-mono">{cnpjEmissor}</span> primeiro, 
                  depois retorne para confirmar a separação.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleRedirecionamento}
              className="bg-biodina-blue hover:bg-biodina-blue/90"
            >
              Ir para Movimentação de Estoque
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferenciaEstadoModal;
