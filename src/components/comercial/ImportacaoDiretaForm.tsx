import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import SPIForm from './components/SPIForm';
import NOForm from './components/NOForm';
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
    spiDataConfirmacao: ''
  });

  const masterTabs = [
    { id: 'comercial', label: 'COMERCIAL' },
    { id: 'spi', label: 'SPI' },
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

  const renderMasterTabContent = () => {
    if (activeMasterTab === 'spi') {
      return (
        <SPIForm
          formData={formData}
          onInputChange={handleInputChange}
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
                  onClick={() => setActiveMasterTab(tab.id)}
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
