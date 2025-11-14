import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { pesquisaSatisfacaoMockada } from '@/data/qualidadeData';
import { format } from 'date-fns';

export const PesquisaSatisfacaoTab = () => {
  const [dados, setDados] = useState(pesquisaSatisfacaoMockada);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard de Satisfação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {dados.percentualSatisfacao}%
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Satisfação Geral</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Label>Percentual Limite para Não Conformidade (%)</Label>
              <Input
                type="number"
                value={dados.percentualLimite}
                onChange={(e) => setDados({ ...dados, percentualLimite: Number(e.target.value) })}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Alertas serão gerados quando a insatisfação ultrapassar este limite
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              Última atualização: {format(dados.ultimaAtualizacao, 'dd/MM/yyyy')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Alertas de Insatisfação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dados.alertas.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-4 rounded-lg border ${
                    alerta.percentual >= dados.percentualLimite
                      ? 'border-destructive bg-destructive/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium">{alerta.categoria}</div>
                    <Badge
                      variant={alerta.percentual >= dados.percentualLimite ? 'destructive' : 'secondary'}
                    >
                      {alerta.percentual}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alerta.descricao}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo de Satisfação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Total de Insatisfação</div>
              <div className="text-2xl font-bold">
                {dados.alertas.reduce((acc, alerta) => acc + alerta.percentual, 0)}%
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Alertas em Vermelho</div>
              <div className="text-2xl font-bold text-destructive">
                {dados.alertas.filter(a => a.percentual >= dados.percentualLimite).length}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Categorias Monitoradas</div>
              <div className="text-2xl font-bold">
                {dados.alertas.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
