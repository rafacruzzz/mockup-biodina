import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Download } from 'lucide-react';
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

  const gerarTermoPDF = () => {
    // Implementar geração de PDF
    console.log('Gerando termo de devolução PDF...');
    setFormData(prev => ({ ...prev, termoGerado: true }));
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