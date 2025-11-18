import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import SPIForm from './components/SPIForm';
import NOMainForm from './components/NOMainForm';
import InstrucaoEmbarqueForm from './components/InstrucaoEmbarqueForm';
import FaturaPackingCertificadosForm from './components/FaturaPackingCertificadosForm';
import DDRForm from './components/DDRForm';
import OVCForm from './components/OVCForm';
import PIForm from './components/PIForm';
import AOSOForm from './components/AOSOForm';
import LIForm from './components/LIForm';
import ComercialTabs from './components/ComercialTabs';
import SPIEnvioModal from './components/SPIEnvioModal';
import GestaoEmprestimosTab from './components/GestaoEmprestimosTab';
import GestaoComissoesTab from './components/GestaoComissoesTab';
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
    
    // Processo de Due Diligence
    numeroProcessoDD: `DD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    mercadorias: [],
    comissaoInfo: '',
    descontoInfo: '',
    valorPacking: '',
    valorTotalFatura: '',
    formaPagamento: '',
    dataElaboracaoSPI: '',
    numeroProformaInvoice: '',
    dataAprovacaoCliente: '',
    dataPagamento: '',
    dataFaturamento: '',
    valorFaturamento: '',
    numeroFatura: '',
    dataRecebimentoMercadoria: '',
    observacoesDD: '',
    
    // Campos estruturados de "For each box" - Produto Refrigerado
    boxControlNo: '',
    boxTemperature: '',
    boxDimension: '',
    boxGrossWeight: '',
    
    // Campos estruturados de "For each box" - Produto Congelado
    boxControlNo_congelado: '',
    boxTemperature_congelado: '',
    boxDimension_congelado: '',
    boxGrossWeight_congelado: '',
    
    // Número da invoice para Packing List
    numeroInvoicePackingList: '',
    numeroInvoicePackingList_congelado: '',
    
    // Campos editáveis de ATTENTION - Produto Refrigerado
    attentionRefrigeratedGoods: `ATTENTION:

"TO AVOID PROBLEMS WITH THE REFRIGERATED GOODS, PLEASE PACK THESE ITEMS (xxxx) IN BIG BOXES, DULY STAMPED ON ALL OUTER PARTS WITH THE PORTUGUESE SENTENCE BELOW, DECLARING THE TEMPERATURE BETWEEN 2-8ºC, AS FOLLOWS:"

THE LABEL IN PORTUGUESE:
"ESTAS CAIXAS CONTÊM PRODUTOS QUE DEVEM SER REFRIGERADOS ENTRE 2-8ºC."

THAT MEANS:
"THESE BOXES CONTAIN PRODUCTS WHICH SHOULD BE REFRIGERATED BETWEEN 2-8ºC."

ATTENTION:
THE REFRIGERATED ITEMS MUST BE PACKED SEPARATELY.

PLEASE THE PALLETS MUST NOT HAVE MORE THAN 120 (LENGTH) X 80 (WIDTH) X 100 (HEIGHT).`,
    
    awbDeclarationRefrigerated: `ALSO PLEASE DECLARE THE FOLLOWING SENTENCE ON THE AWB:

ATTENTION:
"THE BOXES MARKED WITH THE LABEL MUST BE REFRIGERATED BETWEEN 2-8ºC"
"AS CAIXAS MARCADAS COM A ETIQUETA DEVEM SER REFRIGERADAS ENTRE 2-8ºC"`,
    
    // Campos editáveis de ATTENTION - Produto Congelado
    attentionFrozenItems: `ATTENTION FOR FROZEN ITEMS:

"TO AVOID PROBLEMS WITH THE FROZEN GOODS, PLEASE PACK THESE ITEMS (xxxx) IN BIG BOXES, DULY STAMPED ON ALL OUTER PARTS WITH THE PORTUGUESE SENTENCE BELOW, DECLARING THE TEMPERATURE BETWEEN 2-8ºC, AS FOLLOWS:"

LABEL IN PORTUGUESE:
"ESTAS CAIXAS TÉRMICAS DE ISOPOR CONTÊM PRODUTOS CONGELADOS COM GELO SECO A -18ºC (dezoito graus celsius negativos)".

THAT MEANS:
"THIS THERMO BOX CONTAIN FROZEN PRODUCTS WITH DRY ICE AT -18ºC (eighteen below zero celsius degrees)".

THE FROZEN ITEMS MUST BE PACKED SEPARATELY.
PLEASE INCLUDE THE TAGLOG TO MONITORIZE THE TEMPERATURE.
PLEASE THE PALLETS MUST NOT HAVE MORE THAN 120 (LENGTH) X 80 (WIDTH) X 100 (HEIGHT).`,
    
    awbDeclarationFrozen: `ATTENTION:

PLEASE DECLARE THE FOLLOWING SENTENCES ON THE AWB:

