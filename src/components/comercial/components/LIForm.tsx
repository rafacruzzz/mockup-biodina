import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LIFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const LIForm = ({ formData, onInputChange }: LIFormProps) => {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          A Licença de Importação (LI) é um documento obrigatório para importação de produtos controlados pela ANVISA e outros órgãos reguladores.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Licença de Importação (LI)
          </CardTitle>
          <CardDescription>
            Gestão da Licença de Importação junto aos órgãos competentes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liNumero">Número da LI</Label>
              <Input
                id="liNumero"
                value={formData.liNumero || ''}
                onChange={(e) => onInputChange('liNumero', e.target.value)}
                placeholder="Ex: LI-2025-001234"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="liDataEmissao">Data de Emissão</Label>
              <Input
                id="liDataEmissao"
                type="date"
                value={formData.liDataEmissao || ''}
                onChange={(e) => onInputChange('liDataEmissao', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liOrgaoEmissor">Órgão Emissor</Label>
              <Input
                id="liOrgaoEmissor"
                value={formData.liOrgaoEmissor || ''}
                onChange={(e) => onInputChange('liOrgaoEmissor', e.target.value)}
                placeholder="Ex: ANVISA, DECEX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="liStatus">Status da LI</Label>
              <Input
                id="liStatus"
                value={formData.liStatus || ''}
                onChange={(e) => onInputChange('liStatus', e.target.value)}
                placeholder="Ex: Em análise, Deferida, Indeferida"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liDataValidade">Data de Validade</Label>
              <Input
                id="liDataValidade"
                type="date"
                value={formData.liDataValidade || ''}
                onChange={(e) => onInputChange('liDataValidade', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="liProtocolo">Número do Protocolo</Label>
              <Input
                id="liProtocolo"
                value={formData.liProtocolo || ''}
                onChange={(e) => onInputChange('liProtocolo', e.target.value)}
                placeholder="Protocolo de solicitação"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="liProdutos">Produtos Relacionados</Label>
            <Textarea
              id="liProdutos"
              value={formData.liProdutos || ''}
              onChange={(e) => onInputChange('liProdutos', e.target.value)}
              placeholder="Liste os produtos cobertos por esta LI"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liObservacoes">Observações</Label>
            <Textarea
              id="liObservacoes"
              value={formData.liObservacoes || ''}
              onChange={(e) => onInputChange('liObservacoes', e.target.value)}
              placeholder="Informações adicionais sobre a LI, pendências, documentos necessários, etc."
              rows={4}
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              Arraste e solte o arquivo da LI aqui ou
            </p>
            <Button variant="outline" size="sm">
              Selecionar arquivo
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              PDF, até 10MB
            </p>
          </div>

          {formData.liArquivoUrl && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Arquivo anexado: {formData.liArquivoNome || 'licenca-importacao.pdf'}
              </p>
            </div>
          )}

          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Importante:</strong> Certifique-se de que todos os documentos necessários foram anexados antes de submeter a solicitação de LI aos órgãos competentes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LIForm;
