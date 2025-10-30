import { useState, useEffect } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Produto } from "@/types/produto";
import { VisaoGeralTab } from "./detalhe/VisaoGeralTab";
import { FichaTecnicaTab } from "./detalhe/FichaTecnicaTab";
import { DocumentosTab } from "./detalhe/DocumentosTab";
import { SuporteVendasTab } from "./detalhe/SuporteVendasTab";
import { MidiaTab } from "./detalhe/MidiaTab";
import { RegulatorioTab } from "./detalhe/RegulatorioTab";

interface DetalheProdutoProps {
  produto: Produto;
  onVoltar: () => void;
}

type SubAba = "visao-geral" | "ficha-tecnica" | "documentos" | "suporte-vendas" | "midia" | "regulatorio";

export function DetalheProduto({ produto, onVoltar }: DetalheProdutoProps) {
  const [subAbaAtiva, setSubAbaAtiva] = useState<SubAba>("visao-geral");
  const [highlightIncomplete, setHighlightIncomplete] = useState(false);

  // Se o cadastro está incompleto, determina qual aba deve abrir primeiro
  useEffect(() => {
    if (produto.statusCadastro === "incompleto") {
      setHighlightIncomplete(true);
      
      // Lógica para determinar qual aba tem campos incompletos
      if (!produto.registroAnvisa || !produto.linkConsultaAnvisa) {
        setSubAbaAtiva("regulatorio");
      } else if (!produto.especificacoesTecnicas || !produto.peso || !produto.dimensoes) {
        setSubAbaAtiva("ficha-tecnica");
      }
      
      // Scroll suave para o topo após um breve delay
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [produto]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{produto.nome}</h2>
              <Badge variant={produto.status === "ativo" ? "default" : "secondary"}>
                {produto.status === "ativo" ? "Ativo" : "Descontinuado"}
              </Badge>
              {produto.statusCadastro && (
                <Badge
                  variant="outline"
                  className={`${
                    produto.statusCadastro === "completo"
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-yellow-50 border-yellow-500 text-yellow-700"
                  }`}
                >
                  {produto.statusCadastro === "completo" ? "✓ Cadastro Completo" : "⚠ Cadastro Incompleto"}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{produto.codigo}</p>
          </div>
        </div>
      </div>

      {/* Imagem do Produto */}
      {produto.imagem ? (
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full max-h-[400px] object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <Package className="h-24 w-24 text-muted-foreground" />
        </div>
      )}

      {/* Sub-abas */}
      <div className="border-b">
        <div className="flex gap-4 overflow-x-auto">
          {[
            { id: "visao-geral", label: "Visão Geral" },
            { id: "ficha-tecnica", label: "Ficha Técnica" },
            { id: "documentos", label: "Documentos" },
            { id: "suporte-vendas", label: "Suporte a Vendas" },
            { id: "midia", label: "Mídia" },
            { id: "regulatorio", label: "Regulatório" },
          ].map((aba) => (
            <button
              key={aba.id}
              onClick={() => setSubAbaAtiva(aba.id as SubAba)}
              className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                subAbaAtiva === aba.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo das Sub-abas */}
      <div>
        {subAbaAtiva === "visao-geral" && <VisaoGeralTab produto={produto} />}
        {subAbaAtiva === "ficha-tecnica" && <FichaTecnicaTab produto={produto} highlightIncomplete={highlightIncomplete} />}
        {subAbaAtiva === "documentos" && <DocumentosTab produto={produto} />}
        {subAbaAtiva === "suporte-vendas" && <SuporteVendasTab produto={produto} />}
        {subAbaAtiva === "midia" && <MidiaTab produto={produto} />}
        {subAbaAtiva === "regulatorio" && <RegulatorioTab produto={produto} highlightIncomplete={highlightIncomplete} />}
      </div>
    </div>
  );
}
