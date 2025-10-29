import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContentHeader from "@/components/cadastro/ContentHeader";
import DataTable from "@/components/cadastro/DataTable";
import EmptyState from "@/components/cadastro/EmptyState";
import ProductRegistrationForm from "@/components/product/ProductRegistrationForm";
import EntidadeModal from "@/components/cadastro/EntidadeModal";
import UserModal from "@/components/cadastro/UserModal";
import ColaboradorModal from "@/components/rh/ColaboradorModal";
import ServiceModal from "@/components/cadastro/ServiceModal";
import ContaBancariaModal from "@/components/cadastro/ContaBancariaModal";
import GenericModal from "@/components/cadastro/GenericModal";
import { RegistroAnvisaModal } from "@/components/cadastro/RegistroAnvisaModal";
import ProdutoUsoConsumoModal from "@/components/cadastro/ProdutoUsoConsumoModal";
import { modules } from "@/data/cadastroModules";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Estados dos modais
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEntidadeModalOpen, setIsEntidadeModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isColaboradorModalOpen, setIsColaboradorModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isContaBancariaModalOpen, setIsContaBancariaModalOpen] = useState(false);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isRegistroAnvisaModalOpen, setIsRegistroAnvisaModalOpen] = useState(false);
  const [isProdutoUsoConsumoModalOpen, setIsProdutoUsoConsumoModalOpen] = useState(false);

  // Estado para tipo de entidade
  const [currentEntidadeType, setCurrentEntidadeType] = useState<string>('');

  // Estados para modo edição
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingColaboradorId, setEditingColaboradorId] = useState<string | null>(null);
  const [editingColaboradorData, setEditingColaboradorData] = useState<any>(null);

  // Reset state when no module is selected
  const resetSelection = () => {
    setActiveModule('');
    setActiveSubModule('');
    setSearchTerm('');
  };

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
      if (activeModule === module && !activeSubModule) {
        resetSelection();
      }
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const handleModuleSelect = (module: string, subModule: string) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
    setSearchTerm('');
  };

  const handleCloseSidebar = () => {
    setExpandedModules([]);
    resetSelection();
  };

  const handleNewRecord = () => {
    if (activeModule === 'produtos' && activeSubModule === 'produtos') {
      setIsProductModalOpen(true);
    } else if (activeModule === 'produtos' && activeSubModule === 'uso_consumo') {
      setIsProdutoUsoConsumoModalOpen(true);
    } else if (activeModule === 'entidades') {
      setCurrentEntidadeType(activeSubModule);
      setIsEntidadeModalOpen(true);
    } else if (activeModule === 'usuarios' && activeSubModule === 'colaboradores') {
      // Open ColaboradorModal for new user creation
      setIsEditMode(false);
      setEditingColaboradorId(null);
      setEditingColaboradorData(null);
      setIsColaboradorModalOpen(true);
    } else if (activeModule === 'usuarios' && activeSubModule === 'usuarios') {
      setIsUserModalOpen(true);
    } else if (activeModule === 'servicos') {
      setIsServiceModalOpen(true);
    } else if (activeModule === 'contas_bancarias') {
      setIsContaBancariaModalOpen(true);
    } else if (activeModule === 'registros_anvisa') {
      setIsRegistroAnvisaModalOpen(true);
    } else {
      setIsGenericModalOpen(true);
    }
  };

  const handleEditItem = (item: any, moduleName: string) => {
    if (activeModule === 'usuarios' && (activeSubModule === 'colaboradores' || activeSubModule === 'usuarios')) {
      setIsEditMode(true);
      setEditingColaboradorId(String(item.id));
      
      const colaboradorCompleto = {
        dadosPessoais: {
          nome: item.nome || '',
          cpf: item.cpf || '',
          pis: item.pis || '',
          idade: item.idade || '',
          dataNascimento: item.dataNascimento || '',
          genero: item.genero || '',
          etnia: item.etnia || '',
          rg: item.rg || '',
          orgaoExpedidorRg: item.orgaoExpedidorRg || '',
          ufEmissorRg: item.ufEmissorRg || '',
          dataExpedicaoRg: item.dataExpedicaoRg || '',
          naturalidade: item.naturalidade || '',
          nomeMae: item.nomeMae || '',
          nomePai: item.nomePai || '',
          cid: item.cid || '',
          email: item.email || '',
          telefone: item.telefone || '',
          endereco: item.endereco || '',
          bairro: item.bairro || '',
          observacoes: item.observacoes || ''
        },
        dadosProfissionais: {
          empresa: item.empresa || '',
          uf: item.uf || '',
          setor: item.setor || '',
          funcao: item.funcao || '',
          cargo: item.cargo || '',
          nivel: item.nivel || '',
          cbo: item.cbo || '',
          compativelFuncao: item.compativelFuncao || false,
          funcoesDesempenhadas: item.funcoesDesempenhadas || '',
          dataAdmissao: item.dataAdmissao || '',
          dataCadastro: item.dataCadastro || '',
          tempoCasa: item.tempoCasa || '',
          ultimaPromocao: item.ultimaPromocao || '',
          previsaoFerias: item.previsaoFerias || ''
        },
        dadosFinanceiros: {
          salarioBase: item.salarioBase || '',
          adicionalNivel: item.adicionalNivel || '',
          insalubridade: item.insalubridade || '',
          sobreaviso: item.sobreaviso || '',
          salarioBruto: item.salarioBruto || '',
          valorHoraTrabalhada: item.valorHoraTrabalhada || '',
          pisoSalarial: item.pisoSalarial || '',
          mediaSalarial: item.mediaSalarial || '',
          dependentesIR: item.dependentesIR || ''
        },
        dadosBancarios: {
          banco: item.banco || '',
          tipoConta: item.tipoConta || '',
          agencia: item.agencia || '',
          conta: item.conta || ''
        },
        formacaoEscolaridade: {
          escolaridade: item.escolaridade || '',
          possuiDiploma: item.possuiDiploma || false
        },
        beneficios: {
          tipoPlano: item.tipoPlano || '',
          quantidadeDependentesPlano: item.quantidadeDependentesPlano || ''
        },
        documentacao: {
          anexos: item.anexos || []
        }
      };
      
      setEditingColaboradorData(colaboradorCompleto);
      setIsColaboradorModalOpen(true);
    }
  };

  const handleCloseColaboradorModal = () => {
    setIsColaboradorModalOpen(false);
    setIsEditMode(false);
    setEditingColaboradorId(null);
    setEditingColaboradorData(null);
  };

  const handleProductSave = (productData: any) => {
    console.log('Produto salvo:', productData);
    // TODO: Implementar lógica de salvamento
  };

  const handleGetStarted = () => {
    setActiveModule('entidades');
    setActiveSubModule('entidades');
    setExpandedModules(['entidades']);
  };

  const currentSubModule = activeModule && activeSubModule ? 
    modules[activeModule as keyof typeof modules]?.subModules[activeSubModule] : null;

  // Filter data based on search term
  const filteredData = currentSubModule?.data?.filter((item: any) => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  // Get button text based on active module
  const getButtonText = () => {
    if (activeModule === 'produtos' && activeSubModule === 'produtos') return "Nova Mercadoria para Revenda";
    if (activeModule === 'produtos' && activeSubModule === 'uso_consumo') return "Novo Produto de Uso e Consumo";
    if (activeModule === 'entidades') return "Nova Entidade";
    if (activeModule === 'usuarios' && activeSubModule === 'colaboradores') return "Novo Usuário";
    if (activeModule === 'usuarios' && activeSubModule === 'usuarios') return "Novo Usuário";
    if (activeModule === 'servicos') return "Novo Serviço";
    if (activeModule === 'contas_bancarias') return "Nova Conta";
    if (activeModule === 'registros_anvisa') return "Novo Registro ANVISA";
    return "Novo Registro";
  };

  // Verificar se deve mostrar o botão de novo registro
  const shouldShowNewButton = () => {
    return true;
  };

  // Adicionar listener para eventos de edição
  React.useEffect(() => {
    const handleEditEvent = (event: any) => {
      handleEditItem(event.detail.item, event.detail.moduleName);
    };

    window.addEventListener('editItem', handleEditEvent);
    return () => window.removeEventListener('editItem', handleEditEvent);
  }, [activeModule, activeSubModule]);

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
          {activeSubModule ? (
            <>
              <ContentHeader
                title={currentSubModule?.name || ''}
                description={`Gerencie os registros de ${currentSubModule?.name?.toLowerCase() || ''}`}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onNewRecord={handleNewRecord}
                buttonText={getButtonText()}
                showNewButton={shouldShowNewButton()}
              />

              <div className="flex-1 p-6 min-h-0">
                <DataTable 
                  data={filteredData} 
                  moduleName={currentSubModule?.name || ''}
                />
              </div>
            </>
          ) : (
            <EmptyState onGetStarted={handleGetStarted} />
          )}
        </div>
      </div>

      {/* Modais */}
      <ProductRegistrationForm 
        isOpen={isProductModalOpen} 
        product={null}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleProductSave}
      />
      
      <EntidadeModal 
        isOpen={isEntidadeModalOpen} 
        onClose={() => setIsEntidadeModalOpen(false)}
        tipoEntidade={currentEntidadeType}
      />
      
      <UserModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
      />

      <ColaboradorModal 
        isOpen={isColaboradorModalOpen} 
        onClose={handleCloseColaboradorModal}
        editMode={isEditMode}
        colaboradorId={editingColaboradorId || undefined}
        colaboradorData={editingColaboradorData}
        context="usuario"
      />
      
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
      />
      
      <ContaBancariaModal 
        isOpen={isContaBancariaModalOpen} 
        onClose={() => setIsContaBancariaModalOpen(false)} 
      />
      
      <GenericModal
        isOpen={isGenericModalOpen}
        onClose={() => setIsGenericModalOpen(false)}
        title={`Novo ${currentSubModule?.name || 'Registro'}`}
        moduleName={currentSubModule?.name || ''}
      />

      <RegistroAnvisaModal
        isOpen={isRegistroAnvisaModalOpen}
        onClose={() => setIsRegistroAnvisaModalOpen(false)}
        onSave={(registro) => {
          console.log('Registro ANVISA salvo:', registro);
          setIsRegistroAnvisaModalOpen(false);
        }}
      />

      <ProdutoUsoConsumoModal
        isOpen={isProdutoUsoConsumoModalOpen}
        onClose={() => setIsProdutoUsoConsumoModalOpen(false)}
      />
    </SidebarLayout>
  );
};

export default Cadastro;
