import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Plus, Search, Eye } from "lucide-react";
import { Mudanca } from "@/types/rt";
import { NovaMudancaModal } from "./NovaMudancaModal";

interface ControleMudancasTableProps {
  mudancas: Mudanca[];
  onMudancasChange: (mudancas: Mudanca[]) => void;
}

const getTipoMudancaLabel = (tipo: string) => {
  const labels = {
    A: "Dados Empresariais",
    B: "Dados Mestres de Produtos",
    C: "Processos de Negócio",
    D: "Atualizações Regulatórias",
    E: "Melhorias de Performance",
    F: "Outros"
  };
  return labels[tipo as keyof typeof labels] || tipo;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Aprovado":
      return "default";
    case "Em Análise":
      return "secondary";
    case "Pendente":
      return "outline";
    case "Rejeitado":
      return "destructive";
    default:
      return "outline";
  }
};

export const ControleMudancasTable = ({
  mudancas,
  onMudancasChange
}: ControleMudancasTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNovaModal, setShowNovaModal] = useState(false);

  const mudancasFiltradas = mudancas.filter(mudanca =>
    mudanca.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mudanca.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mudanca.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getTipoMudancaLabel(mudanca.tipoMudanca).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovaMudanca = (novaMudanca: Mudanca) => {
    onMudancasChange([novaMudanca, ...mudancas]);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Controle de Mudanças Existentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, responsável, tipo ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowNovaModal(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Mudança
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Integração automática:</strong> Mudanças do tipo "B - Dados Mestres de Produtos" 
              são geradas automaticamente quando há alterações no módulo Regulatório.
            </p>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="w-[110px]">Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Parte Interessada</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mudancasFiltradas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Nenhuma mudança encontrada" : "Nenhuma mudança registrada"}
                    </TableCell>
                  </TableRow>
                ) : (
                  mudancasFiltradas.map((mudanca) => (
                    <TableRow key={mudanca.id}>
                      <TableCell className="font-medium">{mudanca.id}</TableCell>
                      <TableCell>{mudanca.data}</TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-medium text-xs">
                            {mudanca.tipoMudanca}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {getTipoMudancaLabel(mudanca.tipoMudanca)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{mudanca.parteInteressada}</Badge>
                      </TableCell>
                      <TableCell>{mudanca.responsavel}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={mudanca.descricao}>
                          {mudanca.descricao}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getStatusVariant(mudanca.status)}>
                          {mudanca.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {mudancasFiltradas.length} mudança(s) registrada(s)
            </span>
            <div className="flex gap-2">
              <Badge variant="default">{mudancas.filter(m => m.status === "Aprovado").length} Aprovadas</Badge>
              <Badge variant="secondary">{mudancas.filter(m => m.status === "Em Análise").length} Em Análise</Badge>
              <Badge variant="outline">{mudancas.filter(m => m.status === "Pendente").length} Pendentes</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <NovaMudancaModal
        open={showNovaModal}
        onOpenChange={setShowNovaModal}
        onSave={handleNovaMudanca}
      />
    </>
  );
};
