import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  Shield,
  Calendar,
  AlertTriangle,
  File,
  Users
} from 'lucide-react';
import { mockDocumentosImportantes } from '@/data/tesouraria';

export const GestaoDocumentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [filterAcesso, setFilterAcesso] = useState('');

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Contrato': return 'bg-blue-500';
      case 'Estatuto': return 'bg-purple-500';
      case 'Certidão': return 'bg-green-500';
      case 'Balanço': return 'bg-orange-500';
      case 'Ata': return 'bg-cyan-500';
      case 'Procuração': return 'bg-pink-500';
      case 'Outros': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'Contrato': return <FileText className="h-4 w-4" />;
      case 'Estatuto': return <Shield className="h-4 w-4" />;
      case 'Certidão': return <Shield className="h-4 w-4" />;
      case 'Balanço': return <FileText className="h-4 w-4" />;
      case 'Ata': return <File className="h-4 w-4" />;
      case 'Procuração': return <Users className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const isDocumentoVencendo = (documento: any) => {
    if (!documento.dataValidade) return false;
    const hoje = new Date();
    const vencimento = new Date(documento.dataValidade);
    const diasParaVencer = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diasParaVencer <= 30 && diasParaVencer >= 0;
  };

  const isDocumentoVencido = (documento: any) => {
    if (!documento.dataValidade) return false;
    const hoje = new Date();
    const vencimento = new Date(documento.dataValidade);
    return vencimento < hoje;
  };

  const filteredData = mockDocumentosImportantes.filter(item => {
    const matchesSearch = item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategoria = !filterCategoria || item.categoria === filterCategoria;
    const matchesAcesso = !filterAcesso || item.niveisAcesso.includes(filterAcesso as any);
    return matchesSearch && matchesCategoria && matchesAcesso;
  });

  // Estatísticas
  const totalDocumentos = mockDocumentosImportantes.length;
  const documentosVencendo = mockDocumentosImportantes.filter(isDocumentoVencendo).length;
  const documentosVencidos = mockDocumentosImportantes.filter(isDocumentoVencido).length;
  const categorias = [...new Set(mockDocumentosImportantes.map(d => d.categoria))];
  const niveisAcesso = ['Diretoria', 'Financeiro', 'Contabilidade', 'Jurídico', 'Todos'];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documentos</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalDocumentos}</div>
            <p className="text-xs text-muted-foreground">documentos arquivados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{documentosVencendo}</div>
            <p className="text-xs text-muted-foreground">próximos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{documentosVencidos}</div>
            <p className="text-xs text-muted-foreground">necessitam renovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categorias.length}</div>
            <p className="text-xs text-muted-foreground">tipos diferentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, descrição ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategoria} onValueChange={setFilterCategoria}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {categorias.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterAcesso} onValueChange={setFilterAcesso}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Nível Acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {niveisAcesso.map(nivel => (
                  <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Documentos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documentos Importantes</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Lista
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Versão</TableHead>
                <TableHead>Data Documento</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Níveis Acesso</TableHead>
                <TableHead>Responsável Upload</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Nenhum documento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((documento) => (
                  <TableRow key={documento.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{documento.titulo}</div>
                        {documento.descricao && (
                          <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                            {documento.descricao}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {documento.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {documento.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{documento.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`${getCategoriaColor(documento.categoria)} text-white flex items-center gap-1 w-fit`}
                      >
                        {getCategoriaIcon(documento.categoria)}
                        {documento.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      v{documento.versao}
                    </TableCell>
                    <TableCell>
                      {new Date(documento.dataDocumento).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      {documento.dataValidade ? (
                        <div className="flex items-center gap-2">
                          {isDocumentoVencido(documento) ? (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          ) : isDocumentoVencendo(documento) ? (
                            <Calendar className="h-4 w-4 text-yellow-500" />
                          ) : null}
                          <span className={
                            isDocumentoVencido(documento) ? 'text-red-600 font-semibold' :
                            isDocumentoVencendo(documento) ? 'text-yellow-600 font-semibold' : ''
                          }>
                            {new Date(documento.dataValidade).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Sem validade</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {documento.niveisAcesso.slice(0, 2).map(nivel => (
                          <Badge key={nivel} variant="outline" className="text-xs">
                            {nivel}
                          </Badge>
                        ))}
                        {documento.niveisAcesso.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{documento.niveisAcesso.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {documento.responsavelUpload}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};