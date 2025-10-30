import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faturaNumero">Número da Fatura</Label>
              <Input
                id="faturaNumero"
                value={formData.faturaNumero || ''}
                onChange={(e) => onInputChange('faturaNumero', e.target.value)}
                placeholder="Ex: INV-2025-001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="faturaData">Data da Fatura</Label>
              <Input
                id="faturaData"
                type="date"
                value={formData.faturaData || ''}
                onChange={(e) => onInputChange('faturaData', e.target.value)}
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Upload da Fatura Comercial</p>
            <Button variant="outline" size="sm">Selecionar arquivo</Button>
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
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="packingTotalVolumes">Total de Volumes</Label>
              <Input
                id="packingTotalVolumes"
                type="number"
                value={formData.packingTotalVolumes || ''}
                onChange={(e) => onInputChange('packingTotalVolumes', e.target.value)}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="packingPesoBruto">Peso Bruto (kg)</Label>
              <Input
                id="packingPesoBruto"
                type="number"
                step="0.01"
                value={formData.packingPesoBruto || ''}
                onChange={(e) => onInputChange('packingPesoBruto', e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="packingPesoLiquido">Peso Líquido (kg)</Label>
              <Input
                id="packingPesoLiquido"
                type="number"
                step="0.01"
                value={formData.packingPesoLiquido || ''}
                onChange={(e) => onInputChange('packingPesoLiquido', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packingDimensoes">Dimensões das Embalagens</Label>
            <Textarea
              id="packingDimensoes"
              value={formData.packingDimensoes || ''}
              onChange={(e) => onInputChange('packingDimensoes', e.target.value)}
              placeholder="Ex: 3 caixas - 120x80x100 cm cada"
              rows={2}
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Upload do Packing List</p>
            <Button variant="outline" size="sm">Selecionar arquivo</Button>
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
            <Label className="text-base font-semibold">Certificado de Qualidade</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload do Certificado de Qualidade</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
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
            <Label className="text-base font-semibold">Certificado de Madeira (IPPC)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload do Certificado de Madeira</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
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
            <Label className="text-base font-semibold">Certificado de Itens Perigosos (DGR)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload do Certificado DGR (se aplicável)</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
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
            <Label className="text-base font-semibold">Outros Certificados</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload de certificados adicionais</p>
              <Button variant="outline" size="sm">Selecionar arquivo</Button>
            </div>
            {formData.certOutrosUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800">Anexado: {formData.certOutrosNome}</p>
              </div>
            )}
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="certificadosObservacoes">Observações sobre Certificados</Label>
            <Textarea
              id="certificadosObservacoes"
              value={formData.certificadosObservacoes || ''}
              onChange={(e) => onInputChange('certificadosObservacoes', e.target.value)}
              placeholder="Informações adicionais sobre os certificados"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaturaPackingCertificadosForm;
