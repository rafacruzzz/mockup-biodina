import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Eye, Calendar, TrendingUp, BarChart3, Lock, AlertTriangle, ChevronDown, ChevronRight, History, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  calcularCoberturaRepositorio, 
  getAtualizacoesPorPeriodo, 
  getDocumentosMaisAcessados,
  getVisualizacoesPorContexto,
  getTotalVisualizacoes,
  getAtualizacoesPorMarcaLinha,
  getChangelogRecente,
  getDocumentosBloqueados,
  getProximasRevalidacoes
} from "@/utils/biRepositorio";
import { produtosMock, marcasMock, linhasMock, documentosMockCompletos } from "@/data/produtos";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BiCoberturaTabProps {
  onVoltar: () => void;
}

export function BiCoberturaTab({ onVoltar }: BiCoberturaTabProps) {
  const [dataInicio, setDataInicio] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);
  const [expandedMarcas, setExpandedMarcas] = useState<string[]>([]);

  const metricas = calcularCoberturaRepositorio(produtosMock, documentosMockCompletos);
  const atualizacoes = getAtualizacoesPorPeriodo(new Date(dataInicio), new Date(dataFim), documentosMockCompletos);
  const documentosMaisAcessados = getDocumentosMaisAcessados(5);
  const visualizacoesPorContexto = getVisualizacoesPorContexto();
  const totalVisualizacoes = getTotalVisualizacoes();
  const marcaLinhaStats = getAtualizacoesPorMarcaLinha(marcasMock, linhasMock, produtosMock, documentosMockCompletos);
  const changelogRecente = getChangelogRecente(documentosMockCompletos, 10);
  const docsBloqueados = getDocumentosBloqueados(documentosMockCompletos);
  const proximasRevalidacoes = getProximasRevalidacoes(documentosMockCompletos, 60);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const toggleMarca = (marcaId: string) => {
    setExpandedMarcas(prev => 
      prev.includes(marcaId) ? prev.filter(id => id !== marcaId) : [...prev, marcaId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onVoltar}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">BI & Cobertura do Repositório</h2>
            <p className="text-sm text-muted-foreground">Análise de completude e uso da base de conhecimento</p>
          </div>
        </div>
      </div>

      {/* Cards de Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{produtosMock.length}</div>
            <p className="text-xs text-muted-foreground">No repositório</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisualizacoes}</div>
            <p className="text-xs text-muted-foreground">Documentos acessados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(metricas.reduce((sum, m) => sum + m.percentual, 0) / metricas.length)}%
            </div>
            <p className="text-xs text-muted-foreground">De documentação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Período Analisado</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atualizacoes.length}</div>
            <p className="text-xs text-muted-foreground">Dias com atividade</p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard de Cobertura */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Cobertura do Repositório por Tipo de Documento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" angle={-45} textAnchor="end" height={100} />
              <YAxis label={{ value: '% Cobertura', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="percentual" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {metricas.map((metrica) => (
              <div key={metrica.tipo} className="space-y-2">
                <div className="text-sm font-medium">{metrica.tipo}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{metrica.percentual}%</span>
                  <span className="text-xs text-muted-foreground">
                    {metrica.comDocumento}/{metrica.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Atualizações por Período */}
      <Card>
        <CardHeader>
          <CardTitle>Atualizações por Período</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input id="dataInicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input id="dataFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={atualizacoes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uploads" fill="hsl(var(--chart-2))" name="Novos Uploads" />
              <Bar dataKey="alteracoes" fill="hsl(var(--chart-3))" name="Alterações" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Atualizações por Marca/Linha */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Atualizações por Marca / Linha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {marcaLinhaStats.map((marca) => (
              <Collapsible key={marca.marcaId} open={expandedMarcas.includes(marca.marcaId)}>
                <CollapsibleTrigger asChild>
                  <div
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleMarca(marca.marcaId)}
                  >
                    <div className="flex items-center gap-3">
                      {expandedMarcas.includes(marca.marcaId) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="font-semibold">{marca.marcaNome}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{marca.totalProdutos}</div>
                        <div className="text-xs text-muted-foreground">Produtos</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{marca.totalDocumentos}</div>
                        <div className="text-xs text-muted-foreground">Documentos</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{marca.coberturaMedia}%</div>
                        <div className="text-xs text-muted-foreground">Cobertura</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{marca.atualizacoesTotais}</div>
                        <div className="text-xs text-muted-foreground">Atualizações</div>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-8 mt-2 space-y-1">
                    {marca.linhas.map((linha) => (
                      <div key={linha.linhaId} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                        <span className="text-sm font-medium">{linha.linhaNome}</span>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <span className="font-medium">{linha.totalProdutos}</span>
                            <span className="text-xs text-muted-foreground ml-1">prod.</span>
                          </div>
                          <div className="text-center">
                            <span className="font-medium">{linha.totalDocumentos}</span>
                            <span className="text-xs text-muted-foreground ml-1">docs</span>
                          </div>
                          <Badge variant={linha.cobertura >= 80 ? "default" : linha.cobertura >= 50 ? "secondary" : "destructive"}>
                            {linha.cobertura}%
                          </Badge>
                          <span className="text-xs text-muted-foreground">{linha.atualizacoesNoPeriodo} atualiz.</span>
                        </div>
                      </div>
                    ))}
                    {marca.linhas.length === 0 && (
                      <p className="text-sm text-muted-foreground p-3">Nenhuma linha cadastrada</p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Uso em OS/Licitações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Mais Acessados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentosMaisAcessados.map((doc, index) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{doc.titulo}</div>
                      <div className="text-xs text-muted-foreground">{doc.produtoNome}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.contexto === 'OS' ? 'default' : 'secondary'}>
                      {doc.contexto}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Eye className="h-4 w-4" />
                      {doc.visualizacoes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visualizações por Contexto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={visualizacoesPorContexto}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={({ contexto, total }) => `${contexto}: ${total}`}
                  outerRadius={80} fill="#8884d8" dataKey="total"
                >
                  {visualizacoesPorContexto.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {visualizacoesPorContexto.map((item, index) => (
                <div key={item.contexto} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm font-medium">{item.contexto}</span>
                  </div>
                  <span className="text-sm font-bold">{item.total} visualizações</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Versionamento e Rastreabilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Versionamento e Rastreabilidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">{documentosMockCompletos.filter(d => d.historicoVersoes && d.historicoVersoes.length > 0).length}</div>
              <p className="text-xs text-muted-foreground">Artefatos com versões</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">{changelogRecente.length}</div>
              <p className="text-xs text-muted-foreground">Changelogs registrados</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">{docsBloqueados.length}</div>
              <p className="text-xs text-muted-foreground">Docs com trava normativa</p>
            </div>
          </div>

          {/* Changelog Recente */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Últimas Alterações (Changelog)
            </h4>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artefato</TableHead>
                    <TableHead>Versão</TableHead>
                    <TableHead>O que mudou</TableHead>
                    <TableHead>Por que mudou</TableHead>
                    <TableHead>Aprovado por</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {changelogRecente.map((cl) => (
                    <TableRow key={cl.id}>
                      <TableCell className="font-medium text-sm">{cl.documentoTitulo}</TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{cl.versaoAnterior}</span>
                        <span className="mx-1">→</span>
                        <span className="font-semibold">{cl.versaoNova}</span>
                      </TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">{cl.oqueMudou}</TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">{cl.porqueMudou}</TableCell>
                      <TableCell className="text-sm">{cl.aprovadoPor || '—'}</TableCell>
                      <TableCell className="text-sm">{new Date(cl.alteradoEm).toLocaleDateString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                  {changelogRecente.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                        Nenhum changelog registrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Documentos com Trava Normativa */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Documentos com Trava Normativa (IFU/POP)
            </h4>
            <div className="space-y-2">
              {docsBloqueados.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="h-4 w-4 text-amber-500" />
                    <div>
                      <div className="font-medium text-sm">{doc.titulo}</div>
                      <div className="text-xs text-muted-foreground">Versão atual: {doc.versao}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-destructive text-destructive">
                    Somente Nova Versão
                  </Badge>
                </div>
              ))}
              {docsBloqueados.length === 0 && (
                <p className="text-sm text-muted-foreground p-3">Nenhum documento com trava normativa</p>
              )}
            </div>
          </div>

          {/* Próximas Revalidações */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Próximas Revalidações (60 dias)
            </h4>
            <div className="space-y-2">
              {proximasRevalidacoes.map((doc) => {
                const dias = Math.ceil((doc.dataProximaRevalidacao!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isUrgente = dias <= 15;
                return (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{doc.titulo}</div>
                      <div className="text-xs text-muted-foreground">Versão: {doc.versao}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {doc.dataProximaRevalidacao!.toLocaleDateString('pt-BR')}
                      </span>
                      <Badge variant={isUrgente ? "destructive" : "secondary"}>
                        {dias <= 0 ? 'Vencido' : `${dias} dias`}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {proximasRevalidacoes.length === 0 && (
                <p className="text-sm text-muted-foreground p-3">Nenhuma revalidação próxima</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
