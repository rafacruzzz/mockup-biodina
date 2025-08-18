
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Info } from "lucide-react";
import { FormacaoEscolaridade, DocumentoAnexo } from "@/types/colaborador";
import DocumentUploadField from "../DocumentUploadField";

interface FormacaoEscolaridadeTabProps {
  formData: FormacaoEscolaridade;
  onInputChange: (field: keyof FormacaoEscolaridade, value: string | boolean | DocumentoAnexo | DocumentoAnexo[]) => void;
}

const FormacaoEscolaridadeTab = ({ formData, onInputChange }: FormacaoEscolaridadeTabProps) => {
  const escolaridades = [
    { value: 'fundamental-incompleto', label: 'Ensino Fundamental Incompleto' },
    { value: 'fundamental-completo', label: 'Ensino Fundamental Completo' },
    { value: 'medio-incompleto', label: 'Ensino Médio Incompleto' },
    { value: 'medio-completo', label: 'Ensino Médio Completo' },
    { value: 'tecnico', label: 'Ensino Técnico' },
    { value: 'superior-incompleto', label: 'Ensino Superior Incompleto' },
    { value: 'superior-completo', label: 'Ensino Superior Completo' },
    { value: 'pos-graduacao', label: 'Pós-graduação' },
    { value: 'mestrado', label: 'Mestrado' },
    { value: 'doutorado', label: 'Doutorado' }
  ];

  const handleCurriculoUpload = (file: File) => {
    const documento: DocumentoAnexo = {
      id: Date.now().toString(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      categoria: 'curriculo',
      arquivo: file
    };
    onInputChange('curriculo', documento);
  };

  const handleCurriculoRemove = () => {
    onInputChange('curriculo', undefined);
  };

  const handleComprovanteAdd = (file: File) => {
    const documento: DocumentoAnexo = {
      id: Date.now().toString(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      categoria: 'comprovante-escolaridade',
      arquivo: file
    };
    const novosComprovantes = [...(formData.comprovantesEscolaridade || []), documento];
    onInputChange('comprovantesEscolaridade', novosComprovantes);
  };

  const handleComprovanteRemove = (id: string) => {
    const novosComprovantes = (formData.comprovantesEscolaridade || []).filter(doc => doc.id !== id);
    onInputChange('comprovantesEscolaridade', novosComprovantes);
  };

  return (
    <div className="space-y-8">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="escolaridade">Escolaridade *</Label>
              <Select value={formData.escolaridade} onValueChange={(value) => onInputChange('escolaridade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a escolaridade" />
                </SelectTrigger>
                <SelectContent>
                  {escolaridades.map((escolaridade) => (
                    <SelectItem key={escolaridade.value} value={escolaridade.value}>
                      {escolaridade.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="possuiDiploma"
                checked={formData.possuiDiploma}
                onCheckedChange={(checked) => onInputChange('possuiDiploma', checked)}
              />
              <Label htmlFor="possuiDiploma">Possui diploma?</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentação de Formação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentação de Formação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Currículo */}
          <DocumentUploadField
            label="Currículo"
            documento={formData.curriculo}
            onUpload={handleCurriculoUpload}
            onRemove={handleCurriculoRemove}
            required={true}
            origem={formData.curriculo?.observacoes === 'admissao' ? 'admissao' : 'manual'}
          />

          {/* Comprovantes de Escolaridade */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Comprovantes de Escolaridade, Cursos e Treinamentos</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleComprovanteAdd(file);
                  };
                  input.click();
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Comprovante
              </Button>
            </div>

            {formData.comprovantesEscolaridade && formData.comprovantesEscolaridade.length > 0 ? (
              <div className="space-y-3">
                {formData.comprovantesEscolaridade.map((documento) => (
                  <DocumentUploadField
                    key={documento.id}
                    label=""
                    documento={documento}
                    onUpload={() => {}} // Not used for existing documents
                    onRemove={() => handleComprovanteRemove(documento.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Nenhum comprovante anexado</p>
                <p className="text-xs">Use o botão "Adicionar Comprovante" para anexar documentos</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Integração com Admissão */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
            <Info className="h-5 w-5" />
            Integração com Admissão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-700 font-medium">
                Currículo automaticamente preenchido a partir da admissão
              </p>
              <p className="text-xs text-blue-600 mt-1">
                O currículo anexado durante o processo de admissão será automaticamente carregado neste campo.
                Você pode substituí-lo a qualquer momento fazendo upload de um novo arquivo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormacaoEscolaridadeTab;
