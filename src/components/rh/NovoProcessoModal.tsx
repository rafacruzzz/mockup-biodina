
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Briefcase } from "lucide-react";

interface NovoProcessoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovoProcessoModal = ({ isOpen, onClose }: NovoProcessoModalProps) => {
  const [formData, setFormData] = useState({
    titulo: '',
    departamento: '',
    cargo: '',
    descricao: '',
    requisitos: '',
    salario: '',
    tipoContrato: '',
    localTrabalho: ''
  });

  const handleSave = () => {
    console.log('Novo processo criado:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-biodina-blue">
                Novo Processo Seletivo
              </DialogTitle>
              <p className="text-gray-600">Crie uma nova vaga e processo de seleção</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Vaga *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                placeholder="Ex: Analista de Sistemas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departamento">Departamento *</Label>
              <Select 
                value={formData.departamento} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, departamento: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="rh">Recursos Humanos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="logistica">Logística</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo *</Label>
              <Input
                id="cargo"
                value={formData.cargo}
                onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                placeholder="Ex: Analista de Sistemas Júnior"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salario">Faixa Salarial</Label>
              <Input
                id="salario"
                value={formData.salario}
                onChange={(e) => setFormData(prev => ({ ...prev, salario: e.target.value }))}
                placeholder="Ex: R$ 4.000 - R$ 6.000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
              <Select 
                value={formData.tipoContrato} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, tipoContrato: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clt">CLT</SelectItem>
                  <SelectItem value="pj">PJ</SelectItem>
                  <SelectItem value="estagio">Estágio</SelectItem>
                  <SelectItem value="temporario">Temporário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="localTrabalho">Local de Trabalho</Label>
              <Select 
                value={formData.localTrabalho} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, localTrabalho: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o local" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="remoto">Remoto</SelectItem>
                  <SelectItem value="hibrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição da Vaga</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descreva as principais responsabilidades e atividades..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requisitos">Requisitos</Label>
            <Textarea
              id="requisitos"
              value={formData.requisitos}
              onChange={(e) => setFormData(prev => ({ ...prev, requisitos: e.target.value }))}
              placeholder="Liste os requisitos necessários para a vaga..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Processo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoProcessoModal;
