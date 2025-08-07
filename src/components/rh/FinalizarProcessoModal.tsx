
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { ProcessoSeletivo, Curriculo } from '@/types/processoSeletivo';

interface FinalizarProcessoModalProps {
  isOpen: boolean;
  onClose: () => void;
  processo: ProcessoSeletivo;
}

const FinalizarProcessoModal: React.FC<FinalizarProcessoModalProps> = ({
  isOpen,
  onClose,
  processo
}) => {
  const { atualizarProcessoSeletivo, curriculos } = useProcessoSeletivo();
  const [motivo, setMotivo] = useState<ProcessoSeletivo['motivoFinalizacao'] | null>(null);
  const [candidatosContratados, setCandidatosContratados] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);

  const motivosFinalizacao = [
    { value: 'vaga-preenchida' as const, label: 'Vaga Preenchida' },
    { value: 'vaga-cancelada' as const, label: 'Vaga Cancelada' },
    { value: 'sem-candidatos-qualificados' as const, label: 'Sem Candidatos Qualificados' },
    { value: 'orcamento-indisponivel' as const, label: 'Orçamento Indisponível' },
    { value: 'mudanca-prioridades' as const, label: 'Mudança de Prioridades' },
    { value: 'outros' as const, label: 'Outros' }
  ];

  // Candidatos aprovados que podem ser contratados
  const candidatosAprovados = processo.candidatos.filter(c => c.status === 'aprovado');
  const candidatosComCurriculos = candidatosAprovados.map(candidato => {
    const curriculo = curriculos.find(c => c.id === candidato.curriculoId);
    return { candidato, curriculo };
  }).filter(item => item.curriculo);

  const handleCandidatoToggle = (candidatoId: string) => {
    setCandidatosContratados(prev => {
      if (prev.includes(candidatoId)) {
        return prev.filter(id => id !== candidatoId);
      } else if (prev.length < processo.vagas) {
        return [...prev, candidatoId];
      }
      return prev;
    });
  };

  const handleFinalizarProcesso = async () => {
    if (!motivo) return;

    setLoading(true);
    
    try {
      const dadosFinalizacao = {
        status: 'finalizado' as const,
        dataFim: new Date().toISOString(),
        motivoFinalizacao: motivo,
        observacoes: observacoes || undefined,
        candidatosContratados: candidatosContratados.length > 0 ? candidatosContratados : undefined
      };

      atualizarProcessoSeletivo(processo.id, dadosFinalizacao);

      // Reset form
      setMotivo(null);
      setCandidatosContratados([]);
      setObservacoes('');
      
      onClose();
    } catch (error) {
      console.error('Erro ao finalizar processo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMotivo(null);
    setCandidatosContratados([]);
    setObservacoes('');
    onClose();
  };

  const isVagaPreenchida = motivo === 'vaga-preenchida';
  const canFinalize = motivo && (!isVagaPreenchida || candidatosContratados.length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Finalizar Processo Seletivo
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Esta ação não pode ser desfeita. O processo será marcado como finalizado.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900">{processo.titulo}</h4>
            <p className="text-sm text-gray-600">{processo.cargo} - {processo.departamento}</p>
            <p className="text-sm text-gray-600">{processo.vagas} vaga(s) disponível(eis)</p>
            <p className="text-sm text-gray-600">{processo.candidatos.length} candidato(s) no processo</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo da Finalização *</Label>
            <Select value={motivo || ''} onValueChange={(value) => setMotivo(value as ProcessoSeletivo['motivoFinalizacao'])}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo..." />
              </SelectTrigger>
              <SelectContent>
                {motivosFinalizacao.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isVagaPreenchida && (
            <div className="space-y-2">
              <Label>
                Candidatos Contratados * 
                <span className="text-sm text-gray-500 ml-2">
                  (até {processo.vagas} vaga{processo.vagas > 1 ? 's' : ''})
                </span>
              </Label>
              
              {candidatosComCurriculos.length === 0 ? (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                  Nenhum candidato aprovado encontrado para contratação.
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>
                        {candidatosContratados.length} de {processo.vagas} vaga{processo.vagas > 1 ? 's' : ''} preenchida{candidatosContratados.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {candidatosComCurriculos.map(({ candidato, curriculo }) => (
                      <div key={candidato.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <Checkbox
                          id={candidato.id}
                          checked={candidatosContratados.includes(candidato.id)}
                          onCheckedChange={() => handleCandidatoToggle(candidato.id)}
                          disabled={!candidatosContratados.includes(candidato.id) && candidatosContratados.length >= processo.vagas}
                        />
                        <label 
                          htmlFor={candidato.id} 
                          className="flex-1 cursor-pointer text-sm"
                        >
                          <div className="font-medium text-gray-900">{curriculo!.nome}</div>
                          <div className="text-gray-500">{curriculo!.email}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Adicionais</Label>
            <Textarea
              id="observacoes"
              placeholder="Adicione observações sobre a finalização do processo..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium mb-1">Atenção:</p>
                <ul className="space-y-1">
                  <li>• O processo será marcado como finalizado</li>
                  <li>• Não será possível adicionar novos candidatos</li>
                  <li>• O Kanban ficará em modo somente leitura</li>
                  <li>• Esta ação não pode ser desfeita</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            variant="destructive"
            onClick={handleFinalizarProcesso}
            disabled={!canFinalize || loading}
          >
            {loading ? 'Finalizando...' : 'Finalizar Processo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinalizarProcessoModal;
