
import jsPDF from 'jspdf';

export const formatUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const parseUSD = (value: string): number => {
  return parseFloat(value.replace(/,/g, '')) || 0;
};

export const calcularSubtotal = (mercadorias: any[]): number => {
  return mercadorias.reduce((total: number, item: any) => {
    return total + (parseUSD(item.precoTotalUsd) || 0);
  }, 0);
};

export const calcularPacking = (mercadorias: any[], packingPercentual: string): number => {
  const subtotal = calcularSubtotal(mercadorias);
  const percentualPacking = parseFloat(packingPercentual) || 0;
  return (subtotal * percentualPacking / 100);
};

export const calcularTotal = (mercadorias: any[], packingPercentual: string): number => {
  return calcularSubtotal(mercadorias) + calcularPacking(mercadorias, packingPercentual);
};

export const generateSPIPDF = (formData: any, selectedCnpj?: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 20;

  // Cabeçalho - RADIOMETER MEDICAL ApS
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text('RADIOMETER MEDICAL ApS', 20, yPosition);
  yPosition += 8;
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text('INTERNATIONAL TRADING COMPANY', 20, yPosition);
  yPosition += 5;
  pdf.text('Åkandevej 21, DK-2700 Brønshøj, Denmark', 20, yPosition);
  yPosition += 5;
  pdf.text('Telephone +45', 20, yPosition);
  yPosition += 15;

  // Informações do cliente à direita
  pdf.text('Delivered to:', pageWidth - 60, 35);
  yPosition = 45;
  
  // CNPJ selecionado no modal
  if (selectedCnpj) {
    pdf.text(selectedCnpj, pageWidth - 60, yPosition);
    yPosition += 7;
  }
  
  // Dados básicos do documento
  pdf.text('PROFORMA INVOICE', pageWidth - 60, yPosition + 15);
  pdf.text('PAGE 1', pageWidth - 30, yPosition + 25);

  yPosition = 80;

  // Informações do pedido
  pdf.setFont(undefined, 'bold');
  pdf.text('Your reference', 20, yPosition);
  pdf.text('Your order no.', 120, yPosition);
  pdf.text('Our reference', 180, yPosition);
  pdf.text('Date', pageWidth - 40, yPosition);
  yPosition += 10;

  pdf.setFont(undefined, 'normal');
  pdf.text('PAYMENT', 20, yPosition);
  yPosition += 15;

  // Cabeçalho da tabela
  pdf.setFont(undefined, 'bold');
  pdf.text('Item No', 20, yPosition);
  pdf.text('Type and Description', 60, yPosition);
  pdf.text('Qty', pageWidth - 80, yPosition);
  pdf.text('Unit price', pageWidth - 60, yPosition);
  pdf.text('Total price', pageWidth - 30, yPosition);
  yPosition += 5;

  // Linha divisória
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  // Produtos/Mercadorias
  if (formData.spiMercadorias && formData.spiMercadorias.length > 0) {
    pdf.setFont(undefined, 'normal');
    formData.spiMercadorias.forEach((item: any, index: number) => {
      const itemNo = `SN${(index + 1).toString().padStart(2, '0')}`;
      pdf.text(itemNo, 20, yPosition);
      pdf.text(item.mercadoria || '', 60, yPosition);
      pdf.text(item.qtde || '1', pageWidth - 80, yPosition);
      pdf.text(`USD ${formatUSD(parseUSD(item.precoUnitUsd))}`, pageWidth - 60, yPosition);
      pdf.text(`USD ${item.precoTotalUsd || '0.00'}`, pageWidth - 30, yPosition);
      yPosition += 7;
    });
  }

  yPosition += 10;

  // Totais
  const subtotal = calcularSubtotal(formData.spiMercadorias || []);
  const packing = calcularPacking(formData.spiMercadorias || [], formData.spiPacking || '0');
  const total = calcularTotal(formData.spiMercadorias || [], formData.spiPacking || '0');

  pdf.setFont(undefined, 'bold');
  pdf.text('Goods total:', pageWidth - 80, yPosition);
  pdf.text(`USD ${formatUSD(subtotal)}`, pageWidth - 30, yPosition);
  yPosition += 7;

  if (packing > 0) {
    pdf.text('Packing:', pageWidth - 80, yPosition);
    pdf.text(`USD ${formatUSD(packing)}`, pageWidth - 30, yPosition);
    yPosition += 7;
  }

  pdf.text('Invoice total:', pageWidth - 80, yPosition);
  pdf.text(`USD ${formatUSD(total)}`, pageWidth - 30, yPosition);
  yPosition += 20;

  // Termos e condições na parte inferior
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'normal');
  
  const termsText = [
    'BANKERS: NORDEA BANK DANMARK A/S, ACCOUNT NO.: SWIFT/BIC CODE: NDEADKKK, IBAN BRANCH XXXXXXXXXXXXXXX (FOR INTERNATIONAL)',
    'DANSKE BANK A/S, ACCOUNT NO.: XXXXXXXXXX, SWIFT CODE DABADKKK, FOR INTERNAL TRANSFERS IN DKK PLEASE USE BANK ACCOUNT NO:',
    'REG. NO: XXXX, ACCOUNT NO: XXXX, CVR: XXXXXXXXX',
    '',
    'RADIOMETER MEDICAL ApS',
    'GENERAL TERMS OF DELIVERY',
    '',
    'DK-2700 Brønshøj',
    '',
    'RADIOMETER\'S COMMON TERMS OF SALE'
  ];

  termsText.forEach((line) => {
    pdf.text(line, 20, yPosition);
    yPosition += 4;
  });

  // Nome do arquivo
  const fileName = `PI_${formData.spiNumero || 'novo'}_${selectedCnpj?.replace(/[^\d]/g, '') || 'cliente'}_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Download do PDF
  pdf.save(fileName);
};

export const handleUploadPI = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
  input.multiple = true;
  
  input.onchange = (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      console.log('Arquivos selecionados para upload PI:', files);
      // Aqui você pode implementar a lógica de upload
    }
  };
  
  input.click();
};
