import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { X, Save, Upload, Trash2, FileText, Plus, Link2, UserCheck, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useCepLookup } from "@/hooks/useCepLookup";
import { useDraft } from "@/hooks/useDraft";
import { useSegmentoLeadManager } from "@/hooks/useSegmentoLeadManager";
import { mockCertificados } from "@/data/boasPraticas";
import { getStatusLabel, getStatusColor, getAlertaVencimento } from "@/types/boasPraticas";
import { EmpresasVisiveis, EmpresaVisivel } from "./EmpresasVisiveis";
import { DraftIndicator, DraftSaveButton } from "./DraftIndicator";

interface EntidadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoEntidade: string;
  onConvertToClient?: (formData: any) => void;
  editData?: any;
}

interface ContaBancaria {
  banco: string;
  agencia: string;
  conta: string;
  chave_pix: string;
  nome_beneficiario: string;
  // International fields (for fornecedor revenda)
  bank?: string;
  branch?: string;
  account_number?: string;
  iban?: string;
  swift_code?: string;
  beneficiary?: string;
  moeda?: string;
  pais_origem?: string;
  cidade_banco?: string;
}

interface ISOEntry {
  id: string;
  fabrica: string;
  vencimento: string;
  observacao: string;
  arquivoISO: File | null;
  nomeArquivoISO: string;
  arquivoTraducao: File | null;
  nomeArquivoTraducao: string;
}

