import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SPIProductsTable from './SPIProductsTable';
import { formatUSD, calcularSubtotal, calcularPacking, calcularTotal } from '../utils/spiUtils';

interface SPIFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const SPIForm = ({ formData, onInputChange }: SPIFormProps) => {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-xl font-bold text-purple-600">
            SPI – SOLICITAÇÃO DE PROFORMA INVOICE
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Dados do Cliente */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">DADOS DO CLIENTE</h3>
            </div>
            
            <div>
              <Label htmlFor="spiCliente">Cliente</Label>
              <Input
                id="spiCliente"
                value={formData.spiCliente}
                onChange={(e) => onInputChange('spiCliente', e.target.value)}
                placeholder="Nome do cliente"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiDadosProforma">Dados para preenchimento da Proforma Invoice</Label>
              <Input
                id="spiDadosProforma"
                value={formData.spiDadosProforma}
                onChange={(e) => onInputChange('spiDadosProforma', e.target.value)}
                placeholder="Dados da proforma"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiEmNomeDe">Em nome de</Label>
              <Input
                id="spiEmNomeDe"
                value={formData.spiEmNomeDe}
                onChange={(e) => onInputChange('spiEmNomeDe', e.target.value)}
                placeholder="Em nome de"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiCnpj">CNPJ</Label>
              <Input
                id="spiCnpj"
                value={formData.spiCnpj}
                onChange={(e) => onInputChange('spiCnpj', e.target.value)}
                placeholder="XX.XXX.XXX/XXXX-XX"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiEndereco">Endereço</Label>
              <Input
                id="spiEndereco"
                value={formData.spiEndereco}
                onChange={(e) => onInputChange('spiEndereco', e.target.value)}
                placeholder="Endereço completo"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiInscricaoEstadual">Inscrição Estadual</Label>
              <Input
                id="spiInscricaoEstadual"
                value={formData.spiInscricaoEstadual}
                onChange={(e) => onInputChange('spiInscricaoEstadual', e.target.value)}
                placeholder="Inscrição estadual"
                className="w-full"
              />
            </div>
          </div>

