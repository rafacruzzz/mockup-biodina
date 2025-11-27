import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentoAcaoCampo, FieldActionEffectivenessData } from "@/types/acaoCampo";
import { FieldActionEffectivenessForm } from "./FieldActionEffectivenessForm";
import { gerarFieldActionPDF } from "./utils/fieldActionPDF";
import { FileText, Edit, FileCheck, Download, Eye } from "lucide-react";
import { toast } from "sonner";

interface DocumentoPreenchívelCardProps {
  documento: DocumentoAcaoCampo;
  onSave: (dados: FieldActionEffectivenessData) => void;
  onGeneratePDF: () => void;
}

export const DocumentoPreenchívelCard = ({
  documento,
  onSave,
  onGeneratePDF
}: DocumentoPreenchívelCardProps) => {
  const [showForm, setShowForm] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const handleSaveForm = (dados: FieldActionEffectivenessData) => {
    onSave(dados);
    setShowForm(false);
    toast.success("Formulário salvo com sucesso!");
  };

  const handleGeneratePDF = () => {
    if (!documento.dadosFormulario) {
      toast.error("Por favor, preencha o formulário antes de gerar o PDF");
      return;
    }

    try {
      const pdfBlob = gerarFieldActionPDF(documento.dadosFormulario);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Criar link para download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Field_Action_Effectiveness_${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      
      onGeneratePDF();
      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar o PDF");
    }
  };

  const getStatusBadge = () => {
    if (documento.dadosFormulario?.pdfGerado) {
      return <Badge className="bg-green-500 text-white"><FileCheck className="h-3 w-3 mr-1" />PDF Gerado</Badge>;
    }
    if (documento.dadosFormulario) {
      return <Badge className="bg-blue-500 text-white">Preenchido</Badge>;
    }
    return <Badge variant="outline">Não Preenchido</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{documento.nome}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Formulário preenchível com geração de PDF
              </p>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!documento.dadosFormulario ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Preencha o formulário para gerar o documento
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Preencher Formulário
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Formulário Preenchido</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Produto: {documento.dadosFormulario.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cliente: {documento.dadosFormulario.customerName}
                    </p>
                  </div>
                </div>
              </div>

              {documento.dadosFormulario.pdfGerado && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    PDF Gerado com Sucesso
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Gerado em {new Date(documento.dadosFormulario.dataPdfGerado!).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(true)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>

                {!documento.dadosFormulario.pdfGerado ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleGeneratePDF}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Gerar PDF
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleGeneratePDF}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Baixar PDF
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal do Formulário */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preencher Field Action Effectiveness Data Sheet</DialogTitle>
          </DialogHeader>
          <FieldActionEffectivenessForm
            initialData={documento.dadosFormulario}
            onSave={handleSaveForm}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
