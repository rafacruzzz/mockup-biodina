
import { Curriculo, ProcessoSeletivo, EtapaSelecao, CandidatoProcesso, Admissao, DocumentoAdmissao, TemplateEtapas } from "@/types/processoSeletivo";

export const curriculos: Curriculo[] = [
  {
    id: "1",
    nome: "Julia Silva Santos",
    email: "julia.silva@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    departamento: "Tecnologia",
    cargoDesejado: "Desenvolvedora Frontend",
    experiencia: "3 anos",
    escolaridade: "Superior Completo - Sistemas de Informação",
    habilidades: ["React", "TypeScript", "Node.js", "Git"],
    dataEnvio: "2024-01-15",
    status: "em-analise",
    fonte: "site",
    observacoes: "Ótimo portfólio, experiência com projetos similares"
  },
  {
    id: "2",
    nome: "Ricardo Oliveira Costa",
    email: "ricardo.oliveira@email.com",
    telefone: "(11) 97654-3210",
    cpf: "987.654.321-00",
    departamento: "Comercial",
    cargoDesejado: "Analista de Vendas",
    experiencia: "5 anos",
    escolaridade: "Superior Completo - Administração",
    habilidades: ["CRM", "Negociação", "Excel Avançado", "Prospecção"],
    dataEnvio: "2024-01-20",
    status: "aprovado",
    fonte: "linkedin",
    observacoes: "Excelente histórico de vendas, boa comunicação"
  },
  {
    id: "3",
    nome: "Fernanda Lima Pereira",
    email: "fernanda.lima@email.com",
    telefone: "(11) 96543-2109",
    cpf: "456.789.123-00",
    departamento: "Financeiro",
    cargoDesejado: "Analista Contábil",
    experiencia: "2 anos",
    escolaridade: "Superior Completo - Ciências Contábeis",
    habilidades: ["Contabilidade", "Excel", "SAP", "Legislação Fiscal"],
    dataEnvio: "2024-01-25",
    status: "novo",
    fonte: "indicacao"
  },
  {
    id: "4",
    nome: "Bruno Almeida Souza",
    email: "bruno.almeida@email.com",
    telefone: "(11) 95432-1098",
    cpf: "789.123.456-00",
    departamento: "Recursos Humanos",
    cargoDesejado: "Analista de RH",
    experiencia: "4 anos",
    escolaridade: "Superior Completo - Psicologia",
    habilidades: ["Recrutamento", "Treinamento", "Avaliação", "TOTVS"],
    dataEnvio: "2024-02-01",
    status: "em-analise",
    fonte: "site"
  }
];

