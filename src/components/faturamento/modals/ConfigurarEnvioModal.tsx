import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ConfiguracaoCartaFaturamento } from "@/types/faturamento";

interface ConfigurarEnvioModalProps {
  onClose: () => void;
}

const ConfigurarEnvioModal = ({ onClose }: ConfigurarEnvioModalProps) => {
  const [config, setConfig] = useState<ConfiguracaoCartaFaturamento>({
    envioAutomatico: false,
    diaEnvioMensal: 1,
    horaEnvio: '08:00',
    emailsDestinatarios: {
      socios: [],
      contadores: [],
      tesouraria: [],
    },
    prazoAssinatura: 5,
    lembreteAutomatico: true,
    diasLembrete: 3,
  });

  const [emailSocio, setEmailSocio] = useState('');
  const [emailContador, setEmailContador] = useState('');
  const [emailTesouraria, setEmailTesouraria] = useState('');

  const handleSalvar = () => {
    // Em produção, salvar no banco de dados
    console.log('Configuração salva:', config);
    toast.success('Configurações salvas com sucesso!');
    onClose();
  };

  const addEmail = (tipo: 'socios' | 'contadores' | 'tesouraria', email: string) => {
    if (!email) return;
    
    setConfig({
      ...config,
      emailsDestinatarios: {
        ...config.emailsDestinatarios,
        [tipo]: [...config.emailsDestinatarios[tipo], email],
      },
    });

    // Limpar campo
    if (tipo === 'socios') setEmailSocio('');
    if (tipo === 'contadores') setEmailContador('');
    if (tipo === 'tesouraria') setEmailTesouraria('');
  };

  const removeEmail = (tipo: 'socios' | 'contadores' | 'tesouraria', email: string) => {
    setConfig({
      ...config,
      emailsDestinatarios: {
        ...config.emailsDestinatarios,
        [tipo]: config.emailsDestinatarios[tipo].filter(e => e !== email),
      },
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar Envio Automático</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Envio Automático */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="envioAutomatico" className="text-base">Envio Automático Mensal</Label>
              <p className="text-sm text-muted-foreground">
                Gerar e enviar carta automaticamente todo mês
              </p>
            </div>
            <Switch
              id="envioAutomatico"
              checked={config.envioAutomatico}
              onCheckedChange={(checked) => setConfig({ ...config, envioAutomatico: checked })}
            />
          </div>

          {/* Agendamento */}
          {config.envioAutomatico && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="diaEnvio">Dia do Mês</Label>
                <Select
                  value={config.diaEnvioMensal.toString()}
                  onValueChange={(value) => setConfig({ ...config, diaEnvioMensal: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        Dia {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaEnvio">Horário</Label>
                <Input
                  id="horaEnvio"
                  type="time"
                  value={config.horaEnvio}
                  onChange={(e) => setConfig({ ...config, horaEnvio: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* E-mails dos Sócios */}
          <div className="space-y-2">
            <Label>E-mails dos Sócios</Label>
            <div className="flex gap-2">
              <Input
                placeholder="socio@empresa.com"
                value={emailSocio}
                onChange={(e) => setEmailSocio(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addEmail('socios', emailSocio)}
              />
              <Button type="button" onClick={() => addEmail('socios', emailSocio)}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {config.emailsDestinatarios.socios.map(email => (
                <div key={email} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {email}
                  <button onClick={() => removeEmail('socios', email)} className="hover:text-blue-900">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* E-mails dos Contadores */}
          <div className="space-y-2">
            <Label>E-mails dos Contadores</Label>
            <div className="flex gap-2">
              <Input
                placeholder="contador@empresa.com"
                value={emailContador}
                onChange={(e) => setEmailContador(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addEmail('contadores', emailContador)}
              />
              <Button type="button" onClick={() => addEmail('contadores', emailContador)}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {config.emailsDestinatarios.contadores.map(email => (
                <div key={email} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {email}
                  <button onClick={() => removeEmail('contadores', email)} className="hover:text-green-900">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* E-mails da Tesouraria */}
          <div className="space-y-2">
            <Label>E-mails da Tesouraria</Label>
            <div className="flex gap-2">
              <Input
                placeholder="tesouraria@empresa.com"
                value={emailTesouraria}
                onChange={(e) => setEmailTesouraria(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addEmail('tesouraria', emailTesouraria)}
              />
              <Button type="button" onClick={() => addEmail('tesouraria', emailTesouraria)}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {config.emailsDestinatarios.tesouraria.map(email => (
                <div key={email} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {email}
                  <button onClick={() => removeEmail('tesouraria', email)} className="hover:text-purple-900">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Prazo de Assinatura */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prazoAssinatura">Prazo para Assinatura (dias)</Label>
              <Input
                id="prazoAssinatura"
                type="number"
                min="1"
                max="30"
                value={config.prazoAssinatura}
                onChange={(e) => setConfig({ ...config, prazoAssinatura: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diasLembrete">Enviar Lembrete Após (dias)</Label>
              <Input
                id="diasLembrete"
                type="number"
                min="1"
                max="15"
                value={config.diasLembrete}
                onChange={(e) => setConfig({ ...config, diasLembrete: parseInt(e.target.value) })}
                disabled={!config.lembreteAutomatico}
              />
            </div>
          </div>

          {/* Lembrete Automático */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="lembreteAutomatico" className="text-base">Lembretes Automáticos</Label>
              <p className="text-sm text-muted-foreground">
                Enviar e-mail de lembrete para assinaturas pendentes
              </p>
            </div>
            <Switch
              id="lembreteAutomatico"
              checked={config.lembreteAutomatico}
              onCheckedChange={(checked) => setConfig({ ...config, lembreteAutomatico: checked })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar}>
            💾 Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurarEnvioModal;
