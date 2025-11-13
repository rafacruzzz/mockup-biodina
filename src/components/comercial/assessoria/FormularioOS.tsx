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

  const tiposOS: { value: TipoOS; label: string }[] = [
    { value: "suporte_operacional", label: "Suporte Operacional" },
    { value: "acompanhamento_rotina", label: "Acompanhamento de Rotina" },
    { value: "treinamento_inicial", label: "Treinamento Inicial" },
    { value: "treinamento_nova_equipe", label: "Treinamento de Nova Equipe" },
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
    return tipo === "importacao" ? "Importação Direta" : "Contratação Simples";
  };

  const handleSave = () => {
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

  const renderTemplateTrainamento = () => {
    const ehTreinamento = tiposSelecionados.some(t => 
      t === "treinamento_inicial" || t === "treinamento_nova_equipe"
    );

    if (!ehTreinamento || !formData.equipamento) return null;

    const equipamentoNome = formData.equipamento.toUpperCase();

    if (equipamentoNome.includes("DXH 520") || equipamentoNome.includes("DXH520")) {
      return <TemplateTrainamentoDxH520 />;
    } else if (equipamentoNome.includes("ABL800")) {
      return <TemplateTrainamentoABL800 />;
    } else if (equipamentoNome.includes("ABL90")) {
      return <TemplateTrainamentoABL90 />;
    } else if (equipamentoNome.includes("ABL9") && !equipamentoNome.includes("ABL90")) {
      return <TemplateTrainamentoABL9 />;
    } else if (equipamentoNome.includes("AQT90") || equipamentoNome.includes("AQT 90")) {
      return <TemplateTrainamentoAQT90 />;
    }

    return null;
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
          <CardTitle>Vinculação de Projeto (Opcional)</CardTitle>
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
                    <SelectItem value="contratacao">Contratação Simples</SelectItem>
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
                <SelectValue placeholder="Selecionar equipamento..." />
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="versaoWindows">Versão do Windows</Label>
              <Input
                id="versaoWindows"
                value={formData.versaoWindows}
                readOnly
                className="bg-muted"
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

      {/* Template de Treinamento */}
      {renderTemplateTrainamento()}

      {/* Participantes */}
      {tiposSelecionados.some(t => t === "treinamento_inicial" || t === "treinamento_nova_equipe") && (
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
