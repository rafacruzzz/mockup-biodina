import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, MoreHorizontal, Search, Filter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DueDiligenceData {
  id: number;
  idTriagem: string;
  nomeFornecedor: string;
  dataCriacao: string;
  statusAtual: string;
  responsavel: string;
  contatoPrincipal: string;
  emailContato: string;
  telefoneContato: string;
  produtosInteresse: string;
  protocoloInterno: string;
}

interface DueDiligenceTableProps {
  data: DueDiligenceData[];
  onView: (item: DueDiligenceData) => void;
  onEdit: (item: DueDiligenceData) => void;
  onDelete: (id: number) => void;
}

export const DueDiligenceTable = ({ data, onView, onEdit, onDelete }: DueDiligenceTableProps) => {
  const [searchFornecedor, setSearchFornecedor] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterResponsavel, setFilterResponsavel] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    "Recebida",
    "Em Análise Preliminar", 
    "Aguardando Documentos",
    "Rejeitada Preliminarmente",
    "Em Análise Científica",
    "Em Análise de Custos Regulatórios",
    "Em Análise Comercial",
    "Em Análise Logística",
    "Em Parecer Regulatório Final",
    "Em Análise Financeira",
    "Aguardando Reunião da Diretoria",
    "Aprovado",
    "Reprovado",
    "Aprovado com Ajustes"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
      case 'Aprovado com Ajustes':
        return 'bg-green-500 text-white';
      case 'Reprovado':
      case 'Rejeitada Preliminarmente':
        return 'bg-red-500 text-white';
      case 'Aguardando Documentos':
      case 'Aguardando Reunião da Diretoria':
        return 'bg-yellow-500 text-white';
      case 'Em Análise Preliminar':
      case 'Em Análise Científica':
      case 'Em Análise de Custos Regulatórios':
      case 'Em Análise Comercial':
      case 'Em Análise Logística':
      case 'Em Parecer Regulatório Final':
      case 'Em Análise Financeira':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const responsaveis = [...new Set(data.map(item => item.responsavel))];

  const filteredData = data.filter(item => {
    const matchesFornecedor = item.nomeFornecedor.toLowerCase().includes(searchFornecedor.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.statusAtual === filterStatus;
    const matchesResponsavel = filterResponsavel === "all" || item.responsavel === filterResponsavel;
    
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const itemDate = new Date(item.dataCriacao);
      if (dateFrom && itemDate < dateFrom) matchesDate = false;
      if (dateTo && itemDate > dateTo) matchesDate = false;
    }

    return matchesFornecedor && matchesStatus && matchesResponsavel && matchesDate;
  });

  const clearFilters = () => {
    setSearchFornecedor("");
    setFilterStatus("all");
    setFilterResponsavel("all");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold">Triagens de Due Diligence</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar fornecedor..."
                value={searchFornecedor}
                onChange={(e) => setSearchFornecedor(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            {(searchFornecedor || filterStatus !== "all" || filterResponsavel !== "all" || dateFrom || dateTo) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Limpar
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Responsável</label>
              <Select value={filterResponsavel} onValueChange={setFilterResponsavel}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os responsáveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os responsáveis</SelectItem>
                  {responsaveis.map(responsavel => (
                    <SelectItem key={responsavel} value={responsavel}>{responsavel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Data Inicial</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Data Final</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Triagem</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma triagem encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.idTriagem}</TableCell>
                    <TableCell>{item.nomeFornecedor}</TableCell>
                    <TableCell>{format(new Date(item.dataCriacao), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.statusAtual)}>
                        {item.statusAtual}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.responsavel}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(item)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDelete(item.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filteredData.length > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredData.length} de {data.length} triagem(s)
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};