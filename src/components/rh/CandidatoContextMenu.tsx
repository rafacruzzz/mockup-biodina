
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, CheckCircle, XCircle, Clock, ArrowRight, Eye } from 'lucide-react';
import { CandidatoProcesso } from '@/types/processoSeletivo';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';

interface CandidatoContextMenuProps {
  candidato: CandidatoProcesso;
  etapas: Array<{ id: string; nome: string }>;
  onViewDetails: () => void;
}

const CandidatoContextMenu: React.FC<CandidatoContextMenuProps> = ({
  candidato,
  etapas,
  onViewDetails
}) => {
  const { atualizarStatusCandidato, moverCandidatoEtapa } = useProcessoSeletivo();
  const [isReprovalModalOpen, setIsReprovalModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [reprovalReason, setReprovalReason] = useState('');
  const [selectedEtapa, setSelectedEtapa] = useState('');

  const handleStatusChange = (status: CandidatoProcesso['status']) => {
    if (status === 'reprovado') {
      setIsReprovalModalOpen(true);
    } else {
      atualizarStatusCandidato(candidato.id, status);
    }
  };

  const handleReproval = () => {
    if (reprovalReason.trim()) {
      atualizarStatusCandidato(candidato.id, 'reprovado');
      // TODO: Salvar motivo da reprovação no histórico
      console.log('Motivo da reprovação:', reprovalReason);
      setIsReprovalModalOpen(false);
      setReprovalReason('');
    }
  };

  const handleMoveToEtapa = () => {
    if (selectedEtapa) {
      moverCandidatoEtapa(candidato.id, selectedEtapa);
      setIsMoveModalOpen(false);
      setSelectedEtapa('');
    }
  };

  const availableEtapas = etapas.filter(etapa => etapa.id !== candidato.etapaAtual);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg z-50">
          <DropdownMenuItem 
            onClick={() => handleStatusChange('aprovado')}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            Marcar como Aprovado
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleStatusChange('reprovado')}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <XCircle className="h-4 w-4 text-red-600" />
            Reprovar
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleStatusChange('aguardando')}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <Clock className="h-4 w-4 text-yellow-600" />
            Em Análise
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setIsMoveModalOpen(true)}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <ArrowRight className="h-4 w-4 text-blue-600" />
            Mover para Etapa...
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={onViewDetails}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 text-gray-600" />
            Visualizar Detalhes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de Reprovação */}
      <Dialog open={isReprovalModalOpen} onOpenChange={setIsReprovalModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Reprovar Candidato</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Motivo da reprovação:
            </label>
            <Textarea
              placeholder="Descreva o motivo da reprovação..."
              value={reprovalReason}
              onChange={(e) => setReprovalReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsReprovalModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReproval}
              disabled={!reprovalReason.trim()}
            >
              Reprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Mover para Etapa */}
      <Dialog open={isMoveModalOpen} onOpenChange={setIsMoveModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Mover para Etapa</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Selecione a etapa de destino:
            </label>
            <Select value={selectedEtapa} onValueChange={setSelectedEtapa}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma etapa..." />
              </SelectTrigger>
              <SelectContent>
                {availableEtapas.map((etapa) => (
                  <SelectItem key={etapa.id} value={etapa.id}>
                    {etapa.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsMoveModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleMoveToEtapa}
              disabled={!selectedEtapa}
            >
              Mover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidatoContextMenu;
