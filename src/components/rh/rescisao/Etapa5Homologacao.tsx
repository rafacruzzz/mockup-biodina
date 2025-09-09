import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Check, X, FileText } from 'lucide-react';
import { Etapa5Homologacao as Etapa5Type, DocumentoHomologacao } from '@/types/rescisao';

interface Props {
  dados: Etapa5Type;
  onSave: (dados: Partial<Etapa5Type>) => void;
  onNext: () => void;
}

export function Etapa5Homologacao({ dados, onSave, onNext }: Props) {
  const [formData, setFormData] = useState<Etapa5Type>(dados);

  const handleSave = () => {
    onSave(formData);
    onNext();
  };

  const updateDocumento = (index: number, field: keyof DocumentoHomologacao, value: any) => {
    const novosDocumentos = [...formData.documentos];
    novosDocumentos[index] = { ...novosDocumentos[index], [field]: value };
    setFormData(prev => ({ ...prev, documentos: novosDocumentos }));
  };

  const handleFileUpload = (index: number, file: File) => {
    updateDocumento(index, 'arquivo', file);
    updateDocumento(index, 'anexado', true);
  };

  const updateField = (field: keyof Etapa5Type, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">5. Homologação</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Checklist de Documentos Assinados */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Checklist de Documentos Assinados</Label>
            <p className="text-sm text-muted-foreground">
              Anexe cada documento conforme for sendo assinado e disponibilizado.
            </p>

            <div className="space-y-3">
              {formData.documentos.map((doc, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{doc.nome}</span>
                      <Badge variant={doc.anexado ? "default" : "secondary"}>
                        {doc.anexado ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Anexado
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 mr-1" />
                            Pendente
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(index, file);
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                    {doc.anexado && doc.arquivo && (
                      <div className="text-sm text-muted-foreground">
                        {doc.arquivo.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assinatura Digital */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Assinatura Digital</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>Assinatura do Colaborador</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                  <div className="space-y-2">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Clique para assinar digitalmente
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateField('assinaturaColaborador', 'Assinado digitalmente')}
                    >
                      Assinar
                    </Button>
                  </div>
                  {formData.assinaturaColaborador && (
                    <div className="mt-2">
                      <Badge variant="default">
                        <Check className="h-3 w-3 mr-1" />
                        Assinado
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Assinatura do Preposto do Sindicato</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                  <div className="space-y-2">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Clique para assinar digitalmente
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateField('assinaturaPreposto', 'Assinado digitalmente')}
                    >
                      Assinar
                    </Button>
                  </div>
                  {formData.assinaturaPreposto && (
                    <div className="mt-2">
                      <Badge variant="default">
                        <Check className="h-3 w-3 mr-1" />
                        Assinado
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Upload da CTPS */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Upload da CTPS</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-4">
              <div className="text-center space-y-2">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  CTPS digitalizada e assinada (frente/verso)
                </p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateField('ctpsAnexada', file);
                    }
                  }}
                  className="max-w-xs mx-auto"
                />
              </div>
              {formData.ctpsAnexada && (
                <div className="mt-3 text-center">
                  <Badge variant="default">
                    <Check className="h-3 w-3 mr-1" />
                    CTPS Anexada: {formData.ctpsAnexada.name}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              Salvar e Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}