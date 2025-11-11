import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartaFaturamento } from '@/types/faturamento';

export const gerarCartaFaturamentoPDF = (dados: CartaFaturamento): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;
  
  // 1. Logo da empresa (se existir)
  if (dados.dadosEmpresa.logoUrl) {
    doc.addImage(dados.dadosEmpresa.logoUrl, 'PNG', pageWidth/2 - 25, yPosition, 50, 20);
    yPosition += 30;
  }
  
  // 2. Título
  doc.setFontSize(16);
  doc.setTextColor(180, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('DECLARAÇÃO DE FATURAMENTO', pageWidth/2, yPosition, { align: 'center' });
  yPosition += 15;
  
  // 3. Texto declaratório
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text('Declaro para os devidos fins a quem possa interessar.', pageWidth/2, yPosition, { align: 'center' });
  yPosition += 20;
  
  // 4. Tabela de faturamento
  const dadosTabela = dados.faturamentoPeriodo.map(item => [
    item.ano.toString(),
    item.mes,
    formatarMoeda(item.faturamento)
  ]);
  
  autoTable(doc, {
    startY: yPosition,
    head: [['ANO', 'COMPETÊNCIA', 'FATURAMENTO']],
    body: dadosTabela,
    foot: [['', 'Faturamento últimos 12 meses', formatarMoeda(dados.totalPeriodo)]],
    theme: 'striped',
    headStyles: { 
      fillColor: [180, 0, 0],
      textColor: 255,
      fontStyle: 'bold'
    },
    footStyles: {
      fillColor: [180, 0, 0],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 4
    },
    columnStyles: {
      2: { halign: 'right' }
    }
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 20;
  
  // 5. Local e data
  const dataEmissaoFormatada = formatarData(dados.dataEmissao);
  doc.setFontSize(10);
  doc.text(
    `${dados.dadosEmpresa.cidade}, ${dataEmissaoFormatada}.`,
    pageWidth/2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 30;
  
  // 6. Linha de assinatura
  const linhaTamanho = 60;
  doc.line(pageWidth/2 - linhaTamanho/2, yPosition, pageWidth/2 + linhaTamanho/2, yPosition);
  yPosition += 7;
  
  // 7. Nome do titular
  doc.setFont('helvetica', 'bold');
  doc.text(dados.titular.nome.toUpperCase(), pageWidth/2, yPosition, { align: 'center' });
  yPosition += 5;
  
  doc.setFont('helvetica', 'normal');
  doc.text(dados.titular.cargo, pageWidth/2, yPosition, { align: 'center' });
  yPosition += 5;
  doc.text(`CPF: ${dados.titular.cpf}`, pageWidth/2, yPosition, { align: 'center' });
  yPosition += 15;
  
  // 8. Dados da empresa (box direita)
  const boxX = pageWidth - 70;
  doc.setFontSize(8);
  doc.text(dados.contador.nome.toUpperCase(), boxX, yPosition);
  doc.text(`Sócia Administradora`, boxX, yPosition + 4);
  doc.text(`CNPJ: ${dados.dadosEmpresa.cnpj}`, boxX, yPosition + 8);
  doc.text(`${dados.dadosEmpresa.endereco}`, boxX, yPosition + 12);
  doc.text(`Contadora`, boxX, yPosition + 16);
  doc.text(`CRC: ${dados.contador.crc}`, boxX, yPosition + 20);
  
  // 9. Rodapé
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(180, 0, 0);
  doc.rect(0, footerY - 5, pageWidth, 10, 'F');
  doc.text(
    `${dados.dadosEmpresa.razaoSocial.toUpperCase()}`,
    pageWidth/2,
    footerY,
    { align: 'center' }
  );
  doc.setFontSize(7);
  doc.text(
    dados.dadosEmpresa.endereco.toUpperCase(),
    pageWidth/2,
    footerY + 3,
    { align: 'center' }
  );
  
  return doc.output('blob');
};

const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const formatarData = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};
