import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SecaoRoteiro as SecaoRoteiroType } from './dadosRoteiro';

interface ItemEstado {
  om: boolean;
  nc: boolean;
  c: boolean;
  evidencia: string;
  planoAcao: string;
}

interface SecaoEstado {
  itens: Record<number, ItemEstado>;
  auditor: string;
  auditado: string;
}

interface SecaoRoteiroProps {
  secao: SecaoRoteiroType;
  estado: SecaoEstado;
  onChangeItem: (numero: number, campo: keyof ItemEstado, valor: any) => void;
  onChangeAuditor: (valor: string) => void;
  onChangeAuditado: (valor: string) => void;
}

const TabelaItens = ({
  itens,
  estado,
  onChangeItem,
}: {
  itens: SecaoRoteiroType['itens'];
  estado: SecaoEstado;
  onChangeItem: SecaoRoteiroProps['onChangeItem'];
}) => {
  if (!itens || itens.length === 0) return null;

  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">Nº</TableHead>
          <TableHead className="w-24">Quesito</TableHead>
          <TableHead className="w-[280px]">Descrição</TableHead>
          <TableHead className="w-10 text-center">OM</TableHead>
          <TableHead className="w-10 text-center">NC</TableHead>
          <TableHead className="w-10 text-center">C</TableHead>
          <TableHead className="min-w-[180px]">Evidência Objetiva</TableHead>
          <TableHead className="min-w-[180px]">Plano de Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itens.map((item) => {
          const itemEstado = estado.itens[item.numero] || { om: false, nc: false, c: false, evidencia: '', planoAcao: '' };
          return (
            <TableRow key={item.numero}>
              <TableCell className="text-center font-medium">{item.numero}</TableCell>
              <TableCell className="text-xs">{item.quesito}</TableCell>
              <TableCell className="text-xs whitespace-normal break-words max-w-[280px]">{item.descricao}</TableCell>
              <TableCell className="text-center">
                <Checkbox
                  checked={itemEstado.om}
                  onCheckedChange={(v) => onChangeItem(item.numero, 'om', !!v)}
                />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox
                  checked={itemEstado.nc}
                  onCheckedChange={(v) => onChangeItem(item.numero, 'nc', !!v)}
                />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox
                  checked={itemEstado.c}
                  onCheckedChange={(v) => onChangeItem(item.numero, 'c', !!v)}
                />
              </TableCell>
              <TableCell>
                <Textarea
                  value={itemEstado.evidencia}
                  onChange={(e) => onChangeItem(item.numero, 'evidencia', e.target.value)}
                  className="min-h-[60px] text-xs resize-none"
                  rows={2}
                />
              </TableCell>
              <TableCell>
                <Textarea
                  value={itemEstado.planoAcao}
                  onChange={(e) => onChangeItem(item.numero, 'planoAcao', e.target.value)}
                  className="min-h-[60px] text-xs resize-none"
                  rows={2}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const SecaoRoteiro = ({ secao, estado, onChangeItem, onChangeAuditor, onChangeAuditado }: SecaoRoteiroProps) => {
  return (
    <div className="space-y-4">
      {secao.subSecoes ? (
        secao.subSecoes.map((sub, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground border-b pb-1">{sub.titulo}</h4>
            <TabelaItens itens={sub.itens} estado={estado} onChangeItem={onChangeItem} />
          </div>
        ))
      ) : (
        <TabelaItens itens={secao.itens} estado={estado} onChangeItem={onChangeItem} />
      )}

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="space-y-1">
          <Label className="text-sm font-medium">Auditor:</Label>
          <Input
            value={estado.auditor}
            onChange={(e) => onChangeAuditor(e.target.value)}
            placeholder="Nome do auditor"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-medium">Auditado:</Label>
          <Input
            value={estado.auditado}
            onChange={(e) => onChangeAuditado(e.target.value)}
            placeholder="Nome do auditado"
          />
        </div>
      </div>
    </div>
  );
};

export type { ItemEstado, SecaoEstado };
