import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { EmpresaVinculada } from "@/types/permissions";
import { Empresa, Filial } from "@/types/super";

interface EmpresasDoUsuarioProps {
  empresaPrincipal: Empresa | null;
  filiais: Filial[];
  empresasVinculadas: EmpresaVinculada[];
  onEmpresasChange: (empresas: EmpresaVinculada[]) => void;
}

export const EmpresasDoUsuario = ({
  empresaPrincipal,
  filiais,
  empresasVinculadas,
  onEmpresasChange,
}: EmpresasDoUsuarioProps) => {
  const toggleFilial = (filialId: string, checked: boolean) => {
    if (checked) {
      const filial = filiais.find(f => f.id === filialId);
      if (filial) {
        onEmpresasChange([
          ...empresasVinculadas,
          {
            id: filial.id,
            tipo: 'filial',
            nome: filial.nome,
          },
        ]);
      }
    } else {
      onEmpresasChange(
        empresasVinculadas.filter(e => e.id !== filialId)
      );
    }
  };

  const isFilialVinculada = (filialId: string) => {
    return empresasVinculadas.some(e => e.id === filialId);
  };

  // Guard: se não há empresa principal, não renderiza nada
  if (!empresaPrincipal) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Empresas do Usuário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Empresa Principal - sempre ativa */}
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Switch checked={true} disabled />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{empresaPrincipal.nome}</span>
                <Badge variant="default" className="text-xs">Principal</Badge>
              </div>
            </div>
          </div>
          
          {/* Filiais - toggle */}
          {filiais.map(filial => (
            <div
              key={filial.id}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors"
            >
              <Switch
                checked={isFilialVinculada(filial.id)}
                onCheckedChange={(checked) => toggleFilial(filial.id, checked)}
              />
              <div className="flex-1">
                <span className="text-sm font-medium">{filial.nome}</span>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {filial.modulosHabilitados.length} módulos
                </div>
              </div>
            </div>
          ))}
        </div>

        {filiais.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma filial cadastrada
          </p>
        )}
      </CardContent>
    </Card>
  );
};
