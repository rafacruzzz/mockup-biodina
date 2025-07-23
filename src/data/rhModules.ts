
import { UserCheck } from "lucide-react";

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
  }
};
