import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Bell, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Etapa6Encerramento as Etapa6Type } from '@/types/rescisao';

interface Props {
  dados: Etapa6Type;
  onSave: (dados: Partial<Etapa6Type>) => void;
  onNext: () => void;
  onFinalize: () => void;
}

export function Etapa6Encerramento({ dados, onSave, onNext, onFinalize }: Props) {
  const [formData, setFormData] = useState<Etapa6Type>(dados);
  const [showCheckIcon, setShowCheckIcon] = useState(dados.confirmacaoFinal);

  const handleSave = () => {
    onSave(formData);
    onNext();
  };

  const updateCancelamento = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      cancelamentos: { ...prev.cancelamentos, [field]: value }
    }));
  };

  const updatePlanoSaude = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      planoSaude: { ...prev.planoSaude, [field]: value }
    }));
  };

  const updateOutrasAcoes = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      outrasAcoes: { ...prev.outrasAcoes, [field]: value }
    }));
  };

  const handleConfirmacaoFinal = (checked: boolean) => {
    setFormData(prev => ({ ...prev, confirmacaoFinal: checked }));
    setShowCheckIcon(checked);
    if (checked) {
      onFinalize();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">6. Encerramento e Cancelamentos Finais</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cancelamentos */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Cancelamentos</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cancel-vt">Cancelamento do VT</Label>
                <Input
                  id="cancel-vt"
                  type="date"
                  value={formData.cancelamentos.dataVT || ''}
                  onChange={(e) => updateCancelamento('dataVT', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cancel-va">Cancelamento do VA</Label>
                <Input
                  id="cancel-va"
                  type="date"
                  value={formData.cancelamentos.dataVA || ''}
                  onChange={(e) => updateCancelamento('dataVA', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cancel-seguro">Cancelamento de seguro de vida</Label>
                <Input
                  id="cancel-seguro"
                  type="date"
                  value={formData.cancelamentos.dataSeguroVida || ''}
                  onChange={(e) => updateCancelamento('dataSeguroVida', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Plano de Saúde */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Plano de Saúde</Label>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Direito à Manutenção (Lei 9.656/98)?</Label>
                <RadioGroup 
                  value={formData.planoSaude.direitoManutencao.toString()} 
                  onValueChange={(value) => updatePlanoSaude('direitoManutencao', value === 'true')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="direito-sim" />
                    <Label htmlFor="direito-sim">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="direito-nao" />
                    <Label htmlFor="direito-nao">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.planoSaude.direitoManutencao && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <div className="space-y-2">
                    <Label htmlFor="prazos-condicoes">Prazos e condições de adesão</Label>
                    <Textarea
                      id="prazos-condicoes"
                      value={formData.planoSaude.prazosCondicoes || ''}
                      onChange={(e) => updatePlanoSaude('prazosCondicoes', e.target.value)}
                      placeholder="Descreva os prazos e condições..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-solicitacao">Data de solicitação ao corretor</Label>
                      <Input
                        id="data-solicitacao"
                        type="date"
                        value={formData.planoSaude.dataSolicitacaoCorretor || ''}
                        onChange={(e) => updatePlanoSaude('dataSolicitacaoCorretor', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="data-conclusao">Data de conclusão do corretor</Label>
                      <div className="flex gap-2">
                        <Input
                          id="data-conclusao"
                          type="date"
                          value={formData.planoSaude.dataConclusaoCorretor || ''}
                          onChange={(e) => updatePlanoSaude('dataConclusaoCorretor', e.target.value)}
                        />
                        <Button variant="outline" size="sm">Anexar</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="vigencia-empresa">Vigência uso pela empresa até</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Bell className="h-4 w-4 text-amber-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Alerta 10 dias antes do fim</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="vigencia-empresa"
                        type="date"
                        value={formData.planoSaude.vigenciaEmpresaAte || ''}
                        onChange={(e) => updatePlanoSaude('vigenciaEmpresaAte', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vigencia-individual">Vigência uso individual: envio boleto a partir de</Label>
                      <Input
                        id="vigencia-individual"
                        type="date"
                        value={formData.planoSaude.vigenciaIndividualAPartir || ''}
                        onChange={(e) => updatePlanoSaude('vigenciaIndividualAPartir', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="titular-dependentes">Titular + dependentes</Label>
                    <Select 
                      value={formData.planoSaude.titularDependentes.toString()}
                      onValueChange={(value) => updatePlanoSaude('titularDependentes', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Outras Ações */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Outras Ações</Label>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="comunicacao-sindicato">Comunicação de desligamento ao sindicato</Label>
                <Input
                  id="comunicacao-sindicato"
                  value={formData.outrasAcoes.comunicacaoSindicato || ''}
                  onChange={(e) => updateOutrasAcoes('comunicacaoSindicato', e.target.value)}
                  placeholder="Data e forma de comunicação"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cancelamento-convenios">Cancelamento de convênios/parcerias</Label>
                <Input
                  id="cancelamento-convenios"
                  value={formData.outrasAcoes.cancelamentoConvenios || ''}
                  onChange={(e) => updateOutrasAcoes('cancelamentoConvenios', e.target.value)}
                  placeholder="Detalhes dos cancelamentos"
                />
              </div>
            </div>
          </div>

          {/* Confirmação Final */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <Checkbox
                id="confirmacao-final"
                checked={formData.confirmacaoFinal}
                onCheckedChange={handleConfirmacaoFinal}
                className="h-5 w-5"
              />
              <Label htmlFor="confirmacao-final" className="text-base font-medium">
                Confirmação final de 'encerramento sem pendências'
              </Label>
              {showCheckIcon && (
                <CheckCircle className="h-8 w-8 text-green-500 ml-auto" />
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSave} 
              className="w-full"
              disabled={!formData.confirmacaoFinal}
            >
              Salvar e Finalizar Processo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}