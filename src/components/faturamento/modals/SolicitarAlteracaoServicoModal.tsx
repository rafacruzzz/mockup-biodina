import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServicoFaturamento } from "@/types/faturamento";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SolicitarAlteracaoServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico: ServicoFaturamento;
}

const SolicitarAlteracaoServicoModal = ({ isOpen, onClose, servico }: SolicitarAlteracaoServicoModalProps) => {
  const { toast } = useToast();
  const [motivoAlteracao, setMotivoAlteracao] = useState("");
  const [detalhesAlteracao, setDetalhesAlteracao] = useState("");
  const [emailSolicitante, setEmailSolicitante] = useState("");

  const handleSubmit = () => {
    // Validações
    if (!motivoAlteracao) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o motivo da alteração.",
        variant: "destructive",
      });
      return;
    }

    if (detalhesAlteracao.length < 50) {
      toast({
        title: "Erro",
        description: "Os detalhes da alteração devem ter pelo menos 50 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (!emailSolicitante || !emailSolicitante.includes('@')) {
      toast({
        title: "Erro",
        description: "Por favor, informe um email válido.",
        variant: "destructive",
      });
      return;
    }

    // Simular envio da solicitação
    toast({
      title: "Solicitação enviada!",
      description: `Sua solicitação foi enviada para ${servico.responsavel}. Você receberá notificação por email quando houver uma resposta.`,
    });

    // Limpar formulário
    setMotivoAlteracao("");
    setDetalhesAlteracao("");
    setEmailSolicitante("");
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Solicitar Alteração - Serviço #{servico.id}</DialogTitle>
          <DialogDescription>
            {servico.descricao}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo da Alteração *</Label>
            <Select value={motivoAlteracao} onValueChange={setMotivoAlteracao}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Revisão de Escopo">Revisão de Escopo</SelectItem>
                <SelectItem value="Ajuste de Deliverables">Ajuste de Deliverables</SelectItem>
                <SelectItem value="Correção de Informações">Correção de Informações</SelectItem>
                <SelectItem value="Alteração de Prazo">Alteração de Prazo</SelectItem>
                <SelectItem value="Outro Motivo">Outro Motivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detalhes">Detalhes da Alteração Solicitada *</Label>
            <Textarea
              id="detalhes"
              value={detalhesAlteracao}
              onChange={(e) => setDetalhesAlteracao(e.target.value)}
              placeholder="Descreva detalhadamente o que precisa ser alterado e por quê..."
              className="min-h-[150px]"
            />
            <p className="text-sm text-muted-foreground">
              {detalhesAlteracao.length}/50 caracteres mínimos
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu Email *</Label>
            <Input
              id="email"
              type="email"
              value={emailSolicitante}
              onChange={(e) => setEmailSolicitante(e.target.value)}
              placeholder="seu.email@empresa.com"
            />
            <p className="text-sm text-muted-foreground">
              Para contato sobre a solicitação
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>IMPORTANTE</strong>
              <br />
              Esta solicitação será enviada para o responsável pelo serviço ({servico.responsavel}
              {servico.emailResponsavel && ` - ${servico.emailResponsavel}`}).
              <br />
              Você receberá notificação por email quando a solicitação for analisada.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Enviar Solicitação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitarAlteracaoServicoModal;
