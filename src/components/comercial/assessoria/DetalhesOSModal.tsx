import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrdemServico } from "@/types/assessoria-cientifica";
import { getTipoOSIcon, getTipoOSLabel, getStatusColor } from "@/data/assessoria-cientifica";
import { Calendar, MapPin, User, Briefcase, Package, FileText, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DetalhesOSModalProps {
  os: OrdemServico;
  isOpen: boolean;
  onClose: () => void;
}

export const DetalhesOSModal = ({ os, isOpen, onClose }: DetalhesOSModalProps) => {
  const statusColor = getStatusColor(os.status);

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">
                {os.tipo.map(t => getTipoOSIcon(t)).join(" ")} {os.numero}
              </DialogTitle>
              <div className="flex flex-wrap gap-1">
                {os.tipo.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs">
                    {getTipoOSLabel(t)}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge 
              variant="outline"
              className="text-sm px-3 py-1"
              style={{ 
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
                color: statusColor.text
              }}
            >
              {os.status === 'EM_ANDAMENTO' ? 'EM ANDAMENTO' : os.status}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          {/* Cliente e Departamento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span className="font-medium">Cliente</span>
              </div>
              <p className="text-sm pl-6">{os.cliente}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span className="font-medium">Departamento</span>
              </div>
              <p className="text-sm pl-6">{os.departamento}</p>
            </div>
          </div>

          {/* Equipamento e Projeto */}
          {(os.equipamento || os.projeto) && (
            <div className="grid grid-cols-2 gap-4">
              {os.equipamento && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span className="font-medium">Equipamento</span>
                  </div>
                  <p className="text-sm pl-6">{os.equipamento}</p>
                </div>
              )}
              {os.projeto && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Projeto</span>
                  </div>
                  <p className="text-sm pl-6">{os.projeto}</p>
                </div>
              )}
            </div>
          )}

          {/* Responsável e Opção de Atendimento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">Responsável</span>
              </div>
              <p className="text-sm pl-6">{os.responsavel}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Atendimento</span>
              </div>
              <p className="text-sm pl-6 capitalize">{os.opcaoAtendimento}</p>
            </div>
          </div>

          <Separator />

          {/* Datas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Agendamento e Datas</span>
            </div>
            <div className="pl-6 space-y-1">
              <p className="text-sm">
                <span className="text-muted-foreground">Agendada para:</span>{" "}
                <span className="font-medium">{formatDate(os.dataAgendada)}</span>
              </p>
              {os.dataInicio && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Iniciada em:</span>{" "}
                  <span className="font-medium">{formatDate(os.dataInicio)}</span>
                </p>
              )}
              {os.dataConclusao && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Concluída em:</span>{" "}
                  <span className="font-medium">{formatDate(os.dataConclusao)}</span>
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Descrição do Serviço */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Descrição do Serviço</span>
            </div>
            <p className="text-sm pl-6">{os.descricaoServico}</p>
          </div>

          {/* Serviço Realizado */}
          {os.servicoRealizado && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Serviço Realizado</span>
              </div>
              <p className="text-sm pl-6">{os.servicoRealizado}</p>
            </div>
          )}

          {/* Observações */}
          {os.observacoes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Observações</span>
              </div>
              <p className="text-sm pl-6 text-muted-foreground italic">{os.observacoes}</p>
            </div>
          )}

          <Separator />

          {/* Informações de criação */}
          <div className="space-y-1 text-xs text-muted-foreground pl-6">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>Aberto por {os.abertoPor} em {formatDate(os.abertoEm)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>Última atualização em {formatDate(os.atualizadoEm)}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Ver Detalhes Completos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
