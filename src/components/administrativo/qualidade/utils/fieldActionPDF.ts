import jsPDF from 'jspdf';
import { FieldActionEffectivenessData } from '@/types/acaoCampo';

export const gerarFieldActionPDF = (data: FieldActionEffectivenessData): Blob => {
  const doc = new jsPDF();
  
  // Configurações
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Cabeçalho
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('FIELD ACTION EFFECTIVENESS DATA SHEET', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Biodina - Representações Médico-Hospitalares', pageWidth / 2, yPosition, { align: 'center' });
  
  // Linha separadora
  yPosition += 10;
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  // Informações do Produto
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. INFORMAÇÕES DO PRODUTO', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Nome do Produto:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.productName, margin + 45, yPosition);
  
  yPosition += 7;
  if (data.productModel) {
    doc.setFont('helvetica', 'bold');
    doc.text('Modelo:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.productModel, margin + 45, yPosition);
    yPosition += 7;
  }
  
  if (data.serialNumber) {
    doc.setFont('helvetica', 'bold');
    doc.text('Número de Série:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.serialNumber, margin + 45, yPosition);
    yPosition += 7;
  }
  
  if (data.lotNumber) {
    doc.setFont('helvetica', 'bold');
    doc.text('Número do Lote:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.lotNumber, margin + 45, yPosition);
    yPosition += 7;
  }
  
  // Informações do Cliente
  yPosition += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. INFORMAÇÕES DO CLIENTE', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Cliente:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerName, margin + 45, yPosition);
  
  yPosition += 7;
  if (data.customerCity) {
    doc.setFont('helvetica', 'bold');
    doc.text('Cidade:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.customerCity, margin + 45, yPosition);
    yPosition += 7;
  }
  
  // Data da Ação
  yPosition += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. DATA DA AÇÃO', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const dataFormatada = new Date(data.actionDate).toLocaleDateString('pt-BR');
  doc.text(dataFormatada, margin, yPosition);
  
  // Descrição da Ação
  yPosition += 13;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('4. DESCRIÇÃO DA AÇÃO DE CAMPO', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const descriptionLines = doc.splitTextToSize(data.fieldActionDescription, pageWidth - (2 * margin));
  doc.text(descriptionLines, margin, yPosition);
  yPosition += (descriptionLines.length * 7);
  
  // Resultado da Efetividade
  yPosition += 13;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('5. RESULTADO DA EFETIVIDADE', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let resultText = '';
  switch (data.effectivenessResult) {
    case 'effective':
      resultText = '✓ EFETIVO - A ação resolveu completamente o problema';
      break;
    case 'partially_effective':
      resultText = '○ PARCIALMENTE EFETIVO - A ação resolveu parcialmente o problema';
      break;
    case 'not_effective':
      resultText = '✗ NÃO EFETIVO - A ação não resolveu o problema';
      break;
  }
  doc.text(resultText, margin, yPosition);
  
  // Observações
  if (data.observations) {
    yPosition += 13;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('6. OBSERVAÇÕES ADICIONAIS', margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const observationsLines = doc.splitTextToSize(data.observations, pageWidth - (2 * margin));
    doc.text(observationsLines, margin, yPosition);
    yPosition += (observationsLines.length * 7);
  }
  
  // Rodapé
  const bottomMargin = 20;
  const footerY = doc.internal.pageSize.getHeight() - bottomMargin;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(
    `Documento gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );
  
  // Retornar como Blob
  return doc.output('blob');
};