"THIS THERMO BOX CONTAIN FROZEN PRODUCTS WITH DRY ICE AT -18ºC". (Eighteen below zero celsius degrees)".
"ESTAS CAIXAS TÉRMICAS DE ISOPOR CONTÊM PRODUTOS CONGELADOS COM GELO SECO A -18ºC". (Dezoito graus celsius negativos)".`,
    
    // Campos editáveis adicionais de Instruções de Embarque
    batchSerialAttention: '8- ATTENTION! BATCH/SERIAL NUMBERS:\n\nATTENTION! PLEASE SEND US THE BATCH/SERIAL NUMBERS AND EXPIRY DATES OF ALL ITEMS BEFORE INVOICING FOR APPROVAL',
    awbWeightDeclaration: 'PLEASE DECLARE ON THE AWB THE NET AND GROSS WEIGHT OF THE GOODS.',
    batchSerialAttention_congelado: '8- ATTENTION! PLEASE SEND US THE BATCH/SERIAL NUMBERS AND EXPIRY DATES OF ALL ITEMS BEFORE INVOICING FOR APPROVAL',
    awbWeightDeclaration_congelado: 'PLEASE DECLARE ON THE AWB THE NET AND GROSS WEIGHT OF THE GOODS.',
    finalSignature: 'Looking forward to hearing from you soon.\nCordially,\n\nEvandro Amorim\nInternational Division\nEAA',
    finalSignature_congelado: 'Looking forward to hearing from you soon.\nCordially,\n\nEvandro Amorim\nInternational Division\nEAA',
    
    // DOCUMENT FIELDS - Instrução de Embarque (COM VALORES PADRÃO)
    aoTo: 'RADIOMETER MEDICAL ApS.',
    aoAttn: 'Ms. Lene Orbansen',
    aoDate: 'June 15th, 2023',
    aoTotalPages: '02',
    aoSubject: 'SHIPMENT INSTRUCTIONS, DD-6859/RD-4968, YOUR AO\'s 003627075 USD 17,299.74.',
    aoCustomer: 'HOSPITAL SÃO VICENTE DE PAULO',
    
    // SPECIFIC FIELDS (Invoice) - Instrução de Embarque (COM VALORES PADRÃO)
    aoPortugueseDescription: 'Analisador de Gases Sanguíneos ABL800 FLEX, AO#003627075',
    aoUnitTotalPrices: 'ABL800 FLEX - USD 15,000.00/unit - Total USD 15,000.00; Sensors (5 units) - USD 459.95/unit - Total USD 2,299.74',
    aoLotEachItem: 'ABL800 FLEX - Lot 2023-06-A; Sensors - Lot 2023-05-B',
    aoCountryOrigin: 'Denmark',
    aoTotalCartons: '3 cartons - Marks: BIODINA 2023/06-001, BIODINA 2023/06-002, BIODINA 2023/06-003',
    aoGrossWeight: '45 kg',
    aoNetWeight: '38 kg',
    aoTermsPayment: 'International wire transfer, 30 days after shipment',
    aoConsignedTo: 'HOSPITAL SÃO VICENTE DE PAULO',
    
    // SHIPPING DOCUMENTS - Refrigerado e Congelado (campos específicos com valores padrão)
    aeroportoDestino: 'AEROPORTO INTERNACIONAL DE _____________ - Brazil.',
    aeroportoDestino_congelado: 'AEROPORTO INTERNACIONAL DE _____________ - Brazil.',
    
    // FREIGHT FORWARD - Refrigerado e Congelado (campos específicos com valores padrão)
    ffDestination: 'XXX International Airport -XX- Brazil.',
    ffNotify: '',
    ffAirWaybill: 'Consigned to: The customer above mentioned',
    ffDestination_congelado: 'XXX International Airport -XX- Brazil.',
    ffNotify_congelado: '',
    ffAirWaybill_congelado: 'Consigned to: The customer above mentioned',
    
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
    
    // Arquivos de upload
    piFile: null,
    aosoFile: null,
    liFile: null,
    faturaFile: null,
    packingListFile: null,
    certQualidadeFile: null,
    certMadeiraFile: null,
    certPerigososFile: null,
    
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
          customerDiscountRmed: existingOvcItem?.customerDiscountRmed || '0.00',
          customerDiscountBiodina: existingOvcItem?.customerDiscountBiodina || '0.00',
          customerDiscountTotal: existingOvcItem?.customerDiscountTotal || '0.00',
          discountUnit: existingOvcItem?.discountUnit || '0.00',
          discountTotal: existingOvcItem?.discountTotal || '0.00',
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
    { id: 'pi', label: 'PI' },
    { id: 'no', label: 'NO' },
    { id: 'aoso', label: 'AO/SO' },
    { id: 'instrucao-embarque', label: 'INSTRUÇÃO DE EMBARQUE' },
    { id: 'fatura-packing-certificados', label: 'FATURA PACKING LIST CERTIFICADOS' },
    { id: 'li', label: 'LI' },
    { id: 'ddr', label: 'DDR' },
    { id: 'gestao-emprestimos', label: 'GESTÃO DE EMPRÉSTIMOS' },
    { id: 'gestao-comissoes', label: 'GESTÃO DE COMISSÕES' }
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
    
    // Verificar se numeroProcessoDD está no padrão
    if (formData.numeroProcessoDD && formData.numeroProcessoDD.startsWith('DD-')) {
      return formData.numeroProcessoDD;
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
    
    if (activeMasterTab === 'pi') {
      return (
        <PIForm
          formData={formData}
          onInputChange={handleInputChange}
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
    
    if (activeMasterTab === 'aoso') {
      return (
        <AOSOForm
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
    
    if (activeMasterTab === 'fatura-packing-certificados') {
      return (
        <FaturaPackingCertificadosForm
          formData={formData}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (activeMasterTab === 'li') {
      return (
        <LIForm
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

    if (activeMasterTab === 'gestao-comissoes') {
      return (
        <GestaoComissoesTab
          importacaoId={getImportacaoId()}
          formData={formData}
          onInputChange={handleInputChange}
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
              <div 
                className="flex space-x-4 bg-gray-50 p-2 rounded-lg overflow-x-auto"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#9CA3AF #F3F4F6'
                }}
              >
                {masterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleMasterTabChange(tab.id)}
                    className={`px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
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
