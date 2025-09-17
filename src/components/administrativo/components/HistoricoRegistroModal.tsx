import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Edit3, Clock } from 'lucide-react';

interface HistoricoRegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
  registro: any;
}

export const HistoricoRegistroModal = ({ 
  isOpen, 
  onClose, 
  registro 
}: HistoricoRegistroModalProps) => {
  if (!registro) return null;

  // Dados fictícios do histórico de edições
  const historicoEditacoes = [
    {
      id: 1,
      data: "2024-03-15 14:30:25",
      usuario: "Carlos Oliveira",
      acao: "Criação do registro",
      descricao: "Registro criado inicialmente",
      campos: []
    },
    {
      id: 2,
      data: "2024-03-16 09:15:42",
      usuario: "Ana Costa",
      acao: "Atualização de status",
      descricao: "Status alterado para 'Em Preparação'",
      campos: [
        { campo: "Status", valorAnterior: "Rascunho", valorNovo: "Em Preparação" }
      ]
    },
    {
      id: 3,
      data: "2024-03-18 16:45:18",
      usuario: "Carlos Oliveira",
      acao: "Anexo de documentação",
      descricao: "Adicionados arquivos de documentação técnica",
      campos: [
        { campo: "Arquivos", valorAnterior: "0 arquivos", valorNovo: "3 arquivos" }
      ]
    },
    {
      id: 4,
      data: "2024-03-20 11:22:35",
      usuario: "Maria Santos",
      acao: "Envio para ANVISA",
      descricao: "Registro enviado para análise da ANVISA",
      campos: [
        { campo: "Status", valorAnterior: "Em Preparação", valorNovo: "Enviado" },
        { campo: "Data de Envio", valorAnterior: "-", valorNovo: "20/03/2024" },
        { campo: "Número do Processo", valorAnterior: "-", valorNovo: registro.processo }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'publicado': return 'bg-purple-100 text-purple-800';
      case 'em_preparacao': return 'bg-yellow-100 text-yellow-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aprovado': return 'Aprovado';
      case 'enviado': return 'Enviado';
      case 'publicado': return 'Publicado';
      case 'em_preparacao': return 'Em Preparação';
      case 'rejeitado': return 'Rejeitado';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Histórico de Edições - {registro.nomeProduto}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações básicas do registro */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Produto:</span>
                <p className="text-gray-900">{registro.nomeProduto}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Processo ANVISA:</span>
                <p className="text-gray-900">{registro.processo || 'Não definido'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status Atual:</span>
                <Badge className={`mt-1 ${getStatusColor(registro.status)}`}>
                  {getStatusLabel(registro.status)}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-gray-700">Fabricante:</span>
                <p className="text-gray-900">{registro.fabricante}</p>
              </div>
            </div>
          </div>

          {/* Timeline de alterações */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline de Alterações
            </h3>
            
            <div className="space-y-4">
              {historicoEditacoes.map((entrada, index) => (
                <div key={entrada.id} className="relative">
                  {/* Linha vertical conectora */}
                  {index < historicoEditacoes.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-300"></div>
                  )}
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{entrada.acao}</h4>
                          <p className="text-sm text-gray-600">{entrada.descricao}</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {entrada.data}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <User className="h-3 w-3" />
                            {entrada.usuario}
                          </div>
                        </div>
                      </div>
                      
                      {/* Alterações de campos */}
                      {entrada.campos.length > 0 && (
                        <>
                          <Separator className="my-3" />
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-700">Campos alterados:</h5>
                            {entrada.campos.map((campo, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <span className="font-medium text-gray-600">{campo.campo}:</span>
                                <span className="text-red-600 line-through">{campo.valorAnterior}</span>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-600 font-medium">{campo.valorNovo}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};