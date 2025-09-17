import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FolderPlus, Upload, FileText, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { PastaAnvisa, ArquivoAnvisa, RegistroAnvisaData } from '@/types/anvisaRegistro';
import { FileSystemManager } from './FileSystemManager';
import { toast } from 'sonner';

interface OrganizacaoDocumentosStepProps {
  produtoSelecionado: any;
  onVoltar: () => void;
  onFinalizar: (data: RegistroAnvisaData) => void;
}

export const OrganizacaoDocumentosStep = ({ 
  produtoSelecionado, 
  onVoltar, 
  onFinalizar 
}: OrganizacaoDocumentosStepProps) => {
  const [nomeArquivoPrincipal, setNomeArquivoPrincipal] = useState('');
  const [estruturaArquivos, setEstruturaArquivos] = useState<PastaAnvisa[]>([]);
  const [protocoloPeticionamento, setProtocoloPeticionamento] = useState<ArquivoAnvisa | null>(null);

  const handleFinalizarRegistro = () => {
    if (!nomeArquivoPrincipal.trim()) {
      toast.error('Nome do arquivo principal é obrigatório');
      return;
    }

    if (!protocoloPeticionamento) {
      toast.error('O Protocolo de Peticionamento na ANVISA é obrigatório');
      return;
    }

    const registroData: RegistroAnvisaData = {
      // Etapa 1: Produto Selecionado
      produtoSelecionado,
      
      // Etapa 2: Organização de Documentos
      nomeArquivoPrincipal,
      estruturaArquivos,
      protocoloPeticionamento,
      
      // Etapa 3: Informações Regulatórias (defaults)
      areaAnvisa: '',
      numeroProcessoAnvisa: '',
      assunto: '',
      motivoPeticionamento: '',
      transacao: '',
      expediente: '',
      dataEnvio: '',
      dataPublicacaoDOU: '',
      numeroPublicacaoDOU: '',
      numeroNotificacaoRegistro: '',
      dataAlertaDisponibilizacao: '',
      observacaoGeral: '',
      
      // Informações do Fabricante/Produto (defaults)
      fabricante: '',
      codigoProdutoFabricante: '',
      nomeProdutoFabricante: '',
      nomeDetentorNotificacao: '',
      cnpjDetentor: '',
      nomeProdutoBrasil: '',
      nomeTecnicoAnvisa: '',
      numeroRegistroAnvisa: '',
      situacaoRegistro: '',
      classificacaoRisco: '',
      marca: '',
      modelo: '',
      linha: '',
      apresentacaoPrimaria: '',
      apresentacaoSecundaria: '',
      apresentacaoTerciaria: '',
      referenciasComercializadas: '',
      nomeMarketing: '',
      breveDescritivo: '',
      descritivoCompleto: '',
      tags: '',
      linkConsultaAnvisa: '',
      linkAnaliseConcorrencia: '',
      linkFichaTecnica: '',
      linkBancoImagens: '',
      linkTreinamentoApresentacao: '',
      linkTreinamentoCientifico: '',
      linkTreinamentoManutencao: '',
      
      // Etapa 4: Disponibilização de Instrução de Uso (defaults)
      disponibilizacaoInstrucaoUso: '',
      transacaoInstrucao: '',
      expedienteInstrucao: '',
      dataEnvioInstrucao: '',
      arquivoInstrucaoUso: undefined
    };

    onFinalizar(registroData);
  };

  const formatarTamanhoArquivo = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header com informações do produto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Produto Selecionado: {produtoSelecionado.nome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Código:</span>
              <span className="ml-2 font-medium">{produtoSelecionado.codigo}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Referência:</span>
              <span className="ml-2 font-medium">{produtoSelecionado.referencia}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campo do nome do arquivo principal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nome do Arquivo Principal *</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Digite o nome do arquivo principal do registro"
            value={nomeArquivoPrincipal}
            onChange={(e) => setNomeArquivoPrincipal(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Campo obrigatório do protocolo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="h-4 w-4 text-red-500" />
            Protocolo de Peticionamento na ANVISA *
            <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <input
              type="file"
              id="protocolo-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const novoArquivo: ArquivoAnvisa = {
                    id: Date.now().toString(),
                    nome: 'Protocolo de Peticionamento ANVISA',
                    nomeOriginal: file.name,
                    arquivo: file,
                    tipo: file.type,
                    tamanho: file.size,
                    dataUpload: new Date(),
                    isProtocoloPeticionamento: true
                  };
                  setProtocoloPeticionamento(novoArquivo);
                  toast.success('Protocolo anexado com sucesso');
                }
              }}
            />
            
            {!protocoloPeticionamento ? (
              <Button
                onClick={() => document.getElementById('protocolo-upload')?.click()}
                className="w-full"
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Anexar Protocolo de Peticionamento
              </Button>
            ) : (
              <div className="p-3 border rounded-lg bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{protocoloPeticionamento.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {protocoloPeticionamento.nomeOriginal} • {formatarTamanhoArquivo(protocoloPeticionamento.tamanho)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setProtocoloPeticionamento(null)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gerenciador de Sistema de Arquivos */}
      <FileSystemManager
        estruturaArquivos={estruturaArquivos}
        onEstruturaChange={setEstruturaArquivos}
      />

      {/* Botões de ação */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onVoltar}>
          Voltar para Seleção
        </Button>
        
        <Button onClick={handleFinalizarRegistro}>
          Finalizar Registro ANVISA
        </Button>
      </div>
    </div>
  );
};