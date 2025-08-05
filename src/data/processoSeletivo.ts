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
    status: "contratado",
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
    status: "aprovado",
    fonte: "indicacao",
    observacoes: "Conhecimento sólido em legislação fiscal"
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
  },
  {
    id: "5",
    nome: "Carolina Martins Rocha",
    email: "carolina.martins@email.com",
    telefone: "(11) 94321-0987",
    cpf: "321.654.987-00",
    departamento: "Marketing",
    cargoDesejado: "Analista de Marketing Digital",
    experiencia: "3 anos",
    escolaridade: "Superior Completo - Marketing",
    habilidades: ["Google Ads", "Facebook Ads", "Analytics", "Photoshop"],
    dataEnvio: "2024-02-05",
    status: "aprovado",
    fonte: "site",
    observacoes: "Excelente conhecimento em marketing digital"
  },
  {
    id: "6",
    nome: "Pedro Santos Silva",
    email: "pedro.santos@email.com",
    telefone: "(11) 93210-8765",
    cpf: "654.321.098-00",
    departamento: "Tecnologia",
    cargoDesejado: "Desenvolvedor Backend",
    experiencia: "4 anos",
    escolaridade: "Superior Completo - Engenharia de Software",
    habilidades: ["Java", "Spring Boot", "MySQL", "AWS"],
    dataEnvio: "2024-02-10",
    status: "aprovado",
    fonte: "linkedin",
    observacoes: "Forte experiência em arquitetura de sistemas"
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
        etapaAtual: "e4",
        status: "aprovado",
        feedback: [
          {
            etapaId: "e1",
            avaliador: "Ana Paula Ferreira",
            comentario: "Perfil adequado, boa experiência com React",
            dataAvaliacao: "2024-01-16",
            aprovado: true
          },
          {
            etapaId: "e2",
            avaliador: "João Silva Santos",
            comentario: "Excelente conhecimento técnico, demonstrou domínio das tecnologias",
            dataAvaliacao: "2024-01-18",
            aprovado: true,
            nota: 9
          },
          {
            etapaId: "e3",
            avaliador: "João Silva Santos",
            comentario: "Teste prático muito bem executado, código limpo e organizado",
            dataAvaliacao: "2024-01-20",
            aprovado: true,
            nota: 9.5
          },
          {
            etapaId: "e4",
            avaliador: "Maria Oliveira Costa",
            comentario: "Perfil comportamental excelente, fit cultural perfeito",
            dataAvaliacao: "2024-01-22",
            aprovado: true,
            nota: 9
          }
        ],
        dataInicio: "2024-01-15",
        dataUltimaAtualizacao: "2024-01-22"
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
        responsavel: "Ana Paula Ferreira",
        obrigatoria: true
      },
      {
        id: "e6",
        nome: "Entrevista Inicial",
        descricao: "Primeira entrevista com RH",
        ordem: 2,
        tipo: "entrevista",
        responsavel: "Ana Paula Ferreira",
        duracao: "30 minutos",
        obrigatoria: true
      },
      {
        id: "e7",
        nome: "Dinâmica de Grupo",
        descricao: "Dinâmica para avaliar perfil comercial",
        ordem: 3,
        tipo: "dinamica",
        responsavel: "Carlos Comercial",
        duracao: "2 horas",
        obrigatoria: true
      },
      {
        id: "e8",
        nome: "Entrevista Final",
        descricao: "Entrevista com gerente comercial",
        ordem: 4,
        tipo: "entrevista",
        responsavel: "Carlos Comercial",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ],
    candidatos: [
      {
        id: "c2",
        curriculoId: "2",
        processoSeletivoId: "2",
        etapaAtual: "e8",
        status: "aprovado",
        feedback: [
          {
            etapaId: "e5",
            avaliador: "Ana Paula Ferreira",
            comentario: "Experiência comercial sólida, histórico de vendas excelente",
            dataAvaliacao: "2024-01-21",
            aprovado: true
          },
          {
            etapaId: "e6",
            avaliador: "Ana Paula Ferreira",
            comentario: "Boa apresentação pessoal, comunicação clara",
            dataAvaliacao: "2024-01-23",
            aprovado: true,
            nota: 8
          },
          {
            etapaId: "e7",
            avaliador: "Carlos Comercial",
            comentario: "Destacou-se na dinâmica, perfil comercial nato",
            dataAvaliacao: "2024-01-25",
            aprovado: true,
            nota: 9
          },
          {
            etapaId: "e8",
            avaliador: "Carlos Comercial",
            comentario: "Aprovado! Demonstrou conhecimento do mercado e técnicas de venda",
            dataAvaliacao: "2024-01-27",
            aprovado: true,
            nota: 8.5
          }
        ],
        dataInicio: "2024-01-20",
        dataUltimaAtualizacao: "2024-01-27"
      }
    ],
    status: "ativo",
    responsavel: "Ana Paula Ferreira",
    dataInicio: "2024-01-20"
  },
  {
    id: "3",
    titulo: "Analista Contábil Júnior",
    departamento: "Financeiro",
    cargo: "Analista Contábil",
    descricao: "Vaga para analista contábil com foco em conciliações e relatórios",
    vagas: 1,
    salario: "R$ 3.500,00 - R$ 5.000,00",
    etapas: [
      {
        id: "e9",
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos",
        ordem: 1,
        tipo: "triagem",
        responsavel: "Ana Paula Ferreira",
        obrigatoria: true
      },
      {
        id: "e10",
        nome: "Teste Técnico Contábil",
        descricao: "Avaliação de conhecimentos contábeis",
        ordem: 2,
        tipo: "teste",
        responsavel: "Marina Financeiro",
        duracao: "2 horas",
        obrigatoria: true
      },
      {
        id: "e11",
        nome: "Entrevista Final",
        descricao: "Entrevista com coordenador financeiro",
        ordem: 3,
        tipo: "entrevista",
        responsavel: "Marina Financeiro",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ],
    candidatos: [
      {
        id: "c3",
        curriculoId: "3",
        processoSeletivoId: "3",
        etapaAtual: "e11",
        status: "aprovado",
        feedback: [
          {
            etapaId: "e9",
            avaliador: "Ana Paula Ferreira",
            comentario: "Formação adequada, experiência relevante",
            dataAvaliacao: "2024-01-26",
            aprovado: true
          },
          {
            etapaId: "e10",
            avaliador: "Marina Financeiro",
            comentario: "Conhecimento técnico sólido, resolveu bem os casos práticos",
            dataAvaliacao: "2024-01-28",
            aprovado: true,
            nota: 8.5
          },
          {
            etapaId: "e11",
            avaliador: "Marina Financeiro",
            comentario: "Aprovada! Demonstrou organização e conhecimento da legislação",
            dataAvaliacao: "2024-01-30",
            aprovado: true,
            nota: 8
          }
        ],
        dataInicio: "2024-01-25",
        dataUltimaAtualizacao: "2024-01-30"
      }
    ],
    status: "ativo",
    responsavel: "Ana Paula Ferreira",
    dataInicio: "2024-01-25"
  },
  {
    id: "4",
    titulo: "Analista de Marketing Digital",
    departamento: "Marketing",
    cargo: "Analista de Marketing Digital",
    descricao: "Vaga para analista de marketing digital com foco em campanhas online",
    vagas: 1,
    salario: "R$ 4.000,00 - R$ 6.000,00",
    etapas: [
      {
        id: "e12",
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos",
        ordem: 1,
        tipo: "triagem",
        responsavel: "Ana Paula Ferreira",
        obrigatoria: true
      },
      {
        id: "e13",
        nome: "Apresentação de Portfolio",
        descricao: "Apresentação de cases e projetos anteriores",
        ordem: 2,
        tipo: "teste",
        responsavel: "Laura Marketing",
        duracao: "1 hora",
        obrigatoria: true
      },
      {
        id: "e14",
        nome: "Entrevista Final",
        descricao: "Entrevista com coordenador de marketing",
        ordem: 3,
        tipo: "entrevista",
        responsavel: "Laura Marketing",
        duracao: "30 minutos",
        obrigatoria: true
      }
    ],
    candidatos: [
      {
        id: "c4",
        curriculoId: "5",
        processoSeletivoId: "4",
        etapaAtual: "e14",
        status: "aprovado",
        feedback: [
          {
            etapaId: "e12",
            avaliador: "Ana Paula Ferreira",
            comentario: "Experiência relevante em marketing digital",
            dataAvaliacao: "2024-02-06",
            aprovado: true
          },
          {
            etapaId: "e13",
            avaliador: "Laura Marketing",
            comentario: "Portfolio impressionante, cases muito bem apresentados",
            dataAvaliacao: "2024-02-08",
            aprovado: true,
            nota: 9
          },
          {
            etapaId: "e14",
            avaliador: "Laura Marketing",
            comentario: "Aprovada! Conhecimento atualizado das ferramentas e tendências",
            dataAvaliacao: "2024-02-10",
            aprovado: true,
            nota: 8.5
          }
        ],
        dataInicio: "2024-02-05",
        dataUltimaAtualizacao: "2024-02-10"
      }
    ],
    status: "ativo",
    responsavel: "Ana Paula Ferreira",
    dataInicio: "2024-02-05"
  },
  {
    id: "5",
    titulo: "Desenvolvedor Backend Sênior",
    departamento: "Tecnologia",
    cargo: "Desenvolvedor Backend",
    descricao: "Vaga para desenvolvedor backend com experiência em Java e Spring",
    vagas: 1,
    salario: "R$ 9.000,00 - R$ 13.000,00",
    etapas: [
      {
        id: "e15",
        nome: "Triagem de Currículos",
        descricao: "Análise inicial dos currículos",
        ordem: 1,
        tipo: "triagem",
        responsavel: "Ana Paula Ferreira",
        obrigatoria: true
      },
      {
        id: "e16",
        nome: "Entrevista Técnica",
        descricao: "Entrevista técnica com arquiteto de software",
        ordem: 2,
        tipo: "entrevista",
        responsavel: "Roberto Tech",
        duracao: "1.5 horas",
        obrigatoria: true
      },
      {
        id: "e17",
        nome: "Desafio de Código",
        descricao: "Resolução de problema de arquitetura",
        ordem: 3,
        tipo: "teste",
        responsavel: "Roberto Tech",
        duracao: "4 horas",
        obrigatoria: true
      },
      {
        id: "e18",
        nome: "Entrevista Final",
        descricao: "Entrevista com CTO",
        ordem: 4,
        tipo: "entrevista",
        responsavel: "Roberto Tech",
        duracao: "45 minutos",
        obrigatoria: true
      }
    ],
    candidatos: [
      {
        id: "c5",
        curriculoId: "6",
        processoSeletivoId: "5",
        etapaAtual: "e18",
        status: "aprovado",
        feedback: [
          {
            etapaId: "e15",
            avaliador: "Ana Paula Ferreira",
            comentario: "Perfil sênior, experiência sólida em backend",
            dataAvaliacao: "2024-02-11",
            aprovado: true
          },
          {
            etapaId: "e16",
            avaliador: "Roberto Tech",
            comentario: "Excelente conhecimento técnico e experiência em arquitetura",
            dataAvaliacao: "2024-02-13",
            aprovado: true,
            nota: 9
          },
          {
            etapaId: "e17",
            avaliador: "Roberto Tech",
            comentario: "Solução muito bem elaborada, código limpo e eficiente",
            dataAvaliacao: "2024-02-15",
            aprovado: true,
            nota: 9.5
          },
          {
            etapaId: "e18",
            avaliador: "Roberto Tech",
            comentario: "Aprovado! Perfil ideal para liderar projetos complexos",
            dataAvaliacao: "2024-02-17",
            aprovado: true,
            nota: 9
          }
        ],
        dataInicio: "2024-02-10",
        dataUltimaAtualizacao: "2024-02-17"
      }
    ],
    status: "ativo",
    responsavel: "Ana Paula Ferreira",
    dataInicio: "2024-02-10"
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
