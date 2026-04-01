import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Produto } from "@/types/produto";
import { Ruler, Package, BoxIcon } from "lucide-react";

interface ApresentacaoTabProps {
  produto: Produto;
}

function DimensoesCard({ titulo, emoji, pesoLiquido, pesoBruto, altura, largura, profundidade }: {
  titulo: string;
  emoji: React.ReactNode;
  pesoLiquido?: number;
  pesoBruto?: number;
  altura?: number;
  largura?: number;
  profundidade?: number;
}) {
  const h = altura || 0;
  const w = largura || 0;
  const d = profundidade || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {emoji}
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Peso Líquido (kg)</p>
            <p className="font-medium">{pesoLiquido ? pesoLiquido.toFixed(2) : "0.00"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Peso Bruto (kg)</p>
            <p className="font-medium">{pesoBruto ? pesoBruto.toFixed(2) : "0.00"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Altura (cm)</p>
            <p className="font-medium">{altura ? altura.toFixed(2) : "0.00"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Largura (cm)</p>
            <p className="font-medium">{largura ? largura.toFixed(2) : "0.00"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Profundidade (cm)</p>
            <p className="font-medium">{profundidade ? profundidade.toFixed(2) : "0.00"}</p>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Cálculos Automatizados</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Volume calculado:</p>
              <p className="font-medium text-sm">
                {h && w && d ? ((h * w * d) / 1000000).toFixed(4) + " m³" : "0.0000 m³"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Peso cubado (fator 300):</p>
              <p className="font-medium text-sm">
                {h && w && d ? ((h * w * d) / 1000000 * 300).toFixed(2) + " kg" : "0.00 kg"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ApresentacaoTab({ produto }: ApresentacaoTabProps) {
  return (
    <div className="space-y-6">
      {/* Apresentação Comercial Expandida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Apresentação Comercial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {produto.apresentacaoComercial && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Descrição Geral</p>
              <p className="text-sm leading-relaxed">{produto.apresentacaoComercial}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Apresentação Primária</p>
              <p className="font-medium text-sm">{produto.apresentacaoPrimaria || "Não cadastrada"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Apresentação Secundária</p>
              <p className="font-medium text-sm">{produto.apresentacaoSecundaria || "Não cadastrada"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Apresentação de Embarque</p>
              <p className="font-medium text-sm">{produto.apresentacaoEmbarque || "Não cadastrada"}</p>
            </div>
          </div>

          {produto.referenciasComercializadas && produto.referenciasComercializadas.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Referências Comercializadas</p>
              <div className="flex flex-wrap gap-2">
                {produto.referenciasComercializadas.map((ref, i) => (
                  <Badge key={i} variant="secondary">{ref}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dimensões Com Embalagem */}
      <DimensoesCard
        titulo="Dimensões e Peso — Com Embalagem"
        emoji={<BoxIcon className="h-5 w-5" />}
        pesoLiquido={produto.pesoLiquidoComEmb}
        pesoBruto={produto.pesoBrutoComEmb}
        altura={produto.alturaComEmb}
        largura={produto.larguraComEmb}
        profundidade={produto.profundidadeComEmb}
      />

      {/* Dimensões Sem Embalagem */}
      <DimensoesCard
        titulo="Dimensões e Peso — Sem Embalagem"
        emoji={<Ruler className="h-5 w-5" />}
        pesoLiquido={produto.pesoLiquidoSemEmb}
        pesoBruto={produto.pesoBrutoSemEmb}
        altura={produto.alturaSemEmb}
        largura={produto.larguraSemEmb}
        profundidade={produto.profundidadeSemEmb}
      />
    </div>
  );
}
