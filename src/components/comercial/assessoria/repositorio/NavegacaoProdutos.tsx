import { useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { marcasMock, linhasMock, getLinhasPorMarca, getProdutosPorLinha } from "@/data/produtos";
import { Marca, Linha, Produto } from "@/types/produto";

interface NavegacaoProdutosProps {
  onSelectProduto: (produto: Produto) => void;
  produtosBuscados?: Produto[];
  termoBusca?: string;
}

export function NavegacaoProdutos({
  onSelectProduto,
  produtosBuscados,
  termoBusca,
}: NavegacaoProdutosProps) {
  const [marcaSelecionada, setMarcaSelecionada] = useState<Marca | null>(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState<Linha | null>(null);

  // Se há busca ativa, mostra os resultados
  if (termoBusca && produtosBuscados) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Resultados da Busca ({produtosBuscados.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Encontrados para "{termoBusca}"
          </p>
        </div>

        {produtosBuscados.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum produto encontrado
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {produtosBuscados.map((produto) => (
              <Card
                key={produto.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSelectProduto(produto)}
              >
                <CardContent className="p-4">
                  {produto.imagem && (
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="space-y-2">
                    <Badge
                      variant={produto.status === "ativo" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {produto.status === "ativo" ? "Ativo" : "Descontinuado"}
                    </Badge>
                    <h4 className="font-semibold">{produto.nome}</h4>
                    <p className="text-xs text-muted-foreground">{produto.codigo}</p>
                    <p className="text-sm line-clamp-2">{produto.descricao}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Navegação por produtos de uma linha
  if (linhaSelecionada) {
    const produtos = getProdutosPorLinha(linhaSelecionada.id);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLinhaSelecionada(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h3 className="text-lg font-semibold">{linhaSelecionada.nome}</h3>
            <p className="text-sm text-muted-foreground">
              {linhaSelecionada.descricao}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {produtos.map((produto) => (
            <Card
              key={produto.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectProduto(produto)}
            >
              <CardContent className="p-4">
                {produto.imagem ? (
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="space-y-2">
                  <Badge
                    variant={produto.status === "ativo" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {produto.status === "ativo" ? "Ativo" : "Descontinuado"}
                  </Badge>
                  <h4 className="font-semibold">{produto.nome}</h4>
                  <p className="text-xs text-muted-foreground">{produto.codigo}</p>
                  <p className="text-sm line-clamp-2">{produto.descricao}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Navegação por linhas de uma marca
  if (marcaSelecionada) {
    const linhas = getLinhasPorMarca(marcaSelecionada.id);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMarcaSelecionada(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h3 className="text-lg font-semibold">{marcaSelecionada.nome}</h3>
            <p className="text-sm text-muted-foreground">
              {marcaSelecionada.descricao}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linhas.map((linha) => (
            <Card
              key={linha.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setLinhaSelecionada(linha)}
            >
              <CardContent className="p-6">
                {linha.imagem && (
                  <img
                    src={linha.imagem}
                    alt={linha.nome}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="text-lg font-semibold mb-2">{linha.nome}</h4>
                <p className="text-sm text-muted-foreground">{linha.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Navegação inicial: Marcas
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Selecione uma Marca</h3>
        <p className="text-sm text-muted-foreground">
          Explore nosso catálogo de produtos por marca
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marcasMock.map((marca) => (
          <Card
            key={marca.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setMarcaSelecionada(marca)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={marca.logo}
                  alt={marca.nome}
                  className="w-24 h-12 object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2">{marca.nome}</h4>
              <p className="text-sm text-muted-foreground">{marca.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
