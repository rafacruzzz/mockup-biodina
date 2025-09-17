import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import SPIForm from './components/SPIForm';
import NOMainForm from './components/NOMainForm';
import InstrucaoEmbarqueForm from './components/InstrucaoEmbarqueForm';
import PackingListForm from './components/PackingListForm';
import DDRForm from './components/DDRForm';
import OVCForm from './components/OVCForm';
import ComercialTabs from './components/ComercialTabs';
import SPIEnvioModal from './components/SPIEnvioModal';
import GestaoEmprestimosTab from './components/GestaoEmprestimosTab';
import { generateSPIPDF } from './utils/spiUtils';
import { PIHistoryItem, PIStatus } from '@/types/piHistory';

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave, oportunidade }: ImportacaoDiretaFormProps) => {
  const [activeMasterTab, setActiveMasterTab] = useState('comercial');
  const [activeToolTab, setActiveToolTab] = useState('dados-gerais');
  const [showSPIEnvioModal, setShowSPIEnvioModal] = useState(false);
  const [piHistory, setPiHistory] = useState<PIHistoryItem[]>([]);
  const [piStatus, setPiStatus] = useState<PIStatus>('draft');

  const [formData, setFormData] = useState({
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
    
    // Informações do Negócio
    valorNegocio: '',
    metodoContato: '',
    segmentoLead: '',
    colaboradoresResponsaveis: [],
    dataInicio: '',
    dataLimite: '',
    procurandoPor: '',
    tags: [],
    caracteristicas: '',
    fluxoTrabalho: '',
    status: '',
    descricao: '',
    dataVisita: '',
    
    // Campos Específicos de Importação
    spi: '',
    di: '',
    invoice: '',
    comissao: '',
    numeroProjeto: '',
    numeroPedido: '',
    numeroContrato: '',
    naturezaOperacao: '',
    tipoContrato: '',
    previsaoFechamento: '',
    
    // Análise Técnica
    analiseTecnica: '',
    
    // Análise da Concorrência
    analiseComcorrencia: '',
    propostaNegociacao: false,
    
    // Produtos e Serviços
    produtos: [],
    servicos: [],
    itensNaoCadastrados: '',
    kits: [],
    informacoesComplementares: '',
    
    // Campos específicos do SPI
    spiCliente: '',
    spiDadosProforma: '',
    spiEmNomeDe: '',
    spiCnpj: '',
    spiEndereco: '',
    spiInscricaoEstadual: '',
    spiNumero: '',
    spiData: '',
    spiProposta: '',
    spiEquipamento: '',
    spiModelo: '',
    spiPacking: '',
    spiFabricante: '',
    spiFormaPagamento: 'CAD',
    spiTemComissao: false,
    spiPercentualComissao: '',
    spiRepresentante: '',
    spiMercadorias: [],
    spiObservacoes: '',
    spiFaturamentoConfirmado: false,
    spiPagamentoForma: '',
    spiPagamentoPrazo: '',
    spiEntregaPrazo: '',
    spiFormaVenda: 'licitacao',
    spiFormaVendaOutros: '',
    spiValor: '',
    spiPrazo: '',
    spiDataConfirmacao: '',
    spiClienteAprovacao: '', // Novo campo para aprovação do cliente
    
    // Estados do PI
    piStatus: 'draft' as PIStatus,
    piHistory: [] as PIHistoryItem[],
    isFieldsLocked: false,
    
    // Campos específicos do NO
    noDestinatario: '',
    noAtencao: '',
    noAssunto: '',
    noCliente: '',
    noConsignadoPara: '',
    noEnderecoConsignado: '',
    noCepConsignado: '',
    noCnpjConsignado: '',
    noTermoPagamento: '',
    noInstrucaoEnvio: '',
    noAssinante: '',
    noCargo: '',
    noEaa: ''
  });

  // Estado específico para OVC items - começando vazio
  const [ovcItems, setOvcItems] = useState([]);

  // Sincronizar produtos SPI com OVC
  useEffect(() => {
    if (formData.spiMercadorias && formData.spiMercadorias.length > 0) {
      const syncedOvcItems = formData.spiMercadorias.map((mercadoria: any, index: number) => {
        // Procurar item existente no OVC pelo ID da mercadoria
        const existingOvcItem = ovcItems.find(item => item.id === mercadoria.id);
        
        return {
          id: mercadoria.id || Date.now() + index,
          code: mercadoria.codigo || '',
          qty: mercadoria.totalOrdens || '0',
          priceListUnit: existingOvcItem?.priceListUnit || '0.00',
          priceListTotal: existingOvcItem?.priceListTotal || '0.00',
          customerDiscountPercent: existingOvcItem?.customerDiscountPercent || '0',
          customerDiscountUnit: existingOvcItem?.customerDiscountUnit || '0.00',
          customerDiscountTotal: existingOvcItem?.customerDiscountTotal || '0.00',
          subTotalUnit: existingOvcItem?.subTotalUnit || '0.00',
          subTotalTotal: existingOvcItem?.subTotalTotal || '0.00',
          handlingCharge: existingOvcItem?.handlingCharge || '0.00',
          total: existingOvcItem?.total || '0.00',
          comissionPercent: existingOvcItem?.comissionPercent || '5',
          comissionValue: existingOvcItem?.comissionValue || '0.00',
          netRadiometer: existingOvcItem?.netRadiometer || '0.00'
        };
      });
      
      // Manter items OVC que não vieram do SPI (se houver)
      const ovcOnlyItems = ovcItems.filter(ovcItem => 
        !formData.spiMercadorias.some((mercadoria: any) => mercadoria.id === ovcItem.id)
      );
      
      setOvcItems([...syncedOvcItems, ...ovcOnlyItems]);
    } else {
      // Se não há mercadorias no SPI, limpar OVC também
      setOvcItems([]);
    }
  }, [formData.spiMercadorias]);

  const masterTabs = [
    { id: 'comercial', label: 'COMERCIAL' },
    { id: 'spi', label: 'SPI' },
    { id: 'ovc', label: 'OVC' },
    { id: 'no', label: 'NO' },
    { id: 'instrucao-embarque', label: 'INSTRUÇÃO DE EMBARQUE' },
    { id: 'packing-list', label: 'PACKING LIST OU VALIDADES' },
    { id: 'ddr', label: 'DDR' },
    { id: 'gestao-emprestimos', label: 'GESTÃO DE EMPRÉSTIMOS' }
  ];

  // Computar o ID da importação atual
  const getImportacaoId = () => {
    // Verificar se oportunidade já tem um ID no padrão IMP-YYYY-XXX
    if (oportunidade?.id && typeof oportunidade.id === 'string' && oportunidade.id.startsWith('IMP-')) {
      return oportunidade.id;
    }
    
    // Verificar se spiNumero está no padrão
    if (formData.spiNumero && formData.spiNumero.startsWith('IMP-')) {
      return formData.spiNumero;
    }
    
    // Verificar se numeroProjeto está no padrão
    if (formData.numeroProjeto && formData.numeroProjeto.startsWith('IMP-')) {
      return formData.numeroProjeto;
    }
    
    return undefined;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      id: oportunidade?.id || Date.now(),
    };
    onSave(dataToSave);
    onClose();
  };

  const handleEnviarPI = () => {
    setShowSPIEnvioModal(true);
  };

  const handleEnviarComCnpj = (selectedCnpj: string) => {
    // Criar novo item do histórico
    const novoHistorico: PIHistoryItem = {
      id: Date.now().toString(),
      cnpjSelecionado: selectedCnpj,
      dataEnvio: new Date(),
      status: 'enviado'
    };

    // Adicionar ao histórico
    const novoHistoricoCompleto = [...piHistory, novoHistorico];
    setPiHistory(novoHistoricoCompleto);
    
    // Atualizar status para enviado/em análise
    setPiStatus('em_analise');
    
    // Atualizar formData
    setFormData(prev => ({
      ...prev,
      piStatus: 'em_analise',
      piHistory: novoHistoricoCompleto,
      isFieldsLocked: true
    }));

    // Gerar o PDF (mantém funcionalidade original)
    generateSPIPDF(formData, selectedCnpj);
  };

  const handlePIStatusChange = (historyId: string, newStatus: 'aceito' | 'rejeitado', observacoes?: string) => {
    // Atualizar histórico
    const historicoAtualizado = piHistory.map(item => 
      item.id === historyId 
        ? { ...item, status: newStatus, observacoes }
        : item
    );
    setPiHistory(historicoAtualizado);
    
    // Atualizar status geral
    setPiStatus(newStatus);
    
    // Atualizar formData
    setFormData(prev => ({
      ...prev,
      piStatus: newStatus,
      piHistory: historicoAtualizado,
      isFieldsLocked: newStatus === 'aceito' // Só aceito trava os campos permanentemente
    }));
  };

  const handleMasterTabChange = (tabId: string) => {
    setActiveMasterTab(tabId);
  };

  const renderMasterTabContent = () => {
    if (activeMasterTab === 'spi') {
      return (
        <SPIForm
          formData={formData}
          onInputChange={handleInputChange}
          piHistory={piHistory}
          piStatus={piStatus}
          onPIStatusChange={handlePIStatusChange}
        />
      );
    }
    
    if (activeMasterTab === 'ovc') {
      return (
        <OVCForm
          formData={formData}
          onInputChange={handleInputChange}
          ovcItems={ovcItems}
          onUpdateItems={setOvcItems}
        />
      );
    }
    
    if (activeMasterTab === 'no') {
      return (
        <NOMainForm
          formData={formData}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (activeMasterTab === 'instrucao-embarque') {
      return (
        <InstrucaoEmbarqueForm
          formData={formData}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (activeMasterTab === 'packing-list') {
      return (
        <PackingListForm
          formData={formData}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (activeMasterTab === 'ddr') {
      return (
        <DDRForm
          formData={formData}
          onInputChange={handleInputChange}
        />
      );
    }

    if (activeMasterTab === 'gestao-emprestimos') {
      return (
        <GestaoEmprestimosTab
          importacaoId={getImportacaoId()}
        />
      );
    }
    
    if (activeMasterTab === 'comercial') {
      return (
        <ComercialTabs
          activeTab={activeToolTab}
          onTabChange={setActiveToolTab}
          formData={formData}
          onInputChange={handleInputChange}
          oportunidade={oportunidade}
        />
      );
    }
    
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Conteúdo da aba {activeMasterTab.toUpperCase()} em desenvolvimento...</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl font-bold text-purple-600">
              Nova Importação Direta
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full min-h-0">
            {/* Abas Masters */}
            <div className="mb-6 flex-shrink-0">
              <div className="flex space-x-4 bg-gray-50 p-2 rounded-lg overflow-x-auto">
                {masterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleMasterTabChange(tab.id)}
                    className={`px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap ${
                      activeMasterTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo da aba master ativa com scroll */}
            <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2">
              {renderMasterTabContent()}
            </div>

            {/* Rodapé com botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t flex-shrink-0 mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              {activeMasterTab === 'spi' && (
                <Button 
                  onClick={handleEnviarPI} 
                  variant="outline"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  disabled={piStatus === 'aceito' || piStatus === 'em_analise'}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Enviar PI
                </Button>
              )}
              <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
                {oportunidade ? 'Atualizar' : 'Salvar'} Importação Direta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SPIEnvioModal
        isOpen={showSPIEnvioModal}
        onClose={() => setShowSPIEnvioModal(false)}
        onEnviar={handleEnviarComCnpj}
      />
    </>
  );
};

export default ImportacaoDiretaForm;
