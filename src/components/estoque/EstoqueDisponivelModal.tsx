
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Package, Calendar, MapPin } from "lucide-react";
import { ItemPedidoSeparacao, EstoqueDisponivel, PedidoSeparacao } from "@/types/estoque";
import { mockEstoquesDisponiveis } from "@/data/estoqueModules";
import TransferenciaEstadoModal from "./TransferenciaEstadoModal";
import { toast } from "@/hooks/use-toast";

interface EstoqueDisponivelModalProps {
  item: ItemPedidoSeparacao;
  pedido: PedidoSeparacao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EstoqueDisponivelModal = ({ item, pedido, isOpen, onOpenChange }: EstoqueDisponivelModalProps) => {
  const [quantidadeSeparar, setQuantidadeSeparar] = useState(0);
  const [numeroSerie, setNumeroSerie] = useState("");
  const [estoquesSelecionados, setEstoquesSelecionados] = useState<{[key: number]: number}>({});
  const [showTransferenciaModal, setShowTransferenciaModal] = useState(false);
  const [estoqueIncompativel, setEstoqueIncompativel] = useState<EstoqueDisponivel | null>(null);

  // Simular estoques disponíveis para o item
  const estoquesDisponiveis: EstoqueDisponivel[] = mockEstoquesDisponiveis.map(estoque => ({
    ...estoque,
    id: estoque.id + item.id * 10 // Gerar IDs únicos
  }));

  // CNPJ emissor fictício para demonstração (normalmente viria do pedido)
  const cnpjEmissor = "12.345.678/0001-90";

  const handleSelecionarEstoque = (estoqueId: number, quantidade: number) => {
    setEstoquesSelecionados(prev => ({
      ...prev,
      [estoqueId]: quantidade
    }));
  };

  const getTotalSelecionado = () => {
    return Object.values(estoquesSelecionados).reduce((sum, qty) => sum + qty, 0);
  };

  const getValidadeAlert = (estoque: EstoqueDisponivel) => {
    if (!estoque.data_validade) return null;
    
    const diasParaVencimento = estoque.dias_para_vencimento || 0;
    if (diasParaVencimento <= 30) {
      return (
        <div className="flex items-center" title={`Vence em ${diasParaVencimento} dias`}>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </div>
      );
    } else if (diasParaVencimento <= 90) {
      return (
        <div className="flex items-center" title={`Vence em ${diasParaVencimento} dias`}>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </div>
      );
    }
    return null;
  };

  const validarCNPJEmissor = () => {
    const estoquesComQuantidade = Object.entries(estoquesSelecionados)
      .filter(([_, quantidade]) => quantidade > 0)
      .map(([id, _]) => estoquesDisponiveis.find(e => e.id === parseInt(id)))
      .filter(Boolean) as EstoqueDisponivel[];

    for (const estoque of estoquesComQuantidade) {
      if (estoque.cnpj !== cnpjEmissor) {
        return estoque;
      }
    }
    return null;
  };

  const handleConfirmarSeparacao = () => {
    const estoqueIncompativel = validarCNPJEmissor();
    
    if (estoqueIncompativel) {
      setEstoqueIncompativel(estoqueIncompativel);
      setShowTransferenciaModal(true);
      return;
    }

    // Validação de quantidade
    if (getTotalSelecionado() === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos uma quantidade para separar.",
        variant: "destructive"
      });
      return;
    }

    // Separação normal
    console.log("Separação confirmada:", {
      item: item.codigo_produto,
      estoquesSelecionados,
      numeroSerie,
      totalSeparado: getTotalSelecionado(),
      cnpjEmissor
    });

    toast({
      title: "Separação Confirmada",
      description: `${getTotalSelecionado()} unidades separadas com sucesso.`,
    });

    onOpenChange(false);
  };

  const handleRedirecionarMovimentacao = () => {
    console.log("Redirecionando para movimentação com dados:", {
      origem: estoqueIncompativel?.cnpj,
      destino: cnpjEmissor,
      produto: item.codigo_produto,
      quantidade: estoquesSelecionados[estoqueIncompativel?.id || 0] || 0
    });

    // Aqui você pode implementar a navegação para o módulo de movimentação
    // com os dados pré-preenchidos
    toast({
      title: "Redirecionamento",
      description: "Redirecionando para o módulo de movimentação...",
    });
    
    onOpenChange(false);
  };

  const getCNPJBadge = (cnpj: string) => {
    const isCompativel = cnpj === cnpjEmissor;
    return (
      <Badge 
        variant="outline" 
        className={isCompativel ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
      >
        {cnpj}
        {!isCompativel && <AlertTriangle className="h-3 w-3 ml-1" />}
      </Badge>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Selecionar Estoque - {item.codigo_produto}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informações do Item */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Produto</p>
                    <p className="font-medium">{item.descricao_produto}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quantidade Solicitada</p>
                    <p className="font-medium">{item.quantidade_solicitada}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Já Separado</p>
                    <p className="font-medium">{item.quantidade_separada}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">CNPJ Emissor</p>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                      {cnpjEmissor}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estoque Disponível */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Estoques Disponíveis</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Depósito</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Disponível</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Qtde a Separar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estoquesDisponiveis.map((estoque) => (
                    <TableRow key={estoque.id}>
                      <TableCell className="font-medium">
                        {getCNPJBadge(estoque.cnpj)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {estoque.cnpj_estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{estoque.deposito}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {estoque.lote}
                          {getValidadeAlert(estoque)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {estoque.data_validade ? new Date(estoque.data_validade).toLocaleDateString('pt-BR') : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>{estoque.localizacao_fisica}</TableCell>
                      <TableCell>{estoque.quantidade_disponivel}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{estoque.tipo_estoque}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={estoque.quantidade_disponivel}
                          value={estoquesSelecionados[estoque.id] || 0}
                          onChange={(e) => handleSelecionarEstoque(estoque.id, parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Resumo da Separação */}
            {getTotalSelecionado() > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total-separado">Total a Separar</Label>
                      <Input
                        id="total-separado"
                        value={getTotalSelecionado()}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="numero-serie">Número de Série (opcional)</Label>
                      <Input
                        id="numero-serie"
                        value={numeroSerie}
                        onChange={(e) => setNumeroSerie(e.target.value)}
                        placeholder="Digite o número de série se aplicável"
                      />
                    </div>
                  </div>

                  {getTotalSelecionado() > (item.quantidade_solicitada - item.quantidade_separada) && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Atenção: Quantidade selecionada ({getTotalSelecionado()}) é maior que a necessária ({item.quantidade_solicitada - item.quantidade_separada})
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Alerta de CNPJ Incompatível */}
                  {validarCNPJEmissor() && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-800">
                          <strong>Atenção:</strong> Você deve selecionar estoque do mesmo CNPJ emissor da nota fiscal. 
                          O emissor precisa ter o produto em estoque para poder emitir a nota de venda.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmarSeparacao}
                disabled={getTotalSelecionado() === 0}
                className="bg-biodina-blue hover:bg-biodina-blue/90"
              >
                Confirmar Separação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {estoqueIncompativel && (
        <TransferenciaEstadoModal
          isOpen={showTransferenciaModal}
          onOpenChange={setShowTransferenciaModal}
          cnpjEmissor={cnpjEmissor}
          cnpjEstoque={estoqueIncompativel.cnpj}
          produtoDescricao={item.descricao_produto}
          quantidade={estoquesSelecionados[estoqueIncompativel.id] || 0}
          onRedirecionarMovimentacao={handleRedirecionarMovimentacao}
        />
      )}
    </>
  );
};

export default EstoqueDisponivelModal;
