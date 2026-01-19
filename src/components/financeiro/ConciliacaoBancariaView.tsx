import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, Download, CheckCircle, AlertCircle, RefreshCw, 
  Calendar, Building, CreditCard, ArrowRightLeft, Filter
} from "lucide-react";
import { parseOFXFile, generateMockExtrato, MovimentacaoBancaria, StatusConciliacao } from "./utils/ofxUtils";
import { ConciliacaoMatch } from "./components/ConciliacaoMatch";
import { ExtratoBancarioCard } from "./components/ExtratoBancarioCard";
import { ContaPagar, TipoRequisicaoSimples, StatusConta, FormaPagamento } from "@/types/financeiro";
import { useToast } from "@/hooks/use-toast";

const ConciliacaoBancariaView = () => {
  const { toast } = useToast();
  
  // Estados principais
  const [movimentacoesBancarias, setMovimentacoesBancarias] = useState<MovimentacaoBancaria[]>([]);
  const [contasPagar] = useState<ContaPagar[]>([
    {
      id: 'CP-001',
      empresaId: 'biodina-001',
      numero: 'CP-001',
      tipo: TipoRequisicaoSimples.COMPRA,
      departamentoSolicitante: 'Administrativo',
      vincularA: 'departamento',
      departamento: 'Administrativo',
      fornecedor: 'Fornecedor ABC Ltda',
      descricao: 'Material de escritório - Janeiro',
      valor: 2500,
      dataVencimento: new Date('2025-09-25'),
      formaPagamentoSugerida: FormaPagamento.PIX,
      status: StatusConta.PENDENTE,
      createdAt: new Date()
    },
    {
      id: 'CP-002',
      empresaId: 'biodina-001',
      numero: 'CP-002',
      tipo: TipoRequisicaoSimples.OUTROS,
      departamentoSolicitante: 'Administrativo',
      vincularA: 'departamento',
      departamento: 'Administrativo',
      fornecedor: 'Energy Corp',
      descricao: 'Conta de energia elétrica',
      valor: 4800,
      dataVencimento: new Date('2025-09-15'),
      formaPagamentoSugerida: FormaPagamento.BOLETO,
      status: StatusConta.VENCIDO,
      createdAt: new Date()
    },
    {
      id: 'CP-003',
      empresaId: 'biodina-001',
      numero: 'CP-003',
      tipo: TipoRequisicaoSimples.OUTROS,
      departamentoSolicitante: 'TI',
      vincularA: 'departamento',
      departamento: 'TI',
      fornecedor: 'Telecom Solutions',
      descricao: 'Internet e telefonia corporativa',
      valor: 1200,
      dataVencimento: new Date('2025-09-30'),
      formaPagamentoSugerida: FormaPagamento.DEBITO_AUTOMATICO,
      status: StatusConta.PROGRAMADO,
      createdAt: new Date()
    }
  ]);
  
  // Filtros
  const [filtroStatus, setFiltroStatus] = useState<StatusConciliacao | 'todos'>('todos');
  const [filtroPeriodo, setFiltroPeriodo] = useState('mes_atual');
  const [filtroContaBancaria, setFiltroContaBancaria] = useState('todas');
  
  // Estados de UI
  const [isUploading, setIsUploading] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  // Carregar extrato mock ao montar o componente
  useState(() => {
    const extratoMock = generateMockExtrato();
    setMovimentacoesBancarias(extratoMock);
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simular processamento do arquivo OFX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const dadosOFX = parseOFXFile(file);
      setMovimentacoesBancarias(dadosOFX);
      
      toast({
        title: "Extrato importado com sucesso",
        description: `${dadosOFX.length} movimentações encontradas`,
      });
    } catch (error) {
      toast({
        title: "Erro ao importar extrato",
        description: "Verifique se o arquivo está no formato OFX correto.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleConciliarMovimentacao = (movimentacaoId: string, contaId?: string) => {
    setMovimentacoesBancarias(prev => 
      prev.map(mov => 
        mov.id === movimentacaoId 
          ? { ...mov, status: 'conciliado', contaVinculada: contaId }
          : mov
      )
    );

    toast({
      title: "Movimentação conciliada",
      description: contaId ? "Conta vinculada com sucesso" : "Marcada como conciliada",
    });
  };

  const handleDesconciliarMovimentacao = (movimentacaoId: string) => {
    setMovimentacoesBancarias(prev => 
      prev.map(mov => 
        mov.id === movimentacaoId 
          ? { ...mov, status: 'pendente', contaVinculada: undefined }
          : mov
      )
    );

    toast({
      title: "Movimentação desconciliada",
      description: "Vínculo removido com sucesso",
    });
  };

  const movimentacoesFiltradas = movimentacoesBancarias.filter(mov => {
    if (filtroStatus !== 'todos' && mov.status !== filtroStatus) return false;
    if (filtroContaBancaria !== 'todas' && mov.contaBancaria !== filtroContaBancaria) return false;
    return true;
  });

  const resumoConciliacao = {
    totalMovimentacoes: movimentacoesBancarias.length,
    conciliadas: movimentacoesBancarias.filter(m => m.status === 'conciliado').length,
    sugestoes: movimentacoesBancarias.filter(m => m.status === 'sugestao').length,
    pendentes: movimentacoesBancarias.filter(m => m.status === 'pendente').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Conciliação Bancária</h2>
          <p className="text-muted-foreground">Concilie movimentações bancárias com contas a pagar</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowMatches(!showMatches)}>
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            {showMatches ? 'Ocultar Matches' : 'Sugerir Matches'}
          </Button>
          <label htmlFor="ofx-upload">
            <Button variant="outline" disabled={isUploading} asChild>
              <span>
                {isUploading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {isUploading ? 'Processando...' : 'Importar OFX'}
              </span>
            </Button>
          </label>
          <input
            id="ofx-upload"
            type="file"
            accept=".ofx,.qfx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Resumo da Conciliação */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Movimentações</p>
                <p className="text-2xl font-bold">{resumoConciliacao.totalMovimentacoes}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conciliadas</p>
                <p className="text-2xl font-bold text-green-600">{resumoConciliacao.conciliadas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sugestões</p>
                <p className="text-2xl font-bold text-amber-600">{resumoConciliacao.sugestoes}</p>
              </div>
              <ArrowRightLeft className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{resumoConciliacao.pendentes}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as any)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="sugestao">Sugestões</SelectItem>
                  <SelectItem value="conciliado">Conciliadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes_atual">Mês Atual</SelectItem>
                  <SelectItem value="mes_anterior">Mês Anterior</SelectItem>
                  <SelectItem value="ultimos_30">Últimos 30 dias</SelectItem>
                  <SelectItem value="personalizado">Período Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Conta Bancária</label>
              <Select value={filtroContaBancaria} onValueChange={setFiltroContaBancaria}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Contas</SelectItem>
                  <SelectItem value="001-12345">Banco do Brasil - 001-12345</SelectItem>
                  <SelectItem value="033-67890">Santander - 033-67890</SelectItem>
                  <SelectItem value="341-54321">Itaú - 341-54321</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Match Automático */}
      {showMatches && (
        <ConciliacaoMatch 
          movimentacoes={movimentacoesBancarias}
          contasPagar={contasPagar}
          onConciliar={handleConciliarMovimentacao}
        />
      )}

      {/* Lista de Movimentações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Movimentações Bancárias
            </span>
            <Badge variant="outline">{movimentacoesFiltradas.length} movimentações</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {movimentacoesFiltradas.map((movimentacao) => (
              <ExtratoBancarioCard
                key={movimentacao.id}
                movimentacao={movimentacao}
                contasPagar={contasPagar}
                onConciliar={handleConciliarMovimentacao}
                onDesconciliar={handleDesconciliarMovimentacao}
              />
            ))}
            
            {movimentacoesFiltradas.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma movimentação encontrada com os filtros aplicados</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConciliacaoBancariaView;