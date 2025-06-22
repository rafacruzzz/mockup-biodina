
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Package, Edit, Link, Check, Calendar, Hash } from "lucide-react";
import EditarProdutoImportado from "./EditarProdutoImportado";
import VincularProduto from "./VincularProduto";

interface ReviewXMLDataProps {
  data: any;
  onFinalize: () => void;
}

const ReviewXMLData = ({ data, onFinalize }: ReviewXMLDataProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVincularModal, setShowVincularModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [produtos, setProdutos] = useState(data.produtos);

  const handleEditProduct = (produto: any) => {
    setSelectedProduct(produto);
    setShowEditModal(true);
  };

  const handleVincularProduct = (produto: any) => {
    setSelectedProduct(produto);
    setShowVincularModal(true);
  };

  const handleSaveEdit = (produtoEditado: any) => {
    setProdutos(produtos.map((p: any) => 
      p.id === produtoEditado.id ? produtoEditado : p
    ));
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleVincular = (vinculacao: any) => {
    setProdutos(produtos.map((p: any) => 
      p.id === selectedProduct?.id ? { ...p, produtoVinculado: vinculacao } : p
    ));
    setShowVincularModal(false);
    setSelectedProduct(null);
  };

  const handleFinalize = () => {
    // Aqui seria a lógica para criar os pedidos com status "Faturado"
    console.log('Finalizando importação:', { notaFiscal: data.notaFiscal, produtos });
    onFinalize();
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Nota Fiscal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dados da Nota Fiscal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Número da NF</label>
              <p className="text-lg font-semibold text-biodina-blue">{data.notaFiscal.numero}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Fornecedor</label>
              <p className="font-medium">{data.notaFiscal.fornecedor}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Data de Emissão</label>
              <p className="font-medium">{new Date(data.notaFiscal.dataEmissao).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Valor Total</label>
              <p className="text-lg font-semibold text-green-600">
                R$ {data.notaFiscal.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">CFOP</label>
              <p className="font-medium">{data.notaFiscal.cfop}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">CNPJ</label>
              <p className="font-medium">{data.notaFiscal.cnpjFornecedor}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Produtos Importados */}
      <Card>
        <CardHeader>
          <CardTitle className="text-biodina-blue flex items-center gap-2">
            <Package className="h-5 w-5" />
            Produtos Importados ({produtos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Produto</th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-1">
                      <Hash className="h-4 w-4" />
                      Lote
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-1">
                      <Hash className="h-4 w-4" />
                      Nº Série
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Validade
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">Qtd</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Valor Unit.</th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto: any) => (
                  <tr key={produto.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium text-biodina-blue">{produto.codigo}</p>
                        <p className="text-sm text-gray-600">{produto.descricao}</p>
                        {produto.produtoVinculado && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Vinculado: {produto.produtoVinculado.nome}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="bg-yellow-50 border border-yellow-200 rounded px-2 py-1 inline-block">
                        <span className="font-medium text-yellow-800">
                          {produto.lote || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-block">
                        <span className="font-medium text-blue-800">
                          {produto.numeroSerie || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center text-sm">
                      {produto.dataValidade ? 
                        new Date(produto.dataValidade).toLocaleDateString('pt-BR') : 
                        "-"
                      }
                    </td>
                    <td className="py-4 px-2 text-center font-medium">{produto.quantidade}</td>
                    <td className="py-4 px-2 text-right font-medium">
                      R$ {produto.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Badge 
                        variant="outline" 
                        className={produto.produtoVinculado ? 
                          "border-green-200 text-green-700" : 
                          "border-yellow-200 text-yellow-700"
                        }
                      >
                        {produto.produtoVinculado ? "Vinculado" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(produto)}
                          className="h-8 px-3"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVincularProduct(produto)}
                          className="h-8 px-3"
                        >
                          <Link className="h-3 w-3 mr-1" />
                          Vincular
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onFinalize}>
          Cancelar Importação
        </Button>
        <Button 
          onClick={handleFinalize}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="h-4 w-4 mr-2" />
          Finalizar Importação
        </Button>
      </div>

      {/* Modais */}
      {showEditModal && selectedProduct && (
        <EditarProdutoImportado
          produto={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onSave={handleSaveEdit}
        />
      )}

      {showVincularModal && selectedProduct && (
        <VincularProduto
          produto={selectedProduct}
          onClose={() => {
            setShowVincularModal(false);
            setSelectedProduct(null);
          }}
          onVincular={handleVincular}
        />
      )}
    </div>
  );
};

export default ReviewXMLData;
