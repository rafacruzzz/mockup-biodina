export interface VariavelFiscal {
  nome: string;
  descricao: string;
  categoria: string;
  exemplo: string;
  campoOrigem?: string;
}

export const variaveisFiscais: VariavelFiscal[] = [
  // ICMS
  {
    nome: "[VALOR_BASE_ICMS]",
    descricao: "Valor da base de cálculo do ICMS",
    categoria: "ICMS",
    exemplo: "R$ 1.000,00",
    campoOrigem: "baseCalculoIcms"
  },
  {
    nome: "[VALOR_BASE_DIFERIMENTO]",
    descricao: "Valor da base de cálculo do diferimento do ICMS",
    categoria: "ICMS",
    exemplo: "R$ 500,00",
    campoOrigem: "baseCalculoDiferimento"
  },
  {
    nome: "[VALOR_DIFERIMENTO]",
    descricao: "Valor do diferimento do ICMS",
    categoria: "ICMS",
    exemplo: "R$ 60,00",
    campoOrigem: "valorDiferimento"
  },
  {
    nome: "[VALOR_CREDITO_ICMS]",
    descricao: "Valor do crédito de ICMS",
    categoria: "ICMS",
    exemplo: "R$ 120,00",
    campoOrigem: "valorCreditoIcms"
  },
  {
    nome: "[ICMS_PRESUMIDO]",
    descricao: "Valor do ICMS presumido",
    categoria: "ICMS",
    exemplo: "R$ 85,00",
    campoOrigem: "icmsPresumido"
  },
  {
    nome: "[ALIQUOTA_CREDITO_ICMS]",
    descricao: "Alíquota do crédito de ICMS",
    categoria: "ICMS",
    exemplo: "12%",
    campoOrigem: "aliquotaCreditoIcms"
  },
  {
    nome: "[VALOR_ICMS_DESONERADO]",
    descricao: "Valor do ICMS desonerado",
    categoria: "ICMS",
    exemplo: "R$ 75,00",
    campoOrigem: "valorIcmsDesonerado"
  },
  
  // Cupom Fiscal
  {
    nome: "[NUMERO_CUPOM]",
    descricao: "Número do cupom fiscal",
    categoria: "Cupom Fiscal",
    exemplo: "123456",
    campoOrigem: "numeroCupom"
  },
  {
    nome: "[DATA_CUPOM]",
    descricao: "Data de emissão do cupom fiscal",
    categoria: "Cupom Fiscal",
    exemplo: "01/01/2024",
    campoOrigem: "dataCupom"
  },
  
  // DIFAL (Diferencial de Alíquota)
  {
    nome: "[PERCENTUAL_ICMS_DIFAL_PARA_NAO_CONTRIBUINTE]",
    descricao: "Percentual do ICMS DIFAL para não contribuinte",
    categoria: "DIFAL",
    exemplo: "4%",
    campoOrigem: "percentualIcmsDifalNaoContribuinte"
  },
  {
    nome: "[VALOR_ICMS_DIFAL_PARA_NAO_CONTRIBUINTE_DESTINO]",
    descricao: "Valor do ICMS DIFAL para UF de destino (não contribuinte)",
    categoria: "DIFAL",
    exemplo: "R$ 40,00",
    campoOrigem: "valorIcmsDifalDestinoNaoContribuinte"
  },
  {
    nome: "[VALOR_ICMS_DIFAL_PARA_NAO_CONTRIBUINTE_ORIGEM]",
    descricao: "Valor do ICMS DIFAL para UF de origem (não contribuinte)",
    categoria: "DIFAL",
    exemplo: "R$ 20,00",
    campoOrigem: "valorIcmsDifalOrigemNaoContribuinte"
  },
  
  // FCP (Fundo de Combate à Pobreza)
  {
    nome: "[VALOR_FCP_DESTINO]",
    descricao: "Valor do FCP (Fundo de Combate à Pobreza) de destino",
    categoria: "FCP",
    exemplo: "R$ 15,00",
    campoOrigem: "valorFcpDestino"
  },
  
  // ICMS ST (Substituição Tributária)
  {
    nome: "[VALOR_BASE_ICMS_ST_RETIDO]",
    descricao: "Valor da base de cálculo do ICMS ST retido",
    categoria: "ICMS ST",
    exemplo: "R$ 1.200,00",
    campoOrigem: "baseCalculoIcmsStRetido"
  },
  {
    nome: "[VALOR_ICMS_ST_RETIDO]",
    descricao: "Valor do ICMS ST retido anteriormente",
    categoria: "ICMS ST",
    exemplo: "R$ 180,00",
    campoOrigem: "valorIcmsStRetido"
  }
];

export const categorias = Array.from(new Set(variaveisFiscais.map(v => v.categoria)));

/**
 * Substitui as variáveis no texto pelos valores reais fornecidos
 * @param texto - Texto contendo variáveis entre colchetes
 * @param valores - Objeto com os valores para substituição
 * @returns Texto com variáveis substituídas
 */
export const substituirVariaveis = (texto: string, valores: Record<string, any>): string => {
  if (!texto) return "";
  
  let textoProcessado = texto;
  
  variaveisFiscais.forEach(variavel => {
    if (textoProcessado.includes(variavel.nome)) {
      const campoOrigem = variavel.campoOrigem || "";
      const valor = valores[campoOrigem];
      
      // Se o valor existir, substitui pela variável; caso contrário, mantém a variável
      if (valor !== undefined && valor !== null && valor !== "") {
        // Formata valores numéricos como moeda brasileira
        const valorFormatado = typeof valor === "number" 
          ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
          : valor.toString();
        
        // Substitui todas as ocorrências usando regex global
        const regex = new RegExp(variavel.nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        textoProcessado = textoProcessado.replace(regex, valorFormatado);
      }
    }
  });
  
  return textoProcessado;
};

/**
 * Extrai todas as variáveis presentes em um texto
 * @param texto - Texto para análise
 * @returns Array com os nomes das variáveis encontradas
 */
export const extrairVariaveis = (texto: string): string[] => {
  if (!texto) return [];
  
  const regex = /\[([A-Z_]+)\]/g;
  const variaveisEncontradas: string[] = [];
  let match;
  
  while ((match = regex.exec(texto)) !== null) {
    const variavelCompleta = match[0]; // Inclui os colchetes
    if (!variaveisEncontradas.includes(variavelCompleta)) {
      variaveisEncontradas.push(variavelCompleta);
    }
  }
  
  return variaveisEncontradas;
};

/**
 * Valida se todas as variáveis em um texto são válidas
 * @param texto - Texto para validação
 * @returns Objeto com status de validação e variáveis inválidas
 */
export const validarVariaveis = (texto: string): { valido: boolean; variaveisInvalidas: string[] } => {
  const variaveisNoTexto = extrairVariaveis(texto);
  const variaveisValidas = variaveisFiscais.map(v => v.nome);
  
  const variaveisInvalidas = variaveisNoTexto.filter(v => !variaveisValidas.includes(v));
  
  return {
    valido: variaveisInvalidas.length === 0,
    variaveisInvalidas
  };
};

/**
 * Formata um valor como moeda brasileira
 */
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(valor);
};
