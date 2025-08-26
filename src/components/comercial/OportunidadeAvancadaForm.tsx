import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm: React.FC<OportunidadeAvancadaFormProps> = ({ isOpen, oportunidade, onClose, onSave }) => {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nomeInstituicao: oportunidade?.nomeInstituicao || '',
    cnpj: oportunidade?.cnpj || '',
    numeroPregao: oportunidade?.numeroPregao || '',
    objetoLicitacao: oportunidade?.objetoLicitacao || '',
    linkEdital: oportunidade?.linkEdital || '',
    dataAbertura: oportunidade?.dataAbertura || undefined,
    estrategiaPreco: oportunidade?.estrategiaPreco || '',
    estrategiaValorInicial: oportunidade?.estrategiaValorInicial || 0,
    estrategiaValorFinal: oportunidade?.estrategiaValorFinal || 0,
    dataContato: oportunidade?.dataContato || undefined,
    observacoes: oportunidade?.observacoes || '',
    status: oportunidade?.status || 'pendente',
    haviaContratoAnterior: oportunidade?.haviaContratoAnterior || 'nao',
    marcaModeloContratoAnterior: oportunidade?.marcaModeloContratoAnterior || '',
  });

  useEffect(() => {
    if (oportunidade) {
      setFormData({
        nomeInstituicao: oportunidade.nomeInstituicao || '',
        cnpj: oportunidade.cnpj || '',
        numeroPregao: oportunidade.numeroPregao || '',
        objetoLicitacao: oportunidade.objetoLicitacao || '',
        linkEdital: oportunidade.linkEdital || '',
        dataAbertura: oportunidade.dataAbertura ? new Date(oportunidade.dataAbertura) : undefined,
        estrategiaPreco: oportunidade.estrategiaPreco || '',
        estrategiaValorInicial: oportunidade.estrategiaValorInicial || 0,
        estrategiaValorFinal: oportunidade.estrategiaValorFinal || 0,
        dataContato: oportunidade.dataContato ? new Date(oportunidade.dataContato) : undefined,
        observacoes: oportunidade.observacoes || '',
        status: oportunidade.status || 'pendente',
        haviaContratoAnterior: oportunidade.haviaContratoAnterior || 'nao',
        marcaModeloContratoAnterior: oportunidade.marcaModeloContratoAnterior || '',
      });
    } else {
      setFormData({
        nomeInstituicao: '',
        cnpj: '',
        numeroPregao: '',
        objetoLicitacao: '',
        linkEdital: '',
        dataAbertura: undefined,
        estrategiaPreco: '',
        estrategiaValorInicial: 0,
        estrategiaValorFinal: 0,
        dataContato: undefined,
        observacoes: '',
        status: 'pendente',
        haviaContratoAnterior: 'nao',
        marcaModeloContratoAnterior: '',
      });
    }
  }, [oportunidade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmConversion = window.confirm("Deseja converter esta licitação automaticamente?");
    if (confirmConversion) {
      const licitacaoConvertida = {
        ...formData,
        status: 'convertida'
      };
      onSave(licitacaoConvertida);

      toast({
        title: "Licitação Convertida!",
        description: "Esta licitação foi convertida automaticamente.",
      })
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Formulário de Oportunidade Avançada</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeInstituicao">Nome da Instituição</Label>
            <Input
              id="nomeInstituicao"
              type="text"
              placeholder="Hospital, Prefeitura, etc."
              value={formData.nomeInstituicao}
              onChange={(e) => setFormData({ ...formData, nomeInstituicao: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="numeroPregao">Número do Pregão</Label>
            <Input
              id="numeroPregao"
              type="text"
              placeholder="Ex: 123/2024"
              value={formData.numeroPregao}
              onChange={(e) => setFormData({ ...formData, numeroPregao: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
            <Input
              id="objetoLicitacao"
              type="text"
              placeholder="Ex: Aquisição de equipamentos hospitalares"
              value={formData.objetoLicitacao}
              onChange={(e) => setFormData({ ...formData, objetoLicitacao: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="linkEdital">Link do Edital</Label>
            <Input
              id="linkEdital"
              type="url"
              placeholder="https://example.com/edital"
              value={formData.linkEdital}
              onChange={(e) => setFormData({ ...formData, linkEdital: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dataAbertura">Data de Abertura</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !formData.dataAbertura && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataAbertura ? (
                    new Date(formData.dataAbertura).toLocaleDateString()
                  ) : (
                    <span>Escolher Data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dataAbertura}
                  onSelect={(date) => setFormData({ ...formData, dataAbertura: date })}
                  disabled={(date) =>
                    date > new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="estrategiaPreco">Estratégia de Preço</Label>
            <Select value={formData.estrategiaPreco} onValueChange={(value) => setFormData({ ...formData, estrategiaPreco: value })}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Selecione uma estratégia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="menor_preco">Menor Preço</SelectItem>
                <SelectItem value="melhor_tecnica">Melhor Técnica</SelectItem>
                {/* Adicione mais estratégias conforme necessário */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="estrategiaValorInicial">Valor Inicial Estimado</Label>
            <Input
              id="estrategiaValorInicial"
              type="number"
              placeholder="R$ 0,00"
              value={formData.estrategiaValorInicial}
              onChange={(e) => setFormData({ ...formData, estrategiaValorInicial: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="estrategiaValorFinal">Valor Final Ofertado</Label>
            <Input
              id="estrategiaValorFinal"
              type="number"
              placeholder="R$ 0,00"
              value={formData.estrategiaValorFinal}
              onChange={(e) => setFormData({ ...formData, estrategiaValorFinal: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="dataContato">Data do Contato</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !formData.dataContato && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataContato ? (
                    new Date(formData.dataContato).toLocaleDateString()
                  ) : (
                    <span>Escolher Data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
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
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Input
              id="observacoes"
              type="text"
              placeholder="Informações adicionais"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                {/* Adicione mais status conforme necessário */}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="haviaContratoAnterior">Fornecedor anterior?</Label>
            <RadioGroup 
              value={formData.haviaContratoAnterior} 
              onValueChange={(value) => setFormData({...formData, haviaContratoAnterior: value})}
              className="flex flex-row space-x-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="contrato-sim" />
                <Label htmlFor="contrato-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="contrato-nao" />
                <Label htmlFor="contrato-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.haviaContratoAnterior === 'sim' && (
            <div>
              <Label htmlFor="marcaModeloContratoAnterior">Qual o Fornecedor Anterior?</Label>
              <Input
                id="marcaModeloContratoAnterior"
                value={formData.marcaModeloContratoAnterior}
                onChange={(e) => setFormData({...formData, marcaModeloContratoAnterior: e.target.value})}
                placeholder="Ex: Empresa XYZ Ltda"
              />
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <div>
              <Button variant="secondary" onClick={handleConvert} className="mr-2">
                Converter
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OportunidadeAvancadaForm;
