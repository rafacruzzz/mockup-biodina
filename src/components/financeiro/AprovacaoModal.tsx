// Modal para aprovação de requisições

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, X, AlertTriangle } from 'lucide-react';
import { Requisicao, StatusRequisicao } from '@/types/financeiro';

interface AprovacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  requisicao: Requisicao;
}

const AprovacaoModal = ({ isOpen, onClose, requisicao }: AprovacaoModalProps) => {
  const { toast } = useToast();
  const [comentario, setComentario] = useState('');
  const [processando, setProcessando] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAprovar = async () => {
    setProcessando(true);
    
    // Simular aprovação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Requisição aprovada!",
      description: `Requisição ${requisicao.numeroRequisicao} foi aprovada com sucesso.`,
    });
    
    setProcessando(false);
    onClose();
  };

  const handleRejeitar = async () => {
    if (!comentario.trim()) {
      toast({
        title: "Comentário obrigatório",
        description: "É necessário informar o motivo da rejeição.",
        variant: "destructive"
      });
      return;
    }

    setProcessando(true);
    
    // Simular rejeição
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Requisição rejeitada",
      description: `Requisição ${requisicao.numeroRequisicao} foi rejeitada.`,
      variant: "destructive"
    });
    
    setProcessando(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Aprovar Requisição - {requisicao.numeroRequisicao}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
            <div>
              <span className="font-medium">Solicitante:</span>
              <div>{requisicao.solicitante.nome}</div>
              <div className="text-sm text-muted-foreground">{requisicao.setor}</div>
            </div>
            <div>
              <span className="font-medium">Valor:</span>
              <div className="text-lg font-bold text-primary">{formatCurrency(requisicao.valor)}</div>
            </div>
            <div>
              <span className="font-medium">Vencimento:</span>
              <div>{requisicao.dataVencimento.toLocaleDateString('pt-BR')}</div>
            </div>
            <div>
              <span className="font-medium">Tipo:</span>
              <Badge variant="outline">{requisicao.tipo.replace('_', ' ').toUpperCase()}</Badge>
            </div>
          </div>

          <div>
            <span className="font-medium">Descrição:</span>
            <p className="text-sm text-muted-foreground mt-1">{requisicao.descricao}</p>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Comentário da Aprovação:</label>
            <Textarea
              placeholder="Adicione comentários sobre a aprovação ou rejeição..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={processando}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleRejeitar}
            disabled={processando}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Rejeitar
          </Button>
          <Button 
            onClick={handleAprovar}
            disabled={processando}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AprovacaoModal;