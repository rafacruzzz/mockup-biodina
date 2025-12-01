
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

export const generateSPIPDF = (formData: any, selectedCnpj?: string, modeloPi?: string) => {
  // Redireciona para a função correta baseada no modelo
  if (modeloPi === 'epredia') {
    return generateEprediaPDF(formData, selectedCnpj);
  } else if (modeloPi === 'advanced') {
    return generateAdvancedPDF(formData, selectedCnpj);
  }
  // Default: Radiometer
  return generateRadiometerPDF(formData, selectedCnpj);
};

const generateRadiometerPDF = (formData: any, selectedCnpj?: string) => {
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

const generateEprediaPDF = (formData: any, selectedCnpj?: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 20;

  // Cabeçalho - EPREDIA
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('EPREDIA', 20, yPosition);
  yPosition += 8;
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text('Epredia Division - Thermo Fisher Scientific', 20, yPosition);
  yPosition += 5;
  pdf.text('269 Great Valley Parkway, Malvern, PA 19355 USA', 20, yPosition);
  yPosition += 5;
  pdf.text('Phone: +1 800 XXX XXXX', 20, yPosition);
  yPosition += 15;

  // Informações do cliente
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'bold');
  pdf.text('QUOTATION', pageWidth / 2, 30, { align: 'center' });
  yPosition = 50;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'bold');
  pdf.text('Bill To:', 20, yPosition);
  pdf.text('Ship To:', pageWidth - 80, yPosition);
  yPosition += 7;

  pdf.setFont(undefined, 'normal');
  if (selectedCnpj) {
    pdf.text(selectedCnpj, 20, yPosition);
    pdf.text(selectedCnpj, pageWidth - 80, yPosition);
  }
  yPosition += 15;

  // Informações do pedido
  pdf.setFont(undefined, 'bold');
  pdf.text('Date:', 20, yPosition);
  pdf.text('Quote No:', 80, yPosition);
  pdf.text('Valid Until:', pageWidth - 80, yPosition);
  yPosition += 7;

  pdf.setFont(undefined, 'normal');
  pdf.text(new Date().toLocaleDateString(), 20, yPosition);
  pdf.text(formData.spiNumero || 'QT-0000', 80, yPosition);
  yPosition += 15;

  // Tabela de produtos
  pdf.setFont(undefined, 'bold');
  pdf.text('Item', 20, yPosition);
  pdf.text('Description', 50, yPosition);
  pdf.text('Qty', pageWidth - 90, yPosition);
  pdf.text('Unit Price', pageWidth - 65, yPosition);
  pdf.text('Total', pageWidth - 30, yPosition);
  yPosition += 5;
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  // Produtos
  if (formData.spiMercadorias && formData.spiMercadorias.length > 0) {
    pdf.setFont(undefined, 'normal');
    formData.spiMercadorias.forEach((item: any, index: number) => {
      pdf.text(`${index + 1}`, 20, yPosition);
      pdf.text(item.mercadoria || '', 50, yPosition);
      pdf.text(item.qtde || '1', pageWidth - 90, yPosition);
      pdf.text(`$${formatUSD(parseUSD(item.precoUnitUsd))}`, pageWidth - 65, yPosition);
      pdf.text(`$${item.precoTotalUsd || '0.00'}`, pageWidth - 30, yPosition);
      yPosition += 7;
    });
  }

  yPosition += 10;

  // Totais
  const subtotal = calcularSubtotal(formData.spiMercadorias || []);
  const packing = calcularPacking(formData.spiMercadorias || [], formData.spiPacking || '0');
  const total = calcularTotal(formData.spiMercadorias || [], formData.spiPacking || '0');

  pdf.line(pageWidth - 100, yPosition, pageWidth - 20, yPosition);
  yPosition += 7;

  pdf.setFont(undefined, 'bold');
  pdf.text('Subtotal:', pageWidth - 70, yPosition);
  pdf.text(`$${formatUSD(subtotal)}`, pageWidth - 30, yPosition);
  yPosition += 7;

  if (packing > 0) {
    pdf.text('Packing & Handling:', pageWidth - 70, yPosition);
    pdf.text(`$${formatUSD(packing)}`, pageWidth - 30, yPosition);
    yPosition += 7;
  }

  pdf.text('Total:', pageWidth - 70, yPosition);
  pdf.text(`$${formatUSD(total)}`, pageWidth - 30, yPosition);
  yPosition += 20;

  // Termos
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'italic');
  pdf.text('Terms: Net 30 days. Prices quoted in USD.', 20, yPosition);
  yPosition += 5;
  pdf.text('All shipments FOB Origin unless otherwise specified.', 20, yPosition);

  const fileName = `Quotation_Epredia_${selectedCnpj?.replace(/[^\d]/g, '') || 'cliente'}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

const generateAdvancedPDF = (formData: any, selectedCnpj?: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 20;

  // Cabeçalho - ADVANCED
  pdf.setFontSize(18);
  pdf.setFont(undefined, 'bold');
  pdf.text('ADVANCED', 20, yPosition);
  yPosition += 8;
  
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text('Advanced Instruments LLC', 20, yPosition);
  yPosition += 5;
  pdf.text('Two Technology Way, Norwood, MA 02062 USA', 20, yPosition);
  yPosition += 5;
  pdf.text('Tel: +1 781 XXX XXXX', 20, yPosition);
  yPosition += 15;

  // Título
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text('PROFORMA INVOICE', pageWidth / 2, 40, { align: 'center' });
  yPosition = 55;

  // Informações do documento
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'bold');
  pdf.text('Invoice No:', 20, yPosition);
  pdf.text('Date:', 80, yPosition);
  pdf.text('Customer:', pageWidth - 100, yPosition);
  yPosition += 7;

  pdf.setFont(undefined, 'normal');
  pdf.text(formData.spiNumero || 'PI-0000', 20, yPosition);
  pdf.text(new Date().toLocaleDateString(), 80, yPosition);
  if (selectedCnpj) {
    pdf.text(selectedCnpj, pageWidth - 100, yPosition);
  }
  yPosition += 15;

  // Tabela de produtos
  pdf.setFont(undefined, 'bold');
  pdf.text('No.', 20, yPosition);
  pdf.text('Product Description', 40, yPosition);
  pdf.text('Quantity', pageWidth - 100, yPosition);
  pdf.text('Unit Price USD', pageWidth - 70, yPosition);
  pdf.text('Amount USD', pageWidth - 30, yPosition);
  yPosition += 5;
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  // Produtos
  if (formData.spiMercadorias && formData.spiMercadorias.length > 0) {
    pdf.setFont(undefined, 'normal');
    formData.spiMercadorias.forEach((item: any, index: number) => {
      pdf.text(`${index + 1}`, 20, yPosition);
      pdf.text(item.mercadoria || '', 40, yPosition);
      pdf.text(item.qtde || '1', pageWidth - 100, yPosition);
      pdf.text(formatUSD(parseUSD(item.precoUnitUsd)), pageWidth - 70, yPosition);
      pdf.text(item.precoTotalUsd || '0.00', pageWidth - 30, yPosition);
      yPosition += 7;
    });
  }

  yPosition += 10;
  pdf.line(pageWidth - 100, yPosition, pageWidth - 20, yPosition);
  yPosition += 7;

  // Totais
  const subtotal = calcularSubtotal(formData.spiMercadorias || []);
  const packing = calcularPacking(formData.spiMercadorias || [], formData.spiPacking || '0');
  const total = calcularTotal(formData.spiMercadorias || [], formData.spiPacking || '0');

  pdf.setFont(undefined, 'bold');
  pdf.text('Subtotal:', pageWidth - 70, yPosition);
  pdf.text(formatUSD(subtotal), pageWidth - 30, yPosition);
  yPosition += 7;

  if (packing > 0) {
    pdf.text('Freight & Handling:', pageWidth - 70, yPosition);
    pdf.text(formatUSD(packing), pageWidth - 30, yPosition);
    yPosition += 7;
  }

  pdf.setFontSize(11);
  pdf.text('TOTAL USD:', pageWidth - 70, yPosition);
  pdf.text(formatUSD(total), pageWidth - 30, yPosition);
  yPosition += 20;

  // Termos e condições
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'normal');
  pdf.text('Payment Terms: As agreed', 20, yPosition);
  yPosition += 5;
  pdf.text('Delivery: FOB Factory', 20, yPosition);
  yPosition += 5;
  pdf.text('Bank Details: [Bank information]', 20, yPosition);

  const fileName = `PI_Advanced_${selectedCnpj?.replace(/[^\d]/g, '') || 'cliente'}_${new Date().toISOString().split('T')[0]}.pdf`;
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
