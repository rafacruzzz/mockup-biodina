import jsPDF from 'jspdf';
import { RegistroAnvisaData } from '@/types/anvisaRegistro';

export const generateAnvisaPDF = (registroData: RegistroAnvisaData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 20;

  // Função para adicionar nova página se necessário
  const checkNewPage = (needed: number = 10) => {
    if (yPosition + needed > pdf.internal.pageSize.height - 20) {
      pdf.addPage();
      yPosition = 20;
    }
  };

  // Cabeçalho
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('REGISTRO ANVISA - RELATÓRIO COMPLETO', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Linha divisória
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 15;

  // Informações do Produto
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text('INFORMAÇÕES DO PRODUTO', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  
  if (registroData.produtoSelecionado) {
    pdf.text(`Código: ${registroData.produtoSelecionado.codigo || 'N/A'}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`Nome: ${registroData.produtoSelecionado.nome || 'N/A'}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`Marca: ${registroData.produtoSelecionado.marca || 'N/A'}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`Fabricante: ${registroData.produtoSelecionado.fabricante || 'N/A'}`, 20, yPosition);
    yPosition += 10;
  }

  checkNewPage();

  // Informações Regulatórias
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text('INFORMAÇÕES REGULATÓRIAS DA ANVISA', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');

  const areaLabel = registroData.areaAnvisa === 'produtos_saude' ? 'Produtos para Saúde (Correlatos)' : 
                   registroData.areaAnvisa === 'diagnostico_in_vitro' ? 'Produto para diagnóstico de uso in vitro' : 
                   registroData.areaAnvisa || 'N/A';

  pdf.text(`Área da Anvisa: ${areaLabel}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Nº do processo na Anvisa: ${registroData.numeroProcessoAnvisa || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Assunto: ${registroData.assunto || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Motivo do peticionamento: ${registroData.motivoPeticionamento || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Transação: ${registroData.transacao || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Expediente: ${registroData.expediente || 'N/A'}`, 20, yPosition);
  yPosition += 10;

  checkNewPage();

  // Datas
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('DATAS IMPORTANTES', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  
  pdf.text(`Data de envio: ${registroData.dataEnvio ? new Date(registroData.dataEnvio).toLocaleDateString() : 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Data da Publicação no DOU: ${registroData.dataPublicacaoDOU ? new Date(registroData.dataPublicacaoDOU).toLocaleDateString() : 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Número da Publicação no DOU: ${registroData.numeroPublicacaoDOU || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Nº Notificação/Registro: ${registroData.numeroNotificacaoRegistro || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Data para alerta: ${registroData.dataAlertaDisponibilizacao ? new Date(registroData.dataAlertaDisponibilizacao).toLocaleDateString() : 'N/A'}`, 20, yPosition);
  yPosition += 10;

  checkNewPage();

  // Informações do Fabricante/Produto
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('INFORMAÇÕES DETALHADAS DO PRODUTO', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');

  const infosProduto = [
    { label: 'Fabricante', value: registroData.fabricante },
    { label: 'Código do Produto (fabricante)', value: registroData.codigoProdutoFabricante },
    { label: 'Nome do Produto (fabricante)', value: registroData.nomeProdutoFabricante },
    { label: 'Nome do Detentor', value: registroData.nomeDetentorNotificacao },
    { label: 'CNPJ do Detentor', value: registroData.cnpjDetentor },
    { label: 'Nome do Produto no Brasil', value: registroData.nomeProdutoBrasil },
    { label: 'Nome Técnico na Anvisa', value: registroData.nomeTecnicoAnvisa },
    { label: 'Número do Registro na Anvisa', value: registroData.numeroRegistroAnvisa },
    { label: 'Situação do Registro', value: registroData.situacaoRegistro },
    { label: 'Classificação de Risco', value: registroData.classificacaoRisco },
    { label: 'Marca', value: registroData.marca },
    { label: 'Modelo', value: registroData.modelo },
    { label: 'Linha', value: registroData.linha }
  ];

  infosProduto.forEach(info => {
    pdf.text(`${info.label}: ${info.value || 'N/A'}`, 20, yPosition);
    yPosition += 5;
    checkNewPage();
  });

  yPosition += 5;

  // Apresentações
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('APRESENTAÇÕES', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  
  pdf.text(`Primária: ${registroData.apresentacaoPrimaria || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Secundária: ${registroData.apresentacaoSecundaria || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Terciária: ${registroData.apresentacaoTerciaria || 'N/A'}`, 20, yPosition);
  yPosition += 10;

  checkNewPage();

  // Informações de Marketing
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('INFORMAÇÕES DE MARKETING', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  
  pdf.text(`Nome de Marketing: ${registroData.nomeMarketing || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Breve Descritivo: ${registroData.breveDescritivo || 'N/A'}`, 20, yPosition);
  yPosition += 5;
  
  if (registroData.descritivoCompleto) {
    pdf.text('Descritivo Completo:', 20, yPosition);
    yPosition += 5;
    const lines = pdf.splitTextToSize(registroData.descritivoCompleto, pageWidth - 40);
    pdf.text(lines, 20, yPosition);
    yPosition += lines.length * 5;
  }
  
  pdf.text(`Tags: ${registroData.tags || 'N/A'}`, 20, yPosition);
  yPosition += 10;

  checkNewPage();

  // Referências e Links
  if (registroData.referenciasComercializadas) {
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('REFERÊNCIAS COMERCIALIZADAS', 20, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    const refLines = pdf.splitTextToSize(registroData.referenciasComercializadas, pageWidth - 40);
    pdf.text(refLines, 20, yPosition);
    yPosition += refLines.length * 5 + 10;
  }

  checkNewPage();

  // Links
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('LINKS DE REFERÊNCIA', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');

  const links = [
    { label: 'Consulta Anvisa', value: registroData.linkConsultaAnvisa },
    { label: 'Análise Concorrência', value: registroData.linkAnaliseConcorrencia },
    { label: 'Ficha Técnica', value: registroData.linkFichaTecnica },
    { label: 'Banco de Imagens', value: registroData.linkBancoImagens },
    { label: 'Treinamento Apresentação', value: registroData.linkTreinamentoApresentacao },
    { label: 'Treinamento Científico', value: registroData.linkTreinamentoCientifico },
    { label: 'Treinamento Manutenção', value: registroData.linkTreinamentoManutencao }
  ];

  links.forEach(link => {
    if (link.value) {
      pdf.text(`${link.label}: ${link.value}`, 20, yPosition);
      yPosition += 5;
      checkNewPage();
    }
  });

  yPosition += 10;

  checkNewPage();

  // Instrução de Uso
  if (registroData.disponibilizacaoInstrucaoUso) {
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('DISPONIBILIZAÇÃO DE INSTRUÇÃO DE USO', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    
    pdf.text(`Disponibilização: ${registroData.disponibilizacaoInstrucaoUso}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`Transação: ${registroData.transacaoInstrucao || 'N/A'}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`Expediente: ${registroData.expedienteInstrucao || 'N/A'}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`Data de envio: ${registroData.dataEnvioInstrucao ? new Date(registroData.dataEnvioInstrucao).toLocaleDateString() : 'N/A'}`, 20, yPosition);
    yPosition += 5;
    
    if (registroData.arquivoInstrucaoUso) {
      pdf.text(`Arquivo anexado: ${registroData.arquivoInstrucaoUso.nome}`, 20, yPosition);
      yPosition += 5;
    }
  }

  // Observações Gerais
  if (registroData.observacaoGeral) {
    checkNewPage();
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('OBSERVAÇÕES GERAIS', 20, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    const obsLines = pdf.splitTextToSize(registroData.observacaoGeral, pageWidth - 40);
    pdf.text(obsLines, 20, yPosition);
  }

  // Rodapé
  const totalPages = pdf.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Gerado em: ${new Date().toLocaleString()}`, 20, pdf.internal.pageSize.height - 10);
    pdf.text(`Página ${i} de ${totalPages}`, pageWidth - 40, pdf.internal.pageSize.height - 10);
  }

  // Nome do arquivo
  const fileName = `Registro_ANVISA_${registroData.produtoSelecionado?.codigo || 'produto'}_${registroData.numeroProcessoAnvisa || 'processo'}_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Download do PDF
  pdf.save(fileName);
};