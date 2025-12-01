import { Marca, Linha, Produto, DocumentoProduto, ComparativoProduto, HistoricoVersaoProduto } from "@/types/produto";

// Mock data para Marcas
export const marcasMock: Marca[] = [
  {
    id: "marca-1",
    nome: "Beckman Coulter",
    logo: "/placeholder.svg",
    descricao: "Líder global em sistemas de diagnóstico in vitro"
  },
  {
    id: "marca-2",
    nome: "Radiometer",
    logo: "/placeholder.svg",
    descricao: "Soluções inovadoras em gasometria"
  }
];

// Mock data para Linhas
export const linhasMock: Linha[] = [
  {
    id: "linha-1",
    nome: "Hematologia",
    marcaId: "marca-1",
    descricao: "Sistemas para análise hematológica completa"
  },
  {
    id: "linha-2",
    nome: "Gasometria",
    marcaId: "marca-2",
    descricao: "Equipamentos para análise de gases sanguíneos"
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
    aplicacoes: "Hemograma completo com diferenciação leucocitária de 5 partes, contagem de reticulócitos, detecção de células anormais e bandas, análise de fluidos corporais",
    tagsProduto: ["hematologia", "hemograma", "leucócitos", "citometria", "laboratório"],
    palavrasChave: ["hematologia", "hemograma", "leucócitos"],
    status: "ativo",
    statusCadastro: "completo",
    registroAnvisa: "80123456789"
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
