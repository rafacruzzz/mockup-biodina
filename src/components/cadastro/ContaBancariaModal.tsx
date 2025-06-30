
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save } from "lucide-react";

interface ContaBancariaModalProps {
  onClose: () => void;
}

const ContaBancariaModal = ({ onClose }: ContaBancariaModalProps) => {
  const [formData, setFormData] = useState({
    situacao: "",
    nome_conta: "",
    instituicao: "",
    tipo_conta: "",
    agencia: "",
    conta_corrente: "",
    saldo_inicial: "",
    limite_credito: "",
    resumo: false,
    fluxo_caixa: false,
    emite_boletos: false,
    incluido: true
  });

  const bancos = [
    "Banco do Brasil",
    "Itaú Unibanco",
    "Bradesco",
    "Santander",
    "Caixa Econômica Federal",
    "Banco Safra",
    "BTG Pactual",
    "Banco Inter",
    "Nubank",
    "C6 Bank",
    "Banco Original",
    "Sicredi"
  ];

  const tiposConta = [
    "Conta Corrente",
    "Conta Poupança",
    "Conta Salário",
    "Conta Investimento"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formattedValue;
  };

  const handleCurrencyChange = (field: string, value: string) => {
    const formatted = formatCurrency(value);
    handleInputChange(field, formatted);
  };

  const handleSave = () => {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentUser = "Usuário Atual"; // Em um sistema real, viria do contexto de autenticação
    
    const finalData = {
      ...formData,
      ultima_alteracao: currentDate,
      incluido_por: currentUser,
      alterado_por: currentUser
    };
    
    console.log("Salvando Conta Bancária:", finalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Cadastro de Conta Bancária</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="situacao">Situação *</Label>
                  <Select value={formData.situacao} onValueChange={(value) => handleInputChange("situacao", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="nome_conta">Nome da Conta *</Label>
                  <Input
                    id="nome_conta"
                    value={formData.nome_conta}
                    onChange={(e) => handleInputChange("nome_conta", e.target.value)}
                    placeholder="Ex: Conta Principal Operacional"
                  />
                </div>

                <div>
                  <Label htmlFor="instituicao">Instituição *</Label>
                  <Select value={formData.instituicao} onValueChange={(value) => handleInputChange("instituicao", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o banco..." />
                    </SelectTrigger>
                    <SelectContent>
                      {bancos.map((banco) => (
                        <SelectItem key={banco} value={banco}>
                          {banco}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tipo_conta">Tipo de Conta Corrente *</Label>
                  <Select value={formData.tipo_conta} onValueChange={(value) => handleInputChange("tipo_conta", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposConta.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="agencia">Agência *</Label>
                  <Input
                    id="agencia"
                    value={formData.agencia}
                    onChange={(e) => handleInputChange("agencia", e.target.value)}
                    placeholder="Ex: 1234-5"
                  />
                </div>

                <div>
                  <Label htmlFor="conta_corrente">Conta Corrente *</Label>
                  <Input
                    id="conta_corrente"
                    value={formData.conta_corrente}
                    onChange={(e) => handleInputChange("conta_corrente", e.target.value)}
                    placeholder="Ex: 12345-6"
                  />
                </div>
              </div>
            </div>

            {/* Valores Financeiros */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Valores Financeiros</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="saldo_inicial">Saldo Inicial (R$)</Label>
                  <Input
                    id="saldo_inicial"
                    value={formData.saldo_inicial}
                    onChange={(e) => handleCurrencyChange("saldo_inicial", e.target.value)}
                    placeholder="0,00"
                  />
                </div>

                <div>
                  <Label htmlFor="limite_credito">Valor do Limite de Crédito (R$)</Label>
                  <Input
                    id="limite_credito"
                    value={formData.limite_credito}
                    onChange={(e) => handleCurrencyChange("limite_credito", e.target.value)}
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>

            {/* Configurações */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Configurações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="resumo"
                      checked={formData.resumo}
                      onCheckedChange={(checked) => handleInputChange("resumo", checked as boolean)}
                    />
                    <Label htmlFor="resumo">Resumo</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fluxo_caixa"
                      checked={formData.fluxo_caixa}
                      onCheckedChange={(checked) => handleInputChange("fluxo_caixa", checked as boolean)}
                    />
                    <Label htmlFor="fluxo_caixa">Fluxo de Caixa</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emite_boletos"
                      checked={formData.emite_boletos}
                      onCheckedChange={(checked) => handleInputChange("emite_boletos", checked as boolean)}
                    />
                    <Label htmlFor="emite_boletos">Emite Boletos e Cobrança Bancária</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="incluido"
                      checked={formData.incluido}
                      onCheckedChange={(checked) => handleInputChange("incluido", checked as boolean)}
                    />
                    <Label htmlFor="incluido">Incluído</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações de Controle */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações de Controle</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <Label className="text-gray-500">Última Alteração</Label>
                  <p>{new Date().toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Incluído por</Label>
                  <p>Usuário Atual</p>
                </div>
                <div>
                  <Label className="text-gray-500">Alterado Por</Label>
                  <p>Usuário Atual</p>
                </div>
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

export default ContaBancariaModal;
