import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, User, Building, MapPin, DollarSign, Calendar as CalendarIcon, 
  Clock, Users, Target, AlertTriangle, CheckCircle, XCircle, 
  Plus, Edit, Trash2, Eye, Download, Upload, Send, Save, 
  Gavel, Trophy, Star
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Licitante {
  id: number;
  nome: string;
  marca: string;
  modelo: string;
  quantidade: number;
  preco: number;
  valorEntrada: number;
  valorFinal: number;
  unidade: string;
  ranking: number;
}

interface FormData {
  // Dados da Licitação
  numeroPregao: string;
  nomeInstituicao: string;
  uasg: string;
  modalidade: string;
  objetoLicitacao: string;
  valorEstimado: number;
  dataPublicacao: Date | null;
  dataLimiteImpugnacao: Date | null;
  dataAbertura: Date | null;
  dataEntregaProposta: Date | null;
  linkEdital: string;
  observacoes: string;
  
  // Dados do Contato
  nomeContato: string;
  telefoneContato: string;
  emailContato: string;
  cargoContato: string;
  dataContato: Date | null;
  
  // Licitantes com campos expandidos
  licitantes: Licitante[];
  
  // Estratégia
  estrategiaComercial: string;
  estrategiaValorFinal: number;
  observacoesEstrategia: string;
  
