import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Paperclip, Send, Upload, AlertTriangle, FileUp } from 'lucide-react';
import { useState } from 'react';
import CustomAlertModal from './CustomAlertModal';

interface NOFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOForm = ({ formData, onInputChange }: NOFormProps) => {
  const [activeSubTab, setActiveSubTab] = useState('pedido');
  const [aoAnexada, setAoAnexada] = useState(false);
  const [pagamentoPago, setPagamentoPago] = useState(false);
  const [liImportada, setLiImportada] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  
  // Estados para Packing List
  const [packingListRecebido, setPackingListRecebido] = useState('');
  const [packingListFile, setPackingListFile] = useState<File | null>(null);
  const [usuarioResponsavel, setUsuarioResponsavel] = useState('');
  const [clienteAprovou, setClienteAprovou] = useState('');
  const [motivoNaoAprovacao, setMotivoNaoAprovacao] = useState('');
  const [documentacaoFinalRecebida, setDocumentacaoFinalRecebida] = useState('');
  const [documentacaoFile, setDocumentacaoFile] = useState<File | null>(null);
  const [motivoSemDocumentacao, setMotivoSemDocumentacao] = useState('');
  const [clienteRecebeuDocumentacao, setClienteRecebeuDocumentacao] = useState('');
  const [motivoClienteNaoRecebeu, setMotivoClienteNaoRecebeu] = useState('');

  // Estados para DDR
  const [ddrData, setDdrData] = useState({
    autorizacaoAnvisa: '103.011-6',
    numeroRegularizacao: '10301160243',
    licenciamentoImportacao: '25/1217686-1',
    rdcNumero: '81',
    dataRdc: '05/11/2008',
    unidadeSaude: 'HOSPITAL SAO VICENTE DE PAULO',
    cnpjUnidadeSaude: '18.010.750/0001-00',
    finalidadeImportacao: 'Uso exclusivo',
    codigoInterno: '944-157',
    nomeComercial: 'REF. 944-157 - SOLUTION PACK - SP90, 680 ATIVIDADES. TEMPERATURA DE ARMAZENAGEM: +2°C A +25°C',
    apresentacaoComercial: 'UNIDADE',
    registroMS: '10301160243',
    numeroSerie: '944-157DX10',
    dataFabricacao: '04/03/2025',
    dataValidade: '31/08/2025',
    naoComercio: false,
    rastreabilidade: false,
    normasSanitarias: false,
    declaracaoValida: false,
    responsavelNome: 'Sylvio dos Santos Jr.',
    responsavelFuncao: 'Responsável Técnico e Legal',
    responsavelCrq: '03211626',
    dataDeclaracao: '27/03/2025',
    cidadeEstado: 'Niterói – RJ',
    statusDocumento: 'rascunho'
  });

  // Lista de usuários do sistema (mock)
  const usuarios = [
    'João Silva',
    'Maria Santos', 
    'Carlos Oliveira',
    'Ana Costa',
    'Faber Oliveira'
  ];

  const finalidadesImportacao = [
    'Uso exclusivo',
    'Pesquisa científica',
    'Demonstração',
    'Avaliação técnica'
  ];

