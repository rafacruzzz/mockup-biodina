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

interface ComparativoTecnicoModalProps {
  open: boolean;
  onClose: () => void;
  comparativo: any;
  onSalvar: (comparativo: any) => void;
  produto: Produto;
}

export function ComparativoTecnicoModal({
  open,
  onClose,
  comparativo,
  onSalvar,
  produto,
}: ComparativoTecnicoModalProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    produtoPrincipal: "",
    produtoConcorrente: "",
    caracteristicasPrincipal: "",
    caracteristicasConcorrente: "",
    vantagensPrincipal: "",
    desvantagensConcorrente: "",
    conclusao: "",
  });

  useEffect(() => {
    if (comparativo) {
      setFormData({
        titulo: comparativo.titulo || "",
        produtoPrincipal: comparativo.conteudo?.produtoPrincipal || produto.nome,
        produtoConcorrente: comparativo.conteudo?.produtoConcorrente || "",
        caracteristicasPrincipal: comparativo.conteudo?.caracteristicasPrincipal || "",
        caracteristicasConcorrente: comparativo.conteudo?.caracteristicasConcorrente || "",
        vantagensPrincipal: comparativo.conteudo?.vantagensPrincipal || "",
        desvantagensConcorrente: comparativo.conteudo?.desvantagensConcorrente || "",
        conclusao: comparativo.conteudo?.conclusao || "",
      });
    } else {
      setFormData({
        titulo: "",
        produtoPrincipal: produto.nome,
        produtoConcorrente: "",
        caracteristicasPrincipal: "",
        caracteristicasConcorrente: "",
        vantagensPrincipal: "",
        desvantagensConcorrente: "",
        conclusao: "",
      });
    }
  }, [comparativo, produto, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo.trim()) {
      toast.error("Informe o título do comparativo");
      return;
    }

    if (!formData.produtoConcorrente.trim()) {
      toast.error("Informe o produto concorrente");
      return;
    }

    const novoComparativo = {
      id: comparativo?.id || `comp-${Date.now()}`,
      titulo: formData.titulo,
      criadoPor: "Usuário Atual",
      data: new Date(),
      conteudo: {
        produtoPrincipal: formData.produtoPrincipal,
        produtoConcorrente: formData.produtoConcorrente,
        caracteristicasPrincipal: formData.caracteristicasPrincipal,
        caracteristicasConcorrente: formData.caracteristicasConcorrente,
        vantagensPrincipal: formData.vantagensPrincipal,
        desvantagensConcorrente: formData.desvantagensConcorrente,
        conclusao: formData.conclusao,
      },
    };

    onSalvar(novoComparativo);
    toast.success(comparativo ? "Comparativo atualizado" : "Comparativo criado com sucesso");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {comparativo ? "Editar Comparativo Técnico" : "Novo Comparativo Técnico"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Título */}
          <div>
            <Label htmlFor="titulo">Título do Comparativo *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              placeholder="Ex: ABL800 FLEX vs Concorrente X"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Produto Principal */}
            <div>
              <Label htmlFor="produtoPrincipal">Produto Principal</Label>
              <Input
                id="produtoPrincipal"
                value={formData.produtoPrincipal}
                onChange={(e) => handleInputChange("produtoPrincipal", e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Produto Concorrente */}
            <div>
              <Label htmlFor="produtoConcorrente">Produto Concorrente *</Label>
              <Input
                id="produtoConcorrente"
                value={formData.produtoConcorrente}
                onChange={(e) => handleInputChange("produtoConcorrente", e.target.value)}
                placeholder="Nome do produto concorrente"
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Características Produto Principal */}
            <div>
              <Label htmlFor="caracteristicasPrincipal">
                Características Técnicas - {formData.produtoPrincipal}
              </Label>
              <Textarea
                id="caracteristicasPrincipal"
                value={formData.caracteristicasPrincipal}
                onChange={(e) => handleInputChange("caracteristicasPrincipal", e.target.value)}
                placeholder="Descreva as características técnicas do produto principal"
                className="mt-2 min-h-[150px]"
              />
            </div>

            {/* Características Produto Concorrente */}
            <div>
              <Label htmlFor="caracteristicasConcorrente">
                Características Técnicas - {formData.produtoConcorrente || "Concorrente"}
              </Label>
              <Textarea
                id="caracteristicasConcorrente"
                value={formData.caracteristicasConcorrente}
                onChange={(e) =>
                  handleInputChange("caracteristicasConcorrente", e.target.value)
                }
                placeholder="Descreva as características técnicas do produto concorrente"
                className="mt-2 min-h-[150px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Vantagens Produto Principal */}
            <div>
              <Label htmlFor="vantagensPrincipal">
                Vantagens - {formData.produtoPrincipal}
              </Label>
              <Textarea
                id="vantagensPrincipal"
                value={formData.vantagensPrincipal}
                onChange={(e) => handleInputChange("vantagensPrincipal", e.target.value)}
                placeholder="Liste as vantagens do produto principal"
                className="mt-2 min-h-[120px]"
              />
            </div>

            {/* Desvantagens Produto Concorrente */}
            <div>
              <Label htmlFor="desvantagensConcorrente">
                Desvantagens - {formData.produtoConcorrente || "Concorrente"}
              </Label>
              <Textarea
                id="desvantagensConcorrente"
                value={formData.desvantagensConcorrente}
                onChange={(e) =>
                  handleInputChange("desvantagensConcorrente", e.target.value)
                }
                placeholder="Liste as desvantagens do produto concorrente"
                className="mt-2 min-h-[120px]"
              />
            </div>
          </div>

          {/* Conclusão */}
          <div>
            <Label htmlFor="conclusao">Conclusão</Label>
            <Textarea
              id="conclusao"
              value={formData.conclusao}
              onChange={(e) => handleInputChange("conclusao", e.target.value)}
              placeholder="Conclusão do comparativo técnico"
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
            {comparativo ? "Atualizar" : "Salvar"} Comparativo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
