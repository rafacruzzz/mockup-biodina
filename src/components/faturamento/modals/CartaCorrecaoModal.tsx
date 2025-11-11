import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileEdit, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartaCorrecaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedidoId: string;
  numeroNF: string;
  chaveAcesso: string;
  onSolicitar: (data: any) => void;
}

const CartaCorrecaoModal = ({ isOpen, onClose, pedidoId, numeroNF, chaveAcesso, onSolicitar }: CartaCorrecaoModalProps) => {
  const [correcao, setCorrecao] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const { toast } = useToast();

  const handleSolicitar = () => {
    if (!correcao.trim() || !justificativa.trim()) {
      toast({
        title: "Erro",
        description: "Correção e justificativa são obrigatórias.",
        variant: "destructive"
      });
      return;
    }

    const dados = {
      pedidoId,
      numeroNF,
      chaveAcesso,
      correcao: correcao.trim(),
      justificativa: justificativa.trim(),
      solicitadoPor: 'Usuário Atual', // Em produção, pegar do contexto de autenticação
      dataSolicitacao: new Date().toISOString(),
      status: 'Pendente Aprovacao'
    };

    onSolicitar(dados);
    
    toast({
      title: "Solicitação Enviada",
      description: "A solicitação de Carta de Correção foi enviada para aprovação do gestor.",
    });

    // Resetar formulário
    setCorrecao('');
    setJustificativa('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileEdit className="h-5 w-5" />
            Solicitar Carta de Correção (CC-e)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm">
              <span className="font-medium">NF-e:</span> {numeroNF}
            </p>
            <p className="text-xs text-muted-foreground break-all">
              <span className="font-medium">Chave:</span> {chaveAcesso}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium mb-1">Aprovação Obrigatória</p>
              <p>Esta solicitação precisa ser aprovada por um gestor antes do envio para a SEFAZ.</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm">
              Limitações da Carta de Correção
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Não pode alterar valores ou quantidades</li>
              <li>• Não pode mudar dados cadastrais que determinem o cálculo do imposto</li>
              <li>• Não pode alterar a data de emissão ou saída</li>
              <li>• Pode corrigir: endereços, descrições, NCM, CFOP (sem alterar tributos)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correcao">Texto da Correção *</Label>
            <Textarea
              id="correcao"
              value={correcao}
              onChange={(e) => setCorrecao(e.target.value)}
              placeholder="Descreva o que será corrigido na NF-e. Ex: Correção do endereço de entrega..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">
              {correcao.length}/1000 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa da Correção *</Label>
            <Textarea
              id="justificativa"
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Explique o motivo da correção e por que é necessária..."
              rows={5}
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

export default CartaCorrecaoModal;
