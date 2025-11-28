import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Download, Search, Eye, Edit, Trash2, CheckCircle, XCircle, Upload as UploadIcon, Download as DownloadIcon } from 'lucide-react';
import { RegistroAuditoria, TipoAcaoAuditoria } from '@/types/rt';
import { useState } from 'react';

interface TrilhaAuditoriaSectionProps {
  registros: RegistroAuditoria[];
}

export const TrilhaAuditoriaSection = ({ registros }: TrilhaAuditoriaSectionProps) => {
  const [filtroAcao, setFiltroAcao] = useState<string>('todas');
  const [filtroModulo, setFiltroModulo] = useState<string>('todos');
  const [busca, setBusca] = useState('');

  const getIconeAcao = (acao: TipoAcaoAuditoria) => {
    switch (acao) {
      case 'visualizacao':
        return <Eye className="h-4 w-4" />;
      case 'criacao':
        return <FileText className="h-4 w-4" />;
      case 'edicao':
        return <Edit className="h-4 w-4" />;
      case 'exclusao':
        return <Trash2 className="h-4 w-4" />;
      case 'aprovacao':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejeicao':
        return <XCircle className="h-4 w-4" />;
      case 'upload':
        return <UploadIcon className="h-4 w-4" />;
      case 'download':
        return <DownloadIcon className="h-4 w-4" />;
    }
  };

  const getAcaoBadge = (acao: TipoAcaoAuditoria) => {
    const variants: Record<TipoAcaoAuditoria, { className: string; label: string }> = {
      visualizacao: { className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', label: 'Visualização' },
      criacao: { className: 'bg-success/10 text-success border-success/20', label: 'Criação' },
      edicao: { className: 'bg-warning/10 text-warning border-warning/20', label: 'Edição' },
      exclusao: { className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Exclusão' },
      aprovacao: { className: 'bg-success/10 text-success border-success/20', label: 'Aprovação' },
      rejeicao: { className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Rejeição' },
      upload: { className: 'bg-primary/10 text-primary border-primary/20', label: 'Upload' },
      download: { className: 'bg-secondary/10 text-secondary-foreground border-secondary/20', label: 'Download' }
    };

    const config = variants[acao];
    return (
      <Badge variant="outline" className={config.className}>
        <span className="flex items-center gap-1">
          {getIconeAcao(acao)}
          {config.label}
        </span>
      </Badge>
    );
  };

  // Filtrar registros
  const registrosFiltrados = registros.filter(reg => {
    const matchAcao = filtroAcao === 'todas' || reg.acao === filtroAcao;
    const matchModulo = filtroModulo === 'todos' || reg.modulo === filtroModulo;
    const matchBusca = busca === '' || 
      reg.usuario.toLowerCase().includes(busca.toLowerCase()) ||
      reg.recurso.toLowerCase().includes(busca.toLowerCase()) ||
      reg.detalhes?.toLowerCase().includes(busca.toLowerCase());
    
    return matchAcao && matchModulo && matchBusca;
  });

  // Obter módulos únicos
  const modulosUnicos = Array.from(new Set(registros.map(r => r.modulo)));

  const handleExportar = () => {
    // Simulação de exportação
    console.log('Exportando trilha de auditoria...');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Trilha de Auditoria
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleExportar}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filtroAcao} onValueChange={setFiltroAcao}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Ações</SelectItem>
                <SelectItem value="visualizacao">Visualização</SelectItem>
                <SelectItem value="criacao">Criação</SelectItem>
                <SelectItem value="edicao">Edição</SelectItem>
                <SelectItem value="exclusao">Exclusão</SelectItem>
                <SelectItem value="aprovacao">Aprovação</SelectItem>
                <SelectItem value="rejeicao">Rejeição</SelectItem>
                <SelectItem value="upload">Upload</SelectItem>
                <SelectItem value="download">Download</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroModulo} onValueChange={setFiltroModulo}>
              <SelectTrigger>
                <SelectValue placeholder="Módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Módulos</SelectItem>
                {modulosUnicos.map(modulo => (
                  <SelectItem key={modulo} value={modulo}>
                    {modulo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {registrosFiltrados.length} registro{registrosFiltrados.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>

          {/* Tabela de Registros */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum registro encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  registrosFiltrados.map((registro) => (
                    <TableRow key={registro.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        {registro.dataHora}
                      </TableCell>
                      <TableCell className="font-medium">{registro.usuario}</TableCell>
                      <TableCell>{getAcaoBadge(registro.acao)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{registro.modulo}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{registro.recurso}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                        {registro.detalhes || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Nota sobre imutabilidade */}
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>
                <strong>Registro Imutável:</strong> Todos os registros da trilha de auditoria são permanentes e não podem ser alterados ou excluídos.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
