
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
    dataContato: licitacao?.dataContato || '',
    naturezaOperacao: licitacao?.naturezaOperacao || '',
    segmentoLead: licitacao?.segmentoLead || '',
    fluxoTrabalho: licitacao?.fluxoTrabalho || '',
    permiteAdesao: licitacao?.permiteAdesao || false
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

  const naturezaOperacaoOptions = [
    'AMOSTRA',
    'COMODATO', 
    'CONSERTO',
    'CONSIGNAÇÃO',
    'DEMONSTRAÇÃO',
    'DOAÇÃO',
    'EMPRÉSTIMO',
    'EXPOSIÇÃO',
    'IMPORTAÇÃO',
    'LOCAÇÃO',
    'LOGÍSTICA',
    'MOSTRUÁRIO',
    'SIMPLES REMESSA',
    'TREINAMENTO',
    'VENDAS',
    'OUTRAS',
    'TROCA',
    'PERDA'
  ];

  const segmentoLeadOptions = [
    'FILANTRÓPICO',
    'PRIVADO - ESTÉTICA',
    'PRIVADO - HOSPITAL',
    'PRIVADO - LABORATÓRIO',
    'PRIVADO - UNIVERSIDADE',
    'PRIVADO - VETERINÁRIO',
    'PÚBLICO - HOSPITAL - AERONÁUTICA',
    'PÚBLICO - HOSPITAL - ESTADUAL',
    'PÚBLICO - HOSPITAL - EXÉRCITO',
    'PÚBLICO - HOSPITAL - FEDERAL',
    'PÚBLICO - HOSPITAL - MARINHA',
    'PÚBLICO - HOSPITAL - MUNICIPAL',
    'PÚBLICO - HOSPITAL - OS',
    'PÚBLICO - HOSPITAL - SECRETARIA DA SAÚDE',
    'PÚBLICO - HOSPITAL - UNIVERSIDADE',
    'PÚBLICO - HOSPITAL - UPA',
    'PÚBLICO - HOSPITAL - VETERINÁRIO',
    'PÚBLICO - LABORATÓRIO - AERONÁUTICA',
    'PÚBLICO - LABORATÓRIO - ESTADUAL',
    'PÚBLICO - LABORATÓRIO - EXÉRCITO',
    'PÚBLICO - LABORATÓRIO - FEDERAL',
    'PÚBLICO - LABORATÓRIO - MARINHA',
    'PÚBLICO - LABORATÓRIO - MUNICIPAL',
    'PÚBLICO - LABORATÓRIO - OS',
    'PÚBLICO - LABORATÓRIO - SECRETARIA DA SAÚDE',
    'PÚBLICO - LABORATÓRIO - UNIVERSIDADE',
    'PÚBLICO - LABORATÓRIO - UPA',
    'PÚBLICO - LABORATÓRIO - VETERINÁRIO'
  ];

  const fluxoTrabalhoOptions = [
    'AGUARDANDO INÍCIO',
    'EM ANÁLISE',
    'AGUARDANDO APROVAÇÃO',
    'EM EXECUÇÃO',
    'REVISÃO',
    'FINALIZADO',
    'SUSPENSO',
    'CANCELADO'
  ];

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

            <TabsContent value="geral" className="space-y-6 mt-4">
              {/* Dados Específicos da Licitação */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    ⚠️ Dados Específicos da Licitação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dataLicitacao">Data da Licitação</Label>
                      <Input
                        id="dataLicitacao"
                        type="date"
                        value={formData.dataAbertura}
                        onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="naturezaOperacao">Qual Natureza da Operação</Label>
                      <Select value={formData.naturezaOperacao} onValueChange={(value) => setFormData({...formData, naturezaOperacao: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a natureza da operação" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {naturezaOperacaoOptions.map((opcao) => (
                            <SelectItem key={opcao} value={opcao}>{opcao}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numeroPregao">Nº Pregão / INEX / ATA / SRP</Label>
                      <Input
                        id="numeroPregao"
                        value={formData.numeroPregao}
                        onChange={(e) => setFormData({...formData, numeroPregao: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="numeroUASG">Nº UASG</Label>
                      <Input
                        id="numeroUASG"
                        value={formData.numeroItem}
                        onChange={(e) => setFormData({...formData, numeroItem: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Permite Adesão?</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="permiteAdesao"
                          checked={formData.permiteAdesao === true}
                          onChange={() => setFormData({...formData, permiteAdesao: true})}
                        />
                        Sim
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="permiteAdesao"
                          checked={formData.permiteAdesao === false}
                          onChange={() => setFormData({...formData, permiteAdesao: false})}
                        />
                        Não
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Lead/Negócio */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Dados do Lead/Negócio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                    <Select value={formData.segmentoLead} onValueChange={(value) => setFormData({...formData, segmentoLead: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50 max-h-60">
                        {segmentoLeadOptions.map((segmento) => (
                          <SelectItem key={segmento} value={segmento}>{segmento}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
                    <Select value={formData.fluxoTrabalho} onValueChange={(value) => setFormData({...formData, fluxoTrabalho: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status do trabalho" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {fluxoTrabalhoOptions.map((fluxo) => (
                          <SelectItem key={fluxo} value={fluxo}>{fluxo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Dados Complementares */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Dados Complementares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div>
                    <Label htmlFor="empresaConcorrente">Empresa Concorrente</Label>
                    <Input
                      id="empresaConcorrente"
                      value={formData.empresaConcorrente}
                      onChange={(e) => setFormData({...formData, empresaConcorrente: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="palavraChave">Palavra-chave do Produto/Serviço</Label>
                    <Input
                      id="palavraChave"
                      value={formData.palavraChave}
                      onChange={(e) => setFormData({...formData, palavraChave: e.target.value})}
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
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button 
                  type="button" 
                  className="bg-biodina-gold hover:bg-biodina-gold/90"
                  disabled={!isFormValid()}
                  onClick={handleSubmit}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Solicitar Aprovação para Participação
                </Button>
              </div>
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
