
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const ComercialDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-biodina-blue mb-2">Dashboard Comercial</h1>
        <p className="text-gray-600">Visão geral das atividades comerciais</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 750.000</div>
            <p className="text-xs text-muted-foreground">+15% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+3% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projetos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Importação Equipamentos Médicos</p>
                  <p className="text-sm text-gray-500">Hospital São José</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Em Andamento</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Importação Materiais Cirúrgicos</p>
                  <p className="text-sm text-gray-500">Clínica Vista Bella</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Finalizado</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Importação Dispositivos Diagnóstico</p>
                  <p className="text-sm text-gray-500">Laboratório Central</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Planejamento</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="font-medium">Nova proposta enviada</p>
                <p className="text-gray-500">para Hospital São José - há 2 horas</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Projeto finalizado</p>
                <p className="text-gray-500">Importação Materiais Cirúrgicos - há 1 dia</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Reunião agendada</p>
                <p className="text-gray-500">com Laboratório Central - amanhã às 14h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComercialDashboard;
