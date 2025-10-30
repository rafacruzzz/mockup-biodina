import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface LIFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const LIForm = ({ formData, onInputChange }: LIFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onInputChange('liFile', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload da Licença de Importação (LI)</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="liFile">Arquivo Licença de Importação</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="liFile"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.liFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.liFile.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LIForm;
