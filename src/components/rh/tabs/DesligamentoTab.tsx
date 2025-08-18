
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Upload, Image as ImageIcon, X } from "lucide-react";
import { ItemDesligamento, DadosDesligamento } from "@/types/colaborador";

interface DesligamentoTabProps {
  formData: DadosDesligamento;
  onInputChange: (field: string, value: any) => void;
}

const itensDesligamentoPadrao: ItemDesligamento[] = [
  { id: '1', nome: 'Crachá hospital', necessario: false, dataEntrega: '', entregue: false },
  { id: '2', nome: 'Crachá empresa', necessario: false, dataEntrega: '', entregue: false },
  { id: '3', nome: 'Cartão estacionamento empresa', necessario: false, dataEntrega: '', entregue: false },
  { id: '4', nome: 'Controle de estacionamento empresa', necessario: false, dataEntrega: '', entregue: false },
  { id: '5', nome: 'Jaleco', necessario: false, dataEntrega: '', entregue: false },
  { id: '6', nome: 'EPIs', necessario: false, dataEntrega: '', entregue: false },
  { id: '7', nome: 'Veículo frota', necessario: false, dataEntrega: '', entregue: false },
  { id: '8', nome: 'Cadastro Uber empresas', necessario: false, dataEntrega: '', entregue: false },
  { id: '9', nome: 'Cartão corporativo', necessario: false, dataEntrega: '', entregue: false },
  { id: '10', nome: 'Notebook e acessórios', necessario: false, dataEntrega: '', entregue: false },
];

const DesligamentoTab = ({ formData, onInputChange }: DesligamentoTabProps) => {
  // Inicializar itens se não existirem
  const itens = formData.itensDesligamento?.length > 0 ? formData.itensDesligamento : itensDesligamentoPadrao;
  
  const itensNecessarios = itens.filter(item => item.necessario);
  const itensEntregues = itens.filter(item => item.necessario && item.entregue);
  const progressoEntrega = itensNecessarios.length > 0 ? (itensEntregues.length / itensNecessarios.length) * 100 : 0;

  const handleItemChange = (itemId: string, field: keyof ItemDesligamento, value: any) => {
    const novosItens = itens.map(item => {
      if (item.id === itemId) {
        const itemAtualizado = { ...item, [field]: value };
        // Se não é mais necessário, limpar data e marcar como não entregue
        if (field === 'necessario' && !value) {
          itemAtualizado.dataEntrega = '';
          itemAtualizado.entregue = false;
          itemAtualizado.imagemComprovante = undefined;
        }
        // Se tem data de entrega, marcar como entregue automaticamente
        if (field === 'dataEntrega' && value) {
          itemAtualizado.entregue = true;
        }
        return itemAtualizado;
      }
      return item;
    });
    
    onInputChange('itensDesligamento', novosItens);
  };

  const handleImageUpload = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Criar URL para preview
      const imageUrl = URL.createObjectURL(file);
      handleItemChange(itemId, 'imagemComprovante', {
        file,
        url: imageUrl,
        nome: file.name
      });
    }
  };

  const removeImage = (itemId: string) => {
    handleItemChange(itemId, 'imagemComprovante', undefined);
  };

  const getStatusIcon = (item: ItemDesligamento) => {
    if (!item.necessario) return null;
    if (item.entregue) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <Clock className="h-4 w-4 text-orange-600" />;
  };

  const getStatusBadge = (item: ItemDesligamento) => {
    if (!item.necessario) return <Badge variant="secondary">Não Necessário</Badge>;
    if (item.entregue) return <Badge className="bg-green-100 text-green-800">Entregue</Badge>;
    return <Badge variant="destructive">Pendente</Badge>;
  };

  return (
    <ScrollArea className="h-[500px] w-full pr-4">
      <div className="space-y-6">
        {/* Informações do Desligamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Informações do Desligamento
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label>Data do Desligamento</Label>
              <Input
                type="date"
                value={formData.dataDesligamento}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label>Processado por</Label>
              <Input
                value={formData.processadoPor}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <Label>Motivo do Desligamento</Label>
              <Textarea
                value={formData.motivoDesligamento}
                readOnly
                className="bg-gray-50"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress da Entrega de Itens */}
        {itensNecessarios.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Progresso das Devoluções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Itens Entregues</span>
                  <span>{itensEntregues.length} de {itensNecessarios.length}</span>
                </div>
                <Progress value={progressoEntrega} className="h-2" />
                <p className="text-xs text-gray-600">
                  {Math.round(progressoEntrega)}% dos itens obrigatórios foram devolvidos
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Itens de Desligamento */}
        <Card>
          <CardHeader>
            <CardTitle>Itens para Devolução</CardTitle>
            <p className="text-sm text-gray-600">
              Marque os itens que devem ser devolvidos pelo colaborador
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {itens.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={item.necessario}
                        onCheckedChange={(checked) => 
                          handleItemChange(item.id, 'necessario', !!checked)
                        }
                      />
                      <Label className="font-medium">{item.nome}</Label>
                      {getStatusIcon(item)}
                    </div>
                    {getStatusBadge(item)}
                  </div>
                  
                  {item.necessario && (
                    <div className="ml-6 space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Label className="text-xs">Data de Entrega</Label>
                          <Input
                            type="date"
                            value={item.dataEntrega}
                            onChange={(e) => 
                              handleItemChange(item.id, 'dataEntrega', e.target.value)
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      {/* Seção de Upload de Imagem */}
                      <div className="space-y-2">
                        <Label className="text-xs">Comprovante Fotográfico</Label>
                        
                        {!item.imagemComprovante ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(item.id, e)}
                              className="hidden"
                              id={`image-${item.id}`}
                            />
                            <label
                              htmlFor={`image-${item.id}`}
                              className="cursor-pointer flex flex-col items-center gap-2"
                            >
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Clique para anexar uma imagem
                              </span>
                            </label>
                          </div>
                        ) : (
                          <div className="relative border rounded-lg p-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imagemComprovante.url}
                                alt={`Comprovante ${item.nome}`}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.imagemComprovante.nome}</p>
                                <p className="text-xs text-gray-600">Comprovante de devolução</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeImage(item.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle>Observações do Desligamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.observacoes}
              onChange={(e) => onInputChange('observacoes', e.target.value)}
              placeholder="Adicione observações sobre o processo de desligamento..."
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default DesligamentoTab;
