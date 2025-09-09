import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Folder, File, Search, Download, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Politica } from '@/types/ti';

// Mock data para políticas
const mockPoliticas: Politica[] = [
  {
    id: 'pol-001',
    titulo: 'Política de Segurança da Informação',
    categoria: '01. Políticas de Segurança da Informação',
    versao: '2.1',
    dataPublicacao: '2024-01-15',
    arquivo: 'politica-seguranca-informacao-v2.1.pdf',
    responsavel: 'CISO - Carlos Silva',
    status: 'ativo'
  },
  {
    id: 'pol-002',
    titulo: 'Controle de Acesso a Sistemas',
    categoria: '01. Políticas de Segurança da Informação',
    versao: '1.5',
    dataPublicacao: '2024-01-10',
    arquivo: 'controle-acesso-sistemas-v1.5.pdf',
    responsavel: 'TI - Maria Santos',
    status: 'ativo'
  },
  {
    id: 'pol-003',
    titulo: 'Política de Backup Corporativo',
    categoria: '02. Políticas de Backup e Recuperação',
    versao: '3.0',
    dataPublicacao: '2023-12-20',
    arquivo: 'politica-backup-v3.0.pdf',
    responsavel: 'Infraestrutura - João Tech',
    status: 'ativo'
  },
  {
    id: 'pol-004',
    titulo: 'Procedimentos de Recuperação de Desastres',
    categoria: '02. Políticas de Backup e Recuperação',
    versao: '2.3',
    dataPublicacao: '2023-11-15',
    arquivo: 'procedimentos-disaster-recovery-v2.3.pdf',
    responsavel: 'Infraestrutura - João Tech',
    status: 'revisao'
  },
  {
    id: 'pol-005',
    titulo: 'Solicitação de Equipamentos de TI',
    categoria: '03. Procedimentos de Solicitação de Equipamentos',
    versao: '1.8',
    dataPublicacao: '2024-01-05',
    arquivo: 'solicitacao-equipamentos-v1.8.pdf',
    responsavel: 'Gestão TI - Ana Costa',
    status: 'ativo'
  },
  {
    id: 'pol-006',
    titulo: 'Boas Práticas de Desenvolvimento',
    categoria: '04. Guias de Boas Práticas',
    versao: '4.2',
    dataPublicacao: '2023-10-30',
    arquivo: 'boas-praticas-dev-v4.2.pdf',
    responsavel: 'Desenvolvimento - Pedro Silva',
    status: 'ativo'
  }
];

const categorias = [
  '01. Políticas de Segurança da Informação',
  '02. Políticas de Backup e Recuperação',
  '03. Procedimentos de Solicitação de Equipamentos',
  '04. Guias de Boas Práticas'
];

const BibliotecaPoliticas: React.FC = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(categorias[0]);
  const [politicaSelecionada, setPoliticaSelecionada] = useState<Politica | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  const politicasFiltradas = mockPoliticas.filter(politica => {
    const matchCategoria = politica.categoria === categoriaSelecionada;
    const matchBusca = !termoBusca || 
      politica.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      politica.responsavel.toLowerCase().includes(termoBusca.toLowerCase());
    
    return matchCategoria && matchBusca;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ativo': return 'default';
      case 'revisao': return 'secondary';
      case 'obsoleto': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'revisao': return 'Em Revisão';
      case 'obsoleto': return 'Obsoleto';
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader>
          <CardTitle>Biblioteca de Políticas e Procedimentos de TI</CardTitle>
          <CardDescription>
            Repositório central de documentos de governança de TI
          </CardDescription>
          
          {/* Barra de Busca */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar em políticas e procedimentos..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent className="flex gap-6 h-full">
          {/* Coluna Esquerda - Navegação */}
          <div className="w-80 border-r pr-6">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {categorias.map((categoria) => {
                  const qtdPoliticas = mockPoliticas.filter(p => p.categoria === categoria).length;
                  
                  return (
                    <div
                      key={categoria}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors",
                        categoriaSelecionada === categoria 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => setCategoriaSelecionada(categoria)}
                    >
                      <Folder className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{categoria}</div>
                        <div className="text-xs opacity-80">{qtdPoliticas} documento(s)</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Coluna Direita - Conteúdo */}
          <div className="flex-1">
            {politicaSelecionada ? (
              // Visualizador de Documento
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{politicaSelecionada.titulo}</h3>
                    <p className="text-sm text-muted-foreground">
                      Versão {politicaSelecionada.versao} • {politicaSelecionada.responsavel}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(politicaSelecionada.status)}>
                      {getStatusLabel(politicaSelecionada.status)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPoliticaSelecionada(null)}>
                      Fechar
                    </Button>
                  </div>
                </div>

                {/* Área do visualizador de PDF */}
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center space-y-2">
                    <File className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Visualizador de PDF será carregado aqui
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {politicaSelecionada.arquivo}
                    </p>
                  </div>
                </div>

                {/* Metadados do documento */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Data de Publicação</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(politicaSelecionada.dataPublicacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Última Revisão</p>
                    <p className="text-sm text-muted-foreground">
                      {politicaSelecionada.dataRevisao 
                        ? new Date(politicaSelecionada.dataRevisao).toLocaleDateString('pt-BR')
                        : 'Não disponível'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Lista de Políticas
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{categoriaSelecionada}</h3>
                  <span className="text-sm text-muted-foreground">
                    {politicasFiltradas.length} documento(s) encontrado(s)
                  </span>
                </div>

                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {politicasFiltradas.map((politica) => (
                      <Card key={politica.id} className="cursor-pointer hover:bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <File className="h-4 w-4 text-muted-foreground" />
                                <h4 className="font-medium">{politica.titulo}</h4>
                                <Badge variant={getStatusBadgeVariant(politica.status)} className="text-xs">
                                  {getStatusLabel(politica.status)}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p>Versão {politica.versao} • {politica.responsavel}</p>
                                <p>Publicado em {new Date(politica.dataPublicacao).toLocaleDateString('pt-BR')}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setPoliticaSelecionada(politica)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BibliotecaPoliticas;