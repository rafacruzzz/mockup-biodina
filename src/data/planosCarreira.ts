
import { PlanoCarreira, CargoPlano } from "@/types/planoCarreira";

export const planosCarreira: PlanoCarreira[] = [
  {
    id: 1,
    nome: "Plano Administrativo",
    empresa: "Empresa Principal",
    uf: "SP",
    ativo: true,
    dataCreacao: "2024-01-01"
  },
  {
    id: 2,
    nome: "Plano Comércio Exterior",
    empresa: "Empresa Principal",
    uf: "SP",
    ativo: true,
    dataCreacao: "2024-01-01"
  }
];

export const cargosPlanos: CargoPlano[] = [
  {
    id: 1,
    planoCarreiraId: 1,
    cargo: "Assistente Administrativo",
    salarioBase: 2327.00,
    cbo: "4122-05",
    niveis: [
      { nivel: 1, valorMinimo: 265.00, valorMaximo: 465.00 },
      { nivel: 2, valorMinimo: 465.00, valorMaximo: 698.00 },
      { nivel: 3, valorMinimo: 698.00, valorMaximo: 930.00 },
      { nivel: 4, valorMinimo: 930.00, valorMaximo: 1163.00 },
      { nivel: 5, valorMinimo: 1163.00, valorMaximo: 1395.00 }
    ]
  },
  {
    id: 2,
    planoCarreiraId: 1,
    cargo: "Analista Administrativo",
    salarioBase: 3657.00,
    cbo: "2521-05",
    niveis: [
      { nivel: 1, valorMinimo: 418.00, valorMaximo: 418.00 },
      { nivel: 2, valorMinimo: 418.00, valorMaximo: 553.00 },
      { nivel: 3, valorMinimo: 553.00, valorMaximo: 731.00 },
      { nivel: 4, valorMinimo: 731.00, valorMaximo: 914.00 },
      { nivel: 5, valorMinimo: 914.00, valorMaximo: 1097.00 }
    ]
  },
  {
    id: 3,
    planoCarreiraId: 1,
    cargo: "Supervisor Administrativo",
    salarioBase: 5743.00,
    cbo: "1411-05",
    niveis: [
      { nivel: 1, valorMinimo: 656.00, valorMaximo: 656.00 },
      { nivel: 2, valorMinimo: 656.00, valorMaximo: 861.00 },
      { nivel: 3, valorMinimo: 861.00, valorMaximo: 1148.00 },
      { nivel: 4, valorMinimo: 1148.00, valorMaximo: 1435.00 },
      { nivel: 5, valorMinimo: 1435.00, valorMaximo: 1722.00 }
    ]
  },
  {
    id: 4,
    planoCarreiraId: 2,
    cargo: "Assistente de Comércio Exterior",
    salarioBase: 2800.00,
    cbo: "4131-10",
    niveis: [
      { nivel: 1, valorMinimo: 320.00, valorMaximo: 560.00 },
      { nivel: 2, valorMinimo: 560.00, valorMaximo: 840.00 },
      { nivel: 3, valorMinimo: 840.00, valorMaximo: 1120.00 },
      { nivel: 4, valorMinimo: 1120.00, valorMaximo: 1400.00 },
      { nivel: 5, valorMinimo: 1400.00, valorMaximo: 1680.00 }
    ]
  },
  {
    id: 5,
    planoCarreiraId: 2,
    cargo: "Analista de Comércio Exterior",
    salarioBase: 4200.00,
    cbo: "2521-10",
    niveis: [
      { nivel: 1, valorMinimo: 480.00, valorMaximo: 480.00 },
      { nivel: 2, valorMinimo: 480.00, valorMaximo: 630.00 },
      { nivel: 3, valorMinimo: 630.00, valorMaximo: 840.00 },
      { nivel: 4, valorMinimo: 840.00, valorMaximo: 1050.00 },
      { nivel: 5, valorMinimo: 1050.00, valorMaximo: 1260.00 }
    ]
  }
];
