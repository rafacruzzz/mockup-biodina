import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronRight } from 'lucide-react';
import { Plano } from '@/types/super';

interface MudarPlanoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planoAtual: Plano;
  planoNovo: Plano;
  onConfirm: () => void;
}

const MudarPlanoModal = ({ open, onOpenChange, planoAtual, planoNovo, onConfirm }: MudarPlanoModalProps) => {
  const diferencaValor = planoNovo.valor - planoAtual.valor;
  const isUpgrade = diferencaValor > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isUpgrade ? '⬆️ Fazer Upgrade de Plano' : '⬇️ Fazer Downgrade de Plano'}
          </DialogTitle>
          <DialogDescription>
            Você está mudando de <strong>{planoAtual.nome}</strong> para <strong>{planoNovo.nome}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Comparação de valores */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Plano Atual</p>
                  <p className="text-2xl font-bold">R$ {planoAtual.valor.toFixed(2)}/mês</p>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Novo Plano</p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {planoNovo.valor.toFixed(2)}/mês
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Diferença mensal</p>
                <p className={`text-xl font-bold ${isUpgrade ? 'text-orange-600' : 'text-green-600'}`}>
                  {isUpgrade ? '+' : ''} R$ {Math.abs(diferencaValor).toFixed(2)}/mês
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Novos benefícios */}
          <div>
            <p className="font-semibold mb-3">O que você ganha com {planoNovo.nome}:</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {planoNovo.beneficios.map((beneficio, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Informações de cobrança */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💳 {isUpgrade 
                  ? `A diferença de R$ ${Math.abs(diferencaValor).toFixed(2)} será cobrada de forma proporcional na próxima fatura.`
                  : `Você receberá um crédito proporcional de R$ ${Math.abs(diferencaValor).toFixed(2)} na próxima fatura.`
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>
            Confirmar Mudança
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MudarPlanoModal;
