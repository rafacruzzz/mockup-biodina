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
const produtosMock: Produto[] = [
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
    profundidade: 48
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

export const getDocumentosPorProduto = (produtoId: string): DocumentoProduto[] => {
  // Mock - retorna array vazio por enquanto
  return [];
};

export const getComparativosPorProduto = (produtoId: string): ComparativoProduto[] => {
  // Mock - retorna array vazio por enquanto
  return [];
};

export const getHistoricoVersoesPorProduto = (produtoId: string): HistoricoVersaoProduto[] => {
  // Mock - retorna array vazio por enquanto
  return [];
};
