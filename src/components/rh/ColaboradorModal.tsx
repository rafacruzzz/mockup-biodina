
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X, Save, Calendar } from "lucide-react";

interface ColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColaboradorModal = ({ isOpen, onClose }: ColaboradorModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    empregador: '',
    categoria: '',
    profissao: '',
    nivelCargo: '',
    departamento: '',
    dataNascimento: '',
    dataAdmissao: '',
    responsavel: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Salvando colaborador:', formData);
    onClose();
  };

  const categorias = [
    { value: 'efetivo', label: 'Efetivo' },
    { value: 'terceirizado', label: 'Terceirizado' },
    { value: 'estagiario', label: 'Estagiário' },
    { value: 'temporario', label: 'Temporário' }
  ];

  const niveis = [
    { value: 'junior', label: 'Júnior' },
    { value: 'pleno', label: 'Pleno' },
    { value: 'senior', label: 'Sênior' },
    { value: 'especialista', label: 'Especialista' },
    { value: 'coordenador', label: 'Coordenador' },
    { value: 'gerente', label: 'Gerente' },
    { value: 'diretor', label: 'Diretor' }
  ];

  const departamentos = [
    { value: 'rh', label: 'Recursos Humanos' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'operacional', label: 'Operacional' },
    { value: 'ti', label: 'Tecnologia da Informação' },
    { value: 'juridico', label: 'Jurídico' },
    { value: 'marketing', label: 'Marketing' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-biodina-blue">
            Novo Colaborador
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Digite o nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empregador">Empregador *</Label>
            <Input
              id="empregador"
              value={formData.empregador}
              onChange={(e) => handleInputChange('empregador', e.target.value)}
              placeholder="Digite o nome do empregador"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.value} value={categoria.value}>
                    {categoria.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profissao">Profissão *</Label>
            <Input
              id="profissao"
              value={formData.profissao}
              onChange={(e) => handleInputChange('profissao', e.target.value)}
              placeholder="Digite a profissão"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nivelCargo">Nível do Cargo *</Label>
            <Select value={formData.nivelCargo} onValueChange={(value) => handleInputChange('nivelCargo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                {niveis.map((nivel) => (
                  <SelectItem key={nivel.value} value={nivel.value}>
                    {nivel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento *</Label>
            <Select value={formData.departamento} onValueChange={(value) => handleInputChange('departamento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o departamento" />
              </SelectTrigger>
              <SelectContent>
                {departamentos.map((depto) => (
                  <SelectItem key={depto.value} value={depto.value}>
                    {depto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
            <Input
              id="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataAdmissao">Data Admissão *</Label>
            <Input
              id="dataAdmissao"
              type="date"
              value={formData.dataAdmissao}
              onChange={(e) => handleInputChange('dataAdmissao', e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="responsavel">Responsável/Gerente/Chefe</Label>
            <Input
              id="responsavel"
              value={formData.responsavel}
              onChange={(e) => handleInputChange('responsavel', e.target.value)}
              placeholder="Digite o nome do responsável"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ColaboradorModal;
