import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LinkSMRow {
  id: number;
  nomeDocumento: string;
  portalAcesso: string;
  campoEmissao: string;
  codigoEmissao: string;
}

export const LinksSMTab = () => {
  const [rows, setRows] = useState<LinkSMRow[]>([
    { id: 1, nomeDocumento: "", portalAcesso: "", campoEmissao: "", codigoEmissao: "" }
  ]);

  const addRow = () => {
    const newRow: LinkSMRow = {
      id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1,
      nomeDocumento: "",
      portalAcesso: "",
      campoEmissao: "",
      codigoEmissao: ""
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

  const updateRow = (id: number, field: keyof LinkSMRow, value: string) => {
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
        <h3 className="text-xl font-semibold text-biodina-blue">Links SM</h3>
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
              <TableHead className="w-[250px]">Nome do Documento</TableHead>
              <TableHead className="w-[250px]">Portal de Acesso</TableHead>
              <TableHead className="w-[200px]">Campo de Emissão</TableHead>
              <TableHead className="w-[200px]">Código para Emissão</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                    value={row.nomeDocumento}
                    onChange={(e) => updateRow(row.id, 'nomeDocumento', e.target.value)}
                    placeholder="Nome do documento"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.portalAcesso}
                    onChange={(e) => updateRow(row.id, 'portalAcesso', e.target.value)}
                    placeholder="Portal de acesso"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.campoEmissao}
                    onChange={(e) => updateRow(row.id, 'campoEmissao', e.target.value)}
                    placeholder="Campo de emissão"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.codigoEmissao}
                    onChange={(e) => updateRow(row.id, 'codigoEmissao', e.target.value)}
                    placeholder="Código"
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
