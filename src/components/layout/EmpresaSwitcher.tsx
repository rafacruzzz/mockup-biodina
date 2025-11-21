import { Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { Badge } from "@/components/ui/badge";

const EmpresaSwitcher = () => {
  const { empresaAtual, filialAtual, filiais, trocarFilial, isPrincipal } = useEmpresa();

  if (!empresaAtual) return null;

  const nomeAtual = filialAtual ? filialAtual.nome : empresaAtual.nome;
  const tipoConta = isPrincipal ? "Principal" : "Filial";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Building2 className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{nomeAtual}</span>
            <span className="text-xs text-muted-foreground">{tipoConta}</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Trocar Empresa</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Empresa Principal */}
        <DropdownMenuItem
          onClick={() => trocarFilial(null)}
          className={!filialAtual ? "bg-accent" : ""}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{empresaAtual.nome}</span>
            </div>
            <Badge variant="outline">Principal</Badge>
          </div>
        </DropdownMenuItem>

        {/* Filiais */}
        {filiais.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Filiais
            </DropdownMenuLabel>
            {filiais.map((filial) => (
              <DropdownMenuItem
                key={filial.id}
                onClick={() => trocarFilial(filial.id)}
                className={filialAtual?.id === filial.id ? "bg-accent" : ""}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{filial.nome}</span>
                  </div>
                  {filial.status === 'suspensa' && (
                    <Badge variant="destructive" className="text-xs">
                      Suspensa
                    </Badge>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {filiais.length === 0 && (
          <div className="px-2 py-3 text-sm text-muted-foreground text-center">
            Nenhuma filial cadastrada
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmpresaSwitcher;
