import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface FaturaPackingCertificadosFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const FaturaPackingCertificadosForm = ({ formData, onInputChange }: FaturaPackingCertificadosFormProps) => {
  const handleFileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onInputChange(field, file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Upload de Documentos</h3>
        
        <div className="space-y-6">
          {/* Fatura */}
          <div>
            <Label htmlFor="faturaFile">Fatura</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="faturaFile"
                type="file"
                onChange={handleFileChange('faturaFile')}
                accept=".pdf,.doc,.docx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.faturaFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.faturaFile.name}
              </p>
            )}
          </div>

          {/* Packing List */}
          <div>
            <Label htmlFor="packingListFile">Packing List</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="packingListFile"
                type="file"
                onChange={handleFileChange('packingListFile')}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.packingListFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.packingListFile.name}
              </p>
            )}
          </div>

          {/* Certificado de Qualidade */}
          <div>
            <Label htmlFor="certQualidadeFile">Certificado de Qualidade</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="certQualidadeFile"
                type="file"
                onChange={handleFileChange('certQualidadeFile')}
                accept=".pdf,.doc,.docx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.certQualidadeFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.certQualidadeFile.name}
              </p>
            )}
          </div>

          {/* Certificado de Madeira */}
          <div>
            <Label htmlFor="certMadeiraFile">Certificado de Madeira</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="certMadeiraFile"
                type="file"
                onChange={handleFileChange('certMadeiraFile')}
                accept=".pdf,.doc,.docx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.certMadeiraFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.certMadeiraFile.name}
              </p>
            )}
          </div>

          {/* Certificado de Itens Perigosos */}
          <div>
            <Label htmlFor="certPerigososFile">Certificado de Itens Perigosos</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="certPerigososFile"
                type="file"
                onChange={handleFileChange('certPerigososFile')}
                accept=".pdf,.doc,.docx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.certPerigososFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.certPerigososFile.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaturaPackingCertificadosForm;
