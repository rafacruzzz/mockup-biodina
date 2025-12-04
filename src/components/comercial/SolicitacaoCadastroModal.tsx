
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SolicitacaoCadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolicitacaoCadastroModal = ({ isOpen, onClose }: SolicitacaoCadastroModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tipoCliente: '',
    nomeCliente: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpjCpf: '',
    cinRg: '',
    situacaoCadastral: 'ativo',
    dataCadastro: new Date().toISOString().split('T')[0],
    nomeMantenedor: '',
    cnpjMantenedor: '',
    telefone1: '',
    telefone2: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipoCliente || !formData.cnpjCpf || (!formData.nomeCliente && !formData.razaoSocial)) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha Tipo de Cliente, CNPJ/CPF e Nome do Cliente ou Razão Social.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de cadastro foi enviada para o setor responsável.",
    });
    
    setFormData({
      tipoCliente: '',
      nomeCliente: '',
      razaoSocial: '',
      nomeFantasia: '',
      cnpjCpf: '',
      cinRg: '',
      situacaoCadastral: 'ativo',
      dataCadastro: new Date().toISOString().split('T')[0],
      nomeMantenedor: '',
      cnpjMantenedor: '',
      telefone1: '',
      telefone2: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Solicitação de cadastro</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipoCliente">Tipo de Cliente *</Label>
              <Select
                value={formData.tipoCliente}
                onValueChange={(value) => setFormData({...formData, tipoCliente: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
                  <SelectItem value="pessoa_juridica">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nomeCliente">Nome do Cliente *</Label>
              <Input
                id="nomeCliente"
                value={formData.nomeCliente}
                onChange={(e) => setFormData({...formData, nomeCliente: e.target.value})}
                placeholder="Digite o nome do cliente"
              />
            </div>

            <div>
              <Label htmlFor="razaoSocial">Razão Social</Label>
              <Input
                id="razaoSocial"
                value={formData.razaoSocial}
                onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
                placeholder="Digite a razão social"
              />
            </div>

            <div>
              <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
              <Input
                id="nomeFantasia"
                value={formData.nomeFantasia}
                onChange={(e) => setFormData({...formData, nomeFantasia: e.target.value})}
                placeholder="Digite o nome fantasia"
              />
            </div>

            <div>
              <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
              <Input
                id="cnpjCpf"
                value={formData.cnpjCpf}
                onChange={(e) => setFormData({...formData, cnpjCpf: e.target.value})}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div>
              <Label htmlFor="cinRg">CIN/RG</Label>
              <Input
                id="cinRg"
                value={formData.cinRg}
                onChange={(e) => setFormData({...formData, cinRg: e.target.value})}
                placeholder="Digite o CIN ou RG"
              />
            </div>

            <div>
              <Label htmlFor="situacaoCadastral">Situação Cadastral</Label>
              <Select
                value={formData.situacaoCadastral}
                onValueChange={(value) => setFormData({...formData, situacaoCadastral: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="suspenso">Suspenso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dataCadastro">Data de Cadastro</Label>
              <Input
                id="dataCadastro"
                type="date"
                value={formData.dataCadastro}
                onChange={(e) => setFormData({...formData, dataCadastro: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="nomeMantenedor">Nome do Mantenedor</Label>
              <Input
                id="nomeMantenedor"
                value={formData.nomeMantenedor}
                onChange={(e) => setFormData({...formData, nomeMantenedor: e.target.value})}
                placeholder="Digite o nome do mantenedor"
              />
            </div>

            <div>
              <Label htmlFor="cnpjMantenedor">CNPJ do Mantenedor</Label>
              <Input
                id="cnpjMantenedor"
                value={formData.cnpjMantenedor}
                onChange={(e) => setFormData({...formData, cnpjMantenedor: e.target.value})}
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">Telefones</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefone1">Telefone 1</Label>
                <Input
                  id="telefone1"
                  value={formData.telefone1}
                  onChange={(e) => setFormData({...formData, telefone1: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <Label htmlFor="telefone2">Telefone 2</Label>
                <Input
                  id="telefone2"
                  value={formData.telefone2}
                  onChange={(e) => setFormData({...formData, telefone2: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitacaoCadastroModal;
