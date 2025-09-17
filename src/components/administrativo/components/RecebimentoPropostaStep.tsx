import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecebimentoPropostaStepProps {
  data: any;
  onChange: (data: any) => void;
}

export const RecebimentoPropostaStep = ({ data, onChange }: RecebimentoPropostaStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const generateProtocol = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `PROT-DD-${random}-${year}${month}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informações da Proposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataRecebimento">Data de Recebimento</Label>
              <Input
                id="dataRecebimento"
                type="date"
                value={data.dataRecebimento || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('dataRecebimento', e.target.value)}
                disabled
              />
            </div>

            <div>
              <Label htmlFor="responsavelRegistro">Responsável pelo Registro</Label>
              <Input
                id="responsavelRegistro"
                value={data.responsavelRegistro || "Usuário Logado"}
                onChange={(e) => handleInputChange('responsavelRegistro', e.target.value)}
                disabled
              />
            </div>
          </div>

          <div>
            <Label htmlFor="nomeFabrica">Nome da Fábrica/Fornecedor *</Label>
            <Input
              id="nomeFabrica"
              value={data.nomeFabrica || ""}
              onChange={(e) => handleInputChange('nomeFabrica', e.target.value)}
              placeholder="Digite o nome do fornecedor"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contatoPrincipal">Contato Principal *</Label>
              <Input
                id="contatoPrincipal"
                value={data.contatoPrincipal || ""}
                onChange={(e) => handleInputChange('contatoPrincipal', e.target.value)}
                placeholder="Nome do contato"
                required
              />
            </div>

            <div>
              <Label htmlFor="emailContato">Email do Contato *</Label>
              <Input
                id="emailContato"
                type="email"
                value={data.emailContato || ""}
                onChange={(e) => handleInputChange('emailContato', e.target.value)}
                placeholder="email@fornecedor.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefoneContato">Telefone do Contato *</Label>
              <Input
                id="telefoneContato"
                value={data.telefoneContato || ""}
                onChange={(e) => handleInputChange('telefoneContato', e.target.value)}
                placeholder="+55 11 99999-9999"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="produtosInteresse">Produto(s) de Interesse *</Label>
            <Textarea
              id="produtosInteresse"
              value={data.produtosInteresse || ""}
              onChange={(e) => handleInputChange('produtosInteresse', e.target.value)}
              placeholder="Descreva os produtos de interesse..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status e Protocolo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="statusProposta">Status da Proposta</Label>
              <Select 
                value={data.statusProposta || "Recebida"} 
                onValueChange={(value) => handleInputChange('statusProposta', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recebida">Recebida</SelectItem>
                  <SelectItem value="Em Análise Preliminar">Em Análise Preliminar</SelectItem>
                  <SelectItem value="Aguardando Documentos">Aguardando Documentos</SelectItem>
                  <SelectItem value="Rejeitada Preliminarmente">Rejeitada Preliminarmente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="protocoloInterno">Protocolo Interno</Label>
              <div className="flex gap-2">
                <Input
                  id="protocoloInterno"
                  value={data.protocoloInterno || ""}
                  onChange={(e) => handleInputChange('protocoloInterno', e.target.value)}
                  placeholder="Protocolo será gerado automaticamente"
                  disabled
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleInputChange('protocoloInterno', generateProtocol())}
                >
                  Gerar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="emailPadraoEnviado"
              checked={data.emailPadraoEnviado || false}
              onCheckedChange={(checked) => handleInputChange('emailPadraoEnviado', checked)}
            />
            <Label htmlFor="emailPadraoEnviado">E-mail Padrão Enviado</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documentação</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="anexoFormularioDD">Anexo do Formulário DD</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Clique para fazer upload ou arraste o arquivo aqui
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, DOC até 10MB
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                <FileText className="mr-2 h-4 w-4" />
                Selecionar Arquivo
              </Button>
            </div>
            {data.anexoFormularioDD && (
              <div className="mt-2 text-sm text-green-600">
                ✓ Arquivo anexado: {data.anexoFormularioDD}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};