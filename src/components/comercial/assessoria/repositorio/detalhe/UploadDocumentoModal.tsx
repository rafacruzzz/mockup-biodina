import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface UploadDocumentoModalProps {
  open: boolean;
  onClose: () => void;
  produtoId: string;
}

export function UploadDocumentoModal({
  open,
  onClose,
  produtoId,
}: UploadDocumentoModalProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    titulo: "",
    versao: "",
    idioma: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validação de tamanho (máximo 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Arquivo muito grande. Tamanho máximo: 20MB");
        return;
      }
      setArquivo(file);
      
      // Preencher título automaticamente com o nome do arquivo (sem extensão)
      if (!formData.titulo) {
        const nomeArquivo = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({ ...prev, titulo: nomeArquivo }));
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveFile = () => {
    setArquivo(null);
  };

  const handleSubmit = () => {
    // Validações
    if (!arquivo) {
      toast.error("Selecione um arquivo para upload");
      return;
    }

    if (!formData.tipo) {
      toast.error("Selecione o tipo do documento");
      return;
    }

    if (!formData.titulo.trim()) {
      toast.error("Informe o título do documento");
      return;
    }

    if (!formData.versao.trim()) {
      toast.error("Informe a versão do documento");
      return;
    }

    if (!formData.idioma) {
      toast.error("Selecione o idioma do documento");
      return;
    }

    // Aqui seria o upload real para o backend/storage
    console.log("Upload do documento:", {
      arquivo: arquivo.name,
      produtoId,
      ...formData,
    });

    toast.success("Documento enviado com sucesso");
    handleClose();
  };

  const handleClose = () => {
    setArquivo(null);
    setFormData({
      tipo: "",
      titulo: "",
      versao: "",
      idioma: "",
    });
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload de Documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Upload de Arquivo */}
          <div>
            <Label>Arquivo *</Label>
            {!arquivo ? (
              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-semibold">Clique para fazer upload</span> ou arraste o arquivo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, XLS, XLSX (máx. 20MB)
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                </label>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{arquivo.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(arquivo.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Tipo de Documento */}
          <div>
            <Label htmlFor="tipo">Tipo de Documento *</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value) => handleInputChange("tipo", value)}
            >
              <SelectTrigger id="tipo" className="mt-2">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="catalogo">Catálogo</SelectItem>
                <SelectItem value="manual">POP/IFU/Manual de Operação</SelectItem>
                <SelectItem value="artigo">Artigos / Evidências científicas</SelectItem>
                <SelectItem value="ficha_tecnica">Ficha Técnica (PDF/HTML)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div>
            <Label htmlFor="titulo">Título do Documento *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              placeholder="Ex: Manual do Usuário DxH 520"
              className="mt-2"
              maxLength={200}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Versão */}
            <div>
              <Label htmlFor="versao">Versão *</Label>
              <Input
                id="versao"
                value={formData.versao}
                onChange={(e) => handleInputChange("versao", e.target.value)}
                placeholder="Ex: 1.0, 2.1"
                className="mt-2"
                maxLength={20}
              />
            </div>

            {/* Idioma */}
            <div>
              <Label htmlFor="idioma">Idioma *</Label>
              <Select
                value={formData.idioma}
                onValueChange={(value) => handleInputChange("idioma", value)}
              >
                <SelectTrigger id="idioma" className="mt-2">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT-BR">Português (BR)</SelectItem>
                  <SelectItem value="EN">English</SelectItem>
                  <SelectItem value="ES">Español</SelectItem>
                  <SelectItem value="FR">Français</SelectItem>
                  <SelectItem value="DE">Deutsch</SelectItem>
                  <SelectItem value="IT">Italiano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Upload className="h-4 w-4 mr-2" />
            Fazer Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
