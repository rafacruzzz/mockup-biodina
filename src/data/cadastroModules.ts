import { Package, Users, Settings, Wrench, Building, CreditCard, Tag, Clock, Warehouse } from "lucide-react";
import { ModulesConfig } from "@/types/cadastro";

export const modules: ModulesConfig = {
  entidades: {
    name: "Entidades",
    icon: Users,
    subModules: {
      entidades: {
        name: "Entidades",
        data: [
          { id: 1, nome_razao_social: "Hospital São Lucas", tipo: "Cliente", cnpj_cpf: "11.222.333/0001-44", contato: "Dr. Carlos Lima", telefone: "(11) 7777-6666", email: "carlos@saolucas.com.br", status: "Ativo" },
          { id: 2, nome_razao_social: "Fornecedor Medicamentos ABC Ltda", tipo: "Fornecedor", cnpj_cpf: "12.345.678/0001-90", contato: "João Silva", telefone: "(11) 9999-8888", email: "joao@abc.com.br", status: "Ativo" },
          { id: 3, nome_razao_social: "Hospital Regional Norte", tipo: "Lead", cnpj_cpf: "", contato: "Dr. Pedro Oliveira", telefone: "(85) 5555-4444", email: "pedro@regionalrte.com.br", status: "Novo" },
          { id: 4, nome_razao_social: "EMS S.A.", tipo: "Detentores Registro ANVISA", cnpj_cpf: "57.507.378/0001-83", contato: "Dr. Roberto Silva", telefone: "(19) 3707-8000", email: "regulatorio@ems.com.br", status: "Ativo", endereco: "Rod. Jornalista Francisco Aguirre Proença, 2374 - Chácara Primavera, Campinas - SP", data_cadastro: "2024-01-15" },
          { id: 5, nome_razao_social: "Eurofarma Laboratórios S.A.", tipo: "Detentores Registro ANVISA", cnpj_cpf: "61.190.096/0001-92", contato: "Dra. Maria Santos", telefone: "(11) 5090-3000", email: "assuntos.regulatorios@eurofarma.com.br", status: "Ativo", endereco: "Av. Vereador José Diniz, 3465 - Campo Belo, São Paulo - SP", data_cadastro: "2024-01-10" },
          { id: 6, nome_razao_social: "Pfizer Brasil Ltda.", tipo: "Detentores Registro ANVISA", cnpj_cpf: "46.070.868/0001-69", contato: "Dr. Fernando Costa", telefone: "(11) 5185-8500", email: "regulatory@pfizer.com", status: "Ativo", endereco: "Rua Alexandre Dumas, 1860 - Santo Amaro, São Paulo - SP", data_cadastro: "2024-01-08" }
        ]
      }
    }
  },
  produtos: {
    name: "Produtos",
    icon: Package,
    subModules: {
      produtos: {
        name: "Produtos",
        data: [
          { 
            id: 1, 
            codigo: "MED001", 
            descricao: "Paracetamol 500mg - Caixa com 20 comprimidos", 
            familiaProduto: "Medicamentos",
            marca: "EMS", 
            modelo: "Extra Forte",
            nomeMarketing: "Paracetamol EMS Extra Forte",
            descritivoBreve: "Analgésico e antitérmico de ação rápida",
            descritivoCompleto: "Medicamento analgésico e antitérmico indicado para o alívio da dor e redução da febre. Cada comprimido contém 500mg de paracetamol. Apresentação em embalagem com 20 comprimidos revestidos.",
            tags: ["analgésico", "antitérmico", "dor", "febre"],
            fabricanteId: "1",
            codigoProdutoFabricante: "EMS-PAR-500",
            nomeProdutoFabricante: "Paracetamol 500mg EMS",
            precoUnitarioVenda: 12.50, 
            estoqueFisico: 250,
            reservado: 15,
            estoqueDisponivel: 235,
            ultimaAlteracao: new Date('2024-01-15'),
            vendidoPorUnidade: true,
            ativo: true,
            // Regulamentação ANVISA
            detentorRegistroId: "1",
            nomeEmpresaDetentora: "EMS S.A.",
            cnpjDetentor: "57.507.378/0001-83",
            autorizacaoFuncionamento: "25351.916696/2019-26",
            nomeDispositivoMedico: "Paracetamol 500mg",
            nomeTecnicoDispositivo: "Paracetamol - N-acetil-para-aminofenol",
            numeroNotificacaoRegistro: "1.0068.0279.001-4",
            situacaoNotificacaoRegistro: "Vigente",
            processoNotificacaoRegistro: "25351.916696/2019-26",
            classificacaoRisco: "Classe I - Baixo Risco",
            dataInicioVigencia: new Date('2020-01-15'),
            dataVencimento: new Date('2025-01-15'),
            linkConsultaAnvisa: "https://consultas.anvisa.gov.br/#/medicamentos/25351916696201926/",
            // Apresentações expandidas
            apresentacaoPrimaria: "Blister com 10 comprimidos",
            apresentacaoSecundaria: "Caixa com 2 blisters (20 comprimidos)",
            apresentacaoEmbarque: "Caixa master com 50 unidades",
            componentes: "Princípio ativo: Paracetamol 500mg; Excipientes: Amido de milho, celulose microcristalina, estearato de magnésio, dióxido de silício coloidal, croscarmelose sódica",
            referenciasComercializadas: ["REF001 - Caixa 20 comp", "REF002 - Blister avulso 10 comp", "REF003 - Caixa hospitalar 100 comp"],
            // Documentação
            documentacaoLinks: {
              linksDocumentacao: [
                {
                  id: "1",
                  titulo: "Bula do Paciente",
                  url: "https://bulario.anvisa.gov.br/documento/paracetamol",
                  tipo: "Manual" as const,
                  dataUpload: new Date('2024-01-10'),
                  versao: "v2.1"
                }
              ],
              arquivosLocais: []
            }
          },
          { 
            id: 2, 
            codigo: "MED002", 
            descricao: "Amoxicilina 875mg - Antibiótico de amplo espectro", 
            familiaProduto: "Medicamentos",
            marca: "Eurofarma", 
            modelo: "Forte",
            nomeMarketing: "Amoxicilina Eurofarma Forte",
            descritivoBreve: "Antibiótico de amplo espectro para infecções bacterianas",
            descritivoCompleto: "Antibiótico de amplo espectro da classe das penicilinas, indicado para o tratamento de infecções causadas por bactérias sensíveis. Cada comprimido contém 875mg de amoxicilina tri-hidratada.",
            tags: ["antibiótico", "infecção", "bactéria", "amplo espectro"],
            fabricanteId: "2",
            codigoProdutoFabricante: "EUR-AMX-875",
            nomeProdutoFabricante: "Amoxicilina 875mg Eurofarma",
            precoUnitarioVenda: 28.90, 
            estoqueFisico: 180,
            reservado: 25,
            estoqueDisponivel: 155,
            ultimaAlteracao: new Date('2024-01-12'),
            vendidoPorUnidade: true,
            ativo: true,
            // Regulamentação ANVISA
            detentorRegistroId: "2",
            nomeEmpresaDetentora: "Eurofarma Laboratórios S.A.",
            cnpjDetentor: "61.190.096/0001-92",
            autorizacaoFuncionamento: "25351.172702/2018-81",
            nomeDispositivoMedico: "Amoxicilina 875mg",
            nomeTecnicoDispositivo: "Amoxicilina tri-hidratada",
            numeroNotificacaoRegistro: "1.0235.0158.002-1",
            situacaoNotificacaoRegistro: "Vigente",
            processoNotificacaoRegistro: "25351.172702/2018-81",
            classificacaoRisco: "Classe II - Médio Risco",
            dataInicioVigencia: new Date('2019-03-20'),
            dataVencimento: new Date('2024-03-20'),
            linkConsultaAnvisa: "https://consultas.anvisa.gov.br/#/medicamentos/25351172702201881/",
            // Apresentações expandidas
            apresentacaoPrimaria: "Blister com 14 comprimidos",
            apresentacaoSecundaria: "Caixa com 1 blister (14 comprimidos)",
            apresentacaoEmbarque: "Caixa master com 30 unidades",
            componentes: "Princípio ativo: Amoxicilina tri-hidratada equivalente a 875mg de amoxicilina; Excipientes: Celulose microcristalina, croscarmelose sódica, estearato de magnésio, dióxido de silício coloidal",
            referenciasComercializadas: ["REF004 - Caixa 14 comp", "REF005 - Caixa hospitalar 70 comp"],
            // Documentação
            documentacaoLinks: {
              linksDocumentacao: [
                {
                  id: "2",
                  titulo: "Protocolo de Uso Hospitalar", 
                  url: "https://eurofarma.com.br/protocolos/amoxicilina",
                  tipo: "Treinamento" as const,
                  dataUpload: new Date('2024-01-08'),
                  versao: "v1.3"
                }
              ],
              arquivosLocais: []
            }
          },
          { 
            id: 3, 
            codigo: "EQP001", 
            descricao: "Termômetro Digital Infravermelho", 
            familiaProduto: "Equipamentos Médicos",
            marca: "Omron", 
            modelo: "TH-839S",
            nomeMarketing: "Termômetro Omron Precision",
            descritivoBreve: "Termômetro digital sem contato por infravermelho",
            descritivoCompleto: "Termômetro digital infravermelho para medição de temperatura corporal sem contato físico. Tecnologia de precisão com display LCD e memória para últimas 25 medições. Ideal para uso doméstico e hospitalar.",
            tags: ["termômetro", "infravermelho", "digital", "sem contato"],
            fabricanteId: "4",
            codigoProdutoFabricante: "OMR-TH839S",
            nomeProdutoFabricante: "Digital Thermometer TH-839S",
            precoUnitarioVenda: 89.90, 
            estoqueFisico: 45,
            reservado: 3,
            estoqueDisponivel: 42,
            ultimaAlteracao: new Date('2024-01-10'),
            vendidoPorUnidade: true,
            ativo: true,
            // Regulamentação ANVISA
            detentorRegistroId: "3",
            nomeEmpresaDetentora: "Pfizer Brasil Ltda.",
            cnpjDetentor: "46.070.868/0001-69",
            autorizacaoFuncionamento: "25351.653421/2020-15",
            nomeDispositivoMedico: "Termômetro Digital Infravermelho",
            nomeTecnicoDispositivo: "Termômetro clínico eletrônico infravermelho",
            numeroNotificacaoRegistro: "80146300012",
            situacaoNotificacaoRegistro: "Vigente",
            processoNotificacaoRegistro: "25351.653421/2020-15",
            classificacaoRisco: "Classe II - Médio Risco",
            dataInicioVigencia: new Date('2021-06-15'),
            dataVencimento: new Date('2026-06-15'),
            linkConsultaAnvisa: "https://consultas.anvisa.gov.br/#/equipamentos/80146300012/",
            // Apresentações expandidas
            apresentacaoPrimaria: "Unidade individual com estojo",
            apresentacaoSecundaria: "Caixa com manual e pilhas",
            apresentacaoEmbarque: "Caixa master com 20 unidades",
            componentes: "Sensor infravermelho MLX90614, display LCD, processador ARM Cortex-M0, carcaça em ABS médico",
            referenciasComercializadas: ["REF006 - Unidade doméstica", "REF007 - Kit hospitalar com suporte"],
            // Documentação
            documentacaoLinks: {
              linksDocumentacao: [
                {
                  id: "3",
                  titulo: "Manual de Operação",
                  url: "https://omron.com.br/manuais/th839s",
                  tipo: "Manual" as const,
                  dataUpload: new Date('2024-01-05'),
                  versao: "v3.2"
                },
                {
                  id: "4", 
                  titulo: "Treinamento de Calibração",
                  url: "https://omron.com.br/treinamentos/calibracao",
                  tipo: "Treinamento" as const,
                  dataUpload: new Date('2024-01-03'),
                  versao: "v1.0"
                }
              ],
              arquivosLocais: []
            }
          }
        ]
      },
      tabela_preco: {
        name: "Tabela de Preço",
        data: [
          { id: 1, nome: "Padrão Varejo", descricao: "Preços para venda direta", margem: "40%", ativa: true },
          { id: 2, nome: "Distribuidores", descricao: "Preços para revendas", margem: "25%", ativa: true },
          { id: 3, nome: "Cooperativas", descricao: "Preços especiais cooperativas", margem: "30%", ativa: true }
        ]
      },
      kits: {
        name: "Kits",
        data: [
          { id: 1, nome: "Kit Antibiótico Completo", codigo: "KIT-ANTI-001", produtos_inclusos: 5, valor_total: 285.50 },
          { id: 2, nome: "Kit Analgésicos Básico", codigo: "KIT-ANAL-002", produtos_inclusos: 3, valor_total: 125.90 }
        ]
      }
    }
  },
  estoque: {
    name: "Estoque",
    icon: Warehouse,
    subModules: {
      estoque: {
        name: "Estoque",
        data: [
          { id: 1, empresa_id: "11.222.333/0001-44", nome_fantasia: "WebMED Rio", deposito_id: "DEP001", local_fisico: "Prateleira A1" },
          { id: 2, empresa_id: "12.345.678/0001-90", nome_fantasia: "Distribuidora SP", deposito_id: "DEP002", local_fisico: "Câmara Fria B" },
          { id: 3, empresa_id: "11.222.333/0001-44", nome_fantasia: "WebMED Rio", deposito_id: "DEP003", local_fisico: "Galpão Externo C" }
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
          { id: 1, codigo: "SERV-001", nome: "Consultoria Farmacêutica", valor: 150.00, unidade_medida: "HORA", categoria: "Consultoria", ativo: true, descricao: "Consultoria especializada em medicamentos" },
          { id: 2, codigo: "SERV-002", nome: "Treinamento em Boas Práticas", valor: 800.00, unidade_medida: "TREINAMENTO", categoria: "Educação", ativo: true, descricao: "Treinamento para equipes" }
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
          { id: 1, nome: "João Silva", email: "joao.silva@biodina.com.br", nivel_acesso: "Administrador", acessos: "Todos os módulos", alertas: "Ativo", status: "Ativo" },
          { id: 2, nome: "Maria Santos", email: "maria.santos@biodina.com.br", nivel_acesso: "Vendedor", acessos: "Comercial, Cadastros", alertas: "Ativo", status: "Ativo" }
        ]
      }
    }
  },
  contas_bancarias: {
    name: "Contas Bancárias",
    icon: CreditCard,
    subModules: {
      contas_bancarias: {
        name: "Contas Bancárias",
        data: [
          { 
            id: 1, 
            situacao: "Ativo", 
            nome_conta: "Conta Principal Operacional", 
            instituicao: "Banco do Brasil", 
            tipo_conta: "Conta Corrente", 
            agencia: "1234-5", 
            conta_corrente: "12345-6", 
            saldo_inicial: 50000.00, 
            limite_credito: 100000.00,
            resumo: true,
            fluxo_caixa: true,
            emite_boletos: true,
            incluido: true,
            ultima_alteracao: "2024-01-15",
            incluido_por: "João Silva",
            alterado_por: "João Silva"
          },
          { 
            id: 2, 
            situacao: "Ativo", 
            nome_conta: "Conta Reserva Emergencial", 
            instituicao: "Itaú Unibanco", 
            tipo_conta: "Conta Poupança", 
            agencia: "5678-9", 
            conta_corrente: "98765-4", 
            saldo_inicial: 25000.00, 
            limite_credito: 0.00,
            resumo: false,
            fluxo_caixa: true,
            emite_boletos: false,
            incluido: true,
            ultima_alteracao: "2024-01-10",
            incluido_por: "Maria Santos",
            alterado_por: "Maria Santos"
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
          { id: 1, nome: "Medicamentos", descricao: "Categoria para medicamentos", tipo: "Produtos", ativo: true },
          { id: 2, nome: "Equipamentos Médicos", descricao: "Categoria para equipamentos médicos", tipo: "Produtos", ativo: true },
          { id: 3, nome: "Serviços Médicos", descricao: "Categoria para prestação de serviços médicos", tipo: "Serviços", ativo: true }
        ]
      }
    }
  },
  prazos_pagamento: {
    name: "Prazos de Pagamento",
    icon: Clock,
    subModules: {
      prazos_pagamento: {
        name: "Prazos de Pagamento",
        data: [
          { id: 1, nome: "À Vista", dias: 0, descricao: "Pagamento imediato", ativo: true },
          { id: 2, nome: "30 dias", dias: 30, descricao: "Pagamento em 30 dias", ativo: true },
          { id: 3, nome: "60 dias", dias: 60, descricao: "Pagamento em 60 dias", ativo: true }
        ]
      }
    }
  }
};
