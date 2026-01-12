import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Package, 
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { ItemPedidoAdministrativo, LoteAutorizado } from "@/types/estoque";
import { mockEstoquesDisponiveis, mockCNPJs, mockDepositos } from "@/data/estoqueModules";
import { toast } from "@/hooks/use-toast";

interface SelecionarLotesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: ItemPedidoAdministrativo;
  lotesJaSelecionados: LoteAutorizado[];
  onConfirmar: (lotes: LoteAutorizado[]) => void;
}

interface LoteDisponivel {
  id: number;
  lote: string;
  cnpj: string;
  cnpj_nome: string;
  deposito: string;
  validade: string;
  quantidade_disponivel: number;
  quantidade_autorizar: number;
  selecionado: boolean;
  validade_invalida: boolean;
}

const SelecionarLotesModal = ({ 
  isOpen, 
  onOpenChange, 
  item, 
  lotesJaSelecionados, 
  onConfirmar 
}: SelecionarLotesModalProps) => {
  const [lotesDisponiveis, setLotesDisponiveis] = useState<LoteDisponivel[]>([]);

  useEffect(() => {
    // Simular lotes disponíveis para o produto
    const lotes: LoteDisponivel[] = mockEstoquesDisponiveis.map((estoque, index) => {
      const cnpjInfo = mockCNPJs.find(c => c.codigo === estoque.cnpj);
      const jaSelecionado = lotesJaSelecionados.find(l => l.lote === estoque.lote);
      
      // Verificar se validade é menor que a mínima exigida
      const validadeMinima = item.validade_minima_exigida 
        ? new Date(item.validade_minima_exigida) 
        : null;
      const validadeLote = new Date(estoque.data_validade || '2099-12-31');
      const validadeInvalida = validadeMinima ? validadeLote < validadeMinima : false;

      return {
        id: estoque.id,
        lote: estoque.lote,
        cnpj: estoque.cnpj,
        cnpj_nome: cnpjInfo?.nome || estoque.cnpj,
        deposito: estoque.deposito,
        validade: estoque.data_validade || '',
        quantidade_disponivel: estoque.quantidade_disponivel,
        quantidade_autorizar: jaSelecionado?.quantidade || 0,
        selecionado: !!jaSelecionado,
        validade_invalida: validadeInvalida
      };
    });

    // Adicionar mais lotes simulados
    lotes.push({
      id: 100,
      lote: "LOT-2024-NEW",
      cnpj: "12.345.678/0001-90",
      cnpj_nome: "iMuv Matriz",
      deposito: "Depósito Central",
      validade: "2025-12-31",
      quantidade_disponivel: 100,
      quantidade_autorizar: 0,
      selecionado: false,
      validade_invalida: false
    });

    setLotesDisponiveis(lotes);
  }, [item, lotesJaSelecionados]);

  const handleToggleLote = (loteId: number) => {
    setLotesDisponiveis(prev => prev.map(lote => {
      if (lote.id === loteId) {
        return { 
          ...lote, 
          selecionado: !lote.selecionado,
          quantidade_autorizar: !lote.selecionado ? lote.quantidade_disponivel : 0
        };
      }
      return lote;
    }));
  };

  const handleAtualizarQuantidade = (loteId: number, quantidade: number) => {
    setLotesDisponiveis(prev => prev.map(lote => {
      if (lote.id === loteId) {
        const qtd = Math.min(quantidade, lote.quantidade_disponivel);
        return { ...lote, quantidade_autorizar: qtd };
      }
      return lote;
    }));
  };

  const getTotalAutorizado = () => {
    return lotesDisponiveis
      .filter(l => l.selecionado)
      .reduce((sum, l) => sum + l.quantidade_autorizar, 0);
  };

  const handleConfirmar = () => {
    const lotesSelecionados = lotesDisponiveis.filter(l => l.selecionado && l.quantidade_autorizar > 0);
    
    if (lotesSelecionados.length === 0) {
      toast({
        title: "Nenhum Lote Selecionado",
        description: "Selecione pelo menos um lote com quantidade.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se algum lote selecionado tem validade inválida
    const lotesInvalidos = lotesSelecionados.filter(l => l.validade_invalida);
    if (lotesInvalidos.length > 0) {
      toast({
        title: "Validade Inválida",
        description: "Existem lotes selecionados com validade menor que a mínima exigida.",
        variant: "destructive"
      });
      return;
    }

    const lotesAutorizados: LoteAutorizado[] = lotesSelecionados.map(lote => ({
      lote: lote.lote,
      quantidade: lote.quantidade_autorizar,
      validade: lote.validade,
      cnpj: lote.cnpj,
      deposito: lote.deposito
    }));

    onConfirmar(lotesAutorizados);
    toast({
      title: "Lotes Selecionados",
      description: `${lotesAutorizados.length} lote(s) selecionado(s) com total de ${getTotalAutorizado()} unidades.`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-biodina-blue flex items-center gap-2">
            <Package className="h-5 w-5" />
            Selecionar Lotes para Autorização
          </DialogTitle>
        </DialogHeader>

        {/* Informações do Item */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Produto: {item.codigo_produto} - {item.descricao_produto}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Qtd. Pedido:</span>
                <Badge className="ml-2 bg-biodina-gold">{item.quantidade_pedido}</Badge>
              </div>
              {item.validade_minima_exigida && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Val. Mín. Exigida:</span>
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(item.validade_minima_exigida).toLocaleDateString('pt-BR')}
                  </Badge>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Total Selecionado:</span>
                <Badge className={`ml-2 ${getTotalAutorizado() >= item.quantidade_pedido ? 'bg-green-600' : 'bg-orange-500'}`}>
                  {getTotalAutorizado()} / {item.quantidade_pedido}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Lotes */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Sel.</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>CNPJ / Unidade</TableHead>
                <TableHead>Depósito</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Qtd. Disponível</TableHead>
                <TableHead>Qtd. a Autorizar</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lotesDisponiveis.map((lote) => (
                <TableRow 
                  key={lote.id} 
                  className={lote.validade_invalida ? 'bg-red-50' : ''}
                >
                  <TableCell>
                    <Checkbox
                      checked={lote.selecionado}
                      onCheckedChange={() => handleToggleLote(lote.id)}
                      disabled={lote.validade_invalida}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{lote.lote}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {lote.cnpj_nome}
                    </div>
                  </TableCell>
                  <TableCell>{lote.deposito}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={lote.validade_invalida 
                        ? "bg-red-100 text-red-800 border-red-300" 
                        : "bg-green-50 text-green-700 border-green-200"
                      }
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(lote.validade).toLocaleDateString('pt-BR')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">{lote.quantidade_disponivel}</span>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max={lote.quantidade_disponivel}
                      value={lote.quantidade_autorizar}
                      onChange={(e) => handleAtualizarQuantidade(lote.id, parseInt(e.target.value) || 0)}
                      disabled={!lote.selecionado || lote.validade_invalida}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    {lote.validade_invalida ? (
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Val. Inválida
                      </Badge>
                    ) : lote.selecionado ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Selecionado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-600">
                        Disponível
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Aviso sobre validade */}
        {item.validade_minima_exigida && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800">Atenção: Validade Mínima Exigida</p>
              <p className="text-amber-700">
                O cliente exige validade mínima de {new Date(item.validade_minima_exigida).toLocaleDateString('pt-BR')}. 
                Lotes com validade menor estão destacados em vermelho e não podem ser selecionados.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmar} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirmar Seleção ({getTotalAutorizado()} un.)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelecionarLotesModal;
