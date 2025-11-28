import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Folder, 
  FolderOpen, 
  File, 
  Plus, 
  Upload, 
  Trash2, 
  Edit2,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { PastaRT } from "@/types/rt";
import { toast } from "@/components/ui/use-toast";

interface OrganizacaoDocumentosProps {
  titulo: string;
  estruturaPastas: PastaRT[];
  onEstruturaChange: (pastas: PastaRT[]) => void;
}

export const OrganizacaoDocumentos = ({
  titulo,
  estruturaPastas,
  onEstruturaChange
}: OrganizacaoDocumentosProps) => {
  const [pastaSelecionada, setPastaSelecionada] = useState<string | null>(null);
  const [showNovaPastaDialog, setShowNovaPastaDialog] = useState(false);
  const [showEditarPastaDialog, setShowEditarPastaDialog] = useState(false);
  const [nomePasta, setNomePasta] = useState("");
  const [subtituloPasta, setSubtituloPasta] = useState("");
  const [pastaEditando, setPastaEditando] = useState<string | null>(null);

  const toggleExpandirPasta = (pastaId: string) => {
    const atualizarPastas = (pastas: PastaRT[]): PastaRT[] => {
      return pastas.map(pasta => {
        if (pasta.id === pastaId) {
          return { ...pasta, expandido: !pasta.expandido };
        }
        if (pasta.subPastas) {
          return { ...pasta, subPastas: atualizarPastas(pasta.subPastas) };
        }
        return pasta;
      });
    };
    onEstruturaChange(atualizarPastas(estruturaPastas));
  };

  const buscarPasta = (pastaId: string, pastas: PastaRT[]): PastaRT | null => {
    for (const pasta of pastas) {
      if (pasta.id === pastaId) return pasta;
      if (pasta.subPastas) {
        const encontrada = buscarPasta(pastaId, pasta.subPastas);
        if (encontrada) return encontrada;
      }
    }
    return null;
  };

  const pastaSelecionadaObj = pastaSelecionada 
    ? buscarPasta(pastaSelecionada, estruturaPastas) 
    : null;

  const criarNovaPasta = () => {
    if (!nomePasta.trim()) {
      toast({
        title: "Erro",
        description: "O nome da pasta é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const novaPasta: PastaRT = {
      id: `pasta-${Date.now()}`,
      nome: nomePasta,
      subtitulo: subtituloPasta,
      pastaId: pastaSelecionada,
      arquivos: [],
      subPastas: [],
      expandido: false
    };

    if (pastaSelecionada) {
      // Adicionar como subpasta
      const atualizarPastas = (pastas: PastaRT[]): PastaRT[] => {
        return pastas.map(pasta => {
          if (pasta.id === pastaSelecionada) {
            return {
              ...pasta,
              subPastas: [...(pasta.subPastas || []), novaPasta]
            };
          }
          if (pasta.subPastas) {
            return { ...pasta, subPastas: atualizarPastas(pasta.subPastas) };
          }
          return pasta;
        });
      };
      onEstruturaChange(atualizarPastas(estruturaPastas));
    } else {
      // Adicionar na raiz
      onEstruturaChange([...estruturaPastas, novaPasta]);
    }

    setNomePasta("");
    setSubtituloPasta("");
    setShowNovaPastaDialog(false);
    toast({
      title: "Sucesso",
      description: "Pasta criada com sucesso"
    });
  };

  const editarPasta = () => {
    if (!nomePasta.trim() || !pastaEditando) return;

    const atualizarPastas = (pastas: PastaRT[]): PastaRT[] => {
      return pastas.map(pasta => {
        if (pasta.id === pastaEditando) {
          return { ...pasta, nome: nomePasta, subtitulo: subtituloPasta };
        }
        if (pasta.subPastas) {
          return { ...pasta, subPastas: atualizarPastas(pasta.subPastas) };
        }
        return pasta;
      });
    };

    onEstruturaChange(atualizarPastas(estruturaPastas));
    setNomePasta("");
    setSubtituloPasta("");
    setPastaEditando(null);
    setShowEditarPastaDialog(false);
    toast({
      title: "Sucesso",
      description: "Pasta atualizada com sucesso"
    });
  };

  const excluirPasta = (pastaId: string) => {
    const removerPasta = (pastas: PastaRT[]): PastaRT[] => {
      return pastas
        .filter(pasta => pasta.id !== pastaId)
        .map(pasta => ({
          ...pasta,
          subPastas: pasta.subPastas ? removerPasta(pasta.subPastas) : []
        }));
    };

    onEstruturaChange(removerPasta(estruturaPastas));
    if (pastaSelecionada === pastaId) {
      setPastaSelecionada(null);
    }
    toast({
      title: "Sucesso",
      description: "Pasta excluída com sucesso"
    });
  };

  const adicionarArquivo = () => {
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade de upload de arquivos em breve"
    });
  };

  const renderPasta = (pasta: PastaRT, nivel: number = 0) => {
    const isSelected = pastaSelecionada === pasta.id;
    const hasSubPastas = pasta.subPastas && pasta.subPastas.length > 0;

    return (
      <div key={pasta.id} style={{ marginLeft: `${nivel * 20}px` }}>
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-muted/50 group ${
            isSelected ? "bg-muted" : ""
          }`}
          onClick={() => setPastaSelecionada(pasta.id)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasSubPastas) toggleExpandirPasta(pasta.id);
            }}
            className="p-0.5 hover:bg-muted-foreground/10 rounded"
          >
            {hasSubPastas ? (
              pasta.expandido ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="w-4" />
            )}
          </button>
          
          {pasta.expandido ? (
            <FolderOpen className="h-5 w-5 text-primary" />
          ) : (
            <Folder className="h-5 w-5 text-primary" />
          )}
          
          <div className="flex-1">
            <div className="font-medium text-sm">{pasta.nome}</div>
            {pasta.subtitulo && (
              <div className="text-xs text-muted-foreground">{pasta.subtitulo}</div>
            )}
          </div>

          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setPastaEditando(pasta.id);
                setNomePasta(pasta.nome);
                setSubtituloPasta(pasta.subtitulo || "");
                setShowEditarPastaDialog(true);
              }}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Deseja realmente excluir esta pasta e todo seu conteúdo?")) {
                  excluirPasta(pasta.id);
                }
              }}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          </div>
        </div>

        {pasta.expandido && pasta.subPastas && pasta.subPastas.map(subPasta => 
          renderPasta(subPasta, nivel + 1)
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Organização de Documentos
            </h3>
            <Button
              onClick={() => setShowNovaPastaDialog(true)}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Pasta
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
            {/* Estrutura de Pastas */}
            <div className="border-r pr-4">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                Estrutura de Pastas
              </h4>
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {estruturaPastas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhuma pasta criada</p>
                  </div>
                ) : (
                  estruturaPastas.map(pasta => renderPasta(pasta))
                )}
              </div>
            </div>

            {/* Visualização de Arquivos */}
            <div className="pl-4">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                {pastaSelecionadaObj ? `Arquivos em "${pastaSelecionadaObj.nome}"` : "Selecione uma pasta"}
              </h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {!pastaSelecionadaObj ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <File className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Selecione uma pasta para ver os arquivos</p>
                  </div>
                ) : pastaSelecionadaObj.arquivos.length === 0 ? (
                  <div className="text-center py-8">
                    <File className="h-12 w-12 mx-auto mb-2 opacity-50 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">Nenhum arquivo nesta pasta</p>
                    <Button onClick={adicionarArquivo} size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Adicionar Arquivo
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button onClick={adicionarArquivo} size="sm" variant="outline" className="w-full mb-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Adicionar Arquivo
                    </Button>
                    {pastaSelecionadaObj.arquivos.map(arquivo => (
                      <div
                        key={arquivo.id}
                        className="flex items-center gap-2 p-2 rounded border hover:bg-muted/50"
                      >
                        <File className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{arquivo.nome}</div>
                          <div className="text-xs text-muted-foreground">
                            {(arquivo.tamanho / 1024).toFixed(0)} KB • {arquivo.dataUpload}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Nova Pasta */}
        <Dialog open={showNovaPastaDialog} onOpenChange={setShowNovaPastaDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Pasta</DialogTitle>
              <DialogDescription>
                {pastaSelecionadaObj 
                  ? `Criar subpasta em "${pastaSelecionadaObj.nome}"`
                  : "Criar nova pasta na raiz"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="nome-pasta">Nome da Pasta *</Label>
                <Input
                  id="nome-pasta"
                  value={nomePasta}
                  onChange={(e) => setNomePasta(e.target.value)}
                  placeholder="Digite o nome da pasta"
                />
              </div>
              <div>
                <Label htmlFor="subtitulo-pasta">Subtítulo (opcional)</Label>
                <Input
                  id="subtitulo-pasta"
                  value={subtituloPasta}
                  onChange={(e) => setSubtituloPasta(e.target.value)}
                  placeholder="Digite um subtítulo descritivo"
                />
              </div>
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
              <DialogDescription>Alterar informações da pasta</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-nome-pasta">Nome da Pasta *</Label>
                <Input
                  id="edit-nome-pasta"
                  value={nomePasta}
                  onChange={(e) => setNomePasta(e.target.value)}
                  placeholder="Digite o nome da pasta"
                />
              </div>
              <div>
                <Label htmlFor="edit-subtitulo-pasta">Subtítulo (opcional)</Label>
                <Input
                  id="edit-subtitulo-pasta"
                  value={subtituloPasta}
                  onChange={(e) => setSubtituloPasta(e.target.value)}
                  placeholder="Digite um subtítulo descritivo"
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
      </CardContent>
    </Card>
  );
};
