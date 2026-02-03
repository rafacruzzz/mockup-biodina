import SidebarLayout from "@/components/SidebarLayout";
import { useState } from "react";
import { Settings, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import PerfilEmpresaContent from "@/components/configuracao/PerfilEmpresaContent";

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Configuracao = () => {
  const [activeModule, setActiveModule] = useState("perfil_empresa");

  const subMenuItems: SubMenuItem[] = [
    { id: "perfil_empresa", label: "Perfil da Empresa", icon: <Building2 size={18} /> },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case "perfil_empresa":
        return <PerfilEmpresaContent />;
      default:
        return <PerfilEmpresaContent />;
    }
  };

  return (
    <SidebarLayout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar do módulo */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-6 w-6 text-biodina-blue" />
            <h2 className="text-lg font-semibold text-biodina-blue">Configuração</h2>
          </div>
          
          <nav className="space-y-1">
            {subMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeModule === item.id
                    ? "bg-biodina-blue text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
          {renderContent()}
        </main>
      </div>
    </SidebarLayout>
  );
};

export default Configuracao;
