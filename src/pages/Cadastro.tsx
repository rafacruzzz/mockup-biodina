
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ProductFormDetailed from "@/components/cadastro/ProductFormDetailed";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import ServiceModal from "@/components/cadastro/ServiceModal";
import UserModal from "@/components/cadastro/UserModal";
import GenericModal from "@/components/cadastro/GenericModal";
import { modules } from "@/data/cadastroModules";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showProductFormDetailed, setShowProductFormDetailed] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showGenericModal, setShowGenericModal] = useState(false);
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

  const getModalFields = (module: string, subModule: string) => {
    const configs: Record<string, any> = {
      'entidades-fornecedores': {
        title: 'Cadastro de Fornecedor',
        fields: [
          { key: 'razao_social', label: 'Razão Social', type: 'text', required: true },
          { key: 'cnpj', label: 'CNPJ', type: 'text', required: true },
          { key: 'contato', label: 'Contato', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'status', label: 'Status', type: 'select', options: [
            { value: 'ativo', label: 'Ativo' },
            { value: 'inativo', label: 'Inativo' }
          ]}
        ]
      },
      'entidades-clientes': {
        title: 'Cadastro de Cliente',
        fields: [
          { key: 'razao_social', label: 'Razão Social', type: 'text', required: true },
          { key: 'cnpj', label: 'CNPJ', type: 'text', required: true },
          { key: 'contato', label: 'Contato', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'tipo', label: 'Tipo', type: 'select', options: [
            { value: 'pessoa_fisica', label: 'Pessoa Física' },
            { value: 'pessoa_juridica', label: 'Pessoa Jurídica' }
          ]},
          { key: 'status', label: 'Status', type: 'select', options: [
            { value: 'ativo', label: 'Ativo' },
            { value: 'inativo', label: 'Inativo' }
          ]}
        ]
      },
      'entidades-leads': {
        title: 'Cadastro de Lead',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true },
          { key: 'contato', label: 'Contato', type: 'text' },
          { key: 'telefone', label: 'Telefone', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'origem', label: 'Origem', type: 'select', options: [
            { value: 'website', label: 'Website' },
            { value: 'indicacao', label: 'Indicação' },
            { value: 'publicidade', label: 'Publicidade' }
          ]},
          { key: 'status', label: 'Status', type: 'select', options: [
            { value: 'novo', label: 'Novo' },
            { value: 'qualificado', label: 'Qualificado' },
            { value: 'convertido', label: 'Convertido' }
          ]},
          { key: 'interesse', label: 'Interesse', type: 'textarea' }
        ]
      },
      'departamentos-departamentos': {
        title: 'Cadastro de Departamento',
        fields: [
          { key: 'nome', label: 'Nome', type: 'text', required: true },
          { key: 'descricao', label: 'Descrição', type: 'textarea' },
          { key: 'responsavel', label: 'Responsável', type: 'text' },
          { key: 'ativo', label: 'Ativo', type: 'select', options: [
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' }
          ]}
        ]
      },
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
      }
    };

    return configs[`${module}-${subModule}`];
  };

  const handleNewRecord = () => {
    if (activeModule === 'produtos' && activeSubModule === 'produtos') {
      setShowProductFormDetailed(true);
    } else if (activeModule === 'servicos' && activeSubModule === 'servicos') {
      setShowServiceModal(true);
    } else if (activeModule === 'usuarios' && activeSubModule === 'usuarios') {
      setShowUserModal(true);
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
    setActiveSubModule('fornecedores');
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

      {showProductFormDetailed && (
        <ProductFormDetailed onClose={() => setShowProductFormDetailed(false)} />
      )}

      {showServiceModal && (
        <ServiceModal onClose={() => setShowServiceModal(false)} />
      )}

      {showUserModal && (
        <UserModal onClose={() => setShowUserModal(false)} />
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
