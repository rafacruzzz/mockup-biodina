import { EquipamentoRegulatorio, MovimentacaoRegulatorio, AlertaRegulatorio, ResultadoBuscaRegulatorio } from '@/types/rastreabilidadeRegulatorio';

// Mock de equipamentos
export const equipamentosRegulatorioMock: EquipamentoRegulatorio[] = [
  {
    id: 'EQ001',
    codigo: 'BIO-AN-001',
    linhaProduto: 'Analisadores',
    marca: 'BioTech',
    modelo: 'Analyzer Pro 3000',
    nomeProduto: 'Analisador Hematológico Completo',
    numeroSerie: 'SN2023001',
    novoOuRefurbished: 'novo',
    dataImportacao: new Date('2023-05-15'),
    compradoComRegimeEspecial: true,
    lote: 'LT-2023-05-A',
    quantidadeImportadaLote: 5,
    dataFabricacao: new Date('2023-04-10'),
    dataValidade: new Date('2033-04-10'),
    quantidadeVendida: 1,
    localizacao: 'São Paulo - SP',
    mantenedora: 'Hospital Santa Clara',
    cliente: 'Hospital Santa Clara',
    clienteId: 'CLI001',
    uf: 'SP',
    dataInstalacao: new Date('2023-06-20'),
    versaoSoftware: 'v4.2.1',
    dataAtualizacaoSoftware: new Date('2024-01-15'),
    versaoWindows: 'Windows 11 Pro',
    setorAlocacao: 'Laboratório Central',
    pessoaResponsavelSetor: 'Dr. João Silva',
    telefoneResponsavel: '(11) 98765-4321',
    emailResponsavel: 'joao.silva@santaclara.com.br',
    status: 'ativo'
  },
  {
    id: 'EQ002',
    codigo: 'BIO-AN-002',
    linhaProduto: 'Analisadores',
    marca: 'BioTech',
    modelo: 'Analyzer Pro 3000',
    nomeProduto: 'Analisador Hematológico Completo',
    numeroSerie: 'SN2023002',
    novoOuRefurbished: 'novo',
    dataImportacao: new Date('2023-05-15'),
    compradoComRegimeEspecial: true,
    lote: 'LT-2023-05-A',
    quantidadeImportadaLote: 5,
    dataFabricacao: new Date('2023-04-10'),
    dataValidade: new Date('2033-04-10'),
    quantidadeVendida: 1,
    localizacao: 'Rio de Janeiro - RJ',
    mantenedora: 'Laboratório Diagnose',
    cliente: 'Laboratório Diagnose',
    clienteId: 'CLI002',
    uf: 'RJ',
    dataInstalacao: new Date('2023-07-10'),
    versaoSoftware: 'v4.2.1',
    dataAtualizacaoSoftware: new Date('2024-01-15'),
    versaoWindows: 'Windows 10 Pro',
    setorAlocacao: 'Hematologia',
    pessoaResponsavelSetor: 'Dra. Maria Santos',
    telefoneResponsavel: '(21) 97654-3210',
    emailResponsavel: 'maria.santos@diagnose.com.br',
    status: 'ativo'
  },
  {
    id: 'EQ003',
    codigo: 'BIO-MON-001',
    linhaProduto: 'Monitores',
    marca: 'MediCare',
    modelo: 'CardioMonitor Plus',
    nomeProduto: 'Monitor Multiparâmetros',
    numeroSerie: 'SN2024001',
    novoOuRefurbished: 'refurbished',
    dataImportacao: new Date('2024-01-20'),
    compradoComRegimeEspecial: false,
    lote: 'LT-2024-01-B',
    quantidadeImportadaLote: 3,
    dataFabricacao: new Date('2022-11-15'),
    quantidadeVendida: 1,
    localizacao: 'Belo Horizonte - MG',
    mantenedora: 'Hospital Vida Nova',
    cliente: 'Hospital Vida Nova',
    clienteId: 'CLI003',
    uf: 'MG',
    dataInstalacao: new Date('2024-02-15'),
    versaoSoftware: 'v2.8.5',
    versaoWindows: 'Embedded System',
    setorAlocacao: 'UTI Adulto',
    pessoaResponsavelSetor: 'Enf. Carlos Mendes',
    telefoneResponsavel: '(31) 99876-5432',
    emailResponsavel: 'carlos.mendes@vidanova.com.br',
    status: 'ativo'
  },
  {
    id: 'EQ004',
    codigo: 'BIO-AN-003',
    linhaProduto: 'Analisadores',
    marca: 'BioTech',
    modelo: 'Analyzer Pro 5000',
    nomeProduto: 'Analisador Bioquímico Avançado',
    numeroSerie: 'SN2023015',
    novoOuRefurbished: 'novo',
    dataImportacao: new Date('2023-08-10'),
    compradoComRegimeEspecial: true,
    lote: 'LT-2023-08-C',
    quantidadeImportadaLote: 2,
    dataFabricacao: new Date('2023-07-05'),
    dataValidade: new Date('2033-07-05'),
    quantidadeVendida: 1,
    localizacao: 'Porto Alegre - RS',
    mantenedora: 'Clínica LabMais',
    cliente: 'Clínica LabMais',
    clienteId: 'CLI004',
    uf: 'RS',
    dataInstalacao: new Date('2023-09-20'),
    versaoSoftware: 'v5.1.0',
    dataAtualizacaoSoftware: new Date('2024-03-10'),
    versaoWindows: 'Windows 11 Pro',
    setorAlocacao: 'Bioquímica',
    pessoaResponsavelSetor: 'Dr. Pedro Oliveira',
    telefoneResponsavel: '(51) 98765-1234',
    emailResponsavel: 'pedro.oliveira@labmais.com.br',
    status: 'ativo'
  }
];

