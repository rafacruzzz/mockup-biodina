
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComercialSidebar from "@/components/comercial/ComercialSidebar";
import { Package } from "lucide-react";

const Comercial = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col h-full p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-biodina-blue mb-2">Comercial</h1>
          <p className="text-gray-600">Gestão completa do processo comercial</p>
        </div>

        <div className="flex flex-1">
          {/* Sidebar dos módulos */}
          <ComercialSidebar />

          {/* Conteúdo principal */}
          <div className="flex-1 ml-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Selecione um módulo</h3>
                <p className="text-gray-500">Escolha um módulo no menu lateral para começar a gerenciar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Comercial;
