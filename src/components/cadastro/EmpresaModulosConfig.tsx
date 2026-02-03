import { useState } from "react";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ModuleAccessTree from "./ModuleAccessTree";
import { EmpresaVinculada, ModuloUsuario } from "@/types/permissions";

interface EmpresaModulosConfigProps {
  empresa: EmpresaVinculada;
  modulosDisponiveisEmpresa: string[]; // Keys dos módulos habilitados na empresa/filial
  onModuleChange: (empresaId: string, modules: ModuloUsuario[]) => void;
}

const EmpresaModulosConfig = ({
  empresa,
  modulosDisponiveisEmpresa,
  onModuleChange,
}: EmpresaModulosConfigProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Contar módulos habilitados
  const countModulosHabilitados = (): number => {
    if (!empresa.moduleAccess) return 0;
    return empresa.moduleAccess.filter(m => 
      m.habilitado && m.subModulos?.some(s => s.habilitado)
    ).length;
  };

  const modulosCount = countModulosHabilitados();

  const handleModuleChange = (modules: ModuloUsuario[]) => {
    onModuleChange(empresa.id, modules);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-xs h-8 px-2 hover:bg-primary/5"
        >
          <span className="flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            Configurar Módulos
          </span>
          <span className="flex items-center gap-2">
            {modulosCount > 0 && (
              <Badge variant="secondary" className="text-xs h-5">
                {modulosCount} módulos
              </Badge>
            )}
            {isOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </span>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2 border-t pt-3">
        <div className="text-xs text-muted-foreground mb-3">
          Defina os módulos e permissões para <strong>{empresa.nome}</strong>
        </div>
        <ModuleAccessTree
          modules={empresa.moduleAccess || []}
          onModuleChange={handleModuleChange}
          modulosDisponiveis={modulosDisponiveisEmpresa}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default EmpresaModulosConfig;
