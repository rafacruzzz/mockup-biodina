import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { EmpresaVinculada, ModuloUsuario } from "@/types/permissions";
import { Empresa, Filial } from "@/types/super";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import EmpresaModulosConfig from "./EmpresaModulosConfig";

interface EmpresasDoUsuarioProps {
  empresaPrincipal: Empresa | null;
  filiais: Filial[];
  empresasVinculadas: EmpresaVinculada[];
  onEmpresasChange: (empresas: EmpresaVinculada[]) => void;
}

// Helper para contar módulos habilitados
const countModulosHabilitados = (moduleAccess: ModuloUsuario[] | undefined): number => {
  if (!moduleAccess) return 0;
  return moduleAccess.filter(m => 
    m.habilitado && m.subModulos?.some(s => s.habilitado)
  ).length;
};

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
          moduleAccess: [],
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
            moduleAccess: [],
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

  const handleModuleChange = (empresaId: string, modules: ModuloUsuario[]) => {
    const updatedEmpresas = empresasVinculadas.map(empresa => 
      empresa.id === empresaId 
        ? { ...empresa, moduleAccess: modules }
        : empresa
    );
    onEmpresasChange(updatedEmpresas);
  };

  const isEmpresaPrincipalVinculada = () => {
    return empresasVinculadas.some(e => e.tipo === 'principal');
  };

  const isFilialVinculada = (filialId: string) => {
    return empresasVinculadas.some(e => e.id === filialId);
  };

  // Obter empresa vinculada pelo ID
  const getEmpresaVinculada = (id: string): EmpresaVinculada | undefined => {
    return empresasVinculadas.find(e => e.id === id);
  };

  // Obter módulos disponíveis da empresa/filial
  const getModulosDisponiveis = (id: string, tipo: 'principal' | 'filial'): string[] => {
    if (tipo === 'principal' && empresaPrincipal) {
      return empresaPrincipal.modulosHabilitados || [];
    }
    const filial = filiais.find(f => f.id === id);
    return filial?.modulosHabilitados || [];
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

  const empresaPrincipalVinculada = getEmpresaVinculada(empresaPrincipal.id);
  const modulosPrincipal = countModulosHabilitados(empresaPrincipalVinculada?.moduleAccess);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Empresas e Permissões do Usuário
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

        <p className="text-sm text-muted-foreground mb-4">
          Ative as empresas e configure os módulos e permissões específicos de cada uma.
        </p>

        <div className="space-y-4">
          {/* Empresa Principal */}
          <div className={`p-4 rounded-lg border ${isEmpresaPrincipalVinculada() ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/5'} transition-colors`}>
            <div className="flex items-center gap-3">
              <Switch 
                checked={isEmpresaPrincipalVinculada()} 
                onCheckedChange={toggleEmpresaPrincipal}
                disabled={isEmpresaPrincipalVinculada() && !podeDesmarcarPrincipal}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{empresaPrincipal.nome}</span>
                  <Badge variant="default" className="text-xs">Principal</Badge>
                  {modulosPrincipal > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {modulosPrincipal} módulos
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Configuração de Módulos da Empresa Principal */}
            {isEmpresaPrincipalVinculada() && empresaPrincipalVinculada && (
              <EmpresaModulosConfig
                empresa={empresaPrincipalVinculada}
                modulosDisponiveisEmpresa={getModulosDisponiveis(empresaPrincipal.id, 'principal')}
                onModuleChange={handleModuleChange}
              />
            )}
          </div>
          
          {/* Filiais */}
          {filiais.map(filial => {
            const filialVinculada = getEmpresaVinculada(filial.id);
            const modulosFilial = countModulosHabilitados(filialVinculada?.moduleAccess);
            
            return (
              <div
                key={filial.id}
                className={`p-4 rounded-lg border ${isFilialVinculada(filial.id) ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/5'} transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={isFilialVinculada(filial.id)}
                    onCheckedChange={(checked) => toggleFilial(filial.id, checked)}
                    disabled={isFilialVinculada(filial.id) && !podeDesmarcarFilial(filial.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{filial.nome}</span>
                      <Badge variant="secondary" className="text-xs">Filial</Badge>
                      {modulosFilial > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {modulosFilial} módulos
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {filial.modulosHabilitados.length} módulos disponíveis
                    </div>
                  </div>
                </div>
                
                {/* Configuração de Módulos da Filial */}
                {isFilialVinculada(filial.id) && filialVinculada && (
                  <EmpresaModulosConfig
                    empresa={filialVinculada}
                    modulosDisponiveisEmpresa={getModulosDisponiveis(filial.id, 'filial')}
                    onModuleChange={handleModuleChange}
                  />
                )}
              </div>
            );
          })}
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
