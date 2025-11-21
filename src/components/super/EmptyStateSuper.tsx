import { Building2 } from "lucide-react";

export const EmptyStateSuper = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-4">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <Building2 className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Módulo SUPER</h2>
      <p className="text-muted-foreground max-w-md">
        Selecione um módulo no menu lateral para começar a gerenciar o sistema.
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        Comece por <span className="font-semibold text-primary">Empresas → Gestão de Empresas</span>
      </p>
    </div>
  );
};
