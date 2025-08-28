import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rhModules } from "@/data/rhModules";
import { TrendingUp, DollarSign, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NivelProgressao {
  id: string;
  nome: string;
  salarioMinimo: number;
  salarioMaximo: number;
  requisitos: string[];
  tempoMinimo: number;
}

interface NiveisProgressaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NiveisProgressaoModal = ({ isOpen, onClose }: NiveisProgressaoModalProps) => {
  const { toast } = useToast();
  const [niveis, setNiveis] = useState<NivelProgressao[]>([
    { id: '1', nome: 'Júnior', salarioMinimo: 3000, salarioMaximo: 5000, requisitos: ['Formação superior', '0-2 anos experiência'], tempoMinimo: 12 },
    { id: '2', nome: 'Pleno', salarioMinimo: 5000, salarioMaximo: 8000, requisitos: ['Formação superior', '2-5 anos experiência'], tempoMinimo: 24 }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingNivelId, setEditingNivelId] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [salarioMinimo, setSalarioMinimo] = useState<number>(0);
  const [salarioMaximo, setSalarioMaximo] = useState<number>(0);
  const [requisitos, setRequisitos] = useState<string[]>([]);
  const [tempoMinimo, setTempoMinimo] = useState<number>(0);

  const handleOpenModal = () => {
    setIsEditing(false);
    setEditingNivelId(null);
    setNome('');
    setSalarioMinimo(0);
    setSalarioMaximo(0);
    setRequisitos([]);
    setTempoMinimo(0);
  };

  const handleEditNivel = (nivel: NivelProgressao) => {
    setIsEditing(true);
    setEditingNivelId(nivel.id);
    setNome(nivel.nome);
    setSalarioMinimo(nivel.salarioMinimo);
    setSalarioMaximo(nivel.salarioMaximo);
    setRequisitos(nivel.requisitos);
    setTempoMinimo(nivel.tempoMinimo);
  };

  const handleSaveNivel = () => {
    if (isEditing && editingNivelId) {
      const updatedNiveis = niveis.map(nivel =>
        nivel.id === editingNivelId ? {
          ...nivel,
          nome,
          salarioMinimo,
          salarioMaximo,
          requisitos,
          tempoMinimo
        } : nivel
      );
      setNiveis(updatedNiveis);
      toast({
        title: "Nível atualizado com sucesso!",
        description: `O nível ${nome} foi atualizado.`,
      });
    } else {
      const novoNivel = {
        id: Date.now().toString(),
        nome,
        salarioMinimo,
        salarioMaximo,
        requisitos,
        tempoMinimo
      };
      setNiveis([...niveis, novoNivel]);
      toast({
        title: "Nível adicionado com sucesso!",
        description: `O nível ${nome} foi adicionado.`,
      });
    }
    onClose();
  };

  const handleDeleteNivel = (id: string) => {
    setNiveis(niveis.filter(nivel => nivel.id !== id));
    toast({
      title: "Nível removido com sucesso!",
      description: `O nível foi removido.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Níveis de Progressão</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Níveis */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Níveis Cadastrados</h3>
              <Button variant="outline" size="sm" onClick={handleOpenModal}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Nível
              </Button>
            </div>

            <div className="space-y-3">
              {niveis.map((nivel) => (
                <Card key={nivel.id} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{nivel.nome}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditNivel(nivel)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteNivel(nivel.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <DollarSign className="inline-block h-4 w-4 mr-1" />
                      {nivel.salarioMinimo} - {nivel.salarioMaximo}
                    </p>
                    <Badge variant="secondary" className="mt-2">Tempo Mínimo: {nivel.tempoMinimo} meses</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulário de Nível */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Editar Nível' : 'Adicionar Nível'}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Nível</Label>
                  <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempoMinimo">Tempo Mínimo (meses)</Label>
                  <Input id="tempoMinimo" type="number" value={tempoMinimo} onChange={(e) => setTempoMinimo(Number(e.target.value))} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salarioMinimo">Salário Mínimo</Label>
                  <Input id="salarioMinimo" type="number" value={salarioMinimo} onChange={(e) => setSalarioMinimo(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salarioMaximo">Salário Máximo</Label>
                  <Input id="salarioMaximo" type="number" value={salarioMaximo} onChange={(e) => setSalarioMaximo(Number(e.target.value))} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requisitos">Requisitos</Label>
                <Textarea id="requisitos" value={requisitos.join('\n')} onChange={(e) => setRequisitos(e.target.value.split('\n'))} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveNivel} className="ml-2">
            {isEditing ? 'Atualizar Nível' : 'Salvar Nível'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NiveisProgressaoModal;
