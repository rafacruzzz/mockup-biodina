import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Building2, Eye } from "lucide-react";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface EmpresaVisivel {
  id: string;
  tipo: 'principal' | 'filial';
  nome: string;
}

interface EmpresasVisiveisProps {
  empresasVisiveis: EmpresaVisivel[];
  onEmpresasChange: (empresas: EmpresaVisivel[]) => void;
  todasEmpresas?: boolean;
  onTodasEmpresasChange?: (todas: boolean) => void;
}

export const EmpresasVisiveis = ({
  empresasVisiveis,
  onEmpresasChange,
  todasEmpresas = false,
  onTodasEmpresasChange,
}: EmpresasVisiveisProps) => {
  const { empresaAtual, filiais } = useEmpresa();

  const toggleTodasEmpresas = (checked: boolean) => {
    if (onTodasEmpresasChange) {
      onTodasEmpresasChange(checked);
    }
    
    if (checked && empresaAtual) {
      // Selecionar todas as empresas
      const todasEmpresasLista: EmpresaVisivel[] = [
        { id: empresaAtual.id, tipo: 'principal', nome: empresaAtual.nome },
        ...filiais.map(f => ({ id: f.id, tipo: 'filial' as const, nome: f.nome }))
      ];
      onEmpresasChange(todasEmpresasLista);
    }
  };

  const toggleEmpresaPrincipal = (checked: boolean) => {
    if (onTodasEmpresasChange) {
      onTodasEmpresasChange(false);
    }
    
    if (checked && empresaAtual) {
      onEmpresasChange([
        ...empresasVisiveis,
        { id: empresaAtual.id, tipo: 'principal', nome: empresaAtual.nome },
      ]);
    } else {
      onEmpresasChange(empresasVisiveis.filter(e => e.tipo !== 'principal'));
    }
  };

  const toggleFilial = (filialId: string, checked: boolean) => {
    if (onTodasEmpresasChange) {
      onTodasEmpresasChange(false);
    }
    
    if (checked) {
      const filial = filiais.find(f => f.id === filialId);
      if (filial) {
        onEmpresasChange([
          ...empresasVisiveis,
          { id: filial.id, tipo: 'filial', nome: filial.nome },
        ]);
      }
    } else {
      onEmpresasChange(empresasVisiveis.filter(e => e.id !== filialId));
    }
  };

  const isEmpresaPrincipalVisivel = () => {
    return empresasVisiveis.some(e => e.tipo === 'principal');
  };

  const isFilialVisivel = (filialId: string) => {
    return empresasVisiveis.some(e => e.id === filialId);
  };

  // Guard: se não há empresa principal, não renderiza nada
  if (!empresaAtual) {
    return null;
  }

  const totalEmpresas = 1 + filiais.length;
  const empresasSelecionadas = empresasVisiveis.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Eye className="h-4 w-4" />
          Visibilidade por Empresa
          <Badge variant="outline" className="ml-auto">
            {todasEmpresas ? 'Todas' : `${empresasSelecionadas}/${totalEmpresas}`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toggle "Todas as Empresas" */}
        <div className="flex items-center space-x-2 p-3 rounded-lg border bg-muted/30">
          <Checkbox
            id="todas-empresas"
            checked={todasEmpresas}
            onCheckedChange={toggleTodasEmpresas}
          />
          <Label htmlFor="todas-empresas" className="font-medium cursor-pointer">
            Visível para todas as empresas
          </Label>
        </div>

        {!todasEmpresas && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Empresa Principal */}
            <div className={`flex items-center gap-3 p-3 rounded-lg border ${isEmpresaPrincipalVisivel() ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/5'} transition-colors`}>
              <Switch 
                checked={isEmpresaPrincipalVisivel()} 
                onCheckedChange={toggleEmpresaPrincipal}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{empresaAtual.nome}</span>
                  <Badge variant="default" className="text-xs">Principal</Badge>
                </div>
              </div>
            </div>
            
            {/* Filiais */}
            {filiais.map(filial => (
              <div
                key={filial.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${isFilialVisivel(filial.id) ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/5'} transition-colors`}
              >
                <Switch 
                  checked={isFilialVisivel(filial.id)} 
                  onCheckedChange={(checked) => toggleFilial(filial.id, checked)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{filial.nome}</span>
                    <Badge variant="secondary" className="text-xs">Filial</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!todasEmpresas && empresasVisiveis.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            Selecione pelo menos uma empresa para este cadastro.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmpresasVisiveis;
