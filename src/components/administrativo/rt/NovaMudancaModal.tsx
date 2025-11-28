import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Mudanca, ParteInteressada, TipoMudanca, StatusMudanca } from "@/types/rt";
import { descricoesTipoMudanca } from "@/data/rtModules";
import { toast } from "@/components/ui/use-toast";

interface NovaMudancaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (mudanca: Mudanca) => void;
}

export const NovaMudancaModal = ({
  open,
  onOpenChange,
  onSave
}: NovaMudancaModalProps) => {
  const [parteInteressada, setParteInteressada] = useState<ParteInteressada>("RT");
  const [outrosDescricao, setOutrosDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [tipoMudanca, setTipoMudanca] = useState<TipoMudanca>("A");
  const [descricao, setDescricao] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const resetForm = () => {
    setParteInteressada("RT");
    setOutrosDescricao("");
    setResponsavel("");
    setTipoMudanca("A");
    setDescricao("");
    setObservacoes("");
  };

  const handleSave = () => {
    if (!responsavel.trim() || !descricao.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (parteInteressada === "Outros" && !outrosDescricao.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, especifique qual é a parte interessada",
        variant: "destructive"
      });
      return;
    }

    const observacoesCompletas = parteInteressada === "Outros" 
      ? `Parte Interessada: ${outrosDescricao}${observacoes ? `\n\n${observacoes}` : ""}`
      : observacoes;

    const novaMudanca: Mudanca = {
      id: `mud-${Date.now()}`,
      data: new Date().toISOString().split('T')[0],
      parteInteressada,
      responsavel,
      tipoMudanca,
      descricao,
      status: "Pendente",
      observacoes: observacoesCompletas || undefined
    };

    onSave(novaMudanca);
    resetForm();
    onOpenChange(false);
    
    toast({
      title: "Sucesso",
      description: "Mudança registrada com sucesso"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nova Mudança</DialogTitle>
          <DialogDescription>
            Registre uma nova mudança no sistema. Mudanças do tipo B são automaticamente 
            integradas com alterações do módulo Regulatório.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parte-interessada">Parte Interessada *</Label>
              <Select value={parteInteressada} onValueChange={(value: ParteInteressada) => setParteInteressada(value)}>
                <SelectTrigger id="parte-interessada">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Usuario">Usuário</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                  <SelectItem value="CQ">CQ</SelectItem>
                  <SelectItem value="RT">RT</SelectItem>
                  <SelectItem value="DT">DT</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="responsavel">Responsável pela Mudança *</Label>
              <Input
                id="responsavel"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          {parteInteressada === "Outros" && (
            <div>
              <Label htmlFor="outros-descricao">Especificar Parte Interessada *</Label>
              <Input
                id="outros-descricao"
                value={outrosDescricao}
                onChange={(e) => setOutrosDescricao(e.target.value)}
                placeholder="Especifique qual é a parte interessada"
              />
            </div>
          )}

          <div>
            <Label htmlFor="tipo-mudanca">Tipo de Mudança *</Label>
            <Select value={tipoMudanca} onValueChange={(value: TipoMudanca) => setTipoMudanca(value)}>
              <SelectTrigger id="tipo-mudanca">
                <SelectValue>
                  {tipoMudanca === "A" && "A) Alterações de Dados Empresariais"}
                  {tipoMudanca === "B" && "B) Dados Mestres de Produtos"}
                  {tipoMudanca === "C" && "C) Alterações em Processos de Negócio"}
                  {tipoMudanca === "D" && "D) Atualizações Regulatórias (ANVISA)"}
                  {tipoMudanca === "E" && "E) Melhorias de Performance"}
                  {tipoMudanca === "F" && "F) Outros"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A) Alterações de Dados Empresariais</SelectItem>
                <SelectItem value="B">B) Dados Mestres de Produtos</SelectItem>
                <SelectItem value="C">C) Alterações em Processos de Negócio</SelectItem>
                <SelectItem value="D">D) Atualizações Regulatórias (ANVISA)</SelectItem>
                <SelectItem value="E">E) Melhorias de Performance</SelectItem>
                <SelectItem value="F">F) Outros</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              {descricoesTipoMudanca[tipoMudanca]}
            </p>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição da Mudança *</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva detalhadamente a mudança a ser realizada"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Informações adicionais ou observações relevantes"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Registrar Mudança</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
