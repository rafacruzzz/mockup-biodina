import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CancelamentoNotaServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico?: {
    servicoId: string;
    descricaoServico: string;
    cliente: string;
    valor: number;
    numeroNFSe?: string;
    dataEmissao?: string;
  };
  onCancelar?: (dados: any) => void;
}

const CancelamentoNotaServicoModal = ({ 
  isOpen, 
  onClose, 
  servico,
  onCancelar
}: CancelamentoNotaServicoModalProps) => {
  const [justificativa, setJustificativa] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!justificativa.trim()) {
      toast({
        title: "Justificativa obrigatória",
        description: "Por favor, informe a justificativa para o cancelamento da NFS-e.",
        variant: "destructive",
      });
      return;
    }

    if (justificativa.trim().length < 20) {
      toast({
        title: "Justificativa muito curta",
        description: "A justificativa deve ter pelo menos 20 caracteres.",
        variant: "destructive",
      });
      return;
    }

    // Simular envio para aprovação do gestor
    toast({
      title: "Solicitação enviada para aprovação!",
      description: `A solicitação de cancelamento da NFS-e ${servico?.numeroNFSe || ''} foi enviada para aprovação do gestor.`,
    });

    if (onCancelar) {
      onCancelar({ justificativa, servico });
    }

    setJustificativa('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <XCircle className="h-6 w-6 text-red-600" />
            Cancelamento de NFS-e {servico?.numeroNFSe && `- ${servico.numeroNFSe}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {servico?.descricaoServico && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Serviço:</p>
              <p className="font-medium">{servico.descricaoServico}</p>
              <p className="text-sm text-gray-600 mt-1">Cliente: {servico.cliente}</p>
            </div>
          )}

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-red-900">Atenção: Cancelamento de NFS-e</p>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li>O cancelamento de NFS-e é uma operação fiscal importante</li>
                <li>Esta solicitação será enviada para aprovação do gestor</li>
                <li>Após aprovação, o cancelamento será processado junto à prefeitura</li>
                <li>Uma vez cancelada, a nota não poderá ser reativada</li>
                <li>Pode ser necessário emitir uma nova NFS-e caso o serviço seja mantido</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Justificativa do Cancelamento *
            </label>
            <Textarea
              placeholder="Descreva detalhadamente o motivo do cancelamento da NFS-e (mínimo 20 caracteres)..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              {justificativa.length} caracteres (mínimo 20)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700"
          >
            Enviar para Aprovação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelamentoNotaServicoModal;
