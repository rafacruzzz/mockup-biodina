/**
 * Função utilitária para filtrar produtos por múltiplos critérios de busca
 * Busca por: código, nome, descrição, referência, fabricante, marca
 */
export const filterProdutoBySearch = (produto: any, searchTerm: string): boolean => {
  if (!searchTerm) return true;
  
  const termo = searchTerm.toLowerCase();
  
  return (
    produto.codigo?.toLowerCase().includes(termo) ||
    produto.nome?.toLowerCase().includes(termo) ||
    produto.descricao?.toLowerCase().includes(termo) ||
    produto.referencia?.toLowerCase().includes(termo) ||
    produto.fabricante?.toLowerCase().includes(termo) ||
    produto.marca?.toLowerCase().includes(termo)
  );
};

/**
 * Função para buscar produto em array com suporte a descrição
 */
export const searchProdutos = (produtos: any[], searchTerm: string): any[] => {
  return produtos.filter(produto => filterProdutoBySearch(produto, searchTerm));
};
