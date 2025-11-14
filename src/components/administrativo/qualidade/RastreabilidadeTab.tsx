import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import { rastreabilidadeMockada } from '@/data/qualidadeData';
import { RegistroRastreabilidade } from '@/types/qualidade';
import { format } from 'date-fns';

export const RastreabilidadeTab = () => {
  const [registros, setRegistros] = useState<RegistroRastreabilidade[]>(rastreabilidadeMockada);
  const [novoRegistro, setNovoRegistro] = useState(false);
  const [busca, setBusca] = useState('');
  const [formData, setFormData] = useState({
    lote: '',
    ordemServico: '',
    tipoOS: 'Entrada' as 'Entrada' | 'Saída',
    material: '',
    dataHora: '',
    responsavel: ''
  });

  const salvarRegistro = () => {
    if (formData.lote && formData.ordemServico && formData.material && formData.dataHora && formData.responsavel) {
      const novo: RegistroRastreabilidade = {
        id: Date.now().toString(),
        lote: formData.lote,
        ordemServico: formData.ordemServico,
        tipoOS: formData.tipoOS,
        material: formData.material,
        dataHora: new Date(formData.dataHora),
        responsavel: formData.responsavel
      };
      setRegistros([novo, ...registros]);
      setNovoRegistro(false);
      setFormData({
        lote: '',
        ordemServico: '',
        tipoOS: 'Entrada',
        material: '',
        dataHora: '',
        responsavel: ''
      });
    }
  };

  const registrosFiltrados = registros.filter(
    (r) =>
      r.lote.toLowerCase().includes(busca.toLowerCase()) ||
      r.ordemServico.toLowerCase().includes(busca.toLowerCase()) ||
      r.material.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por lote, OS ou material..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setNovoRegistro(!novoRegistro)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Registro
        </Button>
      </div>

      {novoRegistro && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Registro de Rastreabilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Lote</Label>
                <Input
                  placeholder="Ex: LOTE-20241115"
                  value={formData.lote}
                  onChange={(e) => setFormData({ ...formData, lote: e.target.value })}
                />
              </div>
              <div>
                <Label>Ordem de Serviço</Label>
                <Input
                  placeholder="Ex: OS-4521"
                  value={formData.ordemServico}
                  onChange={(e) => setFormData({ ...formData, ordemServico: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de OS</Label>
                <Select
                  value={formData.tipoOS}
                  onValueChange={(value: 'Entrada' | 'Saída') => setFormData({ ...formData, tipoOS: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entrada">Entrada</SelectItem>
                    <SelectItem value="Saída">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Material em Estoque</Label>
                <Input
                  placeholder="Ex: Matéria-Prima X"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Data e Hora</Label>
                <Input
                  type="datetime-local"
                  value={formData.dataHora}
                  onChange={(e) => setFormData({ ...formData, dataHora: e.target.value })}
                />
              </div>
              <div>
                <Label>Responsável</Label>
                <Input
                  placeholder="Nome do responsável"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={salvarRegistro}>Salvar Registro</Button>
              <Button variant="outline" onClick={() => setNovoRegistro(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Registros de Rastreabilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lote</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Responsável</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosFiltrados.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell className="font-medium">{registro.lote}</TableCell>
                  <TableCell>{registro.ordemServico}</TableCell>
                  <TableCell>
                    <Badge variant={registro.tipoOS === 'Entrada' ? 'default' : 'secondary'}>
                      {registro.tipoOS}
                    </Badge>
                  </TableCell>
                  <TableCell>{registro.material}</TableCell>
                  <TableCell>{format(registro.dataHora, 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{registro.responsavel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
