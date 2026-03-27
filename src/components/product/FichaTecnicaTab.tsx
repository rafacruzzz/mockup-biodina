
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Box, Building2, Thermometer, Shield } from "lucide-react";
import { ProductRegistrationData } from "@/types/product";

interface FichaTecnicaTabProps {
  formData: ProductRegistrationData;
  onInputChange: (field: keyof ProductRegistrationData, value: any) => void;
}

const FichaTecnicaTab = ({ formData, onInputChange }: FichaTecnicaTabProps) => {
  const handleFieldChange = (field: string, value: string) => {
    onInputChange('fichaTecnica', {
      ...formData.fichaTecnica,
      [field]: value,
    });
  };

  const fields = [
    {
      key: 'parametrosChave',
      label: 'Parâmetros/Chaves',
      icon: Settings,
      placeholder: 'Ex.: faixa de medição, precisão, vazão, resolução...',
    },
    {
      key: 'compatibilidades',
      label: 'Compatibilidades',
      icon: Box,
      placeholder: 'Ex.: equipamentos, reagentes, acessórios compatíveis...',
    },
    {
      key: 'requisitosInfraestrutura',
      label: 'Requisitos de Infraestrutura',
      icon: Building2,
      placeholder: 'Ex.: energia elétrica, ar comprimido, rede, laboratório...',
    },
    {
      key: 'condicoesAmbientais',
      label: 'Condições Ambientais',
      icon: Thermometer,
      placeholder: 'Ex.: temperatura de operação/armazenamento, umidade relativa...',
    },
    {
      key: 'conformidadesNormas',
      label: 'Conformidades/Normas',
      icon: Shield,
      placeholder: 'Ex.: IEC 61010, ISO 15189, RDC 665/2022...',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biodina-blue">📋 Ficha Técnica</CardTitle>
        <p className="text-sm text-muted-foreground">
          Esses dados alimentarão a Ficha Técnica do Repositório de Produtos.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Icon className="h-4 w-4 text-biodina-blue" />
              {label}
            </Label>
            <Textarea
              value={(formData.fichaTecnica as any)?.[key] || ''}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              placeholder={placeholder}
              rows={3}
              className="border-gray-300"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FichaTecnicaTab;
