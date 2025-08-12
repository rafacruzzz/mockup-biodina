
export interface ComercialModule {
  name: string;
  subModules: Record<string, {
    name: string;
    data: any[];
  }>;
}

export const comercialModules: Record<string, ComercialModule> = {
  projetos: {
    name: "Projetos",
    subModules: {
      importacao_direta: {
        name: "Importação Direta",
        data: [
          {
            id: "IMP-2024-001",
            nome: "Importação Equipamentos Médicos",
            cliente: "Hospital São José",
            valor: "R$ 250.000,00",
            status: "Em Andamento",
            dataInicio: "15/01/2024",
            responsavel: "João Silva"
          },
          {
            id: "IMP-2024-002", 
            nome: "Importação Materiais Cirúrgicos",
            cliente: "Clínica Vista Bella",
            valor: "R$ 180.000,00",
            status: "Finalizado",
            dataInicio: "08/02/2024",
            responsavel: "Maria Santos"
          },
          {
            id: "IMP-2024-003",
            nome: "Importação Dispositivos Diagnóstico",
            cliente: "Laboratório Central",
            valor: "R$ 320.000,00", 
            status: "Planejamento",
            dataInicio: "20/03/2024",
            responsavel: "Carlos Oliveira"
          }
        ]
      }
    }
  }
};
