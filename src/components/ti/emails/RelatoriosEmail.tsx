import { useState, useMemo } from "react";
import { BarChart3, PieChart, Download, Calendar, Users, Mail, HardDrive, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { tiModules } from "@/data/tiModules";
import type { ContaEmail } from "@/types/ti";
import { toast } from "@/hooks/use-toast";

const RelatoriosEmail = () => {
  const [periodo, setPeriodo] = useState<string>("30");
  const emails = tiModules.emails.subModules.contas.data as ContaEmail[];

  // Estatísticas gerais
  const stats = useMemo(() => {
    const total = emails.length;
    const ativas = emails.filter(email => email.status === "ativo").length;
    const bloqueadas = emails.filter(email => email.status === "bloqueado").length;
    const redirecionadas = emails.filter(email => email.status === "redirecionado").length;

    return { total, ativas, bloqueadas, redirecionadas };
  }, [emails]);

  // Estatísticas por departamento
  const departamentoStats = useMemo(() => {
    const departamentos = emails.reduce((acc, email) => {
      acc[email.departamento] = (acc[email.departamento] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(departamentos)
      .map(([dept, count]) => ({ departamento: dept, total: count }))
      .sort((a, b) => b.total - a.total);
  }, [emails]);

  // Mock de dados de uso
  const mockUsageData = [
    { email: "joao.silva@empresa.com.br", uso: 85, quota: 100, departamento: "TI" },
    { email: "maria.santos@empresa.com.br", uso: 72, quota: 100, departamento: "RH" },
    { email: "admin@empresa.com.br", uso: 95, quota: 100, departamento: "Administração" },
    { email: "suporte@empresa.com.br", uso: 68, quota: 100, departamento: "TI" },
    { email: "comercial@empresa.com.br", uso: 44, quota: 100, departamento: "Comercial" }
  ];

  const handleExportarRelatorio = () => {
    toast({
      title: "Relatório Exportado",
      description: "O relatório foi exportado com sucesso para Excel",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios de E-mail</h2>
          <p className="text-gray-600">Análise detalhada do uso e status das contas de e-mail</p>
        </div>
        <div className="flex gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportarRelatorio} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todas as contas cadastradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.ativas}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.ativas / stats.total) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bloqueadas</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.bloqueadas}</div>
            <p className="text-xs text-muted-foreground">
              Requer atenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redirecionadas</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.redirecionadas}</div>
            <p className="text-xs text-muted-foreground">
              Com redirecionamento ativo
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Departamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribuição por Departamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departamentoStats.map((dept) => (
              <div key={dept.departamento} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept.departamento}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{dept.total} contas</Badge>
                    <span className="text-xs text-muted-foreground">
                      {((dept.total / stats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Progress value={(dept.total / stats.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Uso de Quota */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Uso de Quota de E-mail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUsageData.map((item) => (
              <div key={item.email} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{item.email}</div>
                    <div className="text-xs text-muted-foreground">{item.departamento}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.uso}% usado</div>
                    <div className="text-xs text-muted-foreground">{item.uso}GB / {item.quota}GB</div>
                  </div>
                </div>
                <Progress 
                  value={item.uso} 
                  className={`h-2 ${item.uso > 90 ? 'text-red-600' : item.uso > 70 ? 'text-yellow-600' : 'text-green-600'}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Resumo de Atividades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo de Atividades (Últimos {periodo} dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Contas Criadas</h4>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <p className="text-xs text-muted-foreground">Novas contas no período</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Alterações</h4>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-xs text-muted-foreground">Configurações modificadas</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Resets de Senha</h4>
              <div className="text-2xl font-bold text-purple-600">7</div>
              <p className="text-xs text-muted-foreground">Senhas redefinidas</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-3">
            <h4 className="font-medium">Atividades Recentes</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Reset de senha - maria.santos@empresa.com.br</span>
                <Badge variant="outline">Hoje 14:30</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Nova conta criada - novo.funcionario@empresa.com.br</span>
                <Badge variant="outline">Ontem 09:15</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Redirecionamento ativado - admin@empresa.com.br</span>
                <Badge variant="outline">2 dias atrás</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosEmail;