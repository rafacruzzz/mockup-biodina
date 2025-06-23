
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";

interface FiltrosAvancadosProps {
  onFiltrosChange: (filtros: FiltrosState) => void;
  filtrosAtivos: FiltrosState;
}

export interface FiltrosState {
  cnpjs: string[];
  tipoEstoque: string[];
  validadeMinima: string;
  categoria: string;
}

const FiltrosAvancados = ({ onFiltrosChange, filtrosAtivos }: FiltrosAvancadosProps) => {
  const [filtros, setFiltros] = useState<FiltrosState>(filtrosAtivos);
  const [isOpen, setIsOpen] = useState(false);

  const cnpjsDisponiveis = [
    { id: '12.345.678/0001-90', nome: 'WebMED RJ' },
    { id: '98.765.432/0001-10', nome: 'Distrib. SP' },
    { id: '11.222.333/0001-44', nome: 'WebMED JF' }
  ];

  const tiposEstoque = [
    { id: 'Nacional', nome: 'Nacional' },
    { id: 'Importação Direta', nome: 'Importação Direta' },
    { id: 'Consignado', nome: 'Consignado' }
  ];

  const categorias = [
    'Dispositivos Médicos',
    'Descartáveis', 
    'Equipamentos',
    'Diagnóstico',
    'Reagentes'
  ];

  const handleCnpjChange = (cnpj: string, checked: boolean) => {
    const novosCnpjs = checked 
      ? [...filtros.cnpjs, cnpj]
      : filtros.cnpjs.filter(c => c !== cnpj);
    
    const novosFiltros = { ...filtros, cnpjs: novosCnpjs };
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const handleTipoEstoqueChange = (tipo: string, checked: boolean) => {
    const novosTipos = checked 
      ? [...filtros.tipoEstoque, tipo]
      : filtros.tipoEstoque.filter(t => t !== tipo);
    
    const novosFiltros = { ...filtros, tipoEstoque: novosTipos };
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const handleValidadeChange = (validade: string) => {
    const novosFiltros = { ...filtros, validadeMinima: validade };
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
      cnpjs: [],
      tipoEstoque: [],
      validadeMinima: '',
      categoria: ''
    };
    setFiltros(filtrosLimpos);
    onFiltrosChange(filtrosLimpos);
  };

  const contadorFiltros = filtros.cnpjs.length + filtros.tipoEstoque.length + 
    (filtros.validadeMinima ? 1 : 0) + (filtros.categoria ? 1 : 0);

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
          {/* CNPJ/Filial */}
          <div>
            <Label className="text-sm font-medium">CNPJ/Filial</Label>
            <div className="space-y-2 mt-2">
              {cnpjsDisponiveis.map((cnpj) => (
                <div key={cnpj.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={cnpj.id}
                    checked={filtros.cnpjs.includes(cnpj.id)}
                    onCheckedChange={(checked) => handleCnpjChange(cnpj.id, !!checked)}
                  />
                  <Label htmlFor={cnpj.id} className="text-sm">
                    {cnpj.nome}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Estoque */}
          <div>
            <Label className="text-sm font-medium">Tipo de Estoque</Label>
            <div className="space-y-2 mt-2">
              {tiposEstoque.map((tipo) => (
                <div key={tipo.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tipo.id}
                    checked={filtros.tipoEstoque.includes(tipo.id)}
                    onCheckedChange={(checked) => handleTipoEstoqueChange(tipo.id, !!checked)}
                  />
                  <Label htmlFor={tipo.id} className="text-sm">
                    {tipo.nome}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Validade Mínima */}
          <div>
            <Label htmlFor="validade" className="text-sm font-medium">
              Validade Mínima
            </Label>
            <Input
              id="validade"
              placeholder="Ex: 6 meses"
              value={filtros.validadeMinima}
              onChange={(e) => handleValidadeChange(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Categoria */}
          <div>
            <Label className="text-sm font-medium">Categoria</Label>
            <Select value={filtros.categoria} onValueChange={handleCategoriaChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as categorias</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FiltrosAvancados;
