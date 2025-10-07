import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ModuloSistema } from "@/types/super";
import { modulosDisponiveis } from "@/data/superModules";
import { Badge } from "@/components/ui/badge";

interface SeletorModulosProps {
  modulosSelecionados: ModuloSistema[];
  onChange: (modulos: ModuloSistema[]) => void;
}

export const SeletorModulos = ({ modulosSelecionados, onChange }: SeletorModulosProps) => {
  const toggleModulo = (moduloId: ModuloSistema) => {
    if (modulosSelecionados.includes(moduloId)) {
      onChange(modulosSelecionados.filter(m => m !== moduloId));
    } else {
      onChange([...modulosSelecionados, moduloId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Selecione os módulos habilitados</h3>
        <Badge variant="outline">
          {modulosSelecionados.length} de {modulosDisponiveis.length} selecionados
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modulosDisponiveis.map((modulo) => {
          const isSelected = modulosSelecionados.includes(modulo.id);
          
          return (
            <div
              key={modulo.id}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border transition-colors
                ${isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
            >
              <Checkbox
                id={modulo.id}
                checked={isSelected}
                onCheckedChange={() => toggleModulo(modulo.id)}
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor={modulo.id}
                  className="flex items-center gap-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <span>{modulo.icon}</span>
                  <span>{modulo.nome}</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  {modulo.descricao}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
