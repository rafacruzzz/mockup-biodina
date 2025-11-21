import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Webform } from "@/types/super";
import { BarChart3, Users, Link2, TrendingUp } from "lucide-react";

interface WebformStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  webform: Webform | null;
}

export const WebformStatsModal = ({ open, onOpenChange, webform }: WebformStatsModalProps) => {
  if (!webform) return null;

  const taxaConversao = webform.totalAcessos > 0 
    ? ((webform.totalCadastros / webform.totalAcessos) * 100).toFixed(1)
    : "0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Estatísticas: {webform.titulo}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {/* Card de Acessos */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Acessos</p>
                  <p className="text-3xl font-bold">{webform.totalAcessos}</p>
                </div>
                <Link2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Card de Cadastros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cadastros</p>
                  <p className="text-3xl font-bold">{webform.totalCadastros}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Card de Taxa de Conversão */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                  <p className="text-3xl font-bold">{taxaConversao}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Data de Criação</p>
              <p className="font-medium">{new Date(webform.dataCriacao).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Último Acesso</p>
              <p className="font-medium">
                {webform.ultimoAcesso 
                  ? new Date(webform.ultimoAcesso).toLocaleDateString('pt-BR')
                  : 'Nenhum acesso ainda'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{webform.status === 'ativo' ? '🟢 Ativo' : '⚪ Inativo'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trial</p>
              <p className="font-medium">
                {webform.trial ? `Sim (${webform.diasTrial} dias)` : 'Não'}
              </p>
            </div>
          </div>

          {webform.descricao && (
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="mt-1 text-sm">{webform.descricao}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
