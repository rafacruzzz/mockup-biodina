import * as XLSX from 'xlsx';
import { DashboardData } from '@/types/faturamento';

export const exportDashboardToExcel = (data: DashboardData, periodo: string) => {
  const wb = XLSX.utils.book_new();

  // Aba 1: Resumo
  const resumoData = [
    ['RELATÓRIO DE FATURAMENTO', '', '', ''],
    ['Período:', periodo, '', ''],
    ['', '', '', ''],
    ['INDICADORES PRINCIPAIS', '', '', ''],
    ['Faturamento Total', `R$ ${data.faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '', ''],
    ['Faturamento Produtos', `R$ ${data.faturamentoProdutos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '', ''],
    ['Faturamento Serviços', `R$ ${data.faturamentoServicos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '', ''],
    ['Total de Notas', data.totalNotas, '', ''],
    ['Pendências Fiscais', data.pendenciasFiscais, '', ''],
    ['', '', '', ''],
    ['COMPARATIVOS', '', '', ''],
    ['Variação Mensal', `${data.variacaoMensal > 0 ? '+' : ''}${data.variacaoMensal.toFixed(1)}%`, '', ''],
    ['Variação Anual', `${data.variacaoAnual > 0 ? '+' : ''}${data.variacaoAnual.toFixed(1)}%`, '', ''],
  ];
  const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');

  // Aba 2: Notas Emitidas
  const notasEmitidasData = [
    ['Número', 'Tipo', 'Cliente', 'Data', 'Valor', 'Status'],
    // Aqui você adicionaria os dados reais das notas
    ['Total de Notas', data.notasEmitidas.total, '', '', '', ''],
    ['NF-e (Produtos)', data.notasEmitidas.nfe, '', '', '', ''],
    ['NFS-e (Serviços)', data.notasEmitidas.nfse, '', '', '', ''],
    ['', '', '', '', '', ''],
    ['STATUS', 'QUANTIDADE', '', '', '', ''],
    ['Autorizadas', data.notasEmitidas.autorizadas, '', '', '', ''],
    ['Pendentes', data.notasEmitidas.pendentes, '', '', '', ''],
    ['Rejeitadas', data.notasEmitidas.rejeitadas, '', '', '', ''],
    ['Canceladas', data.notasEmitidas.canceladas, '', '', '', ''],
  ];
  const wsNotasEmitidas = XLSX.utils.aoa_to_sheet(notasEmitidasData);
  XLSX.utils.book_append_sheet(wb, wsNotasEmitidas, 'Notas Emitidas');

  // Aba 3: Notas Canceladas
  const notasCanceladasHeader = ['Número', 'Tipo', 'Cliente', 'Valor', 'Data Cancelamento', 'Motivo', 'Justificativa'];
  const notasCanceladasData = data.notasCanceladas.map(nota => [
    nota.numero,
    nota.tipo,
    nota.cliente,
    nota.valor,
    nota.dataCancelamento,
    nota.motivoCancelamento,
    nota.justificativa,
  ]);
  const wsNotasCanceladas = XLSX.utils.aoa_to_sheet([notasCanceladasHeader, ...notasCanceladasData]);
  XLSX.utils.book_append_sheet(wb, wsNotasCanceladas, 'Notas Canceladas');

  // Aba 4: Notas Devolvidas
  const notasDevolucidasHeader = ['Número', 'Tipo', 'Cliente', 'Valor', 'Data Devolução', 'Motivo', 'Status'];
  const notasDevolucidasData = data.notasDevolvidas.map(nota => [
    nota.numero,
    nota.tipo,
    nota.cliente,
    nota.valor,
    nota.dataDevolucao,
    nota.motivoDevolucao,
    nota.statusProcessamento === 'processada' ? 'Processada' : 'Em Processamento',
  ]);
  const wsNotasDevolvidas = XLSX.utils.aoa_to_sheet([notasDevolucidasHeader, ...notasDevolucidasData]);
  XLSX.utils.book_append_sheet(wb, wsNotasDevolvidas, 'Notas Devolvidas');

  // Aba 5: Cartas de Correção
  const cartasCorrecaoHeader = ['ID', 'NF-e', 'Cliente', 'Valor', 'Motivo', 'Data Correção', 'Protocolo'];
  const cartasCorrecaoData = data.cartasCorrecao.map(cc => [
    cc.id,
    cc.numeroNFe,
    cc.cliente,
    cc.valor,
    cc.motivoCorrecao,
    cc.dataCorrecao,
    cc.numeroProtocolo,
  ]);
  const wsCartasCorrecao = XLSX.utils.aoa_to_sheet([cartasCorrecaoHeader, ...cartasCorrecaoData]);
  XLSX.utils.book_append_sheet(wb, wsCartasCorrecao, 'Cartas de Correção');

  // Aba 6: Faturamento por Cliente
  const faturamentoClienteHeader = ['Cliente', 'CNPJ', 'Valor Total', 'Qtd Notas', 'Ticket Médio', '% do Total'];
  const faturamentoClienteData = data.faturamentoPorCliente.map(cliente => [
    cliente.cliente,
    cliente.cnpj,
    cliente.valorTotal,
    cliente.quantidadeNotas,
    cliente.ticketMedio,
    `${cliente.percentualTotal.toFixed(1)}%`,
  ]);
  const wsFaturamentoCliente = XLSX.utils.aoa_to_sheet([faturamentoClienteHeader, ...faturamentoClienteData]);
  XLSX.utils.book_append_sheet(wb, wsFaturamentoCliente, 'Faturamento por Cliente');

  // Aba 7: Impostos
  const impostosHeader = ['Imposto', 'Alíquota Média', 'Valor', '% do Total'];
  const impostosData = data.impostos.map(imposto => [
    imposto.tipo,
    `${imposto.aliquotaMedia.toFixed(2)}%`,
    imposto.valor,
    `${imposto.percentualTotal.toFixed(1)}%`,
  ]);
  const wsImpostos = XLSX.utils.aoa_to_sheet([impostosHeader, ...impostosData]);
  XLSX.utils.book_append_sheet(wb, wsImpostos, 'Impostos');

  // Aba 8: Dados Mensais
  const dadosMensaisHeader = ['Mês', 'Faturamento', 'Qtd Notas', 'Tempo Médio (h)'];
  const dadosMensaisData = data.faturamentoPorMes.map(mes => [
    mes.mes,
    mes.faturamento,
    mes.quantidadeNotas,
    mes.tempoMedio,
  ]);
  const wsDadosMensais = XLSX.utils.aoa_to_sheet([dadosMensaisHeader, ...dadosMensaisData]);
  XLSX.utils.book_append_sheet(wb, wsDadosMensais, 'Dados Mensais');

  // Gerar arquivo
  const fileName = `Relatorio_Faturamento_${periodo.replace(/\s/g, '_')}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

export const exportNotasCanceladasToExcel = (notas: any[], periodo: string) => {
  const wb = XLSX.utils.book_new();
  
  const header = ['Número', 'Tipo', 'Cliente', 'Valor', 'Data Cancelamento', 'Motivo', 'Justificativa'];
  const data = notas.map(nota => [
    nota.numero,
    nota.tipo,
    nota.cliente,
    nota.valor,
    nota.dataCancelamento,
    nota.motivoCancelamento,
    nota.justificativa,
  ]);
  
  const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
  XLSX.utils.book_append_sheet(wb, ws, 'Notas Canceladas');
  
  const fileName = `Notas_Canceladas_${periodo.replace(/\s/g, '_')}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

export const exportNotasDevolucidasToExcel = (notas: any[], periodo: string) => {
  const wb = XLSX.utils.book_new();
  
  const header = ['Número', 'Tipo', 'Cliente', 'Valor', 'Data Devolução', 'Motivo', 'Status'];
  const data = notas.map(nota => [
    nota.numero,
    nota.tipo,
    nota.cliente,
    nota.valor,
    nota.dataDevolucao,
    nota.motivoDevolucao,
    nota.statusProcessamento === 'processada' ? 'Processada' : 'Em Processamento',
  ]);
  
  const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
  XLSX.utils.book_append_sheet(wb, ws, 'Notas Devolvidas');
  
  const fileName = `Notas_Devolvidas_${periodo.replace(/\s/g, '_')}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

export const exportCartasCorrecaoToExcel = (cartas: any[], periodo: string) => {
  const wb = XLSX.utils.book_new();
  
  const header = ['ID', 'NF-e', 'Cliente', 'Valor', 'Motivo', 'Data Correção', 'Protocolo'];
  const data = cartas.map(cc => [
    cc.id,
    cc.numeroNFe,
    cc.cliente,
    cc.valor,
    cc.motivoCorrecao,
    cc.dataCorrecao,
    cc.numeroProtocolo,
  ]);
  
  const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
  XLSX.utils.book_append_sheet(wb, ws, 'Cartas de Correção');
  
  const fileName = `Cartas_Correcao_${periodo.replace(/\s/g, '_')}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
