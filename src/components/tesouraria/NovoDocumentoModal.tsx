import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const novoDocumentoSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  categoria: z.enum(['Contrato', 'Estatuto', 'Certidão', 'Balanço', 'Ata', 'Procuração', 'Outros'], {
    required_error: 'Selecione uma categoria'
  }),
  descricao: z.string().optional(),
  versao: z.string().min(1, 'Versão é obrigatória'),
  dataDocumento: z.string().min(1, 'Data do documento é obrigatória'),
  dataValidade: z.string().optional(),
  responsavelUpload: z.string().min(2, 'Nome do responsável é obrigatório'),
  niveisAcesso: z.array(z.string()).min(1, 'Selecione pelo menos um nível de acesso'),
  tags: z.array(z.string()).optional(),
  observacoes: z.string().optional()
});

type NovoDocumentoForm = z.infer<typeof novoDocumentoSchema>;

interface NovoDocumentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NovoDocumentoModal = ({ open, onOpenChange }: NovoDocumentoModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<NovoDocumentoForm>({
    resolver: zodResolver(novoDocumentoSchema),
    defaultValues: {
      versao: '1.0',
      dataDocumento: new Date().toISOString().split('T')[0],
      responsavelUpload: 'Departamento Financeiro',
      niveisAcesso: [],
      tags: []
    }
  });

  const niveisAcessoOpcoes = [
    { id: 'Diretoria', label: 'Diretoria' },
    { id: 'Financeiro', label: 'Financeiro' },
    { id: 'Contabilidade', label: 'Contabilidade' },
    { id: 'Jurídico', label: 'Jurídico' },
    { id: 'Todos', label: 'Todos' }
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      const newTags = [...selectedTags, tagInput.trim()];
      setSelectedTags(newTags);
      form.setValue('tags', newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    form.setValue('tags', newTags);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: NovoDocumentoForm) => {
    setIsSubmitting(true);
    
    try {
      // Simular upload e processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Novo documento:', {
        ...data,
        tags: selectedTags,
        id: 'DOC' + Date.now(),
        arquivo: '/docs/importantes/documento-' + Date.now() + '.pdf',
        dataUpload: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      toast({
        title: "Documento arquivado",
        description: "O documento foi arquivado com sucesso e está disponível conforme os níveis de acesso definidos.",
      });

      form.reset({
        versao: '1.0',
        dataDocumento: new Date().toISOString().split('T')[0],
        responsavelUpload: 'Departamento Financeiro',
        niveisAcesso: [],
        tags: []
      });
      setSelectedTags([]);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao arquivar o documento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Arquivar Novo Documento</DialogTitle>
          <DialogDescription>
            Faça upload e classifique um documento importante da empresa
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Documento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Contrato Social Consolidado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Contrato">Contrato</SelectItem>
                        <SelectItem value="Estatuto">Estatuto</SelectItem>
                        <SelectItem value="Certidão">Certidão</SelectItem>
                        <SelectItem value="Balanço">Balanço</SelectItem>
                        <SelectItem value="Ata">Ata</SelectItem>
                        <SelectItem value="Procuração">Procuração</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve descrição do documento..."
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="versao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versão</FormLabel>
                    <FormControl>
                      <Input placeholder="1.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do Documento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataValidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Validade (Opcional)</FormLabel>
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
              name="responsavelUpload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsável pelo Upload</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do departamento ou pessoa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload de Arquivo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Arquivo do Documento</label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground mb-2">
                  Clique para fazer upload ou arraste o arquivo aqui
                </div>
                <div className="text-xs text-muted-foreground">
                  Formatos aceitos: PDF, DOC, DOCX (máximo 10MB)
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Níveis de Acesso */}
            <FormField
              control={form.control}
              name="niveisAcesso"
              render={() => (
                <FormItem>
                  <FormLabel>Níveis de Acesso</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {niveisAcessoOpcoes.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="niveisAcesso"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (Opcional)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite uma tag e pressione Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                >
                  Adicionar
                </Button>
              </div>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informações adicionais sobre o documento..."
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
                {isSubmitting ? 'Arquivando...' : 'Arquivar Documento'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};