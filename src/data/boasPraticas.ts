import { CertificadoBoasPraticas } from '@/types/boasPraticas';

export const mockCertificados: CertificadoBoasPraticas[] = [
  {
    id: '1',
    fornecedorId: 'forn-001',
    nomeFornecedor: 'Fornecedor Alpha Medical',
    nomeEmpresa: 'BioDina Equipamentos',
    nomeArquivoPrincipal: 'Documentação Certificado BPF - Alpha Medical 2024',
    documentos: [
      {
        id: 1,
        subtitulo: 'Manual de Qualidade',
        nomeArquivo: 'manual_qualidade_alpha.pdf',
        dataCriacao: '2024-01-15'
      },
      {
        id: 2,
        subtitulo: 'Procedimentos Operacionais Padrão',
        nomeArquivo: 'pops_alpha.pdf',
        dataCriacao: '2024-01-15'
      }
    ],
    nomeProtocolo: 'protocolo_peticionamento_12345.pdf',
    numeroProcessoAnvisa: '25351.123456/2024-01',
    transacao: 'TRN-2024-0001',
    expediente: 'EXP-2024-0123',
    assunto: 'Certificação de Boas Práticas de Fabricação - Equipamentos Médicos',
    dataEnvio: '2024-01-20',
    dataPublicacaoDOU: '2024-03-15',
    numeroPublicacaoDOU: '52-2024',
    observacaoGeral: 'Processo regular, sem pendências documentais.',
    nomePublicacaoDOU: 'publicacao_dou_52_2024.pdf',
    nomeCertificado: 'certificado_bpf_alpha_2024.pdf',
    validade: '2026-03-15',
    status: 'vigente',
    dataCriacao: new Date('2024-01-15'),
    dataAtualizacao: new Date('2024-03-15')
  },
  {
    id: '2',
    fornecedorId: 'forn-002',
    nomeFornecedor: 'Beta Healthcare Solutions',
    nomeEmpresa: 'BioDina Equipamentos',
    nomeArquivoPrincipal: 'Documentação Certificado BPF - Beta Healthcare 2024',
    documentos: [
      {
        id: 1,
        subtitulo: 'Relatório de Inspeção Prévia',
        nomeArquivo: 'relatorio_inspecao_beta.pdf',
        dataCriacao: '2024-02-10'
      }
    ],
    nomeProtocolo: 'protocolo_peticionamento_67890.pdf',
    numeroProcessoAnvisa: '25351.789012/2024-02',
    transacao: 'TRN-2024-0002',
    expediente: 'EXP-2024-0234',
    assunto: 'Renovação de Certificado de Boas Práticas',
    dataEnvio: '2024-02-15',
    dataPublicacaoDOU: '2024-08-10',
    numeroPublicacaoDOU: '154-2024',
    observacaoGeral: 'Renovação aprovada com ressalvas menores.',
    nomePublicacaoDOU: 'publicacao_dou_154_2024.pdf',
    nomeCertificado: 'certificado_bpf_beta_2024.pdf',
    validade: '2025-02-10',
    status: 'vigente',
    dataCriacao: new Date('2024-02-10'),
    dataAtualizacao: new Date('2024-08-10')
  },
  {
    id: '3',
    fornecedorId: 'forn-003',
    nomeFornecedor: 'Gamma Medical Devices',
    nomeEmpresa: 'BioDina Equipamentos',
    nomeArquivoPrincipal: 'Documentação Certificado BPF - Gamma Medical 2024',
    documentos: [],
    nomeProtocolo: 'protocolo_peticionamento_11223.pdf',
    numeroProcessoAnvisa: '25351.345678/2024-03',
    transacao: 'TRN-2024-0003',
    expediente: 'EXP-2024-0345',
    assunto: 'Certificação Inicial de Boas Práticas',
    dataEnvio: '2024-03-01',
    status: 'enviado',
    dataCriacao: new Date('2024-03-01')
  }
];
