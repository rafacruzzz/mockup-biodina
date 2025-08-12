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
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Dados Gerais
        </TabsTrigger>
        <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Análise Técnica
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
                  <SelectItem value="cold-call">Cold Call</SelectItem>
                  <SelectItem value="licitacao">Licitação</SelectItem>
                  <SelectItem value="referencia">Referência</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
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

        {/* Informações do Negócio */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Negócio</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
              <Input
                id="valorNegocio"
                value={formData.valorNegocio}
                onChange={(e) => onInputChange('valorNegocio', e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
            <div>
              <Label htmlFor="metodoContato">Método de Contato</Label>
              <Select value={formData.metodoContato} onValueChange={(value) => onInputChange('metodoContato', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="video-chamada">Vídeo Chamada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="segmentoLead">Segmento do Lead</Label>
              <Select value={formData.segmentoLead} onValueChange={(value) => onInputChange('segmentoLead', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospitalar">Hospitalar</SelectItem>
                  <SelectItem value="universitario">Universitário</SelectItem>
                  <SelectItem value="publico">Público</SelectItem>
                  <SelectItem value="municipal">Municipal</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dataInicio">Data de Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => onInputChange('dataInicio', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dataLimite">Data Limite</Label>
              <Input
                id="dataLimite"
                type="date"
                value={formData.dataLimite}
                onChange={(e) => onInputChange('dataLimite', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dataVisita">Data da Visita</Label>
              <Input
                id="dataVisita"
                type="date"
                value={formData.dataVisita}
                onChange={(e) => onInputChange('dataVisita', e.target.value)}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="procurandoPor">Procurando Por (Contatos Vinculados ao Cliente)</Label>
              <Input
                id="procurandoPor"
                value={formData.procurandoPor}
                onChange={(e) => onInputChange('procurandoPor', e.target.value)}
                placeholder="Digite os contatos"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => onInputChange('descricao', e.target.value)}
                placeholder="Digite a descrição"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Campos Específicos de Importação */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Específicos da Importação Direta</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="spi">SPI</Label>
              <Input
                id="spi"
                value={formData.spi}
                onChange={(e) => onInputChange('spi', e.target.value)}
                placeholder="Digite o SPI"
              />
            </div>
            <div>
              <Label htmlFor="di">DI</Label>
              <Input
                id="di"
                value={formData.di}
                onChange={(e) => onInputChange('di', e.target.value)}
                placeholder="Digite a DI"
              />
            </div>
            <div>
              <Label htmlFor="invoice">Invoice</Label>
              <Input
                id="invoice"
                value={formData.invoice}
                onChange={(e) => onInputChange('invoice', e.target.value)}
                placeholder="Digite o invoice"
              />
            </div>
            <div>
              <Label htmlFor="comissao">Comissão</Label>
              <Input
                id="comissao"
                value={formData.comissao}
                onChange={(e) => onInputChange('comissao', e.target.value)}
                placeholder="Digite a comissão"
              />
            </div>
            <div>
              <Label htmlFor="numeroProjeto">Número do Projeto (Automático)</Label>
              <Input
                id="numeroProjeto"
                value={formData.numeroProjeto}
                onChange={(e) => onInputChange('numeroProjeto', e.target.value)}
                placeholder="Gerado automaticamente"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="numeroPedido">Número do Pedido (Automático)</Label>
              <Input
                id="numeroPedido"
                value={formData.numeroPedido}
                onChange={(e) => onInputChange('numeroPedido', e.target.value)}
                placeholder="Gerado automaticamente"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="numeroContrato">Número do Contrato (Automático)</Label>
              <Input
                id="numeroContrato"
                value={formData.numeroContrato}
                onChange={(e) => onInputChange('numeroContrato', e.target.value)}
                placeholder="Gerado automaticamente"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="publicoPrivado">Público ou Privado</Label>
              <Select value={formData.publicoPrivado} onValueChange={(value) => onInputChange('publicoPrivado', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publico">Público</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="naturezaOperacao">Qual Natureza da Operação (CFOP vinculado ao OMIE)</Label>
              <Input
                id="naturezaOperacao"
                value={formData.naturezaOperacao}
                onChange={(e) => onInputChange('naturezaOperacao', e.target.value)}
                placeholder="Digite a natureza da operação"
              />
            </div>
            <div>
              <Label htmlFor="tipoContrato">Detalhar Natureza da Operação {'->'} Tipo de Contrato</Label>
              <Input
                id="tipoContrato"
                value={formData.tipoContrato}
                onChange={(e) => onInputChange('tipoContrato', e.target.value)}
                placeholder="Digite o tipo de contrato"
              />
            </div>
            <div>
              <Label htmlFor="situacao">Situação (qual momento da Venda)</Label>
              <Select value={formData.situacao} onValueChange={(value) => onInputChange('situacao', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_negociacao">Em Negociação</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="previsaoFechamento">Previsão de Fechamento (Vigência da ATA)</Label>
              <Input
                id="previsaoFechamento"
                type="date"
                value={formData.previsaoFechamento}
                onChange={(e) => onInputChange('previsaoFechamento', e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gerarExpedicao" 
                checked={formData.gerarExpedicao}
                onCheckedChange={(checked) => onInputChange('gerarExpedicao', checked)}
              />
              <Label htmlFor="gerarExpedicao">Gerar Expedição</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nfConsumoFinal" 
                checked={formData.nfConsumoFinal}
                onCheckedChange={(checked) => onInputChange('nfConsumoFinal', checked)}
              />
              <Label htmlFor="nfConsumoFinal">NF para Consumo Final</Label>
            </div>
            <div>
              <Label htmlFor="localEstoque">Local de Estoque</Label>
              <Input
                id="localEstoque"
                value={formData.localEstoque}
                onChange={(e) => onInputChange('localEstoque', e.target.value)}
                placeholder="Digite o local de estoque"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dados Financeiros */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Financeiros</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emailNotasFiscais">E-mail para Envio das Notas Fiscais</Label>
              <Input
                id="emailNotasFiscais"
                type="email"
                value={formData.emailNotasFiscais}
                onChange={(e) => onInputChange('emailNotasFiscais', e.target.value)}
                placeholder="Digite o e-mail"
              />
            </div>
            <div>
              <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
              <Select value={formData.formaPagamento} onValueChange={(value) => onInputChange('formaPagamento', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="deposito_bancario">Depósito Bancário</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dadosBancarios">Dados Bancários + PIX</Label>
              <Input
                id="dadosBancarios"
                value={formData.dadosBancarios}
                onChange={(e) => onInputChange('dadosBancarios', e.target.value)}
                placeholder="Digite os dados bancários"
              />
            </div>
            <div>
              <Label htmlFor="parcelas">Parcelas</Label>
              <Input
                id="parcelas"
                value={formData.parcelas}
                onChange={(e) => onInputChange('parcelas', e.target.value)}
                placeholder="Digite o número de parcelas"
              />
            </div>
            <div>
              <Label htmlFor="prazoPagamento">Prazo para Pagamento</Label>
              <Input
                id="prazoPagamento"
                value={formData.prazoPagamento}
                onChange={(e) => onInputChange('prazoPagamento', e.target.value)}
                placeholder="Digite o prazo"
              />
            </div>
            <div>
              <Label htmlFor="documentacaoNF">Documentação para Envio junto à NF</Label>
              <Input
                id="documentacaoNF"
                value={formData.documentacaoNF}
                onChange={(e) => onInputChange('documentacaoNF', e.target.value)}
                placeholder="Digite a documentação"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="destacarIR" 
                checked={formData.destacarIR}
                onCheckedChange={(checked) => onInputChange('destacarIR', checked)}
              />
              <Label htmlFor="destacarIR">Deve Destacar IR?</Label>
            </div>
            <div>
              <Label htmlFor="saldoEmpenho">Saldo do Empenho (Faturado x Enviado)</Label>
              <Input
                id="saldoEmpenho"
                value={formData.saldoEmpenho}
                onChange={(e) => onInputChange('saldoEmpenho', e.target.value)}
                placeholder="Digite o saldo"
              />
            </div>
            <div>
              <Label htmlFor="saldoAta">Saldo da ATA/Contrato (ATA x Empenho Recebido)</Label>
              <Input
                id="saldoAta"
                value={formData.saldoAta}
                onChange={(e) => onInputChange('saldoAta', e.target.value)}
                placeholder="Digite o saldo"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="programacaoFaturamento">Programação de Faturamento (Locação + Remessa + Faturamento Mensal)</Label>
              <Textarea
                id="programacaoFaturamento"
                value={formData.programacaoFaturamento}
                onChange={(e) => onInputChange('programacaoFaturamento', e.target.value)}
                placeholder="Digite a programação de faturamento"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Informações de Frete */}
        <Card>
          <CardHeader>
            <CardTitle>Informações de Frete</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fretePagar">Frete a Pagar Por</Label>
              <Select value={formData.fretePagar} onValueChange={(value) => onInputChange('fretePagar', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="representante">Representante</SelectItem>
                  <SelectItem value="empresa">Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="freteRetirar">Frete a Retirar Por</Label>
              <Select value={formData.freteRetirar} onValueChange={(value) => onInputChange('freteRetirar', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="representante">Representante</SelectItem>
                  <SelectItem value="portador_interno">Portador Interno</SelectItem>
                  <SelectItem value="destino_final">Destino Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
              <Input
                id="prazoEntrega"
                value={formData.prazoEntrega}
                onChange={(e) => onInputChange('prazoEntrega', e.target.value)}
                placeholder="Digite o prazo"
              />
            </div>
            <div>
              <Label htmlFor="entregarRetirar">Entregar ou Retirar aos Cuidados de Quem?</Label>
              <Input
                id="entregarRetirar"
                value={formData.entregarRetirar}
                onChange={(e) => onInputChange('entregarRetirar', e.target.value)}
                placeholder="Digite o responsável"
              />
            </div>
            <div>
              <Label htmlFor="dadosRecebedor">Dados do Recebedor (Nome, CPF, Telefone, Email)</Label>
              <Textarea
                id="dadosRecebedor"
                value={formData.dadosRecebedor}
                onChange={(e) => onInputChange('dadosRecebedor', e.target.value)}
                placeholder="Digite os dados do recebedor"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="horariosPermitidos">Quais Horários Permitidos para Entrega</Label>
              <Input
                id="horariosPermitidos"
                value={formData.horariosPermitidos}
                onChange={(e) => onInputChange('horariosPermitidos', e.target.value)}
                placeholder="Digite os horários"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="locaisEntrega">Locais de Entrega</Label>
              <Textarea
                id="locaisEntrega"
                value={formData.locaisEntrega}
                onChange={(e) => onInputChange('locaisEntrega', e.target.value)}
                placeholder="Digite os locais de entrega"
                rows={3}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="informacoesEntrega">Mais Informações sobre a Entrega (Há alguma dificuldade?)</Label>
              <Textarea
                id="informacoesEntrega"
                value={formData.informacoesEntrega}
                onChange={(e) => onInputChange('informacoesEntrega', e.target.value)}
                placeholder="Digite informações adicionais sobre a entrega"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Campos Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="urgente" 
                checked={formData.urgente}
                onCheckedChange={(checked) => onInputChange('urgente', checked)}
              />
              <Label htmlFor="urgente">É Urgente?</Label>
            </div>
            {formData.urgente && (
              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="justificativaUrgencia">Justificar Urgência</Label>
                <Textarea
                  id="justificativaUrgencia"
                  value={formData.justificativaUrgencia}
                  onChange={(e) => onInputChange('justificativaUrgencia', e.target.value)}
                  placeholder="Digite a justificativa da urgência"
                  rows={3}
                />
              </div>
            )}
            <div>
              <Label htmlFor="autorizadoPor">Autorizado Por</Label>
              <Input
                id="autorizadoPor"
                value={formData.autorizadoPor}
                onChange={(e) => onInputChange('autorizadoPor', e.target.value)}
                placeholder="Digite quem autorizou"
              />
            </div>
            <div>
              <Label htmlFor="dataAutorizacao">Data da Autorização</Label>
              <Input
                id="dataAutorizacao"
                type="date"
                value={formData.dataAutorizacao}
                onChange={(e) => onInputChange('dataAutorizacao', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="termometro">Termômetro</Label>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500 text-white">
                  {formData.termometro}
                </Badge>
                <span className="text-sm text-gray-600">(Fixado para Importação Direta)</span>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
              <Textarea
                id="motivoGanho"
                value={formData.motivoGanho}
                onChange={(e) => onInputChange('motivoGanho', e.target.value)}
                placeholder="Digite o motivo do ganho"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analise-tecnica" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Análise Técnica-Científica</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.analiseTecnica}
              onChange={(e) => onInputChange('analiseTecnica', e.target.value)}
              placeholder="Digite a análise técnica-científica da oportunidade..."
              rows={15}
              className="w-full"
            />
          </CardContent>
        </Card>
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
