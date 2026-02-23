import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Upload, FileText, AlertCircle, CheckCircle2, Plus, ChevronDown, ChevronUp, FileCheck, FileSearch, Camera, File, Trash2, Download } from 'lucide-react';
import { queixaTecnicaMockada } from '@/data/queixaTecnicaData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';

type TipoAnexo = 'Resposta à ANVISA' | 'Laudo Técnico' | 'Relatório de Investigação' | 'Evidência Fotográfica' | 'Outros';

interface AnexoQueixa {
  id: string;
  tipo: TipoAnexo;
  titulo: string;
  data: string;
  observacoes: string;
  arquivo: File | null;
  nomeArquivo: string;
  tamanhoArquivo: number;
}

export const QueixaTecnicaTab = () => {
  const [documentoAnexado, setDocumentoAnexado] = useState(false);
  const [dadosImportados, setDadosImportados] = useState(false);
  const { toast } = useToast();

  // Estados para Anexos e Respostas
  const [anexos, setAnexos] = useState<AnexoQueixa[]>([]);
  const [mostrarFormAnexo, setMostrarFormAnexo] = useState(false);
  const [anexosExpandidos, setAnexosExpandidos] = useState<string[]>([]);
  const [novoAnexo, setNovoAnexo] = useState<Partial<AnexoQueixa>>({
    tipo: undefined,
    titulo: '',
    data: format(new Date(), 'yyyy-MM-dd'),
    observacoes: '',
    arquivo: null,
    nomeArquivo: '',
    tamanhoArquivo: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAnexoExpandido = (id: string) => {
    setAnexosExpandidos(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const formatarTamanho = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getIconeAnexo = (tipo: TipoAnexo) => {
    switch (tipo) {
      case 'Resposta à ANVISA': return <FileCheck className="h-4 w-4 text-primary" />;
      case 'Laudo Técnico': return <FileSearch className="h-4 w-4 text-blue-600" />;
      case 'Relatório de Investigação': return <FileText className="h-4 w-4 text-orange-600" />;
      case 'Evidência Fotográfica': return <Camera className="h-4 w-4 text-green-600" />;
      default: return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleSalvarAnexo = () => {
    if (!novoAnexo.tipo) {
      sonnerToast.error('Selecione o tipo do anexo.');
      return;
    }
    if (!novoAnexo.titulo?.trim()) {
      sonnerToast.error('Informe o título do anexo.');
      return;
    }
    if (!novoAnexo.arquivo) {
      sonnerToast.error('Anexe um arquivo.');
      return;
    }

    const novo: AnexoQueixa = {
      id: crypto.randomUUID(),
      tipo: novoAnexo.tipo as TipoAnexo,
      titulo: novoAnexo.titulo || '',
      data: novoAnexo.data || format(new Date(), 'yyyy-MM-dd'),
      observacoes: novoAnexo.observacoes || '',
      arquivo: novoAnexo.arquivo,
      nomeArquivo: novoAnexo.nomeArquivo || '',
      tamanhoArquivo: novoAnexo.tamanhoArquivo || 0,
    };

    setAnexos(prev => [...prev, novo]);
    setNovoAnexo({
      tipo: undefined,
      titulo: '',
      data: format(new Date(), 'yyyy-MM-dd'),
      observacoes: '',
      arquivo: null,
      nomeArquivo: '',
      tamanhoArquivo: 0,
    });
    setMostrarFormAnexo(false);
    sonnerToast.success('Anexo adicionado com sucesso!');
  };

  const handleRemoverAnexo = (id: string) => {
    setAnexos(prev => prev.filter(a => a.id !== id));
    sonnerToast.success('Anexo removido.');
  };

  const handleFileAnexo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      sonnerToast.error('Arquivo muito grande. Máximo 10MB.');
      return;
    }
    setNovoAnexo(prev => ({
      ...prev,
      arquivo: file,
      nomeArquivo: file.name,
      tamanhoArquivo: file.size,
    }));
  };

  const handleSimularImportacao = () => {
    setDocumentoAnexado(true);
    setTimeout(() => {
      setDadosImportados(true);
      toast({
        title: "Dados importados com sucesso",
        description: "NC automática foi gerada: NC-2024-008",
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Pendente': 'outline',
      'Em Análise': 'secondary',
      'NC Gerada': 'default',
      'Resolvida': 'default'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Seção de Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Anexar Notificação Notivisa/ANVISA</CardTitle>
          <CardDescription>
            Faça upload do documento extraído do Sistema Notivisa para importação automática dos dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Arraste o arquivo aqui ou clique para selecionar
            </p>
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx"
            />
            <Button
              variant="outline"
              onClick={handleSimularImportacao}
              disabled={documentoAnexado}
            >
              {documentoAnexado ? 'Documento Anexado' : 'Selecionar Arquivo'}
            </Button>
          </div>

          {documentoAnexado && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Notificação de tecnovigilância (nº 202404004335).pdf</p>
                <p className="text-xs text-muted-foreground">Importando dados...</p>
              </div>
              {dadosImportados && <CheckCircle2 className="h-5 w-5 text-green-600" />}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dados Importados */}
      {dadosImportados && (
        <>
          {/* Alerta de NC Gerada */}
          <Card className="border-primary">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Não Conformidade Gerada Automaticamente</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Uma NC foi criada automaticamente com base nos dados importados
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="font-medium">NC #:</span>
                    <span className="text-primary">NC-2024-008</span>
                    <span className="mx-2">|</span>
                    <span className="font-medium">Tipo:</span>
                    <span>Material Não Conforme</span>
                    <span className="mx-2">|</span>
                    <span className="font-medium">Impacto:</span>
                    <Badge variant="destructive" className="h-5">Crítico</Badge>
                    <span className="mx-2">|</span>
                    <span className="font-medium">Origem:</span>
                    <span>Notivisa/ANVISA</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identificação do Notificador */}
          <Card>
            <CardHeader>
              <CardTitle>1 - Identificação do Notificador:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>1.1. Nome completo:</Label>
                <Input value={queixaTecnicaMockada.notificadorNome} readOnly />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>1.2. e-Mail:</Label>
                  <Input value={queixaTecnicaMockada.notificadorEmail} readOnly />
                </div>
                <div>
                  <Label>1.3. Telefone:</Label>
                  <Input value={queixaTecnicaMockada.notificadorTelefone || ''} readOnly />
                </div>
                <div>
                  <Label>1.4. Celular:</Label>
                  <Input value={queixaTecnicaMockada.notificadorCelular || ''} readOnly />
                </div>
              </div>

              <div>
                <Label>1.5. Categoria do notificador:</Label>
                <Input value={queixaTecnicaMockada.notificadorCategoria} readOnly />
              </div>
            </CardContent>
          </Card>

          {/* Identificação da Notificação */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>2 - Identificação da Notificação</CardTitle>
                {getStatusBadge(queixaTecnicaMockada.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>2.1. Produto motivo da notificação:</Label>
                  <Input value={queixaTecnicaMockada.produtoMotivo} readOnly />
                </div>
                <div>
                  <Label>2.2. Queixa Técnica/Evento Adverso:</Label>
                  <Input value={queixaTecnicaMockada.tipoQueixaEvento} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>2.3. Utilizado no manejo do Covid-19?</Label>
                  <Input value={queixaTecnicaMockada.covidRelacionado ? 'Sim' : 'Não'} readOnly />
                </div>
                <div>
                  <Label>2.4. Utilizado na aplicação da vacina contra a Covid-19?</Label>
                  <Input value={queixaTecnicaMockada.vacinaCovidRelacionado ? 'Sim' : 'Não'} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tipo de Queixa Técnica */}
          <Card>
            <CardHeader>
              <CardTitle>3 - Tipo de Queixa Técnica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>3.1. Você é notificante:</Label>
                <Input value={queixaTecnicaMockada.voceENotificante || ''} readOnly />
              </div>

              <div>
                <Label>3.2. Razão Social:</Label>
                <Input value={queixaTecnicaMockada.razaoSocialNotificante || ''} readOnly />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>3.3. CNPJ:</Label>
                  <Input value={queixaTecnicaMockada.cnpjNotificante || ''} readOnly />
                </div>
                <div>
                  <Label>3.4. Telefone:</Label>
                  <Input value={queixaTecnicaMockada.telefoneNotificante || ''} readOnly />
                </div>
              </div>

              <div>
                <Label>3.5. Endereço:</Label>
                <Input value={queixaTecnicaMockada.enderecoNotificante || ''} readOnly />
              </div>

              <div>
                <Label>3.6. Tipo de Queixa Técnica:</Label>
                <Input value={queixaTecnicaMockada.tipoQueixaTecnica} readOnly />
              </div>

              <div>
                <Label>3.6.1. Alterações apresentadas pelo produto:</Label>
                <Textarea value={queixaTecnicaMockada.alteracoesApresentadas || ''} readOnly rows={2} />
              </div>
            </CardContent>
          </Card>

          {/* Queixa Técnica */}
          <Card>
            <CardHeader>
              <CardTitle>4 - Queixa Técnica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>4.1. Descrição objetivamente a Queixa Técnica</Label>
                <Textarea
                  value={queixaTecnicaMockada.descricaoObjetiva}
                  readOnly
                  rows={3}
                  className="bg-muted/50"
                />
              </div>

              <div>
                <Label className="mb-2 block">4.2. Classificação da Ocorrência:</Label>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="border p-2 text-center font-semibold">Código Nível 1</th>
                        <th className="border p-2 text-center font-semibold">Termo Nível 1</th>
                        <th className="border p-2 text-center font-semibold">Definição Nível 1</th>
                        <th className="border p-2 text-center font-semibold">Código Nível 2</th>
                        <th className="border p-2 text-center font-semibold">Termo Nível 2</th>
                        <th className="border p-2 text-center font-semibold">Definição Nível 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 text-center bg-muted/30">{queixaTecnicaMockada.classificacaoCodigoNivel1}</td>
                        <td className="border p-2 text-center bg-muted/30">{queixaTecnicaMockada.classificacaoTermoNivel1}</td>
                        <td className="border p-2 bg-muted/30">{queixaTecnicaMockada.classificacaoDefinicaoNivel1}</td>
                        <td className="border p-2 text-center bg-muted/30">{queixaTecnicaMockada.classificacaoCodigoNivel2}</td>
                        <td className="border p-2 text-center bg-muted/30">{queixaTecnicaMockada.classificacaoTermoNivel2}</td>
                        <td className="border p-2 bg-muted/30">{queixaTecnicaMockada.classificacaoDefinicaoNivel2}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <Label>4.6. Data da identificação/ocorrência</Label>
                <Input
                  value={queixaTecnicaMockada.dataIdentificacaoOcorrencia.toLocaleDateString('pt-BR')}
                  readOnly
                  className="bg-muted/50"
                />
              </div>

              <div>
                <Label>4.7. Local da identificação/ocorrência</Label>
                <Input
                  value={queixaTecnicaMockada.localIdentificacaoOcorrencia || ''}
                  readOnly
                  className="bg-muted/50"
                />
              </div>

              <div>
                <Label>4.8. Nome do estabelecimento de saúde</Label>
                <Input
                  value={queixaTecnicaMockada.nomeEstabelecimentoSaude || ''}
                  readOnly
                  className="bg-muted/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>4.9. CNES do estabelecimento</Label>
                  <Input
                    value={queixaTecnicaMockada.cnesEstabelecimento || ''}
                    readOnly
                    className="bg-muted/50"
                  />
                </div>
                <div>
                  <Label>4.10. CNPJ do estabelecimento</Label>
                  <Input
                    value={queixaTecnicaMockada.cnpjEstabelecimento || ''}
                    readOnly
                    className="bg-muted/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>4.11. País</Label>
                  <Input
                    value={queixaTecnicaMockada.paisEstabelecimento || ''}
                    readOnly
                    className="bg-muted/50"
                  />
                </div>
                <div>
                  <Label>4.12. UF</Label>
                  <Input
                    value={queixaTecnicaMockada.ufEstabelecimento || ''}
                    readOnly
                    className="bg-muted/50"
                  />
                </div>
                <div>
                  <Label>4.13. Município</Label>
                  <Input
                    value={queixaTecnicaMockada.municipioEstabelecimento || ''}
                    readOnly
                    className="bg-muted/50"
                  />
                </div>
              </div>

              <div>
                <Label>4.14. Endereço do local da identificação/ocorrência</Label>
                <Input
                  value={queixaTecnicaMockada.enderecoLocalIdentificacao || ''}
                  readOnly
                  className="bg-muted/50"
                />
              </div>

              <div>
                <Label>4.15. Especifique o setor</Label>
                <Input
                  value={queixaTecnicaMockada.setorEspecifico}
                  readOnly
                  className="bg-muted/50"
                />
              </div>

              <div>
                <Label>4.16. Tipo de Procedimento</Label>
                <Input
                  value={queixaTecnicaMockada.tipoProcedimento || ''}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* 5 - Produto e Empresa */}
          <Card>
            <CardHeader>
              <CardTitle>5 - Produto e Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>5.1. Número do registro ou cadastro na ANVISA</Label>
                  <Input value={queixaTecnicaMockada.numeroRegistroAnvisa} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>5.2. CNPJ da empresa fabricante ou importador</Label>
                  <Input value={queixaTecnicaMockada.cnpjFabricanteImportador} readOnly className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6 - Dados do Produto */}
          <Card>
            <CardHeader>
              <CardTitle>6 - Dados do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>6.1. Nome comercial do produto</Label>
                  <Input value={queixaTecnicaMockada.nomeComercial} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>6.2. Produto</Label>
                  <Input value={queixaTecnicaMockada.produto} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>6.3. Data de fabricação</Label>
                  <Input value={format(queixaTecnicaMockada.dataFabricacao, 'dd/MM/yyyy')} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>6.4. Número do lote</Label>
                  <Input value={queixaTecnicaMockada.numeroLote} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>6.5. Data de validade</Label>
                  <Input value={format(queixaTecnicaMockada.dataValidade, 'dd/MM/yyyy')} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>6.6. Produto Reprocessado</Label>
                  <Input value={queixaTecnicaMockada.produtoReprocessado ? 'Sim' : 'Não'} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>6.7. Produto importado?</Label>
                  <Input value={queixaTecnicaMockada.produtoImportado ? 'Sim' : 'Não'} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>6.8. Classe de Risco</Label>
                  <Input value={queixaTecnicaMockada.classeRisco} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>6.9. Nome Técnico</Label>
                  <Input value={queixaTecnicaMockada.nomeTecnico} readOnly className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do Fabricante */}
          <Card>
            <CardHeader>
              <CardTitle>7 - Informações do Fabricante/Importador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>7.1. Nome ou razão social</Label>
                  <Input value={queixaTecnicaMockada.razaoSocialFabricante} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>7.2. Endereço</Label>
                  <Input value={queixaTecnicaMockada.enderecoFabricante} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div>
                <Label>7.3. Número do telefone/SAC</Label>
                <Input value={queixaTecnicaMockada.telefoneContato || ''} readOnly className="bg-muted/50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>7.4. UF</Label>
                  <Input value={queixaTecnicaMockada.ufFabricante} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>7.5. Município</Label>
                  <Input value={queixaTecnicaMockada.municipioFabricante} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>7.6. Nome do fabricante</Label>
                  <Input value={queixaTecnicaMockada.nomeFabricante || ''} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>7.7. País fabricante</Label>
                  <Input value={queixaTecnicaMockada.paisFabricante || ''} readOnly className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outras informações importantes */}
          <Card>
            <CardHeader>
              <CardTitle>8 – Outras informações importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>8.1. A utilização do produto seguiu as instruções do fabricante?</Label>
                  <Input value={queixaTecnicaMockada.seguiuInstrucoes ? 'Sim' : 'Não'} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>8.2. Local de aquisição do produto</Label>
                  <Input value={queixaTecnicaMockada.localAquisicao} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>8.3. Possui nota fiscal da compra do produto?</Label>
                  <Input value={queixaTecnicaMockada.possuiNotaFiscal ? 'Sim' : 'Não'} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>8.4. Houve comunicação à indústria/distribuidor?</Label>
                  <Input value={queixaTecnicaMockada.comunicacaoIndustria} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div>
                <Label>8.5. Foram adotadas outras providências após a identificação do problema?</Label>
                <Input value={queixaTecnicaMockada.providenciasAdotadas || ''} readOnly className="bg-muted/50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>8.6. Existem amostras íntegras para a coleta?</Label>
                  <Input value={queixaTecnicaMockada.existemAmostras ? `Sim - ${queixaTecnicaMockada.quantidadeAmostras}` : 'Não'} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>8.7. Existem rótulos do produto para a coleta?</Label>
                  <Input value={queixaTecnicaMockada.existemRotulos ? 'Sim' : 'Não'} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div>
                <Label>8.8. Observações:</Label>
                <Textarea value={queixaTecnicaMockada.observacoes || ''} readOnly className="bg-muted/50" rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* 9 - Anexos e Respostas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>9 - Anexos e Respostas</CardTitle>
                <Button size="sm" onClick={() => setMostrarFormAnexo(true)} disabled={mostrarFormAnexo}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Anexo
                </Button>
              </div>
              <CardDescription>Respostas à ANVISA e documentos vinculados à queixa técnica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Formulário de novo anexo */}
              {mostrarFormAnexo && (
                <Card className="border-dashed border-primary/40">
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Tipo do Anexo *</Label>
                        <Select
                          value={novoAnexo.tipo || ''}
                          onValueChange={(v) => setNovoAnexo(prev => ({ ...prev, tipo: v as TipoAnexo }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Resposta à ANVISA">Resposta à ANVISA</SelectItem>
                            <SelectItem value="Laudo Técnico">Laudo Técnico</SelectItem>
                            <SelectItem value="Relatório de Investigação">Relatório de Investigação</SelectItem>
                            <SelectItem value="Evidência Fotográfica">Evidência Fotográfica</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Data</Label>
                        <Input
                          type="date"
                          value={novoAnexo.data || ''}
                          onChange={(e) => setNovoAnexo(prev => ({ ...prev, data: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>Título / Descrição *</Label>
                      <Input
                        value={novoAnexo.titulo || ''}
                        onChange={(e) => setNovoAnexo(prev => ({ ...prev, titulo: e.target.value }))}
                        placeholder="Ex: Carta resposta referente à notificação nº..."
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Observações</Label>
                      <Textarea
                        value={novoAnexo.observacoes || ''}
                        onChange={(e) => setNovoAnexo(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Informações adicionais (opcional)"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Arquivo *</Label>
                      {!novoAnexo.arquivo ? (
                        <div>
                          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                            Selecionar Arquivo
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileAnexo}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-2 border border-green-200 bg-green-50 rounded text-sm">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">{novoAnexo.nomeArquivo}</span>
                          <span className="text-green-600 text-xs">({formatarTamanho(novoAnexo.tamanhoArquivo || 0)})</span>
                          <Button type="button" variant="ghost" size="sm" className="ml-auto h-6 px-2" onClick={() => {
                            setNovoAnexo(prev => ({ ...prev, arquivo: null, nomeArquivo: '', tamanhoArquivo: 0 }));
                          }}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={handleSalvarAnexo}>Salvar Anexo</Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        setMostrarFormAnexo(false);
                        setNovoAnexo({ tipo: undefined, titulo: '', data: format(new Date(), 'yyyy-MM-dd'), observacoes: '', arquivo: null, nomeArquivo: '', tamanhoArquivo: 0 });
                      }}>
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de anexos */}
              {anexos.length === 0 && !mostrarFormAnexo && (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhum anexo adicionado.</p>
              )}

              {anexos.map((anexo) => {
                const expandido = anexosExpandidos.includes(anexo.id);
                return (
                  <Collapsible key={anexo.id} open={expandido} onOpenChange={() => toggleAnexoExpandido(anexo.id)}>
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left">
                          {expandido ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                          {getIconeAnexo(anexo.tipo)}
                          <span className="font-medium text-sm truncate flex-1">{anexo.titulo}</span>
                          <Badge variant="secondary" className="text-xs shrink-0">{anexo.tipo}</Badge>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {anexo.data ? format(new Date(anexo.data + 'T00:00:00'), 'dd/MM/yyyy') : ''}
                          </span>
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t px-4 py-3 space-y-2 bg-muted/20">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="font-medium">Tipo:</span> {anexo.tipo}</div>
                            <div><span className="font-medium">Data:</span> {anexo.data ? format(new Date(anexo.data + 'T00:00:00'), 'dd/MM/yyyy') : ''}</div>
                          </div>
                          <div className="text-sm"><span className="font-medium">Título:</span> {anexo.titulo}</div>
                          {anexo.observacoes && (
                            <div className="text-sm"><span className="font-medium">Observações:</span> {anexo.observacoes}</div>
                          )}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-primary" />
                              <span>{anexo.nomeArquivo}</span>
                              <span className="text-xs text-muted-foreground">({formatarTamanho(anexo.tamanhoArquivo)})</span>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => {
                                if (anexo.arquivo) {
                                  const url = URL.createObjectURL(anexo.arquivo);
                                  window.open(url, '_blank');
                                }
                              }}>
                                <Download className="h-3 w-3 mr-1" /> Visualizar
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => handleRemoverAnexo(anexo.id)}>
                                <Trash2 className="h-3 w-3 mr-1" /> Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
