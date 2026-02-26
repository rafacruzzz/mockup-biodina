import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SumarioAlertaData } from "@/types/acaoCampo";

interface Props {
  initialData?: SumarioAlertaData;
  onSave: (dados: SumarioAlertaData) => void;
  onCancel: () => void;
}

const TIPOS_PRODUTO = [
  "Equipamento médico",
  "Material de uso em saúde",
  "Produto para diagnóstico in-vitro (IVD)",
  "Software como Dispositivo Médico (SaMD)",
];

const CLASSES_RISCO = ["I", "II", "III", "IV"];

const defaultData: SumarioAlertaData = {
  titulo: "",
  identificacaoProduto: "",
  localDistribuicao: "",
  nomeComercial: "",
  nomeTecnico: "",
  registroAnvisa: "",
  tipoProduto: "",
  classeRisco: "",
  modeloAfetado: "",
  numerosSerieOuVersao: "",
  problema: "",
  dataIdentificacaoProblema: "",
  acao: "",
  historico: "",
  empresaDetentoraRegistro: "",
  fabricanteProduto: "",
  recomendacoesPublico: "",
  anexosAlerta: "",
  linkSistec: "",
  linkPaineisTecnovigilancia: "",
  informacoesComplementares: "",
  tagDescritores: "",
};

