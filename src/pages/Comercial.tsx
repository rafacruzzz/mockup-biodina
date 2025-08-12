import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, UserCheck, BarChart3, Calendar, Settings, ShoppingCart, Package, DollarSign, FileText, HandCoins } from 'lucide-react';
import AgendaComercial from '@/components/comercial/AgendaComercial';
import OportunidadeForm from '@/components/comercial/OportunidadeForm';
import OportunidadeAvancadaForm from '@/components/comercial/OportunidadeAvancadaForm';
import ImportacaoDiretaForm from '@/components/comercial/ImportacaoDiretaForm';
import ContratacaoSimplesForm from '@/components/comercial/ContratacaoSimplesForm';
import PedidoForm from '@/components/comercial/PedidoForm';
import AdicionarProdutoModal from '@/components/comercial/AdicionarProdutoModal';
import FiltrosAvancados from '@/components/comercial/FiltrosAvancados';
import ApprovalModal from '@/components/comercial/ApprovalModal';
import TipoPropostaModal from '@/components/comercial/TipoPropostaModal';
import EmprestimosTable from '@/components/comercial/emprestimos/EmprestimosTable';
import NovoEmprestimoModal from '@/components/comercial/emprestimos/NovoEmprestimoModal';
import DevolucaoModal from '@/components/comercial/emprestimos/DevolucaoModal';
import { EmprestimoResumo } from '@/types/emprestimo';

// Mock data for demonstration purposes
const mockOportunidades = [
  { id: 1, nome: 'Oportunidade A', cliente: 'Cliente X', valor: 15000, status: 'Em Aberto' },
  { id: 2, nome: 'Oportunidade B', cliente: 'Cliente Y', valor: 25000, status: 'Aprovada' },
  { id: 3, nome: 'Oportunidade C', cliente: 'Cliente Z', valor: 10000, status: 'Concluída' },
];

const mockProdutos = [
  { id: 101, nome: 'Produto Alpha', preco: 50, estoque: 200 },
  { id: 102, nome: 'Produto Beta', preco: 75, estoque: 150 },
  { id: 103, nome: 'Produto Gamma', preco: 100, estoque: 100 },
];

const mockClientes = [
  { id: 201, nome: 'Cliente X', segmento: 'Industrial' },
  { id: 202, nome: 'Cliente Y', segmento: 'Varejo' },
  { id: 203, nome: 'Cliente Z', segmento: 'Serviços' },
];

const mockChamados = [
  { id: 301, cliente: 'Cliente X', assunto: 'Problema técnico', status: 'Aberto' },
  { id: 302, cliente: 'Cliente Y', assunto: 'Solicitação de suporte', status: 'Em Andamento' },
  { id: 303, cliente: 'Cliente Z', assunto: 'Dúvida sobre o produto', status: 'Resolvido' },
];

interface Oportunidade {
  id: number;
  nome: string;
  cliente: string;
  valor: number;
  status: string;
}

