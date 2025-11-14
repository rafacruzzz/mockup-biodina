import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { auditoresDisponiveis, auditoriasMockadas } from '@/data/qualidadeData';
import { AuditoriaQualidade, PontoCritico } from '@/types/qualidade';
import { format } from 'date-fns';

export const AuditoriaQualidadeForm = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaQualidade[]>(auditoriasMockadas);
  const [novaAuditoria, setNovaAuditoria] = useState(false);
  const [formData, setFormData] = useState({
    data: '',
    auditor: '',
    resultado: 'Aprovado' as 'Aprovado' | 'Reprovado',
    pontosCriticos: [] as PontoCritico[]
  });
  const [novoPonto, setNovoPonto] = useState({ descricao: '', status: 'Aprovado' as 'Aprovado' | 'Reaprovado' });

  const adicionarPontoCritico = () => {
    if (novoPonto.descricao.trim()) {
      setFormData({
        ...formData,
        pontosCriticos: [
          ...formData.pontosCriticos,
          {
            id: Date.now().toString(),
            descricao: novoPonto.descricao,
            status: novoPonto.status
          }
        ]
      });
      setNovoPonto({ descricao: '', status: 'Aprovado' });
    }
  };

  const removerPontoCritico = (id: string) => {
    setFormData({
      ...formData,
      pontosCriticos: formData.pontosCriticos.filter(p => p.id !== id)
    });
  };

  const salvarAuditoria = () => {
    if (formData.data && formData.auditor) {
      const novaAud: AuditoriaQualidade = {
        id: Date.now().toString(),
        data: new Date(formData.data),
        auditorResponsavel: formData.auditor,
        resultadoGeral: formData.resultado,
        pontosCriticos: formData.pontosCriticos
      };
      setAuditorias([novaAud, ...auditorias]);
      setNovaAuditoria(false);
      setFormData({
        data: '',
        auditor: '',
        resultado: 'Aprovado',
        pontosCriticos: []
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Auditorias da Qualidade</h3>
        <Button onClick={() => setNovaAuditoria(!novaAuditoria)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Auditoria
        </Button>
      </div>

      {novaAuditoria && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nova Auditoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Data da Auditoria</Label>
                <Input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
              </div>
              <div>
                <Label>Auditor Responsável</Label>
                <Select value={formData.auditor} onValueChange={(value) => setFormData({ ...formData, auditor: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o auditor" />
                  </SelectTrigger>
                  <SelectContent>
                    {auditoresDisponiveis.map((auditor) => (
                      <SelectItem key={auditor} value={auditor}>
                        {auditor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Resultado Geral</Label>
              <Select value={formData.resultado} onValueChange={(value: 'Aprovado' | 'Reprovado') => setFormData({ ...formData, resultado: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Reprovado">Reprovado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pontos Críticos</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Descrição do ponto crítico"
                  value={novoPonto.descricao}
                  onChange={(e) => setNovoPonto({ ...novoPonto, descricao: e.target.value })}
                />
                <Select
                  value={novoPonto.status}
                  onValueChange={(value: 'Aprovado' | 'Reaprovado') => setNovoPonto({ ...novoPonto, status: value })}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Reaprovado">Reaprovado</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={adicionarPontoCritico}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.pontosCriticos.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.pontosCriticos.map((ponto) => (
                      <TableRow key={ponto.id}>
                        <TableCell>{ponto.descricao}</TableCell>
                        <TableCell>
                          <Badge variant={ponto.status === 'Aprovado' ? 'default' : 'secondary'}>
                            {ponto.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removerPontoCritico(ponto.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={salvarAuditoria}>Salvar Auditoria</Button>
              <Button variant="outline" onClick={() => setNovaAuditoria(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Auditorias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Pontos Críticos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditorias.map((auditoria) => (
                <TableRow key={auditoria.id}>
                  <TableCell>{format(auditoria.data, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{auditoria.auditorResponsavel}</TableCell>
                  <TableCell>
                    <Badge variant={auditoria.resultadoGeral === 'Aprovado' ? 'default' : 'destructive'}>
                      {auditoria.resultadoGeral}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {auditoria.pontosCriticos.map((ponto) => (
                        <div key={ponto.id} className="text-sm flex items-center gap-2">
                          <Badge variant={ponto.status === 'Aprovado' ? 'outline' : 'secondary'} className="text-xs">
                            {ponto.status}
                          </Badge>
                          <span>{ponto.descricao}</span>
                        </div>
                      ))}
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
