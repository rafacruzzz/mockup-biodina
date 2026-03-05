import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

const mockSPIData = {
  cliente: 'Empresa ABC Ltda',
  emNomeDe: 'Empresa ABC Importação',
  cnpj: '12.345.678/0001-90',
  endereco: 'Rua das Indústrias, 500 - São Paulo/SP',
  inscricaoEstadual: '123.456.789.000',
  numero: 'SPI-2026-001',
  data: '2026-03-05',
  fabricante: 'Global Manufacturing Co.',
  formaPagamento: 'CAD',
  packing: 5,
  observacoes: 'Proforma solicitada pelo cliente dia 01/03 às 10h, verificar desconto de 5% conforme e-mail.',
  mercadorias: [
    { descricao: 'Sensor de Temperatura Industrial', quantidade: 100, valorUnitario: 25.50 },
    { descricao: 'Módulo de Controle PLC', quantidade: 50, valorUnitario: 120.00 },
    { descricao: 'Cabo de Conexão 5m', quantidade: 200, valorUnitario: 8.75 },
  ],
};

const formatUSD = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const AprovacaoSPIExterna: React.FC = () => {
  const { linkId } = useParams();
  const [decisao, setDecisao] = useState<'aprovado' | 'rejeitado' | null>(null);
  const [observacaoRejeicao, setObservacaoRejeicao] = useState('');
  const [mostrarRejeicao, setMostrarRejeicao] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [erroObservacao, setErroObservacao] = useState(false);

  const data = mockSPIData;
  const subtotal = data.mercadorias.reduce((acc, m) => acc + m.quantidade * m.valorUnitario, 0);
  const packingValue = (subtotal * data.packing) / 100;
  const total = subtotal + packingValue;

  const handleAprovar = () => {
    setDecisao('aprovado');
    setFinalizado(true);
  };

  const handleRejeitar = () => {
    if (!mostrarRejeicao) {
      setMostrarRejeicao(true);
      return;
    }
    if (!observacaoRejeicao.trim()) {
      setErroObservacao(true);
      return;
    }
    setDecisao('rejeitado');
    setFinalizado(true);
  };

  if (finalizado) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-4">
            {decisao === 'aprovado' ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-green-600">SPI Aprovada!</h2>
                <p className="text-muted-foreground">Sua aprovação foi registrada com sucesso. Obrigado!</p>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                <h2 className="text-2xl font-bold text-red-600">SPI Rejeitada</h2>
                <p className="text-muted-foreground">Sua rejeição foi registrada com a seguinte observação:</p>
                <p className="italic border rounded p-3 bg-muted text-sm">{observacaoRejeicao}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <CardTitle className="text-xl font-bold text-purple-600">
                SPI – SOLICITAÇÃO DE PROFORMA INVOICE
              </CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Revisão e aprovação do cliente</p>
          </CardHeader>
        </Card>

        {/* Dados do Cliente */}
        <Card>
          <CardHeader><CardTitle className="text-base">Dados do Cliente</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Cliente:</span> {data.cliente}</div>
            <div><span className="font-medium">Em nome de:</span> {data.emNomeDe}</div>
            <div><span className="font-medium">CNPJ:</span> {data.cnpj}</div>
            <div><span className="font-medium">Endereço:</span> {data.endereco}</div>
            <div><span className="font-medium">Inscrição Estadual:</span> {data.inscricaoEstadual}</div>
          </CardContent>
        </Card>

        {/* Informações da Proforma */}
        <Card>
          <CardHeader><CardTitle className="text-base">Informações da Proforma</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div><span className="font-medium">Nº SPI:</span> {data.numero}</div>
            <div><span className="font-medium">Data:</span> {data.data}</div>
            <div><span className="font-medium">Fabricante:</span> {data.fabricante}</div>
            <div><span className="font-medium">Forma de Pagamento:</span> {data.formaPagamento}</div>
            <div><span className="font-medium">Packing:</span> {data.packing}%</div>
          </CardContent>
        </Card>

        {/* Mercadorias */}
        <Card>
          <CardHeader><CardTitle className="text-base">Mercadorias</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="text-left p-2 font-medium">Descrição</th>
                    <th className="text-center p-2 font-medium">Qtd</th>
                    <th className="text-right p-2 font-medium">Valor Unit.</th>
                    <th className="text-right p-2 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.mercadorias.map((m, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{m.descricao}</td>
                      <td className="p-2 text-center">{m.quantidade}</td>
                      <td className="p-2 text-right">{formatUSD(m.valorUnitario)}</td>
                      <td className="p-2 text-right">{formatUSD(m.quantidade * m.valorUnitario)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between"><span>Subtotal:</span><span className="font-medium">{formatUSD(subtotal)}</span></div>
              <div className="flex justify-between"><span>Packing ({data.packing}%):</span><span className="font-medium">{formatUSD(packingValue)}</span></div>
              <div className="flex justify-between text-base font-bold"><span>TOTAL:</span><span className="text-green-600">{formatUSD(total)}</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        {data.observacoes && (
          <Card>
            <CardHeader><CardTitle className="text-base">Observações</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">{data.observacoes}</p></CardContent>
          </Card>
        )}

        {/* Ações */}
        <Card>
          <CardHeader><CardTitle className="text-base">Sua Decisão</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mostrarRejeicao && (
              <div>
                <Label htmlFor="obsRejeicao" className="text-sm font-medium">
                  Observação (obrigatória para rejeição) *
                </Label>
                <Textarea
                  id="obsRejeicao"
                  value={observacaoRejeicao}
                  onChange={(e) => { setObservacaoRejeicao(e.target.value); setErroObservacao(false); }}
                  placeholder="Descreva o motivo da rejeição..."
                  rows={3}
                  className={erroObservacao ? 'border-red-500' : ''}
                />
                {erroObservacao && <p className="text-red-500 text-xs mt-1">A observação é obrigatória para rejeição.</p>}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAprovar} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" /> Aprovar
              </Button>
              <Button onClick={handleRejeitar} variant="destructive" className="flex-1">
                <XCircle className="h-4 w-4 mr-2" /> {mostrarRejeicao ? 'Confirmar Rejeição' : 'Rejeitar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AprovacaoSPIExterna;
