import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentoAcaoCampoCard } from "./DocumentoAcaoCampoCard";
import { NovoDocumentoAdicionalModal } from "./NovoDocumentoAdicionalModal";
import { AcaoCampo, DocumentoAcaoCampo, StatusAcaoCampo, TipoDocumentoAcaoCampo } from "@/types/acaoCampo";
import { acoesCampoMock, statusAcaoCampoLabels, tipoDocumentoLabels } from "@/data/acaoCampoData";
import { Plus, FileText, CheckCircle, Clock, AlertCircle, Archive } from "lucide-react";
import { toast } from "sonner";

export const AcaoCampoTab = () => {
  const [acoesCampo, setAcoesCampo] = useState<AcaoCampo[]>(acoesCampoMock);
  const [acaoSelecionada, setAcaoSelecionada] = useState<AcaoCampo | null>(null);
  const [showNovaAcao, setShowNovaAcao] = useState(false);
  const [showNovoDocumento, setShowNovoDocumento] = useState(false);
  const [novaAcaoTitulo, setNovaAcaoTitulo] = useState("");
  const [novaAcaoEmpresa, setNovaAcaoEmpresa] = useState("");

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

  const handleCriarNovaAcao = () => {
    if (!novaAcaoTitulo.trim() || !novaAcaoEmpresa.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const novaAcao: AcaoCampo = {
      id: String(Date.now()),
      titulo: novaAcaoTitulo,
      empresaRepresentada: novaAcaoEmpresa,
      dataCriacao: new Date().toISOString().split('T')[0],
      status: StatusAcaoCampo.EM_ANDAMENTO,
      documentos: [
        {
          id: `doc-${Date.now()}-1`,
          tipo: TipoDocumentoAcaoCampo.CARTA_CLIENTE,
          nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.CARTA_CLIENTE],
          requerAssinatura: false
        },
        {
          id: `doc-${Date.now()}-2`,
          tipo: TipoDocumentoAcaoCampo.FAN,
          nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAN],
          requerAssinatura: false
        },
        {
          id: `doc-${Date.now()}-3`,
          tipo: TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS,
          nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FIELD_ACTION_EFFECTIVENESS],
          requerAssinatura: false
        },
        {
          id: `doc-${Date.now()}-4`,
          tipo: TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY,
          nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAC1_CUSTOMER_ADVISORY],
          requerAssinatura: true
        },
        {
          id: `doc-${Date.now()}-5`,
          tipo: TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE,
          nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAC2_CUSTOMER_RESPONSE],
          requerAssinatura: true
        },
        {
          id: `doc-${Date.now()}-6`,
          tipo: TipoDocumentoAcaoCampo.FAC3,
          nome: tipoDocumentoLabels[TipoDocumentoAcaoCampo.FAC3],
          requerAssinatura: true
        }
      ],
      documentosAdicionais: []
    };

    setAcoesCampo([novaAcao, ...acoesCampo]);
    setAcaoSelecionada(novaAcao);
    setShowNovaAcao(false);
    setNovaAcaoTitulo("");
    setNovaAcaoEmpresa("");
    toast.success("Ação de Campo criada com sucesso!");
  };

  const handleUploadDocumento = (acaoId: string, docId: string, file: File) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        const documentos = acao.documentos.map(doc => {
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

        const documentosAdicionais = acao.documentosAdicionais.map(doc => {
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

        const acaoAtualizada = { ...acao, documentos, documentosAdicionais };
        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
    toast.success("Documento anexado com sucesso!");
  };

  const handleRemoverDocumento = (acaoId: string, docId: string) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        const documentos = acao.documentos.map(doc => {
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

        const documentosAdicionais = acao.documentosAdicionais.filter(doc => doc.id !== docId);

        const acaoAtualizada = { ...acao, documentos, documentosAdicionais };
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
    docId: string,
    nomeAssinante: string,
    assinaturaBase64: string,
    cargo?: string
  ) => {
    setAcoesCampo(acoes =>
      acoes.map(acao => {
        if (acao.id !== acaoId) return acao;

        const documentos = acao.documentos.map(doc => {
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

        const documentosAdicionais = acao.documentosAdicionais.map(doc => {
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

        const acaoAtualizada = { ...acao, documentos, documentosAdicionais };
        if (acaoSelecionada?.id === acaoId) {
          setAcaoSelecionada(acaoAtualizada);
        }
        return acaoAtualizada;
      })
    );
    toast.success("Documento assinado com sucesso!");
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
        const acaoAtualizada = {
          ...acao,
          documentosAdicionais: [...acao.documentosAdicionais, novoDoc]
        };
        setAcaoSelecionada(acaoAtualizada);
        return acaoAtualizada;
      })
    );
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

  if (acaoSelecionada) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => setAcaoSelecionada(null)}>
              ← Voltar
            </Button>
            <h2 className="text-2xl font-bold mt-4">{acaoSelecionada.titulo}</h2>
          </div>
          <Badge className={`${getStatusColor(acaoSelecionada.status)} text-white`}>
            {getStatusIcon(acaoSelecionada.status)}
            <span className="ml-1">{statusAcaoCampoLabels[acaoSelecionada.status]}</span>
          </Badge>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Documentos Obrigatórios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {acaoSelecionada.documentos.map(doc => (
              <DocumentoAcaoCampoCard
                key={doc.id}
                documento={doc}
                onUpload={(file) => handleUploadDocumento(acaoSelecionada.id, doc.id, file)}
                onRemove={() => handleRemoverDocumento(acaoSelecionada.id, doc.id)}
                onSign={(nome, assinatura, cargo) =>
                  handleAssinarDocumento(acaoSelecionada.id, doc.id, nome, assinatura, cargo)
                }
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Documentos Adicionais</h3>
            <Button onClick={() => setShowNovoDocumento(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Documento
            </Button>
          </div>

          {acaoSelecionada.documentosAdicionais.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acaoSelecionada.documentosAdicionais.map(doc => (
                <DocumentoAcaoCampoCard
                  key={doc.id}
                  documento={doc}
                  onUpload={(file) => handleUploadDocumento(acaoSelecionada.id, doc.id, file)}
                  onRemove={() => handleRemoverDocumento(acaoSelecionada.id, doc.id)}
                  onSign={(nome, assinatura, cargo) =>
                    handleAssinarDocumento(acaoSelecionada.id, doc.id, nome, assinatura, cargo)
                  }
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Nenhum documento adicional cadastrado
              </CardContent>
            </Card>
          )}
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
          <div className="space-y-3">
            {acoesCampo.map(acao => (
              <div
                key={acao.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => setAcaoSelecionada(acao)}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{acao.titulo}</p>
                    <p className="text-sm text-muted-foreground">{acao.empresaRepresentada}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Criado em {new Date(acao.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(acao.status)} text-white`}>
                  {getStatusIcon(acao.status)}
                  <span className="ml-1">{statusAcaoCampoLabels[acao.status]}</span>
                </Badge>
              </div>
            ))}
          </div>
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
                placeholder="Ex: Fabricante XYZ Ltda"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowNovaAcao(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleCriarNovaAcao} className="flex-1">
                Criar Ação de Campo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
