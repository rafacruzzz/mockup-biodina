import { useState, useEffect } from "react";
import { gerarCertificadoTreinamento } from "@/utils/certificado-generator";
import { ArrowLeft, Upload, Save, Search, CheckCircle, XCircle, Lock, FileText, Plus, Trash2 } from "lucide-react";
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
import { AssinaturaDigital } from "./AssinaturaDigital";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buscarEquipamentos } from "@/data/equipamentos";
import { TemplateTrainamentoDxH520 } from "./templates/TemplateTrainamentoDxH520";
import { TemplateTrainamentoABL800 } from "./templates/TemplateTrainamentoABL800";
import { TemplateTrainamentoABL90 } from "./templates/TemplateTrainamentoABL90";
import { TemplateTrainamentoABL9 } from "./templates/TemplateTrainamentoABL9";
import { TemplateTrainamentoAQT90 } from "./templates/TemplateTrainamentoAQT90";
import { TemplateTrainamentoOsmoTECH } from "./templates/TemplateTrainamentoOsmoTECH";
import { TemplateTrainamentoExcelsior } from "./templates/TemplateTrainamentoExcelsior";
import { AssinaturaPad } from "@/components/ui/assinatura-pad";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Projeto {
  id: string;
  numeroProcesso: string;
  tipo: 'importacao' | 'contratacao';
  cliente: string;
  cnpj: string;
  status: string;
  valorTotal: number;
  responsavel?: string;
  segmento?: string;
}

const mockProjetos: Projeto[] = [
  {
    id: "IMP-2024-001",
    numeroProcesso: "001",
    tipo: "importacao",
    cliente: "Hospital Albert Einstein",
    cnpj: "60.765.823/0001-30",
    status: "Em Andamento",
    valorTotal: 150000,
    responsavel: "João Silva",
    segmento: "Hospital Privado"
  },
  {
    id: "IMP-2024-002",
    numeroProcesso: "002",
    tipo: "importacao",
    cliente: "Hospital Sírio-Libanês",
    cnpj: "61.870.001/0001-09",
    status: "Concluída",
    valorTotal: 250000,
    responsavel: "Maria Santos",
    segmento: "Hospital Privado"
  },
  {
    id: "IMP-2024-003",
    numeroProcesso: "003",
    tipo: "importacao",
    cliente: "INCA - Instituto Nacional de Câncer",
    cnpj: "00.394.544/0124-52",
    status: "Em Andamento",
    valorTotal: 180000,
    responsavel: "Pedro Costa",
    segmento: "Hospital Público"
  },
  {
    id: "CON-2024-012",
    numeroProcesso: "012",
    tipo: "contratacao",
    cliente: "Clínica São Camilo",
    cnpj: "08.910.080/0001-55",
    status: "Assinado",
    valorTotal: 95000,
    responsavel: "Roberto Alves",
    segmento: "Clínica Privada"
  },
  {
    id: "CON-2024-015",
    numeroProcesso: "015",
    tipo: "contratacao",
    cliente: "Hospital Memorial",
    cnpj: "02.558.157/0001-62",
    status: "Em Negociação",
    valorTotal: 175000,
    responsavel: "Fernanda Rocha",
    segmento: "Hospital Privado"
  },
  {
    id: "CON-2024-020",
    numeroProcesso: "020",
    tipo: "contratacao",
    cliente: "Centro Oncológico Integrado",
    cnpj: "11.222.333/0001-44",
    status: "Concluído",
    valorTotal: 210000,
    responsavel: "Lucas Ferreira",
    segmento: "Centro Especializado"
  }
];

interface FormularioOSProps {
  os: OrdemServico | null;
  isNew: boolean;
  onClose: () => void;
}

const gerarNumeroOS = (): string => {
  const ano = new Date().getFullYear();
  const sequencial = Math.floor(Math.random() * 9999) + 1;
  return `OS-${ano}-${sequencial.toString().padStart(4, '0')}`;
};

