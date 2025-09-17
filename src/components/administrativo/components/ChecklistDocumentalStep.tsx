import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, FileText, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Document {
  id: string;
  nome: string;
  status: string;
  dataVencimento: string;
  anexo?: string;
  observacoes: string;
}

interface ChecklistDocumentalStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const ChecklistDocumentalStep = ({ data, onChange }: ChecklistDocumentalStepProps) => {
  const [documents, setDocuments] = useState<Document[]>(data.documents || []);

  const statusOptions = [
    { value: "OK", label: "OK", color: "bg-green-500" },
    { value: "Pendente", label: "Pendente", color: "bg-yellow-500" },
    { value: "Não Aplicável", label: "Não Aplicável", color: "bg-gray-500" },
    { value: "Recebido", label: "Recebido", color: "bg-blue-500" },
    { value: "Vencido", label: "Vencido", color: "bg-red-500" }
  ];

  const addDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      nome: "",
      status: "Pendente",
      dataVencimento: "",
      observacoes: ""
    };
    const updatedDocs = [...documents, newDoc];
    setDocuments(updatedDocs);
    onChange({ ...data, documents: updatedDocs });
  };

  const removeDocument = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    onChange({ ...data, documents: updatedDocs });
  };

  const updateDocument = (id: string, field: string, value: string) => {
    const updatedDocs = documents.map(doc =>
      doc.id === id ? { ...doc, [field]: value } : doc
    );
    setDocuments(updatedDocs);
    onChange({ ...data, documents: updatedDocs });
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || "bg-gray-500";
  };

  const predefinedDocuments = [
    "Licença de Funcionamento",
    "Certificado de Boas Práticas de Fabricação (CBPF)",
    "Autorização de Funcionamento de Empresa (AFE)",
    "Registro do Produto na ANVISA",
    "Certificado ISO 13485",
    "Declaração de Conformidade CE",
    "Manual do Usuário",
    "Certificado de Calibração",
    "Laudo de Análise Técnica",
    "Especificações Técnicas do Produto",
    "Certificado de Origem",
    "Apólice de Seguro",
    "Contrato Social da Empresa",
    "Balanço Patrimonial",
    "Certidões Negativas (Federal, Estadual, Municipal)"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Checklist Documental Regulatório</CardTitle>
            <Button onClick={addDocument} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Documento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Adicione e gerencie todos os documentos necessários para a análise regulatória do fornecedor.
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhum documento adicionado ainda</p>
              <p className="text-sm">Clique em "Adicionar Documento" para começar</p>
            </div>
          ) : (
            <div className="space-y-6">
              {documents.map((doc, index) => (
                <Card key={doc.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          Documento #{index + 1}
                        </span>
                        <Badge className={getStatusColor(doc.status) + " text-white"}>
                          {doc.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`nome-${doc.id}`}>Nome do Documento *</Label>
                        <Select 
                          value={doc.nome} 
                          onValueChange={(value) => updateDocument(doc.id, 'nome', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione ou digite o documento" />
                          </SelectTrigger>
                          <SelectContent>
                            {predefinedDocuments.map((docName) => (
                              <SelectItem key={docName} value={docName}>
                                {docName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {!predefinedDocuments.includes(doc.nome) && (
                          <Input
                            className="mt-2"
                            placeholder="Digite o nome do documento"
                            value={doc.nome}
                            onChange={(e) => updateDocument(doc.id, 'nome', e.target.value)}
                          />
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`status-${doc.id}`}>Status *</Label>
                        <Select 
                          value={doc.status} 
                          onValueChange={(value) => updateDocument(doc.id, 'status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${option.color}`} />
                                  {option.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`dataVencimento-${doc.id}`}>Data de Vencimento</Label>
                      <Input
                        id={`dataVencimento-${doc.id}`}
                        type="date"
                        value={doc.dataVencimento}
                        onChange={(e) => updateDocument(doc.id, 'dataVencimento', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`anexo-${doc.id}`}>Anexo do Documento</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            Clique para fazer upload
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOCX, DOC até 10MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <FileText className="mr-2 h-4 w-4" />
                          Selecionar
                        </Button>
                      </div>
                      {doc.anexo && (
                        <div className="mt-2 text-sm text-green-600">
                          ✓ Arquivo anexado: {doc.anexo}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`observacoes-${doc.id}`}>Observações</Label>
                      <Textarea
                        id={`observacoes-${doc.id}`}
                        value={doc.observacoes}
                        onChange={(e) => updateDocument(doc.id, 'observacoes', e.target.value)}
                        placeholder="Observações sobre o documento..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumo do Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {statusOptions.map((status) => {
                const count = documents.filter(doc => doc.status === status.value).length;
                return (
                  <div key={status.value} className="text-center">
                    <div className={`w-8 h-8 rounded-full ${status.color} mx-auto mb-2 flex items-center justify-center text-white font-semibold`}>
                      {count}
                    </div>
                    <p className="text-sm font-medium">{status.label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};