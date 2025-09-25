import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, Search, FileText, Download, Upload, ExternalLink,
  CheckCircle, AlertCircle, Clock, Settings
} from "lucide-react";

const DocumentosFiscaisView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data para NF-e
  const notasFiscais = [
    {
      id: 1,
      numero: "12345",
      serie: "001",
      fornecedor: "Fornecedor ABC Ltda",
      cnpj: "12.345.678/0001-90",
      dataEmissao: "2025-01-20",
      valor: 2500.00,
      status: "Processada",
      chaveAcesso: "35250112345678000190550010000123451234567890",
      arquivo: "nfe_12345.xml"
    },
    {
      id: 2,
      numero: "67890",
      serie: "001",
      fornecedor: "Tech Solutions S.A.",
      cnpj: "98.765.432/0001-12",
      dataEmissao: "2025-01-18",
      valor: 5200.00,
      status: "Pendente Validação",
      chaveAcesso: "35250198765432000112550010000678901234567890",
      arquivo: "nfe_67890.xml"
    },
    {
      id: 3,
      numero: "11111",
      serie: "002", 
      fornecedor: "Energy Corp",
      cnpj: "11.222.333/0001-44",
      dataEmissao: "2025-01-15",
      valor: 4800.00,
      status: "Erro Download",
      chaveAcesso: "35250111222333000144550020000111111234567890",
      arquivo: null
    }
  ];

  // Mock data para Guias G&R
  const guiasGR = [
    {
      id: 1,
      numeroGuia: "GR-001-2025",
      tipo: "ICMS",
      estado: "SP",
      municipio: "São Paulo",
      vencimento: "2025-01-31",
      valor: 1200.00,
      status: "Gerada",
      codigoBarras: "82660000001200012025013112345678901234567890123456789012",
      dataGeracao: "2025-01-20"
    },
    {
      id: 2,
      numeroGuia: "GR-002-2025",
      tipo: "ISS",
      estado: "RJ",
      municipio: "Rio de Janeiro", 
      vencimento: "2025-02-05",
      valor: 800.00,
      status: "Pendente Geração",
      codigoBarras: null,
      dataGeracao: null
    },
    {
      id: 3,
      numeroGuia: "GR-003-2025",
      tipo: "ICMS ST",
      estado: "MG",
      municipio: "Belo Horizonte",
      vencimento: "2025-01-25",
      valor: 650.00,
      status: "Paga",
      codigoBarras: "82660000000650012025012512345678901234567890123456789012",
      dataGeracao: "2025-01-15"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processada':
      case 'Gerada':
      case 'Paga':
        return 'bg-green-500 text-white';
      case 'Pendente Validação':
      case 'Pendente Geração':
        return 'bg-yellow-500 text-white';
      case 'Erro Download':
        return 'bg-red-500 text-white';
      default: 
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processada':
      case 'Gerada':
      case 'Paga':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pendente Validação':
      case 'Pendente Geração':
        return <Clock className="h-4 w-4" />;
      case 'Erro Download':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Documentos Fiscais</h2>
          <p className="text-muted-foreground">Gestão de NF-e e Guias G&R (GNRE)</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Configurações Fiscais
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">NF-e Processadas</p>
                <p className="text-2xl font-bold text-green-600">{notasFiscais.filter(nf => nf.status === 'Processada').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">NF-e Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{notasFiscais.filter(nf => nf.status === 'Pendente Validação').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Guias Geradas</p>
                <p className="text-2xl font-bold text-blue-600">{guiasGR.filter(g => g.status === 'Gerada').length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Valor</p>
                <p className="text-2xl font-bold text-purple-600">R$ 15.150</p>
              </div>
              <Download className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas principais */}
      <Tabs defaultValue="nfe" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nfe">Download NF-e</TabsTrigger>
          <TabsTrigger value="guias">Gestão Guias G&R</TabsTrigger>
          <TabsTrigger value="integracoes">Integrações Fiscais</TabsTrigger>
        </TabsList>

        <TabsContent value="nfe" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Download Automático de NF-e
                </CardTitle>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Sincronizar NF-e
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pesquisar por número, fornecedor ou chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Manual
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número/Série</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Data Emissão</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notasFiscais.map((nfe) => (
                    <TableRow key={nfe.id}>
                      <TableCell className="font-medium">{nfe.numero}/{nfe.serie}</TableCell>
                      <TableCell>{nfe.fornecedor}</TableCell>
                      <TableCell>{nfe.cnpj}</TableCell>
                      <TableCell>{formatDate(nfe.dataEmissao)}</TableCell>
                      <TableCell>{formatCurrency(nfe.valor)}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(nfe.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(nfe.status)}
                          {nfe.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          {nfe.arquivo && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Gestão de Guias G&R (GNRE)
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Gerar Nova Guia
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número Guia</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado/Município</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guiasGR.map((guia) => (
                    <TableRow key={guia.id}>
                      <TableCell className="font-medium">{guia.numeroGuia}</TableCell>
                      <TableCell>{guia.tipo}</TableCell>
                      <TableCell>{guia.estado} / {guia.municipio}</TableCell>
                      <TableCell>{formatDate(guia.vencimento)}</TableCell>
                      <TableCell>{formatCurrency(guia.valor)}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(guia.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(guia.status)}
                          {guia.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          {guia.codigoBarras && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integracoes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Integração NF-e
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Download Automático Configurado</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Sistema configurado para download automático de NF-e via integração com a Receita Federal.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Certificado Digital
                  </Button>
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Testar Conexão SEFAZ
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Integração GNRE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Integração em Desenvolvimento</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Automação para geração e gestão de Guias G&R será disponibilizada em breve.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" disabled>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Estados
                  </Button>
                  <Button className="w-full" variant="outline" disabled>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Testar Conexão GNRE
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentosFiscaisView;