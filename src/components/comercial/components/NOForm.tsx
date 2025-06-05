
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface NOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOForm = ({ formData, onInputChange }: NOFormProps) => {
  const handleGenerateNOPDF = () => {
    // Simular geração do PDF NO baseado na imagem
    const noContent = `BIODINA

BIODINA INSTRUMENTOS CIENTÍFICOS LTDA.
RUA SÃO PEDRO 154 - SALA 409 CENTRO
24.024-056 - NITERÓI - RJ, BRASIL.
TEL.: 55 21 2435-9872 - FAX: 55 21 2435-9870
biosi@biodina.com.br

If you do not receive all pages, please call: + 55 21 2435-9872

To: ${formData.noDestinatario || 'RADIOMETER MEDICAL ApS, International Sales Division'}
Attn.: ${formData.noAtencao || 'Ms. Lene Orbansen'}
Date: ${new Date().toLocaleDateString('pt-BR')} Total Pages: 01
Subject: ${formData.noAssunto || 'OUR NEW ORDER DD-XXXX/RD-XXXX, YOUR P.I. XXXXXX - USD - XXXX'}
Customer: ${formData.noCliente || 'XXXXXXXXXXXXXXXXX'}

Dear ${formData.noDestinatario || 'Ms. Orbansen'},

We would like to place our new order, according to your P.I. a.m. consigned to the following customer.

Consigned to: COSTUMER: ${formData.noConsignadoPara || 'XXXXXXXXXXXXXXXXX'}
             ADDRESS: ${formData.noEnderecoConsignado || 'XXXXXXXXXXXXXXXXX'}
             CEP: ${formData.noCepConsignado || 'XXXXXXXXXXXXXXX'}
             CNPJ: ${formData.noCnpjConsignado || 'XXXXXXXXXXXX'}

Payment Term: ${formData.noTermoPagamento || 'XXXXXXXXXXXXXXX'}

Shipment Instruction: ${formData.noInstrucaoEnvio || 'Will be sent as soon as possible.'}

We thank you in advance and look forward to receiving your AO.

Best regards,

${formData.noAssinante || 'Evandro Amorim'}
${formData.noCargo || 'International Division'}
${formData.noEaa || 'EAA - XXX.'}

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            NO - NOTA DE OPORTUNIDADE
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Informações do Destinatário */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">INFORMAÇÕES DO DESTINATÁRIO</h3>
            </div>
            
            <div>
              <Label htmlFor="noDestinatario">Para (To)</Label>
              <Input
                id="noDestinatario"
                value={formData.noDestinatario || ''}
                onChange={(e) => onInputChange('noDestinatario', e.target.value)}
                placeholder="RADIOMETER MEDICAL ApS, International Sales Division"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noAtencao">Atenção (Attn.)</Label>
              <Input
                id="noAtencao"
                value={formData.noAtencao || ''}
                onChange={(e) => onInputChange('noAtencao', e.target.value)}
                placeholder="Ms. Lene Orbansen"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noAssunto">Assunto (Subject)</Label>
              <Input
                id="noAssunto"
                value={formData.noAssunto || ''}
                onChange={(e) => onInputChange('noAssunto', e.target.value)}
                placeholder="OUR NEW ORDER DD-XXXX/RD-XXXX, YOUR P.I. XXXXXX - USD - XXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCliente">Cliente (Customer)</Label>
              <Input
                id="noCliente"
                value={formData.noCliente || ''}
                onChange={(e) => onInputChange('noCliente', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
          </div>

          {/* Informações de Consignação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">CONSIGNADO PARA (CONSIGNED TO)</h3>
            </div>
            
            <div>
              <Label htmlFor="noConsignadoPara">Cliente (Customer)</Label>
              <Input
                id="noConsignadoPara"
                value={formData.noConsignadoPara || ''}
                onChange={(e) => onInputChange('noConsignadoPara', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noEnderecoConsignado">Endereço (Address)</Label>
              <Input
                id="noEnderecoConsignado"
                value={formData.noEnderecoConsignado || ''}
                onChange={(e) => onInputChange('noEnderecoConsignado', e.target.value)}
                placeholder="XXXXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCepConsignado">CEP</Label>
              <Input
                id="noCepConsignado"
                value={formData.noCepConsignado || ''}
                onChange={(e) => onInputChange('noCepConsignado', e.target.value)}
                placeholder="XXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCnpjConsignado">CNPJ</Label>
              <Input
                id="noCnpjConsignado"
                value={formData.noCnpjConsignado || ''}
                onChange={(e) => onInputChange('noCnpjConsignado', e.target.value)}
                placeholder="XXXXXXXXXXXX"
                className="w-full"
              />
            </div>
          </div>

          {/* Termos e Instruções */}
          <div className="grid grid-cols-1 gap-4 mb-6 border p-4 rounded">
            <div>
              <h3 className="font-semibold mb-4 border-b pb-2">TERMOS E INSTRUÇÕES</h3>
            </div>
            
            <div>
              <Label htmlFor="noTermoPagamento">Termo de Pagamento (Payment Term)</Label>
              <Input
                id="noTermoPagamento"
                value={formData.noTermoPagamento || ''}
                onChange={(e) => onInputChange('noTermoPagamento', e.target.value)}
                placeholder="XXXXXXXXXXXXXXX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noInstrucaoEnvio">Instrução de Envio (Shipment Instruction)</Label>
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

          {/* Assinatura */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-3">
              <h3 className="font-semibold mb-4 border-b pb-2">ASSINATURA</h3>
            </div>
            
            <div>
              <Label htmlFor="noAssinante">Nome</Label>
              <Input
                id="noAssinante"
                value={formData.noAssinante || ''}
                onChange={(e) => onInputChange('noAssinante', e.target.value)}
                placeholder="Evandro Amorim"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noCargo">Cargo</Label>
              <Input
                id="noCargo"
                value={formData.noCargo || ''}
                onChange={(e) => onInputChange('noCargo', e.target.value)}
                placeholder="International Division"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="noEaa">EAA</Label>
              <Input
                id="noEaa"
                value={formData.noEaa || ''}
                onChange={(e) => onInputChange('noEaa', e.target.value)}
                placeholder="EAA - XXX."
                className="w-full"
              />
            </div>
          </div>

          {/* Botão de Download */}
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

export default NOForm;
