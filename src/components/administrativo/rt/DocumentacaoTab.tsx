import { useState } from "react";
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
  // Estado para Lista Mestra
  const [listaMestra, setListaMestra] = useState<ListaMestra>(mockListaMestra);

  // Estados para documentações
  const [documentacoes, setDocumentacoes] = useState<DocumentacaoRT[]>(mockDocumentacoes);

  // Estados para liberação de produtos
  const [produtos, setProdutos] = useState<LiberacaoProduto[]>(mockLiberacaoProdutos);

  // Estados para controle de mudanças
  const [mudancas, setMudancas] = useState<Mudanca[]>(mockMudancas);

  // Estados para treinamentos
  const [treinamentosRealizados, setTreinamentosRealizados] = useState<Treinamento[]>(mockTreinamentosRealizados);
  const [treinamentosFuturos, setTreinamentosFuturos] = useState<Treinamento[]>(mockTreinamentosFuturos);

  const handleTreinamentosChange = (realizados: Treinamento[], futuros: Treinamento[]) => {
    setTreinamentosRealizados(realizados);
    setTreinamentosFuturos(futuros);
  };

  // Helpers para atualizar documentações
  const updateDocumentacao = (tipo: string, updates: Partial<DocumentacaoRT>) => {
    setDocumentacoes(prev => 
      prev.map(doc => doc.tipo === tipo ? { ...doc, ...updates } : doc)
    );
  };

  const popDoc = documentacoes.find(d => d.tipo === 'pop');
  const especDoc = documentacoes.find(d => d.tipo === 'especificacoes');
  const legDoc = documentacoes.find(d => d.tipo === 'legislacoes');

  return (
    <div className="space-y-8">
      {/* Seção: Lista Mestra */}
      <ListaMestraSection
        listaMestra={listaMestra}
        onListaMestraChange={setListaMestra}
      />

      {/* Seção: Documentação */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Documentação</h2>
        
        <div className="space-y-6">
          {/* POP - Procedimentos Operacionais Padrão */}
          <OrganizacaoDocumentos
            titulo="POP - Procedimentos Operacionais Padrão"
            estruturaPastas={popDoc?.estruturaPastas || []}
            onEstruturaChange={(pastas) => updateDocumentacao('pop', { estruturaPastas: pastas })}
          />

          {/* Especificações */}
          <OrganizacaoDocumentos
            titulo="Especificações"
            estruturaPastas={especDoc?.estruturaPastas || []}
            onEstruturaChange={(pastas) => updateDocumentacao('especificacoes', { estruturaPastas: pastas })}
          />

          {/* Legislações Vigentes Pertinentes */}
          <OrganizacaoDocumentos
            titulo="Legislações Vigentes Pertinentes"
            estruturaPastas={legDoc?.estruturaPastas || []}
            onEstruturaChange={(pastas) => updateDocumentacao('legislacoes', { estruturaPastas: pastas })}
          />
        </div>
      </div>

      {/* Seção 4: Liberação de Produtos */}
      <LiberacaoProdutosTable
        produtos={produtos}
        onProdutosChange={setProdutos}
      />

      {/* Seção 5: Controle de Mudanças */}
      <ControleMudancasTable
        mudancas={mudancas}
        onMudancasChange={setMudancas}
      />

      {/* Seção 6: Treinamentos */}
      <TreinamentosSection
        treinamentosRealizados={treinamentosRealizados}
        treinamentosFuturos={treinamentosFuturos}
        onTreinamentosChange={handleTreinamentosChange}
      />

      {/* Seção 7: Histórico de Alterações */}
      <HistoricoIntegracaoRT />
    </div>
  );
};
