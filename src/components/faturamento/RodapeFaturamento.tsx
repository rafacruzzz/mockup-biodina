import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, Settings, MessageSquare, RefreshCw,
  Package, Calculator, Building2, ShoppingCart 
} from "lucide-react";

const RodapeFaturamento = () => {
  const handleChamado = (departamento: string) => {
    // Aqui você pode implementar a lógica para abrir um chamado
    console.log(`Abrindo chamado para: ${departamento}`);
  };

  return (
    <div className="mt-8 pt-6 border-t bg-muted/30 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recursos e Manuais */}
        <div>
          <h3 className="text-sm font-semibold text-biodina-blue mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Recursos
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              📚 Manual de CFOP
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              📋 Tabela CST
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              <Settings className="h-3 w-3 mr-1" />
              Configurações Fiscais
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Atualizar Status SEFAZ
            </Button>
          </div>
        </div>

        {/* Chamados Rápidos */}
        <div>
          <h3 className="text-sm font-semibold text-biodina-blue mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Dúvida Faturamento - Chamado Rápido
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => handleChamado('TI')}
            >
              💻 TI
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => handleChamado('Estoque')}
            >
              <Package className="h-3 w-3 mr-1" />
              Estoque
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => handleChamado('Contabilidade Fiscal')}
            >
              <Calculator className="h-3 w-3 mr-1" />
              Cont. Fiscal
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => handleChamado('Comercial')}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Comercial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RodapeFaturamento;
