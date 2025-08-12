
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useEmprestimos } from '@/hooks/useEmprestimos';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RegistrarDevolucaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  emprestimo: any;
}

const RegistrarDevolucaoModal = ({ isOpen, onClose, emprestimo }: RegistrarDevolucaoModalProps) => {
  const { createDevolucao, isCreating } = useEmprestimos();
  
  const [formData, setFormData] = useState({
    danfe_retorno: '',
    ref_produto_recebido: '',
    desc_produto_recebido: '',
    valor_retornado_dolar: '',
    data_retorno: '',
    data_baixa: '',
    observacoes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emprestimo) return;
    
    try {
      const devolucaoData = {
        emprestimo_id: emprestimo.id,
        ...formData,
        valor_retornado_dolar: parseFloat(formData.valor_retornado_dolar)
      };

      await createDevolucao(devolucaoData);
      toast.success('Devolução registrada com sucesso!');
      onClose();
      
      // Reset form
      setFormData({
        danfe_retorno: '',
        ref_produto_recebido: '',
        desc_produto_recebido: '',
        valor_retornado_dolar: '',
        data_retorno: '',
        data_baixa: '',
        observacoes: ''
      });
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      toast.error('Erro ao registrar devolução. Tente novamente.');
    }
  };

  if (!isOpen || !emprestimo) return null;

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-biodina-blue">
            Registrar Devolução
          </DialogTitle>
        </DialogHeader>

        {/* Informações do Empréstimo */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-3">Dados do Empréstimo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Processo:</span>
              <p className="font-medium">{emprestimo.numero_processo}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Cliente:</span>
              <p className="font-medium">{emprestimo.cliente_nome}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Produto Emprestado:</span>
              <p className="font-medium">{emprestimo.ref_produto_emprestado}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Valor Emprestado:</span>
              <p className="font-medium text-biodina-blue">
                {formatCurrency(emprestimo.valor_emprestimo_dolar || 0)}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Saldo Pendente:</span>
              <p className="font-medium text-red-600">
                {formatCurrency(emprestimo.saldo || 0)}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Status:</span>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 ml-2">
                {emprestimo.status}
              </Badge>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ref_produto_recebido">Referência do Produto Recebido *</Label>
              <Input
                id="ref_produto_recebido"
                value={formData.ref_produto_recebido}
                onChange={(e) => handleInputChange('ref_produto_recebido', e.target.value)}
                placeholder="REF-001 (pode ser diferente do emprestado)"
                required
              />
            </div>

            <div>
              <Label htmlFor="valor_retornado_dolar">Valor Retornado (USD) *</Label>
              <Input
                id="valor_retornado_dolar"
                type="number"
                step="0.01"
                value={formData.valor_retornado_dolar}
                onChange={(e) => handleInputChange('valor_retornado_dolar', e.target.value)}
                placeholder="1000.00"
                required
              />
            </div>

            <div>
              <Label htmlFor="data_retorno">Data do Retorno *</Label>
              <Input
                id="data_retorno"
                type="date"
                value={formData.data_retorno}
                onChange={(e) => handleInputChange('data_retorno', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="data_baixa">Data da Baixa</Label>
              <Input
                id="data_baixa"
                type="date"
                value={formData.data_baixa}
                onChange={(e) => handleInputChange('data_baixa', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="danfe_retorno">DANFE do Retorno</Label>
              <Input
                id="danfe_retorno"
                value={formData.danfe_retorno}
                onChange={(e) => handleInputChange('danfe_retorno', e.target.value)}
                placeholder="987654321"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="desc_produto_recebido">Descrição do Produto Recebido</Label>
            <Textarea
              id="desc_produto_recebido"
              value={formData.desc_produto_recebido}
              onChange={(e) => handleInputChange('desc_produto_recebido', e.target.value)}
              placeholder="Descrição detalhada do produto recebido"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações adicionais sobre a devolução"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700"
              disabled={isCreating}
            >
              {isCreating ? 'Registrando...' : 'Registrar Devolução'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrarDevolucaoModal;
