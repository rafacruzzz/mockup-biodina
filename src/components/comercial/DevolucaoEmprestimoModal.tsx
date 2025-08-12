
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Emprestimo, EmprestimoStatus } from "@/types/emprestimos";
import { formatCurrency } from "@/lib/utils";

interface DevolucaoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
  emprestimo: Emprestimo | null;
  onSubmit: (emprestimoAtualizado: Emprestimo) => void;
}

export const DevolucaoEmprestimoModal = ({ isOpen, onClose, emprestimo, onSubmit }: DevolucaoEmprestimoModalProps) => {
  const [formData, setFormData] = useState({
    numeroDanfeRetorno: "",
    referenciaProdutoRecebido: "",
    descricaoProdutoRecebido: "",
    dataRetorno: "",
    dataBaixa: "",
    valorRetornadoDolar: ""
  });

  if (!emprestimo) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.valorRetornadoDolar) {
      toast.error("Valor retornado é obrigatório");
      return;
    }

    const valorRetornado = parseFloat(formData.valorRetornadoDolar);
    let novoStatus: EmprestimoStatus;
    
    if (valorRetornado >= emprestimo.valorEmprestimoDolar) {
      novoStatus = EmprestimoStatus.DEVOLVIDO;
    } else if (valorRetornado > 0) {
      novoStatus = EmprestimoStatus.PARCIAL;
    } else {
      novoStatus = emprestimo.status;
    }

    const emprestimoAtualizado: Emprestimo = {
      ...emprestimo,
      numeroDanfeRetorno: formData.numeroDanfeRetorno,
      referenciaProdutoRecebido: formData.referenciaProdutoRecebido,
      descricaoProdutoRecebido: formData.descricaoProdutoRecebido,
      dataRetorno: formData.dataRetorno,
      dataBaixa: formData.dataBaixa,
      valorRetornadoDolar: valorRetornado,
      status: novoStatus
    };

    onSubmit(emprestimoAtualizado);
    toast.success("Devolução registrada com sucesso!");
    onClose();
    
    // Reset form
    setFormData({
      numeroDanfeRetorno: "",
      referenciaProdutoRecebido: "",
      descricaoProdutoRecebido: "",
      dataRetorno: "",
      dataBaixa: "",
      valorRetornadoDolar: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Devolução - {emprestimo.numeroProcesso}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Cliente:</strong> {emprestimo.nomeCliente}
            </div>
            <div>
              <strong>CNPJ:</strong> {emprestimo.cnpjCliente}
            </div>
            <div>
              <strong>Produto Emprestado:</strong> {emprestimo.descricaoProdutoEmprestado}
            </div>
            <div>
              <strong>Valor Emprestado:</strong> 
              <Badge variant="outline" className="ml-2">
                ${emprestimo.valorEmprestimoDolar.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Badge>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numeroDanfeRetorno">Número DANFE Retorno</Label>
              <Input
                id="numeroDanfeRetorno"
                value={formData.numeroDanfeRetorno}
                onChange={(e) => setFormData({ ...formData, numeroDanfeRetorno: e.target.value })}
                placeholder="DANFE-RET-001"
              />
            </div>
            
            <div>
              <Label htmlFor="valorRetornadoDolar">Valor Retornado (USD) *</Label>
              <Input
                id="valorRetornadoDolar"
                type="number"
                step="0.01"
                value={formData.valorRetornadoDolar}
                onChange={(e) => setFormData({ ...formData, valorRetornadoDolar: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referenciaProdutoRecebido">Referência Produto Recebido</Label>
              <Input
                id="referenciaProdutoRecebido"
                value={formData.referenciaProdutoRecebido}
                onChange={(e) => setFormData({ ...formData, referenciaProdutoRecebido: e.target.value })}
                placeholder="PROD-12345"
              />
            </div>
            
            <div>
              <Label htmlFor="dataRetorno">Data do Retorno</Label>
              <Input
                id="dataRetorno"
                type="date"
                value={formData.dataRetorno}
                onChange={(e) => setFormData({ ...formData, dataRetorno: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="descricaoProdutoRecebido">Descrição Produto Recebido</Label>
            <Textarea
              id="descricaoProdutoRecebido"
              value={formData.descricaoProdutoRecebido}
              onChange={(e) => setFormData({ ...formData, descricaoProdutoRecebido: e.target.value })}
              placeholder="Descrição do produto recebido na devolução"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="dataBaixa">Data da Baixa</Label>
            <Input
              id="dataBaixa"
              type="date"
              value={formData.dataBaixa}
              onChange={(e) => setFormData({ ...formData, dataBaixa: e.target.value })}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Registrar Devolução
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
