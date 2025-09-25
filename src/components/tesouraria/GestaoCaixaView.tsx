import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Shield, 
  CreditCard,
  Banknote,
  BarChart3,
  DollarSign,
  Calendar,
  Eye
} from 'lucide-react';

import { ControleCaixaContabil } from './components/ControleCaixaContabil';
import { ControleCheques } from './components/ControleCheques';
import { GestaoDocumentos } from './components/GestaoDocumentos';
import { ControleBalancos } from './components/ControleBalancos';
import { GestaoContasBancarias } from './components/GestaoContasBancarias';
import { GestaoCartoesCredito } from './components/GestaoCartoesCredito';

import { NovaMovimentacaoCaixaModal } from './NovaMovimentacaoCaixaModal';
import { NovoChequeModal } from './NovoChequeModal';
import { NovoDocumentoModal } from './NovoDocumentoModal';
import { NovaContaBancariaModal } from './NovaContaBancariaModal';
import { NovoCartaoModal } from './NovoCartaoModal';

import { 
  mockMovimentacoesCaixa, 
  mockCheques, 
  mockDocumentosImportantes, 
  mockBalancos,
  mockContasBancarias,
  mockCartoesCredito,
  formatCurrency 
} from '@/data/tesouraria';

export const GestaoCaixaView = () => {
  const [activeTab, setActiveTab] = useState('caixa-contabil');
  const [showNovaMovimentacao, setShowNovaMovimentacao] = useState(false);
  const [showNovoCheque, setShowNovoCheque] = useState(false);
  const [showNovoDocumento, setShowNovoDocumento] = useState(false);
  const [showNovaConta, setShowNovaConta] = useState(false);
  const [showNovoCartao, setShowNovoCartao] = useState(false);

  // Cálculos para o dashboard
  const totalMovimentacoes = mockMovimentacoesCaixa.length;
  const totalEntradas = mockMovimentacoesCaixa
    .filter(m => m.tipo === 'Entrada' && m.status === 'Confirmado')
    .reduce((sum, m) => sum + m.valor, 0);
  const totalSaidas = mockMovimentacoesCaixa
    .filter(m => m.tipo === 'Saída' && m.status === 'Confirmado')
    .reduce((sum, m) => sum + m.valor, 0);
  const saldoCaixa = totalEntradas - totalSaidas;

  const chequesEmitidos = mockCheques.filter(c => c.status === 'Emitido').length;
  const chequesCompensados = mockCheques.filter(c => c.status === 'Compensado').length;
  const chequesDevolvidos = mockCheques.filter(c => c.status === 'Devolvido').length;

  const documentosAtivos = mockDocumentosImportantes.length;
  const documentosVencendo = mockDocumentosImportantes
    .filter(d => d.dataValidade && new Date(d.dataValidade) <= new Date(Date.now() + 30*24*60*60*1000))
    .length;

  const balancosRecebidos = mockBalancos.filter(b => b.status === 'Recebido').length;
  const balancosEmAnalise = mockBalancos.filter(b => b.status === 'Em Análise').length;
  const ultimoBalanco = mockBalancos.sort((a, b) => 
    new Date(b.dataRecebimento).getTime() - new Date(a.dataRecebimento).getTime()
  )[0];

  const contasAtivas = mockContasBancarias.filter(c => c.status === 'Ativa').length;
  const saldoTotalContas = mockContasBancarias
    .filter(c => c.status === 'Ativa')
    .reduce((sum, c) => sum + c.saldo, 0);

  const cartoesAtivos = mockCartoesCredito.filter(c => c.status === 'Ativo').length;
  const limiteTotal = mockCartoesCredito
    .filter(c => c.status === 'Ativo')
    .reduce((sum, c) => sum + c.limite, 0);

  return (
    <div className="space-y-6">
      {/* Dashboard Geral */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo em Caixa</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(saldoCaixa)}</div>
            <p className="text-xs text-muted-foreground">
              {totalMovimentacoes} movimentações no período
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cheques</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chequesEmitidos}</div>
            <p className="text-xs text-muted-foreground">
              Em aberto • {chequesCompensados} compensados • {chequesDevolvidos} devolvidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Bancárias</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(saldoTotalContas)}</div>
            <p className="text-xs text-muted-foreground">
              {contasAtivas} contas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartões Crédito</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(limiteTotal)}</div>
            <p className="text-xs text-muted-foreground">
              {cartoesAtivos} cartões ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo de Balanços */}
      {ultimoBalanco && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Último Balanço - {ultimoBalanco.periodo}</CardTitle>
                <CardDescription>
                  Recebido em {new Date(ultimoBalanco.dataRecebimento).toLocaleDateString('pt-BR')}
                </CardDescription>
              </div>
              <Badge variant={ultimoBalanco.status === 'Aprovado' ? 'default' : 'secondary'}>
                {ultimoBalanco.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Receitas</div>
                <div className="text-lg font-semibold text-green-600">
                  {formatCurrency(ultimoBalanco.receitas)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Despesas</div>
                <div className="text-lg font-semibold text-red-600">
                  {formatCurrency(ultimoBalanco.despesas)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Resultado</div>
                <div className={`text-lg font-semibold ${ultimoBalanco.resultado >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(ultimoBalanco.resultado)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Patrimônio</div>
                <div className="text-lg font-semibold">
                  {formatCurrency(ultimoBalanco.patrimonio)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navegação por Módulos */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="caixa-contabil" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Caixa</span>
          </TabsTrigger>
          <TabsTrigger value="cheques" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Cheques</span>
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Documentos</span>
          </TabsTrigger>
          <TabsTrigger value="balancos" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Balanços</span>
          </TabsTrigger>
          <TabsTrigger value="contas" className="flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            <span className="hidden sm:inline">Contas</span>
          </TabsTrigger>
          <TabsTrigger value="cartoes" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Cartões</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="caixa-contabil" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Controle de Caixa Contábil</h3>
              <p className="text-sm text-muted-foreground">
                Registro e controle de movimentações internas de caixa
              </p>
            </div>
            <Button onClick={() => setShowNovaMovimentacao(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Movimentação
            </Button>
          </div>
          <ControleCaixaContabil />
        </TabsContent>

        <TabsContent value="cheques" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Controle de Cheques</h3>
              <p className="text-sm text-muted-foreground">
                Emissão e compensação de cheques
              </p>
            </div>
            <Button onClick={() => setShowNovoCheque(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cheque
            </Button>
          </div>
          <ControleCheques />
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Gestão de Documentos Importantes</h3>
              <p className="text-sm text-muted-foreground">
                Acesso e arquivamento de documentos institucionais
              </p>
            </div>
            <Button onClick={() => setShowNovoDocumento(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Documento
            </Button>
          </div>
          <GestaoDocumentos />
        </TabsContent>

        <TabsContent value="balancos" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Controle de Balanços</h3>
              <p className="text-sm text-muted-foreground">
                Visualização e análise de balanços recebidos da contabilidade
              </p>
            </div>
          </div>
          <ControleBalancos />
        </TabsContent>

        <TabsContent value="contas" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Controle de Contas Bancárias</h3>
              <p className="text-sm text-muted-foreground">
                Cadastro de contas correntes com integração OFX
              </p>
            </div>
            <Button onClick={() => setShowNovaConta(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta
            </Button>
          </div>
          <GestaoContasBancarias />
        </TabsContent>

        <TabsContent value="cartoes" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Controle de Cartões de Crédito</h3>
              <p className="text-sm text-muted-foreground">
                Registro de cartões e integração com Contas a Pagar
              </p>
            </div>
            <Button onClick={() => setShowNovoCartao(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cartão
            </Button>
          </div>
          <GestaoCartoesCredito />
        </TabsContent>
      </Tabs>

      {/* Modais */}
      <NovaMovimentacaoCaixaModal
        open={showNovaMovimentacao}
        onOpenChange={setShowNovaMovimentacao}
      />

      <NovoChequeModal
        open={showNovoCheque}
        onOpenChange={setShowNovoCheque}
      />

      <NovoDocumentoModal
        open={showNovoDocumento}
        onOpenChange={setShowNovoDocumento}
      />

      <NovaContaBancariaModal
        open={showNovaConta}
        onOpenChange={setShowNovaConta}
      />

      <NovoCartaoModal
        open={showNovoCartao}
        onOpenChange={setShowNovoCartao}
      />
    </div>
  );
};