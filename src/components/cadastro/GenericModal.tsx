
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  moduleName: string;
  fields?: Array<{
    key: string;
    label: string;
    type: 'text' | 'email' | 'select' | 'textarea' | 'number';
    options?: Array<{ value: string; label: string }>;
    required?: boolean;
  }>;
}

const GenericModal = ({ isOpen, onClose, title, moduleName, fields = [] }: GenericModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log(`Salvando ${title}:`, formData);
    onClose();
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'select':
        return (
          <Select value={formData[field.key] || ""} onValueChange={(value) => handleInputChange(field.key, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            value={formData[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            rows={3}
          />
        );
      default:
        return (
          <Input
            type={field.type}
            value={formData[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-imuv-blue">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {fields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <Label htmlFor={field.key}>
                    {field.label} {field.required && '*'}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Formulário genérico para {moduleName}</p>
              <p className="text-sm text-gray-400 mt-2">Configure os campos específicos para este módulo</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-imuv-gold hover:bg-imuv-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
