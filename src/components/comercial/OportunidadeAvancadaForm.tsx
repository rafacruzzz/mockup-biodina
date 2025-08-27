import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { X, Plus, AlertTriangle, Thermometer, Target, FileText } from 'lucide-react';
import SolicitacaoCadastroModal from './SolicitacaoCadastroModal';

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const [isSolicitacaoModalOpen, setIsSolicitacaoModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    // Dados do Cliente - campos simplificados
    cliente: oportunidade?.cliente || '',
    cpfCnpj: oportunidade?.cpfCnpj || '',
    ativo: oportunidade?.ativo || true,
    
    // Dados do Lead/Negócio - campos simplificados
    segmentoLead: oportunidade?.segmentoLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    tags: oportunidade?.tags || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    descricao: oportunidade?.descricao || '',
    
    // todos os campos das seções preservadas - Dados Específicos da Licitação, Estratégia e Planejamento, Dados Técnicos
    numeroPregao: oportunidade?.numeroPregao || '',
    numeroProcesso: oportunidade?.numeroProcesso || '',
    uasg: oportunidade?.uasg || '',
    sitePregao: oportunidade?.sitePregao || '',
    adesaoAta: oportunidade?.adesaoAta || false,
    produtoLicitacao: oportunidade?.produtoLicitacao || '',
    valorEstimado: oportunidade?.valorEstimado || 0,
    valorMaximo: oportunidade?.valorMaximo || 0,
    valorMinimo: oportunidade?.valorMinimo || 0,
    fornecedorAnterior: oportunidade?.fornecedorAnterior || '',
    situacaoPregao: oportunidade?.situacaoPregao || '',
    dataAssinatura: oportunidade?.dataAssinatura || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    analiseTecnica: oportunidade?.analiseTecnica || '',
    impugnacao: oportunidade?.impugnacao || false,
    recursoAdministrativo: oportunidade?.recursoAdministrativo || false,
    dataImpugnacao: oportunidade?.dataImpugnacao || '',
    dataRecurso: oportunidade?.dataRecurso || '',
    observacoesImpugnacao: oportunidade?.observacoesImpugnacao || '',
    observacoesRecurso: oportunidade?.observacoesRecurso || '',
    
    concorrentes: oportunidade?.concorrentes || [],
    estrategiaValorFinal: oportunidade?.estrategiaValorFinal || 0,
    
    termometro: oportunidade?.termometro || 50,
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

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dados do Cliente - SIMPLIFICADO */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cliente">Cliente *</Label>
                    <Select value={formData.cliente} onValueChange={(value) => handleInputChange('cliente', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital_das_clinicas">Hospital das Clínicas</SelectItem>
                        <SelectItem value="universidade_sp">Universidade de São Paulo</SelectItem>
                        <SelectItem value="prefeitura_sp">Prefeitura de São Paulo</SelectItem>
                        <SelectItem value="governo_estado">Governo do Estado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                    <Input
                      id="cpfCnpj"
                      value={formData.cpfCnpj}
                      onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                      placeholder="Digite o CPF ou CNPJ"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ativo"
                      checked={formData.ativo}
                      onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                    />
                    <Label htmlFor="ativo">Ativo</Label>
                  </div>

                  <Button 
                    type="button" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setIsSolicitacaoModalOpen(true)}
                  >
                    Solicitação de cadastro
                  </Button>
                </CardContent>
              </Card>

              {/* Dados do Lead/Negócio - SIMPLIFICADO */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Lead/Negócio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                    <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospitalar">Hospitalar</SelectItem>
                        <SelectItem value="universitario">Universitário</SelectItem>
                        <SelectItem value="publico">Público</SelectItem>
                        <SelectItem value="privado">Privado</SelectItem>
                        <SelectItem value="municipal">Municipal</SelectItem>
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
                    <Label htmlFor="descricao">Descrição da Oportunidade</Label>
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
            </div>

            {/* SEÇÕES PRESERVADAS - NÃO ALTERAR */}
            
            {/* Dados Específicos da Licitação */}
            <Card className="border-2 border-yellow-300 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  Dados Específicos da Licitação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="numeroPregao">Nº do Pregão/Processo</Label>
                    <Input
                      id="numeroPregao"
                      value={formData.numeroPregao}
                      onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                      placeholder="Ex: 001/2024"
                    />
                  </div>

                  <div>
                    <Label htmlFor="numeroProcesso">Nº do Processo</Label>
                    <Input
                      id="numeroProcesso"
                      value={formData.numeroProcesso}
                      onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                      placeholder="Ex: 23038.000001/2024-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="uasg">UASG</Label>
                    <Input
                      id="uasg"
                      value={formData.uasg}
                      onChange={(e) => handleInputChange('uasg', e.target.value)}
                      placeholder="Código UASG"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sitePregao">Site do Pregão</Label>
                    <Input
                      id="sitePregao"
                      value={formData.sitePregao}
                      onChange={(e) => handleInputChange('sitePregao', e.target.value)}
                      placeholder="URL do site"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox
                      id="adesaoAta"
                      checked={formData.adesaoAta}
                      onCheckedChange={(checked) => handleInputChange('adesaoAta', checked)}
                    />
                    <Label htmlFor="adesaoAta">Adesão à Ata</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="produtoLicitacao">Produto da Licitação</Label>
                  <Textarea
                    id="produtoLicitacao"
                    value={formData.produtoLicitacao}
                    onChange={(e) => handleInputChange('produtoLicitacao', e.target.value)}
                    placeholder="Descreva os produtos/serviços da licitação"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="valorEstimado">Valor Estimado</Label>
                    <Input
                      id="valorEstimado"
                      type="number"
                      value={formData.valorEstimado}
                      onChange={(e) => handleInputChange('valorEstimado', parseFloat(e.target.value) || 0)}
                      placeholder="Valor estimado"
                    />
                  </div>

                  <div>
                    <Label htmlFor="valorMaximo">Valor Máximo</Label>
                    <Input
                      id="valorMaximo"
                      type="number"
                      value={formData.valorMaximo}
                      onChange={(e) => handleInputChange('valorMaximo', parseFloat(e.target.value) || 0)}
                      placeholder="Valor máximo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="valorMinimo">Valor Mínimo</Label>
                    <Input
                      id="valorMinimo"
                      type="number"
                      value={formData.valorMinimo}
                      onChange={(e) => handleInputChange('valorMinimo', parseFloat(e.target.value) || 0)}
                      placeholder="Valor mínimo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fornecedorAnterior">Fornecedor Anterior</Label>
                    <Input
                      id="fornecedorAnterior"
                      value={formData.fornecedorAnterior}
                      onChange={(e) => handleInputChange('fornecedorAnterior', e.target.value)}
                      placeholder="Nome do fornecedor anterior"
                    />
                  </div>

                  <div>
                    <Label htmlFor="situacaoPregao">Situação do Pregão</Label>
                    <Select value={formData.situacaoPregao} onValueChange={(value) => handleInputChange('situacaoPregao', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publicado">Publicado</SelectItem>
                        <SelectItem value="em_andamento">Em Andamento</SelectItem>
                        <SelectItem value="suspenso">Suspenso</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                        <SelectItem value="finalizado">Finalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dataAssinatura">Data de Assinatura</Label>
                  <Input
                    id="dataAssinatura"
                    type="date"
                    value={formData.dataAssinatura}
                    onChange={(e) => handleInputChange('dataAssinatura', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="resumoEdital">Resumo do Edital</Label>
                  <Textarea
                    id="resumoEdital"
                    value={formData.resumoEdital}
                    onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                    placeholder="Resumo do edital da licitação"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="analiseTecnica">Análise Técnica</Label>
                  <Textarea
                    id="analiseTecnica"
                    value={formData.analiseTecnica}
                    onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                    placeholder="Análise técnica detalhada"
                    rows={6}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="impugnacao"
                        checked={formData.impugnacao}
                        onCheckedChange={(checked) => handleInputChange('impugnacao', checked)}
                      />
                      <Label htmlFor="impugnacao">Impugnação</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recursoAdministrativo"
                        checked={formData.recursoAdministrativo}
                        onCheckedChange={(checked) => handleInputChange('recursoAdministrativo', checked)}
                      />
                      <Label htmlFor="recursoAdministrativo">Recurso Administrativo</Label>
                    </div>
                  </div>

                  {(formData.impugnacao || formData.recursoAdministrativo) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.impugnacao && (
                        <div>
                          <Label htmlFor="dataImpugnacao">Data da Impugnação</Label>
                          <Input
                            id="dataImpugnacao"
                            type="date"
                            value={formData.dataImpugnacao}
                            onChange={(e) => handleInputChange('dataImpugnacao', e.target.value)}
                          />
                        </div>
                      )}

                      {formData.recursoAdministrativo && (
                        <div>
                          <Label htmlFor="dataRecurso">Data do Recurso</Label>
                          <Input
                            id="dataRecurso"
                            type="date"
                            value={formData.dataRecurso}
                            onChange={(e) => handleInputChange('dataRecurso', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {formData.impugnacao && (
                    <div>
                      <Label htmlFor="observacoesImpugnacao">Observações da Impugnação</Label>
                      <Textarea
                        id="observacoesImpugnacao"
                        value={formData.observacoesImpugnacao}
                        onChange={(e) => handleInputChange('observacoesImpugnacao', e.target.value)}
                        placeholder="Observações sobre a impugnação"
                        rows={3}
                      />
                    </div>
                  )}

                  {formData.recursoAdministrativo && (
                    <div>
                      <Label htmlFor="observacoesRecurso">Observações do Recurso</Label>
                      <Textarea
                        id="observacoesRecurso"
                        value={formData.observacoesRecurso}
                        onChange={(e) => handleInputChange('observacoesRecurso', e.target.value)}
                        placeholder="Observações sobre o recurso administrativo"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Estratégia e Planejamento */}
            <Card className="border-2 border-green-300 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Target className="h-5 w-5" />
                  Estratégia e Planejamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Análise da Concorrência</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={adicionarConcorrente}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  </div>

                  {concorrentes.map((concorrente, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-white">
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                </div>

                <div>
                  <Label htmlFor="estrategiaValorFinal">Estratégia - Valor Final</Label>
                  <Input
                    id="estrategiaValorFinal"
                    type="number"
                    value={formData.estrategiaValorFinal}
                    onChange={(e) => handleInputChange('estrategiaValorFinal', parseFloat(e.target.value) || 0)}
                    placeholder="Valor final da estratégia"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dados Técnicos */}
            <Card className="border-2 border-blue-300 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <FileText className="h-5 w-5" />
                  Dados Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                
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
              </CardContent>
            </Card>
          </div>

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

      <SolicitacaoCadastroModal 
        isOpen={isSolicitacaoModalOpen}
        onClose={() => setIsSolicitacaoModalOpen(false)}
      />
    </>
  );
};

export default OportunidadeAvancadaForm;
