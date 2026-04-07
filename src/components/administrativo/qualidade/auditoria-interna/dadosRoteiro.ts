export interface ItemRoteiro {
  numero: number;
  quesito: string;
  descricao: string;
}

export interface SubSecao {
  titulo: string;
  itens: ItemRoteiro[];
}

export interface SecaoRoteiro {
  id: string;
  titulo: string;
  subSecoes?: SubSecao[];
  itens?: ItemRoteiro[];
}

export const secoesRoteiro: SecaoRoteiro[] = [
  {
    id: 'A',
    titulo: 'Requisitos Gerais / Administrativos',
    itens: [
      { numero: 1, quesito: 'BPF 1.1', descricao: 'A empresa possui autorização de funcionamento atualizada para as atividades a que se propõe?' },
      { numero: 2, quesito: 'BPF 1.2', descricao: 'A empresa possui Certificado de Boas Práticas de Fabricação, quando aplicável?' },
      { numero: 3, quesito: 'BPF 1.3', descricao: 'A empresa possui os registros/cadastros dos produtos que fabrica?' },
      { numero: 4, quesito: 'BPF 1.4', descricao: 'A empresa possui responsável técnico legalmente habilitado?' },
      { numero: 5, quesito: 'BPF 1.5', descricao: 'A empresa possui organograma atualizado?' },
      { numero: 6, quesito: 'BPF 1.6', descricao: 'Existem descrições de cargos definidas por escrito?' },
      { numero: 7, quesito: 'BPF 1.7', descricao: 'A empresa possui Manual da Qualidade?' },
      { numero: 8, quesito: 'BPF 1.8', descricao: 'O Manual da Qualidade contempla política da qualidade, objetivos e compromisso com a qualidade?' },
      { numero: 9, quesito: 'BPF 1.9', descricao: 'Existe planejamento de auditorias internas com registros de execução?' },
      { numero: 10, quesito: 'BPF 1.10', descricao: 'Existem registros de análise crítica do sistema da qualidade pela administração?' },
      { numero: 11, quesito: 'BPF 1.11', descricao: 'Existe programa de treinamento para funcionários em BPF?' },
      { numero: 12, quesito: 'BPF 1.12', descricao: 'Os treinamentos são registrados e documentados?' },
      { numero: 13, quesito: 'BPF 1.13', descricao: 'A empresa possui procedimentos para controle de condições ambientais (quando aplicável)?' },
      { numero: 14, quesito: 'BPF 1.14', descricao: 'A empresa possui procedimentos para saúde, limpeza e vestimenta dos funcionários?' },
    ],
  },
  {
    id: 'B',
    titulo: 'Controle de Projetos',
    subSecoes: [
      {
        titulo: 'B.1 - Procedimentos Gerais de Controle de Projetos',
        itens: [
          { numero: 15, quesito: 'BPF 2.1', descricao: 'Existem procedimentos escritos para controle e verificação de projetos de produtos?' },
          { numero: 16, quesito: 'BPF 2.2', descricao: 'Os planos de projeto identificam responsabilidades de desenvolvimento e verificação?' },
          { numero: 17, quesito: 'BPF 2.3', descricao: 'As interfaces organizacionais e técnicas estão identificadas e documentadas?' },
          { numero: 18, quesito: 'BPF 2.4', descricao: 'Os dados de entrada do projeto estão documentados e atendem ao uso pretendido?' },
        ],
      },
      {
        titulo: 'B.2 - Verificação e Validação de Projetos',
        itens: [
          { numero: 19, quesito: 'BPF 2.5', descricao: 'Os dados de saída do projeto estão documentados e atendem aos dados de entrada?' },
          { numero: 20, quesito: 'BPF 2.6', descricao: 'A verificação de projeto é realizada e registrada?' },
          { numero: 21, quesito: 'BPF 2.7', descricao: 'A validação de projeto é realizada em condições definidas de operação?' },
          { numero: 22, quesito: 'BPF 2.8', descricao: 'As alterações de projeto são documentadas, verificadas, validadas e aprovadas antes da implementação?' },
          { numero: 23, quesito: 'BPF 2.9', descricao: 'Os registros do histórico de projeto são mantidos e acessíveis?' },
          { numero: 24, quesito: 'BPF 2.10', descricao: 'As análises de risco do projeto são realizadas e documentadas?' },
        ],
      },
      {
        titulo: 'B.3 - Transferência de Projeto para Produção',
        itens: [
          { numero: 25, quesito: 'BPF 2.11', descricao: 'Existem procedimentos para transferência de projeto para produção?' },
          { numero: 26, quesito: 'BPF 2.12', descricao: 'A transferência assegura que o projeto aprovado é corretamente traduzido em especificações de produção?' },
          { numero: 27, quesito: 'BPF 2.13', descricao: 'Os critérios de aceitação estão definidos para a transferência?' },
          { numero: 28, quesito: 'BPF 2.14', descricao: 'As alterações pós-transferência são controladas e documentadas?' },
          { numero: 29, quesito: 'BPF 2.15', descricao: 'Os métodos de fabricação e procedimentos de produção estão validados?' },
          { numero: 30, quesito: 'BPF 2.16', descricao: 'Os registros de validação dos processos de fabricação estão disponíveis?' },
          { numero: 31, quesito: 'BPF 2.17', descricao: 'O pessoal envolvido na produção é treinado nos novos procedimentos transferidos?' },
          { numero: 32, quesito: 'BPF 2.18', descricao: 'Os equipamentos utilizados na produção são qualificados para os novos processos?' },
          { numero: 33, quesito: 'BPF 2.19', descricao: 'Os materiais e componentes são especificados de acordo com o projeto aprovado?' },
          { numero: 34, quesito: 'BPF 2.20', descricao: 'Existem procedimentos de inspeção e teste específicos para o projeto transferido?' },
          { numero: 35, quesito: 'BPF 2.21', descricao: 'Os critérios de aceitação de inspeção e teste refletem os requisitos do projeto?' },
          { numero: 36, quesito: 'BPF 2.22', descricao: 'Há rastreabilidade entre as especificações de projeto e os procedimentos de produção?' },
        ],
      },
    ],
  },
  {
    id: 'C',
    titulo: 'Controle de Projetos',
    itens: [
      { numero: 37, quesito: 'BPF 3.1', descricao: 'Existem procedimentos para controle de documentos e dados do sistema da qualidade?' },
      { numero: 38, quesito: 'BPF 3.2', descricao: 'Os documentos são analisados e aprovados por pessoal autorizado antes da emissão?' },
      { numero: 39, quesito: 'BPF 3.3', descricao: 'Existe uma lista mestra ou procedimento equivalente para identificação da revisão vigente?' },
      { numero: 40, quesito: 'BPF 3.4', descricao: 'Os documentos obsoletos são prontamente removidos dos pontos de emissão e uso?' },
      { numero: 41, quesito: 'BPF 3.5', descricao: 'As alterações de documentos são analisadas e aprovadas pelas mesmas funções que realizaram a análise original?' },
      { numero: 42, quesito: 'BPF 3.6', descricao: 'A natureza das alterações é identificada no documento ou em anexos apropriados?' },
      { numero: 43, quesito: 'BPF 3.7', descricao: 'Os documentos estão disponíveis nos locais onde são necessários?' },
      { numero: 44, quesito: 'BPF 3.8', descricao: 'Os documentos são legíveis, datados e facilmente identificáveis?' },
      { numero: 45, quesito: 'BPF 3.9', descricao: 'Os dados são mantidos em backup e protegidos contra danos ou perdas?' },
      { numero: 46, quesito: 'BPF 3.10', descricao: 'Os registros de controle de documentos são mantidos e acessíveis?' },
    ],
  },
  {
    id: 'D',
    titulo: 'Controle de Documentos e Registros',
    itens: [
      { numero: 47, quesito: 'BPF 4.1', descricao: 'Existem procedimentos escritos para identificação, coleta, indexação e arquivamento de registros da qualidade?' },
      { numero: 48, quesito: 'BPF 4.2', descricao: 'Os registros da qualidade são legíveis e armazenados de forma a minimizar danos e deterioração?' },
      { numero: 49, quesito: 'BPF 4.3', descricao: 'Os prazos de retenção dos registros estão estabelecidos e documentados?' },
      { numero: 50, quesito: 'BPF 4.4', descricao: 'Os registros estão disponíveis para análise pelo período de retenção estabelecido?' },
      { numero: 51, quesito: 'BPF 4.5', descricao: 'Os registros da qualidade são protegidos contra acesso não autorizado?' },
    ],
  },
  {
    id: 'E',
    titulo: 'Controle de Compras',
    itens: [
      { numero: 52, quesito: 'BPF 5.1', descricao: 'Existem procedimentos escritos para assegurar que os produtos comprados estão em conformidade com os requisitos especificados?' },
      { numero: 53, quesito: 'BPF 5.2', descricao: 'Os fornecedores são avaliados e selecionados com base na sua capacidade de atender aos requisitos?' },
      { numero: 54, quesito: 'BPF 5.3', descricao: 'Existem critérios definidos para qualificação de fornecedores?' },
      { numero: 55, quesito: 'BPF 5.4', descricao: 'Os documentos de compra descrevem claramente o produto a ser comprado, incluindo especificações?' },
      { numero: 56, quesito: 'BPF 5.5', descricao: 'Os documentos de compra são analisados e aprovados antes da emissão?' },
      { numero: 57, quesito: 'BPF 5.6', descricao: 'Existem registros de avaliação de fornecedores e são mantidos atualizados?' },
    ],
  },
  {
    id: 'F',
    titulo: 'Identificação e Rastreabilidade',
    itens: [
      { numero: 58, quesito: 'BPF 6.1', descricao: 'Existem procedimentos para identificação do produto durante todas as fases de produção e distribuição?' },
      { numero: 59, quesito: 'BPF 6.2', descricao: 'Existe rastreabilidade de cada unidade, lote ou partida de componentes e produto acabado?' },
      { numero: 60, quesito: 'BPF 6.3', descricao: 'Os registros de rastreabilidade são mantidos e acessíveis?' },
      { numero: 61, quesito: 'BPF 6.4', descricao: 'A identificação do produto é mantida durante todas as etapas de produção?' },
      { numero: 62, quesito: 'BPF 6.5', descricao: 'A rastreabilidade permite a identificação dos materiais e componentes utilizados em cada produto?' },
    ],
  },
  {
    id: 'G',
    titulo: 'Controle de Processo de Produção',
    subSecoes: [
      {
        titulo: 'G.1 - Procedimentos de Produção',
        itens: [
          { numero: 63, quesito: 'BPF 7.1', descricao: 'Os processos de produção são conduzidos de acordo com procedimentos documentados?' },
          { numero: 64, quesito: 'BPF 7.2', descricao: 'Os equipamentos de produção são mantidos e calibrados conforme procedimentos estabelecidos?' },
          { numero: 65, quesito: 'BPF 7.3', descricao: 'As condições ambientais de produção são monitoradas e controladas quando necessário?' },
          { numero: 66, quesito: 'BPF 7.4', descricao: 'Os processos especiais são validados e os registros de validação são mantidos?' },
          { numero: 67, quesito: 'BPF 7.5', descricao: 'O pessoal que executa processos especiais é qualificado?' },
        ],
      },
      {
        titulo: 'G.2 - Controle de Mudanças no Processo',
        itens: [
          { numero: 68, quesito: 'BPF 7.6', descricao: 'Existem procedimentos para controle de mudanças nos processos de produção?' },
          { numero: 69, quesito: 'BPF 7.7', descricao: 'As mudanças nos processos são documentadas e aprovadas antes da implementação?' },
          { numero: 70, quesito: 'BPF 7.8', descricao: 'O impacto das mudanças é avaliado e registrado?' },
          { numero: 71, quesito: 'BPF 7.9', descricao: 'Os processos revalidados após mudanças possuem registros de revalidação?' },
          { numero: 72, quesito: 'BPF 7.10', descricao: 'O pessoal afetado pelas mudanças é retreinado quando necessário?' },
        ],
      },
    ],
  },
  {
    id: 'H',
    titulo: 'Inspeção e Testes',
    subSecoes: [
      {
        titulo: 'H.1 - Inspeção de Recebimento',
        itens: [
          { numero: 73, quesito: 'BPF 8.1', descricao: 'Existem procedimentos para inspeção e teste de produtos recebidos?' },
          { numero: 74, quesito: 'BPF 8.2', descricao: 'Os critérios de aceitação para inspeção de recebimento estão definidos?' },
          { numero: 75, quesito: 'BPF 8.3', descricao: 'Os registros de inspeção de recebimento são mantidos?' },
        ],
      },
      {
        titulo: 'H.2 - Inspeção em Processo',
        itens: [
          { numero: 76, quesito: 'BPF 8.4', descricao: 'Existem procedimentos para inspeção e testes durante o processo de produção?' },
          { numero: 77, quesito: 'BPF 8.5', descricao: 'Os pontos de inspeção em processo estão identificados nos procedimentos de produção?' },
          { numero: 78, quesito: 'BPF 8.6', descricao: 'Os critérios de aceitação para inspeção em processo estão definidos?' },
        ],
      },
      {
        titulo: 'H.3 - Inspeção Final',
        itens: [
          { numero: 79, quesito: 'BPF 8.7', descricao: 'Existem procedimentos para inspeção e testes finais do produto acabado?' },
          { numero: 80, quesito: 'BPF 8.8', descricao: 'Os critérios de aceitação para inspeção final estão definidos?' },
          { numero: 81, quesito: 'BPF 8.9', descricao: 'Os registros de inspeção final demonstram que o produto atende aos critérios de aceitação?' },
          { numero: 82, quesito: 'BPF 8.10', descricao: 'A liberação do produto é realizada somente após conclusão satisfatória de todas as inspeções e testes?' },
        ],
      },
    ],
  },
  {
    id: 'I',
    titulo: 'Componentes e Produtos Não Conforme',
    itens: [
      { numero: 83, quesito: 'BPF 9.1', descricao: 'Existem procedimentos para controle de produto não conforme, incluindo identificação, documentação, avaliação, segregação e disposição?' },
      { numero: 84, quesito: 'BPF 9.2', descricao: 'Os produtos não conformes são identificados e segregados para evitar uso ou entrega não intencional?' },
      { numero: 85, quesito: 'BPF 9.3', descricao: 'A disposição de produtos não conformes é documentada e autorizada por pessoal designado?' },
      { numero: 86, quesito: 'BPF 9.4', descricao: 'Quando aplicável, os clientes ou órgãos reguladores são notificados sobre produtos não conformes?' },
    ],
  },
  {
    id: 'J',
    titulo: 'Ação Corretiva',
    subSecoes: [
      {
        titulo: 'J.1 - Análise de Causas',
        itens: [
          { numero: 87, quesito: 'BPF 10.1', descricao: 'Existem procedimentos para investigação de causas de não conformidades?' },
          { numero: 88, quesito: 'BPF 10.2', descricao: 'As investigações incluem análise de causa raiz?' },
        ],
      },
      {
        titulo: 'J.2 - Ações Corretivas',
        itens: [
          { numero: 89, quesito: 'BPF 10.3', descricao: 'As ações corretivas são implementadas para eliminar as causas de não conformidades?' },
          { numero: 90, quesito: 'BPF 10.4', descricao: 'A eficácia das ações corretivas é verificada e registrada?' },
        ],
      },
      {
        titulo: 'J.3 - Ações Preventivas',
        itens: [
          { numero: 91, quesito: 'BPF 10.5', descricao: 'Existem procedimentos para identificação e implementação de ações preventivas?' },
          { numero: 92, quesito: 'BPF 10.6', descricao: 'As ações preventivas são registradas e sua eficácia é verificada?' },
        ],
      },
    ],
  },
  {
    id: 'K',
    titulo: 'Manuseio, Armazenamento, Distribuição e Instalação',
    subSecoes: [
      {
        titulo: 'K.1 - Manuseio e Armazenamento',
        itens: [
          { numero: 93, quesito: 'BPF 11.1', descricao: 'Existem procedimentos para manuseio de produtos que previnam danos e deterioração?' },
          { numero: 94, quesito: 'BPF 11.2', descricao: 'As áreas de armazenamento são definidas e controladas para prevenir danos ao produto?' },
          { numero: 95, quesito: 'BPF 11.3', descricao: 'Existem procedimentos para controle de estoque e rotatividade de materiais?' },
          { numero: 96, quesito: 'BPF 11.4', descricao: 'As condições de armazenamento são monitoradas quando requerido?' },
        ],
      },
      {
        titulo: 'K.2 - Distribuição e Instalação',
        itens: [
          { numero: 97, quesito: 'BPF 11.5', descricao: 'Existem procedimentos para distribuição que assegurem a integridade do produto?' },
          { numero: 98, quesito: 'BPF 11.6', descricao: 'Os registros de distribuição permitem a rastreabilidade do produto?' },
          { numero: 99, quesito: 'BPF 11.7', descricao: 'Quando aplicável, existem procedimentos de instalação documentados e registros de verificação?' },
          { numero: 100, quesito: 'BPF 11.8', descricao: 'Os registros de instalação incluem resultados de inspeção e condições adversas encontradas?' },
          { numero: 101, quesito: 'BPF 11.9', descricao: 'O pessoal de instalação é treinado e qualificado?' },
        ],
      },
    ],
  },
  {
    id: 'L',
    titulo: 'Controle de Embalagem e Rotulagem',
    itens: [
      { numero: 102, quesito: 'BPF 12.1', descricao: 'Existem procedimentos para controle de embalagem e rotulagem que assegurem conformidade com requisitos regulatórios?' },
      { numero: 103, quesito: 'BPF 12.2', descricao: 'Os rótulos e embalagens são inspecionados antes do uso?' },
      { numero: 104, quesito: 'BPF 12.3', descricao: 'Os rótulos contêm todas as informações requeridas pela legislação aplicável?' },
      { numero: 105, quesito: 'BPF 12.4', descricao: 'Existem procedimentos para controle de estoque de rótulos e materiais de embalagem?' },
    ],
  },
  {
    id: 'M',
    titulo: 'Registros do Sistema da Qualidade',
    subSecoes: [
      {
        titulo: 'M.1 - Registro Mestre do Produto (RMP)',
        itens: [
          { numero: 106, quesito: 'BPF 13.1', descricao: 'Existe um Registro Mestre do Produto para cada tipo de produto fabricado?' },
          { numero: 107, quesito: 'BPF 13.2', descricao: 'O RMP inclui especificações do produto, processos de fabricação, métodos de inspeção e teste?' },
          { numero: 108, quesito: 'BPF 13.3', descricao: 'O RMP inclui especificações de embalagem e rotulagem?' },
        ],
      },
      {
        titulo: 'M.2 - Registro Histórico do Produto (RHP)',
        itens: [
          { numero: 109, quesito: 'BPF 13.4', descricao: 'Existe um Registro Histórico do Produto para cada lote ou unidade fabricada?' },
          { numero: 110, quesito: 'BPF 13.5', descricao: 'O RHP demonstra que o produto foi fabricado conforme o RMP?' },
        ],
      },
      {
        titulo: 'M.3 - Arquivo de Reclamações',
        itens: [
          { numero: 111, quesito: 'BPF 13.6', descricao: 'Existem procedimentos para recebimento, análise e investigação de reclamações?' },
          { numero: 112, quesito: 'BPF 13.7', descricao: 'As reclamações são registradas e mantidas em arquivo acessível?' },
          { numero: 113, quesito: 'BPF 13.8', descricao: 'As investigações de reclamações determinam se há necessidade de comunicação à autoridade sanitária?' },
          { numero: 114, quesito: 'BPF 13.9', descricao: 'As ações resultantes das investigações de reclamações são documentadas?' },
          { numero: 115, quesito: 'BPF 13.10', descricao: 'Existe análise estatística ou de tendência das reclamações para identificação de problemas recorrentes?' },
        ],
      },
    ],
  },
  {
    id: 'N',
    titulo: 'Assistência Técnica',
    itens: [
      { numero: 116, quesito: 'BPF 14.1', descricao: 'Existem procedimentos escritos para prestação de assistência técnica e manutenção de produtos?' },
      { numero: 117, quesito: 'BPF 14.2', descricao: 'Os registros de assistência técnica são mantidos e incluem informações sobre o produto, defeito e ações realizadas?' },
      { numero: 118, quesito: 'BPF 14.3', descricao: 'Os relatórios de assistência técnica são analisados como fonte de dados para ações corretivas e preventivas?' },
    ],
  },
  {
    id: 'O',
    titulo: 'Técnicas de Estatística',
    itens: [
      { numero: 119, quesito: 'BPF 15.1', descricao: 'Existem procedimentos para identificação de técnicas estatísticas necessárias para verificação da aceitabilidade da capacidade do processo e das características do produto?' },
      { numero: 120, quesito: 'BPF 15.2', descricao: 'As técnicas estatísticas utilizadas são adequadas para garantir que os produtos estejam em conformidade com as especificações?' },
      { numero: 121, quesito: 'BPF 15.3', descricao: 'Os resultados das análises estatísticas são documentados e utilizados para tomada de decisões?' },
    ],
  },
];
