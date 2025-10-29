import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

const CenariosFiscaisConfig = () => {
  const [cenariosFiscais] = useState([
    {
      id: 1,
      nome: "Nota Fiscal Eletrônica - NFe",
      codigo: "NFE",
      tipo: "Produto",
      aliquotaICMS: "18%",
      aliquotaPIS: "1.65%",
      aliquotaCOFINS: "7.6%",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Nota Fiscal de Serviço - NFSe",
      codigo: "NFSE",
      tipo: "Serviço",
      aliquotaISS: "5%",
      aliquotaPIS: "1.65%",
      aliquotaCOFINS: "7.6%",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Simples Nacional",
      codigo: "SN",
      tipo: "Simplificado",
      aliquotaTotal: "6%",
      aliquotaPIS: "-",
      aliquotaCOFINS: "-",
      status: "Ativo"
    }
  ]);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Cenários Fiscais
            </CardTitle>
            <Button>
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
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Alíquotas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cenariosFiscais.map((cenario) => (
                <TableRow key={cenario.id}>
                  <TableCell className="font-medium">{cenario.nome}</TableCell>
                  <TableCell>{cenario.codigo}</TableCell>
                  <TableCell>{cenario.tipo}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {cenario.aliquotaICMS && <div>ICMS: {cenario.aliquotaICMS}</div>}
                      {cenario.aliquotaISS && <div>ISS: {cenario.aliquotaISS}</div>}
                      {cenario.aliquotaTotal && <div>Total: {cenario.aliquotaTotal}</div>}
                      <div>PIS: {cenario.aliquotaPIS} | COFINS: {cenario.aliquotaCOFINS}</div>
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
    </div>
  );
};

export default CenariosFiscaisConfig;
