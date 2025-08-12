
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, DollarSign } from "lucide-react";
import { NovoEmprestimo } from "@/types/emprestimos";
import { toast } from "@/hooks/use-toast";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovoEmprestimoModal = ({ isOpen, onOpenChange }: NovoEmprestimoModalProps) => {
  const [formData, setFormData] = useState<NovoEmprestimo>({
    cnpj_cliente: "",
    nome_cliente: "",
    numero_danfe_emprestimo: "",
    referencia_produto_emprestado: "",
    descricao_produto_emprestado: "",
    valor_emprestimo_dolar: 0,
    data_emprestimo: "",
    data_saida: "",
    id_importacao_direta: undefined
  });

  const handleInputChange = (field: keyof NovoEmprestimo, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.cnpj_cliente || !formData.nome_cliente || !formData.numero_danfe_emprestimo) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.valor_emprestimo_dolar <= 0) {
      toast({
        title: "Erro",
        description: "O valor do empréstimo deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }

    // Aqui seria feita a integração com a API
    console.log("Novo empréstimo:", formData);
    
    toast({
      title: "Sucesso",
      description: "Empréstimo cadastrado com sucesso!",
    });

    // Reset form e fechar modal
    setFormData({
      cnpj_cliente: "",
      nome_cliente: "",
      numero_danfe_emprestimo: "",
      referencia_produto_emprestado: "",
      descricao_produto_emprestado: "",
      valor_emprestimo_dolar: 0,
      data_emprestimo: "",
      data_saida: "",
      id_importacao_direta: undefined
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-biodina-blue" />
            Novo Empréstimo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cnpj">CNPJ do Cliente *</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj_cliente}
                    onChange={(e) => handleInputChange('cnpj_cliente', e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="nome">Nome do Cliente *</Label>
                  <Input
                    id="nome"
                    value={formData.nome_cliente}
                    onChange={(e) => handleInputChange('nome_cliente', e.target.value)}
                    placeholder="Razão social do cliente"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Empréstimo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados do Empréstimo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="danfe">Número DANFE Empréstimo *</Label>
                  <Input
                    id="danfe"
                    value={formData.numero_danfe_emprestimo}
                    onChange={(e) => handleInputChange('numero_danfe_emprestimo', e.target.value)}
                    placeholder="000000000"
                  />
                </div>
                <div>
                  <Label htmlFor="valor">Valor em Dólar *</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valor_emprestimo_dolar}
                    onChange={(e) => handleInputChange('valor_emprestimo_dolar', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data-emprestimo">Data do Empréstimo *</Label>
                  <Input
                    id="data-emprestimo"
                    type="date"
                    value={formData.data_emprestimo}
                    onChange={(e) => handleInputChange('data_emprestimo', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="data-saida">Data de Saída *</Label>
                  <Input
                    id="data-saida"
                    type="date"
                    value={formData.data_saida}
                    onChange={(e) => handleInputChange('data_saida', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Produto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Produto Emprestado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="referencia">Referência do Produto *</Label>
                <Input
                  id="referencia"
                  value={formData.referencia_produto_emprestado}
                  onChange={(e) => handleInputChange('referencia_produto_emprestado', e.target.value)}
                  placeholder="Código/referência do produto"
                />
              </div>
              <div>
                <Label htmlFor="descricao">Descrição do Produto *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao_produto_emprestado}
                  onChange={(e) => handleInputChange('descricao_produto_emprestado', e.target.value)}
                  placeholder="Descrição detalhada do produto emprestado"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vínculo com Importação Direta (Opcional) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vínculo com Importação Direta (Opcional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="importacao">ID da Importação Direta</Label>
                <Input
                  id="importacao"
                  type="number"
                  value={formData.id_importacao_direta || ""}
                  onChange={(e) => handleInputChange('id_importacao_direta', parseInt(e.target.value) || undefined)}
                  placeholder="ID da importação direta (se houver)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Vincule este empréstimo a uma importação direta específica se aplicável.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-biodina-blue hover:bg-biodina-blue/90">
              Cadastrar Empréstimo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEmprestimoModal;