export function FormularioOS({ os, isNew, onClose }: FormularioOSProps) {
  const [tipoProjeto, setTipoProjeto] = useState<string>("");
  const [projetoSearch, setProjetoSearch] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [numeroOS] = useState(isNew ? gerarNumeroOS() : os?.numeroOS || gerarNumeroOS());
  const [dataHoraAbertura] = useState(new Date());
  const [dataHoraFechamento, setDataHoraFechamento] = useState<Date | undefined>(os?.dataHoraFechamento);
  
  const [formData, setFormData] = useState({
    cliente: os?.cliente || "",
    clienteId: os?.clienteId,
    equipamento: os?.equipamento || "",
    equipamentoId: os?.equipamentoId,
    numeroSerieLote: os?.numeroSerieLote || "",
    versaoSoftware: os?.versaoSoftware || "",
    versaoWindows: os?.versaoWindows || "",
    setorAlocacao: os?.setorAlocacao || "",
    descricaoServico: os?.descricaoServico || "",
    status: os?.status || "ABERTA" as StatusOS,
    opcaoAtendimento: os?.opcaoAtendimento || "presencial" as OpcaoAtendimento,
    responsavel: os?.responsavel || "",
    observacoes: os?.observacoes || "",
  });

  const [tiposSelecionados, setTiposSelecionados] = useState<TipoOS[]>(os?.tipo || []);
  const [participante, setParticipante] = useState("");
  const [listaParticipantes, setListaParticipantes] = useState<string[]>(os?.participantes || []);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateData, setTemplateData] = useState({ dataRegistro: "", nomeInstrutor: "", observacoes: "" });
  const [assinaturaInstrutor, setAssinaturaInstrutor] = useState<string | null>(null);
  const [assinaturasParticipantes, setAssinaturasParticipantes] = useState<Record<number, string>>({});
  const [checklistMeterOmega, setChecklistMeterOmega] = useState<Record<string, boolean>>({});
  const [checklistSetMedikal, setChecklistSetMedikal] = useState<Record<string, boolean>>({});
  const [checklistABL9, setChecklistABL9] = useState<Record<string, boolean>>({});
  const [checklistABL90, setChecklistABL90] = useState<Record<string, boolean>>({});
  const [checklistABL800, setChecklistABL800] = useState<Record<string, boolean>>({});
  const [checklistAQT90, setChecklistAQT90] = useState<Record<string, boolean>>({});
  const [checklistDxH520, setChecklistDxH520] = useState<Record<string, boolean>>({});
  const [checklistExcelsiorAS, setChecklistExcelsiorAS] = useState<Record<string, boolean>>({});
  const [checklistOsmoTech, setChecklistOsmoTech] = useState<Record<string, boolean>>({});

  const tiposOS: { value: TipoOS; label: string }[] = [
    { value: "suporte_operacional", label: "Suporte Operacional" },
    { value: "acompanhamento_rotina", label: "Acompanhamento de Rotina" },
    { value: "treinamento_inicial", label: "Treinamento Inicial" },
    { value: "treinamento_nova_equipe", label: "Treinamento de Nova Equipe" },
    { value: "treinamento_usuario_meteromega", label: "Treinamento de Usuário: Modelo MeterOmega" },
    { value: "treinamento_usuario_setmedikal", label: "Treinamento de Usuário: Modelo SET Medikal" },
    { value: "treinamento_usuario_abl9", label: "Treinamento de Usuário: Modelo ABL9 - Radiometer" },
    { value: "treinamento_usuario_abl90", label: "Treinamento de Usuário: Modelo ABL90 FLEX PLUS - Radiometer" },
    { value: "treinamento_usuario_abl800", label: "Treinamento de Usuário: Modelo ABL800 - Radiometer" },
    { value: "treinamento_usuario_aqt90", label: "Treinamento de Usuário: Modelo AQT90 FLEX - Radiometer" },
    { value: "treinamento_usuario_dxh520", label: "Treinamento de Usuário: DxH 520 – Beckman Coulter" },
    { value: "treinamento_usuario_excelsior_as", label: "Treinamento de Usuário: Excelsior AS" },
    { value: "treinamento_usuario_osmotech", label: "Treinamento de Usuário: Osmômetro modelo OsmoTech" },
  ];

  const equipamentosDisponiveis = formData.clienteId 
    ? buscarEquipamentos("").filter(eq => eq.clienteAtualId === formData.clienteId)
    : buscarEquipamentos("");

  const handleEquipamentoChange = (equipamentoId: string) => {
    const equipamento = buscarEquipamentos("").find(eq => eq.id === equipamentoId);
    if (equipamento) {
      setFormData({
        ...formData,
        equipamentoId: equipamento.id,
        equipamento: equipamento.modelo,
        numeroSerieLote: equipamento.numeroSerie,
        versaoSoftware: equipamento.versaoSoftware || "",
        versaoWindows: equipamento.versaoWindows || "",
        setorAlocacao: equipamento.setorAlocacao,
      });
    }
  };

  useEffect(() => {
    if (formData.status === "CONCLUÍDA" && !dataHoraFechamento) {
      setDataHoraFechamento(new Date());
    }
  }, [formData.status, dataHoraFechamento]);

  const handleTipoToggle = (tipo: TipoOS) => {
    setTiposSelecionados(prev => 
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
  };

  const handleVincularProjeto = (projeto: Projeto) => {
    setSelectedProjeto(projeto);
    setFormData({
      ...formData,
      cliente: projeto.cliente,
      clienteId: projeto.id,
    });
    setShowSuggestions(false);
    setProjetoSearch("");
  };

  const handleDesvincular = () => {
    setSelectedProjeto(null);
    setFormData({
      ...formData,
      cliente: "",
      clienteId: undefined,
    });
  };

  const projetosFiltrados = mockProjetos.filter(projeto => {
    if (tipoProjeto && projeto.tipo !== tipoProjeto) return false;
    if (projetoSearch) {
      const search = projetoSearch.toLowerCase();
      return (
        projeto.id.toLowerCase().includes(search) ||
        projeto.cliente.toLowerCase().includes(search) ||
        projeto.numeroProcesso.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const getTipoProjetoLabel = (tipo: string) => {
    return tipo === "importacao" ? "Importação Direta" : "Contratação";
  };

  const handleSave = () => {
    if (!selectedProjeto) {
      toast.error("Vinculação de Projeto é obrigatória");
      return;
    }

    if (!formData.cliente) {
      toast.error("Cliente é obrigatório");
      return;
    }

    if (tiposSelecionados.length === 0) {
      toast.error("Selecione ao menos um tipo de OS");
      return;
    }

    const ehTreinamento = tiposSelecionados.some(t => 
      t === "treinamento_inicial" || t === "treinamento_nova_equipe"
    );

    if (ehTreinamento && listaParticipantes.length === 0) {
      toast.error("Treinamentos requerem ao menos um participante");
      return;
    }

    console.log("Salvando OS...", {
      numeroOS,
      dataHoraAbertura,
      dataHoraFechamento,
      formData,
      tiposSelecionados,
      participantes: listaParticipantes,
    });
    
    toast.success(isNew ? "OS criada com sucesso!" : "OS atualizada com sucesso!");
    onClose();
  };

  const handleAdicionarParticipante = () => {
    if (participante.trim()) {
      setListaParticipantes([...listaParticipantes, participante.trim()]);
      setParticipante("");
    }
  };

  const handleRemoverParticipante = (index: number) => {
    setListaParticipantes(listaParticipantes.filter((_, i) => i !== index));
  };

  const handleEmitirCertificado = () => {
    if (listaParticipantes.length === 0) {
      toast.error("Adicione participantes antes de emitir o certificado");
      return;
    }

    const osParaCertificado: OrdemServico = {
      id: os?.id || "temp-id",
      numero: numeroOS,
      tipo: tiposSelecionados,
      status: formData.status,
      departamento: "Assessoria Científica",
      cliente: formData.cliente,
      equipamento: formData.equipamento,
      numeroSerieLote: formData.numeroSerieLote,
      descricaoServico: formData.descricaoServico,
      responsavel: formData.responsavel,
      abertoEm: dataHoraAbertura,
      participantes: listaParticipantes,
      opcaoAtendimento: formData.opcaoAtendimento,
      abertoPor: "Assessor",
      dataAgendada: dataHoraAbertura,
      atualizadoEm: new Date(),
      statusBaixaFiscal: "Nao Aplicavel",
    };

    gerarCertificadoTreinamento(osParaCertificado);
    toast.success("Certificado gerado com sucesso!");
  };

  const templatesDisponiveis = [
    { id: "meteromega", nome: "MeterOmega", badge: "Coleta" },
    { id: "setmedikal", nome: "SET Medikal", badge: "Coleta" },
    { id: "abl9", nome: "ABL9", badge: "Gasometria Premium" },
    { id: "abl90", nome: "ABL90 FLEX", badge: "Gasometria Avançada" },
    { id: "abl800", nome: "ABL800 FLEX", badge: "Gasometria" },
    { id: "aqt90", nome: "AQT 90 FLEX", badge: "Química Clínica" },
    { id: "dxh520", nome: "DxH 520", badge: "Hematologia" },
    { id: "excelsior", nome: "Excelsior Thermo Fisher Epredia", badge: "Histologia" },
    { id: "osmotech", nome: "OsmoTECH", badge: "Osmometria" },
  ];

  const renderSelectedTemplate = () => {
    const props = {
      dataRegistro: templateData.dataRegistro,
      nomeInstrutor: templateData.nomeInstrutor,
      observacoes: templateData.observacoes,
      onChangeData: (v: string) => setTemplateData(p => ({ ...p, dataRegistro: v })),
      onChangeInstrutor: (v: string) => setTemplateData(p => ({ ...p, nomeInstrutor: v })),
      onChangeObservacoes: (v: string) => setTemplateData(p => ({ ...p, observacoes: v })),
    };
    switch (selectedTemplate) {
      case "dxh520": return <TemplateTrainamentoDxH520 {...props} />;
      case "abl800": return <TemplateTrainamentoABL800 {...props} />;
      case "abl90": return <TemplateTrainamentoABL90 {...props} />;
      case "abl9": return <TemplateTrainamentoABL9 {...props} />;
      case "aqt90": return <TemplateTrainamentoAQT90 {...props} />;
      case "osmotech": return <TemplateTrainamentoOsmoTECH {...props} />;
      case "excelsior": return <TemplateTrainamentoExcelsior {...props} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onClose} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">
            {isNew ? "Nova Ordem de Serviço" : "Editar Ordem de Serviço"}
          </h2>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>

      {/* Campos Automáticos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Informações Automáticas da OS
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Número da OS</Label>
            <div className="flex items-center gap-2">
              <Input value={numeroOS} readOnly className="bg-muted" />
              <Badge variant="secondary">Auto</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Data/Hora de Abertura</Label>
            <div className="flex items-center gap-2">
              <Input 
                value={format(dataHoraAbertura, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} 
                readOnly 
                className="bg-muted" 
              />
              <Badge variant="secondary">Auto</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Data/Hora de Fechamento</Label>
            <div className="flex items-center gap-2">
              <Input 
                value={dataHoraFechamento 
                  ? format(dataHoraFechamento, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                  : "Não concluída"
                } 
                readOnly 
                className="bg-muted" 
              />
              <Badge variant="secondary">Auto</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vinculação de Projeto */}
      <Card>
        <CardHeader>
          <CardTitle>Vinculação de Projeto *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Projeto</Label>
                <Select value={tipoProjeto} onValueChange={setTipoProjeto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="importacao">Importação Direta</SelectItem>
                    <SelectItem value="contratacao">Contratação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Buscar Projeto</Label>
                <div className="relative">
                  <Input
                    placeholder="Buscar por ID, processo ou cliente..."
                    value={projetoSearch}
                    onChange={(e) => setProjetoSearch(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    disabled={!tipoProjeto}
                  />
                  <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Sugestões de projetos */}
            {showSuggestions && tipoProjeto && (
              <div className="border rounded-lg max-h-64 overflow-y-auto bg-background z-50">
                {projetosFiltrados.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum projeto encontrado
                  </div>
                ) : (
                  projetosFiltrados.map((projeto) => (
                    <div
                      key={projeto.id}
                      className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                      onClick={() => handleVincularProjeto(projeto)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{projeto.id}</p>
                          <p className="text-sm text-muted-foreground">{projeto.cliente}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getTipoProjetoLabel(projeto.tipo)} • {projeto.status}
                          </p>
                        </div>
                        <Badge variant="outline">{projeto.numeroProcesso}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Projeto selecionado */}
            {selectedProjeto && (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900 dark:text-green-100">
                      Vinculado: {selectedProjeto.id} - {selectedProjeto.cliente}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      {getTipoProjetoLabel(selectedProjeto.tipo)} • {selectedProjeto.status}
                    </p>
                    {selectedProjeto.responsavel && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Responsável: {selectedProjeto.responsavel}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDesvincular}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {!selectedProjeto && !tipoProjeto && (
              <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                💡 Selecione o tipo de projeto para visualizar as opções disponíveis
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna Esquerda */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente *</Label>
            <div className="relative">
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                placeholder="Buscar cliente..."
                disabled={selectedProjeto !== null}
                className={selectedProjeto ? "bg-muted pr-10" : ""}
              />
              {selectedProjeto && (
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {selectedProjeto && (
              <p className="text-xs text-muted-foreground">
                Preenchido automaticamente do projeto vinculado
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipamento">Equipamento</Label>
            <Select 
              value={formData.equipamentoId} 
              onValueChange={handleEquipamentoChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ex: ABL800 FLEX, DxH 520, AQT 90 FLEX" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {equipamentosDisponiveis.map((eq) => (
                  <SelectItem key={eq.id} value={eq.id}>
                    {eq.modelo} - {eq.numeroSerie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.clienteId && equipamentosDisponiveis.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum equipamento vinculado a este cliente
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="numeroSerieLote">Nº de Série/Lote</Label>
            <Input
              id="numeroSerieLote"
              value={formData.numeroSerieLote}
              readOnly
              className="bg-muted"
              placeholder="Preenchido ao selecionar equipamento"
            />
            <p className="text-xs text-muted-foreground">
              Preenchido automaticamente ao selecionar o equipamento
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="versaoSoftware">Versão Software</Label>
              <Input
                id="versaoSoftware"
                value={formData.versaoSoftware}
                readOnly
                className="bg-muted"
                placeholder="Preenchido ao selecionar equipamento"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="versaoWindows">Versão do Windows</Label>
              <Input
                id="versaoWindows"
                value={formData.versaoWindows}
                readOnly
                className="bg-muted"
                placeholder="Preenchido ao selecionar equipamento"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Informações técnicas preenchidas automaticamente
          </p>

          <div className="space-y-2">
            <Label htmlFor="setorAlocacao">Setor de Alocação</Label>
            <Input
              id="setorAlocacao"
              value={formData.setorAlocacao}
              readOnly
              className="bg-muted"
              placeholder="Preenchido ao selecionar equipamento"
            />
            <p className="text-xs text-muted-foreground">
              Preenchido automaticamente ao selecionar o equipamento
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricaoServico">Descrição do Serviço *</Label>
            <Textarea
              id="descricaoServico"
              value={formData.descricaoServico}
              onChange={(e) => setFormData({ ...formData, descricaoServico: e.target.value })}
              placeholder="Descreva o serviço a ser realizado..."
              rows={4}
            />
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Tipo de OS *</Label>
            <div className="space-y-2">
              {tiposOS.map((tipo) => (
                <div key={tipo.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={tipo.value}
                    checked={tiposSelecionados.includes(tipo.value)}
                    onCheckedChange={() => handleTipoToggle(tipo.value)}
                  />
                  <Label htmlFor={tipo.value} className="font-normal cursor-pointer">
                    {tipo.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value: StatusOS) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="ABERTA">Aberta</SelectItem>
                <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                <SelectItem value="CONCLUÍDA">Concluída</SelectItem>
                <SelectItem value="URGENTE">Urgente</SelectItem>
                <SelectItem value="CANCELADA">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Opção de Atendimento</Label>
            <RadioGroup
              value={formData.opcaoAtendimento}
              onValueChange={(value: OpcaoAtendimento) =>
                setFormData({ ...formData, opcaoAtendimento: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="presencial" id="presencial" />
                <Label htmlFor="presencial" className="font-normal cursor-pointer">
                  Presencial
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remoto" id="remoto" />
                <Label htmlFor="remoto" className="font-normal cursor-pointer">
                  Remoto
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input
              id="responsavel"
              value={formData.responsavel}
              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
              placeholder="Nome do responsável"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Observações adicionais..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Registro de Treinamento */}
      {tiposSelecionados.some(t => t === "treinamento_inicial" || t === "treinamento_nova_equipe") && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Registro de Treinamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">Selecione o registro de treinamento:</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {templatesDisponiveis.map((t) => (
                    <div
                      key={t.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-primary ${
                        selectedTemplate === t.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border"
                      }`}
                      onClick={() => setSelectedTemplate(selectedTemplate === t.id ? null : t.id)}
                    >
                      <p className="font-medium text-sm">{t.nome}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{t.badge}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTemplate && (
                <div className="mt-4">
                  {renderSelectedTemplate()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Checklist MeterOmega */}
          {selectedTemplate === "meteromega" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "heparina_jateada", label: "Heparina jateada" },
                    { key: "heparina_balanceada", label: "Heparina balanceada para eletrólitos" },
                    { key: "tampa_pino", label: "Tampa com pino interno para eliminação de ar" },
                    { key: "extremidade_luer", label: "Extremidade luer lock" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mo-${item.key}`}
                        checked={!!checklistMeterOmega[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistMeterOmega((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`mo-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Utilização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "volume_minmax", label: "Volume mínimo e máximo da coleta" },
                    { key: "expulsao_bolhas", label: "Expulsão de bolhas de ar batendo na seringa" },
                    { key: "eliminacao_ar", label: "Eliminação do ar" },
                    { key: "colocacao_tampa", label: "Colocação da tampa" },
                    { key: "homogeneizacao", label: "Homogeneização manual imediatamente" },
                    { key: "transporte_armazenamento", label: "Transporte e armazenamento" },
                    { key: "tempo_execucao", label: "Tempo até a execução da análise" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mo-${item.key}`}
                        checked={!!checklistMeterOmega[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistMeterOmega((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`mo-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist ABL9 - Radiometer */}
          {selectedTemplate === "abl9" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "entrada_amostras", label: "Entrada de amostras" },
                    { key: "codigo_barras", label: "Código de barras" },
                    { key: "impressora", label: "Impressora" },
                    { key: "cassete_eletrodos", label: "Cassete de eletrodos e pack de soluções" },
                    { key: "registro_dados_usb", label: "Recursos para registro de dados externo e entradas USB" },
                    { key: "ligar_desligar", label: "Ligar e desligar o analisador" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl9-${item.key}`}
                        checked={!!checklistABL9[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL9((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl9-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tela</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "layout_tela", label: "Apresentação do layout" },
                    { key: "interpretacao_mensagens", label: "Interpretação de mensagens" },
                    { key: "registro_dados", label: "Uso do registro de dados" },
                    { key: "tutorial", label: "Uso do tutorial" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl9-${item.key}`}
                        checked={!!checklistABL9[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL9((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl9-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trocas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "troca_cassete", label: "Cassete de eletrodos e pack de soluções" },
                    { key: "troca_papel", label: "Papel" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl9-${item.key}`}
                        checked={!!checklistABL9[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL9((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl9-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Qualidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "utilizacao_cq", label: "Utilização do controle de qualidade" },
                    { key: "cadastro_lote_ampolas", label: "Cadastro de lote de ampolas" },
                    { key: "cq_externo", label: "Uso de controle de qualidade externo" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl9-${item.key}`}
                        checked={!!checklistABL9[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL9((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl9-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Processamento de Amostra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "inserir_amostra", label: "Inserir amostra" },
                    { key: "preenchimento_cadastro", label: "Preenchimento do cadastro" },
                    { key: "resultado_interpretacao", label: "Resultado e interpretação de mensagens" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl9-${item.key}`}
                        checked={!!checklistABL9[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL9((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl9-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist ABL90 FLEX PLUS - Radiometer */}
          {selectedTemplate === "abl90" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "entrada_amostras_90", label: "Entrada de amostras" },
                    { key: "codigo_barras_90", label: "Código de barras" },
                    { key: "impressora_90", label: "Impressora" },
                    { key: "cassete_eletrodos_90", label: "Cassete de eletrodos e pack de soluções" },
                    { key: "registro_dados_usb_90", label: "Recursos para registro de dados externo e entradas USB" },
                    { key: "portabilidade_bateria", label: "Portabilidade e uso com bateria" },
                    { key: "ligar_desligar_90", label: "Ligar e desligar o analisador" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl90-${item.key}`}
                        checked={!!checklistABL90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tela</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "layout_tela_90", label: "Apresentação do layout" },
                    { key: "interpretacao_semaforo", label: "Interpretação do semáforo" },
                    { key: "interpretacao_mensagens_90", label: "Interpretação de mensagens" },
                    { key: "registro_dados_90", label: "Uso do registro de dados" },
                    { key: "tutorial_90", label: "Uso do tutorial" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl90-${item.key}`}
                        checked={!!checklistABL90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trocas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "troca_cassete_90", label: "Cassete de eletrodos e pack de soluções" },
                    { key: "troca_papel_90", label: "Papel" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl90-${item.key}`}
                        checked={!!checklistABL90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Qualidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "cq_automatico", label: "Utilização do controle de qualidade automático" },
                    { key: "cq_nao_programavel", label: "Medição de controle de qualidade não programável" },
                    { key: "cq_externo_90", label: "Uso de controle de qualidade externo" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl90-${item.key}`}
                        checked={!!checklistABL90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Processamento de Amostra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "inserir_amostra_90", label: "Inserir amostra" },
                    { key: "preenchimento_cadastro_90", label: "Preenchimento do cadastro" },
                    { key: "resultado_interpretacao_90", label: "Resultado e interpretação de mensagens" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl90-${item.key}`}
                        checked={!!checklistABL90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Limpeza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "limpeza_dispositivo_entrada", label: "Limpeza do dispositivo de entrada" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl90-${item.key}`}
                        checked={!!checklistABL90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist ABL800 - Radiometer */}
          {selectedTemplate === "abl800" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "entrada_amostras_800", label: "Entrada de amostras" },
                    { key: "codigo_barras_800", label: "Código de barras" },
                    { key: "impressora_800", label: "Impressora" },
                    { key: "frascos_solucoes_gas", label: "Frascos, soluções e cilindros de gás" },
                    { key: "registro_dados_cd_usb", label: "Recursos para registro de dados externo, utilizando CD e/ou entradas USB" },
                    { key: "eletrodos_membranas", label: "Eletrodos e membranas" },
                    { key: "co_oximetro", label: "Co-oxímetro" },
                    { key: "ligar_desligar_800", label: "Ligar e desligar o analisador" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl800-${item.key}`}
                        checked={!!checklistABL800[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL800((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl800-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tela</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "layout_tela_800", label: "Apresentação do layout" },
                    { key: "interpretacao_semaforo_800", label: "Interpretação do semáforo" },
                    { key: "interpretacao_mensagens_800", label: "Interpretação de mensagens" },
                    { key: "registro_dados_800", label: "Uso do registro de dados" },
                    { key: "tutorial_800", label: "Uso do tutorial" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl800-${item.key}`}
                        checked={!!checklistABL800[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL800((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl800-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trocas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "troca_frascos_gas", label: "Frascos e gás" },
                    { key: "troca_papel_800", label: "Papel" },
                    { key: "troca_membranas", label: "Membranas" },
                    { key: "troca_ampolas_cq", label: "Ampolas de controle de qualidade" },
                    { key: "troca_dispositivo_entrada", label: "Dispositivo de entrada" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl800-${item.key}`}
                        checked={!!checklistABL800[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL800((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl800-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Qualidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "cq_utilizacao_800", label: "Utilização do controle de qualidade" },
                    { key: "cq_nao_programado", label: "Medição de controle de qualidade não programado" },
                    { key: "cq_cadastro_lote_ampola", label: "Cadastro de lote de ampola" },
                    { key: "cq_externo_800", label: "Uso de controle de qualidade externo" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl800-${item.key}`}
                        checked={!!checklistABL800[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL800((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl800-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Processamento de Amostra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "inserir_amostra_800", label: "Inserir amostra" },
                    { key: "preenchimento_cadastro_800", label: "Preenchimento do cadastro" },
                    { key: "resultado_interpretacao_800", label: "Resultado e interpretação de mensagens" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl800-${item.key}`}
                        checked={!!checklistABL800[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL800((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl800-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Solução Desproteinizante</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "solucao_desproteinizante", label: "Utilização da Solução desproteinizante" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`abl800-${item.key}`}
                        checked={!!checklistABL800[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistABL800((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`abl800-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist DxH 520 – Beckman Coulter */}
          {selectedTemplate === "dxh520" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "entrada_amostras", label: "Entrada de amostras (modo aberto/fechado)" },
                    { key: "codigo_barras", label: "Código de barras" },
                    { key: "impressora", label: "Impressora" },
                    { key: "entrada_reagentes", label: "Entrada de reagentes" },
                    { key: "ligar_desligar", label: "Ligar e desligar o analisador" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trocas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "reagentes_com_sem_barras", label: "Reagentes com código de barras e sem código de barras" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Qualidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "utilizacao_cq", label: "Utilização do controle de qualidade" },
                    { key: "configuracao_cq", label: "Configuração do controle de qualidade" },
                    { key: "avaliacao_grafico", label: "Avaliação gráfico diário" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calibrações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "config_calibrador", label: "Configuração de um novo calibrador" },
                    { key: "realizar_calibracao", label: "Realizar calibração" },
                    { key: "validar_calibracao", label: "Validar calibração" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Processamento de Amostra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "inserir_amostra", label: "Inserir amostra" },
                    { key: "resultado", label: "Resultado" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Manutenções</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "verificacoes_diarias", label: "Verificações diárias (encerramento e contagem de fundo)" },
                    { key: "limpeza_filtro_wbc", label: "Limpeza do filtro de WBC (mensal)" },
                    { key: "ciclo_cloro", label: "Ciclo de cloro" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "config_acessos", label: "Configuração de acessos" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dxh520-${item.key}`}
                        checked={!!checklistDxH520[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistDxH520((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`dxh520-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist AQT90 FLEX - Radiometer */}
          {selectedTemplate === "aqt90" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "entrada_amostras", label: "Entrada de amostras" },
                    { key: "codigo_barras", label: "Código de barras" },
                    { key: "impressora", label: "Impressora" },
                    { key: "cartucho_teste", label: "Cartucho teste" },
                    { key: "cartucho_reagente", label: "Cartucho de reagente" },
                    { key: "ligar_desligar", label: "Ligar e desligar o analisador" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tela</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "layout", label: "Apresentação do layout" },
                    { key: "semaforo", label: "Interpretação do semáforo" },
                    { key: "mensagens", label: "Interpretação de mensagens" },
                    { key: "registro_dados", label: "Uso do registro de dados" },
                    { key: "tutorial", label: "Uso do tutorial" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Análise de Amostra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "analise_amostra", label: "Análise de amostra" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trocas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "cartucho_solucoes", label: "Cartucho de soluções" },
                    { key: "cartucho_testes", label: "Cartucho de testes" },
                    { key: "papel_impressora", label: "Papel da impressora" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calibração</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "calibracao_lote", label: "Calibração de um novo lote de testes" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Limpeza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "tubo_cartucho_limpeza", label: "Uso do tubo e cartucho limpeza" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Qualidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "cadastro_lote", label: "Cadastro de novo lote" },
                    { key: "uso_cq", label: "Uso do controle de qualidade" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aqt90-${item.key}`}
                        checked={!!checklistAQT90[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistAQT90((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`aqt90-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist SET Medikal */}
          {selectedTemplate === "setmedikal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apresentação Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "disco_heparina", label: "Disco de heparina" },
                    { key: "heparina_balanceada", label: "Heparina balanceada para eletrólitos" },
                    { key: "tampa_pino", label: "Tampa com pino interno para eliminação de ar" },
                    { key: "extremidade_luer_slip", label: "Extremidade luer slip" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sm-${item.key}`}
                        checked={!!checklistSetMedikal[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistSetMedikal((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`sm-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Utilização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "posicao_embolo", label: "Posição do êmbolo antes da coleta" },
                    { key: "volume_minmax", label: "Volume mínimo e máximo da coleta" },
                    { key: "expulsao_bolhas", label: "Expulsão de bolhas de ar batendo na seringa" },
                    { key: "eliminacao_ar", label: "Eliminação do ar" },
                    { key: "colocacao_tampa", label: "Colocação da tampa" },
                    { key: "homogeneizacao", label: "Homogeneização manual imediatamente" },
                    { key: "transporte_armazenamento", label: "Transporte e armazenamento" },
                    { key: "tempo_execucao", label: "Tempo até a execução da análise" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sm-${item.key}`}
                        checked={!!checklistSetMedikal[item.key]}
                        onCheckedChange={(checked) =>
                          setChecklistSetMedikal((prev) => ({ ...prev, [item.key]: !!checked }))
                        }
                      />
                      <Label htmlFor={`sm-${item.key}`} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Checklist OsmoTech */}
          {selectedTemplate === "osmotech" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conteúdo Programático do Treinamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: "caracteristicas_funcoes", label: "Características e funções externas do equipamento" },
                  { key: "insumos_basicos", label: "Insumos básicos para o perfeito funcionamento do equipamento (padrões de calibração, kit ponteira e controle diário)" },
                  { key: "interface_configuracao", label: "Características da interface/configuração" },
                  { key: "calibracao_3pontos", label: "Calibração do equipamento com 03 pontos" },
                  { key: "calibracao_pipeta", label: "Calibração e utilização da pipeta de 20 microlitros" },
                  { key: "cadastro_usuarios", label: "Cadastro de usuários" },
                  { key: "filtro_resultados", label: "Filtro de resultados" },
                  { key: "estatisticas_resultados", label: "Estatísticas dos resultados" },
                  { key: "exportacao_rede", label: "Exportação dos resultados via rede" },
                  { key: "testes_amostras", label: "Testes com amostras" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`osmotech-${item.key}`}
                      checked={!!checklistOsmoTech[item.key]}
                      onCheckedChange={(checked) =>
                        setChecklistOsmoTech((prev) => ({ ...prev, [item.key]: !!checked }))
                      }
                    />
                    <Label htmlFor={`osmotech-${item.key}`} className="text-sm font-normal cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Checklist Excelsior AS */}
          {selectedTemplate === "excelsior" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conteúdo Programático do Treinamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: "caracteristicas_fisicas", label: "Características/compartimentos físicos do equipamento" },
                  { key: "material_consumo", label: "Material de consumo" },
                  { key: "config_menu_inicial", label: "Configurações do menu inicial" },
                  { key: "config_protocolos", label: "Configuração de protocolos/programas" },
                  { key: "config_overnight", label: "Configurações de programas overnight" },
                  { key: "controle_qualidade", label: "Controle de qualidade" },
                  { key: "rotacao_reagentes", label: "Rotação de reagentes" },
                  { key: "inspecao_reagentes", label: "Inspeção de reagentes" },
                  { key: "substituicao_filtros", label: "Substituição filtros" },
                  { key: "substituicao_reagentes_lavagem", label: "Substituição dos reagentes de lavagem" },
                  { key: "bateria_backup", label: "Instrução sobre a bateria backup" },
                  { key: "limpeza_camara_reacao", label: "Instruções limpeza da câmara de reação antes do programa de lavagem" },
                  { key: "limpeza_geral", label: "Instruções para limpeza em geral" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`excelsior-${item.key}`}
                      checked={!!checklistExcelsiorAS[item.key]}
                      onCheckedChange={(checked) =>
                        setChecklistExcelsiorAS((prev) => ({ ...prev, [item.key]: !!checked }))
                      }
                    />
                    <Label htmlFor={`excelsior-${item.key}`} className="text-sm font-normal cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Participantes */}
          <Card>
            <CardHeader>
              <CardTitle>Participantes do Treinamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={participante}
                  onChange={(e) => setParticipante(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAdicionarParticipante()}
                  placeholder="Nome do participante..."
                />
                <Button onClick={handleAdicionarParticipante}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>

              {listaParticipantes.length > 0 && (
                <div className="space-y-2">
                  {listaParticipantes.map((p, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <span>{p}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoverParticipante(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                onClick={handleEmitirCertificado}
                disabled={listaParticipantes.length === 0}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Emitir Certificado de Treinamento
              </Button>
            </CardContent>
          </Card>

          {/* Assinatura do Instrutor */}
          <Card>
            <CardHeader>
              <CardTitle>Assinatura do Instrutor</CardTitle>
            </CardHeader>
            <CardContent>
              {assinaturaInstrutor ? (
                <div className="space-y-2">
                  <div className="border rounded-lg p-2 bg-white">
                    <img src={assinaturaInstrutor} alt="Assinatura do instrutor" className="max-h-24 mx-auto" />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setAssinaturaInstrutor(null)}>
                    Refazer Assinatura
                  </Button>
                </div>
              ) : (
                <AssinaturaPad
                  onSave={(sig) => {
                    setAssinaturaInstrutor(sig);
                    toast.success("Assinatura do instrutor registrada!");
                  }}
                />
              )}
            </CardContent>
          </Card>

          {/* Assinaturas dos Participantes */}
          {listaParticipantes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas dos Participantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {listaParticipantes.map((p, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="font-semibold">{p}</Label>
                    {assinaturasParticipantes[index] ? (
                      <div className="space-y-2">
                        <div className="border rounded-lg p-2 bg-white">
                          <img src={assinaturasParticipantes[index]} alt={`Assinatura de ${p}`} className="max-h-24 mx-auto" />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          const updated = { ...assinaturasParticipantes };
                          delete updated[index];
                          setAssinaturasParticipantes(updated);
                        }}>
                          Refazer Assinatura
                        </Button>
                      </div>
                    ) : (
                      <AssinaturaPad
                        onSave={(sig) => {
                          setAssinaturasParticipantes(prev => ({ ...prev, [index]: sig }));
                          toast.success(`Assinatura de ${p} registrada!`);
                        }}
                      />
                    )}
                    {index < listaParticipantes.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Anexos Categorizados */}
      <Card>
        <CardHeader>
          <CardTitle>Anexos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Foto do Problema</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Clique para fazer upload ou arraste imagens aqui
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG até 10MB
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Foto do Treinamento</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Clique para fazer upload ou arraste imagens aqui
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG até 10MB
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Foto da Lista de Presença / Treinamento</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Clique para fazer upload ou arraste imagens aqui
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG até 10MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assinatura Digital */}
      {formData.opcaoAtendimento === "presencial" && 
       formData.status === "CONCLUÍDA" && (
        <AssinaturaDigital 
          onSave={(assinatura) => {
            console.log("Assinatura salva:", assinatura);
            toast.success("Assinatura registrada com sucesso!");
          }}
          onCancel={() => {
            console.log("Assinatura cancelada");
          }}
        />
      )}
    </div>
  );
}
