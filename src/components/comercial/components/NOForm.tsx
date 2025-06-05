
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOForm = ({ formData, onInputChange }: NOFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            NO - NOTA DE OPORTUNIDADE
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Conteúdo da aba NO em desenvolvimento...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NOForm;
