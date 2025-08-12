
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Emprestimo, EmprestimoStatus } from "@/types/emprestimos";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emprestimo: Omit<Emprestimo, 'id'>) => void;
}

export const NovoEmprestimoModal = ({ isOpen, onClose, onSubmit }: NovoEmprestimoModalProps) => {
  const [formData, setFormData] = useState({
    cnpjCliente: "",
    nomeCliente: "",
    numeroDanfeEmprestimo: "",
    referenciaProdutoEmprestado: "",
    descricaoProdutoEmprestado: "",
    valorEmprestimoDolar: "",
    dataEmprestimo: "",
    dataSaida: "",
    idImportacaoDireta: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cnpjCliente || !formData.nomeCliente || !formData.valorEmprestimoDolar) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const novoEmprestimo: Omit<Emprestimo, 'id'> = {
      numeroProcesso: `EMP-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      cnpjCliente: formData.cnpjCliente,
      nomeCliente: formData.nomeCliente,
      numeroDanfeEmprestimo: formData.numeroDanfeEmprestimo,
      referenciaProdutoEmprestado: formData.referenciaProdutoEmprestado,
      descricaoProdutoEmprestado: formData.descricaoProdutoEmprestado,
      valorEmprestimoDolar: parseFloat(formData.valorEmprestimoDolar),
      dataEmprestimo: formData.dataEmprestimo,
      dataSaida: formData.dataSaida,
      idImportacaoDireta: formData.idImportacaoDireta || undefined,
      status: EmprestimoStatus.ATIVO
    };

    onSubmit(novoEmprestimo);
    toast.success("Empréstimo criado com sucesso!");
    onClose();
    
    // Reset form
    setFormData({
      cnpjCliente: "",
      nomeCliente: "",
      numeroDanfeEmprestimo: "",
      referenciaProdutoEmprestado: "",
      descricaoProdutoEmprestado: "",
      valorEmprestimoDolar: "",
      dataEmprestimo: "",
      dataSaida: "",
      idImportacaoDireta: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Empréstimo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cnpjCliente">CNPJ do Cliente *</Label>
              <Input
                id="cnpjCliente"
                value={formData.cnpjCliente}
                onChange={(e) => setFormData({ ...formData, cnpjCliente: e.target.value })}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="nomeCliente">Nome do Cliente *</Label>
              <Input
                id="nomeCliente"
                value={formData.nomeCliente}
                onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
                placeholder="Nome do cliente"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numeroDanfeEmprestimo">Número DANFE Empréstimo</Label>
              <Input
                id="numeroDanfeEmprestimo"
                value={formData.numeroDanfeEmprestimo}
                onChange={(e) => setFormData({ ...formData, numeroDanfeEmprestimo: e.target.value })}
                placeholder="DANFE-001-2024"
              />
            </div>
            
            <div>
              <Label htmlFor="valorEmprestimoDolar">Valor Empréstimo (USD) *</Label>
              <Input
                id="valorEmprestimoDolar"
                type="number"
                step="0.01"
                value={formData.valorEmprestimoDolar}
                onChange={(e) => setFormData({ ...formData, valorEmprestimoDolar: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referenciaProdutoEmprestado">Referência do Produto</Label>
              <Input
                id="referenciaProdutoEmprestado"
                value={formData.referenciaProdutoEmprestado}
                onChange={(e) => setFormData({ ...formData, referenciaProdutoEmprestado: e.target.value })}
                placeholder="PROD-12345"
              />
            </div>
            
            <div>
              <Label htmlFor="idImportacaoDireta">ID Importação Direta</Label>
              <Input
                id="idImportacaoDireta"
                value={formData.idImportacaoDireta}
                onChange={(e) => setFormData({ ...formData, idImportacaoDireta: e.target.value })}
                placeholder="IMP-2024-001"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="descricaoProdutoEmprestado">Descrição do Produto</Label>
            <Textarea
              id="descricaoProdutoEmprestado"
              value={formData.descricaoProdutoEmprestado}
              onChange={(e) => setFormData({ ...formData, descricaoProdutoEmprestado: e.target.value })}
              placeholder="Descrição detalhada do produto emprestado"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataEmprestimo">Data do Empréstimo</Label>
              <Input
                id="dataEmprestimo"
                type="date"
                value={formData.dataEmprestimo}
                onChange={(e) => setFormData({ ...formData, dataEmprestimo: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="dataSaida">Data de Saída</Label>
              <Input
                id="dataSaida"
                type="date"
                value={formData.dataSaida}
                onChange={(e) => setFormData({ ...formData, dataSaida: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Empréstimo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
