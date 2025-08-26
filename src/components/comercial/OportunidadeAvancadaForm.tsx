import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale';

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm: React.FC<OportunidadeAvancadaFormProps> = ({ isOpen, oportunidade, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    numeroPregao: '',
    nomeInstituicao: '',
    objetoLicitacao: '',
    linkEdital: '',
    dataPublicacao: undefined,
    dataLimiteProposta: undefined,
    valorEstimado: 0,
    estrategiaPreco: '',
    estrategiaValorFinal: 0,
    resumoEdital: '',
    solicitarAnaliseTecnica: false,
    analiseTecnica: '',
    status: 'pendente',
    dataContato: undefined,
  });

  useEffect(() => {
    if (oportunidade) {
      setFormData({
        numeroPregao: oportunidade.numeroPregao || '',
        nomeInstituicao: oportunidade.nomeInstituicao || '',
        objetoLicitacao: oportunidade.objetoLicitacao || '',
        linkEdital: oportunidade.linkEdital || '',
        dataPublicacao: oportunidade.dataPublicacao ? new Date(oportunidade.dataPublicacao) : undefined,
        dataLimiteProposta: oportunidade.dataLimiteProposta ? new Date(oportunidade.dataLimiteProposta) : undefined,
        valorEstimado: oportunidade.valorEstimado || 0,
        estrategiaPreco: oportunidade.estrategiaPreco || '',
        estrategiaValorFinal: oportunidade.estrategiaValorFinal || 0,
        resumoEdital: oportunidade.resumoEdital || '',
        solicitarAnaliseTecnica: oportunidade.solicitarAnaliseTecnica || false,
        analiseTecnica: oportunidade.analiseTecnica || '',
        status: oportunidade.status || 'pendente',
        dataContato: oportunidade.dataContato ? new Date(oportunidade.dataContato) : undefined,
      });
    } else {
      setFormData({
        numeroPregao: '',
        nomeInstituicao: '',
        objetoLicitacao: '',
        linkEdital: '',
        dataPublicacao: undefined,
        dataLimiteProposta: undefined,
        valorEstimado: 0,
        estrategiaPreco: '',
        estrategiaValorFinal: 0,
        resumoEdital: '',
        solicitarAnaliseTecnica: false,
        analiseTecnica: '',
        status: 'pendente',
        dataContato: undefined,
      });
    }
  }, [oportunidade]);

  const handleSolicitarAnaliseTecnica = () => {
    toast({
      title: "Solicitação de Análise Técnica",
      description: "Sua solicitação de análise técnica foi enviada ao departamento técnico.",
    })
  };

  const handleSubmit = () => {
    if (!formData.numeroPregao || !formData.nomeInstituicao || !formData.objetoLicitacao) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Formulário de Licitação</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova licitação.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Número do Pregão */}
            <div className="space-y-2">
              <Label htmlFor="numeroPregao">Número do Pregão</Label>
              <Input
                id="numeroPregao"
                value={formData.numeroPregao}
                onChange={(e) => setFormData({ ...formData, numeroPregao: e.target.value })}
              />
            </div>

            {/* Nome da Instituição */}
            <div className="space-y-2">
              <Label htmlFor="nomeInstituicao">Nome da Instituição</Label>
              <Input
                id="nomeInstituicao"
                value={formData.nomeInstituicao}
                onChange={(e) => setFormData({ ...formData, nomeInstituicao: e.target.value })}
              />
            </div>
          </div>

          {/* Objeto da Licitação */}
          <div className="space-y-2">
            <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
            <Input
              id="objetoLicitacao"
              value={formData.objetoLicitacao}
              onChange={(e) => setFormData({ ...formData, objetoLicitacao: e.target.value })}
            />
          </div>

          {/* Link do Edital */}
          <div className="space-y-2">
            <Label htmlFor="linkEdital">Link do Edital</Label>
            <Input
              id="linkEdital"
              type="url"
              value={formData.linkEdital}
              onChange={(e) => setFormData({ ...formData, linkEdital: e.target.value })}
              placeholder="http://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Data de Publicação */}
            <div className="space-y-2">
              <Label>Data de Publicação</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !formData.dataPublicacao && "text-muted-foreground"
                    )}
                  >
                    {formData.dataPublicacao ? (
                      format(formData.dataPublicacao, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={formData.dataPublicacao}
                    onSelect={(date) => setFormData({ ...formData, dataPublicacao: date })}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Data Limite para Proposta */}
            <div className="space-y-2">
              <Label>Data Limite para Proposta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !formData.dataLimiteProposta && "text-muted-foreground"
                    )}
                  >
                    {formData.dataLimiteProposta ? (
                      format(formData.dataLimiteProposta, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={formData.dataLimiteProposta}
                    onSelect={(date) => setFormData({ ...formData, dataLimiteProposta: date })}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Valor Estimado */}
            <div className="space-y-2">
              <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
              <Input
                id="valorEstimado"
                type="number"
                value={formData.valorEstimado ? formData.valorEstimado.toString() : ''}
                onChange={(e) => setFormData({ ...formData, valorEstimado: parseFloat(e.target.value) })}
              />
            </div>

            {/* Estratégia de Preço */}
            <div className="space-y-2">
              <Label htmlFor="estrategiaPreco">Estratégia de Preço</Label>
              <Input
                id="estrategiaPreco"
                value={formData.estrategiaPreco}
                onChange={(e) => setFormData({ ...formData, estrategiaPreco: e.target.value })}
              />
            </div>
          </div>

          {/* Estratégia de Valor Final */}
          <div className="space-y-2">
            <Label htmlFor="estrategiaValorFinal">Estratégia de Valor Final (R$)</Label>
            <Input
              id="estrategiaValorFinal"
              type="number"
              value={formData.estrategiaValorFinal ? formData.estrategiaValorFinal.toString() : ''}
              onChange={(e) => setFormData({ ...formData, estrategiaValorFinal: parseFloat(e.target.value) })}
            />
          </div>

              {/* Resumo do Edital */}
              <div className="space-y-2">
                <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                <Textarea
                  id="resumoEdital"
                  value={formData.resumoEdital || ''}
                  onChange={(e) => setFormData({...formData, resumoEdital: e.target.value})}
                  placeholder="Descreva um resumo detalhado do edital..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Solicitar análise técnica */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="solicitarAnaliseTecnica"
                    checked={formData.solicitarAnaliseTecnica || false}
                    onCheckedChange={(checked) => {
                      setFormData({...formData, solicitarAnaliseTecnica: checked as boolean});
                      if (checked) {
                        handleSolicitarAnaliseTecnica();
                      }
                    }}
                  />
                  <Label 
                    htmlFor="solicitarAnaliseTecnica" 
                    className="text-sm font-medium text-blue-700 cursor-pointer"
                  >
                    Solicitar análise técnica
                  </Label>
                </div>
                <p className="text-xs text-blue-600 ml-6">
                  Marque esta opção para solicitar uma análise técnica detalhada do departamento técnico sobre este edital.
                </p>
              </div>

              {/* Análise Técnica */}
              <div className="space-y-2">
                <Label htmlFor="analiseTecnica">Análise Técnica</Label>
                <Textarea
                  id="analiseTecnica"
                  value={formData.analiseTecnica || ''}
                  onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
                  placeholder="Análise técnica será preenchida pelo departamento técnico..."
                  className="min-h-[120px]"
                  readOnly
                />
                <p className="text-xs text-gray-500">
                  Este campo será preenchido automaticamente pelo departamento técnico após análise.
                </p>
              </div>

          {/* Status da Licitação */}
          <div className="space-y-2">
            <Label htmlFor="status">Status da Licitação</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="aprovada">Aprovada</SelectItem>
                <SelectItem value="reprovada">Reprovada</SelectItem>
                <SelectItem value="convertida">Convertida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data do Contato */}
          <div className="space-y-2">
            <Label>Data do Contato</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !formData.dataContato && "text-muted-foreground"
                  )}
                >
                  {formData.dataContato ? (
                    format(formData.dataContato, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={formData.dataContato}
                  onSelect={(date) => setFormData({ ...formData, dataContato: date })}
                  disabled={(date) =>
                    date > new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeAvancadaForm;
