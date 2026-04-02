import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle2, Clock, Plus, XCircle, ShieldCheck, Paperclip } from 'lucide-react';
import { naoConformidadesRTMockadas, responsaveisNCRT, setoresEmpresaRT, fabricantesComUnidadesRT, produtosMockNCRT, equipamentosMockDTRT } from '@/data/rtModules';
import type { NaoConformidadeRT, ImpactoNCRT, TipoNCEnumRT, ProdutoLiberacaoNCRT } from '@/types/rt';
import { format } from 'date-fns';
import { toast } from 'sonner';

const TIPOS_NC_RT: TipoNCEnumRT[] = [
  'Legal/Regulatória',
  'Processo/Operacional',
  'Produto',
  'Gestão',
  'Fornecedor',
  'Segurança/Meio Ambiente'
];

export function GestaoNCTab() {
  const [ncs, setNcs] = useState<NaoConformidadeRT[]>(naoConformidadesRTMockadas);
  const [ncSelecionada, setNcSelecionada] = useState<NaoConformidadeRT | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoNovo, setModoNovo] = useState(false);

  const handleNovaNC = () => {
    const novoId = `NC-RT-${Date.now()}`;
    const sequencial = ncs.length + 1;
    const ano = new Date().getFullYear();
    const novaNC: NaoConformidadeRT = {
      id: `NC-RT-${ano}-${String(sequencial).padStart(3, '0')}`,
      data: new Date().toISOString().split('T')[0],
      origem: '',
      tipo: '',
      tipos: [],
      impacto: 'Leve',
      descricao: '',
      acaoImediata: '',
      responsavel: '',
      responsaveis: [],
      prazoExecucao: new Date().toISOString().split('T')[0],
      status: 'Aberta',
      observacoes: '',
      dataCriacao: new Date(),
      produtosLiberacao: [],
      capa: {
        id: `capa-${novoId}`,
        acaoPreventiva: '',
        acaoCorretiva: '',
        prazoFinal: new Date(),
        status: 'Pendente',
        responsavel: '',
      },
    };
    setNcSelecionada(novaNC);
    setModoNovo(true);
    setModalAberto(true);
  };

  const salvarNC = () => {
    if (!ncSelecionada) return;
    if (modoNovo) {
      setNcs(prev => [...prev, { ...ncSelecionada, dataCriacao: new Date() }]);
    } else {
      setNcs(prev => prev.map(nc => nc.id === ncSelecionada.id ? { ...ncSelecionada, dataAtualizacao: new Date() } : nc));
    }
    setModalAberto(false);
    setModoNovo(false);
    setNcSelecionada(null);
    toast.success(modoNovo ? 'NC criada com sucesso!' : 'NC atualizada com sucesso!');
  };

  const toggleTipo = (tipo: TipoNCEnumRT) => {
    if (!ncSelecionada) return;
    const current = ncSelecionada.tipos || [];
    const updated = current.includes(tipo) ? current.filter(t => t !== tipo) : [...current, tipo];
    setNcSelecionada({ ...ncSelecionada, tipos: updated });
  };

  const toggleSetor = (setor: string) => {
    if (!ncSelecionada) return;
    const current = ncSelecionada.responsaveis || [];
    const updated = current.includes(setor) ? current.filter(s => s !== setor) : [...current, setor];
    setNcSelecionada({ ...ncSelecionada, responsaveis: updated });
  };

  const autocompletarProduto = (campo: string, valor: string) => {
    if (!ncSelecionada) return;
    const found = produtosMockNCRT.find(p =>
      (campo === 'codigo' && p.codigo.toUpperCase().includes(valor.toUpperCase())) ||
      (campo === 'marca' && p.marca.toUpperCase().includes(valor.toUpperCase())) ||
      (campo === 'modelo' && p.modelo.toUpperCase().includes(valor.toUpperCase())) ||
      (campo === 'nome' && p.nomeFabricante.toUpperCase().includes(valor.toUpperCase()))
    );
    if (found) {
      setNcSelecionada({
        ...ncSelecionada,
        produtoCodigo: found.codigo,
        produtoMarca: found.marca,
        produtoModelo: found.modelo,
        produtoNomeFabricante: found.nomeFabricante,
      });
    } else {
      setNcSelecionada({
        ...ncSelecionada,
        ...(campo === 'codigo' && { produtoCodigo: valor }),
        ...(campo === 'marca' && { produtoMarca: valor }),
        ...(campo === 'modelo' && { produtoModelo: valor }),
        ...(campo === 'nome' && { produtoNomeFabricante: valor }),
      });
    }
  };

  const validarAcaoImediata = () => {
    if (!ncSelecionada) return;
    setNcSelecionada({
      ...ncSelecionada,
      acaoImediataValidada: true,
      acaoImediataValidadaPor: 'RT/Qualidade',
      acaoImediataValidadaEm: format(new Date(), 'dd/MM/yyyy HH:mm'),
    });
    toast.success('Ação Imediata validada pelo RT/Qualidade!');
  };

  const validarAcaoFinal = () => {
    if (!ncSelecionada) return;
    setNcSelecionada({
      ...ncSelecionada,
      acaoFinalValidada: true,
      acaoFinalValidadaPor: 'RT/Qualidade',
      acaoFinalValidadaEm: format(new Date(), 'dd/MM/yyyy HH:mm'),
    });
    toast.success('Ação Final validada pelo RT/Qualidade!');
  };

  const adicionarProdutoLiberacao = () => {
    if (!ncSelecionada) return;
    const current = ncSelecionada.produtosLiberacao || [];
    const novoCodigo = `LIB-${String(current.length + 1).padStart(3, '0')}`;
    const novo: ProdutoLiberacaoNCRT = {
      id: `lib-${Date.now()}`,
      codigo: novoCodigo,
      referencia: '',
      nome: '',
      modelo: '',
      fabricante: '',
      marca: '',
      linhaProduto: '',
      apresentacao: [],
      numeroSerieLote: '',
      status: 'Pendente',
      liberadoRT: false,
    };
    setNcSelecionada({ ...ncSelecionada, produtosLiberacao: [...current, novo] });
  };

  const atualizarProdutoLiberacao = (index: number, campo: string, valor: any) => {
    if (!ncSelecionada) return;
    const prods = [...(ncSelecionada.produtosLiberacao || [])];
    const prod = { ...prods[index], [campo]: valor };
    if (['referencia', 'nome', 'modelo'].includes(campo)) {
      const found = produtosMockNCRT.find(p =>
        (campo === 'referencia' && p.referencia.toUpperCase().includes(String(valor).toUpperCase())) ||
        (campo === 'nome' && p.nomeFabricante.toUpperCase().includes(String(valor).toUpperCase())) ||
        (campo === 'modelo' && p.modelo.toUpperCase().includes(String(valor).toUpperCase()))
      );
      if (found) {
        prod.referencia = found.referencia;
        prod.nome = found.nomeFabricante;
        prod.modelo = found.modelo;
        prod.fabricante = found.nomeFabricante;
        prod.marca = found.marca;
        prod.linhaProduto = found.linhaProduto;
      }
    }
    prods[index] = prod;
    setNcSelecionada({ ...ncSelecionada, produtosLiberacao: prods });
  };

  const liberarProdutoRT = (index: number) => {
    if (!ncSelecionada) return;
    const prods = [...(ncSelecionada.produtosLiberacao || [])];
    prods[index] = { ...prods[index], liberadoRT: true, dataLiberacao: format(new Date(), 'dd/MM/yyyy') };
    setNcSelecionada({ ...ncSelecionada, produtosLiberacao: prods });
    toast.success('Produto liberado pelo RT!');
  };

  const toggleApresentacao = (index: number, tipo: 'primaria' | 'secundaria' | 'terciaria') => {
    if (!ncSelecionada) return;
    const prods = [...(ncSelecionada.produtosLiberacao || [])];
    const current = prods[index].apresentacao || [];
    prods[index] = {
      ...prods[index],
      apresentacao: current.includes(tipo) ? current.filter(a => a !== tipo) : [...current, tipo]
    };
    setNcSelecionada({ ...ncSelecionada, produtosLiberacao: prods });
  };

  const getImpactoBadge = (impacto: ImpactoNCRT) => {
    switch (impacto) {
      case "Crítico":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <Badge variant="destructive">Crítico</Badge>
          </div>
        );
      case "Moderado":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            <Badge className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950">Moderado</Badge>
          </div>
        );
      case "Leve":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <Badge className="bg-green-500 hover:bg-green-600 text-white">Leve</Badge>
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberta":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Aberta</Badge>;
      case "Em Análise":
        return <Badge className="bg-orange-500 hover:bg-orange-600"><Clock className="w-3 h-3 mr-1" />Em Análise</Badge>;
      case "Aguardando Ação":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><AlertCircle className="w-3 h-3 mr-1" />Aguardando Ação</Badge>;
      case "Resolvida":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Resolvida</Badge>;
      case "Fechada":
        return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Fechada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusCAPABadge = (status: string) => {
    switch (status) {
      case "Pendente":
        return <Badge variant="outline">Pendente</Badge>;
      case "Em Andamento":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Em Andamento</Badge>;
      case "Concluída":
        return <Badge className="bg-green-500 hover:bg-green-600">Concluída</Badge>;
      case "Verificada":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Verificada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const abrirDetalhesNC = (nc: NaoConformidadeRT) => {
    setNcSelecionada(nc);
    setModoNovo(false);
    setModalAberto(true);
  };

  const estatisticas = {
    total: ncs.length,
    criticas: ncs.filter(nc => nc.impacto === 'Crítico').length,
    moderadas: ncs.filter(nc => nc.impacto === 'Moderado').length,
    leves: ncs.filter(nc => nc.impacto === 'Leve').length,
    abertas: ncs.filter(nc => nc.status === 'Aberta' || nc.status === 'Em Análise' || nc.status === 'Aguardando Ação').length
  };

  const tiposExibem = ncSelecionada?.tipos || [];
  const mostrarProduto = tiposExibem.includes('Produto');
  const mostrarFornecedor = tiposExibem.includes('Fornecedor');
  const mostrarTabelaLiberacao = mostrarProduto || mostrarFornecedor;
  const mostrarCAPADT = tiposExibem.includes('Segurança/Meio Ambiente');

  const unidadesFabrisDisponiveis = ncSelecionada?.fornecedorNomeFabricanteLegal
    ? fabricantesComUnidadesRT.find(f => f.nome === ncSelecionada.fornecedorNomeFabricanteLegal)?.unidades || []
    : [];

  const updateCapa = (field: string, value: any) => {
    if (!ncSelecionada) return;
    setNcSelecionada({
      ...ncSelecionada,
      capa: {
        ...ncSelecionada.capa,
        [field]: value,
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de NCs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.total}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">NCs Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{estatisticas.criticas}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-400 bg-yellow-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-800">NCs Moderadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{estatisticas.moderadas}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">NCs Leves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{estatisticas.leves}</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">NCs Abertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{estatisticas.abertas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de NCs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Não Conformidades Abertas - RT</CardTitle>
          <Button onClick={handleNovaNC} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Nova Não Conformidade
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID da NC</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Tipo(s)</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Responsável(eis)</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ncs.map((nc) => (
                <TableRow key={nc.id}>
                  <TableCell className="font-medium">{nc.id}</TableCell>
                  <TableCell>{new Date(nc.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{nc.origem}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(nc.tipos && nc.tipos.length > 0) ? nc.tipos.map(t => (
                        <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                      )) : <span>{nc.tipo}</span>}
                    </div>
                  </TableCell>
                  <TableCell>{getImpactoBadge(nc.impacto)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(nc.responsaveis && nc.responsaveis.length > 0) ? nc.responsaveis.map(r => (
                        <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
                      )) : <span>{nc.responsavel}</span>}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(nc.prazoExecucao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(nc.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => abrirDetalhesNC(nc)}>
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalAberto} onOpenChange={(open) => { setModalAberto(open); if (!open) { setModoNovo(false); setNcSelecionada(null); } }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modoNovo ? 'Nova Não Conformidade - RT' : `Detalhes - ${ncSelecionada?.id}`}</DialogTitle>
          </DialogHeader>

          {ncSelecionada && (
            <div className="space-y-6">
              {/* a) Data da NC + Origem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Data da NC</Label>
                  <Input
                    type="date"
                    value={ncSelecionada.data}
                    onChange={(e) => setNcSelecionada({ ...ncSelecionada, data: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Origem</Label>
                  <Input
                    value={ncSelecionada.origem}
                    onChange={(e) => setNcSelecionada({ ...ncSelecionada, origem: e.target.value })}
                    placeholder="Preenchido pelo setor que abre a NC..."
                  />
                </div>
              </div>

              {/* b) Tipo — multi-select checkboxes */}
              <div>
                <Label className="mb-2 block">Tipo (selecione um ou mais)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TIPOS_NC_RT.map((tipo) => (
                    <div key={tipo} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tipo-rt-${tipo}`}
                        checked={(ncSelecionada.tipos || []).includes(tipo)}
                        onCheckedChange={() => toggleTipo(tipo)}
                      />
                      <label htmlFor={`tipo-rt-${tipo}`} className="text-sm cursor-pointer">{tipo}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* c) Campos condicionais — Produto */}
              {mostrarProduto && (
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Dados do Produto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Código do Produto</Label>
                        <Input
                          value={ncSelecionada.produtoCodigo || ''}
                          onChange={(e) => autocompletarProduto('codigo', e.target.value)}
                          placeholder="Ex: PROD-001"
                        />
                      </div>
                      <div>
                        <Label>Marca</Label>
                        <Input
                          value={ncSelecionada.produtoMarca || ''}
                          onChange={(e) => autocompletarProduto('marca', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Modelo</Label>
                        <Input
                          value={ncSelecionada.produtoModelo || ''}
                          onChange={(e) => autocompletarProduto('modelo', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Nome do Produto (Fabricante)</Label>
                        <Input
                          value={ncSelecionada.produtoNomeFabricante || ''}
                          onChange={(e) => autocompletarProduto('nome', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* c) Campos condicionais — Fornecedor */}
              {mostrarFornecedor && (
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Dados do Fornecedor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome do Fabricante Legal / Marca</Label>
                        <Select
                          value={ncSelecionada.fornecedorNomeFabricanteLegal || ''}
                          onValueChange={(v) => setNcSelecionada({ ...ncSelecionada, fornecedorNomeFabricanteLegal: v, fornecedorUnidadeFabril: '' })}
                        >
                          <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                          <SelectContent>
                            {fabricantesComUnidadesRT.map(f => (
                              <SelectItem key={f.nome} value={f.nome}>{f.nome}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Nome da Unidade Fabril</Label>
                        <Select
                          value={ncSelecionada.fornecedorUnidadeFabril || ''}
                          onValueChange={(v) => setNcSelecionada({ ...ncSelecionada, fornecedorUnidadeFabril: v })}
                          disabled={!ncSelecionada.fornecedorNomeFabricanteLegal}
                        >
                          <SelectTrigger><SelectValue placeholder={ncSelecionada.fornecedorNomeFabricanteLegal ? 'Selecione...' : 'Selecione o fabricante primeiro'} /></SelectTrigger>
                          <SelectContent>
                            {unidadesFabrisDisponiveis.map(u => (
                              <SelectItem key={u} value={u}>{u}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* d) Impacto + Prazo de Execução */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Impacto <span className="text-xs text-muted-foreground">(somente RT e/ou Qualidade)</span></Label>
                  <Select
                    value={ncSelecionada.impacto}
                    onValueChange={(value: ImpactoNCRT) => setNcSelecionada({ ...ncSelecionada, impacto: value })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crítico">Crítico</SelectItem>
                      <SelectItem value="Moderado">Moderado</SelectItem>
                      <SelectItem value="Leve">Leve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Prazo de Execução <span className="text-xs text-muted-foreground">(somente RT e/ou Qualidade)</span></Label>
                  <Input
                    type="date"
                    value={ncSelecionada.prazoExecucao}
                    onChange={(e) => setNcSelecionada({ ...ncSelecionada, prazoExecucao: e.target.value })}
                  />
                </div>
              </div>

              {/* e) Responsável — multi-select setores */}
              <div>
                <Label className="mb-2 block">Responsável (setores)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {setoresEmpresaRT.map((setor) => (
                    <div key={setor} className="flex items-center space-x-2">
                      <Checkbox
                        id={`setor-rt-${setor}`}
                        checked={(ncSelecionada.responsaveis || []).includes(setor)}
                        onCheckedChange={() => toggleSetor(setor)}
                      />
                      <label htmlFor={`setor-rt-${setor}`} className="text-sm cursor-pointer">{setor}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* f) Descrição da NC */}
              <div>
                <Label>Descrição da NC</Label>
                <Textarea
                  value={ncSelecionada.descricao}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, descricao: e.target.value })}
                  rows={3}
                />
              </div>

              {/* g) Ação Imediata */}
              <div>
                <Label>Ação Imediata</Label>
                <Textarea
                  value={ncSelecionada.acaoImediata || ''}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, acaoImediata: e.target.value })}
                  rows={2}
                  placeholder="Descreva a ação imediata tomada..."
                />
              </div>

              {/* h) Botão Validar Ação Imediata */}
              <div className="flex items-center gap-4">
                {ncSelecionada.acaoImediataValidada ? (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Validada por {ncSelecionada.acaoImediataValidadaPor} em {ncSelecionada.acaoImediataValidadaEm}
                    </span>
                  </div>
                ) : (
                  <Button onClick={validarAcaoImediata} variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Validar Ação Imediata (RT/Qualidade)
                  </Button>
                )}
              </div>

              {/* i) Ações Complementares + Responsável */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Ações Complementares</Label>
                  <Textarea
                    value={ncSelecionada.acoesComplementares || ''}
                    onChange={(e) => setNcSelecionada({ ...ncSelecionada, acoesComplementares: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Responsável</Label>
                  <Input
                    value={ncSelecionada.responsavelComplementar || ''}
                    onChange={(e) => setNcSelecionada({ ...ncSelecionada, responsavelComplementar: e.target.value })}
                  />
                </div>
              </div>

              {/* j) Evidências */}
              <div>
                <Label>Evidências</Label>
                <Textarea
                  value={ncSelecionada.evidenciasTexto || ''}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, evidenciasTexto: e.target.value })}
                  rows={2}
                  placeholder="Descreva as evidências..."
                />
                <div className="mt-2">
                  <Label className="cursor-pointer inline-flex items-center gap-2 text-sm text-primary hover:underline">
                    <Paperclip className="w-4 h-4" />
                    Anexar arquivos de evidência
                    <input type="file" multiple className="hidden" onChange={() => toast.info('Arquivo anexado (mock)')} />
                  </Label>
                </div>
              </div>

              {/* k) Observações */}
              <div>
                <Label>Observações</Label>
                <Textarea
                  value={ncSelecionada.observacoes || ''}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, observacoes: e.target.value })}
                  rows={3}
                  placeholder="Observações adicionais..."
                />
                <div className="mt-2">
                  <Label className="cursor-pointer inline-flex items-center gap-2 text-sm text-primary hover:underline">
                    <Paperclip className="w-4 h-4" />
                    Anexar arquivos
                    <input type="file" multiple className="hidden" onChange={() => toast.info('Arquivo anexado (mock)')} />
                  </Label>
                </div>
              </div>

              {/* l) Ação Final */}
              <div>
                <Label>Ação Final</Label>
                <Textarea
                  value={ncSelecionada.acaoFinal || ''}
                  onChange={(e) => setNcSelecionada({ ...ncSelecionada, acaoFinal: e.target.value })}
                  rows={2}
                  placeholder="Descreva a ação final..."
                />
              </div>

              {/* m) Botão Validar Ação Final */}
              <div className="flex items-center gap-4">
                {ncSelecionada.acaoFinalValidada ? (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Validada por {ncSelecionada.acaoFinalValidadaPor} em {ncSelecionada.acaoFinalValidadaEm}
                    </span>
                  </div>
                ) : (
                  <Button onClick={validarAcaoFinal} variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Validar Ação Final (RT/Qualidade)
                  </Button>
                )}
              </div>

              {/* n) NC Solucionada + Data de Encerramento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>NC Solucionada? <span className="text-xs text-muted-foreground">(preenchido pelo RT)</span></Label>
                  <Select
                    value={ncSelecionada.ncSolucionada || ''}
                    onValueChange={(val) => setNcSelecionada({ ...ncSelecionada, ncSolucionada: val })}
                  >
                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sim">Sim</SelectItem>
                      <SelectItem value="Não">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Data de Encerramento <span className="text-xs text-muted-foreground">(preenchido pelo RT)</span></Label>
                  <Input
                    type="date"
                    value={ncSelecionada.dataEncerramento || ''}
                    onChange={(e) => setNcSelecionada({ ...ncSelecionada, dataEncerramento: e.target.value })}
                  />
                </div>
              </div>

              {/* o) Tabela de Liberação de Produtos */}
              {mostrarTabelaLiberacao && (
                <Card className="border-2 border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Liberação de Produtos</CardTitle>
                    <Button size="sm" onClick={adicionarProdutoLiberacao}>
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar Produto
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Referência</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Fabricante</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Linha</TableHead>
                            <TableHead>Apresentação</TableHead>
                            <TableHead>Nº Série/Lote</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Liberado RT</TableHead>
                            <TableHead>Data Liberação</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(ncSelecionada.produtosLiberacao || []).map((prod, idx) => (
                            <TableRow key={prod.id}>
                              <TableCell className="font-mono text-xs">{prod.codigo}</TableCell>
                              <TableCell>
                                <Input className="min-w-[100px]" value={prod.referencia} onChange={(e) => atualizarProdutoLiberacao(idx, 'referencia', e.target.value)} />
                              </TableCell>
                              <TableCell>
                                <Input className="min-w-[120px]" value={prod.nome} onChange={(e) => atualizarProdutoLiberacao(idx, 'nome', e.target.value)} />
                              </TableCell>
                              <TableCell>
                                <Input className="min-w-[100px]" value={prod.modelo} onChange={(e) => atualizarProdutoLiberacao(idx, 'modelo', e.target.value)} />
                              </TableCell>
                              <TableCell className="text-sm">{prod.fabricante || '-'}</TableCell>
                              <TableCell className="text-sm">{prod.marca || '-'}</TableCell>
                              <TableCell className="text-sm">{prod.linhaProduto || '-'}</TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  {(['primaria', 'secundaria', 'terciaria'] as const).map(ap => (
                                    <div key={ap} className="flex items-center gap-1">
                                      <Checkbox
                                        checked={prod.apresentacao.includes(ap)}
                                        onCheckedChange={() => toggleApresentacao(idx, ap)}
                                      />
                                      <span className="text-xs capitalize">{ap === 'terciaria' ? 'Embarque' : ap}</span>
                                    </div>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Input className="min-w-[120px]" value={prod.numeroSerieLote} onChange={(e) => atualizarProdutoLiberacao(idx, 'numeroSerieLote', e.target.value)} placeholder="Selecione/digite" />
                              </TableCell>
                              <TableCell>
                                <Input className="min-w-[100px]" value={prod.status} onChange={(e) => atualizarProdutoLiberacao(idx, 'status', e.target.value)} />
                              </TableCell>
                              <TableCell>
                                {prod.liberadoRT ? (
                                  <Badge className="bg-green-500 text-white">Liberado</Badge>
                                ) : (
                                  <Button size="sm" variant="outline" onClick={() => liberarProdutoRT(idx)} className="text-xs">
                                    Liberar RT
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell className="text-sm">{prod.dataLiberacao || '-'}</TableCell>
                            </TableRow>
                          ))}
                          {(ncSelecionada.produtosLiberacao || []).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={12} className="text-center text-muted-foreground py-4">
                                Nenhum produto adicionado. Clique em "Adicionar Produto" acima.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* p) Seção CAPA */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">CAPA - Ação Corretiva e Preventiva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Ação Preventiva</Label>
                    <Textarea
                      value={ncSelecionada.capa?.acaoPreventiva || ''}
                      onChange={(e) => updateCapa('acaoPreventiva', e.target.value)}
                      rows={2}
                      placeholder="Descreva a ação preventiva..."
                    />
                  </div>

                  <div>
                    <Label>Ação Corretiva</Label>
                    <Textarea
                      value={ncSelecionada.capa?.acaoCorretiva || ''}
                      onChange={(e) => updateCapa('acaoCorretiva', e.target.value)}
                      rows={2}
                      placeholder="Descreva a ação corretiva..."
                    />
                  </div>

                  {ncSelecionada.capa?.gerenciamentoTarefas && (
                    <div>
                      <Label>Gerenciamento da Execução de Tarefas</Label>
                      <Textarea value={ncSelecionada.capa.gerenciamentoTarefas} disabled className="min-h-[80px]" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Prazo Final</Label>
                      <Input
                        type="date"
                        value={ncSelecionada.capa?.prazoFinal ? format(ncSelecionada.capa.prazoFinal, 'yyyy-MM-dd') : ''}
                        onChange={(e) => updateCapa('prazoFinal', new Date(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>Status CAPA</Label>
                      <div className="mt-2">
                        {getStatusCAPABadge(ncSelecionada.capa?.status || 'Pendente')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Responsável CAPA</Label>
                    <Select
                      value={ncSelecionada.capa?.responsavel || ''}
                      onValueChange={(value) => updateCapa('responsavel', value)}
                    >
                      <SelectTrigger><SelectValue placeholder="Selecione o responsável" /></SelectTrigger>
                      <SelectContent>
                        {responsaveisNCRT.map((resp) => (
                          <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* CAPA DT — Segurança/Meio Ambiente */}
                  {mostrarCAPADT && (
                    <Card className="border border-purple-200 bg-purple-50/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">CAPA — DT (Equipamentos do Cliente)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <Label className="text-xs">Nome do Cliente</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.clienteNome || ''} onChange={(e) => updateCapa('capaDT', { ...ncSelecionada.capa?.capaDT, clienteNome: e.target.value })} />
                          </div>
                          <div>
                            <Label className="text-xs">Tipo de Cliente</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.tipoCliente || ''} disabled className="bg-muted" />
                          </div>
                          <div>
                            <Label className="text-xs">Razão Social</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.razaoSocial || ''} disabled className="bg-muted" />
                          </div>
                          <div>
                            <Label className="text-xs">Nome Fantasia</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.nomeFantasia || ''} disabled className="bg-muted" />
                          </div>
                          <div>
                            <Label className="text-xs">CNPJ/CPF</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.cnpjCpf || ''} disabled className="bg-muted" />
                          </div>
                          <div>
                            <Label className="text-xs">CIN/RG</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.cinRg || ''} disabled className="bg-muted" />
                          </div>
                          <div>
                            <Label className="text-xs">Nome do Mantenedor</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.nomeMantenedor || ''} disabled className="bg-muted" />
                          </div>
                          <div>
                            <Label className="text-xs">CNPJ do Mantenedor</Label>
                            <Input value={ncSelecionada.capa?.capaDT?.cnpjMantenedor || ''} disabled className="bg-muted" />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Equipamentos</Label>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nº Série</TableHead>
                                <TableHead>Modelo</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Data Ação Preventiva</TableHead>
                                <TableHead>Data Ação Corretiva</TableHead>
                                <TableHead>Descrição Corretiva</TableHead>
                                <TableHead>Prazo Final</TableHead>
                                <TableHead>Solucionado</TableHead>
                                <TableHead>Responsável</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {equipamentosMockDTRT.map((eq) => (
                                <TableRow key={eq.equipamentoId}>
                                  <TableCell className="font-mono text-xs">{eq.numeroSerie}</TableCell>
                                  <TableCell>{eq.modelo}</TableCell>
                                  <TableCell>{eq.marca}</TableCell>
                                  <TableCell><Input type="date" className="min-w-[130px]" /></TableCell>
                                  <TableCell><Input type="date" className="min-w-[130px]" /></TableCell>
                                  <TableCell><Input className="min-w-[150px]" placeholder="Descrição..." /></TableCell>
                                  <TableCell><Input type="date" className="min-w-[130px]" /></TableCell>
                                  <TableCell>
                                    <Select>
                                      <SelectTrigger className="min-w-[80px]"><SelectValue placeholder="-" /></SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Sim">Sim</SelectItem>
                                        <SelectItem value="Não">Não</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell><Input className="min-w-[120px]" placeholder="Responsável..." /></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* Botões de ação */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setModalAberto(false); setModoNovo(false); setNcSelecionada(null); }}>
                  Cancelar
                </Button>
                <Button onClick={salvarNC}>
                  {modoNovo ? 'Criar Não Conformidade' : 'Salvar Alterações'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
