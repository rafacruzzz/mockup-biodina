import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock } from "lucide-react";
import { ChangelogEntry } from "@/types/produto";

interface NovaVersaoModalProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
  versaoAtual: string;
  tipoArtefato: ChangelogEntry['tipoArtefato'];
  bloqueadoSobrescrita: boolean;
  onCriarNovaVersao: (dados: {
    versaoNova: string;
    oqueMudou: string;
    porqueMudou: string;
    aprovadoPor?: string;
  }) => void;
}

export function NovaVersaoModal({
  open,
  onClose,
  titulo,
  versaoAtual,
  tipoArtefato,
  bloqueadoSobrescrita,
  onCriarNovaVersao,
}: NovaVersaoModalProps) {
  const [formData, setFormData] = useState({
    oqueMudou: "",
    porqueMudou: "",
    aprovadoPor: "",
  });

  const [errors, setErrors] = useState({
    oqueMudou: false,
    porqueMudou: false,
  });

  // Incrementa automaticamente a versão (ex: 1.0 -> 1.1)
  const calcularNovaVersao = (versaoAtual: string): string => {
    const partes = versaoAtual.split('.');
    if (partes.length >= 2) {
      const minor = parseInt(partes[1]) + 1;
      return `${partes[0]}.${minor}`;
    }
    return `${versaoAtual}.1`;
  };

  const versaoNova = calcularNovaVersao(versaoAtual);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {
      oqueMudou: !formData.oqueMudou.trim(),
      porqueMudou: !formData.porqueMudou.trim(),
    };

    setErrors(newErrors);

    if (newErrors.oqueMudou || newErrors.porqueMudou) {
      return;
    }

    onCriarNovaVersao({
      versaoNova,
      oqueMudou: formData.oqueMudou,
      porqueMudou: formData.porqueMudou,
      aprovadoPor: formData.aprovadoPor || undefined,
    });

    handleClose();
  };

  const handleClose = () => {
    setFormData({ oqueMudou: "", porqueMudou: "", aprovadoPor: "" });
    setErrors({ oqueMudou: false, porqueMudou: false });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Versão: {titulo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informação sobre versões */}
          <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Versão Atual</p>
              <Badge variant="outline" className="text-base">
                v{versaoAtual}
              </Badge>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Nova Versão</p>
              <Badge className="bg-primary text-primary-foreground text-base">
                v{versaoNova}
              </Badge>
            </div>
          </div>

          {/* Alerta para IFU/POP bloqueado */}
          {bloqueadoSobrescrita && (
            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-200">
                  Documento com Trava de Referência Normativa
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">
                  Este documento não pode ser sobrescrito. Apenas uma nova versão pode ser criada, mantendo o histórico completo.
                </p>
              </div>
            </div>
          )}

          {/* Campos obrigatórios */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="oqueMudou" className="flex items-center gap-2">
                O que mudou <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="oqueMudou"
                placeholder="Descreva as alterações realizadas nesta versão..."
                value={formData.oqueMudou}
                onChange={(e) => handleInputChange("oqueMudou", e.target.value)}
                className={`mt-1.5 min-h-[100px] ${errors.oqueMudou ? 'border-destructive' : ''}`}
              />
              {errors.oqueMudou && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Campo obrigatório
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="porqueMudou" className="flex items-center gap-2">
                Por que mudou <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="porqueMudou"
                placeholder="Justifique a necessidade desta alteração (adequação normativa, correção, melhoria, etc.)..."
                value={formData.porqueMudou}
                onChange={(e) => handleInputChange("porqueMudou", e.target.value)}
                className={`mt-1.5 min-h-[100px] ${errors.porqueMudou ? 'border-destructive' : ''}`}
              />
              {errors.porqueMudou && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Campo obrigatório
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="aprovadoPor">
                Aprovado por
              </Label>
              <Input
                id="aprovadoPor"
                placeholder="Nome do responsável pela aprovação (opcional)"
                value={formData.aprovadoPor}
                onChange={(e) => handleInputChange("aprovadoPor", e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-200">
              A versão antiga será mantida no histórico como somente leitura. Esta nova versão se tornará a versão atual ativa.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Criar Nova Versão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
