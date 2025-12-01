import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Produto } from "@/types/produto";
import { getDocumentosPorProduto } from "@/data/produtos";
import { Upload, Download, FileText, Clock } from "lucide-react";
import { format } from "date-fns";
import { HistoricoVersaoModal } from "./HistoricoVersaoModal";
import { UploadDocumentoModal } from "./UploadDocumentoModal";

interface DocumentosTabProps {
  produto: Produto;
}

export function DocumentosTab({ produto }: DocumentosTabProps) {
  const documentos = getDocumentosPorProduto(produto.id);
  const [historicoOpen, setHistoricoOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [documentoSelecionado, setDocumentoSelecionado] = useState<any>(null);

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      catalogo: "Catálogo",
      manual: "POP/IFU/Manual de Operação",
      artigo: "Artigos / Evidências científicas",
      ficha_tecnica: "Ficha Técnica",
      outros: "Outros",
    };
    return labels[tipo] || tipo;
  };

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, "default" | "secondary" | "outline"> = {
      catalogo: "default",
      manual: "secondary",
      artigo: "outline",
      outros: "outline",
    };
    return colors[tipo] || "outline";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos do Produto
            </CardTitle>
            <Button onClick={() => setUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload de Documento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documentos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum documento cadastrado</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Versão</TableHead>
                    <TableHead>Idioma</TableHead>
                    <TableHead>Data Upload</TableHead>
                    <TableHead>Upload por</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentos.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Badge variant={getTipoColor(doc.tipo)}>
                          {getTipoLabel(doc.tipo)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{doc.titulo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          v{doc.versao}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.idioma}</TableCell>
                      <TableCell>
                        {format(doc.dataUpload, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {doc.uploadPor}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {doc.historicoVersoes && doc.historicoVersoes.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDocumentoSelecionado(doc);
                                setHistoricoOpen(true);
                              }}
                              title="Ver histórico de versões"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Upload */}
      <UploadDocumentoModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        produtoId={produto.id}
      />

      {/* Modal de Histórico de Versões */}
      {documentoSelecionado && (
        <HistoricoVersaoModal
          open={historicoOpen}
          onClose={() => {
            setHistoricoOpen(false);
            setDocumentoSelecionado(null);
          }}
          titulo={documentoSelecionado.titulo}
          versaoAtual={documentoSelecionado.versao}
          historicoVersoes={documentoSelecionado.historicoVersoes || []}
        />
      )}
    </div>
  );
}
