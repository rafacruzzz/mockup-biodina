import { useState, useMemo } from "react";
import { BarChart3, Download, Users, Shield, TrendingUp, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { tiModules } from "@/data/tiModules";
import type { UsuarioRede } from "@/types/ti";
import { toast } from "@/hooks/use-toast";

const RelatoriosUsuarios = () => {
  const [periodo, setPeriodo] = useState<string>("30");
  const usuarios = tiModules.usuarios_rede.subModules.usuarios.data as UsuarioRede[];

  // Estatísticas gerais
  const stats = useMemo(() => {
    const total = usuarios.length;
    const ativos = usuarios.filter(user => user.status === "ativo").length;
    const inativos = usuarios.filter(user => user.status === "inativo").length;

    return { total, ativos, inativos };
  }, [usuarios]);

  // Grupos de permissão mais usados
  const gruposStats = useMemo(() => {
    const gruposCount: Record<string, number> = {};
    
    usuarios.forEach(user => {
      user.gruposPermissao.forEach(grupo => {
        gruposCount[grupo] = (gruposCount[grupo] || 0) + 1;
      });
    });

    return Object.entries(gruposCount)
      .map(([grupo, count]) => ({ grupo, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [usuarios]);

  // Estatísticas por departamento
  const departamentoStats = useMemo(() => {
    const departamentos = usuarios.reduce((acc, user) => {
      acc[user.departamento] = (acc[user.departamento] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(departamentos)
      .map(([dept, count]) => ({ departamento: dept, total: count }))
      .sort((a, b) => b.total - a.total);
  }, [usuarios]);

  // Mock de dados de atividades
  const mockActivities = [
    { usuario: "joao.silva", acao: "Reset de senha", departamento: "Comercial", timestamp: "Hoje 14:30" },
    { usuario: "novo.usuario", acao: "Usuário criado", departamento: "TI", timestamp: "Ontem 09:15" },
    { usuario: "maria.santos", acao: "Permissões atualizadas", departamento: "RH", timestamp: "2 dias atrás" },
    { usuario: "pedro.inativo", acao: "Usuário desativado", departamento: "Ex-Funcionário", timestamp: "3 dias atrás" }
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
          <h2 className="text-2xl font-bold text-gray-900">Relatórios de Usuários de Rede</h2>
          <p className="text-gray-600">Análise detalhada do uso e status dos usuários de rede</p>
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
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todos os usuários cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.ativos}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.ativos / stats.total) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Inativos</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.inativos}</div>
            <p className="text-xs text-muted-foreground">
              {stats.inativos > 0 ? "Requer atenção" : "Nenhum inativo"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupo Mais Usado</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">
              {gruposStats[0]?.grupo.replace(/_/g, ' ') || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {gruposStats[0]?.count || 0} usuários
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Departamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Distribuição por Departamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departamentoStats.map((dept) => (
              <div key={dept.departamento} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept.departamento}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{dept.total} usuários</Badge>
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

        {/* Distribuição por Grupos de Permissão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Grupos de Permissão Mais Usados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gruposStats.map((grupo) => (
              <div key={grupo.grupo} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{grupo.grupo.replace(/_/g, ' ')}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{grupo.count} usuários</Badge>
                  </div>
                </div>
                <Progress 
                  value={(grupo.count / stats.ativos) * 100} 
                  className="h-2"
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
            <Activity className="h-5 w-5" />
            Resumo de Atividades (Últimos {periodo} dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Usuários Criados</h4>
              <div className="text-2xl font-bold text-blue-600">2</div>
              <p className="text-xs text-muted-foreground">Novos usuários no período</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Alterações de Permissões</h4>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-xs text-muted-foreground">Permissões modificadas</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Resets de Senha</h4>
              <div className="text-2xl font-bold text-purple-600">5</div>
              <p className="text-xs text-muted-foreground">Senhas redefinidas</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-3">
            <h4 className="font-medium">Atividades Recentes</h4>
            <div className="space-y-2 text-sm">
              {mockActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <span className="font-medium">{activity.acao}</span> - {activity.usuario}
                    <Badge variant="outline" className="ml-2 text-xs">{activity.departamento}</Badge>
                  </div>
                  <Badge variant="outline">{activity.timestamp}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosUsuarios;
