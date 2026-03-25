import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Building2, User, FileText, Banknote, Package } from 'lucide-react';
import { bancosCadastrados } from '@/data/bancosCadastrados';
import { toast } from 'sonner';

const clientesCadastrados = [
  { id: 'cli-001', cpfCnpj: '12.345.678/0001-90', nomeFantasia: 'Hospital São Lucas', razaoSocial: 'Hospital São Lucas S/A', endereco: 'Rua das Flores, 100, Centro, São Paulo - SP', uf: 'SP', email: 'contato@saolucas.com.br', telefone: '(11) 2222-3333', segmento: 'PRIVADO - HOSPITAL', inscricaoEstadual: '110.042.490.114', inscricaoMunicipal: '12345678' },
  { id: 'cli-002', cpfCnpj: '98.765.432/0001-10', nomeFantasia: 'Clínica Vida Nova', razaoSocial: 'Clínica Vida Nova Ltda', endereco: 'Av. Brasil, 500, Jardim América, Campinas - SP', uf: 'SP', email: 'adm@vidanova.com.br', telefone: '(19) 3333-4444', segmento: 'PRIVADO - CLÍNICA', inscricaoEstadual: '210.042.490.115', inscricaoMunicipal: '87654321' },
  { id: 'cli-003', cpfCnpj: '11.222.333/0001-44', nomeFantasia: 'UPA Municipal Goiânia', razaoSocial: 'Secretaria Municipal de Saúde de Goiânia', endereco: 'Av. Goiás, 1500, Setor Central, Goiânia - GO', uf: 'GO', email: 'upa@goiania.go.gov.br', telefone: '(62) 3333-5555', segmento: 'PÚBLICO - UPA - MUNICIPAL', inscricaoEstadual: 'ISENTO', inscricaoMunicipal: '33445566' },
  { id: 'cli-004', cpfCnpj: '44.555.666/0001-77', nomeFantasia: 'Hospital Regional de Brasília', razaoSocial: 'Secretaria de Saúde do DF', endereco: 'SMHS Quadra 101, Brasília - DF', uf: 'DF', email: 'compras@saude.df.gov.br', telefone: '(61) 3333-6666', segmento: 'PÚBLICO - HOSPITAL - ESTADUAL', inscricaoEstadual: 'ISENTO', inscricaoMunicipal: '55667788' },
  { id: 'cli-005', cpfCnpj: '77.888.999/0001-11', nomeFantasia: 'Laboratório Exame', razaoSocial: 'Laboratório Exame Análises Clínicas Ltda', endereco: 'Rua Augusta, 200, Consolação, São Paulo - SP', uf: 'SP', email: 'lab@exame.com.br', telefone: '(11) 4444-5555', segmento: 'PRIVADO - LABORATÓRIO', inscricaoEstadual: '310.042.490.116', inscricaoMunicipal: '99887766' },
  { id: 'cli-006', cpfCnpj: '99.888.777/0001-55', nomeFantasia: 'Hospital Municipal São José', razaoSocial: 'Prefeitura Municipal - Hospital São José', endereco: 'Av. Central, 500, Centro, Anápolis - GO', uf: 'GO', email: 'hospital@saojose.gov.br', telefone: '(62) 3333-4444', segmento: 'PÚBLICO - HOSPITAL - MUNICIPAL', inscricaoEstadual: 'ISENTO', inscricaoMunicipal: '11223344' },
];

interface PropostaContratacaoItem {
  id: string;
  descricao: string;
  referencia: string;
  unidade: string;
  marca: string;
  quantidade: number;
  valorUnitario: number;
  valorMensal: number;
  valorAnual: number;
}

export interface PropostaContratacao {
  id: string;
  numeroProposta: string;
  cliente: string;
  data: string;
  valorTotal: number;
  status: string;
}

interface PropostaContratacaoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (proposta: PropostaContratacao) => void;
}

const dadosEmpresa = {
  razaoSocial: 'BIODINA EQUIPAMENTOS MÉDICOS LTDA',
  endereco: 'RUA EXEMPLO, 123, CENTRO, SÃO PAULO - SP, CEP 01001-000',
  cnpj: '12.345.678/0001-90',
  inscricaoEstadual: '123.456.789.000',
  inscricaoMunicipal: '987654',
  telefone: '(11) 3333-4444',
  email: 'contato@biodina.com.br',
};

