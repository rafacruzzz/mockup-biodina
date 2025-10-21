import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { X, Save, Upload, Trash2, FileText } from "lucide-react";
import { useCepLookup } from "@/hooks/useCepLookup";

interface EntidadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoEntidade: string;
}

const EntidadeModal = ({ isOpen, onClose, tipoEntidade }: EntidadeModalProps) => {
  const { lookupCep, loading: cepLoading } = useCepLookup();
  const [uploadedDocs, setUploadedDocs] = useState<Array<{ name: string; size: number; type: string }>>([]);

  const [formData, setFormData] = useState({
    // Dados Gerais
    nome_cliente: "",
    razao_social: "",
    cnpj_cpf: "",
    cin_rg: "",
    tipo_cliente: "",
    nome_fantasia: "",
    
    // Contatos expandidos
    telefone1: "",
    telefone2: "",
    telefone3: "",
    telefone4: "",
    telefone_fixo1: "",
    telefone_fixo2: "",
    telefone_fixo3: "",
    telefone_whatsapp: "",
    email1: "",
    email2: "",
    email3: "",
    email4: "",
    website: "",
    
    // Redes Sociais
    instagram: "",
    facebook: "",
    linkedin: "",
    x_twitter: "",
    
    // Dados Fiscais
    inscricao_estadual: "",
    inscricao_municipal: "",
    inscricao_suframa: "",
    cnae_principal: "",
    optante_simples_nacional: false,
    produtor_rural: false,
    orgao_publico: false,
    privado: false,
    
    // Endereço Faturamento
    fat_endereco: "",
    fat_cidade: "",
    fat_estado: "",
    fat_cep: "",
    fat_uf: "",
    fat_pais: "Brasil",
    
    // Endereço Entrega
    ent_endereco: "",
    ent_cidade: "",
    ent_estado: "",
    ent_cep: "",
    ent_uf: "",
    ent_pais: "Brasil",
    
    // Dados Bancários
    banco: "",
    codigo_banco: "",
    agencia: "",
    conta: "",
    chave_pix: "",
    nome_beneficiario: "",
    
    // Contato Comercial
    contato_nome: "",
    contato_cargo: "",
    contato_telefone: "",
    contato_email: "",
    
    // Status e Controle
    situacao_cadastral: "ativo",
    data_cadastro: new Date().toISOString().split('T')[0],
    
    // Mantenedor
    nome_mantenedor: "",
    cnpj_mantenedor: "",
    
    // Crédito e Restrições
    saldo_bloqueado: 0,
    autorizar_faturamento: "100",
    limite_credito: 0,
    restrito: false,
    analise_credito_bloqueado: false,
    
    // Outros
    servico_produto_oferecido: "",
    observacoes: "",
    
    // Campos legados mantidos para compatibilidade
    representante: "",
    segmento: "",
    responsavel: "",
    canal_entrada: "",
    origem_lead: "",
    interesse: "",
    etapa_funil: "",
    produtos_fornecidos: "",
    tipo_fornecimento: "",
    prazo_pagamento: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepLookup = async (cep: string, tipo: 'faturamento' | 'entrega') => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      const result = await lookupCep(cleanCep);
      if (result) {
        const prefix = tipo === 'faturamento' ? 'fat' : 'ent';
        setFormData(prev => ({
          ...prev,
          [`${prefix}_endereco`]: result.logradouro,
          [`${prefix}_cidade`]: result.localidade,
          [`${prefix}_estado`]: result.localidade,
          [`${prefix}_uf`]: result.uf
        }));
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocs = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setUploadedDocs(prev => [...prev, ...newDocs]);
    }
  };

  const handleRemoveDoc = (index: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Salvando entidade:", formData);
    console.log("Documentos anexados:", uploadedDocs);
    onClose();
  };


  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      'leads': 'Lead',
      'clientes': 'Cliente',
      'representantes': 'Representante Comercial',
      'fornecedores_revenda': 'Fornecedor - Mercadoria para Revenda',
      'fornecedores_uso_consumo': 'Fornecedor - Uso e Consumo',
      'fornecedores_servicos': 'Fornecedor - Serviços',
      'transportadoras': 'Transportadora'
    };
    return labels[tipo] || 'Entidade';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Cadastro de {getTipoLabel(tipoEntidade)}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <Tabs defaultValue="dados-gerais" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="enderecos">Endereços</TabsTrigger>
              <TabsTrigger value="fiscais">Dados Fiscais</TabsTrigger>
              <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
              <TabsTrigger value="credito">Crédito/Restrições</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>

            {/* ABA: DADOS GERAIS */}
            <TabsContent value="dados-gerais" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo_cliente">Tipo de Cliente</Label>
                  <Select value={formData.tipo_cliente} onValueChange={(value) => handleInputChange("tipo_cliente", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fisica">Pessoa Física</SelectItem>
                      <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nome_cliente">Nome do Cliente</Label>
                  <Input
                    id="nome_cliente"
                    value={formData.nome_cliente}
                    onChange={(e) => handleInputChange("nome_cliente", e.target.value)}
                    placeholder="Nome do cliente"
                  />
                </div>

                <div>
                  <Label htmlFor="razao_social">Razão Social</Label>
                  <Input
                    id="razao_social"
                    value={formData.razao_social}
                    onChange={(e) => handleInputChange("razao_social", e.target.value)}
                    placeholder="Razão social"
                  />
                </div>

                <div>
                  <Label htmlFor="nome_fantasia">Nome Fantasia</Label>
                  <Input
                    id="nome_fantasia"
                    value={formData.nome_fantasia}
                    onChange={(e) => handleInputChange("nome_fantasia", e.target.value)}
                    placeholder="Nome fantasia"
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj_cpf">CNPJ/CPF</Label>
                  <Input
                    id="cnpj_cpf"
                    value={formData.cnpj_cpf}
                    onChange={(e) => handleInputChange("cnpj_cpf", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div>
                  <Label htmlFor="cin_rg">CIN/RG</Label>
                  <Input
                    id="cin_rg"
                    value={formData.cin_rg}
                    onChange={(e) => handleInputChange("cin_rg", e.target.value)}
                    placeholder="RG ou CIN"
                  />
                </div>

                <div>
                  <Label htmlFor="situacao_cadastral">Situação Cadastral</Label>
                  <Select value={formData.situacao_cadastral} onValueChange={(value) => handleInputChange("situacao_cadastral", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
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
                  />
                </div>

                <div>
                  <Label htmlFor="nome_mantenedor">Nome do Mantenedor</Label>
                  <Input
                    id="nome_mantenedor"
                    value={formData.nome_mantenedor}
                    onChange={(e) => handleInputChange("nome_mantenedor", e.target.value)}
                    placeholder="Nome do mantenedor"
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj_mantenedor">CNPJ do Mantenedor</Label>
                  <Input
                    id="cnpj_mantenedor"
                    value={formData.cnpj_mantenedor}
                    onChange={(e) => handleInputChange("cnpj_mantenedor", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Telefones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone1">Telefone 1</Label>
                    <Input
                      id="telefone1"
                      value={formData.telefone1}
                      onChange={(e) => handleInputChange("telefone1", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone2">Telefone 2</Label>
                    <Input
                      id="telefone2"
                      value={formData.telefone2}
                      onChange={(e) => handleInputChange("telefone2", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone3">Telefone 3</Label>
                    <Input
                      id="telefone3"
                      value={formData.telefone3}
                      onChange={(e) => handleInputChange("telefone3", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone4">Telefone 4</Label>
                    <Input
                      id="telefone4"
                      value={formData.telefone4}
                      onChange={(e) => handleInputChange("telefone4", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Telefones Fixos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="telefone_fixo1">Telefone Fixo 1</Label>
                    <Input
                      id="telefone_fixo1"
                      value={formData.telefone_fixo1}
                      onChange={(e) => handleInputChange("telefone_fixo1", e.target.value)}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone_fixo2">Telefone Fixo 2</Label>
                    <Input
                      id="telefone_fixo2"
                      value={formData.telefone_fixo2}
                      onChange={(e) => handleInputChange("telefone_fixo2", e.target.value)}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone_fixo3">Telefone Fixo 3</Label>
                    <Input
                      id="telefone_fixo3"
                      value={formData.telefone_fixo3}
                      onChange={(e) => handleInputChange("telefone_fixo3", e.target.value)}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">WhatsApp</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone_whatsapp">Telefone WhatsApp</Label>
                    <Input
                      id="telefone_whatsapp"
                      value={formData.telefone_whatsapp}
                      onChange={(e) => handleInputChange("telefone_whatsapp", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">E-mails</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email1">E-mail 1</Label>
                    <Input
                      id="email1"
                      type="email"
                      value={formData.email1}
                      onChange={(e) => handleInputChange("email1", e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email2">E-mail 2</Label>
                    <Input
                      id="email2"
                      type="email"
                      value={formData.email2}
                      onChange={(e) => handleInputChange("email2", e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email3">E-mail 3</Label>
                    <Input
                      id="email3"
                      type="email"
                      value={formData.email3}
                      onChange={(e) => handleInputChange("email3", e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email4">E-mail 4</Label>
                    <Input
                      id="email4"
                      type="email"
                      value={formData.email4}
                      onChange={(e) => handleInputChange("email4", e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Web e Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      placeholder="@usuario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange("facebook", e.target.value)}
                      placeholder="/usuario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      placeholder="/company/empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="x_twitter">X (Twitter)</Label>
                    <Input
                      id="x_twitter"
                      value={formData.x_twitter}
                      onChange={(e) => handleInputChange("x_twitter", e.target.value)}
                      placeholder="@usuario"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Contato Comercial</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contato_nome">Nome</Label>
                    <Input
                      id="contato_nome"
                      value={formData.contato_nome}
                      onChange={(e) => handleInputChange("contato_nome", e.target.value)}
                      placeholder="Nome do contato"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contato_cargo">Cargo</Label>
                    <Input
                      id="contato_cargo"
                      value={formData.contato_cargo}
                      onChange={(e) => handleInputChange("contato_cargo", e.target.value)}
                      placeholder="Cargo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contato_telefone">Telefone</Label>
                    <Input
                      id="contato_telefone"
                      value={formData.contato_telefone}
                      onChange={(e) => handleInputChange("contato_telefone", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contato_email">E-mail</Label>
                    <Input
                      id="contato_email"
                      type="email"
                      value={formData.contato_email}
                      onChange={(e) => handleInputChange("contato_email", e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Serviço/Produto Oferecido</h3>
                <Textarea
                  id="servico_produto_oferecido"
                  value={formData.servico_produto_oferecido}
                  onChange={(e) => handleInputChange("servico_produto_oferecido", e.target.value)}
                  rows={3}
                  placeholder="Descrição dos serviços/produtos oferecidos"
                />
              </div>
            </TabsContent>

            {/* ABA: ENDEREÇOS */}
            <TabsContent value="enderecos" className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Endereço de Faturamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fat_cep">CEP</Label>
                    <Input
                      id="fat_cep"
                      value={formData.fat_cep}
                      onChange={(e) => handleInputChange("fat_cep", e.target.value)}
                      onBlur={(e) => handleCepLookup(e.target.value, 'faturamento')}
                      placeholder="00000-000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat_endereco">Endereço</Label>
                    <Input
                      id="fat_endereco"
                      value={formData.fat_endereco}
                      onChange={(e) => handleInputChange("fat_endereco", e.target.value)}
                      placeholder="Rua, Avenida, número"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat_cidade">Cidade</Label>
                    <Input
                      id="fat_cidade"
                      value={formData.fat_cidade}
                      onChange={(e) => handleInputChange("fat_cidade", e.target.value)}
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat_estado">Estado</Label>
                    <Input
                      id="fat_estado"
                      value={formData.fat_estado}
                      onChange={(e) => handleInputChange("fat_estado", e.target.value)}
                      placeholder="Estado"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat_uf">UF</Label>
                    <Input
                      id="fat_uf"
                      value={formData.fat_uf}
                      onChange={(e) => handleInputChange("fat_uf", e.target.value)}
                      placeholder="UF"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat_pais">País</Label>
                    <Input
                      id="fat_pais"
                      value={formData.fat_pais}
                      onChange={(e) => handleInputChange("fat_pais", e.target.value)}
                      placeholder="País"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Endereço de Entrega</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ent_cep">CEP</Label>
                    <Input
                      id="ent_cep"
                      value={formData.ent_cep}
                      onChange={(e) => handleInputChange("ent_cep", e.target.value)}
                      onBlur={(e) => handleCepLookup(e.target.value, 'entrega')}
                      placeholder="00000-000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ent_endereco">Endereço</Label>
                    <Input
                      id="ent_endereco"
                      value={formData.ent_endereco}
                      onChange={(e) => handleInputChange("ent_endereco", e.target.value)}
                      placeholder="Rua, Avenida, número"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ent_cidade">Cidade</Label>
                    <Input
                      id="ent_cidade"
                      value={formData.ent_cidade}
                      onChange={(e) => handleInputChange("ent_cidade", e.target.value)}
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ent_estado">Estado</Label>
                    <Input
                      id="ent_estado"
                      value={formData.ent_estado}
                      onChange={(e) => handleInputChange("ent_estado", e.target.value)}
                      placeholder="Estado"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ent_uf">UF</Label>
                    <Input
                      id="ent_uf"
                      value={formData.ent_uf}
                      onChange={(e) => handleInputChange("ent_uf", e.target.value)}
                      placeholder="UF"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ent_pais">País</Label>
                    <Input
                      id="ent_pais"
                      value={formData.ent_pais}
                      onChange={(e) => handleInputChange("ent_pais", e.target.value)}
                      placeholder="País"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ABA: DADOS FISCAIS */}
            <TabsContent value="fiscais" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
                  <Input
                    id="inscricao_estadual"
                    value={formData.inscricao_estadual}
                    onChange={(e) => handleInputChange("inscricao_estadual", e.target.value)}
                    placeholder="000.000.000.000"
                  />
                </div>
                <div>
                  <Label htmlFor="inscricao_municipal">Inscrição Municipal</Label>
                  <Input
                    id="inscricao_municipal"
                    value={formData.inscricao_municipal}
                    onChange={(e) => handleInputChange("inscricao_municipal", e.target.value)}
                    placeholder="000000"
                  />
                </div>
                <div>
                  <Label htmlFor="inscricao_suframa">Inscrição SUFRAMA</Label>
                  <Input
                    id="inscricao_suframa"
                    value={formData.inscricao_suframa}
                    onChange={(e) => handleInputChange("inscricao_suframa", e.target.value)}
                    placeholder="00.000.000-0"
                  />
                </div>
                <div>
                  <Label htmlFor="cnae_principal">CNAE Principal</Label>
                  <Input
                    id="cnae_principal"
                    value={formData.cnae_principal}
                    onChange={(e) => handleInputChange("cnae_principal", e.target.value)}
                    placeholder="0000-0/00"
                  />
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Classificação</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="optante_simples_nacional"
                      checked={formData.optante_simples_nacional}
                      onCheckedChange={(checked) => handleInputChange("optante_simples_nacional", checked)}
                    />
                    <Label htmlFor="optante_simples_nacional" className="cursor-pointer">
                      Optante do Simples Nacional
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="produtor_rural"
                      checked={formData.produtor_rural}
                      onCheckedChange={(checked) => handleInputChange("produtor_rural", checked)}
                    />
                    <Label htmlFor="produtor_rural" className="cursor-pointer">
                      Produtor Rural
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="orgao_publico"
                      checked={formData.orgao_publico}
                      onCheckedChange={(checked) => handleInputChange("orgao_publico", checked)}
                    />
                    <Label htmlFor="orgao_publico" className="cursor-pointer">
                      Órgão Público
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privado"
                      checked={formData.privado}
                      onCheckedChange={(checked) => handleInputChange("privado", checked)}
                    />
                    <Label htmlFor="privado" className="cursor-pointer">
                      Privado
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ABA: DADOS BANCÁRIOS */}
            <TabsContent value="bancarios" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="banco">Banco</Label>
                  <Input
                    id="banco"
                    value={formData.banco}
                    onChange={(e) => handleInputChange("banco", e.target.value)}
                    placeholder="Nome do banco"
                  />
                </div>
                <div>
                  <Label htmlFor="codigo_banco">Código do Banco</Label>
                  <Input
                    id="codigo_banco"
                    value={formData.codigo_banco}
                    onChange={(e) => handleInputChange("codigo_banco", e.target.value)}
                    placeholder="000"
                  />
                </div>
                <div>
                  <Label htmlFor="agencia">Agência</Label>
                  <Input
                    id="agencia"
                    value={formData.agencia}
                    onChange={(e) => handleInputChange("agencia", e.target.value)}
                    placeholder="0000"
                  />
                </div>
                <div>
                  <Label htmlFor="conta">Conta Corrente</Label>
                  <Input
                    id="conta"
                    value={formData.conta}
                    onChange={(e) => handleInputChange("conta", e.target.value)}
                    placeholder="00000-0"
                  />
                </div>
                <div>
                  <Label htmlFor="chave_pix">Chave PIX</Label>
                  <Input
                    id="chave_pix"
                    value={formData.chave_pix}
                    onChange={(e) => handleInputChange("chave_pix", e.target.value)}
                    placeholder="CPF, CNPJ, e-mail ou telefone"
                  />
                </div>
                <div>
                  <Label htmlFor="nome_beneficiario">Nome do Beneficiário</Label>
                  <Input
                    id="nome_beneficiario"
                    value={formData.nome_beneficiario}
                    onChange={(e) => handleInputChange("nome_beneficiario", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
              </div>
            </TabsContent>

            {/* ABA: CRÉDITO E RESTRIÇÕES */}
            <TabsContent value="credito" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="saldo_bloqueado">Saldo Bloqueado (R$)</Label>
                  <Input
                    id="saldo_bloqueado"
                    type="number"
                    step="0.01"
                    value={formData.saldo_bloqueado}
                    onChange={(e) => handleInputChange("saldo_bloqueado", parseFloat(e.target.value) || 0)}
                    placeholder="0,00"
                  />
                  {formData.saldo_bloqueado > 0 && (
                    <p className="text-sm text-destructive mt-1">
                      ⚠️ Cliente bloqueado para faturamento devido a débito
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="autorizar_faturamento">Autorizar Faturamento</Label>
                  <Select value={formData.autorizar_faturamento} onValueChange={(value) => handleInputChange("autorizar_faturamento", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100% Liberado</SelectItem>
                      <SelectItem value="limite">Até Limite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.autorizar_faturamento === "limite" && (
                  <div>
                    <Label htmlFor="limite_credito">Limite de Crédito (R$)</Label>
                    <Input
                      id="limite_credito"
                      type="number"
                      step="0.01"
                      value={formData.limite_credito}
                      onChange={(e) => handleInputChange("limite_credito", parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="restrito">Restrito</Label>
                    <p className="text-sm text-muted-foreground">Marcar cliente como restrito</p>
                  </div>
                  <Switch
                    id="restrito"
                    checked={formData.restrito}
                    onCheckedChange={(checked) => handleInputChange("restrito", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analise_credito_bloqueado">Análise de Crédito - Bloqueado</Label>
                    <p className="text-sm text-muted-foreground">Bloquear para análise de crédito</p>
                  </div>
                  <Switch
                    id="analise_credito_bloqueado"
                    checked={formData.analise_credito_bloqueado}
                    onCheckedChange={(checked) => handleInputChange("analise_credito_bloqueado", checked)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* ABA: DOCUMENTOS */}
            <TabsContent value="documentos" className="space-y-4 mt-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.xml,.xlsx,.xls,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Arraste arquivos ou clique para fazer upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Aceitos: PDF, JPG, PNG, XML, Excel, Word
                  </p>
                </label>
              </div>

              {uploadedDocs.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Documentos Anexados</h3>
                  {uploadedDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(doc.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDoc(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ABA: OBSERVAÇÕES */}
            <TabsContent value="observacoes" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  rows={10}
                  placeholder="Histórico de compras, preferências, informações relevantes para o relacionamento com o cliente..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntidadeModal;
