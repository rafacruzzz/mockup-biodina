import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Package,
  Calendar,
  ArrowRight
} from "lucide-react";
import { 
  PedidoAdministrativo, 
  ItemPedidoAdministrativo 
} from "@/types/estoque";
import { toast } from "@/hooks/use-toast";

interface ValidacaoSeparacaoModalProps {
  pedido: PedidoAdministrativo;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ValidacaoItemState {
  status_validacao: 'conforme' | 'divergente' | 'pendente';
  observacoes: string;
}

const ValidacaoSeparacaoModal = ({ pedido, isOpen, onOpenChange }: ValidacaoSeparacaoModalProps) => {
  const [observacoesValidacao, setObservacoesValidacao] = useState("");
  const [showRejeicaoModal, setShowRejeicaoModal] = useState(false);
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [tipoRejeicao, setTipoRejeicao] = useState<'separacao' | 'comercial'>('separacao');

  const [itensValidacao, setItensValidacao] = useState<{[key: number]: ValidacaoItemState}>(() => {
    const initial: {[key: number]: ValidacaoItemState} = {};
    pedido.itens.forEach(item => {
      initial[item.id] = {
        status_validacao: item.status_validacao || 'pendente',
        observacoes: item.observacoes_validacao || ""
      };
    });
    return initial;
  });

  const handleAtualizarStatusValidacao = (itemId: number, status: 'conforme' | 'divergente' | 'pendente') => {
    setItensValidacao(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], status_validacao: status }
    }));
  };

  const handleAtualizarObservacoes = (itemId: number, obs: string) => {
    setItensValidacao(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], observacoes: obs }
    }));
  };

  const getStatusValidacaoBadge = (status: 'conforme' | 'divergente' | 'pendente') => {
    const config = {
      conforme: { label: "Conforme", className: "bg-green-100 text-green-800 border-green-300" },
      divergente: { label: "Divergente", className: "bg-red-100 text-red-800 border-red-300" },
      pendente: { label: "Pendente", className: "bg-gray-100 text-gray-800 border-gray-300" }
    };
    return (
      <Badge variant="outline" className={config[status].className}>
        {config[status].label}
      </Badge>
    );
  };

  const handleValidarLiberar = () => {
    // Verificar se há itens divergentes
    const itensDivergentes = Object.values(itensValidacao).filter(i => i.status_validacao === 'divergente');
    
    if (itensDivergentes.length > 0) {
      toast({
        title: "Atenção",
        description: "Existem itens divergentes. Resolva as divergências antes de liberar.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se todos foram validados
    const itensPendentes = Object.values(itensValidacao).filter(i => i.status_validacao === 'pendente');
    if (itensPendentes.length > 0) {
      toast({
        title: "Validação Incompleta",
        description: "Valide todos os itens antes de liberar para faturamento.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pedido Liberado",
      description: `Pedido ${pedido.numero_pedido} foi validado e liberado para faturamento.`
    });
    onOpenChange(false);
  };

  const handleRejeitar = () => {
    if (!motivoRejeicao.trim()) {
      toast({
        title: "Motivo Obrigatório",
        description: "Informe o motivo da rejeição.",
        variant: "destructive"
      });
      return;
    }

    const destino = tipoRejeicao === 'separacao' ? 'Separação' : 'Comercial';
    toast({
      title: "Validação Rejeitada",
      description: `Pedido ${pedido.numero_pedido} foi devolvido para ${destino}.`
    });
    setShowRejeicaoModal(false);
    onOpenChange(false);
  };

  // Contadores
  const contadores = {
    conformes: Object.values(itensValidacao).filter(i => i.status_validacao === 'conforme').length,
    divergentes: Object.values(itensValidacao).filter(i => i.status_validacao === 'divergente').length,
    pendentes: Object.values(itensValidacao).filter(i => i.status_validacao === 'pendente').length
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-biodina-blue flex items-center gap-3">
              <ShieldCheck className="h-6 w-6" />
              Validação Pós-Separação - Pedido {pedido.numero_pedido}
            </DialogTitle>
          </DialogHeader>

          {/* Informações do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informações do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              <div>
                <Label>Código do Pedido</Label>
                <Input value={pedido.numero_pedido} disabled className="bg-muted" />
              </div>
              <div>
                <Label>Cliente</Label>
                <Input value={pedido.cliente} disabled className="bg-muted" />
              </div>
              <div>
                <Label>Vendedor</Label>
                <Input value={pedido.vendedor} disabled className="bg-muted" />
              </div>
              <div>
                <Label>Status</Label>
                <Badge className="bg-orange-100 text-orange-800 mt-2">
                  Aguardando Validação
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Resumo da Validação */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conformes</p>
                    <p className="text-2xl font-bold text-green-600">{contadores.conformes}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Divergentes</p>
                    <p className="text-2xl font-bold text-red-600">{contadores.divergentes}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-gray-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                    <p className="text-2xl font-bold text-gray-600">{contadores.pendentes}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Comparação */}
          <Card>
            <CardHeader>
              <CardTitle>Comparação: Autorizado vs Separado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-center bg-blue-50">
                        Val. Mín. (Comercial)
                      </TableHead>
                      <TableHead className="text-center bg-blue-50">
                        Qtd. Autorizada (Adm)
                      </TableHead>
                      <TableHead className="text-center bg-blue-50">
                        Unid. Origem (Adm)
                      </TableHead>
                      <TableHead className="text-center bg-green-50">
                        Qtd. Separada (Exp)
                      </TableHead>
                      <TableHead className="text-center bg-green-50">
                        Val. Separada (Exp)
                      </TableHead>
                      <TableHead className="text-center bg-green-50">
                        Lote (Exp)
                      </TableHead>
                      <TableHead>Status Validação</TableHead>
                      <TableHead>Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedido.itens.map((item) => {
                      const estado = itensValidacao[item.id];
                      
                      // Simular dados de separação
                      const qtdSeparada = item.quantidade_separada || item.quantidade_autorizada || item.quantidade_pedido;
                      const validadeSeparada = item.validade_separada || "2025-08-15";
                      const loteSeparado = item.lote_separado || "LOT-SEP-001";

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.codigo_produto}</TableCell>
                          <TableCell>
                            <div className="max-w-[150px]">
                              <p className="truncate">{item.descricao_produto}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center bg-blue-50/50">
                            {item.validade_minima_exigida ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(item.validade_minima_exigida).toLocaleDateString('pt-BR')}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center bg-blue-50/50 font-medium">
                            {item.quantidade_autorizada || item.quantidade_pedido}
                          </TableCell>
                          <TableCell className="text-center bg-blue-50/50">
                            {item.unidade_origem || "Matriz SP"}
                          </TableCell>
                          <TableCell className="text-center bg-green-50/50">
                            <Badge variant="outline" className={
                              qtdSeparada === (item.quantidade_autorizada || item.quantidade_pedido)
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }>
                              {qtdSeparada}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center bg-green-50/50">
                            {new Date(validadeSeparada).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-center bg-green-50/50">
                            <Badge variant="outline">{loteSeparado}</Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={estado?.status_validacao || 'pendente'}
                              onValueChange={(value: 'conforme' | 'divergente' | 'pendente') => 
                                handleAtualizarStatusValidacao(item.id, value)
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="conforme">
                                  <span className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                    Conforme
                                  </span>
                                </SelectItem>
                                <SelectItem value="divergente">
                                  <span className="flex items-center gap-1">
                                    <XCircle className="h-3 w-3 text-red-600" />
                                    Divergente
                                  </span>
                                </SelectItem>
                                <SelectItem value="pendente">
                                  <span className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3 text-gray-600" />
                                    Pendente
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              value={estado?.observacoes || ""}
                              onChange={(e) => handleAtualizarObservacoes(item.id, e.target.value)}
                              placeholder="Obs..."
                              className="w-[120px]"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Observações da Validação */}
          <Card>
            <CardHeader>
              <CardTitle>Observações da Validação</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={observacoesValidacao}
                onChange={(e) => setObservacoesValidacao(e.target.value)}
                placeholder="Adicione observações gerais sobre esta validação..."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Footer com ações */}
          <DialogFooter className="flex gap-2 mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setShowRejeicaoModal(true)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Rejeitar Validação
            </Button>
            <Button 
              onClick={handleValidarLiberar}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Validar e Liberar para Faturamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Rejeição */}
      <Dialog open={showRejeicaoModal} onOpenChange={setShowRejeicaoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Rejeitar Validação
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Devolver para:</Label>
              <Select value={tipoRejeicao} onValueChange={(v: 'separacao' | 'comercial') => setTipoRejeicao(v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="separacao">
                    <span className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Voltar para Separação (nova tentativa)
                    </span>
                  </SelectItem>
                  <SelectItem value="comercial">
                    <span className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Devolver ao Comercial (renegociação)
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Motivo da Rejeição</Label>
              <Textarea
                value={motivoRejeicao}
                onChange={(e) => setMotivoRejeicao(e.target.value)}
                placeholder="Informe o motivo..."
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejeicaoModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRejeitar}>
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ValidacaoSeparacaoModal;
