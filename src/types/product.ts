
export interface ProductRegistrationData {
  // Aba 1 - Dados Gerais (expandida)
  codigo: string;
  linhaProduto: string;
  marca: string;
  modelo: string;
  modeloProdutoMedico: string;
  descricao: string;
  vendidoPorUnidade: boolean;
  // Novos campos de marketing
  nomeMarketing: string;
  descritivoBreve: string;
  descritivoCompleto: string;
  tags: string[];
  // Informações do fabricante
  fabricanteId: string;
  codigoProdutoFabricante: string;
  nomeProdutoFabricante: string;
  // Campo adicional para forma de venda
  comoEVendido?: string;

  // Aba 2 - Regulamentação ANVISA (nova)
  // Detentor do Registro
  detentorRegistroId: string;
  nomeEmpresaDetentora: string;
  cnpjDetentor: string;
  autorizacaoFuncionamento: string;
  // Informações do Dispositivo
  areaAnvisa: string;
  nomeTecnicoDispositivo: string;
  numeroNotificacaoRegistro: string;
  situacaoNotificacaoRegistro: string;
  processoNotificacaoRegistro: string;
  classificacaoRisco: string;
  dataInicioVigencia: Date | null;
  dataVencimento: Date | null;
  linkConsultaAnvisa: string;

  // Aba 3 - Apresentações (expandida)
  apresentacaoPrimaria: string;
  apresentacaoSecundaria: string;
  apresentacaoEmbarque: string;
  componentes: string;
  referenciasComercializadas: string[];

  // Aba 4 - Códigos Fiscais
  codigoNCM: string;
  cest: string;
  codigoEANPrimaria: string;
  codigoEANSecundaria: string;
  codigoEANEmbarque: string;
  origemProdutoICMS: string;

  // Aba 5 - Preço e Estoque
  precoUnitarioVenda: number;
  estoqueFisico: number;
  reservado: number;
  estoqueDisponivel: number; // calculado

  // Aba 6 - Dimensões e Peso
  pesoLiquido: number;
  pesoBruto: number;
  altura: number;
  largura: number;
  profundidade: number;

  // Aba 7 - Documentação e Links (nova)
  documentacaoLinks: {
    linksDocumentacao: Array<{
      id: string;
      titulo: string;
      url: string;
      tipo: 'Treinamento' | 'Manual' | 'Especificação' | 'Outro';
      dataUpload: Date;
      versao?: string;
    }>;
    arquivosLocais: Array<{
      id: string;
      nomeArquivo: string;
      arquivo: File | null;
      tipo: string;
      tamanho: number;
      dataUpload: Date;
      versao: string;
      observacoes?: string;
    }>;
  };

  // Aba 8 - Logística e Comercial
  diasGarantia: number;
  leadtimeRessuprimento: number;
  diasCrossdocking: number;
  cupomFiscalPDV: boolean;
  marketplace: boolean;
  tipoItemBlocoK: string;
  origemMercadoria: string;

  // Aba 9 - Auditoria
  inclusao: Date;
  ultimaAlteracao: Date;
  incluidoPor: string;
  alteradoPor: string;
}

export interface ProductRegistrationFormProps {
  isOpen: boolean;
  product?: ProductRegistrationData | null;
  onClose: () => void;
  onSave: (data: ProductRegistrationData) => void;
}

export interface ProductTabProps {
  formData: ProductRegistrationData;
  onInputChange: (field: keyof ProductRegistrationData, value: any) => void;
}
