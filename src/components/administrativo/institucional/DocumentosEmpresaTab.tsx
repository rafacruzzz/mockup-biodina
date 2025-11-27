import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DocumentoRow {
  id: number;
  documentosControlar: string;
  validade: string;
  emissao: string;
  vencimento: string;
  responsavel: string;
  observacao: string;
  site: string;
  login: string;
  senha: string;
  historicoDocumentos: string;
  documentoAtualizado: string;
  anexarDocumento: string;
}

export const DocumentosEmpresaTab = () => {
  const [rows, setRows] = useState<DocumentoRow[]>([
    { 
      id: 1, 
      documentosControlar: "", 
      validade: "", 
      emissao: "", 
      vencimento: "", 
      responsavel: "", 
      observacao: "",
      site: "",
      login: "",
      senha: "",
      historicoDocumentos: "",
      documentoAtualizado: "",
      anexarDocumento: ""
    }
  ]);

  const addRow = () => {
    const newRow: DocumentoRow = {
      id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1,
      documentosControlar: "", 
      validade: "", 
      emissao: "", 
      vencimento: "", 
      responsavel: "", 
      observacao: "",
      site: "",
      login: "",
      senha: "",
      historicoDocumentos: "",
      documentoAtualizado: "",
      anexarDocumento: ""
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

  const updateRow = (id: number, field: keyof DocumentoRow, value: string) => {
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
        <h3 className="text-xl font-semibold text-biodina-blue">Documentos da Empresa</h3>
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
              <TableHead className="min-w-[200px]">Documentos para Controlar</TableHead>
              <TableHead className="min-w-[120px]">Validade</TableHead>
              <TableHead className="min-w-[120px]">Emissão</TableHead>
              <TableHead className="min-w-[120px]">Vencimento</TableHead>
              <TableHead className="min-w-[150px]">Responsável</TableHead>
              <TableHead className="min-w-[200px]">Observação</TableHead>
              <TableHead className="min-w-[150px]">Site</TableHead>
              <TableHead className="min-w-[150px]">Login</TableHead>
              <TableHead className="min-w-[150px]">Senha</TableHead>
              <TableHead className="min-w-[200px]">Histórico de Documentos</TableHead>
              <TableHead className="min-w-[180px]">Documento Atualizado</TableHead>
              <TableHead className="min-w-[180px]">Anexar Documento Atual</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell><Input value={row.documentosControlar} onChange={(e) => updateRow(row.id, 'documentosControlar', e.target.value)} placeholder="Documento" /></TableCell>
                <TableCell><Input type="date" value={row.validade} onChange={(e) => updateRow(row.id, 'validade', e.target.value)} /></TableCell>
                <TableCell><Input type="date" value={row.emissao} onChange={(e) => updateRow(row.id, 'emissao', e.target.value)} /></TableCell>
                <TableCell><Input type="date" value={row.vencimento} onChange={(e) => updateRow(row.id, 'vencimento', e.target.value)} /></TableCell>
                <TableCell><Input value={row.responsavel} onChange={(e) => updateRow(row.id, 'responsavel', e.target.value)} placeholder="Responsável" /></TableCell>
                <TableCell><Input value={row.observacao} onChange={(e) => updateRow(row.id, 'observacao', e.target.value)} placeholder="Observação" /></TableCell>
                <TableCell><Input value={row.site} onChange={(e) => updateRow(row.id, 'site', e.target.value)} placeholder="Site" /></TableCell>
                <TableCell><Input value={row.login} onChange={(e) => updateRow(row.id, 'login', e.target.value)} placeholder="Login" /></TableCell>
                <TableCell><Input type="password" value={row.senha} onChange={(e) => updateRow(row.id, 'senha', e.target.value)} placeholder="Senha" /></TableCell>
                <TableCell><Input value={row.historicoDocumentos} onChange={(e) => updateRow(row.id, 'historicoDocumentos', e.target.value)} placeholder="Histórico" /></TableCell>
                <TableCell><Input value={row.documentoAtualizado} onChange={(e) => updateRow(row.id, 'documentoAtualizado', e.target.value)} placeholder="Doc. Atualizado" /></TableCell>
                <TableCell><Input type="file" onChange={(e) => updateRow(row.id, 'anexarDocumento', e.target.value)} /></TableCell>
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
