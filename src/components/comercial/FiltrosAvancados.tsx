
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";

interface FiltrosAvancadosProps {
  onFiltrosChange: (filtros: FiltrosState) => void;
  filtrosAtivos: FiltrosState;
}

export interface FiltrosState {
  linhasProdutos: string[];
  fornecedores: string[];
  categoria: string;
}

const FiltrosAvancados = ({ onFiltrosChange, filtrosAtivos }: FiltrosAvancadosProps) => {
  const [filtros, setFiltros] = useState<FiltrosState>(filtrosAtivos);
  const [isOpen, setIsOpen] = useState(false);

  const linhasProdutos = [
    { id: 'Cardiologia', nome: 'Cardiologia' },
    { id: 'Ortopedia', nome: 'Ortopedia' },
    { id: 'Radiologia', nome: 'Radiologia' },
    { id: 'Laboratório', nome: 'Laboratório' },
    { id: 'UTI', nome: 'UTI' },
    { id: 'Centro Cirúrgico', nome: 'Centro Cirúrgico' },
    { id: 'Diagnóstico por Imagem', nome: 'Diagnóstico por Imagem' },
    { id: 'Anestesia', nome: 'Anestesia' }
  ];

  const fornecedores = [
    { id: 'Johnson & Johnson', nome: 'Johnson & Johnson' },
    { id: 'Medtronic', nome: 'Medtronic' },
    { id: 'Abbott', nome: 'Abbott' },
    { id: 'Boston Scientific', nome: 'Boston Scientific' },
    { id: 'Philips', nome: 'Philips' },
    { id: 'Siemens', nome: 'Siemens' },
    { id: 'B. Braun', nome: 'B. Braun' },
    { id: 'Baxter', nome: 'Baxter' }
  ];

  const categorias = [
    'Dispositivos Médicos',
    'Descartáveis', 
    'Equipamentos',
    'Diagnóstico',
    'Reagentes'
  ];

  const handleLinhaProdutoChange = (linha: string, checked: boolean) => {
    const novasLinhas = checked 
      ? [...filtros.linhasProdutos, linha]
      : filtros.linhasProdutos.filter(l => l !== linha);
    
    const novosFiltros = { ...filtros, linhasProdutos: novasLinhas };
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const handleFornecedorChange = (fornecedor: string, checked: boolean) => {
    const novosFornecedores = checked 
      ? [...filtros.fornecedores, fornecedor]
      : filtros.fornecedores.filter(f => f !== fornecedor);
    
    const novosFiltros = { ...filtros, fornecedores: novosFornecedores };
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const handleCategoriaChange = (categoria: string) => {
    const novosFiltros = { ...filtros, categoria };
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = {
      linhasProdutos: [],
      fornecedores: [],
      categoria: ''
    };
    setFiltros(filtrosLimpos);
    onFiltrosChange(filtrosLimpos);
  };

  const contadorFiltros = filtros.linhasProdutos.length + filtros.fornecedores.length + 
    (filtros.categoria ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {contadorFiltros > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {contadorFiltros}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filtros Avançados
            <Button variant="ghost" size="sm" onClick={limparFiltros}>
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Categoria */}
          <div>
            <Label className="text-sm font-medium">Categoria</Label>
            <Select value={filtros.categoria} onValueChange={handleCategoriaChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Linhas de Produtos */}
          <div>
            <Label className="text-sm font-medium">Linhas de Produtos</Label>
            <div className="space-y-2 mt-2">
              {linhasProdutos.map((linha) => (
                <div key={linha.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={linha.id}
                    checked={filtros.linhasProdutos.includes(linha.id)}
                    onCheckedChange={(checked) => handleLinhaProdutoChange(linha.id, !!checked)}
                  />
                  <Label htmlFor={linha.id} className="text-sm">
                    {linha.nome}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Fornecedores */}
          <div>
            <Label className="text-sm font-medium">Fornecedor</Label>
            <div className="space-y-2 mt-2">
              {fornecedores.map((fornecedor) => (
                <div key={fornecedor.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={fornecedor.id}
                    checked={filtros.fornecedores.includes(fornecedor.id)}
                    onCheckedChange={(checked) => handleFornecedorChange(fornecedor.id, !!checked)}
                  />
                  <Label htmlFor={fornecedor.id} className="text-sm">
                    {fornecedor.nome}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FiltrosAvancados;
