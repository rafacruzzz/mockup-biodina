
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Trash2, Eye } from "lucide-react";
import { DocumentoAnexo, Documentacao } from "@/types/colaborador";

interface DocumentacaoTabProps {
  formData: Documentacao;
  onInputChange: (field: string, value: any) => void;
}

const DocumentacaoTab = ({ formData, onInputChange }: DocumentacaoTabProps) => {
  const [novoDocumento, setNovoDocumento] = useState<Partial<DocumentoAnexo>>({
    categoria: '',
    observacoes: ''
  });

  const categorias = [
    'RG',
    'CPF',
    'Carteira de Trabalho',
    'Comprovante de Residência',
    'Diploma/Certificado',
    'Exames Médicos',
    'Declaração de Imposto de Renda',
    'Comprovante de Escolaridade',
    'Certidão de Nascimento/Casamento',
    'Outros'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('Arquivo muito grande. O tamanho máximo é 10MB.');
      return;
    }

    const documento: DocumentoAnexo = {
      id: Date.now().toString(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString().split('T')[0],
      categoria: novoDocumento.categoria || 'Outros',
      observacoes: novoDocumento.observacoes || '',
      arquivo: file
    };

    const novosAnexos = [...formData.anexos, documento];
    onInputChange('anexos', novosAnexos);

    // Reset form
    setNovoDocumento({ categoria: '', observacoes: '' });
    event.target.value = '';
  };

  const removeDocumento = (id: string) => {
    const novosAnexos = formData.anexos.filter(doc => doc.id !== id);
    onInputChange('anexos', novosAnexos);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (tipo: string) => {
    if (tipo.includes('image')) return '🖼️';
    if (tipo.includes('pdf')) return '📄';
    if (tipo.includes('word')) return '📝';
    if (tipo.includes('excel') || tipo.includes('spreadsheet')) return '📊';
    return '📎';
  };

  return (
    <div className="space-y-6">
      {/* Upload de novo documento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Adicionar Documento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoria">Categoria *</Label>
              <Select 
                value={novoDocumento.categoria} 
                onValueChange={(value) => setNovoDocumento(prev => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="arquivo">Arquivo *</Label>
              <Input
                id="arquivo"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xls,.xlsx"
                disabled={!novoDocumento.categoria}
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos aceitos: PDF, DOC, DOCX, JPG, PNG, GIF, XLS, XLSX. Máximo: 10MB
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={novoDocumento.observacoes}
              onChange={(e) => setNovoDocumento(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações sobre o documento (opcional)"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos Anexados ({formData.anexos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.anexos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum documento anexado</p>
              <p className="text-sm">Adicione documentos usando o formulário acima</p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.anexos.map((documento) => (
                <div key={documento.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{getFileIcon(documento.tipo)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{documento.nome}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {documento.categoria}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>{formatFileSize(documento.tamanho)}</span>
                        <span>Adicionado em {new Date(documento.dataUpload).toLocaleDateString()}</span>
                      </div>
                      {documento.observacoes && (
                        <p className="text-xs text-gray-600 mt-1">{documento.observacoes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (documento.arquivo) {
                          const url = URL.createObjectURL(documento.arquivo);
                          window.open(url, '_blank');
                        }
                      }}
                      disabled={!documento.arquivo}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (documento.arquivo) {
                          const url = URL.createObjectURL(documento.arquivo);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = documento.nome;
                          a.click();
                        }
                      }}
                      disabled={!documento.arquivo}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocumento(documento.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo */}
      {formData.anexos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo dos Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categorias.map((categoria) => {
                const count = formData.anexos.filter(doc => doc.categoria === categoria).length;
                return count > 0 ? (
                  <div key={categoria} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-lg">{count}</p>
                    <p className="text-xs text-gray-600">{categoria}</p>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentacaoTab;
