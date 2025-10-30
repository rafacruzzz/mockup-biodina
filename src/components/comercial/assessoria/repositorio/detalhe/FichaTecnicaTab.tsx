import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Produto } from "@/types/produto";
import { FileText, Package, Ruler } from "lucide-react";

interface FichaTecnicaTabProps {
  produto: Produto;
  highlightIncomplete?: boolean;
}

export function FichaTecnicaTab({ produto, highlightIncomplete }: FichaTecnicaTabProps) {
  return (
    <div className="space-y-6">
      <Card className={highlightIncomplete && !produto.especificacoesTecnicas ? "border-2 border-red-500 animate-pulse" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Especificações Técnicas
            {highlightIncomplete && !produto.especificacoesTecnicas && (
              <span className="text-red-600 text-sm font-normal">• Campo Obrigatório</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm font-sans">
            {produto.especificacoesTecnicas || "Informações não cadastradas"}
          </pre>
        </CardContent>
      </Card>

      <Card className={highlightIncomplete && (!produto.peso || !produto.dimensoes) ? "border-2 border-red-500 animate-pulse" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Dimensões e Peso
            {highlightIncomplete && (!produto.peso || !produto.dimensoes) && (
              <span className="text-red-600 text-sm font-normal">• Campos Obrigatórios</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className={highlightIncomplete && !produto.peso ? "p-2 border-2 border-red-300 rounded" : ""}>
              <p className="text-sm text-muted-foreground mb-1">
                Peso {highlightIncomplete && !produto.peso && <span className="text-red-600">*</span>}
              </p>
              <p className="font-medium">{produto.peso || "Não cadastrado"}</p>
            </div>
            <div className={highlightIncomplete && !produto.dimensoes ? "p-2 border-2 border-red-300 rounded" : ""}>
              <p className="text-sm text-muted-foreground mb-1">
                Dimensões {highlightIncomplete && !produto.dimensoes && <span className="text-red-600">*</span>}
              </p>
              <p className="font-medium">{produto.dimensoes || "Não cadastrado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