const EntidadeModal = ({ isOpen, onClose, tipoEntidade, onConvertToClient, editData }: EntidadeModalProps) => {
  const { lookupCep, loading: cepLoading } = useCepLookup();
  const { segmentos } = useSegmentoLeadManager();
  const [uploadedDocs, setUploadedDocs] = useState<Array<{ name: string; size: number; type: string }>>([]);
  const [certificadosVinculados, setCertificadosVinculados] = useState<string[]>([]);
  const [certificadoSelecionado, setCertificadoSelecionado] = useState<string>("");
  const [empresasVisiveis, setEmpresasVisiveis] = useState<EmpresaVisivel[]>([]);
  const [todasEmpresas, setTodasEmpresas] = useState(true);
  const [draftRestored, setDraftRestored] = useState(false);

  const isFornecedor = tipoEntidade.startsWith('fornecedores_');
  const isFornecedorRevenda = tipoEntidade === 'fornecedores_revenda';
  const isFornecedorUsoConsumo = tipoEntidade === 'fornecedores_uso_consumo';
  const isFornecedorServicos = tipoEntidade === 'fornecedores_servicos';
  const isLead = tipoEntidade === 'leads';
  const isCliente = tipoEntidade === 'clientes';
  const isRepresentante = tipoEntidade === 'representantes';
  const entityLabel = isRepresentante ? "Representante Comercial" : isFornecedorRevenda ? "Unidade Fabril" : isFornecedorUsoConsumo ? "Fornecedor – Uso e Consumo" : isFornecedorServicos ? "Fornecedor – Serviços" : (isLead ? "Lead" : "Cliente");

  // Hook de rascunho
  const { 
    hasDraft, 
    draftInfo, 
    saveDraft, 
    loadDraft, 
    discardDraft, 
    clearDraftOnSave 
  } = useDraft({
    moduleName: 'cadastro',
    entityType: tipoEntidade,
    expirationDays: 7
  });

  const [formData, setFormData] = useState({
    // Dados Gerais
    nome_cliente: "",
    razao_social: "",
    cnpj_cpf: "",
    cin_rg: "",
    tipo_cliente: "",
    tipo_lead: "" as "" | "publico" | "particular",
    fonte_lead: "",
    segmento_lead: "",
    metodo_contato: "",
    nome_fantasia: "",
    tin_tax_id: "",
    
    // Contatos expandidos
    telefone1: "",
    telefone2: "",
    telefone3: "",
    telefone4: "",
    telefone_fixo1: "",
    telefone_fixo2: "",
    telefone_whatsapp: "",
    telefone_whatsapp_mantenedor: "",
    email1: "",
    email2: "",
    email3: "",
    email4: "",
    website: "",
    
    // Redes Sociais do Lead
    instagram: "",
    facebook: "",
    linkedin: "",
    x_twitter: "",
    // Redes Sociais do Mantenedor
    website_mantenedor: "",
    instagram_mantenedor: "",
    facebook_mantenedor: "",
    linkedin_mantenedor: "",
    x_twitter_mantenedor: "",
    
    // Dados Fiscais
    inscricao_estadual: "",
    inscricao_municipal: "",
    inscricao_suframa: "",
    cnae_principal: "",
    contribuinte: "",
    optante_simples_nacional: false,
    produtor_rural: false,
    orgao_publico: false,
    privado: false,
    
    // Endereço Faturamento
    fat_endereco: "",
    fat_numero: "",
    fat_complemento: "",
    fat_cidade: "",
    fat_estado: "",
    fat_cep: "",
    fat_uf: "",
    fat_pais: "Brasil",
    
    // Endereço Entrega
    ent_endereco: "",
    ent_numero: "",
    ent_complemento: "",
    ent_cidade: "",
    ent_estado: "",
    ent_cep: "",
    ent_uf: "",
    ent_pais: "Brasil",
    
    // Endereço Faturamento Mantenedor
    mant_fat_endereco: "",
    mant_fat_numero: "",
    mant_fat_complemento: "",
    mant_fat_cidade: "",
    mant_fat_estado: "",
    mant_fat_cep: "",
    mant_fat_uf: "",
    mant_fat_pais: "Brasil",
    
    // Endereço Entrega Mantenedor
    mant_ent_endereco: "",
    mant_ent_numero: "",
    mant_ent_complemento: "",
    mant_ent_cidade: "",
    mant_ent_estado: "",
    mant_ent_cep: "",
    mant_ent_uf: "",
    mant_ent_pais: "Brasil",

    // Endereço Unidade Fabril (fornecedor revenda)
    fabril_cep: "",
    fabril_endereco: "",
    fabril_numero: "",
    fabril_complemento: "",
    fabril_cidade: "",
    fabril_estado: "",
    fabril_uf: "",
    fabril_pais: "",

    // Endereço Coleta da Mercadoria (fornecedor revenda)
    coleta_cep: "",
    coleta_endereco: "",
    coleta_numero: "",
    coleta_complemento: "",
    coleta_cidade: "",
    coleta_estado: "",
    coleta_uf: "",
    coleta_pais: "",
    
    // Contato Comercial do Lead
    contato_nome: "",
    contato_cargo: "",
    contato_telefone: "",
    contato_email: "",
    // Contato Comercial do Mantenedor
    contato_nome_mantenedor: "",
    contato_cargo_mantenedor: "",
    contato_telefone_mantenedor: "",
    contato_email_mantenedor: "",
    
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
    
    // Comissão (Representante Comercial)
    percentual_comissao_padrao: 0,
    
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

  const [contasBancarias, setContasBancarias] = useState<ContaBancaria[]>([
    { banco: '', agencia: '', conta: '', chave_pix: '', nome_beneficiario: '' }
  ]);
  const [showConvertConfirm, setShowConvertConfirm] = useState(false);

  // Linhas (fornecedor revenda)
  const [linhas, setLinhas] = useState<string[]>([]);

  // ISOs (fornecedor revenda)
  const [isosVinculadas, setIsosVinculadas] = useState<ISOEntry[]>([]);

  const handleContaBancariaChange = (index: number, field: keyof ContaBancaria, value: string) => {
    setContasBancarias(prev => prev.map((conta, i) => 
      i === index ? { ...conta, [field]: value } : conta
    ));
  };

  const addContaBancaria = () => {
    setContasBancarias(prev => [...prev, { banco: '', agencia: '', conta: '', chave_pix: '', nome_beneficiario: '' }]);
  };

  const removeContaBancaria = (index: number) => {
    if (contasBancarias.length > 1) {
      setContasBancarias(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Linhas handlers
  const addLinha = () => setLinhas(prev => [...prev, '']);
  const removeLinha = (index: number) => setLinhas(prev => prev.filter((_, i) => i !== index));
  const updateLinha = (index: number, value: string) => {
    setLinhas(prev => prev.map((l, i) => i === index ? value : l));
  };

  // ISO handlers
  const addISO = () => {
    setIsosVinculadas(prev => [...prev, {
      id: crypto.randomUUID(),
      fabrica: '',
      vencimento: '',
      observacao: '',
      arquivoISO: null,
      nomeArquivoISO: '',
      arquivoTraducao: null,
      nomeArquivoTraducao: ''
    }]);
  };

  const removeISO = (index: number) => {
    setIsosVinculadas(prev => prev.filter((_, i) => i !== index));
  };

  const updateISO = (index: number, field: keyof ISOEntry, value: any) => {
    setIsosVinculadas(prev => prev.map((iso, i) => i === index ? { ...iso, [field]: value } : iso));
  };

  const getISOStatus = (vencimento: string, hasFile: boolean): { label: string; className: string } => {
    if (!vencimento) return { label: '-', className: '' };
    const dias = Math.ceil((new Date(vencimento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (dias < 0) return { label: 'Vencida', className: 'bg-red-100 text-red-700' };
    if (dias <= 150 && !hasFile) return { label: `Vencendo (${dias} dias)`, className: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Válida', className: 'bg-green-100 text-green-700' };
  };

  // Pré-preencher dados quando em modo edição
  useEffect(() => {
    if (editData && isOpen) {
      const newFormData = { ...formData };
      Object.keys(newFormData).forEach(key => {
        if (editData[key] !== undefined) {
          (newFormData as any)[key] = editData[key];
        }
      });
      // Map common field names
      if (editData.nome) newFormData.nome_cliente = editData.nome;
      if (editData.cnpj) newFormData.cnpj_cpf = editData.cnpj;
      if (editData.telefone) newFormData.telefone1 = editData.telefone;
      if (editData.email) newFormData.email1 = editData.email;
      if (editData.cidade) newFormData.fat_cidade = editData.cidade;
      if (editData.uf) newFormData.fat_uf = editData.uf;
      setFormData(newFormData);
      
      if (editData.contas_bancarias && Array.isArray(editData.contas_bancarias)) {
        setContasBancarias(editData.contas_bancarias);
      }
      if (editData.linhas && Array.isArray(editData.linhas)) {
        setLinhas(editData.linhas);
      }
      if (editData.isos && Array.isArray(editData.isos)) {
        setIsosVinculadas(editData.isos);
      }
    }
  }, [editData, isOpen]);


  const handleCepLookup = async (cep: string, tipo: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      const result = await lookupCep(cleanCep);
      if (result) {
        const prefixMap: Record<string, string> = {
          'faturamento': 'fat',
          'entrega': 'ent',
          'mant_faturamento': 'mant_fat',
          'mant_entrega': 'mant_ent',
          'fabril': 'fabril',
          'coleta': 'coleta'
        };
        const prefix = prefixMap[tipo];
        if (prefix) {
          setFormData(prev => ({
            ...prev,
            [`${prefix}_endereco`]: result.logradouro,
            [`${prefix}_cidade`]: result.localidade,
            [`${prefix}_estado`]: result.localidade,
            [`${prefix}_uf`]: result.uf
          }));
        }
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
    clearDraftOnSave();
    onClose();
  };

  const handleSaveDraft = () => {
    saveDraft(formData);
  };

  const handleRestoreDraft = () => {
    const draftData = loadDraft();
    if (draftData) {
      setFormData(prev => ({ ...prev, ...draftData }));
      setDraftRestored(true);
    }
  };

  const handleDiscardDraft = () => {
    discardDraft();
    setDraftRestored(false);
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

  // Helper to render an address block
  const renderAddressBlock = (title: string, prefix: string, cepLookupType: string) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>CEP</Label>
          <Input
            value={(formData as any)[`${prefix}_cep`] || ''}
            onChange={(e) => handleInputChange(`${prefix}_cep`, e.target.value)}
            onBlur={(e) => handleCepLookup(e.target.value, cepLookupType)}
            placeholder="00000-000"
          />
        </div>
        <div>
          <Label>Endereço</Label>
          <Input value={(formData as any)[`${prefix}_endereco`] || ''} onChange={(e) => handleInputChange(`${prefix}_endereco`, e.target.value)} placeholder="Rua, Avenida" />
        </div>
        <div>
          <Label>N°</Label>
          <Input value={(formData as any)[`${prefix}_numero`] || ''} onChange={(e) => handleInputChange(`${prefix}_numero`, e.target.value)} placeholder="Número" />
        </div>
        <div>
          <Label>Complemento</Label>
          <Input value={(formData as any)[`${prefix}_complemento`] || ''} onChange={(e) => handleInputChange(`${prefix}_complemento`, e.target.value)} placeholder="Sala, Apto, etc" />
        </div>
        <div>
          <Label>Cidade</Label>
          <Input value={(formData as any)[`${prefix}_cidade`] || ''} onChange={(e) => handleInputChange(`${prefix}_cidade`, e.target.value)} placeholder="Cidade" />
        </div>
        <div>
          <Label>Estado</Label>
          <Input value={(formData as any)[`${prefix}_estado`] || ''} onChange={(e) => handleInputChange(`${prefix}_estado`, e.target.value)} placeholder="Estado" />
        </div>
        <div>
          <Label>UF</Label>
          <Input value={(formData as any)[`${prefix}_uf`] || ''} onChange={(e) => handleInputChange(`${prefix}_uf`, e.target.value)} placeholder="UF" maxLength={2} />
        </div>
        <div>
          <Label>País</Label>
          <Input value={(formData as any)[`${prefix}_pais`] || ''} onChange={(e) => handleInputChange(`${prefix}_pais`, e.target.value)} placeholder="País" />
        </div>
      </div>
    </div>
  );

  // Calculate tab count for grid
  const getTabGridCols = () => {
    if (isFornecedorRevenda) return 'flex flex-wrap gap-1';
    if (isFornecedorUsoConsumo || isFornecedorServicos) return 'grid grid-cols-7 w-full';
    if (isFornecedor) return 'grid grid-cols-9 w-full';
    if (isRepresentante) return 'grid grid-cols-9 w-full';
    return 'grid grid-cols-8 w-full';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">{editData ? 'Editar' : 'Cadastro de'} {getTipoLabel(tipoEntidade)}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          {/* Indicador de Rascunho */}
          {!draftRestored && (
            <DraftIndicator
              hasDraft={hasDraft}
              draftInfo={draftInfo}
              onRestore={handleRestoreDraft}
              onDiscard={handleDiscardDraft}
              entityLabel={getTipoLabel(tipoEntidade)}
            />
          )}
          
          <Tabs defaultValue="dados-gerais" className="w-full">
            <TabsList className={getTabGridCols()}>
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="enderecos">Endereços</TabsTrigger>
              <TabsTrigger value="fiscais">Dados Fiscais</TabsTrigger>
              <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
              {!isFornecedorRevenda && !isFornecedorUsoConsumo && (
                <TabsTrigger value="credito">Crédito/Restrições</TabsTrigger>
              )}
              {isRepresentante && (
                <TabsTrigger value="comissao">Comissão</TabsTrigger>
              )}
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              {isFornecedorRevenda && (
                <TabsTrigger value="linhas">Linhas</TabsTrigger>
              )}
              {isFornecedor && !isFornecedorUsoConsumo && (
                <TabsTrigger value="boas-praticas">Boas Práticas</TabsTrigger>
              )}
              {isFornecedorRevenda && (
                <TabsTrigger value="iso">ISO</TabsTrigger>
              )}
              <TabsTrigger value="empresas">Empresas</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>

            {/* ABA: DADOS GERAIS */}
            <TabsContent value="dados-gerais" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tipoEntidade === "leads" && (
                  <>
                    <div>
                      <Label htmlFor="fonte_lead">Fonte do Lead</Label>
                      <Select value={formData.fonte_lead} onValueChange={(value) => handleInputChange("fonte_lead", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a fonte" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="site">Site</SelectItem>
                          <SelectItem value="indicacao">Indicação</SelectItem>
                          <SelectItem value="cold_call">Cold Call</SelectItem>
                          <SelectItem value="licitacao">Licitação</SelectItem>
                          <SelectItem value="referencia">Referência</SelectItem>
                          <SelectItem value="evento">Evento</SelectItem>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="email">E-mail</SelectItem>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="video_chamada">Vídeo Chamada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="segmento_lead">Segmento do Lead</Label>
                      <Select value={formData.segmento_lead} onValueChange={(value) => handleInputChange("segmento_lead", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          {segmentos.map(s => (
                            <SelectItem key={s.id} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="metodo_contato">Método de Contato</Label>
                      <Select value={formData.metodo_contato} onValueChange={(value) => handleInputChange("metodo_contato", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="email">E-mail</SelectItem>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="video_chamada">Vídeo Chamada</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tipo_lead">Tipo de Lead</Label>
                      <Select value={formData.tipo_lead} onValueChange={(value) => handleInputChange("tipo_lead", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publico">Público</SelectItem>
                          <SelectItem value="particular">Particular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {isCliente && editData && editData.segmento_lead && (
                  <div>
                    <Label htmlFor="segmento_cliente">Segmento do Cliente (originado do Lead)</Label>
                    <Select value={editData.segmento_lead} disabled>
                      <SelectTrigger className="bg-muted">
                        <SelectValue placeholder="Segmento do Lead" />
                      </SelectTrigger>
                      <SelectContent>
                        {segmentos.map((segmento) => (
                          <SelectItem key={segmento.id} value={segmento.value}>{segmento.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {!isRepresentante && !isFornecedorRevenda && !isFornecedorUsoConsumo && (
                  <div>
                    <Label htmlFor="tipo_cliente">Tipo de {entityLabel}</Label>
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
                )}

                <div>
                  <Label htmlFor="nome_cliente">
                    {isFornecedorRevenda ? "Nome da Unidade Fabril" : isFornecedorUsoConsumo ? "Nome do Fornecedor – Uso e Consumo" : `Nome do ${entityLabel}`}
                  </Label>
                  <Input
                    id="nome_cliente"
                    value={formData.nome_cliente}
                    onChange={(e) => handleInputChange("nome_cliente", e.target.value)}
                    placeholder={isFornecedorRevenda ? "Nome da unidade fabril" : isFornecedorUsoConsumo ? "Nome do fornecedor" : "Nome do cliente"}
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

                {!isRepresentante && !isFornecedorUsoConsumo && (
                  <>
                    <div>
                      <Label htmlFor="nome_mantenedor">
                        {isFornecedorRevenda ? "Nome do Fabricante Legal/Marca" : "Nome do Mantenedor"}
                      </Label>
                      <Input
                        id="nome_mantenedor"
                        value={formData.nome_mantenedor}
                        onChange={(e) => handleInputChange("nome_mantenedor", e.target.value)}
                        placeholder={isFornecedorRevenda ? "Nome do fabricante legal/marca" : "Nome do mantenedor"}
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
                  </>
                )}

                {isFornecedorRevenda && (
                  <div>
                    <Label htmlFor="tin_tax_id">TIN (Tax Id Number)</Label>
                    <Input
                      id="tin_tax_id"
                      value={formData.tin_tax_id}
                      onChange={(e) => handleInputChange("tin_tax_id", e.target.value)}
                      placeholder="Tax Identification Number"
                    />
                  </div>
                )}
              </div>

              {!isRepresentante && (
              <>
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Telefones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone1">Telefone 1 do {entityLabel}</Label>
                    <Input
                      id="telefone1"
                      value={formData.telefone1}
                      onChange={(e) => handleInputChange("telefone1", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone2">Telefone 2 do {entityLabel}</Label>
                    <Input
                      id="telefone2"
                      value={formData.telefone2}
                      onChange={(e) => handleInputChange("telefone2", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone3">Telefone 1 do Mantenedor</Label>
                    <Input
                      id="telefone3"
                      value={formData.telefone3}
                      onChange={(e) => handleInputChange("telefone3", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone4">Telefone 2 do Mantenedor</Label>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone_fixo1">Telefone Fixo 1 do {entityLabel}</Label>
                    <Input
                      id="telefone_fixo1"
                      value={formData.telefone_fixo1}
                      onChange={(e) => handleInputChange("telefone_fixo1", e.target.value)}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone_fixo2">Telefone Fixo 2 do Mantenedor</Label>
                    <Input
                      id="telefone_fixo2"
                      value={formData.telefone_fixo2}
                      onChange={(e) => handleInputChange("telefone_fixo2", e.target.value)}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">WhatsApp</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone_whatsapp">Telefone WhatsApp do {entityLabel}</Label>
                    <Input
                      id="telefone_whatsapp"
                      value={formData.telefone_whatsapp}
                      onChange={(e) => handleInputChange("telefone_whatsapp", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone_whatsapp_mantenedor">Telefone WhatsApp do Mantenedor</Label>
                    <Input
                      id="telefone_whatsapp_mantenedor"
                      value={formData.telefone_whatsapp_mantenedor}
                      onChange={(e) => handleInputChange("telefone_whatsapp_mantenedor", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">E-mails</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email1">E-mail 1 do {entityLabel}</Label>
                    <Input id="email1" type="email" value={formData.email1} onChange={(e) => handleInputChange("email1", e.target.value)} placeholder="email@exemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="email2">E-mail 2 do {entityLabel}</Label>
                    <Input id="email2" type="email" value={formData.email2} onChange={(e) => handleInputChange("email2", e.target.value)} placeholder="email@exemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="email3">E-mail 1 do Mantenedor</Label>
                    <Input id="email3" type="email" value={formData.email3} onChange={(e) => handleInputChange("email3", e.target.value)} placeholder="email@exemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="email4">E-mail 2 do Mantenedor</Label>
                    <Input id="email4" type="email" value={formData.email4} onChange={(e) => handleInputChange("email4", e.target.value)} placeholder="email@exemplo.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Web e Redes Sociais do {entityLabel}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" value={formData.website} onChange={(e) => handleInputChange("website", e.target.value)} placeholder="https://www.exemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" value={formData.instagram} onChange={(e) => handleInputChange("instagram", e.target.value)} placeholder="@usuario" />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" value={formData.facebook} onChange={(e) => handleInputChange("facebook", e.target.value)} placeholder="/usuario" />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" value={formData.linkedin} onChange={(e) => handleInputChange("linkedin", e.target.value)} placeholder="/company/empresa" />
                  </div>
                  <div>
                    <Label htmlFor="x_twitter">X (Twitter)</Label>
                    <Input id="x_twitter" value={formData.x_twitter} onChange={(e) => handleInputChange("x_twitter", e.target.value)} placeholder="@usuario" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Web e Redes Sociais do Mantenedor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website_mantenedor">Website</Label>
                    <Input id="website_mantenedor" value={formData.website_mantenedor} onChange={(e) => handleInputChange("website_mantenedor", e.target.value)} placeholder="https://www.exemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="instagram_mantenedor">Instagram</Label>
                    <Input id="instagram_mantenedor" value={formData.instagram_mantenedor} onChange={(e) => handleInputChange("instagram_mantenedor", e.target.value)} placeholder="@usuario" />
                  </div>
                  <div>
                    <Label htmlFor="facebook_mantenedor">Facebook</Label>
                    <Input id="facebook_mantenedor" value={formData.facebook_mantenedor} onChange={(e) => handleInputChange("facebook_mantenedor", e.target.value)} placeholder="/usuario" />
                  </div>
                  <div>
                    <Label htmlFor="linkedin_mantenedor">LinkedIn</Label>
                    <Input id="linkedin_mantenedor" value={formData.linkedin_mantenedor} onChange={(e) => handleInputChange("linkedin_mantenedor", e.target.value)} placeholder="/company/empresa" />
                  </div>
                  <div>
                    <Label htmlFor="x_twitter_mantenedor">X (Twitter)</Label>
                    <Input id="x_twitter_mantenedor" value={formData.x_twitter_mantenedor} onChange={(e) => handleInputChange("x_twitter_mantenedor", e.target.value)} placeholder="@usuario" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Contato Comercial do {entityLabel}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contato_nome">Nome</Label>
                    <Input id="contato_nome" value={formData.contato_nome} onChange={(e) => handleInputChange("contato_nome", e.target.value)} placeholder="Nome do contato" />
                  </div>
                  <div>
                    <Label htmlFor="contato_cargo">Cargo</Label>
                    <Input id="contato_cargo" value={formData.contato_cargo} onChange={(e) => handleInputChange("contato_cargo", e.target.value)} placeholder="Cargo" />
                  </div>
                  <div>
                    <Label htmlFor="contato_telefone">Telefone</Label>
                    <Input id="contato_telefone" value={formData.contato_telefone} onChange={(e) => handleInputChange("contato_telefone", e.target.value)} placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <Label htmlFor="contato_email">E-mail</Label>
                    <Input id="contato_email" type="email" value={formData.contato_email} onChange={(e) => handleInputChange("contato_email", e.target.value)} placeholder="email@exemplo.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-sm">Contato Comercial do Mantenedor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contato_nome_mantenedor">Nome</Label>
                    <Input id="contato_nome_mantenedor" value={formData.contato_nome_mantenedor} onChange={(e) => handleInputChange("contato_nome_mantenedor", e.target.value)} placeholder="Nome do contato" />
                  </div>
                  <div>
                    <Label htmlFor="contato_cargo_mantenedor">Cargo</Label>
                    <Input id="contato_cargo_mantenedor" value={formData.contato_cargo_mantenedor} onChange={(e) => handleInputChange("contato_cargo_mantenedor", e.target.value)} placeholder="Cargo" />
                  </div>
                  <div>
                    <Label htmlFor="contato_telefone_mantenedor">Telefone</Label>
                    <Input id="contato_telefone_mantenedor" value={formData.contato_telefone_mantenedor} onChange={(e) => handleInputChange("contato_telefone_mantenedor", e.target.value)} placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <Label htmlFor="contato_email_mantenedor">E-mail</Label>
                    <Input id="contato_email_mantenedor" type="email" value={formData.contato_email_mantenedor} onChange={(e) => handleInputChange("contato_email_mantenedor", e.target.value)} placeholder="email@exemplo.com" />
                  </div>
                </div>
              </div>

              </>
              )}
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
              {isFornecedorRevenda ? (
                <>
                  {renderAddressBlock("Endereço de Faturamento", "fat", "faturamento")}
                  {renderAddressBlock("Endereço da Unidade Fabril", "fabril", "fabril")}
                  {renderAddressBlock("Endereço do Fabricante Legal", "mant_fat", "mant_faturamento")}
                  {renderAddressBlock("Endereço da Coleta da Mercadoria", "coleta", "coleta")}
                </>
              ) : isFornecedorUsoConsumo ? (
                <>
                  {renderAddressBlock("Endereço", "fat", "faturamento")}
                </>
              ) : (
                <>
                  {renderAddressBlock(
                    isRepresentante ? 'Endereço' : `Endereço de Faturamento do ${entityLabel}`,
                    "fat",
                    "faturamento"
                  )}

                  {!isRepresentante && (
                    <>
                      {renderAddressBlock(`Endereço de Entrega do ${entityLabel}`, "ent", "entrega")}
                    </>
                  )}

                  {(isLead || isCliente) && (
                    <>
                      {renderAddressBlock("Endereço de Faturamento do Mantenedor", "mant_fat", "mant_faturamento")}
                      {renderAddressBlock("Endereço de Entrega do Mantenedor", "mant_ent", "mant_entrega")}
                    </>
                  )}
                </>
              )}
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
                <div>
                  <Label htmlFor="contribuinte">Contribuinte</Label>
                  <Select value={formData.contribuinte} onValueChange={(value) => handleInputChange("contribuinte", value)}>
                    <SelectTrigger id="contribuinte">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Contribuinte ICMS</SelectItem>
                      <SelectItem value="2">2 - Contribuinte isento de Inscrição no cadastro de Contribuintes do ICMS</SelectItem>
                      <SelectItem value="9">9 - Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do ICMS</SelectItem>
                    </SelectContent>
                  </Select>
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
              {contasBancarias.map((conta, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Banco {index + 1}</h3>
                    {contasBancarias.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeContaBancaria(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isFornecedorRevenda ? (
                      <>
                        <div>
                          <Label>Bank</Label>
                          <Input value={conta.bank || ''} onChange={(e) => handleContaBancariaChange(index, "bank", e.target.value)} placeholder="Bank name" />
                        </div>
                        <div>
                          <Label>Branch</Label>
                          <Input value={conta.branch || ''} onChange={(e) => handleContaBancariaChange(index, "branch", e.target.value)} placeholder="Branch" />
                        </div>
                        <div>
                          <Label>Account Number</Label>
                          <Input value={conta.account_number || ''} onChange={(e) => handleContaBancariaChange(index, "account_number", e.target.value)} placeholder="Account number" />
                        </div>
                        <div>
                          <Label>IBAN</Label>
                          <Input value={conta.iban || ''} onChange={(e) => handleContaBancariaChange(index, "iban", e.target.value)} placeholder="IBAN" />
                        </div>
                        <div>
                          <Label>SWIFT</Label>
                          <Input value={conta.swift_code || ''} onChange={(e) => handleContaBancariaChange(index, "swift_code", e.target.value)} placeholder="SWIFT code" />
                        </div>
                        <div>
                          <Label>Beneficiary</Label>
                          <Input value={conta.beneficiary || ''} onChange={(e) => handleContaBancariaChange(index, "beneficiary", e.target.value)} placeholder="Beneficiary name" />
                        </div>
                        <div>
                          <Label>Moeda</Label>
                          <Input value={conta.moeda || ''} onChange={(e) => handleContaBancariaChange(index, "moeda", e.target.value)} placeholder="USD, EUR, BRL..." />
                        </div>
                        <div>
                          <Label>País origem</Label>
                          <Input value={conta.pais_origem || ''} onChange={(e) => handleContaBancariaChange(index, "pais_origem", e.target.value)} placeholder="País de origem" />
                        </div>
                        <div>
                          <Label>Cidade do banco</Label>
                          <Input value={conta.cidade_banco || ''} onChange={(e) => handleContaBancariaChange(index, "cidade_banco", e.target.value)} placeholder="Cidade" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label>Banco</Label>
                          <Input value={conta.banco} onChange={(e) => handleContaBancariaChange(index, "banco", e.target.value)} placeholder="Nome do banco" />
                        </div>
                        <div>
                          <Label>Chave PIX</Label>
                          <Input value={conta.chave_pix} onChange={(e) => handleContaBancariaChange(index, "chave_pix", e.target.value)} placeholder="CPF, CNPJ, e-mail ou telefone" />
                        </div>
                        <div>
                          <Label>Agência</Label>
                          <Input value={conta.agencia} onChange={(e) => handleContaBancariaChange(index, "agencia", e.target.value)} placeholder="0000" />
                        </div>
                        <div>
                          <Label>Conta Corrente</Label>
                          <Input value={conta.conta} onChange={(e) => handleContaBancariaChange(index, "conta", e.target.value)} placeholder="00000-0" />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Nome do Beneficiário</Label>
                          <Input value={conta.nome_beneficiario} onChange={(e) => handleContaBancariaChange(index, "nome_beneficiario", e.target.value)} placeholder="Nome completo" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addContaBancaria} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Banco
              </Button>
            </TabsContent>

            {/* ABA: COMISSÃO (apenas para representantes) */}
            {isRepresentante && (
              <TabsContent value="comissao" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Comissão do Representante</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="percentual_comissao_padrao">Percentual de Comissão Padrão (%)</Label>
                      <Input
                        id="percentual_comissao_padrao"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={formData.percentual_comissao_padrao}
                        onChange={(e) => handleInputChange("percentual_comissao_padrao", parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                    <p>ℹ️ Este percentual é o valor padrão e pode variar em cada venda.</p>
                  </div>
                </div>
              </TabsContent>
            )}

            {/* ABA: CRÉDITO E RESTRIÇÕES (oculta para fornecedor revenda) */}
            {!isFornecedorRevenda && (
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
            )}

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

            {/* ABA: LINHAS (apenas para fornecedor revenda) */}
            {isFornecedorRevenda && (
              <TabsContent value="linhas" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Linhas de Produtos</h3>
                  
                  {linhas.length > 0 ? (
                    <div className="space-y-3">
                      {linhas.map((linha, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={linha}
                            onChange={(e) => updateLinha(index, e.target.value)}
                            placeholder={`Linha ${index + 1}`}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => removeLinha(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                      <p>Nenhuma linha cadastrada.</p>
                      <p className="text-xs mt-1">Clique em "Adicionar Linha" para começar.</p>
                    </div>
                  )}

                  <Button variant="outline" onClick={addLinha} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Linha
                  </Button>
                </div>
              </TabsContent>
            )}

            {/* ABA: BOAS PRÁTICAS (apenas para fornecedores) */}
            {isFornecedor && (
              <TabsContent value="boas-praticas" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Certificados de Boas Práticas</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                    <p>ℹ️ O certificado e a validade são replicados do módulo Regulatório. Cadastre os certificados no Regulatório para que apareçam aqui.</p>
                  </div>

                  {/* Vincular certificado */}
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor="certificado_select">Vincular Certificado</Label>
                      <Select 
                        value={certificadoSelecionado} 
                        onValueChange={setCertificadoSelecionado}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um certificado..." />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCertificados
                            .filter(cert => !certificadosVinculados.includes(cert.id))
                            .map(cert => (
                              <SelectItem key={cert.id} value={cert.id}>
                                {cert.nomeArquivoPrincipal}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => {
                        if (certificadoSelecionado) {
                          setCertificadosVinculados(prev => [...prev, certificadoSelecionado]);
                          setCertificadoSelecionado("");
                        }
                      }}
                      disabled={!certificadoSelecionado}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Vincular
                    </Button>
                  </div>

                  {/* Alertas de vencimento */}
                  {certificadosVinculados.map(certId => {
                    const cert = mockCertificados.find(c => c.id === certId);
                    if (!cert?.validade) return null;
                    const dias = Math.ceil((new Date(cert.validade).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    if (dias <= 365 && dias > 180) {
                      return (
                        <div key={`alerta-${certId}`} className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-sm text-yellow-800">
                          ⚠️ O certificado "{cert.nomeArquivoPrincipal}" vence em {dias} dias. Providencie a renovação.
                        </div>
                      );
                    }
                    if (dias <= 180) {
                      return (
                        <div key={`alerta-${certId}`} className="bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-800">
                          🚨 URGENTE: O certificado "{cert.nomeArquivoPrincipal}" vence em {dias} dias!
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Tabela de certificados vinculados */}
                  {certificadosVinculados.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Nome</th>
                            <th className="text-left p-3 font-medium">Fabricante Legal</th>
                            <th className="text-left p-3 font-medium">Unidade Fabril</th>
                            <th className="text-left p-3 font-medium">Validade</th>
                            <th className="text-left p-3 font-medium">Status</th>
                            <th className="text-center p-3 font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {certificadosVinculados.map(certId => {
                            const cert = mockCertificados.find(c => c.id === certId);
                            if (!cert) return null;
                            const alerta = getAlertaVencimento(cert.validade);
                            return (
                              <tr key={certId} className="border-t">
                                <td className="p-3">{cert.nomeArquivoPrincipal}</td>
                                <td className="p-3">{cert.fabricanteLegal || '-'}</td>
                                <td className="p-3 max-w-[200px] truncate">{cert.unidadeFabril || '-'}</td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    {cert.validade ? new Date(cert.validade).toLocaleDateString('pt-BR') : '-'}
                                    {alerta.tipo && (
                                      <span className={`text-xs px-2 py-0.5 rounded ${
                                        alerta.tipo === 'danger' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                      }`}>
                                        {alerta.mensagem}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(cert.status)}`}>
                                    {getStatusLabel(cert.status)}
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCertificadosVinculados(prev => prev.filter(id => id !== certId))}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                      <Link2 className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p>Nenhum certificado vinculado</p>
                      <p className="text-xs mt-1">Selecione um certificado acima para vincular a este fornecedor</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            )}

            {/* ABA: ISO (apenas para fornecedor revenda) */}
            {isFornecedorRevenda && (
              <TabsContent value="iso" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Certificados ISO</h3>

                  {/* Alertas de vencimento ISO */}
                  {isosVinculadas.map((iso, idx) => {
                    if (!iso.vencimento) return null;
                    const status = getISOStatus(iso.vencimento, !!iso.nomeArquivoISO);
                    if (status.label.startsWith('Vencendo') || status.label === 'Vencida') {
                      return (
                        <div key={`iso-alerta-${idx}`} className={`border rounded-lg p-3 text-sm ${status.label === 'Vencida' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-yellow-50 border-yellow-300 text-yellow-800'}`}>
                          {status.label === 'Vencida'
                            ? `🚨 A ISO da fábrica "${iso.fabrica || `#${idx + 1}`}" está vencida! Solicite a renovação.`
                            : `⚠️ A ISO da fábrica "${iso.fabrica || `#${idx + 1}`}" está ${status.label}. É necessário pedir a renovação e anexar o novo arquivo.`
                          }
                        </div>
                      );
                    }
                    return null;
                  })}

                  {isosVinculadas.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Fábrica</th>
                            <th className="text-left p-3 font-medium">Vencimento das ISOs</th>
                            <th className="text-left p-3 font-medium">Status</th>
                            <th className="text-left p-3 font-medium">Observação</th>
                            <th className="text-left p-3 font-medium">Anexar ISO</th>
                            <th className="text-left p-3 font-medium">Anexar Tradução</th>
                            <th className="text-center p-3 font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isosVinculadas.map((iso, index) => {
                            const status = getISOStatus(iso.vencimento, !!iso.nomeArquivoISO);
                            return (
                              <tr key={iso.id} className="border-t">
                                <td className="p-3">
                                  <Input value={iso.fabrica} onChange={(e) => updateISO(index, 'fabrica', e.target.value)} placeholder="Nome da fábrica" className="min-w-[150px]" />
                                </td>
                                <td className="p-3">
                                  <Input type="date" value={iso.vencimento} onChange={(e) => updateISO(index, 'vencimento', e.target.value)} className="min-w-[140px]" />
                                </td>
                                <td className="p-3">
                                  {status.label !== '-' && (
                                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${status.className}`}>
                                      {status.label}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3">
                                  <Input value={iso.observacao} onChange={(e) => updateISO(index, 'observacao', e.target.value)} placeholder="Observação" className="min-w-[150px]" />
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="file"
                                      id={`iso-file-${index}`}
                                      className="hidden"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          updateISO(index, 'arquivoISO', file);
                                          updateISO(index, 'nomeArquivoISO', file.name);
                                        }
                                      }}
                                    />
                                    <label htmlFor={`iso-file-${index}`} className="cursor-pointer">
                                      <Button variant="outline" size="sm" asChild>
                                        <span><Upload className="h-3 w-3 mr-1" />{iso.nomeArquivoISO || 'Anexar'}</span>
                                      </Button>
                                    </label>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="file"
                                      id={`iso-trad-${index}`}
                                      className="hidden"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          updateISO(index, 'arquivoTraducao', file);
                                          updateISO(index, 'nomeArquivoTraducao', file.name);
                                        }
                                      }}
                                    />
                                    <label htmlFor={`iso-trad-${index}`} className="cursor-pointer">
                                      <Button variant="outline" size="sm" asChild>
                                        <span><Upload className="h-3 w-3 mr-1" />{iso.nomeArquivoTraducao || 'Anexar'}</span>
                                      </Button>
                                    </label>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  <Button variant="ghost" size="sm" onClick={() => removeISO(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                      <p>Nenhuma ISO cadastrada.</p>
                      <p className="text-xs mt-1">Clique em "Adicionar ISO" para começar.</p>
                    </div>
                  )}

                  <Button variant="outline" onClick={addISO} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar ISO
                  </Button>
                </div>
              </TabsContent>
            )}

            {/* ABA: EMPRESAS */}
            <TabsContent value="empresas" className="space-y-4 mt-4">
              <EmpresasVisiveis
                empresasVisiveis={empresasVisiveis}
                onEmpresasChange={setEmpresasVisiveis}
                todasEmpresas={todasEmpresas}
                onTodasEmpresasChange={setTodasEmpresas}
              />
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

        <div className="flex-shrink-0 flex justify-between gap-4 p-6 border-t">
          <div className="flex gap-2">
            <DraftSaveButton onSaveDraft={handleSaveDraft} />
            {isLead && editData && onConvertToClient && (
              <Button
                variant="outline"
                onClick={() => setShowConvertConfirm(true)}
                className="border-green-500 text-green-700 hover:bg-green-50"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Converter em Cliente
              </Button>
            )}
          </div>

          {/* Modal de confirmação de conversão */}
          <Dialog open={showConvertConfirm} onOpenChange={setShowConvertConfirm}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Confirmar Conversão
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground py-4">
                Deseja converter este Lead em Cliente? O cadastro será movido para a lista de Clientes.
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConvertConfirm(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    onConvertToClient?.({ ...formData, contasBancarias, segmento_lead: formData.segmento_lead });
                    setShowConvertConfirm(false);
                    onClose();
                  }}
                >
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex gap-2">
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
    </div>
  );
};

export default EntidadeModal;
