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
import { Shield, ExternalLink, History, FileCheck, Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { mockCertificados } from "@/data/boasPraticas";
import { getStatusLabel, getStatusColor, getAlertaVencimento } from "@/types/boasPraticas";
import { Badge } from "@/components/ui/badge";

interface RegulatorioTabProps {
  produto: Produto;
  highlightIncomplete?: boolean;
}

export function RegulatorioTab({ produto, highlightIncomplete }: RegulatorioTabProps) {
  const historico = getHistoricoVersoesPorProduto(produto.id);
  const certificados = mockCertificados;

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
      <Card className={highlightIncomplete && (!produto.registroAnvisa || !produto.linkConsultaAnvisa) ? "border-2 border-red-500 animate-pulse" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Registro ANVISA
            {highlightIncomplete && (!produto.registroAnvisa || !produto.linkConsultaAnvisa) && (
              <span className="text-red-600 text-sm font-normal">• Campos Obrigatórios</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={highlightIncomplete && !produto.registroAnvisa ? "p-2 border-2 border-red-300 rounded" : ""}>
              <p className="text-sm text-muted-foreground mb-1">
                Número de Registro {highlightIncomplete && !produto.registroAnvisa && <span className="text-red-600">*</span>}
              </p>
              {produto.registroAnvisa ? (
                <p className="text-lg font-semibold">{produto.registroAnvisa}</p>
              ) : (
                <p className="text-muted-foreground">Não cadastrado</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Classe do Produto
              </p>
              {produto.classeProduto ? (
                <p className="text-lg font-semibold">{produto.classeProduto}</p>
              ) : (
                <p className="text-muted-foreground">Não cadastrado</p>
              )}
            </div>
            <div className={highlightIncomplete && !produto.linkConsultaAnvisa ? "p-2 border-2 border-red-300 rounded" : ""}>
              <p className="text-sm text-muted-foreground mb-1">
                Link de Consulta {highlightIncomplete && !produto.linkConsultaAnvisa && <span className="text-red-600">*</span>}
              </p>
              {produto.linkConsultaAnvisa ? (
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
              ) : (
                <p className="text-muted-foreground">Não cadastrado</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Boas Práticas de Fabricação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Boas Práticas de Fabricação
          </CardTitle>
        </CardHeader>
        <CardContent>
          {certificados.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum certificado de Boas Práticas vinculado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {certificados.map((cert) => {
                const alerta = getAlertaVencimento(cert.validade);
                return (
                  <div key={cert.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">{cert.nomeArquivoPrincipal}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Fabricante Legal:</span> {cert.fabricanteLegal || "—"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Unidade Fabril:</span> {cert.unidadeFabril || "—"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(cert.status)}>
                          {getStatusLabel(cert.status)}
                        </Badge>
                        {alerta.tipo && (
                          <span className={`text-xs font-medium ${alerta.tipo === 'danger' ? 'text-red-600' : 'text-yellow-600'}`}>
                            {alerta.mensagem}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Nº Processo ANVISA:</span>{" "}
                        <span className="font-medium">{cert.numeroProcessoAnvisa}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Validade:</span>{" "}
                        <span className="font-medium">
                          {cert.validade ? format(new Date(cert.validade), "dd/MM/yyyy") : "—"}
                        </span>
                      </div>
                    </div>

                    {cert.nomeCertificado && (
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <span className="text-sm text-muted-foreground">{cert.nomeCertificado}</span>
                        <div className="flex gap-1 ml-auto">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Visualizar
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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