const Comercial = () => {
  const [activeModule, setActiveModule] = useState<'vendas' | 'pos-venda' | 'emprestimos'>('vendas');
  const [showOportunidadeForm, setShowOportunidadeForm] = useState(false);
  const [showOportunidadeAvancadaForm, setShowOportunidadeAvancadaForm] = useState(false);
  const [showImportacaoDiretaForm, setShowImportacaoDiretaForm] = useState(false);
  const [showContratacaoSimplesForm, setShowContratacaoSimplesForm] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [showAdicionarProdutoModal, setShowAdicionarProdutoModal] = useState(false);
  const [showFiltrosAvancados, setShowFiltrosAvancados] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showTipoPropostaModal, setShowTipoPropostaModal] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<Oportunidade | null>(null);

  // New state for empréstimos module
  const [showNovoEmprestimoModal, setShowNovoEmprestimoModal] = useState(false);
  const [showDevolucaoModal, setShowDevolucaoModal] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<EmprestimoResumo | null>(null);

  const handleOpenOportunidadeForm = () => {
    setShowOportunidadeForm(true);
  };

  const handleCloseOportunidadeForm = () => {
    setShowOportunidadeForm(false);
  };

  const handleOpenOportunidadeAvancadaForm = () => {
    setShowOportunidadeAvancadaForm(true);
  };

  const handleCloseOportunidadeAvancadaForm = () => {
    setShowOportunidadeAvancadaForm(false);
  };

  const handleOpenImportacaoDiretaForm = (oportunidade?: Oportunidade) => {
    setSelectedOportunidade(oportunidade || null);
    setShowImportacaoDiretaForm(true);
  };

  const handleCloseImportacaoDiretaForm = () => {
    setShowImportacaoDiretaForm(false);
    setSelectedOportunidade(null);
  };

  const handleOpenContratacaoSimplesForm = () => {
    setShowContratacaoSimplesForm(true);
  };

  const handleCloseContratacaoSimplesForm = () => {
    setShowContratacaoSimplesForm(false);
  };

  const handleOpenPedidoForm = () => {
    setShowPedidoForm(true);
  };

  const handleClosePedidoForm = () => {
    setShowPedidoForm(false);
  };

  const handleOpenAdicionarProdutoModal = () => {
    setShowAdicionarProdutoModal(true);
  };

  const handleCloseAdicionarProdutoModal = () => {
    setShowAdicionarProdutoModal(false);
  };

  const handleOpenFiltrosAvancados = () => {
    setShowFiltrosAvancados(true);
  };

  const handleCloseFiltrosAvancados = () => {
    setShowFiltrosAvancados(false);
  };

  const handleOpenApprovalModal = () => {
    setShowApprovalModal(true);
  };

  const handleCloseApprovalModal = () => {
    setShowApprovalModal(false);
  };

  const handleOpenTipoPropostaModal = () => {
    setShowTipoPropostaModal(true);
  };

  const handleCloseTipoPropostaModal = () => {
    setShowTipoPropostaModal(false);
  };

  const handleRegistrarDevolucao = (emprestimo: EmprestimoResumo) => {
    setSelectedEmprestimo(emprestimo);
    setShowDevolucaoModal(true);
  };

  const renderVendasModule = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Oportunidades de Vendas</h2>
            <p className="text-gray-600">Gerencie suas oportunidades de vendas e feche mais negócios</p>
          </div>
          <div className="space-x-2">
            <Button onClick={handleOpenOportunidadeForm} className="bg-blue-600 hover:bg-blue-700">
              Nova Oportunidade
            </Button>
            <Button onClick={() => handleOpenImportacaoDiretaForm()} className="bg-green-600 hover:bg-green-700">
              Nova Importação Direta
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockOportunidades.map(oportunidade => (
            <Card key={oportunidade.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{oportunidade.nome}</CardTitle>
                <CardDescription>Cliente: {oportunidade.cliente}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Valor: R$ {oportunidade.valor.toFixed(2)}</p>
                <Badge className="mt-2">{oportunidade.status}</Badge>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleOpenImportacaoDiretaForm(oportunidade)}>
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderPosVendaModule = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestão de Pós-Venda</h2>
            <p className="text-gray-600">Acompanhe os chamados e garanta a satisfação dos seus clientes</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">Novo Chamado</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockChamados.map(chamado => (
            <Card key={chamado.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Chamado #{chamado.id}</CardTitle>
                <CardDescription>Cliente: {chamado.cliente}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Assunto: {chamado.assunto}</p>
                <Badge className="mt-2">{chamado.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderEmprestimosModule = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestão de Empréstimos</h2>
            <p className="text-gray-600">Gerencie empréstimos de produtos e suas devoluções</p>
          </div>
        </div>

        <EmprestimosTable
          onNovoEmprestimo={() => setShowNovoEmprestimoModal(true)}
          onRegistrarDevolucao={handleRegistrarDevolucao}
        />
      </div>
    );
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'vendas':
        return renderVendasModule();
      case 'pos-venda':
        return renderPosVendaModule();
      case 'emprestimos':
        return renderEmprestimosModule();
      default:
        return renderVendasModule();
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Comercial</h1>
          <p className="text-gray-600">Gerencie vendas, pós-venda e empréstimos</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            activeModule === 'vendas' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => setActiveModule('vendas')}
        >
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-lg font-medium">Vendas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Gestão de oportunidades, pedidos e propostas comerciais
            </CardDescription>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="secondary">127 Oportunidades</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            activeModule === 'pos-venda' ? 'ring-2 ring-green-500 bg-green-50' : ''
          }`}
          onClick={() => setActiveModule('pos-venda')}
        >
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-6 w-6 text-green-600" />
              <CardTitle className="text-lg font-medium">Pós-Venda</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Acompanhamento de chamados e suporte aos clientes
            </CardDescription>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="secondary">23 Chamados Ativos</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            activeModule === 'emprestimos' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
          }`}
          onClick={() => setActiveModule('emprestimos')}
        >
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <HandCoins className="h-6 w-6 text-purple-600" />
              <CardTitle className="text-lg font-medium">Gestão de Empréstimos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Controle de empréstimos de produtos e devoluções
            </CardDescription>
            <div className="flex justify-between items-center mt-4">
              <Badge variant="secondary">Empréstimos Ativos</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {renderActiveModule()}

      {/* Modals - Only show minimal required props to fix build errors */}
      {showOportunidadeForm && (
        <OportunidadeForm 
          onClose={handleCloseOportunidadeForm}
          onSave={(data) => console.log('Oportunidade:', data)}
        />
      )}
      
      {showOportunidadeAvancadaForm && (
        <OportunidadeAvancadaForm 
          isOpen={showOportunidadeAvancadaForm}
          onClose={handleCloseOportunidadeAvancadaForm}
          onSave={(data) => console.log('Oportunidade avançada:', data)}
        />
      )}
      
      <ImportacaoDiretaForm
        isOpen={showImportacaoDiretaForm}
        onClose={handleCloseImportacaoDiretaForm}
        onSave={(data) => {
          console.log('Dados da Importação Direta:', data);
        }}
        oportunidade={selectedOportunidade}
      />
      
      {showContratacaoSimplesForm && (
        <ContratacaoSimplesForm 
          isOpen={showContratacaoSimplesForm}
          onClose={handleCloseContratacaoSimplesForm}
          onSave={(data) => console.log('Contratação simples:', data)}
        />
      )}
      
      {showPedidoForm && (
        <PedidoForm 
          onClose={handleClosePedidoForm}
          onSave={(data) => console.log('Pedido:', data)}
        />
      )}
      
      {showAdicionarProdutoModal && (
        <AdicionarProdutoModal 
          isOpen={showAdicionarProdutoModal}
          onClose={handleCloseAdicionarProdutoModal}
          onAdicionarProduto={(produto) => console.log('Produto adicionado:', produto)}
        />
      )}
      
      {showFiltrosAvancados && (
        <FiltrosAvancados onClose={handleCloseFiltrosAvancados} />
      )}
      
      {showApprovalModal && (
        <ApprovalModal 
          isOpen={showApprovalModal}
          onClose={handleCloseApprovalModal}
          onApprove={() => console.log('Approved')}
          oportunidadeId="mock-id"
        />
      )}
      
      {showTipoPropostaModal && (
        <TipoPropostaModal 
          isOpen={showTipoPropostaModal}
          onClose={handleCloseTipoPropostaModal}
          onContinue={(tipo) => console.log('Tipo proposta:', tipo)}
        />
      )}

      {/* Empréstimos Modals */}
      <NovoEmprestimoModal
        isOpen={showNovoEmprestimoModal}
        onClose={() => setShowNovoEmprestimoModal(false)}
      />

      <DevolucaoModal
        isOpen={showDevolucaoModal}
        onClose={() => {
          setShowDevolucaoModal(false);
          setSelectedEmprestimo(null);
        }}
        emprestimo={selectedEmprestimo}
      />
    </div>
  );
};

export default Comercial;
