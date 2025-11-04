import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Save, Package, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ItemApontamento } from "@/types/assessoria-cientifica";

interface ApontamentoUsoOSProps {
  isOpen: boolean;
  onClose: () => void;
  osId: string;
  numeroOS: string;
}

const ApontamentoUsoOS = ({ isOpen, onClose, osId, numeroOS }: ApontamentoUsoOSProps) => {
  const [itens, setItens] = useState<ItemApontamento[]>([
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
      itemId: "ITEM002",
      descricao: "Sensor de Temperatura PT100",
      quantidadeRemessa: 2,
      quantidadeUtilizada: 2,
      quantidadeNaoUtilizada: 0,
      statusUso: "Utilizado",
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

  const [observacoesGerais, setObservacoesGerais] = useState("");

  const handleQuantidadeChange = (itemId: string, field: 'quantidadeUtilizada', value: number) => {
    setItens(itens.map(item => {
      if (item.itemId === itemId) {
        const novaUtilizada = value;
        const novaNaoUtilizada = item.quantidadeRemessa - novaUtilizada;
        
        let novoStatus: ItemApontamento['statusUso'] = 'Parcial';
        if (novaUtilizada === 0) novoStatus = 'Nao Utilizado';
        else if (novaNaoUtilizada === 0) novoStatus = 'Utilizado';

        return {
          ...item,
          quantidadeUtilizada: novaUtilizada,
          quantidadeNaoUtilizada: novaNaoUtilizada,
          statusUso: novoStatus
        };
      }
      return item;
    }));
  };

  const handleObservacaoChange = (itemId: string, observacao: string) => {
    setItens(itens.map(item => 
      item.itemId === itemId ? { ...item, observacoes: observacao } : item
    ));
  };

  const handleSalvar = () => {
    const todosApontados = itens.every(item => 
      item.quantidadeUtilizada + item.quantidadeNaoUtilizada === item.quantidadeRemessa
    );

    if (!todosApontados) {
      toast.error("Todos os itens devem ter quantidades apontadas!");
      return;
    }

    console.log({
      osId,
      numeroOS,
      itens,
      observacoesGerais,
      dataApontamento: new Date()
    });

    toast.success("Apontamento de uso registrado com sucesso!");
    onClose();
  };

  const statusColors = {
    'Utilizado': 'bg-green-500',
    'Nao Utilizado': 'bg-gray-500',
    'Parcial': 'bg-yellow-500'
  };

  const statusIcons = {
    'Utilizado': CheckCircle,
    'Nao Utilizado': XCircle,
    'Parcial': Package
  };

  const totais = {
    remessa: itens.reduce((sum, item) => sum + item.quantidadeRemessa, 0),
    utilizado: itens.reduce((sum, item) => sum + item.quantidadeUtilizada, 0),
    naoUtilizado: itens.reduce((sum, item) => sum + item.quantidadeNaoUtilizada, 0)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Apontamento de Uso de Materiais - OS {numeroOS}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Marque os materiais utilizados e não utilizados na execução do serviço
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-600">Total Remessa</p>
              <p className="text-2xl font-bold text-blue-900">{totais.remessa}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-600">Utilizados</p>
              <p className="text-2xl font-bold text-green-900">{totais.utilizado}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-600">Não Utilizados</p>
              <p className="text-2xl font-bold text-gray-900">{totais.naoUtilizado}</p>
            </div>
          </div>

          {/* Tabela de Itens */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Qtd. Remessa</TableHead>
                  <TableHead className="text-center">Qtd. Utilizada</TableHead>
                  <TableHead className="text-center">Qtd. Não Utilizada</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.map((item) => {
                  const StatusIcon = statusIcons[item.statusUso];
                  return (
                    <TableRow key={item.itemId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.descricao}</p>
                          <p className="text-xs text-gray-500">{item.itemId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {item.quantidadeRemessa}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max={item.quantidadeRemessa}
                          value={item.quantidadeUtilizada}
                          onChange={(e) => handleQuantidadeChange(item.itemId, 'quantidadeUtilizada', Number(e.target.value))}
                          className="w-20 text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {item.quantidadeNaoUtilizada}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[item.statusUso]} text-white flex items-center gap-1 w-fit`}>
                          <StatusIcon className="h-3 w-3" />
                          {item.statusUso === 'Nao Utilizado' ? 'Não Utilizado' : item.statusUso}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Observações..."
                          value={item.observacoes || ''}
                          onChange={(e) => handleObservacaoChange(item.itemId, e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Observações Gerais */}
          <div className="space-y-2">
            <Label htmlFor="observacoesGerais">Observações Gerais do Serviço</Label>
            <Textarea
              id="observacoesGerais"
              placeholder="Descreva detalhes adicionais sobre a execução do serviço..."
              value={observacoesGerais}
              onChange={(e) => setObservacoesGerais(e.target.value)}
              rows={4}
            />
          </div>

          {/* Alerta */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Atenção:</strong> Após salvar este apontamento, os materiais não utilizados 
              poderão ser incluídos automaticamente na NF de Devolução e os materiais utilizados 
              na NF de Auto Consumo.
            </p>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSalvar} className="bg-primary">
              <Save className="h-4 w-4 mr-2" />
              Salvar Apontamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApontamentoUsoOS;
