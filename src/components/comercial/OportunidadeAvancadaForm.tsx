import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PedidoCompleto } from '@/types/comercial';

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const [formData, setFormData] = useState({
    resumoEdital: oportunidade?.resumoEdital || '',
    analiseTecnica: oportunidade?.analiseTecnica || '',
    solicitarAnaliseTecnica: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSolicitarAnaliseTecnica = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      solicitarAnaliseTecnica: checked
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Oportunidade Avançada</DialogTitle>
        </DialogHeader>

        <Tabs className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dados">Dados</TabsTrigger>
            <TabsTrigger value="analise">Análise</TabsTrigger>
          </TabsList>

          <TabsContent value="dados" className="space-y-4">
            <div>
              <Label htmlFor="resumoEdital">Resumo do Edital</Label>
              <Textarea
                id="resumoEdital"
                value={formData.resumoEdital}
                onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                placeholder="Digite o resumo do edital..."
                rows={4}
                className="w-full"
              />
            </div>

            {/* Solicitar Análise Técnica - Movido para cá */}
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="solicitarAnaliseTecnica"
                checked={formData.solicitarAnaliseTecnica}
                onCheckedChange={handleSolicitarAnaliseTecnica}
              />
              <Label 
                htmlFor="solicitarAnaliseTecnica"
                className="text-sm cursor-pointer"
              >
                Solicitar análise técnica
              </Label>
            </div>

            {/* Análise Técnica - Movido para cá */}
            <div>
              <Label htmlFor="analiseTecnica">Análise Técnica</Label>
              <p className="text-sm text-gray-600 mb-2">
                Este campo será preenchido pelo setor técnico após análise detalhada do edital.
              </p>
              <Textarea
                id="analiseTecnica"
                value={formData.analiseTecnica}
                onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                placeholder="Análise técnica será preenchida pelo setor técnico..."
                rows={6}
                className="w-full"
                disabled={!formData.analiseTecnica}
                readOnly={!formData.analiseTecnica}
              />
            </div>
          </TabsContent>

          <TabsContent value="analise" className="space-y-4">
            {/* Additional analysis content can go here */}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            Salvar Oportunidade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeAvancadaForm;
