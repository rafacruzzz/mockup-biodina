import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AssinaturaPad } from "@/components/ui/assinatura-pad";
import { DocumentoAcaoCampo } from "@/types/acaoCampo";
import { Upload, Eye, Pen, Check, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface DocumentoAcaoCampoCardProps {
  documento: DocumentoAcaoCampo;
  onUpload: (file: File) => void;
  onRemove: () => void;
  onSign: (nomeAssinante: string, assinaturaBase64: string, cargo?: string) => void;
}

export const DocumentoAcaoCampoCard = ({
  documento,
  onUpload,
  onRemove,
  onSign
}: DocumentoAcaoCampoCardProps) => {
  const [showViewer, setShowViewer] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [nomeAssinante, setNomeAssinante] = useState("");
  const [cargoAssinante, setCargoAssinante] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleSaveSignature = (assinaturaBase64: string) => {
    if (!nomeAssinante.trim()) {
      toast.error("Por favor, informe o nome do assinante");
      return;
    }
    onSign(nomeAssinante, assinaturaBase64, cargoAssinante);
    setShowSignature(false);
    setNomeAssinante("");
    setCargoAssinante("");
  };

  const getStatusBadge = () => {
    if (documento.assinatura) {
      return <Badge className="bg-green-500 text-white"><Check className="h-3 w-3 mr-1" />Assinado</Badge>;
    }
    if (documento.url) {
      if (documento.requerAssinatura) {
        return <Badge className="bg-yellow-500 text-white">Aguardando Assinatura</Badge>;
      }
      return <Badge className="bg-green-500 text-white"><Check className="h-3 w-3 mr-1" />Anexado</Badge>;
    }
    return <Badge variant="outline">Pendente</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{documento.nome}</CardTitle>
              {documento.requerAssinatura && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Pen className="h-3 w-3" />
                  Requer assinatura digital
                </p>
              )}
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!documento.url ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste e solte o arquivo aqui ou
              </p>
              <label htmlFor={`upload-${documento.id}`}>
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>Selecionar Arquivo</span>
                </Button>
                <input
                  id={`upload-${documento.id}`}
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{documento.nomeOriginal}</p>
                  {documento.dataUpload && (
                    <p className="text-xs text-muted-foreground">
                      Anexado em {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>

              {documento.assinatura && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Assinado por {documento.assinatura.nomeAssinante}
                  </p>
                  {documento.assinatura.cargo && (
                    <p className="text-xs text-green-700 dark:text-green-300">
                      {documento.assinatura.cargo}
                    </p>
                  )}
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    {new Date(documento.assinatura.dataAssinatura).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowViewer(true)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>

                {documento.requerAssinatura && !documento.assinatura && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowSignature(true)}
                    className="flex-1"
                  >
                    <Pen className="h-4 w-4 mr-1" />
                    Assinar
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Visualização */}
      <Dialog open={showViewer} onOpenChange={setShowViewer}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{documento.nome}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">
              Preview do documento: {documento.nomeOriginal}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Assinatura */}
      <Dialog open={showSignature} onOpenChange={setShowSignature}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assinatura Digital - {documento.nome}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome-assinante">Nome do Assinante *</Label>
              <Input
                id="nome-assinante"
                value={nomeAssinante}
                onChange={(e) => setNomeAssinante(e.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo-assinante">Cargo (opcional)</Label>
              <Input
                id="cargo-assinante"
                value={cargoAssinante}
                onChange={(e) => setCargoAssinante(e.target.value)}
                placeholder="Ex: Diretor Técnico"
              />
            </div>

            <AssinaturaPad onSave={handleSaveSignature} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
