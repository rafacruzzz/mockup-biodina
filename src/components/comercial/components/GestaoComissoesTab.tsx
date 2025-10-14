import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  FileText, 
  DollarSign, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Download,
  ChevronDown,
  Send,
  Banknote,
  Plus,
  Trash2
} from 'lucide-react';
import { StatusComissao, ItemInvoice } from '@/types/comissoes';
import { mockComissoes, defaultInvoiceServico, defaultFaturaRecebimento, mockDadosBancariosInternacionais } from '@/data/comissoes';
import { mockContasBancarias } from '@/data/tesouraria';

interface GestaoComissoesTabProps {
  importacaoId: string;
  formData: any;
  onInputChange?: (field: string, value: any) => void;
}

const GestaoComissoesTab = ({ importacaoId, formData }: GestaoComissoesTabProps) => {
  // Buscar comissão existente ou criar nova
  const comissaoExistente = mockComissoes.find(c => c.numeroImportacao === importacaoId);
  
  const [comissao, setComissao] = useState({
    id: comissaoExistente?.id || `COM-${Date.now()}`,
    numeroImportacao: importacaoId || 'DD-2025-XXX',
    fabricante: formData.fabricante || 'RADIOMETER MEDICAL ApS',
    formaPagamento: formData.formaPagamento || 'Carta de Crédito',
    descricao: formData.spiMercadorias?.[0]?.descricao || 'Equipamentos médicos',
    numeroDI: comissaoExistente?.numeroDI || '25/0123456-7',
    dataDI: comissaoExistente?.dataDI || '2025-01-15',
    protocoloDI: comissaoExistente?.protocoloDI || 'PROT-2025-0001',
    numeroInvoice: formData.spiNumero || 'INV-2025-001',
    valorInvoice: formData.spiValorTotal || 50000.00,
    dataPagamento: comissaoExistente?.dataPagamento || '',
    alertaPagamento: comissaoExistente?.alertaPagamento || false,
    percentualComissao: comissaoExistente?.percentualComissao || 5,
    valorComissao: comissaoExistente?.valorComissao || 0,
    prazoRecebimento: comissaoExistente?.prazoRecebimento || '',
    status: comissaoExistente?.status || StatusComissao.EM_NEGOCIACAO,
    avisoRecebimentoCliente: comissaoExistente?.avisoRecebimentoCliente || undefined,
    swiftFabricaAnexo: comissaoExistente?.swiftFabricaAnexo || undefined,
    ordemPagamentoAnexo: comissaoExistente?.ordemPagamentoAnexo || undefined,
    swiftCambioAnexo: comissaoExistente?.swiftCambioAnexo || undefined,
    contratoCambioAnexo: comissaoExistente?.contratoCambioAnexo || undefined,
    detalhamentoRemessaAnexo: comissaoExistente?.detalhamentoRemessaAnexo || undefined,
    invoiceServico: comissaoExistente?.invoiceServico || { ...defaultInvoiceServico },
    faturaRecebimento: comissaoExistente?.faturaRecebimento || { ...defaultFaturaRecebimento },
    relatorioAgente: comissaoExistente?.relatorioAgente || {
      nomeAgente: '',
      periodoInicio: '',
      periodoFim: '',
      totalVendas: 0,
      percentualComissao: 0,
      valorComissaoTotal: 0,
      impostos: 0,
      valorLiquido: 0
    },
    nfGerada: comissaoExistente?.nfGerada || false,
    numeroNF: comissaoExistente?.numeroNF || undefined,
    dataNF: comissaoExistente?.dataNF || undefined,
    conciliadoBanco: comissaoExistente?.conciliadoBanco || false,
    dataConciliacao: comissaoExistente?.dataConciliacao || undefined
  });

  const [openSections, setOpenSections] = useState({
    cobranca: true,
    identificacao: true,
    swift: false,
    invoice: false,
    ordem: false,
    fatura: false,
    cambio: false,
    relatorio: false,
    integracao: true
  });

  // Calcular valor da comissão automaticamente
  const calcularComissao = () => {
    const valor = (comissao.valorInvoice * comissao.percentualComissao) / 100;
    setComissao(prev => ({ ...prev, valorComissao: valor }));
  };

  // Simular upload de arquivo
  const handleFileUpload = (field: string, fileName: string) => {
    setComissao(prev => ({ ...prev, [field]: fileName }));
    toast({
      title: "Arquivo anexado",
      description: `${fileName} foi anexado com sucesso.`
    });
  };

  // Simular preenchimento automático do Swift
  const simularPreenchimentoSwift = () => {
    setComissao(prev => ({
      ...prev,
      invoiceServico: {
        ...prev.invoiceServico,
        numero: `IS-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        data: new Date().toISOString().split('T')[0],
        invoiceTo: 'Radiometer Medical ApS\nAkandevej 21 - DK-2700 -\nBronshoj - Denmark',
        preparedBy: 'Thaís Tolentino',
        phoneNumber: '55 21 2435-9806',
        email: 'thais.tolentino@biodina.com.br',
        contactPersonName: 'Andre Borges',
        contactPersonEmail: 'andre.borges-hansen@radiometer.dk',
        items: [
          {
            id: '1',
            item: '1',
            qty: 1,
            code: 'COM',
            description: `Commission on ${prev.descricao}`,
            unitPrice: prev.valorComissao,
            totalPrice: prev.valorComissao
          }
        ],
        totalInvoice: prev.valorComissao,
        paymentTerms: prev.formaPagamento
      }
    }));
    
    toast({
      title: "Preenchimento automático",
      description: "Dados da Invoice de Serviço preenchidos com base no Swift."
    });
  };

  // Simular extração de dados do câmbio
  const simularExtracaoCambio = () => {
    const impostos = comissao.valorComissao * 0.15; // 15% de impostos simulados
    const valorLiquido = comissao.valorComissao - impostos;
    
    setComissao(prev => ({
      ...prev,
      relatorioAgente: {
        nomeAgente: prev.invoiceServico.preparedBy,
        periodoInicio: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        periodoFim: new Date().toISOString().split('T')[0],
        totalVendas: prev.valorInvoice,
        percentualComissao: prev.percentualComissao,
        valorComissaoTotal: prev.valorComissao,
        impostos: impostos,
        valorLiquido: valorLiquido
      }
    }));
    
    toast({
      title: "Extração concluída",
      description: "Dados do Relatório de Comissão de Agente extraídos com sucesso."
    });
  };

  // Simular envio ao faturamento
  const enviarAoFaturamento = () => {
    const numeroNF = `NF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const dataNF = new Date().toISOString().split('T')[0];
    
    setComissao(prev => ({
      ...prev,
      nfGerada: true,
      numeroNF,
      dataNF
    }));
    
    toast({
      title: "Enviado ao Faturamento",
      description: `NF ${numeroNF} gerada com sucesso.`,
      variant: "default"
    });
  };

  // Simular conciliação bancária
  const simularConciliacao = () => {
    setComissao(prev => ({
      ...prev,
      status: StatusComissao.PAGO,
      conciliadoBanco: true,
      dataConciliacao: new Date().toISOString().split('T')[0]
    }));
    
    toast({
      title: "Conciliação realizada",
      description: "Comissão marcada como PAGA após conciliação OFX.",
      variant: "default"
    });
  };

  // Gerar PDF simulado
  const gerarPDF = (tipo: string) => {
    console.log(`Gerando PDF de ${tipo}:`, comissao);
    toast({
      title: "PDF Gerado",
      description: `PDF de ${tipo} gerado com sucesso.`
    });
  };

  const getStatusBadgeVariant = (status: StatusComissao) => {
    switch (status) {
      case StatusComissao.PAGO:
        return 'default';
      case StatusComissao.A_VENCER:
        return 'secondary';
      case StatusComissao.VENCIDO:
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Funções para manipular items da Invoice
  const adicionarItem = () => {
    const novoItem: ItemInvoice = {
      id: Date.now().toString(),
      item: (comissao.invoiceServico.items.length + 1).toString(),
      qty: 1,
      code: '',
      description: '',
      unitPrice: 0,
      totalPrice: 0
    };
    setComissao(prev => ({
      ...prev,
      invoiceServico: {
        ...prev.invoiceServico,
        items: [...prev.invoiceServico.items, novoItem]
      }
    }));
  };

  const removerItem = (id: string) => {
    setComissao(prev => ({
      ...prev,
      invoiceServico: {
        ...prev.invoiceServico,
        items: prev.invoiceServico.items.filter(item => item.id !== id)
      }
    }));
  };

  const atualizarItem = (id: string, campo: keyof ItemInvoice, valor: any) => {
    setComissao(prev => ({
      ...prev,
      invoiceServico: {
        ...prev.invoiceServico,
        items: prev.invoiceServico.items.map(item => {
          if (item.id === id) {
            const itemAtualizado = { ...item, [campo]: valor };
            if (campo === 'qty' || campo === 'unitPrice') {
              itemAtualizado.totalPrice = Number(itemAtualizado.qty) * Number(itemAtualizado.unitPrice);
            }
            return itemAtualizado;
          }
          return item;
        }),
        totalInvoice: prev.invoiceServico.items.reduce((sum, item) => {
          if (item.id === id) {
            const qty = campo === 'qty' ? Number(valor) : Number(item.qty);
            const price = campo === 'unitPrice' ? Number(valor) : Number(item.unitPrice);
            return sum + (qty * price);
          }
          return sum + item.totalPrice;
        }, 0)
      }
    }));
  };

  const handleBancoChange = (bancoId: string) => {
    const conta = mockContasBancarias.find(c => c.id === bancoId);
    const dadosInternacionais = mockDadosBancariosInternacionais[bancoId];
    
    if (conta && dadosInternacionais) {
      setComissao(prev => ({
        ...prev,
        invoiceServico: {
          ...prev.invoiceServico,
          dadosBancarios: {
            bancoId: conta.id,
            bancoNome: conta.banco,
            agencia: conta.agencia,
            accountNumber: conta.conta,
            address: dadosInternacionais.address,
            zipCode: dadosInternacionais.zipCode,
            swift: dadosInternacionais.swift,
            iban: dadosInternacionais.iban
          }
        }
      }));
      
      toast({
        title: "Banco selecionado",
        description: `Dados bancários de ${conta.banco} carregados.`
      });
    }
  };


  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Gestão de Comissões
          </h2>
          <p className="text-muted-foreground">Importação: {comissao.numeroImportacao}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(comissao.status)} className="text-sm">
          {comissao.status}
        </Badge>
      </div>

      {/* SEÇÃO 1: COBRANÇA AO CLIENTE */}
      <Collapsible open={openSections.cobranca} onOpenChange={() => toggleSection('cobranca')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Cobrança ao Cliente</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.cobranca ? 'rotate-180' : ''}`} />
              </div>
              <CardDescription>Dados da importação para cobrança</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Número da Importação Direta</Label>
                  <Input value={comissao.numeroImportacao} disabled />
                </div>
                <div>
                  <Label>Fabricante</Label>
                  <Input value={comissao.fabricante} disabled />
                </div>
                <div>
                  <Label>Forma de Pagamento</Label>
                  <Input value={comissao.formaPagamento} disabled />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Input value={comissao.descricao} disabled />
                </div>
                <div>
                  <Label>Número da DI</Label>
                  <Input value={comissao.numeroDI} disabled />
                </div>
                <div>
                  <Label>Data da DI</Label>
                  <Input type="date" value={comissao.dataDI} disabled />
                </div>
                <div>
                  <Label>Protocolo da DI</Label>
                  <Input value={comissao.protocoloDI} disabled />
                </div>
                <div>
                  <Label>Número da Invoice</Label>
                  <Input value={comissao.numeroInvoice} disabled />
                </div>
                <div>
                  <Label>Valor da Invoice (USD)</Label>
                  <Input 
                    type="number" 
                    value={comissao.valorInvoice} 
                    disabled 
                  />
                </div>
                <div>
                  <Label>Data de Pagamento</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="date" 
                      value={comissao.dataPagamento}
                      onChange={(e) => setComissao(prev => ({ ...prev, dataPagamento: e.target.value }))}
                    />
                    {comissao.alertaPagamento && <AlertCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </div>
              </div>
              <Button onClick={() => gerarPDF('Cobrança ao Cliente')} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Gerar PDF Cobrança
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 2: IDENTIFICAÇÃO DA COMISSÃO DEVIDA */}
      <Collapsible open={openSections.identificacao} onOpenChange={() => toggleSection('identificacao')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <CardTitle>Identificação da Comissão Devida</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.identificacao ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <Label>Aviso de Recebimento do Cliente</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('avisoRecebimentoCliente', file.name);
                    }}
                  />
                  {comissao.avisoRecebimentoCliente && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Percentual da Comissão (%)</Label>
                  <Input 
                    type="number" 
                    value={comissao.percentualComissao}
                    onChange={(e) => {
                      setComissao(prev => ({ ...prev, percentualComissao: Number(e.target.value) }));
                    }}
                    onBlur={calcularComissao}
                  />
                </div>
                <div>
                  <Label>Valor da Comissão (USD)</Label>
                  <Input 
                    type="number" 
                    value={comissao.valorComissao.toFixed(2)}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label>Prazo para Recebimento</Label>
                  <Input 
                    type="date" 
                    value={comissao.prazoRecebimento}
                    onChange={(e) => setComissao(prev => ({ ...prev, prazoRecebimento: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>Status</Label>
                <Select 
                  value={comissao.status} 
                  onValueChange={(value) => setComissao(prev => ({ ...prev, status: value as StatusComissao }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(StatusComissao).map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 3: SWIFT DA FÁBRICA */}
      <Collapsible open={openSections.swift} onOpenChange={() => toggleSection('swift')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <CardTitle>Swift da Fábrica</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.swift ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <Label>Swift informando o pagamento</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('swiftFabricaAnexo', file.name);
                    }}
                  />
                  {comissao.swiftFabricaAnexo && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>
              
              {comissao.swiftFabricaAnexo && (
                <Button onClick={simularPreenchimentoSwift} variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Simular Preenchimento Automático
                </Button>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 4: INVOICE DE SERVIÇO */}
      <Collapsible open={openSections.invoice} onOpenChange={() => toggleSection('invoice')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Invoice de Serviço - Comissão</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.invoice ? 'rotate-180' : ''}`} />
              </div>
              <CardDescription>Campos editáveis para geração do documento</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Swift da Fábrica */}
              <div className="space-y-2">
                <Label>Swift da fábrica informando o pagamento</Label>
                <div className="flex gap-2">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('swiftFabricaAnexo', file.name);
                    }}
                  />
                  {comissao.swiftFabricaAnexo && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>

              {/* Invoice To */}
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Invoice to</Label>
                  <Input 
                    value={comissao.invoiceServico.invoiceTo}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      invoiceServico: { ...prev.invoiceServico, invoiceTo: e.target.value }
                    }))}
                    placeholder="Nome do fabricante/destinatário"
                  />
                </div>
              </div>

              {/* PAGE / SALES REPRES */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                  Page / Sales Repres
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Page</Label>
                    <Input 
                      value={comissao.invoiceServico.page}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, page: e.target.value }
                      }))}
                      placeholder="1/1"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Prepared by</Label>
                    <Input 
                      value={comissao.invoiceServico.preparedBy}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, preparedBy: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Phone Number</Label>
                    <Input 
                      value={comissao.invoiceServico.phoneNumber}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, phoneNumber: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={comissao.invoiceServico.email}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, email: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* CONTACT PERSON */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                  Contact Person
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Name</Label>
                    <Input 
                      value={comissao.invoiceServico.contactPersonName}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, contactPersonName: e.target.value }
                      }))}
                      placeholder="Nome da pessoa de contato"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={comissao.invoiceServico.contactPersonEmail}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, contactPersonEmail: e.target.value }
                      }))}
                      placeholder="Email da pessoa de contato"
                    />
                  </div>
                </div>
              </div>

              {/* TRANSACTION DETAILS */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                  Transaction Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Transaction ID</Label>
                    <Input 
                      value={comissao.invoiceServico.transactionId || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionId: e.target.value }
                      }))}
                      placeholder="ID da transação"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Amount</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={comissao.invoiceServico.transactionAmount || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionAmount: parseFloat(e.target.value) || 0 }
                      }))}
                      placeholder="Valor da transação"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Booked date</Label>
                    <Input 
                      type="date"
                      value={comissao.invoiceServico.transactionBookedDate || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionBookedDate: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Transaction type</Label>
                    <Input 
                      value={comissao.invoiceServico.transactionType || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionType: e.target.value }
                      }))}
                      placeholder="Tipo de transação"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Value date</Label>
                    <Input 
                      type="date"
                      value={comissao.invoiceServico.transactionValueDate || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionValueDate: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Exchange rate</Label>
                    <Input 
                      type="number"
                      step="0.0001"
                      value={comissao.invoiceServico.transactionExchangeRate || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionExchangeRate: parseFloat(e.target.value) || 0 }
                      }))}
                      placeholder="Taxa de câmbio"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Beneficiary's account</Label>
                    <Input 
                      value={comissao.invoiceServico.beneficiaryAccount || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, beneficiaryAccount: e.target.value }
                      }))}
                      placeholder="Conta do beneficiário"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Beneficiary's bank</Label>
                    <Input 
                      value={comissao.invoiceServico.beneficiaryBank || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, beneficiaryBank: e.target.value }
                      }))}
                      placeholder="Banco do beneficiário"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Beneficiary bank's address</Label>
                    <Input 
                      value={comissao.invoiceServico.beneficiaryBankAddress || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, beneficiaryBankAddress: e.target.value }
                      }))}
                      placeholder="Endereço do banco"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Beneficiary's name</Label>
                    <Input 
                      value={comissao.invoiceServico.beneficiaryName || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, beneficiaryName: e.target.value }
                      }))}
                      placeholder="Nome do beneficiário"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Beneficiary's address</Label>
                    <Input 
                      value={comissao.invoiceServico.beneficiaryAddress || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, beneficiaryAddress: e.target.value }
                      }))}
                      placeholder="Endereço do beneficiário"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md md:col-span-2">
                    <Label>Message</Label>
                    <Input 
                      value={comissao.invoiceServico.transactionMessage || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        invoiceServico: { ...prev.invoiceServico, transactionMessage: e.target.value }
                      }))}
                      placeholder="Mensagem da transação"
                    />
                  </div>
                </div>
              </div>

              {/* Itens de Serviço */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">ITENS DE SERVIÇO</h3>
                  <Button onClick={adicionarItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>

                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Item</TableHead>
                        <TableHead className="w-20">Qty</TableHead>
                        <TableHead className="w-24">Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-32">Unit Price USD</TableHead>
                        <TableHead className="w-32">Total Price USD</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comissao.invoiceServico.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.item}</TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) => atualizarItem(item.id, 'qty', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={item.code}
                              onChange={(e) => atualizarItem(item.id, 'code', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={item.description}
                              onChange={(e) => atualizarItem(item.id, 'description', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => atualizarItem(item.id, 'unitPrice', e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removerItem(item.id)}
                              disabled={comissao.invoiceServico.items.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-semibold">
                      TOTAL OF INVOICE: {comissao.invoiceServico.moeda} {comissao.invoiceServico.totalInvoice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dados Bancários */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">DADOS BANCÁRIOS</h3>
                
                <div>
                  <Label>Selecionar Banco</Label>
                  <Select 
                    value={comissao.invoiceServico.dadosBancarios.bancoId}
                    onValueChange={handleBancoChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o banco para remessa" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockContasBancarias
                        .filter(c => c.status === 'Ativa')
                        .map(conta => (
                          <SelectItem key={conta.id} value={conta.id}>
                            {conta.banco} - Ag: {conta.agencia} - Conta: {conta.conta}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                {comissao.invoiceServico.dadosBancarios.bancoId && (
                  <div className="space-y-4 border p-4 rounded-md bg-muted/20">
                    <div>
                      <Label className="text-muted-foreground">Payment Terms</Label>
                      <Input 
                        value={comissao.invoiceServico.paymentTerms || comissao.formaPagamento}
                        readOnly
                        className="bg-muted"
                      />
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Please remit to</Label>
                      <Input 
                        value={comissao.invoiceServico.preparedBy}
                        readOnly
                        className="bg-muted"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Bank</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.bancoNome}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                        <Label>Address</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.address}
                          onChange={(e) => setComissao(prev => ({
                            ...prev,
                            invoiceServico: {
                              ...prev.invoiceServico,
                              dadosBancarios: {
                                ...prev.invoiceServico.dadosBancarios,
                                address: e.target.value
                              }
                            }
                          }))}
                        />
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                        <Label>ZIP Code</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.zipCode}
                          onChange={(e) => setComissao(prev => ({
                            ...prev,
                            invoiceServico: {
                              ...prev.invoiceServico,
                              dadosBancarios: {
                                ...prev.invoiceServico.dadosBancarios,
                                zipCode: e.target.value
                              }
                            }
                          }))}
                        />
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Agency</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.agencia}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Account number</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.accountNumber}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                        <Label>SWIFT</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.swift}
                          onChange={(e) => setComissao(prev => ({
                            ...prev,
                            invoiceServico: {
                              ...prev.invoiceServico,
                              dadosBancarios: {
                                ...prev.invoiceServico.dadosBancarios,
                                swift: e.target.value
                              }
                            }
                          }))}
                        />
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                        <Label>IBAN code</Label>
                        <Input 
                          value={comissao.invoiceServico.dadosBancarios.iban}
                          onChange={(e) => setComissao(prev => ({
                            ...prev,
                            invoiceServico: {
                              ...prev.invoiceServico,
                              dadosBancarios: {
                                ...prev.invoiceServico.dadosBancarios,
                                iban: e.target.value
                              }
                            }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rodapé */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">RODAPÉ</h3>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Rodapé (Editável)</Label>
                  <Textarea 
                    rows={3}
                    value={comissao.invoiceServico.rodape}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      invoiceServico: { ...prev.invoiceServico, rodape: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <Button onClick={() => gerarPDF('Invoice de Serviço')} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Gerar PDF Invoice
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 5: ORDEM DE PAGAMENTO */}
      <Collapsible open={openSections.ordem} onOpenChange={() => toggleSection('ordem')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  <CardTitle>Ordem de Pagamento</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.ordem ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div>
                <Label>Ordem de pagamento recebida do exterior</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('ordemPagamentoAnexo', file.name);
                    }}
                  />
                  {comissao.ordemPagamentoAnexo && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 6: FATURA DE RECEBIMENTO */}
      <Collapsible open={openSections.fatura} onOpenChange={() => toggleSection('fatura')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Fatura de Recebimento</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.fatura ? 'rotate-180' : ''}`} />
              </div>
              <CardDescription>Dados para emissão da fatura</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Número da Fatura</Label>
                  <Input 
                    value={comissao.faturaRecebimento.numero}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, numero: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Data</Label>
                  <Input 
                    type="date"
                    value={comissao.faturaRecebimento.data}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, data: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Beneficiário</Label>
                  <Input 
                    value={comissao.faturaRecebimento.beneficiario}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, beneficiario: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Banco</Label>
                  <Input 
                    value={comissao.faturaRecebimento.banco}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, banco: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Agência</Label>
                  <Input 
                    value={comissao.faturaRecebimento.agencia}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, agencia: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Conta</Label>
                  <Input 
                    value={comissao.faturaRecebimento.conta}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, conta: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Valor Recebido (USD)</Label>
                  <Input 
                    type="number"
                    value={comissao.faturaRecebimento.valorRecebido}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, valorRecebido: Number(e.target.value) }
                    }))}
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Moeda</Label>
                  <Input 
                    value={comissao.faturaRecebimento.moeda}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, moeda: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <Button onClick={() => gerarPDF('Fatura de Recebimento')} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Gerar PDF Fatura
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 7: FECHAMENTO DO CÂMBIO */}
      <Collapsible open={openSections.cambio} onOpenChange={() => toggleSection('cambio')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <CardTitle>Fechamento do Câmbio</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.cambio ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <Label>Swift</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('swiftCambioAnexo', file.name);
                    }}
                  />
                  {comissao.swiftCambioAnexo && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label>Contrato de Câmbio</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('contratoCambioAnexo', file.name);
                    }}
                  />
                  {comissao.contratoCambioAnexo && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label>Detalhamento do Motivo da Remessa</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('detalhamentoRemessaAnexo', file.name);
                    }}
                  />
                  {comissao.detalhamentoRemessaAnexo && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Anexado
                    </Badge>
                  )}
                </div>
              </div>

              {comissao.swiftCambioAnexo && comissao.contratoCambioAnexo && comissao.detalhamentoRemessaAnexo && (
                <Button onClick={simularExtracaoCambio} variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Simular Extração de Dados
                </Button>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 8: RELATÓRIO COMISSÃO DE AGENTE */}
      <Collapsible open={openSections.relatorio} onOpenChange={() => toggleSection('relatorio')}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Relatório Comissão de Agente</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.relatorio ? 'rotate-180' : ''}`} />
              </div>
              <CardDescription>Dados extraídos automaticamente</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome do Agente</Label>
                  <Input value={comissao.relatorioAgente.nomeAgente} disabled className="bg-muted" />
                </div>
                <div>
                  <Label>Período</Label>
                  <div className="flex gap-2">
                    <Input type="date" value={comissao.relatorioAgente.periodoInicio} disabled className="bg-muted" />
                    <Input type="date" value={comissao.relatorioAgente.periodoFim} disabled className="bg-muted" />
                  </div>
                </div>
                <div>
                  <Label>Total de Vendas (USD)</Label>
                  <Input 
                    value={comissao.relatorioAgente.totalVendas.toFixed(2)} 
                    disabled 
                    className="bg-muted" 
                  />
                </div>
                <div>
                  <Label>Percentual Comissão (%)</Label>
                  <Input 
                    value={comissao.relatorioAgente.percentualComissao} 
                    disabled 
                    className="bg-muted" 
                  />
                </div>
                <div>
                  <Label>Valor Comissão Total (USD)</Label>
                  <Input 
                    value={comissao.relatorioAgente.valorComissaoTotal.toFixed(2)} 
                    disabled 
                    className="bg-muted font-semibold" 
                  />
                </div>
                <div>
                  <Label>Impostos (USD)</Label>
                  <Input 
                    value={comissao.relatorioAgente.impostos.toFixed(2)} 
                    disabled 
                    className="bg-muted" 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Valor Líquido (USD)</Label>
                  <Input 
                    value={comissao.relatorioAgente.valorLiquido.toFixed(2)} 
                    disabled 
                    className="bg-muted font-semibold text-lg" 
                  />
                </div>
              </div>
              
              {comissao.relatorioAgente.nomeAgente && !comissao.nfGerada && (
                <Button onClick={enviarAoFaturamento} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar ao Faturamento
                </Button>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SEÇÃO 9: STATUS DA INTEGRAÇÃO */}
      <Collapsible open={openSections.integracao} onOpenChange={() => toggleSection('integracao')}>
        <Card className="border-2">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <CardTitle>Status da Integração</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.integracao ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {comissao.nfGerada ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">NF Gerada:</span>
                    <Badge variant={comissao.nfGerada ? 'default' : 'outline'}>
                      {comissao.nfGerada ? 'Sim' : 'Não'}
                    </Badge>
                  </div>
                  {comissao.nfGerada && (
                    <div className="ml-7 space-y-1">
                      <p className="text-sm">Número: <span className="font-semibold">{comissao.numeroNF}</span></p>
                      <p className="text-sm">Data: <span className="font-semibold">{comissao.dataNF}</span></p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {comissao.conciliadoBanco ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">Conciliado no Banco:</span>
                    <Badge variant={comissao.conciliadoBanco ? 'default' : 'outline'}>
                      {comissao.conciliadoBanco ? 'Sim' : 'Não'}
                    </Badge>
                  </div>
                  {comissao.conciliadoBanco && (
                    <div className="ml-7">
                      <p className="text-sm">Data: <span className="font-semibold">{comissao.dataConciliacao}</span></p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status Final:</span>
                  <Badge variant={getStatusBadgeVariant(comissao.status)} className="text-base px-4 py-1">
                    {comissao.status}
                  </Badge>
                </div>
              </div>

              {comissao.nfGerada && !comissao.conciliadoBanco && (
                <Button onClick={simularConciliacao} variant="outline" className="w-full">
                  <Banknote className="h-4 w-4 mr-2" />
                  Simular Conciliação OFX
                </Button>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default GestaoComissoesTab;
