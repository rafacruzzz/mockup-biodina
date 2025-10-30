import jsPDF from "jspdf";
import { OrdemServico } from "@/types/assessoria-cientifica";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const gerarCertificadoTreinamento = (os: OrdemServico) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Configuração de cores
  const primaryColor: [number, number, number] = [41, 128, 185]; // Azul
  const secondaryColor: [number, number, number] = [52, 73, 94]; // Cinza escuro

  // Adicionar borda decorativa
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 273, 186);

  // Título "CERTIFICADO"
  doc.setFontSize(36);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO", 148.5, 40, { align: "center" });

  // Subtítulo
  doc.setFontSize(16);
  doc.setTextColor(...secondaryColor);
  doc.setFont("helvetica", "normal");
  doc.text("DE TREINAMENTO TÉCNICO", 148.5, 52, { align: "center" });

  // Linha decorativa
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(60, 58, 237, 58);

  // Corpo do texto
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  
  const textoInicial = "Certificamos que a equipe do";
  doc.text(textoInicial, 148.5, 80, { align: "center" });

  // Nome do cliente (destaque)
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text(os.cliente, 148.5, 92, { align: "center" });

  // Continuação do texto
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("participou com êxito do treinamento técnico para operação do equipamento", 148.5, 104, { align: "center" });

  // Nome do equipamento (destaque)
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text(os.equipamento || "Equipamento", 148.5, 116, { align: "center" });

  // Informações adicionais
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  
  if (os.numeroSerieLote) {
    doc.text(`Número de Série/Lote: ${os.numeroSerieLote}`, 148.5, 128, { align: "center" });
  }

  // Data
  const dataFormatada = format(os.abertoEm, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  doc.text(`Realizado em ${dataFormatada}`, 148.5, 140, { align: "center" });

  // Participantes
  if (os.participantes && os.participantes.length > 0) {
    doc.setFontSize(11);
    doc.text("Participantes:", 148.5, 152, { align: "center" });
    doc.setFont("helvetica", "italic");
    const participantesTexto = os.participantes.join(", ");
    doc.text(participantesTexto, 148.5, 158, { align: "center", maxWidth: 220 });
  }

  // Rodapé com assinatura
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...secondaryColor);
  
  // Linha de assinatura
  doc.setDrawColor(...secondaryColor);
  doc.line(100, 175, 197, 175);
  doc.text(os.responsavel, 148.5, 180, { align: "center" });
  doc.text("Assessor Científico Responsável", 148.5, 185, { align: "center" });

  // Código da OS no rodapé
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`OS: ${os.numero}`, 148.5, 195, { align: "center" });

  // Salvar o PDF
  const nomeArquivo = `Certificado_Treinamento_${os.cliente.replace(/\s+/g, "_")}_${os.numero}.pdf`;
  doc.save(nomeArquivo);
};
