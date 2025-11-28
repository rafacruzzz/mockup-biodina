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
import { Treinamento } from "@/types/rt";
import { participantesDisponiveis } from "@/data/rtModules";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Upload, FileText } from "lucide-react";

interface NovoTreinamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (treinamento: Treinamento) => void;
  tipo: 'realizado' | 'futuro';
}

export const NovoTreinamentoModal = ({
  open,
  onOpenChange,
  onSave,
  tipo
}: NovoTreinamentoModalProps) => {
  const [data, setData] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [local, setLocal] = useState("");
  const [ministrante, setMinistrante] = useState("");
  const [participantesSelecionados, setParticipantesSelecionados] = useState<string[]>([]);
  const [objetivo, setObjetivo] = useState("");
  const [showParticipantes, setShowParticipantes] = useState(false);
  const [anexos, setAnexos] = useState<Array<{ nome: string; tamanho: number }>>([]);

  const resetForm = () => {
    setData("");
    setConteudo("");
    setLocal("");
    setMinistrante("");
    setParticipantesSelecionados([]);
    setObjetivo("");
    setAnexos([]);
  };

  const toggleParticipante = (participante: string) => {
    setParticipantesSelecionados(prev => 
      prev.includes(participante)
        ? prev.filter(p => p !== participante)
        : [...prev, participante]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const novosAnexos = Array.from(files).map(file => ({
        nome: file.name,
        tamanho: file.size
      }));
      setAnexos(prev => [...prev, ...novosAnexos]);
    }
  };

  const removerAnexo = (index: number) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const formatarTamanho = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSave = () => {
    if (!data || !conteudo || !local || !ministrante || participantesSelecionados.length === 0 || !objetivo) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const novoTreinamento: Treinamento = {
      id: `trei-${Date.now()}`,
      data,
      conteudo,
      local,
      ministrante,
      participantes: participantesSelecionados,
      objetivo,
      anexos: anexos.map((anexo, index) => ({
        id: `anexo-${Date.now()}-${index}`,
        nome: anexo.nome,
        tipo: anexo.nome.split('.').pop() || '',
        tamanho: anexo.tamanho,
        dataUpload: new Date().toISOString().split('T')[0]
      })),
      tipo,
      status: tipo === 'futuro' ? 'Agendado' : 'Realizado'
    };

    onSave(novoTreinamento);
    resetForm();
    onOpenChange(false);
    
    toast({
      title: "Sucesso",
      description: tipo === 'futuro' ? "Treinamento agendado com sucesso" : "Treinamento registrado com sucesso"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tipo === 'futuro' ? 'Agendar Treinamento' : 'Registrar Treinamento Realizado'}
          </DialogTitle>
          <DialogDescription>
            {tipo === 'futuro' 
              ? 'Agende um novo treinamento para a equipe'
              : 'Registre um treinamento que já foi realizado'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data-treinamento">
                {tipo === 'futuro' ? 'Data Prevista *' : 'Data do Treinamento *'}
              </Label>
              <Input
                id="data-treinamento"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="local">Local *</Label>
              <Input
                id="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex: Sala de Treinamento - Sede"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="conteudo">Conteúdo/Tema *</Label>
            <Input
              id="conteudo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Ex: Boas Práticas de Armazenamento"
            />
          </div>

          <div>
            <Label htmlFor="ministrante">Ministrante *</Label>
            <Select value={ministrante} onValueChange={setMinistrante}>
              <SelectTrigger id="ministrante">
                <SelectValue placeholder="Selecione o ministrante" />
              </SelectTrigger>
              <SelectContent>
                {participantesDisponiveis.map(participante => (
                  <SelectItem key={participante} value={participante}>
                    {participante}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Participantes * ({participantesSelecionados.length} selecionados)</Label>
            <div className="border rounded-lg p-3 space-y-2 mt-1">
              {participantesSelecionados.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {participantesSelecionados.map(participante => (
                    <Badge key={participante} variant="secondary" className="gap-1">
                      {participante}
                      <button
                        onClick={() => toggleParticipante(participante)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowParticipantes(!showParticipantes)}
                className="w-full"
              >
                {showParticipantes ? 'Ocultar Lista' : 'Selecionar Participantes'}
              </Button>
              {showParticipantes && (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pt-2">
                  {participantesDisponiveis.map(participante => (
                    <div key={participante} className="flex items-center gap-2">
                      <Checkbox
                        id={`part-${participante}`}
                        checked={participantesSelecionados.includes(participante)}
                        onCheckedChange={() => toggleParticipante(participante)}
                      />
                      <Label
                        htmlFor={`part-${participante}`}
                        className="cursor-pointer flex-1"
                      >
                        {participante}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="objetivo">Objetivo do Treinamento *</Label>
            <Textarea
              id="objetivo"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="Descreva o objetivo principal do treinamento"
              rows={4}
            />
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <div>
              <Label>Anexos do Treinamento</Label>
              <p className="text-sm text-muted-foreground">
                Lista de presença, fotos, certificados, materiais didáticos, etc.
              </p>
            </div>
            
            {anexos.length > 0 && (
              <div className="space-y-2">
                {anexos.map((anexo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{anexo.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatarTamanho(anexo.tamanho)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removerAnexo(index)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
              />
              <Label htmlFor="file-upload">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <span className="cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    Adicionar Anexos
                  </span>
                </Button>
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {tipo === 'futuro' ? 'Agendar' : 'Registrar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
