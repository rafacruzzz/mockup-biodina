import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Produto } from "@/types/produto";
import { getComparativosPorProduto } from "@/data/produtos";
import { Plus, FileText, Download, Upload } from "lucide-react";
import { format } from "date-fns";
import { ComparativoDialog } from "./ComparativoDialog";

interface SuporteVendasTabProps {
  produto: Produto;
}

export function SuporteVendasTab({ produto }: SuporteVendasTabProps) {
  const [comparativoDialogOpen, setComparativoDialogOpen] = useState(false);
  const comparativos = getComparativosPorProduto(produto.id);

  return (
    <div className="space-y-6">
      {/* Comparativos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Comparativos Técnicos
            </CardTitle>
            <Button onClick={() => setComparativoDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Comparativo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {comparativos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum comparativo criado</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Criado por</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparativos.map((comp) => (
                    <TableRow key={comp.id}>
                      <TableCell className="font-medium">{comp.titulo}</TableCell>
                      <TableCell>{comp.criadoPor}</TableCell>
                      <TableCell>{format(comp.criadoEm, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Justificativas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Justificativas Técnicas
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Justificativa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma justificativa criada</p>
          </div>
        </CardContent>
      </Card>

      {/* Termos de Referência */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Termos de Referência
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Termo de Referência
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum termo de referência criado</p>
          </div>
        </CardContent>
      </Card>

      {/* CATMAT */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              CATMAT
            </CardTitle>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Anexar Arquivo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum arquivo anexado</p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Comparativo */}
      <ComparativoDialog
        open={comparativoDialogOpen}
        onOpenChange={setComparativoDialogOpen}
        produto={produto}
      />
    </div>
  );
}
