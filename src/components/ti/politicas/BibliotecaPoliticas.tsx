import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Folder, 
  FileText, 
  Download, 
  Eye, 
  ChevronRight,
  FolderOpen,
  Shield,
  Database,
  Settings,
  BookOpen,
  KeyRound
} from "lucide-react";
import { tiModules } from "@/data/tiModules";

const BibliotecaPoliticas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('seguranca');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Dados das políticas do módulo
  const politicasData = tiModules.politicas.subModules.biblioteca.data || [];

  const pastas = [
    {
      id: 'seguranca',
      nome: '01. Políticas de Segurança da Informação',
      icon: Shield,
      cor: 'text-red-600',
      documentos: politicasData.filter((p: any) => p.categoria === 'seguranca')
    },
    {
      id: 'backup',
      nome: '02. Políticas de Backup e Recuperação',
      icon: Database,
      cor: 'text-blue-600',
      documentos: politicasData.filter((p: any) => p.categoria === 'backup')
    },
    {
      id: 'equipamentos',
      nome: '03. Procedimentos de Solicitação de Equipamentos',
      icon: Settings,
      cor: 'text-green-600',
      documentos: politicasData.filter((p: any) => p.categoria === 'equipamentos')
    },
    {
      id: 'boas_praticas',
      nome: '04. Guias de Boas Práticas',
      icon: BookOpen,
      cor: 'text-purple-600',
      documentos: politicasData.filter((p: any) => p.categoria === 'boas_praticas')
    },
    {
      id: 'senhas',
      nome: '05. Repositório de Documentos de Senhas',
      icon: KeyRound,
      cor: 'text-orange-600',
      documentos: politicasData.filter((p: any) => p.categoria === 'senhas')
    }
  ];

  const pastaAtiva = pastas.find(p => p.id === selectedFolder);
  
  const documentosFiltrados = pastaAtiva?.documentos.filter((doc: any) =>
    doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'revisao':
        return <Badge className="bg-yellow-100 text-yellow-800">Em Revisão</Badge>;
      case 'obsoleto':
        return <Badge className="bg-red-100 text-red-800">Obsoleto</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDocumentSelect = (documento: any) => {
    setSelectedDocument(documento);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Biblioteca de Políticas e Procedimentos de TI
          </CardTitle>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar em políticas e procedimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Layout de duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda - Navegação em pastas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Estrutura de Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pastas.map((pasta) => (
                <div key={pasta.id}>
                  <button
                    onClick={() => setSelectedFolder(pasta.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all hover:bg-gray-50 ${
                      selectedFolder === pasta.id ? 'bg-primary/10 border border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedFolder === pasta.id ? (
                        <FolderOpen className={`h-4 w-4 ${pasta.cor}`} />
                      ) : (
                        <Folder className={`h-4 w-4 ${pasta.cor}`} />
                      )}
                      <pasta.icon className={`h-4 w-4 ${pasta.cor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{pasta.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {pasta.documentos.length} documento(s)
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Estatísticas rápidas */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total de documentos:</span>
                <span className="font-medium">{politicasData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Documentos ativos:</span>
                <span className="font-medium text-green-600">
                  {politicasData.filter((p: any) => p.status === 'ativo').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Em revisão:</span>
                <span className="font-medium text-yellow-600">
                  {politicasData.filter((p: any) => p.status === 'revisao').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coluna direita - Visualizador de conteúdo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {pastaAtiva?.icon && (() => {
                    const IconComponent = pastaAtiva.icon;
                    return <IconComponent className={`h-5 w-5 ${pastaAtiva.cor}`} />;
                  })()}
                  {pastaAtiva?.nome}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {documentosFiltrados.length} documento(s) encontrado(s)
                </p>
              </div>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Novo Documento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDocument ? (
              /* Visualizador de documento */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedDocument(null)}
                  >
                    ← Voltar à lista
                  </Button>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedDocument.nome}</h3>
                    <p className="text-muted-foreground">{selectedDocument.descricao}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Versão:</span>
                      <p className="font-medium">{selectedDocument.versao}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <div className="mt-1">
                        {getStatusBadge(selectedDocument.status)}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Responsável:</span>
                      <p className="font-medium">{selectedDocument.responsavel}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Última revisão:</span>
                      <p className="font-medium">{formatDate(selectedDocument.dataUltimaRevisao)}</p>
                    </div>
                  </div>

                  {/* Área de visualização do PDF */}
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="font-medium mb-2">Visualizador de PDF</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      O documento "{selectedDocument.arquivo}" seria exibido aqui.
                    </p>
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      Abrir Documento
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Lista de documentos */
              <div className="space-y-3">
                {documentosFiltrados.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-muted-foreground">
                      {searchTerm ? 
                        "Nenhum documento encontrado com os termos de busca." :
                        "Nenhum documento disponível nesta pasta."
                      }
                    </p>
                  </div>
                ) : (
                  documentosFiltrados.map((documento: any) => (
                    <div
                      key={documento.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleDocumentSelect(documento)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h4 className="font-medium">{documento.nome}</h4>
                            {getStatusBadge(documento.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {documento.descricao}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Versão {documento.versao}</span>
                            <span>•</span>
                            <span>Atualizado em {formatDate(documento.dataUltimaRevisao)}</span>
                            <span>•</span>
                            <span>{documento.responsavel}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BibliotecaPoliticas;