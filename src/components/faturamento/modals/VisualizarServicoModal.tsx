import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServicoFaturamento } from "@/types/faturamento";
import { useState } from "react";
import { ExternalLink, Copy, Download, Eye, Upload, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SolicitarAlteracaoServicoModal from "./SolicitarAlteracaoServicoModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VisualizarServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico: ServicoFaturamento;
}

const VisualizarServicoModal = ({ isOpen, onClose, servico }: VisualizarServicoModalProps) => {
  const { toast } = useToast();
  const [modalAlteracaoOpen, setModalAlteracaoOpen] = useState(false);

  const statusColors = {
    'Iniciado': 'bg-blue-500',
    'Em Andamento': 'bg-yellow-500',
    'Concluído': 'bg-green-500',
    'Aprovado': 'bg-purple-500',
    'Faturado': 'bg-emerald-500'
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência.`,
    });
  };

  const handleDownload = (arquivo: any) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${arquivo.nomeArquivo}...`,
    });
  };

  const handleOpenPrefeitura = () => {
    if (servico.linkPrefeitura) {
      window.open(servico.linkPrefeitura, '_blank');
    }
  };

  const getStatusSolicitacao = (status: string) => {
    switch (status) {
      case 'pendente':
        return { label: 'Pendente', icon: Clock, color: 'text-yellow-600 bg-yellow-100' };
      case 'em_analise':
        return { label: 'Em Análise', icon: Clock, color: 'text-blue-600 bg-blue-100' };
      case 'aceita':
        return { label: 'Aceita', icon: CheckCircle, color: 'text-green-600 bg-green-100' };
      case 'recusada':
        return { label: 'Recusada', icon: XCircle, color: 'text-red-600 bg-red-100' };
      default:
        return { label: status, icon: Clock, color: 'text-gray-600 bg-gray-100' };
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl">
                  Serviço #{servico.id} - {servico.descricao}
                </DialogTitle>
                <Badge className={statusColors[servico.status]}>
                  {servico.status}
                </Badge>
              </div>
              <Button onClick={() => setModalAlteracaoOpen(true)}>
                Solicitar Alteração
              </Button>
            </div>
          </DialogHeader>

          <Tabs defaultValue="dados-gerais" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger 
                value="nfse" 
                disabled={servico.status !== 'Faturado' || !servico.numeroNFSe}
              >
                Nota Fiscal de Serviço
              </TabsTrigger>
              <TabsTrigger value="historico">Histórico de Solicitações</TabsTrigger>
            </TabsList>

            {/* ABA 1: DADOS GERAIS */}
            <TabsContent value="dados-gerais" className="space-y-4">
              {/* Informações do Serviço */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Serviço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Descrição do Serviço</label>
                    <p className="mt-1">{servico.descricaoDetalhada || servico.descricao}</p>
                  </div>

                  {servico.escopo && (
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Escopo do Trabalho</label>
                      <p className="mt-1 text-sm whitespace-pre-wrap">{servico.escopo}</p>
                    </div>
                  )}

                  {servico.deliverables && servico.deliverables.length > 0 && (
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Deliverables/Entregas</label>
                      <ul className="mt-2 space-y-1">
                        {servico.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {servico.observacoes && (
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Observações Gerais</label>
                      <p className="mt-1 text-sm">{servico.observacoes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cliente e Responsável */}
              <Card>
                <CardHeader>
                  <CardTitle>Cliente e Responsável</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Cliente</label>
                    <p className="mt-1">{servico.cliente}</p>
                    {servico.cnpjCliente && (
                      <p className="text-sm text-muted-foreground">{servico.cnpjCliente}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Responsável pelo Serviço</label>
                    <p className="mt-1">{servico.responsavel}</p>
                    {servico.emailResponsavel && (
                      <p className="text-sm text-muted-foreground">{servico.emailResponsavel}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Data de Início</label>
                    <p className="mt-1">{new Date(servico.dataInicio).toLocaleDateString('pt-BR')}</p>
                  </div>
                  {servico.dataConclusao && (
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Data de Conclusão</label>
                      <p className="mt-1">{new Date(servico.dataConclusao).toLocaleDateString('pt-BR')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Valores */}
              <Card>
                <CardHeader>
                  <CardTitle>Valores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Valor Bruto do Serviço</span>
                    <span className="font-bold">{formatCurrency(servico.valor)}</span>
                  </div>
                  
                  {servico.valorISS !== undefined && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>(-) ISS Retido ({servico.aliquotaISS}%)</span>
                      <span>{formatCurrency(servico.valorISS)}</span>
                    </div>
                  )}
                  
                  {servico.valorPIS !== undefined && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>(-) PIS Retido (0,65%)</span>
                      <span>{formatCurrency(servico.valorPIS)}</span>
                    </div>
                  )}
                  
                  {servico.valorCOFINS !== undefined && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>(-) COFINS Retido (3%)</span>
                      <span>{formatCurrency(servico.valorCOFINS)}</span>
                    </div>
                  )}
                  
                  {servico.valorIR !== undefined && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>(-) IR Retido</span>
                      <span>{formatCurrency(servico.valorIR)}</span>
                    </div>
                  )}
                  
                  {servico.valorLiquido !== undefined && (
                    <>
                      <div className="border-t pt-3 mt-3"></div>
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Valor Líquido</span>
                        <span className="font-bold text-green-600">{formatCurrency(servico.valorLiquido)}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ABA 2: NFS-e */}
            <TabsContent value="nfse" className="space-y-4">
              {/* Dados da NFS-e */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados da NFS-e</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Número da NFS-e</label>
                    <p className="mt-1 font-mono">{servico.numeroNFSe}</p>
                  </div>
                  {servico.serieNFSe && (
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Série</label>
                      <p className="mt-1">{servico.serieNFSe}</p>
                    </div>
                  )}
                  {servico.dataEmissaoNFSe && (
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Data de Emissão</label>
                      <p className="mt-1">{new Date(servico.dataEmissaoNFSe).toLocaleDateString('pt-BR')}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Status</label>
                    <Badge className="mt-1 bg-green-500">Autorizada</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Acesso ao Portal da Prefeitura */}
              <Card>
                <CardHeader>
                  <CardTitle>Acesso ao Portal da Prefeitura</CardTitle>
                  <CardDescription>
                    Acesse o portal da prefeitura para consultar ou reimprimir a NFS-e
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleOpenPrefeitura}
                    className="w-full"
                    size="lg"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Acessar Portal da Prefeitura
                  </Button>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use a Chave de Verificação e o Código de Verificação para consultar a nota:
                    </p>
                    
                    {servico.chaveVerificacao && (
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <label className="text-sm font-semibold">Chave de Verificação</label>
                          <p className="font-mono text-sm">{servico.chaveVerificacao}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(servico.chaveVerificacao!, "Chave de Verificação")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {servico.codigoVerificacao && (
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <label className="text-sm font-semibold">Código de Verificação</label>
                          <p className="font-mono text-sm">{servico.codigoVerificacao}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(servico.codigoVerificacao!, "Código de Verificação")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Arquivos da NFS-e */}
              {servico.arquivos && servico.arquivos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Arquivos da NFS-e no Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Nome do Arquivo</TableHead>
                          <TableHead>Tamanho</TableHead>
                          <TableHead>Upload em</TableHead>
                          <TableHead>Por</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servico.arquivos.map((arquivo) => (
                          <TableRow key={arquivo.id}>
                            <TableCell>
                              <Badge variant="outline">{arquivo.tipo}</Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{arquivo.nomeArquivo}</TableCell>
                            <TableCell>{formatBytes(arquivo.tamanho)}</TableCell>
                            <TableCell>
                              {new Date(arquivo.dataUpload).toLocaleDateString('pt-BR')} às{' '}
                              {new Date(arquivo.dataUpload).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </TableCell>
                            <TableCell>{arquivo.uploadPor}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleDownload(arquivo)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <Button className="w-full mt-4" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload de Arquivo
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* ABA 3: HISTÓRICO DE SOLICITAÇÕES */}
            <TabsContent value="historico" className="space-y-4">
              {servico.solicitacoesAlteracao && servico.solicitacoesAlteracao.length > 0 ? (
                servico.solicitacoesAlteracao.map((solicitacao) => {
                  const statusInfo = getStatusSolicitacao(solicitacao.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <Card key={solicitacao.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            🔄 Solicitação de Alteração #{solicitacao.id}
                          </CardTitle>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <CardDescription>
                          Solicitado por: {solicitacao.solicitadoPor} ({solicitacao.emailSolicitante})
                          <br />
                          Data: {new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')} às {solicitacao.horaSolicitacao}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Motivo da Alteração</label>
                          <p className="mt-1 text-sm">{solicitacao.motivoAlteracao}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Detalhes</label>
                          <p className="mt-1 text-sm whitespace-pre-wrap">{solicitacao.detalhesAlteracao}</p>
                        </div>
                        
                        {solicitacao.respostaDo && (
                          <>
                            <div className="border-t pt-4"></div>
                            <div>
                              <label className="text-sm font-semibold text-muted-foreground">Resposta do Responsável</label>
                              <p className="mt-1 text-sm">
                                Por: {solicitacao.respostaDo}
                                {solicitacao.dataResposta && (
                                  <> • Em: {new Date(solicitacao.dataResposta).toLocaleDateString('pt-BR')}</>
                                )}
                              </p>
                              {solicitacao.justificativaResposta && (
                                <p className="mt-2 text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded">
                                  {solicitacao.justificativaResposta}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma solicitação de alteração registrada</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <SolicitarAlteracaoServicoModal
        isOpen={modalAlteracaoOpen}
        onClose={() => setModalAlteracaoOpen(false)}
        servico={servico}
      />
    </>
  );
};

export default VisualizarServicoModal;
