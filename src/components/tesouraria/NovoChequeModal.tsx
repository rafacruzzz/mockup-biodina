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
import { mockContasBancarias } from '@/data/tesouraria';

const novoChequeSchema = z.object({
  contaBancaria: z.string().min(1, 'Selecione uma conta bancária'),
  numeroCheque: z.string().min(1, 'Número do cheque é obrigatório'),
  valor: z.string().min(1, 'Valor é obrigatório'),
  dataEmissao: z.string().min(1, 'Data de emissão é obrigatória'),
  dataVencimento: z.string().min(1, 'Data de vencimento é obrigatória'),
  beneficiario: z.string().min(2, 'Nome do beneficiário é obrigatório'),
  finalidade: z.string().min(3, 'Finalidade deve ter pelo menos 3 caracteres'),
  observacoes: z.string().optional()
});

type NovoChequeForm = z.infer<typeof novoChequeSchema>;

interface NovoChequeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NovoChequeModal = ({ open, onOpenChange }: NovoChequeModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NovoChequeForm>({
    resolver: zodResolver(novoChequeSchema),
    defaultValues: {
      dataEmissao: new Date().toISOString().split('T')[0],
      dataVencimento: new Date().toISOString().split('T')[0]
    }
  });

  const contaSelecionada = form.watch('contaBancaria');
  const dadosConta = mockContasBancarias.find(c => c.id === contaSelecionada);

  const onSubmit = async (data: NovoChequeForm) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Novo cheque:', {
        ...data,
        valor: parseFloat(data.valor.replace(/[^\d,]/g, '').replace(',', '.')),
        banco: dadosConta?.banco || '',
        agencia: dadosConta?.agencia || '',
        conta: dadosConta?.conta || '',
        id: 'CHQ' + Date.now(),
        status: 'Emitido',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      toast({
        title: "Cheque emitido",
        description: "O cheque foi registrado com sucesso e está com status 'Emitido'.",
      });

      form.reset({
        dataEmissao: new Date().toISOString().split('T')[0],
        dataVencimento: new Date().toISOString().split('T')[0]
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao emitir o cheque. Tente novamente.",
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Emitir Novo Cheque</DialogTitle>
          <DialogDescription>
            Registre a emissão de um novo cheque
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contaBancaria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta Bancária</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a conta bancária" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockContasBancarias
                        .filter(conta => conta.status === 'Ativa')
                        .map(conta => (
                          <SelectItem key={conta.id} value={conta.id}>
                            {conta.banco} - Ag: {conta.agencia} / CC: {conta.conta}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {dadosConta && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Dados da conta selecionada:</div>
                <div className="font-medium">{dadosConta.banco}</div>
                <div className="text-sm">Agência: {dadosConta.agencia} | Conta: {dadosConta.conta}</div>
                <div className="text-sm">Saldo disponível: {dadosConta.saldo.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numeroCheque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Cheque</FormLabel>
                    <FormControl>
                      <Input placeholder="000001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataEmissao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Emissão</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataVencimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Vencimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="beneficiario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiário</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do beneficiário do cheque..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finalidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finalidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição da finalidade do pagamento..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informações adicionais sobre o cheque..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {isSubmitting ? 'Emitindo...' : 'Emitir Cheque'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};