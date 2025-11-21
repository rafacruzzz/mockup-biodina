import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plano, PerfilAcesso } from "@/types/super";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, X, Plus } from "lucide-react";

interface PlanoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (planoData: Omit<Plano, "id" | "dataCriacao">) => void;
  perfis: PerfilAcesso[];
  planoParaEditar?: Plano;
}

export const PlanoModal = ({ open, onOpenChange, onSave, perfis, planoParaEditar }: PlanoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
    perfilId: '',
    quantidadeFiliais: '',
    descricao: '',
    beneficios: [] as string[]
  });
  const [novoBeneficio, setNovoBeneficio] = useState('');

  useEffect(() => {
    if (planoParaEditar) {
      setFormData({
        nome: planoParaEditar.nome,
        valor: planoParaEditar.valor.toString(),
        perfilId: planoParaEditar.perfilId,
        quantidadeFiliais: planoParaEditar.quantidadeFiliais.toString(),
        descricao: planoParaEditar.descricao || '',
        beneficios: [...planoParaEditar.beneficios]
      });
    } else {
      setFormData({
        nome: '',
        valor: '',
        perfilId: '',
        quantidadeFiliais: '',
        descricao: '',
        beneficios: []
      });
    }
  }, [planoParaEditar, open]);

  const handleAdicionarBeneficio = () => {
    if (novoBeneficio.trim()) {
      setFormData({
        ...formData,
        beneficios: [...formData.beneficios, novoBeneficio.trim()]
      });
      setNovoBeneficio('');
    }
  };

  const handleRemoverBeneficio = (index: number) => {
    setFormData({
      ...formData,
      beneficios: formData.beneficios.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    // Validações
    if (!formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome do plano é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const valor = parseFloat(formData.valor);
    if (isNaN(valor) || valor <= 0) {
      toast({
        title: "Erro",
        description: "O valor deve ser maior que zero",
        variant: "destructive"
      });
      return;
    }

    if (!formData.perfilId) {
      toast({
        title: "Erro",
        description: "Selecione um perfil vinculado",
        variant: "destructive"
      });
      return;
    }

    const quantidadeFiliais = parseInt(formData.quantidadeFiliais);
    if (isNaN(quantidadeFiliais) || quantidadeFiliais <= 0) {
      toast({
        title: "Erro",
        description: "A quantidade de filiais deve ser maior que zero",
        variant: "destructive"
      });
      return;
    }

    if (formData.beneficios.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um benefício",
        variant: "destructive"
      });
      return;
    }

    const planoData = {
      nome: formData.nome,
      valor: valor,
      perfilId: formData.perfilId,
      quantidadeFiliais: quantidadeFiliais,
      descricao: formData.descricao || undefined,
      beneficios: formData.beneficios,
      dataAtualizacao: planoParaEditar ? new Date().toISOString() : undefined
    };

    onSave(planoData);
    toast({
      title: "Sucesso",
      description: planoParaEditar ? "Plano atualizado com sucesso!" : "Plano criado com sucesso!"
    });
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdicionarBeneficio();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {planoParaEditar ? "Editar Plano" : "Criar Novo Plano"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Plano *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Plano Premium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor Mensal (R$) *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                placeholder="199.90"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidadeFiliais">Quantidade de Filiais *</Label>
              <Input
                id="quantidadeFiliais"
                type="number"
                min="1"
                value={formData.quantidadeFiliais}
                onChange={(e) => setFormData({ ...formData, quantidadeFiliais: e.target.value })}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="perfil">Perfil Vinculado *</Label>
            <Select
              value={formData.perfilId}
              onValueChange={(value) => setFormData({ ...formData, perfilId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um perfil" />
              </SelectTrigger>
              <SelectContent>
                {perfis.map(perfil => (
                  <SelectItem key={perfil.id} value={perfil.id}>
                    {perfil.nome} ({perfil.modulosHabilitados.length} módulos)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva o plano..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Benefícios *</Label>
            <div className="flex gap-2">
              <Input
                value={novoBeneficio}
                onChange={(e) => setNovoBeneficio(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite um benefício..."
              />
              <Button
                type="button"
                onClick={handleAdicionarBeneficio}
                disabled={!novoBeneficio.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {formData.beneficios.length > 0 && (
              <div className="mt-4 space-y-2 border rounded-lg p-4">
                {formData.beneficios.map((beneficio, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 p-2 bg-muted rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{beneficio}</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoverBeneficio(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {planoParaEditar ? "Salvar Alterações" : "Criar Plano"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};