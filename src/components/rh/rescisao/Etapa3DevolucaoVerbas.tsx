import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Download, Upload, AlertTriangle, Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Etapa3DevolucaoVerbas as Etapa3Type, ItemDevolucao, VerbaAdicional, Desconto } from '@/types/rescisao';

interface Props {
  dados: Etapa3Type;
  onSave: (dados: Partial<Etapa3Type>) => void;
  onNext: () => void;
}

export function Etapa3DevolucaoVerbas({ dados, onSave, onNext }: Props) {
  const [formData, setFormData] = useState<Etapa3Type>(dados);

  const handleSave = () => {
    onSave(formData);
    onNext();
  };

  const updateItemDevolucao = (index: number, field: string, value: any) => {
    const newItens = [...formData.itensParaDevolucao];
    newItens[index] = { ...newItens[index], [field]: value };
    setFormData(prev => ({ ...prev, itensParaDevolucao: newItens }));
  };

  const updateSubcampo = (index: number, subcampo: string, value: string) => {
    const newItens = [...formData.itensParaDevolucao];
    newItens[index] = {
      ...newItens[index],
      subcampos: { ...newItens[index].subcampos, [subcampo]: value }
    };
    setFormData(prev => ({ ...prev, itensParaDevolucao: newItens }));
  };

  const adicionarVerba = () => {
    setFormData(prev => ({
      ...prev,
      verbasAdicionais: [...prev.verbasAdicionais, { descricao: '', valor: 0 }]
    }));
  };

  const removerVerba = (index: number) => {
    setFormData(prev => ({
      ...prev,
      verbasAdicionais: prev.verbasAdicionais.filter((_, i) => i !== index)
    }));
  };

  const updateVerba = (index: number, field: keyof VerbaAdicional, value: any) => {
    const newVerbas = [...formData.verbasAdicionais];
    newVerbas[index] = { ...newVerbas[index], [field]: value };
    setFormData(prev => ({ ...prev, verbasAdicionais: newVerbas }));
  };

  const adicionarDesconto = () => {
    setFormData(prev => ({
      ...prev,
      descontos: [...prev.descontos, { descricao: '', valor: 0 }]
    }));
  };

  const removerDesconto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      descontos: prev.descontos.filter((_, i) => i !== index)
    }));
  };

  const updateDesconto = (index: number, field: keyof Desconto, value: any) => {
    const newDescontos = [...formData.descontos];
    newDescontos[index] = { ...newDescontos[index], [field]: value };
    setFormData(prev => ({ ...prev, descontos: newDescontos }));
  };

  const updateField = (field: keyof Etapa3Type, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const gerarTermoPDF = () => {
    // Implementar geração de PDF
    console.log('Gerando termo de devolução PDF...');
    setFormData(prev => ({ ...prev, termoGerado: true }));
  };

  const isPaymentDeadlineUrgent = () => {
    if (!formData.dataLimitePagamento) return false;
    const today = new Date();
    const deadline = new Date(formData.dataLimitePagamento);
    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 3 && daysDiff >= 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      comprovantesAnexados: [...prev.comprovantesAnexados, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      comprovantesAnexados: prev.comprovantesAnexados.filter((_, i) => i !== index)
    }));
  };

  const renderSubcampos = (item: ItemDevolucao, index: number) => {
    if (!item.subcampos) return null;

    return Object.keys(item.subcampos).map(key => (
      <div key={key} className="ml-4 mt-2">
        <Label className="text-xs capitalize">{key}</Label>
        <Input
          value={item.subcampos![key]}
          onChange={(e) => updateSubcampo(index, key, e.target.value)}
          placeholder={`Especificar ${key}`}
          className="text-sm"
        />
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">3. Controle de Devoluções e Verbas</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tabela de Devolução de Itens */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Tabela de Devolução de Itens</Label>
            
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item a ser devolvido</TableHead>
                    <TableHead>Data de Devolução</TableHead>
                    <TableHead>Estado do Item</TableHead>
                    <TableHead>Assinatura de Conferência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.itensParaDevolucao.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <span className="font-medium">{item.item}</span>
                          {renderSubcampos(item, index)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          value={item.dataDevolucao || ''}
                          onChange={(e) => updateItemDevolucao(index, 'dataDevolucao', e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.estadoItem || ''}
                          onChange={(e) => updateItemDevolucao(index, 'estadoItem', e.target.value)}
                          placeholder="Bom, Regular, Ruim"
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.assinaturaConferencia || ''}
                          onChange={(e) => updateItemDevolucao(index, 'assinaturaConferencia', e.target.value)}
                          placeholder="Nome do conferente"
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Informações Financeiras */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Informações Financeiras para Rescisão</Label>
            
            {/* Verbas Adicionais */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Inclusão de Verbas Adicionais</Label>
                <Button size="sm" variant="outline" onClick={adicionarVerba}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Verba
                </Button>
              </div>
              
              {formData.verbasAdicionais.map((verba, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label className="text-xs">Descrição da Verba</Label>
                    <Input
                      value={verba.descricao}
                      onChange={(e) => updateVerba(index, 'descricao', e.target.value)}
                      placeholder="Ex: Bonificação, Comissão, etc."
                    />
                  </div>
                  <div className="w-32">
                    <Label className="text-xs">Valor</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={verba.valor}
                      onChange={(e) => updateVerba(index, 'valor', parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                    />
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => removerVerba(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Descontos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Descontos</Label>
                <Button size="sm" variant="outline" onClick={adicionarDesconto}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Desconto
                </Button>
              </div>
              
              {formData.descontos.map((desconto, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label className="text-xs">Descrição do Desconto</Label>
                    <Input
                      value={desconto.descricao}
                      onChange={(e) => updateDesconto(index, 'descricao', e.target.value)}
                      placeholder="Ex: Danos, Adiantamento, etc."
                    />
                  </div>
                  <div className="w-32">
                    <Label className="text-xs">Valor</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={desconto.valor}
                      onChange={(e) => updateDesconto(index, 'valor', parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                    />
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => removerDesconto(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Seção Datas */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Datas</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="solicitacao-dp">Solicitação ao DP</Label>
                <Input
                  id="solicitacao-dp"
                  type="date"
                  value={formData.solicitacaoDP}
                  onChange={(e) => updateField('solicitacaoDP', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conclusao-dp">Conclusão do DP</Label>
                <Input
                  id="conclusao-dp"
                  type="date"
                  value={formData.conclusaoDP}
                  onChange={(e) => updateField('conclusaoDP', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="data-limite">Data limite para pagamento da rescisão e guia FGTS</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Bell className="h-4 w-4 text-amber-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Alerta será gerado 3 dias corridos antes do vencimento</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <Input
                    id="data-limite"
                    type="date"
                    value={formData.dataLimitePagamento}
                    onChange={(e) => updateField('dataLimitePagamento', e.target.value)}
                  />
                  {isPaymentDeadlineUrgent() && (
                    <Alert className="border-amber-500 bg-amber-50">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        <strong>Atenção!</strong> Faltam 3 dias ou menos para o vencimento do pagamento da rescisão.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Upload de Comprovantes */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Comprovantes de quitação</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Anexar comprovantes (recibos, devolução de bens, termo de responsabilidade de TI)
                  </p>
                  <Input 
                    type="file" 
                    multiple 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
              
              {/* Lista de arquivos anexados */}
              {formData.comprovantesAnexados && formData.comprovantesAnexados.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Arquivos Anexados:</Label>
                  <div className="space-y-1">
                    {formData.comprovantesAnexados.map((arquivo, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{arquivo.name}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => removeFile(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={gerarTermoPDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Gerar Termo de Devolução e Quitação (PDF)
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Salvar e Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}