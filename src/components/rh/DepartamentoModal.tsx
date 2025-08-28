import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rhModules } from "@/data/rhModules";
import { Building2, Users, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Departamento {
  id: string;
  nome: string;
  descricao: string;
  responsavel: string;
  funcionarios: number;
}

interface DepartamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepartamentoModal = ({ isOpen, onClose }: DepartamentoModalProps) => {
  const { toast } = useToast();
  const [departamentos, setDepartamentos] = useState<Departamento[]>([
    { id: '1', nome: 'Tecnologia da Informação', descricao: 'Desenvolvimento e infraestrutura', responsavel: 'João Silva', funcionarios: 8 },
    { id: '2', nome: 'Comercial', descricao: 'Vendas e relacionamento com clientes', responsavel: 'Maria Santos', funcionarios: 12 },
    { id: '3', nome: 'Recursos Humanos', descricao: 'Gestão de pessoas e processos', responsavel: 'Ana Costa', funcionarios: 4 }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [funcionarios, setFuncionarios] = useState(0);

  const handleAddDepartamento = () => {
    const novoDepartamento = {
      id: Date.now().toString(),
      nome,
      descricao,
      responsavel,
      funcionarios
    };
    setDepartamentos([...departamentos, novoDepartamento]);
    setNome('');
    setDescricao('');
    setResponsavel('');
    setFuncionarios(0);
    toast({
      title: "Departamento adicionado",
      description: `O departamento ${nome} foi adicionado com sucesso.`,
    });
  };

  const handleEditDepartamento = (id: string) => {
    const departamento = departamentos.find(dep => dep.id === id);
    if (departamento) {
      setIsEditing(true);
      setEditingId(id);
      setNome(departamento.nome);
      setDescricao(departamento.descricao);
      setResponsavel(departamento.responsavel);
      setFuncionarios(departamento.funcionarios);
    }
  };

  const handleUpdateDepartamento = () => {
    if (editingId) {
      const updatedDepartamentos = departamentos.map(dep =>
        dep.id === editingId ? { ...dep, nome, descricao, responsavel, funcionarios } : dep
      );
      setDepartamentos(updatedDepartamentos);
      setIsEditing(false);
      setEditingId(null);
      setNome('');
      setDescricao('');
      setResponsavel('');
      setFuncionarios(0);
      toast({
        title: "Departamento atualizado",
        description: `O departamento foi atualizado com sucesso.`,
      });
    }
  };

  const handleDeleteDepartamento = (id: string) => {
    setDepartamentos(departamentos.filter(dep => dep.id !== id));
    toast({
      title: "Departamento removido",
      description: `O departamento foi removido com sucesso.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Gerenciar Departamentos
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário de Adição/Edição */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {isEditing ? 'Editar Departamento' : 'Adicionar Departamento'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Departamento</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Tecnologia da Informação"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Ex: Desenvolvimento e infraestrutura"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  placeholder="Ex: João Silva"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funcionarios">Número de Funcionários</Label>
                <Input
                  id="funcionarios"
                  type="number"
                  value={funcionarios}
                  onChange={(e) => setFuncionarios(Number(e.target.value))}
                  placeholder="Ex: 8"
                />
              </div>
              <Button onClick={isEditing ? handleUpdateDepartamento : handleAddDepartamento}>
                {isEditing ? 'Atualizar Departamento' : 'Adicionar Departamento'}
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Departamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Departamentos Existentes
                <Badge variant="secondary" className="ml-2">
                  {departamentos.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {departamentos.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum departamento cadastrado.</p>
              ) : (
                <div className="space-y-3">
                  {departamentos.map((departamento) => (
                    <Card key={departamento.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm font-medium">{departamento.nome}</CardTitle>
                          <p className="text-xs text-gray-500">{departamento.descricao}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {departamento.funcionarios}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditDepartamento(departamento.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleDeleteDepartamento(departamento.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepartamentoModal;