          {/* Informações da Proforma */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 border p-4 rounded">
            <div className="md:col-span-2 lg:col-span-3">
              <h3 className="font-semibold mb-4 border-b pb-2">INFORMAÇÕES DA PROFORMA</h3>
            </div>
            
            <div>
              <Label htmlFor="spiNumero">No SPI</Label>
              <Input
                id="spiNumero"
                value={formData.spiNumero}
                onChange={(e) => onInputChange('spiNumero', e.target.value)}
                placeholder="Gerado automaticamente"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiData">DATA</Label>
              <Input
                id="spiData"
                type="date"
                value={formData.spiData}
                onChange={(e) => onInputChange('spiData', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiProposta">Proposta</Label>
              <Input
                id="spiProposta"
                value={formData.spiProposta}
                onChange={(e) => onInputChange('spiProposta', e.target.value)}
                placeholder="Número da proposta"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiEquipamento">Equipamento</Label>
              <Input
                id="spiEquipamento"
                value={formData.spiEquipamento}
                onChange={(e) => onInputChange('spiEquipamento', e.target.value)}
                placeholder="Nome do equipamento"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiModelo">Modelo</Label>
              <Input
                id="spiModelo"
                value={formData.spiModelo}
                onChange={(e) => onInputChange('spiModelo', e.target.value)}
                placeholder="Modelo do equipamento"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiPacking">Packing (%)</Label>
              <Input
                id="spiPacking"
                type="number"
                value={formData.spiPacking}
                onChange={(e) => onInputChange('spiPacking', e.target.value)}
                placeholder="0"
                className="w-full"
              />
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border p-4 rounded">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 border-b pb-2">INFORMAÇÕES ADICIONAIS</h3>
            </div>
            
            <div>
              <Label htmlFor="spiFabricante">Fabricante</Label>
              <Input
                id="spiFabricante"
                value={formData.spiFabricante}
                onChange={(e) => onInputChange('spiFabricante', e.target.value)}
                placeholder="Nome do fabricante"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spiFormaPagamento">Forma de pagamento</Label>
              <Input
                id="spiFormaPagamento"
                value={formData.spiFormaPagamento}
                onChange={(e) => onInputChange('spiFormaPagamento', e.target.value)}
                placeholder="CAD"
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id="spiTemComissao" 
                  checked={formData.spiTemComissao}
                  onCheckedChange={(checked) => onInputChange('spiTemComissao', checked)}
                />
                <Label htmlFor="spiTemComissao">Há comissão para o Representante?</Label>
              </div>
              
              {formData.spiTemComissao && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="spiPercentualComissao">Especifique o percentual (%)</Label>
                    <Input
                      id="spiPercentualComissao"
                      type="number"
                      value={formData.spiPercentualComissao}
                      onChange={(e) => onInputChange('spiPercentualComissao', e.target.value)}
                      placeholder="0"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="spiRepresentante">Informe o representante</Label>
                    <Input
                      id="spiRepresentante"
                      value={formData.spiRepresentante}
                      onChange={(e) => onInputChange('spiRepresentante', e.target.value)}
                      placeholder="Nome do representante"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabela de Produtos/Mercadorias */}
          <SPIProductsTable
            mercadorias={formData.spiMercadorias}
            onUpdateMercadorias={(mercadorias) => onInputChange('spiMercadorias', mercadorias)}
          />

          {/* Seção de Totais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border p-4 rounded">
            <div className="md:col-span-3">
              <h3 className="font-semibold mb-4 border-b pb-2">TOTAIS</h3>
            </div>
            
            <div>
              <Label>Subtotal (USD)</Label>
              <Input
                value={formatUSD(calcularSubtotal(formData.spiMercadorias))}
                readOnly
                className="bg-gray-100 font-semibold"
              />
            </div>
            
            <div>
              <Label>Packing (USD)</Label>
              <Input
                value={formatUSD(calcularPacking(formData.spiMercadorias, formData.spiPacking))}
                readOnly
                className="bg-gray-100 font-semibold"
              />
            </div>
            
            <div>
              <Label>TOTAL (USD)</Label>
              <Input
                value={formatUSD(calcularTotal(formData.spiMercadorias, formData.spiPacking))}
                readOnly
                className="bg-gray-100 font-bold text-green-600"
              />
            </div>
          </div>

          {/* Observações */}
          <div className="mb-6 border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">OBSERVAÇÕES</h3>
            <Textarea
              value={formData.spiObservacoes}
              onChange={(e) => onInputChange('spiObservacoes', e.target.value)}
              placeholder="Proforma solicitada pelo cliente dia [data] as [hora], verificar o desconto de [%] na proforma geral e conforme e-mail [data] as [hora]."
              rows={4}
              className="w-full"
            />
          </div>

          {/* Detalhes de Venda */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-4 border-b pb-2">DETALHES DE VENDA - Atenção</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="spiFaturamentoConfirmado" 
                  checked={formData.spiFaturamentoConfirmado}
                  onCheckedChange={(checked) => onInputChange('spiFaturamentoConfirmado', checked)}
                />
                <Label htmlFor="spiFaturamentoConfirmado">FATURAMENTO: Está confirmado?</Label>
              </div>
              
              <div>
                <Label htmlFor="spiPagamentoForma">PAGAMENTO - Forma</Label>
                <Input
                  id="spiPagamentoForma"
                  value={formData.spiPagamentoForma}
                  onChange={(e) => onInputChange('spiPagamentoForma', e.target.value)}
                  placeholder="Forma de pagamento"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="spiPagamentoPrazo">PAGAMENTO - Prazo</Label>
                <Input
                  id="spiPagamentoPrazo"
                  value={formData.spiPagamentoPrazo}
                  onChange={(e) => onInputChange('spiPagamentoPrazo', e.target.value)}
                  placeholder="Prazo de pagamento"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="spiEntregaPrazo">ENTREGA - Prazo</Label>
                <Input
                  id="spiEntregaPrazo"
                  value={formData.spiEntregaPrazo}
                  onChange={(e) => onInputChange('spiEntregaPrazo', e.target.value)}
                  placeholder="Prazo de entrega"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="font-semibold">Forma de venda:</Label>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="licitacao"
                    name="formaVenda"
                    value="licitacao"
                    checked={formData.spiFormaVenda === 'licitacao'}
                    onChange={(e) => onInputChange('spiFormaVenda', e.target.value)}
                  />
                  <Label htmlFor="licitacao">Licitação</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="vendaDireta"
                    name="formaVenda"
                    value="venda_direta"
                    checked={formData.spiFormaVenda === 'venda_direta'}
                    onChange={(e) => onInputChange('spiFormaVenda', e.target.value)}
                  />
                  <Label htmlFor="vendaDireta">Venda Direta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="outros"
                    name="formaVenda"
                    value="outros"
                    checked={formData.spiFormaVenda === 'outros'}
                    onChange={(e) => onInputChange('spiFormaVenda', e.target.value)}
                  />
                  <Label htmlFor="outros">Outros</Label>
                </div>
              </div>
              
              {formData.spiFormaVenda === 'outros' && (
                <div className="mt-2">
                  <Input
                    value={formData.spiFormaVendaOutros}
                    onChange={(e) => onInputChange('spiFormaVendaOutros', e.target.value)}
                    placeholder="Especifique outros"
                    className="w-full"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="spiValor">Valor</Label>
                <Input
                  id="spiValor"
                  value={formData.spiValor}
                  onChange={(e) => onInputChange('spiValor', e.target.value)}
                  placeholder="R$ 0,00"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="spiPrazo">Prazo</Label>
                <Input
                  id="spiPrazo"
                  type="date"
                  value={formData.spiPrazo}
                  onChange={(e) => onInputChange('spiPrazo', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="spiDataConfirmacao">Data que o pedido foi confirmado</Label>
                <Input
                  id="spiDataConfirmacao"
                  type="date"
                  value={formData.spiDataConfirmacao}
                  onChange={(e) => onInputChange('spiDataConfirmacao', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Aprovação do Cliente */}
          <div className="border p-4 rounded mt-6">
            <h3 className="font-semibold mb-4 border-b pb-2">APROVAÇÃO DO CLIENTE</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="spiClienteAprovacao">O cliente aprovou?</Label>
                <Select
                  value={formData.spiClienteAprovacao}
                  onValueChange={(value) => onInputChange('spiClienteAprovacao', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="rejeitado">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SPIForm;
