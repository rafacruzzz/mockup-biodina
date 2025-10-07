import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Package, Upload, X, FileText, Calendar, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { AtivoTI, MovimentacaoAtivo } from "@/types/ti";

interface AtivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  ativo?: AtivoTI | null;
  modo: 'cadastro' | 'edicao';
}

interface FormData {
  numeroInventario: string;
  equipamento: string;
  tipo: string;
  tipoOutro: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  status: string;
  responsavel: string;
  departamento: string;
  localizacao: string;
  dataAquisicao: string;
  dataGarantia: string;
  valorAquisicao: string;
  fornecedor: string;
  numeroNF: string;
  centroCusto: string;
  observacoes: string;
}

export const AtivoModal = ({ isOpen, onClose, ativo, modo }: AtivoModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    numeroInventario: '',
    equipamento: '',
    tipo: '',
    tipoOutro: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    status: 'ativo',
    responsavel: '',
    departamento: '',
    localizacao: '',
    dataAquisicao: '',
    dataGarantia: '',
    valorAquisicao: '',
    fornecedor: '',
    numeroNF: '',
    centroCusto: '',
    observacoes: ''
  });

  const [mostrarIntegracaoFinanceiro, setMostrarIntegracaoFinanceiro] = useState(false);
  const [notasFiscais, setNotasFiscais] = useState<Array<{ nome: string; tipo: string; tamanho: number; file?: File }>>([]);

  useEffect(() => {
    if (ativo && modo === 'edicao') {
      setFormData({
        numeroInventario: ativo.numeroInventario,
        equipamento: ativo.equipamento,
        tipo: ativo.tipo,
        tipoOutro: ativo.tipoOutro || '',
        marca: ativo.marca,
        modelo: ativo.modelo,
        numeroSerie: ativo.numeroSerie,
        status: ativo.status,
        responsavel: ativo.responsavel,
        departamento: ativo.departamento,
        localizacao: ativo.localizacao,
        dataAquisicao: ativo.dataAquisicao,
        dataGarantia: ativo.dataGarantia,
        valorAquisicao: ativo.valorAquisicao?.toString() || '',
        fornecedor: (ativo as any).fornecedor || '',
        numeroNF: (ativo as any).numeroNF || '',
        centroCusto: (ativo as any).centroCusto || '',
        observacoes: (ativo as any).observacoes || ''
      });
      if (ativo.notasFiscais) {
        setNotasFiscais(ativo.notasFiscais.map(nf => ({ nome: nf.nome, tipo: nf.tipo, tamanho: nf.tamanho })));
      }
    } else {
      // Reset form para cadastro
      setFormData({
        numeroInventario: '',
        equipamento: '',
        tipo: '',
        tipoOutro: '',
        marca: '',
        modelo: '',
        numeroSerie: '',
        status: 'ativo',
        responsavel: '',
        departamento: '',
        localizacao: '',
        dataAquisicao: '',
        dataGarantia: '',
        valorAquisicao: '',
        fornecedor: '',
        numeroNF: '',
        centroCusto: '',
        observacoes: ''
      });
      setNotasFiscais([]);
    }
  }, [ativo, modo, isOpen]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação campo "Outro"
    if (formData.tipo === 'outro' && !formData.tipoOutro.trim()) {
      toast.error("Por favor, especifique o tipo de equipamento");
      return;
    }
    
    // Simulação de salvamento
    if (modo === 'cadastro') {
      toast.success("Ativo cadastrado com sucesso!");
    } else {
      toast.success("Ativo atualizado com sucesso!");
    }
    
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const novosArquivos = Array.from(files).map(file => ({
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      file: file
    }));

    // Validação de tamanho (máx 10MB por arquivo)
    const arquivosGrandes = novosArquivos.filter(f => f.tamanho > 10 * 1024 * 1024);
    if (arquivosGrandes.length > 0) {
      toast.error(`Arquivo(s) muito grande(s): ${arquivosGrandes.map(f => f.nome).join(', ')}. Tamanho máximo: 10MB`);
      return;
    }

    setNotasFiscais(prev => [...prev, ...novosArquivos]);
    toast.success(`${novosArquivos.length} arquivo(s) anexado(s)`);
  };

  const removerArquivo = (index: number) => {
    setNotasFiscais(prev => prev.filter((_, i) => i !== index));
    toast.success("Arquivo removido");
  };

  const formatarTamanho = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getTipoMovimentacaoBadge = (tipo: MovimentacaoAtivo['tipo']) => {
    const badges = {
      cadastro: { color: 'bg-blue-100 text-blue-700', label: 'Cadastro' },
      transferencia: { color: 'bg-purple-100 text-purple-700', label: 'Transferência' },
      manutencao: { color: 'bg-yellow-100 text-yellow-700', label: 'Manutenção' },
      atualizacao: { color: 'bg-green-100 text-green-700', label: 'Atualização' },
      baixa: { color: 'bg-red-100 text-red-700', label: 'Baixa' }
    };
    return badges[tipo];
  };

  const calcularIdadeAtivo = () => {
    if (!formData.dataAquisicao) return null;
    const hoje = new Date();
    const aquisicao = new Date(formData.dataAquisicao);
    const anos = hoje.getFullYear() - aquisicao.getFullYear();
    return anos;
  };

  const verificarGarantia = () => {
    if (!formData.dataGarantia) return null;
    const hoje = new Date();
    const garantia = new Date(formData.dataGarantia);
    const diasRestantes = Math.ceil((garantia.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    if (diasRestantes < 0) return { status: 'vencida', dias: Math.abs(diasRestantes) };
    if (diasRestantes <= 90) return { status: 'vencendo', dias: diasRestantes };
    return { status: 'ok', dias: diasRestantes };
  };

  const idadeAtivo = calcularIdadeAtivo();
  const statusGarantia = verificarGarantia();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {modo === 'cadastro' ? 'Cadastrar Novo Ativo' : 'Editar Ativo'}
          </DialogTitle>
          <DialogDescription>
            {modo === 'cadastro' 
              ? 'Preencha as informações para cadastrar um novo ativo de TI'
              : 'Atualize as informações do ativo selecionado'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Alertas de Status */}
          {modo === 'edicao' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Idade do Ativo */}
              {idadeAtivo !== null && (
                <Card className={idadeAtivo >= 5 ? 'border-yellow-200 bg-yellow-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      {idadeAtivo >= 5 ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium">Idade do Ativo</p>
                        <p className="text-xs text-gray-600">
                          {idadeAtivo} ano{idadeAtivo !== 1 ? 's' : ''}
                          {idadeAtivo >= 5 && ' - Próximo ao fim da vida útil'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status da Garantia */}
              {statusGarantia && (
                <Card className={statusGarantia.status !== 'ok' ? 'border-red-200 bg-red-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      {statusGarantia.status === 'vencida' ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : statusGarantia.status === 'vencendo' ? (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium">Garantia</p>
                        <p className="text-xs text-gray-600">
                          {statusGarantia.status === 'vencida' && `Vencida há ${statusGarantia.dias} dias`}
                          {statusGarantia.status === 'vencendo' && `Vence em ${statusGarantia.dias} dias`}
                          {statusGarantia.status === 'ok' && `Válida por ${statusGarantia.dias} dias`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Integração Financeiro */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Integração Financeiro</p>
                      <Button 
                        type="button"
                        variant="link" 
                        className="h-auto p-0 text-xs"
                        onClick={() => setMostrarIntegracaoFinanceiro(!mostrarIntegracaoFinanceiro)}
                      >
                        {mostrarIntegracaoFinanceiro ? 'Ocultar' : 'Ver'} dados da NF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="numeroInventario">Número do Inventário *</Label>
                  <Input
                    id="numeroInventario"
                    value={formData.numeroInventario}
                    onChange={(e) => handleInputChange('numeroInventario', e.target.value)}
                    placeholder="Ex: NB-001"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="equipamento">Equipamento *</Label>
                  <Input
                    id="equipamento"
                    value={formData.equipamento}
                    onChange={(e) => handleInputChange('equipamento', e.target.value)}
                    placeholder="Ex: Notebook Dell Vostro 15"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                    <SelectTrigger className="bg-background z-50">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="notebook">Notebook</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="servidor">Servidor</SelectItem>
                      <SelectItem value="impressora">Impressora</SelectItem>
                      <SelectItem value="roteador">Roteador</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Campo dinâmico para "Outro" */}
                {formData.tipo === 'outro' && (
                  <div>
                    <Label htmlFor="tipoOutro">Especifique o Tipo *</Label>
                    <Input
                      id="tipoOutro"
                      value={formData.tipoOutro}
                      onChange={(e) => handleInputChange('tipoOutro', e.target.value)}
                      placeholder="Ex: Tablet, Scanner, etc."
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="marca">Marca *</Label>
                    <Input
                      id="marca"
                      value={formData.marca}
                      onChange={(e) => handleInputChange('marca', e.target.value)}
                      placeholder="Ex: Dell"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="modelo">Modelo *</Label>
                    <Input
                      id="modelo"
                      value={formData.modelo}
                      onChange={(e) => handleInputChange('modelo', e.target.value)}
                      placeholder="Ex: Vostro 15-3520"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="numeroSerie">Número de Série *</Label>
                  <Input
                    id="numeroSerie"
                    value={formData.numeroSerie}
                    onChange={(e) => handleInputChange('numeroSerie', e.target.value)}
                    placeholder="Ex: DL2024001"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status e Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status e Localização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="manutencao">Em Manutenção</SelectItem>
                      <SelectItem value="reserva">Reserva</SelectItem>
                      <SelectItem value="descartado">Descartado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="responsavel">Responsável *</Label>
                  <Input
                    id="responsavel"
                    value={formData.responsavel}
                    onChange={(e) => handleInputChange('responsavel', e.target.value)}
                    placeholder="Ex: João Silva"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="departamento">Departamento *</Label>
                  <Select value={formData.departamento} onValueChange={(value) => handleInputChange('departamento', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="localizacao">Localização Física *</Label>
                  <Input
                    id="localizacao"
                    value={formData.localizacao}
                    onChange={(e) => handleInputChange('localizacao', e.target.value)}
                    placeholder="Ex: Sala 101 - 1º Andar"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="centroCusto">Centro de Custo</Label>
                  <Select value={formData.centroCusto} onValueChange={(value) => handleInputChange('centroCusto', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o centro de custo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dados Financeiros */}
          <Card className={mostrarIntegracaoFinanceiro || modo === 'cadastro' ? '' : 'hidden'}>
            <CardHeader>
              <CardTitle className="text-lg">Dados Financeiros</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
                <Input
                  id="dataAquisicao"
                  type="date"
                  value={formData.dataAquisicao}
                  onChange={(e) => handleInputChange('dataAquisicao', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dataGarantia">Data de Garantia</Label>
                <Input
                  id="dataGarantia"
                  type="date"
                  value={formData.dataGarantia}
                  onChange={(e) => handleInputChange('dataGarantia', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="valorAquisicao">Valor de Aquisição</Label>
                <Input
                  id="valorAquisicao"
                  type="number"
                  step="0.01"
                  value={formData.valorAquisicao}
                  onChange={(e) => handleInputChange('valorAquisicao', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) => handleInputChange('fornecedor', e.target.value)}
                  placeholder="Ex: Dell do Brasil"
                />
              </div>

              <div>
                <Label htmlFor="numeroNF">Número da NF</Label>
                <Input
                  id="numeroNF"
                  value={formData.numeroNF}
                  onChange={(e) => handleInputChange('numeroNF', e.target.value)}
                  placeholder="Ex: NF-2024-001"
                />
              </div>

              {/* Upload de Nota Fiscal */}
              <div className="md:col-span-3 space-y-3">
                <Label>Anexar Nota Fiscal</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="notaFiscal"
                    accept=".pdf,.jpg,.jpeg,.png,.xml"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="notaFiscal" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Arraste arquivos ou clique para selecionar</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG, XML - Máx 10MB por arquivo
                    </p>
                  </label>
                </div>

                {/* Lista de arquivos anexados */}
                {notasFiscais.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Arquivos anexados:</p>
                    {notasFiscais.map((arquivo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{arquivo.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatarTamanho(arquivo.tamanho)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerArquivo(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações gerais sobre o ativo..."
              rows={3}
            />
          </div>

          {/* Histórico de Movimentações - apenas no modo edição */}
          {modo === 'edicao' && ativo?.historico && ativo.historico.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Histórico de Movimentações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-border pl-6 space-y-6">
                  {ativo.historico.map((mov) => {
                    const badgeInfo = getTipoMovimentacaoBadge(mov.tipo);
                    return (
                      <div key={mov.id} className="relative">
                        {/* Marcador da timeline */}
                        <div className="absolute -left-[1.6rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={badgeInfo.color}>
                              {badgeInfo.label}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(mov.data).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          {/* Detalhes da movimentação */}
                          {mov.tipo === 'transferencia' && (
                            <div className="text-sm">
                              <p className="font-medium flex items-center gap-2">
                                <span className="text-muted-foreground">De:</span>
                                {mov.departamentoOrigem} - {mov.responsavelOrigem}
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Para:</span>
                                {mov.departamentoDestino} - {mov.responsavelDestino}
                              </p>
                              {mov.motivo && (
                                <p className="text-muted-foreground mt-1">
                                  <span className="font-medium">Motivo:</span> {mov.motivo}
                                </p>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Por: {mov.usuario}</span>
                          </div>

                          {mov.observacoes && (
                            <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                              {mov.observacoes}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {modo === 'cadastro' ? 'Cadastrar' : 'Atualizar'} Ativo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};