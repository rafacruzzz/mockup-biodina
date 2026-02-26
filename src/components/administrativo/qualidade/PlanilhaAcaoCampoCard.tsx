import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentoAcaoCampo, PlanilhaAcaoCampoData } from "@/types/acaoCampo";
import { PlanilhaAcaoCampoForm } from "./PlanilhaAcaoCampoForm";
import { FileText, Edit, Download, FileCheck } from "lucide-react";
import { toast } from "sonner";

interface Props {
  documento: DocumentoAcaoCampo;
  onSave: (dados: PlanilhaAcaoCampoData) => void;
  onGeneratePDF: () => void;
}

export const PlanilhaAcaoCampoCard = ({ documento, onSave, onGeneratePDF }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const handleSave = (dados: PlanilhaAcaoCampoData) => {
    onSave(dados);
    setShowForm(false);
    toast.success("Formulário salvo com sucesso!");
  };

  const handleDownload = () => {
    toast.info("Funcionalidade de download será implementada.");
  };

  const dados = documento.dadosPlanilha;

  const getStatusBadge = () => {
    if (dados?.pdfGerado) return <Badge className="bg-green-500 text-white"><FileCheck className="h-3 w-3 mr-1" />PDF Gerado</Badge>;
    if (dados) return <Badge className="bg-blue-500 text-white">Preenchido</Badge>;
    return <Badge variant="outline">Não Preenchido</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{documento.nome}</CardTitle>
              <p className="text-sm text-muted-foreground">Formulário preenchível com geração de PDF</p>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!dados ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">Preencha o formulário para gerar o documento</p>
              <Button onClick={() => setShowForm(true)}>
                <Edit className="h-4 w-4 mr-2" />Preencher Formulário
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Formulário Preenchido</p>
                    <p className="text-xs text-muted-foreground mt-1">Cliente: {dados.clienteNome || '-'}</p>
                    <p className="text-xs text-muted-foreground">UF: {dados.uf || '-'} | Modelo: {dados.modelo || '-'}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowForm(true)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />Editar
                </Button>
                <Button variant="default" size="sm" onClick={handleDownload} className="flex-1">
                  <Download className="h-4 w-4 mr-1" />Baixar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Planilha de Ação de Campo</DialogTitle>
          </DialogHeader>
          <PlanilhaAcaoCampoForm
            initialData={dados}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
