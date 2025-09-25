import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const novoCartaoSchema = z.object({
  banco: z.string().min(2, 'Nome do banco é obrigatório'),
  numeroCartao: z.string().min(4, 'Últimos 4 dígitos são obrigatórios'),
  limite: z.string().min(1, 'Limite é obrigatório'),
  vencimentoFatura: z.string().min(1, 'Dia do vencimento é obrigatório'),
  responsavel: z.string().min(2, 'Nome do responsável é obrigatório'),
  status: z.enum(['Ativo', 'Bloqueado', 'Cancelado'], {
    required_error: 'Selecione o status do cartão'
  }),
  observacoes: z.string().optional()
});

type NovoCartaoForm = z.infer<typeof novoCartaoSchema>;

interface NovoCartaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NovoCartaoModal = ({ open, onOpenChange }: NovoCartaoModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NovoCartaoForm>({
    resolver: zodResolver(novoCartaoSchema),
    defaultValues: {
      status: 'Ativo',
      limite: 'R$ 0,00'
    }
  });

  const onSubmit = async (data: NovoCartaoForm) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Novo cartão:', {
        ...data,
        limite: parseFloat(data.limite.replace(/[^\d,]/g, '').replace(',', '.')),
        vencimentoFatura: parseInt(data.vencimentoFatura),
        numeroCartao: `**** ${data.numeroCartao}`,
        id: 'CC' + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      toast({
        title: "Cartão cadastrado",
        description: "O cartão de crédito foi cadastrado com sucesso.",
      });

      form.reset({
        status: 'Ativo',
        limite: 'R$ 0,00'
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o cartão. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return formattedValue;
  };

  const bancosSugeridos = [
    'Banco do Brasil',
    'Caixa Econômica Federal',
    'Itaú Unibanco',
    'Bradesco',
    'Santander',
    'Nubank',
    'Inter',
    'C6 Bank',
    'BTG Pactual'
  ];

  // Opções de dias para vencimento (1-31)
  const diasVencimento = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Cartão de Crédito</DialogTitle>
          <DialogDescription>
            Adicione um novo cartão de crédito corporativo ao sistema
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="banco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome do banco..."
                        {...field}
                        list="bancos-sugeridos"
                      />
                    </FormControl>
                    <datalist id="bancos-sugeridos">
                      {bancosSugeridos.map(banco => (
                        <option key={banco} value={banco} />
                      ))}
                    </datalist>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numeroCartao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Últimos 4 Dígitos</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="1234" 
                        maxLength={4}
                        {...field}
                        onChange={(e) => {
                          // Permitir apenas números
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="limite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="R$ 0,00" 
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCurrency(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vencimentoFatura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dia do Vencimento</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o dia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {diasVencimento.map(dia => (
                          <SelectItem key={dia} value={dia.toString()}>
                            Dia {dia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="responsavel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do responsável pelo cartão..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informações adicionais sobre o cartão..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Integração com Contas a Pagar</h4>
              <p className="text-sm text-muted-foreground">
                Este cartão será automaticamente integrado ao sistema de Contas a Pagar. 
                As despesas lançadas neste cartão aparecerão automaticamente nas contas a pagar 
                de acordo com a data de vencimento da fatura.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cartão'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};