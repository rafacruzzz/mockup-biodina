import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, FileText, AlertTriangle, AlertCircle } from 'lucide-react';
import { getAlertaVencimento } from '@/types/boasPraticas';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InformacoesRegulatoriasBPTabProps {
  fornecedorId?: string;
  setFornecedorId: (value: string) => void;
  numeroProcessoAnvisa: string;
  setNumeroProcessoAnvisa: (value: string) => void;
  transacao: string;
  setTransacao: (value: string) => void;
  expediente: string;
  setExpediente: (value: string) => void;
  assunto: string;
  setAssunto: (value: string) => void;
  dataEnvio: string;
  setDataEnvio: (value: string) => void;
  dataPublicacaoDOU?: string;
  setDataPublicacaoDOU: (value: string) => void;
  numeroPublicacaoDOU?: string;
  setNumeroPublicacaoDOU: (value: string) => void;
  observacaoGeral?: string;
  setObservacaoGeral: (value: string) => void;
  arquivoPublicacaoDOU?: File;
  setArquivoPublicacaoDOU: (file: File | undefined) => void;
  arquivoCertificadoBoasPraticas?: File;
  setArquivoCertificadoBoasPraticas: (file: File | undefined) => void;
  validade?: string;
  setValidade: (value: string) => void;
}

export const InformacoesRegulatoriasBPTab = ({
  fornecedorId,
  setFornecedorId,
  numeroProcessoAnvisa,
  setNumeroProcessoAnvisa,
  transacao,
  setTransacao,
  expediente,
  setExpediente,
  assunto,
  setAssunto,
  dataEnvio,
  setDataEnvio,
  dataPublicacaoDOU,
  setDataPublicacaoDOU,
  numeroPublicacaoDOU,
  setNumeroPublicacaoDOU,
  observacaoGeral,
  setObservacaoGeral,
  arquivoPublicacaoDOU,
  setArquivoPublicacaoDOU,
  arquivoCertificadoBoasPraticas,
  setArquivoCertificadoBoasPraticas,
  validade,
  setValidade
}: InformacoesRegulatoriasBPTabProps) => {
  
  const alerta = getAlertaVencimento(validade);

  return (
    <div className="space-y-6">
      {/* Vínculo com Fornecedor */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">Vínculo</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Vincule este certificado a um fornecedor ou empresa
            </p>
          </div>
          <div>
            <Label htmlFor="fornecedor">Fornecedor / Empresa</Label>
            <Input
              id="fornecedor"
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
              placeholder="Selecione ou digite o fornecedor"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Dados do Processo ANVISA */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Dados do Processo ANVISA</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numero-processo">Nº do Processo na Anvisa *</Label>
              <Input
                id="numero-processo"
                value={numeroProcessoAnvisa}
                onChange={(e) => setNumeroProcessoAnvisa(e.target.value)}
                placeholder="Ex: 25351.123456/2024-01"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="transacao">Transação *</Label>
              <Input
                id="transacao"
                value={transacao}
                onChange={(e) => setTransacao(e.target.value)}
                placeholder="Ex: TRN-2024-0001"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="expediente">Expediente *</Label>
              <Input
                id="expediente"
                value={expediente}
                onChange={(e) => setExpediente(e.target.value)}
                placeholder="Ex: EXP-2024-0123"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="data-envio">Data de Envio *</Label>
              <Input
                id="data-envio"
                type="date"
                value={dataEnvio}
                onChange={(e) => setDataEnvio(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="assunto">Assunto *</Label>
            <Input
              id="assunto"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder="Ex: Certificação de Boas Práticas de Fabricação"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Publicação no DOU */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Publicação no DOU</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data-publicacao">Data da Publicação no DOU</Label>
              <Input
                id="data-publicacao"
                type="date"
                value={dataPublicacaoDOU}
                onChange={(e) => setDataPublicacaoDOU(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="numero-publicacao">Número da Publicação no DOU</Label>
              <Input
                id="numero-publicacao"
                value={numeroPublicacaoDOU}
                onChange={(e) => setNumeroPublicacaoDOU(e.target.value)}
                placeholder="Ex: 52-2024"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="arquivo-dou">Anexar Publicação no DOU</Label>
            <Input
              id="arquivo-dou"
              type="file"
              onChange={(e) => setArquivoPublicacaoDOU(e.target.files?.[0])}
              className="mt-1 cursor-pointer"
              accept=".pdf"
            />
            {arquivoPublicacaoDOU && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{arquivoPublicacaoDOU.name}</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Certificado de Boas Práticas */}
      <Card className="p-6 border-2 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Upload className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <Label className="text-base font-semibold">Certificado de Boas Práticas</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Anexe o certificado oficial emitido pela ANVISA
              </p>
              
              <Input
                id="arquivo-certificado"
                type="file"
                onChange={(e) => setArquivoCertificadoBoasPraticas(e.target.files?.[0])}
                className="cursor-pointer"
                accept=".pdf"
              />
              {arquivoCertificadoBoasPraticas && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{arquivoCertificadoBoasPraticas.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Validade */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="validade" className="text-base font-semibold">
              Validade do Certificado
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Informe a data de validade do certificado
            </p>
            <Input
              id="validade"
              type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              className="mt-1"
            />
          </div>
          
          {alerta.tipo && (
            <Alert variant={alerta.tipo === 'danger' ? 'destructive' : 'default'} 
                   className={alerta.tipo === 'warning' ? 'border-yellow-500 bg-yellow-50' : ''}>
              {alerta.tipo === 'danger' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <AlertDescription className={alerta.tipo === 'warning' ? 'text-yellow-800' : ''}>
                {alerta.mensagem}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {/* Observação Geral */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="observacao" className="text-base font-semibold">
              Observação Geral
            </Label>
            <Textarea
              id="observacao"
              value={observacaoGeral}
              onChange={(e) => setObservacaoGeral(e.target.value)}
              placeholder="Adicione observações relevantes sobre o processo..."
              className="mt-2 min-h-[120px]"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
