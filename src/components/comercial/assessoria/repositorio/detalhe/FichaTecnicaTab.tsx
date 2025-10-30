import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Produto } from "@/types/produto";
import { FileText, Package, Ruler } from "lucide-react";

interface FichaTecnicaTabProps {
  produto: Produto;
}

export function FichaTecnicaTab({ produto }: FichaTecnicaTabProps) {
  return (
    <div className="space-y-6">
      {produto.especificacoesTecnicas && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Especificações Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm font-sans">
              {produto.especificacoesTecnicas}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Dimensões e Peso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {produto.peso && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Peso</p>
                <p className="font-medium">{produto.peso}</p>
              </div>
            )}
            {produto.dimensoes && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dimensões</p>
                <p className="font-medium">{produto.dimensoes}</p>
              </div>
            )}
          </div>
          {!produto.peso && !produto.dimensoes && (
            <p className="text-sm text-muted-foreground">
              Informações não disponíveis
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
