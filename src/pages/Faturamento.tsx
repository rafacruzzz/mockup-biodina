import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import FaturamentoSidebar from "@/components/faturamento/FaturamentoSidebar";
import DashboardRelatorios from "@/components/faturamento/DashboardRelatorios";
import EntradaFaturamento from "@/components/faturamento/EntradaFaturamento";
import SaidaFaturamento from "@/components/faturamento/SaidaFaturamento";
import ServicosFaturamento from "@/components/faturamento/ServicosFaturamento";

const Faturamento = () => {
  const [activeModule, setActiveModule] = useState('dashboard-relatorios');

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard-relatorios':
        return <DashboardRelatorios />;
      case 'entrada':
        return <EntradaFaturamento />;
      case 'saida':
        return <SaidaFaturamento />;
      case 'servicos':
        return <ServicosFaturamento />;
      default:
        return <DashboardRelatorios />;
    }
  };

  return (
    <SidebarLayout>
      <div className="flex h-screen bg-gray-50">
        <FaturamentoSidebar 
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Faturamento;