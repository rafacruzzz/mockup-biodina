
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useEmprestimos } from '@/hooks/useEmprestimos';
import { EmprestimoResumo, NovaDevolucaoData } from '@/types/emprestimo';
import { toast } from 'sonner';

interface DevolucaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  emprestimo: EmprestimoResumo | null;
}

const DevolucaoModal = ({ isOpen, onClose, emprestimo }: DevolucaoModalProps) => {
  const { registrarDevolucao, isRegisteringReturn, formatCurrency, getStatusColor } = useEmprestimos();
  
  const [formData, setFormData] = useState<NovaDevolucaoData>({
    emprestimo_id: '',
    danfe_retorno: '',
    ref_produto_recebido: '',
    desc_produto_recebido: '',
    data_retorno: new Date().toISOString().split('T')[0],
    data_baixa: '',
    valor_retornado_dolar: 0,
    observacoes: '',
  });

  const [valorRetorno, setValorRetorno] = useState<number>(0);

  const handleInputChange = (field: keyof NovaDevolucaoData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'valor_retornado_dolar') {
      setValorRetorno(value as number);
    }
  };

  const calcularNovoSaldo = () => {
    if (!emprestimo) return 0;
    return emprestimo.valor_emprestimo_dolar - (emprestimo.total_retornado + valorRetorno);
  };

  const getNovoStatus = () => {
    const novoSaldo = calcularNovoSaldo();
    if (novoSaldo === 0) return 'QUITADO';
    if (novoSaldo > 0) return 'PARCIAL';
    return 'EM_SUPERAVIT';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emprestimo || !formData.ref_produto_recebido || !formData.valor_retornado_dolar) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await registrarDevolucao({
        ...formData,
        emprestimo_id: emprestimo.id,
      });
      toast.success('Devolução registrada com sucesso!');
      onClose();
      setFormData({
        emprestimo_id: '',
        danfe_retorno: '',
        ref_produto_recebido: '',
        desc_produto_recebido: '',
        data_retorno: new Date().toISOString().split('T')[0],
        data_baixa: '',
        valor_retornado_dolar: 0,
        observacoes: '',
      });
      setValorRetorno(0);
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      toast.error('Erro ao registrar devolução. Tente novamente.');
    }
  };

  if (!isOpen || !emprestimo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-purple-600">
            Registrar Devolução - {emprestimo.numero_processo}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Empréstimo */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Informações do Empréstimo</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Cliente:</span> {emprestimo.cliente_nome}
              </div>
              <div>
                <span className="font-medium">CNPJ:</span> {emprestimo.cliente_cnpj}
              </div>
              <div>
                <span className="font-medium">Produto Emprestado:</span> {emprestimo.ref_produto_emprestado}
              </div>
              <div>
                <span className="font-medium">Valor Empréstimo:</span> {formatCurrency(emprestimo.valor_emprestimo_dolar)}
              </div>
              <div>
                <span className="font-medium">Total Retornado:</span> {formatCurrency(emprestimo.total_retornado)}
              </div>
              <div>
                <span className="font-medium">Saldo Atual:</span> 
                <span className={emprestimo.saldo > 0 ? 'text-red-600 font-medium ml-1' : 'text-green-600 font-medium ml-1'}>
                  {formatCurrency(Math.abs(emprestimo.saldo))}
                </span>
              </div>
              <div className="col-span-2">
                <span className="font-medium">Status:</span>
                <Badge className={`ml-2 ${getStatusColor(emprestimo.status)}`}>
                  {emprestimo.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="danfe_retorno">Número da DANFE de Retorno</Label>
              <Input
                id="danfe_retorno"
                value={formData.danfe_retorno}
                onChange={(e) => handleInputChange('danfe_retorno', e.target.value)}
                placeholder="Número da DANFE do retorno"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ref_produto_recebido">Referência do Produto Recebido *</Label>
                <Input
                  id="ref_produto_recebido"
                  value={formData.ref_produto_recebido}
                  onChange={(e) => handleInputChange('ref_produto_recebido', e.target.value)}
                  placeholder="REF-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="desc_produto_recebido">Descrição do Produto Recebido</Label>
                <Input
                  id="desc_produto_recebido"
                  value={formData.desc_produto_recebido}
                  onChange={(e) => handleInputChange('desc_produto_recebido', e.target.value)}
                  placeholder="Descrição detalhada"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="valor_retornado_dolar">Valor Retornado (USD) *</Label>
              <Input
                id="valor_retornado_dolar"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor_retornado_dolar}
                onChange={(e) => handleInputChange('valor_retornado_dolar', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>

            {/* Previsão do novo saldo */}
            {valorRetorno > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Previsão após esta devolução:</h4>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">Novo saldo:</span>
                    <span className={calcularNovoSaldo() > 0 ? 'text-red-600 ml-2 font-medium' : 
                                     calcularNovoSaldo() < 0 ? 'text-purple-600 ml-2 font-medium' : 
                                     'text-green-600 ml-2 font-medium'}>
                      {formatCurrency(Math.abs(calcularNovoSaldo()))}
                      {calcularNovoSaldo() < 0 && ' (crédito)'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Novo status:</span>
                    <Badge className={`ml-2 ${getStatusColor(getNovoStatus())}`}>
                      {getNovoStatus().replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Observações sobre a devolução"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isRegisteringReturn} className="bg-purple-600 hover:bg-purple-700">
                {isRegisteringReturn ? 'Registrando...' : 'Registrar Devolução'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DevolucaoModal;
