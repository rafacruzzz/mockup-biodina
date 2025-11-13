import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  User, 
  Building2, 
  Package, 
  Hash,
  Target,
  Clock,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import { ChamadoAssessoria, TIPO_CHAMADO_LABELS, STATUS_CHAMADO_LABELS, URGENCIA_CHAMADO_LABELS } from "@/types/assessoria-cientifica";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DetalhesChamadoSheetProps {
  chamado: ChamadoAssessoria;
  isOpen: boolean;
  onClose: () => void;
}

export function DetalhesChamadoSheet({ chamado, isOpen, onClose }: DetalhesChamadoSheetProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ABERTO': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'EM_ANALISE': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'EM_EXECUCAO': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'AGUARDANDO_CLIENTE': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'AGUARDANDO_AREA': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'RESOLVIDO': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'BAIXA': return 'bg-green-100 text-green-800 border-green-300';
      case 'MEDIA': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'ALTA': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'URGENTE': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Detalhamento do Chamado</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{chamado.numeroChamado}</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className={getStatusColor(chamado.status)}>
                  {STATUS_CHAMADO_LABELS[chamado.status]}
                </Badge>
                <Badge variant="outline" className={getUrgenciaColor(chamado.urgencia)}>
                  {chamado.urgencia === 'URGENTE' && <AlertCircle className="h-3 w-3 mr-1" />}
                  {URGENCIA_CHAMADO_LABELS[chamado.urgencia]}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{chamado.origem}</span>
              <span>→</span>
              <span>{chamado.destino}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Informações do Projeto
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Projeto-Mãe</p>
                  <p className="font-medium">{chamado.projetoMaeNumero}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Código da OS</p>
                  <p className="font-medium">{chamado.numeroOS}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Cliente</p>
                  <p className="font-medium">{chamado.clienteNome}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Equipamento</p>
                  <p className="font-medium">{chamado.equipamentoModelo || '-'}</p>
                </div>
              </div>
              {chamado.numeroSerieLote && (
                <div className="flex items-start gap-2 col-span-2">
                  <Hash className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Número de Série/Lote</p>
                    <p className="font-medium font-mono">{chamado.numeroSerieLote}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Detalhes do Chamado
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Aberto por</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {chamado.abertoPorNome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{chamado.abertoPorNome}</span>
                  <Badge variant="outline" className="text-xs">
                    {chamado.abertoPorDepartamento}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Data de Abertura</p>
                  <p className="font-medium">
                    {format(chamado.dataAbertura, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>

              {chamado.responsavelAtualNome && (
                <div>
                  <p className="text-muted-foreground mb-1">Responsável Atual</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {chamado.responsavelAtualNome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{chamado.responsavelAtualNome}</span>
                  </div>
                </div>
              )}

              <div>
                <p className="text-muted-foreground mb-1">Tipo do Chamado</p>
                <Badge variant="outline">{TIPO_CHAMADO_LABELS[chamado.tipo]}</Badge>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Motivo / Descrição da Ocorrência</p>
                <p className="text-sm leading-relaxed bg-muted/30 p-3 rounded-md">
                  {chamado.motivoDescricao}
                </p>
              </div>

              {chamado.prazoEstimado && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Prazo Estimado</p>
                    <p className="font-medium">
                      {format(chamado.prazoEstimado, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {(chamado.estrategiaResolucao || chamado.resultadoFinal) && (
            <>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Estratégia e Resultado
                </h4>
                <div className="space-y-3 text-sm">
                  {chamado.estrategiaResolucao && (
                    <div>
                      <p className="text-muted-foreground mb-1">Estratégia de Resolução</p>
                      <p className="text-sm leading-relaxed bg-blue-50 p-3 rounded-md border border-blue-200">
                        {chamado.estrategiaResolucao}
                      </p>
                    </div>
                  )}
                  {chamado.resultadoFinal && (
                    <div>
                      <p className="text-muted-foreground mb-1">Resultado Final</p>
                      <p className="text-sm leading-relaxed bg-green-50 p-3 rounded-md border border-green-200">
                        {chamado.resultadoFinal}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Histórico de Interações
            </h4>
            <div className="space-y-3">
              {chamado.interacoes.map((interacao, index) => (
                <div key={interacao.id} className="relative pl-8 pb-4">
                  {index < chamado.interacoes.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  <div className="absolute left-0 top-0">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {interacao.autorNome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-md space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{interacao.autorNome}</span>
                        <Badge variant="outline" className="text-xs">
                          {interacao.autorDepartamento}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(interacao.data, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-primary">{interacao.acao}</p>
                    <p className="text-sm leading-relaxed">{interacao.mensagem}</p>
                    
                    {interacao.statusAnterior && interacao.statusNovo && (
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className={getStatusColor(interacao.statusAnterior)}>
                          {STATUS_CHAMADO_LABELS[interacao.statusAnterior]}
                        </Badge>
                        <span>→</span>
                        <Badge variant="outline" className={getStatusColor(interacao.statusNovo)}>
                          {STATUS_CHAMADO_LABELS[interacao.statusNovo]}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {chamado.evidencias && chamado.evidencias.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Evidências ({chamado.evidencias.length})
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {chamado.evidencias.map((evidencia) => (
                    <div key={evidencia.id} className="border rounded-md p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        {evidencia.tipo === 'foto' && <ImageIcon className="h-4 w-4" />}
                        {evidencia.tipo === 'documento' && <FileText className="h-4 w-4" />}
                        <span className="text-sm font-medium">{evidencia.nomeArquivo}</span>
                      </div>
                      {evidencia.descricao && (
                        <p className="text-xs text-muted-foreground">{evidencia.descricao}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Enviado por {evidencia.uploadPorNome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {(chamado.assinaturaCliente || chamado.assinaturaAssessor) && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold">Assinaturas Digitais</h4>
                <div className="grid grid-cols-2 gap-4">
                  {chamado.assinaturaCliente && (
                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Cliente</p>
                      <p className="text-xs text-muted-foreground">{chamado.assinaturaCliente}</p>
                      {chamado.dataAssinaturaCliente && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(chamado.dataAssinaturaCliente, "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      )}
                    </div>
                  )}
                  {chamado.assinaturaAssessor && (
                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Assessor</p>
                      <p className="text-xs text-muted-foreground">{chamado.assinaturaAssessor}</p>
                      {chamado.dataAssinaturaAssessor && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(chamado.dataAssinaturaAssessor, "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
