import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Produto } from "@/types/produto";
import { FileText, Tag, Target } from "lucide-react";

interface VisaoGeralTabProps {
  produto: Produto;
}

export function VisaoGeralTab({ produto }: VisaoGeralTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Descrição
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{produto.descricao}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Aplicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {produto.aplicacoes.map((aplicacao, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {aplicacao}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Palavras-chave
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {produto.palavrasChave.map((palavra, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {palavra}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Código do Produto</p>
              <p className="font-medium">{produto.codigo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={produto.status === "ativo" ? "default" : "secondary"}>
                {produto.status === "ativo" ? "Ativo" : "Descontinuado"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
