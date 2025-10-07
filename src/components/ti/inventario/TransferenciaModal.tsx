import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Building } from "lucide-react";
import { toast } from "sonner";
import type { AtivoTI } from "@/types/ti";

interface TransferenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  ativo?: AtivoTI | null;
}

interface FormData {
  departamentoDestino: string;
  responsavelDestino: string;
  localizacaoDestino: string;
  motivo: string;
  dataTransferencia: string;
  observacoes: string;
}

export const TransferenciaModal = ({ isOpen, onClose, ativo }: TransferenciaModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    departamentoDestino: '',
    responsavelDestino: '',
    localizacaoDestino: '',
    motivo: '',
    dataTransferencia: new Date().toISOString().split('T')[0],
    observacoes: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de transferência
    toast.success(`Transferência do ativo ${ativo?.numeroInventario} realizada com sucesso!`);
    onClose();
    
    // Reset form
    setFormData({
      departamentoDestino: '',
      responsavelDestino: '',
      localizacaoDestino: '',
      motivo: '',
      dataTransferencia: new Date().toISOString().split('T')[0],
      observacoes: ''
    });
  };

  if (!ativo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transferir Ativo</DialogTitle>
          <DialogDescription>
            Transfira o ativo entre departamentos/colaboradores com rastreabilidade completa
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Ativo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5" />
                Ativo a ser Transferido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Equipamento</p>
                  <p>{ativo.equipamento}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Nº Inventário</p>
                  <p className="font-mono">{ativo.numeroInventario}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Responsável Atual</p>
                  <p>{ativo.responsavel}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Departamento Atual</p>
                  <p>{ativo.departamento}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Localização Atual</p>
                  <p>{ativo.localizacao}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Status</p>
                  <Badge variant="outline" className="capitalize">
                    {ativo.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fluxo de Transferência */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{ativo.responsavel}</p>
                      <p className="text-gray-600">{ativo.departamento}</p>
                    </div>
                  </div>
                </div>
                
                <ArrowRight className="h-8 w-8 text-blue-600" />
                
                <div className="text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        {formData.responsavelDestino || 'Novo Responsável'}
                      </p>
                      <p className="text-gray-600">
                        {formData.departamentoDestino || 'Novo Departamento'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados da Transferência */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados da Transferência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departamentoDestino">Departamento de Destino *</Label>
                  <Select value={formData.departamentoDestino} onValueChange={(value) => handleInputChange('departamentoDestino', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                      <SelectItem value="Almoxarifado">Almoxarifado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="responsavelDestino">Novo Responsável *</Label>
                  <Input
                    id="responsavelDestino"
                    value={formData.responsavelDestino}
                    onChange={(e) => handleInputChange('responsavelDestino', e.target.value)}
                    placeholder="Ex: Maria Santos"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="localizacaoDestino">Nova Localização *</Label>
                <Input
                  id="localizacaoDestino"
                  value={formData.localizacaoDestino}
                  onChange={(e) => handleInputChange('localizacaoDestino', e.target.value)}
                  placeholder="Ex: Sala 203 - 2º Andar"
                  required
                />
              </div>

              <div>
                <Label htmlFor="dataTransferencia">Data da Transferência *</Label>
                <Input
                  id="dataTransferencia"
                  type="date"
                  value={formData.dataTransferencia}
                  onChange={(e) => handleInputChange('dataTransferencia', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="motivo">Motivo da Transferência *</Label>
                <Select value={formData.motivo} onValueChange={(value) => handleInputChange('motivo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realocacao_colaborador">Realocação de Colaborador</SelectItem>
                    <SelectItem value="novo_colaborador">Alocação para Novo Colaborador</SelectItem>
                    <SelectItem value="troca_equipamento">Troca de Equipamento</SelectItem>
                    <SelectItem value="manutencao">Envio para Manutenção</SelectItem>
                    <SelectItem value="upgrade">Upgrade de Equipamento</SelectItem>
                    <SelectItem value="reorganizacao">Reorganização Departamental</SelectItem>
                    <SelectItem value="estoque">Retorno ao Estoque</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Informações adicionais sobre a transferência..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Nota sobre Rastreabilidade */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-2">
              <div className="text-yellow-600">ℹ</div>
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Rastreabilidade Completa</p>
                <p className="text-yellow-700">
                  Esta transferência será registrada no histórico do ativo, permitindo 
                  rastreabilidade completa desde a aquisição até a alocação atual.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirmar Transferência
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};