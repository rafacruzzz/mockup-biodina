
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Upload, FileText, User, Clock } from "lucide-react";

interface ChatInternoProps {
  oportunidadeId: string;
}

const ChatInterno = ({ oportunidadeId }: ChatInternoProps) => {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      usuario: 'João Silva',
      departamento: 'Comercial',
      timestamp: '2024-03-20 10:30',
      texto: 'Cliente interessado em ampliar o contrato. Necessário análise financeira.',
      anexos: []
    },
    {
      id: 2,
      usuario: 'Maria Santos',
      departamento: 'Financeiro',
      timestamp: '2024-03-20 11:15',
      texto: 'Análise realizada. Cliente tem histórico positivo, mas possui pendência de R$ 15.000,00.',
      anexos: ['analise_financeira.pdf']
    },
    {
      id: 3,
      usuario: 'Carlos Oliveira',
      departamento: 'Comercial',
      timestamp: '2024-03-20 14:20',
      texto: 'Conversamos sobre a pendência. Cliente vai quitar até sexta-feira.',
      anexos: []
    }
  ]);

  const handleEnviarMensagem = () => {
    if (mensagem.trim()) {
      const novaMensagem = {
        id: Date.now(),
        usuario: 'Usuário Atual',
        departamento: 'Comercial',
        timestamp: new Date().toLocaleString('pt-BR'),
        texto: mensagem,
        anexos: []
      };
      setMensagens([...mensagens, novaMensagem]);
      setMensagem('');
    }
  };

  const getDepartmentColor = (departamento: string) => {
    switch (departamento) {
      case 'Comercial': return 'bg-blue-100 text-blue-700';
      case 'Financeiro': return 'bg-green-100 text-green-700';
      case 'Técnico': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Histórico de Comunicação - Oportunidade {oportunidadeId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mensagens.map((msg) => (
              <div key={msg.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-biodina-blue text-white flex items-center justify-center text-sm font-medium">
                    {getInitials(msg.usuario)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{msg.usuario}</span>
                    <Badge className={getDepartmentColor(msg.departamento)} variant="outline">
                      {msg.departamento}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{msg.texto}</p>
                  {msg.anexos.length > 0 && (
                    <div className="space-y-1">
                      {msg.anexos.map((anexo, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-blue-600">
                          <FileText className="h-3 w-3" />
                          <span>{anexo}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nova Mensagem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Anexar Arquivo
              </Button>
              <Button 
                onClick={handleEnviarMensagem}
                disabled={!mensagem.trim()}
                className="bg-biodina-gold hover:bg-biodina-gold/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterno;
