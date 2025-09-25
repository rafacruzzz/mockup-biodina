import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const novaContaSchema = z.object({
  banco: z.string().min(2, 'Nome do banco é obrigatório'),
  agencia: z.string().min(1, 'Agência é obrigatória'),
  conta: z.string().min(1, 'Número da conta é obrigatório'),
  tipo: z.enum(['Corrente', 'Poupança', 'Aplicação'], {
    required_error: 'Selecione o tipo da conta'
  }),
  saldo: z.string().min(1, 'Saldo inicial é obrigatório'),
  status: z.enum(['Ativa', 'Inativa', 'Bloqueada'], {
    required_error: 'Selecione o status da conta'
  }),
  gerente: z.string().optional(),
  telefoneGerente: z.string().optional(),
  integracaoOFX: z.boolean().default(false),
  observacoes: z.string().optional()
});

type NovaContaForm = z.infer<typeof novaContaSchema>;

interface NovaContaBancariaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NovaContaBancariaModal = ({ open, onOpenChange }: NovaContaBancariaModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NovaContaForm>({
    resolver: zodResolver(novaContaSchema),
    defaultValues: {
      status: 'Ativa',
      saldo: 'R$ 0,00',
      integracaoOFX: false
    }
  });

  const onSubmit = async (data: NovaContaForm) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Nova conta bancária:', {
        ...data,
        saldo: parseFloat(data.saldo.replace(/[^\d,]/g, '').replace(',', '.')),
        id: 'CB' + Date.now(),
        ultimaConciliacao: data.integracaoOFX ? new Date() : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      toast({
        title: "Conta cadastrada",
        description: "A conta bancária foi cadastrada com sucesso.",
      });

      form.reset({
        status: 'Ativa',
        saldo: 'R$ 0,00',
        integracaoOFX: false
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar a conta. Tente novamente.",
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
    'Sicoob',
    'Sicredi'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Conta Bancária</DialogTitle>
          <DialogDescription>
            Adicione uma nova conta bancária ao sistema de tesouraria
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
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo da Conta</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Corrente">Conta Corrente</SelectItem>
                        <SelectItem value="Poupança">Conta Poupança</SelectItem>
                        <SelectItem value="Aplicação">Conta Aplicação</SelectItem>
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
                name="agencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agência</FormLabel>
                    <FormControl>
                      <Input placeholder="0000-0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="conta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="saldo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saldo Inicial</FormLabel>
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
                        <SelectItem value="Ativa">Ativa</SelectItem>
                        <SelectItem value="Inativa">Inativa</SelectItem>
                        <SelectItem value="Bloqueada">Bloqueada</SelectItem>
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
                name="gerente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gerente (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do gerente..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefoneGerente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone do Gerente (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="integracaoOFX"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Habilitar Integração OFX
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Permite sincronização automática dos extratos bancários via arquivo OFX
                    </p>
                  </div>
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
                      placeholder="Informações adicionais sobre a conta..."
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
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Conta'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};