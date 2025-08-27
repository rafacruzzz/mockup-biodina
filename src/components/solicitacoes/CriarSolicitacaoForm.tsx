
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { setores, tiposSolicitacao } from '@/data/solicitacoes';
import { Setor, TipoSolicitacao } from '@/types/solicitacao';
import FormularioDinamico from './FormularioDinamico';
import { useToast } from '@/hooks/use-toast';

interface CriarSolicitacaoFormProps {
  onSuccess: () => void;
}

const CriarSolicitacaoForm = ({ onSuccess }: CriarSolicitacaoFormProps) => {
  const [etapa, setEtapa] = useState<'setor' | 'tipo' | 'formulario'>('setor');
  const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoSolicitacao | null>(null);
  const { toast } = useToast();

  const handleSetorSelect = (setor: Setor) => {
    setSetorSelecionado(setor);
    setEtapa('tipo');
  };

  const handleTipoSelect = (tipo: TipoSolicitacao) => {
    setTipoSelecionado(tipo);
    setEtapa('formulario');
  };

  const handleFormSubmit = (dadosFormulario: Record<string, any>) => {
    // Simular criação da solicitação
    console.log('Dados da solicitação:', {
      setor: setorSelecionado,
      tipo: tipoSelecionado,
      dados: dadosFormulario
    });

    toast({
      title: "Solicitação criada com sucesso!",
      description: `Sua solicitação foi enviada para o setor de ${setorSelecionado?.nome}. Você receberá atualizações por email.`,
    });

    // Reset do formulário
    setEtapa('setor');
    setSetorSelecionado(null);
    setTipoSelecionado(null);
    onSuccess();
  };

  const handleVoltar = () => {
    if (etapa === 'tipo') {
      setEtapa('setor');
      setSetorSelecionado(null);
    } else if (etapa === 'formulario') {
      setEtapa('tipo');
      setTipoSelecionado(null);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      Users: '👥',
      Monitor: '💻',
      DollarSign: '💰',
      ShoppingCart: '🛒',
      Building2: '🏢'
    };
    return icons[iconName as keyof typeof icons] || '📋';
  };

  if (etapa === 'setor') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-biodina-blue mb-2">
            Selecione o Setor de Destino
          </h2>
          <p className="text-gray-600">
            Escolha o setor responsável pela sua solicitação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {setores.map((setor) => (
            <Card 
              key={setor.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-biodina-gold"
              onClick={() => handleSetorSelect(setor)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${setor.cor} flex items-center justify-center text-white text-2xl`}>
                    {getIconComponent(setor.icone)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{setor.nome}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {setor.responsaveis.length} responsável(is)
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{setor.descricao}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (etapa === 'tipo') {
    const tiposDoSetor = tiposSolicitacao.filter(t => t.setorId === setorSelecionado?.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={handleVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-semibold text-biodina-blue">
              Tipo de Solicitação - {setorSelecionado?.nome}
            </h2>
            <p className="text-gray-600">
              Selecione o tipo específico da sua solicitação
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tiposDoSetor.map((tipo) => (
            <Card 
              key={tipo.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-biodina-gold"
              onClick={() => handleTipoSelect(tipo)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{tipo.nome}</CardTitle>
                    <CardDescription className="mt-1">{tipo.descricao}</CardDescription>
                  </div>
                  <div className="text-right">
                    {tipo.requer_aprovacao && (
                      <Badge variant="secondary" className="mb-2">Requer Aprovação</Badge>
                    )}
                    {tipo.prazo_padrao_dias && (
                      <p className="text-sm text-gray-500">
                        Prazo: {tipo.prazo_padrao_dias} dias
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (etapa === 'formulario') {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={handleVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-semibold text-biodina-blue">
              {tipoSelecionado?.nome}
            </h2>
            <p className="text-gray-600">
              Preencha os dados da sua solicitação
            </p>
          </div>
        </div>

        <FormularioDinamico
          tipoSolicitacao={tipoSelecionado!}
          onSubmit={handleFormSubmit}
        />
      </div>
    );
  }

  return null;
};

export default CriarSolicitacaoForm;
