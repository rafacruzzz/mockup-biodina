export interface EquipamentoRegimeEspecial {
  id: string;
  codigo: string;
  nome: string;
  dataNFImportacao: Date;
  statusRegimeEspecial: 'Com Regime' | 'Sem Regime' | 'Nacional';
  tipoImportacao: 'Importado' | 'Nacional';
  valorImportacao?: number;
  numeroNFImportacao?: string;
}

export const mockEquipamentos: EquipamentoRegimeEspecial[] = [
  {
    id: 'EQ001',
    codigo: 'AN-X1-2023',
    nome: 'Analisador X1',
    dataNFImportacao: new Date('2023-01-01'),
    statusRegimeEspecial: 'Com Regime',
    tipoImportacao: 'Importado',
    valorImportacao: 85000.00,
    numeroNFImportacao: 'IMP-2023-0001'
  },
  {
    id: 'EQ002',
    codigo: 'AN-Y2-2020',
    nome: 'Analisador Y2',
    dataNFImportacao: new Date('2020-01-01'),
    statusRegimeEspecial: 'Sem Regime',
    tipoImportacao: 'Importado',
    valorImportacao: 120000.00,
    numeroNFImportacao: 'IMP-2020-0045'
  }
];
