import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Package, FileText, AlertCircle, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EquipamentoRegulatorio } from '@/types/rastreabilidadeRegulatorio';
import { 
  getMovimentacoesEquipamentoRegulatorio, 
  getAlertasEquipamentoRegulatorio,
  getTipoMovimentacaoLabel,
  getStatusColor,
  getStatusLabel,
  getPrioridadeAlertaColor
} from '@/data/rastreabilidadeRegulatorio';

interface DossieEquipamentoRegulatorioProps {
  equipamento: EquipamentoRegulatorio;
}

export function DossieEquipamentoRegulatorio({ equipamento }: DossieEquipamentoRegulatorioProps) {
  const movimentacoes = getMovimentacoesEquipamentoRegulatorio(equipamento.id);
  const alertas = getAlertasEquipamentoRegulatorio(equipamento.id);
  const statusColors = getStatusColor(equipamento.status);

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Dossiê */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">{equipamento.nomeProduto}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {equipamento.modelo} - {equipamento.marca}
                </p>
              </div>
            </div>
            <Badge className={`${statusColors.bg} ${statusColors.text} border-0`}>
              {getStatusLabel(equipamento.status)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Dados do Cadastro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dados do Cadastro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Código</p>
              <p className="text-sm font-semibold">{equipamento.codigo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Linha de Produto</p>
              <p className="text-sm font-semibold">{equipamento.linhaProduto}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Marca</p>
              <p className="text-sm font-semibold">{equipamento.marca}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modelo</p>
              <p className="text-sm font-semibold">{equipamento.modelo}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Nome do Produto</p>
              <p className="text-sm font-semibold">{equipamento.nomeProduto}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados COMEX (Importação) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Dados COMEX (Importação)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Número de Série</p>
              <p className="text-sm font-semibold">{equipamento.numeroSerie}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Condição</p>
              <p className="text-sm font-semibold">
                {equipamento.novoOuRefurbished === 'novo' ? 'Novo' : 'Refurbished'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data da Importação</p>
              <p className="text-sm font-semibold">{formatDate(equipamento.dataImportacao)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Regime Especial</p>
              <Badge variant={equipamento.compradoComRegimeEspecial ? "default" : "secondary"}>
                {equipamento.compradoComRegimeEspecial ? 'Sim' : 'Não'}
              </Badge>
              {equipamento.compradoComRegimeEspecial && (
                <p className="text-xs text-muted-foreground mt-1">
                  * A partir de 14/04/2021
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lote</p>
              <p className="text-sm font-semibold">{equipamento.lote}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Qtd Importada no Lote</p>
              <p className="text-sm font-semibold">{equipamento.quantidadeImportadaLote} unidades</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Fabricação</p>
              <p className="text-sm font-semibold">{formatDate(equipamento.dataFabricacao)}</p>
            </div>
            {equipamento.dataValidade && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data de Validade</p>
                <p className="text-sm font-semibold">{formatDate(equipamento.dataValidade)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dados de Vendas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Dados de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quantidade Vendida</p>
              <p className="text-sm font-semibold">{equipamento.quantidadeVendida}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Localização</p>
              <p className="text-sm font-semibold">{equipamento.localizacao}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mantenedora</p>
              <p className="text-sm font-semibold">{equipamento.mantenedora}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p className="text-sm font-semibold">{equipamento.cliente}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">UF</p>
              <p className="text-sm font-semibold">{equipamento.uf}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados Técnicos (DT) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Dados Técnicos (DT)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data da Instalação</p>
              <p className="text-sm font-semibold">{formatDate(equipamento.dataInstalacao)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Versão de Software</p>
              <p className="text-sm font-semibold">{equipamento.versaoSoftware}</p>
            </div>
            {equipamento.dataAtualizacaoSoftware && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Atualização Software</p>
                <p className="text-sm font-semibold">{formatDate(equipamento.dataAtualizacaoSoftware)}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Versão do Windows</p>
              <p className="text-sm font-semibold">{equipamento.versaoWindows}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contato do Setor Responsável */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contato do Setor Responsável
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Setor de Alocação</p>
              <p className="text-sm font-semibold">{equipamento.setorAlocacao}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pessoa Responsável</p>
              <p className="text-sm font-semibold">{equipamento.pessoaResponsavelSetor}</p>
            </div>
            {equipamento.telefoneResponsavel && (
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> Telefone
                </p>
                <p className="text-sm font-semibold">{equipamento.telefoneResponsavel}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" /> E-mail
              </p>
              <p className="text-sm font-semibold">{equipamento.emailResponsavel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Histórico e Alertas */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="movimentacoes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="movimentacoes">
                Histórico de Movimentações ({movimentacoes.length})
              </TabsTrigger>
              <TabsTrigger value="alertas">
                Alertas ({alertas.filter(a => !a.lido).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="movimentacoes" className="mt-4">
              {movimentacoes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimentacoes.map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell className="whitespace-nowrap">{formatDate(mov.data)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getTipoMovimentacaoLabel(mov.tipo)}</Badge>
                        </TableCell>
                        <TableCell>{mov.origem || '-'}</TableCell>
                        <TableCell>{mov.destino || '-'}</TableCell>
                        <TableCell>{mov.responsavel}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {mov.observacoes || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma movimentação registrada
                </p>
              )}
            </TabsContent>

            <TabsContent value="alertas" className="mt-4">
              {alertas.length > 0 ? (
                <div className="space-y-3">
                  {alertas.map((alerta) => {
                    const prioridadeColors = getPrioridadeAlertaColor(alerta.prioridade);
                    return (
                      <div
                        key={alerta.id}
                        className={`p-4 rounded-lg border ${prioridadeColors.border} ${
                          alerta.lido ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className={`h-5 w-5 mt-0.5 ${prioridadeColors.text}`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`${prioridadeColors.bg} ${prioridadeColors.text} border-0`}>
                                {alerta.prioridade.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(alerta.dataCriacao)}
                              </span>
                              {alerta.lido && (
                                <Badge variant="outline" className="text-xs">Lido</Badge>
                              )}
                            </div>
                            <p className="text-sm">{alerta.mensagem}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum alerta registrado
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
