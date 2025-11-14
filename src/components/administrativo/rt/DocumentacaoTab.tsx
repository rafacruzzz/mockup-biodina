import { useState } from "react";
import { OrganizacaoDocumentos } from "./OrganizacaoDocumentos";
import { LiberacaoProdutosTable } from "./LiberacaoProdutosTable";
import { ControleMudancasTable } from "./ControleMudancasTable";
import { TreinamentosSection } from "./TreinamentosSection";
import { 
  mockDocumentacoes, 
  mockLiberacaoProdutos, 
  mockMudancas,
  mockTreinamentosRealizados,
  mockTreinamentosFuturos
} from "@/data/rtModules";
import { DocumentacaoRT, LiberacaoProduto, Mudanca, Treinamento } from "@/types/rt";

export const DocumentacaoTab = () => {
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
    <div className="space-y-6">
      {/* Seção 1: POP */}
      <OrganizacaoDocumentos
        titulo="POP - Procedimentos Operacionais Padrão"
        nomeArquivoPrincipal={popDoc?.nomeArquivoPrincipal || ""}
        onNomeArquivoChange={(nome) => updateDocumentacao('pop', { nomeArquivoPrincipal: nome })}
        estruturaPastas={popDoc?.estruturaPastas || []}
        onEstruturaChange={(pastas) => updateDocumentacao('pop', { estruturaPastas: pastas })}
      />

      {/* Seção 2: Especificações */}
      <OrganizacaoDocumentos
        titulo="Especificações"
        nomeArquivoPrincipal={especDoc?.nomeArquivoPrincipal || ""}
        onNomeArquivoChange={(nome) => updateDocumentacao('especificacoes', { nomeArquivoPrincipal: nome })}
        estruturaPastas={especDoc?.estruturaPastas || []}
        onEstruturaChange={(pastas) => updateDocumentacao('especificacoes', { estruturaPastas: pastas })}
      />

      {/* Seção 3: Legislações Vigentes Pertinentes */}
      <OrganizacaoDocumentos
        titulo="Legislações Vigentes Pertinentes"
        nomeArquivoPrincipal={legDoc?.nomeArquivoPrincipal || ""}
        onNomeArquivoChange={(nome) => updateDocumentacao('legislacoes', { nomeArquivoPrincipal: nome })}
        estruturaPastas={legDoc?.estruturaPastas || []}
        onEstruturaChange={(pastas) => updateDocumentacao('legislacoes', { estruturaPastas: pastas })}
      />

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
    </div>
  );
};
