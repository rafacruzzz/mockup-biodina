import { Produto, DocumentoProduto, Marca, Linha, ChangelogEntry } from "@/types/produto";

export interface MetricaCobertura {
  tipo: string;
  total: number;
  comDocumento: number;
  percentual: number;
}

export interface AtualizacaoPeriodo {
  data: string;
  uploads: number;
  alteracoes: number;
}

export interface DocumentoVisualizado {
  id: string;
  produtoId: string;
  produtoNome: string;
  tipo: string;
  titulo: string;
  visualizacoes: number;
  ultimaVisualizacao: Date;
  contexto: 'OS' | 'Licitacao' | 'Outros';
}

export interface MarcaLinhaStats {
  marcaId: string;
  marcaNome: string;
  linhas: {
    linhaId: string;
    linhaNome: string;
    totalProdutos: number;
    totalDocumentos: number;
    cobertura: number;
    atualizacoesNoPeriodo: number;
  }[];
  totalProdutos: number;
  totalDocumentos: number;
  coberturaMedia: number;
  atualizacoesTotais: number;
}

// Mock data de visualizações de documentos
export const documentosVisualizadosMock: DocumentoVisualizado[] = [
  {
    id: 'doc1', produtoId: 'prod1', produtoNome: 'ABL800 FLEX',
    tipo: 'catalogo', titulo: 'Catálogo ABL800 FLEX v3.2',
    visualizacoes: 45, ultimaVisualizacao: new Date('2024-11-28'), contexto: 'OS'
  },
  {
    id: 'doc2', produtoId: 'prod1', produtoNome: 'ABL800 FLEX',
    tipo: 'manual', titulo: 'Manual de Operação ABL800',
    visualizacoes: 38, ultimaVisualizacao: new Date('2024-11-27'), contexto: 'OS'
  },
  {
    id: 'doc3', produtoId: 'prod2', produtoNome: 'DxH 520',
    tipo: 'ficha_tecnica', titulo: 'Ficha Técnica DxH 520',
    visualizacoes: 32, ultimaVisualizacao: new Date('2024-11-26'), contexto: 'Licitacao'
  },
  {
    id: 'doc4', produtoId: 'prod1', produtoNome: 'ABL800 FLEX',
    tipo: 'comparativo', titulo: 'Comparativo ABL800 vs Concorrentes',
    visualizacoes: 28, ultimaVisualizacao: new Date('2024-11-25'), contexto: 'Licitacao'
  },
  {
    id: 'doc5', produtoId: 'prod3', produtoNome: 'AQT90 FLEX',
    tipo: 'justificativa', titulo: 'Justificativa Técnica AQT90',
    visualizacoes: 22, ultimaVisualizacao: new Date('2024-11-24'), contexto: 'Licitacao'
  }
];

export function calcularCoberturaRepositorio(produtos: Produto[], documentos: DocumentoProduto[]): MetricaCobertura[] {
  const totalProdutos = produtos.length;
  
  const tiposDocumento = [
    { tipo: 'Catálogo', field: 'catalogo' },
    { tipo: 'Ficha Técnica', field: 'ficha_tecnica' },
    { tipo: 'IFU/POP/Manual', field: 'manual' },
    { tipo: 'Comparativo Técnico', field: 'comparativo' },
    { tipo: 'Justificativa Técnica', field: 'justificativa' },
    { tipo: 'Termo de Referência', field: 'termo_referencia' },
    { tipo: 'Certificado de Treinamento', field: 'certificado' },
    { tipo: 'Imagens/Vídeos/Artigos', field: 'midia' }
  ];

  return tiposDocumento.map(({ tipo, field }) => {
    const comDocumento = produtos.filter(produto => {
      const docsRelacionados = documentos.filter(doc => doc.produtoId === produto.id);
      
      if (field === 'midia') {
        return (produto.galeria && produto.galeria.length > 0) || 
               (produto.videos && produto.videos.length > 0);
      }
      return docsRelacionados.some(doc => doc.tipo === field);
    }).length;

    return {
      tipo,
      total: totalProdutos,
      comDocumento,
      percentual: totalProdutos > 0 ? Math.round((comDocumento / totalProdutos) * 100) : 0
    };
  });
}

export function getAtualizacoesPorPeriodo(
  dataInicio: Date, dataFim: Date, documentos: DocumentoProduto[]
): AtualizacaoPeriodo[] {
  const dias: { [key: string]: { uploads: number; alteracoes: number } } = {};
  const diff = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i <= diff; i++) {
    const data = new Date(dataInicio);
    data.setDate(data.getDate() + i);
    const dataStr = data.toISOString().split('T')[0];
    dias[dataStr] = {
      uploads: Math.floor(Math.random() * 5),
      alteracoes: Math.floor(Math.random() * 3)
    };
  }
  
  return Object.entries(dias).map(([data, valores]) => ({
    data, uploads: valores.uploads, alteracoes: valores.alteracoes
  }));
}

