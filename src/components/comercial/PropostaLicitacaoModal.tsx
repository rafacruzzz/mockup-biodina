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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus, Trash2, Building2, User, FileText, FileSpreadsheet, TableIcon } from 'lucide-react';
import { AssinaturaRepresentante } from './AssinaturaRepresentante';
import { toast } from 'sonner';

const clientesCadastrados = [
  { id: 'cli-001', cpfCnpj: '12.345.678/0001-90', nomeFantasia: 'Hospital São Lucas', razaoSocial: 'Hospital São Lucas S/A', endereco: 'Rua das Flores, 100, Centro, São Paulo - SP', uf: 'SP', email: 'contato@saolucas.com.br', telefone: '(11) 2222-3333', segmento: 'PRIVADO - HOSPITAL', inscricaoEstadual: '110.042.490.114', inscricaoMunicipal: '12345678' },
  { id: 'cli-002', cpfCnpj: '98.765.432/0001-10', nomeFantasia: 'Clínica Vida Nova', razaoSocial: 'Clínica Vida Nova Ltda', endereco: 'Av. Brasil, 500, Jardim América, Campinas - SP', uf: 'SP', email: 'adm@vidanova.com.br', telefone: '(19) 3333-4444', segmento: 'PRIVADO - CLÍNICA', inscricaoEstadual: '210.042.490.115', inscricaoMunicipal: '87654321' },
  { id: 'cli-003', cpfCnpj: '11.222.333/0001-44', nomeFantasia: 'UPA Municipal Goiânia', razaoSocial: 'Secretaria Municipal de Saúde de Goiânia', endereco: 'Av. Goiás, 1500, Setor Central, Goiânia - GO', uf: 'GO', email: 'upa@goiania.go.gov.br', telefone: '(62) 3333-5555', segmento: 'PÚBLICO - UPA - MUNICIPAL', inscricaoEstadual: 'ISENTO', inscricaoMunicipal: '33445566' },
  { id: 'cli-004', cpfCnpj: '44.555.666/0001-77', nomeFantasia: 'Hospital Regional de Brasília', razaoSocial: 'Secretaria de Saúde do DF', endereco: 'SMHS Quadra 101, Brasília - DF', uf: 'DF', email: 'compras@saude.df.gov.br', telefone: '(61) 3333-6666', segmento: 'PÚBLICO - HOSPITAL - ESTADUAL', inscricaoEstadual: 'ISENTO', inscricaoMunicipal: '55667788' },
  { id: 'cli-005', cpfCnpj: '77.888.999/0001-11', nomeFantasia: 'Laboratório Exame', razaoSocial: 'Laboratório Exame Análises Clínicas Ltda', endereco: 'Rua Augusta, 200, Consolação, São Paulo - SP', uf: 'SP', email: 'lab@exame.com.br', telefone: '(11) 4444-5555', segmento: 'PRIVADO - LABORATÓRIO', inscricaoEstadual: '310.042.490.116', inscricaoMunicipal: '99887766' },
  { id: 'cli-006', cpfCnpj: '99.888.777/0001-55', nomeFantasia: 'Hospital Municipal São José', razaoSocial: 'Prefeitura Municipal - Hospital São José', endereco: 'Av. Central, 500, Centro, Anápolis - GO', uf: 'GO', email: 'hospital@saojose.gov.br', telefone: '(62) 3333-4444', segmento: 'PÚBLICO - HOSPITAL - MUNICIPAL', inscricaoEstadual: 'ISENTO', inscricaoMunicipal: '11223344' },
];

interface TabelaItem {
  id: string;
  codigo: string;
  item: string;
  produto: string;
  descricao: string;
  marca: string;
  modelo: string;
  anvisa: string;
  unidade: string;
  quantidade: number;
  valorComIcms: number;
  valorSemIcms: number;
  valorTotalComIcms: number;
  valorTotalSemIcms: number;
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

  const [modalTab, setModalTab] = useState<'propostas' | 'tabela'>('propostas');

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
  const [ac, setAc] = useState('');
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

  // Representante Legal
  const [repNome, setRepNome] = useState(dadosRepresentante.nome);
  const [repRg, setRepRg] = useState(dadosRepresentante.rg);
  const [repCpf, setRepCpf] = useState(dadosRepresentante.cpf);
  const [repNaturalidade, setRepNaturalidade] = useState(dadosRepresentante.naturalidade);
  const [repNacionalidade, setRepNacionalidade] = useState(dadosRepresentante.nacionalidade);
  const [repEndereco, setRepEndereco] = useState(dadosRepresentante.endereco);
  const [repEmail, setRepEmail] = useState(dadosRepresentante.email);
  const [repCargo, setRepCargo] = useState(dadosRepresentante.cargo);

  // Seção Word (texto livre)
  const [textoWord, setTextoWord] = useState('');
  const [tabelaInserida, setTabelaInserida] = useState(false);

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
  const [assinaturaRepresentante, setAssinaturaRepresentante] = useState('');

