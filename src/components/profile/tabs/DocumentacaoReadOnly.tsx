
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Edit3, AlertCircle } from 'lucide-react';
import { DocumentoAnexo, Documentacao } from '@/types/colaborador';
import SolicitacaoAlteracaoModal from '../SolicitacaoAlteracaoModal';

interface DocumentacaoReadOnlyProps {
  data: Documentacao;
}

const DocumentacaoReadOnly = ({ data }: DocumentacaoReadOnlyProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSolicitarAlteracao = (campo: string, valor: string) => {
    setSelectedField(campo);
    setSelectedValue(valor);
    setModalOpen(true);
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

  const categorias = [
    'RG', 'CPF', 'Carteira de Trabalho', 'Comprovante de Residência',
    'Diploma/Certificado', 'Exames Médicos', 'Declaração de Imposto de Renda',
    'Comprovante de Escolaridade', 'Certidão de Nascimento/Casamento', 'Outros'
  ];

  return (
    <div className="space-y-6">
      {/* Lista de documentos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos Anexados ({data.anexos.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSolicitarAlteracao('Documentos', 'Anexar ou atualizar documentos')}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Solicitar Anexo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {data.anexos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum documento anexado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.anexos.map((documento) => (
                <div key={documento.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
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
                      disabled
                      className="opacity-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      className="opacity-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSolicitarAlteracao(`Documento: ${documento.nome}`, documento.categoria)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo */}
      {data.anexos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo dos Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categorias.map((categoria) => {
                const count = data.anexos.filter(doc => doc.categoria === categoria).length;
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

      {/* Aviso sobre documentos */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Documentos Necessários</h3>
              <p className="text-sm text-blue-700">
                Precisa anexar ou atualizar algum documento? Solicite ao RH o upload de novos arquivos.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSolicitarAlteracao('Documentação', 'Solicitação de upload de documentos')}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Solicitar Upload
          </Button>
        </div>
      </div>

      {/* Aviso sobre visualização */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-yellow-600" />
          <h3 className="font-semibold text-yellow-800">Informação</h3>
        </div>
        <p className="text-sm text-yellow-700">
          Esta é uma visualização dos seus documentos. Para alterações ou atualizações, entre em contato com o setor de Recursos Humanos.
        </p>
      </div>

      <SolicitacaoAlteracaoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        campoSelecionado={selectedField}
        valorAtual={selectedValue}
        aba="Documentação"
      />
    </div>
  );
};

export default DocumentacaoReadOnly;
