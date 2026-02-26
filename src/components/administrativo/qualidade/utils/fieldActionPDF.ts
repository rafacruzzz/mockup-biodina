import jsPDF from 'jspdf';
import { FieldActionEffectivenessData } from '@/types/acaoCampo';

export const gerarFieldActionPDF = (data: FieldActionEffectivenessData): Blob => {
  const doc = new jsPDF();
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FIELD ACTION EFFECTIVENESS DATA SHEET', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 12;
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // Section 1: Subsidiary/Distributor Entry
  yPosition += 12;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Subsidiary/Distributor Entry', margin, yPosition);
  
  yPosition += 9;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Product:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.product || '-', margin + 40, yPosition);
  
  yPosition += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Account:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(data.accountNumberOrName || '-', margin + 40, yPosition);

  // Advisory Letter to Customer
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Advisory Letter to Customer', margin + 5, yPosition);

  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(`Submission Date: ${data.submissionDate || '-'}`, margin + 10, yPosition);
  yPosition += 7;
  doc.text(`Reminder 1 Sent Date: ${data.reminder1SentDate || '-'}`, margin + 10, yPosition);
  yPosition += 7;
  doc.text(`Reminder 2 Sent Date: ${data.reminder2SentDate || '-'}`, margin + 10, yPosition);

  // Section 2: Customer Response
  yPosition += 12;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Customer Response', margin, yPosition);

  yPosition += 9;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Recall Response Form received: ${data.recallResponseFormReceived ? 'Yes' : 'No'}`, margin, yPosition);
  yPosition += 7;
  doc.text(`New OS version installed: ${data.newOsVersionInstalled ? 'Yes' : 'No'}`, margin, yPosition);

  if (data.newOsVersionInstalled && data.stateVersion) {
    yPosition += 7;
    doc.text(`State version: ${data.stateVersion}`, margin + 10, yPosition);
  }

  // Section 4: Remarks
  yPosition += 12;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Remarks', margin, yPosition);

  yPosition += 9;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  if (data.remarks) {
    const remarksLines = doc.splitTextToSize(data.remarks, pageWidth - (2 * margin));
    doc.text(remarksLines, margin, yPosition);
  } else {
    doc.text('-', margin, yPosition);
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(
    `Generated on ${new Date().toLocaleDateString('pt-BR')} at ${new Date().toLocaleTimeString('pt-BR')}`,
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );

  return doc.output('blob');
};
