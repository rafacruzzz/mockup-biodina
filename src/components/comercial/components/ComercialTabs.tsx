
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FileText, MessageSquare, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterno from '../ChatInterno';
import MercadoriasTable from './MercadoriasTable';

interface ComercialTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  formData: any;
  onInputChange: (field: string, value: any) => void;
  oportunidade?: any;
}

const ComercialTabs = ({ activeTab, onTabChange, formData, onInputChange, oportunidade }: ComercialTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Dados Gerais
        </TabsTrigger>
        <TabsTrigger value="historico-chat" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Histórico/Chat
        </TabsTrigger>
        <TabsTrigger value="documentos" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Documentos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dados-gerais" className="space-y-6 mt-4">
        {/* Informações Básicas do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
              <Input
                id="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={(e) => onInputChange('cpfCnpj', e.target.value)}
                placeholder="Digite o CPF ou CNPJ"
              />
            </div>
            <div>
              <Label htmlFor="nome">Nome / Nome Fantasia *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => onInputChange('nome', e.target.value)}
                placeholder="Digite o nome"
              />
            </div>
            <div>
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => onInputChange('razaoSocial', e.target.value)}
                placeholder="Digite a razão social"
              />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço do Cliente</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => onInputChange('endereco', e.target.value)}
                placeholder="Digite o endereço"
              />
            </div>
            <div>
              <Label htmlFor="uf">UF</Label>
              <Select value={formData.uf} onValueChange={(value) => onInputChange('uf', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="AL">AL</SelectItem>
                  <SelectItem value="AP">AP</SelectItem>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="BA">BA</SelectItem>
                  <SelectItem value="CE">CE</SelectItem>
                  <SelectItem value="DF">DF</SelectItem>
                  <SelectItem value="ES">ES</SelectItem>
                  <SelectItem value="GO">GO</SelectItem>
                  <SelectItem value="MA">MA</SelectItem>
                  <SelectItem value="MT">MT</SelectItem>
                  <SelectItem value="MS">MS</SelectItem>
                  <SelectItem value="MG">MG</SelectItem>
                  <SelectItem value="PA">PA</SelectItem>
                  <SelectItem value="PB">PB</SelectItem>
                  <SelectItem value="PR">PR</SelectItem>
                  <SelectItem value="PE">PE</SelectItem>
                  <SelectItem value="PI">PI</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="RN">RN</SelectItem>
                  <SelectItem value="RS">RS</SelectItem>
                  <SelectItem value="RO">RO</SelectItem>
                  <SelectItem value="RR">RR</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="SE">SE</SelectItem>
                  <SelectItem value="TO">TO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fonteLead">Fonte do Lead</Label>
              <Select value={formData.fonteLead} onValueChange={(value) => onInputChange('fonteLead', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site">Site</SelectItem>
                  <SelectItem value="indicacao">Indicação</SelectItem>
                  <SelectItem value="cold_call">Cold Call</SelectItem>
                  <SelectItem value="licitacao">Licitação</SelectItem>
                  <SelectItem value="referencia">Referência</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="video_chamada">Vídeo Chamada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ativo" 
                checked={formData.ativo}
                onCheckedChange={(checked) => onInputChange('ativo', checked)}
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="Digite o e-mail"
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => onInputChange('telefone', e.target.value)}
                placeholder="Digite o telefone"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => onInputChange('website', e.target.value)}
                placeholder="Digite o website"
              />
            </div>
          </CardContent>
        </Card>

        {/* Processo de Due Diligence */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Sobre a Importação Direta</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="numeroProcessoDD">Número do processo DD</Label>
              <Input
                id="numeroProcessoDD"
                value={formData.numeroProcessoDD}
                onChange={(e) => onInputChange('numeroProcessoDD', e.target.value)}
                placeholder="Gerado automaticamente"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="comissaoInfo">Informação sobre comissão</Label>
              <Input
                id="comissaoInfo"
                value={formData.comissaoInfo}
                onChange={(e) => onInputChange('comissaoInfo', e.target.value)}
                placeholder="Digite a informação sobre comissão"
              />
            </div>
            <div>
              <Label htmlFor="descontoInfo">Informação sobre desconto</Label>
              <Input
                id="descontoInfo"
                value={formData.descontoInfo}
                onChange={(e) => onInputChange('descontoInfo', e.target.value)}
                placeholder="Digite a informação sobre desconto"
              />
            </div>
            <div>
              <Label htmlFor="valorPacking">Valor do packing</Label>
              <Input
                id="valorPacking"
                value={formData.valorPacking}
                onChange={(e) => onInputChange('valorPacking', e.target.value)}
                placeholder="US$ 0,00"
              />
            </div>
            <div>
              <Label htmlFor="valorTotalFatura">Valor total da fatura</Label>
              <Input
                id="valorTotalFatura"
                value={formData.valorTotalFatura}
                onChange={(e) => onInputChange('valorTotalFatura', e.target.value)}
                placeholder="US$ 0,00"
              />
            </div>
            <div>
              <Label htmlFor="formaPagamento">Forma de pagamento</Label>
              <Select value={formData.formaPagamento} onValueChange={(value) => onInputChange('formaPagamento', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CAD">CAD - Pagamento Antecipado</SelectItem>
                  <SelectItem value="30_dias">30 dias</SelectItem>
                  <SelectItem value="60_dias">60 dias</SelectItem>
                  <SelectItem value="90_dias">90 dias</SelectItem>
                  <SelectItem value="carta_credito">Carta de Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dataElaboracaoSPI">Data da elaboração da SPI</Label>
              <Input
                id="dataElaboracaoSPI"
                type="date"
                value={formData.dataElaboracaoSPI}
                onChange={(e) => onInputChange('dataElaboracaoSPI', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="numeroProformaInvoice">Número da proforma invoice</Label>
              <Input
                id="numeroProformaInvoice"
                value={formData.numeroProformaInvoice}
                onChange={(e) => onInputChange('numeroProformaInvoice', e.target.value)}
                placeholder="Digite o número da proforma invoice"
              />
            </div>
            <div>
              <Label htmlFor="dataAprovacaoCliente">Data de aprovação do cliente</Label>
              <Input
                id="dataAprovacaoCliente"
                type="date"
                value={formData.dataAprovacaoCliente}
                onChange={(e) => onInputChange('dataAprovacaoCliente', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dataPagamento">Data do pagamento</Label>
              <Input
                id="dataPagamento"
                type="date"
                value={formData.dataPagamento}
                onChange={(e) => onInputChange('dataPagamento', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dataFaturamento">Data do faturamento</Label>
              <Input
                id="dataFaturamento"
                type="date"
                value={formData.dataFaturamento}
                onChange={(e) => onInputChange('dataFaturamento', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="valorFaturamento">Valor do faturamento</Label>
              <Input
                id="valorFaturamento"
                value={formData.valorFaturamento}
                onChange={(e) => onInputChange('valorFaturamento', e.target.value)}
                placeholder="US$ 0,00"
              />
            </div>
            <div>
              <Label htmlFor="numeroFatura">Número da fatura</Label>
              <Input
                id="numeroFatura"
                value={formData.numeroFatura}
                onChange={(e) => onInputChange('numeroFatura', e.target.value)}
                placeholder="Digite o número da fatura"
              />
            </div>
            <div>
              <Label htmlFor="dataRecebimentoMercadoria">Data do recebimento da mercadoria pelo cliente</Label>
              <Input
                id="dataRecebimentoMercadoria"
                type="date"
                value={formData.dataRecebimentoMercadoria}
                onChange={(e) => onInputChange('dataRecebimentoMercadoria', e.target.value)}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="observacoesDD">Observações</Label>
              <Textarea
                id="observacoesDD"
                value={formData.observacoesDD}
                onChange={(e) => onInputChange('observacoesDD', e.target.value)}
                placeholder="Digite as observações"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Mercadorias */}
        <MercadoriasTable
          mercadorias={formData.mercadorias || []}
          onMercadoriasChange={(mercadorias) => onInputChange('mercadorias', mercadorias)}
        />
      </TabsContent>

      <TabsContent value="historico-chat" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Histórico e Chat Interno</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documentos" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
              <Button variant="outline">
                Selecionar Arquivos
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );
};

export default ComercialTabs;
