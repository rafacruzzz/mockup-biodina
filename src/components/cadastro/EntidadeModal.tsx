import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";

interface EntidadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EntidadeModal = ({ isOpen, onClose }: EntidadeModalProps) => {
  const [formData, setFormData] = useState({
    tipo: "",
    nome_razao_social: "",
    cnpj_cpf: "",
    nome_fantasia: "",
    email: "",
    telefone: "",
    endereco: "",
    representante: "",
    segmento: "",
    responsavel: "",
    canal_entrada: "",
    origem_lead: "",
    interesse: "",
    etapa_funil: "",
    produtos_fornecidos: "",
    tipo_fornecimento: "",
    inscricao_estadual: "",
    banco: "",
    agencia: "",
    conta: "",
    prazo_pagamento: "",
    // Campos específicos para Detentores Registro ANVISA
    nome_empresa: "",
    contato: "",
    status: "",
    data_cadastro: new Date().toISOString().split('T')[0],
    observacoes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando entidade:", formData);
    onClose();
  };

  const renderClienteFields = () => (
    <>
      <div>
        <Label htmlFor="nome_fantasia">Nome Fantasia</Label>
        <Input
          id="nome_fantasia"
          value={formData.nome_fantasia}
          onChange={(e) => handleInputChange("nome_fantasia", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="endereco">Endereço Completo</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => handleInputChange("endereco", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="representante">Representante Comercial</Label>
        <Input
          id="representante"
          value={formData.representante}
          onChange={(e) => handleInputChange("representante", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="segmento">Segmento</Label>
        <Input
          id="segmento"
          value={formData.segmento}
          onChange={(e) => handleInputChange("segmento", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="canal_entrada">Canal de Entrada</Label>
        <Select value={formData.canal_entrada} onValueChange={(value) => handleInputChange("canal_entrada", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="site">Site</SelectItem>
            <SelectItem value="telefone">Telefone</SelectItem>
            <SelectItem value="parceiro">Parceiro</SelectItem>
            <SelectItem value="indicacao">Indicação</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderFornecedorFields = () => (
    <>
      <div>
        <Label htmlFor="produtos_fornecidos">Produtos/Marcas Fornecidas</Label>
        <Textarea
          id="produtos_fornecidos"
          value={formData.produtos_fornecidos}
          onChange={(e) => handleInputChange("produtos_fornecidos", e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="tipo_fornecimento">Tipo de Fornecimento</Label>
        <Select value={formData.tipo_fornecimento} onValueChange={(value) => handleInputChange("tipo_fornecimento", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nacional">Nacional</SelectItem>
            <SelectItem value="internacional">Internacional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
        <Input
          id="inscricao_estadual"
          value={formData.inscricao_estadual}
          onChange={(e) => handleInputChange("inscricao_estadual", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="banco">Banco</Label>
        <Input
          id="banco"
          value={formData.banco}
          onChange={(e) => handleInputChange("banco", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="agencia">Agência</Label>
        <Input
          id="agencia"
          value={formData.agencia}
          onChange={(e) => handleInputChange("agencia", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="conta">Conta</Label>
        <Input
          id="conta"
          value={formData.conta}
          onChange={(e) => handleInputChange("conta", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="prazo_pagamento">Prazo de Pagamento Padrão</Label>
        <Input
          id="prazo_pagamento"
          value={formData.prazo_pagamento}
          onChange={(e) => handleInputChange("prazo_pagamento", e.target.value)}
        />
      </div>
    </>
  );

  const renderLeadFields = () => (
    <>
      <div>
        <Label htmlFor="origem_lead">Origem do Lead</Label>
        <Select value={formData.origem_lead} onValueChange={(value) => handleInputChange("origem_lead", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rede_social">Rede Social</SelectItem>
            <SelectItem value="indicacao">Indicação</SelectItem>
            <SelectItem value="publicidade">Publicidade</SelectItem>
            <SelectItem value="website">Website</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="interesse">Interesse</Label>
        <Textarea
          id="interesse"
          value={formData.interesse}
          onChange={(e) => handleInputChange("interesse", e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="etapa_funil">Etapa no Funil</Label>
        <Select value={formData.etapa_funil} onValueChange={(value) => handleInputChange("etapa_funil", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novo">Novo</SelectItem>
            <SelectItem value="qualificado">Qualificado</SelectItem>
            <SelectItem value="em_proposta">Em Proposta</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
            <SelectItem value="ganhou">Ganhou</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderDetentoresAnvisaFields = () => (
    <>
      <div>
        <Label htmlFor="nome_empresa">Nome da Empresa *</Label>
        <Input
          id="nome_empresa"
          value={formData.nome_empresa}
          onChange={(e) => handleInputChange("nome_empresa", e.target.value)}
          placeholder="Ex: EMS S.A."
        />
      </div>
      <div>
        <Label htmlFor="endereco">Endereço Completo</Label>
        <Textarea
          id="endereco"
          value={formData.endereco}
          onChange={(e) => handleInputChange("endereco", e.target.value)}
          rows={3}
          placeholder="Endereço completo da empresa"
        />
      </div>
      <div>
        <Label htmlFor="contato">Contato Responsável</Label>
        <Input
          id="contato"
          value={formData.contato}
          onChange={(e) => handleInputChange("contato", e.target.value)}
          placeholder="Ex: Dr. Roberto Silva"
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="data_cadastro">Data de Cadastro</Label>
        <Input
          id="data_cadastro"
          type="date"
          value={formData.data_cadastro}
          onChange={(e) => handleInputChange("data_cadastro", e.target.value)}
          readOnly
          className="bg-gray-100"
        />
      </div>
    </>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Cadastro de Entidade</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo de Entidade *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="fornecedor">Fornecedor</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="detentores_registro_anvisa">Detentores Registro ANVISA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.tipo !== 'detentores_registro_anvisa' && (
                <>
                  <div>
                    <Label htmlFor="nome_razao_social">Nome/Razão Social *</Label>
                    <Input
                      id="nome_razao_social"
                      value={formData.nome_razao_social}
                      onChange={(e) => handleInputChange("nome_razao_social", e.target.value)}
                      placeholder="Ex: Hospital São Lucas"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cnpj_cpf">CNPJ/CPF</Label>
                    <Input
                      id="cnpj_cpf"
                      value={formData.cnpj_cpf}
                      onChange={(e) => handleInputChange("cnpj_cpf", e.target.value)}
                      placeholder="Ex: 11.222.333/0001-44"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Ex: contato@empresa.com.br"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      placeholder="Ex: (11) 9999-8888"
                    />
                  </div>

                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input
                      id="responsavel"
                      value={formData.responsavel}
                      onChange={(e) => handleInputChange("responsavel", e.target.value)}
                    />
                  </div>
                </>
              )}

              {formData.tipo === 'detentores_registro_anvisa' && (
                <>
                  <div>
                    <Label htmlFor="cnpj_cpf">CNPJ *</Label>
                    <Input
                      id="cnpj_cpf"
                      value={formData.cnpj_cpf}
                      onChange={(e) => handleInputChange("cnpj_cpf", e.target.value)}
                      placeholder="Ex: 57.507.378/0001-83"
                    />
                  </div>
                </>
              )}

              {formData.tipo === 'cliente' && renderClienteFields()}
              {formData.tipo === 'fornecedor' && renderFornecedorFields()}
              {formData.tipo === 'lead' && renderLeadFields()}
              {formData.tipo === 'detentores_registro_anvisa' && renderDetentoresAnvisaFields()}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                rows={3}
              />
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

export default EntidadeModal;
