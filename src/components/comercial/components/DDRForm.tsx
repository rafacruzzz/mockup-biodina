
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface DDRFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const DDRForm = ({ formData, onInputChange }: DDRFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">DDR - Declaração de Destinação Regulamentada</h3>
        <p className="text-sm text-gray-600">Informações regulamentares da importação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ddrNumero">Número da DDR</Label>
          <Input
            id="ddrNumero"
            value={formData.ddrNumero || ''}
            onChange={(e) => onInputChange('ddrNumero', e.target.value)}
            placeholder="DDR-001"
          />
        </div>
        
        <div>
          <Label htmlFor="ddrData">Data de Emissão</Label>
          <Input
            id="ddrData"
            type="date"
            value={formData.ddrData || ''}
            onChange={(e) => onInputChange('ddrData', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ddrImportador">Importador</Label>
          <Input
            id="ddrImportador"
            value={formData.ddrImportador || ''}
            onChange={(e) => onInputChange('ddrImportador', e.target.value)}
            placeholder="Nome do importador"
          />
        </div>
        
        <div>
          <Label htmlFor="ddrCnpjImportador">CNPJ do Importador</Label>
          <Input
            id="ddrCnpjImportador"
            value={formData.ddrCnpjImportador || ''}
            onChange={(e) => onInputChange('ddrCnpjImportador', e.target.value)}
            placeholder="00.000.000/0000-00"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="ddrProduto">Produto/Mercadoria</Label>
        <Input
          id="ddrProduto"
          value={formData.ddrProduto || ''}
          onChange={(e) => onInputChange('ddrProduto', e.target.value)}
          placeholder="Descrição do produto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ddrNcm">NCM</Label>
          <Input
            id="ddrNcm"
            value={formData.ddrNcm || ''}
            onChange={(e) => onInputChange('ddrNcm', e.target.value)}
            placeholder="0000.00.00"
          />
        </div>
        
        <div>
          <Label htmlFor="ddrQuantidade">Quantidade</Label>
          <Input
            id="ddrQuantidade"
            type="number"
            value={formData.ddrQuantidade || ''}
            onChange={(e) => onInputChange('ddrQuantidade', e.target.value)}
            placeholder="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ddrUnidadeMedida">Unidade de Medida</Label>
          <Select value={formData.ddrUnidadeMedida || ''} onValueChange={(value) => onInputChange('ddrUnidadeMedida', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="un">Unidade</SelectItem>
              <SelectItem value="kg">Quilograma</SelectItem>
              <SelectItem value="m">Metro</SelectItem>
              <SelectItem value="m2">Metro Quadrado</SelectItem>
              <SelectItem value="m3">Metro Cúbico</SelectItem>
              <SelectItem value="l">Litro</SelectItem>
              <SelectItem value="pcs">Peças</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ddrValorUnitario">Valor Unitário (USD)</Label>
          <Input
            id="ddrValorUnitario"
            type="number"
            step="0.01"
            value={formData.ddrValorUnitario || ''}
            onChange={(e) => onInputChange('ddrValorUnitario', e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="ddrUsoDestinacao">Uso/Destinação</Label>
        <Select value={formData.ddrUsoDestinacao || ''} onValueChange={(value) => onInputChange('ddrUsoDestinacao', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o uso/destinação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comercializacao">Comercialização</SelectItem>
            <SelectItem value="uso-proprio">Uso Próprio</SelectItem>
            <SelectItem value="industrializacao">Industrialização</SelectItem>
            <SelectItem value="revenda">Revenda</SelectItem>
            <SelectItem value="demonstracao">Demonstração</SelectItem>
            <SelectItem value="pesquisa">Pesquisa e Desenvolvimento</SelectItem>
            <SelectItem value="manutencao">Manutenção</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="ddrJustificativa">Justificativa da Importação</Label>
        <Textarea
          id="ddrJustificativa"
          value={formData.ddrJustificativa || ''}
          onChange={(e) => onInputChange('ddrJustificativa', e.target.value)}
          placeholder="Justificativa técnica ou comercial para a importação"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ddrResponsavelTecnico">Responsável Técnico</Label>
          <Input
            id="ddrResponsavelTecnico"
            value={formData.ddrResponsavelTecnico || ''}
            onChange={(e) => onInputChange('ddrResponsavelTecnico', e.target.value)}
            placeholder="Nome do responsável técnico"
          />
        </div>
        
        <div>
          <Label htmlFor="ddrCreaResponsavel">CREA/CRQ do Responsável</Label>
          <Input
            id="ddrCreaResponsavel"
            value={formData.ddrCreaResponsavel || ''}
            onChange={(e) => onInputChange('ddrCreaResponsavel', e.target.value)}
            placeholder="Número do registro profissional"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Declarações</h4>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ddrDeclaracaoVeracidade"
            checked={formData.ddrDeclaracaoVeracidade || false}
            onCheckedChange={(checked) => onInputChange('ddrDeclaracaoVeracidade', checked)}
          />
          <Label htmlFor="ddrDeclaracaoVeracidade" className="text-sm">
            Declaro a veracidade das informações prestadas
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ddrDeclaracaoRegulamentacao"
            checked={formData.ddrDeclaracaoRegulamentacao || false}
            onCheckedChange={(checked) => onInputChange('ddrDeclaracaoRegulamentacao', checked)}
          />
          <Label htmlFor="ddrDeclaracaoRegulamentacao" className="text-sm">
            Declaro estar ciente da regulamentação aplicável
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ddrDeclaracaoResponsabilidade"
            checked={formData.ddrDeclaracaoResponsabilidade || false}
            onCheckedChange={(checked) => onInputChange('ddrDeclaracaoResponsabilidade', checked)}
          />
          <Label htmlFor="ddrDeclaracaoResponsabilidade" className="text-sm">
            Assumo total responsabilidade pela destinação declarada
          </Label>
        </div>
      </div>

      <div>
        <Label htmlFor="ddrObservacoes">Observações Complementares</Label>
        <Textarea
          id="ddrObservacoes"
          value={formData.ddrObservacoes || ''}
          onChange={(e) => onInputChange('ddrObservacoes', e.target.value)}
          placeholder="Informações adicionais relevantes"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ddrLocalData">Local e Data</Label>
          <Input
            id="ddrLocalData"
            value={formData.ddrLocalData || ''}
            onChange={(e) => onInputChange('ddrLocalData', e.target.value)}
            placeholder="São Paulo, 01/01/2024"
          />
        </div>
        
        <div>
          <Label htmlFor="ddrAssinatura">Assinatura Digital</Label>
          <Input
            id="ddrAssinatura"
            value={formData.ddrAssinatura || ''}
            onChange={(e) => onInputChange('ddrAssinatura', e.target.value)}
            placeholder="Certificado digital ou assinatura eletrônica"
          />
        </div>
      </div>
    </div>
  );
};

export default DDRForm;
