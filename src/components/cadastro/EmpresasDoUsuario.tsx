import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { EmpresaVinculada } from "@/types/permissions";
import { Empresa, Filial } from "@/types/super";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  
  const toggleEmpresaPrincipal = (checked: boolean) => {
    if (checked && empresaPrincipal) {
      // Adicionar empresa principal
      onEmpresasChange([
        ...empresasVinculadas,
        {
          id: empresaPrincipal.id,
          tipo: 'principal',
          nome: empresaPrincipal.nome,
        },
      ]);
    } else {
      // Remover empresa principal (só se houver pelo menos uma filial)
      const filiaisVinculadas = empresasVinculadas.filter(e => e.tipo === 'filial');
      if (filiaisVinculadas.length > 0) {
        onEmpresasChange(filiaisVinculadas);
      }
    }
  };

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
      // Remover filial (só se restar pelo menos uma empresa)
      const novasEmpresas = empresasVinculadas.filter(e => e.id !== filialId);
      if (novasEmpresas.length > 0) {
        onEmpresasChange(novasEmpresas);
      }
    }
  };

  const isEmpresaPrincipalVinculada = () => {
    return empresasVinculadas.some(e => e.tipo === 'principal');
  };

  const isFilialVinculada = (filialId: string) => {
    return empresasVinculadas.some(e => e.id === filialId);
  };

  // Verificar se pode desmarcar (precisa ter pelo menos uma empresa)
  const podeDesmarcarPrincipal = empresasVinculadas.filter(e => e.tipo === 'filial').length > 0;
  const podeDesmarcarFilial = (filialId: string) => {
    const totalEmpresas = empresasVinculadas.length;
    const estaVinculada = isFilialVinculada(filialId);
    return totalEmpresas > 1 || !estaVinculada;
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
        {empresasVinculadas.length === 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Selecione pelo menos uma empresa para o usuário.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Empresa Principal - agora é toggle editável */}
          <div className={`flex items-center gap-3 p-3 rounded-lg border ${isEmpresaPrincipalVinculada() ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/5'} transition-colors`}>
            <Switch 
              checked={isEmpresaPrincipalVinculada()} 
              onCheckedChange={toggleEmpresaPrincipal}
              disabled={isEmpresaPrincipalVinculada() && !podeDesmarcarPrincipal}
            />
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
              className={`flex items-center gap-3 p-3 rounded-lg border ${isFilialVinculada(filial.id) ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/5'} transition-colors`}
            >
              <Switch
                checked={isFilialVinculada(filial.id)}
                onCheckedChange={(checked) => toggleFilial(filial.id, checked)}
                disabled={isFilialVinculada(filial.id) && !podeDesmarcarFilial(filial.id)}
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
