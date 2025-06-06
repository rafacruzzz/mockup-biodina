import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import SPIForm from './components/SPIForm';
import NOForm from './components/NOForm';
import OVCForm from './components/OVCForm';
import ComercialTabs from './components/ComercialTabs';
import { generateSPIPDF } from './utils/spiUtils';

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave, oportunidade }: ImportacaoDiretaFormProps) => {
  const [activeMasterTab, setActiveMasterTab] = useState('comercial');
  const [activeToolTab, setActiveToolTab] = useState('dados-gerais');

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
    publicoPrivado: '',
    naturezaOperacao: '',
    tipoContrato: '',
    situacao: '',
    previsaoFechamento: '',
    gerarExpedicao: false,
    nfConsumoFinal: false,
    localEstoque: '',
    
    // Dados Financeiros
    emailNotasFiscais: '',
    formaPagamento: '',
    dadosBancarios: '',
    parcelas: '',
    prazoPagamento: '',
    documentacaoNF: '',
    destacarIR: false,
    saldoEmpenho: '',
    saldoAta: '',
    programacaoFaturamento: '',
    
    // Informações de Frete
    fretePagar: '',
    freteRetirar: '',
    prazoEntrega: '',
    entregarRetirar: '',
    dadosRecebedor: '',
    horariosPermitidos: '',
    locaisEntrega: '',
    informacoesEntrega: '',
    
    // Campos Adicionais
    urgente: false,
    justificativaUrgencia: '',
    autorizadoPor: '',
    dataAutorizacao: '',
    termometro: 85, // Fixado como "CONQUISTADO/QUENTE"
    motivoGanho: '',
    
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

  // Estado específico para OVC items
  const [ovcItems, setOvcItems] = useState([
    {
      id: 1,
      code: 'ABL800 FLEX',
      qty: '1',
      priceListUnit: '65000.00',
      priceListTotal: '65000.00',
      customerDiscountPercent: '15',
      customerDiscountUnit: '9750.00',
      customerDiscountTotal: '9750.00',
      subTotalUnit: '55250.00',
      subTotalTotal: '55250.00',
      handlingCharge: '1657.50',
      total: '56907.50',
      comissionPercent: '5',
      comissionValue: '2845.38',
      netRadiometer: '54062.12'
    },
    {
      id: 2,
      code: 'Installation',
      qty: '1',
      priceListUnit: '3000.00',
      priceListTotal: '3000.00',
      customerDiscountPercent: '0',
      customerDiscountUnit: '0.00',
      customerDiscountTotal: '0.00',
      subTotalUnit: '3000.00',
      subTotalTotal: '3000.00',
      handlingCharge: '90.00',
      total: '3090.00',
      comissionPercent: '5',
      comissionValue: '154.50',
      netRadiometer: '2935.50'
    }
  ]);

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
    }
  }, [formData.spiMercadorias]);

  const masterTabs = [
    { id: 'comercial', label: 'COMERCIAL' },
    { id: 'spi', label: 'SPI' },
    { id: 'ovc', label: 'OVC' },
    { id: 'no', label: 'NO' }
  ];

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

  const handleGenerateSPIPDF = () => {
    generateSPIPDF(formData);
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
        <NOForm
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
            <div className="flex space-x-4 bg-gray-50 p-2 rounded-lg">
              {masterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleMasterTabChange(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
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
                onClick={handleGenerateSPIPDF} 
                variant="outline"
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Baixar SPI
              </Button>
            )}
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              {oportunidade ? 'Atualizar' : 'Salvar'} Importação Direta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
