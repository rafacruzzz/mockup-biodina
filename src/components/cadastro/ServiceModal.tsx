
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";

interface ServiceModalProps {
  onClose: () => void;
}

const ServiceModal = ({ onClose }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    unidadeMedida: "",
    valor: "",
    categoria: "",
    ativo: "sim",
    faturavel: "",
    tipoDesconto: "",
    descontoMaximo: "",
    tributacao: "",
    codigoCNAE: "",
    codigoLC116: "",
    informacao: "",
    observacao: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando serviço:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Cadastro de Serviço</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-biodina-blue">Informações básicas do serviço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Ex: Consultoria Farmacêutica"
                />
              </div>

              <div>
                <Label htmlFor="codigo">Código do serviço</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange("codigo", e.target.value)}
                  placeholder="Ex: SERV001"
                />
              </div>

              <div>
                <Label htmlFor="ativo">Ativo</Label>
                <Select value={formData.ativo} onValueChange={(value) => handleInputChange("ativo", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unidadeMedida">Unidade de medida</Label>
                <Select value={formData.unidadeMedida} onValueChange={(value) => handleInputChange("unidadeMedida", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HORA">Hora</SelectItem>
                    <SelectItem value="DIA">Dia</SelectItem>
                    <SelectItem value="SERVICO">Serviço</SelectItem>
                    <SelectItem value="TREINAMENTO">Treinamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="faturavel">Faturável por colaborador</Label>
                <Select value={formData.faturavel} onValueChange={(value) => handleInputChange("faturavel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="categoria">Categoria de serviço</Label>
                <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultoria">Consultoria</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="suporte">Suporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => handleInputChange("valor", e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>

              <div>
                <Label htmlFor="tipoDesconto">Tipo de desconto</Label>
                <Select value={formData.tipoDesconto} onValueChange={(value) => handleInputChange("tipoDesconto", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentual">Percentual</SelectItem>
                    <SelectItem value="valor">Valor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="descontoMaximo">Desconto máximo</Label>
                <Input
                  id="descontoMaximo"
                  value={formData.descontoMaximo}
                  onChange={(e) => handleInputChange("descontoMaximo", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tributacao">Tributação do serviço</Label>
                <Input
                  id="tributacao"
                  value={formData.tributacao}
                  onChange={(e) => handleInputChange("tributacao", e.target.value)}
                  placeholder="Ex: 1 - Tributado no município"
                />
              </div>

              <div>
                <Label htmlFor="codigoCNAE">Código de serviço CNAE</Label>
                <Input
                  id="codigoCNAE"
                  value={formData.codigoCNAE}
                  onChange={(e) => handleInputChange("codigoCNAE", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="codigoLC116">Código de serviço LC 116</Label>
                <Input
                  id="codigoLC116"
                  value={formData.codigoLC116}
                  onChange={(e) => handleInputChange("codigoLC116", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="informacao">Informação</Label>
              <Textarea
                id="informacao"
                value={formData.informacao}
                onChange={(e) => handleInputChange("informacao", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="observacao">Observação</Label>
              <Textarea
                id="observacao"
                value={formData.observacao}
                onChange={(e) => handleInputChange("observacao", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
