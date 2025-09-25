import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowDown, ArrowUp, CheckCircle, X, Link, Unlink,
  Calendar, Building, FileText, CreditCard
} from "lucide-react";
import { 
  MovimentacaoBancaria, 
  formatCurrency, 
  formatDate, 
  getStatusColor 
} from "../utils/ofxUtils";
import { ContaPagar } from "@/types/financeiro";

interface ExtratoBancarioCardProps {
  movimentacao: MovimentacaoBancaria;
  contasPagar: ContaPagar[];
  onConciliar: (movimentacaoId: string, contaId?: string) => void;
  onDesconciliar: (movimentacaoId: string) => void;
}

export const ExtratoBancarioCard = ({ 
  movimentacao, 
  contasPagar, 
  onConciliar, 
  onDesconciliar 
}: ExtratoBancarioCardProps) => {
  const [showVincularConta, setShowVincularConta] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState<string>("");

  const handleVincularConta = () => {
    if (contaSelecionada) {
      onConciliar(movimentacao.id, contaSelecionada);
      setShowVincularConta(false);
      setContaSelecionada("");
    } else {
      onConciliar(movimentacao.id);
    }
  };

  const handleDesconciliar = () => {
    onDesconciliar(movimentacao.id);
  };

  const contaVinculada = contasPagar.find(c => c.id === movimentacao.contaVinculada);
  const contasCompateis = contasPagar.filter(c => 
    Math.abs(c.valor - movimentacao.valor) <= c.valor * 0.1 && // 10% de tolerância
    movimentacao.tipo === 'debito' // Só débitos podem ser vinculados a contas a pagar
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            {/* Header da movimentação */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  movimentacao.tipo === 'credito' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {movimentacao.tipo === 'credito' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {formatCurrency(movimentacao.valor)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(movimentacao.data)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(movimentacao.status)}>
                  {movimentacao.status === 'conciliado' && '✓ Conciliado'}
                  {movimentacao.status === 'sugestao' && '⚡ Sugestão'}
                  {movimentacao.status === 'pendente' && '⏳ Pendente'}
                </Badge>
                
                {movimentacao.scoreMatch && (
                  <Badge variant="outline" className="text-purple-600">
                    {movimentacao.scoreMatch}% match
                  </Badge>
                )}
              </div>
            </div>

            {/* Descrição e detalhes */}
            <div className="space-y-2">
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {movimentacao.descricao}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3" />
                  <span>Conta: {movimentacao.contaBancaria}</span>
                </div>
                {movimentacao.documento && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    <span>Doc: {movimentacao.documento.slice(0, 15)}...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Conta vinculada */}
            {movimentacao.status === 'conciliado' && contaVinculada && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-800">
                    <Link className="h-4 w-4" />
                    <span className="font-medium">Vinculado à:</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDesconciliar}
                    className="text-green-700 hover:text-green-800"
                  >
                    <Unlink className="h-3 w-3 mr-1" />
                    Desvincular
                  </Button>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  <div className="font-medium">{contaVinculada.fornecedor}</div>
                  <div>{contaVinculada.numero} - {contaVinculada.descricao}</div>
                  <div>Valor: {formatCurrency(contaVinculada.valor)}</div>
                </div>
              </div>
            )}

            {/* Interface de vinculação */}
            {showVincularConta && movimentacao.tipo === 'debito' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-3">
                <div className="flex items-center gap-2 text-blue-800 font-medium">
                  <Link className="h-4 w-4" />
                  Vincular à Conta a Pagar
                </div>
                
                {contasCompateis.length > 0 ? (
                  <div className="space-y-3">
                    <Select value={contaSelecionada} onValueChange={setContaSelecionada}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma conta..." />
                      </SelectTrigger>
                      <SelectContent>
                        {contasCompateis.map((conta) => (
                          <SelectItem key={conta.id} value={conta.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{conta.fornecedor}</span>
                              <span className="text-xs text-muted-foreground">
                                {conta.numero} - {formatCurrency(conta.valor)}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleVincularConta}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Vincular
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowVincularConta(false)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-blue-700">
                    <p>Nenhuma conta compatível encontrada.</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" onClick={handleVincularConta}>
                        Marcar como Conciliado
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowVincularConta(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="ml-4 flex flex-col gap-2">
            {movimentacao.status === 'pendente' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVincularConta(true)}
                disabled={showVincularConta}
              >
                <Link className="h-3 w-3 mr-1" />
                Conciliar
              </Button>
            )}
            
            {movimentacao.status === 'sugestao' && (
              <div className="space-y-1">
                <Button
                  size="sm"
                  onClick={() => onConciliar(movimentacao.id, movimentacao.contaVinculada)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Aceitar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConciliar(movimentacao.id)}
                >
                  <X className="h-3 w-3 mr-1" />
                  Ignorar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};