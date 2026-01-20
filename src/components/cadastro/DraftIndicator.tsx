import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  Clock, 
  FileText, 
  Trash2, 
  RefreshCw,
  Save
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DraftIndicatorProps {
  hasDraft: boolean;
  draftInfo: {
    createdAt: string;
    expiresAt: string;
    daysRemaining: number;
  } | null;
  onRestore: () => void;
  onDiscard: () => void;
  entityLabel?: string;
}

export const DraftIndicator = ({
  hasDraft,
  draftInfo,
  onRestore,
  onDiscard,
  entityLabel = 'cadastro'
}: DraftIndicatorProps) => {
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  if (!hasDraft || !draftInfo) return null;

  const isExpiringSoon = draftInfo.daysRemaining <= 2;
  const formattedDate = new Date(draftInfo.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <Alert variant={isExpiringSoon ? "destructive" : "default"} className="mb-4">
        <FileText className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          Rascunho encontrado
          <Badge variant={isExpiringSoon ? "destructive" : "secondary"} className="ml-2">
            <Clock className="h-3 w-3 mr-1" />
            {draftInfo.daysRemaining} {draftInfo.daysRemaining === 1 ? 'dia' : 'dias'} restantes
          </Badge>
        </AlertTitle>
        <AlertDescription className="mt-2">
          <p className="text-sm mb-3">
            Existe um rascunho de {entityLabel} salvo em {formattedDate}.
            {isExpiringSoon && (
              <span className="text-destructive font-medium ml-1">
                Atenção: este rascunho expira em breve!
              </span>
            )}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={onRestore}
              className="gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Restaurar Rascunho
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDiscardDialog(true)}
              className="gap-1 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
              Descartar
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Descartar rascunho?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O rascunho salvo em {formattedDate} será permanentemente excluído.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDiscard();
                setShowDiscardDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Botão separado para usar no footer dos modais
interface DraftSaveButtonProps {
  onSaveDraft: () => void;
  disabled?: boolean;
}

export const DraftSaveButton = ({ onSaveDraft, disabled }: DraftSaveButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onSaveDraft}
      disabled={disabled}
      className="gap-2"
    >
      <Save className="h-4 w-4" />
      Salvar Rascunho
    </Button>
  );
};
