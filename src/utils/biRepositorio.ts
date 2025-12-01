import { Produto, DocumentoProduto } from "@/types/produto";

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

// Mock data de visualizações de documentos
export const documentosVisualizadosMock: DocumentoVisualizado[] = [
  {
    id: 'doc1',
    produtoId: 'prod1',
    produtoNome: 'ABL800 FLEX',
    tipo: 'catalogo',
    titulo: 'Catálogo ABL800 FLEX v3.2',
    visualizacoes: 45,
    ultimaVisualizacao: new Date('2024-11-28'),
    contexto: 'OS'
  },
  {
    id: 'doc2',
    produtoId: 'prod1',
    produtoNome: 'ABL800 FLEX',
    tipo: 'manual',
    titulo: 'Manual de Operação ABL800',
    visualizacoes: 38,
    ultimaVisualizacao: new Date('2024-11-27'),
    contexto: 'OS'
  },
  {
    id: 'doc3',
    produtoId: 'prod2',
    produtoNome: 'DxH 520',
    tipo: 'ficha_tecnica',
    titulo: 'Ficha Técnica DxH 520',
    visualizacoes: 32,
    ultimaVisualizacao: new Date('2024-11-26'),
    contexto: 'Licitacao'
  },
  {
    id: 'doc4',
    produtoId: 'prod1',
    produtoNome: 'ABL800 FLEX',
    tipo: 'comparativo',
    titulo: 'Comparativo ABL800 vs Concorrentes',
    visualizacoes: 28,
    ultimaVisualizacao: new Date('2024-11-25'),
    contexto: 'Licitacao'
  },
  {
    id: 'doc5',
    produtoId: 'prod3',
    produtoNome: 'AQT90 FLEX',
    tipo: 'justificativa',
    titulo: 'Justificativa Técnica AQT90',
    visualizacoes: 22,
    ultimaVisualizacao: new Date('2024-11-24'),
    contexto: 'Licitacao'
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
      
      switch(field) {
        case 'catalogo':
          return docsRelacionados.some(doc => doc.tipo === 'catalogo');
        case 'ficha_tecnica':
          return docsRelacionados.some(doc => doc.tipo === 'ficha_tecnica');
        case 'manual':
          return docsRelacionados.some(doc => doc.tipo === 'manual');
        case 'comparativo':
          return docsRelacionados.some(doc => doc.tipo === 'comparativo');
        case 'justificativa':
          return docsRelacionados.some(doc => doc.tipo === 'justificativa');
        case 'termo_referencia':
          return docsRelacionados.some(doc => doc.tipo === 'termo_referencia');
        case 'certificado':
          return docsRelacionados.some(doc => doc.tipo === 'certificado');
        case 'midia':
          return (produto.galeria && produto.galeria.length > 0) || 
                 (produto.videos && produto.videos.length > 0);
        default:
          return false;
      }
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
  dataInicio: Date,
  dataFim: Date,
  documentos: DocumentoProduto[]
): AtualizacaoPeriodo[] {
  const dias: { [key: string]: { uploads: number; alteracoes: number } } = {};
  
  // Mock: gerar dados para o período
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
    data,
    uploads: valores.uploads,
    alteracoes: valores.alteracoes
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
  
  return Object.entries(contadores).map(([contexto, total]) => ({
    contexto,
    total
  }));
}

export function getTotalVisualizacoes(): number {
  return documentosVisualizadosMock.reduce((sum, doc) => sum + doc.visualizacoes, 0);
}
