
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Save, X } from 'lucide-react';

interface AdicionarLicitanteModalProps {
  isOpen: boolean;
  licitante?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AdicionarLicitanteModal: React.FC<AdicionarLicitanteModalProps> = ({
  isOpen,
  licitante,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    modelo: '',
    quantidade: 1,
    valorEntrada: 0,
    valorFinal: 0,
    unidade: 'unidade',
    ranking: '1º',
    preco: 0
  });

  useEffect(() => {
    if (licitante) {
      setFormData({
        nome: licitante.nome || '',
        marca: licitante.marca || '',
        modelo: licitante.modelo || '',
        quantidade: licitante.quantidade || 1,
        valorEntrada: licitante.valorEntrada || 0,
        valorFinal: licitante.valorFinal || 0,
        unidade: licitante.unidade || 'unidade',
        ranking: licitante.ranking || '1º',
        preco: licitante.preco || licitante.valorFinal || 0
      });
    } else {
      setFormData({
        nome: '',
        marca: '',
        modelo: '',
        quantidade: 1,
        valorEntrada: 0,
        valorFinal: 0,
        unidade: 'unidade',
        ranking: '1º',
        preco: 0
      });
    }
  }, [licitante]);

  // Sincronizar preço com valor final
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      preco: prev.valorFinal
    }));
  }, [formData.valorFinal]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.nome.trim()) {
      alert('Nome do licitante é obrigatório');
      return;
    }
    
    if (!formData.marca.trim()) {
      alert('Marca é obrigatória');
      return;
    }

    if (!formData.modelo.trim()) {
      alert('Modelo é obrigatório');
      return;
    }

    if (formData.valorFinal <= 0) {
      alert('Valor final deve ser maior que zero');
      return;
    }

    onSave(formData);
  };

  const rankingOptions = [
    { value: '1º', label: '1º Lugar' },
    { value: '2º', label: '2º Lugar' },
    { value: '3º', label: '3º Lugar' },
    { value: '4º', label: '4º Lugar' },
    { value: '5º', label: '5º Lugar' },
    { value: '6º', label: '6º Lugar' },
    { value: '7º', label: '7º Lugar' },
    { value: '8º', label: '8º Lugar' },
    { value: '9º', label: '9º Lugar' },
    { value: '10º', label: '10º Lugar' },
    { value: 'desclassificado', label: 'Desclassificado' }
  ];

  const unidadeOptions = [
    { value: 'unidade', label: 'Unidade' },
    { value: 'lote', label: 'Lote' },
    { value: 'caixa', label: 'Caixa' },
    { value: 'metro', label: 'Metro' },
    { value: 'kg', label: 'Quilograma' },
    { value: 'litro', label: 'Litro' },
    { value: 'pacote', label: 'Pacote' },
    { value: 'conjunto', label: 'Conjunto' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {licitante ? 'Editar Licitante' : 'Adicionar Licitante'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="nome">Nome do Licitante *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Ex: Empresa ABC Ltda"
            />
          </div>

          <div>
            <Label htmlFor="marca">Marca *</Label>
            <Input
              id="marca"
              value={formData.marca}
              onChange={(e) => handleInputChange('marca', e.target.value)}
              placeholder="Ex: Radiometer"
            />
          </div>

          <div>
            <Label htmlFor="modelo">Modelo *</Label>
            <Input
              id="modelo"
              value={formData.modelo}
              onChange={(e) => handleInputChange('modelo', e.target.value)}
              placeholder="Ex: ABL800 Flex"
            />
          </div>

          <div>
            <Label htmlFor="valorEntrada">Valor de Entrada (R$)</Label>
            <Input
              id="valorEntrada"
              type="number"
              step="0.01"
              min="0"
              value={formData.valorEntrada}
              onChange={(e) => handleInputChange('valorEntrada', parseFloat(e.target.value) || 0)}
              placeholder="0,00"
            />
          </div>

          <div>
            <Label htmlFor="valorFinal">Valor Final (R$) *</Label>
            <Input
              id="valorFinal"
              type="number"
              step="0.01"
              min="0"
              value={formData.valorFinal}
              onChange={(e) => handleInputChange('valorFinal', parseFloat(e.target.value) || 0)}
              placeholder="0,00"
            />
          </div>

          <div>
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input
              id="quantidade"
              type="number"
              min="1"
              value={formData.quantidade}
              onChange={(e) => handleInputChange('quantidade', parseInt(e.target.value) || 1)}
            />
          </div>

          <div>
            <Label htmlFor="unidade">Unidade</Label>
            <Select value={formData.unidade} onValueChange={(value) => handleInputChange('unidade', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                {unidadeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ranking">Ranking</Label>
            <Select value={formData.ranking} onValueChange={(value) => handleInputChange('ranking', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ranking" />
              </SelectTrigger>
              <SelectContent>
                {rankingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            {licitante ? 'Atualizar' : 'Adicionar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarLicitanteModal;
