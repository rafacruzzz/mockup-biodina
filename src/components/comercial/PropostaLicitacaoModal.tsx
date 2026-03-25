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
import { Plus, Trash2, Building2, User, FileText, Banknote, Gavel } from 'lucide-react';
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

const PropostaLicitacaoModal = ({ open, onClose, onSave }: PropostaLicitacaoModalProps) => {
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
