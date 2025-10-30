import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Settings, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NovoIncidenteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (incidente: any) => void;
}

interface FormData {
  tipoIncidente: string;
  detalhes: string;
  criticidade: 'baixa' | 'media' | 'alta' | 'critica' | '';
  afetados: string;
  sistemaAfetado: string;
  ipOrigem: string;
  observacoes: string;
}

interface FormErrors {
  tipoIncidente?: string;
  detalhes?: string;
  criticidade?: string;
  ipOrigem?: string;
}

const NovoIncidenteModal: React.FC<NovoIncidenteModalProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    tipoIncidente: '',
    detalhes: '',
    criticidade: '',
    afetados: '',
    sistemaAfetado: '',
    ipOrigem: '',
    observacoes: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateIP = (ip: string): boolean => {
    if (!ip) return true; // Campo opcional
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    
    const octets = ip.split('.');
    return octets.every(octet => {
      const num = parseInt(octet, 10);
      return num >= 0 && num <= 255;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.tipoIncidente) {
      newErrors.tipoIncidente = 'Tipo de incidente é obrigatório';
    }

    if (!formData.detalhes) {
      newErrors.detalhes = 'Detalhes do incidente são obrigatórios';
    } else if (formData.detalhes.length < 20) {
      newErrors.detalhes = 'Detalhes devem ter no mínimo 20 caracteres';
    } else if (formData.detalhes.length > 500) {
      newErrors.detalhes = 'Detalhes devem ter no máximo 500 caracteres';
    }

    if (!formData.criticidade) {
      newErrors.criticidade = 'Criticidade é obrigatória';
    }

    if (formData.ipOrigem && !validateIP(formData.ipOrigem)) {
      newErrors.ipOrigem = 'Formato de IP inválido (ex: 192.168.1.100)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive"
      });
      return;
    }

    const novoIncidente = {
      id: Date.now(), // Temporário - em produção virá do banco
      tipo: 'incidente',
      dataHora: new Date().toISOString(),
      tipoIncidente: formData.tipoIncidente,
      detalhes: formData.detalhes,
      status: 'novo',
      criticidade: formData.criticidade,
      sistemaAfetado: formData.sistemaAfetado || undefined,
      ipOrigem: formData.ipOrigem || undefined,
      afetados: formData.afetados || undefined,
      observacoes: formData.observacoes || undefined
    };

    onSave(novoIncidente);
    
    toast({
      title: "Incidente Registrado",
      description: "O incidente foi registrado com sucesso no sistema.",
    });

    // Resetar formulário
    setFormData({
      tipoIncidente: '',
      detalhes: '',
      criticidade: '',
      afetados: '',
      sistemaAfetado: '',
      ipOrigem: '',
      observacoes: ''
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Registrar Novo Incidente de Segurança
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do incidente para registro e acompanhamento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card: Informações do Incidente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                Informações do Incidente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipoIncidente">
                  Tipo de Incidente <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.tipoIncidente}
                  onValueChange={(value) => setFormData({ ...formData, tipoIncidente: value })}
                >
                  <SelectTrigger id="tipoIncidente" className={errors.tipoIncidente ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acesso_suspeito">Acesso Suspeito</SelectItem>
                    <SelectItem value="firewall">Firewall</SelectItem>
                    <SelectItem value="malware">Malware</SelectItem>
                    <SelectItem value="phishing">Phishing</SelectItem>
                    <SelectItem value="vazamento_dados">Vazamento de Dados</SelectItem>
                    <SelectItem value="ransomware">Ransomware</SelectItem>
                    <SelectItem value="ddos">DDoS</SelectItem>
                    <SelectItem value="engenharia_social">Engenharia Social</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipoIncidente && (
                  <p className="text-sm text-red-500">{errors.tipoIncidente}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="detalhes">
                  Detalhes do Incidente <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="detalhes"
                  placeholder="Descreva o que aconteceu..."
                  value={formData.detalhes}
                  onChange={(e) => setFormData({ ...formData, detalhes: e.target.value })}
                  className={errors.detalhes ? 'border-red-500' : ''}
                  rows={4}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{errors.detalhes && <span className="text-red-500">{errors.detalhes}</span>}</span>
                  <span>{formData.detalhes.length}/500</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="criticidade">
                  Criticidade <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.criticidade}
                  onValueChange={(value: any) => setFormData({ ...formData, criticidade: value })}
                >
                  <SelectTrigger id="criticidade" className={errors.criticidade ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a criticidade..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">🟢 Baixa</SelectItem>
                    <SelectItem value="media">🟡 Média</SelectItem>
                    <SelectItem value="alta">🟠 Alta</SelectItem>
                    <SelectItem value="critica">🔴 Crítica</SelectItem>
                  </SelectContent>
                </Select>
                {errors.criticidade && (
                  <p className="text-sm text-red-500">{errors.criticidade}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card: Informações Técnicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="h-4 w-4" />
                Informações Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sistemaAfetado">Sistema/Serviço Afetado</Label>
                <Input
                  id="sistemaAfetado"
                  placeholder="Ex: ERP iMuv, Servidor Principal..."
                  value={formData.sistemaAfetado}
                  onChange={(e) => setFormData({ ...formData, sistemaAfetado: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipOrigem">IP de Origem</Label>
                <Input
                  id="ipOrigem"
                  placeholder="Ex: 192.168.1.100"
                  value={formData.ipOrigem}
                  onChange={(e) => setFormData({ ...formData, ipOrigem: e.target.value })}
                  className={errors.ipOrigem ? 'border-red-500' : ''}
                />
                {errors.ipOrigem && (
                  <p className="text-sm text-red-500">{errors.ipOrigem}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="afetados">Usuários/Sistemas Afetados</Label>
                <Input
                  id="afetados"
                  placeholder="Ex: João Silva, Maria Santos ou 5 usuários"
                  value={formData.afetados}
                  onChange={(e) => setFormData({ ...formData, afetados: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Card: Observações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Observações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Informações complementares..."
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.observacoes.length}/300
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Incidente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovoIncidenteModal;
