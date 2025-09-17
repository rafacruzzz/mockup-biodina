import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FileText, X } from "lucide-react";

interface AOSOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const AOSOForm = ({ formData, onInputChange }: AOSOFormProps) => {
  const [anexedFiles, setAnexedFiles] = useState<File[]>([]);

  const handleAnexarAO = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        setAnexedFiles(prev => [...prev, ...files]);
        console.log('AO anexado:', files.map(f => f.name));
      }
    };
    input.click();
  };

  const handleRemoveFile = (index: number) => {
    setAnexedFiles(prev => prev.filter((_, i) => i !== index));
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
          
          {anexedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Arquivos Anexados:</h4>
              <div className="space-y-2">
                {anexedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};