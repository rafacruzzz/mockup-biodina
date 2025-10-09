
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Headphones } from 'lucide-react';
import { 
  Chamado, 
  TipoChamado, 
  SubtipoChamadoFinanceiro, 
  StatusChamado,
  TIPOS_CHAMADO_LABELS,
  SUBTIPOS_FINANCEIRO_LABELS,
  STATUS_CHAMADO_LABELS
} from '@/types/chamado';

interface ChamadosTabProps {
  chamados: Chamado[];
  onAdicionarChamado: (chamado: Omit<Chamado, 'id' | 'dataAbertura' | 'status'>) => void;
  oportunidade?: {
    id?: string;
    codigo?: string;
    cliente: string;
    responsavel: string;
    valor: number;
    status?: string;
    segmento?: string;
  };
}

const ChamadosTab = ({ chamados, onAdicionarChamado, oportunidade }: ChamadosTabProps) => {
  const [novoTipo, setNovoTipo] = useState<TipoChamado | ''>('');
  const [novoSubtipo, setNovoSubtipo] = useState<SubtipoChamadoFinanceiro | ''>('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaObservacao, setNovaObservacao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novoTipo || !novaDescricao.trim()) {
      return;
    }

    if (novoTipo === TipoChamado.FINANCEIRO && !novoSubtipo) {
      return;
    }

    const novoChamado: Omit<Chamado, 'id' | 'dataAbertura' | 'status'> = {
      tipo: novoTipo,
      subtipo: novoTipo === TipoChamado.FINANCEIRO ? novoSubtipo as SubtipoChamadoFinanceiro : undefined,
      descricao: novaDescricao.trim(),
      observacoes: novaObservacao.trim() || undefined,
      responsavel: oportunidade?.responsavel || undefined,
    };

    onAdicionarChamado(novoChamado);
    
    // Limpar formulário
    setNovoTipo('');
    setNovoSubtipo('');
    setNovaDescricao('');
    setNovaObservacao('');
  };

  const getStatusColor = (status: StatusChamado) => {
    switch (status) {
      case StatusChamado.ABERTO:
        return 'bg-yellow-500';
      case StatusChamado.RESPONDIDO:
        return 'bg-blue-500';
      case StatusChamado.FINALIZADO:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatarTipoChamado = (chamado: Chamado) => {
    const tipoLabel = TIPOS_CHAMADO_LABELS[chamado.tipo];
    if (chamado.tipo === TipoChamado.FINANCEIRO && chamado.subtipo) {
      const subtipoLabel = SUBTIPOS_FINANCEIRO_LABELS[chamado.subtipo];
      return `${tipoLabel} - ${subtipoLabel}`;
    }
    return tipoLabel;
  };

  return (
    <div className="space-y-6">
      {/* Formulário para Novo Chamado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Abrir Novo Chamado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo-chamado">Tipo de Chamado *</Label>
                <Select value={novoTipo} onValueChange={(value) => {
                  setNovoTipo(value as TipoChamado);
                  if (value !== TipoChamado.FINANCEIRO) {
                    setNovoSubtipo('');
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TIPOS_CHAMADO_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {novoTipo === TipoChamado.FINANCEIRO && (
                <div>
                  <Label htmlFor="subtipo-financeiro">Subtipo Financeiro *</Label>
                  <Select value={novoSubtipo} onValueChange={(value) => setNovoSubtipo(value as SubtipoChamadoFinanceiro)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o subtipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SUBTIPOS_FINANCEIRO_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="descricao-chamado">Descrição do Chamado *</Label>
              <Textarea
                id="descricao-chamado"
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
                placeholder="Descreva detalhadamente o chamado..."
                rows={4}
              />
            </div>

            {/* Campo Observações - apenas para Interface (TI) */}
            {novoTipo === TipoChamado.INTERFACE_TI && (
              <div>
                <Label htmlFor="observacoes-chamado">
                  Observações
                  <span className="text-xs text-muted-foreground ml-2">
                    (Custos indiretos: modem, servidor, etc.)
                  </span>
                </Label>
                <Textarea
                  id="observacoes-chamado"
                  value={novaObservacao}
                  onChange={(e) => setNovaObservacao(e.target.value)}
                  placeholder="Descreva custos esperados como aquisição de modem, servidor, configurações, etc..."
                  rows={3}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Documente custos indiretos para solicitação de compra (uso e consumo)
                </p>
              </div>
            )}

            {/* Informações da Oportunidade - Auto-preenchidas */}
            {oportunidade && (
              <div className="pt-4">
                <Separator className="mb-4" />
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                  📋 Informações da Oportunidade
                </h4>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Cliente:</span>
                    <p className="text-sm mt-1 font-medium">{oportunidade.cliente || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Código Oportunidade:</span>
                    <p className="text-sm mt-1 font-medium">{oportunidade.codigo || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Responsável:</span>
                    <p className="text-sm mt-1">{oportunidade.responsavel || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Segmento:</span>
                    <p className="text-sm mt-1">{oportunidade.segmento || 'N/A'}</p>
                  </div>
                  {oportunidade.valor && (
                    <div className="col-span-2">
                      <span className="text-xs font-medium text-muted-foreground">Valor da Oportunidade:</span>
                      <p className="text-sm mt-1 font-medium text-green-600">
                        R$ {oportunidade.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              type="submit" 
              disabled={!novoTipo || !novaDescricao.trim() || (novoTipo === TipoChamado.FINANCEIRO && !novoSubtipo)}
              className="bg-biodina-gold hover:bg-biodina-gold/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Abrir Chamado
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Histórico de Chamados */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Histórico de Chamados
          </CardTitle>
          {chamados.length > 0 && (
            <div className="flex gap-2 text-sm">
              <Badge variant="outline" className="bg-yellow-50">
                Abertos: {chamados.filter(c => c.status === StatusChamado.ABERTO).length}
              </Badge>
              <Badge variant="outline" className="bg-blue-50">
                Respondidos: {chamados.filter(c => c.status === StatusChamado.RESPONDIDO).length}
              </Badge>
              <Badge variant="outline" className="bg-green-50">
                Finalizados: {chamados.filter(c => c.status === StatusChamado.FINALIZADO).length}
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {chamados.length === 0 ? (
            <div className="text-center py-8">
              <Headphones className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Nenhum chamado aberto para esta oportunidade</p>
              <p className="text-sm text-gray-500">
                Use o formulário acima para abrir um novo chamado
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Abertura</TableHead>
                    <TableHead>Última Atualização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chamados
                    .sort((a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime())
                    .map((chamado) => (
                    <TableRow key={chamado.id}>
                      <TableCell className="font-medium">
                        {formatarTipoChamado(chamado)}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={chamado.descricao}>
                          {chamado.descricao}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(chamado.status)} text-white`}>
                          {STATUS_CHAMADO_LABELS[chamado.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(chamado.dataAbertura).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {chamado.dataFinalizacao 
                          ? new Date(chamado.dataFinalizacao).toLocaleDateString('pt-BR')
                          : chamado.dataResposta 
                          ? new Date(chamado.dataResposta).toLocaleDateString('pt-BR')
                          : new Date(chamado.dataAbertura).toLocaleDateString('pt-BR')
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChamadosTab;
