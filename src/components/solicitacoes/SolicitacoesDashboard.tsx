
import { useState } from 'react';
import { Plus, Search, Filter, Calendar, User, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CriarSolicitacaoForm from './CriarSolicitacaoForm';
import MinhasSolicitacoes from './MinhasSolicitacoes';
import { solicitacoesMock } from '@/data/solicitacoes';
import { useUser } from '@/contexts/UserContext';

const SolicitacoesDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('minhas-solicitacoes');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) return null;

  // Estatísticas das solicitações do usuário
  const minhasSolicitacoes = solicitacoesMock.filter(s => s.id_usuario_solicitante === user.id);
  const stats = {
    total: minhasSolicitacoes.length,
    abertas: minhasSolicitacoes.filter(s => s.status === 'aberta').length,
    emAndamento: minhasSolicitacoes.filter(s => s.status === 'em-andamento').length,
    concluidas: minhasSolicitacoes.filter(s => s.status === 'concluida').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-biodina-blue">Central de Solicitações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas solicitações para todos os setores da empresa
          </p>
        </div>
        <Button 
          onClick={() => setActiveTab('nova-solicitacao')}
          className="bg-biodina-gold hover:bg-biodina-gold/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Solicitação
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-biodina-blue">{stats.total}</div>
            <p className="text-xs text-gray-500">Solicitações criadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertas</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.abertas}</div>
            <p className="text-xs text-gray-500">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <User className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</div>
            <p className="text-xs text-gray-500">Sendo processadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.concluidas}</div>
            <p className="text-xs text-gray-500">Finalizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="minhas-solicitacoes">Minhas Solicitações</TabsTrigger>
              <TabsTrigger value="nova-solicitacao">Nova Solicitação</TabsTrigger>
            </TabsList>

            <TabsContent value="minhas-solicitacoes" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar solicitações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <MinhasSolicitacoes searchTerm={searchTerm} />
              </div>
            </TabsContent>

            <TabsContent value="nova-solicitacao" className="mt-6">
              <CriarSolicitacaoForm onSuccess={() => setActiveTab('minhas-solicitacoes')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitacoesDashboard;
