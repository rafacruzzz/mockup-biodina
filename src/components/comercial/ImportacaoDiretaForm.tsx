import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Save, FileText } from "lucide-react";

interface ImportacaoDiretaFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
  isModal?: boolean;
}

const ImportacaoDiretaForm = ({ onSave, onCancel, isModal = true }: ImportacaoDiretaFormProps) => {
  const [formData, setFormData] = useState({
    cliente: "",
    contato: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    cnpj: "",
    inscricaoEstadual: "",
    pais: "",
    moeda: "",
    incoterms: "",
    modalidadeFrete: "",
    valorFrete: "",
    seguro: "",
    despesasBancarias: "",
    impostoImportacao: "",
    ipi: "",
    pis: "",
    cofins: "",
    taxaSiscomex: "",
    icms: "",
    valorTotal: "",
    observacoes: "",
    anexos: [] as File[],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, anexos: [...prev.anexos, ...Array.from(e.target.files || [])] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Render content without modal wrapper when isModal is false
  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="comercial" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="comercial">COMERCIAL</TabsTrigger>
          <TabsTrigger value="spi">SPI</TabsTrigger>
          <TabsTrigger value="ovc">OVC</TabsTrigger>
          <TabsTrigger value="nod-so">NOD/SO</TabsTrigger>
          <TabsTrigger value="ddr">DDR</TabsTrigger>
        </TabsList>

        {/* COMERCIAL Tab */}
        <TabsContent value="comercial">
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="geral">Geral</TabsTrigger>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
              <TabsTrigger value="anexos">Anexos</TabsTrigger>
            </TabsList>

            {/* Geral Sub-tab */}
            <TabsContent value="geral">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => handleInputChange("cliente", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contato">Contato</Label>
                  <Input
                    id="contato"
                    value={formData.contato}
                    onChange={(e) => handleInputChange("contato", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange("endereco", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleInputChange("estado", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange("cnpj", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input
                    id="inscricaoEstadual"
                    value={formData.inscricaoEstadual}
                    onChange={(e) => handleInputChange("inscricaoEstadual", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pais">País</Label>
                  <Input
                    id="pais"
                    value={formData.pais}
                    onChange={(e) => handleInputChange("pais", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="moeda">Moeda</Label>
                  <Input
                    id="moeda"
                    value={formData.moeda}
                    onChange={(e) => handleInputChange("moeda", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Produtos Sub-tab */}
            <TabsContent value="produtos">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="incoterms">Incoterms</Label>
                  <Input
                    id="incoterms"
                    value={formData.incoterms}
                    onChange={(e) => handleInputChange("incoterms", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="modalidadeFrete">Modalidade de Frete</Label>
                  <Input
                    id="modalidadeFrete"
                    value={formData.modalidadeFrete}
                    onChange={(e) => handleInputChange("modalidadeFrete", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="valorFrete">Valor do Frete</Label>
                  <Input
                    id="valorFrete"
                    value={formData.valorFrete}
                    onChange={(e) => handleInputChange("valorFrete", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="seguro">Seguro</Label>
                  <Input
                    id="seguro"
                    value={formData.seguro}
                    onChange={(e) => handleInputChange("seguro", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="despesasBancarias">Despesas Bancárias</Label>
                  <Input
                    id="despesasBancarias"
                    value={formData.despesasBancarias}
                    onChange={(e) => handleInputChange("despesasBancarias", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="impostoImportacao">Imposto de Importação</Label>
                  <Input
                    id="impostoImportacao"
                    value={formData.impostoImportacao}
                    onChange={(e) => handleInputChange("impostoImportacao", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ipi">IPI</Label>
                  <Input
                    id="ipi"
                    value={formData.ipi}
                    onChange={(e) => handleInputChange("ipi", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pis">PIS</Label>
                  <Input
                    id="pis"
                    value={formData.pis}
                    onChange={(e) => handleInputChange("pis", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cofins">COFINS</Label>
                  <Input
                    id="cofins"
                    value={formData.cofins}
                    onChange={(e) => handleInputChange("cofins", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="taxaSiscomex">Taxa Siscomex</Label>
                  <Input
                    id="taxaSiscomex"
                    value={formData.taxaSiscomex}
                    onChange={(e) => handleInputChange("taxaSiscomex", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="icms">ICMS</Label>
                  <Input
                    id="icms"
                    value={formData.icms}
                    onChange={(e) => handleInputChange("icms", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="valorTotal">Valor Total</Label>
                <Input
                  id="valorTotal"
                  value={formData.valorTotal}
                  onChange={(e) => handleInputChange("valorTotal", e.target.value)}
                />
              </div>
            </TabsContent>

            {/* Observações Sub-tab */}
            <TabsContent value="observacoes">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                rows={4}
              />
            </TabsContent>

            {/* Anexos Sub-tab */}
            <TabsContent value="anexos">
              <Label htmlFor="anexos">Anexos</Label>
              <Input
                type="file"
                id="anexos"
                multiple
                onChange={handleFileChange}
              />
              {formData.anexos.length > 0 && (
                <ul>
                  {formData.anexos.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* SPI Tab */}
        <TabsContent value="spi">
          <div>
            Em breve, o conteúdo da aba SPI estará disponível aqui!
          </div>
        </TabsContent>

        {/* OVC Tab */}
        <TabsContent value="ovc">
          <div>
            Em breve, o conteúdo da aba OVC estará disponível aqui!
          </div>
        </TabsContent>

        {/* NOD/SO Tab */}
        <TabsContent value="nod-so">
          <div>
            Em breve, o conteúdo da aba NOD/SO estará disponível aqui!
          </div>
        </TabsContent>

        {/* DDR Tab */}
        <TabsContent value="ddr">
          <div>
            Em breve, o conteúdo da aba DDR estará disponível aqui!
          </div>
        </TabsContent>
      </Tabs>

      {/* Form Actions - Only show if it's a modal */}
      {isModal && (
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
          <Button type="button" variant="outline" onClick={onCancel} className="px-8">
            Cancelar
          </Button>
          <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90 px-8">
            <Save className="h-4 w-4 mr-2" />
            Salvar Importação Direta
          </Button>
        </div>
      )}
    </form>
  );

  // Return modal wrapper only if isModal is true
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-biodina-gold/10 rounded-lg">
                  <FileText className="h-6 w-6 text-biodina-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-biodina-blue">Nova Importação Direta</h2>
                  <p className="text-gray-600">Cadastre uma nova importação direta no sistema</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="p-6">
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  // Return just the form content for the dedicated page
  return formContent;
};

export default ImportacaoDiretaForm;
