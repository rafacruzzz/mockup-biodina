import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, FileText, AlertTriangle, Clock, ExternalLink, Eye, TrendingUp } from "lucide-react";
import { licitacoes } from "@/data/licitacaoData";
import { Licitacao } from "@/types/licitacao";

export function AnaliseEditaisTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedLicitacao, setSelectedLicitacao] = useState<Licitacao | null>(null);

  // Filtrar licitações em andamento (não finalizadas)
  const licitacoesEmAndamento = licitacoes.filter(
    (lic) => lic.status !== "finalizada"
  );

  // Gerar alertas para análises
  const alertas = licitacoesEmAndamento
    .filter((lic) => {
      const dataAbertura = new Date(lic.dataAbertura);
      const hoje = new Date();
      const diasAteAbertura = Math.ceil(
        (dataAbertura.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Alertas para licitações próximas ou que precisam atenção
      return (
        diasAteAbertura <= 7 ||
        lic.status === "triagem" ||
        lic.estrategiaRisco === "alto"
      );
    })
    .map((lic) => {
      const dataAbertura = new Date(lic.dataAbertura);
      const hoje = new Date();
      const diasAteAbertura = Math.ceil(
        (dataAbertura.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
      );

      let tipo: "prazo" | "analise" | "risco" = "analise";
      let mensagem = "";

      if (diasAteAbertura <= 7 && diasAteAbertura > 0) {
        tipo = "prazo";
        mensagem = `Abertura em ${diasAteAbertura} dia${diasAteAbertura !== 1 ? "s" : ""}`;
      } else if (diasAteAbertura <= 0) {
        tipo = "prazo";
        mensagem = "Aberta hoje ou vencida";
      } else if (lic.status === "triagem") {
        tipo = "analise";
        mensagem = "Aguardando análise técnica";
      } else if (lic.estrategiaRisco === "alto") {
        tipo = "risco";
        mensagem = "Licitação de alto risco";
      }

      return {
        licitacao: lic,
        tipo,
        mensagem,
        prioridade: tipo === "prazo" ? "alta" : tipo === "risco" ? "media" : "baixa",
      };
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "triagem":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "acompanhamento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "convertida":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "triagem":
        return "Em Triagem";
      case "acompanhamento":
        return "Em Acompanhamento";
      case "convertida":
        return "Convertida";
      case "finalizada":
        return "Finalizada";
      default:
        return status;
    }
  };

  const getRiscoColor = (risco?: string) => {
    switch (risco) {
      case "baixo":
        return "text-green-600";
      case "medio":
        return "text-yellow-600";
      case "alto":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case "prazo":
        return <Clock className="h-4 w-4" />;
      case "risco":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (prioridade: string): "default" | "destructive" => {
    return prioridade === "alta" ? "destructive" : "default";
  };

  // Filtrar licitações
  const licitacoesFiltradas = licitacoesEmAndamento.filter((lic) => {
    const matchSearch =
      searchTerm === "" ||
      lic.numeroPregao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.nomeInstituicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.objetoLicitacao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "todos" || lic.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const formatCurrency = (value?: number) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Análise de Editais</h2>
        <p className="text-muted-foreground">
          Acompanhe licitações em andamento e receba alertas para análises técnicas.
        </p>
      </div>

      {/* Alertas */}
      {alertas.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Alertas para Análise ({alertas.length})
          </h3>
          <div className="grid gap-3">
            {alertas.map((alerta, index) => (
              <Alert key={index} variant={getAlertVariant(alerta.prioridade)}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alerta.tipo)}
                  <div className="flex-1">
                    <AlertTitle className="mb-1">
                      {alerta.licitacao.numeroPregao} - {alerta.licitacao.nomeInstituicao}
                    </AlertTitle>
                    <AlertDescription>
                      {alerta.mensagem} • {alerta.licitacao.objetoLicitacao}
                    </AlertDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedLicitacao(alerta.licitacao)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalhes
                  </Button>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Licitações em Andamento ({licitacoesFiltradas.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pregão, instituição ou objeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="triagem">Em Triagem</SelectItem>
                <SelectItem value="acompanhamento">Em Acompanhamento</SelectItem>
                <SelectItem value="convertida">Convertida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela de Licitações */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pregão</TableHead>
                  <TableHead>Instituição</TableHead>
                  <TableHead>UF</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risco</TableHead>
                  <TableHead>Abertura</TableHead>
                  <TableHead className="text-right">Valor Final</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licitacoesFiltradas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      Nenhuma licitação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  licitacoesFiltradas.map((lic) => (
                    <TableRow key={lic.id}>
                      <TableCell className="font-medium">
                        {lic.numeroPregao}
                      </TableCell>
                      <TableCell>{lic.nomeInstituicao}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lic.uf}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {lic.objetoLicitacao}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lic.status)}>
                          {getStatusLabel(lic.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={getRiscoColor(lic.estrategiaRisco)}>
                          {lic.estrategiaRisco?.toUpperCase() || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(lic.dataAbertura)}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(lic.estrategiaValorFinal)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {lic.linkEdital && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(lic.linkEdital, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedLicitacao(lic)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes - Simplificado */}
      {selectedLicitacao && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedLicitacao(null)}
        >
          <Card
            className="max-w-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedLicitacao.numeroPregao}</span>
                <Badge className={getStatusColor(selectedLicitacao.status)}>
                  {getStatusLabel(selectedLicitacao.status)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Instituição
                  </label>
                  <p className="font-medium">{selectedLicitacao.nomeInstituicao}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Localização
                  </label>
                  <p className="font-medium">
                    {selectedLicitacao.municipio} - {selectedLicitacao.uf}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Data de Abertura
                  </label>
                  <p className="font-medium">
                    {formatDate(selectedLicitacao.dataAbertura)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Risco Estratégico
                  </label>
                  <p className={`font-medium ${getRiscoColor(selectedLicitacao.estrategiaRisco)}`}>
                    {selectedLicitacao.estrategiaRisco?.toUpperCase() || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Objeto da Licitação
                </label>
                <p className="mt-1">{selectedLicitacao.objetoLicitacao}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Resumo do Edital
                </label>
                <p className="mt-1 text-sm">{selectedLicitacao.resumoEdital}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Análise Técnica
                </label>
                <p className="mt-1 text-sm">{selectedLicitacao.analiseTecnica}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Valor de Entrada
                  </label>
                  <p className="font-medium">
                    {formatCurrency(selectedLicitacao.estrategiaValorEntrada)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Valor Final
                  </label>
                  <p className="font-medium">
                    {formatCurrency(selectedLicitacao.estrategiaValorFinal)}
                  </p>
                </div>
              </div>

              {selectedLicitacao.estrategiaObjetivo && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Objetivo Estratégico
                  </label>
                  <p className="mt-1 text-sm">{selectedLicitacao.estrategiaObjetivo}</p>
                </div>
              )}

              {selectedLicitacao.observacoes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Observações
                  </label>
                  <p className="mt-1 text-sm">{selectedLicitacao.observacoes}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                {selectedLicitacao.linkEdital && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedLicitacao.linkEdital, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Edital
                  </Button>
                )}
                <Button onClick={() => setSelectedLicitacao(null)}>Fechar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
