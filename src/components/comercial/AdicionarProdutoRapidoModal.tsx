
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EstoqueVendivel, UnidadeVenda } from "@/types/comercial";
import { Package, Calendar, Building, AlertTriangle } from "lucide-react";

interface AdicionarProdutoRapidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto: {
    codigo: string;
    descricao: string;
    categoria: string;
    fabricante: string;
  };
  estoque: EstoqueVendivel;
  onAdicionarProduto: (codigo: string, quantidade: number, unidade: UnidadeVenda, desconto: number, observacoes: string) => void;
}

const AdicionarProdutoRapidoModal = ({ 
  isOpen, 
  onClose, 
  produto, 
  estoque, 
  onAdicionarProduto 
}: AdicionarProdutoRapidoModalProps) => {
  const [quantidade, setQuantidade] = useState(1);
  const [unidade, setUnidade] = useState(UnidadeVenda.UNIDADE);
  const [desconto, setDesconto] = useState(0);
  const [observacoes, setObservacoes] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calcularDiasParaVencimento = (dataValidade: string) => {
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diffTime = validade.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAdicionar = () => {
    onAdicionarProduto(produto.codigo, quantidade, unidade, desconto, observacoes);
    onClose();
  };

  const precoComDesconto = estoque.precoSugerido * (1 - desconto / 100);
  const valorTotal = precoComDesconto * quantidade;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Adicionar ao Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Produto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded">
                    {produto.codigo}
                  </span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {estoque.totalDisponivel} un disponível
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg">{produto.descricao}</h3>
                <p className="text-sm text-gray-600">
                  {produto.fabricante} • {produto.categoria}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(estoque.precoSugerido)}
                </div>
                <div className="text-xs text-gray-500">Preço sugerido</div>
              </div>
            </div>
          </div>

          {/* Estoque por CNPJ */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Estoque por Filial
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {estoque.estoquesPorCnpj.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-sm">{item.nomeEmpresa}</span>
                  <Badge variant="outline">{item.quantidade} un</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Lotes e Validades */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Lotes e Validades
            </h4>
            <div className="space-y-2">
              {estoque.lotes.map((lote, index) => {
                const diasVencimento = lote.dataValidade ? calcularDiasParaVencimento(lote.dataValidade) : null;
                const alertaVencimento = diasVencimento !== null && diasVencimento <= 60;
                
                return (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">Lote {lote.lote}</span>
                      <Badge variant="outline">{lote.quantidade} un</Badge>
                      {alertaVencimento && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {diasVencimento} dias
                        </Badge>
                      )}
                    </div>
                    {lote.dataValidade && (
                      <span className="text-sm text-gray-600">
                        Vence: {formatDate(lote.dataValidade)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Campos de Adição */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantidade">Quantidade *</Label>
              <Input
                id="quantidade"
                type="number"
                min="1"
                max={estoque.totalDisponivel}
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Select value={unidade} onValueChange={(value) => setUnidade(value as UnidadeVenda)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estoque.unidadesDisponiveis.map((un) => (
                    <SelectItem key={un.unidade} value={un.unidade}>
                      {un.unidade.toUpperCase()}
                      {un.fatorConversao > 1 && ` (${un.fatorConversao} un)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="desconto">Desconto (%)</Label>
              <Input
                id="desconto"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={desconto}
                onChange={(e) => setDesconto(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>Valor Total</Label>
              <div className="h-10 flex items-center px-3 bg-gray-50 rounded-md font-semibold text-green-600">
                {formatCurrency(valorTotal)}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações específicas para este item..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAdicionar}
              disabled={quantidade > estoque.totalDisponivel}
              className="bg-biodina-gold hover:bg-biodina-gold/90"
            >
              Adicionar ao Pedido
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarProdutoRapidoModal;
