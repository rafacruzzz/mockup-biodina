import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FaturaPackingCertificadosFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const FaturaPackingCertificadosForm = ({ formData, onInputChange }: FaturaPackingCertificadosFormProps) => {
  return (
    <div className="space-y-6">
      {/* Fatura Comercial */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Fatura Comercial (Commercial Invoice)
          </CardTitle>
          <CardDescription>
            Documentos para envio aos clientes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Upload da Fatura Comercial</p>
            <Button variant="outline" size="sm">Selecionar arquivo</Button>
            <p className="text-xs text-gray-500 mt-2">PDF, até 10MB</p>
          </div>

          {formData.faturaArquivoUrl && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800">
                Arquivo anexado: {formData.faturaArquivoNome || 'fatura.pdf'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Packing List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Packing List (Lista de Embalagem)
          </CardTitle>
          <CardDescription>
            Detalhamento das embalagens e conteúdos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Upload do Packing List</p>
            <Button variant="outline" size="sm">Selecionar arquivo</Button>
            <p className="text-xs text-gray-500 mt-2">PDF, até 10MB</p>
          </div>

          {formData.packingArquivoUrl && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800">
                Arquivo anexado: {formData.packingArquivoNome || 'packing-list.pdf'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Certificados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Certificados
          </CardTitle>
          <CardDescription>
            Certificados de qualidade, madeira, itens perigosos, etc.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Certificado de Qualidade */}
          <div className="space-y-2">
            <p className="text-base font-semibold">Certificado de Qualidade</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload do Certificado de Qualidade</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
              <p className="text-xs text-gray-500 mt-2">PDF, até 10MB</p>
            </div>
            {formData.certQualidadeUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800">Anexado: {formData.certQualidadeNome}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Certificado de Madeira */}
          <div className="space-y-2">
            <p className="text-base font-semibold">Certificado de Madeira (IPPC)</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload do Certificado de Madeira</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
              <p className="text-xs text-gray-500 mt-2">PDF, até 10MB</p>
            </div>
            {formData.certMadeiraUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800">Anexado: {formData.certMadeiraNome}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Certificado de Itens Perigosos */}
          <div className="space-y-2">
            <p className="text-base font-semibold">Certificado de Itens Perigosos (DGR)</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload do Certificado DGR (se aplicável)</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
              <p className="text-xs text-gray-500 mt-2">PDF, até 10MB</p>
            </div>
            {formData.certPerigososUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800">Anexado: {formData.certPerigososNome}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Outros Certificados */}
          <div className="space-y-2">
            <p className="text-base font-semibold">Outros Certificados</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload de certificados adicionais</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
              <p className="text-xs text-gray-500 mt-2">PDF, até 10MB</p>
            </div>
            {formData.certOutrosUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800">Anexado: {formData.certOutrosNome}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaturaPackingCertificadosForm;
