import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  X, 
  Paperclip, 
  User, 
  Calendar,
  BarChart3
} from "lucide-react";
import { tiModules } from "@/data/tiModules";

const GestaoConformidade = () => {
  const [normaSelecionada, setNormaSelecionada] = useState('iso27001');
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState<any>(null);

  // Dados das normas
  const normas = [
    { value: 'iso27001', label: 'ISO 27001', desc: 'Gestão da Segurança da Informação' },
    { value: 'lgpd', label: 'LGPD', desc: 'Lei Geral de Proteção de Dados' },
    { value: 'gdpr', label: 'GDPR', desc: 'General Data Protection Regulation' },
    { value: 'pci_dss', label: 'PCI-DSS', desc: 'Payment Card Industry Data Security Standard' }
  ];

  // Dados dos controles (simulando dados completos)
  const getControlesData = () => {
    if (normaSelecionada === 'iso27001') {
      return tiModules.conformidade.subModules.iso27001.data || [];
    } else if (normaSelecionada === 'lgpd') {
      return tiModules.conformidade.subModules.lgpd.data || [];
    }
    // Retornar dados mock para outras normas
    return [];
  };

  const controles = getControlesData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implementado': return 'bg-green-100 text-green-800';
      case 'nao_implementado': return 'bg-red-100 text-red-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'nao_aplicavel': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implementado': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'nao_implementado': return <X className="h-4 w-4 text-red-600" />;
      case 'em_andamento': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'nao_aplicavel': return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  // Calcular progresso da implementação
  const calcularProgresso = () => {
    const total = controles.length;
    const implementados = controles.filter((c: any) => c.status === 'implementado').length;
    const emAndamento = controles.filter((c: any) => c.status === 'em_andamento').length;
    
    const progressoImplementado = total > 0 ? (implementados / total) * 100 : 0;
    const progressoTotal = total > 0 ? ((implementados + emAndamento) / total) * 100 : 0;

    return {
      implementados,
      emAndamento,
      total,
      progressoImplementado: Math.round(progressoImplementado),
      progressoTotal: Math.round(progressoTotal)
    };
  };

  const progresso = calcularProgresso();
  const normaAtiva = normas.find(n => n.value === normaSelecionada);

  const handleEvidenceClick = (controle: any) => {
    setSelectedControl(controle);
    setIsEvidenceModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString('pt-BR') : '-';
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com seleção de norma */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Gestão de Conformidade e Riscos
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Gerenciamento e auditoria de conformidade com normas de segurança
              </p>
            </div>
            <div className="w-80">
              <Select value={normaSelecionada} onValueChange={setNormaSelecionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a norma" />
                </SelectTrigger>
                <SelectContent>
                  {normas.map((norma) => (
                    <SelectItem key={norma.value} value={norma.value}>
                      <div>
                        <div className="font-medium">{norma.label}</div>
                        <div className="text-xs text-muted-foreground">{norma.desc}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Barra de progresso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {normaAtiva?.label} - Status de Implementação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{progresso.implementados}</p>
                <p className="text-sm text-muted-foreground">Implementados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{progresso.emAndamento}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{progresso.total}</p>
                <p className="text-sm text-muted-foreground">Total de Controles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{progresso.progressoImplementado}%</p>
                <p className="text-sm text-muted-foreground">Completude</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso de Implementação</span>
                <span>{progresso.progressoImplementado}% concluído</span>
              </div>
              <Progress value={progresso.progressoImplementado} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de controles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Controles da Norma ({controles.length})</CardTitle>
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Descrição do Controle</TableHead>
                <TableHead className="w-40">Status</TableHead>
                <TableHead className="w-32">Evidências</TableHead>
                <TableHead className="w-48">Responsável</TableHead>
                <TableHead className="w-32">Última Revisão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controles.map((controle: any) => (
                <TableRow key={controle.id}>
                  <TableCell className="font-mono text-sm">
                    {controle.idControle}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{controle.descricao}</p>
                      {controle.observacoes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {controle.observacoes}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(controle.status)}
                      <Badge className={getStatusColor(controle.status)}>
                        {controle.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEvidenceClick(controle)}
                    >
                      <Paperclip className="h-3 w-3 mr-1" />
                      {controle.evidencias?.length || 0}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {controle.responsavel ? (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="text-sm">{controle.responsavel}</span>
                      </div>
                    ) : (
                      <Badge variant="secondary">Não atribuído</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(controle.dataUltimaRevisao)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {controles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum controle definido para esta norma ainda.
              </p>
              <Button className="mt-4">
                Importar Controles Padrão
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Evidências */}
      <Dialog open={isEvidenceModalOpen} onOpenChange={setIsEvidenceModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Evidências - {selectedControl?.idControle}</DialogTitle>
          </DialogHeader>
          
          {selectedControl && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">{selectedControl.descricao}</h4>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedControl.status)}
                  <Badge className={getStatusColor(selectedControl.status)}>
                    {selectedControl.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Responsável</label>
                  <Input 
                    value={selectedControl.responsavel || ''} 
                    placeholder="Atribuir responsável"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Data da Última Revisão</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="date" 
                      value={selectedControl.dataUltimaRevisao || ''} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Observações</label>
                <Textarea 
                  value={selectedControl.observacoes || ''} 
                  placeholder="Adicionar observações sobre a implementação"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Evidências Anexadas</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Paperclip className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">
                    Clique para fazer upload ou arraste arquivos aqui
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF, DOC, XLSX, PNG, JPG até 50MB
                  </p>
                  
                  {selectedControl.evidencias?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedControl.evidencias.map((evidencia: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded">
                          <Paperclip className="h-3 w-3" />
                          <span>{evidencia}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEvidenceModalOpen(false)}>
                  Cancelar
                </Button>
                <Button>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoConformidade;