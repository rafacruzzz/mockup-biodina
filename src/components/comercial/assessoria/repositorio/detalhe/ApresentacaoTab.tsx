import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Produto } from "@/types/produto";
import { Ruler, Package } from "lucide-react";

interface ApresentacaoTabProps {
  produto: Produto;
}

export function ApresentacaoTab({ produto }: ApresentacaoTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Apresentação Comercial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            {produto.apresentacaoComercial || "Informação não cadastrada"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Dimensões e Peso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campos de peso e dimensões */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Peso Líquido (kg)</p>
              <p className="font-medium">{produto.pesoLiquido ? produto.pesoLiquido.toFixed(2) : "0.00"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Peso Bruto (kg)</p>
              <p className="font-medium">{produto.pesoBruto ? produto.pesoBruto.toFixed(2) : "0.00"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Altura (cm)</p>
              <p className="font-medium">{produto.altura ? produto.altura.toFixed(2) : "0.00"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Largura (cm)</p>
              <p className="font-medium">{produto.largura ? produto.largura.toFixed(2) : "0.00"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Profundidade (cm)</p>
              <p className="font-medium">{produto.profundidade ? produto.profundidade.toFixed(2) : "0.00"}</p>
            </div>
          </div>

          {/* Informações de Dimensões */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cálculos Automatizados</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Essas informações são essenciais para cálculos de frete e armazenamento.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Volume calculado:</p>
                <p className="font-medium text-sm">
                  {produto.altura && produto.largura && produto.profundidade
                    ? ((produto.altura * produto.largura * produto.profundidade) / 1000000).toFixed(4) + " m³"
                    : "0.0000 m³"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Peso cubado (fator 300):</p>
                <p className="font-medium text-sm">
                  {produto.altura && produto.largura && produto.profundidade
                    ? ((produto.altura * produto.largura * produto.profundidade) / 1000000 * 300).toFixed(2) + " kg"
                    : "0.00 kg"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
