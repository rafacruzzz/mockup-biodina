import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AbrirChamadoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    prioridade: 'media',
    descricao: '',
    departamento: '',
    anexos: []
  });
  const { toast } = useToast();

  const categorias = [
    { value: 'impressoras', label: 'Impressoras e Scanners' },
    { value: 'perifericos', label: 'Periféricos (Mouse, Teclado, Monitor)' },
    { value: 'telefonia', label: 'Telefonia' },
    { value: 'softwares', label: 'Softwares e Aplicações' },
    { value: 'sistema_operacional', label: 'Sistema Operacional' },
    { value: 'rede', label: 'Problemas de Rede' },
    { value: 'acessos', label: 'Acessos e Permissões' },
    { value: 'seguranca', label: 'Segurança da Informação' },
    { value: 'geral', label: 'Solicitações Gerais' }
  ];

  const prioridades = [
    { value: 'baixa', label: 'Baixa', color: 'text-green-600' },
    { value: 'media', label: 'Média', color: 'text-yellow-600' },
    { value: 'alta', label: 'Alta', color: 'text-orange-600' },
    { value: 'critica', label: 'Crítica', color: 'text-red-600' }
  ];

  const departamentos = [
    'Comercial', 'RH', 'Financeiro', 'Compras', 'Estoque', 'TI', 'Diretoria'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.categoria || !formData.descricao) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simular envio do chamado
    const novoChamado = {
      ...formData,
      id: Math.floor(Math.random() * 1000),
      status: 'aberto',
      solicitante: 'Usuário Atual', // Seria pego do contexto do usuário
      dataAbertura: new Date().toISOString()
    };

    console.log('Novo chamado criado:', novoChamado);
    
    toast({
      title: "Chamado aberto com sucesso!",
      description: `Número do chamado: #${novoChamado.id}. Você receberá atualizações por e-mail.`
    });

    // Reset form
    setFormData({
      titulo: '',
      categoria: '',
      prioridade: 'media',
      descricao: '',
      departamento: '',
      anexos: []
    });
    
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Abrir Novo Chamado de TI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Precisa de suporte técnico? Abra um chamado e nossa equipe de TI irá te ajudar.
        </p>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Abrir Chamado
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Chamado de TI</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título do Chamado *</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Descreva brevemente o problema"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select value={formData.prioridade} onValueChange={(value) => setFormData({ ...formData, prioridade: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {prioridades.map((pri) => (
                        <SelectItem key={pri.value} value={pri.value}>
                          <span className={pri.color}>{pri.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <Select value={formData.departamento} onValueChange={(value) => setFormData({ ...formData, departamento: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição do Problema *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva detalhadamente o problema, quando começou, passos para reproduzir, etc."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Anexos (Screenshots, documentos)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Clique para fazer upload ou arraste arquivos aqui
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, PDF até 10MB
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Abrir Chamado
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AbrirChamadoForm;