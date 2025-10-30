import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { Produto } from "@/types/produto";

interface ComparativoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produto: Produto;
}

export function ComparativoDialog({
  open,
  onOpenChange,
  produto,
}: ComparativoDialogProps) {
  const [formData, setFormData] = useState({
    tituloConcorrente: "",
    capacidadeNosso: "40 amostras/hora",
    capacidadeConcorrente: "",
    tecnologiaNosso: "Eletrodos seletivos tradicionais",
    tecnologiaConcorrente: "",
    parametrosNosso: "pH, pCO2, pO2, Na+, K+, Ca++",
    parametrosConcorrente: "",
    manutencaoNosso: "Manutenção preventiva a cada 6 meses",
    manutencaoConcorrente: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Comparativo Técnico", pageWidth / 2, 20, { align: "center" });
    
    // Subtítulo
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${produto.nome} vs ${formData.tituloConcorrente || "Concorrente"}`,
      pageWidth / 2,
      30,
      { align: "center" }
    );
    
    let yPos = 45;
    
    // Função auxiliar para adicionar linha de comparação
    const addComparison = (
      label: string,
      nosso: string,
      concorrente: string
    ) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(label, 15, yPos);
      yPos += 7;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      
      // Coluna Nosso Produto
      doc.setTextColor(0, 100, 0);
      const nossoLines = doc.splitTextToSize(`${produto.nome}: ${nosso}`, 85);
      doc.text(nossoLines, 15, yPos);
      
      // Coluna Concorrente
      doc.setTextColor(150, 0, 0);
      const concorrenteLines = doc.splitTextToSize(
        `Concorrente: ${concorrente || "Não informado"}`,
        85
      );
      doc.text(concorrenteLines, 110, yPos);
      
      doc.setTextColor(0, 0, 0);
      yPos += Math.max(nossoLines.length, concorrenteLines.length) * 5 + 5;
    };
    
    // Adicionar comparações
    addComparison(
      "Capacidade",
      formData.capacidadeNosso,
      formData.capacidadeConcorrente
    );
    addComparison(
      "Tecnologia",
      formData.tecnologiaNosso,
      formData.tecnologiaConcorrente
    );
    addComparison(
      "Parâmetros",
      formData.parametrosNosso,
      formData.parametrosConcorrente
    );
    addComparison(
      "Manutenção",
      formData.manutencaoNosso,
      formData.manutencaoConcorrente
    );
    
    // Rodapé
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Gerado em: ${new Date().toLocaleDateString("pt-BR")}`,
      pageWidth / 2,
      280,
      { align: "center" }
    );
    
    // Salvar PDF
    const nomeArquivo = `comparativo_${produto.codigo}_vs_${
      formData.tituloConcorrente || "Concorrente"
    }.pdf`;
    doc.save(nomeArquivo);
    
    toast.success("PDF gerado com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Comparativo Técnico - {produto.nome}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Título do Concorrente */}
          <div className="space-y-2">
            <Label htmlFor="tituloConcorrente">Nome do Concorrente</Label>
            <Input
              id="tituloConcorrente"
              placeholder="Ex: Modelo X da Marca Y"
              value={formData.tituloConcorrente}
              onChange={(e) => handleChange("tituloConcorrente", e.target.value)}
            />
          </div>

          {/* Grid de Comparação */}
          <div className="grid grid-cols-2 gap-6">
            {/* Coluna Nosso Produto */}
            <div className="space-y-4 border-r pr-4">
              <h3 className="font-semibold text-lg text-green-700">
                {produto.nome}
              </h3>

              <div className="space-y-2">
                <Label>Capacidade</Label>
                <Input
                  value={formData.capacidadeNosso}
                  onChange={(e) => handleChange("capacidadeNosso", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tecnologia</Label>
                <Input
                  value={formData.tecnologiaNosso}
                  onChange={(e) => handleChange("tecnologiaNosso", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Parâmetros</Label>
                <Input
                  value={formData.parametrosNosso}
                  onChange={(e) => handleChange("parametrosNosso", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Manutenção</Label>
                <Input
                  value={formData.manutencaoNosso}
                  onChange={(e) => handleChange("manutencaoNosso", e.target.value)}
                />
              </div>
            </div>

            {/* Coluna Concorrente */}
            <div className="space-y-4 pl-4">
              <h3 className="font-semibold text-lg text-red-700">
                {formData.tituloConcorrente || "Concorrente"}
              </h3>

              <div className="space-y-2">
                <Label>Capacidade</Label>
                <Input
                  placeholder="Ex: 30 amostras/hora"
                  value={formData.capacidadeConcorrente}
                  onChange={(e) =>
                    handleChange("capacidadeConcorrente", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tecnologia</Label>
                <Input
                  placeholder="Ex: Eletrodos básicos"
                  value={formData.tecnologiaConcorrente}
                  onChange={(e) =>
                    handleChange("tecnologiaConcorrente", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Parâmetros</Label>
                <Input
                  placeholder="Ex: pH, pCO2, pO2"
                  value={formData.parametrosConcorrente}
                  onChange={(e) =>
                    handleChange("parametrosConcorrente", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Manutenção</Label>
                <Input
                  placeholder="Ex: A cada 3 meses"
                  value={formData.manutencaoConcorrente}
                  onChange={(e) =>
                    handleChange("manutencaoConcorrente", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Botão Gerar PDF */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={gerarPDF} size="lg">
              <Download className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