  const statusDocumento = [
    'rascunho',
    'pronto para assinatura',
    'assinado',
    'vencido'
  ];

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
    setAoAnexada(true);
    setActiveSubTab('instrucao-embarque');
    console.log('AO anexada - mostrando campos de instrução de embarque');
  };

  const handleTogglePagamento = () => {
    setPagamentoPago(!pagamentoPago);
    console.log(`Status de pagamento alterado para: ${!pagamentoPago ? 'Pago' : 'Não Pago'}`);
  };

  const handleEnviarInstrucoes = () => {
    setActiveSubTab('packing-list');
    console.log('Enviando instruções de embarque e direcionando para Packing List...');
  };

  const handlePackingListFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPackingListFile(file);
      console.log('Packing List anexado:', file.name);
    }
  };

  const handleDocumentacaoFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentacaoFile(file);
      console.log('Documentação final anexada:', file.name);
    }
  };

  const handleClienteNaoAprovou = () => {
    if (motivoNaoAprovacao.trim()) {
      setShowCustomAlert(true);
      console.log('Cliente não aprovou. Motivo:', motivoNaoAprovacao);
    }
  };

  const handleAlertConfirm = () => {
    setShowCustomAlert(false);
    // Aqui você implementaria a navegação para a aba SPI no componente pai
    console.log('Redirecionando para aba SPI...');
  };

  const handleImportarLI = () => {
    setLiImportada(true);
    setActiveSubTab('ddr');
    console.log('LI importada - ativando aba DDR');
  };

  const handleDdrInputChange = (field: string, value: any) => {
    setDdrData(prev => ({
      ...prev,
      [field]: value
    }));
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
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pedido">Pedido</TabsTrigger>
              <TabsTrigger value="instrucao-embarque" disabled={!aoAnexada}>
                Instrução de Embarque
              </TabsTrigger>
              <TabsTrigger value="packing-list" disabled={!pagamentoPago}>
                Packing List ou Validades
              </TabsTrigger>
              <TabsTrigger value="ddr" disabled={!liImportada}>
                DDR
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pedido" className="space-y-6 mt-6">
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

              <div className="flex justify-center gap-4">
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
            </TabsContent>

            <TabsContent value="instrucao-embarque" className="space-y-6 mt-6">
              {/* Cabeçalho da Empresa - Fixo */}
              <div className="border p-4 rounded bg-gray-50">
                <div className="space-y-2 text-sm">
                  <p className="font-bold">BIODINA EMPREENDIMENTOS E PARTICIPAÇÕES LTDA.</p>
                  <p>AVENIDA DAS AMÉRICAS 505 SALA 217 – BARRA DA TIJUCA</p>
                  <p>22631- 000- RIO DE JANEIRO - RJ, BRASIL.</p>
                  <p>TEL.: 55 21 2435-9872 - FAX: 55 21 2435-9870</p>
                  <p>biosi@biodina.com.br</p>
                  <p className="italic">If you do not receive all pages, please call: + 55 21 2435-9872</p>
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

              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-4 border-b pb-2">SHIPPING INSTRUCTIONS</h3>
                <p className="text-sm italic">Please pack the goods of our order a.m. as soon as possible in accordance with the following instructions:</p>
              </div>

              <div className="grid grid-cols-1 gap-4 border p-4 rounded">
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

              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-4 border-b pb-2">DELIVERY ADDRESS</h3>
                <div className="space-y-2 text-sm">
                  <p>Rua Goncalves Crespo, 430 - Tijuca</p>
                  <p>20.270-320 Rio de Janeiro - RJ</p>
                  <p>Brazil</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 border p-4 rounded">
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

              <div className="border p-4 rounded bg-gray-50">
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

              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-4 border-b pb-2">EXPORTER INFORMATION</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">EXPORTADOR:</p>
                  <p>Radiometer Medical Aps</p>
                  <p>Akandevej 21,DK-2700</p>
                  <p>Bronshoj - Denmark</p>
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
                    <button
                      onClick={handleTogglePagamento}
                      className={`px-4 py-2 rounded font-medium transition-colors ${
                        pagamentoPago
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {pagamentoPago ? 'Pago' : 'Não Pago'}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      {pagamentoPago 
                        ? 'Pagamento confirmado. Você pode enviar as instruções de embarque.'
                        : 'Aguardando confirmação de pagamento para liberar o envio das instruções.'
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
            </TabsContent>

            <TabsContent value="packing-list" className="space-y-6 mt-6">
              <div className="border p-4 rounded bg-purple-50">
                <h3 className="font-bold mb-4 text-lg text-purple-700">Packing List ou Validades (Fábrica)</h3>
              </div>

              {/* Packing List Recebido */}
              <div className="border p-4 rounded">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Packing list recebido:</Label>
                    <Select value={packingListRecebido} onValueChange={setPackingListRecebido}>
                      <SelectTrigger className="w-48 mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {packingListRecebido === 'sim' && (
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                      <Label className="block mb-2 font-medium">Upload do Packing List</Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          id="packingListFile"
                          onChange={handlePackingListFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.png"
                        />
                        <Button
                          onClick={() => document.getElementById('packingListFile')?.click()}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Anexar Packing List
                        </Button>
                        {packingListFile && (
                          <span className="text-sm text-green-600">
                            ✓ {packingListFile.name}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Campos que só aparecem após upload do packing list */}
              {packingListRecebido === 'sim' && packingListFile && (
                <>
                  {/* Usuário Responsável */}
                  <div className="border p-4 rounded">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Selecionar usuário responsável para verificar itens do Packing list:</Label>
                        <Select value={usuarioResponsavel} onValueChange={setUsuarioResponsavel}>
                          <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Selecione o usuário responsável" />
                          </SelectTrigger>
                          <SelectContent>
                            {usuarios.map((usuario) => (
                              <SelectItem key={usuario} value={usuario}>
                                {usuario}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-blue-600 mt-2 italic">
                          ℹ️ Este processo está gerando histórico na sub-aba Histórico/Chat na aba principal COMERCIAL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cliente Aprovou */}
                  <div className="border p-4 rounded">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Cliente aprovou?</Label>
                        <Select value={clienteAprovou} onValueChange={setClienteAprovou}>
                          <SelectTrigger className="w-48 mt-2">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {clienteAprovou === 'nao' && (
                        <div className="space-y-4">
                          <div>
                            <Label className="block mb-2 font-medium">Motivo da não aprovação:</Label>
                            <Textarea
                              value={motivoNaoAprovacao}
                              onChange={(e) => setMotivoNaoAprovacao(e.target.value)}
                              placeholder="Digite o motivo da não aprovação..."
                              rows={3}
                              className="w-full"
                            />
                          </div>
                          <Button
                            onClick={handleClienteNaoAprovou}
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={!motivoNaoAprovacao.trim()}
                          >
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Salvar Motivo
                          </Button>
                        </div>
                      )}

                      {clienteAprovou === 'sim' && (
                        <p className="text-sm text-blue-600 italic">
                          ℹ️ Este processo está gerando histórico na sub-aba Histórico/Chat na aba principal COMERCIAL
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Documentação Final de Embarque */}
                  {clienteAprovou === 'sim' && (
                    <div className="border p-4 rounded">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-semibold">Recebeu da fábrica a documentação final de embarque:</Label>
                          <Select value={documentacaoFinalRecebida} onValueChange={setDocumentacaoFinalRecebida}>
                            <SelectTrigger className="w-48 mt-2">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {documentacaoFinalRecebida === 'sim' && (
                          <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                            <Label className="block mb-2 font-medium">Upload da Documentação Final</Label>
                            <div className="flex items-center gap-4">
                              <input
                                type="file"
                                id="documentacaoFile"
                                onChange={handleDocumentacaoFileUpload}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                              />
                              <Button
                                onClick={() => document.getElementById('documentacaoFile')?.click()}
                                className="bg-green-600 text-white hover:bg-green-700"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Anexar Documentação
                              </Button>
                              {documentacaoFile && (
                                <span className="text-sm text-green-600">
                                  ✓ {documentacaoFile.name}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {documentacaoFinalRecebida === 'nao' && (
                          <div>
                            <Label className="block mb-2 font-medium">Motivo:</Label>
                            <Textarea
                              value={motivoSemDocumentacao}
                              onChange={(e) => setMotivoSemDocumentacao(e.target.value)}
                              placeholder="Digite o motivo de não ter recebido a documentação..."
                              rows={3}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cliente Recebeu Documentação */}
                  {documentacaoFinalRecebida === 'sim' && documentacaoFile && (
                    <div className="border p-4 rounded">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-semibold">Cliente recebeu a documentação?</Label>
                          <Select value={clienteRecebeuDocumentacao} onValueChange={setClienteRecebeuDocumentacao}>
                            <SelectTrigger className="w-48 mt-2">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {clienteRecebeuDocumentacao === 'nao' && (
                          <div>
                            <Label className="block mb-2 font-medium">Motivo:</Label>
                            <Textarea
                              value={motivoClienteNaoRecebeu}
                              onChange={(e) => setMotivoClienteNaoRecebeu(e.target.value)}
                              placeholder="Digite o motivo do cliente não ter recebido a documentação..."
                              rows={3}
                              className="w-full"
                            />
                          </div>
                        )}

                        {clienteRecebeuDocumentacao === 'sim' && (
                          <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 p-4 rounded">
                              <p className="text-green-700 font-medium">
                                ✓ Processo de Packing List concluído com sucesso!
                              </p>
                            </div>
                            
                            <div className="flex justify-center">
                              <Button
                                onClick={handleImportarLI}
                                className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3"
                              >
                                <FileUp className="h-4 w-4 mr-2" />
                                Importar LI
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="ddr" className="space-y-6 mt-6">
              <div className="border p-4 rounded bg-blue-50">
                <h3 className="font-bold mb-4 text-lg text-blue-700">
                  DECLARAÇÃO DO DETENTOR DA REGULARIZAÇÃO DO PRODUTO AUTORIZANDO A IMPORTAÇÃO DIRETA POR UNIDADE DE SAÚDE
                </h3>
              </div>

              {/* 1. Cabeçalho */}
              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-4 border-b pb-2">1. CABEÇALHO (Carregado automaticamente do sistema)</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-bold">BIODINA INSTRUMENTOS CIENTÍFICOS LTDA</p>
                  <p>29.375.441/0001-50</p>
                  <p>BIODINA</p>
                  <p>COMÉRCIO DE MATERIAIS CIENTÍFICOS</p>
                </div>
              </div>

              {/* 2. Informações da Regularização e Importação */}
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-4 border-b pb-2">2. INFORMAÇÕES DA REGULARIZAÇÃO E IMPORTAÇÃO</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Campo</th>
                        <th className="border border-gray-300 p-2 text-left">Valor</th>
                        <th className="border border-gray-300 p-2 text-left">Fonte</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Autorização ANVISA (AFE nº)</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.autorizacaoAnvisa}
                            onChange={(e) => handleDdrInputChange('autorizacaoAnvisa', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Manual</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Número da regularização na ANVISA</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.numeroRegularizacao}
                            onChange={(e) => handleDdrInputChange('numeroRegularizacao', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Importado ou manual</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Licenciamento de Importação nº</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.licenciamentoImportacao}
                            onChange={(e) => handleDdrInputChange('licenciamentoImportacao', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Manual</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Resolução da Diretoria Colegiada (RDC nº)</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.rdcNumero}
                            onChange={(e) => handleDdrInputChange('rdcNumero', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Fixo (pode estar pré-cadastrado)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Data da RDC</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.dataRdc}
                            onChange={(e) => handleDdrInputChange('dataRdc', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Fixo</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Unidade de saúde autorizada</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.unidadeSaude}
                            onChange={(e) => handleDdrInputChange('unidadeSaude', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Buscar no cadastro</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">CNPJ da unidade de saúde</td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            value={ddrData.cnpjUnidadeSaude}
                            onChange={(e) => handleDdrInputChange('cnpjUnidadeSaude', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Buscar no cadastro</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Finalidade da importação</td>
                        <td className="border border-gray-300 p-2">
                          <Select 
                            value={ddrData.finalidadeImportacao} 
                            onValueChange={(value) => handleDdrInputChange('finalidadeImportacao', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {finalidadesImportacao.map((finalidade) => (
                                <SelectItem key={finalidade} value={finalidade}>
                                  {finalidade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-600">Seleção no sistema</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Informações do Produto */}
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-4 border-b pb-2">3. INFORMAÇÕES DO PRODUTO</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="codigoInterno">Código interno</Label>
                    <Input
                      id="codigoInterno"
                      value={ddrData.codigoInterno}
                      onChange={(e) => handleDdrInputChange('codigoInterno', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="apresentacaoComercial">Apresentação Comercial</Label>
                    <Input
                      id="apresentacaoComercial"
                      value={ddrData.apresentacaoComercial}
                      onChange={(e) => handleDdrInputChange('apresentacaoComercial', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <Label htmlFor="nomeComercial">Nome Comercial do Produto</Label>
                    <Textarea
                      id="nomeComercial"
                      value={ddrData.nomeComercial}
                      onChange={(e) => handleDdrInputChange('nomeComercial', e.target.value)}
                      rows={3}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="registroMS">Registro no Ministério da Saúde nº</Label>
                    <Input
                      id="registroMS"
                      value={ddrData.registroMS}
                      onChange={(e) => handleDdrInputChange('registroMS', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="numeroSerie">Número de Série</Label>
                    <Input
                      id="numeroSerie"
                      value={ddrData.numeroSerie}
                      onChange={(e) => handleDdrInputChange('numeroSerie', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dataFabricacao">Data de Fabricação</Label>
                    <Input
                      id="dataFabricacao"
                      value={ddrData.dataFabricacao}
                      onChange={(e) => handleDdrInputChange('dataFabricacao', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dataValidade">Data de Validade</Label>
                    <Input
                      id="dataValidade"
                      value={ddrData.dataValidade}
                      onChange={(e) => handleDdrInputChange('dataValidade', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  (Essas informações podem ser preenchidas a partir do XML da DI ou ficha técnica do produto no sistema)
                </p>
              </div>

              {/* 4. Declarações Legais */}
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-4 border-b pb-2">4. DECLARAÇÕES LEGAIS (Checkbox no sistema)</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="naoComercio"
                      checked={ddrData.naoComercio}
                      onCheckedChange={(checked) => handleDdrInputChange('naoComercio', checked)}
                    />
                    <Label htmlFor="naoComercio">Produtos não serão destinados ao comércio</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rastreabilidade"
                      checked={ddrData.rastreabilidade}
                      onCheckedChange={(checked) => handleDdrInputChange('rastreabilidade', checked)}
                    />
                    <Label htmlFor="rastreabilidade">Rastreabilidade garantida conforme Lei nº 6360/76 e Decreto nº 8.077/2013</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="normasSanitarias"
                      checked={ddrData.normasSanitarias}
                      onCheckedChange={(checked) => handleDdrInputChange('normasSanitarias', checked)}
                    />
                    <Label htmlFor="normasSanitarias">Observância das normas sanitárias conforme Lei nº 6437/77</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="declaracaoValida"
                      checked={ddrData.declaracaoValida}
                      onCheckedChange={(checked) => handleDdrInputChange('declaracaoValida', checked)}
                    />
                    <Label htmlFor="declaracaoValida">Declaração válida por 90 dias a partir da assinatura</Label>
                  </div>
                </div>
              </div>

              {/* 5. Assinatura do Responsável */}
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-4 border-b pb-2">5. ASSINATURA DO RESPONSÁVEL</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="responsavelNome">Nome do responsável técnico/legal</Label>
                    <Input
                      id="responsavelNome"
                      value={ddrData.responsavelNome}
                      onChange={(e) => handleDdrInputChange('responsavelNome', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="responsavelFuncao">Função</Label>
                    <Input
                      id="responsavelFuncao"
                      value={ddrData.responsavelFuncao}
                      onChange={(e) => handleDdrInputChange('responsavelFuncao', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="responsavelCrq">C.R.Q.</Label>
                    <Input
                      id="responsavelCrq"
                      value={ddrData.responsavelCrq}
                      onChange={(e) => handleDdrInputChange('responsavelCrq', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Outros Campos do Sistema */}
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-4 border-b pb-2">6. OUTROS CAMPOS DO SISTEMA</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dataDeclaracao">Data da Declaração</Label>
                    <Input
                      id="dataDeclaracao"
                      value={ddrData.dataDeclaracao}
                      onChange={(e) => handleDdrInputChange('dataDeclaracao', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cidadeEstado">Cidade e Estado</Label>
                    <Input
                      id="cidadeEstado"
                      value={ddrData.cidadeEstado}
                      onChange={(e) => handleDdrInputChange('cidadeEstado', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="statusDocumento">Status do Documento</Label>
                    <Select 
                      value={ddrData.statusDocumento} 
                      onValueChange={(value) => handleDdrInputChange('statusDocumento', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusDocumento.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal de Alerta Customizado */}
      <CustomAlertModal
        isOpen={showCustomAlert}
        title="Atenção"
        message="Você precisa voltar na aba SPI para revisar os itens do pedido."
        onConfirm={handleAlertConfirm}
      />
    </div>
  );
};

export default NOForm;
