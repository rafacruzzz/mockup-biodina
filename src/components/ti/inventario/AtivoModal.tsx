import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Package } from "lucide-react";
import { toast } from "sonner";
import type { AtivoTI } from "@/types/ti";

interface AtivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  ativo?: AtivoTI | null;
  modo: 'cadastro' | 'edicao';
}

interface FormData {
  numeroInventario: string;
  equipamento: string;
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  status: string;
  responsavel: string;
  departamento: string;
  localizacao: string;
  dataAquisicao: string;
  dataGarantia: string;
  valorAquisicao: string;
  fornecedor: string;
  numeroNF: string;
  centroCusto: string;
  observacoes: string;
}

export const AtivoModal = ({ isOpen, onClose, ativo, modo }: AtivoModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    numeroInventario: '',
    equipamento: '',
    tipo: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    status: 'ativo',
    responsavel: '',
    departamento: '',
    localizacao: '',
    dataAquisicao: '',
    dataGarantia: '',
    valorAquisicao: '',
    fornecedor: '',
    numeroNF: '',
    centroCusto: '',
    observacoes: ''
  });

  const [mostrarIntegracaoFinanceiro, setMostrarIntegracaoFinanceiro] = useState(false);

  useEffect(() => {
    if (ativo && modo === 'edicao') {
      setFormData({
        numeroInventario: ativo.numeroInventario,
        equipamento: ativo.equipamento,
        tipo: ativo.tipo,
        marca: ativo.marca,
        modelo: ativo.modelo,
        numeroSerie: ativo.numeroSerie,
        status: ativo.status,
        responsavel: ativo.responsavel,
        departamento: ativo.departamento,
        localizacao: ativo.localizacao,
        dataAquisicao: ativo.dataAquisicao,
        dataGarantia: ativo.dataGarantia,
        valorAquisicao: ativo.valorAquisicao?.toString() || '',
        fornecedor: (ativo as any).fornecedor || '',
        numeroNF: (ativo as any).numeroNF || '',
        centroCusto: (ativo as any).centroCusto || '',
        observacoes: (ativo as any).observacoes || ''
      });
    } else {
      // Reset form para cadastro
      setFormData({
        numeroInventario: '',
        equipamento: '',
        tipo: '',
        marca: '',
        modelo: '',
        numeroSerie: '',
        status: 'ativo',
        responsavel: '',
        departamento: '',
        localizacao: '',
        dataAquisicao: '',
        dataGarantia: '',
        valorAquisicao: '',
        fornecedor: '',
        numeroNF: '',
        centroCusto: '',
        observacoes: ''
      });
    }
  }, [ativo, modo, isOpen]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de salvamento
    if (modo === 'cadastro') {
      toast.success("Ativo cadastrado com sucesso!");
    } else {
      toast.success("Ativo atualizado com sucesso!");
    }
    
    onClose();
  };

  const calcularIdadeAtivo = () => {
    if (!formData.dataAquisicao) return null;
    const hoje = new Date();
    const aquisicao = new Date(formData.dataAquisicao);
    const anos = hoje.getFullYear() - aquisicao.getFullYear();
    return anos;
  };

  const verificarGarantia = () => {
    if (!formData.dataGarantia) return null;
    const hoje = new Date();
    const garantia = new Date(formData.dataGarantia);
    const diasRestantes = Math.ceil((garantia.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    if (diasRestantes < 0) return { status: 'vencida', dias: Math.abs(diasRestantes) };
    if (diasRestantes <= 90) return { status: 'vencendo', dias: diasRestantes };
    return { status: 'ok', dias: diasRestantes };
  };

  const idadeAtivo = calcularIdadeAtivo();
  const statusGarantia = verificarGarantia();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {modo === 'cadastro' ? 'Cadastrar Novo Ativo' : 'Editar Ativo'}
          </DialogTitle>
          <DialogDescription>
            {modo === 'cadastro' 
              ? 'Preencha as informações para cadastrar um novo ativo de TI'
              : 'Atualize as informações do ativo selecionado'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Alertas de Status */}
          {modo === 'edicao' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Idade do Ativo */}
              {idadeAtivo !== null && (
                <Card className={idadeAtivo >= 5 ? 'border-yellow-200 bg-yellow-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      {idadeAtivo >= 5 ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium">Idade do Ativo</p>
                        <p className="text-xs text-gray-600">
                          {idadeAtivo} ano{idadeAtivo !== 1 ? 's' : ''}
                          {idadeAtivo >= 5 && ' - Próximo ao fim da vida útil'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status da Garantia */}
              {statusGarantia && (
                <Card className={statusGarantia.status !== 'ok' ? 'border-red-200 bg-red-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      {statusGarantia.status === 'vencida' ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : statusGarantia.status === 'vencendo' ? (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium">Garantia</p>
                        <p className="text-xs text-gray-600">
                          {statusGarantia.status === 'vencida' && `Vencida há ${statusGarantia.dias} dias`}
                          {statusGarantia.status === 'vencendo' && `Vence em ${statusGarantia.dias} dias`}
                          {statusGarantia.status === 'ok' && `Válida por ${statusGarantia.dias} dias`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Integração Financeiro */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Integração Financeiro</p>
                      <Button 
                        type="button"
                        variant="link" 
                        className="h-auto p-0 text-xs"
                        onClick={() => setMostrarIntegracaoFinanceiro(!mostrarIntegracaoFinanceiro)}
                      >
                        {mostrarIntegracaoFinanceiro ? 'Ocultar' : 'Ver'} dados da NF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="numeroInventario">Número do Inventário *</Label>
                  <Input
                    id="numeroInventario"
                    value={formData.numeroInventario}
                    onChange={(e) => handleInputChange('numeroInventario', e.target.value)}
                    placeholder="Ex: NB-001"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="equipamento">Equipamento *</Label>
                  <Input
                    id="equipamento"
                    value={formData.equipamento}
                    onChange={(e) => handleInputChange('equipamento', e.target.value)}
                    placeholder="Ex: Notebook Dell Vostro 15"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notebook">Notebook</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="servidor">Servidor</SelectItem>
                      <SelectItem value="impressora">Impressora</SelectItem>
                      <SelectItem value="roteador">Roteador</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="marca">Marca *</Label>
                    <Input
                      id="marca"
                      value={formData.marca}
                      onChange={(e) => handleInputChange('marca', e.target.value)}
                      placeholder="Ex: Dell"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="modelo">Modelo *</Label>
                    <Input
                      id="modelo"
                      value={formData.modelo}
                      onChange={(e) => handleInputChange('modelo', e.target.value)}
                      placeholder="Ex: Vostro 15-3520"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="numeroSerie">Número de Série *</Label>
                  <Input
                    id="numeroSerie"
                    value={formData.numeroSerie}
                    onChange={(e) => handleInputChange('numeroSerie', e.target.value)}
                    placeholder="Ex: DL2024001"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status e Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status e Localização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="manutencao">Em Manutenção</SelectItem>
                      <SelectItem value="reserva">Reserva</SelectItem>
                      <SelectItem value="descartado">Descartado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="responsavel">Responsável *</Label>
                  <Input
                    id="responsavel"
                    value={formData.responsavel}
                    onChange={(e) => handleInputChange('responsavel', e.target.value)}
                    placeholder="Ex: João Silva"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="departamento">Departamento *</Label>
                  <Select value={formData.departamento} onValueChange={(value) => handleInputChange('departamento', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="localizacao">Localização Física *</Label>
                  <Input
                    id="localizacao"
                    value={formData.localizacao}
                    onChange={(e) => handleInputChange('localizacao', e.target.value)}
                    placeholder="Ex: Sala 101 - 1º Andar"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="centroCusto">Centro de Custo</Label>
                  <Select value={formData.centroCusto} onValueChange={(value) => handleInputChange('centroCusto', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o centro de custo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dados Financeiros */}
          <Card className={mostrarIntegracaoFinanceiro || modo === 'cadastro' ? '' : 'hidden'}>
            <CardHeader>
              <CardTitle className="text-lg">Dados Financeiros</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
                <Input
                  id="dataAquisicao"
                  type="date"
                  value={formData.dataAquisicao}
                  onChange={(e) => handleInputChange('dataAquisicao', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dataGarantia">Data de Garantia</Label>
                <Input
                  id="dataGarantia"
                  type="date"
                  value={formData.dataGarantia}
                  onChange={(e) => handleInputChange('dataGarantia', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="valorAquisicao">Valor de Aquisição</Label>
                <Input
                  id="valorAquisicao"
                  type="number"
                  step="0.01"
                  value={formData.valorAquisicao}
                  onChange={(e) => handleInputChange('valorAquisicao', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) => handleInputChange('fornecedor', e.target.value)}
                  placeholder="Ex: Dell do Brasil"
                />
              </div>

              <div>
                <Label htmlFor="numeroNF">Número da NF</Label>
                <Input
                  id="numeroNF"
                  value={formData.numeroNF}
                  onChange={(e) => handleInputChange('numeroNF', e.target.value)}
                  placeholder="Ex: NF-2024-001"
                />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações gerais sobre o ativo..."
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {modo === 'cadastro' ? 'Cadastrar' : 'Atualizar'} Ativo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};