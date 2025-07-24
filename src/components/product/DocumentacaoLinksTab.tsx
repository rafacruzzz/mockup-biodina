
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ExternalLink, Upload, Download, FileText, Edit, Trash2 } from "lucide-react";
import { ProductTabProps } from "@/types/product";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const DocumentacaoLinksTab = ({ formData, onInputChange }: ProductTabProps) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [linkForm, setLinkForm] = useState({
    titulo: "",
    url: "",
    tipo: "Manual" as "Treinamento" | "Manual" | "Especificação" | "Outro",
    versao: ""
  });

  const [fileForm, setFileForm] = useState({
    nomeArquivo: "",
    arquivo: null as File | null,
    versao: "",
    observacoes: ""
  });

  const tiposLink = ["Treinamento", "Manual", "Especificação", "Outro"];

  const handleSaveLink = () => {
    if (!linkForm.titulo.trim() || !linkForm.url.trim()) return;

    const novoLink = {
      id: editingLink ? editingLink.id : Date.now().toString(),
      titulo: linkForm.titulo,
      url: linkForm.url,
      tipo: linkForm.tipo,
      dataUpload: editingLink ? editingLink.dataUpload : new Date(),
      versao: linkForm.versao
    };

    let novosLinks;
    if (editingLink) {
      novosLinks = formData.documentacaoLinks.linksDocumentacao.map(link => 
        link.id === editingLink.id ? novoLink : link
      );
    } else {
      novosLinks = [...formData.documentacaoLinks.linksDocumentacao, novoLink];
    }

    onInputChange('documentacaoLinks', {
      ...formData.documentacaoLinks,
      linksDocumentacao: novosLinks
    });

    setLinkForm({ titulo: "", url: "", tipo: "Manual", versao: "" });
    setEditingLink(null);
    setIsLinkModalOpen(false);
  };

  const handleDeleteLink = (linkId: string) => {
    const novosLinks = formData.documentacaoLinks.linksDocumentacao.filter(link => link.id !== linkId);
    onInputChange('documentacaoLinks', {
      ...formData.documentacaoLinks,
      linksDocumentacao: novosLinks
    });
  };

  const handleEditLink = (link: any) => {
    setEditingLink(link);
    setLinkForm({
      titulo: link.titulo,
      url: link.url,
      tipo: link.tipo,
      versao: link.versao || ""
    });
    setIsLinkModalOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileForm(prev => ({
        ...prev,
        arquivo: file,
        nomeArquivo: file.name
      }));
    }
  };

  const handleSaveFile = () => {
    if (!fileForm.arquivo || !fileForm.versao.trim()) return;

    const novoArquivo = {
      id: Date.now().toString(),
      nomeArquivo: fileForm.nomeArquivo,
      arquivo: fileForm.arquivo,
      tipo: fileForm.arquivo.type,
      tamanho: fileForm.arquivo.size,
      dataUpload: new Date(),
      versao: fileForm.versao,
      observacoes: fileForm.observacoes
    };

    const novosArquivos = [...formData.documentacaoLinks.arquivosLocais, novoArquivo];
    onInputChange('documentacaoLinks', {
      ...formData.documentacaoLinks,
      arquivosLocais: novosArquivos
    });

    setFileForm({ nomeArquivo: "", arquivo: null, versao: "", observacoes: "" });
  };

  const handleDeleteFile = (fileId: string) => {
    const novosArquivos = formData.documentacaoLinks.arquivosLocais.filter(arquivo => arquivo.id !== fileId);
    onInputChange('documentacaoLinks', {
      ...formData.documentacaoLinks,
      arquivosLocais: novosArquivos
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      "Treinamento": "bg-blue-100 text-blue-800",
      "Manual": "bg-green-100 text-green-800", 
      "Especificação": "bg-purple-100 text-purple-800",
      "Outro": "bg-gray-100 text-gray-800"
    };
    return colors[tipo] || colors["Outro"];
  };

  return (
    <div className="space-y-6">
      {/* Card Links de Documentação */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-biodina-blue">🔗 Links de Documentação</CardTitle>
            <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingLink ? "Editar Link" : "Adicionar Link de Documentação"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkTitulo">Título *</Label>
                    <Input
                      id="linkTitulo"
                      value={linkForm.titulo}
                      onChange={(e) => setLinkForm(prev => ({ ...prev, titulo: e.target.value }))}
                      placeholder="Ex: Manual de Instruções v2.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkUrl">URL *</Label>
                    <Input
                      id="linkUrl"
                      value={linkForm.url}
                      onChange={(e) => setLinkForm(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkTipo">Tipo</Label>
                      <Select 
                        value={linkForm.tipo} 
                        onValueChange={(value: any) => setLinkForm(prev => ({ ...prev, tipo: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposLink.map(tipo => (
                            <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkVersao">Versão</Label>
                      <Input
                        id="linkVersao"
                        value={linkForm.versao}
                        onChange={(e) => setLinkForm(prev => ({ ...prev, versao: e.target.value }))}
                        placeholder="Ex: v1.0"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveLink}>
                      {editingLink ? "Salvar" : "Adicionar"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {formData.documentacaoLinks.linksDocumentacao.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Data Upload</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.documentacaoLinks.linksDocumentacao.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.titulo}</TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(link.tipo)}>
                        {link.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>{link.versao || "-"}</TableCell>
                    <TableCell>{format(link.dataUpload, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLink(link)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum link de documentação adicionado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card Arquivos Locais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue">📁 Arquivos Locais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Área de Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Label
                    htmlFor="fileUpload"
                    className="cursor-pointer bg-biodina-gold hover:bg-biodina-gold/90 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                  >
                    Selecionar Arquivo
                  </Label>
                </div>
                
                {fileForm.arquivo && (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="text-sm text-gray-600">
                      Arquivo selecionado: <strong>{fileForm.nomeArquivo}</strong>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fileVersao">Versão *</Label>
                        <Input
                          id="fileVersao"
                          value={fileForm.versao}
                          onChange={(e) => setFileForm(prev => ({ ...prev, versao: e.target.value }))}
                          placeholder="Ex: v1.0"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={handleSaveFile} className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fileObservacoes">Observações</Label>
                      <Textarea
                        id="fileObservacoes"
                        value={fileForm.observacoes}
                        onChange={(e) => setFileForm(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Observações sobre o arquivo..."
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lista de Arquivos */}
          {formData.documentacaoLinks.arquivosLocais.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Arquivo</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Data Upload</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.documentacaoLinks.arquivosLocais.map((arquivo) => (
                  <TableRow key={arquivo.id}>
                    <TableCell className="font-medium">{arquivo.nomeArquivo}</TableCell>
                    <TableCell>{formatFileSize(arquivo.tamanho)}</TableCell>
                    <TableCell>{arquivo.versao}</TableCell>
                    <TableCell>{format(arquivo.dataUpload, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                    <TableCell className="max-w-xs truncate" title={arquivo.observacoes}>
                      {arquivo.observacoes || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Simular download - em implementação real, seria um endpoint
                            console.log("Download do arquivo:", arquivo.nomeArquivo);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(arquivo.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentacaoLinksTab;
