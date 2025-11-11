import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NFComplementarModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedidoId: string;
  numeroNF: string;
  onSolicitar: (data: any) => void;
}

const NFComplementarModal = ({ isOpen, onClose, pedidoId, numeroNF, onSolicitar }: NFComplementarModalProps) => {
  const [valorComplementar, setValorComplementar] = useState('');
  const [motivo, setMotivo] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const { toast } = useToast();

  const handleSolicitar = () => {
    if (!valorComplementar || parseFloat(valorComplementar) <= 0) {
      toast({
        title: "Erro",
        description: "Informe um valor complementar válido.",
        variant: "destructive"
      });
      return;
    }

    if (!motivo.trim() || !justificativa.trim()) {
      toast({
        title: "Erro",
        description: "Motivo e justificativa são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const dados = {
      pedidoId,
      numeroNF,
      valorComplementar: parseFloat(valorComplementar),
      motivo: motivo.trim(),
      justificativa: justificativa.trim(),
      solicitadoPor: 'Usuário Atual', // Em produção, pegar do contexto de autenticação
      dataSolicitacao: new Date().toISOString(),
      status: 'Pendente Aprovacao'
    };

    onSolicitar(dados);
    
    toast({
      title: "Solicitação Enviada",
      description: "A solicitação de NF Complementar foi enviada para aprovação do gestor.",
    });

    // Resetar formulário
    setValorComplementar('');
    setMotivo('');
    setJustificativa('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Solicitar NF Complementar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">NF Original:</span> {numeroNF}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium mb-1">Aprovação Obrigatória</p>
              <p>Esta solicitação precisa ser aprovada por um gestor antes da emissão da NF Complementar.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor Complementar (R$) *</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              min="0.01"
              value={valorComplementar}
              onChange={(e) => setValorComplementar(e.target.value)}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo da Complementação *</Label>
            <Input
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ex: Diferença de preço, Item não faturado, etc."
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {motivo.length}/100 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa Detalhada *</Label>
            <Textarea
              id="justificativa"
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Descreva detalhadamente o motivo da emissão da NF Complementar..."
              rows={6}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {justificativa.length}/500 caracteres
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSolicitar}>
            Solicitar Aprovação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFComplementarModal;
