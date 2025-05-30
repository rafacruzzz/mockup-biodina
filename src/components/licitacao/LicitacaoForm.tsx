import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Licitacao } from "@/types/licitacao";
import { X, Save, FileText, Users, History } from "lucide-react";

interface LicitacaoFormProps {
  licitacao?: Licitacao;
  onClose: () => void;
  onSave: (licitacao: Partial<Licitacao>) => void;
}

const LicitacaoForm = ({ licitacao, onClose, onSave }: LicitacaoFormProps) => {
  const [formData, setFormData] = useState({
    numeroPregao: licitacao?.numeroPregao || '',
    nomeInstituicao: licitacao?.nomeInstituicao || '',
    uf: licitacao?.uf || '',
    municipio: licitacao?.municipio || '',
    linkEdital: licitacao?.linkEdital || '',
    objetoLicitacao: licitacao?.objetoLicitacao || '',
    numeroItem: licitacao?.numeroItem || '',
    empresaConcorrente: licitacao?.empresaConcorrente || '',
    palavraChave: licitacao?.palavraChave || '',
    status: licitacao?.status || 'triagem',
    motivoDecisao: licitacao?.motivoDecisao || '',
    observacoes: licitacao?.observacoes || '',
    dataAbertura: licitacao?.dataAbertura || '',
    dataContato: licitacao?.dataContato || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'triagem': return 'bg-yellow-500';
      case 'acompanhamento': return 'bg-blue-500';
      case 'finalizada': return 'bg-gray-500';
      case 'convertida': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Validação simplificada - removendo a obrigatoriedade do tipo de oportunidade
  const isFormValid = () => {
    return formData.numeroPregao && formData.nomeInstituicao;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>
              {licitacao ? 'Editar Licitação' : 'Nova Licitação'}
            </CardTitle>
            <Badge className={`${getStatusColor(formData.status)} text-white`}>
              {formData.status}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="geral" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4 mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numeroPregao">Nº do Pregão/Licitação</Label>
                    <Input
                      id="numeroPregao"
                      value={formData.numeroPregao}
                      onChange={(e) => setFormData({...formData, numeroPregao: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="triagem">Em triagem</SelectItem>
                        <SelectItem value="acompanhamento">Em acompanhamento</SelectItem>
                        <SelectItem value="finalizada">Finalizada</SelectItem>
                        <SelectItem value="convertida">Convertida em oportunidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="nomeInstituicao">Nome da Instituição</Label>
                  <Input
                    id="nomeInstituicao"
                    value={formData.nomeInstituicao}
                    onChange={(e) => setFormData({...formData, nomeInstituicao: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="uf">UF</Label>
                    <Input
                      id="uf"
                      value={formData.uf}
                      onChange={(e) => setFormData({...formData, uf: e.target.value})}
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="municipio">Município</Label>
                    <Input
                      id="municipio"
                      value={formData.municipio}
                      onChange={(e) => setFormData({...formData, municipio: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkEdital">Link do Edital</Label>
                  <Input
                    id="linkEdital"
                    type="url"
                    value={formData.linkEdital}
                    onChange={(e) => setFormData({...formData, linkEdital: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="objetoLicitacao">Objeto da Licitação</Label>
                  <Textarea
                    id="objetoLicitacao"
                    value={formData.objetoLicitacao}
                    onChange={(e) => setFormData({...formData, objetoLicitacao: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numeroItem">Nº do Item/Lote</Label>
                    <Input
                      id="numeroItem"
                      value={formData.numeroItem}
                      onChange={(e) => setFormData({...formData, numeroItem: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="empresaConcorrente">Empresa Concorrente</Label>
                    <Input
                      id="empresaConcorrente"
                      value={formData.empresaConcorrente}
                      onChange={(e) => setFormData({...formData, empresaConcorrente: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="palavraChave">Palavra-chave do Produto/Serviço</Label>
                  <Input
                    id="palavraChave"
                    value={formData.palavraChave}
                    onChange={(e) => setFormData({...formData, palavraChave: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataAbertura">Data de Abertura</Label>
                    <Input
                      id="dataAbertura"
                      type="date"
                      value={formData.dataAbertura}
                      onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataContato">Data de Contato</Label>
                    <Input
                      id="dataContato"
                      type="date"
                      value={formData.dataContato}
                      onChange={(e) => setFormData({...formData, dataContato: e.target.value})}
                    />
                  </div>
                </div>

                {formData.status === 'finalizada' && (
                  <div>
                    <Label htmlFor="motivoDecisao">Motivo da Decisão</Label>
                    <Textarea
                      id="motivoDecisao"
                      value={formData.motivoDecisao}
                      onChange={(e) => setFormData({...formData, motivoDecisao: e.target.value})}
                      rows={2}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                    disabled={!isFormValid()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Solicitar Aprovação para Participação
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="pedidos" className="mt-4">
              <div className="text-center py-8 text-gray-500">
                Lista de pedidos vinculados será implementada aqui
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <div className="text-center py-8 text-gray-500">
                Histórico e documentos serão implementados aqui
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicitacaoForm;
