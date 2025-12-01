import { useState, useEffect } from "react";
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
import { Produto } from "@/types/produto";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface JustificativaTecnicaModalProps {
  open: boolean;
  onClose: () => void;
  justificativa: any;
  onSalvar: (justificativa: any) => void;
  produto: Produto;
}

export function JustificativaTecnicaModal({
  open,
  onClose,
  justificativa,
  onSalvar,
  produto,
}: JustificativaTecnicaModalProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    objetoLicitacao: "",
    necessidade: "",
    especificacoesTecnicas: "",
    justificativaEspecificacoes: "",
    beneficiosEsperados: "",
    impactoOrcamentario: "",
    riscosProdutoInferior: "",
    conclusao: "",
  });

  useEffect(() => {
    if (justificativa) {
      setFormData({
        titulo: justificativa.titulo || "",
        objetoLicitacao: justificativa.conteudo?.objetoLicitacao || "",
        necessidade: justificativa.conteudo?.necessidade || "",
        especificacoesTecnicas: justificativa.conteudo?.especificacoesTecnicas || "",
        justificativaEspecificacoes: justificativa.conteudo?.justificativaEspecificacoes || "",
        beneficiosEsperados: justificativa.conteudo?.beneficiosEsperados || "",
        impactoOrcamentario: justificativa.conteudo?.impactoOrcamentario || "",
        riscosProdutoInferior: justificativa.conteudo?.riscosProdutoInferior || "",
        conclusao: justificativa.conteudo?.conclusao || "",
      });
    } else {
      setFormData({
        titulo: "",
        objetoLicitacao: "",
        necessidade: "",
        especificacoesTecnicas: "",
        justificativaEspecificacoes: "",
        beneficiosEsperados: "",
        impactoOrcamentario: "",
        riscosProdutoInferior: "",
        conclusao: "",
      });
    }
  }, [justificativa, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo.trim()) {
      toast.error("Informe o título da justificativa");
      return;
    }

    const novaJustificativa = {
      id: justificativa?.id || `just-${Date.now()}`,
      titulo: formData.titulo,
      criadoPor: "Usuário Atual",
      data: new Date(),
      conteudo: {
        objetoLicitacao: formData.objetoLicitacao,
        necessidade: formData.necessidade,
        especificacoesTecnicas: formData.especificacoesTecnicas,
        justificativaEspecificacoes: formData.justificativaEspecificacoes,
        beneficiosEsperados: formData.beneficiosEsperados,
        impactoOrcamentario: formData.impactoOrcamentario,
        riscosProdutoInferior: formData.riscosProdutoInferior,
        conclusao: formData.conclusao,
      },
    };

    onSalvar(novaJustificativa);
    toast.success(justificativa ? "Justificativa atualizada" : "Justificativa criada com sucesso");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {justificativa ? "Editar Justificativa Técnica" : "Nova Justificativa Técnica"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Título */}
          <div>
            <Label htmlFor="titulo">Título da Justificativa *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              placeholder="Ex: Justificativa Técnica para Aquisição de ABL800 FLEX"
              className="mt-2"
            />
          </div>

          {/* Objeto da Licitação */}
          <div>
            <Label htmlFor="objetoLicitacao">1. Objeto da Licitação</Label>
            <Textarea
              id="objetoLicitacao"
              value={formData.objetoLicitacao}
              onChange={(e) => handleInputChange("objetoLicitacao", e.target.value)}
              placeholder="Descreva o objeto da licitação"
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* Necessidade */}
          <div>
            <Label htmlFor="necessidade">2. Necessidade da Aquisição</Label>
            <Textarea
              id="necessidade"
              value={formData.necessidade}
              onChange={(e) => handleInputChange("necessidade", e.target.value)}
              placeholder="Justifique a necessidade da aquisição"
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* Especificações Técnicas */}
          <div>
            <Label htmlFor="especificacoesTecnicas">3. Especificações Técnicas Exigidas</Label>
            <Textarea
              id="especificacoesTecnicas"
              value={formData.especificacoesTecnicas}
              onChange={(e) => handleInputChange("especificacoesTecnicas", e.target.value)}
              placeholder="Liste as especificações técnicas necessárias"
              className="mt-2 min-h-[150px]"
            />
          </div>

          {/* Justificativa das Especificações */}
          <div>
            <Label htmlFor="justificativaEspecificacoes">
              4. Justificativa das Especificações
            </Label>
            <Textarea
              id="justificativaEspecificacoes"
              value={formData.justificativaEspecificacoes}
              onChange={(e) => handleInputChange("justificativaEspecificacoes", e.target.value)}
              placeholder="Justifique tecnicamente cada especificação exigida"
              className="mt-2 min-h-[150px]"
            />
          </div>

          {/* Benefícios Esperados */}
          <div>
            <Label htmlFor="beneficiosEsperados">5. Benefícios Esperados</Label>
            <Textarea
              id="beneficiosEsperados"
              value={formData.beneficiosEsperados}
              onChange={(e) => handleInputChange("beneficiosEsperados", e.target.value)}
              placeholder="Descreva os benefícios esperados com a aquisição"
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Impacto Orçamentário */}
          <div>
            <Label htmlFor="impactoOrcamentario">6. Impacto Orçamentário</Label>
            <Textarea
              id="impactoOrcamentario"
              value={formData.impactoOrcamentario}
              onChange={(e) => handleInputChange("impactoOrcamentario", e.target.value)}
              placeholder="Análise do impacto orçamentário"
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* Riscos de Produto Inferior */}
          <div>
            <Label htmlFor="riscosProdutoInferior">
              7. Riscos da Aquisição de Produto com Especificações Inferiores
            </Label>
            <Textarea
              id="riscosProdutoInferior"
              value={formData.riscosProdutoInferior}
              onChange={(e) => handleInputChange("riscosProdutoInferior", e.target.value)}
              placeholder="Descreva os riscos associados à aquisição de produto inferior"
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Conclusão */}
          <div>
            <Label htmlFor="conclusao">8. Conclusão</Label>
            <Textarea
              id="conclusao"
              value={formData.conclusao}
              onChange={(e) => handleInputChange("conclusao", e.target.value)}
              placeholder="Conclusão da justificativa técnica"
              className="mt-2 min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            {justificativa ? "Atualizar" : "Salvar"} Justificativa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
