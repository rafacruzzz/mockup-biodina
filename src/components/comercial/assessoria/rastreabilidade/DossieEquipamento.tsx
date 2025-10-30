import { ArrowLeft, Download, Package, FileText, History, BarChart3, Phone, Mail, User, MapPin, Calendar, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Equipamento } from "@/types/equipamento";
import {
  getStatusEquipamentoColor,
  getStatusEquipamentoLabel,
  getMovimentacoesEquipamento,
  getTipoMovimentacaoLabel,
} from "@/data/equipamentos";
import { ordensServicoMock, getTipoOSLabel, getStatusColor } from "@/data/assessoria-cientifica";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DossieEquipamentoProps {
  equipamento: Equipamento;
  onVoltar: () => void;
}

export function DossieEquipamento({ equipamento, onVoltar }: DossieEquipamentoProps) {
  const movimentacoes = getMovimentacoesEquipamento(equipamento.id);
  const ordensServico = ordensServicoMock.filter(
    (os) => os.equipamentoId === equipamento.id
  );

  const getStatusBadge = (status: Equipamento["status"]) => {
    const colors = getStatusEquipamentoColor(status);
    return (
      <Badge
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        }}
        className="border text-sm px-3 py-1"
      >
        {getStatusEquipamentoLabel(status)}
      </Badge>
    );
  };

  const getOSStatusBadge = (status: any) => {
    const colors = getStatusColor(status);
    return (
      <Badge
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        }}
        className="border text-xs"
      >
        {status.replace("_", " ")}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const formatDateTime = (date: Date) => {
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  // Estatísticas
  const totalOS = ordensServico.length;
  const totalTreinamentos = ordensServico.filter((os) =>
    os.tipo.some((t) => t.includes("treinamento"))
  ).length;
  const totalManutencoes = ordensServico.filter((os) =>
    os.tipo.some((t) => t.includes("suporte"))
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Dossiê do Equipamento</h2>
            <p className="text-sm text-muted-foreground">
              Histórico completo e rastreabilidade
            </p>
          </div>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar Histórico (PDF)
        </Button>
      </div>

      {/* Seção 1: Identificação (Cabeçalho) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">{equipamento.modelo}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Nº de Série: {equipamento.numeroSerie}</span>
                <span className="text-muted-foreground">•</span>
                <span>Lote: {equipamento.lote}</span>
              </div>
            </div>
            {getStatusBadge(equipamento.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Box className="h-4 w-4" />
                <span className="font-medium">Cliente Atual</span>
              </div>
              <p className="text-sm pl-6">{equipamento.clienteAtual}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Setor</span>
              </div>
              <p className="text-sm pl-6">{equipamento.setorAlocacao}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">Responsável</span>
              </div>
              <p className="text-sm pl-6">{equipamento.responsavelCliente}</p>
            </div>
            {equipamento.contatoTelefone && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Telefone</span>
                </div>
                <p className="text-sm pl-6">{equipamento.contatoTelefone}</p>
              </div>
            )}
            {equipamento.contatoEmail && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">E-mail</span>
                </div>
                <p className="text-sm pl-6">{equipamento.contatoEmail}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Seção 2: Dados de Origem e Venda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dados de Origem e Venda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Data de Fabricação</p>
              <p className="text-sm font-medium">{formatDate(equipamento.dataFabricacao)}</p>
            </div>
            {equipamento.dataValidade && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Data de Validade</p>
                <p className="text-sm font-medium">{formatDate(equipamento.dataValidade)}</p>
              </div>
            )}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Data de Importação</p>
              <p className="text-sm font-medium">{formatDate(equipamento.dataImportacao)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Condição</p>
              <Badge variant="outline" className="capitalize">
                {equipamento.statusOrigem === "novo" ? "Novo" : "Recondicionado"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seção 3: Histórico de Movimentações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Histórico de Movimentações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movimentacoes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma movimentação registrada
                </p>
              ) : (
                movimentacoes.map((mov) => (
                  <div key={mov.id} className="flex gap-4 border-l-2 border-primary pl-4 py-2">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {getTipoMovimentacaoLabel(mov.tipo)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(mov.data)}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{mov.destino}</p>
                      {mov.origem && (
                        <p className="text-xs text-muted-foreground">De: {mov.origem}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Responsável: {mov.responsavel}
                      </p>
                      {mov.observacoes && (
                        <p className="text-xs text-muted-foreground italic">{mov.observacoes}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Seção 5: BI e Relatórios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estatísticas e Indicadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-primary">{totalOS}</div>
                <div className="text-xs text-muted-foreground mt-1">Total de OS</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-chart-1">{totalTreinamentos}</div>
                <div className="text-xs text-muted-foreground mt-1">Treinamentos</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-chart-3">{totalManutencoes}</div>
                <div className="text-xs text-muted-foreground mt-1">Suporte Técnico</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-chart-2">-</div>
                <div className="text-xs text-muted-foreground mt-1">Tempo Médio Entre Falhas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção 4: Histórico de Intervenções (OS) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico de Intervenções (Ordens de Serviço)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nº da OS</TableHead>
                  <TableHead>Tipo de Serviço</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordensServico.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhuma ordem de serviço registrada para este equipamento
                    </TableCell>
                  </TableRow>
                ) : (
                  ordensServico
                    .sort((a, b) => b.abertoEm.getTime() - a.abertoEm.getTime())
                    .map((os) => (
                      <TableRow key={os.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>{formatDate(os.dataAgendada)}</TableCell>
                        <TableCell className="font-medium">{os.numero}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {os.tipo.map((t) => (
                              <Badge key={t} variant="outline" className="text-xs">
                                {getTipoOSLabel(t)}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{os.responsavel}</TableCell>
                        <TableCell>{getOSStatusBadge(os.status)}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
