import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  MessageSquare, 
  Paperclip, 
  Edit3,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetalhesChamadoModalProps {
  chamado: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (chamadoId: number, updates: any) => void;
}

const DetalhesChamadoModal: React.FC<DetalhesChamadoModalProps> = ({
  chamado,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: chamado?.status || '',
    prioridade: chamado?.prioridade || '',
    tecnicoResponsavel: chamado?.tecnicoResponsavel || '',
    observacoes: chamado?.observacoes || ''
  });
  const [novaObservacao, setNovaObservacao] = useState('');
  const { toast } = useToast();

  if (!chamado) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-red-100 text-red-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'aguardando': return 'bg-blue-100 text-blue-800';
      case 'resolvido': return 'bg-green-100 text-green-800';
      case 'fechado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'critica': return 'bg-red-500 text-white';
      case 'alta': return 'bg-orange-500 text-white';
      case 'media': return 'bg-yellow-500 text-white';
      case 'baixa': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const handleSave = () => {
    onUpdate(chamado.id, editData);
    setIsEditing(false);
    toast({
      title: "Chamado atualizado",
      description: "As alterações foram salvas com sucesso."
    });
  };

  const handleAddObservacao = () => {
    if (!novaObservacao.trim()) return;
    
    const observacao = {
      id: Date.now(),
      texto: novaObservacao,
      autor: 'Técnico Atual',
      data: new Date().toISOString(),
      tipo: 'observacao'
    };

    // Adicionar à lista de observações do chamado
    const updatedChamado = {
      ...chamado,
      historico: [...(chamado.historico || []), observacao]
    };

    onUpdate(chamado.id, { historico: updatedChamado.historico });
    setNovaObservacao('');
    
    toast({
      title: "Observação adicionada",
      description: "Nova observação foi registrada no chamado."
    });
  };

  const tecnicos = [
    'João Silva - Nível 1',
    'Maria Santos - Nível 2', 
    'Pedro Costa - Nível 3',
    'Ana Oliveira - Especialista'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Chamado #{chamado.id} - {chamado.titulo}</span>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 pr-4">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Solicitante</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4" />
                    <span>{chamado.solicitante}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Departamento</Label>
                  <p>{chamado.departamento}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Categoria</Label>
                  <Badge variant="outline">{chamado.categoria}</Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data de Abertura</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateTime(chamado.dataAbertura)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  {isEditing ? (
                    <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aberto">Aberto</SelectItem>
                        <SelectItem value="em_andamento">Em Andamento</SelectItem>
                        <SelectItem value="aguardando">Aguardando</SelectItem>
                        <SelectItem value="resolvido">Resolvido</SelectItem>
                        <SelectItem value="fechado">Fechado</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getStatusColor(chamado.status)}>
                      {chamado.status.replace('_', ' ')}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Prioridade</Label>
                  {isEditing ? (
                    <Select value={editData.prioridade} onValueChange={(value) => setEditData({...editData, prioridade: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="critica">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getPrioridadeColor(chamado.prioridade)}>
                      {chamado.prioridade}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Técnico Responsável</Label>
                  {isEditing ? (
                    <Select value={editData.tecnicoResponsavel} onValueChange={(value) => setEditData({...editData, tecnicoResponsavel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Não atribuído</SelectItem>
                        {tecnicos.map((tecnico) => (
                          <SelectItem key={tecnico} value={tecnico}>
                            {tecnico}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-4 w-4" />
                      <span>{chamado.tecnicoResponsavel || 'Não atribuído'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Descrição */}
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Descrição do Problema</Label>
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p>{chamado.descricao}</p>
              </div>
            </div>

            {/* Anexos */}
            {chamado.anexos && chamado.anexos.length > 0 && (
              <>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Anexos</Label>
                  <div className="mt-2 space-y-2">
                    {chamado.anexos.map((anexo: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm">{anexo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Histórico e Observações */}
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Histórico e Observações</Label>
              
              {/* Adicionar nova observação */}
              <div className="mt-3 space-y-2">
                <Textarea
                  placeholder="Adicionar observação ou atualização..."
                  value={novaObservacao}
                  onChange={(e) => setNovaObservacao(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddObservacao} size="sm" disabled={!novaObservacao.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Adicionar Observação
                </Button>
              </div>

              {/* Histórico existente */}
              <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                {(chamado.historico || []).map((item: any) => (
                  <div key={item.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDateTime(item.data)}</span>
                      <span>•</span>
                      <span>{item.autor}</span>
                    </div>
                    <p className="text-sm">{item.texto}</p>
                  </div>
                ))}
                
                {/* Entrada inicial do chamado */}
                <div className="p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDateTime(chamado.dataAbertura)}</span>
                    <span>•</span>
                    <span>{chamado.solicitante}</span>
                  </div>
                  <p className="text-sm font-medium">Chamado aberto</p>
                  <p className="text-sm text-muted-foreground">Problema reportado pelo usuário</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesChamadoModal;