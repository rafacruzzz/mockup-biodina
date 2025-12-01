import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Produto } from "@/types/produto";
import { FileText, Tag, Target, AlignLeft, Edit, Save } from "lucide-react";
import { toast } from "sonner";

interface VisaoGeralTabProps {
  produto: Produto;
}

export function VisaoGeralTab({ produto }: VisaoGeralTabProps) {
  const [isEditingAplicacoes, setIsEditingAplicacoes] = useState(false);
  const [aplicacoesData, setAplicacoesData] = useState(produto.aplicacoes);

  const handleSaveAplicacoes = () => {
    // Validação básica
    if (!aplicacoesData.trim()) {
      toast.error("O campo Aplicações/Indicações de uso não pode estar vazio");
      return;
    }
    
    if (aplicacoesData.length > 2000) {
      toast.error("O texto não pode exceder 2000 caracteres");
      return;
    }

    // Aqui seria a chamada para salvar no backend
    setIsEditingAplicacoes(false);
    toast.success("Aplicações/Indicações de uso atualizadas com sucesso");
  };

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

      {produto.descritivoBreve && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlignLeft className="h-5 w-5" />
              Descritivo Breve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{produto.descritivoBreve}</p>
          </CardContent>
        </Card>
      )}

      {produto.descritivoCompleto && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Descritivo Completo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{produto.descritivoCompleto}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Aplicações/Indicações de uso
            </div>
            {!isEditingAplicacoes ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingAplicacoes(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveAplicacoes}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditingAplicacoes ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{aplicacoesData}</p>
          ) : (
            <Textarea
              value={aplicacoesData}
              onChange={(e) => setAplicacoesData(e.target.value)}
              placeholder="Digite as aplicações e indicações de uso do produto..."
              className="min-h-[120px]"
              maxLength={2000}
            />
          )}
          {isEditingAplicacoes && (
            <p className="text-xs text-muted-foreground mt-2">
              {aplicacoesData.length}/2000 caracteres
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Tags do Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(produto.tagsProduto || produto.palavrasChave).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
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
