import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, Settings } from 'lucide-react';
import { useSegmentoLeadManager } from '@/hooks/useSegmentoLeadManager';
import GerenciarSegmentosModal from './GerenciarSegmentosModal';

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const { segmentos } = useSegmentoLeadManager();
  const [isSegmentosModalOpen, setIsSegmentosModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    // Dados do Cliente
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    
    // Dados da Oportunidade
    fonteLead: oportunidade?.fonteLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    segmentoLead: oportunidade?.segmentoLead || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    
    // Organização
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Outros
    dataVisita: oportunidade?.dataVisita || '',
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Campos condicionais
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    
    // Modalidade
    modalidade: 'licitacao'
  });

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      concorrentes,
      id: oportunidade?.id || Date.now(),
    };
    onSave(dataToSave);
    onClose();
  };

  const adicionarConcorrente = () => {
    setConcorrentes([...concorrentes, { 
      nome: '', 
      produto: '', 
      preco: 0 
    }]);
  };

  const removerConcorrente = (index: number) => {
    setConcorrentes(concorrentes.filter((_, i) => i !== index));
  };

  const atualizarConcorrente = (index: number, campo: string, valor: any) => {
    const novosConcorrentes = [...concorrentes];
    novosConcorrentes[index] = { ...novosConcorrentes[index], [campo]: valor };
    setConcorrentes(novosConcorrentes);
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'bg-red-500';
    if (valor < 60) return 'bg-yellow-500';
    if (valor < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
              </span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger value="historico-chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Histórico/Chat
              </TabsTrigger>
              <TabsTrigger value="documentos" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dados do Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpj"
                          value={formData.cpfCnpj}
                          onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                          placeholder="Digite o CPF ou CNPJ"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                        <Input
                          id="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          placeholder="Digite o nome"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                        placeholder="Digite a razão social"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="endereco">Endereço do Cliente</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          placeholder="Digite o endereço"
                        />
                      </div>
                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Select value={formData.uf} onValueChange={(value) => handleInputChange('uf', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Digite o e-mail"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          placeholder="Digite o telefone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="Digite o website"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ativo"
                        checked={formData.ativo}
                        onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                      />
                      <Label htmlFor="ativo">Cliente Ativo</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados do Lead/Negócio */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Lead/Negócio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fonteLead">Fonte do Lead</Label>
                        <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="site">Site</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="cold_call">Cold Call</SelectItem>
                            <SelectItem value="licitacao">Licitação</SelectItem>
                            <SelectItem value="referencia">Referência</SelectItem>
                            <SelectItem value="telefone">Telefone</SelectItem>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                            <SelectItem value="video_call">Videochamada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
                        <Input
                          id="valorNegocio"
                          type="number"
                          value={formData.valorNegocio}
                          onChange={(e) => handleInputChange('valorNegocio', parseFloat(e.target.value) || 0)}
                          placeholder="Digite o valor"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsSegmentosModalOpen(true)}
                          className="h-6 w-6 p-0"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                      <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {segmentos.map((segmento) => (
                            <SelectItem key={segmento.id} value={segmento.label}>
                              {segmento.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="colaboradoresResponsaveis">Colaboradores Responsáveis</Label>
                      <Input
                        id="colaboradoresResponsaveis"
                        value={formData.colaboradoresResponsaveis}
                        onChange={(e) => handleInputChange('colaboradoresResponsaveis', e.target.value)}
                        placeholder="Digite os responsáveis"
                      />
                    </div>

                    <div>
                      <Label htmlFor="procurandoPor">Procurando Por (Contatos vinculados)</Label>
                      <Input
                        id="procurandoPor"
                        value={formData.procurandoPor}
                        onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                        placeholder="Digite os contatos"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Organização */}
                <Card>
                  <CardHeader>
                    <CardTitle>Organização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="Digite as tags separadas por vírgula"
                      />
                    </div>

                    <div>
                      <Label htmlFor="caracteristicas">Características</Label>
                      <Textarea
                        id="caracteristicas"
                        value={formData.caracteristicas}
                        onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                        placeholder="Descreva as características"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
                      <Textarea
                        id="fluxoTrabalho"
                        value={formData.fluxoTrabalho}
                        onChange={(e) => handleInputChange('fluxoTrabalho', e.target.value)}
                        placeholder="Descreva o fluxo de trabalho"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_triagem">Em Triagem</SelectItem>
                          <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                          <SelectItem value="ganha">Ganha</SelectItem>
                          <SelectItem value="perdida">Perdida</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.status === 'ganha' && (
                      <div>
                        <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
                        <Textarea
                          id="motivoGanho"
                          value={formData.motivoGanho}
                          onChange={(e) => handleInputChange('motivoGanho', e.target.value)}
                          placeholder="Descreva o motivo do ganho"
                          rows={3}
                        />
                      </div>
                    )}

                    {formData.status === 'perdida' && (
                      <div>
                        <Label htmlFor="motivoPerda">Motivo de Perda</Label>
                        <Textarea
                          id="motivoPerda"
                          value={formData.motivoPerda}
                          onChange={(e) => handleInputChange('motivoPerda', e.target.value)}
                          placeholder="Descreva o motivo da perda"
                          rows={3}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        placeholder="Descrição geral da oportunidade"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Análise da Concorrência e Outros */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análise da Concorrência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {concorrentes.map((concorrente, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">Concorrente {index + 1}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removerConcorrente(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              placeholder="Nome do concorrente"
                              value={concorrente.nome}
                              onChange={(e) => atualizarConcorrente(index, 'nome', e.target.value)}
                            />
                            <Input
                              placeholder="Produto do concorrente"
                              value={concorrente.produto}
                              onChange={(e) => atualizarConcorrente(index, 'produto', e.target.value)}
                            />
                            <Input
                              type="number"
                              placeholder="Preço praticado"
                              value={concorrente.preco}
                              onChange={(e) => atualizarConcorrente(index, 'preco', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={adicionarConcorrente}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Concorrente
                      </Button>
                    </div>

                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="dataVisita">Data da Visita</Label>
                        <Input
                          id="dataVisita"
                          type="date"
                          value={formData.dataVisita}
                          onChange={(e) => handleInputChange('dataVisita', e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="propostaNegociacao"
                          checked={formData.propostaNegociacao}
                          onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
                        />
                        <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
                      </div>

                      <div>
                        <Label htmlFor="termometro" className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          Termômetro: {formData.termometro}°
                        </Label>
                        <div className="mt-2">
                          <input
                            type="range"
                            id="termometro"
                            min="0"
                            max="100"
                            value={formData.termometro}
                            onChange={(e) => handleInputChange('termometro', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0°</span>
                            <span>50°</span>
                            <span>100°</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div 
                            className={`w-4 h-4 rounded-full ${getTermometroColor(formData.termometro)}`}
                            title={`Termômetro: ${formData.termometro}°`}
                          />
                          <span className="text-sm text-gray-600">
                            {formData.termometro < 30 ? 'Frio' : 
                             formData.termometro < 60 ? 'Morno' : 
                             formData.termometro < 80 ? 'Quente' : 'Muito Quente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analise-tecnica" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Técnica-Científica</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.analiseTecnica}
                    onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                    placeholder="Digite a análise técnica-científica da oportunidade..."
                    rows={15}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico-chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico e Comunicações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                    <Button variant="outline">
                      Selecionar Arquivos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              {oportunidade ? 'Atualizar' : 'Salvar'} Oportunidade
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <GerenciarSegmentosModal
        isOpen={isSegmentosModalOpen}
        onClose={() => setIsSegmentosModalOpen(false)}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
