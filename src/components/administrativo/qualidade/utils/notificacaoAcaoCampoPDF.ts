import jsPDF from "jspdf";
import { NotificacaoAcaoCampoData } from "@/types/acaoCampo";

export const gerarNotificacaoAcaoCampoPDF = (dados: NotificacaoAcaoCampoData): Blob => {
  const doc = new jsPDF();
  let y = 15;
  const lm = 15;
  const pw = 180;

  const title = (text: string) => {
    if (y > 270) { doc.addPage(); y = 15; }
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(text, lm, y);
    y += 7;
  };

  const field = (label: string, value: string) => {
    if (y > 275) { doc.addPage(); y = 15; }
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}: `, lm, y);
    doc.setFont("helvetica", "normal");
    const labelW = doc.getTextWidth(`${label}: `);
    const lines = doc.splitTextToSize(value || '-', pw - labelW);
    doc.text(lines, lm + labelW, y);
    y += lines.length * 4.5 + 2;
  };

  // Header
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("FORMULÁRIO DE NOTIFICAÇÃO DE AÇÃO DE CAMPO", lm, y);
  y += 10;

  // 1
  title("1. INFORMAÇÕES GERAIS");
  field("CNPJ", dados.cnpj);
  field("Razão Social", dados.razaoSocial);
  field("Endereço", dados.endereco);
  field("UF", dados.uf);
  field("Município", dados.municipio);
  field("Responsável", dados.responsavelNome);
  field("Cargo", dados.responsavelCargo);
  field("Telefone", dados.responsavelTelefone);
  field("E-mail", dados.responsavelEmail);
  field("Data Início", dados.dataInicioAcao);
  field("Código", dados.codigoAcao);

  // 2
  title("2. PRODUTO");
  field("Tipo", dados.tipoProduto);
  dados.produtos.forEach((p, i) => {
    if (y > 260) { doc.addPage(); y = 15; }
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Produto ${i + 1}`, lm, y);
    y += 5;
    field("Nome Comercial", p.nomeComercial);
    field("Nome Técnico", p.nomeTecnico);
    field("Registro", p.registroNotificacao);
    field("Classe Risco", p.classeRisco);
    field("Cód. Referência", p.codigoReferencia);
    field("Modelo", p.modelo);
    field("Lote/Série", p.loteSerie);
  });
  field("Fabricante", `${dados.fabricanteNome} - ${dados.fabricantePais}`);
  field("Qtd Total Envolvidos", dados.quantidadeTotalEnvolvidos);
  field("UFs Distribuição", dados.distribuicaoUFs.join(', ') || '-');

  // 3
  doc.addPage(); y = 15;
  title("3. AÇÃO DE CAMPO");
  field("Classificação Risco", dados.classificacaoRisco);
  field("Classificação Ação", dados.classificacaoAcao.join(', '));
  if (dados.classificacaoAcao.includes('Recolhimento')) {
    field("Destinação Final", dados.destinacaoFinal);
  }
  field("Enquadramento", dados.enquadramento.join(', '));

  // 4
  title("4. DESCRIÇÃO DO PROBLEMA E AVALIAÇÃO DO RISCO");
  field("Data Identificação", dados.dataIdentificacaoProblema);
  field("Descrição do Problema", dados.descricaoProblema);
  field("Avaliação de Risco", dados.avaliacaoRisco);
  field("Possíveis Consequências", dados.possiveisConsequencias);
  field("Recomendação", dados.recomendacaoUsuarios);
  field("Notificações Notivisa", dados.notificacoesNotivisa ? `Sim - ${dados.numerosNotificacoes}` : 'Não');

  // 5
  if (y > 240) { doc.addPage(); y = 15; }
  title("5. PLANO DE AÇÃO");
  dados.planosAcao.forEach((pa, i) => {
    if (y > 260) { doc.addPage(); y = 15; }
    field(`Ação ${i + 1}`, pa.descricao);
    field("Período", `${pa.inicio || '-'} a ${pa.fim || '-'}`);
    field("Situação", pa.situacao);
    if (pa.observacoes) field("Obs", pa.observacoes);
  });

  // 6
  if (y > 250) { doc.addPage(); y = 15; }
  title("6. OBSERVAÇÕES");
  field("Observações", dados.observacoes);
  field("Local", dados.local);
  field("Data", dados.data);
  field("Nome Legível", dados.nomeLegivel);

  return doc.output("blob");
};
