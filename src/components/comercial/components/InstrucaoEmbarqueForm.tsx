
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Upload, FileText, X } from 'lucide-react';
import { useState } from 'react';

interface InstrucaoEmbarqueFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const InstrucaoEmbarqueForm = ({ formData, onInputChange }: InstrucaoEmbarqueFormProps) => {
  const [pagamentoPago, setPagamentoPago] = useState(false);
  const [comprovantePagamento, setComprovantePagamento] = useState<File | null>(null);

  const handleAnexarComprovante = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setComprovantePagamento(file);
        setPagamentoPago(true);
        console.log('Comprovante de pagamento anexado:', file.name);
      }
    };
    input.click();
  };

  const handleRemoverComprovante = () => {
    setComprovantePagamento(null);
    setPagamentoPago(false);
    console.log('Comprovante de pagamento removido');
  };

  const handleEnviarInstrucoes = () => {
    console.log('Enviando instruções de embarque...');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            INSTRUÇÃO DE EMBARQUE
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Company Information - Editável */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">COMPANY INFORMATION</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName || 'BIODINA EMPREENDIMENTOS E PARTICIPAÇÕES LTDA.'}
                  onChange={(e) => onInputChange('companyName', e.target.value)}
                  className="w-full font-bold"
                />
              </div>
              
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Input
                  id="companyAddress"
                  value={formData.companyAddress || 'AVENIDA DAS AMÉRICAS 505 SALA 217 – BARRA DA TIJUCA'}
                  onChange={(e) => onInputChange('companyAddress', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyZipCity">ZIP Code - City - State - Country</Label>
                <Input
                  id="companyZipCity"
                  value={formData.companyZipCity || '22631- 000- RIO DE JANEIRO - RJ, BRASIL.'}
                  onChange={(e) => onInputChange('companyZipCity', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyPhone">Phone and Fax</Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone || 'TEL.: 55 21 2435-9872 - FAX: 55 21 2435-9870'}
                  onChange={(e) => onInputChange('companyPhone', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  value={formData.companyEmail || 'biosi@biodina.com.br'}
                  onChange={(e) => onInputChange('companyEmail', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyCallMessage">Contact Message</Label>
                <Input
                  id="companyCallMessage"
                  value={formData.companyCallMessage || 'If you do not receive all pages, please call: + 55 21 2435-9872'}
                  onChange={(e) => onInputChange('companyCallMessage', e.target.value)}
                  className="w-full italic"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">DOCUMENT FIELDS</h3>
            </div>
            
            <div>
              <Label htmlFor="aoTo">To</Label>
              <Input
                id="aoTo"
                value={formData.aoTo || ''}
                onChange={(e) => onInputChange('aoTo', e.target.value)}
                placeholder="RADIOMETER MEDICAL ApS."
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoAttn">Attn.</Label>
              <Input
                id="aoAttn"
                value={formData.aoAttn || ''}
                onChange={(e) => onInputChange('aoAttn', e.target.value)}
                placeholder="Ms. Lene Orbansen"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoDate">Date</Label>
              <Input
                id="aoDate"
                value={formData.aoDate || ''}
                onChange={(e) => onInputChange('aoDate', e.target.value)}
                placeholder="June 15th, 2023"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoTotalPages">Total Pages</Label>
              <Input
                id="aoTotalPages"
                value={formData.aoTotalPages || ''}
                onChange={(e) => onInputChange('aoTotalPages', e.target.value)}
                placeholder="02"
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="aoSubject">Subject</Label>
              <Input
                id="aoSubject"
                value={formData.aoSubject || ''}
                onChange={(e) => onInputChange('aoSubject', e.target.value)}
                placeholder="SHIPMENT INSTRUCTIONS, DD-6859/RD-4968, YOUR AO's 003627075 USD 17,299.74."
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="aoCustomer">Customer</Label>
              <Input
                id="aoCustomer"
                value={formData.aoCustomer || ''}
                onChange={(e) => onInputChange('aoCustomer', e.target.value)}
                placeholder="HOSPITAL SÃO VICENTE DE PAULO"
                className="w-full"
              />
            </div>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">SHIPPING INSTRUCTIONS</h3>
            <div>
              <Label htmlFor="shippingInstructions">Instructions Text</Label>
              <Textarea
                id="shippingInstructions"
                value={formData.shippingInstructions || 'Please pack the goods of our order a.m. as soon as possible in accordance with the following instructions:'}
                onChange={(e) => onInputChange('shippingInstructions', e.target.value)}
                rows={2}
                className="w-full italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border p-4 rounded">
            <div>
              <h3 className="font-semibold mb-4 border-b pb-2">SPECIFIC FIELDS</h3>
              <p className="text-sm font-medium mb-4">1- Invoice: Please mention on the invoice:</p>
            </div>
            
            <div>
              <Label htmlFor="aoPortugueseDescription">1. Portuguese description as</Label>
              <Textarea
                id="aoPortugueseDescription"
                value={formData.aoPortugueseDescription || ''}
                onChange={(e) => onInputChange('aoPortugueseDescription', e.target.value)}
                placeholder="Analisador de Gases Sanguíneos ABL800 FLEX, AO#003627075"
                rows={2}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoUnitTotalPrices">2. Unit and Total prices item by item</Label>
              <Textarea
                id="aoUnitTotalPrices"
                value={formData.aoUnitTotalPrices || ''}
                onChange={(e) => onInputChange('aoUnitTotalPrices', e.target.value)}
                placeholder="ABL800 FLEX - USD 15,000.00/unit - Total USD 15,000.00; Sensors (5 units) - USD 459.95/unit - Total USD 2,299.74"
                rows={3}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoLotEachItem">3. Lot of each item</Label>
              <Textarea
                id="aoLotEachItem"
                value={formData.aoLotEachItem || ''}
                onChange={(e) => onInputChange('aoLotEachItem', e.target.value)}
                placeholder="ABL800 FLEX - Lot 2023-06-A; Sensors - Lot 2023-05-B"
                rows={2}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoCountryOrigin">4. Country of origin</Label>
              <Input
                id="aoCountryOrigin"
                value={formData.aoCountryOrigin || ''}
                onChange={(e) => onInputChange('aoCountryOrigin', e.target.value)}
                placeholder="Denmark"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoTotalCartons">5. Total of cartons and its marks</Label>
              <Textarea
                id="aoTotalCartons"
                value={formData.aoTotalCartons || ''}
                onChange={(e) => onInputChange('aoTotalCartons', e.target.value)}
                placeholder="3 cartons - Marks: BIODINA 2023/06-001, BIODINA 2023/06-002, BIODINA 2023/06-003"
                rows={2}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aoGrossWeight">6. Gross weight</Label>
                <Input
                  id="aoGrossWeight"
                  value={formData.aoGrossWeight || ''}
                  onChange={(e) => onInputChange('aoGrossWeight', e.target.value)}
                  placeholder="45 kg"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="aoNetWeight">7. Net weight</Label>
                <Input
                  id="aoNetWeight"
                  value={formData.aoNetWeight || ''}
                  onChange={(e) => onInputChange('aoNetWeight', e.target.value)}
                  placeholder="38 kg"
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="aoTermsPayment">8. Terms of payment</Label>
              <Input
                id="aoTermsPayment"
                value={formData.aoTermsPayment || ''}
                onChange={(e) => onInputChange('aoTermsPayment', e.target.value)}
                placeholder="International wire transfer, 30 days after shipment"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="aoConsignedTo">9. Consigned to</Label>
              <Input
                id="aoConsignedTo"
                value={formData.aoConsignedTo || ''}
                onChange={(e) => onInputChange('aoConsignedTo', e.target.value)}
                placeholder="HOSPITAL SÃO VICENTE DE PAULO"
                className="w-full"
              />
            </div>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">DELIVERY ADDRESS</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="deliveryAddress1">Address Line 1</Label>
                <Input
                  id="deliveryAddress1"
                  value={formData.deliveryAddress1 || 'Rua Goncalves Crespo, 430 - Tijuca'}
                  onChange={(e) => onInputChange('deliveryAddress1', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="deliveryAddress2">Address Line 2</Label>
                <Input
                  id="deliveryAddress2"
                  value={formData.deliveryAddress2 || '20.270-320 Rio de Janeiro - RJ'}
                  onChange={(e) => onInputChange('deliveryAddress2', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="deliveryCountry">Country</Label>
                <Input
                  id="deliveryCountry"
                  value={formData.deliveryCountry || 'Brazil'}
                  onChange={(e) => onInputChange('deliveryCountry', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>


          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">BANKING INFORMATION</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName || 'NORDEA BANK DENMARK A/S'}
                  onChange={(e) => onInputChange('bankName', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="bankPOBox">P.O. Box</Label>
                <Input
                  id="bankPOBox"
                  value={formData.bankPOBox || 'P.O. BOX 850'}
                  onChange={(e) => onInputChange('bankPOBox', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="bankCity">City</Label>
                <Input
                  id="bankCity"
                  value={formData.bankCity || '0900 COPENHAGEN C DENMARK'}
                  onChange={(e) => onInputChange('bankCity', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="bankSwift">S.W.I.F.T</Label>
                <Input
                  id="bankSwift"
                  value={formData.bankSwift || 'S.W.I.F.T NDEEDKKK'}
                  onChange={(e) => onInputChange('bankSwift', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="bankAccount">Account Number</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount || 'ACCOUNT NO.: 2149 5005508776'}
                  onChange={(e) => onInputChange('bankAccount', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">EXPORTER INFORMATION</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="exporterName">Exporter Name</Label>
                <Input
                  id="exporterName"
                  value={formData.exporterName || 'Radiometer Medical Aps'}
                  onChange={(e) => onInputChange('exporterName', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="exporterAddress">Address</Label>
                <Input
                  id="exporterAddress"
                  value={formData.exporterAddress || 'Akandevej 21,DK-2700'}
                  onChange={(e) => onInputChange('exporterAddress', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="exporterCity">City - Country</Label>
                <Input
                  id="exporterCity"
                  value={formData.exporterCity || 'Bronshoj - Denmark'}
                  onChange={(e) => onInputChange('exporterCity', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-4 border-b pb-2">FINAL OBSERVATION</h3>
            <div className="space-y-2 text-sm">
              <p>The following sentences need to be included in the shipping documents:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>This equipment is for medical use only</li>
                <li>Fragile medical equipment, handle with care</li>
                <li>Keep in temperature controlled environment (15-25°C)</li>
              </ul>
            </div>
          </div>

          <div className="border-2 border-red-400 p-4 rounded bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">Status do Pagamento</h3>
                
                {!comprovantePagamento ? (
                  <Button
                    onClick={handleAnexarComprovante}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Anexar Comprovante de Pagamento
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-900">{comprovantePagamento.name}</p>
                          <p className="text-xs text-green-600">
                            {(comprovantePagamento.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoverComprovante}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded">
                      Pago
                    </span>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 mt-2">
                  {pagamentoPago 
                    ? 'Pagamento confirmado. Você pode enviar as instruções de embarque.'
                    : 'Anexe o comprovante de pagamento para liberar o envio das instruções.'
                  }
                </p>
              </div>
              
              {pagamentoPago && (
                <Button
                  onClick={handleEnviarInstrucoes}
                  className="bg-green-600 text-white hover:bg-green-700 px-6 py-3"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Instruções de Embarque
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstrucaoEmbarqueForm;
