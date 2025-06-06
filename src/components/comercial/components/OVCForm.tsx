
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import OVCTable from './OVCTable';

interface OVCFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  ovcItems: any[];
  onUpdateItems: (items: any[]) => void;
}

const OVCForm = ({ formData, onInputChange, ovcItems, onUpdateItems }: OVCFormProps) => {
  const handleEnviarParaFabrica = () => {
    // Simular download do documento OVC
    const ovcContent = `
OVC - ORDER VALUE CALCULATOR
============================

${ovcItems.map(item => `
Código: ${item.code}
Quantidade: ${item.qty}
Preço Unitário: ${item.priceListUnit}
Total: ${item.total}
Comissão: ${item.comissionPercent}%
Net Radiometer: ${item.netRadiometer}
`).join('\n')}

Documento gerado em: ${new Date().toLocaleString()}
`;

    // Criar e baixar arquivo OVC
    const ovcBlob = new Blob([ovcContent], { type: 'text/plain' });
    const ovcUrl = URL.createObjectURL(ovcBlob);
    const ovcLink = document.createElement('a');
    ovcLink.href = ovcUrl;
    ovcLink.download = `OVC_${formData.spiNumero || 'novo'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(ovcLink);
    ovcLink.click();
    document.body.removeChild(ovcLink);
    URL.revokeObjectURL(ovcUrl);

    console.log('Documento OVC enviado para download');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            OVC – ORDER VALUE CALCULATOR
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <h3 className="font-semibold mb-4 border-b pb-2">Calculadora de Valor do Pedido</h3>
            
            <OVCTable
              items={ovcItems}
              onUpdateItems={onUpdateItems}
            />
            
            {/* Botão Enviar para Fábrica */}
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleEnviarParaFabrica}
                className="bg-green-600 text-white hover:bg-green-700 px-8 py-3"
              >
                <Download className="h-4 w-4 mr-2" />
                Enviar para Fábrica
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OVCForm;
