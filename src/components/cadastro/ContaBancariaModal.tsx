import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { useDraft } from "@/hooks/useDraft";
import { DraftIndicator, DraftSaveButton } from "@/components/cadastro/DraftIndicator";

interface Operador {
  operador: string;
  perfil: string;
  tipo: string;
  codigo: string;
}

interface ContaBancariaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContaBancariaModal = ({ isOpen, onClose }: ContaBancariaModalProps) => {
  const [formData, setFormData] = useState({
    situacao: "",
    nome_conta: "",
    codigo_banco: "",
    instituicao: "",
    tipo_conta: "",
    agencia: "",
    conta_corrente: "",
    codigo_operacao: "",
    chave_pix: "",
    saldo_inicial: "",
    limite_credito: "",
    nome_gerente: "",
    telefone_gerente: "",
    email_gerente: "",
    endereco_gerente: "",
    data_abertura: "",
    data_encerramento: "",
    resumo: false,
    fluxo_caixa: false,
    emite_boletos: false,
    incluido: true,
    operadores: [] as Operador[]
  });

  const {
    hasDraft,
    draftInfo,
    saveDraft,
    loadDraft,
    discardDraft,
    clearDraftOnSave
  } = useDraft<typeof formData>({
    moduleName: 'cadastro',
    entityType: 'contas_bancarias',
    expirationDays: 7
  });

  const handleRestoreDraft = () => {
    const draftData = loadDraft();
    if (draftData) {
      setFormData(draftData);
    }
  };

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

  const addOperador = () => {
    setFormData(prev => ({
      ...prev,
      operadores: [...prev.operadores, { operador: "", perfil: "", tipo: "", codigo: "" }]
    }));
  };

  const removeOperador = (index: number) => {
    setFormData(prev => ({
      ...prev,
      operadores: prev.operadores.filter((_, i) => i !== index)
    }));
  };

  const updateOperador = (index: number, field: keyof Operador, value: string) => {
    setFormData(prev => ({
      ...prev,
      operadores: prev.operadores.map((op, i) => i === index ? { ...op, [field]: value } : op)
    }));
  };

  const handleSave = () => {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentUser = "Usuário Atual";

    const finalData = {
      ...formData,
      ultima_alteracao: currentDate,
      incluido_por: currentUser,
      alterado_por: currentUser
    };

    console.log("Salvando Conta Bancária:", finalData);
    clearDraftOnSave();
    onClose();
  };

  const isFormEmpty = !formData.nome_conta && !formData.instituicao;

  if (!isOpen) return null;

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
          {hasDraft && (
            <div className="mb-4">
              <DraftIndicator
                hasDraft={hasDraft}
                draftInfo={draftInfo}
                onRestore={handleRestoreDraft}
                onDiscard={discardDraft}
              />
            </div>
          )}

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
                  <Label htmlFor="codigo_banco">Código do Banco</Label>
                  <Input
                    id="codigo_banco"
                    value={formData.codigo_banco}
                    onChange={(e) => handleInputChange("codigo_banco", e.target.value)}
                    placeholder="Ex: 001"
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
                  <Label htmlFor="tipo_conta">Tipo de Conta *</Label>
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

                <div>
                  <Label htmlFor="codigo_operacao">Código de Operação</Label>
                  <Input
                    id="codigo_operacao"
                    value={formData.codigo_operacao}
                    onChange={(e) => handleInputChange("codigo_operacao", e.target.value)}
                    placeholder="Ex: 013"
                  />
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor="chave_pix">Chave Pix</Label>
                  <Input
                    id="chave_pix"
                    value={formData.chave_pix}
                    onChange={(e) => handleInputChange("chave_pix", e.target.value)}
                    placeholder="CPF/CNPJ, e-mail, telefone ou chave aleatória"
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

            {/* Dados do Gerente */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Dados do Gerente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nome_gerente">Nome do Gerente</Label>
                  <Input
                    id="nome_gerente"
                    value={formData.nome_gerente}
                    onChange={(e) => handleInputChange("nome_gerente", e.target.value)}
                    placeholder="Nome completo do gerente"
                  />
                </div>

                <div>
                  <Label htmlFor="telefone_gerente">Telefone</Label>
                  <Input
                    id="telefone_gerente"
                    value={formData.telefone_gerente}
                    onChange={(e) => handleInputChange("telefone_gerente", e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <Label htmlFor="email_gerente">E-mail</Label>
                  <Input
                    id="email_gerente"
                    value={formData.email_gerente}
                    onChange={(e) => handleInputChange("email_gerente", e.target.value)}
                    placeholder="gerente@banco.com"
                  />
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor="endereco_gerente">Endereço do Gerente</Label>
                  <Input
                    id="endereco_gerente"
                    value={formData.endereco_gerente}
                    onChange={(e) => handleInputChange("endereco_gerente", e.target.value)}
                    placeholder="Endereço completo do gerente"
                  />
                </div>
              </div>
            </div>

            {/* Datas */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Datas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data_abertura">Data de Abertura da Conta</Label>
                  <Input
                    id="data_abertura"
                    type="date"
                    value={formData.data_abertura}
                    onChange={(e) => handleInputChange("data_abertura", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="data_encerramento">Data de Encerramento da Conta</Label>
                  <Input
                    id="data_encerramento"
                    type="date"
                    value={formData.data_encerramento}
                    onChange={(e) => handleInputChange("data_encerramento", e.target.value)}
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

            {/* Operadores */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Operadores</h3>
                <Button type="button" variant="outline" size="sm" onClick={addOperador}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Operador
                </Button>
              </div>

              {formData.operadores.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Operador</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead className="w-[60px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.operadores.map((op, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            value={op.operador}
                            onChange={(e) => updateOperador(index, "operador", e.target.value)}
                            placeholder="Nome do operador"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={op.perfil}
                            onChange={(e) => updateOperador(index, "perfil", e.target.value)}
                            placeholder="Perfil"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={op.tipo}
                            onChange={(e) => updateOperador(index, "tipo", e.target.value)}
                            placeholder="Tipo"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={op.codigo}
                            onChange={(e) => updateOperador(index, "codigo", e.target.value)}
                            placeholder="Código"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOperador(index)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum operador cadastrado. Clique em "Adicionar Operador" para incluir.
                </p>
              )}
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
          <DraftSaveButton
            onSaveDraft={() => saveDraft(formData)}
            disabled={isFormEmpty}
          />
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
