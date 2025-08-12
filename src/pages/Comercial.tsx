
import { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComercialTabs from "@/components/comercial/components/ComercialTabs";
import OportunidadeForm from "@/components/comercial/OportunidadeForm";
import PedidoForm from "@/components/comercial/PedidoForm";
import AgendaComercial from "@/components/comercial/AgendaComercial";
import ChatInterno from "@/components/comercial/ChatInterno";
import ChamadosTab from "@/components/comercial/ChamadosTab";
import ImportacaoDiretaForm from "@/components/comercial/ImportacaoDiretaForm";
import ContratacaoSimplesForm from "@/components/comercial/ContratacaoSimplesForm";
import { EmprestimosDashboard } from "@/components/comercial/EmprestimosDashboard";

const Comercial = () => {
  const [activeModule, setActiveModule] = useState<string>("oportunidades");

  const handleSave = (data: any) => {
    console.log("Dados salvos:", data);
  };

  const handleClose = () => {
    console.log("Modal fechado");
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "oportunidades":
        return <OportunidadeForm onClose={handleClose} onSave={handleSave} />;
      case "vendas":
        return <PedidoForm onClose={handleClose} onSave={handleSave} />;
      case "pos-venda":
        return <AgendaComercial />;
      case "emprestimos":
        return <EmprestimosDashboard />;
      case "agenda":
        return <AgendaComercial />;
      case "chat":
        return <ChatInterno oportunidadeId="1" />;
      case "chamados":
        return <ChamadosTab chamados={[]} onAdicionarChamado={handleSave} />;
      case "importacao-direta":
        return <ImportacaoDiretaForm isOpen={true} onClose={handleClose} onSave={handleSave} />;
      case "contratacao-simples":
        return <ContratacaoSimplesForm isOpen={true} onClose={handleClose} onSave={handleSave} />;
      default:
        return <OportunidadeForm onClose={handleClose} onSave={handleSave} />;
    }
  };

  return (
    <SidebarLayout>
      <div className="flex h-[calc(100vh-64px)]">
        <ComercialTabs 
          activeModule={activeModule} 
          onModuleChange={setActiveModule} 
        />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {renderModuleContent()}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Comercial;
