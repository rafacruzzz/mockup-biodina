import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X, Plus, AlertTriangle } from 'lucide-react';
import { MoneyInput } from '@/components/ui/money-input';
import { RequisicaoPagamento, TipoRequisicao, TipoVinculacao, StatusRequisicao, TipoDocumento, Cotacao, Documento } from '@/types/financeiro';

interface NovaRequisicaoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (requisicao: RequisicaoPagamento) => void;
}

export const NovaRequisicaoModal: React.FC<NovaRequisicaoModalProps> = ({ open, onClose, onSave }) => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formData, setFormData] = useState({
    tipo: '' as TipoRequisicao,
    tipoVinculacao: '' as TipoVinculacao,
    projetoClienteId: '',
    departamentoId: '',
    descricao: '',
    valor: '',
    vencimento: '',
    destino: '',
    periodo: { inicio: '', fim: '' },
    justificativa: ''
  });
  
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setEtapaAtual(1);
    setFormData({
      tipo: '' as TipoRequisicao,
      tipoVinculacao: '' as TipoVinculacao,
      projetoClienteId: '',
      departamentoId: '',
      descricao: '',
      valor: '',
      vencimento: '',
      destino: '',
      periodo: { inicio: '', fim: '' },
      justificativa: ''
    });
    setCotacoes([]);
    setDocumentos([]);
    setErrors({});
  };

  const validateEtapa1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.tipo) newErrors.tipo = 'Tipo de requisição é obrigatório';
    if (!formData.tipoVinculacao) newErrors.tipoVinculacao = 'Tipo de vinculação é obrigatório';
    if (formData.tipoVinculacao === TipoVinculacao.PROJETO_CLIENTE && !formData.projetoClienteId) {
      newErrors.projetoClienteId = 'Projeto/Cliente é obrigatório';
    }
    if (formData.tipoVinculacao === TipoVinculacao.DEPARTAMENTO && !formData.departamentoId) {
      newErrors.departamentoId = 'Departamento é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEtapa2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.descricao) newErrors.descricao = 'Descrição é obrigatória';
    if (!formData.valor) newErrors.valor = 'Valor é obrigatório';
    if (!formData.vencimento) newErrors.vencimento = 'Vencimento é obrigatório';
    
    // Validações específicas por tipo
    if (formData.tipo === TipoRequisicao.SUPRIMENTOS) {
      if (cotacoes.length < 3 && !formData.justificativa) {
        newErrors.cotacoes = 'São necessárias 3 cotações ou justificativa';
      }
    }
    
    if ([TipoRequisicao.PASSAGENS, TipoRequisicao.HOSPEDAGEM].includes(formData.tipo)) {
      if (!formData.destino) newErrors.destino = 'Destino é obrigatório';
      if (!formData.periodo.inicio || !formData.periodo.fim) newErrors.periodo = 'Período é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEtapa3 = () => {
    const documentosObrigatorios = [
      TipoDocumento.EMAIL,
      TipoDocumento.REQUISICAO
    ];
    
    const documentosPresentes = documentos.filter(d => d.arquivo).map(d => d.tipo);
    const faltantes = documentosObrigatorios.filter(tipo => !documentosPresentes.includes(tipo));
    
    if (faltantes.length > 0) {
      setErrors({ documentos: `Documentos obrigatórios faltantes: ${faltantes.join(', ')}` });
      return false;
    }
    
    return true;
  };

  const adicionarCotacao = () => {
    const novaCotacao: Cotacao = {
      id: Date.now().toString(),
      fornecedor: '',
      valor: 0,
      prazo: '',
      observacoes: ''
    };
    setCotacoes([...cotacoes, novaCotacao]);
  };

  const removerCotacao = (id: string) => {
    setCotacoes(cotacoes.filter(c => c.id !== id));
  };

  const atualizarCotacao = (id: string, campo: string, valor: any) => {
    setCotacoes(cotacoes.map(c => 
      c.id === id ? { ...c, [campo]: valor } : c
    ));
  };

  const adicionarDocumento = (tipo: TipoDocumento, arquivo?: File) => {
    const novoDocumento: Documento = {
      id: Date.now().toString(),
      tipo,
      nome: arquivo?.name || `${tipo}_${Date.now()}`,
      arquivo,
      dataUpload: new Date(),
      obrigatorio: [TipoDocumento.EMAIL, TipoDocumento.REQUISICAO].includes(tipo)
    };
    
    setDocumentos([...documentos.filter(d => d.tipo !== tipo), novoDocumento]);
  };

  const handleSubmit = () => {
    if (!validateEtapa3()) return;

    const novaRequisicao: RequisicaoPagamento = {
      id: Date.now().toString(),
      tipo: formData.tipo,
      tipoVinculacao: formData.tipoVinculacao,
      projetoClienteId: formData.projetoClienteId || undefined,
      departamentoId: formData.departamentoId || undefined,
      solicitante: 'Usuário Atual', // Seria pego do contexto de usuário
      
      descricao: formData.descricao,
      valor: parseFloat(formData.valor) || 0,
      vencimento: new Date(formData.vencimento),
      
      cotacoes: cotacoes.length > 0 ? cotacoes : undefined,
      destino: formData.destino || undefined,
      periodo: (formData.periodo.inicio && formData.periodo.fim) ? {
        inicio: new Date(formData.periodo.inicio),
        fim: new Date(formData.periodo.fim)
      } : undefined,
      justificativa: formData.justificativa || undefined,
      
      status: StatusRequisicao.AGUARDANDO_GESTOR,
      dataRequisicao: new Date(),
      
      documentos
    };

    onSave(novaRequisicao);
    resetForm();
  };

  const proximaEtapa = () => {
    if (etapaAtual === 1 && validateEtapa1()) {
      setEtapaAtual(2);
    } else if (etapaAtual === 2 && validateEtapa2()) {
      setEtapaAtual(3);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Requisição de Pagamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Indicador de Etapas */}
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((etapa) => (
              <div key={etapa} className={`flex items-center ${etapa < 3 ? 'flex-1' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${etapaAtual >= etapa ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {etapa}
                </div>
                <div className="ml-2 text-sm">
                  {etapa === 1 && 'Vinculação'}
                  {etapa === 2 && 'Dados'}
                  {etapa === 3 && 'Documentos'}
                </div>
                {etapa < 3 && <div className="flex-1 h-px bg-border mx-4" />}
              </div>
            ))}
          </div>

          {/* Etapa 1: Vinculação */}
          {etapaAtual === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo de Requisição *</Label>
                  <Select value={formData.tipo} onValueChange={(value: TipoRequisicao) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TipoRequisicao.SUPRIMENTOS}>Suprimentos</SelectItem>
                      <SelectItem value={TipoRequisicao.PASSAGENS}>Passagens</SelectItem>
                      <SelectItem value={TipoRequisicao.HOSPEDAGEM}>Hospedagem</SelectItem>
                      <SelectItem value={TipoRequisicao.RECORRENTE}>Recorrente</SelectItem>
                      <SelectItem value={TipoRequisicao.OUTROS}>Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipo && <p className="text-sm text-destructive mt-1">{errors.tipo}</p>}
                </div>

                <div>
                  <Label htmlFor="tipoVinculacao">Vinculação *</Label>
                  <Select value={formData.tipoVinculacao} onValueChange={(value: TipoVinculacao) => setFormData({...formData, tipoVinculacao: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Como vincular?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TipoVinculacao.PROJETO_CLIENTE}>Projeto/Cliente</SelectItem>
                      <SelectItem value={TipoVinculacao.DEPARTAMENTO}>Departamento</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipoVinculacao && <p className="text-sm text-destructive mt-1">{errors.tipoVinculacao}</p>}
                </div>
              </div>

              {formData.tipoVinculacao === TipoVinculacao.PROJETO_CLIENTE && (
                <div>
                  <Label htmlFor="projetoClienteId">Projeto/Cliente *</Label>
                  <Select value={formData.projetoClienteId} onValueChange={(value) => setFormData({...formData, projetoClienteId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto/cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projeto1">Projeto Hospital ABC</SelectItem>
                      <SelectItem value="projeto2">Projeto Farmácia XYZ</SelectItem>
                      <SelectItem value="cliente1">Cliente - Distribuidora Med</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projetoClienteId && <p className="text-sm text-destructive mt-1">{errors.projetoClienteId}</p>}
                </div>
              )}

              {formData.tipoVinculacao === TipoVinculacao.DEPARTAMENTO && (
                <div>
                  <Label htmlFor="departamentoId">Departamento *</Label>
                  <Select value={formData.departamentoId} onValueChange={(value) => setFormData({...formData, departamentoId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="rh">Recursos Humanos</SelectItem>
                      <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.departamentoId && <p className="text-sm text-destructive mt-1">{errors.departamentoId}</p>}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={proximaEtapa}>Próximo</Button>
              </div>
            </div>
          )}

          {/* Etapa 2: Dados */}
          {etapaAtual === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    placeholder="Descreva detalhadamente a requisição"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  />
                  {errors.descricao && <p className="text-sm text-destructive mt-1">{errors.descricao}</p>}
                </div>

                <div>
                  <Label htmlFor="valor">Valor *</Label>
                  <MoneyInput
                    value={formData.valor}
                    onChange={(value) => setFormData({...formData, valor: value})}
                    currency="BRL"
                  />
                  {errors.valor && <p className="text-sm text-destructive mt-1">{errors.valor}</p>}
                </div>

                <div>
                  <Label htmlFor="vencimento">Vencimento *</Label>
                  <Input
                    type="date"
                    value={formData.vencimento}
                    onChange={(e) => setFormData({...formData, vencimento: e.target.value})}
                  />
                  {errors.vencimento && <p className="text-sm text-destructive mt-1">{errors.vencimento}</p>}
                </div>
              </div>

              {/* Campos específicos por tipo */}
              {formData.tipo === TipoRequisicao.SUPRIMENTOS && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cotações (Mínimo 3 ou Justificativa)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cotacoes.map((cotacao, index) => (
                      <div key={cotacao.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Cotação {index + 1}</h4>
                          <Button size="sm" variant="outline" onClick={() => removerCotacao(cotacao.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Fornecedor"
                            value={cotacao.fornecedor}
                            onChange={(e) => atualizarCotacao(cotacao.id, 'fornecedor', e.target.value)}
                          />
                          <MoneyInput
                            value={cotacao.valor.toString()}
                            onChange={(value) => atualizarCotacao(cotacao.id, 'valor', parseFloat(value) || 0)}
                            currency="BRL"
                          />
                          <Input
                            placeholder="Prazo"
                            value={cotacao.prazo}
                            onChange={(e) => atualizarCotacao(cotacao.id, 'prazo', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button onClick={adicionarCotacao} variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Cotação
                    </Button>

                    {cotacoes.length < 3 && (
                      <div>
                        <Label htmlFor="justificativa">Justificativa (se menos de 3 cotações)</Label>
                        <Textarea
                          placeholder="Justifique por que não é possível obter 3 cotações"
                          value={formData.justificativa}
                          onChange={(e) => setFormData({...formData, justificativa: e.target.value})}
                        />
                      </div>
                    )}
                    
                    {errors.cotacoes && <p className="text-sm text-destructive">{errors.cotacoes}</p>}
                  </CardContent>
                </Card>
              )}

              {[TipoRequisicao.PASSAGENS, TipoRequisicao.HOSPEDAGEM].includes(formData.tipo) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detalhes da Viagem</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="destino">Destino *</Label>
                      <Input
                        placeholder="Cidade/Estado/País de destino"
                        value={formData.destino}
                        onChange={(e) => setFormData({...formData, destino: e.target.value})}
                      />
                      {errors.destino && <p className="text-sm text-destructive mt-1">{errors.destino}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="inicioViagem">Data de Início *</Label>
                        <Input
                          type="date"
                          value={formData.periodo.inicio}
                          onChange={(e) => setFormData({...formData, periodo: {...formData.periodo, inicio: e.target.value}})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fimViagem">Data de Fim *</Label>
                        <Input
                          type="date"
                          value={formData.periodo.fim}
                          onChange={(e) => setFormData({...formData, periodo: {...formData.periodo, fim: e.target.value}})}
                        />
                      </div>
                    </div>
                    {errors.periodo && <p className="text-sm text-destructive">{errors.periodo}</p>}
                    
                    <div>
                      <Label htmlFor="justificativaViagem">Justificativa da Viagem</Label>
                      <Textarea
                        placeholder="Justifique a necessidade da viagem"
                        value={formData.justificativa}
                        onChange={(e) => setFormData({...formData, justificativa: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setEtapaAtual(1)}>Voltar</Button>
                <Button onClick={proximaEtapa}>Próximo</Button>
              </div>
            </div>
          )}

          {/* Etapa 3: Documentos */}
          {etapaAtual === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Documentos Obrigatórios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { tipo: TipoDocumento.EMAIL, nome: 'E-mail do Pedido/Requisição', obrigatorio: true },
                    { tipo: TipoDocumento.REQUISICAO, nome: 'Requisição Formal', obrigatorio: true },
                    { tipo: TipoDocumento.NOTA_FISCAL, nome: 'Nota Fiscal', obrigatorio: false },
                    { tipo: TipoDocumento.BOLETO, nome: 'Boleto/Duplicata', obrigatorio: false },
                    { tipo: TipoDocumento.COMPROVANTE, nome: 'Comprovante de Pagamento', obrigatorio: false }
                  ].map(({ tipo, nome, obrigatorio }) => {
                    const documento = documentos.find(d => d.tipo === tipo);
                    return (
                      <div key={tipo} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{nome}</span>
                          {obrigatorio && <Badge variant="destructive" className="text-xs">Obrigatório</Badge>}
                          {documento && <Badge variant="default" className="text-xs bg-green-100 text-green-800">Anexado</Badge>}
                        </div>
                        <div className="flex items-center gap-2">
                          {documento && (
                            <span className="text-sm text-muted-foreground">{documento.nome}</span>
                          )}
                          <input
                            type="file"
                            id={`file-${tipo}`}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) adicionarDocumento(tipo, file);
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => document.getElementById(`file-${tipo}`)?.click()}
                          >
                            {documento ? 'Trocar' : 'Anexar'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {errors.documentos && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <p className="text-sm text-destructive">{errors.documentos}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setEtapaAtual(2)}>Voltar</Button>
                <Button onClick={handleSubmit}>Criar Requisição</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};