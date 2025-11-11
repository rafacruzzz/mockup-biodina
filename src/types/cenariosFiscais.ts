export interface CenarioFiscal {
  id: number;
  nome: string;
  tipo: 'Produto' | 'Serviço';
  regime: '0' | '1' | '2'; // 0: Simples, 1: Normal, 2: MEI
  aliquotaICMS: number;
  aliquotaPIS: number;
  aliquotaCOFINS: number;
  aliquotaIPI: number;
  status: 'Ativo' | 'Inativo';
}

export interface NovoCenarioFormData {
  nome: string;
  aliquotaICMS: number;
  aliquotaPIS: number;
  aliquotaCOFINS: number;
  aliquotaIPI: number;
  regime: string;
  tipo: string;
}
