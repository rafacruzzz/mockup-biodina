
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InstrucaoEmbarqueFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const InstrucaoEmbarqueForm = ({ formData, onInputChange }: InstrucaoEmbarqueFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Instrução de Embarque</h3>
        <p className="text-sm text-gray-600">Informações para preparação do embarque</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="embarquePortoOrigem">Porto de Origem</Label>
          <Input
            id="embarquePortoOrigem"
            value={formData.embarquePortoOrigem || ''}
            onChange={(e) => onInputChange('embarquePortoOrigem', e.target.value)}
            placeholder="Porto de saída"
          />
        </div>
        
        <div>
          <Label htmlFor="embarquePortoDestino">Porto de Destino</Label>
          <Input
            id="embarquePortoDestino"
            value={formData.embarquePortoDestino || ''}
            onChange={(e) => onInputChange('embarquePortoDestino', e.target.value)}
            placeholder="Porto de chegada"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="embarqueDataPrevista">Data Prevista de Embarque</Label>
          <Input
            id="embarqueDataPrevista"
            type="date"
            value={formData.embarqueDataPrevista || ''}
            onChange={(e) => onInputChange('embarqueDataPrevista', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="embarqueModalTransporte">Modal de Transporte</Label>
          <Select value={formData.embarqueModalTransporte || ''} onValueChange={(value) => onInputChange('embarqueModalTransporte', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o modal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aereo">Aéreo</SelectItem>
              <SelectItem value="maritimo">Marítimo</SelectItem>
              <SelectItem value="rodoviario">Rodoviário</SelectItem>
              <SelectItem value="ferroviario">Ferroviário</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="embarqueTransportadora">Transportadora</Label>
        <Input
          id="embarqueTransportadora"
          value={formData.embarqueTransportadora || ''}
          onChange={(e) => onInputChange('embarqueTransportadora', e.target.value)}
          placeholder="Nome da empresa transportadora"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="embarqueIncoterm">Incoterm</Label>
          <Select value={formData.embarqueIncoterm || ''} onValueChange={(value) => onInputChange('embarqueIncoterm', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o Incoterm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exw">EXW - Ex Works</SelectItem>
              <SelectItem value="fca">FCA - Free Carrier</SelectItem>
              <SelectItem value="fas">FAS - Free Alongside Ship</SelectItem>
              <SelectItem value="fob">FOB - Free on Board</SelectItem>
              <SelectItem value="cfr">CFR - Cost and Freight</SelectItem>
              <SelectItem value="cif">CIF - Cost, Insurance and Freight</SelectItem>
              <SelectItem value="cpt">CPT - Carriage Paid To</SelectItem>
              <SelectItem value="cip">CIP - Carriage and Insurance Paid To</SelectItem>
              <SelectItem value="dap">DAP - Delivered at Place</SelectItem>
              <SelectItem value="dpu">DPU - Delivered at Place Unloaded</SelectItem>
              <SelectItem value="ddp">DDP - Delivered Duty Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="embarqueSeguro">Seguro</Label>
          <Select value={formData.embarqueSeguro || ''} onValueChange={(value) => onInputChange('embarqueSeguro', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Responsável pelo seguro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendedor">Por conta do vendedor</SelectItem>
              <SelectItem value="comprador">Por conta do comprador</SelectItem>
              <SelectItem value="nao-aplicavel">Não aplicável</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="embarqueObservacoes">Observações</Label>
        <Textarea
          id="embarqueObservacoes"
          value={formData.embarqueObservacoes || ''}
          onChange={(e) => onInputChange('embarqueObservacoes', e.target.value)}
          placeholder="Instruções especiais para o embarque"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="embarqueContato">Contato do Embarcador</Label>
          <Input
            id="embarqueContato"
            value={formData.embarqueContato || ''}
            onChange={(e) => onInputChange('embarqueContato', e.target.value)}
            placeholder="Nome e telefone"
          />
        </div>
        
        <div>
          <Label htmlFor="embarqueDocumentacao">Documentação Necessária</Label>
          <Input
            id="embarqueDocumentacao"
            value={formData.embarqueDocumentacao || ''}
            onChange={(e) => onInputChange('embarqueDocumentacao', e.target.value)}
            placeholder="Lista de documentos"
          />
        </div>
      </div>
    </div>
  );
};

export default InstrucaoEmbarqueForm;
