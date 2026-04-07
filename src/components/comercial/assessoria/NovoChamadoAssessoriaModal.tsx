import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  ChamadoAssessoria, 
  TipoChamado, 
  UrgenciaChamado,
  DestinoChamado,
  TIPO_CHAMADO_LABELS,
  URGENCIA_CHAMADO_LABELS
} from "@/types/assessoria-cientifica";
import { chamadosAssessoriaMock } from "@/data/assessoria-cientifica";

interface NovoChamadoAssessoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessorNome?: string;
  assessorId?: string;
}

const CLIENTES_MOCK = [
  { id: "cli-001", nome: "Hospital Central" },
  { id: "cli-002", nome: "Clínica São Lucas" },
  { id: "cli-003", nome: "Laboratório Pesquisa Avançada" },
  { id: "cli-004", nome: "Instituto de Biotecnologia" },
  { id: "cli-005", nome: "Hospital Universitário" },
  { id: "cli-009", nome: "Laboratório VidaSaúde" },
  { id: "cli-010", nome: "Clínica Diagnóstica Avançada" },
];

const EQUIPAMENTOS_MOCK: Record<string, { id: string; modelo: string }[]> = {
  "cli-001": [
    { id: "eq-001", modelo: "ABL800" },
    { id: "eq-009", modelo: "DxH520" },
  ],
  "cli-002": [{ id: "eq-002", modelo: "Sistema Beta PRO-150" }],
  "cli-003": [{ id: "eq-003", modelo: "Multi-Analyzer Gamma-500" }],
  "cli-004": [{ id: "eq-004", modelo: "BioReactor Delta-X" }],
  "cli-005": [{ id: "eq-005", modelo: "Scanner Epsilon-300" }],
  "cli-009": [{ id: "eq-010", modelo: "UniCel DxC 700" }],
  "cli-010": [{ id: "eq-011", modelo: "AU5800" }],
};

const PROJETOS_MOCK: Record<string, { id: string; numero: string }[]> = {
  "cli-001": [{ id: "proj-001", numero: "PROJ-HC-2024-089" }],
  "cli-002": [{ id: "proj-002", numero: "PROJ-CSL-2024-045" }],
  "cli-003": [{ id: "proj-003", numero: "PROJ-LPA-2024-023" }],
  "cli-004": [{ id: "proj-005", numero: "PROJ-IBT-2024-078" }],
  "cli-005": [{ id: "proj-006", numero: "PROJ-HU-2024-067" }],
  "cli-009": [{ id: "proj-009", numero: "PROJ-LVS-2024-112" }],
  "cli-010": [{ id: "proj-010", numero: "PROJ-CDA-2024-156" }],
};

// Mapeamento bidirecional entre equipamento, série/lote e projeto
const EQUIPAMENTO_SERIE_PROJETO_MAP: { equipamentoId: string; serie: string; projetoId: string }[] = [
  { equipamentoId: "eq-001", serie: "SN-20250101", projetoId: "proj-001" },
  { equipamentoId: "eq-009", serie: "SN-20250202", projetoId: "proj-001" },
  { equipamentoId: "eq-002", serie: "SN-20250303", projetoId: "proj-002" },
  { equipamentoId: "eq-003", serie: "SN-20250404", projetoId: "proj-003" },
  { equipamentoId: "eq-004", serie: "SN-20250505", projetoId: "proj-005" },
  { equipamentoId: "eq-005", serie: "SN-20250606", projetoId: "proj-006" },
  { equipamentoId: "eq-010", serie: "SN-20250707", projetoId: "proj-009" },
  { equipamentoId: "eq-011", serie: "SN-20250808", projetoId: "proj-010" },
];

