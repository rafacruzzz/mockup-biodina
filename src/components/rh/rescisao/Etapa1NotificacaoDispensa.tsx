import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Bell, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Etapa1NotificacaoDispensa as Etapa1Type, MOTIVOS_INICIATIVA_EMPRESA, MOTIVOS_INICIATIVA_COLABORADOR } from '@/types/rescisao';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
  dados: Etapa1Type;
  onSave: (dados: Partial<Etapa1Type>) => void;
  onNext: () => void;
}

export function Etapa1NotificacaoDispensa({ dados, onSave, onNext }: Props) {
  const [formData, setFormData] = useState<Etapa1Type>(dados);

  const handleSave = () => {
    onSave(formData);
    onNext();
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...(prev[parent as keyof Etapa1Type] as any), [field]: value }
    }));
  };

  const motivosDisponiveis = formData.tipoDesligamento === 'iniciativa_empresa' 
    ? MOTIVOS_INICIATIVA_EMPRESA 
    : MOTIVOS_INICIATIVA_COLABORADOR;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">1. Dados para Desligamento – notificação de dispensa</h2>
          <p className="text-sm text-muted-foreground">(Preenchidos pelo RH para envio ao DP Contratado Externo)</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alerta para Solicitação de prévia de cálculos rescisórios */}
          <Alert className="border-amber-200 bg-amber-50">
            <Bell className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Solicitação de prévia de cálculos rescisórios:</strong> Lembre-se de solicitar ao departamento pessoal contratado os cálculos preliminares da rescisão antes de prosseguir com o processo.
            </AlertDescription>
          </Alert>

          {/* Prévia de Rescisão */}
          <div className="space-y-3">
            <Label>Prévia de Rescisão?</Label>
            <RadioGroup 
              value={formData.previaRescisao.toString()} 
              onValueChange={(value) => updateField('previaRescisao', value === 'true')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="previa-sim" />
                <Label htmlFor="previa-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="previa-nao" />
                <Label htmlFor="previa-nao">Não</Label>
              </div>
            </RadioGroup>
            
            {formData.previaRescisao && (
              <div className="border-2 border-dashed border-muted rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Anexar prévia da rescisão</span>
                </div>
                <Input type="file" className="mt-2" />
              </div>
            )}
          </div>

          {/* Desligamento Solicitado por */}
          <div className="space-y-2">
            <Label htmlFor="solicitado-por">Desligamento Solicitado por</Label>
            <Input
              id="solicitado-por"
              value={formData.desligamentoSolicitadoPor}
              onChange={(e) => updateField('desligamentoSolicitadoPor', e.target.value)}
              placeholder="Nome da pessoa que solicitou"
            />
          </div>

          {/* Data do Desligamento */}
          <div className="space-y-2">
            <Label>Data do Desligamento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dataDesligamento && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataDesligamento ? format(new Date(formData.dataDesligamento), "dd/MM/yyyy") : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar 
                  mode="single"
                  selected={formData.dataDesligamento ? new Date(formData.dataDesligamento) : undefined}
                  onSelect={(date) => updateField('dataDesligamento', date ? format(date, 'yyyy-MM-dd') : '')}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Aviso Prévio */}
          <div className="space-y-3">
            <Label>Aviso Prévio</Label>
            <Select value={formData.avisoPrevia} onValueChange={(value: any) => updateField('avisoPrevia', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indenizado">Indenizado</SelectItem>
                <SelectItem value="trabalhado">Trabalhado</SelectItem>
              </SelectContent>
            </Select>

            {formData.avisoPrevia === 'trabalhado' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data de Início do Aviso</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataInicioAviso ? format(new Date(formData.dataInicioAviso), "dd/MM/yyyy") : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar 
                        mode="single"
                        selected={formData.dataInicioAviso ? new Date(formData.dataInicioAviso) : undefined}
                        onSelect={(date) => updateField('dataInicioAviso', date ? format(date, 'yyyy-MM-dd') : '')}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Data de Fim do Aviso</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Bell className="h-4 w-4 text-amber-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Alerta será gerado 9 dias corridos antes do fim do aviso</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataFimAviso ? format(new Date(formData.dataFimAviso), "dd/MM/yyyy") : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar 
                        mode="single"
                        selected={formData.dataFimAviso ? new Date(formData.dataFimAviso) : undefined}
                        onSelect={(date) => updateField('dataFimAviso', date ? format(date, 'yyyy-MM-dd') : '')}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>

          {/* Tipo de Desligamento */}
          <div className="space-y-3">
            <Label>Tipo de Desligamento</Label>
            <Select value={formData.tipoDesligamento} onValueChange={(value: any) => updateField('tipoDesligamento', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iniciativa_empresa">Iniciativa da Empresa</SelectItem>
                <SelectItem value="iniciativa_colaborador">Iniciativa do Colaborador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Motivo do Desligamento */}
          <div className="space-y-2">
            <Label>Motivo do Desligamento</Label>
            <Select value={formData.motivoDesligamento} onValueChange={(value) => updateField('motivoDesligamento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                {motivosDisponiveis.map((motivo) => (
                  <SelectItem key={motivo} value={motivo}>{motivo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Exame Demissional */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Exame Demissional</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exame-data">Data</Label>
                <Input
                  id="exame-data"
                  type="date"
                  value={formData.exameDemissional.data}
                  onChange={(e) => updateNestedField('exameDemissional', 'data', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exame-local">Local</Label>
                <Input
                  id="exame-local"
                  value={formData.exameDemissional.local}
                  onChange={(e) => updateNestedField('exameDemissional', 'local', e.target.value)}
                  placeholder="Local do exame"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exame-horario">Horário</Label>
                <Input
                  id="exame-horario"
                  type="time"
                  value={formData.exameDemissional.horario}
                  onChange={(e) => updateNestedField('exameDemissional', 'horario', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contatos Pós-empresa */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Contatos Pós-empresa</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.contatosPosEmpresa.telefone}
                  onChange={(e) => updateNestedField('contatosPosEmpresa', 'telefone', e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contatosPosEmpresa.email}
                  onChange={(e) => updateNestedField('contatosPosEmpresa', 'email', e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              Salvar e Continuar para Ações Imediatas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}