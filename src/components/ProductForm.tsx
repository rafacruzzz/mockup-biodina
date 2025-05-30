
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Save, Package } from "lucide-react";
import InformacaoBasicaTab from "./product/InformacaoBasicaTab";
import EstoqueTab from "./product/EstoqueTab";
import UltimasMovimentacoesTab from "./product/UltimasMovimentacoesTab";
import FiscalTab from "./product/FiscalTab";

const ProductForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    // Informações Básicas
    nome: "",
    codigo: "",
    codigoVendedor: "",
    marca: "",
    ativo: true,
    tipoProduto: "",
    familiaProduto: "",
    grupoProduto: "",
    subgrupoProduto: "",
    tags: "",
    unidadeMedidaTributavel: "",
    informacao: "",
    estoqueDisponivel: "",
    estoqueMinimo: "",
    visivelVenda: true,
    descontoPercentual: "",
    imagem: null as File | null,

    // Informações Adicionais
    unidadeMedidaComercial: "",
    fatorConversao: "1",
    peso: "",
    largura: "",
    altura: "",
    comprimento: "",
    controladoPorDimensao: false,
    ean: "",
    tipoCodigoNumeroSerie: "",
    controladoPorLote: false,
    numeroLote: "",
    numeroSerie: "",
    dataValidade: "",
    dataFabricacao: "",
    observacao: "",

    // Custos e Precificação
    calcularCustoTotalAuto: false,
    calcularValorVendaAuto: false,
    precoCusto: "",
    fretePagoCompra: "",
    seguroPagoCompra: "",
    ipi: "",
    icms: "",
    despesasOperacionais: "",
    precoCustoComAcrescimos: "",
    tipoLucro: "",
    mvaLucro: "",
    valorVenda: "",
    tipoDesconto: "",
    descontoMaximo: "",

    // Fornecedores
    fornecedores: [] as Array<{ id: string; cnpj: string; nome: string }>,

    // Fiscal
    grupoTributario: "",
    cfopPadrao: "",
    ncm: "",
    cest: "",
    origemMercadoria: "",
    situacaoTributariaIPI: "",
    exTipi: "",
    codigoBeneficioFiscal: "",
    fabricante: "",
    produzidoEscalaNaoRelevante: false,
    informacoesAdicionaisNFe: "",
    exigeRastreabilidadeLotes: false,
    exigeGrupoMed: false,

    // Integrações
    integracaoWoocommerce: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do produto:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-biodina-gold/10 rounded-lg">
                <Package className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-biodina-blue">Cadastro de Produto</h2>
                <p className="text-gray-600">Cadastre um novo produto no sistema</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Tabs defaultValue="informacoes-basicas" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="informacoes-basicas">Informações Básicas</TabsTrigger>
              <TabsTrigger value="estoque">Estoque</TabsTrigger>
              <TabsTrigger value="movimentacoes">Últimas Movimentações</TabsTrigger>
              <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes-basicas">
              <InformacaoBasicaTab 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
            </TabsContent>

            <TabsContent value="estoque">
              <EstoqueTab />
            </TabsContent>

            <TabsContent value="movimentacoes">
              <UltimasMovimentacoesTab />
            </TabsContent>

            <TabsContent value="fiscal">
              <FiscalTab 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
            <Button type="button" variant="outline" onClick={onClose} className="px-8">
              Cancelar
            </Button>
            <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90 px-8">
              <Save className="h-4 w-4 mr-2" />
              Salvar Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
