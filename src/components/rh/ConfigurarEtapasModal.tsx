
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, X, GripVertical, FileText, User, Settings } from 'lucide-react';
import { ProcessoSeletivo, EtapaSelecao, TemplateEtapas } from '@/types/processoSeletivo';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';

interface ConfigurarEtapasModalProps {
  isOpen: boolean;
  onClose: () => void;
  processo?: ProcessoSeletivo | null;
}

interface NovaEtapa extends Omit<EtapaSelecao, 'id'> {
  tempId: string;
}

const ConfigurarEtapasModal = ({ isOpen, onClose, processo }: ConfigurarEtapasModalProps) => {
  const { atualizarProcessoSeletivo, criarProcessoSeletivo, processosSeletivos } = useProcessoSeletivo();
  const [isEdit, setIsEdit] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [cargo, setCargo] = useState('');
  const [etapas, setEtapas] = useState<NovaEtapa[]>([]);
  const [templateSelecionado, setTemplateSelecionado] = useState('');

  // Templates pré-definidos
  const templates: TemplateEtapas[] = [
    {
      id: 'template-geral',
      nome: 'Processo Geral',
      cargo: 'Geral',
      etapas: [
        { nome: 'Triagem de Currículos', descricao: 'Análise inicial dos currículos recebidos', ordem: 1, tipo: 'triagem', obrigatoria: true },
        { nome: 'Entrevista Inicial', descricao: 'Primeira entrevista com RH', ordem: 2, tipo: 'entrevista', duracao: '30 minutos', obrigatoria: true },
        { nome: 'Entrevista com Gestor', descricao: 'Entrevista final com o gestor da área', ordem: 3, tipo: 'entrevista', duracao: '45 minutos', obrigatoria: true }
      ]
    },
    {
      id: 'template-tecnico',
      nome: 'Processo Técnico',
      cargo: 'Desenvolvedor',
      etapas: [
        { nome: 'Triagem de Currículos', descricao: 'Análise inicial dos currículos', ordem: 1, tipo: 'triagem', obrigatoria: true },
        { nome: 'Entrevista Técnica', descricao: 'Entrevista focada em conhecimentos técnicos', ordem: 2, tipo: 'entrevista', duracao: '1 hora', obrigatoria: true },
        { nome: 'Teste Prático', descricao: 'Desenvolvimento de projeto prático', ordem: 3, tipo: 'teste', duracao: '3 horas', obrigatoria: true },
        { nome: 'Entrevista Comportamental', descricao: 'Avaliação de soft skills e fit cultural', ordem: 4, tipo: 'entrevista', duracao: '45 minutos', obrigatoria: true }
      ]
    }
  ];

  useEffect(() => {
    if (processo) {
      setIsEdit(true);
      setTitulo(processo.titulo);
      setDepartamento(processo.departamento);
      setCargo(processo.cargo);
      setEtapas(processo.etapas.map(etapa => ({ ...etapa, tempId: etapa.id })));
    } else {
      setIsEdit(false);
      setTitulo('');
      setDepartamento('');
      setCargo('');
      setEtapas([]);
    }
  }, [processo, isOpen]);

  const aplicarTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const novasEtapas = template.etapas.map((etapa, index) => ({
        ...etapa,
        tempId: `temp-${Date.now()}-${index}`
      }));
      setEtapas(novasEtapas);
    }
  };

  const adicionarEtapa = () => {
    const novaEtapa: NovaEtapa = {
      tempId: `temp-${Date.now()}`,
      nome: '',
      descricao: '',
      ordem: etapas.length + 1,
      tipo: 'entrevista',
      obrigatoria: true
    };
    setEtapas([...etapas, novaEtapa]);
  };

  const removerEtapa = (tempId: string) => {
    const novasEtapas = etapas
      .filter(e => e.tempId !== tempId)
      .map((etapa, index) => ({ ...etapa, ordem: index + 1 }));
    setEtapas(novasEtapas);
  };

  const atualizarEtapa = (tempId: string, campo: keyof NovaEtapa, valor: any) => {
    setEtapas(etapas.map(etapa => 
      etapa.tempId === tempId ? { ...etapa, [campo]: valor } : etapa
    ));
  };

  const handleSalvar = () => {
    if (!titulo.trim() || !departamento.trim() || !cargo.trim() || etapas.length === 0) {
      return;
    }

    const etapasComId = etapas.map((etapa, index) => ({
      ...etapa,
      id: isEdit && !etapa.tempId.startsWith('temp-') ? etapa.tempId : `etapa-${Date.now()}-${index}`,
      ordem: index + 1
    }));

    if (isEdit && processo) {
      atualizarProcessoSeletivo(processo.id, {
        titulo,
        departamento,
        cargo,
        etapas: etapasComId
      });
    } else {
      criarProcessoSeletivo({
        titulo,
        departamento,
        cargo,
        descricao: `Processo seletivo para ${cargo} no departamento de ${departamento}`,
        vagas: 1,
        etapas: etapasComId,
        candidatos: [],
        status: 'ativo',
        responsavel: 'RH',
        dataInicio: new Date().toISOString()
      });
    }

    onClose();
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'triagem': return <FileText className="h-4 w-4" />;
      case 'entrevista': return <User className="h-4 w-4" />;
      case 'teste': return <Settings className="h-4 w-4" />;
      case 'dinamica': return <User className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar Etapas do Processo' : 'Configurar Etapas de Seleção'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="titulo">Título do Processo</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Desenvolvedor Frontend Sênior"
              />
            </div>
            <div>
              <Label htmlFor="departamento">Departamento</Label>
              <Input
                id="departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                placeholder="Ex: Tecnologia"
              />
            </div>
            <div>
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ex: Desenvolvedor Frontend"
              />
            </div>
          </div>

          {!isEdit && (
            <div className="space-y-2">
              <Label>Template de Etapas</Label>
              <div className="flex gap-2">
                <Select value={templateSelecionado} onValueChange={setTemplateSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => templateSelecionado && aplicarTemplate(templateSelecionado)}
                  disabled={!templateSelecionado}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Etapas ({etapas.length})</Label>
              <Button onClick={adicionarEtapa} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Etapa
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {etapas.map((etapa, index) => (
                <div key={etapa.tempId} className="p-4 border rounded-lg bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div className="flex items-center gap-1 text-biodina-blue">
                        {getTipoIcon(etapa.tipo)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removerEtapa(etapa.tempId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Nome da Etapa</Label>
                      <Input
                        value={etapa.nome}
                        onChange={(e) => atualizarEtapa(etapa.tempId, 'nome', e.target.value)}
                        placeholder="Ex: Entrevista Técnica"
                      />
                    </div>
                    <div>
                      <Label>Tipo</Label>
                      <Select 
                        value={etapa.tipo} 
                        onValueChange={(value) => atualizarEtapa(etapa.tempId, 'tipo', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="triagem">Triagem</SelectItem>
                          <SelectItem value="entrevista">Entrevista</SelectItem>
                          <SelectItem value="teste">Teste</SelectItem>
                          <SelectItem value="dinamica">Dinâmica</SelectItem>
                          <SelectItem value="aprovacao">Aprovação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      value={etapa.descricao}
                      onChange={(e) => atualizarEtapa(etapa.tempId, 'descricao', e.target.value)}
                      placeholder="Descreva o objetivo e processo desta etapa..."
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Responsável (opcional)</Label>
                      <Input
                        value={etapa.responsavel || ''}
                        onChange={(e) => atualizarEtapa(etapa.tempId, 'responsavel', e.target.value)}
                        placeholder="Ex: João Silva"
                      />
                    </div>
                    <div>
                      <Label>Duração Estimada (opcional)</Label>
                      <Input
                        value={etapa.duracao || ''}
                        onChange={(e) => atualizarEtapa(etapa.tempId, 'duracao', e.target.value)}
                        placeholder="Ex: 1 hora"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={etapa.obrigatoria}
                      onCheckedChange={(checked) => atualizarEtapa(etapa.tempId, 'obrigatoria', checked)}
                    />
                    <Label>Etapa obrigatória</Label>
                  </div>
                </div>
              ))}
            </div>

            {etapas.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <Settings className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">Nenhuma etapa configurada</p>
                <p className="text-xs text-gray-400 mt-1">Adicione etapas ou use um template</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSalvar} disabled={!titulo.trim() || !departamento.trim() || !cargo.trim() || etapas.length === 0}>
              {isEdit ? 'Salvar Alterações' : 'Criar Processo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurarEtapasModal;
