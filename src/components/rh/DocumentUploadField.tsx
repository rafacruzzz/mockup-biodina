
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Trash2, Eye } from "lucide-react";
import { DocumentoAnexo } from "@/types/colaborador";

interface DocumentUploadFieldProps {
  label: string;
  documento?: DocumentoAnexo;
  onUpload: (file: File) => void;
  onRemove: () => void;
  accept?: string;
  required?: boolean;
  maxSize?: number; // in MB
  origem?: 'admissao' | 'manual';
}

const DocumentUploadField = ({
  label,
  documento,
  onUpload,
  onRemove,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  required = false,
  maxSize = 10,
  origem
}: DocumentUploadFieldProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {documento ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{documento.nome}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{formatFileSize(documento.tamanho)}</p>
                    {origem && (
                      <Badge variant={origem === 'admissao' ? 'default' : 'secondary'} className="text-xs">
                        {origem === 'admissao' ? 'Da Admissão' : 'Manual'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
                <Button variant="outline" size="sm" onClick={onRemove} className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-8 text-center">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Clique para selecionar ou arraste o arquivo aqui
            </p>
            <p className="text-xs text-gray-400">
              Formatos aceitos: PDF, DOC, DOCX, JPG, PNG (máx. {maxSize}MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileInputChange}
              className="hidden"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUploadField;
