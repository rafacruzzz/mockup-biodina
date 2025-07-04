
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Save, Users } from "lucide-react";

interface ConcorrenteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConcorrentesChange: (concorrentes: any[]) => void;
  valorReferencia?: number;
}

const ConcorrenteModal = ({ isOpen, onOpenChange, onConcorrentesChange, valorReferencia = 0 }: ConcorrenteModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    produto: '',
    preco: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConcorrente = {
      id: Date.now(),
      nome: formData.nome,
      preco: formData.preco,
      pontosFortes: formData.produto,
      pontosFracos: ''
    };
    
    onConcorrentesChange([newConcorrente]);
    onOpenChange(false);
    setFormData({ nome: '', produto: '', preco: 0 });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getComparacao = () => {
    if (formData.preco === 0) return null;
    return formData.preco > valorReferencia ? 'Maior' : 'Menor';
  };

  const getComparacaoColor = () => {
    if (formData.preco === 0) return '';
    return formData.preco > valorReferencia ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-biodina-blue" />
            <CardTitle>Adicionar Concorrente</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
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
              <Label htmlFor="produto">Produto/Serviço Concorrente</Label>
              <Input
                id="produto"
                value={formData.produto}
                onChange={(e) => setFormData({...formData, produto: e.target.value})}
                required
                placeholder="Ex: Gasômetro modelo XYZ"
              />
            </div>

            <div>
              <Label htmlFor="preco">Preço Concorrente (R$)</Label>
              <Input
                id="preco"
                type="number"
                value={formData.preco}
                onChange={(e) => setFormData({...formData, preco: Number(e.target.value)})}
                required
                placeholder="0,00"
              />
            </div>

            {formData.preco > 0 && valorReferencia > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Valor de Referência:</span>
                  <span className="font-medium">{formatCurrency(valorReferencia)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Preço Concorrente:</span>
                  <span className="font-medium">{formatCurrency(formData.preco)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Comparação:</span>
                  {getComparacao() && (
                    <Badge className={getComparacaoColor()}>
                      {getComparacao()} que nossa proposta
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
