
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoneyInput } from "@/components/ui/money-input";
import { CalendarIcon, Save, X, Search, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

interface NovoEmprestimoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ImportacaoDireta {
  id: string;
  numeroProcesso: string;
  cliente: string;
  status: string;
  valorTotal: number;
}

const NovoEmprestimoModal = ({ isOpen, onClose }: NovoEmprestimoModalProps) => {
  const [formData, setFormData] = useState({
    numeroProcesso: `EMP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    cnpjCliente: "",
    nomeCliente: "",
    numeroDanfeEmprestimo: "",
    referenciaProdutoEmprestado: "",
    descricaoProdutoEmprestado: "",
    valorEmprestimo: "",
    moeda: "BRL" as "BRL" | "USD",
    dataEmprestimo: null as Date | null,
    dataSaida: null as Date | null,
    numeroDanfeRetorno: "",
    referenciaProdutoRecebido: "",
    descricaoProdutoRecebido: "",
    dataRetorno: null as Date | null,
    dataBaixa: null as Date | null,
    valorRetornado: "",
    idImportacaoDireta: ""
  });

  const [importacaoSearch, setImportacaoSearch] = useState("");
  const [selectedImportacao, setSelectedImportacao] = useState<ImportacaoDireta | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isVinculadoImportacao, setIsVinculadoImportacao] = useState(false);

  const debouncedSearch = useDebounce(importacaoSearch, 300);

  // Mock data for Direct Import IDs
  const mockImportacoes: ImportacaoDireta[] = [
    {
      id: "IMP-2024-001",
      numeroProcesso: "001",
      cliente: "Hospital Albert Einstein",
      status: "Em Andamento",
      valorTotal: 150000
    },
    {
      id: "IMP-2024-002", 
      numeroProcesso: "002",
      cliente: "Hospital Sírio-Libanês",
      status: "Concluída",
      valorTotal: 250000
    },
    {
      id: "IMP-2024-003",
      numeroProcesso: "003", 
      cliente: "INCA - Instituto Nacional de Câncer",
      status: "Em Andamento",
      valorTotal: 180000
    }
  ];

  const normalizeId = (input: string) => {
    const cleanInput = input.trim();
    if (/^\d{3}$/.test(cleanInput)) {
      return `IMP-${new Date().getFullYear()}-${cleanInput}`;
    }
    return cleanInput;
  };

  const searchImportacoes = (searchTerm: string) => {
    if (!searchTerm) return [];
    
    const normalizedTerm = normalizeId(searchTerm).toLowerCase();
    return mockImportacoes.filter(imp => 
      imp.id.toLowerCase().includes(normalizedTerm) ||
      imp.numeroProcesso.includes(searchTerm) ||
      imp.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleImportacaoSearch = (value: string) => {
    setImportacaoSearch(value);
    setShowSuggestions(value.length > 0);
    
    if (value) {
      const results = searchImportacoes(value);
      if (results.length === 1 && (results[0].id === normalizeId(value) || results[0].numeroProcesso === value)) {
        setSelectedImportacao(results[0]);
        handleInputChange('idImportacaoDireta', results[0].id);
      } else {
        setSelectedImportacao(null);
        handleInputChange('idImportacaoDireta', value);
      }
    } else {
      setSelectedImportacao(null);
      handleInputChange('idImportacaoDireta', "");
    }
  };

  const handleSelectImportacao = (importacao: ImportacaoDireta) => {
    setImportacaoSearch(importacao.numeroProcesso);
    setSelectedImportacao(importacao);
    setShowSuggestions(false);
    handleInputChange('idImportacaoDireta', importacao.id);
  };

  const quickSuggestions = ["001", "002", "003"];

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando empréstimo:", formData);
    if (selectedImportacao) {
      console.log("Vinculado à importação:", selectedImportacao);
    } else {
      console.log("Empréstimo pontual (sem vinculação)");
    }
    onClose();
  };

  const getCurrencyLabel = () => {
    return formData.moeda === 'BRL' ? 'R$' : 'USD';
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
            onSelect={(date) => handleInputChange(field, date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-biodina-blue">
            Novo Empréstimo
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Dados do Empréstimo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2">
              Dados do Empréstimo
            </h3>
            
            <div className="space-y-2">
              <Label>Número do Processo *</Label>
              <Input
                value={formData.numeroProcesso}
                onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                placeholder="Gerado automaticamente"
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">Gerado automaticamente pelo sistema</p>
            </div>

            <div className="space-y-2">
              <Label>CNPJ do Cliente *</Label>
              <Input
                value={formData.cnpjCliente}
                onChange={(e) => handleInputChange('cnpjCliente', e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <Label>Nome do Cliente *</Label>
              <Input
                value={formData.nomeCliente}
                onChange={(e) => handleInputChange('nomeCliente', e.target.value)}
                placeholder="Nome completo do cliente"
              />
            </div>

            <div className="space-y-2">
              <Label>Número da DANFE de Empréstimo *</Label>
              <Input
                value={formData.numeroDanfeEmprestimo}
                onChange={(e) => handleInputChange('numeroDanfeEmprestimo', e.target.value)}
                placeholder="Número da DANFE"
              />
            </div>

            <DatePicker label="Data de Empréstimo" field="dataEmprestimo" required />
            <DatePicker label="Data de Saída" field="dataSaida" required />
          </div>

          {/* Produto Emprestado */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2">
              Produto Emprestado
            </h3>

            <div className="space-y-2">
              <Label>Referência do Produto *</Label>
              <Input
                value={formData.referenciaProdutoEmprestado}
                onChange={(e) => handleInputChange('referenciaProdutoEmprestado', e.target.value)}
                placeholder="Código/referência do produto"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição do Produto *</Label>
              <Textarea
                value={formData.descricaoProdutoEmprestado}
                onChange={(e) => handleInputChange('descricaoProdutoEmprestado', e.target.value)}
                placeholder="Descrição detalhada do produto emprestado"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Moeda *</Label>
              <RadioGroup
                value={formData.moeda}
                onValueChange={(value) => handleInputChange('moeda', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BRL" id="brl" />
                  <Label htmlFor="brl">Real (R$)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="USD" id="usd" />
                  <Label htmlFor="usd">Dólar (USD)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Valor de Empréstimo ({getCurrencyLabel()}) *</Label>
              <MoneyInput
                value={formData.valorEmprestimo}
                onChange={(value) => handleInputChange('valorEmprestimo', value)}
                currency={formData.moeda}
                placeholder={formData.moeda === 'BRL' ? 'R$ 0,00' : '$0.00'}
              />
              <p className="text-xs text-gray-500">Valor principal para lógica de devolução</p>
            </div>
          </div>

          {/* Dados de Retorno (Opcionais) */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2">
              Dados de Retorno (Opcional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número da DANFE de Retorno</Label>
                <Input
                  value={formData.numeroDanfeRetorno}
                  onChange={(e) => handleInputChange('numeroDanfeRetorno', e.target.value)}
                  placeholder="Número da DANFE de devolução"
                />
              </div>

              <div className="space-y-2">
                <Label>Referência do Produto Recebido</Label>
                <Input
                  value={formData.referenciaProdutoRecebido}
                  onChange={(e) => handleInputChange('referenciaProdutoRecebido', e.target.value)}
                  placeholder="Pode ser diferente do produto emprestado"
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição do Produto Recebido</Label>
                <Textarea
                  value={formData.descricaoProdutoRecebido}
                  onChange={(e) => handleInputChange('descricaoProdutoRecebido', e.target.value)}
                  placeholder="Descrição do produto recebido na devolução"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Valor Retornado ({getCurrencyLabel()})</Label>
                <MoneyInput
                  value={formData.valorRetornado}
                  onChange={(value) => handleInputChange('valorRetornado', value)}
                  currency={formData.moeda}
                  placeholder={formData.moeda === 'BRL' ? 'R$ 0,00' : '$0.00'}
                />
                <p className="text-xs text-gray-500">Para comparar com valor_emprestimo</p>
              </div>

              <DatePicker label="Data do Retorno" field="dataRetorno" />
              <DatePicker label="Data da Baixa" field="dataBaixa" />
            </div>
          </div>

          {/* Vinculação com Importação Direta (Opcional) */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-biodina-blue border-b pb-2 flex-1">
                Vinculação com Importação Direta (Opcional)
              </h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="vinculado"
                  checked={isVinculadoImportacao}
                  onChange={(e) => {
                    setIsVinculadoImportacao(e.target.checked);
                    if (!e.target.checked) {
                      setImportacaoSearch("");
                      setSelectedImportacao(null);
                      handleInputChange('idImportacaoDireta', "");
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="vinculado" className="text-sm">
                  Vincular à uma Importação Direta
                </Label>
              </div>
            </div>

            {isVinculadoImportacao && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>ID da Importação Direta</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={importacaoSearch}
                      onChange={(e) => handleImportacaoSearch(e.target.value)}
                      onFocus={() => setShowSuggestions(importacaoSearch.length > 0)}
                      placeholder="Digite o ID (ex: 001, 002, 003) ou busque..."
                      className="pl-10 pr-10"
                    />
                    {selectedImportacao && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                    {importacaoSearch && !selectedImportacao && (
                      <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    )}
                  </div>

                  {/* Quick Suggestions */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">Sugestões rápidas:</span>
                    {quickSuggestions.map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="cursor-pointer hover:bg-biodina-gold/10 hover:border-biodina-gold"
                        onClick={() => handleImportacaoSearch(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>

                  {/* Search Results */}
                  {showSuggestions && importacaoSearch && (
                    <div className="border rounded-md bg-white shadow-lg max-h-48 overflow-y-auto">
                      {searchImportacoes(importacaoSearch).map((importacao) => (
                        <div
                          key={importacao.id}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleSelectImportacao(importacao)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-biodina-blue">{importacao.id}</div>
                              <div className="text-sm text-gray-600">{importacao.cliente}</div>
                              <div className="text-xs text-gray-500">Status: {importacao.status}</div>
                            </div>
                            <div className="text-sm font-medium text-green-600">
                              ${importacao.valorTotal.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      {searchImportacoes(importacaoSearch).length === 0 && (
                        <div className="p-3 text-center text-gray-500">
                          Nenhuma importação encontrada
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selected Import Info */}
                  {selectedImportacao && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">
                          Vinculado à: {selectedImportacao.id}
                        </span>
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        Cliente: {selectedImportacao.cliente} | Status: {selectedImportacao.status}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Marque esta opção apenas se o empréstimo estiver relacionado a uma importação direta específica
                  </p>
                </div>
              </div>
            )}

            {!isVinculadoImportacao && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Empréstimo Pontual:</strong> Este empréstimo será registrado independentemente de importações diretas. 
                  Ideal para casos onde o cliente necessita de insumos mas não possui empenho ou verba disponível no momento.
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Empréstimo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEmprestimoModal;
