
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface ImportacaoDireta {
  id: string;
  numeroProcesso: string;
  cliente: string;
  status: string;
  valorTotal: number;
}

interface VinculacaoTabProps {
  formData: any;
  onInputChange: (field: string, value: string | Date | null) => void;
}

const VinculacaoTab = ({ formData, onInputChange }: VinculacaoTabProps) => {
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
        onInputChange('idImportacaoDireta', results[0].id);
      } else {
        setSelectedImportacao(null);
        onInputChange('idImportacaoDireta', value);
      }
    } else {
      setSelectedImportacao(null);
      onInputChange('idImportacaoDireta', "");
    }
  };

  const handleSelectImportacao = (importacao: ImportacaoDireta) => {
    setImportacaoSearch(importacao.numeroProcesso);
    setSelectedImportacao(importacao);
    setShowSuggestions(false);
    onInputChange('idImportacaoDireta', importacao.id);
  };

  const quickSuggestions = ["001", "002", "003"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
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
                onInputChange('idImportacaoDireta', "");
              }
            }}
            className="rounded border-gray-300"
          />
          <Label htmlFor="vinculado" className="text-sm">
            Vincular à uma Importação Direta
          </Label>
        </div>
      </div>

      {isVinculadoImportacao ? (
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
      ) : (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            <strong>Empréstimo Pontual:</strong> Este empréstimo será registrado independentemente de importações diretas. 
            Ideal para casos onde o cliente necessita de insumos mas não possui empenho ou verba disponível no momento.
          </p>
        </div>
      )}
    </div>
  );
};

export default VinculacaoTab;
