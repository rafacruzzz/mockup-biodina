import { useState } from "react";
import { Smartphone, Copy, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import type { ContaEmail } from "@/types/ti";

interface ConfiguracaoDispositivoModalProps {
  open: boolean;
  onClose: () => void;
  email: ContaEmail | null;
}

const ConfiguracaoDispositivoModal = ({ open, onClose, email }: ConfiguracaoDispositivoModalProps) => {
  const [protocolo, setProtocolo] = useState<"imap" | "pop3">("imap");
  const [dispositivo, setDispositivo] = useState<"android" | "ios">("android");

  const configuracoes = {
    imap: {
      servidor: "mail.empresa.com.br",
      porta: 993,
      ssl: true,
      tipo: "IMAP"
    },
    pop3: {
      servidor: "mail.empresa.com.br", 
      porta: 995,
      ssl: true,
      tipo: "POP3"
    }
  };

  const config = configuracoes[protocolo];

  const handleCopyConfig = (texto: string) => {
    navigator.clipboard.writeText(texto);
    toast({
      title: "Copiado!",
      description: "Configuração copiada para a área de transferência",
    });
  };

  const getInstrucoes = () => {
    if (dispositivo === "android") {
      return [
        "Abra o app Gmail ou Email",
        "Toque em 'Adicionar conta'", 
        "Selecione 'Outro'",
        "Digite seu endereço de e-mail e senha",
        "Use as configurações manuais abaixo"
      ];
    } else {
      return [
        "Abra 'Configurações' > 'Mail'",
        "Toque em 'Contas' > 'Adicionar conta'",
        "Selecione 'Outro'", 
        "Digite seu endereço de e-mail e senha",
        "Use as configurações manuais abaixo"
      ];
    }
  };

  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Configuração para Dispositivos Móveis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações da Conta */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Conta de E-mail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{email.endereco}</div>
              <div className="text-sm text-muted-foreground">{email.nomeUsuario}</div>
            </CardContent>
          </Card>

          {/* Seletores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Protocolo</label>
              <Select value={protocolo} onValueChange={(value: "imap" | "pop3") => setProtocolo(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imap">IMAP (Recomendado)</SelectItem>
                  <SelectItem value="pop3">POP3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dispositivo</label>
              <Select value={dispositivo} onValueChange={(value: "android" | "ios") => setDispositivo(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Instruções */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Instruções Passo a Passo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {getInstrucoes().map((instrucao, index) => (
                  <li key={index} className="flex gap-3">
                    <Badge variant="outline" className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{instrucao}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Configurações do Servidor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Configurações do Servidor ({config.tipo})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">SERVIDOR DE ENTRADA</label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                    <span className="text-sm font-mono flex-1">{config.servidor}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyConfig(config.servidor)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">PORTA</label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                    <span className="text-sm font-mono flex-1">{config.porta}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyConfig(config.porta.toString())}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">SERVIDOR DE SAÍDA (SMTP)</label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                    <span className="text-sm font-mono flex-1">smtp.empresa.com.br</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyConfig("smtp.empresa.com.br")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">PORTA SMTP</label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                    <span className="text-sm font-mono flex-1">587</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyConfig("587")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">SEGURANÇA</label>
                <div className="flex gap-4">
                  <Badge variant="secondary">SSL/TLS Habilitado</Badge>
                  <Badge variant="secondary">Autenticação Obrigatória</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credenciais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Credenciais de Acesso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">USUÁRIO</label>
                <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                  <span className="text-sm font-mono flex-1">{email.endereco}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopyConfig(email.endereco)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">SENHA</label>
                <div className="p-2 bg-muted rounded border text-sm text-muted-foreground">
                  Use a senha fornecida pelo administrador
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfiguracaoDispositivoModal;