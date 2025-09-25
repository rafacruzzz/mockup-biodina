import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Search, Calendar, FileText, Clock, DollarSign,
  AlertTriangle, CheckCircle
} from "lucide-react";
import CalendarioVencimentos from "./CalendarioVencimentos";
import PagamentosRecorrentesModal from "./PagamentosRecorrentesModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProgramacaoFinanceiraView = () => {
  const [showRecorrentesModal, setShowRecorrentesModal] = useState(false);

  const resumoGeral = {
    totalPendente: 425000.00,
    totalVencido: 85000.00,
    totalMes: 125000.00,
    proximosVencimentos: 12
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Programação Financeira</h1>
          <p className="text-muted-foreground">Controle geral de pagamentos e fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowRecorrentesModal(true)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Pagamentos Recorrentes
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Requisição
          </Button>
        </div>
      </div>

      {/* Resumo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pendente</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(resumoGeral.totalPendente)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vencido</p>
                <p className="text-2xl font-bold text-destructive">
                  {formatCurrency(resumoGeral.totalVencido)}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total do Mês</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(resumoGeral.totalMes)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próximos Vencimentos</p>
                <p className="text-2xl font-bold text-foreground">
                  {resumoGeral.proximosVencimentos}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <Tabs defaultValue="requisicoes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requisicoes">Requisições</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
        </TabsList>

        <TabsContent value="requisicoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Requisições de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Pesquisar por número, descrição ou solicitante..." 
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
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Requisição
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
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">REQ-001</TableCell>
                    <TableCell>Fornecedor ABC</TableCell>
                    <TableCell>Material de escritório</TableCell>
                    <TableCell>R$ 2.500,00</TableCell>
                    <TableCell>25/01/2025</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pendente</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Ver</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REQ-002</TableCell>
                    <TableCell>Energy Corp</TableCell>
                    <TableCell>Conta de energia</TableCell>
                    <TableCell>R$ 4.800,00</TableCell>
                    <TableCell>15/01/2025</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Vencido</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Ver</Button>
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

        <TabsContent value="fluxo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fluxo de Caixa Projetado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Gráfico de fluxo de caixa será implementado aqui</p>
                <p className="text-sm">Projeção de entradas e saídas para os próximos 90 dias</p>
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

export default ProgramacaoFinanceiraView;