export const processosSeletivos: ProcessoSeletivo[] = [
  {
    id: "1",
    titulo: "Desenvolvedor Frontend Sênior",
    departamento: "Tecnologia",
    cargo: "Desenvolvedor Frontend",
    descricao: "Vaga para desenvolvedor frontend com experiência em React e TypeScript",
    vagas: 2,
    salario: "R$ 8.000,00 - R$ 12.000,00",
    etapas: [
      {
        id: "e1",
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos recebidos",
        ordem: 1,
        tipo: "triagem",
        responsavel: "Ana Paula Ferreira",
        obrigatoria: true
      },
      {
        id: "e2",
        nome: "Entrevista Técnica",
        descricao: "Entrevista com foco em conhecimentos técnicos",
        ordem: 2,
        tipo: "entrevista",
        responsavel: "João Silva Santos",
        duracao: "1 hora",
        obrigatoria: true
      },
      {
        id: "e3",
        nome: "Teste Prático",
        descricao: "Desenvolvimento de uma pequena aplicação React",
        ordem: 3,
        tipo: "teste",
        responsavel: "João Silva Santos",
        duracao: "3 horas",
        obrigatoria: true
      },
      {
        id: "e4",
        nome: "Entrevista com Gestor",
        descricao: "Entrevista comportamental com o gestor da área",
        ordem: 4,
        tipo: "entrevista",
        responsavel: "Maria Oliveira Costa",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ],
    candidatos: [
      {
        id: "c1",
        curriculoId: "1",
        processoSeletivoId: "1",
        etapaAtual: "e2",
        status: "em-andamento",
        feedback: [
          {
            etapaId: "e1",
            avaliador: "Ana Paula Ferreira",
            comentario: "Perfil adequado, boa experiência com React",
            dataAvaliacao: "2024-01-16",
            aprovado: true
          }
        ],
        dataInicio: "2024-01-15",
        dataUltimaAtualizacao: "2024-01-16"
      }
    ],
    status: "ativo",
    responsavel: "Ana Paula Ferreira",
    dataInicio: "2024-01-10",
    linkPublico: "dev-frontend-2024"
  },
  {
    id: "2",
    titulo: "Analista de Vendas Pleno",
    departamento: "Comercial",
    cargo: "Analista de Vendas",
    descricao: "Vaga para analista de vendas com foco em B2B",
    vagas: 1,
    salario: "R$ 5.000,00 - R$ 7.000,00",
    etapas: [
      {
        id: "e5",
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos",
        ordem: 1,
        tipo: "triagem",
        obrigatoria: true
      },
      {
        id: "e6",
        nome: "Entrevista Inicial",
        descricao: "Primeira entrevista com RH",
        ordem: 2,
        tipo: "entrevista",
        duracao: "30 minutos",
        obrigatoria: true
      },
      {
        id: "e7",
        nome: "Dinâmica de Grupo",
        descricao: "Dinâmica para avaliar perfil comercial",
        ordem: 3,
        tipo: "dinamica",
        duracao: "2 horas",
        obrigatoria: true
      },
      {
        id: "e8",
        nome: "Entrevista Final",
        descricao: "Entrevista com gerente comercial",
        ordem: 4,
        tipo: "entrevista",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ],
    candidatos: [],
    status: "ativo",
    responsavel: "Ana Paula Ferreira",
    dataInicio: "2024-01-20"
  }
];

export const templatesEtapas: TemplateEtapas[] = [
  {
    id: "template-dev",
    nome: "Desenvolvedor",
    cargo: "Desenvolvedor",
    etapas: [
      {
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos",
        ordem: 1,
        tipo: "triagem",
        obrigatoria: true
      },
      {
        nome: "Entrevista Técnica",
        descricao: "Entrevista focada em conhecimentos técnicos",
        ordem: 2,
        tipo: "entrevista",
        duracao: "1 hora",
        obrigatoria: true
      },
      {
        nome: "Teste Prático",
        descricao: "Desenvolvimento de projeto prático",
        ordem: 3,
        tipo: "teste",
        duracao: "3 horas",
        obrigatoria: true
      },
      {
        nome: "Entrevista Comportamental",
        descricao: "Avaliação de soft skills e fit cultural",
        ordem: 4,
        tipo: "entrevista",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ]
  },
  {
    id: "template-comercial",
    nome: "Comercial",
    cargo: "Vendas",
    etapas: [
      {
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos",
        ordem: 1,
        tipo: "triagem",
        obrigatoria: true
      },
      {
        nome: "Entrevista Inicial",
        descricao: "Primeira entrevista com RH",
        ordem: 2,
        tipo: "entrevista",
        duracao: "30 minutos",
        obrigatoria: true
      },
      {
        nome: "Dinâmica Comercial",
        descricao: "Simulação de vendas e negociação",
        ordem: 3,
        tipo: "dinamica",
        duracao: "2 horas",
        obrigatoria: true
      },
      {
        nome: "Entrevista com Gestor",
        descricao: "Entrevista final com gerente comercial",
        ordem: 4,
        tipo: "entrevista",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ]
  }
];

export const checklistDocumentosAdmissao: Omit<DocumentoAdmissao, 'id' | 'recebido' | 'arquivo' | 'dataRecebimento'>[] = [
  {
    nome: "RG (cópia)",
    tipo: "identificacao",
    obrigatorio: true,
    observacoes: "Frente e verso legível"
  },
  {
    nome: "CPF (cópia)",
    tipo: "identificacao",
    obrigatorio: true,
    observacoes: "Documento atualizado"
  },
  {
    nome: "Comprovante de Residência",
    tipo: "residencia",
    obrigatorio: true,
    observacoes: "Até 3 meses de emissão"
  },
  {
    nome: "Carteira de Trabalho",
    tipo: "trabalhista",
    obrigatorio: true,
    observacoes: "Páginas principais digitalizadas"
  },
  {
    nome: "Certificado de Escolaridade",
    tipo: "educacao",
    obrigatorio: true,
    observacoes: "Maior grau de escolaridade"
  },
  {
    nome: "Comprovante de Conta Bancária",
    tipo: "bancario",
    obrigatorio: true,
    observacoes: "Com dados completos para depósito"
  },
  {
    nome: "Exames Admissionais",
    tipo: "medico",
    obrigatorio: true,
    observacoes: "ASO e exames complementares"
  },
  {
    nome: "Foto 3x4",
    tipo: "identificacao",
    obrigatorio: false,
    observacoes: "Foto recente"
  },
  {
    nome: "Certificado de Reservista",
    tipo: "militar",
    obrigatorio: false,
    observacoes: "Apenas para homens até 45 anos"
  },
  {
    nome: "Título de Eleitor",
    tipo: "civil",
    obrigatorio: false,
    observacoes: "Com comprovante de votação"
  }
];
