
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Upload, FileText, X } from 'lucide-react';
import { useState } from 'react';

interface InstrucaoEmbarqueFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const InstrucaoEmbarqueForm = ({ formData, onInputChange }: InstrucaoEmbarqueFormProps) => {
  const [pagamentoPago, setPagamentoPago] = useState(false);
  const [comprovantePagamento, setComprovantePagamento] = useState<File | null>(null);
  const [tipoProduto, setTipoProduto] = useState<string>('refrigerado');

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
        <CardHeader className="text-center border-b space-y-4">
          <CardTitle className="text-xl font-bold text-purple-600">
            INSTRUÇÃO DE EMBARQUE
          </CardTitle>
          <div className="flex items-center justify-center gap-3">
            <Label htmlFor="tipoProduto" className="text-sm font-medium">
              Tipo de Produto:
            </Label>
            <Select value={tipoProduto} onValueChange={setTipoProduto}>
              <SelectTrigger id="tipoProduto" className="w-[200px]">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="refrigerado">Produto Refrigerado</SelectItem>
                <SelectItem value="congelado">Produto Congelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                  value={formData.companyName || 'Biodina Instrumentos Científicos LTDA'}
                  onChange={(e) => onInputChange('companyName', e.target.value)}
                  className="w-full font-bold"
                />
              </div>
              
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Input
                  id="companyAddress"
                  value={formData.companyAddress || 'Rua São Pedro, n°. 154 – Sala 409 – Centro'}
                  onChange={(e) => onInputChange('companyAddress', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyZipCity">ZIP Code - City - State - Country</Label>
                <Input
                  id="companyZipCity"
                  value={formData.companyZipCity || 'CEP: 24.020-058/ Niterói / RJ/ Brazil'}
                  onChange={(e) => onInputChange('companyZipCity', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyPhone">Phone</Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone || '55 21 2435-9872'}
                  onChange={(e) => onInputChange('companyPhone', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  value={formData.companyEmail || 'importacao@biodina.com.br'}
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

          {/* Nova Seção - Shipping Documents - Apenas para Refrigerado */}
          {tipoProduto === 'refrigerado' && (
            <div className="border p-4 rounded bg-blue-50">
              <h3 className="font-semibold mb-4 border-b pb-2 text-lg">
                The following sentences need to be included in the shipping documents
              </h3>
              
              <div className="space-y-4">
                {/* Campos de Texto Simples */}
                <div>
                  <Label htmlFor="paisAquisicao">PAÍS DE AQUISIÇÃO DE TODOS OS ITENS:</Label>
                  <Input
                    id="paisAquisicao"
                    value={formData.paisAquisicao || 'DINAMARCA'}
                    onChange={(e) => onInputChange('paisAquisicao', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="paisProcedencia">PAÍS DE PROCEDÊNCIA DE TODOS OS ITENS:</Label>
                  <Input
                    id="paisProcedencia"
                    value={formData.paisProcedencia || 'POLÔNIA'}
                    onChange={(e) => onInputChange('paisProcedencia', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="previsaoEmbarque">PREVISÃO DE EMBARQUE:</Label>
                  <Textarea
                    id="previsaoEmbarque"
                    value={formData.previsaoEmbarque || '30 DIAS APÓS A CONFIRMAÇÃO DO RECEBIMENTO DO PAGAMENTO E/OU APÓS AUTORIZAÇÃO DE EMBARQUE'}
                    onChange={(e) => onInputChange('previsaoEmbarque', e.target.value)}
                    rows={2}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="aeroportoOrigem">AEROPORTO DE ORIGEM:</Label>
                  <Input
                    id="aeroportoOrigem"
                    value={formData.aeroportoOrigem || 'AEROPORTO INTERNACIONAL DE COPENHAGEN / DINAMARCA'}
                    onChange={(e) => onInputChange('aeroportoOrigem', e.target.value)}
                    className="w-full"
                  />
                </div>

              <div>
                <Label htmlFor="aeroportoDestino">AEROPORTO DE DESTINO:</Label>
                <Input
                  id="aeroportoDestino"
                  value={formData.aeroportoDestino || ''}
                  onChange={(e) => onInputChange('aeroportoDestino', e.target.value)}
                  className="w-full"
                />
              </div>

                <div>
                  <Label htmlFor="entrega">Entrega:</Label>
                  <Textarea
                    id="entrega"
                    value={formData.entrega || 'O material estará disponível para coleta dentro de 3 dias após nossa notificação de coleta ao agente de cargas indicado'}
                    onChange={(e) => onInputChange('entrega', e.target.value)}
                    rows={2}
                    className="w-full"
                  />
                </div>

              {/* For each box section - Structured fields */}
              <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
                <Label className="text-base font-semibold mb-3 block">For each box, please include:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="boxControlNo" className="text-sm">
                      Control no. <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="boxControlNo"
                      value={formData.boxControlNo || ''}
                      onChange={(e) => onInputChange('boxControlNo', e.target.value)}
                      className="w-full mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="boxTemperature" className="text-sm">
                      Temperature <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="boxTemperature"
                      value={formData.boxTemperature || ''}
                      onChange={(e) => onInputChange('boxTemperature', e.target.value)}
                      className="w-full mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="boxDimension" className="text-sm">
                      Dimension <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="boxDimension"
                      value={formData.boxDimension || ''}
                      onChange={(e) => onInputChange('boxDimension', e.target.value)}
                      className="w-full mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="boxGrossWeight" className="text-sm">
                      Gross weight <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="boxGrossWeight"
                      value={formData.boxGrossWeight || ''}
                      onChange={(e) => onInputChange('boxGrossWeight', e.target.value)}
                      className="w-full mt-1"
                    />
                  </div>
                </div>
              </div>

                {/* Packing List Section */}
                <div className="border p-4 rounded bg-white mt-4">
                  <h4 className="font-semibold mb-3">2- Packing List: Please mention on the Packing list:</h4>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="pl1" className="mt-1" />
                      <Label htmlFor="pl1" className="cursor-pointer">Portuguese description as proforma invoice</Label>
                      <Input
                        type="text"
                        value={formData.numeroInvoicePackingList || ''}
                        onChange={(e) => onInputChange('numeroInvoicePackingList', e.target.value)}
                        placeholder="Nº da invoice"
                        className="w-40 h-8 ml-2"
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="pl2" className="mt-1" />
                      <Label htmlFor="pl2" className="cursor-pointer">Total of cartons and its marks</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="pl3" className="mt-1" />
                      <Label htmlFor="pl3" className="cursor-pointer">Unit and total Gross weight</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="pl4" className="mt-1" />
                      <Label htmlFor="pl4" className="cursor-pointer">Unit and total Net weight</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="pl5" className="mt-1" />
                      <Label htmlFor="pl5" className="cursor-pointer">Temperature of each item</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="pl6" className="mt-1" />
                      <Label htmlFor="pl6" className="cursor-pointer">For each box, please include: control no.; Temperature; Dimension; Gross weight</Label>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
                    <p className="font-medium">
                      THE ORIGINAL INVOICE (PLUS 1 COPY) AND PACKING LIST (PLUS 1 COPY). MUST BE SENT TOGETHER WITH THE CARGO: 
                      DULY SIGNED (WITH THE RESPONSIBLE'S WHOLE NAME AND HIS/HER POSITION AT THE COMPANY) WITH BLUE INK PEN, 
                      STAMPED WITHOUT ANY KIND OF ERASURES, STAINS, OVERWRITING, CORRECTION FLUID OR OTHER.
                    </p>
                  </div>
                </div>

                {/* Certificate of Quality */}
                <div>
                  <Label htmlFor="certificateQuality">3- Certificate of Quality:</Label>
                  <Textarea
                    id="certificateQuality"
                    value={formData.certificateQuality || 'Together with all documents'}
                    onChange={(e) => onInputChange('certificateQuality', e.target.value)}
                    rows={2}
                    className="w-full"
                  />
                </div>

                {/* Packing */}
                <div>
                  <Label htmlFor="packing">4- Packing:</Label>
                  <Textarea
                    id="packing"
                    value={formData.packing || "As usual for this merchandise. IN CASE OF PACKAGES, BOXES OR PALLETS MADE OF WOOD, FUMIGATION IS OBLIGED AND ALSO THE IPPC STAMP ON THE WOOD IS OBLIGED. THE FUMIGATION CERTIFICATE MUST BE SENT TOGETHER WITH THE CARGO DECLARING THE IPPC STAMP CODE OF THE WOOD FOR EACH SHIPMENT. THE NON-COMPLIANCE WILL IMPLY THE RETURN OF THE GOODS TO THE ORIGIN (COSTS OF THE RETURN WILL BE COVERED BY THE EXPORTER), ACCORDING TO THE RULES OF 'IN 32/2015' OF MINISTRY OF AGRICULTURE."}
                    onChange={(e) => onInputChange('packing', e.target.value)}
                    rows={4}
                    className="w-full"
                  />
                </div>

                {/* Insurance */}
                <div>
                  <Label htmlFor="insurance">5- Insurance:</Label>
                  <Input
                    id="insurance"
                    value={formData.insurance || 'Will be covered by the customer'}
                    onChange={(e) => onInputChange('insurance', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Forwarder */}
                <div>
                  <Label htmlFor="forwarder">6- Forwarder:</Label>
                  <Textarea
                    id="forwarder"
                    value={formData.forwarder || 'Please contact the following agent forwarder:'}
                    onChange={(e) => onInputChange('forwarder', e.target.value)}
                    rows={2}
                    className="w-full"
                  />
                </div>

                {/* Others */}
                <div>
                  <Label htmlFor="others">7- Others:</Label>
                  <Textarea
                    id="others"
                    value={formData.others || 'Please e-mail us the copy of all shipping documents as soon as possible, as following: *Comercial Invoice, *Packing list, *Quality Certificate, *Consignment Note, *Treated Wood Certificate and *Shipper declaration for dangerous goods and package certificate for dangerous goods (when applicable).'}
                    onChange={(e) => onInputChange('others', e.target.value)}
                    rows={3}
                    className="w-full"
                  />
                </div>

                {/* ATTENTION - Refrigerated Goods */}
                <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded mt-4">
                  <h4 className="font-bold mb-3 text-red-600">ATTENTION:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">
                      "TO AVOID PROBLEMS WITH THE REFRIGERATED GOODS, PLEASE PACK THESE ITEMS IN BIG BOXES, 
                      DULY STAMPED ON ALL OUTER PARTS WITH THE PORTUGUESE SENTENCE BELOW, DECLARING THE TEMPERATURE 
                      BETWEEN 2-8ºC, AS FOLLOWS:"
                    </p>
                    <div className="bg-white p-3 rounded border border-yellow-400 mt-2">
                      <p className="font-semibold">THE LABEL IN PORTUGUESE:</p>
                      <p className="font-bold text-blue-600">"ESTAS CAIXAS CONTÊM PRODUTOS QUE DEVEM SER REFRIGERADOS ENTRE 2-8ºC."</p>
                      <p className="font-semibold mt-2">THAT MEANS:</p>
                      <p className="font-bold text-blue-600">"THESE BOXES CONTAIN PRODUCTS WHICH SHOULD BE REFRIGERATED BETWEEN 2-8ºC."</p>
                    </div>
                    <p className="font-bold text-red-600 mt-3">ATTENTION:</p>
                    <p className="font-medium">THE REFRIGERATED ITEMS MUST BE PACKED SEPARATELY.</p>
                    <p className="font-medium">PLEASE THE PALLETS MUST NOT HAVE MORE THAN 120 (LENGTH) X 80 (WIDTH) X 100 (HEIGHT).</p>
                  </div>
                </div>

                {/* Batch/Serial Numbers */}
                <div>
                  <Label htmlFor="batchSerialAttention">8- ATTENTION! BATCH/SERIAL NUMBERS:</Label>
                  <Textarea
                    id="batchSerialAttention"
                    value="ATTENTION! PLEASE SEND US THE BATCH/SERIAL NUMBERS AND EXPIRY DATES OF ALL ITEMS BEFORE INVOICING FOR APPROVAL"
                    readOnly
                    rows={2}
                    className="w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* INSTRUCTIONS FOR THE FREIGHT FORWARD */}
                <div className="border p-4 rounded bg-green-50 mt-4">
                  <h4 className="font-bold mb-3 text-lg">INSTRUCTIONS FOR THE FREIGHT FORWARD</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ffDestination">1- Destination:</Label>
                      <Input
                        id="ffDestination"
                        value={formData.ffDestination || ''}
                        onChange={(e) => onInputChange('ffDestination', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffFreight">2- Freight:</Label>
                      <Input
                        id="ffFreight"
                        value={formData.ffFreight || 'Collect'}
                        onChange={(e) => onInputChange('ffFreight', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffShipment">3- Shipment:</Label>
                      <Input
                        id="ffShipment"
                        value={formData.ffShipment || 'By airfreight'}
                        onChange={(e) => onInputChange('ffShipment', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffAirWaybill">4- Air waybill: Consigned to:</Label>
                      <Input
                        id="ffAirWaybill"
                        value={formData.ffAirWaybill || 'The customer above mentioned'}
                        onChange={(e) => onInputChange('ffAirWaybill', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffNotify">Notify:</Label>
                      <Textarea
                        id="ffNotify"
                        value={formData.ffNotify || ''}
                        onChange={(e) => onInputChange('ffNotify', e.target.value)}
                        rows={2}
                        placeholder="Enter notify information..."
                        className="w-full"
                      />
                    </div>

                    <div className="bg-blue-100 border border-blue-300 p-3 rounded">
                      <p className="font-medium text-sm">
                        PLEASE DECLARE ON THE AWB THE NET AND GROSS WEIGHT OF THE GOODS.
                      </p>
                    </div>

                    <div className="bg-yellow-100 border-2 border-yellow-400 p-3 rounded">
                      <p className="font-bold text-red-600 mb-2">ALSO PLEASE DECLARE THE FOLLOWING SENTENCE ON THE AWB:</p>
                      <p className="font-bold mb-1">ATTENTION:</p>
                      <p className="font-semibold">"THE BOXES MARKED WITH THE LABEL MUST BE REFRIGERATED BETWEEN 2-8ºC"</p>
                      <p className="font-semibold">"AS CAIXAS MARCADAS COM A ETIQUETA DEVEM SER REFRIGERADAS ENTRE 2-8ºC"</p>
                    </div>

                    <div>
                      <Label htmlFor="ffOthers">5- Others:</Label>
                      <Textarea
                        id="ffOthers"
                        value={formData.ffOthers || 'Please e-mail us (vanessa.hevia@biodina.com.br) a copy of AWB as soon as you have dispatched the goods. PLEASE SEND THE ORIGINAL COMMERCIAL INVOICE, PACKING LIST AND AWB TOGETHER WITH THE CARGO.'}
                        onChange={(e) => onInputChange('ffOthers', e.target.value)}
                        rows={3}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Signature */}
                <div className="border p-4 rounded bg-gray-50 mt-4">
                  <div className="text-sm space-y-1">
                    <p>Looking forward to hearing from you soon.</p>
                    <p>Cordially,</p>
                    <p className="mt-3 font-semibold">Evandro Amorim</p>
                    <p>International Division</p>
                    <p>EAA</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEÇÃO ESPECÍFICA PARA PRODUTOS CONGELADOS */}
          {tipoProduto === 'congelado' && (
            <div className="border-2 border-orange-500 p-6 rounded-lg bg-orange-50 space-y-6 mt-6">
              <h3 className="text-lg font-bold text-orange-700 border-b-2 border-orange-300 pb-2">
                The following sentences need to be included in the shipping documents - PRODUTOS CONGELADOS
              </h3>

              <div className="space-y-6">
                {/* Campos de Texto Básicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paisAquisicao_congelado">PAÍS DE AQUISIÇÃO DE TODOS OS ITENS:</Label>
                    <Input
                      id="paisAquisicao_congelado"
                      value={formData.paisAquisicao_congelado || 'DINAMARCA'}
                      onChange={(e) => onInputChange('paisAquisicao_congelado', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="paisProcedencia_congelado">PAÍS DE PROCEDÊNCIA DE TODOS OS ITENS:</Label>
                    <Input
                      id="paisProcedencia_congelado"
                      value={formData.paisProcedencia_congelado || 'POLÔNIA'}
                      onChange={(e) => onInputChange('paisProcedencia_congelado', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="previsaoEmbarque_congelado">PREVISÃO DE EMBARQUE:</Label>
                  <Input
                    id="previsaoEmbarque_congelado"
                    value={formData.previsaoEmbarque_congelado || '30 DIAS APÓS A CONFIRMAÇÃO DO RECEBIMENTO DO PAGAMENTO E/OU APÓS AUTORIZAÇÃO DE EMBARQUE'}
                    onChange={(e) => onInputChange('previsaoEmbarque_congelado', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aeroportoOrigem_congelado">AEROPORTO DE ORIGEM:</Label>
                    <Input
                      id="aeroportoOrigem_congelado"
                      value={formData.aeroportoOrigem_congelado || 'AEROPORTO INTERNACIONAL DE COPENHAGEN / DINAMARCA'}
                      onChange={(e) => onInputChange('aeroportoOrigem_congelado', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aeroportoDestino_congelado">AEROPORTO DE DESTINO:</Label>
                    <Input
                      id="aeroportoDestino_congelado"
                      value={formData.aeroportoDestino_congelado || ''}
                      onChange={(e) => onInputChange('aeroportoDestino_congelado', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="entrega_congelado">Entrega:</Label>
                  <Input
                    id="entrega_congelado"
                    value={formData.entrega_congelado || 'O material estará disponível para coleta dentro de 3 dias após nossa notificação de coleta ao agente de cargas indicado'}
                    onChange={(e) => onInputChange('entrega_congelado', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* For each box section - Structured fields (Congelado) */}
                <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
                  <Label className="text-base font-semibold mb-3 block">For each box, please include:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="boxControlNo_congelado" className="text-sm">
                        Control no. <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="boxControlNo_congelado"
                        value={formData.boxControlNo_congelado || ''}
                        onChange={(e) => onInputChange('boxControlNo_congelado', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="boxTemperature_congelado" className="text-sm">
                        Temperature <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="boxTemperature_congelado"
                        value={formData.boxTemperature_congelado || ''}
                        onChange={(e) => onInputChange('boxTemperature_congelado', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="boxDimension_congelado" className="text-sm">
                        Dimension <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="boxDimension_congelado"
                        value={formData.boxDimension_congelado || ''}
                        onChange={(e) => onInputChange('boxDimension_congelado', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="boxGrossWeight_congelado" className="text-sm">
                        Gross weight <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="boxGrossWeight_congelado"
                        value={formData.boxGrossWeight_congelado || ''}
                        onChange={(e) => onInputChange('boxGrossWeight_congelado', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Packing List Multi-select */}
                <div className="border p-4 rounded bg-white">
                  <Label className="text-base font-semibold mb-3 block">2- Packing List: Please mention on the Packing list:</Label>
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Portuguese description as proforma invoice</span>
                      <Input
                        type="text"
                        value={formData.numeroInvoicePackingList_congelado || ''}
                        onChange={(e) => onInputChange('numeroInvoicePackingList_congelado', e.target.value)}
                        placeholder="Nº da invoice"
                        className="w-40 h-8 ml-2"
                      />
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Total of cartons and its marks</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Unit and total Gross weight</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Unit and total Net weight</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Temperature of each item</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">For each box, please include: control no.; Temperature; Dimension; Gross weight</span>
                    </label>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
                    <p className="font-semibold">THE ORIGINAL INVOICE (PLUS 1 COPY) AND PACKING LIST (PLUS 1 COPY). MUST BE SENT TOGETHER WITH THE CARGO: DULY SIGNED (WITH THE RESPONSIBLE'S WHOLE NAME AND HIS/HER POSITION AT THE COMPANY) WITH BLUE INK PEN, STAMPED WITHOUT ANY KIND OF ERASURES, STAINS, OVERWRITING, CORRECTION FLUID OR OTHER.</p>
                  </div>
                </div>

                {/* Campos Adicionais 3-7 */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="certificateQuality_congelado">3- Certificate of Quality:</Label>
                    <Textarea
                      id="certificateQuality_congelado"
                      value={formData.certificateQuality_congelado || 'Together with all documents'}
                      onChange={(e) => onInputChange('certificateQuality_congelado', e.target.value)}
                      rows={2}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="packing_congelado">4- Packing:</Label>
                    <Textarea
                      id="packing_congelado"
                      value={formData.packing_congelado || 'As usual for this merchandise.\n\nIN CASE OF PACKAGES, BOXES OR PALLETS MADE OF WOOD, FUMIGATION IS OBLIGED AND ALSO THE IPPC STAMP ON THE WOOD IS OBLIGED. THE FUMIGATION CERTIFICATE MUST BE SENT TOGETHER WITH THE CARGO DECLARING THE IPPC STAMP CODE OF THE WOOD FOR EACH SHIPMENT. THE NON-COMPLIANCE WILL IMPLY THE RETURN OF THE GOODS TO THE ORIGIN (COSTS OF THE RETURN WILL BE COVERED BY THE EXPORTER), ACCORDING TO THE RULES OF "IN 32/2015" OF MINISTRY OF AGRICULTURE.'}
                      onChange={(e) => onInputChange('packing_congelado', e.target.value)}
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="insurance_congelado">5- Insurance:</Label>
                    <Input
                      id="insurance_congelado"
                      value={formData.insurance_congelado || 'Will be covered by the customer'}
                      onChange={(e) => onInputChange('insurance_congelado', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="forwarder_congelado">6- Forwarder:</Label>
                    <Textarea
                      id="forwarder_congelado"
                      value={formData.forwarder_congelado || 'Please contact the following agent forwarder:'}
                      onChange={(e) => onInputChange('forwarder_congelado', e.target.value)}
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="others_congelado">7- Others:</Label>
                    <Textarea
                      id="others_congelado"
                      value={formData.others_congelado || 'Please e-mail us the copy of all shipping documents as soon as possible, as following:\n*Comercial Invoice, *Packing list, *Quality Certificate, *Consignment Note, *Treated Wood Certificate and *Shipper declaration for dangerous goods and package certificate for dangerous goods (when applicable).'}
                      onChange={(e) => onInputChange('others_congelado', e.target.value)}
                      rows={4}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* ATTENTION FOR FROZEN PRODUCTS */}
                <div className="border-2 border-red-500 p-4 rounded bg-red-100">
                  <div className="space-y-3 text-sm">
                    <p className="font-bold text-red-800 text-base">ATTENTION FOR FROZEN ITEMS:</p>
                    <p className="font-semibold">"TO AVOID PROBLEMS WITH THE FROZEN GOODS, PLEASE PACK THESE ITEMS IN BIG BOXES, DULY STAMPED ON ALL OUTER PARTS WITH THE PORTUGUESE SENTENCE BELOW, DECLARING THE TEMPERATURE BETWEEN 2-8ºC, AS FOLLOWS:"</p>
                    
                    <div className="bg-white p-3 rounded border border-red-300 my-3">
                      <p className="font-bold mb-2">LABEL IN PORTUGUESE:</p>
                      <p className="font-semibold text-red-700">"ESTAS CAIXAS TÉRMICAS DE ISOPOR CONTÊM PRODUTOS CONGELADOS COM GELO SECO A -18ºC (dezoito graus celsius negativos)".</p>
                      
                      <p className="font-bold mt-3 mb-2">THAT MEANS:</p>
                      <p className="font-semibold text-red-700">"THIS THERMO BOX CONTAIN FROZEN PRODUCTS WITH DRY ICE AT -18ºC (eighteen negatives celsius degrees)".</p>
                    </div>

                    <p className="font-bold">THE FROZEN ITEMS MUST BE PACKED SEPARATELY.</p>
                    <p className="font-bold text-red-800">PLEASE INCLUDE THE TAGLOG TO MONITORIZE THE TEMPERATURE.</p>
                    <p className="font-semibold">PLEASE THE PALLETS MUST NOT HAVE MORE THAN 120 (LENGTH) X 80 (WIDTH) X 100 (HEIGHT).</p>
                  </div>
                </div>

                {/* Batch/Serial Numbers */}
                <div className="border p-3 rounded bg-yellow-50 border-yellow-400">
                  <p className="text-sm font-semibold text-yellow-900">8- ATTENTION! PLEASE SEND US THE BATCH/SERIAL NUMBERS AND EXPIRY DATES OF ALL ITEMS BEFORE INVOICING FOR APPROVAL</p>
                </div>

                {/* INSTRUCTIONS FOR THE FREIGHT FORWARD - CONGELADOS */}
                <div className="border-2 border-purple-400 p-4 rounded bg-purple-50 space-y-4">
                  <h4 className="font-bold text-lg text-purple-800 border-b-2 border-purple-300 pb-2">INSTRUCTIONS FOR THE FREIGHT FORWARD</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ffDestination_congelado">1- Destination:</Label>
                      <Input
                        id="ffDestination_congelado"
                        value={formData.ffDestination_congelado || ''}
                        onChange={(e) => onInputChange('ffDestination_congelado', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffFreight_congelado">2- Freight:</Label>
                      <Input
                        id="ffFreight_congelado"
                        value={formData.ffFreight_congelado || 'Collect'}
                        onChange={(e) => onInputChange('ffFreight_congelado', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffShipment_congelado">3- Shipment:</Label>
                      <Input
                        id="ffShipment_congelado"
                        value={formData.ffShipment_congelado || 'By airfreight'}
                        onChange={(e) => onInputChange('ffShipment_congelado', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffAirWaybill_congelado">4- Air waybill: Consigned to:</Label>
                      <Input
                        id="ffAirWaybill_congelado"
                        value={formData.ffAirWaybill_congelado || 'The customer above mentioned'}
                        onChange={(e) => onInputChange('ffAirWaybill_congelado', e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ffNotify_congelado">Notify:</Label>
                      <Textarea
                        id="ffNotify_congelado"
                        value={formData.ffNotify_congelado || ''}
                        onChange={(e) => onInputChange('ffNotify_congelado', e.target.value)}
                        rows={3}
                        className="w-full"
                      />
                    </div>

                    <div className="bg-blue-50 p-3 rounded border border-blue-300 text-sm">
                      <p className="font-semibold">PLEASE DECLARE ON THE AWB THE NET AND GROSS WEIGHT OF THE GOODS.</p>
                    </div>

                    <div className="bg-red-100 p-4 rounded border-2 border-red-400">
                      <p className="font-bold mb-2 text-red-800">ATTENTION:</p>
                      <p className="font-bold mb-2">PLEASE DECLARE THE FOLLOWING SENTENCES ON THE AWB:</p>
                      <p className="font-semibold text-red-700">"THIS THERMO BOX CONTAIN FROZEN PRODUCTS WITH DRY ICE AT -18ºC". (Eighteen negatives celsius degrees)".</p>
                      <p className="font-semibold text-red-700 mt-1">"ESTAS CAIXAS TÉRMICAS DE ISOPOR CONTÊM PRODUTOS CONGELADOS COM GELO SECO A -18ºC". (Dezoito graus celsius negativos)".</p>
                    </div>

                    <div>
                      <Label htmlFor="ffOthers_congelado">5- Others:</Label>
                      <Textarea
                        id="ffOthers_congelado"
                        value={formData.ffOthers_congelado || 'Please e-mail us (vanessa.hevia@biodina.com.br) a copy of AWB as soon as you have dispatched the goods.\n\nPLEASE SEND THE ORIGINAL COMMERCIAL INVOICE,PACKING LIST AND AWB TOGETHER WITH THE CARGO.'}
                        onChange={(e) => onInputChange('ffOthers_congelado', e.target.value)}
                        rows={3}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Signature */}
                <div className="border p-4 rounded bg-gray-50 mt-4">
                  <div className="text-sm space-y-1">
                    <p>Looking forward to hearing from you soon.</p>
                    <p>Cordially,</p>
                    <p className="mt-3 font-semibold">Evandro Amorim</p>
                    <p>International Division</p>
                    <p>EAA</p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
