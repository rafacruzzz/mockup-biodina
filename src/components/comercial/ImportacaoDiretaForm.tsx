import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import EmprestimosTab from './EmprestimosTab';

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade: any;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave, oportunidade }: ImportacaoDiretaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [activeToolTab, setActiveToolTab] = useState('dados-gerais');
  const [showSPIDownloadModal, setShowSPIDownloadModal] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    // Informações Básicas do Cliente
    cpfCnpj: '',
    nome: '',
    nomeFantasia: '',
    razaoSocial: '',
    endereco: '',
    uf: '',
    fonteLead: '',
    ativo: true,
    email: '',
    telefone: '',
    website: '',
    valorNegocio: '',
    
    // Detalhes da Importação
    produtoImportado: '',
    quantidade: '',
    unidadeMedida: '',
    valorUnitario: '',
    incoterms: '',
    paisOrigemProduto: '',
    portoEmbarque: '',
    portoDestino: '',
    moedaNegociada: '',
    
    // Fornecedor Estrangeiro
    nomeFornecedorEstrangeiro: '',
    paisFornecedor: '',
    tempoRelacionamento: '',
    termosPagamento: '',
    
    // Aspectos Fiscais
    ncm: '',
    tratamentoTributario: '',
    impostosIncidentes: '',
    beneficiosFiscais: '',
    
    // Logística Internacional
    modalTransporte: '',
    agenteCarga: '',
    numeroContainer: '',
    dataEmbarque: '',
    previsaoChegadaBrasil: '',
    
    // Despacho Aduaneiro
    despachante: '',
    numeroDeclaracaoImportacao: '',
    dataRegistroDeclaracao: '',
    canalParametrizacao: '',
    
    // Custos Estimados
    custoProduto: '',
    freteInternacional: '',
    seguroInternacional: '',
    impostosImportacao: '',
    taxasDespacho: '',
    armazenagem: '',
    outrosCustos: '',
    custoTotalEstimado: '',
    
    // Análise de Risco
    analiseRisco: '',
    
    // DU-E
    numeroDue: '',
    statusDue: '',
    dataRegistroDue: '',
    valorMercadoriasDue: '',
    pesoLiquidoDue: '',
    qtdVolumesDue: '',
    dadosTransporteDue: '',
    observacoesDue: '',
    
    // Licenças e Permissões
    licencaImportacao: '',
    registroAnvisa: '',
    certificadoOrigem: '',
    outrasLicencas: '',
    statusLicencas: '',
    validadeLicencas: '',
    
    // Documentação Aduaneira
    conhecimentoEmbarque: '',
    faturaComercial: '',
    listaEmbalagem: '',
    certificadoSeguro: '',
    outrosDocumentos: '',
    statusDocumentacao: '',
    
    // Controle de Qualidade
    inspecaoMercadorias: '',
    laudoTecnico: '',
    certificadoQualidade: '',
    observacoesQualidade: '',
    statusQualidade: '',
    
    // Logística e Entrega
    previsaoChegada: '',
    localDescarga: '',
    transportadoraResponsavel: '',
    contatoTransportadora: '',
    statusEntrega: '',
    observacoesLogistica: '',
    
    // Conformidade e Auditoria
    auditoriaInterna: '',
    conformidadeRegulamentacoes: '',
    relatorioConformidade: '',
    observacoesConformidade: '',
    
    // Dados Financeiros
    valorTotalOperacao: '',
    moedaOperacao: '',
    taxaCambio: '',
    formaPagamento: '',
    prazosPagamento: '',
    custosTaxas: '',
    seguro: '',
    frete: '',
    observacoesFinanceiras: '',
    
    // Cronograma e Marcos
    dataInicioProcesso: '',
    previsaoLiberacao: '',
    dataEfetivacaoBanco: '',
    marcosCriticos: '',
    statusCronograma: '',
    
    // Observações Gerais
    observacoesGerais: '',
    
    // Comunicação e Follow-up
    contatoPrincipal: '',
    emailContato: '',
    telefoneContato: '',
    frequenciaUpdate: '',
    proximoFollowUp: '',
    
    // Status e Prioridade
    statusGeral: 'Em Andamento',
    prioridade: 'Média',
    responsavel: '',
    equipeEnvolvida: '',
    
    // Histórico de Alterações
    ultimaAtualizacao: '',
    alteradoPor: '',
    versaoDocumento: '1.0',
    
    // Anexos e Links
    anexos: '',
    linksRelevantes: '',
    
    // Informações Técnicas do Produto
    descricaoTecnica: '',
    especificacoesTecnicas: '',
    codigoNcm: '',
    classificacaoFiscal: '',
    
    // Informações do Fornecedor
    nomeFornecedor: '',
    paisOrigem: '',
    contatoFornecedor: '',
    certificacoesFornecedor: '',
    
    // Controles Especiais
    produtoControlado: false,
    orgaoControlador: '',
    licencaEspecial: '',
    procedimentosEspeciais: '',
    
    // Rastreabilidade
    codigoRastreamento: '',
    sistemaRastreamento: '',
    pontosVerificacao: '',
    
    // Sustentabilidade e ESG
    certificacaoAmbiental: '',
    relatorioSustentabilidade: '',
    praticasEsg: '',
    
    // EAA (Estudo de Adequação de Acesso)
    numeroEaa: '',
    statusEaa: '',
    dataAprovacaoEaa: '',
    validadeEaa: '',
    observacoesEaa: '',
    responsavelEaa: '',
    anexoEaa: '',
    numeroProtocoloEaa: '',
    orgaoExpeditorEaa: '',
    categoriaEaa: '',
    
    // NO (Natureza da Operação)
    numeroNo: '',
    statusNo: '',
    dataAprovacaoNo: '',
    validadeNo: '',
    observacoesNo: '',
    responsavelNo: '',
    anexoNo: '',
    numeroProtocoloNo: '',
    orgaoExpeditorNo: '',
    categoriaNo: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      console.log('Salvando importação direta:', formData);
      
      // Generate an ID if it doesn't exist
      if (!formData.id) {
        formData.id = Date.now().toString();
      }
      
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar importação direta:', error);
    }
  };

  const renderDadosGerais = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome do Cliente *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            placeholder="Nome completo do cliente"
            required
          />
        </div>
        <div>
          <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
          <Input
            id="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            required
          />
        </div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-biodina-blue">
            {oportunidade ? 'Editar' : 'Nova'} Importação Direta
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
            <TabsTrigger value="emprestimos">Empréstimos</TabsTrigger>
            <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
          </TabsList>

          <div className="mt-4 h-[calc(90vh-200px)] overflow-y-auto">
            <TabsContent value="dados-gerais" className="space-y-4">
              {renderDadosGerais()}
            </TabsContent>

            <TabsContent value="emprestimos" className="space-y-4">
              <EmprestimosTab importacaoId={formData.id} />
            </TabsContent>

            <TabsContent value="ferramentas" className="space-y-4">
              {/* Tools content */}
              <div className="text-center py-8">
                <p className="text-gray-500">Ferramentas de importação em desenvolvimento...</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-biodina-gold hover:bg-biodina-gold/90"
          >
            Salvar Importação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
