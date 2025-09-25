export type StatusConciliacao = 'pendente' | 'sugestao' | 'conciliado';
export type TipoMovimentacao = 'debito' | 'credito';

export interface MovimentacaoBancaria {
  id: string;
  data: Date;
  descricao: string;
  valor: number;
  tipo: TipoMovimentacao;
  contaBancaria: string;
  documento?: string;
  status: StatusConciliacao;
  contaVinculada?: string;
  scoreMatch?: number;
}

export interface MatchSugerido {
  movimentacaoId: string;
  contaId: string;
  score: number;
  motivos: string[];
}

// Simular parsing de arquivo OFX
export const parseOFXFile = (file: File): MovimentacaoBancaria[] => {
  // Em uma implementação real, aqui seria feito o parse do arquivo OFX
  console.log('Processando arquivo OFX:', file.name);
  
  return generateMockExtrato();
};

// Gerar dados mock de extrato bancário
export const generateMockExtrato = (): MovimentacaoBancaria[] => {
  return [
    {
      id: 'mov-001',
      data: new Date('2025-09-20'),
      descricao: 'PIX ENVIADO - FORNECEDOR ABC LTDA',
      valor: 2500.00,
      tipo: 'debito',
      contaBancaria: '001-12345',
      documento: '12345678901234567890',
      status: 'sugestao',
      scoreMatch: 95
    },
    {
      id: 'mov-002', 
      data: new Date('2025-09-15'),
      descricao: 'PAGAMENTO BOLETO ENERGY CORP',
      valor: 4800.00,
      tipo: 'debito',
      contaBancaria: '001-12345',
      documento: '34191234500000480000012345',
      status: 'sugestao',
      scoreMatch: 98
    },
    {
      id: 'mov-003',
      data: new Date('2025-09-18'),
      descricao: 'TED RECEBIDA CLIENTE XYZ',
      valor: 15000.00,
      tipo: 'credito',
      contaBancaria: '001-12345',
      documento: 'TED001234567890',
      status: 'pendente'
    },
    {
      id: 'mov-004',
      data: new Date('2025-09-22'),
      descricao: 'DEBITO AUTOMATICO TELECOM SOLUTIONS',
      valor: 1200.00,
      tipo: 'debito',
      contaBancaria: '033-67890',
      documento: 'DEB456789123',
      status: 'sugestao',
      scoreMatch: 92
    },
    {
      id: 'mov-005',
      data: new Date('2025-09-25'),
      descricao: 'SAQUE CAIXA ELETRONICO',
      valor: 500.00,
      tipo: 'debito',
      contaBancaria: '001-12345',
      documento: 'SAQ789456123',
      status: 'pendente'
    },
    {
      id: 'mov-006',
      data: new Date('2025-09-10'),
      descricao: 'DEPOSITO EM DINHEIRO',
      valor: 8500.00,
      tipo: 'credito',
      contaBancaria: '341-54321',
      documento: 'DEP963852741',
      status: 'conciliado',
      contaVinculada: 'CR-001'
    },
    {
      id: 'mov-007',
      data: new Date('2025-09-12'),
      descricao: 'TARIFA MANUTENCAO CONTA',
      valor: 25.90,
      tipo: 'debito',
      contaBancaria: '001-12345',
      documento: 'TAR147258369',
      status: 'pendente'
    },
    {
      id: 'mov-008',
      data: new Date('2025-09-28'),
      descricao: 'PIX RECEBIDO VENDAS SETEMBRO',
      valor: 12300.50,
      tipo: 'credito',
      contaBancaria: '033-67890',
      documento: 'PIX741852963',
      status: 'pendente'
    }
  ];
};

// Algoritmo de matching entre movimentações e contas a pagar
export const sugerirMatches = (
  movimentacoes: MovimentacaoBancaria[],
  contasPagar: any[]
): MatchSugerido[] => {
  const matches: MatchSugerido[] = [];

  movimentacoes
    .filter(mov => mov.tipo === 'debito' && mov.status === 'pendente')
    .forEach(movimentacao => {
      contasPagar.forEach(conta => {
        const score = calcularScoreMatch(movimentacao, conta);
        if (score >= 70) { // Threshold para sugestões
          const motivos = gerarMotivosMatch(movimentacao, conta, score);
          matches.push({
            movimentacaoId: movimentacao.id,
            contaId: conta.id,
            score,
            motivos
          });
        }
      });
    });

  // Ordenar por score (maior primeiro)
  return matches.sort((a, b) => b.score - a.score);
};

