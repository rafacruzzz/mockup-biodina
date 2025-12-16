import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, User, Calendar, DollarSign } from "lucide-react";

interface NovoServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalvar?: (servico: any) => void;
}

const NovoServicoModal = ({ isOpen, onClose, onSalvar }: NovoServicoModalProps) => {
  const [formData, setFormData] = useState({
    descricao: '',
    descricaoDetalhada: '',
    cliente: '',
    cnpjCliente: '',
    valor: '',
    dataInicio: new Date().toISOString().split('T')[0],
    dataPrevistaConclusao: '',
    responsavel: '',
    emailResponsavel: '',
    escopo: '',
    observacoes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSalvar = () => {
    if (!formData.descricao.trim()) {
      toast.error("Descrição do serviço é obrigatória");
      return;
    }
    if (!formData.cliente.trim()) {
      toast.error("Cliente é obrigatório");
      return;
    }
    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      toast.error("Valor do serviço é obrigatório");
      return;
    }
    if (!formData.responsavel.trim()) {
      toast.error("Responsável é obrigatório");
      return;
    }

    const novoServico = {
      id: `srv-${Date.now()}`,
      ...formData,
      valor: parseFloat(formData.valor),
      status: 'Iniciado',
    };

    onSalvar?.(novoServico);
    toast.success("Serviço criado com sucesso!");
    onClose();
    
    // Reset form
    setFormData({
      descricao: '',
      descricaoDetalhada: '',
      cliente: '',
      cnpjCliente: '',
      valor: '',
      dataInicio: new Date().toISOString().split('T')[0],
      dataPrevistaConclusao: '',
      responsavel: '',
      emailResponsavel: '',
      escopo: '',
      observacoes: '',
    });
  };

  // Mock data para clientes
  const clientesMock = [
    { id: '1', nome: 'Hospital São Lucas', cnpj: '12.345.678/0001-99' },
    { id: '2', nome: 'Clínica Vida Saudável', cnpj: '98.765.432/0001-11' },
    { id: '3', nome: 'Laboratório Análises', cnpj: '11.222.333/0001-44' },
  ];

  // Mock data para responsáveis
  const responsaveisMock = [
    { id: '1', nome: 'João Silva', email: 'joao.silva@empresa.com' },
    { id: '2', nome: 'Maria Santos', email: 'maria.santos@empresa.com' },
    { id: '3', nome: 'Carlos Oliveira', email: 'carlos.oliveira@empresa.com' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Novo Serviço
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Descrição do Serviço */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição do Serviço *</Label>
            <Input
              id="descricao"
              placeholder="Ex: Manutenção preventiva de equipamento"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricaoDetalhada">Descrição Detalhada</Label>
            <Textarea
              id="descricaoDetalhada"
              placeholder="Descreva os detalhes do serviço a ser prestado..."
              value={formData.descricaoDetalhada}
              onChange={(e) => handleInputChange('descricaoDetalhada', e.target.value)}
              rows={3}
            />
          </div>

          {/* Cliente */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Select
                value={formData.cliente}
                onValueChange={(value) => {
                  const cliente = clientesMock.find(c => c.nome === value);
                  handleInputChange('cliente', value);
                  if (cliente) {
                    handleInputChange('cnpjCliente', cliente.cnpj);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientesMock.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.nome}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpjCliente">CNPJ do Cliente</Label>
              <Input
                id="cnpjCliente"
                value={formData.cnpjCliente}
                onChange={(e) => handleInputChange('cnpjCliente', e.target.value)}
                placeholder="00.000.000/0001-00"
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          {/* Valor e Datas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Valor do Serviço *
              </Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => handleInputChange('valor', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataInicio" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Data de Início *
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleInputChange('dataInicio', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataPrevistaConclusao">Previsão de Conclusão</Label>
              <Input
                id="dataPrevistaConclusao"
                type="date"
                value={formData.dataPrevistaConclusao}
                onChange={(e) => handleInputChange('dataPrevistaConclusao', e.target.value)}
              />
            </div>
          </div>

          {/* Responsável */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsavel" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Responsável *
              </Label>
              <Select
                value={formData.responsavel}
                onValueChange={(value) => {
                  const resp = responsaveisMock.find(r => r.nome === value);
                  handleInputChange('responsavel', value);
                  if (resp) {
                    handleInputChange('emailResponsavel', resp.email);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  {responsaveisMock.map((resp) => (
                    <SelectItem key={resp.id} value={resp.nome}>
                      {resp.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailResponsavel">E-mail do Responsável</Label>
              <Input
                id="emailResponsavel"
                type="email"
                value={formData.emailResponsavel}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          {/* Escopo */}
          <div className="space-y-2">
            <Label htmlFor="escopo">Escopo do Serviço</Label>
            <Textarea
              id="escopo"
              placeholder="Descreva o escopo e entregáveis do serviço..."
              value={formData.escopo}
              onChange={(e) => handleInputChange('escopo', e.target.value)}
              rows={3}
            />
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações adicionais..."
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar}>
            Criar Serviço
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoServicoModal;
