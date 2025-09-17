import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  FolderPlus, 
  Upload, 
  Folder, 
  FolderOpen, 
  FileText, 
  Edit2, 
  Trash2, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';
import { PastaAnvisa, ArquivoAnvisa } from '@/types/anvisaRegistro';
import { toast } from 'sonner';

interface FileSystemManagerProps {
  estruturaArquivos: PastaAnvisa[];
  onEstruturaChange: (estrutura: PastaAnvisa[]) => void;
}

export const FileSystemManager = ({ estruturaArquivos, onEstruturaChange }: FileSystemManagerProps) => {
  const [pastaSelecionada, setPastaSelecionada] = useState<string | null>(null);
  const [showNovaPastaDialog, setShowNovaPastaDialog] = useState(false);
  const [showEditarPastaDialog, setShowEditarPastaDialog] = useState(false);
  const [pastaParaEditar, setPastaParaEditar] = useState<PastaAnvisa | null>(null);
  const [nomePasta, setNomePasta] = useState('');
  const [subtituloPasta, setSubtituloPasta] = useState('');

  const criarNovaPasta = () => {
    if (!nomePasta.trim()) {
      toast.error('Nome da pasta é obrigatório');
      return;
    }

    const novaPasta: PastaAnvisa = {
      id: Date.now().toString(),
      nome: nomePasta,
      subtitulo: subtituloPasta || undefined,
      arquivos: [],
      subpastas: [],
      parentId: pastaSelecionada || undefined,
      isExpanded: false
    };

    if (pastaSelecionada) {
      // Adicionar como subpasta
      const novaEstrutura = adicionarSubpasta(estruturaArquivos, pastaSelecionada, novaPasta);
      onEstruturaChange(novaEstrutura);
    } else {
      // Adicionar como pasta raiz
      onEstruturaChange([...estruturaArquivos, novaPasta]);
    }

    setNomePasta('');
    setSubtituloPasta('');
    setShowNovaPastaDialog(false);
    toast.success('Pasta criada com sucesso');
  };

  const editarPasta = () => {
    if (!pastaParaEditar || !nomePasta.trim()) {
      toast.error('Nome da pasta é obrigatório');
      return;
    }

    const novaEstrutura = atualizarPasta(estruturaArquivos, pastaParaEditar.id, {
      nome: nomePasta,
      subtitulo: subtituloPasta || undefined
    });
    
    onEstruturaChange(novaEstrutura);
    setShowEditarPastaDialog(false);
    setPastaParaEditar(null);
    setNomePasta('');
    setSubtituloPasta('');
    toast.success('Pasta atualizada com sucesso');
  };

  const excluirPasta = (pastaId: string) => {
    const novaEstrutura = removerPasta(estruturaArquivos, pastaId);
    onEstruturaChange(novaEstrutura);
    if (pastaSelecionada === pastaId) {
      setPastaSelecionada(null);
    }
    toast.success('Pasta removida com sucesso');
  };

  const togglePasta = (pastaId: string) => {
    const novaEstrutura = toggleExpandirPasta(estruturaArquivos, pastaId);
    onEstruturaChange(novaEstrutura);
  };

  const adicionarArquivo = (pastaId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => {
          const novoArquivo: ArquivoAnvisa = {
            id: Date.now().toString() + Math.random().toString(36),
            nome: file.name,
            nomeOriginal: file.name,
            arquivo: file,
            tipo: file.type,
            tamanho: file.size,
            dataUpload: new Date()
          };

          const novaEstrutura = adicionarArquivoNaPasta(estruturaArquivos, pastaId, novoArquivo);
          onEstruturaChange(novaEstrutura);
        });
        toast.success(`${files.length} arquivo(s) adicionado(s) com sucesso`);
      }
    };
    
    input.click();
  };

  const removerArquivo = (pastaId: string, arquivoId: string) => {
    const novaEstrutura = removerArquivoDaPasta(estruturaArquivos, pastaId, arquivoId);
    onEstruturaChange(novaEstrutura);
    toast.success('Arquivo removido com sucesso');
  };

  const formatarTamanhoArquivo = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const encontrarPasta = (estrutura: PastaAnvisa[], pastaId: string): PastaAnvisa | null => {
    for (const pasta of estrutura) {
      if (pasta.id === pastaId) return pasta;
      const encontrada = encontrarPasta(pasta.subpastas, pastaId);
      if (encontrada) return encontrada;
    }
    return null;
  };

  const pastaSelecionadaObj = pastaSelecionada ? encontrarPasta(estruturaArquivos, pastaSelecionada) : null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Organização de Documentos
            </span>
            <Button
              onClick={() => {
                setNomePasta('');
                setSubtituloPasta('');
                setShowNovaPastaDialog(true);
              }}
              size="sm"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Nova Pasta
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Árvore de Pastas */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Estrutura de Pastas</h4>
              <div className="border rounded-lg p-3 max-h-96 overflow-y-auto">
                {estruturaArquivos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhuma pasta criada</p>
                  </div>
                ) : (
                  <TreeView
                    pastas={estruturaArquivos}
                    pastaSelecionada={pastaSelecionada}
                    onSelecionarPasta={setPastaSelecionada}
                    onTogglePasta={togglePasta}
                    onEditarPasta={(pasta) => {
                      setPastaParaEditar(pasta);
                      setNomePasta(pasta.nome);
                      setSubtituloPasta(pasta.subtitulo || '');
                      setShowEditarPastaDialog(true);
                    }}
                    onExcluirPasta={excluirPasta}
                  />
                )}
              </div>
            </div>

            {/* Arquivos da Pasta Selecionada */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-muted-foreground">
                  {pastaSelecionadaObj ? `Arquivos em: ${pastaSelecionadaObj.nome}` : 'Selecione uma pasta'}
                </h4>
                {pastaSelecionada && (
                  <Button
                    onClick={() => adicionarArquivo(pastaSelecionada)}
                    size="sm"
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>
              
              <div className="border rounded-lg p-3 max-h-96 overflow-y-auto">
                {!pastaSelecionadaObj ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Selecione uma pasta para ver os arquivos</p>
                  </div>
                ) : pastaSelecionadaObj.arquivos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum arquivo nesta pasta</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pastaSelecionadaObj.arquivos.map((arquivo) => (
                      <div key={arquivo.id} className="flex items-center justify-between p-2 border rounded hover:bg-muted/50">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{arquivo.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatarTamanhoArquivo(arquivo.tamanho)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerArquivo(pastaSelecionada, arquivo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Nova Pasta */}
      <Dialog open={showNovaPastaDialog} onOpenChange={setShowNovaPastaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Pasta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome da Pasta *</label>
              <Input
                value={nomePasta}
                onChange={(e) => setNomePasta(e.target.value)}
                placeholder="Digite o nome da pasta"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtítulo (opcional)</label>
              <Textarea
                value={subtituloPasta}
                onChange={(e) => setSubtituloPasta(e.target.value)}
                placeholder="Descrição ou subtítulo da pasta"
                rows={3}
              />
            </div>
            {pastaSelecionada && (
              <p className="text-sm text-muted-foreground">
                Será criada dentro de: {pastaSelecionadaObj?.nome}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovaPastaDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={criarNovaPasta}>Criar Pasta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Editar Pasta */}
      <Dialog open={showEditarPastaDialog} onOpenChange={setShowEditarPastaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Pasta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome da Pasta *</label>
              <Input
                value={nomePasta}
                onChange={(e) => setNomePasta(e.target.value)}
                placeholder="Digite o nome da pasta"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtítulo (opcional)</label>
              <Textarea
                value={subtituloPasta}
                onChange={(e) => setSubtituloPasta(e.target.value)}
                placeholder="Descrição ou subtítulo da pasta"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditarPastaDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={editarPasta}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Componente TreeView para exibir a árvore de pastas
interface TreeViewProps {
  pastas: PastaAnvisa[];
  pastaSelecionada: string | null;
  onSelecionarPasta: (pastaId: string) => void;
  onTogglePasta: (pastaId: string) => void;
  onEditarPasta: (pasta: PastaAnvisa) => void;
  onExcluirPasta: (pastaId: string) => void;
  level?: number;
}

const TreeView = ({ 
  pastas, 
  pastaSelecionada, 
  onSelecionarPasta, 
  onTogglePasta, 
  onEditarPasta, 
  onExcluirPasta, 
  level = 0 
}: TreeViewProps) => {
  return (
    <div className={level > 0 ? 'ml-4' : ''}>
      {pastas.map((pasta) => (
        <div key={pasta.id} className="space-y-1">
          <div
            className={`flex items-center gap-1 p-2 rounded cursor-pointer hover:bg-muted/50 ${
              pastaSelecionada === pasta.id ? 'bg-muted' : ''
            }`}
            onClick={() => onSelecionarPasta(pasta.id)}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePasta(pasta.id);
              }}
            >
              {pasta.subpastas.length > 0 ? (
                pasta.isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )
              ) : (
                <div className="h-3 w-3" />
              )}
            </Button>
            
            {pasta.isExpanded ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-blue-500" />
            )}
            
            <span className="flex-1 text-sm truncate">{pasta.nome}</span>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditarPasta(pasta);
                }}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onExcluirPasta(pasta.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {pasta.isExpanded && pasta.subpastas.length > 0 && (
            <TreeView
              pastas={pasta.subpastas}
              pastaSelecionada={pastaSelecionada}
              onSelecionarPasta={onSelecionarPasta}
              onTogglePasta={onTogglePasta}
              onEditarPasta={onEditarPasta}
              onExcluirPasta={onExcluirPasta}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Funções auxiliares para manipular a estrutura de pastas
const adicionarSubpasta = (estrutura: PastaAnvisa[], parentId: string, novaPasta: PastaAnvisa): PastaAnvisa[] => {
  return estrutura.map(pasta => {
    if (pasta.id === parentId) {
      return {
        ...pasta,
        subpastas: [...pasta.subpastas, novaPasta],
        isExpanded: true
      };
    }
    return {
      ...pasta,
      subpastas: adicionarSubpasta(pasta.subpastas, parentId, novaPasta)
    };
  });
};

const atualizarPasta = (estrutura: PastaAnvisa[], pastaId: string, updates: Partial<PastaAnvisa>): PastaAnvisa[] => {
  return estrutura.map(pasta => {
    if (pasta.id === pastaId) {
      return { ...pasta, ...updates };
    }
    return {
      ...pasta,
      subpastas: atualizarPasta(pasta.subpastas, pastaId, updates)
    };
  });
};

const removerPasta = (estrutura: PastaAnvisa[], pastaId: string): PastaAnvisa[] => {
  return estrutura
    .filter(pasta => pasta.id !== pastaId)
    .map(pasta => ({
      ...pasta,
      subpastas: removerPasta(pasta.subpastas, pastaId)
    }));
};

const toggleExpandirPasta = (estrutura: PastaAnvisa[], pastaId: string): PastaAnvisa[] => {
  return estrutura.map(pasta => {
    if (pasta.id === pastaId) {
      return { ...pasta, isExpanded: !pasta.isExpanded };
    }
    return {
      ...pasta,
      subpastas: toggleExpandirPasta(pasta.subpastas, pastaId)
    };
  });
};

const adicionarArquivoNaPasta = (estrutura: PastaAnvisa[], pastaId: string, novoArquivo: ArquivoAnvisa): PastaAnvisa[] => {
  return estrutura.map(pasta => {
    if (pasta.id === pastaId) {
      return {
        ...pasta,
        arquivos: [...pasta.arquivos, novoArquivo]
      };
    }
    return {
      ...pasta,
      subpastas: adicionarArquivoNaPasta(pasta.subpastas, pastaId, novoArquivo)
    };
  });
};

const removerArquivoDaPasta = (estrutura: PastaAnvisa[], pastaId: string, arquivoId: string): PastaAnvisa[] => {
  return estrutura.map(pasta => {
    if (pasta.id === pastaId) {
      return {
        ...pasta,
        arquivos: pasta.arquivos.filter(arquivo => arquivo.id !== arquivoId)
      };
    }
    return {
      ...pasta,
      subpastas: removerArquivoDaPasta(pasta.subpastas, pastaId, arquivoId)
    };
  });
};