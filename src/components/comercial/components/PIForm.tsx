import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface PIFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const PIForm = ({ formData, onInputChange }: PIFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onInputChange('piFile', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload da Proforma Invoice (PI)</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="piFile">Arquivo Proforma Invoice</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="piFile"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.piFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.piFile.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIForm;
