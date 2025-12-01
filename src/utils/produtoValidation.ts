import { Produto } from '@/types/produto';

/**
 * Campos obrigatórios para considerar um produto com cadastro completo
 */
const CAMPOS_OBRIGATORIOS: (keyof Produto)[] = [
  'codigo',
  'nome',
  'linhaId',
  'marcaId',
  'descricao',
  'descritivoBreve',
  'descritivoCompleto',
  'aplicacoes',
  'tagsProduto',
  'status',
  'registroAnvisa',
  'classeProduto',
  'pesoLiquido',
  'pesoBruto',
  'altura',
  'largura',
  'profundidade',
];

/**
 * Valida se um produto tem todos os campos obrigatórios preenchidos
 */
export const validarProdutoCompleto = (produto: Produto): boolean => {
  for (const campo of CAMPOS_OBRIGATORIOS) {
    const valor = produto[campo];
    
    // Verifica se o campo está vazio, nulo ou undefined
    if (valor === null || valor === undefined || valor === '') {
      return false;
    }
    
    // Para arrays, verifica se tem pelo menos um item
    if (Array.isArray(valor) && valor.length === 0) {
      return false;
    }
    
    // Para números, verifica se é maior que 0
    if (typeof valor === 'number' && valor <= 0) {
      return false;
    }
  }
  
  return true;
};

/**
 * Retorna lista de campos obrigatórios que estão faltando
 */
export const getCamposFaltantes = (produto: Produto): string[] => {
  const camposFaltantes: string[] = [];
  
  const labelsCampos: Record<string, string> = {
    codigo: 'Código',
    nome: 'Nome',
    linhaId: 'Linha de Produto',
    marcaId: 'Marca',
    descricao: 'Descrição',
    descritivoBreve: 'Descritivo Breve',
    descritivoCompleto: 'Descritivo Completo',
    aplicacoes: 'Aplicações',
    tagsProduto: 'Tags do Produto',
    status: 'Status',
    registroAnvisa: 'Registro ANVISA',
    classeProduto: 'Classe do Produto',
    pesoLiquido: 'Peso Líquido',
    pesoBruto: 'Peso Bruto',
    altura: 'Altura',
    largura: 'Largura',
    profundidade: 'Profundidade',
  };
  
  for (const campo of CAMPOS_OBRIGATORIOS) {
    const valor = produto[campo];
    
    if (valor === null || valor === undefined || valor === '') {
      camposFaltantes.push(labelsCampos[campo] || campo);
    } else if (Array.isArray(valor) && valor.length === 0) {
      camposFaltantes.push(labelsCampos[campo] || campo);
    } else if (typeof valor === 'number' && valor <= 0) {
      camposFaltantes.push(labelsCampos[campo] || campo);
    }
  }
  
  return camposFaltantes;
};

/**
 * Atualiza o statusCadastro do produto baseado na validação
 */
export const atualizarStatusCadastro = (produto: Produto): Produto => {
  const completo = validarProdutoCompleto(produto);
  return {
    ...produto,
    statusCadastro: completo ? 'completo' : 'incompleto',
  };
};
