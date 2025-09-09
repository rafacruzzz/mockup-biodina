import { 
  Monitor, 
  HardDrive, 
  Network, 
  FileText, 
  Shield, 
  CheckSquare,
  Activity,
  Database,
  Key,
  BarChart3
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
            localizacao: "Sala 101",
            dataAquisicao: "2024-01-10",
            dataGarantia: "2024-12-15",
            valorAquisicao: 2500.00
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
            localizacao: "Sala 205",
            dataAquisicao: "2023-06-15",
            dataGarantia: "2024-12-20",
            valorAquisicao: 1200.00
          }
        ]
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
          }
        ]
      }
    }
  },
  seguranca: {
    name: "Segurança",
    icon: Shield,
    subModules: {
      incidentes: {
        name: "Registro de Incidentes",
        data: [
          {
            id: 1,
            dataHora: "2024-01-15T14:30:00",
            tipo: "acesso_suspeito",
            detalhes: "Login fora do horário - usuário joão.silva tentando acesso às 02:30",
            status: "novo",
            criticidade: "media"
          },
          {
            id: 2,
            dataHora: "2024-01-15T13:45:00",
            tipo: "firewall",
            detalhes: "Tentativa de acesso bloqueada do IP 203.45.67.89",
            status: "investigando",
            criticidade: "alta",
            responsavel: "Carlos TI"
          },
          {
            id: 3,
            dataHora: "2024-01-15T12:15:00",
            tipo: "malware",
            detalhes: "Arquivo suspeito detectado na estação NB-045 - arquivo: documento.exe",
            status: "resolvido",
            criticidade: "alta",
            responsavel: "Ana Security",
            acoes: "Arquivo removido e sistema escaneado"
          }
        ]
      },
      auditoria: {
        name: "Auditoria de Acessos",
        data: [
          {
            id: 1,
            usuario: "joao.silva",
            sistema: "ERP Biodina",
            dataHora: "2024-01-15T08:30:00",
            ip: "192.168.1.100",
            status: "sucesso"
          },
          {
            id: 2,
            usuario: "maria.santos",
            sistema: "Sistema RH",
            dataHora: "2024-01-15T08:25:00",
            ip: "192.168.1.105",
            status: "sucesso"
          },
          {
            id: 3,
            usuario: "carlos.admin",
            sistema: "Servidor Principal",
            dataHora: "2024-01-15T08:00:00",
            ip: "192.168.1.200",
            status: "falha",
            detalhes: "Senha incorreta - 3 tentativas"
          }
        ]
      },
      antivirus: {
        name: "Status do Antivírus",
        data: [
          {
            id: 1,
            estacaoTrabalho: "NB-001",
            usuario: "João Silva",
            status: "atualizado",
            versaoAntivirus: "2024.1.15",
            ultimaVerificacao: "2024-01-15T06:00:00",
            ameacasDetectadas: 0
          },
          {
            id: 2,
            estacaoTrabalho: "DT-005",
            usuario: "Maria Santos",
            status: "desatualizado",
            versaoAntivirus: "2024.1.10",
            ultimaVerificacao: "2024-01-12T18:30:00",
            ameacasDetectadas: 1,
            observacoes: "Definições desatualizadas há 3 dias"
          }
        ]
      }
    }
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
      }
    }
  },
  monitoramento: {
    name: "Monitoramento",
    icon: Activity,
    subModules: {
      rede: {
        name: "Monitoramento de Rede",
        data: []
      }
    }
  },
  backup: {
    name: "Backup e Recuperação",
    icon: Database,
    subModules: {
      politicas: {
        name: "Políticas de Backup",
        data: []
      }
    }
  },
  licencas: {
    name: "Licenças de Software",
    icon: Key,
    subModules: {
      softwares: {
        name: "Controle de Licenças",
        data: []
      }
    }
  }
};