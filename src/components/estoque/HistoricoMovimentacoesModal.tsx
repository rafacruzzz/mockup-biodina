
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileSpreadsheet, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft, Settings } from "lucide-react";
import { mockMovimentacoes, mockCNPJs } from "@/data/estoqueModules";

interface HistoricoMovimentacoesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HistoricoMovimentacoesModal = ({ isOpen, onOpenChange }: HistoricoMovimentacoesModalProps) => {
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    produto: '',
    tipo: '',
    cnpj: ''
  });

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'entrada':
        return <ArrowDownCircle className="h-4 w-4 text-green-600" />;
      case 'saida':
        return <ArrowUpCircle className="h-4 w-4 text-red-600" />;
      case 'transferencia':
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
      case 'ajuste':
        return <Settings className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getBadgeTipo = (tipo: string) => {
    const variants = {
      entrada: 'bg-green-100 text-green-800',
      saida: 'bg-red-100 text-red-800',
      transferencia: 'bg-blue-100 text-blue-800',
      ajuste: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={variants[tipo as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </Badge>
    );
  };

  const filtrarMovimentacoes = () => {
    return mockMovimentacoes.filter(mov => {
      if (filtros.produto && !mov.produto_descricao.toLowerCase().includes(filtros.produto.toLowerCase())) {
        return false;
      }
      if (filtros.tipo && mov.tipo !== filtros.tipo) {
        return false;
      }
      if (filtros.cnpj && !mov.cnpj_destino?.includes(filtros.cnpj) && !mov.cnpj_origem?.includes(filtros.cnpj)) {
        return false;
      }
      return true;
    });
  };

  const exportarHistorico = () => {
    const dados = filtrarMovimentacoes();
    const csvContent = [
      ["Data", "Tipo", "Produto", "Lote", "Quantidade", "Documento", "CNPJ Origem", "CNPJ Destino", "Usuário"],
      ...dados.map(mov => [
        new Date(mov.data_movimentacao).toLocaleDateString('pt-BR'),
        mov.tipo,
        mov.produto_descricao,
        mov.lote,
        mov.quantidade,
        mov.documento,
        mov.cnpj_origem || '',
        mov.cnpj_destino || '',
        mov.usuario
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `historico_movimentacoes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[800px] max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Histórico de Movimentações</SheetTitle>
          <SheetDescription>
            Consulte e filtre as movimentações de estoque realizadas
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="data-inicio">Data Início</Label>
              <Input
                id="data-inicio"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="data-fim">Data Fim</Label>
              <Input
                id="data-fim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="produto-filtro">Produto</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="produto-filtro"
                  placeholder="Buscar produto..."
                  className="pl-10"
                  value={filtros.produto}
                  onChange={(e) => setFiltros({ ...filtros, produto: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tipo-filtro">Tipo</Label>
              <Select value={filtros.tipo} onValueChange={(value) => setFiltros({ ...filtros, tipo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                  <SelectItem value="ajuste">Ajuste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cnpj-filtro">CNPJ</Label>
              <Select value={filtros.cnpj} onValueChange={(value) => setFiltros({ ...filtros, cnpj: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os CNPJs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os CNPJs</SelectItem>
                  {mockCNPJs.map(cnpj => (
                    <SelectItem key={cnpj.id} value={cnpj.nome}>{cnpj.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={exportarHistorico} variant="outline" className="w-full">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>

          {/* Tabela de Movimentações */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Qtde</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Usuário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrarMovimentacoes().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      Nenhuma movimentação encontrada com os filtros selecionados
                    </TableCell>
                  </TableRow>
                ) : (
                  filtrarMovimentacoes().map((movimentacao, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(movimentacao.data_movimentacao).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIconeTipo(movimentacao.tipo)}
                          {getBadgeTipo(movimentacao.tipo)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{movimentacao.produto_codigo}</span>
                          <p className="text-xs text-gray-600">{movimentacao.produto_descricao}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{movimentacao.lote}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{movimentacao.quantidade}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{movimentacao.documento}</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          {movimentacao.cnpj_origem && (
                            <div className="text-red-600">De: {movimentacao.cnpj_origem}</div>
                          )}
                          {movimentacao.cnpj_destino && (
                            <div className="text-green-600">Para: {movimentacao.cnpj_destino}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{movimentacao.usuario}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HistoricoMovimentacoesModal;
