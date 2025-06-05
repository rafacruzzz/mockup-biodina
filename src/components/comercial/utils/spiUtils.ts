
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

export const generateSPIPDF = (formData: any) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 20;

  // Cabeçalho
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('SPI – SOLICITAÇÃO DE PROFORMA INVOICE', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Dados do Cliente
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('DADOS DO CLIENTE', 20, yPosition);
  yPosition += 10;
  
  pdf.setFont(undefined, 'normal');
  pdf.text(`Cliente: ${formData.spiCliente}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Dados da Proforma: ${formData.spiDadosProforma}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Em nome de: ${formData.spiEmNomeDe}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`CNPJ: ${formData.spiCnpj}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Endereço: ${formData.spiEndereco}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Inscrição Estadual: ${formData.spiInscricaoEstadual}`, 20, yPosition);
  yPosition += 15;

  // Informações da Proforma
  pdf.setFont(undefined, 'bold');
  pdf.text('INFORMAÇÕES DA PROFORMA', 20, yPosition);
  yPosition += 10;
  
  pdf.setFont(undefined, 'normal');
  pdf.text(`No SPI: ${formData.spiNumero}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Data: ${formData.spiData}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Proposta: ${formData.spiProposta}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Equipamento: ${formData.spiEquipamento}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Modelo: ${formData.spiModelo}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Packing (%): ${formData.spiPacking}`, 20, yPosition);
  yPosition += 15;

  // Informações Adicionais
  pdf.setFont(undefined, 'bold');
  pdf.text('INFORMAÇÕES ADICIONAIS', 20, yPosition);
  yPosition += 10;
  
  pdf.setFont(undefined, 'normal');
  pdf.text(`Fabricante: ${formData.spiFabricante}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Forma de pagamento: ${formData.spiFormaPagamento}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Tem comissão: ${formData.spiTemComissao ? 'Sim' : 'Não'}`, 20, yPosition);
  yPosition += 7;
  if (formData.spiTemComissao) {
    pdf.text(`Percentual comissão: ${formData.spiPercentualComissao}%`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Representante: ${formData.spiRepresentante}`, 20, yPosition);
    yPosition += 7;
  }
  yPosition += 10;

  // Produtos/Mercadorias
  if (formData.spiMercadorias.length > 0) {
    pdf.setFont(undefined, 'bold');
    pdf.text('PRODUTOS/MERCADORIAS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    formData.spiMercadorias.forEach((item: any, index: number) => {
      pdf.text(`${index + 1}. ${item.mercadoria} - Qtde: ${item.qtde} - Preço Unit.: USD ${formatUSD(parseUSD(item.precoUnitUsd))} - Total: USD ${item.precoTotalUsd}`, 20, yPosition);
      yPosition += 7;
    });
    yPosition += 10;
  }

  // Totais
  pdf.setFont(undefined, 'bold');
  pdf.text('TOTAIS', 20, yPosition);
  yPosition += 10;
  
  pdf.setFont(undefined, 'normal');
  pdf.text(`Subtotal: USD ${formatUSD(calcularSubtotal(formData.spiMercadorias))}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Packing: USD ${formatUSD(calcularPacking(formData.spiMercadorias, formData.spiPacking))}`, 20, yPosition);
  yPosition += 7;
  pdf.setFont(undefined, 'bold');
  pdf.text(`TOTAL: USD ${formatUSD(calcularTotal(formData.spiMercadorias, formData.spiPacking))}`, 20, yPosition);
  yPosition += 15;

  // Observações
  if (formData.spiObservacoes) {
    pdf.setFont(undefined, 'bold');
    pdf.text('OBSERVAÇÕES', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    const lines = pdf.splitTextToSize(formData.spiObservacoes, pageWidth - 40);
    pdf.text(lines, 20, yPosition);
    yPosition += lines.length * 7 + 10;
  }

  // Detalhes de Venda
  pdf.setFont(undefined, 'bold');
  pdf.text('DETALHES DE VENDA', 20, yPosition);
  yPosition += 10;
  
  pdf.setFont(undefined, 'normal');
  pdf.text(`Faturamento confirmado: ${formData.spiFaturamentoConfirmado ? 'Sim' : 'Não'}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Forma de pagamento: ${formData.spiPagamentoForma}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Prazo de pagamento: ${formData.spiPagamentoPrazo}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Prazo de entrega: ${formData.spiEntregaPrazo}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Forma de venda: ${formData.spiFormaVenda}`, 20, yPosition);
  if (formData.spiFormaVenda === 'outros' && formData.spiFormaVendaOutros) {
    yPosition += 7;
    pdf.text(`Especificação: ${formData.spiFormaVendaOutros}`, 20, yPosition);
  }
  yPosition += 7;
  pdf.text(`Valor: ${formData.spiValor}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Prazo: ${formData.spiPrazo}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Data de confirmação: ${formData.spiDataConfirmacao}`, 20, yPosition);

  // Nome do arquivo
  const fileName = `SPI_${formData.spiNumero || 'novo'}_${new Date().toISOString().split('T')[0]}.pdf`;
  
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
