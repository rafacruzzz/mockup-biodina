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
import { Label } from '@/components/ui/label';
import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react';
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
  const [justificativaInterna, setJustificativaInterna] = useState('');
  const [justificativaNota, setJustificativaNota] = useState('ERRO DE EMISSÃO');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!justificativaInterna.trim()) {
      toast({
        title: "Justificativa interna obrigatória",
        description: "Por favor, informe a justificativa detalhada para uso interno.",
        variant: "destructive",
      });
      return;
    }

    if (justificativaInterna.trim().length < 20) {
      toast({
        title: "Justificativa muito curta",
        description: "A justificativa interna deve ter pelo menos 20 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (!justificativaNota.trim()) {
      toast({
        title: "Justificativa na nota obrigatória",
        description: "Por favor, informe a justificativa que aparecerá na NFS-e.",
        variant: "destructive",
      });
      return;
    }

    if (justificativaNota.trim().length < 15) {
      toast({
        title: "Justificativa na nota muito curta",
        description: "A justificativa na nota deve ter pelo menos 15 caracteres.",
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
      onCancelar({ 
        justificativaInterna, 
        justificativaNota,
        servico 
      });
    }

    setJustificativaInterna('');
    setJustificativaNota('ERRO DE EMISSÃO');
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

          {/* Alerta de aprovação do gestor */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-amber-900">Esta solicitação requer aprovação do gestor</p>
              <p className="text-amber-800">
                Após o envio, um gestor irá revisar e aprovar ou rejeitar esta solicitação de cancelamento.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-red-900">Atenção: Cancelamento de NFS-e</p>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li>O cancelamento de NFS-e é uma operação fiscal importante</li>
                <li>Após aprovação, o cancelamento será processado junto à prefeitura</li>
                <li>Uma vez cancelada, a nota não poderá ser reativada</li>
                <li>Pode ser necessário emitir uma nova NFS-e caso o serviço seja mantido</li>
              </ul>
            </div>
          </div>

          {/* Justificativa Interna */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Justificativa Detalhada (uso interno) *
            </Label>
            <Textarea
              placeholder="Descreva detalhadamente o motivo do cancelamento (mínimo 20 caracteres)..."
              value={justificativaInterna}
              onChange={(e) => setJustificativaInterna(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Esta justificativa é para uso interno e não será enviada à prefeitura. {justificativaInterna.length} caracteres (mínimo 20)
            </p>
          </div>

          {/* Justificativa na Nota */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Justificativa na Nota *
            </Label>
            <Textarea
              placeholder="Justificativa que aparecerá no documento fiscal..."
              value={justificativaNota}
              onChange={(e) => setJustificativaNota(e.target.value)}
              rows={2}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Esta justificativa será enviada à prefeitura no evento de cancelamento. {justificativaNota.length} caracteres (mínimo 15)
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
