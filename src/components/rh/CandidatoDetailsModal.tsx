
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Clock, MapPin, GraduationCap, Calendar, FileText } from 'lucide-react';
import { CandidatoProcesso, Curriculo } from '@/types/processoSeletivo';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CandidatoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidato: CandidatoProcesso | null;
  curriculo: Curriculo | null;
}

const CandidatoDetailsModal: React.FC<CandidatoDetailsModalProps> = ({
  isOpen,
  onClose,
  candidato,
  curriculo
}) => {
  const { atualizarStatusCandidato } = useProcessoSeletivo();
  const [selectedStatus, setSelectedStatus] = useState<CandidatoProcesso['status']>(candidato?.status || 'em-andamento');

  const statusOptions = [
    { value: 'em-andamento', label: 'Em Andamento', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { value: 'aprovado', label: 'Aprovado', color: 'bg-green-100 text-green-700 border-green-200' },
    { value: 'reprovado', label: 'Reprovado', color: 'bg-red-100 text-red-700 border-red-200' },
    { value: 'aguardando', label: 'Aguardando', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
  ];

  const statusHistory = useMemo(() => {
    if (!candidato) return [];
    
    // Simular histórico baseado no feedback existente
    const history = [
      {
        id: '1',
        status: candidato.status,
        dataAlteracao: candidato.dataUltimaAtualizacao,
        usuario: 'Sistema',
        motivo: candidato.status === 'reprovado' ? 'Não atendeu aos requisitos técnicos' : undefined
      },
      {
        id: '2',
        status: 'em-andamento' as const,
        dataAlteracao: candidato.dataInicio,
        usuario: 'Ana Paula Ferreira',
        motivo: undefined
      }
    ];

    return history.sort((a, b) => new Date(b.dataAlteracao).getTime() - new Date(a.dataAlteracao).getTime());
  }, [candidato]);

  const handleStatusChange = (newStatus: CandidatoProcesso['status']) => {
    if (candidato) {
      setSelectedStatus(newStatus);
      atualizarStatusCandidato(candidato.id, newStatus);
    }
  };

  const getStatusColor = (status: CandidatoProcesso['status']) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (!candidato || !curriculo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detalhes do Candidato - {curriculo.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Geral */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Geral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Status Atual:</label>
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${option.color.split(' ')[0]}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge className={getStatusColor(selectedStatus)}>
                  {statusOptions.find(opt => opt.value === selectedStatus)?.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Email:</strong> {curriculo.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Telefone:</strong> {curriculo.telefone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>CPF:</strong> {curriculo.cpf}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Departamento:</strong> {curriculo.departamento}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Escolaridade:</strong> {curriculo.escolaridade}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Data de Envio:</strong> {format(new Date(curriculo.dataEnvio), 'dd/MM/yyyy', { locale: ptBR })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Cargo Desejado:</strong> {curriculo.cargoDesejado}
              </div>
              <div>
                <strong>Experiência:</strong> {curriculo.experiencia}
              </div>
              <div>
                <strong>Fonte:</strong> {curriculo.fonte}
              </div>
              {curriculo.habilidades.length > 0 && (
                <div>
                  <strong>Habilidades:</strong>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {curriculo.habilidades.map((habilidade, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {habilidade}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {curriculo.observacoes && (
                <div>
                  <strong>Observações:</strong>
                  <p className="text-sm text-gray-600 mt-1">{curriculo.observacoes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Histórico de Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Histórico de Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status).split(' ')[0]}`} />
                      {index < statusHistory.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(item.status)}>
                          {statusOptions.find(opt => opt.value === item.status)?.label}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {format(new Date(item.dataAlteracao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          por {item.usuario}
                        </span>
                      </div>
                      {item.motivo && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Motivo:</strong> {item.motivo}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback das Etapas */}
          {candidato.feedback.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feedback das Etapas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidato.feedback.map((feedback, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Etapa {feedback.etapaId}</span>
                        <div className="flex items-center gap-2">
                          {feedback.nota && (
                            <Badge variant="outline">
                              Nota: {feedback.nota}/10
                            </Badge>
                          )}
                          <Badge className={feedback.aprovado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {feedback.aprovado ? 'Aprovado' : 'Reprovado'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{feedback.comentario}</p>
                      <div className="text-xs text-gray-500">
                        Avaliador: {feedback.avaliador} • {format(new Date(feedback.dataAvaliacao), 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidatoDetailsModal;
