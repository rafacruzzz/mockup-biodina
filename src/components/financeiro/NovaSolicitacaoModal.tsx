import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SolicitacaoPagamento } from "@/types/solicitacaoPagamento";
import { MoneyInput } from "@/components/ui/money-input";

interface NovaSolicitacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (solicitacao: SolicitacaoPagamento) => void;
}

const DEPARTAMENTOS = [
  "Comercial", "Marketing", "TI", "RH", "Jurídico", "Operações",
  "Logística", "Compras", "Engenharia", "Administrativo"
];

export const NovaSolicitacaoModal = ({ isOpen, onClose, onSave }: NovaSolicitacaoModalProps) => {
  const [departamento, setDepartamento] = useState("");
  const [solicitadoPor, setSolicitadoPor] = useState("");
  const [autorizadoPor, setAutorizadoPor] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [emailsTrocados, setEmailsTrocados] = useState("");

  const handleSave = () => {
    const valorNum = parseFloat(valor.replace(/\D/g, '')) / 100;
    if (!departamento || !solicitadoPor || !autorizadoPor || !fornecedor || !descricao || !valorNum || !dataVencimento) return;

    const dataVenc = new Date(dataVencimento + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const novaSolicitacao: SolicitacaoPagamento = {
      id: `SOL-${Date.now()}`,
      departamentoSolicitante: departamento,
      solicitadoPor,
      autorizadoPor,
      fornecedor,
      descricao,
      valor: valorNum,
      dataVencimento: dataVenc,
      status: 'pendente_analise',
      emailsTrocados: emailsTrocados ? emailsTrocados.split('\n').filter(e => e.trim()) : [],
      anexos: [],
      urgente: dataVenc <= hoje,
      createdAt: new Date(),
    };

    onSave(novaSolicitacao);
    // Reset
    setDepartamento("");
    setSolicitadoPor("");
    setAutorizadoPor("");
    setFornecedor("");
    setDescricao("");
    setValor("");
    setDataVencimento("");
    setEmailsTrocados("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Solicitação de Pagamento</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Departamento Solicitante</Label>
            <Select value={departamento} onValueChange={setDepartamento}>
              <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                {DEPARTAMENTOS.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Solicitado Por</Label>
            <Input value={solicitadoPor} onChange={e => setSolicitadoPor(e.target.value)} placeholder="Nome do solicitante" />
          </div>

          <div className="space-y-2">
            <Label>Autorizado Por</Label>
            <Input value={autorizadoPor} onChange={e => setAutorizadoPor(e.target.value)} placeholder="Nome de quem autorizou" />
          </div>

          <div className="space-y-2">
            <Label>Fornecedor</Label>
            <Input value={fornecedor} onChange={e => setFornecedor(e.target.value)} placeholder="Nome do fornecedor" />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Descrição</Label>
            <Textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descreva o pagamento solicitado" />
          </div>

          <div className="space-y-2">
            <Label>Valor</Label>
            <MoneyInput value={valor} onChange={setValor} />
          </div>

          <div className="space-y-2">
            <Label>Data de Pagamento</Label>
            <Input type="date" value={dataVencimento} onChange={e => setDataVencimento(e.target.value)} />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>E-mails Trocados (um por linha)</Label>
            <Textarea 
              value={emailsTrocados} 
              onChange={e => setEmailsTrocados(e.target.value)} 
              placeholder="Cole aqui os e-mails trocados sobre esta solicitação..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Enviar Solicitação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
