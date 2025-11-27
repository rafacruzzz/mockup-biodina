import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldActionEffectivenessData } from "@/types/acaoCampo";
import { toast } from "sonner";

interface FieldActionEffectivenessFormProps {
  initialData?: FieldActionEffectivenessData;
  onSave: (data: FieldActionEffectivenessData) => void;
  onCancel: () => void;
}

export const FieldActionEffectivenessForm = ({
  initialData,
  onSave,
  onCancel
}: FieldActionEffectivenessFormProps) => {
  const [formData, setFormData] = useState<FieldActionEffectivenessData>(
    initialData || {
      productName: "",
      productModel: "",
      serialNumber: "",
      lotNumber: "",
      customerName: "",
      customerCity: "",
      fieldActionDescription: "",
      actionDate: new Date().toISOString().split('T')[0],
      effectivenessResult: "effective",
      observations: ""
    }
  );

  const handleSubmit = () => {
    // Validação
    if (!formData.productName.trim()) {
      toast.error("Por favor, preencha o nome do produto");
      return;
    }
    if (!formData.customerName.trim()) {
      toast.error("Por favor, preencha o nome do cliente");
      return;
    }
    if (!formData.fieldActionDescription.trim()) {
      toast.error("Por favor, preencha a descrição da ação de campo");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Nome do Produto *</Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            placeholder="Ex: Monitor Cardíaco MC-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productModel">Modelo</Label>
          <Input
            id="productModel"
            value={formData.productModel}
            onChange={(e) => setFormData({ ...formData, productModel: e.target.value })}
            placeholder="Ex: MC-500A"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serialNumber">Número de Série</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            placeholder="Ex: SN123456789"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lotNumber">Número do Lote</Label>
          <Input
            id="lotNumber"
            value={formData.lotNumber}
            onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
            placeholder="Ex: LOT-2024-001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerName">Nome do Cliente *</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="Ex: Hospital São Lucas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerCity">Cidade</Label>
          <Input
            id="customerCity"
            value={formData.customerCity}
            onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
            placeholder="Ex: São Paulo - SP"
          />
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="actionDate">Data da Ação</Label>
          <Input
            id="actionDate"
            type="date"
            value={formData.actionDate}
            onChange={(e) => setFormData({ ...formData, actionDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fieldActionDescription">Descrição da Ação de Campo *</Label>
        <Textarea
          id="fieldActionDescription"
          value={formData.fieldActionDescription}
          onChange={(e) => setFormData({ ...formData, fieldActionDescription: e.target.value })}
          placeholder="Descreva detalhadamente a ação de campo realizada..."
          rows={4}
        />
      </div>

      <div className="space-y-3">
        <Label>Resultado da Efetividade *</Label>
        <RadioGroup
          value={formData.effectivenessResult}
          onValueChange={(value: any) => setFormData({ ...formData, effectivenessResult: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="effective" id="effective" />
            <Label htmlFor="effective" className="font-normal cursor-pointer">
              Efetivo - A ação resolveu completamente o problema
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partially_effective" id="partially_effective" />
            <Label htmlFor="partially_effective" className="font-normal cursor-pointer">
              Parcialmente Efetivo - A ação resolveu parcialmente o problema
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_effective" id="not_effective" />
            <Label htmlFor="not_effective" className="font-normal cursor-pointer">
              Não Efetivo - A ação não resolveu o problema
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Observações Adicionais</Label>
        <Textarea
          id="observations"
          value={formData.observations}
          onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
          placeholder="Informações complementares sobre a ação e seus resultados..."
          rows={3}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Salvar Formulário
        </Button>
      </div>
    </div>
  );
};
