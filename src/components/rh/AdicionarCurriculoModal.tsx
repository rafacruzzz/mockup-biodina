
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useProcessoSeletivo } from '@/contexts/ProcessoSeletivoContext';
import { useToast } from '@/hooks/use-toast';
import { Curriculo } from '@/types/processoSeletivo';

interface AdicionarCurriculoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cargoDesejado: string;
  departamento: string;
  experiencia: string;
  escolaridade: string;
  observacoes?: string;
}

const AdicionarCurriculoModal: React.FC<AdicionarCurriculoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { adicionarCurriculo } = useProcessoSeletivo();
  const { toast } = useToast();
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [novaHabilidade, setNovaHabilidade] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const departamentos = [
    'Tecnologia',
    'Comercial',
    'Financeiro',
    'RH',
    'Marketing',
    'Operações',
    'Jurídico',
    'Administrativo'
  ];

  const niveisEscolaridade = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Ensino Superior',
    'Pós-graduação',
    'Mestrado',
    'Doutorado'
  ];

  const formatarCPF = (cpf: string) => {
    const numeros = cpf.replace(/\D/g, '');
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const adicionarHabilidade = () => {
    if (novaHabilidade.trim() && !habilidades.includes(novaHabilidade.trim())) {
      setHabilidades([...habilidades, novaHabilidade.trim()]);
      setNovaHabilidade('');
    }
  };

  const removerHabilidade = (habilidade: string) => {
    setHabilidades(habilidades.filter(h => h !== habilidade));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarHabilidade();
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const novoCurriculo: Omit<Curriculo, 'id'> = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        cargoDesejado: data.cargoDesejado,
        departamento: data.departamento,
        experiencia: data.experiencia,
        escolaridade: data.escolaridade,
        habilidades,
        observacoes: data.observacoes,
        dataEnvio: new Date().toISOString(),
        status: 'novo',
        fonte: 'manual'
      };

      adicionarCurriculo(novoCurriculo);
      
      toast({
        title: "Currículo adicionado com sucesso!",
        description: `O currículo de ${data.nome} foi cadastrado no sistema.`,
      });

      handleClose();
    } catch (error) {
      toast({
        title: "Erro ao adicionar currículo",
        description: "Ocorreu um erro ao salvar o currículo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setHabilidades([]);
    setNovaHabilidade('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Currículo Manualmente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                {...register('nome', { required: 'Nome é obrigatório' })}
                placeholder="Digite o nome completo"
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'E-mail inválido'
                  }
                })}
                placeholder="exemplo@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                {...register('telefone', { required: 'Telefone é obrigatório' })}
                placeholder="(11) 99999-9999"
                onChange={(e) => {
                  const formatted = formatarTelefone(e.target.value);
                  setValue('telefone', formatted);
                }}
              />
              {errors.telefone && (
                <p className="text-sm text-red-500">{errors.telefone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                {...register('cpf', { required: 'CPF é obrigatório' })}
                placeholder="000.000.000-00"
                onChange={(e) => {
                  const formatted = formatarCPF(e.target.value);
                  setValue('cpf', formatted);
                }}
              />
              {errors.cpf && (
                <p className="text-sm text-red-500">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargoDesejado">Cargo Desejado *</Label>
              <Input
                id="cargoDesejado"
                {...register('cargoDesejado', { required: 'Cargo desejado é obrigatório' })}
                placeholder="Ex: Desenvolvedor Frontend"
              />
              {errors.cargoDesejado && (
                <p className="text-sm text-red-500">{errors.cargoDesejado.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="departamento">Departamento *</Label>
              <Select onValueChange={(value) => setValue('departamento', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departamentos.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departamento && (
                <p className="text-sm text-red-500">{errors.departamento.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experiencia">Experiência</Label>
              <Input
                id="experiencia"
                {...register('experiencia')}
                placeholder="Ex: 3 anos"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="escolaridade">Escolaridade</Label>
              <Select onValueChange={(value) => setValue('escolaridade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a escolaridade" />
                </SelectTrigger>
                <SelectContent>
                  {niveisEscolaridade.map(nivel => (
                    <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="habilidades">Habilidades</Label>
            <div className="flex gap-2">
              <Input
                value={novaHabilidade}
                onChange={(e) => setNovaHabilidade(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma habilidade e pressione Enter"
              />
              <Button type="button" onClick={adicionarHabilidade} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {habilidades.map((habilidade, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {habilidade}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removerHabilidade(habilidade)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              {...register('observacoes')}
              placeholder="Observações adicionais sobre o candidato..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Adicionar Currículo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarCurriculoModal;
