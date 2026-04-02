import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OrganizacaoDocumentos } from "./OrganizacaoDocumentos";
import { LiberacaoProdutosTable } from "./LiberacaoProdutosTable";
import { ControleMudancasTable } from "./ControleMudancasTable";
import { TreinamentosSection } from "./TreinamentosSection";
import { ListaMestraSection } from "./ListaMestraSection";
import { HistoricoIntegracaoRT } from "./HistoricoIntegracaoRT";
import { 
  mockDocumentacoes, 
  mockLiberacaoProdutos, 
  mockMudancas,
  mockTreinamentosRealizados,
  mockTreinamentosFuturos,
  mockListaMestra
} from "@/data/rtModules";
import { DocumentacaoRT, LiberacaoProduto, Mudanca, Treinamento, ListaMestra } from "@/types/rt";

export const DocumentacaoTab = () => {
  const [listaMestra, setListaMestra] = useState<ListaMestra>(mockListaMestra);
  const [documentacoes, setDocumentacoes] = useState<DocumentacaoRT[]>(mockDocumentacoes);
  const [produtos, setProdutos] = useState<LiberacaoProduto[]>(mockLiberacaoProdutos);
  const [mudancas, setMudancas] = useState<Mudanca[]>(mockMudancas);
  const [treinamentosRealizados, setTreinamentosRealizados] = useState<Treinamento[]>(mockTreinamentosRealizados);
  const [treinamentosFuturos, setTreinamentosFuturos] = useState<Treinamento[]>(mockTreinamentosFuturos);
  const [buscaDocumentacao, setBuscaDocumentacao] = useState("");

  const handleTreinamentosChange = (realizados: Treinamento[], futuros: Treinamento[]) => {
    setTreinamentosRealizados(realizados);
    setTreinamentosFuturos(futuros);
  };

  const updateDocumentacao = (tipo: string, updates: Partial<DocumentacaoRT>) => {
    setDocumentacoes(prev => 
      prev.map(doc => doc.tipo === tipo ? { ...doc, ...updates } : doc)
    );
  };

  const popDoc = documentacoes.find(d => d.tipo === 'pop');
  const legDoc = documentacoes.find(d => d.tipo === 'legislacoes');

  return (
    <div className="space-y-8">
      <ListaMestraSection
        listaMestra={listaMestra}
        onListaMestraChange={setListaMestra}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Documentação</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar na Documentação..."
              value={buscaDocumentacao}
              onChange={(e) => setBuscaDocumentacao(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <OrganizacaoDocumentos
            titulo="POP - Procedimentos Operacionais Padrão"
            estruturaPastas={popDoc?.estruturaPastas || []}
            onEstruturaChange={(pastas) => updateDocumentacao('pop', { estruturaPastas: pastas })}
            searchTerm={buscaDocumentacao}
          />

          <OrganizacaoDocumentos
            titulo="Legislações Vigentes Pertinentes"
            estruturaPastas={legDoc?.estruturaPastas || []}
            onEstruturaChange={(pastas) => updateDocumentacao('legislacoes', { estruturaPastas: pastas })}
            searchTerm={buscaDocumentacao}
          />
        </div>
      </div>

      <LiberacaoProdutosTable
        produtos={produtos}
        onProdutosChange={setProdutos}
      />

      <ControleMudancasTable
        mudancas={mudancas}
        onMudancasChange={setMudancas}
      />

      <TreinamentosSection
        treinamentosRealizados={treinamentosRealizados}
        treinamentosFuturos={treinamentosFuturos}
        onTreinamentosChange={handleTreinamentosChange}
      />

      <HistoricoIntegracaoRT />
    </div>
  );
};
