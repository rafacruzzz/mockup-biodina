import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NavegacaoProdutos } from "./repositorio/NavegacaoProdutos";
import { DetalheProduto } from "./repositorio/DetalheProduto";
import { Produto } from "@/types/produto";
import { buscarProdutos } from "@/data/produtos";

export function RepositorioProdutosTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const handleSelectProduto = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleVoltar = () => {
    setProdutoSelecionado(null);
  };

  const handleSearch = (termo: string) => {
    setSearchTerm(termo);
    setProdutoSelecionado(null);
  };

  const produtosFiltrados = searchTerm ? buscarProdutos(searchTerm) : [];

  if (produtoSelecionado) {
    return <DetalheProduto produto={produtoSelecionado} onVoltar={handleVoltar} />;
  }

  return (
    <div className="space-y-6">
      {/* Barra de Busca Persistente */}
      <div className="sticky top-0 z-10 bg-background pb-4">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, código, palavras-chave..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Navegação ou Resultados da Busca */}
      <NavegacaoProdutos
        onSelectProduto={handleSelectProduto}
        produtosBuscados={produtosFiltrados}
        termoBusca={searchTerm}
      />
    </div>
  );
}
