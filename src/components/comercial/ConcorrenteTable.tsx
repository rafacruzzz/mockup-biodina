
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Concorrente {
  id: string;
  empresa: string;
  contato: string;
  telefone: string;
  email: string;
  observacoes: string;
}

const ConcorrenteTable = () => {
  const [concorrentes, setConcorrentes] = useState<Concorrente[]>([]);
  const [newConcorrente, setNewConcorrente] = useState<Omit<Concorrente, 'id'>>({
    empresa: '',
    contato: '',
    telefone: '',
    email: '',
    observacoes: ''
  });

  const addConcorrente = () => {
    if (newConcorrente.empresa.trim() === '') return;
    
    setConcorrentes([...concorrentes, {
      ...newConcorrente,
      id: Date.now().toString()
    }]);
    
    setNewConcorrente({
      empresa: '',
      contato: '',
      telefone: '',
      email: '',
      observacoes: ''
    });
  };

  const removeConcorrente = (id: string) => {
    setConcorrentes(concorrentes.filter(c => c.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empresas Concorrentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <Input
            placeholder="Empresa"
            value={newConcorrente.empresa}
            onChange={(e) => setNewConcorrente({...newConcorrente, empresa: e.target.value})}
          />
          <Input
            placeholder="Contato"
            value={newConcorrente.contato}
            onChange={(e) => setNewConcorrente({...newConcorrente, contato: e.target.value})}
          />
          <Input
            placeholder="Telefone"
            value={newConcorrente.telefone}
            onChange={(e) => setNewConcorrente({...newConcorrente, telefone: e.target.value})}
          />
          <Input
            placeholder="Email"
            value={newConcorrente.email}
            onChange={(e) => setNewConcorrente({...newConcorrente, email: e.target.value})}
          />
          <div className="flex gap-2">
            <Input
              placeholder="Observações"
              value={newConcorrente.observacoes}
              onChange={(e) => setNewConcorrente({...newConcorrente, observacoes: e.target.value})}
            />
            <Button onClick={addConcorrente} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {concorrentes.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {concorrentes.map((concorrente) => (
                <TableRow key={concorrente.id}>
                  <TableCell>{concorrente.empresa}</TableCell>
                  <TableCell>{concorrente.contato}</TableCell>
                  <TableCell>{concorrente.telefone}</TableCell>
                  <TableCell>{concorrente.email}</TableCell>
                  <TableCell>{concorrente.observacoes}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeConcorrente(concorrente.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ConcorrenteTable;
