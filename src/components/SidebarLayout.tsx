
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Menu, X, Home, Users, Settings, 
  BarChart2, FileText, Database, 
  ShoppingCart, DollarSign, Briefcase, 
  Package, Calculator, UserCheck, Cpu,
  ChevronDown, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isMenuExpanded = (menuName: string) => expandedMenus.includes(menuName);

  const menuItems = [
    { name: "Aplicativos", path: "/aplicativos", icon: <Home size={20} /> },
    { name: "Pessoal", path: "/pessoal", icon: <Users size={20} /> },
    { name: "BI", path: "/bi-geral", icon: <BarChart2 size={20} /> },
    { name: "Cadastro", path: "/cadastro", icon: <FileText size={20} /> },
    { name: "Controladoria", path: "/controladoria", icon: <Database size={20} /> },
    { name: "Comercial", path: "/comercial", icon: <Briefcase size={20} /> },
    { name: "Estoque", path: "/estoque", icon: <Package size={20} /> },
    { name: "Compras", path: "/compras", icon: <ShoppingCart size={20} /> },
    { name: "Financeiro", path: "/financeiro", icon: <DollarSign size={20} /> },
    { name: "Contabilidade", path: "/contabilidade", icon: <Calculator size={20} /> },
    { name: "RH", path: "/rh", icon: <UserCheck size={20} /> },
    { name: "TI", path: "/ti", icon: <Cpu size={20} /> },
  ];

  const renderMenuItem = (item: any, level = 0) => {
    const isExpanded = isMenuExpanded(item.name);
    const hasPath = item.path;
    const isActive = hasPath && location.pathname === item.path;
    const hasActiveChild = item.subItems?.some((subItem: any) => 
      subItem.path && location.pathname === subItem.path ||
      subItem.subItems?.some((subSubItem: any) => subSubItem.path && location.pathname === subSubItem.path)
    );

    const paddingLeft = level === 0 ? "pl-3" : level === 1 ? "pl-6" : "pl-9";

    return (
      <li key={item.name}>
        {hasPath ? (
          <Link
            to={item.path}
            className={cn(
              "flex items-center p-3 text-sm font-medium rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200",
              paddingLeft,
              isActive && "bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md",
              !isSidebarOpen && "justify-center"
            )}
          >
            <span className={cn(
              "text-gray-500", 
              isActive && "text-white"
            )}>
              {item.icon}
            </span>
            <span className={cn("ml-3 whitespace-nowrap", !isSidebarOpen && "hidden")}>
              {item.name}
            </span>
          </Link>
        ) : (
          <button
            onClick={() => item.isExpandable && toggleMenu(item.name)}
            className={cn(
              "w-full flex items-center p-3 text-sm font-medium rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200",
              paddingLeft,
              (hasActiveChild || isActive) && "bg-gradient-to-r from-biodina-blue to-biodina-blue/90 text-white shadow-md",
              !isSidebarOpen && "justify-center"
            )}
          >
            <span className={cn(
              "text-gray-500", 
              (hasActiveChild || isActive) && "text-white"
            )}>
              {item.icon}
            </span>
            <span className={cn("ml-3 whitespace-nowrap flex-1 text-left", !isSidebarOpen && "hidden")}>
              {item.name}
            </span>
            {item.isExpandable && !isSidebarOpen && (
              <span className="hidden">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            )}
            {item.isExpandable && isSidebarOpen && (
              <span className={cn(
                "text-gray-400",
                (hasActiveChild || isActive) && "text-white"
              )}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            )}
          </button>
        )}
        
        {item.isExpandable && item.subItems && isExpanded && isSidebarOpen && (
          <ul className="mt-1 space-y-1">
            {item.subItems.map((subItem: any) => renderMenuItem(subItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

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
              Biodina
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
            {menuItems.map((item) => renderMenuItem(item))}
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
            <h2 className="text-xl font-semibold text-biodina-blue ml-4">Biodina Sistemas</h2>
            
            <div className="ml-auto flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-600 hover:text-biodina-blue rounded-lg hover:bg-gray-50 transition-colors"
                title="Fechar menu"
              >
                <X size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-biodina-blue rounded-lg hover:bg-gray-50 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>
        
        <main className="bg-gray-50/50 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
