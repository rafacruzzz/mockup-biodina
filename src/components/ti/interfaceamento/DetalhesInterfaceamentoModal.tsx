import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Building, 
  Clock, 
  User, 
  FileText, 
  Settings, 
  History, 
  Save,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { SolicitacaoInterfaceamento } from "@/types/ti";

interface DetalhesInterfaceamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  solicitacao: SolicitacaoInterfaceamento;
}

const DetalhesInterfaceamentoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  solicitacao 
}: DetalhesInterfaceamentoModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('detalhes');
  const [formData, setFormData] = useState({
    status: solicitacao.status,
    responsavelExecucao: solicitacao.responsavelExecucao || '',
    nomeFornecedor: solicitacao.nomeFornecedor || '',
    notasTecnicas: solicitacao.notasTecnicas || '',
    novaObservacao: ''
  });

  useEffect(() => {
    setFormData({
      status: solicitacao.status,
      responsavelExecucao: solicitacao.responsavelExecucao || '',
      nomeFornecedor: solicitacao.nomeFornecedor || '',
      notasTecnicas: solicitacao.notasTecnicas || '',
      novaObservacao: ''
    });
  }, [solicitacao]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar nome do fornecedor se for TI interno
    if (field === 'responsavelExecucao' && value === 'ti_interno') {
      setFormData(prev => ({ ...prev, nomeFornecedor: '' }));
    }
  };

  const getStatusInfo = (status: SolicitacaoInterfaceamento['status']) => {
    const statusMap = {
      aguardando_aprovacao: {
        label: "Aguardando Aprovação",
        icon: Clock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
      },
      aprovado: {
        label: "Aprovado",
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      em_analise: {
        label: "Em Análise",
        icon: AlertTriangle,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      em_desenvolvimento: {
        label: "Em Desenvolvimento",
        icon: Network,
        color: "text-purple-600",
        bgColor: "bg-purple-50"
      },
      concluido: {
        label: "Concluído",
        icon: CheckCircle,
        color: "text-green-800",
        bgColor: "bg-green-100"
      },
      cancelado: {
        label: "Cancelado",
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-50"
      }
    };
    return statusMap[status];
  };

  const handleSave = () => {
    // Validações específicas da TI
    if (formData.responsavelExecucao === 'fornecedor_externo' && !formData.nomeFornecedor.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Nome do fornecedor é obrigatório quando a execução é externa."
      });
      return;
    }

    const updateData = {
      ...solicitacao,
      status: formData.status,
      responsavelExecucao: formData.responsavelExecucao,
      nomeFornecedor: formData.responsavelExecucao === 'fornecedor_externo' ? formData.nomeFornecedor : '',
      notasTecnicas: formData.notasTecnicas,
      dataUltimaAtualizacao: new Date().toISOString(),
      histomicoStatus: [
        ...(solicitacao.histomicoStatus || []),
        ...(formData.novaObservacao ? [
          {
            status: formData.status,
            data: new Date().toISOString(),
            responsavel: 'TI - Current User', // This would come from auth context
            observacoes: formData.novaObservacao
          }
        ] : [])
      ]
    };

    onSave(updateData);
    onClose();

    toast({
      title: "Solicitação Atualizada",
      description: "As alterações foram salvas com sucesso."
    });
  };

  const statusInfo = getStatusInfo(formData.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Network className="h-6 w-6 text-primary" />
            Interfaceamento #{solicitacao.id} - {solicitacao.clienteNome}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detalhes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="gestao-ti" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Gestão TI
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Aba Detalhes */}
          <TabsContent value="detalhes" className="space-y-6 mt-4">
            {/* Informações da Oportunidade */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informações da Oportunidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Cliente:</span>
                    <p className="mt-1">{solicitacao.clienteNome}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Oportunidade ID:</span>
                    <p className="mt-1">{solicitacao.oportunidadeId}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Solicitante:</span>
                    <p className="mt-1">{solicitacao.solicitante}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Departamento:</span>
                    <p className="mt-1">{solicitacao.departamentoSolicitante}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Data Solicitação:</span>
                    <p className="mt-1">{new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Status Atual:</span>
                    <Badge className={`mt-1 ${statusInfo.bgColor} ${statusInfo.color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalhes da Solicitação */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Solicitação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-muted-foreground">Sistema do Cliente:</span>
                    <p className="mt-1 p-3 bg-muted rounded-lg">{solicitacao.sistemaCliente}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Prazo Desejado:</span>
                    <p className="mt-1 p-3 bg-muted rounded-lg">
                      {new Date(solicitacao.prazoDesejado).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Descrição da Necessidade:</span>
                  <div className="mt-1 p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{solicitacao.descricaoNecessidade}</p>
                  </div>
                </div>

                {solicitacao.anexos && solicitacao.anexos.length > 0 && (
                  <div>
                    <span className="font-medium text-muted-foreground">Anexos:</span>
                    <div className="mt-2 space-y-2">
                      {solicitacao.anexos.map((anexo, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{anexo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Gestão TI */}
          <TabsContent value="gestao-ti" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações de Execução
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status da Solicitação *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aguardando_aprovacao">Aguardando Aprovação</SelectItem>
                        <SelectItem value="aprovado">Aprovado</SelectItem>
                        <SelectItem value="em_analise">Em Análise</SelectItem>
                        <SelectItem value="em_desenvolvimento">Em Desenvolvimento</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="responsavelExecucao">Responsável pela Execução *</Label>
                    <Select 
                      value={formData.responsavelExecucao} 
                      onValueChange={(value) => handleInputChange('responsavelExecucao', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ti_interno">TI Interno</SelectItem>
                        <SelectItem value="fornecedor_externo">Fornecedor Externo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.responsavelExecucao === 'fornecedor_externo' && (
                  <div>
                    <Label htmlFor="nomeFornecedor">Nome do Fornecedor *</Label>
                    <Input
                      id="nomeFornecedor"
                      value={formData.nomeFornecedor}
                      onChange={(e) => handleInputChange('nomeFornecedor', e.target.value)}
                      placeholder="Digite o nome do fornecedor"
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="notasTecnicas">Notas Técnicas</Label>
                  <Textarea
                    id="notasTecnicas"
                    value={formData.notasTecnicas}
                    onChange={(e) => handleInputChange('notasTecnicas', e.target.value)}
                    placeholder="Adicione notas técnicas, observações ou comentários internos..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="novaObservacao">Nova Observação (será adicionada ao histórico)</Label>
                  <Textarea
                    id="novaObservacao"
                    value={formData.novaObservacao}
                    onChange={(e) => handleInputChange('novaObservacao', e.target.value)}
                    placeholder="Adicione uma nova observação sobre o andamento..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Histórico */}
          <TabsContent value="historico" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Histórico de Mudanças
                </CardTitle>
              </CardHeader>
              <CardContent>
                {solicitacao.histomicoStatus && solicitacao.histomicoStatus.length > 0 ? (
                  <div className="space-y-4">
                    {solicitacao.histomicoStatus.map((historico, index) => {
                      const itemStatusInfo = getStatusInfo(historico.status as SolicitacaoInterfaceamento['status']);
                      const ItemStatusIcon = itemStatusInfo.icon;
                      
                      return (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0">
                          <div className={`p-2 rounded-full ${itemStatusInfo.bgColor}`}>
                            <ItemStatusIcon className={`h-4 w-4 ${itemStatusInfo.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{itemStatusInfo.label}</span>
                              <Badge variant="outline" className="text-xs">
                                {new Date(historico.data).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Por: {historico.responsavel}
                            </p>
                            {historico.observacoes && (
                              <div className="mt-2 p-3 bg-muted rounded-lg">
                                <p className="text-sm">{historico.observacoes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum histórico disponível ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Footer Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesInterfaceamentoModal;