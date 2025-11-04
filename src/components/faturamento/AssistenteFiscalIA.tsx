import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Lightbulb, Clock, Bell } from "lucide-react";
import { toast } from "sonner";

interface AlertaFiscal {
  tipo: 'info' | 'warning' | 'success' | 'suggestion';
  mensagem: string;
  icon: React.ReactNode;
}

const AssistenteFiscalIA = () => {
  // Mock data - OS pendente de baixa fiscal
  const osPendentesBaixaFiscal = [
    {
      osId: 'OS-2025-001-ID',
      numeroOS: 'OS-2025-001',
      tecnicoId: 'TEC001',
      nomeTecnico: 'João Silva',
      dataRemessa: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 horas atrás
      prazoLimite: new Date(Date.now() - 2 * 60 * 60 * 1000), // venceu há 2 horas
      horasVencidas: 2,
      statusBloqueio: 'Bloqueado'
    }
  ];
  
  const notificarGestor = () => {
    toast.success("Gestor notificado sobre OSs pendentes de baixa fiscal");
  };

  const alertas: AlertaFiscal[] = [
    {
      tipo: 'warning',
      mensagem: '3 NF-e aguardando retorno da SEFAZ.',
      icon: <Clock className="h-4 w-4" />
    },
    {
      tipo: 'warning',
      mensagem: '1 NFS-e rejeitada: código de serviço inválido.',
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      tipo: 'suggestion',
      mensagem: 'Sugestão: revisar alíquota ISS de 2% para município de São Paulo.',
      icon: <Lightbulb className="h-4 w-4" />
    },
    {
      tipo: 'success',
      mensagem: '15 NF-e autorizadas hoje.',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'success':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'suggestion':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'warning':
        return 'Atenção';
      case 'success':
        return 'Sucesso';
      case 'suggestion':
        return 'Dica IA';
      default:
        return 'Info';
    }
  };

  return (
    <Card className="shadow-lg border-biodina-gold/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-biodina-blue">
          <Lightbulb className="h-5 w-5 text-biodina-gold" />
          Assistente Fiscal IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {osPendentesBaixaFiscal.length > 0 && (
          <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <Badge variant="destructive">BLOQUEIO ATIVO</Badge>
            </div>
            <p className="text-sm font-semibold text-red-800">
              ⚠️ {osPendentesBaixaFiscal.length} OS Pendente de Baixa Fiscal. O usuário {osPendentesBaixaFiscal[0]?.nomeTecnico} está bloqueado.
            </p>
            <Button variant="destructive" size="sm" className="w-full" onClick={notificarGestor}>
              <Bell className="h-4 w-4 mr-2" />
              Notificar Gestor
            </Button>
          </div>
        )}
        {alertas.map((alerta, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-start gap-2 mb-2">
              <div className="text-biodina-gold mt-0.5">
                {alerta.icon}
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${getTipoBadge(alerta.tipo)}`}
              >
                {getTipoLabel(alerta.tipo)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {alerta.mensagem}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AssistenteFiscalIA;
