import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Paperclip } from 'lucide-react';
import { useState } from 'react';

interface NOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOForm = ({ formData, onInputChange }: NOFormProps) => {
  const [aoAnexada, setAoAnexada] = useState(false);

  const handleGenerateNOPDF = () => {
    // Simular geração do PDF NO baseado na estrutura correta
    const noContent = `BIODINA

Company Information
Company Name: BIODINA INSTRUMENTOS CIENTÍFICOS LTDA.
Address: RUA SÃO PEDRO 154 - SALA 408 CENTRO
ZIP/City/State/Country: 24.024-058 - NITERÓI - RJ, BRASIL
Phone: 55 21 2435-9872
Fax: 55 21 2435-9870
Email: bios@biodina.com.br

Recipient
To: ${formData.noDestinatario || 'RADIOMETER MEDICAL ApS, International Sales Division'}
Attn.: ${formData.noAtencao || 'Ms. Lene Orbansen'}
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Total Pages: 01
Subject: ${formData.noAssunto || 'OUR NEW ORDER OD-XXXX/RD-XXXX, YOUR P.I XXXXXX - USD - XXXX'}
Customer: ${formData.noCliente || 'XXXXXXXXXXXXXXXX'}

Order Content
"We would like to place our new order, according to your P.I. a.m. consigned to the following customer:"

Customer Information
Customer: ${formData.noConsignadoPara || 'XXXXXXXXXXXXXXXX'}
Address: ${formData.noEnderecoConsignado || 'XXXXXXXXXXXXXXXX'}
CEP: ${formData.noCepConsignado || 'XXXXXXXXXXXXXXXX'}
CNPJ: ${formData.noCnpjConsignado || 'XXXXXXXXXXXXXXXX'}

Payment and Shipping Details
Payment Term: ${formData.noTermoPagamento || 'XXXXXXXXXXXXXXXX'}
Shipment Instruction: ${formData.noInstrucaoEnvio || 'Will be sent as soon as possible.'}

"We thank you in advance and look forward to receiving your AO."

Signature
Closing: Best regards,
Name: ${formData.noAssinante || 'Evandro Amorim'}
Department: ${formData.noCargo || 'International Division'}
Code: ${formData.noEaa || 'EAA - XXX'}

Documento gerado em: ${new Date().toLocaleString()}
`;

    // Criar e baixar arquivo NO
    const noBlob = new Blob([noContent], { type: 'text/plain' });
    const noUrl = URL.createObjectURL(noBlob);
    const noLink = document.createElement('a');
    noLink.href = noUrl;
    noLink.download = `NO_${formData.spiNumero || 'novo'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(noLink);
    noLink.click();
    document.body.removeChild(noLink);
    URL.revokeObjectURL(noUrl);

    console.log('Documento NO gerado para download');
  };

  const handleAnexarAO = () => {
    setAoAnexada(true);
    console.log('AO anexada - mostrando campos de instrução de embarque');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            NO - NEW ORDER
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Company Information - Cabeçalho Fixo */}
          <div className="mb-6 border p-4 rounded bg-gray-50">
            <h3 className="font-bold mb-4 text-lg">Company Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Company Name:</strong> BIODINA INSTRUMENTOS CIENTÍFICOS LTDA.</p>
              <p><strong>Address:</strong> RUA SÃO PEDRO 154 - SALA 408 CENTRO</p>
              <p><strong>ZIP/City/State/Country:</strong> 24.024-058 - NITERÓI - RJ, BRASIL</p>
              <p><strong>Phone:</strong> 55 21 2435-9872</p>
              <p><strong>Fax:</strong> 55 21 2435-9870</p>
              <p><strong>Email:</strong> bios@biodina.com.br</p>
            </div>
          </div>

          {/* Recipient */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">RECIPIENT</h3>
            </div>
            
            <div>
              <Label htmlFor="noDestinatario">To</Label>
              <Input
                id="noDestinatario"
                value={formData.noDestinatario || ''}
                onChange={(e) => onInputChange('noDestinatario', e.target.value)}
                placeholder="RADIOMETER MEDICAL ApS, International Sales Division"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noAtencao">Attn.</Label>
              <Input
                id="noAtencao"
                value={formData.noAtencao || ''}
                onChange={(e) => onInputChange('noAtencao', e.target.value)}
                placeholder="Ms. Lene Orbansen"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noAssunto">Subject</Label>
              <Input
                id="noAssunto"
                value={formData.noAssunto || ''}
                onChange={(e) => onInputChange('noAssunto', e.target.value)}
                placeholder="OUR NEW ORDER OD-XXXX/RD-XXXX, YOUR P.I XXXXXX - USD - XXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCliente">Customer</Label>
              <Input
                id="noCliente"
                value={formData.noCliente || ''}
                onChange={(e) => onInputChange('noCliente', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
          </div>

          {/* Order Content - Texto fixo */}
          <div className="mb-6 border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-4 border-b pb-2">ORDER CONTENT</h3>
            <p className="text-sm italic">"We would like to place our new order, according to your P.I. a.m. consigned to the following customer:"</p>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">CUSTOMER INFORMATION</h3>
            </div>
            
            <div>
              <Label htmlFor="noConsignadoPara">Customer</Label>
              <Input
                id="noConsignadoPara"
                value={formData.noConsignadoPara || ''}
                onChange={(e) => onInputChange('noConsignadoPara', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noEnderecoConsignado">Address</Label>
              <Input
                id="noEnderecoConsignado"
                value={formData.noEnderecoConsignado || ''}
                onChange={(e) => onInputChange('noEnderecoConsignado', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCepConsignado">CEP</Label>
              <Input
                id="noCepConsignado"
                value={formData.noCepConsignado || ''}
                onChange={(e) => onInputChange('noCepConsignado', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCnpjConsignado">CNPJ</Label>
              <Input
                id="noCnpjConsignado"
                value={formData.noCnpjConsignado || ''}
                onChange={(e) => onInputChange('noCnpjConsignado', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
          </div>

          {/* Payment and Shipping Details */}
          <div className="grid grid-cols-1 gap-4 mb-6 border p-4 rounded">
            <div>
              <h3 className="font-semibold mb-4 border-b pb-2">PAYMENT AND SHIPPING DETAILS</h3>
            </div>
            
            <div>
              <Label htmlFor="noTermoPagamento">Payment Term</Label>
              <Input
                id="noTermoPagamento"
                value={formData.noTermoPagamento || ''}
                onChange={(e) => onInputChange('noTermoPagamento', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noInstrucaoEnvio">Shipment Instruction</Label>
              <Textarea
                id="noInstrucaoEnvio"
                value={formData.noInstrucaoEnvio || ''}
                onChange={(e) => onInputChange('noInstrucaoEnvio', e.target.value)}
                placeholder="Will be sent as soon as possible."
                rows={3}
                className="w-full"
              />
            </div>
          </div>

          {/* Closing Text - Fixo */}
          <div className="mb-6 border p-4 rounded bg-gray-50">
            <p className="text-sm italic">"We thank you in advance and look forward to receiving your AO."</p>
          </div>

          {/* Signature */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-3">
              <h3 className="font-semibold mb-4 border-b pb-2">SIGNATURE</h3>
            </div>
            
            <div>
              <Label htmlFor="noAssinante">Name</Label>
              <Input
                id="noAssinante"
                value={formData.noAssinante || ''}
                onChange={(e) => onInputChange('noAssinante', e.target.value)}
                placeholder="Evandro Amorim"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCargo">Department</Label>
              <Input
                id="noCargo"
                value={formData.noCargo || ''}
                onChange={(e) => onInputChange('noCargo', e.target.value)}
                placeholder="International Division"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noEaa">Code</Label>
              <Input
                id="noEaa"
                value={formData.noEaa || ''}
                onChange={(e) => onInputChange('noEaa', e.target.value)}
                placeholder="EAA - XXX"
                className="w-full"
              />
            </div>
          </div>

          {/* Botões de Download */}
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={handleGenerateNOPDF}
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
            >
              <FileText className="h-4 w-4 mr-2" />
              Baixar NO
            </Button>
            
            <Button 
              onClick={handleAnexarAO}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
              disabled={aoAnexada}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              {aoAnexada ? 'AO Anexada' : 'Anexar AO'}
            </Button>
          </div>

          {/* Campos de Instrução de Embarque - Aparecem após anexar AO */}
          {aoAnexada && (
            <>
              {/* Cabeçalho da Empresa - Fixo */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-purple-600">
                    SHIPMENT INSTRUCTIONS
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {/* Cabeçalho Fixo da Empresa */}
                  <div className="mb-6 border p-4 rounded bg-gray-50">
                    <div className="space-y-2 text-sm">
                      <p className="font-bold">BIODINA EMPREENDIMENTOS E PARTICIPAÇÕES LTDA.</p>
                      <p>AVENIDA DAS AMÉRICAS 505 SALA 217 – BARRA DA TIJUCA</p>
                      <p>22631- 000- RIO DE JANEIRO - RJ, BRASIL.</p>
                      <p>TEL.: 55 21 2435-9872 - FAX: 55 21 2435-9870</p>
                      <p>biosi@biodina.com.br</p>
                      <p className="italic">If you do not receive all pages, please call: + 55 21 2435-9872</p>
                    </div>
                  </div>

                  {/* Campos do Documento */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
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

                  {/* Instruções de Embarque - Texto fixo */}
                  <div className="mb-6 border p-4 rounded bg-gray-50">
                    <h3 className="font-semibold mb-4 border-b pb-2">SHIPPING INSTRUCTIONS</h3>
                    <p className="text-sm italic">Please pack the goods of our order a.m. as soon as possible in accordance with the following instructions:</p>
                  </div>

                  {/* Campos Específicos */}
                  <div className="grid grid-cols-1 gap-4 mb-6 border p-4 rounded">
                    <div>
                      <h3 className="font-semibold mb-4 border-b pb-2">SPECIFIC FIELDS</h3>
                    </div>
                    
                    <div>
                      <Label htmlFor="aoPortugueseDescription">1. Portuguese description as AO#</Label>
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

                  {/* Endereço de Entrega */}
                  <div className="mb-6 border p-4 rounded bg-gray-50">
                    <h3 className="font-semibold mb-4 border-b pb-2">DELIVERY ADDRESS</h3>
                    <div className="space-y-2 text-sm">
                      <p>Rua Goncalves Crespo, 430 - Tijuca</p>
                      <p>20.270-320 Rio de Janeiro - RJ</p>
                      <p>Brazil</p>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="grid grid-cols-1 gap-4 mb-6 border p-4 rounded">
                    <div>
                      <h3 className="font-semibold mb-4 border-b pb-2">ADDITIONAL INFORMATION</h3>
                    </div>
                    
                    <div>
                      <Label htmlFor="aoCnpj">CNPJ</Label>
                      <Input
                        id="aoCnpj"
                        value={formData.aoCnpj || ''}
                        onChange={(e) => onInputChange('aoCnpj', e.target.value)}
                        placeholder="18.010.750/0001-00"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Informações Bancárias - Fixo */}
                  <div className="mb-6 border p-4 rounded bg-gray-50">
                    <h3 className="font-semibold mb-4 border-b pb-2">BANKING INFORMATION</h3>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">OUR BANK</p>
                      <p>NORDEA BANK DENMARK A/S</p>
                      <p>P.O. BOX 850</p>
                      <p>0900 COPENHAGEN C DENMARK</p>
                      <p>S.W.I.F.T NDEADKKK</p>
                      <p>ACCOUNT NO.: 2149 5005508776</p>
                    </div>
                  </div>

                  {/* Informações do Exportador - Fixo */}
                  <div className="mb-6 border p-4 rounded bg-gray-50">
                    <h3 className="font-semibold mb-4 border-b pb-2">EXPORTER INFORMATION</h3>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">EXPORTADOR:</p>
                      <p>Radiometer Medical Aps</p>
                      <p>Akandevej 21,DK-2700</p>
                      <p>Bronshoj - Denmark</p>
                    </div>
                  </div>

                  {/* Observação Final - Fixo */}
                  <div className="mb-6 border p-4 rounded bg-gray-50">
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
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NOForm;
