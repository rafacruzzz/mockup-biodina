import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { RHSidebar } from "@/components/rh/RHSidebar";
import { ProcessoSeletivoProvider } from "@/contexts/ProcessoSeletivoContext";
import { ColaboradorProvider } from "@/contexts/ColaboradorContext";
import Dashboard from "@/components/rh/Dashboard";
import ProcessoSeletivoKanban from "@/components/rh/ProcessoSeletivoKanban";
import Admissao from "@/components/rh/Admissao";
import Colaboradores from "@/components/rh/Colaboradores";

const RH = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "processo-seletivo":
        return <ProcessoSeletivoKanban />;
      case "admissao":
        return <Admissao />;
      case "colaboradores":
        return <Colaboradores />;
      default:
        return <div>Módulo não encontrado</div>;
    }
  };

  return (
    <ProcessoSeletivoProvider>
      <ColaboradorProvider>
        <SidebarLayout sidebar={<RHSidebar activeModule={activeModule} setActiveModule={setActiveModule} />}>
          <div className="p-6">
            {renderContent()}
          </div>
        </SidebarLayout>
      </ColaboradorProvider>
    </ProcessoSeletivoProvider>
  );
};

export default RH;
