import { useState } from "react";
import { gerarCertificadoTreinamento } from "@/utils/certificado-generator";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrdemServico, TipoOS, StatusOS, OpcaoAtendimento } from "@/types/assessoria-cientifica";
import { getTipoOSLabel } from "@/data/assessoria-cientifica";
import { AssinaturaDigital } from "./AssinaturaDigital";
import { toast } from "sonner";

interface FormularioOSProps {
  os: OrdemServico | null;
  isNew: boolean;
  onClose: () => void;
}

export function FormularioOS({ os, isNew, onClose }: FormularioOSProps) {
  const [formData, setFormData] = useState({
    cliente: os?.cliente || "",
    projeto: os?.projeto || "",
    equipamento: os?.equipamento || "",
    numeroSerieLote: os?.numeroSerieLote || "",
    versaoSoftware: os?.versaoSoftware || "",
    versaoWindows: os?.versaoWindows || "",
    setorAlocacao: os?.setorAlocacao || "",
    opcaoAtendimento: (os?.opcaoAtendimento || "presencial") as OpcaoAtendimento,
    tipos: os?.tipo || [],
    descricaoServico: os?.descricaoServico || "",
    servicoRealizado: os?.servicoRealizado || "",
    observacoes: os?.observacoes || "",
    status: (os?.status || "ABERTA") as StatusOS,
    responsavel: os?.responsavel || "",
    participantes: os?.participantes || [],
    editalAnexo: os?.editalAnexo || "",
  });

  const [showAssinatura, setShowAssinatura] = useState(false);
  const [participantesText, setParticipantesText] = useState(
    os?.participantes?.join(", ") || ""
  );

  // Verificar se é análise de edital
  const isAnaliseEdital = formData.tipos.includes("analise_edital");
  
  // Verificar se é treinamento
  const isTreinamento = formData.tipos.some(tipo => 
    tipo === "treinamento_inicial" || tipo === "treinamento_nova_equipe"
  );

  const tiposOS: TipoOS[] = [
    "suporte_operacional",
    "acompanhamento_rotina",
    "treinamento_inicial",
    "treinamento_nova_equipe",
    "analise_edital",
  ];

  const handleTipoChange = (tipo: TipoOS) => {
    setFormData((prev) => ({
      ...prev,
      tipos: prev.tipos.includes(tipo)
        ? prev.tipos.filter((t) => t !== tipo)
        : [...prev.tipos, tipo],
    }));
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.cliente || !formData.descricaoServico) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    if (formData.tipos.length === 0) {
      toast.error("Selecione pelo menos um tipo de OS");
      return;
    }

    // Converter participantes de texto para array
    const participantesArray = participantesText
      .split(",")
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Aqui implementar salvamento (localStorage para offline, sync depois)
    toast.success(isNew ? "OS criada com sucesso" : "OS atualizada com sucesso");
    onClose();
  };

  const handleEmitirCertificado = () => {
    if (!isTreinamento) {
      toast.error("Esta funcionalidade é apenas para OS de treinamento");
      return;
    }
    
    if (formData.status !== "CONCLUÍDA") {
      toast.error("O treinamento precisa estar concluído para emitir certificado");
      return;
    }

    const participantesArray = participantesText
      .split(",")
      .map(p => p.trim())
      .filter(p => p.length > 0);

    if (participantesArray.length === 0) {
      toast.error("Adicione pelo menos um participante");
      return;
    }

    // Gerar o PDF do certificado
    if (os) {
      gerarCertificadoTreinamento({
        ...os,
        ...formData,
        participantes: participantesArray,
      });
    }
    
    toast.success(`Certificado gerado com sucesso! O download foi iniciado automaticamente.`);
  };

  const canShowAssinatura =
    formData.opcaoAtendimento === "presencial" && 
    (formData.status === "CONCLUÍDA" || !isNew);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold">
              {isNew ? "Nova Ordem de Serviço" : `OS ${os?.numero}`}
            </h2>
            {!isNew && (
              <p className="text-sm text-muted-foreground">
                Aberta em {os?.abertoEm ? new Date(os.abertoEm).toLocaleDateString() : ""}
              </p>
            )}
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
        {isTreinamento && formData.status === "CONCLUÍDA" && (
          <Button onClick={handleEmitirCertificado} variant="secondary">
            Emitir Certificado
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna Esquerda */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente *</Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              placeholder="Buscar cliente..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projeto">Projeto</Label>
            <Select
              value={formData.projeto || ""}
              onValueChange={(value) => setFormData({ ...formData, projeto: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o projeto..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proj-001">Projeto Hospitalar Central</SelectItem>
                <SelectItem value="proj-002">Projeto Pesquisa Genômica</SelectItem>
                <SelectItem value="proj-003">Expansão Clínica Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipamento">Equipamento</Label>
            <Input
              id="equipamento"
              value={formData.equipamento}
              onChange={(e) => setFormData({ ...formData, equipamento: e.target.value })}
              placeholder="Selecionar equipamento..."
              disabled={isAnaliseEdital}
            />
          </div>

          {!isAnaliseEdital && (
            <>
              <div className="space-y-2">
                <Label htmlFor="numeroSerieLote">Nº de Série/Lote</Label>
                <Input
                  id="numeroSerieLote"
                  value={formData.numeroSerieLote}
                  onChange={(e) => setFormData({ ...formData, numeroSerieLote: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="versaoSoftware">Versão Software</Label>
                  <Input
                    id="versaoSoftware"
                    value={formData.versaoSoftware}
                    onChange={(e) => setFormData({ ...formData, versaoSoftware: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="versaoWindows">Versão do Windows</Label>
                  <Input
                    id="versaoWindows"
                    value={formData.versaoWindows}
                    onChange={(e) => setFormData({ ...formData, versaoWindows: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="setorAlocacao">Setor de Alocação</Label>
                <Input
                  id="setorAlocacao"
                  value={formData.setorAlocacao}
                  onChange={(e) => setFormData({ ...formData, setorAlocacao: e.target.value })}
                />
              </div>
            </>
          )}

          {isAnaliseEdital && (
            <div className="space-y-2">
              <Label htmlFor="editalAnexo">Anexar Edital *</Label>
              <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center bg-primary/5">
                <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arraste o edital ou clique para selecionar
                </p>
                <Button variant="outline" size="sm">
                  Selecionar Edital
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Opção de Atendimento *</Label>
            <RadioGroup
              value={formData.opcaoAtendimento}
              onValueChange={(value) =>
                setFormData({ ...formData, opcaoAtendimento: value as OpcaoAtendimento })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="presencial" id="presencial" />
                <Label htmlFor="presencial" className="cursor-pointer">
                  Presencial
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remoto" id="remoto" />
                <Label htmlFor="remoto" className="cursor-pointer">
                  Remoto
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Tipo da OS * (Múltipla escolha)</Label>
            <div className="space-y-2 border rounded-lg p-4">
              {tiposOS.map((tipo) => (
                <div key={tipo} className="flex items-center space-x-2">
                  <Checkbox
                    id={tipo}
                    checked={formData.tipos.includes(tipo)}
                    onCheckedChange={() => handleTipoChange(tipo)}
                  />
                  <Label htmlFor={tipo} className="cursor-pointer">
                    {getTipoOSLabel(tipo)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input
              id="responsavel"
              value={formData.responsavel}
              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
              placeholder="Selecionar responsável..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as StatusOS })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ABERTA">Aberta</SelectItem>
                <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                <SelectItem value="CONCLUÍDA">Concluída</SelectItem>
                <SelectItem value="URGENTE">Urgente</SelectItem>
                <SelectItem value="CANCELADA">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricaoServico">Descrição do Serviço *</Label>
            <Textarea
              id="descricaoServico"
              value={formData.descricaoServico}
              onChange={(e) => setFormData({ ...formData, descricaoServico: e.target.value })}
              rows={4}
              placeholder="Descreva o motivo da abertura da OS..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicoRealizado">Serviço Realizado</Label>
            <Textarea
              id="servicoRealizado"
              value={formData.servicoRealizado}
              onChange={(e) => setFormData({ ...formData, servicoRealizado: e.target.value })}
              rows={4}
              placeholder="Descreva o que foi realizado..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Gerais</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              rows={3}
            />
          </div>

          {isTreinamento && (
            <div className="space-y-2">
              <Label htmlFor="participantes">
                Participantes do Treinamento {formData.status === "CONCLUÍDA" && "*"}
              </Label>
              <Textarea
                id="participantes"
                value={participantesText}
                onChange={(e) => setParticipantesText(e.target.value)}
                rows={3}
                placeholder="Digite os nomes separados por vírgula&#10;Ex: João Silva, Maria Santos, Pedro Oliveira"
              />
              <p className="text-xs text-muted-foreground">
                Necessário para emissão de certificados
              </p>
            </div>
          )}

          {!isAnaliseEdital && (
            <div className="space-y-2">
              <Label>Anexos</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arraste arquivos ou clique para selecionar
                </p>
                <Button variant="outline" size="sm">
                  Selecionar Arquivos
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção de Assinatura */}
      {canShowAssinatura && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Assinatura Digital</h3>
            {!showAssinatura && (
              <Button onClick={() => setShowAssinatura(true)} variant="outline">
                Adicionar Assinatura
              </Button>
            )}
          </div>
          {showAssinatura && (
            <AssinaturaDigital
              onSave={(assinatura) => {
                console.log("Assinatura salva:", assinatura);
                toast.success("Assinatura registrada com sucesso");
                setShowAssinatura(false);
              }}
              onCancel={() => setShowAssinatura(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
