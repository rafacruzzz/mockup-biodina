
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save } from "lucide-react";

interface ServiceModalProps {
  onClose: () => void;
}

const ServiceModal = ({ onClose }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    // Informações Básicas
    codigo: "",
    nome: "",
    categoria: "",
    descricao: "",
    descricaoCompleta: "",
    precoUnitario: "",
    ativo: "sim",
    
    // Códigos Municipais e Federais
    codigoServicoMunicipal: "",
    codigoLC116: "",
    codigoNBS: "",
    descricaoNBS: "",
    codigoCNAE: "",
    descricaoCNAE: "",
    codigoCNPJ: "",
    
    // Tributação ISS
    aliquotaISS: "",
    retemISS: false,
    exigibilidade: "",
    municipioIncidencia: "",
    codigoMunicipioIncidencia: "",
    
    // Tributação IRRF
    aliquotaIRRF: "",
    retemIRRF: false,
    
    // Tributação INSS
    aliquotaINSS: "",
    retemINSS: false,
    redBaseINSS: "",
    
    // Configurações Gerais
    tributacaoServicos: "",
    
    // Controle
    inclusao: new Date().toISOString().split('T')[0],
    ultimaAlteracao: new Date().toISOString().split('T')[0],
    incluidoPor: "Usuário Atual",
    alteradoPor: "Usuário Atual"
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      ultimaAlteracao: new Date().toISOString().split('T')[0],
      alteradoPor: "Usuário Atual"
    }));
  };

  const handleSave = () => {
    console.log("Salvando serviço:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-biodina-blue">Cadastro de Serviço</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Informações Básicas */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="codigo">Código</Label>
                  <Input
                    id="codigo"
                    value={formData.codigo}
                    onChange={(e) => handleInputChange("codigo", e.target.value)}
                    placeholder="Ex: SERV001"
                  />
                </div>

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
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultoria">Consultoria</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="suporte">Suporte</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="precoUnitario">Preço Unitário</Label>
                  <Input
                    id="precoUnitario"
                    type="number"
                    step="0.01"
                    value={formData.precoUnitario}
                    onChange={(e) => handleInputChange("precoUnitario", e.target.value)}
                    placeholder="R$ 0,00"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="descricaoCompleta">Descrição Completa</Label>
                  <Textarea
                    id="descricaoCompleta"
                    value={formData.descricaoCompleta}
                    onChange={(e) => handleInputChange("descricaoCompleta", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Códigos e Classificações */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Códigos e Classificações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="codigoServicoMunicipal">Código do Serviço Municipal</Label>
                  <Input
                    id="codigoServicoMunicipal"
                    value={formData.codigoServicoMunicipal}
                    onChange={(e) => handleInputChange("codigoServicoMunicipal", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="codigoLC116">Código LC 116</Label>
                  <Input
                    id="codigoLC116"
                    value={formData.codigoLC116}
                    onChange={(e) => handleInputChange("codigoLC116", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="codigoNBS">Código NBS</Label>
                  <Input
                    id="codigoNBS"
                    value={formData.codigoNBS}
                    onChange={(e) => handleInputChange("codigoNBS", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="descricaoNBS">Descrição NBS</Label>
                  <Input
                    id="descricaoNBS"
                    value={formData.descricaoNBS}
                    onChange={(e) => handleInputChange("descricaoNBS", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="codigoCNAE">Código do CNAE</Label>
                  <Input
                    id="codigoCNAE"
                    value={formData.codigoCNAE}
                    onChange={(e) => handleInputChange("codigoCNAE", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="descricaoCNAE">Descrição CNAE</Label>
                  <Input
                    id="descricaoCNAE"
                    value={formData.descricaoCNAE}
                    onChange={(e) => handleInputChange("descricaoCNAE", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="codigoCNPJ">Código do CNPJ</Label>
                  <Input
                    id="codigoCNPJ"
                    value={formData.codigoCNPJ}
                    onChange={(e) => handleInputChange("codigoCNPJ", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tributação ISS */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Tributação ISS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="aliquotaISS">Alíquota ISS (%)</Label>
                  <Input
                    id="aliquotaISS"
                    type="number"
                    step="0.01"
                    value={formData.aliquotaISS}
                    onChange={(e) => handleInputChange("aliquotaISS", e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="retemISS"
                    checked={formData.retemISS}
                    onCheckedChange={(value) => handleInputChange("retemISS", value as boolean)}
                  />
                  <Label htmlFor="retemISS">Retém ISS</Label>
                </div>

                <div>
                  <Label htmlFor="exigibilidade">Exigibilidade</Label>
                  <Select value={formData.exigibilidade} onValueChange={(value) => handleInputChange("exigibilidade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exigivel">Exigível</SelectItem>
                      <SelectItem value="nao_incidencia">Não Incidência</SelectItem>
                      <SelectItem value="isencao">Isenção</SelectItem>
                      <SelectItem value="exportacao">Exportação</SelectItem>
                      <SelectItem value="imunidade">Imunidade</SelectItem>
                      <SelectItem value="suspensa_decisao">Suspensa por Decisão Judicial</SelectItem>
                      <SelectItem value="suspensa_processo">Suspensa por Processo Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="municipioIncidencia">Município Incidência</Label>
                  <Input
                    id="municipioIncidencia"
                    value={formData.municipioIncidencia}
                    onChange={(e) => handleInputChange("municipioIncidencia", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="codigoMunicipioIncidencia">Código Município Incidência</Label>
                  <Input
                    id="codigoMunicipioIncidencia"
                    value={formData.codigoMunicipioIncidencia}
                    onChange={(e) => handleInputChange("codigoMunicipioIncidencia", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tributação IRRF */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Tributação IRRF</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="aliquotaIRRF">Alíquota IRRF (%)</Label>
                  <Input
                    id="aliquotaIRRF"
                    type="number"
                    step="0.01"
                    value={formData.aliquotaIRRF}
                    onChange={(e) => handleInputChange("aliquotaIRRF", e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="retemIRRF"
                    checked={formData.retemIRRF}
                    onCheckedChange={(value) => handleInputChange("retemIRRF", value as boolean)}
                  />
                  <Label htmlFor="retemIRRF">Retém IRRF</Label>
                </div>
              </div>
            </div>

            {/* Tributação INSS */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Tributação INSS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="aliquotaINSS">Alíquota INSS (%)</Label>
                  <Input
                    id="aliquotaINSS"
                    type="number"
                    step="0.01"
                    value={formData.aliquotaINSS}
                    onChange={(e) => handleInputChange("aliquotaINSS", e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="retemINSS"
                    checked={formData.retemINSS}
                    onCheckedChange={(value) => handleInputChange("retemINSS", value as boolean)}
                  />
                  <Label htmlFor="retemINSS">Retém INSS</Label>
                </div>

                <div>
                  <Label htmlFor="redBaseINSS">Red. Base INSS (%)</Label>
                  <Input
                    id="redBaseINSS"
                    type="number"
                    step="0.01"
                    value={formData.redBaseINSS}
                    onChange={(e) => handleInputChange("redBaseINSS", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Configurações Gerais */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Configurações Gerais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tributacaoServicos">Tributação dos Serviços</Label>
                  <Select value={formData.tributacaoServicos} onValueChange={(value) => handleInputChange("tributacaoServicos", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tributado_municipio">Tributado no município</SelectItem>
                      <SelectItem value="tributado_fora_municipio">Tributado fora do município</SelectItem>
                      <SelectItem value="isento">Isento</SelectItem>
                      <SelectItem value="imune">Imune</SelectItem>
                      <SelectItem value="suspensa">Suspensa por decisão judicial</SelectItem>
                      <SelectItem value="nao_tributado">Não tributado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Controle de Alterações */}
            <div>
              <h3 className="text-lg font-medium text-biodina-blue mb-4">Controle de Alterações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="inclusao">Inclusão</Label>
                  <Input
                    id="inclusao"
                    type="date"
                    value={formData.inclusao}
                    onChange={(e) => handleInputChange("inclusao", e.target.value)}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="ultimaAlteracao">Última Alteração</Label>
                  <Input
                    id="ultimaAlteracao"
                    type="date"
                    value={formData.ultimaAlteracao}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="incluidoPor">Incluído por</Label>
                  <Input
                    id="incluidoPor"
                    value={formData.incluidoPor}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="alteradoPor">Alterado por</Label>
                  <Input
                    id="alteradoPor"
                    value={formData.alteradoPor}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>
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
