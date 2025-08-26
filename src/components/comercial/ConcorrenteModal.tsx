
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, Users } from "lucide-react";

interface ConcorrenteModalProps {
  onClose: () => void;
  onSave: (concorrente: any) => void;
}

const ConcorrenteModal = ({ onClose, onSave }: ConcorrenteModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    marcaModelo: '',
    comparativo: '',
    atendeEdital: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-biodina-blue" />
            <CardTitle>Adicionar Concorrente</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Concorrente</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required
                placeholder="Ex: Empresa ABC Ltda"
              />
            </div>

            <div>
              <Label htmlFor="marcaModelo">Marca/Modelo</Label>
              <Input
                id="marcaModelo"
                value={formData.marcaModelo}
                onChange={(e) => setFormData({...formData, marcaModelo: e.target.value})}
                placeholder="Ex: ABL800 Flex"
              />
            </div>

            <div>
              <Label htmlFor="comparativo">Comparativo</Label>
              <Textarea
                id="comparativo"
                value={formData.comparativo}
                onChange={(e) => setFormData({...formData, comparativo: e.target.value})}
                placeholder="Descreva o comparativo técnico..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="atendeEdital">Atende ao Edital?</Label>
              <Select 
                value={formData.atendeEdital} 
                onValueChange={(value) => setFormData({...formData, atendeEdital: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConcorrenteModal;
