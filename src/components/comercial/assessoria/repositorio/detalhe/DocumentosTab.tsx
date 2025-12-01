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
import { Produto, DocumentoProduto, ChangelogEntry } from "@/types/produto";
import { getDocumentosPorProduto } from "@/data/produtos";
import { Upload, Download, FileText, Clock, Edit, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoricoVersaoModal } from "./HistoricoVersaoModal";
import { UploadDocumentoModal } from "./UploadDocumentoModal";
import EditarDocumentoModal from "./EditarDocumentoModal";
import { calcularStatusRevalidacao } from "@/utils/documentoRevalidacao";
import { toast } from "sonner";

interface DocumentosTabProps {
  produto: Produto;
}

export function DocumentosTab({ produto }: DocumentosTabProps) {
  const [documentos, setDocumentos] = useState(getDocumentosPorProduto(produto.id));
  const [historicoOpen, setHistoricoOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editarOpen, setEditarOpen] = useState(false);
  const [documentoSelecionado, setDocumentoSelecionado] = useState<DocumentoProduto | null>(null);

  const handleDocumentoUpload = (novoDocumento: any) => {
    setDocumentos(prev => [...prev, novoDocumento]);
  };

  const handleDocumentoAtualizado = (documentoAtualizado: DocumentoProduto, changelog: ChangelogEntry) => {
    setDocumentos(prev => 
      prev.map(doc => doc.id === documentoAtualizado.id ? documentoAtualizado : doc)
    );
    toast.success("Documento atualizado com sucesso!");
  };

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
                    <TableHead>Status Revalidação</TableHead>
                    <TableHead>Upload por</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentos.map((doc) => {
                    const revalidacaoInfo = calcularStatusRevalidacao(doc.dataProximaRevalidacao);
                    
                    return (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Badge variant={getTipoColor(doc.tipo)}>
                            {getTipoLabel(doc.tipo)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{doc.titulo}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              v{doc.versao}
                            </Badge>
                            {doc.bloqueadoSobrescrita && (
                              <Badge variant="destructive" className="text-xs">
                                Bloqueado
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{doc.idioma}</TableCell>
                        <TableCell>
                          {format(doc.dataUpload, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          {doc.dataProximaRevalidacao ? (
                            <div className="space-y-1">
                              <Badge className={`text-xs ${revalidacaoInfo.className}`}>
                                {revalidacaoInfo.label}
                              </Badge>
                              {(revalidacaoInfo.status === 'revalidacao_necessaria' || revalidacaoInfo.status === 'vencido') && (
                                <div className="flex items-center gap-1 text-xs text-destructive">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Até {format(doc.dataProximaRevalidacao, "dd/MM/yyyy", { locale: ptBR })}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
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
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setDocumentoSelecionado(doc);
                                setEditarOpen(true);
                              }}
                              title="Editar documento / Nova versão"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              title="Baixar documento"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        onDocumentoUpload={handleDocumentoUpload}
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
          changelog={documentoSelecionado.changelog}
          bloqueadoSobrescrita={documentoSelecionado.bloqueadoSobrescrita}
        />
      )}

      {/* Modal de Edição */}
      {documentoSelecionado && (
        <EditarDocumentoModal
          open={editarOpen}
          onClose={() => {
            setEditarOpen(false);
            setDocumentoSelecionado(null);
          }}
          documento={documentoSelecionado}
          onSave={handleDocumentoAtualizado}
        />
      )}
    </div>
  );
}
