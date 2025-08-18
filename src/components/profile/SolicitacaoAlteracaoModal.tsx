
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle, FileText, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SolicitacaoAlteracaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campoSelecionado?: string;
  valorAtual?: string;
  aba?: string;
}

const SolicitacaoAlteracaoModal = ({ 
  open, 
  onOpenChange, 
  campoSelecionado = '', 
  valorAtual = '',
  aba = '' 
}: SolicitacaoAlteracaoModalProps) => {
  const [novoValor, setNovoValor] = useState('');
  const [motivo, setMotivo] = useState('');
  const [tipoSolicitacao, setTipoSolicitacao] = useState('correcao');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!novoValor.trim() || !motivo.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o novo valor e o motivo da solicitação.",
        variant: "destructive",
      });
      return;
    }

    // Gerar protocolo fictício
    const protocolo = `2024${Math.floor(Math.random() * 9000) + 1000}`;
    
    toast({
      title: "Solicitação enviada com sucesso!",
      description: `Protocolo #${protocolo} - Aguarde resposta do RH em até 3 dias úteis.`,
      duration: 5000,
    });

    // Limpar campos
    setNovoValor('');
    setMotivo('');
    setTipoSolicitacao('correcao');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setNovoValor('');
    setMotivo('');
    setTipoSolicitacao('correcao');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Solicitar Alteração de Dados
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informações do campo */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Dados da Solicitação</span>
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Aba:</strong> {aba}</p>
              <p><strong>Campo:</strong> {campoSelecionado}</p>
              <p><strong>Valor Atual:</strong> {valorAtual || 'Não informado'}</p>
            </div>
          </div>

          {/* Tipo de solicitação */}
          <div className="space-y-2">
            <Label>Tipo de Solicitação</Label>
            <Select value={tipoSolicitacao} onValueChange={setTipoSolicitacao}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="correcao">Correção de dados</SelectItem>
                <SelectItem value="atualizacao">Atualização de informações</SelectItem>
                <SelectItem value="inclusao">Inclusão de dados</SelectItem>
                <SelectItem value="exclusao">Exclusão de dados</SelectItem>
                <SelectItem value="processo-seletivo">Solicitação de Processo Seletivo/Admissão</SelectItem>
                <SelectItem value="rescisao">Solicitação de Rescisão</SelectItem>
                <SelectItem value="programacao-ferias">Programação de Férias</SelectItem>
                <SelectItem value="evolucao-promocao">Evolução/Promoção</SelectItem>
                <SelectItem value="alteracao-endereco-vt">Alteração de Endereço (VT)</SelectItem>
                <SelectItem value="licenca">Licença – maternidade/paternidade/INSS</SelectItem>
                <SelectItem value="inclusao-dependente-ir">Inclusão de Dependente IR</SelectItem>
                <SelectItem value="inclusao-dependente-saude">Inclusão de Dependente Plano de Saúde</SelectItem>
                <SelectItem value="ponto-eletronico">Ponto Eletrônico</SelectItem>
                <SelectItem value="outras-solicitacoes">Outras dúvidas e solicitações</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Novo valor */}
          <div className="space-y-2">
            <Label>Novo Valor Solicitado *</Label>
            <Input
              value={novoValor}
              onChange={(e) => setNovoValor(e.target.value)}
              placeholder="Digite o valor correto"
            />
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <Label>Motivo da Solicitação *</Label>
            <Textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Descreva o motivo da alteração (ex: mudança de endereço, correção de erro, etc.)"
              rows={3}
            />
          </div>

          {/* Informações adicionais */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">Informações Importantes</span>
            </div>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• Sua solicitação será analisada pelo setor de RH</p>
              <p>• Você será notificado sobre o andamento via e-mail</p>
              <p>• Algumas alterações podem requerer documentação adicional</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
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

export default SolicitacaoAlteracaoModal;
