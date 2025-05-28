
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, FileText } from "lucide-react";

interface LicitacaoValidationModalProps {
  onClose: () => void;
  chave: string;
}

const LicitacaoValidationModal = ({ onClose, chave }: LicitacaoValidationModalProps) => {
  const licitacoesMock = [
    {
      id: 1,
      numero: "123-2023-001",
      orgao: "Prefeitura Municipal",
      objeto: "Aquisição de equipamentos médicos",
      valor: 250000,
      status: "ganhou",
      dataAbertura: "15/03/2023"
    },
    {
      id: 2,
      numero: "123-2023-002", 
      orgao: "Hospital Universitário",
      objeto: "Locação de gasômetros",
      valor: 180000,
      status: "perdeu",
      dataAbertura: "22/05/2023"
    },
    {
      id: 3,
      numero: "123-2024-001",
      orgao: "Secretaria de Saúde",
      objeto: "Manutenção de equipamentos",
      valor: 95000,
      status: "ganhou",
      dataAbertura: "10/01/2024"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'ganhou' ? 'bg-green-500' : 'bg-red-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-biodina-blue" />
            <CardTitle>Licitações Encontradas - Chave: {chave}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Foram encontradas {licitacoesMock.length} licitações com a chave informada:
            </p>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Órgão</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Abertura</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licitacoesMock.map((licitacao) => (
                    <TableRow key={licitacao.id}>
                      <TableCell className="font-medium">{licitacao.numero}</TableCell>
                      <TableCell>{licitacao.orgao}</TableCell>
                      <TableCell>{licitacao.objeto}</TableCell>
                      <TableCell>{formatCurrency(licitacao.valor)}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(licitacao.status)} text-white`}>
                          {licitacao.status === 'ganhou' ? 'Ganhou' : 'Perdeu'}
                        </Badge>
                      </TableCell>
                      <TableCell>{licitacao.dataAbertura}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={onClose} className="bg-biodina-gold hover:bg-biodina-gold/90">
                Fechar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicitacaoValidationModal;
