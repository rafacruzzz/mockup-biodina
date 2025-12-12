import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DocumentoAcaoCampoCard } from "./DocumentoAcaoCampoCard";
import { DocumentoPreenchívelCard } from "./DocumentoPreenchívelCard";
import { NovoDocumentoAdicionalModal } from "./NovoDocumentoAdicionalModal";
import { 
  AcaoCampo, 
  DocumentoAcaoCampo, 
  StatusAcaoCampo, 
  TipoDocumentoAcaoCampo, 
  FieldActionEffectivenessData,
  SecaoAcaoCampo 
} from "@/types/acaoCampo";
import { 
  acoesCampoMock, 
  statusAcaoCampoLabels, 
  tipoDocumentoLabels,
  criarDocumentosRecebimentoEmpresa,
  criarDocumentosEnvioAnvisa,
  criarDocumentosEnvioEmpresaRepresentada
} from "@/data/acaoCampoData";
import { Plus, FileText, CheckCircle, Clock, AlertCircle, Archive, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const AcaoCampoTab = () => {
  const [acoesCampo, setAcoesCampo] = useState<AcaoCampo[]>(acoesCampoMock);
  const [acaoSelecionada, setAcaoSelecionada] = useState<AcaoCampo | null>(null);
  const [showNovaAcao, setShowNovaAcao] = useState(false);
  const [showNovoDocumento, setShowNovoDocumento] = useState(false);
  const [novaAcaoTitulo, setNovaAcaoTitulo] = useState("");
  const [novaAcaoEmpresa, setNovaAcaoEmpresa] = useState("");
  const [secoesAbertas, setSecoesAbertas] = useState<Record<string, boolean>>({});
  const [secaoParaAddDoc, setSecaoParaAddDoc] = useState<string | null>(null);

  const getStatusIcon = (status: StatusAcaoCampo) => {
    switch (status) {
      case StatusAcaoCampo.EM_ANDAMENTO:
        return <Clock className="h-4 w-4" />;
      case StatusAcaoCampo.AGUARDANDO_ASSINATURAS:
        return <AlertCircle className="h-4 w-4" />;
      case StatusAcaoCampo.COMPLETA:
        return <CheckCircle className="h-4 w-4" />;
      case StatusAcaoCampo.ARQUIVADA:
        return <Archive className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: StatusAcaoCampo) => {
    switch (status) {
      case StatusAcaoCampo.EM_ANDAMENTO:
        return "bg-blue-500";
      case StatusAcaoCampo.AGUARDANDO_ASSINATURAS:
        return "bg-yellow-500";
      case StatusAcaoCampo.COMPLETA:
        return "bg-green-500";
      case StatusAcaoCampo.ARQUIVADA:
        return "bg-gray-500";
    }
  };

  const toggleSecao = (secaoId: string) => {
    setSecoesAbertas(prev => ({ ...prev, [secaoId]: !prev[secaoId] }));
  };

  const handleCriarNovaAcao = () => {
    if (!novaAcaoTitulo.trim() || !novaAcaoEmpresa.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const baseId = String(Date.now());
    
    // Criar documentos para cada seção
    const docsRecebimento = criarDocumentosRecebimentoEmpresa(baseId);
    const docsAnvisa = criarDocumentosEnvioAnvisa(baseId);
    const docsEmpresa = criarDocumentosEnvioEmpresaRepresentada(baseId);

    const secoes: SecaoAcaoCampo[] = [
      {
        id: `${baseId}-secao-1`,
        titulo: 'Recebimento dos Documentos da Empresa',
        documentos: docsRecebimento.documentos,
        documentosAdicionais: docsRecebimento.adicionais
      },
      {
        id: `${baseId}-secao-2`,
        titulo: 'Envio de Documentos para Anvisa',
        documentos: docsAnvisa.documentos,
        documentosAdicionais: docsAnvisa.adicionais
      },
      {
        id: `${baseId}-secao-3`,
        titulo: 'Envio de Documentos para Empresa que a Biodina Representa',
        documentos: docsEmpresa.documentos,
        documentosAdicionais: docsEmpresa.adicionais
      }
    ];

    const novaAcao: AcaoCampo = {
      id: baseId,
      titulo: novaAcaoTitulo,
      empresaRepresentada: novaAcaoEmpresa,
      dataCriacao: new Date().toISOString().split('T')[0],
      status: StatusAcaoCampo.EM_ANDAMENTO,
      secoes,
      documentosExtras: []
    };

    // Inicializar todas as seções como abertas
    const novasSecoesAbertas: Record<string, boolean> = {};
    secoes.forEach(s => { novasSecoesAbertas[s.id] = true; });
    setSecoesAbertas(novasSecoesAbertas);

    setAcoesCampo([novaAcao, ...acoesCampo]);
    setAcaoSelecionada(novaAcao);
    setShowNovaAcao(false);
    setNovaAcaoTitulo("");
    setNovaAcaoEmpresa("");
    toast.success("Ação de Campo criada com sucesso!");
  };

  const handleUploadDocumento = (acaoId: string, secaoId: string | null, docId: string, file: File) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        let acaoAtualizada: AcaoCampo;

        if (secaoId) {
          // Documento dentro de uma seção
          const secoes = acao.secoes.map(secao => {
            if (secao.id !== secaoId) return secao;

            const documentos = secao.documentos.map(doc => {
              if (doc.id !== docId) return doc;
              return {
                ...doc,
                nomeOriginal: file.name,
                url: URL.createObjectURL(file),
                dataUpload: new Date().toISOString().split('T')[0],
                tamanho: file.size,
                arquivo: file
              };
            });

            const documentosAdicionais = secao.documentosAdicionais.map(doc => {
              if (doc.id !== docId) return doc;
              return {
                ...doc,
                nomeOriginal: file.name,
                url: URL.createObjectURL(file),
                dataUpload: new Date().toISOString().split('T')[0],
                tamanho: file.size,
                arquivo: file
              };
            });

            return { ...secao, documentos, documentosAdicionais };
          });

          acaoAtualizada = { ...acao, secoes };
        } else {
          // Documento extra
          const documentosExtras = acao.documentosExtras.map(doc => {
            if (doc.id !== docId) return doc;
            return {
              ...doc,
              nomeOriginal: file.name,
              url: URL.createObjectURL(file),
              dataUpload: new Date().toISOString().split('T')[0],
              tamanho: file.size,
              arquivo: file
            };
          });

          acaoAtualizada = { ...acao, documentosExtras };
        }

        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
    toast.success("Documento anexado com sucesso!");
  };

  const handleRemoverDocumento = (acaoId: string, secaoId: string | null, docId: string) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        let acaoAtualizada: AcaoCampo;

        if (secaoId) {
          const secoes = acao.secoes.map(secao => {
            if (secao.id !== secaoId) return secao;

            const documentos = secao.documentos.map(doc => {
              if (doc.id !== docId) return doc;
              return {
                ...doc,
                nomeOriginal: undefined,
                url: undefined,
                dataUpload: undefined,
                tamanho: undefined,
                arquivo: undefined,
                assinatura: undefined
              };
            });

            // Remover documento adicional (não obrigatório)
            const documentosAdicionais = secao.documentosAdicionais.filter(doc => doc.id !== docId);

            return { ...secao, documentos, documentosAdicionais };
          });

          acaoAtualizada = { ...acao, secoes };
        } else {
          const documentosExtras = acao.documentosExtras.filter(doc => doc.id !== docId);
          acaoAtualizada = { ...acao, documentosExtras };
        }

        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
    toast.success("Documento removido com sucesso!");
  };

  const handleAssinarDocumento = (
    acaoId: string,
    secaoId: string | null,
    docId: string,
    nomeAssinante: string,
    assinaturaBase64: string,
    cargo?: string
  ) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        let acaoAtualizada: AcaoCampo;

        if (secaoId) {
          const secoes = acao.secoes.map(secao => {
            if (secao.id !== secaoId) return secao;

            const documentos = secao.documentos.map(doc => {
              if (doc.id !== docId) return doc;
              return {
                ...doc,
                assinatura: {
                  nomeAssinante,
                  assinaturaBase64,
                  dataAssinatura: new Date().toISOString(),
                  cargo
                }
              };
            });

            const documentosAdicionais = secao.documentosAdicionais.map(doc => {
              if (doc.id !== docId) return doc;
              return {
                ...doc,
                assinatura: {
                  nomeAssinante,
                  assinaturaBase64,
                  dataAssinatura: new Date().toISOString(),
                  cargo
                }
              };
            });

            return { ...secao, documentos, documentosAdicionais };
          });

          acaoAtualizada = { ...acao, secoes };
        } else {
          const documentosExtras = acao.documentosExtras.map(doc => {
            if (doc.id !== docId) return doc;
            return {
              ...doc,
              assinatura: {
                nomeAssinante,
                assinaturaBase64,
                dataAssinatura: new Date().toISOString(),
                cargo
              }
            };
          });

          acaoAtualizada = { ...acao, documentosExtras };
        }

        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
    toast.success("Documento assinado com sucesso!");
  };

  const handleSalvarFormulario = (acaoId: string, secaoId: string, docId: string, dados: FieldActionEffectivenessData) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        const secoes = acao.secoes.map(secao => {
          if (secao.id !== secaoId) return secao;

          const documentos = secao.documentos.map(doc => {
            if (doc.id !== docId) return doc;
            return { ...doc, dadosFormulario: dados };
          });

          return { ...secao, documentos };
        });

        const acaoAtualizada = { ...acao, secoes };
        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
  };

  const handleGerarPDF = (acaoId: string, secaoId: string, docId: string) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        const secoes = acao.secoes.map(secao => {
          if (secao.id !== secaoId) return secao;

          const documentos = secao.documentos.map(doc => {
            if (doc.id !== docId || !doc.dadosFormulario) return doc;
            return {
              ...doc,
              dadosFormulario: {
                ...doc.dadosFormulario,
                pdfGerado: true,
                dataPdfGerado: new Date().toISOString()
              }
            };
          });

          return { ...secao, documentos };
        });

        const acaoAtualizada = { ...acao, secoes };
        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
  };

  const handleAdicionarDocumento = (
    nome: string,
    descricao: string,
    requerAssinatura: boolean,
    arquivo?: File
  ) => {
    if (!acaoSelecionada) return;

    const novoDoc: DocumentoAcaoCampo = {
      id: `adicional-${Date.now()}`,
      tipo: TipoDocumentoAcaoCampo.ADICIONAL,
      nome,
      requerAssinatura,
      ...(arquivo && {
        nomeOriginal: arquivo.name,
        url: URL.createObjectURL(arquivo),
        dataUpload: new Date().toISOString().split('T')[0],
        tamanho: arquivo.size,
        arquivo
      })
    };

    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoSelecionada.id) return acao;

        let acaoAtualizada: AcaoCampo;

        if (secaoParaAddDoc) {
          // Adicionar na seção específica
          const secoes = acao.secoes.map(secao => {
            if (secao.id !== secaoParaAddDoc) return secao;
            return {
              ...secao,
              documentosAdicionais: [...secao.documentosAdicionais, novoDoc]
            };
          });
          acaoAtualizada = { ...acao, secoes };
        } else {
          // Adicionar como documento extra
          acaoAtualizada = {
            ...acao,
            documentosExtras: [...acao.documentosExtras, novoDoc]
          };
        }

        setAcaoSelecionada(acaoAtualizada);
        return acaoAtualizada;
      })
    );
    setSecaoParaAddDoc(null);
    toast.success("Documento adicional criado com sucesso!");
  };

  const calcularEstatisticas = () => {
    return {
      total: acoesCampo.length,
      emAndamento: acoesCampo.filter(a => a.status === StatusAcaoCampo.EM_ANDAMENTO).length,
      aguardandoAssinaturas: acoesCampo.filter(a => a.status === StatusAcaoCampo.AGUARDANDO_ASSINATURAS).length,
      completas: acoesCampo.filter(a => a.status === StatusAcaoCampo.COMPLETA).length
    };
  };

  const stats = calcularEstatisticas();

  const renderDocumentoCard = (doc: DocumentoAcaoCampo, secaoId: string) => {
    if (doc.tipo === TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS_PREENCHIVEL) {
      return (
        <DocumentoPreenchívelCard
          key={doc.id}
          documento={doc}
          onSave={(dados) => handleSalvarFormulario(acaoSelecionada!.id, secaoId, doc.id, dados)}
          onGeneratePDF={() => handleGerarPDF(acaoSelecionada!.id, secaoId, doc.id)}
        />
      );
    }
    return (
      <DocumentoAcaoCampoCard
        key={doc.id}
        documento={doc}
        onUpload={(file) => handleUploadDocumento(acaoSelecionada!.id, secaoId, doc.id, file)}
        onRemove={() => handleRemoverDocumento(acaoSelecionada!.id, secaoId, doc.id)}
        onSign={(nome, assinatura, cargo) =>
          handleAssinarDocumento(acaoSelecionada!.id, secaoId, doc.id, nome, assinatura, cargo)
        }
      />
    );
  };

  if (acaoSelecionada) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => setAcaoSelecionada(null)}>
              ← Voltar
            </Button>
            <h2 className="text-2xl font-bold mt-4">{acaoSelecionada.titulo}</h2>
            <p className="text-muted-foreground">Empresa: {acaoSelecionada.empresaRepresentada}</p>
          </div>
          <Badge className={`${getStatusColor(acaoSelecionada.status)} text-white`}>
            {getStatusIcon(acaoSelecionada.status)}
            <span className="ml-1">{statusAcaoCampoLabels[acaoSelecionada.status]}</span>
          </Badge>
        </div>

        {/* Seções */}
        {acaoSelecionada.secoes.map((secao, index) => (
          <Card key={secao.id}>
            <Collapsible
              open={secoesAbertas[secao.id] !== false}
              onOpenChange={() => toggleSecao(secao.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {secoesAbertas[secao.id] !== false ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                      <span className="text-primary">Seção {index + 1}:</span> {secao.titulo}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSecaoParaAddDoc(secao.id);
                        setShowNovoDocumento(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Documento
                    </Button>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {/* Documentos Obrigatórios */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Documentos Obrigatórios</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {secao.documentos.map(doc => renderDocumentoCard(doc, secao.id))}
                    </div>
                  </div>

                  {/* Documentos Adicionais da Seção */}
                  {secao.documentosAdicionais.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Documentos Adicionais</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {secao.documentosAdicionais.map(doc => (
                          <DocumentoAcaoCampoCard
                            key={doc.id}
                            documento={doc}
                            onUpload={(file) => handleUploadDocumento(acaoSelecionada.id, secao.id, doc.id, file)}
                            onRemove={() => handleRemoverDocumento(acaoSelecionada.id, secao.id, doc.id)}
                            onSign={(nome, assinatura, cargo) =>
                              handleAssinarDocumento(acaoSelecionada.id, secao.id, doc.id, nome, assinatura, cargo)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}

        {/* Documentos Extras */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Documentos Extras</CardTitle>
              <Button
                onClick={() => {
                  setSecaoParaAddDoc(null);
                  setShowNovoDocumento(true);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Documento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {acaoSelecionada.documentosExtras.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {acaoSelecionada.documentosExtras.map(doc => (
                  <DocumentoAcaoCampoCard
                    key={doc.id}
                    documento={doc}
                    onUpload={(file) => handleUploadDocumento(acaoSelecionada.id, null, doc.id, file)}
                    onRemove={() => handleRemoverDocumento(acaoSelecionada.id, null, doc.id)}
                    onSign={(nome, assinatura, cargo) =>
                      handleAssinarDocumento(acaoSelecionada.id, null, doc.id, nome, assinatura, cargo)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Nenhum documento extra cadastrado
              </p>
            )}
          </CardContent>
        </Card>

        {/* Botão Finalizar Ação de Campo */}
        <div className="flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              setAcoesCampo(acoes =>
                acoes.map(acao => {
                  if (acao.id !== acaoSelecionada.id) return acao;
                  return {
                    ...acao,
                    status: StatusAcaoCampo.COMPLETA,
                    dataAtualizacao: new Date().toISOString().split('T')[0]
                  };
                })
              );
              toast.success("Ação de Campo finalizada com sucesso!");
              setAcaoSelecionada(null);
            }}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Finalizar Ação de Campo
          </Button>
        </div>

        <NovoDocumentoAdicionalModal
          open={showNovoDocumento}
          onOpenChange={setShowNovoDocumento}
          onAdd={handleAdicionarDocumento}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ação de Campo</h2>
        <Button onClick={() => setShowNovaAcao(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Nova Ação de Campo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total de Ações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-500">{stats.emAndamento}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Aguardando Assinaturas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">{stats.aguardandoAssinaturas}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{stats.completas}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações de Campo Cadastradas</CardTitle>
          <CardDescription>Gerencie as ações de campo e seus documentos</CardDescription>
        </CardHeader>
        <CardContent>
          {acoesCampo.length > 0 ? (
            <div className="space-y-3">
              {acoesCampo.map(acao => (
                <div
                  key={acao.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    // Inicializar seções como abertas ao selecionar ação
                    const novasSecoesAbertas: Record<string, boolean> = {};
                    acao.secoes.forEach(s => { novasSecoesAbertas[s.id] = true; });
                    setSecoesAbertas(novasSecoesAbertas);
                    setAcaoSelecionada(acao);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">{acao.titulo}</p>
                      <p className="text-sm text-muted-foreground">{acao.empresaRepresentada}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(acao.status)} text-white`}>
                    {getStatusIcon(acao.status)}
                    <span className="ml-1">{statusAcaoCampoLabels[acao.status]}</span>
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma ação de campo cadastrada. Clique em "Nova Ação de Campo" para criar.
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={showNovaAcao} onOpenChange={setShowNovaAcao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Ação de Campo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Ação *</Label>
              <Input
                id="titulo"
                value={novaAcaoTitulo}
                onChange={(e) => setNovaAcaoTitulo(e.target.value)}
                placeholder="Ex: Ação de Campo - Lote ABC123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa Representada *</Label>
              <Input
                id="empresa"
                value={novaAcaoEmpresa}
                onChange={(e) => setNovaAcaoEmpresa(e.target.value)}
                placeholder="Nome da empresa representada"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNovaAcao(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCriarNovaAcao}>
                Criar Ação de Campo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
