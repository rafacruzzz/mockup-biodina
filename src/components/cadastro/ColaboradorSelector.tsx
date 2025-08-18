
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, User } from 'lucide-react';
import { useColaboradores } from '@/hooks/useColaboradores';

interface ColaboradorSelectorProps {
  value?: string;
  onChange: (colaboradorId: string) => void;
  onCreateNew: () => void;
}

const ColaboradorSelector = ({ value, onChange, onCreateNew }: ColaboradorSelectorProps) => {
  const { colaboradores } = useColaboradores();

  const colaboradoresDisponiveis = colaboradores.filter(c => 
    c.status === 'Ativo' || c.status === 'Novo'
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="colaborador">Colaborador *</Label>
      <div className="flex gap-2">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Selecione um colaborador" />
          </SelectTrigger>
          <SelectContent>
            {colaboradoresDisponiveis.map((colaborador) => (
              <SelectItem key={colaborador.id} value={colaborador.id}>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{colaborador.nome} - {colaborador.cargo}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          onClick={onCreateNew}
          className="px-3"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        Selecione um colaborador existente ou crie um novo
      </p>
    </div>
  );
};

export default ColaboradorSelector;
