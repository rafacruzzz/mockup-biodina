
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
      setores: {
        name: "Setores",
        data: [
          {
            id: 1,
            nome: "Tecnologia",
            responsavel: "João Silva Santos",
            observacoes: "Setor responsável por sistemas e infraestrutura",
            funcoes: [1, 2, 3] // Analista de Sistemas, Desenvolvedor, Arquiteto de Software
          },
          {
            id: 2,
            nome: "Comercial",
            responsavel: "Maria Oliveira Costa",
            observacoes: "Setor de vendas e relacionamento com clientes",
            funcoes: [4, 5, 6] // Vendedor, Gerente de Vendas, Coordenador Comercial
          },
          {
            id: 3,
            nome: "Financeiro",
            responsavel: "Pedro Almeida Lima",
            observacoes: "Setor de controladoria e contabilidade",
            funcoes: [7, 8, 9] // Contador, Analista Financeiro, Gerente Financeiro
          },
          {
            id: 4,
            nome: "Recursos Humanos",
            responsavel: "Ana Paula Ferreira",
            observacoes: "Setor de gestão de pessoas",
            funcoes: [10, 11] // Analista de RH, Coordenador de RH
          },
          {
            id: 5,
            nome: "Produção",
            responsavel: "Carlos Eduardo Souza",
            observacoes: "Setor operacional de produção",
            funcoes: [12, 13, 14] // Operador de Produção, Supervisor de Produção, Gerente de Produção
          }
        ]
      },
      funcoes: {
        name: "Funções",
        data: [
          { id: 1, nome: "Analista de Sistemas" },
          { id: 2, nome: "Desenvolvedor" },
          { id: 3, nome: "Arquiteto de Software" },
          { id: 4, nome: "Vendedor" },
          { id: 5, nome: "Gerente de Vendas" },
          { id: 6, nome: "Coordenador Comercial" },
          { id: 7, nome: "Contador" },
          { id: 8, nome: "Analista Financeiro" },
          { id: 9, nome: "Gerente Financeiro" },
          { id: 10, nome: "Analista de RH" },
          { id: 11, nome: "Coordenador de RH" },
          { id: 12, nome: "Operador de Produção" },
          { id: 13, nome: "Supervisor de Produção" },
          { id: 14, nome: "Gerente de Produção" }
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
