
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useState } from 'react';
import OVCTable from './OVCTable';

interface OVCFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const OVCForm = ({ formData, onInputChange }: OVCFormProps) => {
  const [ovcItems, setOvcItems] = useState([
    {
      id: 1,
      code: 'ABL800 FLEX',
      qty: '1',
      priceListUnit: '65000.00',
      priceListTotal: '65000.00',
      customerDiscountPercent: '15',
      customerDiscountUnit: '9750.00',
      customerDiscountTotal: '9750.00',
      subTotalUnit: '55250.00',
      subTotalTotal: '55250.00',
      handlingCharge: '1657.50',
      total: '56907.50',
      comissionPercent: '5',
      comissionValue: '2845.38',
      netRadiometer: '54062.12'
    },
    {
      id: 2,
      code: 'Installation',
      qty: '1',
      priceListUnit: '3000.00',
      priceListTotal: '3000.00',
      customerDiscountPercent: '0',
      customerDiscountUnit: '0.00',
      customerDiscountTotal: '0.00',
      subTotalUnit: '3000.00',
      subTotalTotal: '3000.00',
      handlingCharge: '90.00',
      total: '3090.00',
      comissionPercent: '5',
      comissionValue: '154.50',
      netRadiometer: '2935.50'
    }
  ]);

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
              onUpdateItems={setOvcItems}
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
