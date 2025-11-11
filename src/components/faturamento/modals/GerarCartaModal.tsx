import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CartaFaturamento, FaturamentoMensal } from "@/types/faturamento";
import { gerarCartaFaturamentoPDF } from "@/utils/export/gerarCartaFaturamento";

interface GerarCartaModalProps {
  onClose: () => void;
  onCartaGerada: (carta: CartaFaturamento) => void;
}

const GerarCartaModal = ({ onClose, onCartaGerada }: GerarCartaModalProps) => {
  const [competencia, setCompetencia] = useState('');
  const [emailSocio, setEmailSocio] = useState('');
  const [emailContador, setEmailContador] = useState('');
  const [gerando, setGerando] = useState(false);

  // Mock data - em produção, buscar do banco de dados
  const mockFaturamento12Meses: FaturamentoMensal[] = [
    { mes: 'Janeiro', ano: 2024, faturamento: 125000, quantidadeNotas: 15, tempoMedio: 3 },
    { mes: 'Fevereiro', ano: 2024, faturamento: 138000, quantidadeNotas: 18, tempoMedio: 2.8 },
    { mes: 'Março', ano: 2024, faturamento: 142500, quantidadeNotas: 19, tempoMedio: 3.1 },
    { mes: 'Abril', ano: 2024, faturamento: 135000, quantidadeNotas: 17, tempoMedio: 2.9 },
    { mes: 'Maio', ano: 2024, faturamento: 148000, quantidadeNotas: 20, tempoMedio: 3.2 },
    { mes: 'Junho', ano: 2024, faturamento: 152000, quantidadeNotas: 21, tempoMedio: 3.0 },
    { mes: 'Julho', ano: 2024, faturamento: 145000, quantidadeNotas: 19, tempoMedio: 2.7 },
    { mes: 'Agosto', ano: 2024, faturamento: 158000, quantidadeNotas: 22, tempoMedio: 3.3 },
    { mes: 'Setembro', ano: 2024, faturamento: 162000, quantidadeNotas: 23, tempoMedio: 3.1 },
    { mes: 'Outubro', ano: 2024, faturamento: 168000, quantidadeNotas: 24, tempoMedio: 3.4 },
    { mes: 'Novembro', ano: 2024, faturamento: 175000, quantidadeNotas: 25, tempoMedio: 3.2 },
    { mes: 'Dezembro', ano: 2024, faturamento: 182000, quantidadeNotas: 26, tempoMedio: 3.5 },
  ];

  const handleGerar = async () => {
    if (!competencia || !emailSocio || !emailContador) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setGerando(true);

    try {
      const totalPeriodo = mockFaturamento12Meses.reduce((acc, item) => acc + item.faturamento, 0);

      const novaCarta: CartaFaturamento = {
        id: crypto.randomUUID(),
        competencia,
        dataEmissao: new Date().toISOString(),
        dataGeracao: new Date().toISOString(),
        status: 'rascunho',
        dadosEmpresa: {
          razaoSocial: 'EMPRESA EXEMPLO LTDA',
          cnpj: '12.345.678/0001-90',
          endereco: 'Rua Exemplo, 123 - Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567',
        },
        titular: {
          nome: 'João da Silva',
          cpf: '123.456.789-00',
          cargo: 'Diretor',
        },
        contador: {
          nome: 'Maria Contadora',
          cargo: 'Contadora',
          crc: 'CRC/SP 123456',
        },
        faturamentoPeriodo: mockFaturamento12Meses,
        totalPeriodo,
        signatarios: [
          {
            id: crypto.randomUUID(),
            nome: 'João da Silva',
            email: emailSocio,
            cargo: 'socio',
            ordem: 1,
            status: 'pendente',
          },
          {
            id: crypto.randomUUID(),
            nome: 'Maria Contadora',
            email: emailContador,
            cargo: 'contador',
            ordem: 2,
            status: 'pendente',
          },
        ],
        historicoEnvios: [],
      };

      // Gerar PDF
      const pdfBlob = gerarCartaFaturamentoPDF(novaCarta);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      novaCarta.arquivoPdfOriginal = pdfUrl;

      toast.success('Carta de faturamento gerada com sucesso!');
      onCartaGerada(novaCarta);
    } catch (error) {
      console.error('Erro ao gerar carta:', error);
      toast.error('Erro ao gerar carta de faturamento');
    } finally {
      setGerando(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gerar Nova Carta de Faturamento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="competencia">Competência *</Label>
            <Select value={competencia} onValueChange={setCompetencia}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o mês/ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Janeiro/2025">Janeiro/2025</SelectItem>
                <SelectItem value="Dezembro/2024">Dezembro/2024</SelectItem>
                <SelectItem value="Novembro/2024">Novembro/2024</SelectItem>
                <SelectItem value="Outubro/2024">Outubro/2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emailSocio">E-mail do Sócio *</Label>
              <Input
                id="emailSocio"
                type="email"
                placeholder="socio@empresa.com"
                value={emailSocio}
                onChange={(e) => setEmailSocio(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailContador">E-mail do Contador *</Label>
              <Input
                id="emailContador"
                type="email"
                placeholder="contador@empresa.com"
                value={emailContador}
                onChange={(e) => setEmailContador(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>ℹ️ Informação:</strong> Após gerar a carta, os e-mails serão enviados automaticamente 
              para os signatários solicitando a assinatura digital.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={gerando}>
            Cancelar
          </Button>
          <Button onClick={handleGerar} disabled={gerando}>
            {gerando ? '⏳ Gerando...' : '📄 Gerar e Enviar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GerarCartaModal;
