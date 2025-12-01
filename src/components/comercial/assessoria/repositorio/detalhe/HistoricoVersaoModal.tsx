import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VersaoDocumento, ChangelogEntry } from "@/types/produto";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Download, Clock, Lock, FileText, User } from "lucide-react";

interface HistoricoVersaoModalProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
  versaoAtual: string;
  historicoVersoes: VersaoDocumento[];
  changelog?: ChangelogEntry[];
  bloqueadoSobrescrita?: boolean;
}

export function HistoricoVersaoModal({
  open,
  onClose,
  titulo,
  versaoAtual,
  historicoVersoes,
  changelog = [],
  bloqueadoSobrescrita = false,
}: HistoricoVersaoModalProps) {
  // Encontra o changelog da versão atual
  const changelogAtual = changelog.find(c => c.versaoNova === versaoAtual);
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
          {/* Informação sobre bloqueio */}
          {bloqueadoSobrescrita && (
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-yellow-900 dark:text-yellow-200">
                  Documento Bloqueado para Sobrescrita
                </p>
                <p className="text-xs text-yellow-800 dark:text-yellow-300 mt-0.5">
                  Versões antigas são somente leitura. Novas alterações requerem criação de nova versão.
                </p>
              </div>
            </div>
          )}

          {/* Versão Atual (Destaque) */}
          <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  v{versaoAtual} - Versão Atual
                </Badge>
                {bloqueadoSobrescrita && (
                  <Lock className="h-4 w-4 text-yellow-600" />
                )}
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Changelog da versão atual */}
            {changelogAtual && (
              <div className="space-y-2 mt-3 pt-3 border-t">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1.5 mb-1">
                      <FileText className="h-3.5 w-3.5" />
                      O que mudou
                    </p>
                    <p className="font-medium">{changelogAtual.oqueMudou}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1.5 mb-1">
                      <FileText className="h-3.5 w-3.5" />
                      Por que mudou
                    </p>
                    <p className="font-medium">{changelogAtual.porqueMudou}</p>
                  </div>
                </div>
                {changelogAtual.aprovadoPor && (
                  <div className="text-sm">
                    <p className="text-muted-foreground flex items-center gap-1.5 mb-1">
                      <User className="h-3.5 w-3.5" />
                      Aprovado por
                    </p>
                    <p className="font-medium">{changelogAtual.aprovadoPor}</p>
                  </div>
                )}
              </div>
            )}

            {!changelogAtual && (
              <p className="text-sm text-muted-foreground">
                Esta é a versão mais recente do documento, atualmente em uso.
              </p>
            )}
          </div>

          {/* Versões Anteriores */}
          {historicoVersoes.length > 0 && (
            <>
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                  Versões Anteriores
                </h4>
                <div className="space-y-3">
                  {historicoVersoes.map((versao, index) => {
                    const changelogVersao = changelog.find(c => c.versaoNova === versao.versao);
                    
                    return (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">v{versao.versao}</Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Lock className="h-3 w-3 mr-1" />
                              Somente Leitura
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(versao.dataAprovacao, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Changelog da versão antiga */}
                        {changelogVersao && (
                          <div className="space-y-2 pt-2 border-t">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs mb-1">O que mudou</p>
                                <p className="text-sm">{changelogVersao.oqueMudou}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs mb-1">Por que mudou</p>
                                <p className="text-sm">{changelogVersao.porqueMudou}</p>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Alterado por <span className="font-medium">{changelogVersao.alteradoPor}</span>
                              {changelogVersao.aprovadoPor && (
                                <> • Aprovado por <span className="font-medium">{changelogVersao.aprovadoPor}</span></>
                              )}
                            </div>
                          </div>
                        )}

                        {!changelogVersao && (
                          <p className="text-sm text-muted-foreground">
                            Aprovado por <span className="font-medium">{versao.aprovadoPor}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
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