// Mock de movimentações
export const movimentacoesRegulatorioMock: MovimentacaoRegulatorio[] = [
  {
    id: 'MOV001',
    equipamentoId: 'EQ001',
    data: new Date('2023-05-15'),
    tipo: 'importacao',
    origem: 'China - Fabricante BioTech',
    destino: 'Biodina - Estoque SP',
    responsavel: 'COMEX - Ana Costa',
    observacoes: 'Importação com regime especial'
  },
  {
    id: 'MOV002',
    equipamentoId: 'EQ001',
    data: new Date('2023-06-01'),
    tipo: 'venda',
    origem: 'Biodina - Estoque SP',
    destino: 'Hospital Santa Clara',
    responsavel: 'Vendas - Ricardo Alves',
    observacoes: 'Venda com instalação incluída'
  },
  {
    id: 'MOV003',
    equipamentoId: 'EQ001',
    data: new Date('2023-06-20'),
    tipo: 'instalacao',
    destino: 'Hospital Santa Clara - Laboratório Central',
    responsavel: 'DT - Fernando Souza',
    observacoes: 'Instalação completa com treinamento da equipe'
  },
  {
    id: 'MOV004',
    equipamentoId: 'EQ001',
    data: new Date('2024-01-15'),
    tipo: 'atualizacao_software',
    destino: 'Hospital Santa Clara - Laboratório Central',
    responsavel: 'DT - Lucas Martins',
    observacoes: 'Atualização para versão v4.2.1'
  },
  {
    id: 'MOV005',
    equipamentoId: 'EQ002',
    data: new Date('2023-05-15'),
    tipo: 'importacao',
    origem: 'China - Fabricante BioTech',
    destino: 'Biodina - Estoque SP',
    responsavel: 'COMEX - Ana Costa',
    observacoes: 'Lote LT-2023-05-A'
  },
  {
    id: 'MOV006',
    equipamentoId: 'EQ002',
    data: new Date('2023-06-25'),
    tipo: 'venda',
    origem: 'Biodina - Estoque SP',
    destino: 'Laboratório Diagnose',
    responsavel: 'Vendas - Paula Lima',
    observacoes: 'Cliente já conhece o equipamento'
  }
];

// Mock de alertas
export const alertasRegulatorioMock: AlertaRegulatorio[] = [
  {
    id: 'ALT001',
    equipamentoId: 'EQ001',
    tipo: 'software_desatualizado',
    mensagem: 'Nova versão de software disponível (v4.3.0)',
    dataCriacao: new Date('2024-11-15'),
    prioridade: 'media',
    lido: false
  },
  {
    id: 'ALT002',
    equipamentoId: 'EQ003',
    tipo: 'manutencao',
    mensagem: 'Manutenção preventiva programada para 15/12/2024',
    dataCriacao: new Date('2024-11-20'),
    prioridade: 'alta',
    lido: false
  },
  {
    id: 'ALT003',
    equipamentoId: 'EQ001',
    tipo: 'regime_especial',
    mensagem: 'Equipamento importado com regime especial - documentação em ordem',
    dataCriacao: new Date('2023-06-01'),
    prioridade: 'baixa',
    lido: true
  }
];

