import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { licitacoesGanhasDetalhadas, concorrentes, licitantes } from '@/data/licitacaoMockData';
import { CalendarDays, Building2, MapPin, Globe, FileText, Users, DollarSign, Calendar, Trophy, Medal, Target, Clock, AlertTriangle, CheckCircle, XCircle, MessageSquare, Paperclip, Plus, Edit, Trash2, Eye, Download, Upload, Send } from 'lucide-react';
import LicitacaoValidationModal from './LicitacaoValidationModal';
import TabelaLicitantes from '@/components/licitacao/TabelaLicitantes';
import ConcorrenteModal from './ConcorrenteModal';

interface HistoricoItem {
  usuario: string;
  departamento: string;
  timestamp: string;
  texto: string;
  anexos: string[];
}

interface Concorrente {
  id: number;
  nome: string;
  valor: number;
}

interface Documento {
  nome: string;
  tipo: string;
  data: string;
  url: string;
}

interface FormData {
  numeroPregao: string;
  nomeInstituicao: string;
  cnpj: string;
  uf: string;
  municipio: string;
  linkEdital: string;
  objetoLicitacao: string;
  resumoEdital: string;
  analiseTecnica: string;
  palavraChave: string;
  estrategiaValorFinal: string;
  dataAbertura: string;
  status: string;
  solicitarAnaliseTecnica: boolean;
}

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm: React.FC<OportunidadeAvancadaFormProps> = ({
  isOpen,
  oportunidade,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState('geral');
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [editingConcorrente, setEditingConcorrente] = useState<any>(null);
  
  const [formData, setFormData] = useState<FormData>({
    numeroPregao: '',
    nomeInstituicao: '',
    cnpj: '',
    uf: '',
    municipio: '',
    linkEdital: '',
    objetoLicitacao: '',
    resumoEdital: '',
    analiseTecnica: '',
    palavraChave: '',
    estrategiaValorFinal: '',
    dataAbertura: '',
    status: 'em_andamento',
    solicitarAnaliseTecnica: false
  });

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [concorrentesLocais, setConcorrentesLocais] = useState<Concorrente[]>(concorrentes);

  useEffect(() => {
    if (oportunidade) {
      setFormData({
        numeroPregao: oportunidade.numeroPregao || '',
        nomeInstituicao: oportunidade.nomeInstituicao || '',
        cnpj: oportunidade.cnpj || '',
        uf: oportunidade.uf || '',
        municipio: oportunidade.municipio || '',
        linkEdital: oportunidade.linkEdital || '',
        objetoLicitacao: oportunidade.objetoLicitacao || '',
        resumoEdital: oportunidade.resumoEdital || '',
        analiseTecnica: oportunidade.analiseTecnica || '',
        palavraChave: oportunidade.palavraChave || '',
        estrategiaValorFinal: oportunidade.estrategiaValorFinal || '',
        dataAbertura: oportunidade.dataAbertura || '',
        status: oportunidade.status || 'em_andamento',
        solicitarAnaliseTecnica: oportunidade.solicitarAnaliseTecnica || false
      });
      
      if (oportunidade.documentos) {
        setDocumentos(oportunidade.documentos);
      }
      
      if (oportunidade.historico) {
        setHistorico(oportunidade.historico);
      }
    }
  }, [oportunidade]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setShowValidationModal(true);
  };

  const handleConfirmSave = () => {
    const dadosCompletos = {
      ...formData,
      documentos,
      historico,
      concorrentes: concorrentesLocais
    };
    
    onSave(dadosCompletos);
    setShowValidationModal(false);
  };

  const handleConverterAutomaticamente = () => {
    const dadosCompletos = {
      ...formData,
      documentos,
      historico,
      concorrentes: concorrentesLocais,
      status: 'convertida'
    };
    
    onSave(dadosCompletos);
    setShowValidationModal(false);
  };

  const adicionarHistorico = (texto: string, anexos: string[] = []) => {
    const novoItem = {
      usuario: 'Usuário Atual',
      departamento: 'Comercial',
      timestamp: new Date().toISOString(),
      texto,
      anexos
    };
    
    setHistorico(prev => [...prev, novoItem]);
  };

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : value;
    if (isNaN(numValue)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const handleAdicionarConcorrente = () => {
    setEditingConcorrente(null);
    setShowConcorrenteModal(true);
  };

  const handleEditarConcorrente = (concorrente: any) => {
    setEditingConcorrente(concorrente);
    setShowConcorrenteModal(true);
  };

  const handleSalvarConcorrente = (dadosConcorrente: any) => {
    if (editingConcorrente) {
      setConcorrentesLocais(prev => 
        prev.map(c => c.id === editingConcorrente.id ? { ...dadosConcorrente, id: editingConcorrente.id } : c)
      );
    } else {
      const novoId = Math.max(...concorrentesLocais.map(c => c.id), 0) + 1;
      setConcorrentesLocais(prev => [...prev, { ...dadosConcorrente, id: novoId }]);
    }
    setShowConcorrenteModal(false);
    setEditingConcorrente(null);
  };

  const handleExcluirConcorrente = (id: number) => {
    setConcorrentesLocais(prev => prev.filter(c => c.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ganha': return 'bg-green-500';
      case 'perdida': return 'bg-red-500';
      case 'em_andamento': return 'bg-blue-500';
      case 'cancelada': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ganha': return 'Ganha';
      case 'perdida': return 'Perdida';
      case 'em_andamento': return 'Em Andamento';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-biodina-gold" />
              {oportunidade ? 'Editar' : 'Nova'} Licitação
              {formData.numeroPregao && (
                <Badge className={`${getStatusColor(formData.status)} text-white ml-2`}>
                  {getStatusLabel(formData.status)}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
              <TabsTrigger value="negociacoes">Negociações</TabsTrigger>
              <TabsTrigger value="anexos">Anexos</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
            </TabsList>

            <div className="h-[60vh] overflow-y-auto mt-4">
              <TabsContent value="geral" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numeroPregao">Número do Pregão *</Label>
                    <Input
                      id="numeroPregao"
                      value={formData.numeroPregao}
                      onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                      placeholder="Ex: PE-2024-001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
                    <Input
                      id="nomeInstituicao"
                      value={formData.nomeInstituicao}
                      onChange={(e) => handleInputChange('nomeInstituicao', e.target.value)}
                      placeholder="Nome completo da instituição"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      placeholder="00.000.000/0001-00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uf">UF</Label>
                    <Input
                      id="uf"
                      value={formData.uf}
                      onChange={(e) => handleInputChange('uf', e.target.value)}
                      placeholder="Ex: SP"
                      maxLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="municipio">Município</Label>
                    <Input
                      id="municipio"
                      value={formData.municipio}
                      onChange={(e) => handleInputChange('municipio', e.target.value)}
                      placeholder="Nome do município"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataAbertura">Data de Abertura</Label>
                    <Input
                      id="dataAbertura"
                      type="date"
                      value={formData.dataAbertura}
                      onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkEdital">Link do Edital</Label>
                  <Input
                    id="linkEdital"
                    value={formData.linkEdital}
                    onChange={(e) => handleInputChange('linkEdital', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
                  <Textarea
                    id="objetoLicitacao"
                    value={formData.objetoLicitacao}
                    onChange={(e) => handleInputChange('objetoLicitacao', e.target.value)}
                    placeholder="Descreva o objeto da licitação"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                  <Textarea
                    id="resumoEdital"
                    value={formData.resumoEdital}
                    onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                    placeholder="Resumo detalhado do edital"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="solicitarAnaliseTecnica"
                      checked={formData.solicitarAnaliseTecnica}
                      onCheckedChange={(checked) => handleInputChange('solicitarAnaliseTecnica', checked)}
                    />
                    <Label htmlFor="solicitarAnaliseTecnica">Solicitar análise técnica</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analiseTecnica">Análise Técnica</Label>
                    <Textarea
                      id="analiseTecnica"
                      value={formData.analiseTecnica}
                      onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                      placeholder="Análise técnica detalhada do projeto"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="palavraChave">Palavra-chave</Label>
                    <Input
                      id="palavraChave"
                      value={formData.palavraChave}
                      onChange={(e) => handleInputChange('palavraChave', e.target.value)}
                      placeholder="Palavras-chave separadas por vírgula"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estrategiaValorFinal">Estratégia/Valor Final</Label>
                    <Input
                      id="estrategiaValorFinal"
                      value={formData.estrategiaValorFinal}
                      onChange={(e) => handleInputChange('estrategiaValorFinal', e.target.value)}
                      placeholder="R$ 0,00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="ganha">Ganha</SelectItem>
                      <SelectItem value="perdida">Perdida</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="negociacoes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Concorrentes
                      </CardTitle>
                      <Button onClick={handleAdicionarConcorrente} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Concorrente
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {concorrentesLocais.map((concorrente) => (
                          <TableRow key={concorrente.id}>
                            <TableCell>{concorrente.nome}</TableCell>
                            <TableCell>{formatCurrency(concorrente.valor)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditarConcorrente(concorrente)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleExcluirConcorrente(concorrente.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <TabelaLicitantes licitantes={licitantes} />
              </TabsContent>

              <TabsContent value="anexos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Paperclip className="h-5 w-5" />
                        Documentos Anexados
                      </CardTitle>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Adicionar Documento
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {documentos.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {documentos.map((doc, index) => (
                            <TableRow key={index}>
                              <TableCell>{doc.nome}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{doc.tipo}</Badge>
                              </TableCell>
                              <TableCell>{formatDate(doc.data)}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhum documento anexado ainda</p>
                        <p className="text-sm">Clique em "Adicionar Documento" para começar</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Histórico de Atividades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {historico.length > 0 ? (
                        <div className="space-y-4">
                          {historico.map((item, index) => (
                            <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{item.usuario}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {item.departamento}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{item.texto}</p>
                                  {item.anexos && item.anexos.length > 0 && (
                                    <div className="flex gap-2 flex-wrap">
                                      {item.anexos.map((anexo, anexoIndex) => (
                                        <Badge key={anexoIndex} variant="secondary" className="text-xs">
                                          <Paperclip className="h-3 w-3 mr-1" />
                                          {anexo}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400 ml-4">
                                  {formatDateTime(item.timestamp)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Nenhuma atividade registrada ainda</p>
                          <p className="text-sm">O histórico será criado automaticamente conforme as ações</p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              Salvar Licitação
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <LicitacaoValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onConfirm={handleConfirmSave}
        onConvertAutomatically={handleConverterAutomaticamente}
        dadosLicitacao={formData}
      />

      <ConcorrenteModal
        isOpen={showConcorrenteModal}
        concorrente={editingConcorrente}
        onClose={() => {
          setShowConcorrenteModal(false);
          setEditingConcorrente(null);
        }}
        onSave={handleSalvarConcorrente}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
