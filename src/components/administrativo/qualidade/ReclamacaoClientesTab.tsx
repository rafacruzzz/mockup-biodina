import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, Trash2, User, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { modules } from '@/data/cadastroModules';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';


interface Cliente {
  id: number;
  nome: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  tipoCliente?: string;
  cinRg?: string;
  dataCadastro?: string;
  situacaoCadastral?: string;
  nomeMantenedor?: string;
  cnpjMantenedor?: string;
  cidade?: string;
  uf?: string;
  telefone1?: string;
  telefone2?: string;
  telefone3?: string;
  telefone4?: string;
  telefoneFixo1?: string;
  telefoneFixo2?: string;
  telefoneFixo3?: string;
  telefoneWhatsapp?: string;
  email1?: string;
  email2?: string;
  email3?: string;
  email4?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  xTwitter?: string;
  contatoNome?: string;
  contatoCargo?: string;
  contatoTelefone?: string;
  contatoEmail?: string;
  servicoProdutoOferecido?: string;
}

export interface ReclamacaoClienteData {
  clienteId: number;
  nomeCliente: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpjCpf: string;
  tipoCliente: string;
  cinRg: string;
  dataCadastro: string;
  situacaoCadastral: string;
  nomeMantenedor: string;
  cnpjMantenedor: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
  telefone4: string;
  telefoneFixo1: string;
  telefoneFixo2: string;
  telefoneFixo3: string;
  telefoneWhatsapp: string;
  email1: string;
  email2: string;
  email3: string;
  email4: string;
  website: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  xTwitter: string;
  contatoNome: string;
  contatoCargo: string;
  contatoTelefone: string;
  contatoEmail: string;
  servicoProdutoOferecido: string;
}

interface Reclamacao extends ReclamacaoClienteData {
  id: string;
  data: string;
  descricaoProblema: string;
  solucao: string;
  geraNaoConformidade: 'sim' | 'nao' | '';
  observacoes: string;
  contatoNomeReclamacao: string;
  contatoTelefoneReclamacao: string;
  contatoEmailReclamacao: string;
  codigoProduto: string;
  nomeProduto: string;
  loteNumSerie: string;
  quantidade: string;
  notaFiscal: string;
  dataEmissaoNF: string;
}

const emptyClienteData: ReclamacaoClienteData = {
  clienteId: 0,
  nomeCliente: '',
  razaoSocial: '',
  nomeFantasia: '',
  cnpjCpf: '',
  tipoCliente: '',
  cinRg: '',
  dataCadastro: '',
  situacaoCadastral: '',
  nomeMantenedor: '',
  cnpjMantenedor: '',
  telefone1: '',
  telefone2: '',
  telefone3: '',
  telefone4: '',
  telefoneFixo1: '',
  telefoneFixo2: '',
  telefoneFixo3: '',
  telefoneWhatsapp: '',
  email1: '',
  email2: '',
  email3: '',
  email4: '',
  website: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  xTwitter: '',
  contatoNome: '',
  contatoCargo: '',
  contatoTelefone: '',
  contatoEmail: '',
  servicoProdutoOferecido: '',
};

