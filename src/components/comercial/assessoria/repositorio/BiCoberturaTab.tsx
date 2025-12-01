import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Eye, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  calcularCoberturaRepositorio, 
  getAtualizacoesPorPeriodo, 
  getDocumentosMaisAcessados,
  getVisualizacoesPorContexto,
  getTotalVisualizacoes
} from "@/utils/biRepositorio";
import { produtosMock } from "@/data/produtos";
import { Badge } from "@/components/ui/badge";

interface BiCoberturaTabProps {
  onVoltar: () => void;
}

export function BiCoberturaTab({ onVoltar }: BiCoberturaTabProps) {
  const [dataInicio, setDataInicio] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);

  // Mock documentos para cálculo
  const documentosMock = [
    { id: '1', produtoId: 'prod1', tipo: 'catalogo' as const, titulo: 'Catálogo', versao: '1.0', idioma: 'pt-BR', dataUpload: new Date(), uploadPor: 'user', arquivo: 'file.pdf' },
    { id: '2', produtoId: 'prod1', tipo: 'manual' as const, titulo: 'Manual', versao: '1.0', idioma: 'pt-BR', dataUpload: new Date(), uploadPor: 'user', arquivo: 'file.pdf' },
    { id: '3', produtoId: 'prod1', tipo: 'ficha_tecnica' as const, titulo: 'Ficha', versao: '1.0', idioma: 'pt-BR', dataUpload: new Date(), uploadPor: 'user', arquivo: 'file.pdf' },
  ];

  const metricas = calcularCoberturaRepositorio(produtosMock, documentosMock);
  const atualizacoes = getAtualizacoesPorPeriodo(new Date(dataInicio), new Date(dataFim), documentosMock);
  const documentosMaisAcessados = getDocumentosMaisAcessados(5);
  const visualizacoesPorContexto = getVisualizacoesPorContexto();
  const totalVisualizacoes = getTotalVisualizacoes();

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

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
              <Input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
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

      {/* Uso em OS/Licitações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Documentos Mais Acessados */}
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

        {/* Visualizações por Contexto */}
        <Card>
          <CardHeader>
            <CardTitle>Visualizações por Contexto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={visualizacoesPorContexto}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ contexto, total }) => `${contexto}: ${total}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {visualizacoesPorContexto.map((entry, index) => (
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
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{item.contexto}</span>
                  </div>
                  <span className="text-sm font-bold">{item.total} visualizações</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
