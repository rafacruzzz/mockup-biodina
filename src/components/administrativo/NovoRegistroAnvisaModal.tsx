import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, Package, FileText, Building, CheckCircle, ArrowLeft, Plus } from "lucide-react";
import { modules } from "@/data/cadastroModules";
import { toast } from "sonner";
import { EtapaRegistro, RegistroAnvisaData } from "@/types/anvisaRegistro";
import { ProductRegistrationData } from "@/types/product";
import { OrganizacaoDocumentosStep } from "./components/OrganizacaoDocumentosStep";
import { InformacoesRegulatoriosStep } from "./components/InformacoesRegulatoriosStep";
import { DisponibilizacaoInstrucaoStep } from "./components/DisponibilizacaoInstrucaoStep";
import ProductRegistrationForm from "../product/ProductRegistrationForm";

interface NovoRegistroAnvisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistroSalvo?: (registro: RegistroAnvisaData) => void;
}

export const NovoRegistroAnvisaModal = ({ isOpen, onClose, onRegistroSalvo }: NovoRegistroAnvisaModalProps) => {
  const [etapa, setEtapa] = useState<EtapaRegistro>('selecao_produto');
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [registroData, setRegistroData] = useState<RegistroAnvisaData>({} as RegistroAnvisaData);
  const [busca, setBusca] = useState('');
  const [filtros, setFiltros] = useState({
    familiaProduto: 'all',
    marca: 'all',
    areaAnvisa: 'all'
  });
  
  // Estados para modal de produto
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProdutoRecemCriado, setIsProdutoRecemCriado] = useState<number | null>(null);
  const [produtos, setProdutos] = useState(modules.produtos.subModules.produtos.data);

  // Handlers para modal de produto
  const handleAbrirCadastroProduto = () => {
    setIsProductModalOpen(true);
  };

  const handleFecharModalProduto = () => {
    setIsProductModalOpen(false);
  };

  const handleSalvarNovoProduto = (produto: ProductRegistrationData) => {
    // Converter dados do produto para formato esperado pela lista ANVISA
    const novoId = Math.max(...produtos.map(p => p.id)) + 1; // Próximo ID disponível
    
    const produtoFormatado = {
      id: novoId,
      codigo: produto.codigo,
      referencia: produto.codigoProdutoFabricante || produto.codigo,
      nome: produto.descritivoBreve || produto.descricao,
      descricao: produto.descritivoCompleto || produto.descricao,
      familiaProduto: produto.familiaProduto,
      marca: produto.marca,
      modelo: produto.modelo,
      fabricante: produto.nomeProdutoFabricante || '',
      areaAnvisa: produto.areaAnvisa || 'produtos_saude'
    };

    // Adicionar produto à lista
    setProdutos(prev => [produtoFormatado, ...prev]);
    
    // Marcar como recém-criado
    setIsProdutoRecemCriado(produtoFormatado.id);
    
    // Selecionar automaticamente
    setProdutoSelecionado(produtoFormatado);
    setRegistroData(prev => ({ ...prev, produtoSelecionado: produtoFormatado }));
    
    // Fechar modal e mostrar toast
    setIsProductModalOpen(false);
    toast.success(`Produto "${produtoFormatado.nome}" cadastrado e selecionado com sucesso!`);
    
    // Remover destaque após 5 segundos
    setTimeout(() => setIsProdutoRecemCriado(null), 5000);
  };

  const aplicarFiltros = () => {
    return produtos.filter(produto => {
      // Filtro de busca
      const matchBusca = !busca || 
        produto.codigo?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.referencia?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
        produto.marca?.toLowerCase().includes(busca.toLowerCase());

      if (!matchBusca) return false;

      // Filtro de família de produto
      if (filtros.familiaProduto && filtros.familiaProduto !== 'all' && produto.familiaProduto !== filtros.familiaProduto) {
        return false;
      }

      // Filtro de marca
      if (filtros.marca && filtros.marca !== 'all' && produto.marca !== filtros.marca) {
        return false;
      }

      // Filtro de área ANVISA
      if (filtros.areaAnvisa && filtros.areaAnvisa !== 'all' && produto.areaAnvisa !== filtros.areaAnvisa) {
        return false;
      }

      return true;
    });
  };

  const produtosFiltrados = aplicarFiltros();

  // Obter opções únicas para os filtros
  const familiasProdutos = [...new Set(produtos.map(p => p.familiaProduto).filter(Boolean))];
  const marcas = [...new Set(produtos.map(p => p.marca).filter(Boolean))];

  const handleSelecionarProduto = (produto: any) => {
    setProdutoSelecionado(produto);
    setRegistroData(prev => ({ ...prev, produtoSelecionado: produto }));
    setEtapa('organizacao_documentos');
    toast.success(`Produto "${produto.nome}" selecionado para registro ANVISA`);
  };

  const handleVoltarParaSelecao = () => {
    setEtapa('selecao_produto');
    setProdutoSelecionado(null);
    setRegistroData({} as RegistroAnvisaData);
  };

  const handleVoltarParaDocumentos = () => {
    setEtapa('organizacao_documentos');
  };

  const handleVoltarParaRegulatorios = () => {
    setEtapa('informacoes_regulatorias');
  };

  const handleFinalizarDocumentos = (data: RegistroAnvisaData) => {
    setRegistroData(data);
    setEtapa('informacoes_regulatorias');
    toast.success('Documentos organizados com sucesso!');
  };

  const handleProximaEtapaRegulatorios = (data: RegistroAnvisaData) => {
    setRegistroData(data);
    setEtapa('disponibilizacao_instrucao');
    toast.success('Informações regulatórias salvas!');
  };

  const handleSalvarRegistroFinal = (data: RegistroAnvisaData) => {
    setRegistroData(data);
    
    // Callback para o componente pai
    if (onRegistroSalvo) {
      onRegistroSalvo(data);
    }
    
    toast.success('Registro ANVISA criado com sucesso!', {
      description: `${data.nomeArquivoPrincipal} foi registrado e está disponível na tabela.`
    });
    
    // Reset do modal
    handleFecharModal();
  };

  const handleFecharModal = () => {
    setEtapa('selecao_produto');
    setProdutoSelecionado(null);
    setRegistroData({} as RegistroAnvisaData);
    setBusca('');
    setFiltros({
      familiaProduto: 'all',
      marca: 'all',
      areaAnvisa: 'all'
    });
    setIsProductModalOpen(false);
    setIsProdutoRecemCriado(null);
    onClose();
  };

  const limparFiltros = () => {
    setBusca('');
    setFiltros({
      familiaProduto: 'all',
      marca: 'all',
      areaAnvisa: 'all'
    });
  };

  const getAreaAnvisaLabel = (area: string) => {
    switch (area) {
      case 'produtos_saude': return 'Produtos para Saúde';
      case 'diagnostico_in_vitro': return 'Diagnóstico In Vitro';
      default: return area;
    }
  };

  const getAreaAnvisaBadgeColor = (area: string) => {
    switch (area) {
      case 'produtos_saude': return 'bg-blue-100 text-blue-800';
      case 'diagnostico_in_vitro': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBreadcrumbTitle = () => {
    switch (etapa) {
      case 'selecao_produto': return 'Novo Registro ANVISA - Selecionar Produto';
      case 'organizacao_documentos': return 'Novo Registro ANVISA - Organizar Documentos';
      case 'informacoes_regulatorias': return 'Novo Registro ANVISA - Informações Regulatórias';
      case 'disponibilizacao_instrucao': return 'Novo Registro ANVISA - Disponibilização de Instrução de Uso';
      default: return 'Novo Registro ANVISA';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleFecharModal}>
      <DialogContent className={`max-h-[90vh] overflow-y-auto ${etapa !== 'selecao_produto' ? 'max-w-6xl' : 'max-w-5xl'}`}>
        <DialogHeader>
          <div className="space-y-3">
            {/* Breadcrumb Navigation */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <button 
                    onClick={handleVoltarParaSelecao}
                    className={`hover:text-primary ${etapa === 'selecao_produto' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                  >
                    Selecionar Produto
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <button 
                    onClick={handleVoltarParaDocumentos}
                    disabled={etapa === 'selecao_produto'}
                    className={`hover:text-primary ${etapa === 'organizacao_documentos' ? 'text-primary font-medium' : 'text-muted-foreground'} disabled:cursor-not-allowed`}
                  >
                    Organizar Documentos
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <button 
                    onClick={handleVoltarParaRegulatorios}
                    disabled={etapa === 'selecao_produto' || etapa === 'organizacao_documentos'}
                    className={`hover:text-primary ${etapa === 'informacoes_regulatorias' ? 'text-primary font-medium' : 'text-muted-foreground'} disabled:cursor-not-allowed`}
                  >
                    Informações Regulatórias
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className={etapa === 'disponibilizacao_instrucao' ? 'text-primary font-medium' : 'text-muted-foreground'}>
                    Disponibilização de Instrução
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {getBreadcrumbTitle()}
            </DialogTitle>
          </div>
        </DialogHeader>

        {etapa === 'selecao_produto' ? (
          <div className="space-y-4">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              {/* Busca Geral */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Busca Geral
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Código, Referência, Nome, Descrição, Marca..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Família de Produto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Família de Produto
                </label>
                <Select value={filtros.familiaProduto} onValueChange={(value) => setFiltros(prev => ({ ...prev, familiaProduto: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as famílias</SelectItem>
                    {familiasProdutos.map(familia => (
                      <SelectItem key={familia} value={familia}>{familia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Marca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <Select value={filtros.marca} onValueChange={(value) => setFiltros(prev => ({ ...prev, marca: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as marcas</SelectItem>
                    {marcas.map(marca => (
                      <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Área da ANVISA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Área da ANVISA
                </label>
                <Select value={filtros.areaAnvisa} onValueChange={(value) => setFiltros(prev => ({ ...prev, areaAnvisa: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as áreas</SelectItem>
                    <SelectItem value="produtos_saude">Produtos para Saúde</SelectItem>
                    <SelectItem value="diagnostico_in_vitro">Diagnóstico In Vitro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botão Limpar Filtros */}
              <div className="lg:col-span-4 flex justify-end">
                <Button variant="outline" onClick={limparFiltros} className="text-sm">
                  Limpar Filtros
                </Button>
              </div>
            </div>

            {/* Contador de Resultados e Botão Cadastrar Produto */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
              </div>
              <Button 
                onClick={handleAbrirCadastroProduto}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Cadastrar Novo Produto
              </Button>
            </div>

            {/* Lista de Produtos */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {produtosFiltrados.map((produto) => (
                <div 
                  key={produto.id} 
                  className={`border rounded-lg p-4 transition-colors ${
                    isProdutoRecemCriado === produto.id 
                      ? 'border-green-500 bg-green-50 shadow-lg' 
                      : produtoSelecionado?.id === produto.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {/* Header do Produto */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {produto.codigo}
                        </span>
                        <span className="font-mono text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          REF: {produto.referencia}
                        </span>
                        <Badge className={getAreaAnvisaBadgeColor(produto.areaAnvisa)}>
                          {getAreaAnvisaLabel(produto.areaAnvisa)}
                        </Badge>
                        {isProdutoRecemCriado === produto.id && (
                          <Badge className="bg-green-100 text-green-800 animate-pulse">
                            NOVO
                          </Badge>
                        )}
                      </div>

                      {/* Nome e Descrição */}
                      <h3 className="font-semibold text-lg mb-1">{produto.nome}</h3>
                      <p className="text-gray-600 text-sm mb-3">{produto.descricao}</p>
                      
                      {/* Informações Organizadas */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Família:</span>
                          <span className="ml-2 font-medium">{produto.familiaProduto}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Marca:</span>
                          <span className="ml-2 font-medium">{produto.marca}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Modelo:</span>
                          <span className="ml-2 font-medium">{produto.modelo}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Fabricante:</span>
                          <span className="ml-2 font-medium">{produto.fabricante}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botão de Seleção */}
                    <div className="ml-4">
                      <Button
                        onClick={() => handleSelecionarProduto(produto)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Selecionar Produto
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {produtosFiltrados.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
                  <p className="text-sm">Tente ajustar os filtros ou termo de busca</p>
                </div>
              )}
            </div>
          </div>
        ) : etapa === 'organizacao_documentos' ? (
          <OrganizacaoDocumentosStep
            produtoSelecionado={produtoSelecionado}
            onVoltar={handleVoltarParaSelecao}
            onFinalizar={handleFinalizarDocumentos}
          />
        ) : etapa === 'informacoes_regulatorias' ? (
          <InformacoesRegulatoriosStep
            produtoSelecionado={produtoSelecionado}
            registroData={registroData}
            onVoltar={handleVoltarParaDocumentos}
            onProximaEtapa={handleProximaEtapaRegulatorios}
          />
        ) : (
          <DisponibilizacaoInstrucaoStep
            produtoSelecionado={produtoSelecionado}
            registroData={registroData}
            onVoltar={handleVoltarParaRegulatorios}
            onSalvarRegistro={handleSalvarRegistroFinal}
          />
        )}

        {/* Modal de Cadastro de Produto */}
        <ProductRegistrationForm
          isOpen={isProductModalOpen}
          product={null}
          onClose={handleFecharModalProduto}
          onSave={handleSalvarNovoProduto}
        />
      </DialogContent>
    </Dialog>
  );
};