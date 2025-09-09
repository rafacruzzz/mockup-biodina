import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { CategoriaChamadoTI, PrioridadeChamado, CATEGORIA_CHAMADO_TI_LABELS, PRIORIDADE_CHAMADO_LABELS } from '@/types/ti';

const AbrirChamadoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    categoria: '',
    prioridade: '',
    titulo: '',
    descricao: '',
    arquivos: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.categoria || !formData.prioridade || !formData.titulo || !formData.descricao) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Simular envio do chamado
    toast.success('Chamado enviado com sucesso! Número do protocolo: #TI-2024-001');
    
    // Reset form
    setFormData({
      categoria: '',
      prioridade: '',
      titulo: '',
      descricao: '',
      arquivos: []
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, arquivos: [...prev.arquivos, ...files] }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Abrir um Novo Chamado de TI</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para solicitar suporte técnico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Solicitante */}
              <div className="space-y-2">
                <Label htmlFor="solicitante">Solicitante</Label>
                <Input 
                  id="solicitante" 
                  value="João Silva" 
                  disabled 
                  className="bg-muted"
                />
              </div>

              {/* Departamento */}
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input 
                  id="departamento" 
                  value="Comercial" 
                  disabled 
                  className="bg-muted"
                />
              </div>

              {/* Categoria do Problema */}
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria do Problema *</Label>
                <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORIA_CHAMADO_TI_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prioridade */}
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade *</Label>
                <Select value={formData.prioridade} onValueChange={(value) => setFormData(prev => ({ ...prev, prioridade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRIORIDADE_CHAMADO_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Título do Chamado */}
            <div className="space-y-2">
              <Label htmlFor="titulo">Título do Chamado *</Label>
              <Input 
                id="titulo"
                placeholder="Resumo curto do problema"
                value={formData.titulo}
                onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              />
            </div>

            {/* Descrição Detalhada */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição Detalhada *</Label>
              <Textarea 
                id="descricao"
                placeholder="Descreva o problema em detalhes, incluindo quando ocorreu, o que estava fazendo, mensagens de erro, etc."
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                rows={6}
              />
            </div>

            {/* Anexar Arquivo */}
            <div className="space-y-2">
              <Label htmlFor="arquivos">Anexar Arquivo (opcional)</Label>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  <Paperclip className="h-4 w-4 mr-2" />
                  Anexar Screenshots/Arquivos
                </Button>
                <input 
                  id="file-upload"
                  type="file" 
                  multiple 
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {formData.arquivos.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {formData.arquivos.length} arquivo(s) selecionado(s)
                  </span>
                )}
              </div>
            </div>

            {/* Botão de Envio */}
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" className="min-w-[200px]">
                Enviar Chamado
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AbrirChamadoForm;