import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartaFaturamento } from "@/types/faturamento";
import { Download, Send, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

interface VisualizarCartaModalProps {
  carta: CartaFaturamento;
  onClose: () => void;
}

const VisualizarCartaModal = ({ carta, onClose }: VisualizarCartaModalProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusSignatarioIcon = (status: string) => {
    const icons = {
      pendente: <Clock className="w-4 h-4 text-yellow-500" />,
      assinado: <CheckCircle className="w-4 h-4 text-green-500" />,
      rejeitado: <XCircle className="w-4 h-4 text-red-500" />,
    };
    return icons[status as keyof typeof icons] || icons.pendente;
  };

  const handleReenviar = (signatarioId: string) => {
    toast.success('E-mail reenviado com sucesso!');
  };

  const handleDownload = () => {
    if (carta.arquivoPdfAssinado || carta.arquivoPdfOriginal) {
      const link = document.createElement('a');
      link.href = carta.arquivoPdfAssinado || carta.arquivoPdfOriginal!;
      link.download = `Carta_Faturamento_${carta.competencia.replace('/', '_')}.pdf`;
      link.click();
      toast.success('Download iniciado');
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Carta de Faturamento - {carta.competencia}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Competência</p>
                <p className="font-medium">{carta.competencia}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Geração</p>
                <p className="font-medium">{new Date(carta.dataGeracao).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Faturamento Total (12 meses)</p>
                <p className="font-medium text-lg text-green-600">{formatCurrency(carta.totalPeriodo)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1">
                  {carta.status === 'rascunho' && 'Rascunho'}
                  {carta.status === 'pendente_assinatura' && 'Aguardando Assinatura'}
                  {carta.status === 'assinado' && 'Assinado'}
                  {carta.status === 'enviado_tesouraria' && 'Enviado para Tesouraria'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Signatários */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Signatários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {carta.signatarios.map((signatario) => (
                  <div key={signatario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusSignatarioIcon(signatario.status)}
                      <div>
                        <p className="font-medium">{signatario.nome}</p>
                        <p className="text-sm text-muted-foreground">{signatario.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {signatario.cargo === 'socio' ? 'Sócio' : 'Contador'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {signatario.status === 'assinado' && signatario.dataAssinatura && (
                        <span className="text-xs text-green-600">
                          Assinado em {new Date(signatario.dataAssinatura).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                      {signatario.status === 'pendente' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReenviar(signatario.id)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Reenviar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Envios */}
          {carta.historicoEnvios.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Envios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {carta.historicoEnvios.map((envio) => (
                    <div key={envio.id} className="flex items-center justify-between text-sm p-2 border-b last:border-0">
                      <div>
                        <span className="font-medium">{envio.tipo.replace(/_/g, ' ')}</span>
                        <span className="text-muted-foreground"> para {envio.destinatario}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(envio.dataEnvio).toLocaleDateString('pt-BR')} {new Date(envio.dataEnvio).toLocaleTimeString('pt-BR')}
                        </span>
                        <Badge variant={envio.statusEntrega === 'entregue' ? 'default' : 'destructive'}>
                          {envio.statusEntrega}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            {(carta.arquivoPdfAssinado || carta.arquivoPdfOriginal) && (
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarCartaModal;
