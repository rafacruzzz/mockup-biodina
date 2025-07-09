
export interface ProductRegistrationData {
  // Aba 1 - Dados Gerais
  codigo: string;
  familiaProduto: string;
  marca: string;
  modelo: string;
  descricao: string;
  vendidoPorUnidade: boolean;

  // Aba 2 - Apresentações
  apresentacaoPrimaria: string;
  apresentacaoSecundaria: string;
  apresentacaoEmbarque: string;

  // Aba 3 - Códigos Fiscais
  codigoNCM: string;
  cest: string;
  codigoEANPrimaria: string;
  codigoEANSecundaria: string;
  codigoEANEmbarque: string;

  // Aba 4 - Preço e Estoque
  precoUnitarioVenda: number;
  estoqueFisico: number;
  reservado: number;
  estoqueDisponivel: number; // calculado

  // Aba 5 - Dimensões e Peso
  pesoLiquido: number;
  pesoBruto: number;
  altura: number;
  largura: number;
  profundidade: number;

  // Aba 6 - Logística e Comercial
  diasGarantia: number;
  leadtimeRessuprimento: number;
  diasCrossdocking: number;
  cupomFiscalPDV: boolean;
  marketplace: boolean;
  tipoItemBlocoK: string;
  origemMercadoria: string;

  // Aba 7 - Auditoria
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
