
import { UserCheck, Building2, Clock, Trophy, Users } from "lucide-react";

export const modules = {
  colaboradores: {
    name: "Colaboradores",
    icon: UserCheck,
    subModules: {
      colaboradores: {
        name: "Colaboradores",
        data: [
          {
            id: 1,
            codigo: "COL001",
            nome: "João Silva Santos",
            cargo: "Analista de Sistemas",
            departamento: "Tecnologia",
            tipo: "CLT",
            dataAdmissao: "2020-01-15",
            status: "Ativo",
            email: "joao.silva@empresa.com",
            telefone: "(11) 99999-0001"
          },
          {
            id: 2,
            codigo: "COL002",
            nome: "Maria Oliveira Costa",
            cargo: "Gerente de Vendas",
            departamento: "Comercial",
            tipo: "CLT",
            dataAdmissao: "2019-05-10",
            status: "Ativo",
            email: "maria.oliveira@empresa.com",
            telefone: "(11) 99999-0002"
          },
          {
            id: 3,
            codigo: "COL003",
            nome: "Pedro Almeida Lima",
            cargo: "Contador",
            departamento: "Financeiro",
            tipo: "PJ",
            dataAdmissao: "2021-03-01",
            status: "Ativo",
            email: "pedro.almeida@empresa.com",
            telefone: "(11) 99999-0003"
          },
          {
            id: 4,
            codigo: "COL004",
            nome: "Ana Paula Ferreira",
            cargo: "Analista de RH",
            departamento: "Recursos Humanos",
            tipo: "CLT",
            dataAdmissao: "2022-08-15",
            status: "Ativo",
            email: "ana.ferreira@empresa.com",
            telefone: "(11) 99999-0004"
          },
          {
            id: 5,
            codigo: "COL005",
            nome: "Carlos Eduardo Souza",
            cargo: "Operador de Produção",
            departamento: "Produção",
            tipo: "CLT",
            dataAdmissao: "2018-11-20",
            status: "Férias",
            email: "carlos.souza@empresa.com",
            telefone: "(11) 99999-0005"
          }
        ]
      }
    }
  },
  processoSeletivo: {
    name: "Processo Seletivo",
    icon: Users,
    subModules: {
      visaoGeral: {
        name: "Visão Geral",
        data: []
      },
      bancoCurriculos: {
        name: "Banco de Currículos",
        data: []
      },
      etapasSelecao: {
        name: "Etapas de Seleção",
        data: []
      },
      admissao: {
        name: "Admissão",
        data: []
      }
    }
  },
  departamentos: {
    name: "Departamentos",
    icon: Building2,
    subModules: {
      setores: {
        name: "Setores",
        data: [
          {
            id: 1,
            nome: "Tecnologia",
            responsavel: "João Silva Santos",
            observacoes: "Setor responsável por sistemas e infraestrutura",
            cargos: [1, 2, 3] // Analista de Sistemas, Desenvolvedor, Arquiteto de Software
          },
          {
            id: 2,
            nome: "Comercial",
            responsavel: "Maria Oliveira Costa",
            observacoes: "Setor de vendas e relacionamento com clientes",
            cargos: [4, 5, 6] // Vendedor, Gerente de Vendas, Coordenador Comercial
          },
          {
            id: 3,
            nome: "Financeiro",
            responsavel: "Pedro Almeida Lima",
            observacoes: "Setor de controladoria e contabilidade",
            cargos: [7, 8, 9] // Contador, Analista Financeiro, Gerente Financeiro
          },
          {
            id: 4,
            nome: "Recursos Humanos",
            responsavel: "Ana Paula Ferreira",
            observacoes: "Setor de gestão de pessoas",
            cargos: [10, 11] // Analista de RH, Coordenador de RH
          },
          {
            id: 5,
            nome: "Produção",
            responsavel: "Carlos Eduardo Souza",
            observacoes: "Setor operacional de produção",
            cargos: [12, 13, 14] // Operador de Produção, Supervisor de Produção, Gerente de Produção
          }
        ]
      },
      cargos: {
        name: "Cargos",
        data: [
          { id: 1, nome: "Analista de Sistemas", cbo: "2124-05" },
          { id: 2, nome: "Desenvolvedor", cbo: "2124-10" },
          { id: 3, nome: "Arquiteto de Software", cbo: "2124-15" },
          { id: 4, nome: "Vendedor", cbo: "5211-05" },
          { id: 5, nome: "Gerente de Vendas", cbo: "1423-10" },
          { id: 6, nome: "Coordenador Comercial", cbo: "1423-05" },
          { id: 7, nome: "Contador", cbo: "2522-05" },
          { id: 8, nome: "Analista Financeiro", cbo: "2524-05" },
          { id: 9, nome: "Gerente Financeiro", cbo: "1421-10" },
          { id: 10, nome: "Analista de RH", cbo: "2524-15" },
          { id: 11, nome: "Coordenador de RH", cbo: "1425-10" },
          { id: 12, nome: "Operador de Produção", cbo: "8414-05" },
          { id: 13, nome: "Supervisor de Produção", cbo: "9102-05" },
          { id: 14, nome: "Gerente de Produção", cbo: "1421-15" }
        ]
      }
    }
  },
  expedientes: {
    name: "Expedientes",
    icon: Clock,
    subModules: {
      expedientes: {
        name: "Expedientes",
        data: [
          {
            id: 1,
            nome: "Expediente Comercial",
            observacoes: "Horário padrão para departamentos administrativos"
          },
          {
            id: 2,
            nome: "Expediente Produção",
            observacoes: "Horário específico para área de produção com dois turnos"
          },
          {
            id: 3,
            nome: "Expediente Flexível",
            observacoes: "Horário flexível para equipes de desenvolvimento"
          }
        ]
      }
    }
  },
  planosCarreira: {
    name: "Planos de Carreira",
    icon: Trophy,
    subModules: {
      planos: {
        name: "Planos",
        data: [
          {
            id: 1,
            nome: "Plano Administrativo",
            empresa: "Empresa Principal",
            uf: "SP",
            ativo: true,
            dataCreacao: "2024-01-01",
            quantidadeCargos: 3
          },
          {
            id: 2,
            nome: "Plano Comércio Exterior",
            empresa: "Empresa Principal",
            uf: "SP",
            ativo: true,
            dataCreacao: "2024-01-01",
            quantidadeCargos: 2
          }
        ]
      },
      cargos: {
        name: "Cargos",
        data: [
          {
            id: 1,
            planoCarreira: "Plano Administrativo",
            cargo: "Assistente Administrativo",
            salarioBase: 2327.00,
            cbo: "4122-05",
            quantidadeNiveis: 5
          },
          {
            id: 2,
            planoCarreira: "Plano Administrativo",
            cargo: "Analista Administrativo",
            salarioBase: 3657.00,
            cbo: "2521-05",
            quantidadeNiveis: 5
          },
          {
            id: 3,
            planoCarreira: "Plano Administrativo",
            cargo: "Supervisor Administrativo",
            salarioBase: 5743.00,
            cbo: "1411-05",
            quantidadeNiveis: 5
          },
          {
            id: 4,
            planoCarreira: "Plano Comércio Exterior",
            cargo: "Assistente de Comércio Exterior",
            salarioBase: 2800.00,
            cbo: "4131-10",
            quantidadeNiveis: 5
          },
          {
            id: 5,
            planoCarreira: "Plano Comércio Exterior",
            cargo: "Analista de Comércio Exterior",
            salarioBase: 4200.00,
            cbo: "2521-10",
            quantidadeNiveis: 5
          }
        ]
      },
      niveis: {
        name: "Níveis de Progressão",
        data: [
          // Assistente Administrativo
          { id: 1, cargoId: 1, cargo: "Assistente Administrativo", nivel: 1, valorMinimo: 265.00, valorMaximo: 465.00, requisitos: "Sem experiência mínima" },
          { id: 2, cargoId: 1, cargo: "Assistente Administrativo", nivel: 2, valorMinimo: 465.00, valorMaximo: 698.00, requisitos: "6 meses de experiência" },
          { id: 3, cargoId: 1, cargo: "Assistente Administrativo", nivel: 3, valorMinimo: 698.00, valorMaximo: 930.00, requisitos: "12 meses de experiência" },
          { id: 4, cargoId: 1, cargo: "Assistente Administrativo", nivel: 4, valorMinimo: 930.00, valorMaximo: 1163.00, requisitos: "24 meses de experiência" },
          { id: 5, cargoId: 1, cargo: "Assistente Administrativo", nivel: 5, valorMinimo: 1163.00, valorMaximo: 1395.00, requisitos: "36 meses de experiência" },
          // Analista Administrativo
          { id: 6, cargoId: 2, cargo: "Analista Administrativo", nivel: 1, valorMinimo: 418.00, valorMaximo: 418.00, requisitos: "Ensino superior completo" },
          { id: 7, cargoId: 2, cargo: "Analista Administrativo", nivel: 2, valorMinimo: 418.00, valorMaximo: 553.00, requisitos: "6 meses de experiência" },
          { id: 8, cargoId: 2, cargo: "Analista Administrativo", nivel: 3, valorMinimo: 553.00, valorMaximo: 731.00, requisitos: "12 meses de experiência" },
          { id: 9, cargoId: 2, cargo: "Analista Administrativo", nivel: 4, valorMinimo: 731.00, valorMaximo: 914.00, requisitos: "24 meses de experiência" },
          { id: 10, cargoId: 2, cargo: "Analista Administrativo", nivel: 5, valorMinimo: 914.00, valorMaximo: 1097.00, requisitos: "36 meses de experiência" },
          // Supervisor Administrativo
          { id: 11, cargoId: 3, cargo: "Supervisor Administrativo", nivel: 1, valorMinimo: 656.00, valorMaximo: 656.00, requisitos: "Experiência em liderança" },
          { id: 12, cargoId: 3, cargo: "Supervisor Administrativo", nivel: 2, valorMinimo: 656.00, valorMaximo: 861.00, requisitos: "6 meses como supervisor" },
          { id: 13, cargoId: 3, cargo: "Supervisor Administrativo", nivel: 3, valorMinimo: 861.00, valorMaximo: 1148.00, requisitos: "12 meses como supervisor" },
          { id: 14, cargoId: 3, cargo: "Supervisor Administrativo", nivel: 4, valorMinimo: 1148.00, valorMaximo: 1435.00, requisitos: "24 meses como supervisor" },
          { id: 15, cargoId: 3, cargo: "Supervisor Administrativo", nivel: 5, valorMinimo: 1435.00, valorMaximo: 1722.00, requisitos: "36 meses como supervisor" },
          // Assistente de Comércio Exterior
          { id: 16, cargoId: 4, cargo: "Assistente de Comércio Exterior", nivel: 1, valorMinimo: 320.00, valorMaximo: 560.00, requisitos: "Conhecimento básico em comex" },
          { id: 17, cargoId: 4, cargo: "Assistente de Comércio Exterior", nivel: 2, valorMinimo: 560.00, valorMaximo: 840.00, requisitos: "6 meses de experiência" },
          { id: 18, cargoId: 4, cargo: "Assistente de Comércio Exterior", nivel: 3, valorMinimo: 840.00, valorMaximo: 1120.00, requisitos: "12 meses de experiência" },
          { id: 19, cargoId: 4, cargo: "Assistente de Comércio Exterior", nivel: 4, valorMinimo: 1120.00, valorMaximo: 1400.00, requisitos: "24 meses de experiência" },
          { id: 20, cargoId: 4, cargo: "Assistente de Comércio Exterior", nivel: 5, valorMinimo: 1400.00, valorMaximo: 1680.00, requisitos: "36 meses de experiência" },
          // Analista de Comércio Exterior
          { id: 21, cargoId: 5, cargo: "Analista de Comércio Exterior", nivel: 1, valorMinimo: 480.00, valorMaximo: 480.00, requisitos: "Superior em Comércio Exterior" },
          { id: 22, cargoId: 5, cargo: "Analista de Comércio Exterior", nivel: 2, valorMinimo: 480.00, valorMaximo: 630.00, requisitos: "6 meses de experiência" },
          { id: 23, cargoId: 5, cargo: "Analista de Comércio Exterior", nivel: 3, valorMinimo: 630.00, valorMaximo: 840.00, requisitos: "12 meses de experiência" },
          { id: 24, cargoId: 5, cargo: "Analista de Comércio Exterior", nivel: 4, valorMinimo: 840.00, valorMaximo: 1050.00, requisitos: "24 meses de experiência" },
          { id: 25, cargoId: 5, cargo: "Analista de Comércio Exterior", nivel: 5, valorMinimo: 1050.00, valorMaximo: 1260.00, requisitos: "36 meses de experiência" }
        ]
      }
    }
  }
};
