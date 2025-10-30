import { 
  Monitor, 
  HardDrive, 
  Network, 
  FileText, 
  Shield, 
  CheckSquare,
  BarChart3,
  Mail,
  Users,
  Phone,
  ArrowLeftRight
} from "lucide-react";
import type { TIModulesConfig } from "@/types/ti";

export const tiModules: TIModulesConfig = {
  dashboard: {
    name: "Visão Geral",
    icon: BarChart3,
    subModules: {
      dashboard: {
        name: "Dashboard",
        data: []
      }
    }
  },
  chamados: {
    name: "Gestão de Chamados",
    icon: Monitor,
    subModules: {
      painel: {
        name: "Painel de Controle",
        data: [
          {
            id: 1,
            titulo: "Impressora não funciona",
            categoria: "impressoras",
            prioridade: "alta",
            status: "aberto",
            solicitante: "João Silva",
            departamento: "Comercial",
            dataAbertura: "2024-01-15T10:30:00",
            descricao: "Impressora HP do setor comercial não está imprimindo"
          },
          {
            id: 2,
            titulo: "Lentidão no sistema",
            categoria: "softwares",
            prioridade: "media",
            status: "em_andamento",
            solicitante: "Maria Santos",
            departamento: "RH",
            tecnicoResponsavel: "Carlos TI",
            dataAbertura: "2024-01-15T09:15:00",
            descricao: "Sistema ERP está muito lento"
          }
        ]
      },
      abrir_chamado: {
        name: "Abrir Chamado",
        data: []
      }
    }
  },
  inventario: {
    name: "Inventário de Ativos",
    icon: HardDrive,
    subModules: {
      ativos: {
        name: "Ativos de TI",
        data: [
          {
            id: 1,
            numeroInventario: "NB-001",
            equipamento: "Notebook Dell Vostro 15",
            tipo: "notebook",
            marca: "Dell",
            modelo: "Vostro 15-3520",
            numeroSerie: "DL2024001",
            status: "ativo",
            responsavel: "João Silva",
            departamento: "Comercial",
            localizacao: "Sala 101 - 1º Andar",
            dataAquisicao: "2024-01-10",
            dataGarantia: "2024-12-15",
            valorAquisicao: 2500.00,
            fornecedor: "Dell do Brasil",
            numeroNF: "NF-2024-001",
            centroCusto: "Comercial",
            observacoes: "Notebook principal do gerente comercial",
            notasFiscais: [
              { nome: "NF-2024-001.pdf", tipo: "application/pdf", tamanho: 245678 },
              { nome: "NF-2024-001.xml", tipo: "application/xml", tamanho: 12345 }
            ],
            historico: [
              {
                id: 1,
                data: "2024-01-10T10:30:00",
                tipo: "cadastro",
                usuario: "Carlos TI",
                observacoes: "Cadastro inicial do ativo - equipamento recém adquirido"
              },
              {
                id: 2,
                data: "2024-01-10T14:00:00",
                tipo: "transferencia",
                departamentoOrigem: "TI",
                departamentoDestino: "Comercial",
                responsavelOrigem: "Estoque TI",
                responsavelDestino: "João Silva",
                motivo: "Alocação para novo gerente comercial",
                usuario: "Carlos TI",
                observacoes: "Transferência aprovada pela diretoria"
              }
            ]
          },
          {
            id: 2,
            numeroInventario: "IMP-001",
            equipamento: "Impressora HP LaserJet Pro",
            tipo: "impressora",
            marca: "HP",
            modelo: "LaserJet Pro MFP M404",
            numeroSerie: "HP2024001",
            status: "manutencao",
            responsavel: "Departamento TI",
            departamento: "TI",
            localizacao: "Sala 205 - 2º Andar",
            dataAquisicao: "2023-06-15",
            dataGarantia: "2024-12-20",
            valorAquisicao: 1200.00,
            fornecedor: "HP Brasil",
            numeroNF: "NF-2023-045",
            centroCusto: "TI",
            observacoes: "Em manutenção preventiva",
            historico: [
              {
                id: 1,
                data: "2023-06-15T09:00:00",
                tipo: "cadastro",
                usuario: "Ana Costa - TI",
                observacoes: "Cadastro inicial do equipamento"
              },
              {
                id: 2,
                data: "2024-01-14T11:30:00",
                tipo: "manutencao",
                usuario: "Carlos TI",
                observacoes: "Manutenção preventiva - substituição de toner e limpeza"
              }
            ]
          },
          {
            id: 3,
            numeroInventario: "DT-003",
            equipamento: "Desktop Lenovo ThinkCentre",
            tipo: "desktop",
            marca: "Lenovo",
            modelo: "ThinkCentre M70q",
            numeroSerie: "LV2024003",
            status: "ativo",
            responsavel: "Maria Santos",
            departamento: "RH",
            localizacao: "Sala 203 - 2º Andar",
            dataAquisicao: "2023-08-20",
            dataGarantia: "2025-08-20",
            valorAquisicao: 1800.00,
            fornecedor: "Lenovo Brasil",
            numeroNF: "NF-2023-078",
            centroCusto: "RH"
          },
          {
            id: 4,
            numeroInventario: "SV-001",
            equipamento: "Servidor Dell PowerEdge",
            tipo: "servidor",
            marca: "Dell",
            modelo: "PowerEdge T340",
            numeroSerie: "DPSV2023001",
            status: "ativo",
            responsavel: "Equipe TI",
            departamento: "TI",
            localizacao: "Rack Principal - Data Center",
            dataAquisicao: "2023-03-10",
            dataGarantia: "2026-03-10",
            valorAquisicao: 8500.00,
            fornecedor: "Dell do Brasil",
            numeroNF: "NF-2023-025",
            centroCusto: "TI"
          },
          {
            id: 5,
            numeroInventario: "NB-002",
            equipamento: "Notebook Lenovo ThinkPad",
            tipo: "notebook",
            marca: "Lenovo",
            modelo: "ThinkPad E14",
            numeroSerie: "LV2024002",
            status: "reserva",
            responsavel: "Estoque TI",
            departamento: "TI",
            localizacao: "Almoxarifado TI",
            dataAquisicao: "2024-02-15",
            dataGarantia: "2025-02-15",
            valorAquisicao: 2200.00,
            fornecedor: "Lenovo Brasil",
            numeroNF: "NF-2024-012",
            centroCusto: "TI"
          },
          {
            id: 6,
            numeroInventario: "RT-001",
            equipamento: "Roteador Cisco",
            tipo: "roteador",
            marca: "Cisco",
            modelo: "ISR 4321",
            numeroSerie: "CS2023001",
            status: "ativo",
            responsavel: "Equipe TI",
            departamento: "TI",
            localizacao: "Rack Principal - Data Center",
            dataAquisicao: "2023-01-15",
            dataGarantia: "2025-01-15",
            valorAquisicao: 3200.00,
            fornecedor: "Cisco do Brasil",
            numeroNF: "NF-2023-008",
            centroCusto: "TI"
          }
        ]
      },
      transferencias: {
        name: "Transferências",
        data: [
          {
            id: 1,
            ativoId: 1,
            numeroInventario: "NB-001",
            equipamento: "Notebook Dell Vostro 15",
            departamentoOrigem: "TI",
            departamentoDestino: "Comercial",
            responsavelOrigem: "Estoque TI",
            responsavelDestino: "João Silva",
            dataTransferencia: "2024-01-10",
            motivo: "Alocação para novo colaborador",
            aprovadoPor: "Carlos TI",
            status: "concluida"
          }
        ]
      },
      relatorios: {
        name: "Relatórios",
        data: []
      }
    }
  },
  rede: {
    name: "Mapeamento da Rede",
    icon: Network,
    subModules: {
      topologia: {
        name: "Topologia de Rede",
        data: [
          {
            id: "internet",
            tipo: "internet",
            nome: "Internet",
            status: "online",
            localizacao: "Externa",
            x: 400,
            y: 50
          },
          {
            id: "firewall-01",
            tipo: "firewall",
            nome: "Firewall Principal",
            status: "online",
            ip: "192.168.1.1",
            localizacao: "Rack Principal",
            x: 400,
            y: 150
          },
          {
            id: "switch-01",
            tipo: "switch",
            nome: "Switch Principal",
            status: "online",
            ip: "192.168.1.10",
            pontosEmUso: 18,
            pontosTotal: 24,
            localizacao: "Rack Principal",
            x: 400,
            y: 250
          },
          {
            id: "ap-01",
            tipo: "access_point",
            nome: "Access Point RJ",
            status: "online",
            ip: "192.168.1.50",
            pontosEmUso: 15,
            pontosTotal: 50,
            localizacao: "Sala RJ",
            x: 200,
            y: 350
          },
          {
            id: "ap-02",
            tipo: "access_point",
            nome: "Access Point SP",
            status: "online",
            ip: "192.168.1.51",
            pontosEmUso: 23,
            pontosTotal: 50,
            localizacao: "Sala SP",
            x: 600,
            y: 350
          }
        ]
      }
    }
  },
  politicas: {
    name: "Políticas e Procedimentos",
    icon: FileText,
    subModules: {
      biblioteca: {
        name: "Biblioteca de Documentos",
        data: [
          {
            id: 1,
            nome: "Política de Senhas",
            categoria: "seguranca",
            versao: "2.1",
            dataUltimaRevisao: "2024-01-10",
            responsavel: "João Silva - TI",
            status: "ativo",
            arquivo: "politica-senhas-v2.1.pdf",
            descricao: "Diretrizes para criação e manutenção de senhas seguras"
          },
          {
            id: 2,
            nome: "Procedimento de Backup",
            categoria: "backup",
            versao: "1.5",
            dataUltimaRevisao: "2024-01-05",
            responsavel: "Carlos Santos - TI",
            status: "ativo",
            arquivo: "procedimento-backup-v1.5.pdf",
            descricao: "Procedimentos para backup e recuperação de dados"
          },
          {
            id: 3,
            nome: "Solicitação de Equipamentos",
            categoria: "equipamentos",
            versao: "3.0",
            dataUltimaRevisao: "2023-12-20",
            responsavel: "Maria Costa - TI",
            status: "ativo",
            arquivo: "solicitacao-equipamentos-v3.0.pdf",
            descricao: "Processo para solicitação de novos equipamentos de TI"
          },
          {
            id: 4,
            nome: "Credenciais de Sistemas Corporativos",
            categoria: "senhas",
            versao: "1.0",
            dataUltimaRevisao: "2024-01-15",
            responsavel: "Segurança TI",
            status: "ativo",
            arquivo: "credenciais-sistemas-v1.0.pdf.enc",
            descricao: "Repositório seguro de credenciais de sistemas críticos (acesso restrito)"
          },
          {
            id: 5,
            nome: "Acessos Administrativos - Rede e Servidores",
            categoria: "senhas",
            versao: "2.3",
            dataUltimaRevisao: "2024-01-12",
            responsavel: "João Silva - TI",
            status: "ativo",
            arquivo: "acessos-admin-rede-v2.3.pdf.enc",
            descricao: "Credenciais de contas administrativas de infraestrutura de rede"
          },
          {
            id: 6,
            nome: "Senhas de Serviços Cloud",
            categoria: "senhas",
            versao: "1.8",
            dataUltimaRevisao: "2024-01-10",
            responsavel: "Carlos Santos - TI",
            status: "ativo",
            arquivo: "senhas-cloud-v1.8.pdf.enc",
            descricao: "AWS, Azure, Google Cloud e outros serviços de nuvem"
          },
          {
            id: 7,
            nome: "Chaves de API e Tokens",
            categoria: "senhas",
            versao: "3.1",
            dataUltimaRevisao: "2024-01-08",
            responsavel: "Segurança TI",
            status: "ativo",
            arquivo: "chaves-api-v3.1.pdf.enc",
            descricao: "Tokens de autenticação, chaves de API e segredos de integração"
          },
          {
            id: 8,
            nome: "Certificados Digitais e Senhas",
            categoria: "senhas",
            versao: "1.2",
            dataUltimaRevisao: "2024-01-05",
            responsavel: "Maria Costa - TI",
            status: "ativo",
            arquivo: "certificados-digitais-v1.2.pdf.enc",
            descricao: "Senhas de certificados SSL/TLS, assinaturas digitais e PKI"
          }
        ]
      }
    }
  },
  seguranca: {
    name: "Segurança",
    icon: Shield,
    data: [
      // Incidentes de Segurança
      {
        id: 1,
        tipo: "incidente",
        dataHora: "2024-01-15T14:30:00",
        tipoIncidente: "acesso_suspeito", 
        detalhes: "Login fora do horário - usuário joão.silva tentando acesso às 02:30",
        status: "novo",
        criticidade: "critica"
      },
      {
        id: 2,
        tipo: "incidente",
        dataHora: "2024-01-15T13:45:00",
        tipoIncidente: "firewall",
        detalhes: "Tentativa de acesso bloqueada do IP 203.45.67.89",
        status: "investigando",
        criticidade: "alta",
        responsavel: "Carlos TI"
      },
      {
        id: 3,
        tipo: "incidente",
        dataHora: "2024-01-15T12:15:00",
        tipoIncidente: "malware",
        detalhes: "Arquivo suspeito detectado na estação NB-045 - arquivo: documento.exe",
        status: "resolvido",
        criticidade: "alta",
        responsavel: "Ana Security",
        acoes: "Arquivo removido e sistema escaneado"
      },
      {
        id: 4,
        tipo: "incidente",
        dataHora: "2024-01-15T11:20:00",
        tipoIncidente: "phishing",
        detalhes: "E-mail suspeito enviado para múltiplos usuários",
        status: "novo",
        criticidade: "critica"
      },
      // Auditoria de Acessos
      {
        id: 11,
        tipo: "auditoria",
        usuario: "joao.silva",
        sistema: "ERP iMuv",
        dataHora: "2024-01-15T08:30:00",
        ip: "192.168.1.100",
        status: "sucesso"
      },
      {
        id: 12,
        tipo: "auditoria",
        usuario: "maria.santos",
        sistema: "Sistema RH",
        dataHora: "2024-01-15T08:25:00",
        ip: "192.168.1.105",
        status: "sucesso"
      },
      {
        id: 13,
        tipo: "auditoria",
        usuario: "carlos.admin",
        sistema: "Servidor Principal",
        dataHora: "2024-01-15T08:00:00",
        ip: "192.168.1.200",
        status: "falha",
        detalhes: "Senha incorreta - 3 tentativas"
      },
      {
        id: 14,
        tipo: "auditoria",
        usuario: "ana.costa",
        sistema: "Financeiro",
        dataHora: "2024-01-15T07:45:00",
        ip: "192.168.1.110",
        status: "falha",
        detalhes: "Acesso negado - usuário bloqueado"
      },
      // Status Antivírus
      {
        id: 21,
        tipo: "antivirus",
        estacaoTrabalho: "NB-001",
        usuario: "João Silva",
        status: "atualizado",
        versaoAntivirus: "2024.1.15",
        ultimaVerificacao: "2024-01-15T06:00:00",
        ameacasDetectadas: 0
      },
      {
        id: 22,
        tipo: "antivirus",
        estacaoTrabalho: "DT-005",
        usuario: "Maria Santos",
        status: "desatualizado",
        versaoAntivirus: "2024.1.10",
        ultimaVerificacao: "2024-01-12T18:30:00",
        ameacasDetectadas: 1,
        observacoes: "Definições desatualizadas há 3 dias"
      },
      {
        id: 23,
        tipo: "antivirus",
        estacaoTrabalho: "NB-003",
        usuario: "Carlos Admin",
        status: "atualizado",
        versaoAntivirus: "2024.1.15",
        ultimaVerificacao: "2024-01-15T05:30:00",
        ameacasDetectadas: 0
      },
      {
        id: 24,
        tipo: "antivirus",
        estacaoTrabalho: "DT-008",
        usuario: "Ana Costa",
        status: "inativo",
        versaoAntivirus: "2024.1.8",
        ultimaVerificacao: "2024-01-10T14:00:00",
        ameacasDetectadas: 3,
        observacoes: "Antivírus desabilitado pelo usuário"
      },
      // Conformidade
      {
        id: 31,
        tipo: "conformidade",
        norma: "ISO 27001",
        controle: "A.9.1.1",
        status: "implementado",
        descricao: "Política de controle de acesso",
        responsavel: "João Silva - TI"
      },
      {
        id: 32,
        tipo: "conformidade",
        norma: "LGPD",
        controle: "LGPD.1",
        status: "implementado", 
        descricao: "Política de Privacidade de Dados",
        responsavel: "Ana Costa - Jurídico"
      }
    ]
  },
  conformidade: {
    name: "Conformidade",
    icon: CheckSquare,
    subModules: {
      iso27001: {
        name: "ISO 27001",
        data: [
          {
            id: "A.9.1.1",
            idControle: "A.9.1.1",
            descricao: "Política de controle de acesso",
            norma: "iso27001",
            status: "implementado",
            responsavel: "João Silva - TI",
            dataUltimaRevisao: "2024-01-10",
            evidencias: ["politica-acesso-v2.pdf"],
            observacoes: "Política atualizada conforme novas diretrizes"
          },
          {
            id: "A.9.1.2",
            idControle: "A.9.1.2", 
            descricao: "Acesso a redes e serviços de rede",
            norma: "iso27001",
            status: "em_andamento",
            responsavel: "Carlos Santos - TI",
            evidencias: [],
            observacoes: "Implementação de nova arquitetura de rede em andamento"
          }
        ]
      },
      lgpd: {
        name: "LGPD",
        data: [
          {
            id: "LGPD.1",
            idControle: "LGPD.1",
            descricao: "Política de Privacidade de Dados",
            norma: "lgpd",
            status: "implementado",
            responsavel: "Ana Costa - Jurídico",
            dataUltimaRevisao: "2024-01-05",
            evidencias: ["politica-privacidade-v1.2.pdf"],
            observacoes: "Política publicada no site e comunicada aos colaboradores"
          }
        ]
      },
      gdpr: {
        name: "GDPR",
        data: [
          {
            id: "GDPR.1",
            idControle: "GDPR.1",
            descricao: "Data Protection Officer (DPO)",
            norma: "gdpr",
            status: "implementado",
            responsavel: "Ana Costa - Jurídico",
            dataUltimaRevisao: "2024-01-08",
            evidencias: ["nomeacao-dpo-v1.pdf"],
            observacoes: "DPO nomeado e registrado conforme GDPR"
          },
          {
            id: "GDPR.2",
            idControle: "GDPR.2", 
            descricao: "Consentimento para processamento de dados",
            norma: "gdpr",
            status: "em_andamento",
            responsavel: "Carlos Santos - TI",
            evidencias: [],
            observacoes: "Implementando sistema de consentimento granular"
          }
        ]
      },
      pci_dss: {
        name: "PCI-DSS",
        data: [
          {
            id: "PCI.1",
            idControle: "PCI.1",
            descricao: "Firewall e configurações de roteador",
            norma: "pci_dss",
            status: "implementado",
            responsavel: "João Silva - TI",
            dataUltimaRevisao: "2024-01-12",
            evidencias: ["config-firewall-v3.pdf"],
            observacoes: "Configurações atualizadas conforme padrões PCI"
          },
          {
            id: "PCI.2",
            idControle: "PCI.2",
            descricao: "Não usar senhas padrão do sistema",
            norma: "pci_dss", 
            status: "implementado",
            responsavel: "Carlos Santos - TI",
            dataUltimaRevisao: "2024-01-10",
            evidencias: ["politica-senhas-v2.pdf"],
            observacoes: "Política implementada em todos os sistemas"
          }
        ]
      }
    }
  },
  emails: {
    name: "Gestão de E-mails",
    icon: Mail,
    subModules: {
      contas: {
        name: "Contas de E-mail",
        data: [
          {
            id: 1,
            endereco: "joao.silva@biodina.com.br",
            nomeUsuario: "João Silva",
            departamento: "Comercial",
            status: "ativo",
            dataUltimaAlteracao: "2024-01-10T14:30:00",
            responsavel: "TI Admin"
          },
          {
            id: 2,
            endereco: "maria.santos@biodina.com.br",
            nomeUsuario: "Maria Santos",
            departamento: "RH",
            status: "ativo",
            dataUltimaAlteracao: "2024-01-08T09:15:00",
            responsavel: "TI Admin"
          },
          {
            id: 3,
            endereco: "carlos.old@biodina.com.br",
            nomeUsuario: "Carlos Antigo",
            departamento: "Financeiro",
            status: "redirecionado",
            redirecionadoPara: "carlos.novo@biodina.com.br",
            dataUltimaAlteracao: "2024-01-05T16:45:00",
            responsavel: "Ana TI"
          }
        ]
      }
    }
  },
  usuarios_rede: {
    name: "Usuários de Rede",
    icon: Users,
    subModules: {
      usuarios: {
        name: "Usuários de Rede",
        data: [
          {
            id: 1,
            nomeUsuario: "joao.silva",
            nomeCompleto: "João Silva",
            departamento: "Comercial",
            gruposPermissao: ["Comercial_Total", "Usuarios_Padrao"],
            status: "ativo",
            dataUltimoLogin: "2024-01-15T08:30:00",
            dataUltimaAlteracaoSenha: "2023-12-15T10:00:00",
            responsavel: "TI Admin"
          },
          {
            id: 2,
            nomeUsuario: "maria.santos",
            nomeCompleto: "Maria Santos",
            departamento: "RH",
            gruposPermissao: ["RH_Total", "Usuarios_Padrao"],
            status: "ativo",
            dataUltimoLogin: "2024-01-15T09:15:00",
            dataUltimaAlteracaoSenha: "2024-01-01T14:20:00",
            responsavel: "TI Admin"
          },
          {
            id: 3,
            nomeUsuario: "pedro.inativo",
            nomeCompleto: "Pedro Desligado",
            departamento: "Ex-Funcionário",
            gruposPermissao: [],
            status: "inativo",
            dataUltimaAlteracaoSenha: "2023-11-30T17:00:00",
            responsavel: "Ana TI"
          }
        ]
      }
    }
  },
  telefonia: {
    name: "Telefonia e Ramais",
    icon: Phone,
    subModules: {
      ramais: {
        name: "Ramais",
        data: [
          {
            id: 1,
            numeroRamal: "2001",
            usuarioAssociado: "João Silva",
            setor: "Comercial",
            modeloAparelho: "Cisco IP Phone 7940",
            status: "operacional",
            localizacao: "Sala 101 - Comercial",
            dataInstalacao: "2023-06-15",
            observacoes: "Aparelho principal do gerente comercial",
            defeitos: [
              {
                id: 1,
                ramalId: 1,
                tipoProblema: "Problemas de áudio",
                prioridade: "alta",
                descricaoProblema: "Não estava saindo áudio no fone durante as ligações",
                dataRegistro: "2024-01-05T10:30:00",
                statusDefeito: "resolvido",
                dataResolucao: "2024-01-05T14:20:00",
                tecnicoResponsavel: "Carlos TI",
                chamadoVinculado: 45
              }
            ],
            registrosUso: [
              {
                id: 1,
                ramalId: 1,
                data: "2024-01-15",
                tipoUso: "saida",
                duracao: 180,
                numeroDestino: "(11) 98765-4321",
                custo: 0.50
              },
              {
                id: 2,
                ramalId: 1,
                data: "2024-01-15",
                tipoUso: "entrada",
                duracao: 420,
                custo: 0
              }
            ]
          },
          {
            id: 2,
            numeroRamal: "2002",
            usuarioAssociado: "Maria Santos",
            setor: "RH",
            modeloAparelho: "Cisco IP Phone 7940",
            status: "operacional",
            localizacao: "Sala 205 - RH",
            dataInstalacao: "2023-06-15",
            defeitos: [],
            registrosUso: [
              {
                id: 3,
                ramalId: 2,
                data: "2024-01-14",
                tipoUso: "saida",
                duracao: 300,
                numeroDestino: "(11) 3456-7890",
                custo: 0.75
              }
            ]
          },
          {
            id: 3,
            numeroRamal: "2010",
            setor: "Recepção",
            modeloAparelho: "Cisco IP Phone 7962",
            status: "com_defeito",
            localizacao: "Recepção Principal",
            dataInstalacao: "2023-05-20",
            observacoes: "Display com defeito, necessita troca",
            defeitos: [
              {
                id: 2,
                ramalId: 3,
                tipoProblema: "Display com defeito",
                prioridade: "media",
                descricaoProblema: "Display não está mostrando informações das ligações",
                observacoes: "Necessário solicitar peça de reposição ao fornecedor",
                dataRegistro: "2024-01-14T09:00:00",
                statusDefeito: "em_reparo",
                tecnicoResponsavel: "Ana TI"
              },
              {
                id: 3,
                ramalId: 3,
                tipoProblema: "Botões não funcionam",
                prioridade: "baixa",
                descricaoProblema: "Botões de volume estavam travados",
                dataRegistro: "2023-12-10T15:30:00",
                statusDefeito: "resolvido",
                dataResolucao: "2023-12-11T10:00:00",
                tecnicoResponsavel: "Carlos TI",
                chamadoVinculado: 38
              }
            ],
            registrosUso: [
              {
                id: 4,
                ramalId: 3,
                data: "2024-01-13",
                tipoUso: "entrada",
                duracao: 120,
                custo: 0
              }
            ]
          },
          {
            id: 4,
            numeroRamal: "2015",
            usuarioAssociado: "Pedro Oliveira",
            setor: "TI",
            modeloAparelho: "Cisco IP Phone 7962",
            status: "operacional",
            localizacao: "Sala 301 - TI",
            dataInstalacao: "2023-07-10",
            defeitos: [],
            registrosUso: []
          },
          {
            id: 5,
            numeroRamal: "2020",
            setor: "Almoxarifado",
            modeloAparelho: "Cisco IP Phone 7940",
            status: "em_manutencao",
            localizacao: "Almoxarifado - Térreo",
            dataInstalacao: "2023-04-20",
            observacoes: "Em manutenção preventiva",
            defeitos: [
              {
                id: 4,
                ramalId: 5,
                tipoProblema: "Aparelho não liga",
                prioridade: "alta",
                descricaoProblema: "Aparelho não está ligando após queda de energia",
                dataRegistro: "2024-01-10T08:00:00",
                statusDefeito: "em_analise",
                tecnicoResponsavel: "Ana TI"
              }
            ],
            registrosUso: []
          }
        ]
      }
    }
  },
  interfaceamento: {
    name: "Interfaceamento",
    icon: ArrowLeftRight,
    subModules: {
      solicitacoes: {
        name: "Solicitações",
        data: [
          {
            id: 1,
            clienteNome: "Empresa ABC Ltda",
            oportunidadeId: "OPT-2024-001",
            descricaoNecessidade: "Integração com sistema Aqure para troca de dados de produtos e estoque",
            sistemaCliente: "Aqure",
            prazoDesejado: "2024-02-15",
            status: "em_desenvolvimento",
            responsavelExecucao: "fornecedor_externo",
            nomeFornecedor: "TechSoft Soluções",
            solicitante: "João Silva",
            departamentoSolicitante: "Comercial",
            dataSolicitacao: "2024-01-10T10:30:00",
            dataUltimaAtualizacao: "2024-01-14T16:20:00",
            notasTecnicas: "Desenvolvendo módulo de sincronização de estoque",
            anexos: ["especificacao-tecnica-v1.pdf", "layout-dados-aqure.xlsx"],
            histomicoStatus: [
              {
                status: "aguardando_aprovacao",
                data: "2024-01-10T10:30:00",
                responsavel: "João Silva"
              },
              {
                status: "aprovado",
                data: "2024-01-10T14:15:00",
                responsavel: "Gerente Comercial"
              },
              {
                status: "em_analise",
                data: "2024-01-11T09:00:00",
                responsavel: "Equipe TI"
              },
              {
                status: "em_desenvolvimento",
                data: "2024-01-12T08:30:00",
                responsavel: "TechSoft Soluções"
              }
            ]
          },
          {
            id: 2,
            clienteNome: "XYZ Distribuidora",
            oportunidadeId: "OPT-2024-002",
            descricaoNecessidade: "API para consulta de preços em tempo real",
            sistemaCliente: "ERP Customizado",
            prazoDesejado: "2024-01-30",
            status: "em_analise",
            responsavelExecucao: "ti_interno",
            solicitante: "Maria Santos",
            departamentoSolicitante: "Comercial",
            dataSolicitacao: "2024-01-12T15:45:00",
            dataUltimaAtualizacao: "2024-01-12T15:45:00",
            anexos: ["requisitos-api-precos.pdf"],
            histomicoStatus: [
              {
                status: "aguardando_aprovacao",
                data: "2024-01-12T15:45:00",
                responsavel: "Maria Santos"
              },
              {
                status: "aprovado",
                data: "2024-01-13T08:00:00",
                responsavel: "Gerente Comercial"
              },
              {
                status: "em_analise",
                data: "2024-01-13T09:30:00",
                responsavel: "Equipe TI"
              }
            ]
          }
        ]
      }
    }
  }
};