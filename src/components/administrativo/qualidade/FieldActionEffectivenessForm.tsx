import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
      product: "",
      accountNumberOrName: "",
      submissionDate: "",
      reminder1SentDate: "",
      reminder2SentDate: "",
      recallResponseFormReceived: false,
      newOsVersionInstalled: false,
      stateVersion: "",
      remarks: ""
    }
  );

  const handleSubmit = () => {
    if (!formData.product.trim()) {
      toast.error("Por favor, preencha o campo Product");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      {/* Seção 1: Subsidiary/Distributor Entry */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground border-b pb-2">
          1. Subsidiary/Distributor Entry
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product *</Label>
            <Input
              id="product"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              placeholder="Product name or identifier"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumberOrName">Account number or name</Label>
            <Input
              id="accountNumberOrName"
              value={formData.accountNumberOrName}
              onChange={(e) => setFormData({ ...formData, accountNumberOrName: e.target.value })}
              placeholder="Account number or name"
            />
          </div>
        </div>

        {/* Subseção: Advisory Letter to Customer */}
        <div className="ml-4 space-y-3 border-l-2 border-muted pl-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Advisory Letter to Customer
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="submissionDate">Submission Date</Label>
              <Input
                id="submissionDate"
                type="date"
                value={formData.submissionDate}
                onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder1SentDate">Reminder 1 Sent Date</Label>
              <Input
                id="reminder1SentDate"
                type="date"
                value={formData.reminder1SentDate}
                onChange={(e) => setFormData({ ...formData, reminder1SentDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder2SentDate">Reminder 2 Sent Date</Label>
              <Input
                id="reminder2SentDate"
                type="date"
                value={formData.reminder2SentDate}
                onChange={(e) => setFormData({ ...formData, reminder2SentDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seção 2: Customer Response */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground border-b pb-2">
          2. Customer Response
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="recallResponseFormReceived"
              checked={formData.recallResponseFormReceived}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, recallResponseFormReceived: checked === true })
              }
            />
            <Label htmlFor="recallResponseFormReceived" className="font-normal cursor-pointer">
              Recall Response Form received
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newOsVersionInstalled"
              checked={formData.newOsVersionInstalled}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  newOsVersionInstalled: checked === true,
                  stateVersion: checked === true ? formData.stateVersion : ""
                })
              }
            />
            <Label htmlFor="newOsVersionInstalled" className="font-normal cursor-pointer">
              New (unaffected) OS version is installed
            </Label>
          </div>

          {formData.newOsVersionInstalled && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="stateVersion">State version</Label>
              <Input
                id="stateVersion"
                value={formData.stateVersion}
                onChange={(e) => setFormData({ ...formData, stateVersion: e.target.value })}
                placeholder="Installed version"
              />
            </div>
          )}
        </div>
      </div>

      {/* Seção 4: Remarks */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground border-b pb-2">
          4. Remarks
        </h3>
        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Notes, comments or relevant observations..."
            rows={4}
          />
        </div>
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
