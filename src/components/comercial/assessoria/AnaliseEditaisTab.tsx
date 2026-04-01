import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, AlertTriangle, Clock, Eye, TrendingUp, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { licitacoes } from "@/data/licitacaoData";
import { Licitacao } from "@/types/licitacao";
import { PainelAlertas } from "./PainelAlertas";
import { Alerta } from "@/types/assessoria-cientifica";

export function AnaliseEditaisTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedLicitacao, setSelectedLicitacao] = useState<Licitacao | null>(null);
  const [analiseTexto, setAnaliseTexto] = useState("");

  useEffect(() => {
    if (selectedLicitacao) {
      setAnaliseTexto(selectedLicitacao.analiseTecnica || "");
    }
  }, [selectedLicitacao]);

  const handleSalvarAnalise = () => {
    if (!selectedLicitacao) return;
    const idx = licitacoes.findIndex((l) => l.id === selectedLicitacao.id);
    if (idx !== -1) {
      licitacoes[idx].analiseTecnica = analiseTexto;
    }
    toast({
      title: "Análise salva",
      description: `Análise Técnica-Científica do pregão ${selectedLicitacao.numeroPregao} salva com sucesso.`,
    });
    setSelectedLicitacao(null);
  };

  // Filtrar licitações que solicitaram análise da Assessoria Científica
  const licitacoesComSolicitacaoAC = licitacoes.filter(
    (lic) => lic.solicitouAnaliseCientifica === true
  );

  // Gerar alertas para o PainelAlertas
  const alertasPainel: Alerta[] = licitacoesComSolicitacaoAC
    .filter((lic) => lic.status !== "finalizada")
    .map((lic) => {
      const dataSolicitacao = lic.dataSolicitacaoAC
        ? new Date(lic.dataSolicitacaoAC).toLocaleDateString("pt-BR")
        : "N/A";

      return {
        id: `alerta-edital-${lic.id}`,
        tipo: "prazo" as const,
        titulo: `Análise de Edital - ${lic.numeroPregao} - ${lic.nomeInstituicao}`,
        descricao: `Análise de Edital solicitada pela Licitação em ${dataSolicitacao} • ${lic.objetoLicitacao}`,
        dataCriacao: new Date(lic.dataSolicitacaoAC || lic.createdAt),
        prioridade: "alta" as const,
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


  // Filtrar licitações com solicitação AC
  const licitacoesFiltradas = licitacoesComSolicitacaoAC.filter((lic) => {
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

      {/* Alertas do Sistema */}
      {alertasPainel.length > 0 && (
        <PainelAlertas alertas={alertasPainel} />
      )}

      {/* Alertas para Análise */}
      {licitacoesComSolicitacaoAC.filter(lic => lic.status !== "finalizada").length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Alertas para Análise
              </CardTitle>
              <Badge variant="secondary">
                {licitacoesComSolicitacaoAC.filter(lic => lic.status !== "finalizada").length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {licitacoesComSolicitacaoAC
                .filter(lic => lic.status !== "finalizada")
                .map((lic) => (
                  <div
                    key={`analise-${lic.id}`}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedLicitacao(lic)}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1 text-blue-600">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {lic.numeroPregao} — {lic.nomeInstituicao}
                          </p>
                          <Badge className={getStatusColor(lic.status)}>
                            {getStatusLabel(lic.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate max-w-[600px]">
                          {lic.objetoLicitacao}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Solicitado em: {lic.dataSolicitacaoAC ? formatDate(lic.dataSolicitacaoAC) : "N/A"}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:bg-accent">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
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
                              <FileText className="h-4 w-4" />
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
                <div className="mt-1 text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedLicitacao.resumoEdital || '' }} />
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
