import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Send,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { useEmpresa } from '@/contexts/EmpresaContext';
import { useAuthDemo } from '@/hooks/useAuthDemo';
import { AprovacaoEmpresa } from '@/types/licitacao';
import AprovacaoEmpresaModal from './AprovacaoEmpresaModal';

interface LicitacaoData {
  id: number;
  numeroPregao: string;
  nomeInstituicao: string;
  objetoLicitacao: string;
}

interface EmpresaParticipanteSelectProps {
  empresaParticipanteId?: string;
  empresaParticipanteNome?: string;
  empresaParticipanteCNPJ?: string;
  aprovacaoEmpresa?: AprovacaoEmpresa;
  onChange: (data: {
    empresaParticipanteId: string;
    empresaParticipanteNome: string;
    empresaParticipanteCNPJ: string;
  }) => void;
  onSolicitarAprovacao: () => void;
  onAprovar?: (aprovacao: AprovacaoEmpresa) => void;
  onRejeitar?: (aprovacao: AprovacaoEmpresa) => void;
  licitacaoData?: LicitacaoData;
  disabled?: boolean;
  required?: boolean;
}

// Mock de empresas disponíveis (em produção viria do contexto)
const empresasDisponiveis = [
  { id: 'master-001', nome: 'iMuv Tecnologia LTDA', cnpj: '12.345.678/0001-00', tipo: 'matriz', documentacaoCompleta: true },
  { id: 'filial-sp-001', nome: 'iMuv Tecnologia - Filial SP', cnpj: '12.345.678/0002-81', tipo: 'filial', documentacaoCompleta: true },
  { id: 'filial-rj-001', nome: 'iMuv Tecnologia - Filial RJ', cnpj: '12.345.678/0003-62', tipo: 'filial', documentacaoCompleta: true },
  { id: 'filial-mg-001', nome: 'iMuv Tecnologia - Filial MG', cnpj: '12.345.678/0004-43', tipo: 'filial', documentacaoCompleta: false },
];

