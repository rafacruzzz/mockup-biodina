import { Marca, Linha, Produto, DocumentoProduto, ComparativoProduto, HistoricoVersaoProduto } from "@/types/produto";

export const marcasMock: Marca[] = [
  {
    id: "marca-001",
    nome: "Radiometer",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
    descricao: "Líder mundial em gasometria e análises de ponto de atendimento",
  },
];

export const linhasMock: Linha[] = [
  {
    id: "linha-001",
    nome: "ABL Série 800",
    marcaId: "marca-001",
    descricao: "Analisadores de gases sanguíneos de alta precisão",
    imagem: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
  },
  {
    id: "linha-002",
    nome: "ABL Série 90",
    marcaId: "marca-001",
    descricao: "Analisadores compactos para laboratórios menores",
    imagem: "https://images.unsplash.com/photo-1583912086096-8c60d75a53f6?w=400&h=300&fit=crop",
  },
];

export const produtosMock: Produto[] = [
  {
    id: "prod-001",
    codigo: "ABL800-FLEX",
    nome: "ABL800 FLEX",
    linhaId: "linha-001",
    marcaId: "marca-001",
    descricao: "Analisador de gases sanguíneos com tecnologia de ponta para análises críticas",
    aplicacoes: ["UTI", "Emergência", "Centro Cirúrgico", "Laboratório Central"],
    palavrasChave: ["gasometria", "pH", "eletrólitos", "análise sanguínea"],
    status: "ativo",
    statusCadastro: "completo",
    imagem: "https://images.unsplash.com/photo-1581093458791-9d42e1d5e2e0?w=400&h=300&fit=crop",
    especificacoesTecnicas: "Capacidade: 60 amostras/hora\nTecnologia: Eletrodos seletivos\nParâmetros: pH, pCO2, pO2, Na+, K+, Ca++, Cl-, Glicose, Lactato",
    peso: "45 kg",
    dimensoes: "60 x 50 x 65 cm",
    registroAnvisa: "80284510023",
    linkConsultaAnvisa: "https://consultas.anvisa.gov.br/#/medicamentos/",
  },
  {
    id: "prod-002",
    codigo: "ABL800-BASIC",
    nome: "ABL800 BASIC",
    linhaId: "linha-001",
    marcaId: "marca-001",
    descricao: "Versão básica do analisador ABL800 com recursos essenciais",
    aplicacoes: ["Clínicas", "Laboratórios de médio porte"],
    palavrasChave: ["gasometria", "análise básica", "eletrólitos"],
    status: "ativo",
    statusCadastro: "incompleto",
    imagem: "https://images.unsplash.com/photo-1579154204629-cd2d4e5f5ecf?w=400&h=300&fit=crop",
    especificacoesTecnicas: "Capacidade: 40 amostras/hora\nParâmetros: pH, pCO2, pO2, Na+, K+, Ca++",
    peso: "40 kg",
    dimensoes: "55 x 45 x 60 cm",
    registroAnvisa: "80284510024",
  },
  {
    id: "prod-003",
    codigo: "ABL90-FLEX-PLUS",
    nome: "ABL90 FLEX PLUS",
    linhaId: "linha-002",
    marcaId: "marca-001",
    descricao: "Analisador compacto com alto desempenho",
    aplicacoes: ["Point of Care", "Unidades móveis"],
    palavrasChave: ["portátil", "compacto", "gasometria"],
    status: "ativo",
    statusCadastro: "completo",
    imagem: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=300&fit=crop",
    peso: "15 kg",
    dimensoes: "30 x 35 x 40 cm",
  },
  {
    id: "prod-006",
    codigo: "ABL800-LEGACY",
    nome: "ABL800 Legacy",
    linhaId: "linha-001",
    marcaId: "marca-001",
    descricao: "Modelo anterior do ABL800 (descontinuado)",
    aplicacoes: ["Substituído por ABL800 FLEX"],
    palavrasChave: ["descontinuado", "legacy"],
    status: "descontinuado",
  },
];

