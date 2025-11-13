import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Menu, X, Home, Users, Settings, 
  BarChart2, FileText, Database, 
  ShoppingCart, DollarSign, Briefcase, 
  Package, Calculator, UserCheck, Cpu, Crown
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserProfileMenu from "@/components/UserProfileMenu";
import FloatingChat from "@/components/chat/FloatingChat";
import { useEmpresa } from "@/contexts/EmpresaContext";

interface NavOverrides {
  order?: string[];
  labels?: Record<string, string>;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  navOverrides?: NavOverrides;
}

const SidebarLayout = ({ children, navOverrides }: SidebarLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { empresaAtual, isMasterUser, modulosDisponiveis } = useEmpresa();

  const defaultMenuItems = [
    // { name: "Aplicativos", path: "/home", icon: <Home size={20} />, id: "aplicativos" }, // Escondido temporariamente
    // { name: "SUPER", path: "/super", icon: <Crown size={20} />, id: "super" }, // Temporariamente escondido
    { name: "Pessoal", path: "/pessoal", icon: <Users size={20} />, id: "pessoal" },
    { name: "BI", path: "/bi-geral", icon: <BarChart2 size={20} />, id: "bi" },
    { name: "Cadastro", path: "/cadastro", icon: <FileText size={20} />, id: "cadastro" },
    { name: "Administrativo", path: "/administrativo", icon: <Database size={20} />, id: "administrativo" },
    { name: "Comercial", path: "/comercial", icon: <Briefcase size={20} />, id: "comercial" },
    { name: "Estoque", path: "/estoque", icon: <Package size={20} />, id: "estoque" },
    { name: "CPR (Compras para Revenda)", path: "/compras", icon: <ShoppingCart size={20} />, id: "compras" },
    { name: "Financeiro", path: "/financeiro", icon: <DollarSign size={20} />, id: "financeiro" },
    { name: "Contabilidade", path: "/contabilidade", icon: <Calculator size={20} />, id: "contabilidade" },
    { name: "RH", path: "/rh", icon: <UserCheck size={20} />, id: "rh" },
    { name: "TI", path: "/ti", icon: <Cpu size={20} />, id: "ti" },
    { name: "Solicitações", path: "/solicitacoes", icon: <FileText size={20} />, id: "solicitacoes" },
    { name: "Personalizar Navegação", path: "/personalizar-navegacao", icon: <Settings size={20} />, id: "personalizar-navegacao" },
  ];

  // Apply navigation overrides if provided
  const getMenuItems = () => {
    if (!navOverrides) return defaultMenuItems;

    // Keep "Solicitações" and "Personalizar Navegação" as fixed items
    const solicitacoes = defaultMenuItems.find(item => item.id === "solicitacoes");
    const personalizar = defaultMenuItems.find(item => item.id === "personalizar-navegacao");
    
    // Get the module items (excluding fixed items)
    const moduleItems = defaultMenuItems.filter(item => 
      item.id !== "solicitacoes" && 
      item.id !== "personalizar-navegacao"
    );

    // Reorder according to navOverrides.order if provided
    let orderedModuleItems = moduleItems;
    if (navOverrides.order) {
      orderedModuleItems = navOverrides.order
        .map(id => moduleItems.find(item => item.id === id))
        .filter(Boolean) as typeof moduleItems;
    }

    // Apply label overrides if provided
    if (navOverrides.labels) {
      orderedModuleItems = orderedModuleItems.map(item => ({
        ...item,
        name: navOverrides.labels![item.id] || item.name
      }));
    }

    return [
      ...orderedModuleItems,
      solicitacoes!,
      personalizar!
    ];
  };

  const menuItems = getMenuItems().filter(item => {
    // Sempre mostrar: Solicitações, Personalizar
    if (['solicitacoes', 'personalizar-navegacao'].includes(item.id)) {
      return true;
    }
    // SUPER apenas para Master
    if (item.id === 'super') {
      return isMasterUser;
    }
    // Outros módulos: verificar se empresa tem acesso
    return modulosDisponiveis.includes(item.id as any);
  });

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-white border-r border-gray-200/80 transition-all duration-300 ease-in-out shadow-sm",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
          <div className={cn("flex items-center", !isSidebarOpen && "justify-center w-full")}>
            <span className={cn("text-xl font-bold text-biodina-blue", !isSidebarOpen && "hidden")}>
              {empresaAtual?.nome || 'iMuv'}
            </span>
            <span className={cn("text-sm text-biodina-gold ml-2", !isSidebarOpen && "hidden")}>
              Sistemas
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-gray-400 hover:text-biodina-blue p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        <div className="py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-200",
                    location.pathname === item.path && "bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md hover:from-biodina-blue/90 hover:to-biodina-blue/80",
                    location.pathname !== item.path && "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100",
                    !isSidebarOpen && "justify-center"
                  )}
                >
                  <span className={cn(
                    "text-gray-500", 
                    location.pathname === item.path && "text-white"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn("ml-3 whitespace-nowrap", !isSidebarOpen && "hidden")}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out bg-gray-50/50", 
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <header className="bg-white h-16 shadow-sm flex items-center px-6 border-b border-gray-100">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-biodina-blue p-2 lg:hidden rounded-lg hover:bg-gray-50"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold text-biodina-blue ml-4">iMuv Sistemas</h2>
            
            {/* User Profile Menu */}
            <div className="ml-auto flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-600 hover:text-biodina-blue rounded-lg hover:bg-gray-50 transition-colors"
                title="Fechar menu"
              >
                <X size={20} />
              </button>
              <UserProfileMenu />
            </div>
          </div>
        </header>
        
        <main className="bg-gray-50/50 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>

      {/* Chat Flutuante */}
      <FloatingChat />
    </div>
  );
};

export default SidebarLayout;
