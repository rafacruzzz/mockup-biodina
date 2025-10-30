import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FileText, X, Upload, Eye, Edit2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AnexoItem {
  id: string;
  nomePersonalizado: string;
  nomeOriginal: string;
  arquivo: File;
  dataUpload: Date;
  tamanho: number;
  tipo: string;
}

interface AnexosFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const AnexosForm = ({ formData, onInputChange }: AnexosFormProps) => {
  const [anexos, setAnexos] = useState<AnexoItem[]>([]);
  const [showNomeDialog, setShowNomeDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nomePersonalizado, setNomePersonalizado] = useState('');
  const [editingAnexo, setEditingAnexo] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState('');

  const handleAdicionarAnexo = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
        setNomePersonalizado(file.name.split('.')[0]); // Nome sem extensão como sugestão
        setShowNomeDialog(true);
      }
    };
    input.click();
  };

  const confirmarAnexo = () => {
    if (selectedFile && nomePersonalizado.trim()) {
      const novoAnexo: AnexoItem = {
        id: Date.now().toString(),
        nomePersonalizado: nomePersonalizado.trim(),
        nomeOriginal: selectedFile.name,
        arquivo: selectedFile,
        dataUpload: new Date(),
        tamanho: selectedFile.size,
        tipo: selectedFile.type || 'application/octet-stream'
      };

      const novosAnexos = [...anexos, novoAnexo];
      setAnexos(novosAnexos);
      onInputChange('anexos', novosAnexos);
      
      // Reset
      setShowNomeDialog(false);
      setSelectedFile(null);
      setNomePersonalizado('');

      console.log('Anexo adicionado:', novoAnexo.nomePersonalizado);
    }
  };

  const handleRemoverAnexo = (id: string) => {
    const novosAnexos = anexos.filter(anexo => anexo.id !== id);
    setAnexos(novosAnexos);
    onInputChange('anexos', novosAnexos);
  };

  const handleEditarNome = (id: string) => {
    const anexo = anexos.find(a => a.id === id);
    if (anexo) {
      setEditingAnexo(id);
      setNovoNome(anexo.nomePersonalizado);
    }
  };

  const confirmarEdicao = (id: string) => {
    if (novoNome.trim()) {
      const novosAnexos = anexos.map(anexo => 
        anexo.id === id 
          ? { ...anexo, nomePersonalizado: novoNome.trim() }
          : anexo
      );
      setAnexos(novosAnexos);
      onInputChange('anexos', novosAnexos);
    }
    setEditingAnexo(null);
    setNovoNome('');
  };

  const formatarTamanhoArquivo = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatarTipoArquivo = (tipo: string) => {
    const tiposComuns: Record<string, string> = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
      'application/vnd.ms-excel': 'XLS',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
      'text/plain': 'TXT',
      'image/jpeg': 'JPG',
      'image/png': 'PNG',
      'image/gif': 'GIF'
    };
    return tiposComuns[tipo] || tipo.split('/')[1]?.toUpperCase() || 'ARQUIVO';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerenciar Anexos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Button 
              onClick={handleAdicionarAnexo}
              className="w-48 gap-2"
            >
              <Upload className="h-4 w-4" />
              Adicionar Anexo
            </Button>
          </div>
          
          {anexos.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-4">Histórico de Anexos ({anexos.length})</h4>
              <div className="space-y-3">
                {anexos.map((anexo) => (
                  <div
                    key={anexo.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        {editingAnexo === anexo.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={novoNome}
                              onChange={(e) => setNovoNome(e.target.value)}
                              className="flex-1"
                              placeholder="Digite o novo nome"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => confirmarEdicao(anexo.id)}
                              disabled={!novoNome.trim()}
                            >
                              Salvar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setEditingAnexo(null)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {anexo.nomePersonalizado}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {anexo.nomeOriginal}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                              <span>{formatarTipoArquivo(anexo.tipo)}</span>
                              <span>{formatarTamanhoArquivo(anexo.tamanho)}</span>
                              <span>{anexo.dataUpload.toLocaleDateString('pt-BR')} às {anexo.dataUpload.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {editingAnexo !== anexo.id && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditarNome(anexo.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoverAnexo(anexo.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {anexos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Nenhum anexo foi adicionado ainda</p>
              <p className="text-sm">Clique em "Adicionar Anexo" para começar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para nomear arquivo */}
      <Dialog open={showNomeDialog} onOpenChange={setShowNomeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nomear Anexo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="arquivo-original">Arquivo selecionado:</Label>
              <p className="text-sm text-gray-600 mt-1">{selectedFile?.name}</p>
            </div>
            <div>
              <Label htmlFor="nome-personalizado">Nome personalizado:</Label>
              <Input
                id="nome-personalizado"
                value={nomePersonalizado}
                onChange={(e) => setNomePersonalizado(e.target.value)}
                placeholder="Digite um nome para identificar este anexo"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNomeDialog(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={confirmarAnexo}
                disabled={!nomePersonalizado.trim()}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};