import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import ServiceModal from "@/components/cadastro/ServiceModal";
import UserModal from "@/components/cadastro/UserModal";
import GenericModal from "@/components/cadastro/GenericModal";
import EntidadeModal from "@/components/cadastro/EntidadeModal";
import ContaBancariaModal from "@/components/cadastro/ContaBancariaModal";
import ProductRegistrationForm from "@/components/product/ProductRegistrationForm";
import ProductListingTable from "@/components/product/ProductListingTable";
import { ProductRegistrationData } from "@/types/product";
import { modules } from "@/data/cadastroModules";
import { toast } from "@/components/ui/use-toast";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Product-specific states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRegistrationData | null>(null);
  const [products, setProducts] = useState<ProductRegistrationData[]>([]);
  
  // Other modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showGenericModal, setShowGenericModal] = useState(false);
  const [showEntidadeModal, setShowEntidadeModal] = useState(false);
  const [showContaBancariaModal, setShowContaBancariaModal] = useState(false);
  const [genericModalConfig, setGenericModalConfig] = useState<any>(null);

  // Initialize products from modules data
  useEffect(() => {
    const productData = modules.produtos?.subModules.produtos?.data || [];
    const formattedProducts: ProductRegistrationData[] = productData.map((item: any) => ({
      // Dados Gerais
      codigo: item.codigo || '',
      familiaProduto: item.familiaProduto || '',
      marca: item.marca || '',
      modelo: item.modelo || '',
      descricao: item.descricao || '',
      vendidoPorUnidade: item.vendidoPorUnidade || true,
      nomeMarketing: item.nomeMarketing || '',
      descritivoBreve: item.descritivoBreve || '',
      descritivoCompleto: item.descritivoCompleto || '',
      tags: item.tags || [],
      fabricanteId: item.fabricanteId || '',
      codigoProdutoFabricante: item.codigoProdutoFabricante || '',
      nomeProdutoFabricante: item.nomeProdutoFabricante || '',

      // Regulamentação ANVISA
      detentorRegistroId: item.detentorRegistroId || '',
      nomeEmpresaDetentora: item.nomeEmpresaDetentora || '',
      cnpjDetentor: item.cnpjDetentor || '',
      autorizacaoFuncionamento: item.autorizacaoFuncionamento || '',
      nomeDispositivoMedico: item.nomeDispositivoMedico || '',
      nomeTecnicoDispositivo: item.nomeTecnicoDispositivo || '',
      numeroNotificacaoRegistro: item.numeroNotificacaoRegistro || '',
      situacaoNotificacaoRegistro: item.situacaoNotificacaoRegistro || '',
      processoNotificacaoRegistro: item.processoNotificacaoRegistro || '',
      classificacaoRisco: item.classificacaoRisco || '',
      dataInicioVigencia: item.dataInicioVigencia || null,
      dataVencimento: item.dataVencimento || null,
      linkConsultaAnvisa: item.linkConsultaAnvisa || '',

      // Apresentações
      apresentacaoPrimaria: item.apresentacaoPrimaria || '',
      apresentacaoSecundaria: item.apresentacaoSecundaria || '',
      apresentacaoEmbarque: item.apresentacaoEmbarque || '',
      componentes: item.componentes || '',
      referenciasComercializadas: item.referenciasComercializadas || [],

      // Códigos Fiscais
      codigoNCM: item.codigoNCM || '',
      cest: item.cest || '',
      codigoEANPrimaria: item.codigoEANPrimaria || '',
      codigoEANSecundaria: item.codigoEANSecundaria || '',
      codigoEANEmbarque: item.codigoEANEmbarque || '',

      // Preço e Estoque
      precoUnitarioVenda: item.precoUnitarioVenda || 0,
      estoqueFisico: item.estoqueFisico || 0,
      reservado: item.reservado || 0,
      estoqueDisponivel: item.estoqueDisponivel || 0,

      // Dimensões e Peso
      pesoLiquido: item.pesoLiquido || 0,
      pesoBruto: item.pesoBruto || 0,
      altura: item.altura || 0,
      largura: item.largura || 0,
      profundidade: item.profundidade || 0,

      // Documentação e Links
      documentacaoLinks: item.documentacaoLinks || {
        linksDocumentacao: [],
        arquivosLocais: []
      },

      // Logística e Comercial
      diasGarantia: item.diasGarantia || 0,
      leadtimeRessuprimento: item.leadtimeRessuprimento || 0,
      diasCrossdocking: item.diasCrossdocking || 0,
      cupomFiscalPDV: item.cupomFiscalPDV || false,
      marketplace: item.marketplace || false,
      tipoItemBlocoK: item.tipoItemBlocoK || '',
      origemMercadoria: item.origemMercadoria || '',

      // Auditoria
      inclusao: item.inclusao || new Date(),
      ultimaAlteracao: item.ultimaAlteracao || new Date(),
      incluidoPor: item.incluidoPor || 'Sistema',
      alteradoPor: item.alteradoPor || 'Sistema'
    }));
    setProducts(formattedProducts);
  }, []);

  // Reset state when no module is selected
  useEffect(() => {
    if (!activeModule) {
      setActiveSubModule('');
      setSearchTerm('');
    }
  }, [activeModule]);

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
      // Only reset selection if we're collapsing the currently active module
      if (activeModule === module && !activeSubModule) {
        setActiveModule('');
        setActiveSubModule('');
      }
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const handleModuleSelect = (module: string, subModule: string) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
    setSearchTerm(''); // Reset search when changing modules
  };

  const handleCloseSidebar = () => {
    setActiveModule('');
    setActiveSubModule('');
    setExpandedModules([]);
    setSearchTerm('');
  };

  const getModalFields = (module: string, subModule: string) => {
    const configs: Record<string, any> = {
      'categorias-categorias': {
        title: 'Cadastro de Categoria',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true },
          { key: 'descricao', label: 'Descrição', type: 'textarea' },
          { key: 'tipo', label: 'Tipo', type: 'select', options: [
            { value: 'produtos', label: 'Produtos' },
            { value: 'servicos', label: 'Serviços' }
          ]},
          { key: 'ativo', label: 'Ativo', type: 'select', options: [
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' }
          ]}
        ]
      },
      'prazos_pagamento-prazos_pagamento': {
        title: 'Cadastro de Prazo de Pagamento',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true },
          { key: 'dias', label: 'Dias', type: 'number', required: true },
          { key: 'descricao', label: 'Descrição', type: 'textarea' },
          { key: 'ativo', label: 'Ativo', type: 'select', options: [
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' }
          ]}
        ]
      },
      'produtos-tabela_preco': {
        title: 'Cadastro de Tabela de Preço',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true },
          { key: 'descricao', label: 'Descrição', type: 'textarea' },
          { key: 'margem', label: 'Margem (%)', type: 'text' },
          { key: 'ativa', label: 'Ativa', type: 'select', options: [
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' }
          ]}
        ]
      },
      'produtos-kits': {
        title: 'Cadastro de Kit',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true },
          { key: 'codigo', label: 'Código', type: 'text', required: true },
          { key: 'produtos_inclusos', label: 'Produtos Inclusos', type: 'number' },
          { key: 'valor_total', label: 'Valor Total', type: 'number' }
        ]
      },
      'estoque-estoque': {
        title: 'Cadastro de Local de Estoque',
        fields: [
          { key: 'empresa_id', label: 'CNPJ da Empresa', type: 'text', required: true },
          { key: 'nome_fantasia', label: 'Nome da Unidade', type: 'text', required: true },
          { key: 'deposito_id', label: 'ID do Depósito', type: 'text', required: true },
          { key: 'local_fisico', label: 'Local Físico', type: 'text', required: true }
        ]
      }
    };

    return configs[`${module}-${subModule}`];
  };

  const handleNewRecord = () => {
    if (activeModule === 'produtos' && activeSubModule === 'produtos') {
      setEditingProduct(null);
      setShowProductForm(true);
    } else if (activeModule === 'servicos' && activeSubModule === 'servicos') {
      setShowServiceModal(true);
    } else if (activeModule === 'usuarios' && activeSubModule === 'usuarios') {
      setShowUserModal(true);
    } else if (activeModule === 'entidades' && activeSubModule === 'entidades') {
      setShowEntidadeModal(true);
    } else if (activeModule === 'contas_bancarias' && activeSubModule === 'contas_bancarias') {
      setShowContaBancariaModal(true);
    } else {
      const config = getModalFields(activeModule, activeSubModule);
      if (config) {
        setGenericModalConfig(config);
        setShowGenericModal(true);
      }
    }
  };

  const handleGetStarted = () => {
    setActiveModule('produtos');
    setActiveSubModule('produtos');
    setExpandedModules(['produtos']);
  };

  // Product-specific handlers
  const handleSaveProduct = (productData: ProductRegistrationData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.codigo === editingProduct.codigo ? productData : p
      ));
      toast({
        title: "Produto atualizado",
        description: `O produto ${productData.codigo} foi atualizado com sucesso.`,
      });
    } else {
      // Add new product
      setProducts(prev => [...prev, productData]);
      toast({
        title: "Produto cadastrado",
        description: `O produto ${productData.codigo} foi cadastrado com sucesso.`,
      });
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: ProductRegistrationData) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleViewProduct = (product: ProductRegistrationData) => {
    // For now, just edit the product (can be extended to a view-only modal later)
    handleEditProduct(product);
  };

  const handleDeleteProduct = (productCode: string) => {
    setProducts(prev => prev.filter(p => p.codigo !== productCode));
    toast({
      title: "Produto removido",
      description: `O produto ${productCode} foi removido com sucesso.`,
    });
  };

  const currentSubModule = activeModule && activeSubModule ? 
    modules[activeModule as keyof typeof modules]?.subModules[activeSubModule] : null;

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50">
        <CadastroSidebar
          activeModule={activeModule}
          activeSubModule={activeSubModule}
          expandedModules={expandedModules}
          onModuleToggle={toggleModule}
          onModuleSelect={handleModuleSelect}
          onClose={handleCloseSidebar}
        />

        <div className="flex-1 flex flex-col min-h-0">
          {activeSubModule && currentSubModule ? (
            <>
              <ContentHeader
                title={currentSubModule.name}
                description={`Gerencie os registros de ${currentSubModule.name.toLowerCase()}`}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onNewRecord={handleNewRecord}
              />

              <div className="flex-1 p-6 min-h-0">
                {/* Show custom product table for products module */}
                {activeModule === 'produtos' && activeSubModule === 'produtos' ? (
                  <ProductListingTable 
                    products={filteredProducts}
                    onEdit={handleEditProduct}
                    onView={handleViewProduct}
                    onDelete={handleDeleteProduct}
                  />
                ) : (
                  <DataTable 
                    data={currentSubModule.data} 
                    moduleName={currentSubModule.name}
                  />
                )}
              </div>
            </>
          ) : (
            <EmptyState onGetStarted={handleGetStarted} />
          )}
        </div>
      </div>

      {/* Product Registration Form */}
      <ProductRegistrationForm
        isOpen={showProductForm}
        product={editingProduct}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      {showServiceModal && (
        <ServiceModal onClose={() => setShowServiceModal(false)} />
      )}

      <UserModal 
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)} 
      />

      {showEntidadeModal && (
        <EntidadeModal onClose={() => setShowEntidadeModal(false)} />
      )}

      {showContaBancariaModal && (
        <ContaBancariaModal onClose={() => setShowContaBancariaModal(false)} />
      )}

      {showGenericModal && genericModalConfig && (
        <GenericModal 
          title={genericModalConfig.title}
          fields={genericModalConfig.fields}
          onClose={() => {
            setShowGenericModal(false);
            setGenericModalConfig(null);
          }} 
        />
      )}
    </SidebarLayout>
  );
};

export default Cadastro;
