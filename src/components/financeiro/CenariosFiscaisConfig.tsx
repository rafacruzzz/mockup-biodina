import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import NovoCenarioModal from "./modals/NovoCenarioModal";
import { useToast } from "@/hooks/use-toast";
import type { CenarioFiscal } from "@/types/cenariosFiscais";

const CenariosFiscaisConfig = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [cenariosFiscais, setCenariosFiscais] = useState<CenarioFiscal[]>([
    {
      id: 1,
      nome: "Nota Fiscal Eletrônica - NFe",
      tipo: "Produto",
      regime: "1",
      aliquotaICMS: 18,
      aliquotaPIS: 1.65,
      aliquotaCOFINS: 7.6,
      aliquotaIPI: 0,
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Nota Fiscal de Serviço - NFSe",
      tipo: "Serviço",
      regime: "1",
      aliquotaICMS: 0,
      aliquotaPIS: 1.65,
      aliquotaCOFINS: 7.6,
      aliquotaIPI: 0,
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Simples Nacional",
      tipo: "Produto",
      regime: "0",
      aliquotaICMS: 0,
      aliquotaPIS: 0,
      aliquotaCOFINS: 0,
      aliquotaIPI: 0,
      status: "Ativo"
    }
  ]);

  const handleSalvarCenario = (novoCenario: any) => {
    const novoId = Math.max(...cenariosFiscais.map(c => c.id)) + 1;
    
    setCenariosFiscais([
      ...cenariosFiscais,
      {
        id: novoId,
        ...novoCenario,
        status: "Ativo" as const
      }
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-500 text-white';
      case 'Inativo':
        return 'bg-gray-500 text-white';
      default: 
        return 'bg-gray-500 text-white';
    }
  };

  const getRegimeLabel = (regime: string) => {
    switch (regime) {
      case '0':
        return 'Simples';
      case '1':
        return 'Normal';
      case '2':
        return 'MEI';
      default:
        return '-';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Cenários Fiscais
            </CardTitle>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cenário
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Regime</TableHead>
                <TableHead>Alíquotas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cenariosFiscais.map((cenario) => (
                <TableRow key={cenario.id}>
                  <TableCell className="font-medium">{cenario.nome}</TableCell>
                  <TableCell>{cenario.tipo}</TableCell>
                  <TableCell>{getRegimeLabel(cenario.regime)}</TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      {cenario.aliquotaICMS > 0 && <div>ICMS: {cenario.aliquotaICMS}%</div>}
                      {cenario.aliquotaPIS > 0 && <div>PIS: {cenario.aliquotaPIS}%</div>}
                      {cenario.aliquotaCOFINS > 0 && <div>COFINS: {cenario.aliquotaCOFINS}%</div>}
                      {cenario.aliquotaIPI > 0 && <div>IPI: {cenario.aliquotaIPI}%</div>}
                      {cenario.aliquotaICMS === 0 && cenario.aliquotaPIS === 0 && cenario.aliquotaCOFINS === 0 && cenario.aliquotaIPI === 0 && (
                        <div className="text-muted-foreground">-</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(cenario.status)}>
                      {cenario.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NovoCenarioModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSalvarCenario}
      />
    </div>
  );
};

export default CenariosFiscaisConfig;
