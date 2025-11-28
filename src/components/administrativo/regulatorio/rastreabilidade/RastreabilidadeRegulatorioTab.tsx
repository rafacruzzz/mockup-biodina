import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BuscaPreditivaRegulatorio } from './BuscaPreditivaRegulatorio';
import { DossieEquipamentoRegulatorio } from './DossieEquipamentoRegulatorio';
import { EquipamentoRegulatorio } from '@/types/rastreabilidadeRegulatorio';
import { buscarEquipamentosRegulatorio } from '@/data/rastreabilidadeRegulatorio';

export function RastreabilidadeRegulatorioTab() {
  const [termoBusca, setTermoBusca] = useState('');
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<EquipamentoRegulatorio | null>(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const resultadosBusca = termoBusca.trim() 
    ? buscarEquipamentosRegulatorio(termoBusca)
    : { equipamentos: [], modelos: [], clientes: [], lotes: [] };

  const handleBuscaChange = (valor: string) => {
    setTermoBusca(valor);
    setMostrarResultados(valor.trim().length > 0);
  };

  const handleSelectEquipamento = (equipamento: EquipamentoRegulatorio) => {
    setEquipamentoSelecionado(equipamento);
    setMostrarResultados(false);
  };

  return (
    <div className="space-y-6">
      {/* Campo de Busca */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por código, número de série, modelo, cliente, lote, versão de software ou Windows..."
            value={termoBusca}
            onChange={(e) => handleBuscaChange(e.target.value)}
            onFocus={() => termoBusca.trim() && setMostrarResultados(true)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Resultados da Busca Preditiva */}
        {mostrarResultados && (
          <BuscaPreditivaRegulatorio
            resultados={resultadosBusca}
            onSelectEquipamento={handleSelectEquipamento}
            onClose={() => setMostrarResultados(false)}
          />
        )}
      </div>

      {/* Conteúdo Principal */}
      {equipamentoSelecionado ? (
        <DossieEquipamentoRegulatorio equipamento={equipamentoSelecionado} />
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-16">
            <div className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Sistema de Rastreabilidade Regulatório</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Utilize o campo de busca para encontrar equipamentos por:
                </p>
                <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                  <li>• Código do produto</li>
                  <li>• Número de série</li>
                  <li>• Modelo ou marca</li>
                  <li>• Cliente ou hospital</li>
                  <li>• Lote de importação</li>
                  <li>• Versão de software ou Windows</li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Informações integradas de:</strong> CADASTRO • COMEX • VENDAS • DT • Assessoria Científica
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
