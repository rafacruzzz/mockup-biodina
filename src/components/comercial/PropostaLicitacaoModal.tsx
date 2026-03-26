import { useState } from 'react';
import { useEmpresa } from '@/contexts/EmpresaContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Building2, User, FileText, Banknote, Gavel, Package } from 'lucide-react';
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

interface PropostaLicitacaoItem {
  id: string;
  descricao: string;
  referencia: string;
  unidade: string;
  marca: string;
  quantidade: number;
  valorUnitSemIcms: number;
  valorUnitComIcms: number;
  valorMensal: number;
  valorAnual: number;
}

export interface PropostaLicitacao {
  id: string;
  numeroProposta: string;
  cliente: string;
  data: string;
  valorTotal: number;
  status: string;
}

interface PropostaLicitacaoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (proposta: PropostaLicitacao) => void;
}


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

const PropostaLicitacaoModal = ({ open, onClose, onSave }: PropostaLicitacaoModalProps) => {
  const { empresaAtual, filialAtual } = useEmpresa();
  const entidadeAtual = filialAtual || empresaAtual;
  
  const dadosEmpresa = {
    razaoSocial: entidadeAtual?.razaoSocial || '',
    endereco: entidadeAtual?.endereco ? `${entidadeAtual.endereco.logradouro}, ${entidadeAtual.endereco.numero}${entidadeAtual.endereco.complemento ? ', ' + entidadeAtual.endereco.complemento : ''}, ${entidadeAtual.endereco.bairro}, ${entidadeAtual.endereco.cidade} - ${entidadeAtual.endereco.uf}, CEP ${entidadeAtual.endereco.cep}` : '',
    cnpj: entidadeAtual?.cnpj || '',
    inscricaoEstadual: entidadeAtual?.inscricaoEstadual || '',
    inscricaoMunicipal: entidadeAtual?.inscricaoMunicipal || '',
    telefone: entidadeAtual?.telefone || '',
    email: entidadeAtual?.email || '',
  };

  // Dados do Cliente
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [cliente, setCliente] = useState('');
  const [enderecoCliente, setEnderecoCliente] = useState('');
  const [cnpjCliente, setCnpjCliente] = useState('');
  const [uasg, setUasg] = useState('');
  const [editalPregao, setEditalPregao] = useState('');
  const [pregaoNum, setPregaoNum] = useState('');
  const [processoNum, setProcessoNum] = useState('');
  const [ieCliente, setIeCliente] = useState('');
  const [imCliente, setImCliente] = useState('');
  const [abertura, setAbertura] = useState('');
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
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
  const [itens, setItens] = useState<PropostaLicitacaoItem[]>([
    { id: '1', descricao: '', referencia: '', unidade: '', marca: '', quantidade: 1, valorUnitSemIcms: 0, valorUnitComIcms: 0, valorMensal: 0, valorAnual: 0 }
  ]);

  // Desconto
  const [mostrarDesconto, setMostrarDesconto] = useState(false);
  const [desconto, setDesconto] = useState(0);

  // OBS
  const [obsTabela, setObsTabela] = useState('');

  // Composição de Exames
  interface ExameRow {
    id: string;
    tipo: 'exame' | 'parametro';
    catser: string;
    item: string;
    descricao: string;
    valorUnitario: number;
  }
  const [examesRows, setExamesRows] = useState<ExameRow[]>([]);

  const addExame = () => {
    setExamesRows([...examesRows, { id: Date.now().toString(), tipo: 'exame', catser: '', item: '', descricao: '', valorUnitario: 0 }]);
  };

  const addParametro = () => {
    setExamesRows([...examesRows, { id: (Date.now() + 1).toString(), tipo: 'parametro', catser: '', item: '', descricao: '', valorUnitario: 0 }]);
  };

  const removeExameRow = (id: string) => {
    setExamesRows(examesRows.filter(r => r.id !== id));
  };

  const updateExameRow = (id: string, field: keyof ExameRow, value: string | number) => {
    setExamesRows(examesRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const somatoriaExames = examesRows.reduce((sum, r) => sum + r.valorUnitario, 0);
  const qtdExames = examesRows.filter(r => r.tipo === 'exame').length;

  // Especificação do Produto
  const [apresentacao, setApresentacao] = useState('');
  const [modelo, setModelo] = useState('');
  const [marcaFabricante, setMarcaFabricante] = useState('');
  const [registroAnvisa, setRegistroAnvisa] = useState('');
  const [procedencia, setProcedencia] = useState('');

  // Quantidade de Produtos
  const [unidadesHospitalares, setUnidadesHospitalares] = useState([{ id: '1', unidade: '', quantidade: 0 }]);

  const addUnidadeHospitalar = () => {
    setUnidadesHospitalares([...unidadesHospitalares, { id: Date.now().toString(), unidade: '', quantidade: 0 }]);
  };

  const removeUnidadeHospitalar = (id: string) => {
    if (unidadesHospitalares.length > 1) setUnidadesHospitalares(unidadesHospitalares.filter(u => u.id !== id));
  };

  const updateUnidadeHospitalar = (id: string, field: string, value: string | number) => {
    setUnidadesHospitalares(unidadesHospitalares.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const totalQuantidadeProdutos = unidadesHospitalares.reduce((sum, u) => sum + u.quantidade, 0);

  // Composição do Valor Ofertado
  const [composicaoValor, setComposicaoValor] = useState([
    { id: '1', descricao: 'Testes (reagente)', valorUnitario: 0, valorTotal: 0 },
    { id: '2', descricao: 'Equipamento', valorUnitario: 0, valorTotal: 0 },
    { id: '3', descricao: 'Acessórios', valorUnitario: 0, valorTotal: 0 },
    { id: '4', descricao: 'Manutenção preventiva e corretiva', valorUnitario: 0, valorTotal: 0 },
    { id: '5', descricao: 'Suporte técnico', valorUnitario: 0, valorTotal: 0 },
    { id: '6', descricao: 'Treinamento e Certificados', valorUnitario: 0, valorTotal: 0 },
  ]);

  // Declaração de Código Alfandegário
  const [modeloProdutoAlf, setModeloProdutoAlf] = useState('');
  const [marcaFabricanteAlf, setMarcaFabricanteAlf] = useState('');
  const [procedenciaAlf, setProcedenciaAlf] = useState('');
  const [registroProdutoAlf, setRegistroProdutoAlf] = useState('');
  const [codigoAlfandegario, setCodigoAlfandegario] = useState('');

  // Campos finais
  const [declaracao, setDeclaracao] = useState('');
  const [prazoValidade, setPrazoValidade] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [prazoEntrega, setPrazoEntrega] = useState('');
  const [garantia, setGarantia] = useState('');
  const [localEntrega, setLocalEntrega] = useState('');
  const [freteImpostos, setFreteImpostos] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [localAssinatura, setLocalAssinatura] = useState('');
  const [dataAssinatura, setDataAssinatura] = useState('');

  const updateComposicaoValor = (id: string, field: string, value: number) => {
    setComposicaoValor(composicaoValor.map(c => c.id === id ? { ...c, [field]: value } : c));
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
      descricao: '', referencia: '', unidade: '', marca: '', quantidade: 1,
      valorUnitSemIcms: 0, valorUnitComIcms: 0, valorMensal: 0, valorAnual: 0
    }]);
  };

  const removeItem = (id: string) => {
    if (itens.length > 1) setItens(itens.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof PropostaLicitacaoItem, value: string | number) => {
    setItens(itens.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const valorTotalSemIcms = itens.reduce((sum, i) => sum + (i.quantidade * i.valorUnitSemIcms), 0);
  const valorTotalComIcms = itens.reduce((sum, i) => sum + (i.quantidade * i.valorUnitComIcms), 0);
  const valorFinal = valorTotalComIcms - desconto;

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
      data: dia || new Date().toLocaleDateString('pt-BR'),
      valorTotal: valorFinal,
      status: 'Em análise',
    });
    toast.success('Proposta Licitação criada com sucesso!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            Nova Proposta Licitação
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Cliente</Label>
                  <Select value={clienteSelecionado} onValueChange={handleClienteChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente do cadastro" />
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
                <div className="md:col-span-2">
                  <Label>Endereço</Label>
                  <Input value={enderecoCliente} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>CNPJ</Label>
                  <Input value={cnpjCliente} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>UASG</Label>
                  <Input value={uasg} onChange={e => setUasg(e.target.value)} placeholder="Código UASG" />
                </div>
                <div>
                  <Label>Edital de Pregão Eletrônico Nº</Label>
                  <Input value={editalPregao} onChange={e => setEditalPregao(e.target.value)} />
                </div>
                <div>
                  <Label>Pregão Eletrônico Nº</Label>
                  <Input value={pregaoNum} onChange={e => setPregaoNum(e.target.value)} />
                </div>
                <div>
                  <Label>Processo Nº</Label>
                  <Input value={processoNum} onChange={e => setProcessoNum(e.target.value)} />
                </div>
                <div>
                  <Label>Inscrição Estadual</Label>
                  <Input value={ieCliente} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Inscrição Municipal</Label>
                  <Input value={imCliente} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Abertura</Label>
                  <Input value={abertura} onChange={e => setAbertura(e.target.value)} placeholder="Informações de abertura" />
                </div>
                <div>
                  <Label>Dia</Label>
                  <Input type="date" value={dia} onChange={e => setDia(e.target.value)} />
                </div>
                <div>
                  <Label>Horário (Horário de Brasília)</Label>
                  <Input type="time" value={horario} onChange={e => setHorario(e.target.value)} />
                </div>
                <div>
                  <Label>Proposta Nº</Label>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Razão Social</Label>
                  <Input value={dadosEmpresa.razaoSocial} readOnly className="bg-muted" />
                </div>
                <div className="md:col-span-2">
                  <Label>Endereço Completo</Label>
                  <Input value={dadosEmpresa.endereco} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>CNPJ</Label>
                  <Input value={dadosEmpresa.cnpj} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Inscrição Estadual</Label>
                  <Input value={dadosEmpresa.inscricaoEstadual} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Inscrição Municipal</Label>
                  <Input value={dadosEmpresa.inscricaoMunicipal} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={dadosEmpresa.telefone} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input value={dadosEmpresa.email} readOnly className="bg-muted" />
                </div>
              </div>

              {/* Banco */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Dados Bancários
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>Nome do Banco</Label>
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
                  <div>
                    <Label>Código do Banco</Label>
                    <Input value={codigoBanco} readOnly className="bg-muted" />
                  </div>
                  <div>
                    <Label>Agência</Label>
                    <Input value={agencia} readOnly className="bg-muted" />
                  </div>
                  <div>
                    <Label>Conta Corrente</Label>
                    <Input value={conta} readOnly className="bg-muted" />
                  </div>
                  <div>
                    <Label>Código de Operação</Label>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Representante Legal</Label>
                  <Input value={repNome} onChange={e => setRepNome(e.target.value)} />
                </div>
                <div>
                  <Label>RG</Label>
                  <Input value={repRg} onChange={e => setRepRg(e.target.value)} />
                </div>
                <div>
                  <Label>CPF</Label>
                  <Input value={repCpf} onChange={e => setRepCpf(e.target.value)} />
                </div>
                <div>
                  <Label>Naturalidade</Label>
                  <Input value={repNaturalidade} onChange={e => setRepNaturalidade(e.target.value)} />
                </div>
                <div>
                  <Label>Nacionalidade</Label>
                  <Input value={repNacionalidade} onChange={e => setRepNacionalidade(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label>Endereço Completo</Label>
                  <Input value={repEndereco} onChange={e => setRepEndereco(e.target.value)} />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input value={repEmail} onChange={e => setRepEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Cargo/Função</Label>
                  <Input value={repCargo} onChange={e => setRepCargo(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OBJETO DA PROPOSTA */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Objeto da Proposta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={objetoProposta}
                onChange={e => setObjetoProposta(e.target.value)}
                placeholder="Descreva o objeto da proposta..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* PROPOSTA COMERCIAL */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="h-4 w-4" />
                Proposta Comercial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Item</TableHead>
                      <TableHead>Especificação/Descrição</TableHead>
                      <TableHead>Ref./Código</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Marca/Fabricante</TableHead>
                      <TableHead className="w-16">Qtd</TableHead>
                      <TableHead>Vlr Unit. s/ ICMS</TableHead>
                      <TableHead>Vlr Unit. c/ ICMS</TableHead>
                      <TableHead>Vlr Total s/ ICMS</TableHead>
                      <TableHead>Vlr Total c/ ICMS</TableHead>
                      <TableHead>Vlr Mensal</TableHead>
                      <TableHead>Vlr Anual</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item, idx) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{idx + 1}</TableCell>
                        <TableCell>
                          <Input className="min-w-[150px]" value={item.descricao} onChange={e => updateItem(item.id, 'descricao', e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input className="min-w-[100px]" value={item.referencia} onChange={e => updateItem(item.id, 'referencia', e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input className="min-w-[80px]" value={item.unidade} onChange={e => updateItem(item.id, 'unidade', e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input className="min-w-[120px]" value={item.marca} onChange={e => updateItem(item.id, 'marca', e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" className="w-16" value={item.quantidade} onChange={e => updateItem(item.id, 'quantidade', Number(e.target.value))} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" className="min-w-[100px]" value={item.valorUnitSemIcms || ''} onChange={e => updateItem(item.id, 'valorUnitSemIcms', Number(e.target.value))} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" className="min-w-[100px]" value={item.valorUnitComIcms || ''} onChange={e => updateItem(item.id, 'valorUnitComIcms', Number(e.target.value))} />
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(item.quantidade * item.valorUnitSemIcms)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(item.quantidade * item.valorUnitComIcms)}</TableCell>
                        <TableCell>
                          <Input type="number" className="min-w-[100px]" value={item.valorMensal || ''} onChange={e => updateItem(item.id, 'valorMensal', Number(e.target.value))} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" className="min-w-[100px]" value={item.valorAnual || ''} onChange={e => updateItem(item.id, 'valorAnual', Number(e.target.value))} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={itens.length === 1}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Valor Total */}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={8} className="text-right">VALOR TOTAL:</TableCell>
                      <TableCell>{formatCurrency(valorTotalSemIcms)}</TableCell>
                      <TableCell>{formatCurrency(valorTotalComIcms)}</TableCell>
                      <TableCell colSpan={3}></TableCell>
                    </TableRow>
                    {/* Desconto */}
                    {mostrarDesconto && (
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={8} className="text-right font-medium">DESCONTO:</TableCell>
                        <TableCell colSpan={2}>
                          <Input type="number" value={desconto || ''} onChange={e => setDesconto(Number(e.target.value))} placeholder="R$ 0,00" />
                        </TableCell>
                        <TableCell colSpan={3}></TableCell>
                      </TableRow>
                    )}
                    {mostrarDesconto && (
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell colSpan={8} className="text-right">VALOR FINAL:</TableCell>
                        <TableCell colSpan={2}>{formatCurrency(valorFinal)}</TableCell>
                        <TableCell colSpan={3}></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar Item
                </Button>
                <div className="flex items-center gap-2">
                  <Switch checked={mostrarDesconto} onCheckedChange={setMostrarDesconto} />
                  <Label className="text-sm">Aplicar desconto</Label>
                </div>
              </div>

              <div>
                <Label>OBS:</Label>
                <Textarea value={obsTabela} onChange={e => setObsTabela(e.target.value)} placeholder="Observações da proposta comercial..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Composição de Exames */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações Adicionais: Tabela 1 - Composição de Exames
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Catser</TableHead>
                      <TableHead className="w-[120px]">Item</TableHead>
                      <TableHead className="w-[300px]">Descrição e composição do exame</TableHead>
                      <TableHead className="w-[150px]">Valor unit.</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examesRows.map((row, idx) => (
                      <TableRow key={row.id} className={row.tipo === 'exame' ? 'bg-muted/60 font-bold' : ''}>
                        <TableCell>
                          <Input value={row.catser} onChange={e => updateExameRow(row.id, 'catser', e.target.value)} placeholder={row.tipo === 'exame' ? 'CATSER' : ''} />
                        </TableCell>
                        <TableCell>
                          <Input value={row.item} onChange={e => updateExameRow(row.id, 'item', e.target.value)} placeholder={row.tipo === 'exame' ? 'Exame' : String(idx + 1)} />
                        </TableCell>
                        <TableCell>
                          <Input value={row.descricao} onChange={e => updateExameRow(row.id, 'descricao', e.target.value)} placeholder={row.tipo === 'exame' ? 'Nome do Exame' : 'Parâmetro / Descrição'} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={row.valorUnitario || ''} onChange={e => updateExameRow(row.id, 'valorUnitario', Number(e.target.value))} placeholder="R$ 0,00" />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeExameRow(row.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Linha A */}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={3} className="text-right">A - Somatória dos valores unitários dos exames:</TableCell>
                      <TableCell>{formatCurrency(somatoriaExames)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {/* Linha B */}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={3} className="text-right">B - Quantidade de exames:</TableCell>
                      <TableCell>{qtdExames}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={addExame}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar Exame
                </Button>
                <Button variant="outline" size="sm" onClick={addParametro}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar Parâmetro
                </Button>
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

          {/* Declaração de Código Alfandegário */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Declaração de Código Alfandegário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Modelo do produto</Label>
                  <Input value={modeloProdutoAlf} onChange={e => setModeloProdutoAlf(e.target.value)} placeholder="Modelo do produto" />
                </div>
                <div>
                  <Label>Marca/Fabricante</Label>
                  <Input value={marcaFabricanteAlf} onChange={e => setMarcaFabricanteAlf(e.target.value)} placeholder="Marca/Fabricante" />
                </div>
                <div>
                  <Label>Procedência</Label>
                  <Input value={procedenciaAlf} onChange={e => setProcedenciaAlf(e.target.value)} placeholder="Procedência" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Registro do produto</Label>
                  <Input value={registroProdutoAlf} onChange={e => setRegistroProdutoAlf(e.target.value)} placeholder="Registro do produto" />
                </div>
                <div>
                  <Label>Código Alfandegário</Label>
                  <Input value={codigoAlfandegario} onChange={e => setCodigoAlfandegario(e.target.value)} placeholder="Código Alfandegário" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Declaração */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Declaração</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>A empresa {dadosEmpresa.razaoSocial} declara que:</Label>
              <Textarea value={declaracao} onChange={e => setDeclaracao(e.target.value)} placeholder="Digite a declaração..." className="mt-2" rows={4} />
            </CardContent>
          </Card>

          {/* Condições Comerciais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Condições Comerciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Prazo de validade da proposta</Label>
                <Input value={prazoValidade} onChange={e => setPrazoValidade(e.target.value)} placeholder="Ex: 60 dias" />
              </div>
              <div>
                <Label>Pagamento</Label>
                <Textarea value={pagamento} onChange={e => setPagamento(e.target.value)} placeholder="Condições de pagamento..." rows={3} />
              </div>
              <div>
                <Label>Prazo de entrega e/ou instalação</Label>
                <Input value={prazoEntrega} onChange={e => setPrazoEntrega(e.target.value)} placeholder="Ex: 30 dias úteis" />
              </div>
              <div>
                <Label>Garantia</Label>
                <Textarea value={garantia} onChange={e => setGarantia(e.target.value)} placeholder="Condições de garantia..." rows={3} />
              </div>
              <div>
                <Label>Local de entrega</Label>
                <Input value={localEntrega} onChange={e => setLocalEntrega(e.target.value)} placeholder="Local de entrega" />
              </div>
              <div>
                <Label>Frete e Impostos</Label>
                <Textarea value={freteImpostos} onChange={e => setFreteImpostos(e.target.value)} placeholder="Informações sobre frete e impostos..." rows={3} />
              </div>
              <div>
                <Label>Observações</Label>
                <Textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Observações gerais..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Local, Data e Assinatura */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Local, Data e Assinatura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Local</Label>
                  <Input value={localAssinatura} onChange={e => setLocalAssinatura(e.target.value)} placeholder="Cidade - UF" />
                </div>
                <div>
                  <Label>Data</Label>
                  <Input type="date" value={dataAssinatura} onChange={e => setDataAssinatura(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar Proposta</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropostaLicitacaoModal;
