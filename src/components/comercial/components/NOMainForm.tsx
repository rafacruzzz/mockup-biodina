import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload } from 'lucide-react';

interface NOMainFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOMainForm = ({ formData, onInputChange }: NOMainFormProps) => {
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
    // Simular anexação de AO
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('AO anexado:', file.name);
        // Aqui você pode adicionar a lógica para salvar o arquivo
      }
    };
    input.click();
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
          {/* Company Information - Cabeçalho Fixo */}
          <div className="border p-4 rounded bg-gray-50">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-4 rounded">
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
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-4 border-b pb-2">ORDER CONTENT</h3>
            <p className="text-sm italic">"We would like to place our new order, according to your P.I. a.m. consigned to the following customer:"</p>
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
                value={formData.noInstrucaoEnvio || ''}
                onChange={(e) => onInputChange('noInstrucaoEnvio', e.target.value)}
                placeholder="Will be sent as soon as possible."
                rows={3}
                className="w-full"
              />
            </div>
          </div>

          <div className="border p-4 rounded bg-gray-50">
            <p className="text-sm italic">"We thank you in advance and look forward to receiving your AO."</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border p-4 rounded">
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

          <div className="flex justify-center space-x-4">
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
            >
              <Upload className="h-4 w-4 mr-2" />
              Anexar AO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NOMainForm;
