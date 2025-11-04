import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, DollarSign, FileCheck, TrendingUp } from 'lucide-react';

const IndicadoresFaturamento = () => {
  // Mock data - em produção virá de API/state
  const indicadores = {
    notasPendentes: 5, // 3 NF-e, 2 NFS-e
    rejeicoesFiscais: 2, // 1 NF-e, 1 NFS-e
    totalNFE: 245800.00,
    totalNFS: 82300.00,
    totalFaturado: 328100.00
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {/* Notas Pendentes */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium mb-1">Notas pendentes</p>
              <p className="text-2xl font-bold text-foreground">{indicadores.notasPendentes}</p>
              <p className="text-xs text-muted-foreground mt-1">Aguardando autorização</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      {/* Rejeições Fiscais */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium mb-1">Rejeições fiscais</p>
              <p className="text-2xl font-bold text-foreground">{indicadores.rejeicoesFiscais}</p>
              <p className="text-xs text-muted-foreground mt-1">Últimas 24h</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>

      {/* Total NFE */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium mb-1">Total NFE (mês)</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(indicadores.totalNFE)}</p>
              <p className="text-xs text-muted-foreground mt-1">Produtos autorizados</p>
            </div>
            <FileCheck className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Total NFS */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium mb-1">Total NFS (mês)</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(indicadores.totalNFS)}</p>
              <p className="text-xs text-muted-foreground mt-1">Serviços autorizados</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      {/* Total Faturado */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium mb-1">Total faturado (mês)</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(indicadores.totalFaturado)}</p>
              <p className="text-xs text-muted-foreground mt-1">Produtos + Serviços</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndicadoresFaturamento;
