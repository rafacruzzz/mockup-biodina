import { ArrowLeft, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Equipamento } from "@/types/equipamento";
import { getStatusEquipamentoColor, getStatusEquipamentoLabel } from "@/data/equipamentos";

interface ListaEquipamentosProps {
  equipamentos: Equipamento[];
  searchTerm: string;
  onSelectEquipamento: (equipamento: Equipamento) => void;
  onVoltar: () => void;
  onNovaSearch: () => void;
}

export function ListaEquipamentos({
  equipamentos,
  searchTerm,
  onSelectEquipamento,
  onVoltar,
  onNovaSearch,
}: ListaEquipamentosProps) {
  const getStatusBadge = (status: Equipamento["status"]) => {
    const colors = getStatusEquipamentoColor(status);
    return (
      <Badge
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        }}
        className="border"
      >
        {getStatusEquipamentoLabel(status)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Resultados da Busca</h2>
            <p className="text-sm text-muted-foreground">
              {equipamentos.length} equipamento(s) encontrado(s) para "{searchTerm}"
            </p>
          </div>
        </div>
        <Button onClick={onNovaSearch} variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Nova Busca
        </Button>
      </div>

      {/* Tabela de Resultados */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº de Série</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Cliente Atual</TableHead>
              <TableHead>Setor de Alocação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nenhum equipamento encontrado
                </TableCell>
              </TableRow>
            ) : (
              equipamentos.map((equipamento) => (
                <TableRow
                  key={equipamento.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectEquipamento(equipamento)}
                >
                  <TableCell className="font-medium">{equipamento.numeroSerie}</TableCell>
                  <TableCell>{equipamento.modelo}</TableCell>
                  <TableCell>{equipamento.lote}</TableCell>
                  <TableCell>{equipamento.clienteAtual}</TableCell>
                  <TableCell>{equipamento.setorAlocacao}</TableCell>
                  <TableCell>{getStatusBadge(equipamento.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEquipamento(equipamento);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
