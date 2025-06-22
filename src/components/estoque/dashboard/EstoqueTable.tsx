
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown, Eye, FileText } from "lucide-react";
import { PosicaoEstoque } from "@/types/estoque";

interface EstoqueTableProps {
  filteredData: PosicaoEstoque[];
  posicaoEstoque: PosicaoEstoque[];
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  onOpenProductDetails: (item: PosicaoEstoque) => void;
}

const EstoqueTable = ({
  filteredData,
  posicaoEstoque,
  sortField,
  sortDirection,
  onSort,
  onOpenProductDetails
}: EstoqueTableProps) => {
  // Função para determinar cor da linha baseada na validade
  const getRowColor = (item: PosicaoEstoque) => {
    if (!item.data_validade) return "";
    
    const today = new Date();
    const expiryDate = new Date(item.data_validade);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "bg-red-50 border-l-4 border-l-red-500";
    if (diffDays <= 30) return "bg-yellow-50 border-l-4 border-l-yellow-500";
    if (diffDays <= 60) return "bg-orange-50 border-l-4 border-l-orange-500";
    return "";
  };

  // Função para calcular dias até vencimento
  const getDaysUntilExpiry = (dataValidade: string | null) => {
    if (!dataValidade) return null;
    const today = new Date();
    const expiryDate = new Date(dataValidade);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Função para gerar o badge de tipo de estoque
  const getTipoEstoqueBadge = (tipo: string) => {
    const colors = {
      "Nacional": "bg-blue-100 text-blue-800",
      "Importação Direta": "bg-purple-100 text-purple-800",
      "Consignado": "bg-orange-100 text-orange-800"
    };
    return colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Função para gerar o cabeçalho ordenável
  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 hover:text-gray-900 font-semibold"
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Posição Consolidada de Estoque</CardTitle>
            <CardDescription>
              {filteredData.length} registros encontrados • Clique nos cabeçalhos para ordenar
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><SortableHeader field="produto_descricao">Produto</SortableHeader></TableHead>
                <TableHead><SortableHeader field="cnpj">CNPJ</SortableHeader></TableHead>
                <TableHead><SortableHeader field="lote">Lote</SortableHeader></TableHead>
                <TableHead className="text-right"><SortableHeader field="quantidade_disponivel">Qtde Atual</SortableHeader></TableHead>
                <TableHead className="text-right"><SortableHeader field="quantidade_reservada">Reservada</SortableHeader></TableHead>
                <TableHead><SortableHeader field="data_validade">Validade</SortableHeader></TableHead>
                <TableHead><SortableHeader field="fornecedor">Fornecedor</SortableHeader></TableHead>
                <TableHead><SortableHeader field="tipo_estoque">Tipo</SortableHeader></TableHead>
                <TableHead><SortableHeader field="deposito">Local</SortableHeader></TableHead>
                <TableHead className="text-right"><SortableHeader field="cmc_total">Valor</SortableHeader></TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const daysUntilExpiry = getDaysUntilExpiry(item.data_validade);
                return (
                  <TableRow key={item.id} className={`${getRowColor(item)} hover:bg-gray-50`}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-semibold text-gray-900">{item.produto_descricao}</div>
                          <div className="text-sm text-gray-500">{item.produto_codigo}</div>
                        </div>
                        {posicaoEstoque.filter(p => p.produto_codigo === item.produto_codigo).length > 1 && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="text-xs">Multi-lote</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              Este produto possui múltiplos lotes
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{item.cnpj}</TableCell>
                    <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                    <TableCell className="text-right font-semibold">{item.quantidade_disponivel}</TableCell>
                    <TableCell className="text-right text-orange-600 font-medium">
                      {item.quantidade_reservada > 0 ? item.quantidade_reservada : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          {item.data_validade ? 
                            new Date(item.data_validade).toLocaleDateString('pt-BR') : 
                            <span className="text-gray-400">Sem validade</span>
                          }
                        </div>
                        {daysUntilExpiry !== null && (
                          <Tooltip>
                            <TooltipTrigger>
                              <div className={`w-16 h-1 rounded-full ${
                                daysUntilExpiry <= 0 ? 'bg-red-500' :
                                daysUntilExpiry <= 30 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`} />
                            </TooltipTrigger>
                            <TooltipContent>
                              {daysUntilExpiry <= 0 ? 'Vencido' : `${daysUntilExpiry} dias restantes`}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-sm hover:text-blue-600 cursor-help">{item.fornecedor}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p><strong>Fornecedor:</strong> {item.fornecedor}</p>
                            <p><strong>Origem:</strong> {item.origem_entrada}</p>
                            <p><strong>CMC Unit.:</strong> R$ {item.cmc_unitario.toFixed(2)}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTipoEstoqueBadge(item.tipo_estoque)}>
                        {item.tipo_estoque}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-sm hover:text-blue-600 cursor-help">{item.deposito}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p><strong>Depósito:</strong> {item.deposito}</p>
                            <p><strong>Qtde Total:</strong> {item.quantidade_total}</p>
                            <p><strong>Disponível:</strong> {item.quantidade_disponivel}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      R$ {item.cmc_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onOpenProductDetails(item)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Ver todos os lotes deste produto
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstoqueTable;
