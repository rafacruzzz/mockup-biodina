import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlanilhaAcaoCampoData } from "@/types/acaoCampo";
import { modules } from "@/data/cadastroModules";
import { produtosMock } from "@/data/produtos";

interface Props {
  initialData?: PlanilhaAcaoCampoData;
  onSave: (dados: PlanilhaAcaoCampoData) => void;
  onCancel: () => void;
}

const clientes = (modules as any).pessoas?.subModules?.clientes?.data || [];

export const PlanilhaAcaoCampoForm = ({ initialData, onSave, onCancel }: Props) => {
  const [formData, setFormData] = useState<PlanilhaAcaoCampoData>(
    initialData || {
      numeroAcaoCampo: '',
      clienteId: '',
      clienteNome: '',
      uf: '',
      modelo: '',
      nsLote: '',
      setor: '',
      email: '',
      telefone: '',
      produtoId: '',
      produtoNome: '',
      versaoWindows: '',
      versaoSoftware: '',
    }
  );

  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => String(c.id) === clienteId);
    if (cliente) {
      setFormData(prev => ({
        ...prev,
        clienteId: String(cliente.id),
        clienteNome: cliente.nome,
        uf: cliente.uf || '',
      }));
    }
  };

  const handleProdutoChange = (produtoId: string) => {
    const produto = produtosMock.find(p => p.id === produtoId);
    if (produto) {
      setFormData(prev => ({
        ...prev,
        produtoId: produto.id,
        produtoNome: produto.nome,
      }));
    }
  };

  const handleChange = (field: keyof PlanilhaAcaoCampoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.clienteId) {
      return;
    }
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Número da ação de campo</Label>
        <Input value={formData.numeroAcaoCampo} onChange={e => handleChange('numeroAcaoCampo', e.target.value)} placeholder="Informe o número da ação de campo" />
      </div>

      <div className="space-y-2">
        <Label>Cliente</Label>
        <Select value={formData.clienteId} onValueChange={handleClienteChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o cliente" />
          </SelectTrigger>
          <SelectContent>
            {clientes.map(c => (
              <SelectItem key={c.id} value={String(c.id)}>{c.nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>UF</Label>
        <Input value={formData.uf} disabled placeholder="Preenchido automaticamente" />
      </div>

      <div className="space-y-2">
        <Label>Produto</Label>
        <Select value={formData.produtoId} onValueChange={handleProdutoChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o produto" />
          </SelectTrigger>
          <SelectContent>
            {produtosMock.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Modelo</Label>
          <Input value={formData.modelo} onChange={e => handleChange('modelo', e.target.value)} placeholder="Informe o modelo" />
        </div>
        <div className="space-y-2">
          <Label>NS/Lote</Label>
          <Input value={formData.nsLote} onChange={e => handleChange('nsLote', e.target.value)} placeholder="Informe o NS/Lote" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Setor</Label>
        <Input value={formData.setor} onChange={e => handleChange('setor', e.target.value)} placeholder="Informe o setor" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="email@exemplo.com" />
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input value={formData.telefone} onChange={e => handleChange('telefone', e.target.value)} placeholder="(00) 00000-0000" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Versão do Windows</Label>
          <Input value={formData.versaoWindows} onChange={e => handleChange('versaoWindows', e.target.value)} placeholder="Ex: Windows 11" />
        </div>
        <div className="space-y-2">
          <Label>Versão do Software</Label>
          <Input value={formData.versaoSoftware} onChange={e => handleChange('versaoSoftware', e.target.value)} placeholder="Ex: v2.5.1" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleSubmit}>Salvar</Button>
      </div>
    </div>
  );
};
