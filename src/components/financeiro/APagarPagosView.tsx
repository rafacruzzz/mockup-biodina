import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, Search, Calendar, FileText, Clock, DollarSign,
  AlertTriangle, CheckCircle, CreditCard, Building, Download
} from "lucide-react";
import CalendarioVencimentos from "./CalendarioVencimentos";
import PagamentosRecorrentesModal from "./PagamentosRecorrentesModal";

const APagarPagosView = () => {
  const [showRecorrentesModal, setShowRecorrentesModal] = useState(false);

  const resumoGeral = {
    totalPendente: 47500.00,
    totalVencido: 12300.00,
    totalMes: 89200.00,
    proximosVencimentos: 15
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header com ações principais */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">A Pagar x Pagos</h2>
          <p className="text-muted-foreground">Gestão completa de contas a pagar e programação financeira</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowRecorrentesModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Pagamentos Recorrentes
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta a Pagar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pendente</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(resumoGeral.totalPendente)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vencido</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(resumoGeral.totalVencido)}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total do Mês</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(resumoGeral.totalMes)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próximos Vencimentos</p>
                <p className="text-2xl font-bold text-purple-600">{resumoGeral.proximosVencimentos}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas principais */}
      <Tabs defaultValue="programacao" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="programacao">Programação</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="conciliacao">Conciliação</TabsTrigger>
          <TabsTrigger value="contratos">Contratos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="programacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contas a Pagar - Programação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Pesquisar por fornecedor, descrição ou número..." 
                    className="w-96"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Filtrar por Data
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma Pgto</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">CP-001</TableCell>
                    <TableCell>Fornecedor ABC Ltda</TableCell>
                    <TableCell>Material de escritório - Janeiro</TableCell>
                    <TableCell className="text-right">R$ 2.500,00</TableCell>
                    <TableCell>25/01/2025</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">Pendente</Badge>
                    </TableCell>
                    <TableCell>PIX</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button variant="outline" size="sm">Pagar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CP-002</TableCell>
                    <TableCell>Energy Corp</TableCell>
                    <TableCell>Conta de energia elétrica</TableCell>
                    <TableCell className="text-right">R$ 4.800,00</TableCell>
                    <TableCell>15/01/2025</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Vencido</Badge>
                    </TableCell>
                    <TableCell>Boleto</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button variant="default" size="sm">Pagar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CP-003</TableCell>
                    <TableCell>Telecom Solutions</TableCell>
                    <TableCell>Internet e telefonia corporativa</TableCell>
                    <TableCell className="text-right">R$ 1.200,00</TableCell>
                    <TableCell>30/01/2025</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Programado</Badge>
                    </TableCell>
                    <TableCell>Débito Automático</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button variant="outline" size="sm">Editar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario" className="space-y-4">
          <CalendarioVencimentos />
        </TabsContent>

        <TabsContent value="conciliacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Conciliação Bancária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Conciliação com extratos OFX</p>
                <p className="text-sm text-muted-foreground mt-2">Importe seus extratos bancários para conciliação automática</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Importar Extrato OFX
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contratos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Acompanhamento de Contratos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Contratos Parcelados</p>
                <p className="text-sm text-muted-foreground mt-2">Gerencie contratos com pagamentos parcelados</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Contrato
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatórios de Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <FileText className="h-8 w-8 mb-2" />
                  Relatório de Contas a Pagar
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Calendar className="h-8 w-8 mb-2" />
                  Relatório por Vencimento
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <DollarSign className="h-8 w-8 mb-2" />
                  Análise de Pagamentos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Pagamentos Recorrentes */}
      <PagamentosRecorrentesModal 
        isOpen={showRecorrentesModal} 
        onClose={() => setShowRecorrentesModal(false)} 
      />
    </div>
  );
};

export default APagarPagosView;