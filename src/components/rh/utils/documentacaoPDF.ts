
import jsPDF from 'jspdf';
import { ColaboradorData } from '@/types/colaborador';

export const gerarPDFDocumentacao = (dados: ColaboradorData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = 30;

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('RELATÓRIO DE DOCUMENTAÇÃO', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(14);
  doc.text(`${dados.dadosPessoais.nome}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Informações do Solicitante
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMAÇÕES DO SOLICITANTE', margin, yPosition);
  yPosition += 10;
  
  doc.setFont('helvetica', 'normal');
  if (dados.documentacao.solicitadoParaDPEm) {
    doc.text(`Solicitado para o DP em: ${new Date(dados.documentacao.solicitadoParaDPEm).toLocaleDateString()}`, margin, yPosition);
    yPosition += 7;
  }
  
  if (dados.documentacao.solicitadoPor) {
    doc.text(`Solicitado por: ${dados.documentacao.solicitadoPor}`, margin, yPosition);
    yPosition += 7;
  }
  
  if (dados.documentacao.motivoContratacao) {
    doc.text('Motivo da contratação:', margin, yPosition);
    yPosition += 7;
    const motivoLines = doc.splitTextToSize(dados.documentacao.motivoContratacao, pageWidth - 2 * margin);
    doc.text(motivoLines, margin + 10, yPosition);
    yPosition += motivoLines.length * 7;
  }
  
  yPosition += 10;
  
  // Documentos Anexados
  doc.setFont('helvetica', 'bold');
  doc.text('DOCUMENTOS ANEXADOS', margin, yPosition);
  yPosition += 10;
  
  doc.setFont('helvetica', 'normal');
  dados.documentacao.anexos.forEach((documento, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    const status = documento.validadeIndeterminada 
      ? 'Validade: Indeterminada'
      : documento.dataValidade 
        ? `Validade: ${new Date(documento.dataValidade).toLocaleDateString()}`
        : 'Validade: Não informada';
    
    doc.text(`${index + 1}. ${documento.categoria} - ${documento.nome}`, margin, yPosition);
    yPosition += 5;
    doc.text(`   ${status}`, margin, yPosition);
    yPosition += 7;
  });
  
  // Exame Admissional
  if (dados.documentacao.exameAdmissional) {
    yPosition += 10;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text('EXAME ADMISSIONAL', margin, yPosition);
    yPosition += 10;
    
    doc.setFont('helvetica', 'normal');
    if (dados.documentacao.exameAdmissional.data) {
      doc.text(`Data: ${new Date(dados.documentacao.exameAdmissional.data).toLocaleDateString()}`, margin, yPosition);
      yPosition += 7;
    }
    if (dados.documentacao.exameAdmissional.local) {
      doc.text(`Local: ${dados.documentacao.exameAdmissional.local}`, margin, yPosition);
      yPosition += 7;
    }
    if (dados.documentacao.exameAdmissional.horario) {
      doc.text(`Horário: ${dados.documentacao.exameAdmissional.horario}`, margin, yPosition);
      yPosition += 7;
    }
  }
  
  // Observações Gerais
  if (dados.documentacao.observacoesGerais) {
    yPosition += 10;
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 30;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text('OBSERVAÇÕES GERAIS', margin, yPosition);
    yPosition += 10;
    
    doc.setFont('helvetica', 'normal');
    const observacoesLines = doc.splitTextToSize(dados.documentacao.observacoesGerais, pageWidth - 2 * margin);
    doc.text(observacoesLines, margin, yPosition);
  }
  
  // Salvar PDF
  const fileName = `Documentacao_${dados.dadosPessoais.nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
