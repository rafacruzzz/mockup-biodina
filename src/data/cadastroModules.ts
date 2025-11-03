import { 
  Users, 
  Package, 
  Building2, 
  Wrench,
  Tag
} from "lucide-react";
import type { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  entidades: {
    name: "Entidades",
    icon: Building2,
    subModules: {
      leads: {
        name: "Leads",
        data: [
          {
            id: 1,
            nome: "Tech Solutions Ltda",
            cnpj: "12.345.678/0001-90",
            cidade: "São Paulo",
            uf: "SP",
            telefone: "(11) 3456-7890",
            email: "contato@techsolutions.com.br"
          },
          {
            id: 2,
            nome: "Saúde Plus",
            cnpj: "23.456.789/0001-01",
            cidade: "Rio de Janeiro",
            uf: "RJ",
            telefone: "(21) 3567-8901",
            email: "comercial@saudeplus.com.br"
          }
        ]
      },
      clientes: {
        name: "Clientes",
        data: [
          {
            id: 1,
            nome: "Hospital São Lucas",
            cnpj: "12.345.678/0001-90",
            cidade: "São Paulo",
            uf: "SP",
            telefone: "(11) 3456-7890",
            email: "contato@saolucas.com.br"
          },
          {
            id: 2,
            nome: "Clínica Vida",
            cnpj: "98.765.432/0001-10",
            cidade: "Rio de Janeiro",
            uf: "RJ",
            telefone: "(21) 2345-6789",
            email: "comercial@clinicavida.com.br"
          }
        ]
      },
      representantes: {
        name: "Representantes Comerciais",
        data: [
          {
            id: 1,
            nome: "João Silva Representações",
            cnpj: "34.567.890/0001-12",
            cidade: "Belo Horizonte",
            uf: "MG",
            telefone: "(31) 4567-8901",
            email: "joao@representacoes.com.br"
          },
          {
            id: 2,
            nome: "Maria Santos Rep. Comercial",
            cnpj: "45.678.901/0001-23",
            cidade: "Curitiba",
            uf: "PR",
            telefone: "(41) 5678-9012",
            email: "maria@repcomercial.com.br"
          }
        ]
      },
      fornecedores_revenda: {
        name: "Fornecedor - Mercadoria para Revenda",
        data: [
          {
            id: 1,
            nome: "Medical Supply Brasil",
            cnpj: "56.789.012/0001-34",
            cidade: "São Paulo",
            uf: "SP",
            telefone: "(11) 6789-0123",
            email: "vendas@medicalsupply.com.br"
          },
          {
            id: 2,
            nome: "HealthTech Distribuidora",
            cnpj: "67.890.123/0001-45",
            cidade: "Brasília",
            uf: "DF",
            telefone: "(61) 7890-1234",
            email: "comercial@healthtech.com.br"
          }
        ]
      },
      fornecedores_uso_consumo: {
        name: "Fornecedor - Uso e Consumo",
        data: [
          {
            id: 1,
            nome: "Office Supplies S.A.",
            cnpj: "78.901.234/0001-56",
            cidade: "Porto Alegre",
            uf: "RS",
            telefone: "(51) 8901-2345",
            email: "vendas@officesupplies.com.br"
          },
          {
            id: 2,
            nome: "Clean Solutions Ltda",
            cnpj: "89.012.345/0001-67",
            cidade: "Recife",
            uf: "PE",
            telefone: "(81) 9012-3456",
            email: "comercial@cleansolutions.com.br"
          }
        ]
      },
      fornecedores_servicos: {
        name: "Fornecedor - Serviços",
        data: [
          {
            id: 1,
            nome: "Manutenção Tech",
            cnpj: "90.123.456/0001-78",
            cidade: "Salvador",
            uf: "BA",
            telefone: "(71) 0123-4567",
            email: "contato@manutencaotech.com.br"
          },
          {
            id: 2,
            nome: "Consultoria Médica Plus",
            cnpj: "01.234.567/0001-89",
            cidade: "Fortaleza",
            uf: "CE",
            telefone: "(85) 1234-5678",
            email: "consultoria@medicaplus.com.br"
          }
        ]
      },
      transportadoras: {
        name: "Transportadoras",
        data: [
          {
            id: 1,
            nome: "Expresso Rápido Transportes",
            cnpj: "11.222.333/0001-44",
            cidade: "São Paulo",
            uf: "SP",
            telefone: "(11) 2222-3333",
            email: "contato@expressorapido.com.br"
          },
          {
            id: 2,
            nome: "LogMed Logística",
            cnpj: "22.333.444/0001-55",
            cidade: "Campinas",
            uf: "SP",
            telefone: "(19) 3333-4444",
            email: "logistica@logmed.com.br"
          }
        ]
      }
    }
  },
  produtos: {
    name: "Produtos",
    icon: Package,
    subModules: {
      produtos: {
        name: "Mercadoria para Revenda",
        data: [
          {
            id: 1,
            codigo: "ABC-2000",
            referencia: "MED-ABC-2000",
            nome: "Analisador Bioquímico ABC-2000",
            descricao: "Analisador bioquímico automatizado de alta precisão para análises clínicas",
            modelo: "ABC-2000",
            fabricante: "ABC Medical Inc.",
            familiaProduto: "Equipamentos de Análise",
            marca: "ABC Medical",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 2,
            codigo: "DEF-300",
            referencia: "VENT-DEF-300",
            nome: "Ventilador Pulmonar DEF-300",
            descricao: "Ventilador pulmonar mecânico com controles avançados para UTI",
            modelo: "DEF-300",
            fabricante: "DEF Healthcare Solutions",
            familiaProduto: "Equipamentos de Ventilação",
            marca: "DEF Healthcare",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 3,
            codigo: "XYZ-Pro",
            referencia: "MON-XYZ-Pro",
            nome: "Monitor Multiparâmetros XYZ-Pro",
            descricao: "Monitor multiparâmetros para monitoramento contínuo de sinais vitais",
            modelo: "XYZ-Pro",
            fabricante: "XYZ Medical Corp.",
            familiaProduto: "Equipamentos de Monitoramento",
            marca: "XYZ Medical",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 4,
            codigo: "ECG-Elite",
            referencia: "CARD-ECG-Elite",
            nome: "Eletrocardiógrafo Elite",
            descricao: "Eletrocardiógrafo digital de 12 derivações com interpretação automática",
            modelo: "Elite-12",
            fabricante: "CardioTech Solutions",
            familiaProduto: "Equipamentos Cardiológicos",
            marca: "CardioTech",
            areaAnvisa: "produtos_saude"
          },
          {
            id: 5,
            codigo: "COVID-Kit-Pro",
            referencia: "DIAG-COVID-Pro",
            nome: "Kit COVID-19 Pro",
            descricao: "Kit de teste PCR para detecção rápida de COVID-19",
            modelo: "GH-2024",
            fabricante: "GHI Diagnostics Ltd.",
            familiaProduto: "Kits de Diagnóstico",
            marca: "GHI Diagnostics",
            areaAnvisa: "diagnostico_in_vitro"
          }
        ]
      },
      uso_consumo: {
        name: "Uso e Consumo",
        data: [
          {
            id: 1,
            nome: "Papel A4",
            categoria: "Papelaria",
            unidade: "pacote"
          },
          {
            id: 2,
            nome: "Caneta Esferográfica Azul",
            categoria: "Papelaria",
            unidade: "unidade"
          },
          {
            id: 3,
            nome: "Álcool em Gel 500ml",
            categoria: "Higiene",
            unidade: "frasco"
          }
        ]
      }
    }
  },
  servicos: {
    name: "Serviços",
    icon: Wrench,
    subModules: {
      servicos: {
        name: "Serviços",
        data: [
          {
            id: 1,
            nome: "Manutenção Preventiva",
            descricao: "Manutenção preventiva de equipamentos médicos",
            valor: 500.00
          }
        ]
      }
    }
  },
  usuarios: {
    name: "Usuários",
    icon: Users,
    subModules: {
      usuarios: {
        name: "Usuários",
        data: [
          {
            id: 1,
            nome: "João Silva",
            email: "joao@email.com",
            perfil: "Administrador"
          }
        ]
      }
    }
  },
  categorias: {
    name: "Categorias",
    icon: Tag,
    subModules: {
      categorias: {
        name: "Categorias",
        data: [
          {
            id: 1,
            nome: "Equipamentos Médicos",
            descricao: "Categoria para equipamentos médicos"
          }
        ]
      }
    }
  },
  cadastros_financeiros: {
    name: "Cadastros Financeiros",
    icon: Tag,
    subModules: {
      cartoes: {
        name: "Cartões Corporativos",
        data: [
          {
            id: 1,
            banco: "Banco do Brasil",
            numero: "****1234",
            titular: "João Silva",
            limite: 15000.00,
            usado: 3500.00,
            vencimento: "15",
            status: "Ativo"
          },
          {
            id: 2,
            banco: "Itaú",
            numero: "****5678", 
            titular: "Maria Santos",
            limite: 10000.00,
            usado: 1200.00,
            vencimento: "20",
            status: "Ativo"
          },
          {
            id: 3,
            banco: "Santander",
            numero: "****9012",
            titular: "Carlos Oliveira", 
            limite: 8000.00,
            usado: 5500.00,
            vencimento: "05",
            status: "Bloqueado"
          }
        ]
      },
      categorias_despesas: {
        name: "Categorias de Despesas",
        data: [
          { id: 1, nome: "Material de Escritório", codigo: "MAT-ESC", tipo: "Operacional", status: "Ativa" },
          { id: 2, nome: "Viagens e Hospedagem", codigo: "VIA-HOS", tipo: "Comercial", status: "Ativa" },
          { id: 3, nome: "Equipamentos TI", codigo: "EQP-TI", tipo: "Investimento", status: "Ativa" },
          { id: 4, nome: "Marketing e Publicidade", codigo: "MKT-PUB", tipo: "Comercial", status: "Inativa" },
          { id: 5, nome: "Consultoria Jurídica", codigo: "CON-JUR", tipo: "Serviços", status: "Ativa" },
          { id: 6, nome: "Energia Elétrica", codigo: "ENE-ELE", tipo: "Utilidade", status: "Ativa" }
        ]
      },
      prazos: {
        name: "Prazos de Pagamento",
        data: [
          {
            id: 1,
            nome: "À Vista",
            codigo: "AV",
            dias: 0,
            descricao: "Pagamento imediato",
            status: "Ativo"
          },
          {
            id: 2,
            nome: "30 Dias",
            codigo: "30D",
            dias: 30,
            descricao: "Pagamento em 30 dias corridos",
            status: "Ativo"
          },
          {
            id: 3,
            nome: "45 Dias",
            codigo: "45D",
            dias: 45,
            descricao: "Pagamento em 45 dias corridos",
            status: "Ativo"
          },
          {
            id: 4,
            nome: "60 Dias",
            codigo: "60D",
            dias: 60,
            descricao: "Pagamento em 60 dias corridos",
            status: "Inativo"
          }
        ]
      },
      contas_bancarias: {
        name: "Contas Bancárias",
        data: [
          {
            id: 1,
            banco: "001 - Banco do Brasil",
            agencia: "1234-5",
            conta: "12345-6",
            tipo: "Conta Corrente",
            saldo: 150000.00,
            status: "Ativa",
            possuiOfx: true,
            gerente: "Carlos Silva",
            telefoneGerente: "(11) 98765-4321"
          },
          {
            id: 2,
            banco: "341 - Itaú Unibanco",
            agencia: "9876",
            conta: "98765-4",
            tipo: "Conta Corrente",
            saldo: 85000.00,
            status: "Ativa",
            possuiOfx: true,
            gerente: "Ana Santos",
            telefoneGerente: "(11) 91234-5678"
          },
          {
            id: 3,
            banco: "033 - Santander",
            agencia: "3456",
            conta: "34567-8",
            tipo: "Conta Poupança",
            saldo: 50000.00,
            status: "Ativa",
            possuiOfx: false,
            gerente: "Roberto Lima",
            telefoneGerente: "(11) 92345-6789"
          }
        ]
      }
    }
  }
};