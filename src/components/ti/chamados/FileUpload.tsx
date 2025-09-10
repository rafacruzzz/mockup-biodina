import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFilesChange: (files: FileInfo[]) => void;
  maxFiles?: number;
  maxSizeBytes?: number;
  acceptedTypes?: string[];
}

interface FileInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  url?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = 5,
  maxSizeBytes = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/png', 'image/jpeg', 'application/pdf']
}) => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Tipo de arquivo não permitido. Aceitos: ${acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`;
    }
    
    if (file.size > maxSizeBytes) {
      return `Arquivo muito grande. Tamanho máximo: ${formatFileSize(maxSizeBytes)}`;
    }

    return null;
  };

  const simulateUpload = (fileInfo: FileInfo): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          const updatedFile: FileInfo = {
            ...fileInfo,
            status: 'completed',
            progress: 100,
            url: `mock://upload/${fileInfo.id}`
          };
          
          setFiles(prev => {
            const updated = prev.map(f => f.id === fileInfo.id ? updatedFile : f);
            onFilesChange(updated);
            return updated;
          });
          
          resolve();
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileInfo.id ? { ...f, progress } : f
          ));
        }
      }, 100);
    });
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    
    if (files.length + newFiles.length > maxFiles) {
      toast({
        title: "Muitos arquivos",
        description: `Máximo de ${maxFiles} arquivos permitido`,
        variant: "destructive"
      });
      return;
    }

    newFiles.forEach(file => {
      const validationError = validateFile(file);
      
      if (validationError) {
        toast({
          title: "Arquivo inválido",
          description: `${file.name}: ${validationError}`,
          variant: "destructive"
        });
        return;
      }

      const fileInfo: FileInfo = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setFiles(prev => [...prev, fileInfo]);
      
      // Simular upload
      setTimeout(() => {
        simulateUpload(fileInfo);
      }, 500);
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      onFilesChange(updated);
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <File className="h-4 w-4 text-blue-500" />;
    }
    if (type === 'application/pdf') {
      return <File className="h-4 w-4 text-red-500" />;
    }
    return <File className="h-4 w-4 text-gray-500" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">
          Clique para fazer upload ou arraste arquivos aqui
        </p>
        <p className="text-xs text-gray-400 mb-3">
          PNG, JPG, PDF até {formatFileSize(maxSizeBytes)} • Máximo {maxFiles} arquivos
        </p>
        <Button 
          type="button"
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
        >
          Selecionar Arquivos
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Arquivos ({files.length})</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {getFileIcon(file.type)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(file.status)}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>
                      {file.status === 'completed' && 'Concluído'}
                      {file.status === 'uploading' && `${Math.round(file.progress)}%`}
                      {file.status === 'error' && 'Erro'}
                    </span>
                  </div>
                  
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} className="h-1 mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;