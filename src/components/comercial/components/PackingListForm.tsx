
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PackingListFormProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const PackingListForm = ({ formData, onInputChange }: PackingListFormProps) => {
  const [packingItems, setPackingItems] = useState(formData.packingItems || []);

  const addPackingItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: '',
      weight: '',
      dimensions: '',
      observations: ''
    };
    const updatedItems = [...packingItems, newItem];
    setPackingItems(updatedItems);
    onInputChange('packingItems', updatedItems);
  };

  const removePackingItem = (id: number) => {
    const updatedItems = packingItems.filter((item: any) => item.id !== id);
    setPackingItems(updatedItems);
    onInputChange('packingItems', updatedItems);
  };

  const updatePackingItem = (id: number, field: string, value: any) => {
    const updatedItems = packingItems.map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setPackingItems(updatedItems);
    onInputChange('packingItems', updatedItems);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Packing List</h3>
        <p className="text-sm text-gray-600">Lista de embalagem e validações</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="packingNumero">Número da Packing List</Label>
          <Input
            id="packingNumero"
            value={formData.packingNumero || ''}
            onChange={(e) => onInputChange('packingNumero', e.target.value)}
            placeholder="PL-001"
          />
        </div>
        
        <div>
          <Label htmlFor="packingData">Data</Label>
          <Input
            id="packingData"
            type="date"
            value={formData.packingData || ''}
            onChange={(e) => onInputChange('packingData', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="packingPesoTotal">Peso Total (kg)</Label>
          <Input
            id="packingPesoTotal"
            type="number"
            value={formData.packingPesoTotal || ''}
            onChange={(e) => onInputChange('packingPesoTotal', e.target.value)}
            placeholder="0.00"
          />
        </div>
        
        <div>
          <Label htmlFor="packingVolumes">Número de Volumes</Label>
          <Input
            id="packingVolumes"
            type="number"
            value={formData.packingVolumes || ''}
            onChange={(e) => onInputChange('packingVolumes', e.target.value)}
            placeholder="1"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Itens da Embalagem</Label>
          <Button 
            type="button" 
            onClick={addPackingItem}
            variant="outline" 
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>

        {packingItems.map((item: any) => (
          <div key={item.id} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Item {packingItems.indexOf(item) + 1}</h4>
              <Button
                type="button"
                onClick={() => removePackingItem(item.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Descrição</Label>
                <Input
                  value={item.description || ''}
                  onChange={(e) => updatePackingItem(item.id, 'description', e.target.value)}
                  placeholder="Descrição do item"
                />
              </div>
              
              <div>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  value={item.quantity || ''}
                  onChange={(e) => updatePackingItem(item.id, 'quantity', e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Peso (kg)</Label>
                <Input
                  type="number"
                  value={item.weight || ''}
                  onChange={(e) => updatePackingItem(item.id, 'weight', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <Label>Dimensões (cm)</Label>
                <Input
                  value={item.dimensions || ''}
                  onChange={(e) => updatePackingItem(item.id, 'dimensions', e.target.value)}
                  placeholder="L x W x H"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Observações</Label>
              <Textarea
                value={item.observations || ''}
                onChange={(e) => updatePackingItem(item.id, 'observations', e.target.value)}
                placeholder="Observações específicas do item"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Validações</h4>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="packingValidacaoConferencia"
            checked={formData.packingValidacaoConferencia || false}
            onCheckedChange={(checked) => onInputChange('packingValidacaoConferencia', checked)}
          />
          <Label htmlFor="packingValidacaoConferencia">Conferência realizada</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="packingValidacaoPeso"
            checked={formData.packingValidacaoPeso || false}
            onCheckedChange={(checked) => onInputChange('packingValidacaoPeso', checked)}
          />
          <Label htmlFor="packingValidacaoPeso">Peso conferido</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="packingValidacaoRotulagem"
            checked={formData.packingValidacaoRotulagem || false}
            onCheckedChange={(checked) => onInputChange('packingValidacaoRotulagem', checked)}
          />
          <Label htmlFor="packingValidacaoRotulagem">Rotulagem correta</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="packingValidacaoDocumentacao"
            checked={formData.packingValidacaoDocumentacao || false}
            onCheckedChange={(checked) => onInputChange('packingValidacaoDocumentacao', checked)}
          />
          <Label htmlFor="packingValidacaoDocumentacao">Documentação completa</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="packingObservacoesGerais">Observações Gerais</Label>
        <Textarea
          id="packingObservacoesGerais"
          value={formData.packingObservacoesGerais || ''}
          onChange={(e) => onInputChange('packingObservacoesGerais', e.target.value)}
          placeholder="Observações gerais sobre a embalagem"
          rows={3}
        />
      </div>
    </div>
  );
};

export default PackingListForm;