  // Status
  status: string;
  dataConversao: Date | null;
}

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');

  const [formData, setFormData] = useState<FormData>({
    // Dados da Licitação
    numeroPregao: '',
    nomeInstituicao: '',
    uasg: '',
    modalidade: 'pregao_eletronico',
    objetoLicitacao: '',
    valorEstimado: 0,
    dataPublicacao: null as Date | null,
    dataLimiteImpugnacao: null as Date | null,
    dataAbertura: null as Date | null,
    dataEntregaProposta: null as Date | null,
    linkEdital: '',
    observacoes: '',
    
    // Dados do Contato
    nomeContato: '',
    telefoneContato: '',
    emailContato: '',
    cargoContato: '',
    dataContato: null as Date | null,
    
    // Licitantes com campos expandidos
    licitantes: [
      { 
        id: 1, 
        nome: 'Empresa A', 
        marca: 'Radiometer', 
        modelo: 'ABL800 Flex',
        quantidade: 2, 
        preco: 450000,
        valorEntrada: 420000,
        valorFinal: 450000,
        unidade: 'UN',
        ranking: 1
      },
      { 
        id: 2, 
        nome: 'Empresa B', 
        marca: 'Nova Biomedical', 
        modelo: 'StatSensor',
        quantidade: 1, 
        preco: 380000,
        valorEntrada: 380000,
        valorFinal: 375000,
        unidade: 'UN',
        ranking: 2
      }
    ],
    
    // Estratégia
    estrategiaComercial: '',
    estrategiaValorFinal: 0,
    observacoesEstrategia: '',
    
    // Status
    status: 'em_triagem',
    dataConversao: null as Date | null
  });

  useEffect(() => {
    if (oportunidade) {
      setFormData({
        numeroPregao: oportunidade.numeroPregao || '',
        nomeInstituicao: oportunidade.nomeInstituicao || '',
        uasg: oportunidade.uasg || '',
        modalidade: oportunidade.modalidade || 'pregao_eletronico',
        objetoLicitacao: oportunidade.objetoLicitacao || '',
        valorEstimado: oportunidade.valorEstimado || 0,
        dataPublicacao: oportunidade.dataPublicacao ? new Date(oportunidade.dataPublicacao) : null,
        dataLimiteImpugnacao: oportunidade.dataLimiteImpugnacao ? new Date(oportunidade.dataLimiteImpugnacao) : null,
        dataAbertura: oportunidade.dataAbertura ? new Date(oportunidade.dataAbertura) : null,
        dataEntregaProposta: oportunidade.dataEntregaProposta ? new Date(oportunidade.dataEntregaProposta) : null,
        linkEdital: oportunidade.linkEdital || '',
        observacoes: oportunidade.observacoes || '',
        nomeContato: oportunidade.nomeContato || '',
        telefoneContato: oportunidade.telefoneContato || '',
        emailContato: oportunidade.emailContato || '',
        cargoContato: oportunidade.cargoContato || '',
        dataContato: oportunidade.dataContato ? new Date(oportunidade.dataContato) : null,
        licitantes: oportunidade.licitantes || [],
        estrategiaComercial: oportunidade.estrategiaComercial || '',
        estrategiaValorFinal: oportunidade.estrategiaValorFinal || 0,
        observacoesEstrategia: oportunidade.observacoesEstrategia || '',
        status: oportunidade.status || 'em_triagem',
        dataConversao: oportunidade.dataConversao ? new Date(oportunidade.dataConversao) : null
      });
    }
  }, [oportunidade]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_triagem': return 'bg-blue-500';
      case 'qualificada': return 'bg-green-500';
      case 'perdida': return 'bg-red-500';
      case 'convertida': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em_triagem': return 'Em Triagem';
      case 'qualificada': return 'Qualificada';
      case 'perdida': return 'Perdida';
      case 'convertida': return 'Convertida';
      default: return status;
    }
  };

  const getRankingBadge = (ranking: number) => {
    if (ranking === 1) {
      return <Badge className="bg-yellow-500 text-white flex items-center gap-1">
        <Trophy className="h-3 w-3" />
        1º
      </Badge>;
    } else if (ranking === 2) {
      return <Badge className="bg-gray-400 text-white flex items-center gap-1">
        <Star className="h-3 w-3" />
        2º
      </Badge>;
    } else if (ranking === 3) {
      return <Badge className="bg-orange-600 text-white">3º</Badge>;
    } else {
      return <Badge variant="outline">{ranking}º</Badge>;
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleConvertToCommercial = () => {
    const convertedData = {
      ...formData,
      status: 'convertida',
      dataConversao: new Date()
    };
    onSave(convertedData);
  };

  const renderDadosGerais = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="numeroPregao">Número do Pregão *</Label>
          <Input
            id="numeroPregao"
            value={formData.numeroPregao}
            onChange={(e) => setFormData({...formData, numeroPregao: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="uasg">UASG</Label>
          <Input
            id="uasg"
            value={formData.uasg}
            onChange={(e) => setFormData({...formData, uasg: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nomeInstituicao">Nome da Instituição *</Label>
        <Input
          id="nomeInstituicao"
          value={formData.nomeInstituicao}
          onChange={(e) => setFormData({...formData, nomeInstituicao: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="modalidade">Modalidade</Label>
        <Select 
          value={formData.modalidade} 
          onValueChange={(value) => setFormData({...formData, modalidade: value})}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pregao_eletronico">Pregão Eletrônico</SelectItem>
            <SelectItem value="pregao_presencial">Pregão Presencial</SelectItem>
            <SelectItem value="concorrencia">Concorrência</SelectItem>
            <SelectItem value="tomada_precos">Tomada de Preços</SelectItem>
            <SelectItem value="convite">Convite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="objetoLicitacao">Objeto da Licitação *</Label>
        <Textarea
          id="objetoLicitacao"
          value={formData.objetoLicitacao}
          onChange={(e) => setFormData({...formData, objetoLicitacao: e.target.value})}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="valorEstimado">Valor Estimado</Label>
        <Input
          id="valorEstimado"
          type="number"
          min="0"
          step="0.01"
          value={formData.valorEstimado}
          onChange={(e) => setFormData({...formData, valorEstimado: parseFloat(e.target.value) || 0})}
        />
        <p className="text-sm text-gray-500 mt-1">
          {formatCurrency(formData.valorEstimado)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Data de Publicação</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataPublicacao ? formatDate(formData.dataPublicacao) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dataPublicacao || undefined}
                onSelect={(date) => setFormData({...formData, dataPublicacao: date || null})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Data Limite para Impugnação</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataLimiteImpugnacao ? formatDate(formData.dataLimiteImpugnacao) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dataLimiteImpugnacao || undefined}
                onSelect={(date) => setFormData({...formData, dataLimiteImpugnacao: date || null})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Data de Abertura</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataAbertura ? formatDate(formData.dataAbertura) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dataAbertura || undefined}
                onSelect={(date) => setFormData({...formData, dataAbertura: date || null})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Data Limite para Entrega</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataEntregaProposta ? formatDate(formData.dataEntregaProposta) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dataEntregaProposta || undefined}
                onSelect={(date) => setFormData({...formData, dataEntregaProposta: date || null})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Label htmlFor="linkEdital">Link do Edital</Label>
        <Input
          id="linkEdital"
          type="url"
          value={formData.linkEdital}
          onChange={(e) => setFormData({...formData, linkEdital: e.target.value})}
          placeholder="https://..."
        />
      </div>

      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
          rows={3}
        />
      </div>
    </div>
  );

  const renderContato = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomeContato">Nome do Contato</Label>
          <Input
            id="nomeContato"
            value={formData.nomeContato}
            onChange={(e) => setFormData({...formData, nomeContato: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="cargoContato">Cargo</Label>
          <Input
            id="cargoContato"
            value={formData.cargoContato}
            onChange={(e) => setFormData({...formData, cargoContato: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telefoneContato">Telefone</Label>
          <Input
            id="telefoneContato"
            value={formData.telefoneContato}
            onChange={(e) => setFormData({...formData, telefoneContato: e.target.value})}
            placeholder="(00) 0000-0000"
          />
        </div>
        <div>
          <Label htmlFor="emailContato">E-mail</Label>
          <Input
            id="emailContato"
            type="email"
            value={formData.emailContato}
            onChange={(e) => setFormData({...formData, emailContato: e.target.value})}
            placeholder="contato@exemplo.com"
          />
        </div>
      </div>

      <div>
        <Label>Data do Contato</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dataContato ? formatDate(formData.dataContato) : "Selecionar data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.dataContato || undefined}
              onSelect={(date) => setFormData({...formData, dataContato: date || null})}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  const renderLicitantes = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Tabela de Licitantes</h4>
        <Button size="sm" className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Licitante
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Valor de Entrada</TableHead>
              <TableHead>Valor Final</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Ranking</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.licitantes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                  Nenhum licitante cadastrado
                </TableCell>
              </TableRow>
            ) : (
              formData.licitantes.map((licitante) => (
                <TableRow key={licitante.id}>
                  <TableCell className="font-medium">{licitante.nome}</TableCell>
                  <TableCell>{licitante.marca}</TableCell>
                  <TableCell>{licitante.modelo}</TableCell>
                  <TableCell>{licitante.quantidade}</TableCell>
                  <TableCell>{formatCurrency(licitante.preco)}</TableCell>
                  <TableCell>{formatCurrency(licitante.valorEntrada)}</TableCell>
                  <TableCell className="font-bold">{formatCurrency(licitante.valorFinal)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{licitante.unidade}</Badge>
                  </TableCell>
                  <TableCell>
                    {getRankingBadge(licitante.ranking)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderEstrategia = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="estrategiaComercial">Estratégia Comercial</Label>
        <Textarea
          id="estrategiaComercial"
          value={formData.estrategiaComercial}
          onChange={(e) => setFormData({...formData, estrategiaComercial: e.target.value})}
          rows={4}
          placeholder="Descreva a estratégia comercial para esta licitação..."
        />
      </div>

      <div>
        <Label htmlFor="estrategiaValorFinal">Valor Final da Estratégia</Label>
        <Input
          id="estrategiaValorFinal"
          type="number"
          min="0"
          step="0.01"
          value={formData.estrategiaValorFinal}
          onChange={(e) => setFormData({...formData, estrategiaValorFinal: parseFloat(e.target.value) || 0})}
        />
        <p className="text-sm text-gray-500 mt-1">
          {formatCurrency(formData.estrategiaValorFinal)}
        </p>
      </div>

      <div>
        <Label htmlFor="observacoesEstrategia">Observações da Estratégia</Label>
        <Textarea
          id="observacoesEstrategia"
          value={formData.observacoesEstrategia}
          onChange={(e) => setFormData({...formData, observacoesEstrategia: e.target.value})}
          rows={3}
        />
      </div>
    </div>
  );

  const renderTriagemContent = () => {
    switch (activeTab) {
      case 'dados-gerais':
        return renderDadosGerais();
      case 'contato':
        return renderContato();
      case 'licitantes':
        return renderLicitantes();
      case 'estrategia':
        return renderEstrategia();
      default:
        return renderDadosGerais();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            {oportunidade ? 'Editar Licitação' : 'Nova Licitação'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <Badge className={`${getStatusColor(formData.status)} text-white`}>
              {getStatusLabel(formData.status)}
            </Badge>
            {formData.dataConversao && (
              <span className="text-sm text-gray-500">
                Convertida em: {formatDate(formData.dataConversao)}
              </span>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="contato" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Contato
              </TabsTrigger>
              <TabsTrigger value="licitantes" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Licitantes
              </TabsTrigger>
              <TabsTrigger value="estrategia" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Estratégia
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {renderTriagemContent()}
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <div className="flex gap-2">
              {formData.status === 'qualificada' && (
                <Button 
                  onClick={handleConvertToCommercial}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Converter para Comercial
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeAvancadaForm;
