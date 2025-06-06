
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NOMainFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NOMainForm = ({ formData, onInputChange }: NOMainFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="noDestinatario">Destinatário</Label>
          <Input
            id="noDestinatario"
            value={formData.noDestinatario || ''}
            onChange={(e) => onInputChange('noDestinatario', e.target.value)}
            placeholder="Nome do destinatário"
          />
        </div>
        
        <div>
          <Label htmlFor="noAtencao">Atenção</Label>
          <Input
            id="noAtencao"
            value={formData.noAtencao || ''}
            onChange={(e) => onInputChange('noAtencao', e.target.value)}
            placeholder="Pessoa de contato"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="noAssunto">Assunto</Label>
        <Input
          id="noAssunto"
          value={formData.noAssunto || ''}
          onChange={(e) => onInputChange('noAssunto', e.target.value)}
          placeholder="Assunto do pedido"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="noCliente">Cliente</Label>
          <Input
            id="noCliente"
            value={formData.noCliente || ''}
            onChange={(e) => onInputChange('noCliente', e.target.value)}
            placeholder="Nome do cliente"
          />
        </div>
        
        <div>
          <Label htmlFor="noConsignadoPara">Consignado Para</Label>
          <Input
            id="noConsignadoPara"
            value={formData.noConsignadoPara || ''}
            onChange={(e) => onInputChange('noConsignadoPara', e.target.value)}
            placeholder="Destinatário final"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="noEnderecoConsignado">Endereço Consignado</Label>
          <Textarea
            id="noEnderecoConsignado"
            value={formData.noEnderecoConsignado || ''}
            onChange={(e) => onInputChange('noEnderecoConsignado', e.target.value)}
            placeholder="Endereço completo"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="noCepConsignado">CEP Consignado</Label>
          <Input
            id="noCepConsignado"
            value={formData.noCepConsignado || ''}
            onChange={(e) => onInputChange('noCepConsignado', e.target.value)}
            placeholder="00000-000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="noCnpjConsignado">CNPJ Consignado</Label>
        <Input
          id="noCnpjConsignado"
          value={formData.noCnpjConsignado || ''}
          onChange={(e) => onInputChange('noCnpjConsignado', e.target.value)}
          placeholder="00.000.000/0000-00"
        />
      </div>

      <div>
        <Label htmlFor="noTermoPagamento">Termo de Pagamento</Label>
        <Input
          id="noTermoPagamento"
          value={formData.noTermoPagamento || ''}
          onChange={(e) => onInputChange('noTermoPagamento', e.target.value)}
          placeholder="Condições de pagamento"
        />
      </div>

      <div>
        <Label htmlFor="noInstrucaoEnvio">Instrução de Envio</Label>
        <Textarea
          id="noInstrucaoEnvio"
          value={formData.noInstrucaoEnvio || ''}
          onChange={(e) => onInputChange('noInstrucaoEnvio', e.target.value)}
          placeholder="Instruções especiais para envio"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="noAssinante">Assinante</Label>
          <Input
            id="noAssinante"
            value={formData.noAssinante || ''}
            onChange={(e) => onInputChange('noAssinante', e.target.value)}
            placeholder="Nome do responsável"
          />
        </div>
        
        <div>
          <Label htmlFor="noCargo">Cargo</Label>
          <Input
            id="noCargo"
            value={formData.noCargo || ''}
            onChange={(e) => onInputChange('noCargo', e.target.value)}
            placeholder="Cargo do responsável"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="noEaa">EAA</Label>
        <Input
          id="noEaa"
          value={formData.noEaa || ''}
          onChange={(e) => onInputChange('noEaa', e.target.value)}
          placeholder="Número EAA"
        />
      </div>
    </div>
  );
};

export default NOMainForm;
