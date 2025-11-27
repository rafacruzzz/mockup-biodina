import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ImovelRow {
  id: number;
  inscricaoIPTU: string;
  matriculaRGI: string;
  rgi: string;
  endereco: string;
  valorVenalIPTU: string;
  valorMercadoITBI: string;
  valorIPTU2024: string;
  pgtoUnicoParcelado: string;
  planta: string;
  rgiDoc: string;
  escritura: string;
  compraVenda: string;
  luz: string;
  gas: string;
  telefone: string;
  internet: string;
  google: string;
  empresaSede: string;
  enfiteutica: string;
}

export const ControleImoveisTab = () => {
  const [rows, setRows] = useState<ImovelRow[]>([
    { 
      id: 1, 
      inscricaoIPTU: "", 
      matriculaRGI: "", 
      rgi: "", 
      endereco: "", 
      valorVenalIPTU: "", 
      valorMercadoITBI: "", 
      valorIPTU2024: "",
      pgtoUnicoParcelado: "",
      planta: "",
      rgiDoc: "",
      escritura: "",
      compraVenda: "",
      luz: "",
      gas: "",
      telefone: "",
      internet: "",
      google: "",
      empresaSede: "",
      enfiteutica: ""
    }
  ]);

  const addRow = () => {
    const newRow: ImovelRow = {
      id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1,
      inscricaoIPTU: "", 
      matriculaRGI: "", 
      rgi: "", 
      endereco: "", 
      valorVenalIPTU: "", 
      valorMercadoITBI: "", 
      valorIPTU2024: "",
      pgtoUnicoParcelado: "",
      planta: "",
      rgiDoc: "",
      escritura: "",
      compraVenda: "",
      luz: "",
      gas: "",
      telefone: "",
      internet: "",
      google: "",
      empresaSede: "",
      enfiteutica: ""
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

  const updateRow = (id: number, field: keyof ImovelRow, value: string) => {
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
        <h3 className="text-xl font-semibold text-biodina-blue">Controle de Imóveis</h3>
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
              <TableHead className="min-w-[150px]">Inscrição IPTU</TableHead>
              <TableHead className="min-w-[150px]">Matrícula RGI</TableHead>
              <TableHead className="min-w-[120px]">RGI</TableHead>
              <TableHead className="min-w-[200px]">Endereço</TableHead>
              <TableHead className="min-w-[150px]">Valor Venal IPTU</TableHead>
              <TableHead className="min-w-[150px]">Valor Mercado ITBI</TableHead>
              <TableHead className="min-w-[150px]">Valor IPTU 2024</TableHead>
              <TableHead className="min-w-[150px]">Pgto Único ou Parcelado?</TableHead>
              <TableHead className="min-w-[120px]">Planta</TableHead>
              <TableHead className="min-w-[120px]">RGI</TableHead>
              <TableHead className="min-w-[120px]">Escritura</TableHead>
              <TableHead className="min-w-[150px]">Compra e Venda</TableHead>
              <TableHead className="min-w-[120px]">Luz</TableHead>
              <TableHead className="min-w-[120px]">Gás</TableHead>
              <TableHead className="min-w-[120px]">Telefone</TableHead>
              <TableHead className="min-w-[120px]">Internet</TableHead>
              <TableHead className="min-w-[120px]">Google</TableHead>
              <TableHead className="min-w-[150px]">Empresa - Sede?</TableHead>
              <TableHead className="min-w-[120px]">Enfitêutica</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell><Input value={row.inscricaoIPTU} onChange={(e) => updateRow(row.id, 'inscricaoIPTU', e.target.value)} /></TableCell>
                <TableCell><Input value={row.matriculaRGI} onChange={(e) => updateRow(row.id, 'matriculaRGI', e.target.value)} /></TableCell>
                <TableCell><Input value={row.rgi} onChange={(e) => updateRow(row.id, 'rgi', e.target.value)} /></TableCell>
                <TableCell><Input value={row.endereco} onChange={(e) => updateRow(row.id, 'endereco', e.target.value)} /></TableCell>
                <TableCell><Input value={row.valorVenalIPTU} onChange={(e) => updateRow(row.id, 'valorVenalIPTU', e.target.value)} /></TableCell>
                <TableCell><Input value={row.valorMercadoITBI} onChange={(e) => updateRow(row.id, 'valorMercadoITBI', e.target.value)} /></TableCell>
                <TableCell><Input value={row.valorIPTU2024} onChange={(e) => updateRow(row.id, 'valorIPTU2024', e.target.value)} /></TableCell>
                <TableCell><Input value={row.pgtoUnicoParcelado} onChange={(e) => updateRow(row.id, 'pgtoUnicoParcelado', e.target.value)} /></TableCell>
                <TableCell><Input value={row.planta} onChange={(e) => updateRow(row.id, 'planta', e.target.value)} /></TableCell>
                <TableCell><Input value={row.rgiDoc} onChange={(e) => updateRow(row.id, 'rgiDoc', e.target.value)} /></TableCell>
                <TableCell><Input value={row.escritura} onChange={(e) => updateRow(row.id, 'escritura', e.target.value)} /></TableCell>
                <TableCell><Input value={row.compraVenda} onChange={(e) => updateRow(row.id, 'compraVenda', e.target.value)} /></TableCell>
                <TableCell><Input value={row.luz} onChange={(e) => updateRow(row.id, 'luz', e.target.value)} /></TableCell>
                <TableCell><Input value={row.gas} onChange={(e) => updateRow(row.id, 'gas', e.target.value)} /></TableCell>
                <TableCell><Input value={row.telefone} onChange={(e) => updateRow(row.id, 'telefone', e.target.value)} /></TableCell>
                <TableCell><Input value={row.internet} onChange={(e) => updateRow(row.id, 'internet', e.target.value)} /></TableCell>
                <TableCell><Input value={row.google} onChange={(e) => updateRow(row.id, 'google', e.target.value)} /></TableCell>
                <TableCell><Input value={row.empresaSede} onChange={(e) => updateRow(row.id, 'empresaSede', e.target.value)} /></TableCell>
                <TableCell><Input value={row.enfiteutica} onChange={(e) => updateRow(row.id, 'enfiteutica', e.target.value)} /></TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeRow(row.id)}>
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
