
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Package, FileText, AlertTriangle } from "lucide-react";
import { MovimentacaoEstoque, StatusMovimentacao, TipoMovimentacaoHistorico } from "@/types/estoque";

interface MovimentacoesDataTableProps {
  data: MovimentacaoEstoque[];
  onRowDetails?: (item: MovimentacaoEstoque) => void;
}

const MovimentacoesDataTable = ({ data, onRowDetails }: MovimentacoesDataTableProps) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhuma movimentação encontrada</p>
        <p className="text-gray-400 text-sm">Clique em "Nova Movimentação" para começar</p>
      </div>
    );
  }

  const getBadgeTipo = (tipo: TipoMovimentacaoHistorico) => {
    return tipo === TipoMovimentacaoHistorico.ENTRE_CNPJS ? (
      <Badge className="bg-purple-100 text-purple-800 border-purple-200">Entre CNPJs</Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Interna</Badge>
    );
  };

  const getBadgeStatus = (status: StatusMovimentacao) => {
    const variants = {
      [StatusMovimentacao.CONCLUIDA]: 'bg-green-100 text-green-800 border-green-200',
      [StatusMovimentacao.PENDENTE]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      [StatusMovimentacao.CANCELADA]: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatProdutos = (item: MovimentacaoEstoque) => {
    if (item.produtos_adicionais && item.produtos_adicionais > 0) {
      return (
        <div>
          <span className="font-medium">{item.produto_codigo}</span>
          <p className="text-xs text-gray-600">{item.produto_descricao}</p>
          <p className="text-xs text-blue-600">+{item.produtos_adicionais} mais</p>
        </div>
      );
    }
    
    return (
      <div>
        <span className="font-medium">{item.produto_codigo}</span>
        <p className="text-xs text-gray-600">{item.produto_descricao}</p>
      </div>
    );
  };

  const isLoteVencido = (dataValidade: string | null) => {
    if (!dataValidade) return false;
    const hoje = new Date();
    const validade = new Date(dataValidade);
    return validade < hoje;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="bg-gray-50/50 border-b">
              <TableHead className="font-semibold text-gray-700">Data</TableHead>
              <TableHead className="font-semibold text-gray-700">Tipo</TableHead>
              <TableHead className="font-semibold text-gray-700">Produto(s)</TableHead>
              <TableHead className="font-semibold text-gray-700">Qtde</TableHead>
              <TableHead className="font-semibold text-gray-700">Origem</TableHead>
              <TableHead className="font-semibold text-gray-700">Destino</TableHead>
              <TableHead className="font-semibold text-gray-700">NF</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Responsável</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow 
                key={item.id} 
                className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
              >
                <TableCell>
                  {new Date(item.data_movimentacao).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {getBadgeTipo(item.tipo_interno)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {formatProdutos(item)}
                    {isLoteVencido(item.data_movimentacao) && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{item.quantidade}</span>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div className="font-medium">{item.cnpj_origem}</div>
                    <div className="text-gray-600">{item.deposito_origem}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div className="font-medium">{item.cnpj_destino}</div>
                    <div className="text-gray-600">{item.deposito_destino}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {item.nf_vinculada ? (
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3 text-blue-600" />
                      <span className="text-xs">{item.nf_vinculada}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {getBadgeStatus(item.status)}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.usuario}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 hover:bg-blue-50"
                    onClick={() => onRowDetails && onRowDetails(item)}
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MovimentacoesDataTable;
