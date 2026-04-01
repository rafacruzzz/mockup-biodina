import { Marca, Linha, Produto, DocumentoProduto, ComparativoProduto, HistoricoVersaoProduto } from "@/types/produto";

// Mock data para Marcas
export const marcasMock: Marca[] = [
  {
    id: "marca-1",
    nome: "Beckman Coulter",
    logo: "/placeholder.svg",
    descricao: "Líder global em sistemas de diagnóstico in vitro",
    ultimaAtualizacao: new Date('2024-11-25'),
    arquivada: false
  },
  {
    id: "marca-2",
    nome: "Radiometer",
    logo: "/placeholder.svg",
    descricao: "Soluções inovadoras em gasometria",
    ultimaAtualizacao: new Date('2024-11-20'),
    arquivada: false
  },
  {
    id: "marca-3",
    nome: "Epredia",
    logo: "/placeholder.svg",
    descricao: "Soluções completas em anatomia patológica",
    ultimaAtualizacao: new Date('2024-11-15'),
    arquivada: false
  }
];

// Mock data para Linhas
export const linhasMock: Linha[] = [
  {
    id: "linha-1",
    nome: "Hematologia",
    marcaId: "marca-1",
    descricao: "Sistemas para análise hematológica completa",
    status: "ativo",
    statusCadastro: "completo",
    arquivada: false
  },
  {
    id: "linha-2",
    nome: "Gasometria",
    marcaId: "marca-2",
    descricao: "Equipamentos para análise de gases sanguíneos",
    status: "ativo",
    statusCadastro: "completo",
    arquivada: false
  },
  {
    id: "linha-3",
    nome: "Imunologia",
    marcaId: "marca-1",
    descricao: "Soluções para testes imunológicos",
    status: "ativo",
    statusCadastro: "incompleto",
    arquivada: false
  },
  {
    id: "linha-4",
    nome: "Anatomia Patológica",
    marcaId: "marca-3",
    descricao: "Equipamentos para processamento de tecidos",
    status: "ativo",
    statusCadastro: "completo",
    arquivada: false
  }
];

// Mock data para Produtos
export const produtosMock: Produto[] = [
  {
    id: "prod-1",
    codigo: "DXH520",
    nome: "DxH 520",
    linhaId: "linha-1",
    marcaId: "marca-1",
    descricao: "Analisador hematológico de alto desempenho",
    descritivoBreve: "Analisador hematológico compacto de 5 partes com tecnologia avançada de citometria de fluxo",
    descritivoCompleto: "O DxH 520 é um analisador hematológico de 5 partes que oferece resultados precisos e confiáveis para laboratórios de médio porte. Equipado com tecnologia VCS (Volume, Condutividade e Dispersão de luz), proporciona diferenciação leucocitária completa e detecção de células anormais. Possui capacidade de 80 testes/hora, reagentes com estabilidade prolongada e interface intuitiva touchscreen.",
    apresentacaoComercial: "Sistema compacto all-in-one com monitor touchscreen 10.4 polegadas, incluindo impressora térmica integrada, rack de amostras para 20 posições e módulo de refrigeração para reagentes",
    modeloProdutoMedico: "DxH 520 Hematology Analyzer",
    aplicacoes: "Hemograma completo com diferenciação leucocitária de 5 partes, contagem de reticulócitos, detecção de células anormais e bandas, análise de fluidos corporais",
    tagsProduto: ["hematologia", "hemograma", "leucócitos", "citometria", "laboratório"],
    palavrasChave: ["hematologia", "hemograma", "leucócitos"],
    catmat: "424660",
    status: "ativo",
    statusCadastro: "completo",
    registroAnvisa: "80123456789",
    parametrosChave: "Faixa de medição: WBC: 0,0 - 99,9 x 10³/µL\nPrecisão: CV < 2%\nVazão: 80 amostras/hora\nVolume de amostra: 175 µL",
    compatibilidades: "Reagentes: DxH SMS, CellPak, LH Diluent\nEquipamentos: Compatível com sistema DxH\nAcessórios: Racks universais, tubos com EDTA",
    requisitosInfraestrutura: "Energia: 110-240V, 50/60Hz, 500VA\nAr comprimido: Não requerido\nRede: Ethernet RJ45, conexão LIS opcional\nLaboratório: Área mínima 1,5m²",
    condicoesAmbientais: "Operação:\n- Temperatura: 15-30°C\n- Umidade: 20-80% sem condensação\n\nArmazenamento:\n- Temperatura: -10 a 50°C\n- Umidade: 10-95% sem condensação",
    conformidadesNormas: "IEC 61010-1: Segurança elétrica\nISO 13485: Sistema de gestão da qualidade\nIEC 61326-1: Compatibilidade eletromagnética\nRDC 16/2013 ANVISA: Registro de equipamentos médicos",
    pesoLiquido: 45.5,
    pesoBruto: 52.0,
    altura: 65,
    largura: 55,
    profundidade: 48,
    // Dimensões Com Embalagem
    pesoLiquidoComEmb: 45.5,
    pesoBrutoComEmb: 52.0,
    alturaComEmb: 75,
    larguraComEmb: 65,
    profundidadeComEmb: 58,
    // Dimensões Sem Embalagem
    pesoLiquidoSemEmb: 38.0,
    pesoBrutoSemEmb: 38.0,
    alturaSemEmb: 65,
    larguraSemEmb: 55,
    profundidadeSemEmb: 48,
    // Apresentação
    apresentacaoPrimaria: "Caixa individual com espuma de proteção e acessórios básicos",
    apresentacaoSecundaria: "Caixa de papelão reforçado com divisórias internas",
    apresentacaoEmbarque: "Palete com 2 unidades, filme stretch e cintas de segurança",
    referenciasComercializadas: ["DXH520-BR", "DXH520-KIT", "DXH520-REAGENTES"]
  }
];

