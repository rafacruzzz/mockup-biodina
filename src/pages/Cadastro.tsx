import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ProductForm from "@/components/ProductForm";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import ServiceModal from "@/components/cadastro/ServiceModal";
import UserModal from "@/components/cadastro/UserModal";
import GenericModal from "@/components/cadastro/GenericModal";
import EntidadeModal from "@/components/cadastro/EntidadeModal";
import { modules } from "@/data/cadastroModules";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showGenericModal, setShowGenericModal] = useState(false);
  const [showEntidadeModal, setShowEntidadeModal] = useState(false);
  const [genericModalConfig, setGenericModalConfig] = useState<any>(null);

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
      'contas_bancarias-contas_bancarias': {
        title: 'Cadastro de Conta Bancária',
        fields: [
          { key: 'banco', label: 'Banco', type: 'text', required: true },
          { key: 'agencia', label: 'Agência', type: 'text', required: true },
          { key: 'conta', label: 'Conta', type: 'text', required: true },
          { key: 'tipo', label: 'Tipo', type: 'select', options: [
            { value: 'conta_corrente', label: 'Conta Corrente' },
            { value: 'conta_poupanca', label: 'Conta Poupança' }
          ]},
          { key: 'ativo', label: 'Ativo', type: 'select', options: [
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' }
          ]}
        ]
      },
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
      setShowProductForm(true);
    } else if (activeModule === 'servicos' && activeSubModule === 'servicos') {
      setShowServiceModal(true);
    } else if (activeModule === 'usuarios' && activeSubModule === 'usuarios') {
      setShowUserModal(true);
    } else if (activeModule === 'entidades' && activeSubModule === 'entidades') {
      setShowEntidadeModal(true);
    } else {
      const config = getModalFields(activeModule, activeSubModule);
      if (config) {
        setGenericModalConfig(config);
        setShowGenericModal(true);
      }
    }
  };

  const handleGetStarted = () => {
    setActiveModule('entidades');
    setActiveSubModule('entidades');
    setExpandedModules(['entidades']);
  };

  const currentSubModule = activeModule && activeSubModule ? 
    modules[activeModule as keyof typeof modules]?.subModules[activeSubModule] : null;

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
                <DataTable 
                  data={currentSubModule.data} 
                  moduleName={currentSubModule.name}
                />
              </div>
            </>
          ) : (
            <EmptyState onGetStarted={handleGetStarted} />
          )}
        </div>
      </div>

      {showProductForm && (
        <ProductForm onClose={() => setShowProductForm(false)} />
      )}

      {showServiceModal && (
        <ServiceModal onClose={() => setShowServiceModal(false)} />
      )}

      {showUserModal && (
        <UserModal onClose={() => setShowUserModal(false)} />
      )}

      {showEntidadeModal && (
        <EntidadeModal onClose={() => setShowEntidadeModal(false)} />
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
