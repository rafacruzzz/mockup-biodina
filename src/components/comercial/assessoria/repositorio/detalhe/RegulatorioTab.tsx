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
import { getHistoricoVersoesPorProduto } from "@/data/produtos";
import { Shield, ExternalLink, History } from "lucide-react";
import { format } from "date-fns";

interface RegulatorioTabProps {
  produto: Produto;
}

export function RegulatorioTab({ produto }: RegulatorioTabProps) {
  const historico = getHistoricoVersoesPorProduto(produto.id);

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      documento: "Documento",
      ficha_tecnica: "Ficha Técnica",
      regulatorio: "Regulatório",
      midia: "Mídia",
    };
    return labels[tipo] || tipo;
  };

  return (
    <div className="space-y-6">
      {/* Registro ANVISA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Registro ANVISA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {produto.registroAnvisa ? (
              <>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Número de Registro
                  </p>
                  <p className="text-lg font-semibold">{produto.registroAnvisa}</p>
                </div>
                {produto.linkConsultaAnvisa && (
                  <Button variant="outline" asChild>
                    <a
                      href={produto.linkConsultaAnvisa}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Consultar na ANVISA
                    </a>
                  </Button>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">
                Registro ANVISA não informado
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Versões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Versões e Alterações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {historico.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma alteração registrada</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Alterado por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historico.map((hist) => (
                    <TableRow key={hist.id}>
                      <TableCell>
                        {format(hist.alteradoEm, "dd/MM/yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium">
                          {getTipoLabel(hist.tipo)}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-md">
                        {hist.descricaoAlteracao}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {hist.alteradoPor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
