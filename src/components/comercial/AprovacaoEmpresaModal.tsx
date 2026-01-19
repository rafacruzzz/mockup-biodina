import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  FileText,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AprovacaoEmpresa } from '@/types/licitacao';

interface AprovacaoEmpresaModalProps {
  isOpen: boolean;
  onClose: () => void;
  licitacaoData: {
    id: number;
    numeroPregao: string;
    nomeInstituicao: string;
    objetoLicitacao: string;
    empresaParticipanteNome?: string;
    empresaParticipanteCNPJ?: string;
  };
  onAprovar: (aprovacao: AprovacaoEmpresa) => void;
  onRejeitar: (aprovacao: AprovacaoEmpresa) => void;
}

export default function AprovacaoEmpresaModal({
  isOpen,
  onClose,
  licitacaoData,
  onAprovar,
  onRejeitar
}: AprovacaoEmpresaModalProps) {
  const { toast } = useToast();
  const [observacao, setObservacao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAprovar = async () => {
    if (!observacao.trim()) {
      toast({
        title: "Observação obrigatória",
        description: "Por favor, adicione uma observação para aprovar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 500));

    const aprovacao: AprovacaoEmpresa = {
      status: 'aprovado',
      aprovadoPor: 'Gestor Comercial', // Em produção viria do contexto de usuário
      aprovadoEm: new Date().toLocaleDateString('pt-BR'),
      observacao
    };

    onAprovar(aprovacao);
    
    toast({
      title: "Empresa aprovada",
      description: "A escolha da empresa foi aprovada com sucesso.",
    });

    setIsSubmitting(false);
    setObservacao('');
    onClose();
  };

  const handleRejeitar = async () => {
    if (!observacao.trim()) {
      toast({
        title: "Observação obrigatória",
        description: "Por favor, adicione uma justificativa para a rejeição.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const aprovacao: AprovacaoEmpresa = {
      status: 'rejeitado',
      aprovadoPor: 'Gestor Comercial',
      aprovadoEm: new Date().toLocaleDateString('pt-BR'),
      observacao
    };

    onRejeitar(aprovacao);
    
    toast({
      title: "Empresa rejeitada",
      description: "A escolha da empresa foi rejeitada. O responsável será notificado.",
      variant: "destructive"
    });

    setIsSubmitting(false);
    setObservacao('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Aprovação de Empresa Participante
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dados da Licitação */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados da Licitação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pregão:</span>
                <span className="font-medium">{licitacaoData.numeroPregao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instituição:</span>
                <span className="font-medium">{licitacaoData.nomeInstituicao}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Objeto:</span>
                <p className="mt-1 text-sm">{licitacaoData.objetoLicitacao}</p>
              </div>
            </CardContent>
          </Card>

          {/* Empresa Selecionada */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Empresa Selecionada para Participar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">{licitacaoData.empresaParticipanteNome || 'Não selecionada'}</p>
                  <p className="text-sm text-muted-foreground">
                    CNPJ: {licitacaoData.empresaParticipanteCNPJ || '-'}
                  </p>
                </div>
                <Badge variant="secondary">Aguardando Aprovação</Badge>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Observação */}
          <div className="space-y-2">
            <Label htmlFor="observacao" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Observação <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="observacao"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Adicione uma observação para registrar sua decisão..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Esta observação será registrada no histórico da licitação.
            </p>
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800">Atenção</p>
              <p className="text-amber-700">
                A aprovação da empresa permite que a licitação avance para a fase de proposta.
                Esta ação será registrada para auditoria.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleRejeitar}
            disabled={isSubmitting}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Rejeitar
          </Button>
          <Button 
            variant="default" 
            onClick={handleAprovar}
            disabled={isSubmitting}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
