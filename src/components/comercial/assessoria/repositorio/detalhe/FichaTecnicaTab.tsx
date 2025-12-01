import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Produto } from "@/types/produto";
import { FileText, Edit, Save, Settings, Box, Building2, Thermometer, Shield, Package } from "lucide-react";
import { toast } from "sonner";

interface FichaTecnicaTabProps {
  produto: Produto;
  highlightIncomplete?: boolean;
}

export function FichaTecnicaTab({ produto, highlightIncomplete }: FichaTecnicaTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    parametrosChave: produto.parametrosChave || "",
    compatibilidades: produto.compatibilidades || "",
    requisitosInfraestrutura: produto.requisitosInfraestrutura || "",
    condicoesAmbientais: produto.condicoesAmbientais || "",
    conformidadesNormas: produto.conformidadesNormas || "",
  });

  const handleSave = () => {
    // Aqui seria a chamada para salvar no backend
    setIsEditing(false);
    toast.success("Especificações técnicas atualizadas com sucesso");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Modelo de Produto Médico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Modelo de Produto Médico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{produto.modeloProdutoMedico || "Informação não cadastrada"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Especificações Técnicas
            </div>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Parâmetros/Chaves */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm">Parâmetros/Chaves</h4>
            </div>
            {!isEditing ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {formData.parametrosChave || "Informações não cadastradas"}
              </p>
            ) : (
              <Textarea
                value={formData.parametrosChave}
                onChange={(e) => handleChange("parametrosChave", e.target.value)}
                placeholder="Ex.: Faixa de medição, precisão, vazão..."
                className="min-h-[100px]"
                maxLength={1000}
              />
            )}
          </div>

          {/* Compatibilidades */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Box className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm">Compatibilidades</h4>
            </div>
            {!isEditing ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {formData.compatibilidades || "Informações não cadastradas"}
              </p>
            ) : (
              <Textarea
                value={formData.compatibilidades}
                onChange={(e) => handleChange("compatibilidades", e.target.value)}
                placeholder="Equipamentos, reagentes, acessórios compatíveis..."
                className="min-h-[100px]"
                maxLength={1000}
              />
            )}
          </div>

          {/* Requisitos de Infraestrutura */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm">Requisitos de Infraestrutura</h4>
            </div>
            {!isEditing ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {formData.requisitosInfraestrutura || "Informações não cadastradas"}
              </p>
            ) : (
              <Textarea
                value={formData.requisitosInfraestrutura}
                onChange={(e) => handleChange("requisitosInfraestrutura", e.target.value)}
                placeholder="Energia, ar comprimido, rede, requisitos de laboratório..."
                className="min-h-[100px]"
                maxLength={1000}
              />
            )}
          </div>

          {/* Condições Ambientais */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm">Condições Ambientais</h4>
            </div>
            {!isEditing ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {formData.condicoesAmbientais || "Informações não cadastradas"}
              </p>
            ) : (
              <Textarea
                value={formData.condicoesAmbientais}
                onChange={(e) => handleChange("condicoesAmbientais", e.target.value)}
                placeholder="Condições de operação e armazenamento (temperatura, umidade)..."
                className="min-h-[100px]"
                maxLength={1000}
              />
            )}
          </div>

          {/* Conformidades/Normas */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm">Conformidades/Normas</h4>
            </div>
            {!isEditing ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {formData.conformidadesNormas || "Informações não cadastradas"}
              </p>
            ) : (
              <Textarea
                value={formData.conformidadesNormas}
                onChange={(e) => handleChange("conformidadesNormas", e.target.value)}
                placeholder="Ex.: IEC, ISO, RDC..."
                className="min-h-[100px]"
                maxLength={1000}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
