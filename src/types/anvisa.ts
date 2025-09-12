export interface RegistroAnvisa {
  id?: number;
  areaAnvisa: 'produtos_saude' | 'diagnostico_in_vitro';
  nomeProduto: string;
  referencia: string;
  processo: string;
  assunto: string;
  breveDescricao: string;
  transacao: string;
  expediente: string;
  dataEnvio: string;
  
  // Publicação DOU
  publicacaoData?: string;
  publicacaoNumero?: string;
  publicacaoObservacao?: string;
  
  // Disponibilização das instruções
  instrucaoAssunto?: string;
  instrucaoTransacao?: string;
  instrucaoExpediente?: string;
  instrucaoNomeArquivo?: string;
  instrucaoDataEnvio?: string;
  
  status: 'enviado' | 'publicado' | 'instruções_disponibilizadas';
  createdAt?: string;
  updatedAt?: string;
}

export const assuntosProdutosSaude = [
  { value: 'notificacao_equipamento', label: 'EQUIPAMENTO - Notificação de Dispositivo Médico' },
  { value: 'registro_material', label: 'MATERIAL - Registro de Material de Uso Médico' },
  { value: 'registro_equipamento', label: 'EQUIPAMENTO - Registro de Equipamentaria para Saúde' },
  { value: 'alteracao_dados', label: 'Alteração de Dados Cadastrais' },
  { value: 'renovacao_registro', label: 'Renovação de Registro' },
  { value: 'cancelamento_registro', label: 'Cancelamento de Registro' },
  { value: 'inclusao_modelo', label: 'Inclusão de Novo Modelo' },
  { value: 'exclusao_modelo', label: 'Exclusão de Modelo' },
  { value: 'alteracao_rotulagem', label: 'Alteração de Rotulagem' },
  { value: 'alteracao_manual', label: 'Alteração de Manual de Instruções' }
];

export const assuntosDiagnosticoInVitro = [
  { value: 'registro_diagnostico', label: 'Registro de Produto para Diagnóstico In Vitro' },
  { value: 'notificacao_diagnostico', label: 'Notificação de Produto para Diagnóstico In Vitro' },
  { value: 'alteracao_dados_diagnostico', label: 'Alteração de Dados Cadastrais - Diagnóstico' },
  { value: 'renovacao_diagnostico', label: 'Renovação de Registro - Diagnóstico' },
  { value: 'cancelamento_diagnostico', label: 'Cancelamento de Registro - Diagnóstico' },
  { value: 'inclusao_apresentacao', label: 'Inclusão de Nova Apresentação' },
  { value: 'exclusao_apresentacao', label: 'Exclusão de Apresentação' }
];