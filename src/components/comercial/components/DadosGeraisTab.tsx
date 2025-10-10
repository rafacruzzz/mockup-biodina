import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Search, CheckCircle, XCircle, Lock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DadosGeraisTabProps {
  formData: any;
  onInputChange: (field: string, value: string | Date | null) => void;
}

interface Projeto {
  id: string;
  numeroProcesso: string;
  tipo: 'importacao' | 'licitacao' | 'contratacao';
  cliente: string;
  cnpj: string;
  status: string;
  valorTotal: number;
  responsavel?: string;
  segmento?: string;
}

const mockProjetos: Projeto[] = [
  // IMPORTAÇÕES DIRETAS
  {
    id: "IMP-2024-001",
    numeroProcesso: "001",
    tipo: "importacao",
    cliente: "Hospital Albert Einstein",
    cnpj: "60.765.823/0001-30",
    status: "Em Andamento",
    valorTotal: 150000,
    responsavel: "João Silva",
    segmento: "Hospital Privado"
  },
  {
    id: "IMP-2024-002",
    numeroProcesso: "002",
    tipo: "importacao",
    cliente: "Hospital Sírio-Libanês",
    cnpj: "61.870.001/0001-09",
    status: "Concluída",
    valorTotal: 250000,
    responsavel: "Maria Santos",
    segmento: "Hospital Privado"
  },
  {
    id: "IMP-2024-003",
    numeroProcesso: "003",
    tipo: "importacao",
    cliente: "INCA - Instituto Nacional de Câncer",
    cnpj: "00.394.544/0124-52",
    status: "Em Andamento",
    valorTotal: 180000,
    responsavel: "Pedro Costa",
    segmento: "Hospital Público"
  },
  // LICITAÇÕES
  {
    id: "LIC-2024-001",
    numeroProcesso: "001",
    tipo: "licitacao",
    cliente: "Hospital São Lucas",
    cnpj: "12.345.678/0001-99",
    status: "Homologada",
    valorTotal: 320000,
    responsavel: "Ana Oliveira",
    segmento: "Hospital Filantrópico"
  },
  {
    id: "LIC-2024-005",
    numeroProcesso: "005",
    tipo: "licitacao",
    cliente: "Hospital Universitário UFRJ",
    cnpj: "33.663.683/0001-16",
    status: "Em Análise",
    valorTotal: 450000,
    responsavel: "Carlos Mendes",
    segmento: "Hospital Universitário"
  },
  {
    id: "LIC-2024-008",
    numeroProcesso: "008",
    tipo: "licitacao",
    cliente: "Santa Casa de Misericórdia",
    cnpj: "56.577.059/0001-00",
    status: "Aguardando Recurso",
    valorTotal: 280000,
    responsavel: "Beatriz Lima",
    segmento: "Hospital Filantrópico"
  },
  // CONTRATAÇÕES
  {
    id: "CON-2024-012",
    numeroProcesso: "012",
    tipo: "contratacao",
    cliente: "Clínica São Camilo",
    cnpj: "08.910.080/0001-55",
    status: "Assinado",
    valorTotal: 95000,
    responsavel: "Roberto Alves",
    segmento: "Clínica Privada"
  },
  {
    id: "CON-2024-015",
    numeroProcesso: "015",
    tipo: "contratacao",
    cliente: "Hospital Memorial",
    cnpj: "02.558.157/0001-62",
    status: "Em Negociação",
    valorTotal: 175000,
    responsavel: "Fernanda Rocha",
    segmento: "Hospital Privado"
  },
  {
    id: "CON-2024-020",
    numeroProcesso: "020",
    tipo: "contratacao",
    cliente: "Centro Oncológico Integrado",
    cnpj: "11.222.333/0001-44",
    status: "Concluído",
    valorTotal: 210000,
    responsavel: "Lucas Ferreira",
    segmento: "Centro Especializado"
  }
];
const DadosGeraisTab = ({ formData, onInputChange }: DadosGeraisTabProps) => {
  const [vinculacaoHabilitada, setVinculacaoHabilitada] = useState(false);
  const [tipoProjeto, setTipoProjeto] = useState<string>("");
  const [projetoSearch, setProjetoSearch] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const normalizeId = (id: string) => {
    return id.replace(/[^\d]/g, '').padStart(3, '0');
  };

  const searchProjetos = (searchTerm: string) => {
    if (!tipoProjeto) return [];
    
    const filteredByType = mockProjetos.filter(p => p.tipo === tipoProjeto);
    
    if (!searchTerm) return filteredByType;
    
    const normalizedSearch = searchTerm.toLowerCase();
    return filteredByType.filter(projeto => 
      projeto.numeroProcesso.includes(normalizedSearch) ||
      projeto.id.toLowerCase().includes(normalizedSearch) ||
      projeto.cliente.toLowerCase().includes(normalizedSearch) ||
      projeto.cnpj.includes(normalizedSearch)
    );
  };

  const handleSelectProjeto = (projeto: Projeto) => {
    setProjetoSearch(projeto.numeroProcesso);
    setSelectedProjeto(projeto);
    setShowSuggestions(false);
    
    // AUTO-PREENCHER CAMPOS
    onInputChange('cnpjCliente', projeto.cnpj);
    onInputChange('nomeCliente', projeto.cliente);
    onInputChange('projetoVinculadoId', projeto.id);
    onInputChange('projetoVinculadoTipo', projeto.tipo);
  };

  const handleProjetoSearch = (value: string) => {
    setProjetoSearch(value);
    setShowSuggestions(true);
    
    if (!value) {
      setSelectedProjeto(null);
      onInputChange('cnpjCliente', '');
      onInputChange('nomeCliente', '');
      return;
    }
    
    const normalizedValue = normalizeId(value);
    const found = searchProjetos(value).find(p => 
      normalizeId(p.numeroProcesso) === normalizedValue
    );
    
    if (found) {
      handleSelectProjeto(found);
    }
  };

  const handleVinculacaoToggle = (checked: boolean) => {
    setVinculacaoHabilitada(checked);
    if (!checked) {
      setTipoProjeto("");
      setProjetoSearch("");
      setSelectedProjeto(null);
      onInputChange('cnpjCliente', '');
      onInputChange('nomeCliente', '');
      onInputChange('projetoVinculadoId', '');
      onInputChange('projetoVinculadoTipo', '');
    }
  };

  const getTipoProjetoLabel = (tipo: string) => {
    switch (tipo) {
      case 'importacao': return 'Importação Direta';
      case 'licitacao': return 'Licitação';
      case 'contratacao': return 'Contratação';
      default: return '';
    }
  };

  const DatePicker = ({ 
    label, 
    field, 
    required = false 
  }: { 
    label: string; 
    field: string; 
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <Label>{label} {required && '*'}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !formData[field as keyof typeof formData] && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData[field as keyof typeof formData] ? 
              format(formData[field as keyof typeof formData] as Date, "dd/MM/yyyy") : 
              "Selecionar data"
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={formData[field as keyof typeof formData] as Date}
            onSelect={(date) => onInputChange(field, date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  const projetosDisponiveis = searchProjetos(projetoSearch);

  return (
    <div className="space-y-6">
      {/* Seção de Vinculação de Projeto */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            🔗 Vinculação de Projeto (Opcional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vinculacao" 
              checked={vinculacaoHabilitada}
              onCheckedChange={handleVinculacaoToggle}
            />
            <Label htmlFor="vinculacao" className="cursor-pointer">
              Vincular a um projeto existente
            </Label>
          </div>

          {vinculacaoHabilitada && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Tipo de Projeto *</Label>
                <Select value={tipoProjeto} onValueChange={setTipoProjeto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de projeto..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="importacao">Importação Direta</SelectItem>
                    <SelectItem value="licitacao">Licitação</SelectItem>
                    <SelectItem value="contratacao">Contratação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoProjeto && (
                <div className="space-y-2">
                  <Label>Buscar Projeto *</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={projetoSearch}
                      onChange={(e) => handleProjetoSearch(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Digite o número do processo ou nome do cliente..."
                      className="pl-10"
                    />
                    {selectedProjeto && (
                      <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                    )}
                    {projetoSearch && !selectedProjeto && projetosDisponiveis.length === 0 && (
                      <XCircle className="absolute right-3 top-3 h-4 w-4 text-red-600" />
                    )}
                  </div>

                  {/* Sugestões rápidas */}
                  {!projetoSearch && projetosDisponiveis.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs text-muted-foreground">Sugestões:</span>
                      {projetosDisponiveis.slice(0, 5).map((projeto) => (
                        <Badge
                          key={projeto.id}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => handleSelectProjeto(projeto)}
                        >
                          {projeto.numeroProcesso}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Dropdown de resultados */}
                  {showSuggestions && projetoSearch && projetosDisponiveis.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {projetosDisponiveis.map((projeto) => (
                        <div
                          key={projeto.id}
                          className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
                          onClick={() => handleSelectProjeto(projeto)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{projeto.id}</p>
                              <p className="text-sm text-muted-foreground">{projeto.cliente}</p>
                            </div>
                            <Badge variant="outline">{projeto.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Projeto selecionado */}
              {selectedProjeto && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-green-900 dark:text-green-100">
                        Vinculado: {selectedProjeto.id} - {selectedProjeto.cliente}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        {getTipoProjetoLabel(selectedProjeto.tipo)} • {selectedProjeto.status}
                      </p>
                      {selectedProjeto.responsavel && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Responsável: {selectedProjeto.responsavel}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!selectedProjeto && !tipoProjeto && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  💡 Selecione o tipo de projeto para visualizar as opções disponíveis
                </div>
              )}
            </div>
          )}

          {!vinculacaoHabilitada && (
            <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              📦 Empréstimo Avulso - Preencha os dados do cliente manualmente
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Número do Processo *</Label>
            <Input
              value={formData.numeroProcesso}
              onChange={(e) => onInputChange('numeroProcesso', e.target.value)}
              placeholder="Gerado automaticamente"
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">Gerado automaticamente pelo sistema</p>
          </div>

          <div className="space-y-2">
            <Label>CNPJ do Cliente *</Label>
            <div className="relative">
              <Input
                value={formData.cnpjCliente}
                onChange={(e) => onInputChange('cnpjCliente', e.target.value)}
                placeholder="00.000.000/0000-00"
                disabled={selectedProjeto !== null}
                className={selectedProjeto ? "bg-muted pr-10" : ""}
              />
              {selectedProjeto && (
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {selectedProjeto && (
              <p className="text-xs text-muted-foreground">
                Preenchido automaticamente do projeto vinculado
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Nome do Cliente *</Label>
            <div className="relative">
              <Input
                value={formData.nomeCliente}
                onChange={(e) => onInputChange('nomeCliente', e.target.value)}
                placeholder="Nome completo do cliente"
                disabled={selectedProjeto !== null}
                className={selectedProjeto ? "bg-muted pr-10" : ""}
              />
              {selectedProjeto && (
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {selectedProjeto && (
              <p className="text-xs text-muted-foreground">
                Preenchido automaticamente do projeto vinculado
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <DatePicker label="Data de Empréstimo" field="dataEmprestimo" required />
          <DatePicker label="Data de Saída" field="dataSaida" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea
          value={formData.observacoes}
          onChange={(e) => onInputChange('observacoes', e.target.value)}
          placeholder="Observações gerais sobre o empréstimo..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default DadosGeraisTab;
