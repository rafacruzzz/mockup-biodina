import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, Trash2, User, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { modules } from '@/data/cadastroModules';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface Cliente {
  id: number;
  nome: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  situacaoCadastral?: string;
  nomeMantenedor?: string;
  cnpjMantenedor?: string;
  cidade?: string;
  uf?: string;
  telefone?: string;
  email?: string;
}

interface Reclamacao {
  id: string;
  data: string;
  clienteId: number;
  nomeCliente: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpjCpf: string;
  situacaoCadastral: string;
  nomeMantenedor: string;
  cnpjMantenedor: string;
  descricaoProblema: string;
  solucao: string;
  geraNaoConformidade: 'sim' | 'nao' | '';
  observacoes: string;
}

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
      situacaoCadastral: (c.situacaoCadastral as string) || 'Ativo',
      nomeMantenedor: (c.nomeMantenedor as string) || '',
      cnpjMantenedor: (c.cnpjMantenedor as string) || '',
      cidade: (c.cidade as string) || '',
      uf: (c.uf as string) || '',
      telefone: (c.telefone as string) || '',
      email: (c.email as string) || '',
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
      situacaoCadastral: 'Ativo',
      nomeMantenedor: 'Grupo Saúde Brasil',
      cnpjMantenedor: '11.222.333/0001-44',
      descricaoProblema: 'Cliente relatou que o produto do lote 12345 apresentou não conformidade na embalagem. Solicitou informações sobre procedimento de devolução.',
      solucao: 'Realizada troca do produto e enviado novo lote conforme procedimento.',
      geraNaoConformidade: 'sim',
      observacoes: 'Cliente satisfeito com a resolução.'
    },
    {
      id: '2',
      data: '2025-01-18',
      clienteId: 2,
      nomeCliente: 'Clínica Vida',
      razaoSocial: 'Clínica Vida Ltda.',
      nomeFantasia: 'Clínica Vida',
      cnpjCpf: '98.765.432/0001-10',
      situacaoCadastral: 'Ativo',
      nomeMantenedor: '',
      cnpjMantenedor: '',
      descricaoProblema: 'Cliente questionou a temperatura ideal para armazenamento do produto XYZ.',
      solucao: 'Orientado conforme POP-ARM-001.',
      geraNaoConformidade: 'nao',
      observacoes: ''
    }
  ]);

  const [novaReclamacao, setNovaReclamacao] = useState<Omit<Reclamacao, 'id'>>({
    data: new Date().toISOString().split('T')[0],
    clienteId: 0,
    nomeCliente: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpjCpf: '',
    situacaoCadastral: '',
    nomeMantenedor: '',
    cnpjMantenedor: '',
    descricaoProblema: '',
    solucao: '',
    geraNaoConformidade: '',
    observacoes: ''
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
      situacaoCadastral: cliente.situacaoCadastral || 'Ativo',
      nomeMantenedor: cliente.nomeMantenedor || '',
      cnpjMantenedor: cliente.cnpjMantenedor || ''
    });
    setOpenClienteSearch(false);
  };

  const limparCliente = () => {
    setNovaReclamacao({
      ...novaReclamacao,
      clienteId: 0,
      nomeCliente: '',
      razaoSocial: '',
      nomeFantasia: '',
      cnpjCpf: '',
      situacaoCadastral: '',
      nomeMantenedor: '',
      cnpjMantenedor: ''
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
      clienteId: 0,
      nomeCliente: '',
      razaoSocial: '',
      nomeFantasia: '',
      cnpjCpf: '',
      situacaoCadastral: '',
      nomeMantenedor: '',
      cnpjMantenedor: '',
      descricaoProblema: '',
      solucao: '',
      geraNaoConformidade: '',
      observacoes: ''
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
                <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Nome do Cliente</Label>
                    <p className="text-sm font-medium">{novaReclamacao.nomeCliente}</p>
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
                    <Label className="text-xs text-muted-foreground">Situação Cadastral</Label>
                    <p className="text-sm font-medium">{novaReclamacao.situacaoCadastral || '-'}</p>
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
              )}
            </div>

            {/* Seção: Registro da Reclamação */}
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