export const SumarioAlertaForm = ({ initialData, onSave, onCancel }: Props) => {
  const [formData, setFormData] = useState<SumarioAlertaData>(initialData || defaultData);

  const handleChange = (field: keyof SumarioAlertaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo.trim()) return;
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      {/* 1. Título */}
      <div className="space-y-2">
        <Label>1. Título *</Label>
        <Textarea
          value={formData.titulo}
          onChange={e => handleChange("titulo", e.target.value)}
          placeholder='Alerta XXXX (Tecnovigilância) - Comunicado da empresa [Nome] - Produto [Nome comercial] - Ação proposta: ...'
          rows={3}
        />
      </div>

      {/* 2. Identificação do produto */}
      <div className="space-y-2">
        <Label>2. Identificação do produto (separar por ponto-e-vírgula)</Label>
        <Textarea
          value={formData.identificacaoProduto}
          onChange={e => handleChange("identificacaoProduto", e.target.value)}
          placeholder="Identificadores separados por ponto-e-vírgula"
          rows={2}
        />
      </div>

      {/* 3. Local de distribuição */}
      <div className="space-y-2">
        <Label>3. Local de distribuição do produto informado pela empresa</Label>
        <Textarea
          value={formData.localDistribuicao}
          onChange={e => handleChange("localDistribuicao", e.target.value)}
          placeholder="UFs onde o produto foi distribuído"
          rows={2}
        />
      </div>

      {/* 4 e 5 - Nomes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>4. Nome Comercial</Label>
          <Input value={formData.nomeComercial} onChange={e => handleChange("nomeComercial", e.target.value)} placeholder="Nome comercial conforme ANVISA" />
        </div>
        <div className="space-y-2">
          <Label>5. Nome Técnico</Label>
          <Input value={formData.nomeTecnico} onChange={e => handleChange("nomeTecnico", e.target.value)} placeholder="Nome técnico conforme ANVISA" />
        </div>
      </div>

      {/* 6. Registro ANVISA */}
      <div className="space-y-2">
        <Label>6. Nº registro/notificação ANVISA</Label>
        <Input value={formData.registroAnvisa} onChange={e => handleChange("registroAnvisa", e.target.value)} placeholder="Número de registro ou notificação" />
      </div>

      {/* 7 e 8 - Tipo e Classe */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>7. Tipo de produto</Label>
          <Select value={formData.tipoProduto} onValueChange={v => handleChange("tipoProduto", v)}>
            <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
            <SelectContent>
              {TIPOS_PRODUTO.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>8. Classe de Risco</Label>
          <Select value={formData.classeRisco} onValueChange={v => handleChange("classeRisco", v)}>
            <SelectTrigger><SelectValue placeholder="Selecione a classe" /></SelectTrigger>
            <SelectContent>
              {CLASSES_RISCO.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 9. Modelo afetado */}
      <div className="space-y-2">
        <Label>9. Modelo/apresentação afetado</Label>
        <Input value={formData.modeloAfetado} onChange={e => handleChange("modeloAfetado", e.target.value)} placeholder="Modelos afetados" />
      </div>

      {/* 10. Números de série/lote */}
      <div className="space-y-2">
        <Label>10. Números de série/lote afetados ou versão de software</Label>
        <Textarea value={formData.numerosSerieOuVersao} onChange={e => handleChange("numerosSerieOuVersao", e.target.value)} placeholder="Lotes, séries ou versões afetadas" rows={2} />
      </div>

      {/* 11. Problema */}
      <div className="space-y-2">
        <Label>11. Problema (máx. 1500 caracteres)</Label>
        <Textarea
          value={formData.problema}
          onChange={e => handleChange("problema", e.target.value.slice(0, 1500))}
          placeholder="Descrição clara e objetiva do problema"
          rows={4}
          maxLength={1500}
        />
        <p className="text-xs text-muted-foreground">{formData.problema.length}/1500</p>
      </div>

      {/* 12. Data identificação */}
      <div className="space-y-2">
        <Label>12. Data de identificação do problema pela empresa</Label>
        <Input type="date" value={formData.dataIdentificacaoProblema} onChange={e => handleChange("dataIdentificacaoProblema", e.target.value)} />
      </div>

      {/* 13. Ação */}
      <div className="space-y-2">
        <Label>13. Ação</Label>
        <Textarea value={formData.acao} onChange={e => handleChange("acao", e.target.value)} placeholder="Detalhe a ação de campo, código e empresa responsável" rows={3} />
      </div>

      {/* 14. Histórico */}
      <div className="space-y-2">
        <Label>14. Histórico</Label>
        <Textarea value={formData.historico} onChange={e => handleChange("historico", e.target.value)} placeholder="Informação sobre notificação conforme RDC Anvisa 551/2021" rows={3} />
      </div>

      {/* 15. Empresa detentora */}
      <div className="space-y-2">
        <Label>15. Empresa detentora do registro</Label>
        <Textarea value={formData.empresaDetentoraRegistro} onChange={e => handleChange("empresaDetentoraRegistro", e.target.value)} placeholder="Nome, CNPJ, endereço, telefone e e-mail" rows={3} />
      </div>

      {/* 16. Fabricante */}
      <div className="space-y-2">
        <Label>16. Fabricante do produto</Label>
        <Textarea value={formData.fabricanteProduto} onChange={e => handleChange("fabricanteProduto", e.target.value)} placeholder="Nome, endereço e país do fabricante" rows={2} />
      </div>

      {/* 17. Recomendações */}
      <div className="space-y-2">
        <Label>17. Recomendações ao público-alvo (máx. 1000 caracteres)</Label>
        <Textarea
          value={formData.recomendacoesPublico}
          onChange={e => handleChange("recomendacoesPublico", e.target.value.slice(0, 1000))}
          placeholder="Recomendações claras para o público-alvo"
          rows={3}
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground">{formData.recomendacoesPublico.length}/1000</p>
      </div>

      {/* 18. Anexos */}
      <div className="space-y-2">
        <Label>18. Relacione aqui os anexos do alerta</Label>
        <Textarea value={formData.anexosAlerta} onChange={e => handleChange("anexosAlerta", e.target.value)} placeholder="Ex: Carta ao cliente, Formulário de resposta, Lotes afetados..." rows={2} />
      </div>

      {/* 19 e 20 - Links */}
      <div className="space-y-2">
        <Label>19. Alerta de Tecnovigilância/SISTEC (Link)</Label>
        <Input value={formData.linkSistec} onChange={e => handleChange("linkSistec", e.target.value)} placeholder="http://www.anvisa.gov.br/sistec/alerta/RelatorioAlerta.asp?..." />
      </div>

      <div className="space-y-2">
        <Label>20. Painéis da Tecnovigilância (Link)</Label>
        <Input value={formData.linkPaineisTecnovigilancia} onChange={e => handleChange("linkPaineisTecnovigilancia", e.target.value)} placeholder="https://www.gov.br/anvisa/pt-br/..." />
      </div>

      {/* 21. Informações Complementares */}
      <div className="space-y-2">
        <Label>21. Informações Complementares</Label>
        <Textarea value={formData.informacoesComplementares} onChange={e => handleChange("informacoesComplementares", e.target.value)} placeholder="Data de entrada da notificação, responsabilidades conforme RDC 551/2021..." rows={3} />
      </div>

      {/* 22. TAG/Descritores */}
      <div className="space-y-2">
        <Label>22. TAG/Descritores</Label>
        <Textarea value={formData.tagDescritores} onChange={e => handleChange("tagDescritores", e.target.value)} placeholder="Tecnovigilância, Alerta Sanitário, Produtos para a saúde..." rows={2} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleSubmit}>Salvar</Button>
      </div>
    </div>
  );
};
