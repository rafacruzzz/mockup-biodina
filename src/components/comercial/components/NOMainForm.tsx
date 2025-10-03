import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface NOMainFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOMainForm = ({ formData, onInputChange }: NOMainFormProps) => {
  const handleGenerateNOPDF = () => {
    // Simular geração do PDF NO baseado na estrutura correta
    const noContent = `BIODINA

Company Information
Company Name: ${formData.companyName || 'BIODINA INSTRUMENTOS CIENTÍFICOS LTDA.'}
Address: ${formData.companyAddress || 'Rua São Pedro, n°. 154 – Sala 409 – Centro'}
ZIP/City/State/Country: ${formData.companyZipCity || 'CEP: 24.020-058/ Niterói / RJ/ Brazil'}
Phone: ${formData.companyPhone || '55 21 2435-9872'}
Email: ${formData.companyEmail || 'importacao@biodina.com.br'}

Recipient
To: ${formData.noDestinatario || 'RADIOMETER MEDICAL ApS, International Sales Division'}
Attn.: ${formData.noAtencao || 'Ms. Lene Orbansen'}
Date: ${formData.noData || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Total Pages: ${formData.noTotalPaginas || '01'}
Subject: ${formData.noAssunto || 'OUR NEW ORDER OD-XXXX/RD-XXXX, YOUR P.I XXXXXX - USD - XXXX'}
Customer: ${formData.noCliente || 'XXXXXXXXXXXXXXXX'}

Order Content
${formData.noOrderContent || 'We would like to place our new order, according to your P.I. a.m. consigned to the following customer:'}

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            NO - NEW ORDER
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Company Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">COMPANY INFORMATION</h3>
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName || 'BIODINA INSTRUMENTOS CIENTÍFICOS LTDA.'}
                onChange={(e) => onInputChange('companyName', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="companyAddress">Address</Label>
              <Input
                id="companyAddress"
                value={formData.companyAddress || 'Rua São Pedro, n°. 154 – Sala 409 – Centro'}
                onChange={(e) => onInputChange('companyAddress', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="companyZipCity">ZIP/City/State/Country</Label>
              <Input
                id="companyZipCity"
                value={formData.companyZipCity || 'CEP: 24.020-058/ Niterói / RJ/ Brazil'}
                onChange={(e) => onInputChange('companyZipCity', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="companyPhone">Phone</Label>
              <Input
                id="companyPhone"
                value={formData.companyPhone || '55 21 2435-9872'}
                onChange={(e) => onInputChange('companyPhone', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                value={formData.companyEmail || 'importacao@biodina.com.br'}
                onChange={(e) => onInputChange('companyEmail', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Recipient */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border p-4 rounded">
            <div className="lg:col-span-3">
              <h3 className="font-semibold mb-4 border-b pb-2">RECIPIENT</h3>
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="noDestinatario">To</Label>
              <Input
                id="noDestinatario"
                value={formData.noDestinatario || 'RADIOMETER MEDICAL ApS, International Sales Division'}
                onChange={(e) => onInputChange('noDestinatario', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noAtencao">Attn.</Label>
              <Input
                id="noAtencao"
                value={formData.noAtencao || 'Ms. Lene Orbansen'}
                onChange={(e) => onInputChange('noAtencao', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="noData">Date</Label>
              <Input
                id="noData"
                value={formData.noData || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                onChange={(e) => onInputChange('noData', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="noTotalPaginas">Total Pages</Label>
              <Input
                id="noTotalPaginas"
                value={formData.noTotalPaginas || '01'}
                onChange={(e) => onInputChange('noTotalPaginas', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <Label htmlFor="noAssunto">Subject</Label>
              <Input
                id="noAssunto"
                value={formData.noAssunto || 'OUR NEW ORDER OD-XXXX/RD-XXXX, YOUR P.I XXXXXX - USD - XXXX'}
                onChange={(e) => onInputChange('noAssunto', e.target.value)}
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

          {/* Order Content */}
          <div className="border p-4 rounded">
            <div className="mb-4">
              <h3 className="font-semibold mb-4 border-b pb-2">ORDER CONTENT</h3>
            </div>
            
            <div>
              <Label htmlFor="noOrderContent">Order Description</Label>
              <Textarea
                id="noOrderContent"
                value={formData.noOrderContent || 'We would like to place our new order, according to your P.I. a.m. consigned to the following customer:'}
                onChange={(e) => onInputChange('noOrderContent', e.target.value)}
                rows={3}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-4 rounded">
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

          <div className="grid grid-cols-1 gap-4 border p-4 rounded">
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
                value={formData.noInstrucaoEnvio || 'Will be sent as soon as possible.'}
                onChange={(e) => onInputChange('noInstrucaoEnvio', e.target.value)}
                rows={3}
                className="w-full"
              />
            </div>
          </div>

          <div className="border p-4 rounded">
            <div className="mb-4">
              <h3 className="font-semibold mb-4 border-b pb-2">CLOSING MESSAGE</h3>
            </div>
            
            <div>
              <Label htmlFor="noAgradecimento">Message</Label>
              <Textarea
                id="noAgradecimento"
                value={formData.noAgradecimento || 'We thank you in advance and look forward to receiving your AO.'}
                onChange={(e) => onInputChange('noAgradecimento', e.target.value)}
                rows={2}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border p-4 rounded">
            <div className="lg:col-span-3">
              <h3 className="font-semibold mb-4 border-b pb-2">SIGNATURE</h3>
            </div>
            
            <div>
              <Label htmlFor="noAssinante">Name</Label>
              <Input
                id="noAssinante"
                value={formData.noAssinante || 'Evandro Amorim'}
                onChange={(e) => onInputChange('noAssinante', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCargo">Department</Label>
              <Input
                id="noCargo"
                value={formData.noCargo || 'International Division'}
                onChange={(e) => onInputChange('noCargo', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noEaa">Code</Label>
              <Input
                id="noEaa"
                value={formData.noEaa || 'EAA - XXX'}
                onChange={(e) => onInputChange('noEaa', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleGenerateNOPDF}
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
            >
              <FileText className="h-4 w-4 mr-2" />
              Baixar NO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NOMainForm;
