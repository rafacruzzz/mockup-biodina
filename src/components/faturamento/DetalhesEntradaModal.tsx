import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building2, 
  FileText, 
  Calendar, 
  DollarSign, 
  Package, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Truck,
  Hash,
  Ship,
  FileEdit,
  FilePlus,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PedidoEntradaMercadoria } from '@/types/faturamento';
import ConfirmacaoNFModal from '@/components/estoque/ConfirmacaoNFModal';
import NFComplementarModal from './modals/NFComplementarModal';
import CartaCorrecaoModal from './modals/CartaCorrecaoModal';

interface DetalhesEntradaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pedido: PedidoEntradaMercadoria | null;
  onConfirmarEntrada: (pedidoId: string) => void;
  onCancelar: (pedidoId: string) => void;
}

const DetalhesEntradaModal = ({ isOpen, onOpenChange, pedido, onConfirmarEntrada, onCancelar }: DetalhesEntradaModalProps) => {
  const [nfModalOpen, setNfModalOpen] = useState(false);
  const [nfComplementarModalOpen, setNfComplementarModalOpen] = useState(false);
  const [cartaCorrecaoModalOpen, setCartaCorrecaoModalOpen] = useState(false);
  const { toast } = useToast();

  if (!pedido) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entrada Confirmada':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'NF Recebida':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'Aguardando Entrada':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const getStatusImportacaoColor = (status: string) => {
    switch (status) {
      case 'Canal Verde':
      case 'Desembaraçado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Aguardando DI':
      case 'Canal Amarelo':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Canal Vermelho':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'Canal Cinza':
        return 'bg-gray-400 text-gray-900 dark:bg-gray-600 dark:text-gray-100';
      case 'DI Registrada':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const handleGerarNF = () => {
    toast({
      title: "NF de Entrada Gerada",
      description: `NF de entrada gerada com sucesso para ${pedido.numeroPedido}`,
    });
    onConfirmarEntrada(pedido.id);
    setNfModalOpen(false);
    onOpenChange(false);
  };

  const handleConfirmarEntrada = () => {
    toast({
      title: "Entrada Confirmada",
      description: `Entrada confirmada para ${pedido.numeroPedido}`,
    });
    onConfirmarEntrada(pedido.id);
    onOpenChange(false);
  };

  const handleCancelar = () => {
    if (confirm('Tem certeza que deseja cancelar este pedido de entrada?')) {
      toast({
        title: "Pedido Cancelado",
        description: `Pedido ${pedido.numeroPedido} cancelado`,
        variant: "destructive"
      });
      onCancelar(pedido.id);
      onOpenChange(false);
    }
  };

  const handleSolicitarNFComplementar = (data: any) => {
    console.log('Solicitação de NF Complementar:', data);
    // Aqui seria a integração com o backend
  };

  const handleSolicitarCartaCorrecao = (data: any) => {
    console.log('Solicitação de Carta de Correção:', data);
    // Aqui seria a integração com o backend
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detalhes da Entrada - {pedido.numeroPedido}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="geral" className="py-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
              {pedido.tipo === 'Importacao' && (
                <TabsTrigger value="importacao">Importação</TabsTrigger>
              )}
              <TabsTrigger value="nf-complementar">NF Complementar</TabsTrigger>
              <TabsTrigger value="carta-correcao">Carta de Correção</TabsTrigger>
            </TabsList>

            {/* Tab: Informações Gerais */}
            <TabsContent value="geral" className="space-y-6 mt-6">
              {/* Status e Informações Principais */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(pedido.status)}>
                        {pedido.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <Badge variant="outline">{pedido.tipo}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Categoria</p>
                      <Badge variant="outline">{pedido.categoria}</Badge>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Dados do Fornecedor */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fornecedor</p>
                        <p className="font-medium">{pedido.fornecedor}</p>
                        <p className="text-sm text-muted-foreground">{pedido.cnpjFornecedor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">NF Fornecedor</p>
                        <p className="font-medium">{pedido.numeroNF || 'N/A'}</p>
                        {pedido.chaveAcesso && (
                          <p className="text-xs text-muted-foreground break-all">
                            {pedido.chaveAcesso}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Data Emissão</p>
                        <p className="font-medium">{formatDate(pedido.dataEmissao)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Data Entrada</p>
                        <p className="font-medium">{formatDate(pedido.dataEntrada)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itens */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Itens da Entrada
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>CFOP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedido.itens.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.codigo}</TableCell>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorTotal)}</TableCell>
                          <TableCell>{item.cfop}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Totais */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(pedido.valorTotal - pedido.valorImpostos)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Impostos</span>
                    <span className="font-medium">{formatCurrency(pedido.valorImpostos)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-lg text-primary">{formatCurrency(pedido.valorTotal)}</span>
                  </div>
                </CardContent>
              </Card>

              {pedido.observacoes && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Observações
                    </h3>
                    <p className="text-sm text-muted-foreground">{pedido.observacoes}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Tab: Importação */}
            {pedido.tipo === 'Importacao' && (
              <TabsContent value="importacao" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Ship className="h-5 w-5" />
                      Dados de Importação
                    </h3>

                    {pedido.statusImportacao && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Status da Importação</p>
                        <Badge className={getStatusImportacaoColor(pedido.statusImportacao)}>
                          {pedido.statusImportacao}
                        </Badge>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {pedido.numeroDI && (
                        <div className="flex items-start gap-3">
                          <Hash className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Número da DI</p>
                            <p className="font-medium">{pedido.numeroDI}</p>
                          </div>
                        </div>
                      )}

                      {pedido.dataRegistroDI && (
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Data Registro DI</p>
                            <p className="font-medium">{formatDate(pedido.dataRegistroDI)}</p>
                          </div>
                        </div>
                      )}

                      {pedido.canalParametrizacao && (
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Canal de Parametrização</p>
                            <p className="font-medium">{pedido.canalParametrizacao}</p>
                          </div>
                        </div>
                      )}

                      {pedido.dataDesembaraco && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Data Desembaraço</p>
                            <p className="font-medium">{formatDate(pedido.dataDesembaraco)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {!pedido.numeroDI && pedido.statusImportacao === 'Aguardando DI' && (
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Atenção:</strong> Aguardando registro da Declaração de Importação (DI).
                        </p>
                      </div>
                    )}

                    {pedido.statusImportacao === 'Desembaraçado' && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>Sucesso:</strong> Mercadoria desembaraçada. Pronta para entrada no estoque.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Tab: NF Complementar */}
            <TabsContent value="nf-complementar" className="space-y-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FilePlus className="h-5 w-5" />
                      NF Complementar
                    </h3>
                    <Button onClick={() => setNfComplementarModalOpen(true)}>
                      <FilePlus className="h-4 w-4 mr-2" />
                      Solicitar NF Complementar
                    </Button>
                  </div>

                  {(!pedido.nfComplementar || pedido.nfComplementar.length === 0) ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FilePlus className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>Nenhuma NF Complementar emitida</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pedido.nfComplementar.map((nf) => (
                        <Card key={nf.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">NF: {nf.numeroNF}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(nf.dataEmissao)}</p>
                                <p className="text-sm text-muted-foreground">Motivo: {nf.motivo}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-lg">{formatCurrency(nf.valorComplementar)}</p>
                                <Badge>{nf.status}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Carta de Correção */}
            <TabsContent value="carta-correcao" className="space-y-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileEdit className="h-5 w-5" />
                      Carta de Correção
                    </h3>
                    <Button onClick={() => setCartaCorrecaoModalOpen(true)}>
                      <FileEdit className="h-4 w-4 mr-2" />
                      Solicitar Carta de Correção
                    </Button>
                  </div>

                  {(!pedido.cartaCorrecao || pedido.cartaCorrecao.length === 0) ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileEdit className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>Nenhuma Carta de Correção emitida</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pedido.cartaCorrecao.map((cc) => (
                        <Card key={cc.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">CC-e: {cc.numeroCC}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(cc.dataEmissao)}</p>
                                {cc.protocolo && (
                                  <p className="text-xs text-muted-foreground">Protocolo: {cc.protocolo}</p>
                                )}
                              </div>
                              <Badge>{cc.status}</Badge>
                            </div>
                            <p className="text-sm mt-2"><strong>Correção:</strong> {cc.correcao}</p>
                            <p className="text-sm text-muted-foreground mt-1"><strong>Justificativa:</strong> {cc.justificativa}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            
            {pedido.chaveAcesso && (
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Baixar XML
              </Button>
            )}

            {pedido.status === 'Aguardando Entrada' && (
              <Button onClick={() => setNfModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Gerar NF de Entrada
              </Button>
            )}

            {pedido.status === 'NF Recebida' && (
              <Button onClick={handleConfirmarEntrada} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar Entrada
              </Button>
            )}

            {pedido.status !== 'Cancelado' && pedido.status !== 'Entrada Confirmada' && (
              <Button variant="destructive" onClick={handleCancelar}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmacaoNFModal
        isOpen={nfModalOpen}
        onOpenChange={setNfModalOpen}
        onConfirm={handleGerarNF}
      />

      <NFComplementarModal
        isOpen={nfComplementarModalOpen}
        onClose={() => setNfComplementarModalOpen(false)}
        pedidoId={pedido.id}
        numeroNF={pedido.numeroNF || ''}
        onSolicitar={handleSolicitarNFComplementar}
      />

      <CartaCorrecaoModal
        isOpen={cartaCorrecaoModalOpen}
        onClose={() => setCartaCorrecaoModalOpen(false)}
        pedidoId={pedido.id}
        numeroNF={pedido.numeroNF || ''}
        chaveAcesso={pedido.chaveAcesso || ''}
        onSolicitar={handleSolicitarCartaCorrecao}
      />
    </>
  );
};

export default DetalhesEntradaModal;
