
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";

interface UserModalProps {
  onClose: () => void;
}

const UserModal = ({ onClose }: UserModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nivelAcesso: "",
    alertas: "ativo",
    status: "ativo"
  });

  const [acessosModulos, setAcessosModulos] = useState({
    aplicativos: false,
    pessoal: false,
    bi: false,
    cadastro: false,
    controladoria: false,
    comercial: false,
    estoque: false,
    compras: false,
    financeiro: false,
    contabilidade: false,
    rh: false,
    ti: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleChange = (module: string, checked: boolean) => {
    setAcessosModulos(prev => ({ ...prev, [module]: checked }));
  };

  const handleSave = () => {
    const selectedModules = Object.entries(acessosModulos)
      .filter(([_, selected]) => selected)
      .map(([module, _]) => module);
    
    console.log("Salvando usuário:", { ...formData, acessos: selectedModules });
    onClose();
  };

  const modulos = [
    { key: 'aplicativos', name: 'Aplicativos' },
    { key: 'pessoal', name: 'Pessoal' },
    { key: 'bi', name: 'BI' },
    { key: 'cadastro', name: 'Cadastro' },
    { key: 'controladoria', name: 'Controladoria' },
    { key: 'comercial', name: 'Comercial' },
    { key: 'estoque', name: 'Estoque' },
    { key: 'compras', name: 'Compras' },
    { key: 'financeiro', name: 'Financeiro' },
    { key: 'contabilidade', name: 'Contabilidade' },
    { key: 'rh', name: 'RH' },
    { key: 'ti', name: 'TI' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Cadastro de Usuário</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Ex: joao@biodina.com.br"
                />
              </div>

              <div>
                <Label htmlFor="nivelAcesso">Nível de Acesso</Label>
                <Select value={formData.nivelAcesso} onValueChange={(value) => handleInputChange("nivelAcesso", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                    <SelectItem value="visualizador">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alertas">Alertas</Label>
                <Select value={formData.alertas} onValueChange={(value) => handleInputChange("alertas", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Acessos aos Módulos</Label>
              <p className="text-sm text-gray-600 mb-4">Selecione os módulos que o usuário terá acesso</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {modulos.map((modulo) => (
                  <div key={modulo.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={modulo.key}
                      checked={acessosModulos[modulo.key as keyof typeof acessosModulos]}
                      onCheckedChange={(checked) => handleModuleChange(modulo.key, checked as boolean)}
                    />
                    <Label htmlFor={modulo.key} className="text-sm">
                      {modulo.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
