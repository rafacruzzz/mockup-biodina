import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Paperclip } from 'lucide-react';
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
    pontosCriticos: [] as PontoCritico[],
    oportunidadesMelhorias: '',
    arquivo: null as File | null,
  });
  const [novoPontoDescricao, setNovoPontoDescricao] = useState('');

  const adicionarPontoCritico = () => {
    if (novoPontoDescricao.trim()) {
      setFormData({
        ...formData,
        pontosCriticos: [
          ...formData.pontosCriticos,
          {
            id: Date.now().toString(),
            descricao: novoPontoDescricao,
          }
        ]
      });
      setNovoPontoDescricao('');
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
        pontosCriticos: formData.pontosCriticos,
        oportunidadesMelhorias: formData.oportunidadesMelhorias || undefined,
        arquivo: formData.arquivo?.name || undefined,
      };
      setAuditorias([novaAud, ...auditorias]);
      setNovaAuditoria(false);
      setFormData({
        data: '',
        auditor: '',
        resultado: 'Aprovado',
        pontosCriticos: [],
        oportunidadesMelhorias: '',
        arquivo: null,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Auditorias da Qualidade — Externa</h3>
        <Button onClick={() => setNovaAuditoria(!novaAuditoria)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Auditoria Externa
        </Button>
      </div>

      {novaAuditoria && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nova Auditoria Externa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* a) Data e Auditor */}
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

            {/* b) Pontos Críticos — só texto */}
            <div className="space-y-2">
              <Label>Pontos Críticos</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Descrição do ponto crítico"
                  value={novoPontoDescricao}
                  onChange={(e) => setNovoPontoDescricao(e.target.value)}
                />
                <Button onClick={adicionarPontoCritico}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.pontosCriticos.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.pontosCriticos.map((ponto) => (
                      <TableRow key={ponto.id}>
                        <TableCell>{ponto.descricao}</TableCell>
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

            {/* c) Oportunidades de Melhorias */}
            <div>
              <Label>Oportunidades de Melhorias</Label>
              <Textarea
                placeholder="Descreva as oportunidades de melhorias identificadas..."
                value={formData.oportunidadesMelhorias}
                onChange={(e) => setFormData({ ...formData, oportunidadesMelhorias: e.target.value })}
                rows={4}
              />
            </div>

            {/* d) Anexar Arquivo */}
            <div>
              <Label>Anexar Arquivo</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, arquivo: e.target.files?.[0] || null })}
                />
                {formData.arquivo && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Paperclip className="h-4 w-4" />
                    <span>{formData.arquivo.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* e) Resultado Geral (movido para o final) */}
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
          <CardTitle>Histórico de Auditorias Externas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Pontos Críticos</TableHead>
                <TableHead>Oportunidades de Melhorias</TableHead>
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
                        <div key={ponto.id} className="text-sm">
                          {ponto.descricao}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {auditoria.oportunidadesMelhorias
                        ? auditoria.oportunidadesMelhorias.length > 60
                          ? auditoria.oportunidadesMelhorias.substring(0, 60) + '...'
                          : auditoria.oportunidadesMelhorias
                        : '—'}
                    </span>
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