const dadosRepresentante = {
  nome: 'JOÃO DA SILVA',
  rg: '12.345.678-9',
  cpf: '123.456.789-00',
  naturalidade: 'SÃO PAULO - SP',
  nacionalidade: 'BRASILEIRO',
  endereco: 'RUA EXEMPLO, 456, JARDIM PAULISTA, SÃO PAULO - SP',
  email: 'joao.silva@biodina.com.br',
  cargo: 'DIRETOR COMERCIAL',
};

const PropostaContratacaoModal = ({ open, onClose, onSave }: PropostaContratacaoModalProps) => {
  // Dados do Cliente
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [cliente, setCliente] = useState('');
  const [enderecoCliente, setEnderecoCliente] = useState('');
  const [cnpjCliente, setCnpjCliente] = useState('');
  const [ieCliente, setIeCliente] = useState('');
  const [imCliente, setImCliente] = useState('');
  const [acCliente, setAcCliente] = useState('');
  const [cotacaoNum, setCotacaoNum] = useState('');
  const [propostaNum, setPropostaNum] = useState('');

  const handleClienteChange = (clienteId: string) => {
    const cli = clientesCadastrados.find(c => c.id === clienteId);
    if (cli) {
      setClienteSelecionado(clienteId);
      setCliente(cli.nomeFantasia);
      setEnderecoCliente(cli.endereco);
      setCnpjCliente(cli.cpfCnpj);
      setIeCliente(cli.inscricaoEstadual);
      setImCliente(cli.inscricaoMunicipal);
    }
  };

  // Banco
  const [bancoSelecionado, setBancoSelecionado] = useState('');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [codigoBanco, setCodigoBanco] = useState('');
  const [codigoOperacao, setCodigoOperacao] = useState('');

  // Representante Legal
  const [repNome, setRepNome] = useState(dadosRepresentante.nome);
  const [repRg, setRepRg] = useState(dadosRepresentante.rg);
  const [repCpf, setRepCpf] = useState(dadosRepresentante.cpf);
  const [repNaturalidade, setRepNaturalidade] = useState(dadosRepresentante.naturalidade);
  const [repNacionalidade, setRepNacionalidade] = useState(dadosRepresentante.nacionalidade);
  const [repEndereco, setRepEndereco] = useState(dadosRepresentante.endereco);
  const [repEmail, setRepEmail] = useState(dadosRepresentante.email);
  const [repCargo, setRepCargo] = useState(dadosRepresentante.cargo);

  // Objeto da proposta
  const [objetoProposta, setObjetoProposta] = useState('');

  // Itens da proposta
  const [itens, setItens] = useState<PropostaContratacaoItem[]>([
    { id: '1', descricao: '', referencia: '', unidade: '', marca: '', quantidade: 1, valorUnitario: 0, valorMensal: 0, valorAnual: 0 }
  ]);

  // Desconto
  const [mostrarDesconto, setMostrarDesconto] = useState(false);
  const [desconto, setDesconto] = useState(0);

  // Especificação do produto
  const [apresentacao, setApresentacao] = useState('');
  const [modelo, setModelo] = useState('');
  const [marcaFabricante, setMarcaFabricante] = useState('');
  const [registroAnvisa, setRegistroAnvisa] = useState('');
  const [procedencia, setProcedencia] = useState('');

  // Quantidade de Produtos por Unidade Hospitalar
  const [unidadesHospitalares, setUnidadesHospitalares] = useState<Array<{ id: string; unidade: string; quantidade: number }>>([
    { id: '1', unidade: '', quantidade: 0 }
  ]);

  const addUnidadeHospitalar = () => {
    setUnidadesHospitalares(prev => [...prev, { id: Date.now().toString(), unidade: '', quantidade: 0 }]);
  };

  const removeUnidadeHospitalar = (id: string) => {
    if (unidadesHospitalares.length > 1) {
      setUnidadesHospitalares(prev => prev.filter(u => u.id !== id));
    }
  };

  const updateUnidadeHospitalar = (id: string, field: 'unidade' | 'quantidade', value: string | number) => {
    setUnidadesHospitalares(prev => prev.map(u => u.id === id ? { ...u, [field]: value } : u));
  };


  // Composição do Valor Ofertado
  const [composicaoValor, setComposicaoValor] = useState([
    { id: '1', descricao: 'Testes (reagente)', valorUnitario: 0, valorTotal: 0 },
    { id: '2', descricao: 'Equipamento', valorUnitario: 0, valorTotal: 0 },
    { id: '3', descricao: 'Acessórios', valorUnitario: 0, valorTotal: 0 },
    { id: '4', descricao: 'Manutenção preventiva e corretiva', valorUnitario: 0, valorTotal: 0 },
    { id: '5', descricao: 'Suporte técnico', valorUnitario: 0, valorTotal: 0 },
    { id: '6', descricao: 'Treinamento e Certificados', valorUnitario: 0, valorTotal: 0 },
  ]);

  const updateComposicaoValor = (id: string, field: 'valorUnitario' | 'valorTotal', value: number) => {
    setComposicaoValor(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleBancoChange = (bancoNome: string) => {
    const banco = bancosCadastrados.find(b => `${b.codigo} - ${b.nome}` === bancoNome);
    if (banco) {
      setBancoSelecionado(bancoNome);
      setCodigoBanco(banco.codigo);
      setAgencia(banco.agencia);
      setConta(banco.conta);
    }
  };

  const addItem = () => {
    setItens([...itens, {
      id: Date.now().toString(),
      descricao: '', referencia: '', unidade: '', marca: '', quantidade: 1, valorUnitario: 0, valorMensal: 0, valorAnual: 0
    }]);
  };

  const removeItem = (id: string) => {
    if (itens.length > 1) setItens(itens.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof PropostaContratacaoItem, value: string | number) => {
    setItens(itens.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const valorTotal = itens.reduce((sum, i) => sum + (i.quantidade * i.valorUnitario), 0);
  const valorFinal = valorTotal - desconto;

  const formatCurrency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSave = () => {
    if (!cliente || !propostaNum) {
      toast.error('Preencha o cliente e número da proposta');
      return;
    }
    onSave({
      id: Date.now().toString(),
      numeroProposta: propostaNum,
      cliente,
      data: new Date().toLocaleDateString('pt-BR'),
      valorTotal: valorFinal,
      status: 'Em análise',
    });
    toast.success('Proposta Contratação criada com sucesso!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Nova Proposta Contratação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* DADOS DO CLIENTE */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Dados do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Cliente</Label>
                  <Select value={clienteSelecionado} onValueChange={handleClienteChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientesCadastrados.map(cli => (
                        <SelectItem key={cli.id} value={cli.id}>
                          {cli.nomeFantasia} - {cli.cpfCnpj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Endereço</Label>
                  <Input value={enderecoCliente} readOnly className={clienteSelecionado ? 'bg-muted' : ''} onChange={e => !clienteSelecionado && setEnderecoCliente(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">CNPJ</Label>
                  <Input value={cnpjCliente} readOnly className={clienteSelecionado ? 'bg-muted' : ''} onChange={e => !clienteSelecionado && setCnpjCliente(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Inscrição Estadual</Label>
                  <Input value={ieCliente} readOnly className={clienteSelecionado ? 'bg-muted' : ''} onChange={e => !clienteSelecionado && setIeCliente(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Inscrição Municipal</Label>
                  <Input value={imCliente} readOnly className={clienteSelecionado ? 'bg-muted' : ''} onChange={e => !clienteSelecionado && setImCliente(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">A/C</Label>
                  <Input value={acCliente} onChange={e => setAcCliente(e.target.value)} placeholder="Aos cuidados de" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Cotação Nº</Label>
                  <Input value={cotacaoNum} onChange={e => setCotacaoNum(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Proposta Nº</Label>
                  <Input value={propostaNum} onChange={e => setPropostaNum(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DADOS DA EMPRESA */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Dados da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Razão Social</Label>
                  <Input value={dadosEmpresa.razaoSocial} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Endereço Completo</Label>
                  <Input value={dadosEmpresa.endereco} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">CNPJ</Label>
                  <Input value={dadosEmpresa.cnpj} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Inscrição Estadual</Label>
                  <Input value={dadosEmpresa.inscricaoEstadual} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Inscrição Municipal</Label>
                  <Input value={dadosEmpresa.inscricaoMunicipal} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Telefone</Label>
                  <Input value={dadosEmpresa.telefone} readOnly className="bg-muted" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">E-mail</Label>
                  <Input value={dadosEmpresa.email} readOnly className="bg-muted" />
                </div>
              </div>

              {/* Dados bancários */}
              <div className="border-t pt-3 mt-3">
                <Label className="text-sm font-semibold mb-2 block">Dados Bancários</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-xs">Nome do Banco</Label>
                    <Select value={bancoSelecionado} onValueChange={handleBancoChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o banco" />
                      </SelectTrigger>
                      <SelectContent>
                        {bancosCadastrados.map(banco => (
                          <SelectItem key={banco.id} value={`${banco.codigo} - ${banco.nome}`}>
                            {banco.codigo} - {banco.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Código do Banco</Label>
                    <Input value={codigoBanco} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Agência</Label>
                    <Input value={agencia} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Conta Corrente</Label>
                    <Input value={conta} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Código de Operação</Label>
                    <Input value={codigoOperacao} onChange={e => setCodigoOperacao(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* REPRESENTANTE LEGAL */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Dados do Representante Legal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Representante Legal</Label>
                  <Input value={repNome} onChange={e => setRepNome(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">RG</Label>
                  <Input value={repRg} onChange={e => setRepRg(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">CPF</Label>
                  <Input value={repCpf} onChange={e => setRepCpf(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Naturalidade</Label>
                  <Input value={repNaturalidade} onChange={e => setRepNaturalidade(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Nacionalidade</Label>
                  <Input value={repNacionalidade} onChange={e => setRepNacionalidade(e.target.value)} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <Label className="text-xs">Endereço Completo</Label>
                  <Input value={repEndereco} onChange={e => setRepEndereco(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">E-mail</Label>
                  <Input value={repEmail} onChange={e => setRepEmail(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Cargo/Função</Label>
                  <Input value={repCargo} onChange={e => setRepCargo(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OBJETO DA PROPOSTA */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Objeto da Proposta</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={objetoProposta} onChange={e => setObjetoProposta(e.target.value)} placeholder="Descreva o objeto da proposta..." rows={3} />
            </CardContent>
          </Card>

          {/* PROPOSTA COMERCIAL - TABELA */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="h-4 w-4" />
                Proposta Comercial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Item</TableHead>
                      <TableHead className="min-w-[180px]">Especificação/Descrição</TableHead>
                      <TableHead className="min-w-[120px]">Referência/Código</TableHead>
                      <TableHead className="w-[80px]">Unidade</TableHead>
                      <TableHead className="min-w-[120px]">Marca/Fabricante</TableHead>
                      <TableHead className="w-[70px]">Qtd.</TableHead>
                      <TableHead className="w-[110px]">Valor Unitário</TableHead>
                      <TableHead className="w-[110px]">Valor Total</TableHead>
                      <TableHead className="w-[110px]">Valor Mensal</TableHead>
                      <TableHead className="w-[110px]">Valor Anual</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center font-medium text-xs">{index + 1}</TableCell>
                        <TableCell>
                          <Input value={item.descricao} onChange={e => updateItem(item.id, 'descricao', e.target.value)} placeholder="Descrição" className="h-8 text-xs" />
                        </TableCell>
                        <TableCell>
                          <Input value={item.referencia} onChange={e => updateItem(item.id, 'referencia', e.target.value)} placeholder="Ref./Código" className="h-8 text-xs" />
                        </TableCell>
                        <TableCell>
                          <Input value={item.unidade} onChange={e => updateItem(item.id, 'unidade', e.target.value)} placeholder="UN" className="h-8 text-xs" />
                        </TableCell>
                        <TableCell>
                          <Input value={item.marca} onChange={e => updateItem(item.id, 'marca', e.target.value)} placeholder="Marca" className="h-8 text-xs" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={item.quantidade} onChange={e => updateItem(item.id, 'quantidade', parseInt(e.target.value) || 0)} className="h-8 text-xs" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={item.valorUnitario} onChange={e => updateItem(item.id, 'valorUnitario', parseFloat(e.target.value) || 0)} className="h-8 text-xs" step="0.01" />
                        </TableCell>
                        <TableCell className="text-right font-medium text-xs">
                          {formatCurrency(item.quantidade * item.valorUnitario)}
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={item.valorMensal} onChange={e => updateItem(item.id, 'valorMensal', parseFloat(e.target.value) || 0)} className="h-8 text-xs" step="0.01" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={item.valorAnual} onChange={e => updateItem(item.id, 'valorAnual', parseFloat(e.target.value) || 0)} className="h-8 text-xs" step="0.01" />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-3 w-3 mr-1" /> Adicionar Item
              </Button>

              {/* Totais */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span>Valor Total:</span>
                  <span>{formatCurrency(valorTotal)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={mostrarDesconto} onCheckedChange={setMostrarDesconto} />
                  <Label className="text-xs">Aplicar desconto?</Label>
                </div>

                {mostrarDesconto && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-destructive">Desconto:</span>
                    <Input type="number" value={desconto} onChange={e => setDesconto(parseFloat(e.target.value) || 0)} className="w-40 h-8 text-xs text-right" step="0.01" />
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-bold border-t pt-2">
                  <span>Valor Final:</span>
                  <span className="text-primary">{formatCurrency(valorFinal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ESPECIFICAÇÃO / DETALHES DO PRODUTO */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Especificação / Detalhes do Produto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Apresentação</Label>
                  <Input value={apresentacao} onChange={e => setApresentacao(e.target.value)} placeholder="Apresentação do produto" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Modelo</Label>
                  <Input value={modelo} onChange={e => setModelo(e.target.value)} placeholder="Modelo" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Marca/Fabricante</Label>
                  <Input value={marcaFabricante} onChange={e => setMarcaFabricante(e.target.value)} placeholder="Marca/Fabricante" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Registro na Anvisa</Label>
                  <Input value={registroAnvisa} onChange={e => setRegistroAnvisa(e.target.value)} placeholder="Nº do registro" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Procedência</Label>
                  <Input value={procedencia} onChange={e => setProcedencia(e.target.value)} placeholder="País/Origem" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QUANTIDADE DE PRODUTOS */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Quantidade de Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unidade Hospitalar</TableHead>
                    <TableHead className="w-40">Quant. de Itens</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unidadesHospitalares.map((uh) => (
                    <TableRow key={uh.id}>
                      <TableCell>
                        <Input
                          value={uh.unidade}
                          onChange={e => updateUnidadeHospitalar(uh.id, 'unidade', e.target.value)}
                          placeholder="Nome da unidade hospitalar"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          value={uh.quantidade || ''}
                          onChange={e => updateUnidadeHospitalar(uh.id, 'quantidade', Number(e.target.value))}
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeUnidadeHospitalar(uh.id)}
                          disabled={unidadesHospitalares.length <= 1}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell className="text-right font-bold">TOTAL</TableCell>
                    <TableCell className="font-bold">{totalQuantidadeProdutos}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button variant="outline" size="sm" onClick={addUnidadeHospitalar} className="mt-2">
                <Plus className="h-3 w-3 mr-1" />
                Adicionar Unidade
              </Button>
            </CardContent>
          </Card>

          {/* COMPOSIÇÃO DO VALOR OFERTADO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="h-4 w-4" />
                Composição do Valor Ofertado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Composição do valor ofertado</TableHead>
                    <TableHead className="w-44">Valor unitário</TableHead>
                    <TableHead className="w-44">Valor total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {composicaoValor.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.descricao}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={item.valorUnitario || ''}
                          onChange={e => updateComposicaoValor(item.id, 'valorUnitario', Number(e.target.value))}
                          placeholder="0,00"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={item.valorTotal || ''}
                          onChange={e => updateComposicaoValor(item.id, 'valorTotal', Number(e.target.value))}
                          placeholder="0,00"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* BOTÕES */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar Proposta</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropostaContratacaoModal;
