
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Save } from "lucide-react";
import { ProductRegistrationData, ProductRegistrationFormProps } from "@/types/product";
import DadosGeraisTab from "./DadosGeraisTab";
import RegulamentacaoAnvisaTab from "./RegulamentacaoAnvisaTab";
import ApresentacoesTab from "./ApresentacoesTab";
import CodigosFiscaisTab from "./CodigosFiscaisTab";
import PrecoEstoqueTab from "./PrecoEstoqueTab";
import DimensoesPesoTab from "./DimensoesPesoTab";
import DocumentacaoLinksTab from "./DocumentacaoLinksTab";
import LogisticaComercialTab from "./LogisticaComercialTab";
import AuditoriaTab from "./AuditoriaTab";

const ProductRegistrationForm = ({ isOpen, product, onClose, onSave }: ProductRegistrationFormProps) => {
  const [formData, setFormData] = useState<ProductRegistrationData>({
    // Dados Gerais
    codigo: "",
    linhaProduto: "",
    marca: "",
    modelo: "",
    modeloProdutoMedico: "",
    descricao: "",
    vendidoPorUnidade: true,
    nomeMarketing: "",
    descritivoBreve: "",
    descritivoCompleto: "",
    tags: [],
    fabricanteId: "",
    codigoProdutoFabricante: "",
    nomeProdutoFabricante: "",

    // Regulamentação ANVISA
    detentorRegistroId: "",
    nomeEmpresaDetentora: "",
    cnpjDetentor: "",
    autorizacaoFuncionamento: "",
    areaAnvisa: "",
    nomeTecnicoDispositivo: "",
    numeroNotificacaoRegistro: "",
    situacaoNotificacaoRegistro: "",
    processoNotificacaoRegistro: "",
    classificacaoRisco: "",
    dataInicioVigencia: null,
    dataVencimento: null,
    dataVencimentoTipo: 'data',
    linkConsultaAnvisa: "",

    // Apresentações
    apresentacaoPrimaria: "",
    apresentacaoSecundaria: "",
    apresentacaoEmbarque: "",
    componentes: "",
    referenciasComercializadas: [],

    // Códigos Fiscais
    codigoNCM: "",
    cest: "",
    codigoEANPrimaria: "",
    codigoEANSecundaria: "",
    codigoEANEmbarque: "",
    origemProdutoICMS: "",

    // Preço e Estoque
    precoUnitarioVenda: 0,
    estoqueFisico: 0,
    reservado: 0,
    estoqueDisponivel: 0,

    // Dimensões e Peso
    pesoLiquido: 0,
    pesoBruto: 0,
    altura: 0,
    largura: 0,
    profundidade: 0,

    // Documentação e Links
    documentacaoLinks: {
      linksDocumentacao: [],
      arquivosLocais: []
    },

    // Logística e Comercial
    diasGarantia: 0,
    leadtimeRessuprimento: 0,
    diasCrossdocking: 0,
    cupomFiscalPDV: false,
    marketplace: false,
    tipoItemBlocoK: "",
    origemMercadoria: "",

    // Auditoria
    inclusao: new Date(),
    ultimaAlteracao: new Date(),
    incluidoPor: "Sistema",
    alteradoPor: "Sistema"
  });

  // Calculate available stock whenever physical stock or reserved changes
  useEffect(() => {
    const disponivel = formData.estoqueFisico - formData.reservado;
    setFormData(prev => ({ ...prev, estoqueDisponivel: Math.max(0, disponivel) }));
  }, [formData.estoqueFisico, formData.reservado]);

  // Load product data if editing
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (field: keyof ProductRegistrationData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      ultimaAlteracao: new Date(),
      alteradoPor: "Usuário Atual"
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header fixo */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold text-biodina-blue">Cadastro de Produto</h2>
                <p className="text-gray-600">Gerencie as informações completas do produto</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Botões fixos no topo */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="px-8">
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmit}
              className="bg-biodina-gold hover:bg-biodina-gold/90 px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Produto
            </Button>
          </div>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="dados-gerais" className="w-full">
            <TabsList className="flex flex-wrap w-full gap-1 p-1 mb-6 h-auto">
              <TabsTrigger value="dados-gerais" className="text-xs flex-1 min-w-fit px-2 py-1.5">Dados Gerais</TabsTrigger>
              <TabsTrigger value="regulamentacao-anvisa" className="text-xs flex-1 min-w-fit px-2 py-1.5">Regulamentação ANVISA</TabsTrigger>
              <TabsTrigger value="apresentacoes" className="text-xs flex-1 min-w-fit px-2 py-1.5">Apresentações</TabsTrigger>
              <TabsTrigger value="codigos-fiscais" className="text-xs flex-1 min-w-fit px-2 py-1.5">Códigos Fiscais</TabsTrigger>
              <TabsTrigger value="preco-estoque" className="text-xs flex-1 min-w-fit px-2 py-1.5">Preço e Estoque</TabsTrigger>
              <TabsTrigger value="dimensoes-peso" className="text-xs flex-1 min-w-fit px-2 py-1.5">Dimensões e Peso</TabsTrigger>
              <TabsTrigger value="documentacao-links" className="text-xs flex-1 min-w-fit px-2 py-1.5">Documentação e Links</TabsTrigger>
              <TabsTrigger value="logistica-comercial" className="text-xs flex-1 min-w-fit px-2 py-1.5">Logística e Comercial</TabsTrigger>
              <TabsTrigger value="auditoria" className="text-xs flex-1 min-w-fit px-2 py-1.5">Auditoria</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais">
              <DadosGeraisTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="regulamentacao-anvisa">
              <RegulamentacaoAnvisaTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="apresentacoes">
              <ApresentacoesTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="codigos-fiscais">
              <CodigosFiscaisTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="preco-estoque">
              <PrecoEstoqueTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="dimensoes-peso">
              <DimensoesPesoTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="documentacao-links">
              <DocumentacaoLinksTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="logistica-comercial">
              <LogisticaComercialTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="auditoria">
              <AuditoriaTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;
