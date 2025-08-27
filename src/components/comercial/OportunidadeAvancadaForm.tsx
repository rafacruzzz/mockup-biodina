import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Save, Settings } from "lucide-react";
import { toast } from "sonner";
import { useSegmentoLeadManager } from "@/hooks/useSegmentoLeadManager";
import GerenciarSegmentosModal from "./GerenciarSegmentosModal";

interface OportunidadeAvancadaFormData {
  nomeOportunidade: string;
  dataCriacao: Date | null;
  dataFechamento: Date | null;
  probabilidade: number;
  valorEstimado: number;
  segmentoLead: string;
  nomeContato: string;
  emailContato: string;
  telefoneContato: string;
  canalEntrada: string;
  consultorResponsavel: string;
  status: string;
  produtosServicos: string;
  concorrentes: string;
  estrategiaProposta: string;
  observacoes: string;
  ativo: boolean;
}

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: OportunidadeAvancadaFormData) => void;
}

const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const { segmentos } = useSegmentoLeadManager();
  const [mostrarGerenciarSegmentos, setMostrarGerenciarSegmentos] = useState(false);
  const [formData, setFormData] = useState<OportunidadeAvancadaFormData>({
    nomeOportunidade: "",
    dataCriacao: null,
    dataFechamento: null,
    probabilidade: 0,
    valorEstimado: 0,
    segmentoLead: "",
    nomeContato: "",
    emailContato: "",
    telefoneContato: "",
    canalEntrada: "",
    consultorResponsavel: "",
    status: "",
    produtosServicos: "",
    concorrentes: "",
    estrategiaProposta: "",
    observacoes: "",
    ativo: true,
  });

  const handleInputChange = (field: keyof OportunidadeAvancadaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.nomeOportunidade === "") {
      toast.error("O nome da oportunidade é obrigatório");
      return;
    }

    if (formData.segmentoLead === "") {
      toast.error("O segmento do lead é obrigatório");
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Nova Oportunidade (Avançada)</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome-oportunidade">Nome da Oportunidade *</Label>
              <Input
                type="text"
                id="nome-oportunidade"
                value={formData.nomeOportunidade}
                onChange={(e) => handleInputChange('nomeOportunidade', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="data-criacao">Data de Criação</Label>
              <Input
                type="date"
                id="data-criacao"
                value={formData.dataCriacao ? formData.dataCriacao.toISOString().split('T')[0] : ""}
                onChange={(e) => handleInputChange('dataCriacao', e.target.value ? new Date(e.target.value) : null)}
              />
            </div>

            <div>
              <Label htmlFor="data-fechamento">Data de Fechamento Estimada</Label>
              <Input
                type="date"
                id="data-fechamento"
                value={formData.dataFechamento ? formData.dataFechamento.toISOString().split('T')[0] : ""}
                onChange={(e) => handleInputChange('dataFechamento', e.target.value ? new Date(e.target.value) : null)}
              />
            </div>

            <div>
              <Label htmlFor="probabilidade">Probabilidade (%)</Label>
              <Input
                type="number"
                id="probabilidade"
                value={formData.probabilidade}
                onChange={(e) => handleInputChange('probabilidade', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="valor-estimado">Valor Estimado (R$)</Label>
              <Input
                type="number"
                id="valor-estimado"
                value={formData.valorEstimado}
                onChange={(e) => handleInputChange('valorEstimado', Number(e.target.value))}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="segmento-lead">Segmento do Lead *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMostrarGerenciarSegmentos(true)}
                  className="h-6 px-2 text-xs"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Gerenciar
                </Button>
              </div>
              <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o segmento..." />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {segmentos.map((segmento) => (
                    <SelectItem key={segmento.id} value={segmento.value}>
                      {segmento.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nome-contato">Nome do Contato</Label>
              <Input
                type="text"
                id="nome-contato"
                value={formData.nomeContato}
                onChange={(e) => handleInputChange('nomeContato', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email-contato">Email do Contato</Label>
              <Input
                type="email"
                id="email-contato"
                value={formData.emailContato}
                onChange={(e) => handleInputChange('emailContato', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="telefone-contato">Telefone do Contato</Label>
              <Input
                type="tel"
                id="telefone-contato"
                value={formData.telefoneContato}
                onChange={(e) => handleInputChange('telefoneContato', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="canal-entrada">Canal de Entrada</Label>
              <Input
                type="text"
                id="canal-entrada"
                value={formData.canalEntrada}
                onChange={(e) => handleInputChange('canalEntrada', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="consultor-responsavel">Consultor Responsável</Label>
              <Input
                type="text"
                id="consultor-responsavel"
                value={formData.consultorResponsavel}
                onChange={(e) => handleInputChange('consultorResponsavel', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                type="text"
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <Label htmlFor="produtos-servicos">Produtos/Serviços de Interesse</Label>
              <Textarea
                id="produtos-servicos"
                value={formData.produtosServicos}
                onChange={(e) => handleInputChange('produtosServicos', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="concorrentes">Concorrentes Identificados</Label>
              <Textarea
                id="concorrentes"
                value={formData.concorrentes}
                onChange={(e) => handleInputChange('concorrentes', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="estrategia-proposta">Estratégia da Proposta</Label>
              <Textarea
                id="estrategia-proposta"
                value={formData.estrategiaProposta}
                onChange={(e) => handleInputChange('estrategiaProposta', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-5">
            <Switch
              id="ativo"
              checked={formData.ativo}
              onCheckedChange={(checked) => handleInputChange('ativo', checked)}
            />
            <Label htmlFor="ativo">Ativo</Label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>

        {/* Modal de Gerenciar Segmentos */}
        <GerenciarSegmentosModal 
          isOpen={mostrarGerenciarSegmentos}
          onClose={() => setMostrarGerenciarSegmentos(false)}
        />
      </div>
    </div>
  );
};

export default OportunidadeAvancadaForm;
