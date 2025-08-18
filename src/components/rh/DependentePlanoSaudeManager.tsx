
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, User } from 'lucide-react';
import { DependentePlanoSaude } from '@/types/colaborador';

interface DependentePlanoSaudeManagerProps {
  dependentes: DependentePlanoSaude[];
  onAddDependente: () => void;
  onRemoveDependente: (id: string) => void;
  onDependenteChange: (id: string, field: keyof DependentePlanoSaude, value: string) => void;
}

const DependentePlanoSaudeManager = ({
  dependentes,
  onAddDependente,
  onRemoveDependente,
  onDependenteChange
}: DependentePlanoSaudeManagerProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Dependentes no Plano de Saúde</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddDependente}
          className="text-green-600 hover:text-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Dependente
        </Button>
      </div>

      {dependentes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum dependente cadastrado</p>
          <p className="text-sm">Clique no botão acima para adicionar um dependente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dependentes.map((dependente, index) => (
            <Card key={dependente.id} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Dependente {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveDependente(dependente.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`nome-${dependente.id}`}>Nome Completo</Label>
                    <Input
                      id={`nome-${dependente.id}`}
                      value={dependente.nomeCompleto}
                      onChange={(e) => onDependenteChange(dependente.id, 'nomeCompleto', e.target.value)}
                      placeholder="Nome completo do dependente"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`documento-${dependente.id}`}>CPF</Label>
                    <Input
                      id={`documento-${dependente.id}`}
                      value={dependente.documento}
                      onChange={(e) => onDependenteChange(dependente.id, 'documento', e.target.value)}
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`nascimento-${dependente.id}`}>Data de Nascimento</Label>
                    <Input
                      id={`nascimento-${dependente.id}`}
                      type="date"
                      value={dependente.dataNascimento}
                      onChange={(e) => onDependenteChange(dependente.id, 'dataNascimento', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DependentePlanoSaudeManager;
