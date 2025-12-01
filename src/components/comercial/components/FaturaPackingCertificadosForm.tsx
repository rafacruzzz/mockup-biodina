import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, FileStack, Files } from 'lucide-react';

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

  const tipoArquivo = formData.tipoArquivoDocumentos || 'separado';

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Upload de Documentos</h3>
        
        {/* Seletor de tipo de arquivo */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <Label className="text-base font-medium mb-4 block">Como você deseja enviar os documentos?</Label>
          <RadioGroup 
            value={tipoArquivo}
            onValueChange={(value) => onInputChange('tipoArquivoDocumentos', value)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors" 
                 style={{ borderColor: tipoArquivo === 'unificado' ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}>
              <RadioGroupItem value="unificado" id="unificado" />
              <Label htmlFor="unificado" className="flex items-center gap-2 cursor-pointer flex-1">
                <FileStack className="h-5 w-5" />
                <div>
                  <div className="font-medium">Arquivo Unificado</div>
                  <div className="text-xs text-muted-foreground">Um único arquivo</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors"
                 style={{ borderColor: tipoArquivo === 'separado' ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}>
              <RadioGroupItem value="separado" id="separado" />
              <Label htmlFor="separado" className="flex items-center gap-2 cursor-pointer flex-1">
                <Files className="h-5 w-5" />
                <div>
                  <div className="font-medium">Arquivos Separados</div>
                  <div className="text-xs text-muted-foreground">Um para cada tipo</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-6">
          {tipoArquivo === 'unificado' ? (
            /* Arquivo Unificado */
            <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <Label htmlFor="documentosUnificadosFile" className="text-base font-medium">
                Documentos Unificados
              </Label>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                Faça upload do arquivo único contendo: Fatura, Packing List, Certificado de Qualidade, Certificado de Madeira e Certificado de Itens Perigosos
              </p>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="documentosUnificadosFile"
                  type="file"
                  onChange={handleFileChange('documentosUnificadosFile')}
                  accept=".pdf,.doc,.docx"
                  className="flex-1 bg-white"
                />
                <Upload className="h-5 w-5 text-blue-500" />
              </div>
              {formData.documentosUnificadosFile && (
                <p className="mt-3 text-sm font-medium text-blue-700 flex items-center gap-2">
                  <FileStack className="h-4 w-4" />
                  Arquivo selecionado: {formData.documentosUnificadosFile.name}
                </p>
              )}
            </div>
          ) : (
            /* Arquivos Separados */
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaturaPackingCertificadosForm;
