import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ArquivarConfirmModalProps {
  open: boolean;
  onClose: () => void;
  tipo: "marca" | "linha";
  nome: string;
  impacto?: {
    linhas?: number;
    produtos?: number;
  };
  onConfirm: () => void;
}

export function ArquivarConfirmModal({
  open,
  onClose,
  tipo,
  nome,
  impacto,
  onConfirm,
}: ArquivarConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Arquivar {tipo === "marca" ? "Marca" : "Linha"}
          </DialogTitle>
          <DialogDescription>
            Esta ação pode ser revertida posteriormente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm">
            Tem certeza que deseja arquivar <span className="font-semibold">{nome}</span>?
          </p>

          {impacto && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200 mb-2">
                Impacto desta ação:
              </p>
              <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                {impacto.linhas !== undefined && (
                  <li>• {impacto.linhas} {impacto.linhas === 1 ? 'linha será arquivada' : 'linhas serão arquivadas'}</li>
                )}
                {impacto.produtos !== undefined && (
                  <li>• {impacto.produtos} {impacto.produtos === 1 ? 'produto será afetado' : 'produtos serão afetados'}</li>
                )}
              </ul>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Itens arquivados não aparecem nas listagens principais mas podem ser restaurados a qualquer momento.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => {
            onConfirm();
            onClose();
          }}>
            Arquivar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