export function getDocumentosMaisAcessados(limit: number = 10): DocumentoVisualizado[] {
  return [...documentosVisualizadosMock]
    .sort((a, b) => b.visualizacoes - a.visualizacoes)
    .slice(0, limit);
}

export function getVisualizacoesPorContexto(): { contexto: string; total: number }[] {
  const contadores: { [key: string]: number } = {};
  documentosVisualizadosMock.forEach(doc => {
    contadores[doc.contexto] = (contadores[doc.contexto] || 0) + doc.visualizacoes;
  });
  return Object.entries(contadores).map(([contexto, total]) => ({ contexto, total }));
}

export function getTotalVisualizacoes(): number {
  return documentosVisualizadosMock.reduce((sum, doc) => sum + doc.visualizacoes, 0);
}

// --- Novas funções para Marca/Linha e Versionamento ---

export function getAtualizacoesPorMarcaLinha(
  marcas: Marca[], linhas: Linha[], produtos: Produto[], documentos: DocumentoProduto[]
): MarcaLinhaStats[] {
  return marcas.filter(m => !m.arquivada).map(marca => {
    const linhasDaMarca = linhas.filter(l => l.marcaId === marca.id && !l.arquivada);
    
    const linhasStats = linhasDaMarca.map(linha => {
      const produtosDaLinha = produtos.filter(p => p.linhaId === linha.id);
      const produtoIds = produtosDaLinha.map(p => p.id);
      const docsDaLinha = documentos.filter(d => produtoIds.includes(d.produtoId));
      
      const tiposEsperados = 6; // catalogo, ficha, manual, comparativo, justificativa, TR
      const tiposPresentes = new Set(docsDaLinha.map(d => d.tipo)).size;
      const cobertura = produtosDaLinha.length > 0 
        ? Math.round((tiposPresentes / tiposEsperados) * 100) 
        : 0;

      // Mock: atualizações recentes
      const atualizacoesNoPeriodo = docsDaLinha.filter(d => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return d.dataUpload >= thirtyDaysAgo;
      }).length;

      return {
        linhaId: linha.id,
        linhaNome: linha.nome,
        totalProdutos: produtosDaLinha.length,
        totalDocumentos: docsDaLinha.length,
        cobertura,
        atualizacoesNoPeriodo
      };
    });

    const totalProdutos = linhasStats.reduce((s, l) => s + l.totalProdutos, 0);
    const totalDocumentos = linhasStats.reduce((s, l) => s + l.totalDocumentos, 0);
    const coberturaMedia = linhasStats.length > 0
      ? Math.round(linhasStats.reduce((s, l) => s + l.cobertura, 0) / linhasStats.length)
      : 0;
    const atualizacoesTotais = linhasStats.reduce((s, l) => s + l.atualizacoesNoPeriodo, 0);

    return {
      marcaId: marca.id,
      marcaNome: marca.nome,
      linhas: linhasStats,
      totalProdutos,
      totalDocumentos,
      coberturaMedia,
      atualizacoesTotais
    };
  });
}

export function getChangelogRecente(documentos: DocumentoProduto[], limit: number = 10): (ChangelogEntry & { documentoTitulo: string })[] {
  const allChangelogs: (ChangelogEntry & { documentoTitulo: string })[] = [];
  
  documentos.forEach(doc => {
    if (doc.changelog) {
      doc.changelog.forEach(cl => {
        allChangelogs.push({ ...cl, documentoTitulo: doc.titulo });
      });
    }
  });

  return allChangelogs
    .sort((a, b) => new Date(b.alteradoEm).getTime() - new Date(a.alteradoEm).getTime())
    .slice(0, limit);
}

export function getDocumentosBloqueados(documentos: DocumentoProduto[]): DocumentoProduto[] {
  return documentos.filter(d => d.bloqueadoSobrescrita === true);
}

export function getProximasRevalidacoes(documentos: DocumentoProduto[], diasLimite: number = 30): DocumentoProduto[] {
  const hoje = new Date();
  const limite = new Date();
  limite.setDate(hoje.getDate() + diasLimite);

  return documentos
    .filter(d => d.dataProximaRevalidacao && d.dataProximaRevalidacao <= limite)
    .sort((a, b) => (a.dataProximaRevalidacao!.getTime()) - (b.dataProximaRevalidacao!.getTime()));
}
