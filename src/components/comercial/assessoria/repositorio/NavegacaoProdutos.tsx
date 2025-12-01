import { useState } from "react";
import { ArrowLeft, Package, Edit, Archive, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  marcasMock, 
  linhasMock, 
  getLinhasPorMarca, 
  getProdutosPorLinha,
  contarLinhasPorMarca,
  contarProdutosPorMarca,
  contarProdutosPorLinha,
} from "@/data/produtos";
import { Marca, Linha, Produto } from "@/types/produto";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EditarMarcaModal } from "./EditarMarcaModal";
import { EditarLinhaModal } from "./EditarLinhaModal";
import { ArquivarConfirmModal } from "./ArquivarConfirmModal";
import { toast } from "sonner";

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
  
  // Modals de edição
  const [editarMarcaModal, setEditarMarcaModal] = useState<Marca | null>(null);
  const [editarLinhaModal, setEditarLinhaModal] = useState<Linha | null>(null);
  
  // Modal de arquivar
  const [arquivarModal, setArquivarModal] = useState<{
    tipo: "marca" | "linha";
    item: Marca | Linha;
  } | null>(null);

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
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={produto.status === "ativo" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {produto.status === "ativo" ? "Ativo" : "Descontinuado"}
                      </Badge>
                      {produto.statusCadastro && (
                        <Badge
                          variant="outline"
                          className={`text-xs cursor-pointer hover:shadow-md transition-shadow ${
                            produto.statusCadastro === "completo"
                              ? "bg-green-50 border-green-500 text-green-700"
                              : "bg-yellow-50 border-yellow-500 text-yellow-700"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (produto.statusCadastro === "incompleto") {
                              onSelectProduto(produto);
                            }
                          }}
                        >
                          {produto.statusCadastro === "completo" ? "✓ Cadastro Completo" : "⚠ Cadastro Incompleto"}
                        </Badge>
                      )}
                    </div>
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant={produto.status === "ativo" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {produto.status === "ativo" ? "Ativo" : "Descontinuado"}
                    </Badge>
                    {produto.statusCadastro && (
                      <Badge
                        variant="outline"
                        className={`text-xs cursor-pointer hover:shadow-md transition-shadow ${
                          produto.statusCadastro === "completo"
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "bg-yellow-50 border-yellow-500 text-yellow-700"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (produto.statusCadastro === "incompleto") {
                            onSelectProduto(produto);
                          }
                        }}
                      >
                        {produto.statusCadastro === "completo" ? "✓ Cadastro Completo" : "⚠ Cadastro Incompleto"}
                      </Badge>
                    )}
                  </div>
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

  // Navegação por linhas de uma marca (TABELA)
  if (marcaSelecionada) {
    const linhas = getLinhasPorMarca(marcaSelecionada.id).filter(l => !l.arquivada);
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

        {/* Tabela de Linhas */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Linha</th>
                    <th className="text-left p-4 font-semibold">Descrição</th>
                    <th className="text-center p-4 font-semibold">Produtos</th>
                    <th className="text-center p-4 font-semibold">Status</th>
                    <th className="text-center p-4 font-semibold">Status Cadastro</th>
                    <th className="text-center p-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {linhas.map((linha) => {
                    const numProdutos = contarProdutosPorLinha(linha.id);
                    return (
                      <tr
                        key={linha.id}
                        className="border-t hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => setLinhaSelecionada(linha)}
                      >
                        <td className="p-4">
                          <div className="font-medium">{linha.nome}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {linha.descricao}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline">{numProdutos}</Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={linha.status === "ativo" ? "default" : "secondary"}
                          >
                            {linha.status === "ativo" ? "Ativo" : "Inativo"}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge
                            variant="outline"
                            className={
                              linha.statusCadastro === "completo"
                                ? "bg-green-50 border-green-500 text-green-700"
                                : "bg-yellow-50 border-yellow-500 text-yellow-700"
                            }
                          >
                            {linha.statusCadastro === "completo" ? (
                              "✓ Completo"
                            ) : (
                              <span className="flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Incompleto
                              </span>
                            )}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditarLinhaModal(linha);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setArquivarModal({
                                  tipo: "linha",
                                  item: linha,
                                });
                              }}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        {editarLinhaModal && (
          <EditarLinhaModal
            open={!!editarLinhaModal}
            onClose={() => setEditarLinhaModal(null)}
            linha={editarLinhaModal}
            onSave={(linhaAtualizada) => {
              // Aqui seria a lógica de salvar
              console.log("Linha atualizada:", linhaAtualizada);
              setEditarLinhaModal(null);
            }}
          />
        )}

        {arquivarModal && arquivarModal.tipo === "linha" && (
          <ArquivarConfirmModal
            open={!!arquivarModal}
            onClose={() => setArquivarModal(null)}
            tipo="linha"
            nome={(arquivarModal.item as Linha).nome}
            impacto={{
              produtos: contarProdutosPorLinha((arquivarModal.item as Linha).id),
            }}
            onConfirm={() => {
              // Aqui seria a lógica de arquivar
              toast.success("Linha arquivada com sucesso");
            }}
          />
        )}
      </div>
    );
  }

  // Navegação inicial: Marcas (GRID)
  const marcasAtivas = marcasMock.filter(m => !m.arquivada);
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Selecione uma Marca</h3>
        <p className="text-sm text-muted-foreground">
          Explore nosso catálogo de produtos por marca
        </p>
      </div>

      {/* Grid de Marcas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marcasAtivas.map((marca) => {
          const numLinhas = contarLinhasPorMarca(marca.id);
          const numProdutos = contarProdutosPorMarca(marca.id);
          
          return (
            <Card
              key={marca.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                {/* Logo e ações */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setMarcaSelecionada(marca)}
                  >
                    <img
                      src={marca.logo}
                      alt={marca.nome}
                      className="w-32 h-16 object-contain mb-3"
                    />
                    <h4 className="text-lg font-semibold mb-2">{marca.nome}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {marca.descricao}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditarMarcaModal(marca);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setArquivarModal({
                          tipo: "marca",
                          item: marca,
                        });
                      }}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Contadores */}
                <div
                  className="grid grid-cols-2 gap-3 mb-3 cursor-pointer"
                  onClick={() => setMarcaSelecionada(marca)}
                >
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{numLinhas}</div>
                    <div className="text-xs text-muted-foreground">
                      {numLinhas === 1 ? "Linha" : "Linhas"}
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{numProdutos}</div>
                    <div className="text-xs text-muted-foreground">
                      {numProdutos === 1 ? "Produto" : "Produtos"}
                    </div>
                  </div>
                </div>

                {/* Última atualização */}
                <div
                  className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer"
                  onClick={() => setMarcaSelecionada(marca)}
                >
                  <Clock className="h-3 w-3" />
                  <span>
                    Atualizada em {format(marca.ultimaAtualizacao, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modals */}
      {editarMarcaModal && (
        <EditarMarcaModal
          open={!!editarMarcaModal}
          onClose={() => setEditarMarcaModal(null)}
          marca={editarMarcaModal}
          onSave={(marcaAtualizada) => {
            // Aqui seria a lógica de salvar
            console.log("Marca atualizada:", marcaAtualizada);
            setEditarMarcaModal(null);
          }}
        />
      )}

      {arquivarModal && arquivarModal.tipo === "marca" && (
        <ArquivarConfirmModal
          open={!!arquivarModal}
          onClose={() => setArquivarModal(null)}
          tipo="marca"
          nome={(arquivarModal.item as Marca).nome}
          impacto={{
            linhas: contarLinhasPorMarca((arquivarModal.item as Marca).id),
            produtos: contarProdutosPorMarca((arquivarModal.item as Marca).id),
          }}
          onConfirm={() => {
            // Aqui seria a lógica de arquivar
            toast.success("Marca arquivada com sucesso");
          }}
        />
      )}
    </div>
  );
}
