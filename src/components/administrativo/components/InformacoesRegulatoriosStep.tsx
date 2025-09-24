import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { RegistroAnvisaData } from '@/types/anvisaRegistro';
import { generateAnvisaPDF } from '../utils/anvisaPDFUtils';
import { LinkFileUpload } from './LinkFileUpload';

interface InformacoesRegulatoriosStepProps {
  produtoSelecionado: any;
  registroData: RegistroAnvisaData;
  onVoltar: () => void;
  onProximaEtapa: (data: RegistroAnvisaData) => void;
}

export const InformacoesRegulatoriosStep = ({ 
  produtoSelecionado, 
  registroData, 
  onVoltar, 
  onProximaEtapa 
}: InformacoesRegulatoriosStepProps) => {
  const [formData, setFormData] = useState<RegistroAnvisaData>(registroData);
  const [arquivos, setArquivos] = useState<{[key: string]: File | null}>({
    linkConsultaAnvisa: null,
    linkAnaliseConcorrencia: null,
    linkFichaTecnica: null,
    linkBancoImagens: null,
    linkTreinamentoApresentacao: null,
    linkTreinamentoCientifico: null,
    linkTreinamentoManutencao: null
  });

  const handleInputChange = (field: keyof RegistroAnvisaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setArquivos(prev => ({ ...prev, [field]: file }));
  };

  const handleGerarPDF = () => {
    try {
      generateAnvisaPDF(formData);
      toast.success('PDF gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar PDF');
    }
  };

  const handleProximaEtapa = () => {
    // Validação dos campos obrigatórios
    if (!formData.areaAnvisa || !formData.numeroProcessoAnvisa) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    onProximaEtapa(formData);
    toast.success('Informações regulatórias salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Produto Selecionado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Produto Selecionado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Código:</span> {produtoSelecionado?.codigo}</div>
            <div><span className="font-medium">Nome:</span> {produtoSelecionado?.nome}</div>
            <div><span className="font-medium">Marca:</span> {produtoSelecionado?.marca}</div>
            <div><span className="font-medium">Fabricante:</span> {produtoSelecionado?.fabricante}</div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Regulatórias Base */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Regulatórias da ANVISA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="areaAnvisa">Área da Anvisa *</Label>
              <Select value={formData.areaAnvisa} onValueChange={(value) => handleInputChange('areaAnvisa', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produtos_saude">Produtos para Saúde (Correlatos)</SelectItem>
                  <SelectItem value="diagnostico_in_vitro">Produto para diagnóstico de uso in vitro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="numeroProcessoAnvisa">Nº do processo na Anvisa *</Label>
              <Input 
                id="numeroProcessoAnvisa"
                value={formData.numeroProcessoAnvisa}
                onChange={(e) => handleInputChange('numeroProcessoAnvisa', e.target.value)}
                placeholder="Número do processo"
              />
            </div>

            <div>
              <Label htmlFor="transacao">Transação</Label>
              <Input 
                id="transacao"
                value={formData.transacao}
                onChange={(e) => handleInputChange('transacao', e.target.value)}
                placeholder="Número da transação"
              />
            </div>

            <div>
              <Label htmlFor="expediente">Expediente</Label>
              <Input 
                id="expediente"
                value={formData.expediente}
                onChange={(e) => handleInputChange('expediente', e.target.value)}
                placeholder="Número do expediente"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datas e Publicações */}
      <Card>
        <CardHeader>
          <CardTitle>Datas e Publicações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataEnvio">Data de envio</Label>
              <Input 
                id="dataEnvio"
                type="date"
                value={formData.dataEnvio}
                onChange={(e) => handleInputChange('dataEnvio', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dataPublicacaoDOU">Data da Publicação no DOU</Label>
              <Input 
                id="dataPublicacaoDOU"
                type="date"
                value={formData.dataPublicacaoDOU}
                onChange={(e) => handleInputChange('dataPublicacaoDOU', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="numeroPublicacaoDOU">Número da Publicação no DOU</Label>
              <Input 
                id="numeroPublicacaoDOU"
                value={formData.numeroPublicacaoDOU}
                onChange={(e) => handleInputChange('numeroPublicacaoDOU', e.target.value)}
                placeholder="Número da publicação"
              />
            </div>

            <div>
              <Label htmlFor="numeroNotificacaoRegistro">Nº Notificação/Registro da Anvisa</Label>
              <Input 
                id="numeroNotificacaoRegistro"
                value={formData.numeroNotificacaoRegistro}
                onChange={(e) => handleInputChange('numeroNotificacaoRegistro', e.target.value)}
                placeholder="Número da notificação/registro"
              />
            </div>

            <div>
              <Label htmlFor="dataAlertaDisponibilizacao">Data para gerar alerta para disponibilização de uso</Label>
              <Input 
                id="dataAlertaDisponibilizacao"
                type="date"
                value={formData.dataAlertaDisponibilizacao}
                onChange={(e) => handleInputChange('dataAlertaDisponibilizacao', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="observacaoGeral">Observação Geral</Label>
            <Textarea 
              id="observacaoGeral"
              value={formData.observacaoGeral}
              onChange={(e) => handleInputChange('observacaoGeral', e.target.value)}
              placeholder="Observações gerais sobre o registro"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Informações do Fabricante/Produto */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Fabricante/Produto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fabricante">Fabricante</Label>
              <Input 
                id="fabricante"
                value={formData.fabricante || produtoSelecionado?.fabricante}
                onChange={(e) => handleInputChange('fabricante', e.target.value)}
                placeholder="Nome do fabricante"
              />
            </div>

            <div>
              <Label htmlFor="codigoProdutoFabricante">Código do Produto (fabricante)</Label>
              <Input 
                id="codigoProdutoFabricante"
                value={formData.codigoProdutoFabricante}
                onChange={(e) => handleInputChange('codigoProdutoFabricante', e.target.value)}
                placeholder="Código original do fabricante"
              />
            </div>

            <div>
              <Label htmlFor="nomeProdutoFabricante">Nome do Produto (fabricante)</Label>
              <Input 
                id="nomeProdutoFabricante"
                value={formData.nomeProdutoFabricante}
                onChange={(e) => handleInputChange('nomeProdutoFabricante', e.target.value)}
                placeholder="Nome técnico fornecido pelo fabricante"
              />
            </div>

            <div>
              <Label htmlFor="nomeDetentorNotificacao">Nome do Detentor da Notificação/Registro</Label>
              <Input 
                id="nomeDetentorNotificacao"
                value={formData.nomeDetentorNotificacao}
                onChange={(e) => handleInputChange('nomeDetentorNotificacao', e.target.value)}
                placeholder="Nome da empresa detentora"
              />
            </div>

            <div>
              <Label htmlFor="cnpjDetentor">CNPJ do Detentor</Label>
              <Input 
                id="cnpjDetentor"
                value={formData.cnpjDetentor}
                onChange={(e) => handleInputChange('cnpjDetentor', e.target.value)}
                placeholder="XX.XXX.XXX/XXXX-XX"
              />
            </div>

            <div>
              <Label htmlFor="nomeProdutoBrasil">Nome do Produto no Brasil</Label>
              <Input 
                id="nomeProdutoBrasil"
                value={formData.nomeProdutoBrasil}
                onChange={(e) => handleInputChange('nomeProdutoBrasil', e.target.value)}
                placeholder="Nome atribuído pelo detentor"
              />
            </div>

            <div>
              <Label htmlFor="nomeTecnicoAnvisa">Nome Técnico na Anvisa</Label>
              <Input 
                id="nomeTecnicoAnvisa"
                value={formData.nomeTecnicoAnvisa}
                onChange={(e) => handleInputChange('nomeTecnicoAnvisa', e.target.value)}
                placeholder="Nome padronizado na Anvisa"
              />
            </div>

            <div>
              <Label htmlFor="numeroRegistroAnvisa">Número do Registro na Anvisa</Label>
              <Input 
                id="numeroRegistroAnvisa"
                value={formData.numeroRegistroAnvisa}
                onChange={(e) => handleInputChange('numeroRegistroAnvisa', e.target.value)}
                placeholder="Número do produto na Anvisa"
              />
            </div>

            <div>
              <Label htmlFor="situacaoRegistro">Situação do Registro na Anvisa</Label>
              <Select value={formData.situacaoRegistro} onValueChange={(value) => handleInputChange('situacaoRegistro', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Situação do registro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valido">Válido</SelectItem>
                  <SelectItem value="invalido">Inválido</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="classificacaoRisco">Classificação de Risco</Label>
              <Select value={formData.classificacaoRisco} onValueChange={(value) => handleInputChange('classificacaoRisco', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Classe de risco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classe_i">Classe I</SelectItem>
                  <SelectItem value="classe_ii">Classe II</SelectItem>
                  <SelectItem value="classe_iii">Classe III</SelectItem>
                  <SelectItem value="classe_iv">Classe IV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="marca">Marca</Label>
              <Input 
                id="marca"
                value={formData.marca || produtoSelecionado?.marca}
                onChange={(e) => handleInputChange('marca', e.target.value)}
                placeholder="Marca do produto"
              />
            </div>

            <div>
              <Label htmlFor="modelo">Modelo</Label>
              <Input 
                id="modelo"
                value={formData.modelo || produtoSelecionado?.modelo}
                onChange={(e) => handleInputChange('modelo', e.target.value)}
                placeholder="Modelo do produto"
              />
            </div>

            <div>
              <Label htmlFor="linha">Linha</Label>
              <Input 
                id="linha"
                value={formData.linha}
                onChange={(e) => handleInputChange('linha', e.target.value)}
                placeholder="Linha do produto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="apresentacaoPrimaria">Apresentação Primária</Label>
              <Input 
                id="apresentacaoPrimaria"
                value={formData.apresentacaoPrimaria}
                onChange={(e) => handleInputChange('apresentacaoPrimaria', e.target.value)}
                placeholder="Unidade"
              />
            </div>

            <div>
              <Label htmlFor="apresentacaoSecundaria">Apresentação Secundária</Label>
              <Input 
                id="apresentacaoSecundaria"
                value={formData.apresentacaoSecundaria}
                onChange={(e) => handleInputChange('apresentacaoSecundaria', e.target.value)}
                placeholder="Caixinha"
              />
            </div>

            <div>
              <Label htmlFor="apresentacaoTerciaria">Apresentação Terciária</Label>
              <Input 
                id="apresentacaoTerciaria"
                value={formData.apresentacaoTerciaria}
                onChange={(e) => handleInputChange('apresentacaoTerciaria', e.target.value)}
                placeholder="Caixa grande"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="referenciasComercializadas">Todas as referências comercializadas</Label>
            <Textarea 
              id="referenciasComercializadas"
              value={formData.referenciasComercializadas}
              onChange={(e) => handleInputChange('referenciasComercializadas', e.target.value)}
              placeholder="Relação de todas as referências comercializadas dessa família de produtos"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="nomeMarketing">Nome de Marketing do Produto</Label>
            <Input 
              id="nomeMarketing"
              value={formData.nomeMarketing}
              onChange={(e) => handleInputChange('nomeMarketing', e.target.value)}
              placeholder="Nome para site ou lojas online (curto e direto)"
            />
          </div>

          <div>
            <Label htmlFor="breveDescritivo">Breve descritivo do produto (título - 1 linha)</Label>
            <Input 
              id="breveDescritivo"
              value={formData.breveDescritivo}
              onChange={(e) => handleInputChange('breveDescritivo', e.target.value)}
              placeholder="Descritivo curto para site ou lojas online"
            />
          </div>

          <div>
            <Label htmlFor="descritivoCompleto">Descritivo completo do produto (até 600 caracteres)</Label>
            <Textarea 
              id="descritivoCompleto"
              value={formData.descritivoCompleto}
              onChange={(e) => handleInputChange('descritivoCompleto', e.target.value)}
              placeholder="Descritivo completo com foco comercial para site ou lojas online"
              rows={4}
              maxLength={600}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.descritivoCompleto?.length || 0}/600 caracteres
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input 
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="Palavras-chave separadas por vírgulas"
            />
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links e Documentação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <LinkFileUpload
              id="linkConsultaAnvisa"
              label="Link para consulta na Anvisa"
              linkValue={formData.linkConsultaAnvisa}
              onLinkChange={(value) => handleInputChange('linkConsultaAnvisa', value)}
              onFileChange={(file) => handleFileChange('linkConsultaAnvisa', file)}
              uploadedFile={arquivos.linkConsultaAnvisa}
              placeholder="https://consultas.anvisa.gov.br/"
            />

            <LinkFileUpload
              id="linkAnaliseConcorrencia"
              label="Diferenciais e Comparativos"
              linkValue={formData.linkAnaliseConcorrencia}
              onLinkChange={(value) => handleInputChange('linkAnaliseConcorrencia', value)}
              onFileChange={(file) => handleFileChange('linkAnaliseConcorrencia', file)}
              uploadedFile={arquivos.linkAnaliseConcorrencia}
              placeholder="Link análise concorrência"
            />

            <LinkFileUpload
              id="linkFichaTecnica"
              label="Ficha Técnica - Instrução de Uso - Manual"
              linkValue={formData.linkFichaTecnica}
              onLinkChange={(value) => handleInputChange('linkFichaTecnica', value)}
              onFileChange={(file) => handleFileChange('linkFichaTecnica', file)}
              uploadedFile={arquivos.linkFichaTecnica}
              placeholder="Link manual"
            />

            <LinkFileUpload
              id="linkBancoImagens"
              label="Banco de Imagens do Produto"
              linkValue={formData.linkBancoImagens}
              onLinkChange={(value) => handleInputChange('linkBancoImagens', value)}
              onFileChange={(file) => handleFileChange('linkBancoImagens', file)}
              uploadedFile={arquivos.linkBancoImagens}
              placeholder="Link imagens"
            />

            <LinkFileUpload
              id="linkTreinamentoApresentacao"
              label="Treinamento Científico de Apresentação"
              linkValue={formData.linkTreinamentoApresentacao}
              onLinkChange={(value) => handleInputChange('linkTreinamentoApresentacao', value)}
              onFileChange={(file) => handleFileChange('linkTreinamentoApresentacao', file)}
              uploadedFile={arquivos.linkTreinamentoApresentacao}
              placeholder="Link training SSJ"
            />

            <LinkFileUpload
              id="linkTreinamentoCientifico"
              label="Treinamento Científico do Produto"
              linkValue={formData.linkTreinamentoCientifico}
              onLinkChange={(value) => handleInputChange('linkTreinamentoCientifico', value)}
              onFileChange={(file) => handleFileChange('linkTreinamentoCientifico', file)}
              uploadedFile={arquivos.linkTreinamentoCientifico}
              placeholder="Link training Assessoria"
            />

            <LinkFileUpload
              id="linkTreinamentoManutencao"
              label="Treinamento de Manutenção do Produto"
              linkValue={formData.linkTreinamentoManutencao}
              onLinkChange={(value) => handleInputChange('linkTreinamentoManutencao', value)}
              onFileChange={(file) => handleFileChange('linkTreinamentoManutencao', file)}
              uploadedFile={arquivos.linkTreinamentoManutencao}
              placeholder="Link training Técnico"
            />
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onVoltar} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGerarPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Gerar PDF
          </Button>
          
          <Button onClick={handleProximaEtapa} className="bg-blue-600 hover:bg-blue-700">
            Próxima Etapa
          </Button>
        </div>
      </div>
    </div>
  );
};