import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { ItemApontamento } from "@/types/assessoria-cientifica";

interface DevolucaoOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DevolucaoOSModal = ({ isOpen, onClose }: DevolucaoOSModalProps) => {
  const [numeroOS, setNumeroOS] = useState("");
  const [nfRemessa, setNfRemessa] = useState("");
  const [cliente, setCliente] = useState("");
  const [itensNaoUtilizados, setItensNaoUtilizados] = useState<ItemApontamento[]>([]);
  const [osEncontrada, setOsEncontrada] = useState(false);

  const handlePuxarItensNaoUtilizados = () => {
    if (!numeroOS) {
      toast.error("Digite o número da OS");
      return;
    }

    // Simular busca de OS e itens não utilizados
    setOsEncontrada(true);
    setNfRemessa("000001234");
    setCliente("Hospital São Lucas");
    setItensNaoUtilizados([
      {
        itemId: "ITEM001",
        descricao: "Filtro de Ar HEPA H13",
        quantidadeRemessa: 5,
        quantidadeUtilizada: 3,
        quantidadeNaoUtilizada: 2,
        statusUso: "Parcial",
        observacoes: ""
      },
      {
        itemId: "ITEM003",
        descricao: "Placa Eletrônica Controladora",
        quantidadeRemessa: 1,
        quantidadeUtilizada: 0,
        quantidadeNaoUtilizada: 1,
        statusUso: "Nao Utilizado",
        observacoes: "Cliente optou por não realizar troca"
      }
    ]);

    toast.success("Itens não utilizados carregados com sucesso!");
  };

  const handleGerarDevolucao = () => {
    if (itensNaoUtilizados.length === 0) {
      toast.error("Nenhum item para devolução");
      return;
    }

    console.log({
      numeroOS,
      nfRemessa,
      cliente,
      itensDevolvidos: itensNaoUtilizados.filter(item => item.quantidadeNaoUtilizada > 0)
    });

    toast.success("NF de Devolução gerada com sucesso!");
    onClose();
  };

  const totalItens = itensNaoUtilizados.reduce((sum, item) => sum + item.quantidadeNaoUtilizada, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-6 w-6 text-primary" />
            Devolução de Itens da OS
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Busque a OS e carregue automaticamente os itens não utilizados
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Busca da OS */}
          <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numeroOS">Número da OS</Label>
              <div className="flex gap-2">
                <Input
                  id="numeroOS"
                  placeholder="Digite o número da OS..."
                  value={numeroOS}
                  onChange={(e) => setNumeroOS(e.target.value)}
                />
                <Button onClick={handlePuxarItensNaoUtilizados} className="bg-primary">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

            {osEncontrada && (
              <div className="space-y-2 pt-2 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-gray-600">NF de Remessa</Label>
                    <p className="font-mono font-semibold">{nfRemessa}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Cliente</Label>
                    <p className="font-semibold">{cliente}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão para Puxar Itens */}
          {osEncontrada && (
            <div className="flex justify-center">
              <Button
                onClick={handlePuxarItensNaoUtilizados}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Package className="h-4 w-4 mr-2" />
                Puxar Itens Não Utilizados da OS
              </Button>
            </div>
          )}

          {/* Tabela de Itens Não Utilizados */}
          {itensNaoUtilizados.length > 0 && (
            <>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total de Itens para Devolução</p>
                    <p className="text-2xl font-bold text-blue-900">{totalItens}</p>
                  </div>
                  <Package className="h-10 w-10 text-blue-600" />
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-center">Qtd. Remessa</TableHead>
                      <TableHead className="text-center">Qtd. Utilizada</TableHead>
                      <TableHead className="text-center">Qtd. Devolução</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensNaoUtilizados.map((item) => (
                      <TableRow key={item.itemId}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.descricao}</p>
                            <p className="text-xs text-gray-500">{item.itemId}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{item.quantidadeRemessa}</TableCell>
                        <TableCell className="text-center">{item.quantidadeUtilizada}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-red-500 text-white font-bold">
                            {item.quantidadeNaoUtilizada}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gray-500 text-white">
                            {item.statusUso === 'Nao Utilizado' ? 'Não Utilizado' : item.statusUso}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {item.observacoes || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Informação Fiscal */}
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Informações Fiscais da Devolução</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-gray-600">CFOP Sugerido</Label>
                    <p className="font-mono font-semibold">1949 / 2949</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Natureza da Operação</Label>
                    <p className="font-semibold">Retorno de Remessa para Manutenção</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {itensNaoUtilizados.length > 0 && (
              <Button onClick={handleGerarDevolucao} className="bg-primary">
                <Save className="h-4 w-4 mr-2" />
                Gerar NF de Devolução
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DevolucaoOSModal;