  // Tabela de Produtos
  const [tabelaItens, setTabelaItens] = useState<TabelaItem[]>([
    { id: '1', codigo: '', item: '', produto: '', descricao: '', marca: '', modelo: '', anvisa: '', unidade: '', quantidade: 1, valorComIcms: 0, valorSemIcms: 0, valorTotalComIcms: 0, valorTotalSemIcms: 0, valorMensal: 0, valorAnual: 0 }
  ]);
  const [obsTabela, setObsTabela] = useState('');

  const addTabelaItem = () => {
    setTabelaItens([...tabelaItens, {
      id: Date.now().toString(), codigo: '', item: '', produto: '', descricao: '', marca: '', modelo: '', anvisa: '', unidade: '', quantidade: 1, valorComIcms: 0, valorSemIcms: 0, valorTotalComIcms: 0, valorTotalSemIcms: 0, valorMensal: 0, valorAnual: 0
    }]);
  };

  const removeTabelaItem = (id: string) => {
    if (tabelaItens.length > 1) setTabelaItens(tabelaItens.filter(i => i.id !== id));
  };

  const updateTabelaItem = (id: string, field: keyof TabelaItem, value: string | number) => {
    setTabelaItens(tabelaItens.map(i => {
      if (i.id !== id) return i;
      const updated = { ...i, [field]: value };
      if (field === 'quantidade' || field === 'valorComIcms' || field === 'valorSemIcms') {
        updated.valorTotalComIcms = updated.quantidade * updated.valorComIcms;
        updated.valorTotalSemIcms = updated.quantidade * updated.valorSemIcms;
      }
      return updated;
    }));
  };

  const formatCurrency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const inserirTabelaNaProposta = () => {
    setTabelaInserida(true);
    setModalTab('propostas');
    toast.success('Tabela inserida na proposta');
  };

