import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRightLeft, CheckCircle, X, Sparkles, AlertTriangle, 
  TrendingUp, Calendar, DollarSign 
} from "lucide-react";
import { 
  MovimentacaoBancaria, 
  MatchSugerido, 
  sugerirMatches, 
  formatCurrency, 
  formatDate 
} from "../utils/ofxUtils";
import { ContaPagar } from "@/types/financeiro";

interface ConciliacaoMatchProps {
  movimentacoes: MovimentacaoBancaria[];
  contasPagar: ContaPagar[];
  onConciliar: (movimentacaoId: string, contaId?: string) => void;
}

export const ConciliacaoMatch = ({ 
  movimentacoes, 
  contasPagar, 
  onConciliar 
}: ConciliacaoMatchProps) => {
  const [matchesSugeridos, setMatchesSugeridos] = useState<MatchSugerido[]>([]);
  const [matchesRejeitados, setMatchesRejeitados] = useState<string[]>([]);

  useEffect(() => {
    const matches = sugerirMatches(movimentacoes, contasPagar);
    setMatchesSugeridos(matches.filter(m => !matchesRejeitados.includes(`${m.movimentacaoId}-${m.contaId}`)));
  }, [movimentacoes, contasPagar, matchesRejeitados]);

  const handleAceitarMatch = (match: MatchSugerido) => {
    onConciliar(match.movimentacaoId, match.contaId);
    setMatchesSugeridos(prev => prev.filter(m => 
      !(m.movimentacaoId === match.movimentacaoId && m.contaId === match.contaId)
    ));
  };

  const handleRejeitarMatch = (match: MatchSugerido) => {
    const rejectKey = `${match.movimentacaoId}-${match.contaId}`;
    setMatchesRejeitados(prev => [...prev, rejectKey]);
    setMatchesSugeridos(prev => prev.filter(m => 
      !(m.movimentacaoId === match.movimentacaoId && m.contaId === match.contaId)
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 75) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Sparkles className="h-4 w-4" />;
    if (score >= 75) return <TrendingUp className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  if (matchesSugeridos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Sugestões de Conciliação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma sugestão de conciliação encontrada</p>
            <p className="text-sm">Todas as movimentações compatíveis já foram conciliadas</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Sugestões de Conciliação
          </span>
          <Badge variant="outline" className="text-amber-600">
            {matchesSugeridos.length} sugestões
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matchesSugeridos.map((match) => {
            const movimentacao = movimentacoes.find(m => m.id === match.movimentacaoId);
            const conta = contasPagar.find(c => c.id === match.contaId);
            
            if (!movimentacao || !conta) return null;

            return (
              <div key={`${match.movimentacaoId}-${match.contaId}`} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`${getScoreColor(match.score)} flex items-center gap-1`}
                  >
                    {getScoreIcon(match.score)}
                    {match.score}% de compatibilidade
                  </Badge>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRejeitarMatch(match)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleAceitarMatch(match)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Conciliar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Movimentação Bancária */}
                  <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-blue-800 font-medium">
                      <ArrowRightLeft className="h-4 w-4" />
                      Movimentação Bancária
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-blue-600" />
                        <span>{formatDate(movimentacao.data)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{formatCurrency(movimentacao.valor)}</span>
                      </div>
                      <div className="text-blue-700">
                        {movimentacao.descricao}
                      </div>
                      <div className="text-blue-600 text-xs">
                        Conta: {movimentacao.contaBancaria}
                      </div>
                    </div>
                  </div>

                  {/* Conta a Pagar */}
                  <div className="bg-orange-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-orange-800 font-medium">
                      <CheckCircle className="h-4 w-4" />
                      Conta a Pagar
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-orange-600" />
                        <span>{formatDate(conta.dataVencimento)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-orange-600" />
                        <span className="font-medium">{formatCurrency(conta.valor)}</span>
                      </div>
                      <div className="text-orange-700">
                        {conta.fornecedor}
                      </div>
                      <div className="text-orange-600 text-xs">
                        {conta.numero} - {conta.descricao}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Motivos do Match */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Motivos da sugestão:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.motivos.map((motivo, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {motivo}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};