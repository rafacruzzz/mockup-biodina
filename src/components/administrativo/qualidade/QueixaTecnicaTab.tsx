import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { queixaTecnicaMockada } from '@/data/queixaTecnicaData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export const QueixaTecnicaTab = () => {
  const [documentoAnexado, setDocumentoAnexado] = useState(false);
  const [dadosImportados, setDadosImportados] = useState(false);
  const { toast } = useToast();

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
                <CardTitle>Identificação da Notificação</CardTitle>
                {getStatusBadge(queixaTecnicaMockada.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dados Básicos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Número da Notificação</Label>
                  <Input value={queixaTecnicaMockada.numeroNotificacao} readOnly />
                </div>
                <div>
                  <Label>Data da Identificação/Ocorrência</Label>
                  <Input value={format(queixaTecnicaMockada.dataIdentificacao, 'dd/MM/yyyy')} readOnly />
                </div>
              </div>

              {/* Produto e Tipo */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Produto motivo da notificação</Label>
                  <Input value={queixaTecnicaMockada.produtoMotivo} readOnly />
                </div>
                <div>
                  <Label>Queixa Técnica/Evento Adverso</Label>
                  <Input value={queixaTecnicaMockada.tipoQueixaEvento} readOnly />
                </div>
              </div>

              {/* COVID-19 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Utilizado no manejo do Covid-19?</Label>
                  <Input value={queixaTecnicaMockada.covidRelacionado ? 'Sim' : 'Não'} readOnly />
                </div>
                <div>
                  <Label>Utilizado na aplicação da vacina contra a Covid-19?</Label>
                  <Input value={queixaTecnicaMockada.vacinaCovidRelacionado ? 'Sim' : 'Não'} readOnly />
                </div>
              </div>

              {/* Tipo de Queixa */}
              <div>
                <Label>3.6. Tipo de Queixa Técnica</Label>
                <Input value={queixaTecnicaMockada.tipoQueixaTecnica} readOnly />
              </div>

              {/* Descrição */}
              <div>
                <Label>4.1. Descrição objetivamente a Queixa Técnica</Label>
                <Textarea value={queixaTecnicaMockada.descricaoObjetiva} readOnly rows={3} />
              </div>

              {/* Classificação */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>4.2. Classificação da Ocorrência (Nível 1)</Label>
                  <Input value={queixaTecnicaMockada.classificacaoNivel1} readOnly />
                </div>
                <div>
                  <Label>4.2. Classificação da Ocorrência (Nível 2)</Label>
                  <Input value={queixaTecnicaMockada.classificacaoNivel2} readOnly />
                </div>
              </div>

              {/* Local */}
              <div>
                <Label>4.15. Especifique o setor</Label>
                <Input value={queixaTecnicaMockada.setorEspecifico} readOnly />
              </div>
            </CardContent>
          </Card>

          {/* Informações do Produto */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Registro ANVISA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>5.1. Número do registro ou cadastro na ANVISA</Label>
                  <Input value={queixaTecnicaMockada.numeroRegistroAnvisa} readOnly />
                </div>
                <div>
                  <Label>5.2. CNPJ da empresa fabricante ou importador</Label>
                  <Input value={queixaTecnicaMockada.cnpjFabricanteImportador} readOnly />
                </div>
              </div>

              {/* Nome Comercial e Produto */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>6.1. Nome comercial do produto</Label>
                  <Input value={queixaTecnicaMockada.nomeComercial} readOnly />
                </div>
                <div>
                  <Label>6.2. Produto</Label>
                  <Input value={queixaTecnicaMockada.produto} readOnly />
                </div>
              </div>

              {/* Datas */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>6.3. Data de fabricação</Label>
                  <Input value={format(queixaTecnicaMockada.dataFabricacao, 'dd/MM/yyyy')} readOnly />
                </div>
                <div>
                  <Label>6.4. Número do lote</Label>
                  <Input value={queixaTecnicaMockada.numeroLote} readOnly />
                </div>
                <div>
                  <Label>6.5. Data de validade</Label>
                  <Input value={format(queixaTecnicaMockada.dataValidade, 'dd/MM/yyyy')} readOnly />
                </div>
              </div>

              {/* Características */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>6.6. Produto Reprocessado</Label>
                  <Input value={queixaTecnicaMockada.produtoReprocessado ? 'Sim' : 'Não'} readOnly />
                </div>
                <div>
                  <Label>6.7. Produto importado?</Label>
                  <Input value={queixaTecnicaMockada.produtoImportado ? 'Sim' : 'Não'} readOnly />
                </div>
              </div>

              {/* Classe e Nome Técnico */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>6.8. Classe de Risco</Label>
                  <Input value={queixaTecnicaMockada.classeRisco} readOnly />
                </div>
                <div>
                  <Label>6.9. Nome Técnico</Label>
                  <Input value={queixaTecnicaMockada.nomeTecnico} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do Fabricante */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Fabricante/Importador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>7.1. Nome ou razão social</Label>
                  <Input value={queixaTecnicaMockada.razaoSocialFabricante} readOnly />
                </div>
                <div>
                  <Label>7.2. Endereço</Label>
                  <Input value={queixaTecnicaMockada.enderecoFabricante} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>7.4. UF</Label>
                  <Input value={queixaTecnicaMockada.ufFabricante} readOnly />
                </div>
                <div>
                  <Label>7.5. Município</Label>
                  <Input value={queixaTecnicaMockada.municipioFabricante} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Complementares */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Complementares</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>8.1. A utilização do produto seguiu as instruções do fabricante?</Label>
                  <Input value={queixaTecnicaMockada.seguiuInstrucoes ? 'Sim' : 'Não'} readOnly />
                </div>
                <div>
                  <Label>8.2. Local de aquisição do produto</Label>
                  <Input value={queixaTecnicaMockada.localAquisicao} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>8.3. Possui nota fiscal da compra do produto?</Label>
                  <Input value={queixaTecnicaMockada.possuiNotaFiscal ? 'Sim' : 'Não'} readOnly />
                </div>
                <div>
                  <Label>8.4. Houve comunicação à indústria/distribuidor?</Label>
                  <Input value={queixaTecnicaMockada.comunicacaoIndustria} readOnly />
                </div>
              </div>

              <div>
                <Label>8.5. Foram adotadas outras providências após a identificação do problema?</Label>
                <Input value={queixaTecnicaMockada.providenciasAdotadas || ''} readOnly />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>8.6. Existem amostras íntegras para a coleta?</Label>
                  <Input value={queixaTecnicaMockada.existemAmostras ? `Sim - ${queixaTecnicaMockada.quantidadeAmostras}` : 'Não'} readOnly />
                </div>
                <div>
                  <Label>8.7. Existem rótulos do produto para a coleta?</Label>
                  <Input value={queixaTecnicaMockada.existemRotulos ? 'Sim' : 'Não'} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
