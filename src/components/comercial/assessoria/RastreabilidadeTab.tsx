import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListaEquipamentos } from "./rastreabilidade/ListaEquipamentos";
import { DossieEquipamento } from "./rastreabilidade/DossieEquipamento";
import { buscarEquipamentos } from "@/data/equipamentos";
import { Equipamento } from "@/types/equipamento";

export function RastreabilidadeTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);

  const handleSearch = () => {
    setShowResults(true);
    setEquipamentoSelecionado(null);
  };

  const handleSelectEquipamento = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
  };

  const handleVoltar = () => {
    if (equipamentoSelecionado) {
      setEquipamentoSelecionado(null);
    } else {
      setShowResults(false);
      setSearchTerm("");
    }
  };

  const equipamentosFiltrados = buscarEquipamentos(searchTerm);

  // Tela de busca inicial
  if (!showResults && !equipamentoSelecionado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Rastreabilidade de Equipamentos</h2>
          <p className="text-muted-foreground">
            Busque por Cliente, Nº de Série, Lote ou Modelo do Equipamento
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Digite o termo de busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="px-8">
              Buscar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-primary">{equipamentosFiltrados.length}</div>
            <div className="text-sm text-muted-foreground">Equipamentos Cadastrados</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-chart-2">
              {equipamentosFiltrados.filter((eq) => eq.status === "ativo").length}
            </div>
            <div className="text-sm text-muted-foreground">Ativos</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-chart-3">
              {equipamentosFiltrados.filter((eq) => eq.status === "manutencao").length}
            </div>
            <div className="text-sm text-muted-foreground">Em Manutenção</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-chart-1">
              {equipamentosFiltrados.filter((eq) => eq.status === "emprestimo").length}
            </div>
            <div className="text-sm text-muted-foreground">Empréstimo</div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de dossiê do equipamento
  if (equipamentoSelecionado) {
    return (
      <DossieEquipamento equipamento={equipamentoSelecionado} onVoltar={handleVoltar} />
    );
  }

  // Tela de resultados da busca
  return (
    <ListaEquipamentos
      equipamentos={equipamentosFiltrados}
      searchTerm={searchTerm}
      onSelectEquipamento={handleSelectEquipamento}
      onVoltar={handleVoltar}
      onNovaSearch={() => setShowResults(false)}
    />
  );
}
