import { useState, useEffect } from "react";
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
import { DocumentoProduto, ChangelogEntry } from "@/types/produto";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface EditarDocumentoModalProps {
  open: boolean;
  onClose: () => void;
  documento: DocumentoProduto;
  onSave: (documento: DocumentoProduto, changelog: ChangelogEntry) => void;
}

export default function EditarDocumentoModal({
  open,
  onClose,
  documento,
  onSave,
}: EditarDocumentoModalProps) {
  const [novaVersao, setNovaVersao] = useState("");
  const [oqueMudou, setOqueMudou] = useState("");
  const [porqueMudou, setPorqueMudou] = useState("");
  const [aprovadoPor, setAprovadoPor] = useState("");
  const [dataAprovacao, setDataAprovacao] = useState<Date>();
  const [arquivo, setArquivo] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      // Sugere próxima versão automaticamente
      const versaoAtual = documento.versao;
      const partes = versaoAtual.split(".");
      const versaoMenor = parseInt(partes[1] || "0") + 1;
      setNovaVersao(`${partes[0]}.${versaoMenor}`);
      
      // Limpa campos
      setOqueMudou("");
      setPorqueMudou("");
      setAprovadoPor("");
      setDataAprovacao(new Date());
      setArquivo(null);
    }
  }, [open, documento]);

  const handleSave = () => {
    // Validações
    if (!novaVersao) {
      toast.error("Informe a nova versão do documento");
      return;
    }

    if (!oqueMudou || oqueMudou.length < 10) {
      toast.error("Descreva o que mudou (mínimo 10 caracteres)");
      return;
    }

    if (!porqueMudou || porqueMudou.length < 10) {
      toast.error("Descreva por que mudou (mínimo 10 caracteres)");
      return;
    }

    if (documento.bloqueadoSobrescrita && !arquivo) {
      toast.error("Documentos bloqueados requerem upload de nova versão");
      return;
    }

    // Cria changelog entry
    const changelog: ChangelogEntry = {
      id: `changelog-${Date.now()}`,
      artefatoId: documento.id,
      tipoArtefato: documento.tipo === 'catalogo' ? 'catalogo' : 
                    documento.tipo === 'manual' ? 'manual' : 
                    documento.tipo === 'ficha_tecnica' ? 'ficha_tecnica' : 'manual',
      versaoAnterior: documento.versao,
      versaoNova: novaVersao,
      oqueMudou,
      porqueMudou,
      aprovadoPor: aprovadoPor || "Sistema",
      aprovadoEm: dataAprovacao,
      alteradoPor: "Usuário Atual", // Substituir com contexto de usuário real
      alteradoEm: new Date(),
    };

    // Adiciona versão ao histórico
    const novaVersaoHistorico = {
      versao: documento.versao,
      dataAprovacao: documento.dataUpload,
      aprovadoPor: documento.uploadPor,
      arquivo: documento.arquivo,
    };

    // Atualiza documento
    const documentoAtualizado: DocumentoProduto = {
      ...documento,
      versao: novaVersao,
      dataUpload: new Date(),
      arquivo: arquivo ? URL.createObjectURL(arquivo) : documento.arquivo,
      historicoVersoes: [
        ...(documento.historicoVersoes || []),
        novaVersaoHistorico,
      ],
      changelog: [
        ...(documento.changelog || []),
        changelog,
      ],
    };

    onSave(documentoAtualizado, changelog);
    toast.success("Documento atualizado com sucesso!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Documento - Nova Versão</DialogTitle>
          <DialogDescription>
            {documento.bloqueadoSobrescrita ? (
              <span className="text-destructive font-medium">
                Este documento está bloqueado. Você deve criar uma nova versão.
              </span>
            ) : (
              "Atualize o documento e registre as alterações no changelog."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Documento Atual */}
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">
              <span className="font-medium">Documento:</span> {documento.titulo}
            </p>
            <p className="text-sm">
              <span className="font-medium">Versão Atual:</span> {documento.versao}
            </p>
          </div>

          {/* Nova Versão */}
          <div className="space-y-2">
            <Label htmlFor="novaVersao">Nova Versão *</Label>
            <Input
              id="novaVersao"
              value={novaVersao}
              onChange={(e) => setNovaVersao(e.target.value)}
              placeholder="Ex: 2.0, 1.5"
            />
          </div>

          {/* Upload de Arquivo (obrigatório se bloqueado) */}
          {documento.bloqueadoSobrescrita && (
            <div className="space-y-2">
              <Label htmlFor="arquivo">Upload do Arquivo *</Label>
              <Input
                id="arquivo"
                type="file"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <p className="text-xs text-muted-foreground">
                Documentos bloqueados não podem ser sobrescritos. Upload obrigatório.
              </p>
            </div>
          )}

          {/* Changelog - O que mudou */}
          <div className="space-y-2">
            <Label htmlFor="oqueMudou">O que mudou? *</Label>
            <Textarea
              id="oqueMudou"
              value={oqueMudou}
              onChange={(e) => setOqueMudou(e.target.value)}
              placeholder="Descreva as alterações realizadas no documento..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {oqueMudou.length}/500 caracteres
            </p>
          </div>

          {/* Changelog - Por que mudou */}
          <div className="space-y-2">
            <Label htmlFor="porqueMudou">Por que mudou? *</Label>
            <Textarea
              id="porqueMudou"
              value={porqueMudou}
              onChange={(e) => setPorqueMudou(e.target.value)}
              placeholder="Justifique a necessidade das alterações..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {porqueMudou.length}/500 caracteres
            </p>
          </div>

          {/* Aprovado Por */}
          <div className="space-y-2">
            <Label htmlFor="aprovadoPor">Aprovado Por</Label>
            <Input
              id="aprovadoPor"
              value={aprovadoPor}
              onChange={(e) => setAprovadoPor(e.target.value)}
              placeholder="Nome do responsável pela aprovação"
            />
          </div>

          {/* Data de Aprovação */}
          <div className="space-y-2">
            <Label>Data de Aprovação</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataAprovacao && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataAprovacao ? (
                    format(dataAprovacao, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dataAprovacao}
                  onSelect={setDataAprovacao}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Nova Versão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
