import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText, 
  Package, 
  RefreshCcw, 
  GraduationCap,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  FileUp
} from 'lucide-react';
import { 
  RegistroHistoricoRT, 
  ModuloRTHistorico, 
  TipoAcaoRTHistorico,
  moduloLabels,
  acaoLabels
} from '@/types/rtHistorico';
import { mockHistoricoRT } from '@/data/rtHistoricoMock';

export const HistoricoIntegracaoRT = () => {
  const [busca, setBusca] = useState('');
  const [filtroModulo, setFiltroModulo] = useState<string>('todos');
  const [filtroAcao, setFiltroAcao] = useState<string>('todos');
  const [registros] = useState<RegistroHistoricoRT[]>(mockHistoricoRT);

  const getIconeModulo = (modulo: ModuloRTHistorico) => {
    switch (modulo) {
      case 'lista_mestra':
        return <FileText className="h-4 w-4" />;
      case 'documentacao_pop':
      case 'documentacao_especificacoes':
      case 'documentacao_legislacoes':
        return <FileUp className="h-4 w-4" />;
      case 'liberacao_produtos':
        return <Package className="h-4 w-4" />;
      case 'controle_mudancas':
        return <RefreshCcw className="h-4 w-4" />;
      case 'treinamentos':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getIconeAcao = (acao: TipoAcaoRTHistorico) => {
    switch (acao) {
      case 'criacao':
        return <Plus className="h-3 w-3" />;
      case 'edicao':
        return <Edit3 className="h-3 w-3" />;
      case 'exclusao':
        return <Trash2 className="h-3 w-3" />;
      case 'upload':
        return <Upload className="h-3 w-3" />;
      case 'download':
        return <Download className="h-3 w-3" />;
      case 'aprovacao':
      case 'liberacao':
        return <CheckCircle className="h-3 w-3" />;
      case 'revogacao':
        return <XCircle className="h-3 w-3" />;
      default:
        return <Edit3 className="h-3 w-3" />;
    }
  };

  const getCorAcao = (acao: TipoAcaoRTHistorico): string => {
    switch (acao) {
      case 'criacao':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'edicao':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exclusao':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'upload':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'download':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'aprovacao':
      case 'liberacao':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'revogacao':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCorModulo = (modulo: ModuloRTHistorico): string => {
    switch (modulo) {
      case 'lista_mestra':
        return 'bg-indigo-100 text-indigo-800';
      case 'documentacao_pop':
        return 'bg-cyan-100 text-cyan-800';
      case 'documentacao_especificacoes':
        return 'bg-teal-100 text-teal-800';
      case 'documentacao_legislacoes':
        return 'bg-sky-100 text-sky-800';
      case 'liberacao_produtos':
        return 'bg-amber-100 text-amber-800';
      case 'controle_mudancas':
        return 'bg-rose-100 text-rose-800';
      case 'treinamentos':
        return 'bg-violet-100 text-violet-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const registrosFiltrados = useMemo(() => {
    return registros.filter(registro => {
      const matchBusca = busca === '' || 
        registro.recurso.toLowerCase().includes(busca.toLowerCase()) ||
        registro.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        registro.usuario.toLowerCase().includes(busca.toLowerCase());
      
      const matchModulo = filtroModulo === 'todos' || registro.modulo === filtroModulo;
      const matchAcao = filtroAcao === 'todos' || registro.acao === filtroAcao;
      
      return matchBusca && matchModulo && matchAcao;
    });
  }, [registros, busca, filtroModulo, filtroAcao]);

  const estatisticas = useMemo(() => {
    const porModulo: Record<string, number> = {};
    const porAcao: Record<string, number> = {};
    
    registros.forEach(r => {
      porModulo[r.modulo] = (porModulo[r.modulo] || 0) + 1;
      porAcao[r.acao] = (porAcao[r.acao] || 0) + 1;
    });
    
    return { porModulo, porAcao, total: registros.length };
  }, [registros]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Histórico de Alterações - Integração RT/Controle de Qualidade
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Estatísticas Resumidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{estatisticas.total}</p>
            <p className="text-sm text-muted-foreground">Total de Registros</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-700">{estatisticas.porAcao['criacao'] || 0}</p>
            <p className="text-sm text-green-600">Criações</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-700">{estatisticas.porAcao['edicao'] || 0}</p>
            <p className="text-sm text-blue-600">Edições</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-700">{estatisticas.porAcao['upload'] || 0}</p>
            <p className="text-sm text-purple-600">Uploads</p>
          </div>
        </div>

        <Separator />

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por recurso, descrição ou usuário..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filtroModulo} onValueChange={setFiltroModulo}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Módulos</SelectItem>
                {Object.entries(moduloLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroAcao} onValueChange={setFiltroAcao}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Ações</SelectItem>
                {Object.entries(acaoLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {registrosFiltrados.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum registro encontrado com os filtros aplicados.
            </div>
          ) : (
            registrosFiltrados.map((registro, index) => (
              <div key={registro.id} className="relative">
                {/* Linha conectora */}
                {index < registrosFiltrados.length - 1 && (
                  <div className="absolute left-4 top-10 w-0.5 h-full bg-border"></div>
                )}
                
                <div className="flex gap-4">
                  {/* Ícone do módulo */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getCorModulo(registro.modulo)}`}>
                    {getIconeModulo(registro.modulo)}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex-1 bg-card border rounded-lg p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant="outline" className={getCorModulo(registro.modulo)}>
                            {moduloLabels[registro.modulo]}
                          </Badge>
                          <Badge className={`${getCorAcao(registro.acao)} flex items-center gap-1`}>
                            {getIconeAcao(registro.acao)}
                            {acaoLabels[registro.acao]}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{registro.recurso}</h4>
                        <p className="text-sm text-muted-foreground">{registro.descricao}</p>
                      </div>
                      
                      <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-end">
                          <Calendar className="h-3 w-3" />
                          {registro.dataHora}
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <User className="h-3 w-3" />
                          {registro.usuario}
                        </div>
                      </div>
                    </div>
                    
                    {/* Valores alterados */}
                    {(registro.valorAnterior || registro.valorNovo) && (
                      <>
                        <Separator className="my-2" />
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          {registro.valorAnterior && (
                            <span className="text-red-600 line-through bg-red-50 px-2 py-0.5 rounded">
                              {registro.valorAnterior}
                            </span>
                          )}
                          {registro.valorAnterior && registro.valorNovo && (
                            <span className="text-muted-foreground">→</span>
                          )}
                          {registro.valorNovo && (
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                              {registro.valorNovo}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    
                    {registro.detalhes && (
                      <>
                        <Separator className="my-2" />
                        <p className="text-sm text-muted-foreground italic">
                          {registro.detalhes}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé informativo */}
        <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground flex items-center gap-2">
          <History className="h-4 w-4" />
          <span>
            Este histórico é imutável e registra todas as alterações realizadas na seção Integração RT/Controle de Qualidade.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