  const handleSave = () => {
    if (!cliente || !propostaNum) {
      toast.error('Preencha o cliente e número da proposta');
      return;
    }
    const valorTotal = tabelaItens.reduce((sum, i) => sum + i.valorTotalComIcms, 0);
    onSave({
      id: Date.now().toString(),
      numeroProposta: propostaNum,
      cliente,
      data: dia || new Date().toLocaleDateString('pt-BR'),
      valorTotal,
      status: 'Em análise',
    });
    toast.success('Proposta criada com sucesso!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Nova Proposta
          </DialogTitle>
        </DialogHeader>

        <Tabs value={modalTab} onValueChange={(v) => setModalTab(v as 'propostas' | 'tabela')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="propostas">
              <FileText className="h-4 w-4 mr-2" />
              Propostas
            </TabsTrigger>
            <TabsTrigger value="tabela">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Tabela
            </TabsTrigger>
          </TabsList>

          {/* ===== ABA PROPOSTAS ===== */}
          <TabsContent value="propostas">
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
                      <Label>Nº UASG</Label>
                      <Input value={uasg} onChange={e => setUasg(e.target.value)} placeholder="Código UASG" />
                    </div>
                    <div>
                      <Label>Nº Edital de Pregão Eletrônico</Label>
                      <Input value={editalPregao} onChange={e => setEditalPregao(e.target.value)} />
                    </div>
                    <div>
                      <Label>Nº Pregão Eletrônico</Label>
                      <Input value={pregaoNum} onChange={e => setPregaoNum(e.target.value)} />
                    </div>
                    <div>
                      <Label>Nº Processo</Label>
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
                      <Label>A/C</Label>
                      <Input value={ac} onChange={e => setAc(e.target.value)} placeholder="Aos cuidados de..." />
                    </div>
                    <div>
                      <Label>Cotação Nº</Label>
                      <Input value={cotacaoNum} onChange={e => setCotacaoNum(e.target.value)} />
                    </div>
                    <div>
                      <Label>Proposta Nº</Label>
                      <Input value={propostaNum} onChange={e => setPropostaNum(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* DADOS DO REPRESENTANTE LEGAL */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dados do Representante Legal para Assinatura do Contrato
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

              {/* DADOS DA EMPRESA */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Dados da Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              {/* SEÇÃO WORD */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Word (Área de Texto Livre)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={textoWord}
                    onChange={e => setTextoWord(e.target.value)}
                    placeholder="Escreva livremente aqui. Você pode inserir a tabela de produtos usando o botão abaixo..."
                    rows={10}
                    className="min-h-[200px]"
                  />
                  {tabelaInserida && (
                    <div className="border rounded-lg p-3 bg-muted/30">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <TableIcon className="h-4 w-4" />
                        Tabela de Produtos inserida
                      </div>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Código</TableHead>
                              <TableHead>Item</TableHead>
                              <TableHead>Produto</TableHead>
                              <TableHead>Marca</TableHead>
                              <TableHead>Qtd</TableHead>
                              <TableHead>Vlr c/ ICMS</TableHead>
                              <TableHead>Vlr Total c/ ICMS</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tabelaItens.map((item, idx) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.codigo || '-'}</TableCell>
                                <TableCell>{item.item || idx + 1}</TableCell>
                                <TableCell>{item.produto || '-'}</TableCell>
                                <TableCell>{item.marca || '-'}</TableCell>
                                <TableCell>{item.quantidade}</TableCell>
                                <TableCell>{formatCurrency(item.valorComIcms)}</TableCell>
                                <TableCell>{formatCurrency(item.valorTotalComIcms)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                  {!tabelaInserida && (
                    <Button variant="outline" size="sm" onClick={() => { setModalTab('tabela'); }}>
                      <TableIcon className="h-4 w-4 mr-1" /> Ir para Tabela para inserir na proposta
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* DECLARAÇÃO */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Declaração</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label>A empresa {dadosEmpresa.razaoSocial || 'XXXX'} declara que:</Label>
                  <Textarea value={declaracao} onChange={e => setDeclaracao(e.target.value)} placeholder="Digite a declaração..." className="mt-2" rows={4} />
                </CardContent>
              </Card>

              {/* CONDIÇÕES COMERCIAIS */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Condições Comerciais</CardTitle>
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

              {/* LOCAL, DATA E ASSINATURA */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Local, Data e Assinatura</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssinaturaRepresentante
                    repNome={repNome}
                    repCargo={repCargo}
                    razaoSocial={dadosEmpresa.razaoSocial}
                    localAssinatura={localAssinatura}
                    dataAssinatura={dataAssinatura}
                    onLocalChange={setLocalAssinatura}
                    onDataChange={setDataAssinatura}
                    onRepNomeChange={setRepNome}
                    onRepCargoChange={setRepCargo}
                    onAssinaturaChange={setAssinaturaRepresentante}
                    assinaturaBase64={assinaturaRepresentante}
                  />
                </CardContent>
              </Card>

              {/* Botões */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar Proposta</Button>
              </div>
            </div>
          </TabsContent>

          {/* ===== ABA TABELA ===== */}
          <TabsContent value="tabela">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Tabela de Produtos
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={inserirTabelaNaProposta}>
                    <TableIcon className="h-4 w-4 mr-1" /> Inserir tabela na proposta
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Marca</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Anvisa</TableHead>
                          <TableHead>Unidade</TableHead>
                          <TableHead className="w-16">Qtd</TableHead>
                          <TableHead>Vlr c/ ICMS</TableHead>
                          <TableHead>Vlr s/ ICMS</TableHead>
                          <TableHead>Vlr Total c/ ICMS</TableHead>
                          <TableHead>Vlr Total s/ ICMS</TableHead>
                          <TableHead>Vlr Mensal</TableHead>
                          <TableHead>Vlr Anual</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tabelaItens.map((item, idx) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Input className="min-w-[80px]" value={item.codigo} onChange={e => updateTabelaItem(item.id, 'codigo', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[60px]" value={item.item} onChange={e => updateTabelaItem(item.id, 'item', e.target.value)} placeholder={String(idx + 1)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[120px]" value={item.produto} onChange={e => updateTabelaItem(item.id, 'produto', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[150px]" value={item.descricao} onChange={e => updateTabelaItem(item.id, 'descricao', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[100px]" value={item.marca} onChange={e => updateTabelaItem(item.id, 'marca', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[100px]" value={item.modelo} onChange={e => updateTabelaItem(item.id, 'modelo', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[90px]" value={item.anvisa} onChange={e => updateTabelaItem(item.id, 'anvisa', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input className="min-w-[70px]" value={item.unidade} onChange={e => updateTabelaItem(item.id, 'unidade', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Input type="number" className="w-16" value={item.quantidade} onChange={e => updateTabelaItem(item.id, 'quantidade', Number(e.target.value))} />
                            </TableCell>
                            <TableCell>
                              <Input type="number" className="min-w-[100px]" value={item.valorComIcms || ''} onChange={e => updateTabelaItem(item.id, 'valorComIcms', Number(e.target.value))} />
                            </TableCell>
                            <TableCell>
                              <Input type="number" className="min-w-[100px]" value={item.valorSemIcms || ''} onChange={e => updateTabelaItem(item.id, 'valorSemIcms', Number(e.target.value))} />
                            </TableCell>
                            <TableCell className="font-medium">{formatCurrency(item.valorTotalComIcms)}</TableCell>
                            <TableCell className="font-medium">{formatCurrency(item.valorTotalSemIcms)}</TableCell>
                            <TableCell>
                              <Input type="number" className="min-w-[100px]" value={item.valorMensal || ''} onChange={e => updateTabelaItem(item.id, 'valorMensal', Number(e.target.value))} />
                            </TableCell>
                            <TableCell>
                              <Input type="number" className="min-w-[100px]" value={item.valorAnual || ''} onChange={e => updateTabelaItem(item.id, 'valorAnual', Number(e.target.value))} />
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => removeTabelaItem(item.id)} disabled={tabelaItens.length === 1}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <Button variant="outline" size="sm" onClick={addTabelaItem}>
                    <Plus className="h-4 w-4 mr-1" /> Adicionar Item
                  </Button>

                  <div>
                    <Label>Observações</Label>
                    <Textarea value={obsTabela} onChange={e => setObsTabela(e.target.value)} placeholder="Observações da tabela..." rows={3} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PropostaLicitacaoModal;
