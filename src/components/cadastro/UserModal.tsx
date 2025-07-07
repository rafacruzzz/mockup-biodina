import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MoneyInput } from "@/components/ui/money-input";
import { X, Save } from "lucide-react";
import ModuleAccessTree from "./ModuleAccessTree";
import AccessProfileSelector from "./AccessProfileSelector";
import AccessSummary from "./AccessSummary";
import { ModuleAccess } from "@/types/permissions";

interface UserModalProps {
  onClose: () => void;
}

const UserModal = ({ onClose }: UserModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nivelAcesso: "",
    alertas: "ativo",
    status: "ativo",
    
    empresa: "",
    uf: "",
    setor: "",
    funcao: "",
    cargo: "",
    salarioBase: "",
    adicionalNivel: "",
    insalubridade: "",
    sobreaviso: "",
    salarioBruto: "",
    dependentesIR: "",
    valorHoraTrabalhada: "",
    tipoPlano: "",
    quantidadeDependentesPlano: "",
    ultimaPromocao: "",
    previsaoFerias: "",
    dataAdmissao: "",
    tempoCase: "",
    cpf: "",
    pis: "",
    idade: "",
    etnia: "",
    cid: "",
    sexo: "",
    banco: "",
    tipoConta: "",
    agencia: "",
    conta: "",
    telefone: "",
    endereco: "",
    bairro: "",
    escolaridade: "",
    diploma: false,
    pisoSalarial: "",
    mediaSalarial: "",
    cbo: "",
    compativelFuncao: false,
    funcoesDesempenhadas: ""
  });

  const [departmentData, setDepartmentData] = useState({
    nome: "",
    descricao: "",
    responsavel: "",
    ativo: "true"
  });

  const [moduleAccess, setModuleAccess] = useState<ModuleAccess[]>([
    {
      key: 'cadastro',
      name: 'Cadastro',
      icon: 'Users',
      enabled: false,
      subModules: [
        { key: 'entidades', name: 'Entidades', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'produtos', name: 'Produtos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'tabela_preco', name: 'Tabela de Preço', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'kits', name: 'Kits', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'servicos', name: 'Serviços', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'usuarios', name: 'Usuários', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'contas_bancarias', name: 'Contas Bancárias', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'categorias', name: 'Categorias', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'prazos_pagamento', name: 'Prazos de Pagamento', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'comercial',
      name: 'Comercial',
      icon: 'ShoppingCart',
      enabled: false,
      subModules: [
        { key: 'oportunidades', name: 'Oportunidades', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'pedidos', name: 'Pedidos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'propostas', name: 'Propostas', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'licitacoes', name: 'Licitações', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'estoque',
      name: 'Estoque',
      icon: 'Package',
      enabled: false,
      subModules: [
        { key: 'posicao', name: 'Posição de Estoque', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'movimentacoes', name: 'Movimentações', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'separacao', name: 'Separação', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'transferencias', name: 'Transferências', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'compras',
      name: 'Compras',
      icon: 'ShoppingBag',
      enabled: false,
      subModules: [
        { key: 'pedidos', name: 'Pedidos de Compra', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'fiscal', name: 'Compra Fiscal', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'di', name: 'DI - Declaração de Importação', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'financeiro',
      name: 'Financeiro',
      icon: 'DollarSign',
      enabled: false,
      subModules: [
        { key: 'contas_pagar', name: 'Contas a Pagar', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'contas_receber', name: 'Contas a Receber', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'fluxo_caixa', name: 'Fluxo de Caixa', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'bi',
      name: 'BI - Business Intelligence',
      icon: 'BarChart',
      enabled: false,
      subModules: [
        { key: 'dashboards', name: 'Dashboards', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'relatorios', name: 'Relatórios', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'rh',
      name: 'Recursos Humanos',
      icon: 'Users',
      enabled: false,
      subModules: [
        { key: 'funcionarios', name: 'Funcionários', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'folha_pagamento', name: 'Folha de Pagamento', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    },
    {
      key: 'contabilidade',
      name: 'Contabilidade',
      icon: 'Calculator',
      enabled: false,
      subModules: [
        { key: 'plano_contas', name: 'Plano de Contas', permissions: { view: false, create: false, edit: false, delete: false, admin: false } },
        { key: 'lancamentos', name: 'Lançamentos', permissions: { view: false, create: false, edit: false, delete: false, admin: false } }
      ]
    }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDepartmentChange = (field: string, value: string) => {
    setDepartmentData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const base = parseFloat(formData.salarioBase) / 100 || 0;
    const adicional = parseFloat(formData.adicionalNivel) / 100 || 0;
    const insalubridade = parseFloat(formData.insalubridade) / 100 || 0;
    const sobreaviso = parseFloat(formData.sobreaviso) / 100 || 0;
    
    const bruto = (base + adicional + insalubridade + sobreaviso) * 100;
    setFormData(prev => ({ ...prev, salarioBruto: bruto.toString() }));
  }, [formData.salarioBase, formData.adicionalNivel, formData.insalubridade, formData.sobreaviso]);

  useEffect(() => {
    if (formData.dataAdmissao) {
      const admissao = new Date(formData.dataAdmissao);
      const hoje = new Date();
      const diffTime = Math.abs(hoje.getTime() - admissao.getTime());
      const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      
      const tempoTexto = diffYears > 0 ? 
        `${diffYears} ano(s) e ${diffMonths} mês(es)` : 
        `${diffMonths} mês(es)`;
      
      setFormData(prev => ({ ...prev, tempoCase: tempoTexto }));
    }
  }, [formData.dataAdmissao]);

  const handleSave = () => {
    console.log("Salvando usuário:", { ...formData, moduleAccess });
    console.log("Salvando departamento:", departmentData);
    onClose();
  };

  const ufs = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Cadastro de Usuário</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <Tabs defaultValue="usuario" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="usuario">Usuário</TabsTrigger>
              <TabsTrigger value="departamento">Departamento</TabsTrigger>
              <TabsTrigger value="controle">Controle de Sistema</TabsTrigger>
            </TabsList>
            
            <TabsContent value="usuario" className="space-y-6">
              <Accordion type="multiple" defaultValue={["basicas"]} className="w-full">
                <AccordionItem value="basicas">
                  <AccordionTrigger>Informações Básicas</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => handleInputChange("nome", e.target.value)}
                          placeholder="Ex: João Silva"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Ex: joao@biodina.com.br"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange("cpf", e.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </div>

                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange("telefone", e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      <div>
                        <Label htmlFor="idade">Idade</Label>
                        <Input
                          id="idade"
                          type="number"
                          value={formData.idade}
                          onChange={(e) => handleInputChange("idade", e.target.value)}
                          placeholder="Ex: 30"
                        />
                      </div>

                      <div>
                        <Label htmlFor="sexo">Sexo</Label>
                        <Select value={formData.sexo} onValueChange={(value) => handleInputChange("sexo", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="etnia">Etnia</Label>
                        <Input
                          id="etnia"
                          value={formData.etnia}
                          onChange={(e) => handleInputChange("etnia", e.target.value)}
                          placeholder="Ex: Branca, Parda, Negra"
                        />
                      </div>

                      <div>
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange("endereco", e.target.value)}
                          placeholder="Rua, número, complemento"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          value={formData.bairro}
                          onChange={(e) => handleInputChange("bairro", e.target.value)}
                          placeholder="Ex: Centro"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="profissionais">
                  <AccordionTrigger>Dados Profissionais</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="empresa">Empresa</Label>
                        <Input
                          id="empresa"
                          value={formData.empresa}
                          onChange={(e) => handleInputChange("empresa", e.target.value)}
                          placeholder="Nome da empresa"
                        />
                      </div>

                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Select value={formData.uf} onValueChange={(value) => handleInputChange("uf", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {ufs.map((uf) => (
                              <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="setor">Setor</Label>
                        <Input
                          id="setor"
                          value={formData.setor}
                          onChange={(e) => handleInputChange("setor", e.target.value)}
                          placeholder="Ex: Vendas, Administrativo"
                        />
                      </div>

                      <div>
                        <Label htmlFor="funcao">Função</Label>
                        <Input
                          id="funcao"
                          value={formData.funcao}
                          onChange={(e) => handleInputChange("funcao", e.target.value)}
                          placeholder="Ex: Vendedor, Analista"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cargo">Cargo</Label>
                        <Input
                          id="cargo"
                          value={formData.cargo}
                          onChange={(e) => handleInputChange("cargo", e.target.value)}
                          placeholder="Ex: Coordenador, Gerente"
                        />
                      </div>

                      <div>
                        <Label htmlFor="escolaridade">Escolaridade</Label>
                        <Input
                          id="escolaridade"
                          value={formData.escolaridade}
                          onChange={(e) => handleInputChange("escolaridade", e.target.value)}
                          placeholder="Ex: Superior, Técnico, Médio"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cbo">CBO</Label>
                        <Input
                          id="cbo"
                          value={formData.cbo}
                          onChange={(e) => handleInputChange("cbo", e.target.value)}
                          placeholder="Código Brasileiro de Ocupações"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="diploma"
                          checked={formData.diploma}
                          onCheckedChange={(checked) => handleInputChange("diploma", checked as boolean)}
                        />
                        <Label htmlFor="diploma">Possui Diploma?</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="compativelFuncao"
                          checked={formData.compativelFuncao}
                          onCheckedChange={(checked) => handleInputChange("compativelFuncao", checked as boolean)}
                        />
                        <Label htmlFor="compativelFuncao">Compatível com a Função?</Label>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="funcoesDesempenhadas">Funções Desempenhadas</Label>
                        <Textarea
                          id="funcoesDesempenhadas"
                          value={formData.funcoesDesempenhadas}
                          onChange={(e) => handleInputChange("funcoesDesempenhadas", e.target.value)}
                          placeholder="Descreva as funções desempenhadas"
                          rows={3}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="salariais">
                  <AccordionTrigger>Informações Salariais</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="salarioBase">Salário Base</Label>
                        <MoneyInput
                          value={formData.salarioBase}
                          onChange={(value) => handleInputChange("salarioBase", value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="adicionalNivel">Adicional Nível</Label>
                        <MoneyInput
                          value={formData.adicionalNivel}
                          onChange={(value) => handleInputChange("adicionalNivel", value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="insalubridade">Insalubridade</Label>
                        <MoneyInput
                          value={formData.insalubridade}
                          onChange={(value) => handleInputChange("insalubridade", value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="sobreaviso">Sobreaviso</Label>
                        <MoneyInput
                          value={formData.sobreaviso}
                          onChange={(value) => handleInputChange("sobreaviso", value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="salarioBruto">Salário Bruto (calculado)</Label>
                        <MoneyInput
                          value={formData.salarioBruto}
                          onChange={() => {}} // Read-only
                          disabled
                        />
                      </div>

                      <div>
                        <Label htmlFor="valorHoraTrabalhada">Valor da Hora Trabalhada</Label>
                        <MoneyInput
                          value={formData.valorHoraTrabalhada}
                          onChange={(value) => handleInputChange("valorHoraTrabalhada", value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="pisoSalarial">Piso Salarial (referência)</Label>
                        <MoneyInput
                          value={formData.pisoSalarial}
                          onChange={(value) => handleInputChange("pisoSalarial", value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="mediaSalarial">Média Salarial (referência)</Label>
                        <MoneyInput
                          value={formData.mediaSalarial}
                          onChange={(value) => handleInputChange("mediaSalarial", value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="datas">
                  <AccordionTrigger>Datas e Tempo de Serviço</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                        <Input
                          id="dataAdmissao"
                          type="date"
                          value={formData.dataAdmissao}
                          onChange={(e) => handleInputChange("dataAdmissao", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="tempoCase">Tempo de Casa (calculado)</Label>
                        <Input
                          id="tempoCase"
                          value={formData.tempoCase}
                          disabled
                          placeholder="Será calculado automaticamente"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ultimaPromocao">Última Promoção</Label>
                        <Input
                          id="ultimaPromocao"
                          type="date"
                          value={formData.ultimaPromocao}
                          onChange={(e) => handleInputChange("ultimaPromocao", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="previsaoFerias">Previsão de Férias</Label>
                        <Input
                          id="previsaoFerias"
                          type="date"
                          value={formData.previsaoFerias}
                          onChange={(e) => handleInputChange("previsaoFerias", e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bancarios">
                  <AccordionTrigger>Dados Bancários</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="banco">Banco</Label>
                        <Input
                          id="banco"
                          value={formData.banco}
                          onChange={(e) => handleInputChange("banco", e.target.value)}
                          placeholder="Ex: Banco do Brasil, Itaú"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tipoConta">Tipo de Conta</Label>
                        <Input
                          id="tipoConta"
                          value={formData.tipoConta}
                          onChange={(e) => handleInputChange("tipoConta", e.target.value)}
                          placeholder="Ex: Corrente, Poupança"
                        />
                      </div>

                      <div>
                        <Label htmlFor="agencia">Agência</Label>
                        <Input
                          id="agencia"
                          value={formData.agencia}
                          onChange={(e) => handleInputChange("agencia", e.target.value)}
                          placeholder="Ex: 1234-5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="conta">Conta</Label>
                        <Input
                          id="conta"
                          value={formData.conta}
                          onChange={(e) => handleInputChange("conta", e.target.value)}
                          placeholder="Ex: 123456-7"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="outros">
                  <AccordionTrigger>Outros Dados</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pis">PIS</Label>
                        <Input
                          id="pis"
                          value={formData.pis}
                          onChange={(e) => handleInputChange("pis", e.target.value)}
                          placeholder="000.00000.00-0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cid">CID</Label>
                        <Input
                          id="cid"
                          value={formData.cid}
                          onChange={(e) => handleInputChange("cid", e.target.value)}
                          placeholder="Código Internacional de Doenças"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dependentesIR">Dependentes IR</Label>
                        <Input
                          id="dependentesIR"
                          type="number"
                          value={formData.dependentesIR}
                          onChange={(e) => handleInputChange("dependentesIR", e.target.value)}
                          placeholder="Número de dependentes"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tipoPlano">Tipo de Plano</Label>
                        <Input
                          id="tipoPlano"
                          value={formData.tipoPlano}
                          onChange={(e) => handleInputChange("tipoPlano", e.target.value)}
                          placeholder="Ex: Plano de Saúde"
                        />
                      </div>

                      <div>
                        <Label htmlFor="quantidadeDependentesPlano">Dependentes no Plano</Label>
                        <Input
                          id="quantidadeDependentesPlano"
                          type="number"
                          value={formData.quantidadeDependentesPlano}
                          onChange={(e) => handleInputChange("quantidadeDependentesPlano", e.target.value)}
                          placeholder="Número de dependentes no plano"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="departamento" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeDepartamento">Nome *</Label>
                  <Input
                    id="nomeDepartamento"
                    value={departmentData.nome}
                    onChange={(e) => handleDepartmentChange("nome", e.target.value)}
                    placeholder="Ex: Comercial"
                  />
                </div>

                <div>
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input
                    id="responsavel"
                    value={departmentData.responsavel}
                    onChange={(e) => handleDepartmentChange("responsavel", e.target.value)}
                    placeholder="Ex: Maria Santos"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="descricaoDepartamento">Descrição</Label>
                  <Textarea
                    id="descricaoDepartamento"
                    value={departmentData.descricao}
                    onChange={(e) => handleDepartmentChange("descricao", e.target.value)}
                    placeholder="Descreva as responsabilidades do departamento"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="ativoDepartamento">Ativo</Label>
                  <Select value={departmentData.ativo} onValueChange={(value) => handleDepartmentChange("ativo", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controle" className="space-y-6">
              <Accordion type="multiple" defaultValue={["sistema", "acessos"]} className="w-full">
                <AccordionItem value="sistema">
                  <AccordionTrigger>Configurações do Sistema</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="nivelAcesso">Nível de Acesso</Label>
                        <Select value={formData.nivelAcesso} onValueChange={(value) => handleInputChange("nivelAcesso", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrador">Administrador</SelectItem>
                            <SelectItem value="gerente">Gerente</SelectItem>
                            <SelectItem value="vendedor">Vendedor</SelectItem>
                            <SelectItem value="operador">Operador</SelectItem>
                            <SelectItem value="visualizador">Visualizador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="alertas">Alertas</Label>
                        <Select value={formData.alertas} onValueChange={(value) => handleInputChange("alertas", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ativo">Ativo</SelectItem>
                            <SelectItem value="inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ativo">Ativo</SelectItem>
                            <SelectItem value="inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="perfis">
                  <AccordionTrigger>Perfis de Acesso</AccordionTrigger>
                  <AccordionContent>
                    <AccessProfileSelector onProfileSelect={setModuleAccess} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="acessos">
                  <AccordionTrigger>Controle de Acessos aos Módulos</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <ModuleAccessTree 
                          modules={moduleAccess}
                          onModuleChange={setModuleAccess}
                        />
                      </div>
                      <div>
                        <AccessSummary modules={moduleAccess} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
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

export default UserModal;
