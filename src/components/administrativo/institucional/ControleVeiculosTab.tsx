import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface VeiculoRow {
  id: number;
  veiculo: string;
  placa: string;
  ano: string;
  renavam: string;
  proprietario: string;
  fipe: string;
}

export const ControleVeiculosTab = () => {
  const [rows, setRows] = useState<VeiculoRow[]>([
    { id: 1, veiculo: "", placa: "", ano: "", renavam: "", proprietario: "", fipe: "" }
  ]);

  const addRow = () => {
    const newRow: VeiculoRow = {
      id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1,
      veiculo: "",
      placa: "",
      ano: "",
      renavam: "",
      proprietario: "",
      fipe: ""
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: number) => {
    if (rows.length === 1) {
      toast({ title: "Não é possível remover a última linha", variant: "destructive" });
      return;
    }
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: number, field: keyof VeiculoRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSave = () => {
    console.log("Salvando dados:", rows);
    toast({ title: "Dados salvos com sucesso!" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-biodina-blue">Controle de Veículos</h3>
        <div className="flex gap-2">
          <Button onClick={addRow} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Linha
          </Button>
          <Button onClick={handleSave} size="sm" variant="default">
            Salvar
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Veículo</TableHead>
              <TableHead className="w-[150px]">Placa</TableHead>
              <TableHead className="w-[120px]">Ano</TableHead>
              <TableHead className="w-[180px]">Renavam</TableHead>
              <TableHead className="w-[200px]">Proprietário</TableHead>
              <TableHead className="w-[150px]">FIPE</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                    value={row.veiculo}
                    onChange={(e) => updateRow(row.id, 'veiculo', e.target.value)}
                    placeholder="Nome do veículo"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.placa}
                    onChange={(e) => updateRow(row.id, 'placa', e.target.value)}
                    placeholder="Placa"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.ano}
                    onChange={(e) => updateRow(row.id, 'ano', e.target.value)}
                    placeholder="Ano"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.renavam}
                    onChange={(e) => updateRow(row.id, 'renavam', e.target.value)}
                    placeholder="Renavam"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.proprietario}
                    onChange={(e) => updateRow(row.id, 'proprietario', e.target.value)}
                    placeholder="Proprietário"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.fipe}
                    onChange={(e) => updateRow(row.id, 'fipe', e.target.value)}
                    placeholder="Código FIPE"
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeRow(row.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
