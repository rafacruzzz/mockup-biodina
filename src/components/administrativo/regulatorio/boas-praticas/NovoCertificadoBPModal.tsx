import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeracaoDocumentacaoBPTab } from './GeracaoDocumentacaoBPTab';
import { InformacoesRegulatoriasBPTab } from './InformacoesRegulatoriasBPTab';
import { DocumentoBoasPraticas, CertificadoBoasPraticas } from '@/types/boasPraticas';
import { toast } from 'sonner';

interface NovoCertificadoBPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (certificado: CertificadoBoasPraticas) => void;
  certificadoEdit?: CertificadoBoasPraticas;
}

export const NovoCertificadoBPModal = ({ 
  open, 
  onOpenChange, 
  onSave,
  certificadoEdit 
}: NovoCertificadoBPModalProps) => {
  const [activeTab, setActiveTab] = useState<'geracao' | 'informacoes'>('geracao');
  
  // Estados do primeiro tab
  const [nomeArquivoPrincipal, setNomeArquivoPrincipal] = useState(certificadoEdit?.nomeArquivoPrincipal || '');
  const [documentos, setDocumentos] = useState<DocumentoBoasPraticas[]>(certificadoEdit?.documentos || []);
  const [protocoloPeticionamento, setProtocoloPeticionamento] = useState<File | undefined>();
  
  // Estados do segundo tab
  const [fornecedorId, setFornecedorId] = useState(certificadoEdit?.fornecedorId || '');
  const [numeroProcessoAnvisa, setNumeroProcessoAnvisa] = useState(certificadoEdit?.numeroProcessoAnvisa || '');
  const [transacao, setTransacao] = useState(certificadoEdit?.transacao || '');
  const [expediente, setExpediente] = useState(certificadoEdit?.expediente || '');
  const [assunto, setAssunto] = useState(certificadoEdit?.assunto || '');
  const [dataEnvio, setDataEnvio] = useState(certificadoEdit?.dataEnvio || '');
  const [dataPublicacaoDOU, setDataPublicacaoDOU] = useState(certificadoEdit?.dataPublicacaoDOU || '');
  const [numeroPublicacaoDOU, setNumeroPublicacaoDOU] = useState(certificadoEdit?.numeroPublicacaoDOU || '');
  const [observacaoGeral, setObservacaoGeral] = useState(certificadoEdit?.observacaoGeral || '');
  const [arquivoPublicacaoDOU, setArquivoPublicacaoDOU] = useState<File | undefined>();
  const [arquivoCertificadoBoasPraticas, setArquivoCertificadoBoasPraticas] = useState<File | undefined>();
  const [validade, setValidade] = useState(certificadoEdit?.validade || '');

  const handleProximaEtapa = () => {
    setActiveTab('informacoes');
  };

  const handleSalvar = () => {
    if (!nomeArquivoPrincipal || !numeroProcessoAnvisa || !transacao || !expediente || !assunto || !dataEnvio) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    const novoCertificado: CertificadoBoasPraticas = {
      id: certificadoEdit?.id || `cert-${Date.now()}`,
      nomeArquivoPrincipal,
      documentos,
      protocoloPeticionamento,
      nomeProtocolo: protocoloPeticionamento?.name,
      fornecedorId,
      numeroProcessoAnvisa,
      transacao,
      expediente,
      assunto,
      dataEnvio,
      dataPublicacaoDOU,
      numeroPublicacaoDOU,
      observacaoGeral,
      arquivoPublicacaoDOU,
      nomePublicacaoDOU: arquivoPublicacaoDOU?.name,
      arquivoCertificadoBoasPraticas,
      nomeCertificado: arquivoCertificadoBoasPraticas?.name,
      validade,
      status: validade && arquivoCertificadoBoasPraticas ? 'vigente' : 
              dataPublicacaoDOU ? 'publicado' : 
              dataEnvio ? 'enviado' : 'em_preparacao',
      dataCriacao: certificadoEdit?.dataCriacao || new Date(),
      dataAtualizacao: new Date()
    };

    onSave(novoCertificado);
    toast.success(certificadoEdit ? 'Certificado atualizado com sucesso!' : 'Certificado criado com sucesso!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {certificadoEdit ? 'Editar Certificado de Boas Práticas' : 'Novo Certificado de Boas Práticas'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'geracao' | 'informacoes')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="geracao">Geração de Documentação</TabsTrigger>
            <TabsTrigger value="informacoes" disabled={!protocoloPeticionamento}>
              Informações Regulatórias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geracao" className="mt-6">
            <GeracaoDocumentacaoBPTab
              nomeArquivoPrincipal={nomeArquivoPrincipal}
              setNomeArquivoPrincipal={setNomeArquivoPrincipal}
              documentos={documentos}
              setDocumentos={setDocumentos}
              protocoloPeticionamento={protocoloPeticionamento}
              setProtocoloPeticionamento={setProtocoloPeticionamento}
              onProximaEtapa={handleProximaEtapa}
            />
          </TabsContent>

          <TabsContent value="informacoes" className="mt-6">
            <InformacoesRegulatoriasBPTab
              fornecedorId={fornecedorId}
              setFornecedorId={setFornecedorId}
              numeroProcessoAnvisa={numeroProcessoAnvisa}
              setNumeroProcessoAnvisa={setNumeroProcessoAnvisa}
              transacao={transacao}
              setTransacao={setTransacao}
              expediente={expediente}
              setExpediente={setExpediente}
              assunto={assunto}
              setAssunto={setAssunto}
              dataEnvio={dataEnvio}
              setDataEnvio={setDataEnvio}
              dataPublicacaoDOU={dataPublicacaoDOU}
              setDataPublicacaoDOU={setDataPublicacaoDOU}
              numeroPublicacaoDOU={numeroPublicacaoDOU}
              setNumeroPublicacaoDOU={setNumeroPublicacaoDOU}
              observacaoGeral={observacaoGeral}
              setObservacaoGeral={setObservacaoGeral}
              arquivoPublicacaoDOU={arquivoPublicacaoDOU}
              setArquivoPublicacaoDOU={setArquivoPublicacaoDOU}
              arquivoCertificadoBoasPraticas={arquivoCertificadoBoasPraticas}
              setArquivoCertificadoBoasPraticas={setArquivoCertificadoBoasPraticas}
              validade={validade}
              setValidade={setValidade}
            />
            
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSalvar}>
                {certificadoEdit ? 'Atualizar Certificado' : 'Salvar Certificado'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
