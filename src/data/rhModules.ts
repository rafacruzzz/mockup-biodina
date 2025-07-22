
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
            tipo: "CLT",
            categoria: "Efetivo",
            profissao: "Analista de Sistemas",
            departamento: "Tecnologia",
            expediente: "08:00 - 18:00",
            dataNascimento: "1985-03-15",
            sexo: "M",
            naturalidade: "São Paulo - SP",
            dataContratacao: "2020-01-15",
            cpf: "123.456.789-00",
            rg: "12.345.678-9"
          },
          {
            id: 2,
            codigo: "COL002",
            nome: "Maria Oliveira Costa",
            tipo: "CLT",
            categoria: "Efetivo",
            profissao: "Gerente de Vendas",
            departamento: "Comercial",
            expediente: "08:00 - 18:00",
            dataNascimento: "1988-07-22",
            sexo: "F",
            naturalidade: "Rio de Janeiro - RJ",
            dataContratacao: "2019-05-10",
            cpf: "987.654.321-00",
            rg: "98.765.432-1"
          },
          {
            id: 3,
            codigo: "COL003",
            nome: "Pedro Almeida Lima",
            tipo: "PJ",
            categoria: "Terceirizado",
            profissao: "Contador",
            departamento: "Financeiro",
            expediente: "08:00 - 17:00",
            dataNascimento: "1982-11-08",
            sexo: "M",
            naturalidade: "Belo Horizonte - MG",
            dataContratacao: "2021-03-01",
            cpf: "456.789.123-00",
            rg: "45.678.912-3"
          },
          {
            id: 4,
            codigo: "COL004",
            nome: "Ana Paula Ferreira",
            tipo: "CLT",
            categoria: "Efetivo",
            profissao: "Analista de RH",
            departamento: "Recursos Humanos",
            expediente: "08:00 - 18:00",
            dataNascimento: "1990-05-30",
            sexo: "F",
            naturalidade: "Porto Alegre - RS",
            dataContratacao: "2022-08-15",
            cpf: "789.123.456-00",
            rg: "78.912.345-6"
          },
          {
            id: 5,
            codigo: "COL005",
            nome: "Carlos Eduardo Souza",
            tipo: "CLT",
            categoria: "Efetivo",
            profissao: "Operador de Produção",
            departamento: "Produção",
            expediente: "06:00 - 15:00",
            dataNascimento: "1987-09-12",
            sexo: "M",
            naturalidade: "Salvador - BA",
            dataContratacao: "2018-11-20",
            cpf: "321.654.987-00",
            rg: "32.165.498-7"
          }
        ]
      }
    }
  }
};
