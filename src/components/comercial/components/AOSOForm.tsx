import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AOSOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const AOSOForm = ({ formData, onInputChange }: AOSOFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            AO/SO - Autorização de Ordem / Sales Order
          </CardTitle>
          <CardDescription>
            Gestão da Autorização de Ordem e Sales Order da fábrica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aoNumero">Número da AO/SO</Label>
              <Input
                id="aoNumero"
                value={formData.aoNumero || ''}
                onChange={(e) => onInputChange('aoNumero', e.target.value)}
                placeholder="Ex: AO-003627075"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aoDataEmissao">Data de Emissão</Label>
              <Input
                id="aoDataEmissao"
                type="date"
                value={formData.aoDataEmissao || ''}
                onChange={(e) => onInputChange('aoDataEmissao', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aoFornecedor">Fornecedor</Label>
              <Input
                id="aoFornecedor"
                value={formData.aoFornecedor || ''}
                onChange={(e) => onInputChange('aoFornecedor', e.target.value)}
                placeholder="Ex: Radiometer Medical ApS"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aoValorTotal">Valor Total (USD)</Label>
              <Input
                id="aoValorTotal"
                type="number"
                step="0.01"
                value={formData.aoValorTotal || ''}
                onChange={(e) => onInputChange('aoValorTotal', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aoClienteFinal">Cliente Final</Label>
            <Input
              id="aoClienteFinal"
              value={formData.aoClienteFinal || ''}
              onChange={(e) => onInputChange('aoClienteFinal', e.target.value)}
              placeholder="Nome do cliente final no Brasil"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aoReferenciaPedido">Referência do Pedido</Label>
            <Input
              id="aoReferenciaPedido"
              value={formData.aoReferenciaPedido || ''}
              onChange={(e) => onInputChange('aoReferenciaPedido', e.target.value)}
              placeholder="Referência interna do pedido"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aoDataEntregaPrevista">Data de Entrega Prevista</Label>
              <Input
                id="aoDataEntregaPrevista"
                type="date"
                value={formData.aoDataEntregaPrevista || ''}
                onChange={(e) => onInputChange('aoDataEntregaPrevista', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aoStatusAO">Status da AO/SO</Label>
              <Input
                id="aoStatusAO"
                value={formData.aoStatusAO || ''}
                onChange={(e) => onInputChange('aoStatusAO', e.target.value)}
                placeholder="Ex: Confirmada, Pendente"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aoObservacoes">Observações</Label>
            <Textarea
              id="aoObservacoes"
              value={formData.aoObservacoes || ''}
              onChange={(e) => onInputChange('aoObservacoes', e.target.value)}
              placeholder="Informações adicionais sobre a AO/SO"
              rows={4}
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              Arraste e solte o arquivo da AO/SO aqui ou
            </p>
            <Button variant="outline" size="sm">
              Selecionar arquivo
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              PDF, até 10MB
            </p>
          </div>

          {formData.aoArquivoUrl && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Arquivo anexado: {formData.aoArquivoNome || 'documento.pdf'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AOSOForm;
