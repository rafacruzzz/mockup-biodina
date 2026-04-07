import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecaoRoteiro, SecaoEstado, ItemEstado } from './SecaoRoteiro';
import { LegendaClassificacao } from './LegendaClassificacao';
import { secoesRoteiro } from './dadosRoteiro';
import { toast } from 'sonner';

interface RoteiroAuditoriaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const criarEstadoInicial = (): Record<string, SecaoEstado> => {
  const estado: Record<string, SecaoEstado> = {};
  secoesRoteiro.forEach((secao) => {
    const itensMap: Record<number, ItemEstado> = {};
    const todosItens = secao.subSecoes
      ? secao.subSecoes.flatMap((s) => s.itens)
      : secao.itens || [];
    todosItens.forEach((item) => {
      itensMap[item.numero] = { om: false, nc: false, c: false, evidencia: '', planoAcao: '' };
    });
    estado[secao.id] = { itens: itensMap, auditor: '', auditado: '' };
  });
  return estado;
};

export const RoteiroAuditoriaModal = ({ open, onOpenChange }: RoteiroAuditoriaModalProps) => {
  const [abaAtiva, setAbaAtiva] = useState('A');
  const [estado, setEstado] = useState<Record<string, SecaoEstado>>(criarEstadoInicial);

  const handleChangeItem = (secaoId: string, numero: number, campo: keyof ItemEstado, valor: any) => {
    setEstado((prev) => ({
      ...prev,
      [secaoId]: {
        ...prev[secaoId],
        itens: {
          ...prev[secaoId].itens,
          [numero]: {
            ...prev[secaoId].itens[numero],
            [campo]: valor,
          },
        },
      },
    }));
  };

  const handleChangeAuditor = (secaoId: string, valor: string) => {
    setEstado((prev) => ({
      ...prev,
      [secaoId]: { ...prev[secaoId], auditor: valor },
    }));
  };

  const handleChangeAuditado = (secaoId: string, valor: string) => {
    setEstado((prev) => ({
      ...prev,
      [secaoId]: { ...prev[secaoId], auditado: valor },
    }));
  };

  const handleSalvar = () => {
    toast.success('Roteiro de auditoria interna salvo com sucesso!');
    setEstado(criarEstadoInicial());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle className="text-lg font-bold text-center">ROTEIRO DE AUDITORIA</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 flex flex-col px-6">
          <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="flex-1 min-h-0 flex flex-col">
            <div className="flex-shrink-0 overflow-x-auto pb-2">
              <TabsList className="inline-flex w-max min-w-full gap-1">
                {secoesRoteiro.map((secao) => (
                  <TabsTrigger key={secao.id} value={secao.id} className="text-xs px-3 py-1.5 whitespace-nowrap">
                    {secao.id} - {secao.titulo.length > 20 ? secao.titulo.substring(0, 20) + '...' : secao.titulo}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              {secoesRoteiro.map((secao) => (
                <TabsContent key={secao.id} value={secao.id} className="mt-0">
                  <div className="pb-4">
                    <h3 className="text-sm font-bold text-foreground mb-3">
                      Parte {secao.id} — {secao.titulo}
                    </h3>
                    <SecaoRoteiro
                      secao={secao}
                      estado={estado[secao.id]}
                      onChangeItem={(numero, campo, valor) => handleChangeItem(secao.id, numero, campo, valor)}
                      onChangeAuditor={(valor) => handleChangeAuditor(secao.id, valor)}
                      onChangeAuditado={(valor) => handleChangeAuditado(secao.id, valor)}
                    />
                  </div>
                </TabsContent>
              ))}
              <LegendaClassificacao />
            </div>
          </Tabs>
        </div>

        <DialogFooter className="px-6 pb-6 pt-3 flex-shrink-0 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar}>Salvar Auditoria</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