export default function EmpresaParticipanteSelect({
  empresaParticipanteId,
  empresaParticipanteNome,
  empresaParticipanteCNPJ,
  aprovacaoEmpresa,
  onChange,
  onSolicitarAprovacao,
  onAprovar,
  onRejeitar,
  licitacaoData,
  disabled = false,
  required = true
}: EmpresaParticipanteSelectProps) {
  const { empresaAtual } = useEmpresa();
  const { isGestor } = useAuthDemo();
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(empresaParticipanteId || '');
  const [showAprovacaoModal, setShowAprovacaoModal] = useState(false);

  const handleEmpresaChange = (empresaId: string) => {
    const empresa = empresasDisponiveis.find(e => e.id === empresaId);
    if (empresa) {
      setSelectedEmpresaId(empresaId);
      onChange({
        empresaParticipanteId: empresa.id,
        empresaParticipanteNome: empresa.nome,
        empresaParticipanteCNPJ: empresa.cnpj
      });
    }
  };

  const getAprovacaoStatus = () => {
    if (!aprovacaoEmpresa) return null;

    switch (aprovacaoEmpresa.status) {
      case 'pendente':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 border-yellow-200',
          label: 'Aguardando Aprovação Gerencial',
          variant: 'secondary' as const
        };
      case 'aprovado':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50 border-green-200',
          label: `Aprovado por ${aprovacaoEmpresa.aprovadoPor} em ${aprovacaoEmpresa.aprovadoEm}`,
          variant: 'default' as const
        };
      case 'rejeitado':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50 border-red-200',
          label: `Rejeitado: ${aprovacaoEmpresa.observacao || 'Sem observação'}`,
          variant: 'destructive' as const
        };
      default:
        return null;
    }
  };

  const selectedEmpresa = empresasDisponiveis.find(e => e.id === selectedEmpresaId);
  const aprovacaoStatus = getAprovacaoStatus();
  const needsApproval = selectedEmpresaId && (!aprovacaoEmpresa || aprovacaoEmpresa.status === 'rejeitado');
  const canApprove = isGestor() && aprovacaoEmpresa?.status === 'pendente';

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="pt-4 space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <Label className="text-base font-semibold">
            Empresa Participante da Licitação {required && <span className="text-red-500">*</span>}
          </Label>
        </div>

        <div className="space-y-3">
          <Select
            value={selectedEmpresaId}
            onValueChange={handleEmpresaChange}
            disabled={disabled || aprovacaoEmpresa?.status === 'aprovado'}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a empresa que encabeçará a licitação" />
            </SelectTrigger>
            <SelectContent>
              {empresasDisponiveis.map((empresa) => (
                <SelectItem 
                  key={empresa.id} 
                  value={empresa.id}
                  disabled={!empresa.documentacaoCompleta}
                >
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex flex-col">
                      <span className="font-medium">{empresa.nome}</span>
                      <span className="text-xs text-muted-foreground">CNPJ: {empresa.cnpj}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={empresa.tipo === 'matriz' ? 'default' : 'secondary'} className="text-xs">
                        {empresa.tipo === 'matriz' ? 'Matriz' : 'Filial'}
                      </Badge>
                      {!empresa.documentacaoCompleta && (
                        <Badge variant="destructive" className="text-xs">
                          Doc. Pendente
                        </Badge>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Empresa selecionada - detalhes (mostra da seleção ou das props quando há aprovação) */}
          {(selectedEmpresa || (aprovacaoEmpresa && empresaParticipanteNome)) && (
            <div className="p-3 bg-muted/50 rounded-lg border-2 border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                    Empresa Selecionada para Participação
                  </p>
                  <p className="font-medium text-lg">
                    {selectedEmpresa?.nome || empresaParticipanteNome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CNPJ: {selectedEmpresa?.cnpj || empresaParticipanteCNPJ}
                  </p>
                </div>
                {selectedEmpresa?.documentacaoCompleta !== false ? (
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    <FileCheck className="h-3 w-3 mr-1" />
                    Documentação OK
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Documentação Pendente
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Status de aprovação */}
          {aprovacaoStatus && (
            <div className={`flex items-center gap-2 p-3 border rounded-lg ${aprovacaoStatus.bgColor}`}>
              <aprovacaoStatus.icon className={`h-5 w-5 ${aprovacaoStatus.color}`} />
              <span className={`text-sm font-medium ${aprovacaoStatus.color}`}>
                {aprovacaoStatus.label}
              </span>
            </div>
          )}

          {/* Botão de aprovar/rejeitar para gestores */}
          {canApprove && licitacaoData && (
            <Button
              type="button"
              onClick={() => setShowAprovacaoModal(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Aprovar / Rejeitar Empresa
            </Button>
          )}

          {/* Botão de solicitar aprovação */}
          {needsApproval && !disabled && (
            <Button
              type="button"
              variant="outline"
              onClick={onSolicitarAprovacao}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              Solicitar Aprovação Gerencial
            </Button>
          )}

          {/* Alerta se não selecionou empresa */}
          {required && !selectedEmpresaId && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-800">
                Obrigatório selecionar a empresa participante para avançar
              </span>
            </div>
          )}
        </div>

        {/* Modal de aprovação */}
        {licitacaoData && (
          <AprovacaoEmpresaModal
            isOpen={showAprovacaoModal}
            onClose={() => setShowAprovacaoModal(false)}
            licitacaoData={{
              id: licitacaoData.id,
              numeroPregao: licitacaoData.numeroPregao,
              nomeInstituicao: licitacaoData.nomeInstituicao,
              objetoLicitacao: licitacaoData.objetoLicitacao,
              empresaParticipanteNome: selectedEmpresa?.nome,
              empresaParticipanteCNPJ: selectedEmpresa?.cnpj
            }}
            onAprovar={(aprovacao) => {
              onAprovar?.(aprovacao);
              setShowAprovacaoModal(false);
            }}
            onRejeitar={(aprovacao) => {
              onRejeitar?.(aprovacao);
              setShowAprovacaoModal(false);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
