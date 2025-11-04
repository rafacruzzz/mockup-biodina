import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { TipoOperacaoFiscal, StatusRegimeEspecial } from "@/types/faturamento";

interface EmissaoNFeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmissaoNFeModal = ({ isOpen, onClose }: EmissaoNFeModalProps) => {
  const [tipoOperacao, setTipoOperacao] = useState<TipoOperacaoFiscal>("Venda");
  const [osVinculada, setOsVinculada] = useState("");
  const [cliente, setCliente] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [statusRegimeEspecial, setStatusRegimeEspecial] = useState<StatusRegimeEspecial | null>(null);
  const [cfopSugerido, setCfopSugerido] = useState("");
  const [naturezaOperacao, setNaturezaOperacao] = useState("");
  const [valor, setValor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const tiposOperacao: TipoOperacaoFiscal[] = [
    'Venda', 'Remessa', 'AutoConsumo', 'Comodato', 'Locacao', 'Perda'
  ];

  const handleBuscarOS = () => {
    // Simular busca de OS
    if (osVinculada) {
      setCliente("Hospital São Lucas");
      setEquipamento("Autoclave Vertical AV-75L");
      setStatusRegimeEspecial("Com Regime");
      setCfopSugerido("5949");
      setNaturezaOperacao("Remessa para Manutenção");
      setValor("0.00");
      toast.success("OS vinculada com sucesso!");
    }
  };

  const handleTipoOperacaoChange = (tipo: TipoOperacaoFiscal) => {
    setTipoOperacao(tipo);
    
    // Auto-sugerir CFOP e Natureza baseado no tipo
    switch (tipo) {
      case 'Remessa':
        setCfopSugerido("5949");
        setNaturezaOperacao("Remessa para Manutenção");
        break;
      case 'Venda':
        setCfopSugerido("5102");
        setNaturezaOperacao("Venda de Mercadoria");
        break;
      case 'AutoConsumo':
        setCfopSugerido("5927");
        setNaturezaOperacao("Consumo Interno");
        break;
      case 'Comodato':
        setCfopSugerido("5908");
        setNaturezaOperacao("Remessa em Comodato");
        break;
      case 'Locacao':
        setCfopSugerido("5949");
        setNaturezaOperacao("Remessa para Locação");
        break;
      case 'Perda':
        setCfopSugerido("5927");
        setNaturezaOperacao("Baixa de Estoque - Perda/Deterioração");
        break;
    }
  };

  const handleEmitir = () => {
    if (!cliente || !cfopSugerido || !naturezaOperacao) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    console.log({
      tipoOperacao,
      osVinculada,
      cliente,
      equipamento,
      statusRegimeEspecial,
      cfopSugerido,
      naturezaOperacao,
      valor,
      observacoes
    });

    toast.success("NF-e emitida com sucesso!");
    onClose();
  };

  const statusColors: Record<StatusRegimeEspecial, string> = {
    'Com Regime': 'bg-green-500',
    'Sem Regime': 'bg-red-500',
    'Nacional': 'bg-blue-500'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Emissão de NF-e
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tipo de Operação */}
          <div className="space-y-2">
            <Label htmlFor="tipoOperacao">Tipo de Operação *</Label>
            <Select value={tipoOperacao} onValueChange={(value: TipoOperacaoFiscal) => handleTipoOperacaoChange(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tiposOperacao.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vínculo com OS (para Remessa, Auto Consumo) */}
          {(tipoOperacao === 'Remessa' || tipoOperacao === 'AutoConsumo') && (
            <div className="space-y-2">
              <Label htmlFor="osVinculada">Ordem de Serviço (OS)</Label>
              <div className="flex gap-2">
                <Input
                  id="osVinculada"
                  placeholder="Digite o número da OS..."
                  value={osVinculada}
                  onChange={(e) => setOsVinculada(e.target.value)}
                />
                <Button onClick={handleBuscarOS} variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {tipoOperacao === 'AutoConsumo' && (
                <p className="text-xs text-gray-500">
                  Os itens marcados como "Utilizado" na OS serão carregados automaticamente
                </p>
              )}
            </div>
          )}

          {/* Informações do Cliente e Equipamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Input
                id="cliente"
                placeholder="Nome do cliente..."
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                disabled={!!osVinculada}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipamento">Equipamento</Label>
              <Input
                id="equipamento"
                placeholder="Nome do equipamento..."
                value={equipamento}
                onChange={(e) => setEquipamento(e.target.value)}
                disabled={!!osVinculada}
              />
            </div>
          </div>

          {/* Status Regime Especial (para Comodato/Locação) */}
          {(tipoOperacao === 'Comodato' || tipoOperacao === 'Locacao') && statusRegimeEspecial && (
            <div className="p-4 border rounded-lg space-y-2">
              <Label>Status do Regime Especial</Label>
              <div className="flex items-center gap-2">
                <Badge className={`${statusColors[statusRegimeEspecial]} text-white`}>
                  {statusRegimeEspecial === 'Com Regime' ? '🟢' : statusRegimeEspecial === 'Sem Regime' ? '🔴' : '🔵'} 
                  {' '}{statusRegimeEspecial}
                </Badge>
              </div>
              
              {statusRegimeEspecial === 'Sem Regime' && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-800">
                        Equipamento SEM Regime Especial
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        É necessário:
                      </p>
                      <ol className="text-sm text-red-700 mt-1 ml-4 list-decimal">
                        <li>Emitir NF de Entrada (estorno de ICMS)</li>
                        <li>Emitir NF de Saída (pagamento de ICMS)</li>
                      </ol>
                      <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
                        Gerar NF de Entrada/Saída Automática
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CFOP e Natureza da Operação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cfop">CFOP Sugerido *</Label>
              <Input
                id="cfop"
                placeholder="Ex: 5102"
                value={cfopSugerido}
                onChange={(e) => setCfopSugerido(e.target.value)}
              />
              <p className="text-xs text-gray-500">Sugerido automaticamente pelo sistema</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="natureza">Natureza da Operação *</Label>
              <Input
                id="natureza"
                placeholder="Ex: Venda de Mercadoria"
                value={naturezaOperacao}
                onChange={(e) => setNaturezaOperacao(e.target.value)}
              />
            </div>
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="valor">Valor Total</Label>
            <Input
              id="valor"
              type="number"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações adicionais..."
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
            <Button onClick={handleEmitir} className="bg-primary">
              <Send className="h-4 w-4 mr-2" />
              Emitir NF-e
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmissaoNFeModal;
