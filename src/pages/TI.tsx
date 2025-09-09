import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TISidebar from '@/components/ti/TISidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Shield, HardDrive } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import AbrirChamadoForm from '@/components/ti/chamados/AbrirChamadoForm';
import PainelChamados from '@/components/ti/chamados/PainelChamados';
import MapeamentoRede from '@/components/ti/rede/MapeamentoRede';
import BibliotecaPoliticas from '@/components/ti/politicas/BibliotecaPoliticas';
import PainelSeguranca from '@/components/ti/seguranca/PainelSeguranca';
import GestaoConformidade from '@/components/ti/conformidade/GestaoConformidade';

// Mock data for demonstration
const chamadosData = {
  criticos: 3,
  altos: 8,
  medios: 15
};

const inventarioData = [
  { name: 'Em Uso', value: 68, color: 'hsl(var(--primary))' },
  { name: 'Manutenção', value: 12, color: 'hsl(var(--destructive))' },
  { name: 'Reserva', value: 15, color: 'hsl(var(--secondary))' },
  { name: 'Descartado', value: 5, color: 'hsl(var(--muted))' }
];

const alertasSeguranca = [
  { id: 1, tipo: 'Acesso Suspeito', descricao: 'Login fora do horário - João Silva', tempo: '2 min atrás' },
  { id: 2, tipo: 'Firewall', descricao: 'Tentativa de acesso bloqueada', tempo: '15 min atrás' },
  { id: 3, tipo: 'Malware', descricao: 'Arquivo suspeito detectado na estação 45', tempo: '1h atrás' },
  { id: 4, tipo: 'Backup', descricao: 'Falha no backup automático do servidor', tempo: '2h atrás' }
];

const ativosVencimento = [
  { id: 1, equipamento: 'Notebook Dell Vostro 15', responsavel: 'Maria Santos', dataVencimento: '2024-12-15', diasRestantes: 28 },
  { id: 2, equipamento: 'Impressora HP LaserJet Pro', responsavel: 'Departamento Comercial', dataVencimento: '2024-12-20', diasRestantes: 33 },
  { id: 3, equipamento: 'Servidor Dell PowerEdge R740', responsavel: 'TI - Infraestrutura', dataVencimento: '2025-01-10', diasRestantes: 54 },
  { id: 4, equipamento: 'Switch Cisco 24 portas', responsavel: 'TI - Rede', dataVencimento: '2025-01-25', diasRestantes: 69 }
];

// Dashboard Component
const TIDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard de Operações de TI</h1>
      </div>

      {/* Cards de Chamados Ativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chamados Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{chamadosData.criticos}</div>
            <p className="text-xs text-muted-foreground">Requer atenção imediata</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chamados Altos</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{chamadosData.altos}</div>
            <p className="text-xs text-muted-foreground">Alta prioridade</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chamados Médios</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{chamadosData.medios}</div>
            <p className="text-xs text-muted-foreground">Prioridade normal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Status do Inventário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Status do Inventário
            </CardTitle>
            <CardDescription>Distribuição atual dos ativos de TI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventarioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {inventarioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alertas de Segurança Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Alertas de Segurança Recentes
            </CardTitle>
            <CardDescription>Últimos eventos de segurança detectados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasSeguranca.map((alerta) => (
                <div key={alerta.id} className="flex items-start justify-between p-3 rounded-lg border bg-card">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {alerta.tipo}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alerta.tempo}</span>
                    </div>
                    <p className="text-sm text-foreground">{alerta.descricao}</p>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ativos Próximos ao Fim da Vida Útil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Ativos Próximos ao Fim da Vida Útil
          </CardTitle>
          <CardDescription>Equipamentos com garantia próxima do vencimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ativosVencimento.map((ativo) => (
              <div key={ativo.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{ativo.equipamento}</p>
                  <p className="text-xs text-muted-foreground">Responsável: {ativo.responsavel}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={ativo.diasRestantes <= 30 ? "destructive" : ativo.diasRestantes <= 60 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {ativo.diasRestantes} dias
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Vence em {ativo.dataVencimento}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TI: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <TISidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<TIDashboard />} />
          <Route path="chamados/abrir" element={<AbrirChamadoForm />} />
          <Route path="chamados" element={<PainelChamados />} />
          <Route path="inventario" element={<div className="p-6"><h1 className="text-2xl font-bold">Inventário de Ativos</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
          <Route path="rede" element={<MapeamentoRede />} />
          <Route path="politicas" element={<BibliotecaPoliticas />} />
          <Route path="seguranca" element={<PainelSeguranca />} />
          <Route path="conformidade" element={<GestaoConformidade />} />
          <Route path="usuarios" element={<div className="p-6"><h1 className="text-2xl font-bold">Gestão de Usuários</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
          <Route path="configuracoes" element={<div className="p-6"><h1 className="text-2xl font-bold">Configurações</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
          <Route path="backup" element={<div className="p-6"><h1 className="text-2xl font-bold">Backup e Recuperação</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default TI;