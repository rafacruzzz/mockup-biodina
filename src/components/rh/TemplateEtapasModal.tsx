
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Settings, Clock, Star } from 'lucide-react';
import { TemplateEtapas } from '@/types/processoSeletivo';

interface TemplateEtapasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateEtapasModal = ({ isOpen, onClose }: TemplateEtapasModalProps) => {
  const templates: TemplateEtapas[] = [
    {
      id: 'template-geral',
      nome: 'Processo Geral',
      cargo: 'Cargos Administrativos',
      etapas: [
        { nome: 'Triagem de Currículos', descricao: 'Análise inicial dos currículos recebidos', ordem: 1, tipo: 'triagem', obrigatoria: true },
        { nome: 'Entrevista Inicial', descricao: 'Primeira entrevista com RH para avaliar perfil básico', ordem: 2, tipo: 'entrevista', duracao: '30 minutos', obrigatoria: true },
        { nome: 'Entrevista com Gestor', descricao: 'Entrevista final com o gestor da área', ordem: 3, tipo: 'entrevista', duracao: '45 minutos', obrigatoria: true }
      ]
    },
    {
      id: 'template-tecnico',
      nome: 'Processo Técnico',
      cargo: 'Desenvolvedor/Analista',
      etapas: [
        { nome: 'Triagem de Currículos', descricao: 'Análise inicial dos currículos técnicos', ordem: 1, tipo: 'triagem', obrigatoria: true },
        { nome: 'Entrevista Técnica', descricao: 'Entrevista focada em conhecimentos técnicos específicos', ordem: 2, tipo: 'entrevista', duracao: '1 hora', obrigatoria: true },
        { nome: 'Teste Prático', descricao: 'Desenvolvimento de projeto ou resolução de problemas práticos', ordem: 3, tipo: 'teste', duracao: '3 horas', obrigatoria: true },
        { nome: 'Entrevista Comportamental', descricao: 'Avaliação de soft skills e fit cultural', ordem: 4, tipo: 'entrevista', duracao: '45 minutos', obrigatoria: true }
      ]
    },
    {
      id: 'template-comercial',
      nome: 'Processo Comercial',
      cargo: 'Vendas/Comercial',
      etapas: [
        { nome: 'Triagem de Currículos', descricao: 'Análise inicial focada em experiência comercial', ordem: 1, tipo: 'triagem', obrigatoria: true },
        { nome: 'Entrevista Inicial', descricao: 'Primeira entrevista com RH', ordem: 2, tipo: 'entrevista', duracao: '30 minutos', obrigatoria: true },
        { nome: 'Dinâmica Comercial', descricao: 'Simulação de vendas e negociação', ordem: 3, tipo: 'dinamica', duracao: '2 horas', obrigatoria: true },
        { nome: 'Entrevista com Gestor Comercial', descricao: 'Entrevista final com gerente de vendas', ordem: 4, tipo: 'entrevista', duracao: '45 minutos', obrigatoria: true }
      ]
    },
    {
      id: 'template-lideranca',
      nome: 'Processo Liderança',
      cargo: 'Cargos de Gestão',
      etapas: [
        { nome: 'Triagem de Currículos', descricao: 'Análise de experiência em liderança', ordem: 1, tipo: 'triagem', obrigatoria: true },
        { nome: 'Entrevista Comportamental', descricao: 'Avaliação de competências de liderança', ordem: 2, tipo: 'entrevista', duracao: '1 hora', obrigatoria: true },
        { nome: 'Apresentação de Caso', descricao: 'Apresentação de solução para caso de negócio', ordem: 3, tipo: 'teste', duracao: '2 horas', obrigatoria: true },
        { nome: 'Entrevista com Diretoria', descricao: 'Entrevista final com alta liderança', ordem: 4, tipo: 'entrevista', duracao: '1 hora', obrigatoria: true },
        { nome: 'Aprovação Final', descricao: 'Aprovação e definição de condições contratuais', ordem: 5, tipo: 'aprovacao', obrigatoria: true }
      ]
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'triagem': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'entrevista': return <User className="h-4 w-4 text-green-600" />;
      case 'teste': return <Settings className="h-4 w-4 text-purple-600" />;
      case 'dinamica': return <Star className="h-4 w-4 text-orange-600" />;
      case 'aprovacao': return <Badge className="h-4 w-4 text-emerald-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'triagem': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'entrevista': return 'bg-green-100 text-green-700 border-green-200';
      case 'teste': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'dinamica': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'aprovacao': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Templates de Etapas de Seleção</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Use estes templates como base para configurar rapidamente as etapas dos seus processos seletivos. 
            Você pode aplicar um template e depois personalizar conforme necessário.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map(template => (
              <Card key={template.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.nome}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Ideal para: <span className="font-medium">{template.cargo}</span>
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {template.etapas.length} etapas
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {template.etapas.map((etapa, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 p-1.5 rounded bg-white border">
                            {getTipoIcon(etapa.tipo)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                #{etapa.ordem}
                              </Badge>
                              <Badge className={`text-xs ${getTipoColor(etapa.tipo)}`}>
                                {etapa.tipo}
                              </Badge>
                              <h4 className="font-medium text-sm text-gray-900 truncate">
                                {etapa.nome}
                              </h4>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                              {etapa.descricao}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              {etapa.duracao && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{etapa.duracao}</span>
                                </div>
                              )}
                              {etapa.obrigatoria && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  Obrigatória
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-3">
                      Este template pode ser aplicado ao configurar um novo processo seletivo
                    </p>
                    <Button size="sm" variant="outline" className="w-full" onClick={onClose}>
                      Usar este Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-1">Como usar os templates</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>1. Escolha o template mais adequado ao tipo de vaga</li>
                  <li>2. No modal "Configurar Etapas", selecione o template desejado</li>
                  <li>3. Clique em "Aplicar" para carregar as etapas do template</li>
                  <li>4. Personalize as etapas conforme necessário</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>Fechar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateEtapasModal;
