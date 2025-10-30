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
            Espaço para upload da AO/SO da fábrica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-400 transition-colors">
            <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
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
                Arquivo anexado: {formData.aoArquivoNome || 'ao-so.pdf'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AOSOForm;
