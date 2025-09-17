import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, Package, FileText, Building, CheckCircle, ArrowLeft } from "lucide-react";
import { modules } from "@/data/cadastroModules";
import { toast } from "sonner";
import { SelecaoProdutoAtualizacaoStep } from "./components/SelecaoProdutoAtualizacaoStep";
import { GeracaoDocumentacaoStep } from "./components/GeracaoDocumentacaoStep";
import { InformacoesPeticionamentoStep } from "./components/InformacoesPeticionamentoStep";
import { DisponibilizacaoInstrucaoAtualizacaoStep } from "./components/DisponibilizacaoInstrucaoAtualizacaoStep";

type EtapaAtualizacao = 'selecao_produto' | 'geracao_documentacao' | 'informacoes_peticionamento' | 'disponibilizacao_instrucao';

interface AtualizacaoData {
  produtoSelecionado?: any;
  numeroRegistroAnvisa?: string;
  tipoAtualizacao?: string;
  nomeArquivoPrincipal?: string;
  documentosAlteracao?: any[];
  protocoloPeticionamentoAnexado?: boolean;
  // Etapa 3
  areaAnvisa?: string;
  transacao?: string;
  expediente?: string;
  dataEnvio?: string;
  dataPublicacaoDOU?: string;
  numeroPublicacaoDOU?: string;
  observacaoGeral?: string;
  dataAlertaDisponibilizacao?: string;
  // Etapa 4
  disponibilizacaoInstrucaoUso?: string;
  transacaoInstrucao?: string;  
  expedienteInstrucao?: string;
  dataEnvioInstrucao?: string;
  arquivoInstrucaoAnexado?: boolean;
}

interface NovaAtualizacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAtualizacaoSalva?: (atualizacao: AtualizacaoData) => void;
}

export const NovaAtualizacaoModal = ({ isOpen, onClose, onAtualizacaoSalva }: NovaAtualizacaoModalProps) => {
  const [etapa, setEtapa] = useState<EtapaAtualizacao>('selecao_produto');
  const [atualizacaoData, setAtualizacaoData] = useState<AtualizacaoData>({});

  const handleVoltarParaSelecao = () => {
    setEtapa('selecao_produto');
  };

  const handleVoltarParaDocumentacao = () => {
    setEtapa('geracao_documentacao');
  };

  const handleVoltarParaPeticionamento = () => {
    setEtapa('informacoes_peticionamento');
  };

  const handleSelecionarProduto = (produto: any, numeroRegistro: string) => {
    setAtualizacaoData(prev => ({ 
      ...prev, 
      produtoSelecionado: produto, 
      numeroRegistroAnvisa: numeroRegistro 
    }));
    setEtapa('geracao_documentacao');
    toast.success(`Produto "${produto.nome}" selecionado para atualização`);
  };

  const handleFinalizarDocumentacao = (data: AtualizacaoData) => {
    setAtualizacaoData(data);
    setEtapa('informacoes_peticionamento');
    toast.success('Documentação organizada com sucesso!');
  };

  const handleProximaEtapaPeticionamento = (data: AtualizacaoData) => {
    setAtualizacaoData(data);
    setEtapa('disponibilizacao_instrucao');
    toast.success('Informações do peticionamento salvas!');
  };

  const handleSalvarAtualizacaoFinal = (data: AtualizacaoData) => {
    setAtualizacaoData(data);
    
    // Callback para o componente pai
    if (onAtualizacaoSalva) {
      onAtualizacaoSalva(data);
    }
    
    toast.success('Atualização de produto criada com sucesso!', {
      description: `${data.nomeArquivoPrincipal} foi registrada e está disponível na tabela.`
    });
    
    // Reset do modal
    handleFecharModal();
  };

  const handleFecharModal = () => {
    setEtapa('selecao_produto');
    setAtualizacaoData({});
    onClose();
  };

  const getBreadcrumbTitle = () => {
    switch (etapa) {
      case 'selecao_produto': return 'Nova Atualização - Selecionar Produto';
      case 'geracao_documentacao': return 'Nova Atualização - Geração de Documentação';
      case 'informacoes_peticionamento': return 'Nova Atualização - Informações do Peticionamento';
      case 'disponibilizacao_instrucao': return 'Nova Atualização - Disponibilização de Instrução';
      default: return 'Nova Atualização de Produto';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleFecharModal}>
      <DialogContent className={`max-h-[90vh] overflow-y-auto ${etapa !== 'selecao_produto' ? 'max-w-6xl' : 'max-w-5xl'}`}>
        <DialogHeader>
          <div className="space-y-3">
            {/* Breadcrumb Navigation */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <button 
                    onClick={handleVoltarParaSelecao}
                    className={`hover:text-primary ${etapa === 'selecao_produto' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                  >
                    Selecionar Produto
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <button 
                    onClick={handleVoltarParaDocumentacao}
                    disabled={etapa === 'selecao_produto'}
                    className={`hover:text-primary ${etapa === 'geracao_documentacao' ? 'text-primary font-medium' : 'text-muted-foreground'} disabled:cursor-not-allowed`}
                  >
                    Geração de Documentação
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <button 
                    onClick={handleVoltarParaPeticionamento}
                    disabled={etapa === 'selecao_produto' || etapa === 'geracao_documentacao'}
                    className={`hover:text-primary ${etapa === 'informacoes_peticionamento' ? 'text-primary font-medium' : 'text-muted-foreground'} disabled:cursor-not-allowed`}
                  >
                    Informações do Peticionamento
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className={etapa === 'disponibilizacao_instrucao' ? 'text-primary font-medium' : 'text-muted-foreground'}>
                    Disponibilização de Instrução
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {getBreadcrumbTitle()}
            </DialogTitle>
          </div>
        </DialogHeader>

        {etapa === 'selecao_produto' && (
          <SelecaoProdutoAtualizacaoStep 
            onSelecionarProduto={handleSelecionarProduto}
          />
        )}

        {etapa === 'geracao_documentacao' && (
          <GeracaoDocumentacaoStep 
            produtoSelecionado={atualizacaoData.produtoSelecionado}
            atualizacaoData={atualizacaoData}
            onVoltar={handleVoltarParaSelecao}
            onProximaEtapa={handleFinalizarDocumentacao}
          />
        )}

        {etapa === 'informacoes_peticionamento' && (
          <InformacoesPeticionamentoStep 
            produtoSelecionado={atualizacaoData.produtoSelecionado}
            atualizacaoData={atualizacaoData}
            onVoltar={handleVoltarParaDocumentacao}
            onProximaEtapa={handleProximaEtapaPeticionamento}
          />
        )}

        {etapa === 'disponibilizacao_instrucao' && (
          <DisponibilizacaoInstrucaoAtualizacaoStep 
            produtoSelecionado={atualizacaoData.produtoSelecionado}
            atualizacaoData={atualizacaoData}
            onVoltar={handleVoltarParaPeticionamento}
            onSalvarAtualizacao={handleSalvarAtualizacaoFinal}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};