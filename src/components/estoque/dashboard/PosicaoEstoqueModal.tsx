
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PosicaoEstoque, StatusQualidade } from "@/types/estoque";
import { Package, MapPin, Calendar, AlertTriangle, TrendingUp, FileText, X } from "lucide-react";

interface PosicaoEstoqueModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  produto: PosicaoEstoque | null;
  todosProdutos: PosicaoEstoque[];
}

const PosicaoEstoqueModal = ({ isOpen, onOpenChange, produto, todosProdutos }: PosicaoEstoqueModalProps) => {
  if (!produto) return null;

  // Buscar todas as posições do mesmo produto
  const posicoesLotes = todosProdutos.filter(p => p.produto_codigo === produto.produto_codigo);

  // Mock data para histórico e pedidos vinculados
  const historicoMovimentacoes = [
    { id: 1, data: "2024-01-15", tipo: "Entrada", quantidade: 100, documento: "NF-12345", usuario: "admin", observacoes: "Compra direta" },
    { id: 2, data: "2024-01-20", tipo: "Saída", quantidade: -25, documento: "PED-5678", usuario: "separador1", observacoes: "Pedido cliente ABC" },
    { id: 3, data: "2024-01-25", tipo: "Transferência", quantidade: -50, documento: "TRANS-001", usuario: "admin", observacoes: "Para filial RJ" }
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
      [{ tipo: 'qualidade' as const, mensagem: 'Produto em quarentena - aguardando liberação', prioridade: 'alta' as const }] : [])
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
          {/* Cards Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <CardTitle className="text-sm">Valor Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="geral">Geral</TabsTrigger>
              <TabsTrigger value="posicoes">Posições</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posicoes">
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Histórico de Movimentações</CardTitle>
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
                    <div><strong>Origem:</strong> {produto.origem_entrada}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Resumo por Lote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {posicoesLotes.map((pos, index) => (
                        <div key={index} className="flex justify-between text-sm border-b pb-1">
                          <span>{pos.lote}</span>
                          <span>R$ {pos.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                      ))}
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

export default PosicaoEstoqueModal;
