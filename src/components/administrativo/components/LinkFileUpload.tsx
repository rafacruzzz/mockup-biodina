import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface LinkFileUploadProps {
  id: string;
  label: string;
  linkValue: string;
  onLinkChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  uploadedFile?: File | null;
  placeholder?: string;
}

export const LinkFileUpload = ({ 
  id, 
  label, 
  linkValue, 
  onLinkChange, 
  onFileChange, 
  uploadedFile,
  placeholder 
}: LinkFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatarTamanhoArquivo = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamanho (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    onFileChange(file);
    toast.success('Arquivo anexado com sucesso!');
    
    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoverArquivo = () => {
    onFileChange(null);
    toast.success('Arquivo removido');
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={id}>{label}</Label>
      
      {/* Campo de Link */}
      <Input 
        id={id}
        value={linkValue}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder={placeholder || "Cole aqui o link"}
      />
      
      {/* Área de Upload */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-muted-foreground">Ou anexar arquivo:</div>
        
        {!uploadedFile ? (
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Anexar Arquivo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="*/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 border border-green-200 bg-green-50 rounded">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-green-600">
                  {formatarTamanhoArquivo(uploadedFile.size)}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoverArquivo}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="*/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};