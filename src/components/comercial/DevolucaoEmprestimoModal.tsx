
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, AlertTriangle } from "lucide-react";
import { DevolucaoEmprestimo } from "@/types/emprestimos";
import { mockEmprestimos } from "@/data/emprestimosModules";
import { toast } from "@/hooks/use-toast";

interface DevolucaoEmprestimoModalProps {
  emprestimoId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DevolucaoEmprestimoModal = ({ emprestimoId, isOpen, onOpenChange }: DevolucaoEmprestimoModalProps) => {
  const emprestimo = mockEmprestimos.find(e => e.id === emprestimoId);
  
  const [formData, setFormData] = useState<Omit<DevolucaoEmprestimo, 'emprestimo_id'>>({
    numero_danfe_retorno: "",
    referencia_produto_recebido: "",
    descricao_produto_recebido: "",
    data_retorno: "",
    valor_retornado_dolar: 0
  });

  if (!emprestimo) return null;

  const handleInputChange = (field: keyof Omit<DevolucaoEmprestimo, 'emprestimo_id'>, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.numero_danfe_retorno || !formData.referencia_produto_recebido || !formData.data_retorno) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.valor_retornado_dolar <= 0) {
      toast({
        title: "Erro",
        description: "O valor retornado deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }

    // Validação do valor máximo
    const saldoDevedor = emprestimo.saldo_devedor || emprestimo.valor_emprestimo_dolar;
    if (formData.valor_retornado_dolar > saldoDevedor) {
      toast({
        title: "Erro",
        description: `O valor retornado não pode ser maior que o saldo devedor (US$ ${saldoDevedor.toLocaleString()}).`,
        variant: "destructive"
      });
      return;
    }

    const devolucao: DevolucaoEmprestimo = {
      emprestimo_id: emprestimoId,
      ...formData
    };

    // Aqui seria feita a integração com a API
    console.log("Nova devolução:", devolucao);
    
    toast({
      title: "Sucesso",
      description: "Devolução registrada com sucesso!",
    });

    // Reset form e fechar modal
    setFormData({
      numero_danfe_retorno: "",
      referencia_produto_recebido: "",
      descricao_produto_recebido: "",
      data_retorno: "",
      valor_retornado_dolar: 0
    });
    
    onOpenChange(false);
  };

  const saldoDevedor = emprestimo.saldo_devedor || emprestimo.valor_emprestimo_dolar;
  const novoSaldo = saldoDevedor - formData.valor_retornado_dolar;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-biodina-blue" />
            Registrar Devolução - {emprestimo.numero_processo}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados do Empréstimo Original */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Empréstimo Original</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cliente</p>
                  <p className="font-medium">{emprestimo.nome_cliente}</p>
                  <p className="text-sm text-gray-600">{emprestimo.cnpj_cliente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Produto Emprestado</p>
                  <p className="font-medium">{emprestimo.referencia_produto_emprestado}</p>
                  <p className="text-sm text-gray-600">{emprestimo.descricao_produto_emprestado}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Valor Original</p>
                  <p className="text-lg font-semibold">US$ {emprestimo.valor_emprestimo_dolar.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Saldo Devedor Atual</p>
                  <p className="text-lg font-semibold text-red-600">US$ {saldoDevedor.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados da Devolução */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados da Devolução</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="danfe-retorno">Número DANFE Retorno *</Label>
                  <Input
                    id="danfe-retorno"
                    value={formData.numero_danfe_retorno}
                    onChange={(e) => handleInputChange('numero_danfe_retorno', e.target.value)}
                    placeholder="000000000"
                  />
                </div>
                <div>
                  <Label htmlFor="data-retorno">Data do Retorno *</Label>
                  <Input
                    id="data-retorno"
                    type="date"
                    value={formData.data_retorno}
                    onChange={(e) => handleInputChange('data_retorno', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="valor-retornado">Valor Retornado (USD) *</Label>
                <Input
                  id="valor-retornado"
                  type="number"
                  step="0.01"
                  min="0"
                  max={saldoDevedor}
                  value={formData.valor_retornado_dolar}
                  onChange={(e) => handleInputChange('valor_retornado_dolar', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Máximo permitido: US$ {saldoDevedor.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Produto Recebido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Produto Recebido na Devolução</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="referencia-recebido">Referência do Produto Recebido *</Label>
                <Input
                  id="referencia-recebido"
                  value={formData.referencia_produto_recebido}
                  onChange={(e) => handleInputChange('referencia_produto_recebido', e.target.value)}
                  placeholder="Código/referência do produto recebido"
                />
              </div>
              <div>
                <Label htmlFor="descricao-recebido">Descrição do Produto Recebido *</Label>
                <Textarea
                  id="descricao-recebido"
                  value={formData.descricao_produto_recebido}
                  onChange={(e) => handleInputChange('descricao_produto_recebido', e.target.value)}
                  placeholder="Descrição detalhada do produto recebido"
                  rows={3}
                />
              </div>

              {/* Alerta se produto diferente */}
              {formData.referencia_produto_recebido && 
               formData.referencia_produto_recebido !== emprestimo.referencia_produto_emprestado && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      <strong>Atenção:</strong> O produto recebido é diferente do produto emprestado. 
                      Certifique-se de que o valor em dólar está correto.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumo da Operação */}
          {formData.valor_retornado_dolar > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Saldo Atual</p>
                    <p className="text-lg font-semibold text-red-600">US$ {saldoDevedor.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Valor a Devolver</p>
                    <p className="text-lg font-semibold text-orange-600">US$ {formData.valor_retornado_dolar.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Novo Saldo</p>
                    <p className={`text-lg font-semibold ${novoSaldo === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      US$ {novoSaldo.toLocaleString()}
                    </p>
                    {novoSaldo === 0 && (
                      <Badge className="bg-green-100 text-green-800 mt-1">Quitado</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-biodina-blue hover:bg-biodina-blue/90">
              Registrar Devolução
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DevolucaoEmprestimoModal;
