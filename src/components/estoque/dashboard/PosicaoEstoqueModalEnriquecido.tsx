import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PosicaoEstoque, StatusQualidade, StatusEmprestimo } from "@/types/estoque";
import { mockEmprestimos, mockLogsAuditoria, mockKitsDesmembrados } from "@/data/estoqueModules";
import { Package, MapPin, Calendar, AlertTriangle, TrendingUp, FileText, X, History, Shield, Package2, HandCoins, Clock, User } from "lucide-react";
import { useState } from "react";

interface PosicaoEstoqueModalEnriquecidoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  produto: PosicaoEstoque | null;
  todosProdutos: PosicaoEstoque[];
}

const PosicaoEstoqueModalEnriquecido = ({ isOpen, onOpenChange, produto, todosProdutos }: PosicaoEstoqueModalEnriquecidoProps) => {
  const [novoEmprestimo, setNovoEmprestimo] = useState({
    quantidade: 0,
    cliente_fornecedor: '',
    motivo: '',
    tipo_vinculo: 'cliente' as 'cliente' | 'fornecedor'
  });

  const [ajusteManual, setAjusteManual] = useState({
    campo: '',
    valor_novo: '',
    justificativa: ''
  });

  if (!produto) return null;

  // Buscar todas as posições do mesmo produto
  const posicoesLotes = todosProdutos.filter(p => p.produto_codigo === produto.produto_codigo);

  // Filtrar dados relacionados ao produto
  const emprestimosRelacionados = mockEmprestimos.filter(e => e.produto_codigo === produto.produto_codigo);
  const logsAuditoria = mockLogsAuditoria.filter(l => l.produto_codigo === produto.produto_codigo);
  const kitsDesmembrados = mockKitsDesmembrados.filter(k => k.kit_codigo === produto.produto_codigo);

  // Cálculos para os cards
  const totalEmprestado = emprestimosRelacionados
    .filter(e => e.status !== StatusEmprestimo.QUITADO)
    .reduce((acc, e) => acc + e.quantidade, 0);

  const valorEmprestado = totalEmprestado * produto.cmc_unitario;

  const ultimaAuditoria = logsAuditoria.length > 0 ? 
    new Date(Math.max(...logsAuditoria.map(l => new Date(l.data_alteracao).getTime()))) : null;

  const kitsDisponiveis = kitsDesmembrados.length;

  // Mock data para histórico e pedidos vinculados
  const historicoMovimentacoes = [
    { id: 1, data: "2024-01-15", tipo: "Entrada", quantidade: 100, documento: "NF-12345", usuario: "admin", observacoes: "Compra direta" },
    { id: 2, data: "2024-01-20", tipo: "Saída", quantidade: -25, documento: "PED-5678", usuario: "separador1", observacoes: "Pedido cliente ABC" },
    { id: 3, data: "2024-01-25", tipo: "Empréstimo", quantidade: -2, documento: "EMP-001", usuario: "maria.silva", observacoes: "Empréstimo para Hospital São Francisco" }
  ];

  const pedidosVinculados = [
    { id: 1, numero_pedido: "85696", cliente: "Bronstein Filial", quantidade_solicitada: 10, data_entrega: "2025-05-20", status: "Separado" },
    { id: 2, numero_pedido: "85700", cliente: "Hospital Salvador", quantidade_solicitada: 5, data_entrega: "2025-05-25", status: "Pendente" }
  ];

  const alertas = [
    ...(produto.dias_para_vencimento && produto.dias_para_vencimento <= 90 ? 
      [{ tipo: 'vencimento' as const, mensagem: `Produto vence em ${produto.dias_para_vencimento} dias`, prioridade: 'alta' as const }] : []),
    ...(produto.quantidade_disponivel < 50 ? 
      [{ tipo: 'estoque_baixo' as const, mensagem: 'Estoque abaixo do nível mínimo', prioridade: 'media' as const }] : []),
    ...(produto.status_qualidade === StatusQualidade.QUARENTENA ? 
      [{ tipo: 'qualidade' as const, mensagem: 'Produto em quarentena - aguardando liberação', prioridade: 'alta' as const }] : []),
    ...(totalEmprestado > 0 ? 
      [{ tipo: 'estoque_baixo' as const, mensagem: `${totalEmprestado} unidades em empréstimo`, prioridade: 'media' as const }] : [])
  ];

  const getStatusQualidadeBadge = (status: StatusQualidade) => {
    const colors = {
      [StatusQualidade.APROVADO]: "bg-green-100 text-green-800",
      [StatusQualidade.LIBERADO]: "bg-blue-100 text-blue-800", 
      [StatusQualidade.QUARENTENA]: "bg-yellow-100 text-yellow-800",
      [StatusQualidade.REJEITADO]: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

  const getStatusEmprestimoBadge = (status: StatusEmprestimo) => {
    const colors = {
      [StatusEmprestimo.EM_DEBITO]: "bg-orange-100 text-orange-800",
      [StatusEmprestimo.QUITADO]: "bg-green-100 text-green-800",
      [StatusEmprestimo.PARCIAL]: "bg-yellow-100 text-yellow-800",
      [StatusEmprestimo.VENCIDO]: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

  const getAlertaBadge = (prioridade: string) => {
    const colors = {
      'alta': "bg-red-100 text-red-800",
      'media': "bg-yellow-100 text-yellow-800",
      'baixa': "bg-blue-100 text-blue-800"
    };
    return colors[prioridade as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{produto.produto_descricao}</DialogTitle>
              <p className="text-sm text-gray-500">Código: {produto.produto_codigo}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cards Resumo Expandido */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Total de Lotes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posicoesLotes.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Qtde Disponível</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {posicoesLotes.reduce((acc, p) => acc + p.quantidade_disponivel, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Qtde Reservada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {posicoesLotes.reduce((acc, p) => acc + p.quantidade_reservada, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <HandCoins className="h-4 w-4" />
                  Em Empréstimo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{totalEmprestado}</div>
                <div className="text-xs text-gray-500">R$ {valorEmprestado.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Última Auditoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {ultimaAuditoria ? ultimaAuditoria.toLocaleDateString('pt-BR') : 'Nunca'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Valor Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-blue-600">
                  R$ {posicoesLotes.reduce((acc, p) => acc + p.cmc_total, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas */}
          {alertas.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {alertas.map((alerta, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge className={getAlertaBadge(alerta.prioridade)}>
                        {alerta.prioridade.toUpperCase()}
                      </Badge>
                      <span className="text-sm">{alerta.mensagem}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs com informações detalhadas */}
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="geral">Geral</TabsTrigger>
              <TabsTrigger value="posicoes">Posições</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              <TabsTrigger value="controle">Controle</TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Informações do Produto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>Código:</strong> {produto.produto_codigo}</div>
                    <div><strong>Descrição:</strong> {produto.produto_descricao}</div>
                    <div><strong>Fornecedor:</strong> {produto.fornecedor}</div>
                    <div><strong>Tipo de Estoque:</strong> 
                      <Badge className="ml-2">{produto.tipo_estoque}</Badge>
                    </div>
                    <div><strong>Status de Qualidade:</strong> 
                      <Badge className={`ml-2 ${getStatusQualidadeBadge(produto.status_qualidade)}`}>
                        {produto.status_qualidade}
                      </Badge>
                    </div>
                    <div><strong>Origem:</strong> {produto.origem_entrada}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Localização Atual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <div>
                        <div><strong>CNPJ:</strong> {produto.cnpj}</div>
                        <div><strong>Estado:</strong> {produto.cnpj_estado}</div>
                        <div><strong>Depósito:</strong> {produto.deposito}</div>
                        <div><strong>Localização:</strong> {produto.localizacao_fisica}</div>
                        <div><strong>Série:</strong> {produto.numero_serie || 'Não se aplica'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posicoes">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Todas as Posições por CNPJ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>CNPJ</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Lote</TableHead>
                          <TableHead>Série</TableHead>
                          <TableHead>Disponível</TableHead>
                          <TableHead>Reservada</TableHead>
                          <TableHead>Validade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Localização</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posicoesLotes.map((posicao) => (
                          <TableRow key={posicao.id}>
                            <TableCell className="text-sm">{posicao.cnpj}</TableCell>
                            <TableCell>{posicao.cnpj_estado}</TableCell>
                            <TableCell className="font-mono">{posicao.lote}</TableCell>
                            <TableCell className="font-mono text-xs">{posicao.numero_serie || '-'}</TableCell>
                            <TableCell className="font-semibold">{posicao.quantidade_disponivel}</TableCell>
                            <TableCell className="text-orange-600">{posicao.quantidade_reservada}</TableCell>
                            <TableCell>
                              {posicao.data_validade ? 
                                new Date(posicao.data_validade).toLocaleDateString('pt-BR') : 
                                'Sem validade'
                              }
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusQualidadeBadge(posicao.status_qualidade)}>
                                {posicao.status_qualidade}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs">{posicao.localizacao_fisica}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Nova seção de Empréstimos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <HandCoins className="h-4 w-4" />
                      Status de Empréstimos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {emprestimosRelacionados.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cliente/Fornecedor</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Data Empréstimo</TableHead>
                            <TableHead>Data Devolução</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Responsável</TableHead>
                            <TableHead>Motivo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {emprestimosRelacionados.map((emprestimo) => (
                            <TableRow key={emprestimo.id}>
                              <TableCell>{emprestimo.cliente_fornecedor}</TableCell>
                              <TableCell>
                                <Badge variant={emprestimo.tipo_vinculo === 'cliente' ? 'default' : 'secondary'}>
                                  {emprestimo.tipo_vinculo}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold">{emprestimo.quantidade}</TableCell>
                              <TableCell>{new Date(emprestimo.data_emprestimo).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>
                                {emprestimo.data_devolucao ? 
                                  new Date(emprestimo.data_devolucao).toLocaleDateString('pt-BR') : 
                                  '-'
                                }
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusEmprestimoBadge(emprestimo.status as StatusEmprestimo)}>
                                  {emprestimo.status.replace('_', ' ')}
                                </Badge>
                              </TableCell>
                              <TableCell>{emprestimo.responsavel}</TableCell>
                              <TableCell className="text-xs max-w-48 truncate" title={emprestimo.motivo}>
                                {emprestimo.motivo}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-gray-500">Nenhum empréstimo registrado para este produto.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="historico">
              <div className="space-y-4">
                {/* Movimentações Físicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Movimentações Físicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Documento</TableHead>
                          <TableHead>Usuário</TableHead>
                          <TableHead>Observações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historicoMovimentacoes.map((mov) => (
                          <TableRow key={mov.id}>
                            <TableCell>{new Date(mov.data).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <Badge variant={mov.tipo === 'Entrada' ? 'default' : 'destructive'}>
                                {mov.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell className={mov.quantidade > 0 ? 'text-green-600' : 'text-red-600'}>
                              {mov.quantidade > 0 ? '+' : ''}{mov.quantidade}
                            </TableCell>
                            <TableCell className="font-mono">{mov.documento}</TableCell>
                            <TableCell>{mov.usuario}</TableCell>
                            <TableCell className="text-sm text-gray-600">{mov.observacoes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Logs de Auditoria */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Logs de Auditoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {logsAuditoria.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data/Hora</TableHead>
                            <TableHead>Campo</TableHead>
                            <TableHead>Valor Anterior</TableHead>
                            <TableHead>Valor Novo</TableHead>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Justificativa</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {logsAuditoria.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell>{new Date(log.data_alteracao).toLocaleString('pt-BR')}</TableCell>
                              <TableCell className="font-semibold">{log.campo_alterado}</TableCell>
                              <TableCell className="text-red-600">{log.valor_anterior}</TableCell>
                              <TableCell className="text-green-600">{log.valor_novo}</TableCell>
                              <TableCell>{log.usuario}</TableCell>
                              <TableCell>
                                <Badge variant={log.tipo_operacao === 'manual' ? 'destructive' : 'default'}>
                                  {log.tipo_operacao}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm max-w-64 truncate" title={log.justificativa}>
                                {log.justificativa}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-gray-500">Nenhum log de auditoria encontrado.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Desmembramento de Kits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Package2 className="h-4 w-4" />
                      Histórico de Desmembramento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {kitsDesmembrados.length > 0 ? (
                      <div className="space-y-4">
                        {kitsDesmembrados.map((kit) => (
                          <div key={kit.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">{kit.kit_descricao}</h4>
                                <p className="text-sm text-gray-500">Código: {kit.kit_codigo}</p>
                              </div>
                              <div className="text-right text-sm">
                                <div>{new Date(kit.data_desmembramento).toLocaleString('pt-BR')}</div>
                                <div className="text-gray-500">por {kit.usuario}</div>
                              </div>
                            </div>
                            <div className="text-sm">
                              <p><strong>Quantidade processada:</strong> {kit.quantidade_kit}</p>
                              <p><strong>Itens resultantes:</strong></p>
                              <ul className="ml-4 mt-1">
                                {kit.itens_resultantes.map((item, index) => (
                                  <li key={index}>• {item.descricao} - {item.quantidade} un. (Lote: {item.lote_gerado})</li>
                                ))}
                              </ul>
                              {kit.observacoes && (
                                <p className="mt-2"><strong>Observações:</strong> {kit.observacoes}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Nenhum desmembramento registrado.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pedidos">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pedidos Vinculados</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pedido</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Data Entrega</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedidosVinculados.map((pedido) => (
                        <TableRow key={pedido.id}>
                          <TableCell className="font-mono">{pedido.numero_pedido}</TableCell>
                          <TableCell>{pedido.cliente}</TableCell>
                          <TableCell>{pedido.quantidade_solicitada}</TableCell>
                          <TableCell>{new Date(pedido.data_entrega).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <Badge variant={pedido.status === 'Separado' ? 'default' : 'secondary'}>
                              {pedido.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financeiro">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Informações Financeiras
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>CMC Unitário:</strong> R$ {produto.cmc_unitario.toFixed(2)}</div>
                    <div><strong>CMC Total:</strong> R$ {produto.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div><strong>Valor Reservado:</strong> R$ {(produto.quantidade_reservada * produto.cmc_unitario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div><strong>Valor Emprestado:</strong> R$ {valorEmprestado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div><strong>Origem:</strong> {produto.origem_entrada}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Resumo por Lote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {posicoesLotes.map((pos, index) => (
                        <div key={index} className="flex justify-between text-sm border-b pb-1">
                          <span>{pos.lote} ({pos.cnpj_estado})</span>
                          <span>R$ {pos.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="controle">
              <div className="space-y-6">
                {/* Gestão de Empréstimos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <HandCoins className="h-4 w-4" />
                      Registrar Novo Empréstimo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Quantidade</Label>
                        <Input 
                          type="number" 
                          value={novoEmprestimo.quantidade}
                          onChange={(e) => setNovoEmprestimo({...novoEmprestimo, quantidade: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label>Tipo de Vínculo</Label>
                        <Select value={novoEmprestimo.tipo_vinculo} onValueChange={(value: 'cliente' | 'fornecedor') => setNovoEmprestimo({...novoEmprestimo, tipo_vinculo: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cliente">Cliente</SelectItem>
                            <SelectItem value="fornecedor">Fornecedor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Cliente/Fornecedor</Label>
                        <Input 
                          value={novoEmprestimo.cliente_fornecedor}
                          onChange={(e) => setNovoEmprestimo({...novoEmprestimo, cliente_fornecedor: e.target.value})}
                          placeholder="Nome do cliente ou fornecedor"
                        />
                      </div>
                      <div>
                        <Label>Motivo</Label>
                        <Input 
                          value={novoEmprestimo.motivo}
                          onChange={(e) => setNovoEmprestimo({...novoEmprestimo, motivo: e.target.value})}
                          placeholder="Motivo do empréstimo"
                        />
                      </div>
                    </div>
                    <Button className="mt-4" onClick={() => console.log('Empréstimo registrado:', novoEmprestimo)}>
                      Registrar Empréstimo
                    </Button>
                  </CardContent>
                </Card>

                {/* Ajustes Manuais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Ajuste Manual (Auditoria Obrigatória)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Campo</Label>
                        <Select value={ajusteManual.campo} onValueChange={(value) => setAjusteManual({...ajusteManual, campo: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o campo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quantidade_disponivel">Quantidade Disponível</SelectItem>
                            <SelectItem value="localizacao_fisica">Localização Física</SelectItem>
                            <SelectItem value="status_qualidade">Status de Qualidade</SelectItem>
                            <SelectItem value="data_validade">Data de Validade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Novo Valor</Label>
                        <Input 
                          value={ajusteManual.valor_novo}
                          onChange={(e) => setAjusteManual({...ajusteManual, valor_novo: e.target.value})}
                          placeholder="Novo valor"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <Label>Justificativa (Obrigatória)</Label>
                        <Textarea 
                          value={ajusteManual.justificativa}
                          onChange={(e) => setAjusteManual({...ajusteManual, justificativa: e.target.value})}
                          placeholder="Justifique a alteração para compliance"
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                    <Button 
                      className="mt-4" 
                      onClick={() => console.log('Ajuste registrado:', ajusteManual)}
                      disabled={!ajusteManual.campo || !ajusteManual.valor_novo || !ajusteManual.justificativa}
                    >
                      Registrar Ajuste
                    </Button>
                  </CardContent>
                </Card>

                {/* Desmembramento de Kit */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Package2 className="h-4 w-4" />
                      Desmembramento de Kit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800">Informações do Kit</h4>
                        <p className="text-sm text-blue-700">
                          Converta este produto em itens unitários. Esta ação removerá o kit do estoque e criará novos itens.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Quantidade de Kits</Label>
                          <Input type="number" placeholder="Qtd de kits a desmembrar" />
                        </div>
                        <div>
                          <Label>Observações</Label>
                          <Input placeholder="Motivo do desmembramento" />
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => console.log('Desmembramento iniciado')}>
                        Iniciar Desmembramento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PosicaoEstoqueModalEnriquecido;
