import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BuscaPreditiva } from "./rastreabilidade/BuscaPreditiva";
import { DossieEquipamento } from "./rastreabilidade/DossieEquipamento";
import { Equipamento } from "@/types/rastreabilidade";
import { buscarEquipamentos } from "@/data/rastreabilidade";

export function RastreabilidadeTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);

  const resultadosBusca = searchTerm.length >= 2 ? buscarEquipamentos(searchTerm) : null;

  const handleSelectEquipamento = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleVoltar = () => {
    setEquipamentoSelecionado(null);
  };

  if (equipamentoSelecionado) {
    return <DossieEquipamento equipamento={equipamentoSelecionado} onVoltar={handleVoltar} />;
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Rastreabilidade de Equipamentos</h2>
        <p className="text-muted-foreground">
          O "Google" do seu parque instalado. Busque por número de série, modelo ou cliente.
        </p>
      </div>

      {/* Barra de Busca Preditiva */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
        <Input
          placeholder="Buscar por número de série, modelo, cliente..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(e.target.value.length >= 2);
          }}
          onFocus={() => setShowSuggestions(searchTerm.length >= 2)}
          className="pl-10 h-12 text-lg"
        />
        
        {showSuggestions && resultadosBusca && (
          <BuscaPreditiva
            resultados={resultadosBusca}
            onSelectEquipamento={handleSelectEquipamento}
            onClose={() => setShowSuggestions(false)}
          />
        )}
      </div>

      {/* Instruções ou Estado Vazio */}
      <div className="border-2 border-dashed rounded-lg p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Comece sua busca</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Digite no campo acima para buscar equipamentos por número de série, modelo ou cliente.
          A busca é inteligente e mostrará sugestões categorizadas.
        </p>
      </div>
    </div>
  );
}
