import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Copy, Check } from "lucide-react";
import { variaveisFiscais, categorias } from "@/data/variaveisFiscais";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface VariaveisFiscaisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VariaveisFiscaisDialog = ({ open, onOpenChange }: VariaveisFiscaisDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);
  const [copiedVar, setCopiedVar] = useState<string | null>(null);

  const handleCopy = (variavel: string) => {
    navigator.clipboard.writeText(variavel);
    setCopiedVar(variavel);
    toast.success("Variável copiada!");
    
    setTimeout(() => {
      setCopiedVar(null);
    }, 2000);
  };

  const variaveisFiltradas = variaveisFiscais.filter(variavel => {
    const matchSearch = searchTerm === "" || 
      variavel.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variavel.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchCategoria = categoriaFiltro === null || variavel.categoria === categoriaFiltro;
    
    return matchSearch && matchCategoria;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Variáveis Disponíveis para Observações Fiscais</DialogTitle>
          <DialogDescription>
            Use estas variáveis nas observações das notas fiscais. Elas serão substituídas automaticamente pelos valores reais ao emitir a nota.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar variável ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtro por categoria */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={categoriaFiltro === null ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaFiltro(null)}
            >
              Todas
            </Button>
            {categorias.map(categoria => (
              <Button
                key={categoria}
                variant={categoriaFiltro === categoria ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaFiltro(categoria)}
              >
                {categoria}
              </Button>
            ))}
          </div>

          {/* Lista de variáveis */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {variaveisFiltradas.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma variável encontrada
              </div>
            ) : (
              variaveisFiltradas.map((variavel, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="px-2 py-1 bg-muted rounded text-sm font-mono font-semibold">
                          {variavel.nome}
                        </code>
                        <Badge variant="secondary" className="text-xs">
                          {variavel.categoria}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {variavel.descricao}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Exemplo:</span> {variavel.exemplo}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(variavel.nome)}
                      className="shrink-0"
                    >
                      {copiedVar === variavel.nome ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Instruções de uso */}
          <div className="border-t pt-4 space-y-2">
            <h4 className="font-medium text-sm">Como usar:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Digite a variável <strong>incluindo os colchetes</strong> no campo de observações</li>
              <li>• As variáveis serão substituídas automaticamente pelos valores reais ao gerar a nota fiscal</li>
              <li>• Exemplo: "Base de cálculo ICMS: [VALOR_BASE_ICMS]" → "Base de cálculo ICMS: R$ 1.000,00"</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VariaveisFiscaisDialog;
