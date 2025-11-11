import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DashboardData } from '@/types/faturamento';

export const exportDashboardToPDF = (data: DashboardData, periodo: string) => {
  const doc = new jsPDF();
  let yPosition = 20;

  // Capa
  doc.setFontSize(20);
  doc.text('RELATÓRIO DE FATURAMENTO', 105, yPosition, { align: 'center' });
  yPosition += 10;
  
  doc.setFontSize(14);
  doc.text(periodo, 105, yPosition, { align: 'center' });
  yPosition += 20;

  // Indicadores Principais
  doc.setFontSize(16);
  doc.text('Indicadores Principais', 14, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.text(`Faturamento Total: R$ ${data.faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, yPosition);
  yPosition += 7;
  doc.text(`Faturamento Produtos: R$ ${data.faturamentoProdutos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, yPosition);
  yPosition += 7;
  doc.text(`Faturamento Serviços: R$ ${data.faturamentoServicos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, yPosition);
  yPosition += 7;
  doc.text(`Total de Notas: ${data.totalNotas}`, 14, yPosition);
  yPosition += 7;
  doc.text(`Pendências Fiscais: ${data.pendenciasFiscais}`, 14, yPosition);
  yPosition += 15;

  // Comparativos
  doc.setFontSize(16);
  doc.text('Comparativos', 14, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.text(`Variação Mensal: ${data.variacaoMensal > 0 ? '+' : ''}${data.variacaoMensal.toFixed(1)}%`, 14, yPosition);
  yPosition += 7;
  doc.text(`Variação Anual: ${data.variacaoAnual > 0 ? '+' : ''}${data.variacaoAnual.toFixed(1)}%`, 14, yPosition);
  yPosition += 15;

  // Nova página para tabelas
  doc.addPage();
  yPosition = 20;

  // Notas Canceladas
  doc.setFontSize(16);
  doc.text('Notas Fiscais Canceladas', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition,
    head: [['Número', 'Tipo', 'Cliente', 'Valor', 'Motivo']],
    body: data.notasCanceladas.map(nota => [
      nota.numero,
      nota.tipo,
      nota.cliente,
      `R$ ${nota.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      nota.motivoCancelamento,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Notas Devolvidas
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(16);
  doc.text('Notas Fiscais Devolvidas', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition,
    head: [['Número', 'Tipo', 'Cliente', 'Valor', 'Status']],
    body: data.notasDevolvidas.map(nota => [
      nota.numero,
      nota.tipo,
      nota.cliente,
      `R$ ${nota.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      nota.statusProcessamento === 'processada' ? 'Processada' : 'Em Processamento',
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Nova página para Faturamento por Cliente
  doc.addPage();
  yPosition = 20;

  doc.setFontSize(16);
  doc.text('Faturamento por Cliente', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition,
    head: [['Cliente', 'Valor Total', 'Qtd Notas', 'Ticket Médio']],
    body: data.faturamentoPorCliente.slice(0, 10).map(cliente => [
      cliente.cliente,
      `R$ ${cliente.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      cliente.quantidadeNotas.toString(),
      `R$ ${cliente.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Impostos
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(16);
  doc.text('Impostos e Retenções', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition,
    head: [['Imposto', 'Alíquota Média', 'Valor', '% do Total']],
    body: data.impostos.map(imposto => [
      imposto.tipo,
      `${imposto.aliquotaMedia.toFixed(2)}%`,
      `R$ ${imposto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      `${imposto.percentualTotal.toFixed(1)}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, doc.internal.pageSize.getHeight() - 10);
  }

  // Salvar PDF
  const fileName = `Relatorio_Faturamento_${periodo.replace(/\s/g, '_')}.pdf`;
  doc.save(fileName);
};

export const exportNotasCanceladasToPDF = (notas: any[], periodo: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Notas Fiscais Canceladas', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(periodo, 105, 30, { align: 'center' });

  autoTable(doc, {
    startY: 40,
    head: [['Número', 'Tipo', 'Cliente', 'Valor', 'Data', 'Motivo']],
    body: notas.map(nota => [
      nota.numero,
      nota.tipo,
      nota.cliente,
      `R$ ${nota.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      nota.dataCancelamento,
      nota.motivoCancelamento,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [220, 38, 38] },
  });

  doc.save(`Notas_Canceladas_${periodo.replace(/\s/g, '_')}.pdf`);
};

export const exportCartasCorrecaoToPDF = (cartas: any[], periodo: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Cartas de Correção (CC-e)', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(periodo, 105, 30, { align: 'center' });

  autoTable(doc, {
    startY: 40,
    head: [['ID', 'NF-e', 'Cliente', 'Valor', 'Motivo', 'Data']],
    body: cartas.map(cc => [
      cc.id,
      cc.numeroNFe,
      cc.cliente,
      `R$ ${cc.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      cc.motivoCorrecao,
      cc.dataCorrecao,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [245, 158, 11] },
  });

  doc.save(`Cartas_Correcao_${periodo.replace(/\s/g, '_')}.pdf`);
};
