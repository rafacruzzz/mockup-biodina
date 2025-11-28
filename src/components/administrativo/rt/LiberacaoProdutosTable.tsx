import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Search } from "lucide-react";
import { LiberacaoProduto } from "@/types/rt";
import { toast } from "@/components/ui/use-toast";

interface LiberacaoProdutosTableProps {
  produtos: LiberacaoProduto[];
  onProdutosChange: (produtos: LiberacaoProduto[]) => void;
}

export const LiberacaoProdutosTable = ({
  produtos,
  onProdutosChange
}: LiberacaoProdutosTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const produtosFiltrados = produtos.filter(produto =>
    produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.linhaProduto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLiberacao = (produtoId: string) => {
    const produtosAtualizados = produtos.map(produto => {
      if (produto.produtoId === produtoId) {
        const novoStatus = !produto.liberadoRT;
        return {
          ...produto,
          liberadoRT: novoStatus,
          dataLiberacao: novoStatus ? new Date().toISOString().split('T')[0] : undefined,
          responsavelLiberacao: novoStatus ? "Dr. Carlos Silva" : undefined
        };
      }
      return produto;
    });

    onProdutosChange(produtosAtualizados);
    
    const produto = produtos.find(p => p.produtoId === produtoId);
    toast({
      title: produto?.liberadoRT ? "Liberação Removida" : "Produto Liberado",
      description: produto?.liberadoRT 
        ? `${produto.nome} foi removido da liberação RT`
        : `${produto?.nome} foi liberado para RT`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Liberação de Produtos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, nome, marca ou linha de produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Esta tabela é sincronizada automaticamente com o cadastro de produtos. 
            Alterações no módulo de produtos refletirão aqui automaticamente.
          </p>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Nome do Produto</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Fabricante</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Linha de Produto</TableHead>
                <TableHead>Apresentação Primária</TableHead>
                <TableHead>Apresentação Secundária</TableHead>
                <TableHead>Apresentação Terciária</TableHead>
                <TableHead>Referências Comercializadas</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Liberado RT</TableHead>
                <TableHead>Data Liberação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
                  </TableCell>
                </TableRow>
              ) : (
                produtosFiltrados.map((produto) => (
                  <TableRow key={produto.produtoId}>
                    <TableCell className="font-medium">{produto.codigo}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.referencia}</TableCell>
                    <TableCell>{produto.modelo}</TableCell>
                    <TableCell>{produto.fabricante}</TableCell>
                    <TableCell>{produto.marca}</TableCell>
                    <TableCell>{produto.linhaProduto}</TableCell>
                    <TableCell>{produto.apresentacaoPrimaria}</TableCell>
                    <TableCell>{produto.apresentacaoSecundaria}</TableCell>
                    <TableCell>{produto.apresentacaoTerciaria}</TableCell>
                    <TableCell>{produto.referenciasComercializadas}</TableCell>
                    <TableCell className="text-center">
                      {produto.liberadoRT ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Liberado
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="h-3 w-3" />
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={produto.liberadoRT}
                        onCheckedChange={() => toggleLiberacao(produto.produtoId)}
                      />
                    </TableCell>
                    <TableCell>
                      {produto.dataLiberacao || "-"}
                      {produto.dataLiberacao && (
                        <div className="text-xs text-muted-foreground">
                          {produto.responsavelLiberacao}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {produtosFiltrados.length} produto(s) • {produtos.filter(p => p.liberadoRT).length} liberado(s)
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
