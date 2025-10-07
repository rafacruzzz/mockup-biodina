import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Clock, User, Calendar, ExternalLink } from "lucide-react";
import type { RamalTelefone, DefeitoRamal } from "@/types/ti";

interface HistoricoDefeitosModalProps {
  open: boolean;
  onClose: () => void;
  ramal: RamalTelefone | null;
  onRegistrarNovo: () => void;
}

export const HistoricoDefeitosModal = ({ open, onClose, ramal, onRegistrarNovo }: HistoricoDefeitosModalProps) => {
  if (!ramal) return null;

  const defeitos = ramal.defeitos || [];
  const defeitosOrdenados = [...defeitos].sort((a, b) => 
    new Date(b.dataRegistro).getTime() - new Date(a.dataRegistro).getTime()
  );

  const getStatusBadge = (status: DefeitoRamal['statusDefeito']) => {
    const config = {
      aberto: { label: "Aberto", variant: "destructive" as const, icon: AlertTriangle },
      em_analise: { label: "Em Análise", variant: "default" as const, icon: Clock },
      em_reparo: { label: "Em Reparo", variant: "default" as const, icon: Clock },
      resolvido: { label: "Resolvido", variant: "secondary" as const, icon: CheckCircle }
    };
    const { label, variant, icon: Icon } = config[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getPrioridadeBadge = (prioridade: DefeitoRamal['prioridade']) => {
    const config = {
      baixa: { label: "Baixa", className: "bg-blue-100 text-blue-800 border-blue-200" },
      media: { label: "Média", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      alta: { label: "Alta", className: "bg-orange-100 text-orange-800 border-orange-200" },
      urgente: { label: "Urgente", className: "bg-red-100 text-red-800 border-red-200" }
    };
    const { label, className } = config[prioridade];
    return <Badge className={className}>{label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Histórico de Defeitos - Ramal {ramal.numeroRamal}
          </DialogTitle>
        </DialogHeader>

        {/* Informações do Ramal */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Número:</span>
              <span className="font-mono font-bold ml-2">{ramal.numeroRamal}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Usuário:</span>
              <span className="font-medium ml-2">{ramal.usuarioAssociado || "Não associado"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Setor:</span>
              <span className="ml-2">{ramal.setor}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Localização:</span>
              <span className="ml-2">{ramal.localizacao}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Modelo:</span>
            <span className="ml-2">{ramal.modeloAparelho}</span>
          </div>
        </div>

        {/* Botão Registrar Novo */}
        <div className="flex justify-end">
          <Button 
            onClick={() => {
              onClose();
              onRegistrarNovo();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Registrar Novo Defeito
          </Button>
        </div>

        <Separator />

        {/* Timeline de Defeitos */}
        {defeitos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum defeito registrado para este ramal</p>
            <p className="text-sm mt-1">Histórico limpo! 🎉</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">
              Histórico ({defeitos.length} {defeitos.length === 1 ? 'defeito' : 'defeitos'})
            </h3>
            
            <div className="space-y-6">
              {defeitosOrdenados.map((defeito, index) => (
                <div key={defeito.id} className="relative">
                  {/* Linha de conexão */}
                  {index < defeitosOrdenados.length - 1 && (
                    <div className="absolute left-[15px] top-[40px] w-0.5 h-[calc(100%+8px)] bg-border" />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Ícone de status */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        defeito.statusDefeito === 'resolvido' 
                          ? 'bg-green-100' 
                          : defeito.statusDefeito === 'aberto'
                          ? 'bg-red-100'
                          : 'bg-yellow-100'
                      }`}>
                        {defeito.statusDefeito === 'resolvido' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : defeito.statusDefeito === 'aberto' ? (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                    </div>

                    {/* Card do defeito */}
                    <div className="flex-1 bg-card border rounded-lg p-4 space-y-3">
                      {/* Cabeçalho */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-base">{defeito.tipoProblema}</h4>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(defeito.statusDefeito)}
                            {getPrioridadeBadge(defeito.prioridade)}
                          </div>
                        </div>
                      </div>

                      {/* Descrição */}
                      <p className="text-sm text-muted-foreground">
                        {defeito.descricaoProblema}
                      </p>

                      {/* Observações */}
                      {defeito.observacoes && (
                        <div className="bg-muted/50 rounded p-2 text-sm">
                          <span className="font-medium">Observações: </span>
                          {defeito.observacoes}
                        </div>
                      )}

                      {/* Metadados */}
                      <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Registrado em {formatDate(defeito.dataRegistro)}</span>
                        </div>
                        
                        {defeito.tecnicoResponsavel && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-3.5 w-3.5" />
                            <span>{defeito.tecnicoResponsavel}</span>
                          </div>
                        )}

                        {defeito.dataResolucao && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>Resolvido em {formatDate(defeito.dataResolucao)}</span>
                          </div>
                        )}

                        {defeito.chamadoVinculado && (
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-primary"
                              onClick={() => {/* Abrir chamado */}}
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              Chamado #{defeito.chamadoVinculado}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
