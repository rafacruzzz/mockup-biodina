
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Package } from "lucide-react";
import { ItemPedidoSeparacao } from "@/types/estoque";

interface SolicitacaoReposicaoModalProps {
  item: ItemPedidoSeparacao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SolicitacaoReposicaoModal = ({ item, isOpen, onOpenChange }: SolicitacaoReposicaoModalProps) => {
  const [motivo, setMotivo] = useState("");
  const [notificarVendedor, setNotificarVendedor] = useState(true);
  const [quantidadeSolicitada, setQuantidadeSolicitada] = useState(item.quantidade_solicitada - item.quantidade_separada);

  const handleSolicitarReposicao = () => {
    const solicitacao = {
      item_id: item.id,
      motivo,
      notificar_vendedor: notificarVendedor,
      quantidade_solicitada: quantidadeSolicitada,
      data_solicitacao: new Date().toISOString(),
      solicitante: "Usuario Atual" // Seria obtido do contexto do usuário
    };

    console.log("Solicitação de reposição:", solicitacao);
    
    // Aqui seria feita a integração com a API
    // toast.success("Solicitação de reposição enviada com sucesso!");
    
    onOpenChange(false);
  };

  const isFormValid = motivo.trim().length > 0 && quantidadeSolicitada > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Solicitar Reposição de Estoque
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Item */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-5 w-5 text-biodina-blue" />
                <div>
                  <p className="font-semibold">{item.codigo_produto}</p>
                  <p className="text-sm text-gray-600">{item.descricao_produto}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantidade Solicitada</p>
                  <p className="text-lg font-semibold">{item.quantidade_solicitada}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Já Separado</p>
                  <p className="text-lg font-semibold">{item.quantidade_separada}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Solicitação */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantidade-solicitada">Quantidade para Reposição *</Label>
              <Input
                id="quantidade-solicitada"
                type="number"
                min="1"
                max={item.quantidade_solicitada - item.quantidade_separada}
                value={quantidadeSolicitada}
                onChange={(e) => setQuantidadeSolicitada(parseInt(e.target.value) || 0)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Máximo disponível: {item.quantidade_solicitada - item.quantidade_separada}
              </p>
            </div>

            <div>
              <Label htmlFor="motivo">Motivo da Solicitação *</Label>
              <Textarea
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Descreva o motivo da solicitação de reposição (ex: produto não disponível no estoque atual, lote vencido, etc.)"
                className="mt-1 min-h-[100px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                {motivo.length}/500 caracteres
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="notificar-vendedor"
                checked={notificarVendedor}
                onCheckedChange={(checked) => setNotificarVendedor(checked as boolean)}
              />
              <Label htmlFor="notificar-vendedor" className="text-sm">
                Notificar o vendedor sobre a solicitação de reposição
              </Label>
            </div>

            {notificarVendedor && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Vendedor será notificado:</strong> Um email será enviado informando sobre a necessidade de reposição do item {item.codigo_produto}.
                </p>
              </div>
            )}
          </div>

          {/* Alerta de Impacto */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Impacto na Entrega</p>
                <p className="text-sm text-yellow-700">
                  A solicitação de reposição pode afetar o prazo de entrega do pedido. 
                  O vendedor será informado para tomar as devidas providências.
                </p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSolicitarReposicao}
              disabled={!isFormValid}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Solicitar Reposição
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitacaoReposicaoModal;