// Função de busca avançada
export function buscarEquipamentosRegulatorio(termo: string): ResultadoBuscaRegulatorio {
  if (!termo || termo.trim() === '') {
    return {
      equipamentos: [],
      modelos: [],
      clientes: [],
      lotes: []
    };
  }

  const termoLower = termo.toLowerCase().trim();
  
  // Buscar equipamentos por múltiplos critérios
  const equipamentosEncontrados = equipamentosRegulatorioMock.filter(eq => 
    eq.codigo.toLowerCase().includes(termoLower) ||
    eq.numeroSerie.toLowerCase().includes(termoLower) ||
    eq.modelo.toLowerCase().includes(termoLower) ||
    eq.marca.toLowerCase().includes(termoLower) ||
    eq.nomeProduto.toLowerCase().includes(termoLower) ||
    eq.cliente.toLowerCase().includes(termoLower) ||
    eq.lote.toLowerCase().includes(termoLower) ||
    eq.versaoSoftware.toLowerCase().includes(termoLower) ||
    eq.versaoWindows.toLowerCase().includes(termoLower)
  );

  // Extrair modelos únicos
  const modelosSet = new Set(
    equipamentosRegulatorioMock
      .filter(eq => eq.modelo.toLowerCase().includes(termoLower))
      .map(eq => eq.modelo)
  );

  // Extrair clientes únicos
  const clientesMap = new Map();
  equipamentosRegulatorioMock
    .filter(eq => eq.cliente.toLowerCase().includes(termoLower))
    .forEach(eq => {
      if (!clientesMap.has(eq.clienteId)) {
        clientesMap.set(eq.clienteId, { id: eq.clienteId, nome: eq.cliente });
      }
    });

  // Extrair lotes únicos
  const lotesSet = new Set(
    equipamentosRegulatorioMock
      .filter(eq => eq.lote.toLowerCase().includes(termoLower))
      .map(eq => eq.lote)
  );

  return {
    equipamentos: equipamentosEncontrados,
    modelos: Array.from(modelosSet),
    clientes: Array.from(clientesMap.values()),
    lotes: Array.from(lotesSet)
  };
}

// Função para obter movimentações de um equipamento
export function getMovimentacoesEquipamentoRegulatorio(equipamentoId: string): MovimentacaoRegulatorio[] {
  return movimentacoesRegulatorioMock
    .filter(mov => mov.equipamentoId === equipamentoId)
    .sort((a, b) => b.data.getTime() - a.data.getTime());
}

// Função para obter alertas de um equipamento
export function getAlertasEquipamentoRegulatorio(equipamentoId: string): AlertaRegulatorio[] {
  return alertasRegulatorioMock
    .filter(alert => alert.equipamentoId === equipamentoId)
    .sort((a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime());
}

// Função para obter label do tipo de movimentação
export function getTipoMovimentacaoLabel(tipo: MovimentacaoRegulatorio['tipo']): string {
  const labels = {
    importacao: 'Importação',
    venda: 'Venda',
    instalacao: 'Instalação',
    transferencia: 'Transferência',
    devolucao: 'Devolução',
    manutencao: 'Manutenção',
    atualizacao_software: 'Atualização de Software'
  };
  return labels[tipo] || tipo;
}

// Função para obter cor do status
export function getStatusColor(status: EquipamentoRegulatorio['status']) {
  const colors = {
    ativo: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    inativo: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
    manutencao: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    emprestimo: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' }
  };
  return colors[status] || colors.ativo;
}

// Função para obter label do status
export function getStatusLabel(status: EquipamentoRegulatorio['status']): string {
  const labels = {
    ativo: 'Ativo',
    inativo: 'Inativo',
    manutencao: 'Em Manutenção',
    emprestimo: 'Empréstimo'
  };
  return labels[status] || status;
}

// Função para obter cor de prioridade do alerta
export function getPrioridadeAlertaColor(prioridade: AlertaRegulatorio['prioridade']) {
  const colors = {
    alta: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    media: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    baixa: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' }
  };
  return colors[prioridade] || colors.media;
}
