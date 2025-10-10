export interface DescritivoOperacao {
  numero: number;
  descritivo: string;
}

export interface NaturezaOperacao {
  operacao: string;
  label: string;
  descritivos: DescritivoOperacao[];
}

export const naturezasOperacao: NaturezaOperacao[] = [
  {
    operacao: "amostra",
    label: "Amostra",
    descritivos: [
      { numero: 1, descritivo: "Amostra grátis" }
    ]
  },
  {
    operacao: "comodato",
    label: "Comodato",
    descritivos: [
      { numero: 1, descritivo: "Mercadorias remetidas em comodato" },
      { numero: 2, descritivo: "Devolução de mercadoria remetida em comodato" },
      { numero: 3, descritivo: "Devolução de mercadoria recebida anteriormente em comodato" }
    ]
  },
  {
    operacao: "conserto",
    label: "Conserto",
    descritivos: [
      { numero: 1, descritivo: "Mercadoria recebida para conserto" },
      { numero: 2, descritivo: "Devolução de mercadoria recebida para conserto" },
      { numero: 3, descritivo: "Mercadoria enviada para conserto" },
      { numero: 4, descritivo: "Mercadoria retornando do conserto" }
    ]
  },
  {
    operacao: "consignacao",
    label: "Consignação",
    descritivos: [
      { numero: 1, descritivo: "Mercadorias remetidas em consignação" },
      { numero: 2, descritivo: "Devolução de mercadorias remetidas anteriormente em consignação" },
      { numero: 3, descritivo: "Devolução de mercadorias recebidas anteriormente consignação" }
    ]
  },
  {
    operacao: "demonstracao",
    label: "Demonstração",
    descritivos: [
      { numero: 1, descritivo: "Mercadoria remetida em demonstração" },
      { numero: 2, descritivo: "Devolução de mercadoria remetida anteriormente em demonstração" },
      { numero: 3, descritivo: "Devolução de mercadorias recebida anteriormente para demonstração" }
    ]
  },
  {
    operacao: "doacao",
    label: "Doação",
    descritivos: [
      { numero: 1, descritivo: "Doação de mercadorias" }
    ]
  },
  {
    operacao: "emprestimo",
    label: "Empréstimo",
    descritivos: [
      { numero: 1, descritivo: "Mercadorias remetidas em: Empréstimo" },
      { numero: 2, descritivo: "Devolução de mercadorias remetidas anteriormente em: Empréstimo" },
      { numero: 3, descritivo: "Devolução de mercadorias recebidas anteriormente como: Empréstimo" }
    ]
  },
  {
    operacao: "exposicao",
    label: "Exposição",
    descritivos: [
      { numero: 1, descritivo: "Mercadoria remetida para exposição" },
      { numero: 2, descritivo: "Devolução de mercadoria remetida para exposição" }
    ]
  },
  {
    operacao: "importacao",
    label: "Importação",
    descritivos: [
      { numero: 1, descritivo: "Importação para comercialização" },
      { numero: 2, descritivo: "Importação para uso ou consumo" },
      { numero: 3, descritivo: "Devolução de compra de mercadorias para revenda" }
    ]
  },
  {
    operacao: "locacao",
    label: "Locação",
    descritivos: [
      { numero: 1, descritivo: "Mercadorias remetidas em Locação" },
      { numero: 2, descritivo: "Devolução de mercadorias remetidas anteriormente em Locação" },
      { numero: 3, descritivo: "Devolução de mercadorias recebidas anteriormente como Locação" }
    ]
  },
  {
    operacao: "logistica",
    label: "Logística",
    descritivos: [
      { numero: 1, descritivo: "Mercadoria transferida da Matriz contra a Filial" },
      { numero: 2, descritivo: "Mercadoria transferida da Filial para a Matriz" },
      { numero: 3, descritivo: "Transferência de material de uso e consumo" }
    ]
  },
  {
    operacao: "mostruario",
    label: "Mostruário",
    descritivos: [
      { numero: 1, descritivo: "Entrada de mercadoria para mostruário" },
      { numero: 2, descritivo: "Retorno de mercadoria remetida para mostruário" },
      { numero: 3, descritivo: "Remessa de mercadoria para mostruário" },
      { numero: 4, descritivo: "Retorno de mercadoria recebida para mostruário" }
    ]
  },
  {
    operacao: "simples_remessa",
    label: "Simples Remessa",
    descritivos: [
      { numero: 1, descritivo: "Mercadorias remetidas em Simples Remessa referente a Venda" },
      { numero: 2, descritivo: "Mercadorias remetidas em Simples Remessa referente a Serviço ou Locação" },
      { numero: 3, descritivo: "Devolução de mercadorias remetidas anteriormente em Simples Remessa ref. Venda" },
      { numero: 4, descritivo: "Devolução de mercadorias recebidas anteriormente como Simples Remessa Serviço ou Locação" }
    ]
  },
  {
    operacao: "treinamento",
    label: "Treinamento",
    descritivos: [
      { numero: 1, descritivo: "Mercadorias remetidas em: Treinamento" },
      { numero: 2, descritivo: "Devolução de mercadorias remetidas anteriormente em: Treinamento" },
      { numero: 3, descritivo: "Devolução de mercadorias recebidas anteriormente como: Treinamento" }
    ]
  },
  {
    operacao: "venda",
    label: "Venda",
    descritivos: [
      { numero: 1, descritivo: "Venda" },
      { numero: 2, descritivo: "Devolução de venda" }
    ]
  },
  {
    operacao: "outras",
    label: "Outras",
    descritivos: [
      { numero: 1, descritivo: "Outras entradas (sem vínculo com NF de saída)" },
      { numero: 2, descritivo: "Outras saídas" }
    ]
  },
  {
    operacao: "troca",
    label: "Troca",
    descritivos: [
      { numero: 1, descritivo: "Troca em garantia (Saída do material)" },
      { numero: 2, descritivo: "Troca em garantia (Entrada do material)" }
    ]
  },
  {
    operacao: "perda",
    label: "Perda",
    descritivos: [
      { numero: 1, descritivo: "Perda" }
    ]
  }
];

// Função auxiliar para buscar descritivos de uma operação
export const getDescritivosOperacao = (operacao: string): DescritivoOperacao[] => {
  const nat = naturezasOperacao.find(n => n.operacao === operacao);
  return nat?.descritivos || [];
};

// Função auxiliar para verificar se operação tem apenas 1 descritivo
export const temDescritivoUnico = (operacao: string): boolean => {
  return getDescritivosOperacao(operacao).length === 1;
};