export const ReclamacaoClientesTab = () => {
  const { toast } = useToast();
  
  const clientes: Cliente[] = useMemo(() => {
    const clientesData = modules.pessoas?.subModules?.clientes?.data || [];
    return clientesData.map((c: Record<string, unknown>) => ({
      id: c.id as number,
      nome: (c.nome as string) || '',
      cnpj: (c.cnpj as string) || '',
      razaoSocial: (c.razaoSocial as string) || (c.nome as string) || '',
      nomeFantasia: (c.nomeFantasia as string) || '',
      tipoCliente: (c.tipoCliente as string) || '',
      cinRg: (c.cinRg as string) || '',
      dataCadastro: (c.dataCadastro as string) || '',
      situacaoCadastral: (c.situacaoCadastral as string) || 'Ativo',
      nomeMantenedor: (c.nomeMantenedor as string) || '',
      cnpjMantenedor: (c.cnpjMantenedor as string) || '',
      cidade: (c.cidade as string) || '',
      uf: (c.uf as string) || '',
      telefone1: (c.telefone1 as string) || (c.telefone as string) || '',
      telefone2: (c.telefone2 as string) || '',
      telefone3: (c.telefone3 as string) || '',
      telefone4: (c.telefone4 as string) || '',
      telefoneFixo1: (c.telefoneFixo1 as string) || '',
      telefoneFixo2: (c.telefoneFixo2 as string) || '',
      telefoneFixo3: (c.telefoneFixo3 as string) || '',
      telefoneWhatsapp: (c.telefoneWhatsapp as string) || '',
      email1: (c.email1 as string) || (c.email as string) || '',
      email2: (c.email2 as string) || '',
      email3: (c.email3 as string) || '',
      email4: (c.email4 as string) || '',
      website: (c.website as string) || '',
      instagram: (c.instagram as string) || '',
      facebook: (c.facebook as string) || '',
      linkedin: (c.linkedin as string) || '',
      xTwitter: (c.xTwitter as string) || '',
      contatoNome: (c.contatoNome as string) || '',
      contatoCargo: (c.contatoCargo as string) || '',
      contatoTelefone: (c.contatoTelefone as string) || '',
      contatoEmail: (c.contatoEmail as string) || '',
      servicoProdutoOferecido: (c.servicoProdutoOferecido as string) || '',
    }));
  }, []);

  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([
    {
      id: '1',
      data: '2025-01-15',
      clienteId: 1,
      nomeCliente: 'Hospital São Lucas',
      razaoSocial: 'Hospital São Lucas S.A.',
      nomeFantasia: 'Hospital São Lucas',
      cnpjCpf: '12.345.678/0001-90',
      tipoCliente: 'Pessoa Jurídica',
      cinRg: '',
      dataCadastro: '2023-03-15',
      situacaoCadastral: 'Ativo',
      nomeMantenedor: 'Grupo Saúde Brasil',
      cnpjMantenedor: '11.222.333/0001-44',
      telefone1: '(11) 3456-7890',
      telefone2: '(11) 3456-7891',
      telefone3: '',
      telefone4: '',
      telefoneFixo1: '(11) 2222-3333',
      telefoneFixo2: '(11) 2222-3334',
      telefoneFixo3: '',
      telefoneWhatsapp: '(11) 99876-5432',
      email1: 'contato@saolucas.com.br',
      email2: 'compras@saolucas.com.br',
      email3: '',
      email4: '',
      website: 'www.saolucas.com.br',
      instagram: '@hospitalsaolucas',
      facebook: 'hospitalsaolucas',
      linkedin: 'hospital-sao-lucas',
      xTwitter: '@hsaolucas',
      contatoNome: 'Dr. Carlos Mendes',
      contatoCargo: 'Diretor de Compras',
      contatoTelefone: '(11) 99999-1234',
      contatoEmail: 'carlos.mendes@saolucas.com.br',
      servicoProdutoOferecido: 'Equipamentos médicos e insumos hospitalares',
      descricaoProblema: 'Cliente relatou que o produto do lote 12345 apresentou não conformidade na embalagem. Solicitou informações sobre procedimento de devolução.',
      solucao: 'Realizada troca do produto e enviado novo lote conforme procedimento.',
      geraNaoConformidade: 'sim',
      observacoes: 'Cliente satisfeito com a resolução.',
      contatoNomeReclamacao: 'Dr. Carlos Mendes',
      contatoTelefoneReclamacao: '(11) 99999-1234',
      contatoEmailReclamacao: 'carlos.mendes@saolucas.com.br',
      codigoProduto: 'PROD-001',
      nomeProduto: 'Reagente Hematológico X',
      loteNumSerie: 'LOTE-12345',
      quantidade: '50',
      notaFiscal: 'NF-98765',
      dataEmissaoNF: '2025-01-10',
    },
    {
      id: '2',
      data: '2025-01-18',
      clienteId: 2,
      nomeCliente: 'Clínica Vida',
      razaoSocial: 'Clínica Vida Ltda.',
      nomeFantasia: 'Clínica Vida',
      cnpjCpf: '98.765.432/0001-10',
      tipoCliente: 'Pessoa Jurídica',
      cinRg: '',
      dataCadastro: '2024-01-10',
      situacaoCadastral: 'Ativo',
      nomeMantenedor: '',
      cnpjMantenedor: '',
      telefone1: '(21) 2345-6789',
      telefone2: '',
      telefone3: '',
      telefone4: '',
      telefoneFixo1: '(21) 3333-4444',
      telefoneFixo2: '',
      telefoneFixo3: '',
      telefoneWhatsapp: '(21) 98765-4321',
      email1: 'comercial@clinicavida.com.br',
      email2: 'financeiro@clinicavida.com.br',
      email3: '',
      email4: '',
      website: 'www.clinicavida.com.br',
      instagram: '@clinicavida',
      facebook: '',
      linkedin: 'clinica-vida',
      xTwitter: '',
      contatoNome: 'Ana Paula Silva',
      contatoCargo: 'Gerente Administrativo',
      contatoTelefone: '(21) 98888-5678',
      contatoEmail: 'ana.silva@clinicavida.com.br',
      servicoProdutoOferecido: 'Materiais para diagnóstico e análises clínicas',
      descricaoProblema: 'Cliente questionou a temperatura ideal para armazenamento do produto XYZ.',
      solucao: 'Orientado conforme POP-ARM-001.',
      geraNaoConformidade: 'nao',
      observacoes: '',
      contatoNomeReclamacao: 'Ana Paula Silva',
      contatoTelefoneReclamacao: '(21) 98888-5678',
      contatoEmailReclamacao: 'ana.silva@clinicavida.com.br',
      codigoProduto: 'PROD-045',
      nomeProduto: 'Produto XYZ',
      loteNumSerie: 'LOTE-67890',
      quantidade: '10',
      notaFiscal: 'NF-54321',
      dataEmissaoNF: '2025-01-15',
    }
  ]);

  const [novaReclamacao, setNovaReclamacao] = useState<Omit<Reclamacao, 'id'>>({
    data: new Date().toISOString().split('T')[0],
    ...emptyClienteData,
    descricaoProblema: '',
    solucao: '',
    geraNaoConformidade: '',
    observacoes: '',
    contatoNomeReclamacao: '',
    contatoTelefoneReclamacao: '',
    contatoEmailReclamacao: '',
    codigoProduto: '',
    nomeProduto: '',
    loteNumSerie: '',
    quantidade: '',
    notaFiscal: '',
    dataEmissaoNF: '',
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [openClienteSearch, setOpenClienteSearch] = useState(false);

  const selecionarCliente = (cliente: Cliente) => {
    setNovaReclamacao({
      ...novaReclamacao,
      clienteId: cliente.id,
      nomeCliente: cliente.nome,
      razaoSocial: cliente.razaoSocial || cliente.nome,
      nomeFantasia: cliente.nomeFantasia || '',
      cnpjCpf: cliente.cnpj || '',
      tipoCliente: cliente.tipoCliente || '',
      cinRg: cliente.cinRg || '',
      dataCadastro: cliente.dataCadastro || '',
      situacaoCadastral: cliente.situacaoCadastral || 'Ativo',
      nomeMantenedor: cliente.nomeMantenedor || '',
      cnpjMantenedor: cliente.cnpjMantenedor || '',
      telefone1: cliente.telefone1 || '',
      telefone2: cliente.telefone2 || '',
      telefone3: cliente.telefone3 || '',
      telefone4: cliente.telefone4 || '',
      telefoneFixo1: cliente.telefoneFixo1 || '',
      telefoneFixo2: cliente.telefoneFixo2 || '',
      telefoneFixo3: cliente.telefoneFixo3 || '',
      telefoneWhatsapp: cliente.telefoneWhatsapp || '',
      email1: cliente.email1 || '',
      email2: cliente.email2 || '',
      email3: cliente.email3 || '',
      email4: cliente.email4 || '',
      website: cliente.website || '',
      instagram: cliente.instagram || '',
      facebook: cliente.facebook || '',
      linkedin: cliente.linkedin || '',
      xTwitter: cliente.xTwitter || '',
      contatoNome: cliente.contatoNome || '',
      contatoCargo: cliente.contatoCargo || '',
      contatoTelefone: cliente.contatoTelefone || '',
      contatoEmail: cliente.contatoEmail || '',
      servicoProdutoOferecido: cliente.servicoProdutoOferecido || '',
    });
    setOpenClienteSearch(false);
  };

  const limparCliente = () => {
    setNovaReclamacao({
      ...novaReclamacao,
      ...emptyClienteData,
    });
  };

  const adicionarReclamacao = () => {
    if (!novaReclamacao.clienteId || !novaReclamacao.descricaoProblema) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione um cliente e descreva o problema.",
        variant: "destructive"
      });
      return;
    }

    const reclamacao: Reclamacao = {
      ...novaReclamacao,
      id: Date.now().toString()
    };

    setReclamacoes([reclamacao, ...reclamacoes]);
    setNovaReclamacao({
      data: new Date().toISOString().split('T')[0],
      ...emptyClienteData,
      descricaoProblema: '',
      solucao: '',
      geraNaoConformidade: '',
      observacoes: '',
      contatoNomeReclamacao: '',
      contatoTelefoneReclamacao: '',
      contatoEmailReclamacao: '',
      codigoProduto: '',
      nomeProduto: '',
      loteNumSerie: '',
      quantidade: '',
      notaFiscal: '',
      dataEmissaoNF: '',
    });
    setMostrarFormulario(false);

    toast({
      title: "Reclamação registrada",
      description: "A reclamação foi registrada com sucesso."
    });
  };

  const excluirReclamacao = (id: string) => {
    setReclamacoes(reclamacoes.filter(r => r.id !== id));
    toast({
      title: "Reclamação excluída",
      description: "A reclamação foi removida com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Reclamação de Clientes</h3>
          <p className="text-sm text-muted-foreground">
            Registre reclamações de clientes
          </p>
        </div>
        <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Reclamação
        </Button>
      </div>

      {mostrarFormulario && (
        <Card className="p-6">
          <div className="space-y-6">
            {/* Seção: Identificação do Cliente */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base border-b pb-2">Identificação do Cliente</h4>
              
              <div className="space-y-2">
                <Label>Buscar Cliente</Label>
                <Popover open={openClienteSearch} onOpenChange={setOpenClienteSearch}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openClienteSearch}
                      className="w-full justify-between"
                    >
                      {novaReclamacao.nomeCliente || "Selecione um cliente..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar por nome, CNPJ..." />
                      <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup>
                          {clientes.map((cliente) => (
                            <CommandItem
                              key={cliente.id}
                              value={`${cliente.nome} ${cliente.cnpj}`}
                              onSelect={() => selecionarCliente(cliente)}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{cliente.nome}</span>
                                <span className="text-xs text-muted-foreground">{cliente.cnpj}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {novaReclamacao.clienteId > 0 && (
                  <Button variant="ghost" size="sm" onClick={limparCliente}>
                    Limpar seleção
                  </Button>
                )}
              </div>

              {novaReclamacao.clienteId > 0 && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dados do Cliente</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Tipo de Cliente</Label>
                      <p className="text-sm font-medium">{novaReclamacao.tipoCliente || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Razão Social</Label>
                      <p className="text-sm font-medium">{novaReclamacao.razaoSocial || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Nome Fantasia</Label>
                      <p className="text-sm font-medium">{novaReclamacao.nomeFantasia || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">CNPJ/CPF</Label>
                      <p className="text-sm font-medium">{novaReclamacao.cnpjCpf || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">CIN/RG</Label>
                      <p className="text-sm font-medium">{novaReclamacao.cinRg || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Nome do Mantenedor</Label>
                      <p className="text-sm font-medium">{novaReclamacao.nomeMantenedor || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">CNPJ do Mantenedor</Label>
                      <p className="text-sm font-medium">{novaReclamacao.cnpjMantenedor || '-'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Seção: Contato */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base border-b pb-2">Contato</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contatoNomeReclamacao">Nome</Label>
                  <Input
                    id="contatoNomeReclamacao"
                    placeholder="Nome do contato"
                    value={novaReclamacao.contatoNomeReclamacao}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, contatoNomeReclamacao: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contatoTelefoneReclamacao">Telefone</Label>
                  <Input
                    id="contatoTelefoneReclamacao"
                    placeholder="Telefone do contato"
                    value={novaReclamacao.contatoTelefoneReclamacao}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, contatoTelefoneReclamacao: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contatoEmailReclamacao">E-mail</Label>
                  <Input
                    id="contatoEmailReclamacao"
                    type="email"
                    placeholder="E-mail do contato"
                    value={novaReclamacao.contatoEmailReclamacao}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, contatoEmailReclamacao: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Seção: Dados do Produto */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base border-b pb-2">Dados do Produto</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoProduto">Código do Produto</Label>
                  <Input
                    id="codigoProduto"
                    placeholder="Código do produto"
                    value={novaReclamacao.codigoProduto}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, codigoProduto: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomeProduto">Nome do Produto</Label>
                  <Input
                    id="nomeProduto"
                    placeholder="Nome do produto"
                    value={novaReclamacao.nomeProduto}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, nomeProduto: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loteNumSerie">Lote/Nº de Série</Label>
                  <Input
                    id="loteNumSerie"
                    placeholder="Lote ou número de série"
                    value={novaReclamacao.loteNumSerie}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, loteNumSerie: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    placeholder="Quantidade"
                    value={novaReclamacao.quantidade}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, quantidade: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notaFiscal">Nota Fiscal</Label>
                  <Input
                    id="notaFiscal"
                    placeholder="Número da nota fiscal"
                    value={novaReclamacao.notaFiscal}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, notaFiscal: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataEmissaoNF">Data de Emissão da NF</Label>
                  <Input
                    id="dataEmissaoNF"
                    type="date"
                    value={novaReclamacao.dataEmissaoNF}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, dataEmissaoNF: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-base border-b pb-2">Registro da Reclamação</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={novaReclamacao.data}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, data: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricaoProblema">Descrição do Problema *</Label>
                <Textarea
                  id="descricaoProblema"
                  placeholder="Descreva detalhadamente o problema relatado pelo cliente..."
                  rows={6}
                  value={novaReclamacao.descricaoProblema}
                  onChange={(e) => setNovaReclamacao({ ...novaReclamacao, descricaoProblema: e.target.value })}
                />
              </div>
            </div>

            {/* Seção: Tratamento */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base border-b pb-2">Tratamento</h4>
              
              <div className="space-y-2">
                <Label htmlFor="solucao">Solução</Label>
                <Textarea
                  id="solucao"
                  placeholder="Descreva a solução aplicada..."
                  rows={4}
                  value={novaReclamacao.solucao}
                  onChange={(e) => setNovaReclamacao({ ...novaReclamacao, solucao: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="geraNaoConformidade">Gera não conformidade?</Label>
                  <Select
                    value={novaReclamacao.geraNaoConformidade}
                    onValueChange={(value: 'sim' | 'nao') => setNovaReclamacao({ ...novaReclamacao, geraNaoConformidade: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações adicionais..."
                  rows={3}
                  value={novaReclamacao.observacoes}
                  onChange={(e) => setNovaReclamacao({ ...novaReclamacao, observacoes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarReclamacao}>
                Registrar Reclamação
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {reclamacoes.map((reclamacao) => (
          <Card key={reclamacao.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{reclamacao.nomeCliente}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reclamacao.data).toLocaleDateString('pt-BR')}
                      </span>
                      <span>{reclamacao.cnpjCpf}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {reclamacao.geraNaoConformidade === 'sim' && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Gera NC
                    </Badge>
                  )}
                  {reclamacao.geraNaoConformidade === 'nao' && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Sem NC
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => excluirReclamacao(reclamacao.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="pl-14 space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Problema</p>
                  <p className="text-sm whitespace-pre-wrap">{reclamacao.descricaoProblema}</p>
                </div>
                
                {reclamacao.solucao && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Solução</p>
                    <p className="text-sm whitespace-pre-wrap">{reclamacao.solucao}</p>
                  </div>
                )}

                {reclamacao.observacoes && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Observações</p>
                    <p className="text-sm whitespace-pre-wrap">{reclamacao.observacoes}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
