import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PIFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const PIForm = ({ formData, onInputChange }: PIFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Proforma Invoice da Fábrica
          </CardTitle>
          <CardDescription>
            Espaço para upload e gestão da Proforma Invoice recebida da fábrica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="piNumero">Número da PI</Label>
              <Input
                id="piNumero"
                value={formData.piNumero || ''}
                onChange={(e) => onInputChange('piNumero', e.target.value)}
                placeholder="Ex: PI-2025-001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="piDataEmissao">Data de Emissão</Label>
              <Input
                id="piDataEmissao"
                type="date"
                value={formData.piDataEmissao || ''}
                onChange={(e) => onInputChange('piDataEmissao', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="piFornecedor">Fornecedor/Fábrica</Label>
              <Input
                id="piFornecedor"
                value={formData.piFornecedor || ''}
                onChange={(e) => onInputChange('piFornecedor', e.target.value)}
                placeholder="Ex: Radiometer Medical ApS"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="piValorTotal">Valor Total (USD)</Label>
              <Input
                id="piValorTotal"
                type="number"
                step="0.01"
                value={formData.piValorTotal || ''}
                onChange={(e) => onInputChange('piValorTotal', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="piTermosPagamento">Termos de Pagamento</Label>
            <Input
              id="piTermosPagamento"
              value={formData.piTermosPagamento || ''}
              onChange={(e) => onInputChange('piTermosPagamento', e.target.value)}
              placeholder="Ex: 30 dias após embarque"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="piPrazoEntrega">Prazo de Entrega</Label>
            <Input
              id="piPrazoEntrega"
              value={formData.piPrazoEntrega || ''}
              onChange={(e) => onInputChange('piPrazoEntrega', e.target.value)}
              placeholder="Ex: 45 dias após confirmação"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="piObservacoes">Observações</Label>
            <Textarea
              id="piObservacoes"
              value={formData.piObservacoes || ''}
              onChange={(e) => onInputChange('piObservacoes', e.target.value)}
              placeholder="Informações adicionais sobre a PI recebida da fábrica"
              rows={4}
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              Arraste e solte o arquivo da PI aqui ou
            </p>
            <Button variant="outline" size="sm">
              Selecionar arquivo
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              PDF, até 10MB
            </p>
          </div>

          {formData.piArquivoUrl && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Arquivo anexado: {formData.piArquivoNome || 'documento.pdf'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PIForm;
