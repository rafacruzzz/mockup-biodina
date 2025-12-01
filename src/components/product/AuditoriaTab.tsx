
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductTabProps } from "@/types/product";

const AuditoriaTab = ({ formData, onInputChange }: ProductTabProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">🕓 Auditoria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            As informações de data e usuário são geradas automaticamente pelo sistema e não podem ser editadas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="statusProduto" className="text-sm font-semibold">Status do Produto *</Label>
          <Select value={formData.statusProduto} onValueChange={(value) => onInputChange('statusProduto', value)}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="descontinuado">Descontinuado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="inclusao" className="text-sm font-semibold">Data de Inclusão</Label>
            <Input
              id="inclusao"
              value={formatDate(formData.inclusao)}
              readOnly
              className="border-gray-300 bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ultimaAlteracao" className="text-sm font-semibold">Última Alteração</Label>
            <Input
              id="ultimaAlteracao"
              value={formatDate(formData.ultimaAlteracao)}
              readOnly
              className="border-gray-300 bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="incluidoPor" className="text-sm font-semibold">Incluído por</Label>
            <Input
              id="incluidoPor"
              value={formData.incluidoPor}
              readOnly
              className="border-gray-300 bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alteradoPor" className="text-sm font-semibold">Alterado por</Label>
            <Input
              id="alteradoPor"
              value={formData.alteradoPor}
              readOnly
              className="border-gray-300 bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-biodina-blue mb-2">Histórico de Alterações</h4>
          <p className="text-sm text-gray-600">
            Para visualizar o histórico completo de alterações deste produto, utilize o módulo de relatórios do sistema.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditoriaTab;
