import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import { PIHistoryItem } from '@/types/piHistory';

interface PIHistorySectionProps {
  piHistory: PIHistoryItem[];
  onPIStatusChange: (historyId: string, newStatus: 'aceito' | 'rejeitado', observacoes?: string) => void;
}

const PIHistorySection = ({ piHistory, onPIStatusChange }: PIHistorySectionProps) => {
  if (piHistory.length === 0) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enviado':
        return <Send className="h-4 w-4" />;
      case 'em_analise':
        return <Clock className="h-4 w-4" />;
      case 'aceito':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejeitado':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enviado':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Enviado</Badge>;
      case 'em_analise':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Em Análise</Badge>;
      case 'aceito':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Aceito</Badge>;
      case 'rejeitado':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const ultimoEnvio = piHistory[piHistory.length - 1];
  const podeInteragir = ultimoEnvio && (ultimoEnvio.status === 'enviado' || ultimoEnvio.status === 'em_analise');

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="h-5 w-5" />
          <span>Histórico de Envios de PI</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {piHistory.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium">Envio #{index + 1}</span>
                  {getStatusBadge(item.status)}
                </div>
                <span className="text-sm text-gray-500">
                  {item.dataEnvio.toLocaleDateString()} às {item.dataEnvio.toLocaleTimeString()}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                <strong>CNPJ:</strong> {item.cnpjSelecionado}
              </div>
              
              {item.observacoes && (
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Observações:</strong> {item.observacoes}
                </div>
              )}
              
              {podeInteragir && item.id === ultimoEnvio.id && (
                <div className="flex space-x-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => onPIStatusChange(item.id, 'aceito')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    PI Aceito
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPIStatusChange(item.id, 'rejeitado')}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    PI Rejeitado
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PIHistorySection;