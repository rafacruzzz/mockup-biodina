import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Save, X, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarcaConcorrenteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIAS_PRODUTO = [
  "Gasometria",
  "Imunoensaio",
  "Consumíveis",
  "Reagentes",
  "Equipamentos",
  "Outra",
];

const SEGMENTOS_MERCADO = [
  "Hospitalar",
  "Laboratorial",
  "Público",
  "Privado",
  "Outro",
];

const MarcaConcorrenteModal: React.FC<MarcaConcorrenteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa_fabricante: "",
    pais_origem: "",
    site_oficial: "",
    status: "",
    categorias: [] as string[],
    categoria_outra: "",
    segmentos: [] as string[],
    segmento_outro: "",
    produto_biodina_concorre: "",
    faixa_preco: "",
    posicionamento: "",
    condicoes_comerciais: "",
    descricao_produto: "",
    caracteristicas_tecnicas: "",
    diferenciais: "",
    pontos_fracos: "",
    compatibilidade_equipamentos: "",
    registro_anvisa: "",
    principais_clientes: "",
    regioes_atuacao: "",
    participacao_mercado: "",
    historico_substituicao: "",
    forcas: "",
    fraquezas: "",
    nivel_ameaca: "",
    nivel_concorrencia: "",
    observacoes_estrategicas: "",
    representante_contato: "",
    distribuidor_brasil: "",
    responsavel_cadastro: "Usuário Logado",
    data_inclusao: new Date().toISOString().split("T")[0],
    data_ultima_atualizacao: new Date().toISOString().split("T")[0],
  });

  const [openSections, setOpenSections] = useState<string[]>([
    "identificacao",
  ]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categorias: prev.categorias.includes(cat)
        ? prev.categorias.filter((c) => c !== cat)
        : [...prev.categorias, cat],
    }));
  };

  const toggleSegmento = (seg: string) => {
    setFormData((prev) => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg)
        ? prev.segmentos.filter((s) => s !== seg)
        : [...prev.segmentos, seg],
    }));
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isComplete = !!(
    formData.nome &&
    formData.empresa_fabricante &&
    formData.status &&
    formData.categorias.length > 0 &&
    formData.segmentos.length > 0 &&
    formData.descricao_produto &&
    formData.registro_anvisa
  );

  const handleSave = () => {
    if (!formData.nome) {
      toast({ title: "Nome da marca é obrigatório", variant: "destructive" });
      return;
    }
    toast({
      title: isComplete
        ? "Marca concorrente cadastrada com sucesso!"
        : "Marca salva como pendente — assessoria deve completar o cadastro",
      variant: isComplete ? "default" : "destructive",
    });
    onClose();
  };

  const SectionHeader = ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }) => {
    const isOpen = openSections.includes(id);
    return (
      <CollapsibleTrigger
        onClick={() => toggleSection(id)}
        className="flex items-center gap-2 w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left font-semibold text-sm"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        {title}
      </CollapsibleTrigger>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Nova Marca Concorrente
            {!isComplete && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Pendente
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3 pb-4">
            {/* Seção 1 — Identificação */}
            <Collapsible open={openSections.includes("identificacao")}>
              <SectionHeader id="identificacao" title="1. Identificação" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome da Marca *</Label>
                    <Input value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
                  </div>
                  <div>
                    <Label>Empresa Fabricante</Label>
                    <Input value={formData.empresa_fabricante} onChange={(e) => handleChange("empresa_fabricante", e.target.value)} />
                  </div>
                  <div>
                    <Label>País de Origem</Label>
                    <Input value={formData.pais_origem} onChange={(e) => handleChange("pais_origem", e.target.value)} />
                  </div>
                  <div>
                    <Label>Site Oficial</Label>
                    <Input value={formData.site_oficial} onChange={(e) => handleChange("site_oficial", e.target.value)} />
                  </div>
                  <div>
                    <Label>Status da Marca</Label>
                    <Select value={formData.status} onValueChange={(v) => handleChange("status", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativa">Ativa</SelectItem>
                        <SelectItem value="Descontinuada">Descontinuada</SelectItem>
                        <SelectItem value="Em Teste">Em Teste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 2 — Classificação */}
            <Collapsible open={openSections.includes("classificacao")}>
              <SectionHeader id="classificacao" title="2. Classificação" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Categoria do Produto</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {CATEGORIAS_PRODUTO.map((cat) => (
                        <div key={cat} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.categorias.includes(cat)}
                            onCheckedChange={() => toggleCategory(cat)}
                          />
                          <span className="text-sm">{cat}</span>
                        </div>
                      ))}
                    </div>
                    {formData.categorias.includes("Outra") && (
                      <div className="mt-2">
                        <Input placeholder="Especifique a categoria" value={formData.categoria_outra} onChange={(e) => handleChange("categoria_outra", e.target.value)} />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2 block">Segmento de Mercado</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {SEGMENTOS_MERCADO.map((seg) => (
                        <div key={seg} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.segmentos.includes(seg)}
                            onCheckedChange={() => toggleSegmento(seg)}
                          />
                          <span className="text-sm">{seg}</span>
                        </div>
                      ))}
                    </div>
                    {formData.segmentos.includes("Outro") && (
                      <div className="mt-2">
                        <Input placeholder="Especifique o segmento" value={formData.segmento_outro} onChange={(e) => handleChange("segmento_outro", e.target.value)} />
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 3 — Posicionamento Comercial */}
            <Collapsible open={openSections.includes("posicionamento")}>
              <SectionHeader id="posicionamento" title="3. Posicionamento Comercial" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Produto da Biodina com o qual concorre</Label>
                    <Input value={formData.produto_biodina_concorre} onChange={(e) => handleChange("produto_biodina_concorre", e.target.value)} />
                  </div>
                  <div>
                    <Label>Faixa de Preço</Label>
                    <Input value={formData.faixa_preco} onChange={(e) => handleChange("faixa_preco", e.target.value)} />
                  </div>
                  <div>
                    <Label>Posicionamento</Label>
                    <Select value={formData.posicionamento} onValueChange={(v) => handleChange("posicionamento", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Baixo Custo">Baixo Custo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label>Condições Comerciais Relevantes</Label>
                    <Textarea value={formData.condicoes_comerciais} onChange={(e) => handleChange("condicoes_comerciais", e.target.value)} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 4 — Informações Técnicas */}
            <Collapsible open={openSections.includes("tecnicas")}>
              <SectionHeader id="tecnicas" title="4. Informações Técnicas" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Descrição do Produto</Label>
                    <Textarea value={formData.descricao_produto} onChange={(e) => handleChange("descricao_produto", e.target.value)} />
                  </div>
                  <div>
                    <Label>Principais Características Técnicas</Label>
                    <Textarea value={formData.caracteristicas_tecnicas} onChange={(e) => handleChange("caracteristicas_tecnicas", e.target.value)} />
                  </div>
                  <div>
                    <Label>Diferenciais</Label>
                    <Textarea value={formData.diferenciais} onChange={(e) => handleChange("diferenciais", e.target.value)} />
                  </div>
                  <div>
                    <Label>Pontos Fracos Percebidos</Label>
                    <Textarea value={formData.pontos_fracos} onChange={(e) => handleChange("pontos_fracos", e.target.value)} />
                  </div>
                  <div>
                    <Label>Compatibilidade com Equipamentos</Label>
                    <Textarea value={formData.compatibilidade_equipamentos} onChange={(e) => handleChange("compatibilidade_equipamentos", e.target.value)} />
                  </div>
                  <div>
                    <Label>Registro ANVISA</Label>
                    <Input value={formData.registro_anvisa} onChange={(e) => handleChange("registro_anvisa", e.target.value)} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 5 — Mercado */}
            <Collapsible open={openSections.includes("mercado")}>
              <SectionHeader id="mercado" title="5. Mercado" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Principais Clientes ou Hospitais</Label>
                    <Textarea value={formData.principais_clientes} onChange={(e) => handleChange("principais_clientes", e.target.value)} />
                  </div>
                  <div>
                    <Label>Regiões de Atuação</Label>
                    <Textarea value={formData.regioes_atuacao} onChange={(e) => handleChange("regioes_atuacao", e.target.value)} />
                  </div>
                  <div>
                    <Label>Participação Estimada de Mercado</Label>
                    <Input value={formData.participacao_mercado} onChange={(e) => handleChange("participacao_mercado", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <Label>Histórico de Substituição em Contratos</Label>
                    <Textarea value={formData.historico_substituicao} onChange={(e) => handleChange("historico_substituicao", e.target.value)} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 6 — Análise Competitiva */}
            <Collapsible open={openSections.includes("analise")}>
              <SectionHeader id="analise" title="6. Análise Competitiva" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Forças</Label>
                    <Textarea value={formData.forcas} onChange={(e) => handleChange("forcas", e.target.value)} />
                  </div>
                  <div>
                    <Label>Fraquezas</Label>
                    <Textarea value={formData.fraquezas} onChange={(e) => handleChange("fraquezas", e.target.value)} />
                  </div>
                  <div>
                    <Label>Nível de Ameaça Competitiva</Label>
                    <Select value={formData.nivel_ameaca} onValueChange={(v) => handleChange("nivel_ameaca", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baixo">Baixo</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Alto">Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Nível de Concorrência</Label>
                    <Select value={formData.nivel_concorrencia} onValueChange={(v) => handleChange("nivel_concorrencia", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baixo">Baixo</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Alto">Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label>Observações Estratégicas</Label>
                    <Textarea value={formData.observacoes_estrategicas} onChange={(e) => handleChange("observacoes_estrategicas", e.target.value)} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 7 — Contato e Distribuição */}
            <Collapsible open={openSections.includes("contato")}>
              <SectionHeader id="contato" title="7. Contato e Distribuição" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Representante ou Contato Comercial</Label>
                    <Input value={formData.representante_contato} onChange={(e) => handleChange("representante_contato", e.target.value)} />
                  </div>
                  <div>
                    <Label>Distribuidor no Brasil</Label>
                    <Input value={formData.distribuidor_brasil} onChange={(e) => handleChange("distribuidor_brasil", e.target.value)} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Seção 8 — Documentos e Controle */}
            <Collapsible open={openSections.includes("documentos")}>
              <SectionHeader id="documentos" title="8. Documentos e Controle" />
              <CollapsibleContent className="pt-3 px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Documentos Anexos</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center text-sm text-muted-foreground">
                      Arraste arquivos aqui ou clique para selecionar (catálogo, ficha técnica, etc.)
                    </div>
                  </div>
                  <div>
                    <Label>Responsável pelo Cadastro</Label>
                    <Input value={formData.responsavel_cadastro} disabled />
                  </div>
                  <div>
                    <Label>Data de Inclusão</Label>
                    <Input type="date" value={formData.data_inclusao} disabled />
                  </div>
                  <div>
                    <Label>Data da Última Atualização</Label>
                    <Input type="date" value={formData.data_ultima_atualizacao} disabled />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarcaConcorrenteModal;