// Calcular score de compatibilidade entre movimentação e conta
const calcularScoreMatch = (movimentacao: MovimentacaoBancaria, conta: any): number => {
  let score = 0;
  
  // Compatibilidade de valor (peso: 40%)
  const diferencaValor = Math.abs(movimentacao.valor - conta.valor);
  const percentualDiferenca = diferencaValor / conta.valor;
  
  if (percentualDiferenca === 0) {
    score += 40; // Match perfeito
  } else if (percentualDiferenca <= 0.02) { // 2% de tolerância
    score += 35;
  } else if (percentualDiferenca <= 0.05) { // 5% de tolerância
    score += 25;
  } else if (percentualDiferenca <= 0.10) { // 10% de tolerância
    score += 15;
  }

  // Compatibilidade de data (peso: 30%)
  const diffDias = Math.abs(
    Math.floor((movimentacao.data.getTime() - conta.dataVencimento.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  if (diffDias === 0) {
    score += 30; // Data exata
  } else if (diffDias <= 2) {
    score += 25; // Até 2 dias de diferença
  } else if (diffDias <= 5) {
    score += 20; // Até 5 dias
  } else if (diffDias <= 10) {
    score += 10; // Até 10 dias
  }

  // Compatibilidade de descrição/fornecedor (peso: 30%)
  const descricaoScore = calcularSimilaridadeTexto(
    movimentacao.descricao.toLowerCase(),
    conta.fornecedor.toLowerCase()
  );
  score += descricaoScore * 30;

  return Math.min(Math.round(score), 100);
};

// Calcular similaridade entre textos
const calcularSimilaridadeTexto = (texto1: string, texto2: string): number => {
  // Implementação simples de similaridade baseada em palavras em comum
  const palavras1 = texto1.split(/\s+/).filter(p => p.length > 2);
  const palavras2 = texto2.split(/\s+/).filter(p => p.length > 2);
  
  if (palavras1.length === 0 && palavras2.length === 0) return 1;
  if (palavras1.length === 0 || palavras2.length === 0) return 0;
  
  let palavrasComuns = 0;
  palavras1.forEach(palavra1 => {
    if (palavras2.some(palavra2 => 
      palavra2.includes(palavra1) || palavra1.includes(palavra2)
    )) {
      palavrasComuns++;
    }
  });
  
  return palavrasComuns / Math.max(palavras1.length, palavras2.length);
};

// Gerar motivos do match para explicar o score
const gerarMotivosMatch = (movimentacao: MovimentacaoBancaria, conta: any, score: number): string[] => {
  const motivos: string[] = [];
  
  // Verificar valor
  const diferencaValor = Math.abs(movimentacao.valor - conta.valor);
  const percentualDiferenca = diferencaValor / conta.valor;
  
  if (percentualDiferenca === 0) {
    motivos.push('Valor idêntico');
  } else if (percentualDiferenca <= 0.02) {
    motivos.push('Valor muito próximo (diferença < 2%)');
  } else if (percentualDiferenca <= 0.05) {
    motivos.push('Valor próximo (diferença < 5%)');
  }

  // Verificar data
  const diffDias = Math.abs(
    Math.floor((movimentacao.data.getTime() - conta.dataVencimento.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  if (diffDias === 0) {
    motivos.push('Data de vencimento exata');
  } else if (diffDias <= 2) {
    motivos.push(`Data próxima (${diffDias} dias de diferença)`);
  } else if (diffDias <= 5) {
    motivos.push(`Data compatível (${diffDias} dias de diferença)`);
  }

  // Verificar descrição
  const descricaoScore = calcularSimilaridadeTexto(
    movimentacao.descricao.toLowerCase(),
    conta.fornecedor.toLowerCase()
  );
  
  if (descricaoScore >= 0.7) {
    motivos.push('Descrição muito similar ao fornecedor');
  } else if (descricaoScore >= 0.4) {
    motivos.push('Descrição parcialmente compatível');
  }

  if (motivos.length === 0) {
    motivos.push('Match baseado em critérios gerais');
  }

  return motivos;
};

// Utilitários para formatação
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export const getStatusColor = (status: StatusConciliacao): string => {
  switch (status) {
    case 'conciliado':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'sugestao':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'pendente':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    default:
      return 'text-muted-foreground';
  }
};

export const getStatusIcon = (status: StatusConciliacao): string => {
  switch (status) {
    case 'conciliado':
      return '✓';
    case 'sugestao':
      return '⚡';
    case 'pendente':
      return '⏳';
    default:
      return '';
  }
};