// Funções de busca e navegação
export const buscarProdutos = (termo: string): Produto[] => {
  const termoLower = termo.toLowerCase();
  return produtosMock.filter(p =>
    p.nome.toLowerCase().includes(termoLower) ||
    p.codigo.toLowerCase().includes(termoLower) ||
    p.descricao.toLowerCase().includes(termoLower) ||
    p.palavrasChave.some(kw => kw.toLowerCase().includes(termoLower))
  );
};

export const getLinhasPorMarca = (marcaId: string): Linha[] => {
  return linhasMock.filter(l => l.marcaId === marcaId);
};

export const getProdutosPorLinha = (linhaId: string): Produto[] => {
  return produtosMock.filter(p => p.linhaId === linhaId);
};

export const contarLinhasPorMarca = (marcaId: string): number => {
  return linhasMock.filter(l => l.marcaId === marcaId && !l.arquivada).length;
};

export const contarProdutosPorMarca = (marcaId: string): number => {
  const linhas = linhasMock.filter(l => l.marcaId === marcaId && !l.arquivada);
  return linhas.reduce((total, linha) => {
    return total + produtosMock.filter(p => p.linhaId === linha.id).length;
  }, 0);
};

export const contarProdutosPorLinha = (linhaId: string): number => {
  return produtosMock.filter(p => p.linhaId === linhaId).length;
};