export const documentosProdutoMock: DocumentoProduto[] = [
  {
    id: "doc-001",
    produtoId: "prod-001",
    tipo: "catalogo",
    titulo: "Catálogo ABL800 FLEX",
    versao: "3.0",
    idioma: "PT-BR",
    dataUpload: new Date(2025, 0, 15),
    uploadPor: "Dr. Carlos Mendes",
    arquivo: "catalogo-abl800-flex-v3.pdf",
  },
  {
    id: "doc-002",
    produtoId: "prod-001",
    tipo: "manual",
    titulo: "Manual do Usuário ABL800 FLEX",
    versao: "2.5",
    idioma: "PT-BR",
    dataUpload: new Date(2025, 0, 20),
    uploadPor: "Equipe Técnica",
    arquivo: "manual-abl800-flex-v2.5.pdf",
    historicoVersoes: [
      {
        versao: "2.0",
        dataAprovacao: new Date(2024, 2, 15),
        aprovadoPor: "Mariana Silva",
        arquivo: "manual-abl800-flex-v2.0.pdf",
      },
      {
        versao: "1.5",
        dataAprovacao: new Date(2023, 8, 1),
        aprovadoPor: "Ana Costa",
        arquivo: "manual-abl800-flex-v1.5.pdf",
      },
    ],
  },
  {
    id: "doc-003",
    produtoId: "prod-001",
    tipo: "manual",
    titulo: "User Manual ABL800 FLEX",
    versao: "2.5",
    idioma: "EN",
    dataUpload: new Date(2024, 11, 10),
    uploadPor: "Equipe Técnica",
    arquivo: "manual-abl800-flex-v2.5-en.pdf",
  },
  {
    id: "doc-004",
    produtoId: "prod-001",
    tipo: "artigo",
    titulo: "Estudo Clínico: Precisão do ABL800 em Análises de Emergência",
    versao: "1.0",
    idioma: "PT-BR",
    dataUpload: new Date(2024, 9, 5),
    uploadPor: "Dra. Maria Santos",
    arquivo: "artigo-clinico-abl800.pdf",
  },
  // Documentos ABL800 BASIC
  {
    id: "doc-005",
    produtoId: "prod-002",
    tipo: "manual",
    titulo: "Manual de Operação (IFU) - PT-BR",
    versao: "2.1",
    idioma: "PT-BR",
    dataUpload: new Date(2025, 1, 10),
    uploadPor: "Ana Costa",
    arquivo: "manual-operacao-abl800-basic-v2.1-pt.pdf",
    historicoVersoes: [
      {
        versao: "2.0",
        dataAprovacao: new Date(2024, 10, 20),
        aprovadoPor: "Dr. Ricardo Almeida",
        arquivo: "manual-operacao-abl800-basic-v2.0-pt.pdf",
      },
      {
        versao: "1.8",
        dataAprovacao: new Date(2024, 5, 15),
        aprovadoPor: "Ana Costa",
        arquivo: "manual-operacao-abl800-basic-v1.8-pt.pdf",
      },
      {
        versao: "1.5",
        dataAprovacao: new Date(2023, 11, 1),
        aprovadoPor: "Mariana Silva",
        arquivo: "manual-operacao-abl800-basic-v1.5-pt.pdf",
      },
    ],
  },
  {
    id: "doc-006",
    produtoId: "prod-002",
    tipo: "catalogo",
    titulo: "Catálogo ABL800 BASIC 2025",
    versao: "1.0",
    idioma: "PT-BR",
    dataUpload: new Date(2025, 0, 5),
    uploadPor: "Dr. Carlos Mendes",
    arquivo: "catalogo-abl800-basic-2025.pdf",
    historicoVersoes: [
      {
        versao: "2024",
        dataAprovacao: new Date(2024, 0, 10),
        aprovadoPor: "Equipe Marketing",
        arquivo: "catalogo-abl800-basic-2024.pdf",
      },
    ],
  },
  {
    id: "doc-007",
    produtoId: "prod-002",
    tipo: "manual",
    titulo: "Ficha Técnica Detalhada",
    versao: "3.2",
    idioma: "PT-BR",
    dataUpload: new Date(2025, 1, 15),
    uploadPor: "Equipe Técnica",
    arquivo: "ficha-tecnica-abl800-basic-v3.2.pdf",
    historicoVersoes: [
      {
        versao: "3.1",
        dataAprovacao: new Date(2024, 8, 20),
        aprovadoPor: "Eng. Paulo Santos",
        arquivo: "ficha-tecnica-abl800-basic-v3.1.pdf",
      },
      {
        versao: "3.0",
        dataAprovacao: new Date(2024, 3, 10),
        aprovadoPor: "Eng. Paulo Santos",
        arquivo: "ficha-tecnica-abl800-basic-v3.0.pdf",
      },
    ],
  },
];

