import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface AliquotaEstado {
  estado: string;
  aliquotaInterestadual: string;
  aliquotaICMSInterna: string;
  aliquotaFundoCombate: string;
  isEditing: boolean;
}

const estadosBrasileiros = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 
  'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 
  'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 
  'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
  'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

const AliquotasEstadoConfig = () => {
  const [naoDestacarICMS, setNaoDestacarICMS] = useState(false);
  const [aliquotas, setAliquotas] = useState<AliquotaEstado[]>(() => {
    return estadosBrasileiros.map(estado => ({
      estado,
      aliquotaInterestadual: estado === 'Minas Gerais' ? '12,0000' : '7,0000',
      aliquotaICMSInterna: '0,0000',
      aliquotaFundoCombate: '0,0000',
      isEditing: false
    }));
  });

  const handleAliquotaChange = (index: number, field: keyof AliquotaEstado, value: string) => {
    const newAliquotas = [...aliquotas];
    newAliquotas[index] = {
      ...newAliquotas[index],
      [field]: value
    };
    setAliquotas(newAliquotas);
  };

  const toggleEdit = (index: number) => {
    const newAliquotas = [...aliquotas];
    newAliquotas[index].isEditing = !newAliquotas[index].isEditing;
    setAliquotas(newAliquotas);
  };

  const handleSalvar = () => {
    toast.success("Alíquotas salvas com sucesso!");
    // Desabilitar edição em todas as linhas após salvar
    const newAliquotas = aliquotas.map(a => ({ ...a, isEditing: false }));
    setAliquotas(newAliquotas);
  };

  const handleCancelar = () => {
    // Resetar para valores iniciais
    setAliquotas(estadosBrasileiros.map(estado => ({
      estado,
      aliquotaInterestadual: estado === 'Minas Gerais' ? '12,0000' : '7,0000',
      aliquotaICMSInterna: '0,0000',
      aliquotaFundoCombate: '0,0000',
      isEditing: false
    })));
    setNaoDestacarICMS(false);
    toast.info("Alterações canceladas");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-biodina-blue">Alíquotas por estado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Checkbox superior */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="nao-destacar-icms" 
                checked={naoDestacarICMS}
                onCheckedChange={(checked) => setNaoDestacarICMS(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="nao-destacar-icms" className="text-sm font-normal cursor-pointer">
                Não destacar ICMS DIFAL para não contribuinte para o estado de origem
              </Label>
            </div>
          </div>

          {/* Tabela de alíquotas */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold">Alíquota interestadual para produtos não importados</TableHead>
                  <TableHead className="font-semibold">Alíquota de ICMS interna do estado de destino (sem FCP)</TableHead>
                  <TableHead className="font-semibold">Alíquota de ICMS do Fundo Combate à Pobreza</TableHead>
                  <TableHead className="font-semibold w-24">Exceções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aliquotas.map((item, index) => (
                  <TableRow key={item.estado} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.estado}</TableCell>
                    
                    {/* Input com sufixo "%" - Alíquota Interestadual */}
                    <TableCell>
                      <div className="relative">
                        <Input
                          type="text"
                          value={item.aliquotaInterestadual}
                          disabled={!item.isEditing}
                          onChange={(e) => handleAliquotaChange(index, 'aliquotaInterestadual', e.target.value)}
                          className="pr-8 disabled:opacity-60"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                      </div>
                    </TableCell>
                    
                    {/* Input com sufixo "%" - ICMS Interna */}
                    <TableCell>
                      <div className="relative">
                        <Input
                          type="text"
                          value={item.aliquotaICMSInterna}
                          disabled={!item.isEditing}
                          onChange={(e) => handleAliquotaChange(index, 'aliquotaICMSInterna', e.target.value)}
                          className="pr-8 disabled:opacity-60"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                      </div>
                    </TableCell>
                    
                    {/* Input com sufixo "%" - Fundo Combate */}
                    <TableCell>
                      <div className="relative">
                        <Input
                          type="text"
                          value={item.aliquotaFundoCombate}
                          disabled={!item.isEditing}
                          onChange={(e) => handleAliquotaChange(index, 'aliquotaFundoCombate', e.target.value)}
                          className="pr-8 disabled:opacity-60"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                      </div>
                    </TableCell>
                    
                    {/* Botão editar */}
                    <TableCell>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => toggleEdit(index)}
                        className="h-auto p-0 text-primary hover:text-primary/80"
                      >
                        {item.isEditing ? 'Cancelar' : 'editar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Botões de ação no rodapé */}
          <div className="flex justify-start gap-4 pt-4">
            <Button onClick={handleSalvar} className="bg-blue-600 hover:bg-blue-700">
              salvar
            </Button>
            <Button variant="outline" onClick={handleCancelar}>
              cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AliquotasEstadoConfig;
