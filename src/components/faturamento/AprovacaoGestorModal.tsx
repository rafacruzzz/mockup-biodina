import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SolicitacaoAprovacao {
  id: string;
  tipo: 'NF Complementar' | 'Carta de Correção';
  numeroNF: string;
  pedidoId: string;
  solicitadoPor: string;
  dataSolicitacao: string;
  motivo?: string; // Para NF Complementar
  valorComplementar?: number; // Para NF Complementar
  correcao?: string; // Para Carta de Correção
  justificativa: string;
  status: 'Pendente Aprovacao' | 'Aprovado' | 'Rejeitado';
}

interface AprovacaoGestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitacao: SolicitacaoAprovacao | null;
  onAprovar: (id: string) => void;
  onRejeitar: (id: string, motivo: string) => void;
}

const AprovacaoGestorModal = ({ isOpen, onClose, solicitacao, onAprovar, onRejeitar }: AprovacaoGestorModalProps) => {
  const [motivoRejeicao, setMotivoRejeicao] = useState('');
  const [mostrarRejeicao, setMostrarRejeicao] = useState(false);
  const { toast } = useToast();

  if (!solicitacao) return null;

  const handleAprovar = () => {
    onAprovar(solicitacao.id);
    toast({
      title: "Solicitação Aprovada",
      description: `A solicitação de ${solicitacao.tipo} foi aprovada com sucesso.`,
    });
    onClose();
  };

  const handleRejeitar = () => {
    if (!motivoRejeicao.trim()) {
      toast({
        title: "Erro",
        description: "Informe o motivo da rejeição.",
        variant: "destructive"
      });
      return;
    }

    onRejeitar(solicitacao.id, motivoRejeicao);
    toast({
      title: "Solicitação Rejeitada",
      description: "A solicitação foi rejeitada e o solicitante será notificado.",
    });
    setMotivoRejeicao('');
    setMostrarRejeicao(false);
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Aprovação de Solicitação - {solicitacao.tipo}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status e Informações Gerais */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant={
                solicitacao.status === 'Aprovado' ? 'default' :
                solicitacao.status === 'Rejeitado' ? 'destructive' :
                'secondary'
              }>
                {solicitacao.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">NF Original:</span> {solicitacao.numeroNF}
              </div>
              <div>
                <span className="font-medium">Pedido:</span> {solicitacao.pedidoId}
              </div>
              <div>
                <span className="font-medium">Solicitado por:</span> {solicitacao.solicitadoPor}
              </div>
              <div>
                <span className="font-medium">Data:</span> {formatDate(solicitacao.dataSolicitacao)}
              </div>
            </div>
          </div>

          {/* Detalhes Específicos */}
          {solicitacao.tipo === 'NF Complementar' && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Detalhes da NF Complementar
                </h4>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <div>
                    <span className="font-medium">Valor Complementar:</span>{' '}
                    <span className="text-lg font-bold">
                      {solicitacao.valorComplementar ? formatCurrency(solicitacao.valorComplementar) : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Motivo:</span> {solicitacao.motivo || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {solicitacao.tipo === 'Carta de Correção' && (
            <div className="space-y-4">
              <div>
                <Label>Texto da Correção</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg text-sm">
                  {solicitacao.correcao || 'N/A'}
                </div>
              </div>
            </div>
          )}

          {/* Justificativa */}
          <div>
            <Label>Justificativa</Label>
            <div className="mt-2 p-4 bg-muted rounded-lg text-sm">
              {solicitacao.justificativa}
            </div>
          </div>

          {/* Área de Rejeição */}
          {mostrarRejeicao && (
            <div className="space-y-2 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <Label htmlFor="motivoRejeicao" className="text-red-900 dark:text-red-100">
                Motivo da Rejeição *
              </Label>
              <Textarea
                id="motivoRejeicao"
                value={motivoRejeicao}
                onChange={(e) => setMotivoRejeicao(e.target.value)}
                placeholder="Descreva o motivo da rejeição..."
                rows={4}
                maxLength={300}
                className="bg-white dark:bg-gray-900"
              />
              <p className="text-xs text-red-700 dark:text-red-300">
                {motivoRejeicao.length}/300 caracteres
              </p>
            </div>
          )}

          {/* Aviso Importante */}
          {solicitacao.status === 'Pendente Aprovacao' && (
            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium mb-1">Decisão Importante</p>
                <p>Ao aprovar, a {solicitacao.tipo} será {solicitacao.tipo === 'Carta de Correção' ? 'enviada para a SEFAZ' : 'emitida'}. Verifique todas as informações antes de confirmar.</p>
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        {solicitacao.status === 'Pendente Aprovacao' && (
          <div className="flex justify-end gap-2">
            {!mostrarRejeicao ? (
              <>
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Fechar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setMostrarRejeicao(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeitar
                </Button>
                <Button
                  onClick={handleAprovar}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprovar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setMostrarRejeicao(false);
                    setMotivoRejeicao('');
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRejeitar}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Confirmar Rejeição
                </Button>
              </>
            )}
          </div>
        )}

        {solicitacao.status !== 'Pendente Aprovacao' && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AprovacaoGestorModal;
