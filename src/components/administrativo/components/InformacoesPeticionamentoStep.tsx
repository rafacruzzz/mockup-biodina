import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface InformacoesPeticionamentoStepProps {
  produtoSelecionado: any;
  atualizacaoData: any;
  onVoltar: () => void;
  onProximaEtapa: (data: any) => void;
}

export const InformacoesPeticionamentoStep = ({ 
  produtoSelecionado, 
  atualizacaoData, 
  onVoltar, 
  onProximaEtapa 
}: InformacoesPeticionamentoStepProps) => {
  const [formData, setFormData] = useState({
    areaAnvisa: atualizacaoData.areaAnvisa || '',
    transacao: atualizacaoData.transacao || '',
    expediente: atualizacaoData.expediente || '',
    dataEnvio: atualizacaoData.dataEnvio || '',
    dataPublicacaoDOU: atualizacaoData.dataPublicacaoDOU || '',
    numeroPublicacaoDOU: atualizacaoData.numeroPublicacaoDOU || '',
    observacaoGeral: atualizacaoData.observacaoGeral || '',
    dataAlertaDisponibilizacao: atualizacaoData.dataAlertaDisponibilizacao || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProximaEtapa = () => {
    // Validação dos campos obrigatórios
    if (!formData.areaAnvisa) {
      toast.error('Selecione a área da ANVISA');
      return;
    }
    
    const data = {
      ...atualizacaoData,
      ...formData
    };
    
    onProximaEtapa(data);
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
            <div><span className="font-medium">Registro ANVISA:</span> {atualizacaoData.numeroRegistroAnvisa}</div>
            <div><span className="font-medium">Fabricante:</span> {produtoSelecionado?.fabricante}</div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Peticionamento */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Peticionamento da ANVISA</CardTitle>
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
          </div>

          <div>
            <Label htmlFor="observacaoGeral">Observação Geral</Label>
            <Textarea 
              id="observacaoGeral"
              value={formData.observacaoGeral}
              onChange={(e) => handleInputChange('observacaoGeral', e.target.value)}
              placeholder="Observações gerais sobre o peticionamento"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data para Alerta */}
      <Card>
        <CardHeader>
          <CardTitle>Data para Gerar Alerta para Disponibilização de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="dataAlertaDisponibilizacao">Data do Alerta</Label>
            <Input 
              id="dataAlertaDisponibilizacao"
              type="date"
              value={formData.dataAlertaDisponibilizacao}
              onChange={(e) => handleInputChange('dataAlertaDisponibilizacao', e.target.value)}
              className="max-w-xs"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Sistema gerará alerta automático nesta data para disponibilização da instrução de uso
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Resumo da Atualização */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Atualização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Nome do Arquivo Principal:</span>
              <p className="text-muted-foreground">{atualizacaoData.nomeArquivoPrincipal}</p>
            </div>
            <div>
              <span className="font-medium">Documentos de Alteração:</span>
              <p className="text-muted-foreground">{atualizacaoData.documentosAlteracao?.length || 0} documento(s)</p>
            </div>
            <div>
              <span className="font-medium">Protocolo Peticionamento:</span>
              <p className="text-muted-foreground">
                {atualizacaoData.protocoloPeticionamentoAnexado ? 'Anexado' : 'Não anexado'}
              </p>
            </div>
            <div>
              <span className="font-medium">Registro ANVISA:</span>
              <p className="text-muted-foreground">{atualizacaoData.numeroRegistroAnvisa}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onVoltar} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <Button 
          onClick={handleProximaEtapa} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!formData.areaAnvisa}
        >
          Próxima Etapa
        </Button>
      </div>
    </div>
  );
};