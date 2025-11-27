import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProcessoJuridico, AndamentoProcesso } from '@/types/juridico';
import { toast } from '@/components/ui/use-toast';

interface NovoAndamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  processo: ProcessoJuridico;
  onAndamentoCreated: (processoAtualizado: ProcessoJuridico) => void;
}

export const NovoAndamentoModal = ({ open, onOpenChange, processo, onAndamentoCreated }: NovoAndamentoModalProps) => {
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');

  const handleSubmit = () => {
    if (!data || !descricao || !responsavel) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    const novoAndamento: AndamentoProcesso = {
      id: String(Date.now()),
      data,
      descricao,
      responsavel,
    };

    const processoAtualizado: ProcessoJuridico = {
      ...processo,
      andamentos: [...processo.andamentos, novoAndamento],
    };

    onAndamentoCreated(processoAtualizado);
    onOpenChange(false);

    // Limpar formulário
    setData('');
    setDescricao('');
    setResponsavel('');

    toast({
      title: 'Sucesso',
      description: 'Andamento adicionado com sucesso!',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Andamento</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Processo: {processo.numeroProcesso}
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Data do Andamento *</Label>
            <Input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Responsável *</Label>
            <Input
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Nome do responsável pelo andamento"
            />
          </div>

          <div className="space-y-2">
            <Label>Descrição do Andamento *</Label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o andamento processual..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Documentos Anexados</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground">
              Funcionalidade de upload será implementada em breve
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Adicionar Andamento</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
