import React from 'react';
import { Bell, Building2, FileText, RefreshCw, Check, CheckCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotificacoesAprovacao, NotificacaoAprovacao } from '@/hooks/useNotificacoesAprovacao';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NotificacoesAprovacaoPopoverProps {
  onNavigateToLicitacao?: (id: number) => void;
  onNavigateToContrato?: (id: string) => void;
}

export default function NotificacoesAprovacaoPopover({
  onNavigateToLicitacao,
  onNavigateToContrato
}: NotificacoesAprovacaoPopoverProps) {
  const {
    notificacoes,
    notificacoesNaoLidas,
    marcarComoLida,
    marcarTodasComoLidas,
    isLoading
  } = useNotificacoesAprovacao();

  const getIconByTipo = (tipo: NotificacaoAprovacao['tipo']) => {
    switch (tipo) {
      case 'aprovacao_empresa':
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'alteracao_cnpj':
        return <RefreshCw className="h-4 w-4 text-orange-500" />;
      case 'aditivo':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getUrgenciaColor = (urgencia: NotificacaoAprovacao['urgencia']) => {
    switch (urgencia) {
      case 'alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleNotificacaoClick = (notificacao: NotificacaoAprovacao) => {
    marcarComoLida(notificacao.id);
    
    if (notificacao.licitacaoId && onNavigateToLicitacao) {
      onNavigateToLicitacao(notificacao.licitacaoId);
    } else if (notificacao.contratoId && onNavigateToContrato) {
      onNavigateToContrato(notificacao.contratoId);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ptBR
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificacoesNaoLidas > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
            >
              {notificacoesNaoLidas > 9 ? '9+' : notificacoesNaoLidas}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">Aprovações Pendentes</h4>
            {notificacoesNaoLidas > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={marcarTodasComoLidas}
                className="text-xs"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {notificacoesNaoLidas > 0 
              ? `${notificacoesNaoLidas} notificação(ões) não lida(s)` 
              : 'Todas as notificações foram lidas'}
          </p>
        </div>
        
        <ScrollArea className="max-h-96">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Carregando notificações...
            </div>
          ) : notificacoes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Nenhuma notificação pendente</p>
            </div>
          ) : (
            <div className="divide-y">
              {notificacoes.map((notificacao) => (
                <div 
                  key={notificacao.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    !notificacao.lida ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => handleNotificacaoClick(notificacao)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIconByTipo(notificacao.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-medium ${!notificacao.lida ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notificacao.titulo}
                        </p>
                        {!notificacao.lida && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notificacao.descricao}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-xs ${getUrgenciaColor(notificacao.urgencia)}`}>
                          {notificacao.urgencia === 'alta' ? 'Urgente' : 
                           notificacao.urgencia === 'media' ? 'Média' : 'Normal'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notificacao.solicitadoEm)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Solicitado por: {notificacao.solicitadoPor}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3 ml-7">
                    <Button size="sm" variant="default" className="h-7 text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Aprovar
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notificacoes.length > 0 && (
          <>
            <Separator />
            <div className="p-3">
              <Button variant="ghost" className="w-full text-sm" size="sm">
                Ver todas as aprovações
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
