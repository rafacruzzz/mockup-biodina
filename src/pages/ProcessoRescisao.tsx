import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useColaboradores } from '@/hooks/useColaboradores';
import { useRescisaoProcess } from '@/hooks/useRescisaoProcess';
import { Etapa1NotificacaoDispensa } from '@/components/rh/rescisao/Etapa1NotificacaoDispensa';
import { Etapa2AcoesImediatas } from '@/components/rh/rescisao/Etapa2AcoesImediatas';
import { Etapa3DevolucaoVerbas } from '@/components/rh/rescisao/Etapa3DevolucaoVerbas';
import { Etapa4Agendamentos } from '@/components/rh/rescisao/Etapa4Agendamentos';
import { Etapa5Homologacao } from '@/components/rh/rescisao/Etapa5Homologacao';
import { Etapa6Encerramento } from '@/components/rh/rescisao/Etapa6Encerramento';
import { Etapa7Conclusao } from '@/components/rh/rescisao/Etapa7Conclusao';

const ETAPAS = [
  { numero: 1, titulo: 'Notificação de Dispensa' },
  { numero: 2, titulo: 'Ações Imediatas' },
  { numero: 3, titulo: 'Controle de Devoluções e Verbas' },
  { numero: 4, titulo: 'Agendamentos e Prazos' },
  { numero: 5, titulo: 'Homologação' },
  { numero: 6, titulo: 'Encerramento / Cancelamentos' },
  { numero: 7, titulo: 'Conclusão' }
];

export default function ProcessoRescisao() {
  const { colaboradorId } = useParams<{ colaboradorId: string }>();
  const navigate = useNavigate();
  const { colaboradores } = useColaboradores();
  const { processo, updateEtapa, canAdvanceToStep, areSteps1And2Complete, finalizeProcess } = useRescisaoProcess(colaboradorId!);
  const [etapaAtual, setEtapaAtual] = useState(1);

  const colaborador = colaboradores.find(c => c.id === colaboradorId);

  if (!colaborador) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Colaborador não encontrado</h1>
          <Button onClick={() => navigate('/rh')} className="mt-4">
            Voltar ao RH
          </Button>
        </div>
      </div>
    );
  }

  const handleEtapaClick = (numeroEtapa: number) => {
    if (canAdvanceToStep(numeroEtapa)) {
      setEtapaAtual(numeroEtapa);
    }
  };

  const handleVoltar = () => {
    navigate('/rh');
  };

  const renderEtapaContent = () => {
    const commonProps = {
      onSave: (dados: any) => updateEtapa(etapaAtual, dados),
      onNext: () => {
        if (etapaAtual < 7) {
          setEtapaAtual(etapaAtual + 1);
        }
      }
    };

    switch (etapaAtual) {
      case 1:
        return <Etapa1NotificacaoDispensa dados={processo.etapas.etapa1} {...commonProps} />;
      case 2:
        return <Etapa2AcoesImediatas dados={processo.etapas.etapa2} {...commonProps} />;
      case 3:
        return <Etapa3DevolucaoVerbas dados={processo.etapas.etapa3} {...commonProps} />;
      case 4:
        return <Etapa4Agendamentos 
          dados={processo.etapas.etapa4} 
          {...commonProps} 
          canProceed={areSteps1And2Complete()}
        />;
      case 5:
        return <Etapa5Homologacao dados={processo.etapas.etapa5} {...commonProps} />;
      case 6:
        return <Etapa6Encerramento 
          dados={processo.etapas.etapa6} 
          {...commonProps}
          onFinalize={() => finalizeProcess(colaboradorId!)}
        />;
      case 7:
        return <Etapa7Conclusao 
          dados={processo.etapas.etapa7} 
          {...commonProps}
          onArchive={() => {
            finalizeProcess(colaboradorId!);
            navigate('/rh');
          }}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={handleVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao RH
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">
          Processo de Rescisão: {colaborador.nome}
        </h1>

        {/* Dados do Colaborador */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Dados do Colaborador</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Nome Completo:</span>
                <p>{colaborador.nome}</p>
              </div>
              <div>
                <span className="font-medium">CPF:</span>
                <p>000.000.000-00</p>
              </div>
              <div>
                <span className="font-medium">RG:</span>
                <p>00.000.000-0</p>
              </div>
              <div>
                <span className="font-medium">Data de Admissão:</span>
                <p>{new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <span className="font-medium">Cargo:</span>
                <p>{colaborador.cargo}</p>
              </div>
              <div>
                <span className="font-medium">Salário:</span>
                <p>R$ 5.000,00</p>
              </div>
              <div>
                <span className="font-medium">Departamento:</span>
                <p>{colaborador.departamento}</p>
              </div>
              <div>
                <span className="font-medium">Empresa:</span>
                <p>{colaborador.empresa}</p>
              </div>
              <div>
                <span className="font-medium">Endereço:</span>
                <p>Rua Exemplo, 123 - São Paulo/SP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex">
        {/* Sidebar das Etapas */}
        <div className="w-80 bg-card border-r min-h-[calc(100vh-200px)]">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Etapas do Processo</h3>
            <div className="space-y-2">
              {ETAPAS.map((etapa) => {
                const isAtual = etapa.numero === etapaAtual;
                const isConcluida = processo.etapas[`etapa${etapa.numero}` as keyof typeof processo.etapas]?.concluida;
                const podeAcessar = canAdvanceToStep(etapa.numero);

                return (
                  <div
                    key={etapa.numero}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      isAtual 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : podeAcessar
                          ? 'hover:bg-muted border-border'
                          : 'opacity-50 cursor-not-allowed border-border'
                    }`}
                    onClick={() => handleEtapaClick(etapa.numero)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        isConcluida 
                          ? 'bg-green-500 text-white' 
                          : isAtual 
                            ? 'bg-primary-foreground text-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {isConcluida ? <Check className="h-3 w-3" /> : etapa.numero}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{etapa.numero}. {etapa.titulo}</div>
                        {isConcluida && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Concluída
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conteúdo da Etapa */}
        <div className="flex-1 p-6">
          {renderEtapaContent()}
        </div>
      </div>
    </div>
  );
}