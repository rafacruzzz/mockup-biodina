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
  Trash2,
  Paperclip
} from 'lucide-react';
import { StatusComissao, ItemInvoice } from '@/types/comissoes';
import { mockComissoes, defaultInvoiceServico, defaultFaturaRecebimento, mockDadosBancariosInternacionais } from '@/data/comissoes';
import { mockContasBancarias } from '@/data/tesouraria';
import biodinaLogo from '@/assets/biodina-logo.png';

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
      dataFechamentoCambio: '',
      taxaCambial: 0,
      clientes: [],
      totalUSD: 0,
      totalReal: 0,
      comissoesBiodinaUSD: 0,
      comissoesBiodinaReal: 0,
      comissoesMarketingUSD: 0,
      comissoesMarketingReal: 0,
      totalGeralUSD: 0,
      totalGeralReal: 0,
      nomeDistribuidor: '',
      distribuidores: []
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
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      
      switch(field) {
        case 'swiftFabrica':
          setComissao(prev => ({
            ...prev,
            swiftFabricaAnexo: fileName
          }));
          // Chamar automaticamente o preenchimento da Invoice
          setTimeout(() => simularPreenchimentoSwift(), 100);
          break;
        case 'swiftFabricaFatura':
          setComissao(prev => ({
            ...prev,
            faturaRecebimento: {
              ...prev.faturaRecebimento,
              swiftAnexo: fileName
            }
          }));
          break;
        case 'ordemPagamento':
          setComissao(prev => ({
            ...prev,
            ordemPagamentoAnexo: fileName
          }));
          break;
        case 'swiftCambio':
          setComissao(prev => ({
            ...prev,
            swiftCambioAnexo: fileName
          }));
          break;
        case 'contratoCambio':
          setComissao(prev => ({
            ...prev,
            contratoCambioAnexo: fileName
          }));
          break;
        case 'detalhamentoRemessa':
          setComissao(prev => ({
            ...prev,
            detalhamentoRemessaAnexo: fileName
          }));
          break;
        default:
          setComissao(prev => ({ ...prev, [field]: fileName }));
      }
      
      toast({
        title: "Arquivo anexado",
        description: `${fileName} foi anexado com sucesso.`
      });
    }
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
    const taxaCambial = 5.234; // Taxa de câmbio simulada
    const valorRealRecebido = comissao.valorComissao * taxaCambial;
    
    setComissao(prev => ({
      ...prev,
      relatorioAgente: {
        dataFechamentoCambio: new Date().toLocaleDateString('pt-BR'),
        taxaCambial: taxaCambial,
        clientes: [
          {
            cliente: prev.fabricante,
            processo: prev.numeroImportacao,
            fatura: prev.numeroInvoice,
            dataFatura: new Date(prev.dataDI).toLocaleDateString('pt-BR'),
            valorFaturadoUSD: prev.valorInvoice,
            uf: 'RJ',
            valorUSD: prev.valorComissao,
            valorRealRecebido: valorRealRecebido
          }
        ],
        totalUSD: prev.valorComissao,
        totalReal: valorRealRecebido,
        comissoesBiodinaUSD: prev.valorComissao,
        comissoesBiodinaReal: valorRealRecebido,
        comissoesMarketingUSD: 0,
        comissoesMarketingReal: 0,
        totalGeralUSD: prev.valorComissao,
        totalGeralReal: valorRealRecebido,
        nomeDistribuidor: '',
        distribuidores: []
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
                    onChange={(e) => handleFileUpload(e, 'avisoRecebimentoCliente')}
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
                    onChange={(e) => handleFileUpload(e, 'swiftFabrica')}
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

              {/* INVOICE e Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>INVOICE:</Label>
                  <Input 
                    value={comissao.invoiceServico.numero}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      invoiceServico: { ...prev.invoiceServico, numero: e.target.value }
                    }))}
                    placeholder="Número da invoice"
                  />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Date:</Label>
                  <Input 
                    type="date"
                    value={comissao.invoiceServico.data}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      invoiceServico: { ...prev.invoiceServico, data: e.target.value }
                    }))}
                  />
                </div>
              </div>

              {/* PAGE */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                  Page
                </h3>
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
              </div>

              {/* SALES REPRES. */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                  Sales Repres.
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md md:col-span-2">
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
                <div className="space-y-4 border p-4 rounded-md bg-muted/20">
                  <div>
                    <Label className="text-muted-foreground">Payment Terms</Label>
                    <Input 
                      value="Net Cash"
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
                        value="Banco do Brasil"
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Address</Label>
                      <Input 
                        value="Av. Ernani do Amaral Peixoto, 347 - Centro, Niterói - RJ"
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">ZIP Code</Label>
                      <Input 
                        value="24020-072"
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Agency</Label>
                      <Input 
                        value="0072-8"
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Account number</Label>
                      <Input 
                        value="19260-0"
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
                    <div>
                      <Label className="text-muted-foreground">IBAN code</Label>
                      <Input 
                        value="BR5600000000000072000019260C1"
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>
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
                    onChange={(e) => handleFileUpload(e, 'ordemPagamento')}
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
            <CardContent className="space-y-6">
              {/* Logo e Dados do Beneficiário */}
              <div className="space-y-4 border-b pb-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={biodinaLogo} 
                    alt="iMuv Brasil" 
                    className="h-16 w-auto"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-2">Dados do beneficiário</h3>
                    <p className="text-sm">BIODINA INSTRUMENTOS CIENTÍFICOS LTDA</p>
                    <p className="text-sm">CNPJ: 29.375.441/0001-50</p>
                  </div>
                </div>
              </div>

              {/* Dados da Ordem de Pagamento */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">DADOS DA ORDEM DE PAGAMENTO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Número</Label>
                    <Input 
                      value={comissao.faturaRecebimento.numeroOrdem}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, numeroOrdem: e.target.value }
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
                    <Label>País</Label>
                    <Input 
                      value={comissao.faturaRecebimento.pais}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, pais: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Finalidade</Label>
                    <Input 
                      value={comissao.faturaRecebimento.finalidade}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, finalidade: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Detalhes da Transação */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">DETALHES DA TRANSAÇÃO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-md">
                    <Label>Número Origem</Label>
                    <Input 
                      value={comissao.faturaRecebimento.numeroOrigem}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, numeroOrigem: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="p-3 rounded-md">
                    <Label>Data Inclusão</Label>
                    <Input 
                      type="date"
                      value={comissao.faturaRecebimento.dataInclusao}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, dataInclusao: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md md:col-span-2">
                    <Label>Remetente</Label>
                    <Input 
                      value={comissao.faturaRecebimento.remetente}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, remetente: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="p-3 rounded-md">
                    <Label>Moeda</Label>
                    <Input 
                      value={comissao.faturaRecebimento.moeda}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, moeda: e.target.value }
                      }))}
                      placeholder="USD, EUR, etc."
                    />
                  </div>
                  <div className="p-3 rounded-md">
                    <Label>Valor</Label>
                    <Input 
                      type="number"
                      value={comissao.faturaRecebimento.valor}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, valor: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="p-3 rounded-md">
                    <Label>Saldo</Label>
                    <Input 
                      type="number"
                      value={comissao.faturaRecebimento.saldo}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, saldo: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md md:col-span-2">
                    <Label>Description of Service</Label>
                    <Textarea 
                      rows={2}
                      value={comissao.faturaRecebimento.descriptionOfService}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, descriptionOfService: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person (iMuv) */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">CONTACT PERSON (iMuv)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Prepared by</Label>
                    <Input 
                      value={comissao.faturaRecebimento.preparedBy}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, preparedBy: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Phone Number</Label>
                    <Input 
                      value={comissao.faturaRecebimento.phoneNumber}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, phoneNumber: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md md:col-span-2">
                    <Label>E-mail</Label>
                    <Input 
                      type="email"
                      value={comissao.faturaRecebimento.emailBiodina}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, emailBiodina: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person (Radiometer) */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">CONTACT PERSON (RADIOMETER)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Contact Person</Label>
                    <Input 
                      value={comissao.faturaRecebimento.contactPersonRadiometer}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, contactPersonRadiometer: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>E-mail</Label>
                    <Input 
                      type="email"
                      value={comissao.faturaRecebimento.emailRadiometer}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, emailRadiometer: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>


              {/* Banking Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">BANKING INFORMATION</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Payment Terms</Label>
                    <Input 
                      value={comissao.faturaRecebimento.paymentTerms}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, paymentTerms: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Bank</Label>
                    <Input 
                      value={comissao.faturaRecebimento.bankName}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, bankName: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md md:col-span-2">
                    <Label>Address</Label>
                    <Input 
                      value={comissao.faturaRecebimento.bankAddress}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, bankAddress: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Agency</Label>
                    <Input 
                      value={comissao.faturaRecebimento.agency}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, agency: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>Account number</Label>
                    <Input 
                      value={comissao.faturaRecebimento.accountNumber}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, accountNumber: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>SWIFT</Label>
                    <Input 
                      value={comissao.faturaRecebimento.swiftIban?.split('BR')[0] || ''}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { 
                          ...prev.faturaRecebimento, 
                          swiftIban: e.target.value + (prev.faturaRecebimento.swiftIban?.includes('BR') ? 'BR' + prev.faturaRecebimento.swiftIban.split('BR')[1] : '')
                        }
                      }))}
                      placeholder="SWIFT code"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                    <Label>IBAN code</Label>
                    <Input 
                      value={comissao.faturaRecebimento.swiftIban}
                      onChange={(e) => setComissao(prev => ({
                        ...prev,
                        faturaRecebimento: { ...prev.faturaRecebimento, swiftIban: e.target.value }
                      }))}
                      placeholder="BR56 00000000000 720 0001 9260 0C1"
                    />
                  </div>
                </div>
              </div>

              {/* Rodapé */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">RODAPÉ</h3>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md">
                  <Label>Rodapé (Editável)</Label>
                  <Textarea 
                    rows={3}
                    value={comissao.faturaRecebimento.footer}
                    onChange={(e) => setComissao(prev => ({
                      ...prev,
                      faturaRecebimento: { ...prev.faturaRecebimento, footer: e.target.value }
                    }))}
                    className="font-mono text-xs"
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
                    onChange={(e) => handleFileUpload(e, 'swiftCambio')}
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
                    onChange={(e) => handleFileUpload(e, 'contratoCambio')}
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
                    onChange={(e) => handleFileUpload(e, 'detalhamentoRemessa')}
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
            <CardContent className="space-y-6">
              {/* Fechamento de Câmbio */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Fechamento de Câmbio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Fechamento de Câmbio</Label>
                    <Input 
                      value={comissao.relatorioAgente.dataFechamentoCambio} 
                      disabled 
                      className="bg-muted" 
                    />
                  </div>
                  <div>
                    <Label>Taxa Cambial</Label>
                    <Input 
                      value={`R$ ${comissao.relatorioAgente.taxaCambial.toFixed(3)}`} 
                      disabled 
                      className="bg-muted" 
                    />
                  </div>
                </div>
              </div>

              {/* Tabela de Clientes */}
              <div>
                <h3 className="font-semibold mb-3">Tabela de Clientes</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">Cliente</th>
                          <th className="px-3 py-2 text-left font-medium">Processo</th>
                          <th className="px-3 py-2 text-left font-medium">Fatura</th>
                          <th className="px-3 py-2 text-left font-medium">Data Fatura</th>
                          <th className="px-3 py-2 text-right font-medium">Valor Faturado USD</th>
                          <th className="px-3 py-2 text-center font-medium">UF</th>
                          <th className="px-3 py-2 text-right font-medium">Valor USD</th>
                          <th className="px-3 py-2 text-right font-medium">Valor R$ Receb.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comissao.relatorioAgente.clientes.map((cliente, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-3 py-2">{cliente.cliente}</td>
                            <td className="px-3 py-2">{cliente.processo}</td>
                            <td className="px-3 py-2">{cliente.fatura}</td>
                            <td className="px-3 py-2">{cliente.dataFatura}</td>
                            <td className="px-3 py-2 text-right">{cliente.valorFaturadoUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td className="px-3 py-2 text-center">{cliente.uf}</td>
                            <td className="px-3 py-2 text-right">{cliente.valorUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td className="px-3 py-2 text-right">{cliente.valorRealRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                        <tr className="border-t bg-muted/50 font-semibold">
                          <td colSpan={6} className="px-3 py-2 text-right">Total USD:</td>
                          <td className="px-3 py-2 text-right">{comissao.relatorioAgente.totalUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="px-3 py-2"></td>
                        </tr>
                        <tr className="bg-muted/50 font-semibold">
                          <td colSpan={7} className="px-3 py-2 text-right">Total R$:</td>
                          <td className="px-3 py-2 text-right">{comissao.relatorioAgente.totalReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Comissões e Total Geral */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold mb-3">Comissões e Total Geral</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-medium">Comissões Agente iMuv Emp. e Participações USD:</span>
                    <span className="font-semibold">{comissao.relatorioAgente.comissoesBiodinaUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-medium">R$:</span>
                    <span className="font-semibold">{comissao.relatorioAgente.comissoesBiodinaReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-medium">Comissões de Marketing USD:</span>
                    <span className="font-semibold">{comissao.relatorioAgente.comissoesMarketingUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-medium">R$:</span>
                    <span className="font-semibold">{comissao.relatorioAgente.comissoesMarketingReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary/10 rounded border-2 border-primary/30">
                    <span className="font-bold">Total Geral USD:</span>
                    <span className="font-bold text-lg">{comissao.relatorioAgente.totalGeralUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary/10 rounded border-2 border-primary/30">
                    <span className="font-bold">R$:</span>
                    <span className="font-bold text-lg">{comissao.relatorioAgente.totalGeralReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Comissão para Distribuidores */}
              {comissao.relatorioAgente.distribuidores.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Comissão para Distribuidores</h3>
                  <div className="mb-3">
                    <Label>Distribuidor</Label>
                    <Input 
                      value={comissao.relatorioAgente.nomeDistribuidor} 
                      disabled 
                      className="bg-muted" 
                    />
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium">Cliente</th>
                            <th className="px-3 py-2 text-left font-medium">Processo</th>
                            <th className="px-3 py-2 text-left font-medium">Fatura</th>
                            <th className="px-3 py-2 text-right font-medium">Valor Faturado</th>
                            <th className="px-3 py-2 text-right font-medium">Comissão USD</th>
                            <th className="px-3 py-2 text-right font-medium">Comissão Recebida R$</th>
                            <th className="px-3 py-2 text-right font-medium">Comissão Distribuidor R$</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comissao.relatorioAgente.distribuidores.map((dist, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-3 py-2">{dist.cliente}</td>
                              <td className="px-3 py-2">{dist.processo}</td>
                              <td className="px-3 py-2">{dist.fatura}</td>
                              <td className="px-3 py-2 text-right">{dist.valorFaturado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                              <td className="px-3 py-2 text-right">{dist.comissaoUSD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                              <td className="px-3 py-2 text-right">{dist.comissaoRecebidaReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                              <td className="px-3 py-2 text-right">{dist.comissaoDistribuidorReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex gap-3">
                {comissao.relatorioAgente.dataFechamentoCambio && !comissao.nfGerada && (
                  <Button onClick={enviarAoFaturamento} className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar ao Faturamento
                  </Button>
                )}
                {comissao.relatorioAgente.dataFechamentoCambio && (
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                )}
              </div>

              {/* Status */}
              {comissao.conciliadoBanco && comissao.nfGerada && (
                <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="font-bold text-green-700 dark:text-green-300 text-lg">Comissão Paga</p>
                </div>
              )}
              {comissao.nfGerada && !comissao.conciliadoBanco && (
                <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 rounded-lg p-4 text-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="font-bold text-blue-700 dark:text-blue-300">NF Gerada: {comissao.numeroNF}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Aguardando conciliação bancária</p>
                </div>
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
