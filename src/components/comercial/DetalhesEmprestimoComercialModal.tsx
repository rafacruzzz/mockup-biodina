import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, User, Calendar, TrendingUp, FileText, Link as LinkIcon, AlertCircle, CheckCircle } from "lucide-react";
import { Emprestimo } from "@/data/emprestimos";

interface DetalhesEmprestimoComercialModalProps {
  isOpen: boolean;
  onClose: () => void;
  emprestimo: Emprestimo | null;
}

const DetalhesEmprestimoComercialModal = ({ 
  isOpen, 
  onClose, 
  emprestimo 
}: DetalhesEmprestimoComercialModalProps) => {
  
  if (!emprestimo) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'emprestado': return 'bg-blue-500';
      case 'devolvido': return 'bg-orange-500';
      case 'devolvido_nf': return 'bg-yellow-500';
      case 'retorno_efetivado': return 'bg-green-500';
      case 'retorno_parcial': return 'bg-blue-600';
      case 'vencido': return 'bg-red-500';
      case 'parcial': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'emprestado': return 'Emprestado';
      case 'devolvido': return 'Devolvido';
      case 'devolvido_nf': return 'DANFE Registrada';
      case 'retorno_efetivado': return 'Retorno Efetivado';
      case 'retorno_parcial': return 'Retorno Parcial';
      case 'vencido': return 'Vencido';
      case 'parcial': return 'Devolução Parcial';
      default: return status;
    }
  };

  const formatCurrency = (value: number, currency: 'BRL' | 'USD') => {
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const hasRetorno = emprestimo.dataRetorno || emprestimo.numeroDanfeRetorno;
  const isRetornoCompleto = emprestimo.status === 'retorno_efetivado';
  const isPendenteEntradaFisica = emprestimo.status === 'devolvido_nf' || 
    (emprestimo.numeroDanfeRetorno && !emprestimo.data_entrada_fisica);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-biodina-blue flex items-center gap-2">
            <Package className="h-6 w-6" />
            Detalhes do Empréstimo - {emprestimo.numeroProcesso}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Gerais */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-biodina-blue" />
                <h3 className="text-lg font-semibold">Informações Gerais</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Número do Processo</span>
                  <p className="text-base font-semibold">{emprestimo.numeroProcesso}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <div className="mt-1">
                    <Badge className={`${getStatusColor(emprestimo.status)} text-white`}>
                      {getStatusLabel(emprestimo.status)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Cliente</span>
                  <p className="text-base font-semibold">{emprestimo.nomeCliente}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">CNPJ</span>
                  <p className="text-base">{emprestimo.cnpjCliente}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Valor do Empréstimo</span>
                  <p className="text-base font-semibold text-biodina-gold">
                    {formatCurrency(emprestimo.valorEmprestimo, emprestimo.moeda)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Moeda</span>
                  <Badge variant={emprestimo.moeda === 'BRL' ? 'default' : 'secondary'}>
                    {emprestimo.moeda}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produto Emprestado */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-biodina-blue" />
                <h3 className="text-lg font-semibold">Produto Emprestado</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Referência</span>
                  <p className="text-base font-semibold">{emprestimo.referenciaProdutoEmprestado}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">DANFE de Empréstimo</span>
                  <p className="text-base font-mono text-sm">{emprestimo.numeroDanfeEmprestimo}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-muted-foreground">Descrição</span>
                  <p className="text-base">{emprestimo.descricaoProdutoEmprestado}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Data de Empréstimo</span>
                  <p className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(emprestimo.dataEmprestimo)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Data de Saída</span>
                  <p className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(emprestimo.dataSaida)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Retorno */}
          {hasRetorno ? (
            <Card className={isPendenteEntradaFisica ? "border-yellow-500 bg-yellow-50" : isRetornoCompleto ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {isRetornoCompleto ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isPendenteEntradaFisica ? (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  )}
                  <h3 className="text-lg font-semibold">
                    {isRetornoCompleto ? "Informações de Retorno (Completo)" : 
                     isPendenteEntradaFisica ? "Informações de Retorno (Aguardando Entrada Física)" :
                     "Informações de Retorno"}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {emprestimo.dataRetorno && (
                    <div className="bg-white rounded-lg p-3 border">
                      <span className="text-sm font-medium text-muted-foreground">Data de Retorno</span>
                      <p className="text-base font-semibold flex items-center gap-2 text-biodina-blue">
                        <Calendar className="h-4 w-4" />
                        {formatDate(emprestimo.dataRetorno)}
                      </p>
                    </div>
                  )}
                  
                  {emprestimo.data_entrada_fisica && (
                    <div className="bg-white rounded-lg p-3 border border-green-300">
                      <span className="text-sm font-medium text-muted-foreground">Data Entrada Física no Estoque</span>
                      <p className="text-base font-semibold flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        {formatDate(emprestimo.data_entrada_fisica)}
                      </p>
                    </div>
                  )}
                  
                  {emprestimo.usuario_retorno && (
                    <div className="bg-white rounded-lg p-3 border border-biodina-gold">
                      <span className="text-sm font-medium text-muted-foreground">Usuário que Processou</span>
                      <p className="text-base font-semibold flex items-center gap-2 text-biodina-gold">
                        <User className="h-4 w-4" />
                        {emprestimo.usuario_retorno}
                      </p>
                    </div>
                  )}
                  
                  {emprestimo.numeroDanfeRetorno && (
                    <div className="bg-white rounded-lg p-3 border">
                      <span className="text-sm font-medium text-muted-foreground">DANFE de Retorno</span>
                      <p className="text-base font-mono text-sm">{emprestimo.numeroDanfeRetorno}</p>
                    </div>
                  )}
                  
                  {emprestimo.referenciaProdutoRecebido && (
                    <>
                      <div className="bg-white rounded-lg p-3 border">
                        <span className="text-sm font-medium text-muted-foreground">Produto Recebido</span>
                        <p className="text-base font-semibold">{emprestimo.referenciaProdutoRecebido}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border col-span-2">
                        <span className="text-sm font-medium text-muted-foreground">Descrição do Produto Recebido</span>
                        <p className="text-base">{emprestimo.descricaoProdutoRecebido}</p>
                      </div>
                    </>
                  )}
                  
                  {emprestimo.valorRetornado && (
                    <div className="bg-white rounded-lg p-3 border">
                      <span className="text-sm font-medium text-muted-foreground">Valor Retornado</span>
                      <p className="text-base font-semibold text-biodina-gold">
                        {formatCurrency(emprestimo.valorRetornado, emprestimo.moeda)}
                      </p>
                    </div>
                  )}
                  
                  {emprestimo.id_movimentacao_retorno && (
                    <div className="bg-white rounded-lg p-3 border">
                      <span className="text-sm font-medium text-muted-foreground">ID Movimentação de Retorno</span>
                      <p className="text-base font-semibold">{emprestimo.id_movimentacao_retorno}</p>
                    </div>
                  )}
                  
                  {emprestimo.observacoes_retorno && (
                    <div className="bg-white rounded-lg p-3 border col-span-2">
                      <span className="text-sm font-medium text-muted-foreground">Observações</span>
                      <p className="text-base">{emprestimo.observacoes_retorno}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-blue-500 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-blue-700">
                  <AlertCircle className="h-5 w-5" />
                  <p className="font-semibold">Empréstimo ainda ativo - Aguardando retorno</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vinculação */}
          {emprestimo.idImportacaoDireta && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <LinkIcon className="h-5 w-5 text-biodina-blue" />
                  <h3 className="text-lg font-semibold">Vinculação</h3>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">ID da Importação Direta</span>
                  <p className="text-base font-semibold">{emprestimo.idImportacaoDireta}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesEmprestimoComercialModal;