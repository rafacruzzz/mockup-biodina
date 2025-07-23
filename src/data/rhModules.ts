
import { UserCheck, Building2, Clock } from "lucide-react";

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
  departamentos: {
    name: "Departamentos",
    icon: Building2,
    subModules: {
      departamentos: {
        name: "Departamentos",
        data: [
          {
            id: 1,
            nome: "Tecnologia",
            responsavel: "João Silva Santos",
            observacoes: "Departamento responsável por sistemas e infraestrutura"
          },
          {
            id: 2,
            nome: "Comercial",
            responsavel: "Maria Oliveira Costa",
            observacoes: "Departamento de vendas e relacionamento com clientes"
          },
          {
            id: 3,
            nome: "Financeiro",
            responsavel: "Pedro Almeida Lima",
            observacoes: "Departamento de controladoria e contabilidade"
          },
          {
            id: 4,
            nome: "Recursos Humanos",
            responsavel: "Ana Paula Ferreira",
            observacoes: "Departamento de gestão de pessoas"
          },
          {
            id: 5,
            nome: "Produção",
            responsavel: "Carlos Eduardo Souza",
            observacoes: "Departamento operacional de produção"
          }
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
  }
};
