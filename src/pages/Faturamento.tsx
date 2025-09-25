import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import FaturamentoSidebar from "@/components/faturamento/FaturamentoSidebar";
import FaturamentoDashboard from "@/components/faturamento/FaturamentoDashboard";
import EntradaFaturamento from "@/components/faturamento/EntradaFaturamento";
import SaidaFaturamento from "@/components/faturamento/SaidaFaturamento";
import DevolucaoFaturamento from "@/components/faturamento/DevolucaoFaturamento";
import CancelamentoFaturamento from "@/components/faturamento/CancelamentoFaturamento";
import ServicosFaturamento from "@/components/faturamento/ServicosFaturamento";
import RelatoriosFaturamento from "@/components/faturamento/RelatoriosFaturamento";

const Faturamento = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <FaturamentoDashboard />;
      case 'entrada':
        return <EntradaFaturamento />;
      case 'saida':
        return <SaidaFaturamento />;
      case 'devolucao':
        return <DevolucaoFaturamento />;
      case 'cancelamento':
        return <CancelamentoFaturamento />;
      case 'servicos':
        return <ServicosFaturamento />;
      case 'relatorios':
        return <RelatoriosFaturamento />;
      default:
        return <FaturamentoDashboard />;
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