export function NovoChamadoAssessoriaModal({ isOpen, onClose, assessorNome = "Dr. Carlos Mendes", assessorId = "resp-001" }: NovoChamadoAssessoriaModalProps) {
  const [destino, setDestino] = useState<DestinoChamado | "">("");
  const [clienteId, setClienteId] = useState("");
  const [equipamentoId, setEquipamentoId] = useState("");
  const [numeroSerieLote, setNumeroSerieLote] = useState("");
  const [projetoId, setProjetoId] = useState("");
  const [tipo, setTipo] = useState<TipoChamado | "">("");
  const [urgencia, setUrgencia] = useState<UrgenciaChamado | "">("");
  const [motivoDescricao, setMotivoDescricao] = useState("");

  const clienteSelecionado = CLIENTES_MOCK.find(c => c.id === clienteId);
  const equipamentos = clienteId ? (EQUIPAMENTOS_MOCK[clienteId] || []) : [];
  const projetos = clienteId ? (PROJETOS_MOCK[clienteId] || []) : [];
  const equipamentoSelecionado = equipamentos.find(e => e.id === equipamentoId);
  const projetoSelecionado = projetos.find(p => p.id === projetoId);

  const resetForm = () => {
    setDestino("");
    setClienteId("");
    setEquipamentoId("");
    setNumeroSerieLote("");
    setProjetoId("");
    setTipo("");
    setUrgencia("");
    setMotivoDescricao("");
  };

  const handleSalvar = () => {
    if (!destino || !clienteId || !tipo || !urgencia || !motivoDescricao.trim()) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const nextNum = chamadosAssessoriaMock.length + 1;
    const numeroChamado = `CH-${year}-${String(nextNum).padStart(4, '0')}`;
    const numeroOS = `OS-${year}-${String(nextNum + 100).padStart(4, '0')}`;

    const novoChamado: ChamadoAssessoria = {
      id: `cham-${String(nextNum).padStart(3, '0')}`,
      numeroChamado,
      numeroOS,
      projetoId: projetoId || "",
      projetoMaeNumero: projetoSelecionado?.numero || "",
      clienteId,
      clienteNome: clienteSelecionado?.nome || "",
      equipamentoId: equipamentoId || undefined,
      equipamentoModelo: equipamentoSelecionado?.modelo || undefined,
      numeroSerieLote: numeroSerieLote || undefined,
      origem: "Assessoria Científica",
      destino: destino as DestinoChamado,
      abertoPorNome: assessorNome,
      abertoPorId: assessorId,
      abertoPorDepartamento: "Assessoria Científica",
      assessorVinculadoId: assessorId,
      assessorVinculadoNome: assessorNome,
      tipo: tipo as TipoChamado,
      motivoDescricao: motivoDescricao.trim(),
      urgencia: urgencia as UrgenciaChamado,
      status: "ABERTO",
      dataAbertura: now,
      prazoEstimado: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      interacoes: [
        {
          id: `int-${String(nextNum).padStart(3, '0')}-01`,
          autorNome: assessorNome,
          autorId: assessorId,
          autorDepartamento: "Assessoria Científica",
          acao: "Abriu o chamado",
          mensagem: motivoDescricao.trim(),
          data: now,
        }
      ],
      criadoEm: now,
      atualizadoEm: now,
    };

    chamadosAssessoriaMock.push(novoChamado);
    toast.success(`Chamado ${numeroChamado} aberto com sucesso!`);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { resetForm(); onClose(); } }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Chamado</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* Destino */}
          <div className="space-y-2">
            <Label>Destino *</Label>
            <Select value={destino} onValueChange={(v) => setDestino(v as DestinoChamado)}>
              <SelectTrigger><SelectValue placeholder="Selecione o destino" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Vendas">Vendas</SelectItem>
                <SelectItem value="Departamento Técnico">Departamento Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cliente */}
          <div className="space-y-2">
            <Label>Cliente *</Label>
            <Select value={clienteId} onValueChange={(v) => { setClienteId(v); setEquipamentoId(""); setProjetoId(""); }}>
              <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
              <SelectContent>
                {CLIENTES_MOCK.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Equipamento */}
          <div className="space-y-2">
            <Label>Equipamento / Modelo</Label>
            <Select value={equipamentoId} onValueChange={(v) => {
              setEquipamentoId(v);
              const match = EQUIPAMENTO_SERIE_PROJETO_MAP.find(m => m.equipamentoId === v);
              if (match) {
                setNumeroSerieLote(match.serie);
                setProjetoId(match.projetoId);
              }
            }} disabled={!clienteId}>
              <SelectTrigger><SelectValue placeholder="Selecione o equipamento" /></SelectTrigger>
              <SelectContent>
                {equipamentos.map(e => (
                  <SelectItem key={e.id} value={e.id}>{e.modelo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nº Série/Lote */}
          <div className="space-y-2">
            <Label>Nº Série / Lote</Label>
            <Input value={numeroSerieLote} onChange={(e) => {
              const val = e.target.value;
              setNumeroSerieLote(val);
              const match = EQUIPAMENTO_SERIE_PROJETO_MAP.find(m => m.serie.toUpperCase() === val.toUpperCase());
              if (match) {
                setEquipamentoId(match.equipamentoId);
                setProjetoId(match.projetoId);
              }
            }} placeholder="Ex: SN-20250101" />
          </div>

          {/* Projeto-Mãe */}
          <div className="space-y-2">
            <Label>Projeto-Mãe</Label>
            <Select value={projetoId} onValueChange={(v) => {
              setProjetoId(v);
              const match = EQUIPAMENTO_SERIE_PROJETO_MAP.find(m => m.projetoId === v);
              if (match) {
                setEquipamentoId(match.equipamentoId);
                setNumeroSerieLote(match.serie);
              }
            }} disabled={!clienteId}>
              <SelectTrigger><SelectValue placeholder="Selecione o projeto" /></SelectTrigger>
              <SelectContent>
                {projetos.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.numero}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo do Chamado */}
          <div className="space-y-2">
            <Label>Tipo do Chamado *</Label>
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoChamado)}>
              <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
              <SelectContent>
                {(Object.entries(TIPO_CHAMADO_LABELS) as [TipoChamado, string][]).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Urgência */}
          <div className="space-y-2 col-span-2">
            <Label>Urgência *</Label>
            <Select value={urgencia} onValueChange={(v) => setUrgencia(v as UrgenciaChamado)}>
              <SelectTrigger className="w-1/2"><SelectValue placeholder="Selecione a urgência" /></SelectTrigger>
              <SelectContent>
                {(Object.entries(URGENCIA_CHAMADO_LABELS) as [UrgenciaChamado, string][]).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Motivo / Descrição */}
          <div className="space-y-2 col-span-2">
            <Label>Motivo / Descrição da Ocorrência *</Label>
            <Textarea 
              value={motivoDescricao} 
              onChange={(e) => setMotivoDescricao(e.target.value)} 
              placeholder="Descreva o motivo do chamado..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => { resetForm(); onClose(); }}>Cancelar</Button>
          <Button onClick={handleSalvar}>
            {destino === "Vendas" ? "Enviar para Vendas" : destino === "Departamento Técnico" ? "Enviar para DT" : "Enviar Chamado"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
