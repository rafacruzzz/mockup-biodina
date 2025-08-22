
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor, Info } from "lucide-react";
import { DadosTI } from "@/types/colaborador";

interface TITabProps {
  formData: DadosTI;
  onInputChange: (field: keyof DadosTI, value: string) => void;
}

const TITab = ({ formData, onInputChange }: TITabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-biodina-gold/10 rounded-lg">
          <Monitor className="h-5 w-5 text-biodina-gold" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-biodina-blue">Dados de TI</h3>
          <p className="text-sm text-gray-600">Informações de acesso e permissões de sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Configurações de Acesso
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="servidorAcesso">Servidor de acesso</Label>
            <Select
              value={formData.servidorAcesso}
              onValueChange={(value) => onInputChange('servidorAcesso', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o servidor" />
              </SelectTrigger>
              <SelectContent>
                {/* Dropdown vazio - módulo ainda não está pronto */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="permissoesNecessarias">Quais permissões são necessárias?</Label>
            <Select
              value={formData.permissoesNecessarias}
              onValueChange={(value) => onInputChange('permissoesNecessarias', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione as permissões" />
              </SelectTrigger>
              <SelectContent>
                {/* Dropdown vazio - módulo ainda não está pronto */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="restricoes">Quais restrições?</Label>
            <Select
              value={formData.restricoes}
              onValueChange={(value) => onInputChange('restricoes', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione as restrições" />
              </SelectTrigger>
              <SelectContent>
                {/* Dropdown vazio - módulo ainda não está pronto */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pastasAcesso">Pastas de acesso</Label>
            <Select
              value={formData.pastasAcesso}
              onValueChange={(value) => onInputChange('pastasAcesso', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione as pastas" />
              </SelectTrigger>
              <SelectContent>
                {/* Dropdown vazio - módulo ainda não está pronto */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailCorporativo">E-mail corporativo (somente interno ou também externo?)</Label>
            <Select
              value={formData.emailCorporativo}
              onValueChange={(value) => onInputChange('emailCorporativo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de acesso" />
              </SelectTrigger>
              <SelectContent>
                {/* Dropdown vazio - módulo ainda não está pronto */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ramal">Ramal</Label>
            <Select
              value={formData.ramal}
              onValueChange={(value) => onInputChange('ramal', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ramal" />
              </SelectTrigger>
              <SelectContent>
                {/* Dropdown vazio - módulo ainda não está pronto */}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-blue-700">
          <Info className="h-4 w-4" />
          <span className="text-sm font-medium">Módulo em Desenvolvimento</span>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          As opções dos dropdowns serão carregadas quando o módulo de TI estiver completo.
        </p>
      </div>
    </div>
  );
};

export default TITab;