// Mock de documentos com versionamento e rastreabilidade
export const documentosMockCompletos: DocumentoProduto[] = [
  {
    id: 'doc-1', produtoId: 'prod-1', tipo: 'catalogo', titulo: 'Catálogo DxH 520 v3.2',
    versao: '3.2', idioma: 'pt-BR', dataUpload: new Date('2024-11-10'), uploadPor: 'Ana Silva', arquivo: 'catalogo_dxh520_v3.2.pdf',
    bloqueadoSobrescrita: false,
    dataProximaRevalidacao: new Date('2025-05-10'),
    historicoVersoes: [
      { versao: '3.2', dataAprovacao: new Date('2024-11-10'), aprovadoPor: 'Carlos Mendes', arquivo: 'catalogo_dxh520_v3.2.pdf' },
      { versao: '3.1', dataAprovacao: new Date('2024-08-15'), aprovadoPor: 'Carlos Mendes', arquivo: 'catalogo_dxh520_v3.1.pdf' },
      { versao: '3.0', dataAprovacao: new Date('2024-03-01'), aprovadoPor: 'Maria Santos', arquivo: 'catalogo_dxh520_v3.0.pdf' },
    ],
    changelog: [
      { id: 'cl-1', artefatoId: 'doc-1', tipoArtefato: 'catalogo', versaoAnterior: '3.1', versaoNova: '3.2', oqueMudou: 'Atualização de especificações de reagentes', porqueMudou: 'Novo lote de reagentes com composição ajustada', aprovadoPor: 'Carlos Mendes', aprovadoEm: new Date('2024-11-10'), alteradoPor: 'Ana Silva', alteradoEm: new Date('2024-11-08') },
      { id: 'cl-2', artefatoId: 'doc-1', tipoArtefato: 'catalogo', versaoAnterior: '3.0', versaoNova: '3.1', oqueMudou: 'Correção de imagens do equipamento', porqueMudou: 'Fotos desatualizadas do modelo anterior', aprovadoPor: 'Carlos Mendes', aprovadoEm: new Date('2024-08-15'), alteradoPor: 'Ana Silva', alteradoEm: new Date('2024-08-12') },
    ]
  },
  {
    id: 'doc-2', produtoId: 'prod-1', tipo: 'manual', titulo: 'IFU/POP DxH 520',
    versao: '2.1', idioma: 'pt-BR', dataUpload: new Date('2024-10-20'), uploadPor: 'Pedro Lima', arquivo: 'ifu_dxh520_v2.1.pdf',
    bloqueadoSobrescrita: true,
    dataProximaRevalidacao: new Date('2025-04-20'),
    historicoVersoes: [
      { versao: '2.1', dataAprovacao: new Date('2024-10-20'), aprovadoPor: 'Maria Santos', arquivo: 'ifu_dxh520_v2.1.pdf' },
      { versao: '2.0', dataAprovacao: new Date('2024-04-10'), aprovadoPor: 'Maria Santos', arquivo: 'ifu_dxh520_v2.0.pdf' },
    ],
    changelog: [
      { id: 'cl-3', artefatoId: 'doc-2', tipoArtefato: 'ifu_pop', versaoAnterior: '2.0', versaoNova: '2.1', oqueMudou: 'Atualização de procedimento de calibração', porqueMudou: 'Nova norma ISO 15189:2022', aprovadoPor: 'Maria Santos', aprovadoEm: new Date('2024-10-20'), alteradoPor: 'Pedro Lima', alteradoEm: new Date('2024-10-18') },
    ]
  },
  {
    id: 'doc-3', produtoId: 'prod-1', tipo: 'ficha_tecnica', titulo: 'Ficha Técnica DxH 520',
    versao: '1.5', idioma: 'pt-BR', dataUpload: new Date('2024-09-15'), uploadPor: 'Ana Silva', arquivo: 'ficha_dxh520_v1.5.pdf',
    bloqueadoSobrescrita: false,
    dataProximaRevalidacao: new Date('2025-03-15'),
    historicoVersoes: [
      { versao: '1.5', dataAprovacao: new Date('2024-09-15'), aprovadoPor: 'Carlos Mendes', arquivo: 'ficha_dxh520_v1.5.pdf' },
    ],
    changelog: [
      { id: 'cl-4', artefatoId: 'doc-3', tipoArtefato: 'ficha_tecnica', versaoAnterior: '1.4', versaoNova: '1.5', oqueMudou: 'Inclusão de novos parâmetros de medição', porqueMudou: 'Atualização de firmware do equipamento', aprovadoPor: 'Carlos Mendes', aprovadoEm: new Date('2024-09-15'), alteradoPor: 'Ana Silva', alteradoEm: new Date('2024-09-12') },
    ]
  },
  {
    id: 'doc-4', produtoId: 'prod-1', tipo: 'comparativo', titulo: 'Comparativo DxH 520 vs Concorrentes',
    versao: '1.0', idioma: 'pt-BR', dataUpload: new Date('2024-11-01'), uploadPor: 'Lucas Ferreira', arquivo: 'comparativo_dxh520.pdf',
    bloqueadoSobrescrita: false,
    changelog: []
  },
  {
    id: 'doc-5', produtoId: 'prod-1', tipo: 'justificativa', titulo: 'Justificativa Técnica DxH 520',
    versao: '1.0', idioma: 'pt-BR', dataUpload: new Date('2024-10-05'), uploadPor: 'Lucas Ferreira', arquivo: 'justificativa_dxh520.pdf',
    bloqueadoSobrescrita: false,
    changelog: []
  },
  {
    id: 'doc-6', produtoId: 'prod-1', tipo: 'termo_referencia', titulo: 'TR DxH 520',
    versao: '2.0', idioma: 'pt-BR', dataUpload: new Date('2024-11-20'), uploadPor: 'Ana Silva', arquivo: 'tr_dxh520_v2.pdf',
    bloqueadoSobrescrita: true,
    dataProximaRevalidacao: new Date('2025-04-01'),
    historicoVersoes: [
      { versao: '2.0', dataAprovacao: new Date('2024-11-20'), aprovadoPor: 'Maria Santos', arquivo: 'tr_dxh520_v2.pdf' },
      { versao: '1.0', dataAprovacao: new Date('2024-05-01'), aprovadoPor: 'Maria Santos', arquivo: 'tr_dxh520_v1.pdf' },
    ],
    changelog: [
      { id: 'cl-5', artefatoId: 'doc-6', tipoArtefato: 'termo_referencia', versaoAnterior: '1.0', versaoNova: '2.0', oqueMudou: 'Revisão completa do termo', porqueMudou: 'Adequação à nova legislação de licitações', aprovadoPor: 'Maria Santos', aprovadoEm: new Date('2024-11-20'), alteradoPor: 'Ana Silva', alteradoEm: new Date('2024-11-18') },
    ]
  },
];

export const getDocumentosPorProduto = (produtoId: string): DocumentoProduto[] => {
  return documentosMockCompletos.filter(d => d.produtoId === produtoId);
};

export const getComparativosPorProduto = (produtoId: string): ComparativoProduto[] => {
  // Mock - retorna array vazio por enquanto
  return [];
};

export const getHistoricoVersoesPorProduto = (produtoId: string): HistoricoVersaoProduto[] => {
  // Mock - retorna array vazio por enquanto
  return [];
};
