
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmprestimos } from '@/hooks/useEmprestimos';
import { toast } from 'sonner';

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
  importacaoDiretaId?: string;
}

const NovoEmprestimoModal = ({ isOpen, onClose, importacaoDiretaId }: NovoEmprestimoModalProps) => {
  const { createEmprestimo, isCreating } = useEmprestimos();
  
  const [formData, setFormData] = useState({
    cliente_cnpj: '',
    cliente_nome: '',
    danfe_emprestimo: '',
    ref_produto_emprestado: '',
    desc_produto_emprestado: '',
    valor_emprestimo_dolar: '',
    data_emprestimo: '',
    data_saida: '',
    id_importacao_direta: importacaoDiretaId || '',
    observacoes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const emprestimoData = {
        ...formData,
        valor_emprestimo_dolar: parseFloat(formData.valor_emprestimo_dolar),
        id_importacao_direta: formData.id_importacao_direta || null
      };

      await createEmprestimo(emprestimoData);
      toast.success('Empréstimo criado com sucesso!');
      onClose();
      
      // Reset form
      setFormData({
        cliente_cnpj: '',
        cliente_nome: '',
        danfe_emprestimo: '',
        ref_produto_emprestado: '',
        desc_produto_emprestado: '',
        valor_emprestimo_dolar: '',
        data_emprestimo: '',
        data_saida: '',
        id_importacao_direta: importacaoDiretaId || '',
        observacoes: ''
      });
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      toast.error('Erro ao criar empréstimo. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-biodina-blue">
            Novo Empréstimo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente_cnpj">CNPJ do Cliente *</Label>
              <Input
                id="cliente_cnpj"
                value={formData.cliente_cnpj}
                onChange={(e) => handleInputChange('cliente_cnpj', e.target.value)}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>

            <div>
              <Label htmlFor="cliente_nome">Nome do Cliente *</Label>
              <Input
                id="cliente_nome"
                value={formData.cliente_nome}
                onChange={(e) => handleInputChange('cliente_nome', e.target.value)}
                placeholder="Nome da empresa"
                required
              />
            </div>

            <div>
              <Label htmlFor="ref_produto_emprestado">Referência do Produto *</Label>
              <Input
                id="ref_produto_emprestado"
                value={formData.ref_produto_emprestado}
                onChange={(e) => handleInputChange('ref_produto_emprestado', e.target.value)}
                placeholder="REF-001"
                required
              />
            </div>

            <div>
              <Label htmlFor="valor_emprestimo_dolar">Valor em Dólar *</Label>
              <Input
                id="valor_emprestimo_dolar"
                type="number"
                step="0.01"
                value={formData.valor_emprestimo_dolar}
                onChange={(e) => handleInputChange('valor_emprestimo_dolar', e.target.value)}
                placeholder="1000.00"
                required
              />
            </div>

            <div>
              <Label htmlFor="data_emprestimo">Data do Empréstimo *</Label>
              <Input
                id="data_emprestimo"
                type="date"
                value={formData.data_emprestimo}
                onChange={(e) => handleInputChange('data_emprestimo', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="data_saida">Data de Saída</Label>
              <Input
                id="data_saida"
                type="date"
                value={formData.data_saida}
                onChange={(e) => handleInputChange('data_saida', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="danfe_emprestimo">DANFE do Empréstimo</Label>
              <Input
                id="danfe_emprestimo"
                value={formData.danfe_emprestimo}
                onChange={(e) => handleInputChange('danfe_emprestimo', e.target.value)}
                placeholder="123456789"
              />
            </div>

            <div>
              <Label htmlFor="id_importacao_direta">ID Importação Direta</Label>
              <Input
                id="id_importacao_direta"
                value={formData.id_importacao_direta}
                onChange={(e) => handleInputChange('id_importacao_direta', e.target.value)}
                placeholder="UUID da importação (opcional)"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="desc_produto_emprestado">Descrição do Produto</Label>
            <Textarea
              id="desc_produto_emprestado"
              value={formData.desc_produto_emprestado}
              onChange={(e) => handleInputChange('desc_produto_emprestado', e.target.value)}
              placeholder="Descrição detalhada do produto emprestado"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações adicionais sobre o empréstimo"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-biodina-gold hover:bg-biodina-gold/90"
              disabled={isCreating}
            >
              {isCreating ? 'Criando...' : 'Criar Empréstimo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEmprestimoModal;
