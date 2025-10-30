import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface AOSOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const AOSOForm = ({ formData, onInputChange }: AOSOFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onInputChange('aosoFile', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload do AO/SO</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="aosoFile">Arquivo AO/SO</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="aosoFile"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="flex-1"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.aosoFile && (
              <p className="mt-2 text-sm text-gray-600">
                Arquivo selecionado: {formData.aosoFile.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AOSOForm;