export const comparativosMock: ComparativoProduto[] = [
  {
    id: "comp-001",
    produtoId: "prod-001",
    titulo: "ABL800 FLEX vs Concorrente X",
    criadoPor: "Dr. Carlos Mendes",
    criadoEm: new Date(2025, 0, 10),
    conteudo: {
      nosso: {
        capacidade: "60 amostras/hora",
        tecnologia: "Eletrodos seletivos de última geração",
        parametros: "pH, pCO2, pO2, Na+, K+, Ca++, Cl-, Glicose, Lactato",
        manutencao: "Manutenção preventiva a cada 6 meses",
        preco: "Consultar",
      },
      concorrente: {
        capacidade: "45 amostras/hora",
        tecnologia: "Eletrodos seletivos tradicionais",
        parametros: "pH, pCO2, pO2, Na+, K+, Ca++",
        manutencao: "Manutenção preventiva a cada 4 meses",
        preco: "Consultar",
      },
    },
  },
];

export const historicoVersoesMock: HistoricoVersaoProduto[] = [
  {
    id: "hist-001",
    produtoId: "prod-001",
    tipo: "documento",
    descricaoAlteracao: "Upload do Manual do Usuário v2.5 em PT-BR e EN",
    alteradoPor: "Equipe Técnica",
    alteradoEm: new Date(2024, 11, 10),
  },
  {
    id: "hist-002",
    produtoId: "prod-001",
    tipo: "ficha_tecnica",
    descricaoAlteracao: "Atualização das especificações técnicas - nova capacidade de 60 amostras/hora",
    alteradoPor: "Dr. Carlos Mendes",
    alteradoEm: new Date(2024, 10, 20),
  },
  {
    id: "hist-003",
    produtoId: "prod-001",
    tipo: "documento",
    descricaoAlteracao: "Upload do Catálogo v3.0",
    alteradoPor: "Dr. Carlos Mendes",
    alteradoEm: new Date(2025, 0, 15),
  },
];

// Helpers
export const getLinhasPorMarca = (marcaId: string): Linha[] => {
  return linhasMock.filter((linha) => linha.marcaId === marcaId);
};

export const getProdutosPorLinha = (linhaId: string): Produto[] => {
  return produtosMock.filter((produto) => produto.linhaId === linhaId);
};

export const getDocumentosPorProduto = (produtoId: string): DocumentoProduto[] => {
  return documentosProdutoMock.filter((doc) => doc.produtoId === produtoId);
};

export const getComparativosPorProduto = (produtoId: string): ComparativoProduto[] => {
  return comparativosMock.filter((comp) => comp.produtoId === produtoId);
};

export const getHistoricoVersoesPorProduto = (produtoId: string): HistoricoVersaoProduto[] => {
  return historicoVersoesMock
    .filter((hist) => hist.produtoId === produtoId)
    .sort((a, b) => b.alteradoEm.getTime() - a.alteradoEm.getTime());
};

export const buscarProdutos = (termo: string): Produto[] => {
  if (!termo || termo.trim() === "") return produtosMock;

  const termoLower = termo.toLowerCase().trim();

  return produtosMock.filter((prod) => {
    return (
      prod.nome.toLowerCase().includes(termoLower) ||
      prod.codigo.toLowerCase().includes(termoLower) ||
      prod.descricao.toLowerCase().includes(termoLower) ||
      prod.palavrasChave.some((palavra) => palavra.toLowerCase().includes(termoLower))
    );
  });
};
