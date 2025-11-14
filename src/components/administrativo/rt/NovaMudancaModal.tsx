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
  const [responsavel, setResponsavel] = useState("");
  const [tipoMudanca, setTipoMudanca] = useState<TipoMudanca>("A");
  const [descricao, setDescricao] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const resetForm = () => {
    setParteInteressada("RT");
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

    const novaMudanca: Mudanca = {
      id: `mud-${Date.now()}`,
      data: new Date().toISOString().split('T')[0],
      parteInteressada,
      responsavel,
      tipoMudanca,
      descricao,
      status: "Pendente",
      observacoes: observacoes || undefined
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

          <div>
            <Label htmlFor="tipo-mudanca">Tipo de Mudança *</Label>
            <Select value={tipoMudanca} onValueChange={(value: TipoMudanca) => setTipoMudanca(value)}>
              <SelectTrigger id="tipo-mudanca">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">
                  <div className="space-y-1">
                    <div className="font-medium">A) Alterações de Dados Empresariais</div>
                    <div className="text-xs text-muted-foreground">
                      Endereço, sócios, vigilâncias sanitárias, etc.
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="B">
                  <div className="space-y-1">
                    <div className="font-medium">B) Dados Mestres de Produtos</div>
                    <div className="text-xs text-muted-foreground">
                      Registro ANVISA, classe de risco, especificações técnicas
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="C">
                  <div className="space-y-1">
                    <div className="font-medium">C) Alterações em Processos de Negócio</div>
                    <div className="text-xs text-muted-foreground">
                      Recebimento, inspeção, armazenamento, rastreabilidade
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="D">
                  <div className="space-y-1">
                    <div className="font-medium">D) Atualizações Regulatórias (ANVISA)</div>
                    <div className="text-xs text-muted-foreground">
                      Novas RDCs, guias ou requisitos
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="E">
                  <div className="space-y-1">
                    <div className="font-medium">E) Melhorias de Performance</div>
                    <div className="text-xs text-muted-foreground">
                      Alterações físicas, ambientais e melhorias logísticas
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="F">
                  <div className="space-y-1">
                    <div className="font-medium">F) Outros</div>
                    <div className="text-xs text-muted-foreground">
                      Demais alterações
                    </div>
                  </div>
                </SelectItem>
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
