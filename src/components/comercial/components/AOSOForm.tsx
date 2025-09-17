import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AOSOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const AOSOForm = ({ formData, onInputChange }: AOSOFormProps) => {
  const handleAnexarAO = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('AO anexado:', file.name);
        // Aqui seria implementada a lógica de upload do arquivo
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Anexar AO/SO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Button 
              onClick={handleAnexarAO}
              className="w-48"
            >
              Anexar AO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};