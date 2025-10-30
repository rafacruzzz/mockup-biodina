import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VersaoDocumento } from "@/types/produto";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Download, Clock } from "lucide-react";

interface HistoricoVersaoModalProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
  versaoAtual: string;
  historicoVersoes: VersaoDocumento[];
}

export function HistoricoVersaoModal({
  open,
  onClose,
  titulo,
  versaoAtual,
  historicoVersoes,
}: HistoricoVersaoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico de Versões: {titulo}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Versão Atual (Destaque) */}
          <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  v{versaoAtual} - Versão Atual
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Esta é a versão mais recente do documento, atualmente em uso.
            </p>
          </div>

          {/* Versões Anteriores */}
          {historicoVersoes.length > 0 && (
            <>
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                  Versões Anteriores
                </h4>
                <div className="space-y-3">
                  {historicoVersoes.map((versao, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">v{versao.versao}</Badge>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(versao.dataAprovacao, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </div>
                          <p className="text-sm">
                            Aprovado por <span className="font-medium">{versao.aprovadoPor}</span>
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {historicoVersoes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhuma versão anterior encontrada</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
