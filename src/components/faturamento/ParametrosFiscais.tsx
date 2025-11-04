import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Save, Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { MapeamentoFiscal, TipoOperacaoFiscal } from "@/types/faturamento";

const ParametrosFiscais = () => {
  const [dataConcessao, setDataConcessao] = useState("2023-01-15");
  const [prazoMaximo, setPrazoMaximo] = useState("24");
  const [mapeamentos, setMapeamentos] = useState<MapeamentoFiscal[]>([
    {
      id: "MAP001",
      tipoOperacao: "Remessa",
      ufDestino: "SP",
      tipoCliente: "Contribuinte",
      cfopSugerido: "5949",
      cstSugerido: "000",
      naturezaOperacao: "Remessa para Manutenção",
      aliquotaICMS: 18,
      observacoes: "Uso em manutenção técnica"
    },
    {
      id: "MAP002",
      tipoOperacao: "Venda",
      ufDestino: "SP",
      tipoCliente: "Contribuinte",
      cfopSugerido: "5102",
      cstSugerido: "000",
      naturezaOperacao: "Venda de Mercadoria",
      aliquotaICMS: 18
    },
    {
      id: "MAP003",
      tipoOperacao: "Comodato",
      ufDestino: "SP",
      tipoCliente: "Contribuinte",
      cfopSugerido: "5908",
      cstSugerido: "041",
      naturezaOperacao: "Remessa em Comodato",
      aliquotaICMS: 0,
      observacoes: "Equipamento em comodato"
    }
  ]);

  const [novoMapeamento, setNovoMapeamento] = useState<Partial<MapeamentoFiscal>>({
    tipoOperacao: "Venda",
    ufDestino: "SP",
    tipoCliente: "Contribuinte"
  });

  const [modoEdicao, setModoEdicao] = useState(false);

  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const tiposOperacao: TipoOperacaoFiscal[] = [
    'Venda', 'Remessa', 'Devolucao', 'AutoConsumo', 'Comodato', 'Locacao', 'Perda', 'Servico'
  ];

  const handleSalvarParametros = () => {
    toast.success("Parâmetros fiscais salvos com sucesso!");
    console.log({ dataConcessao, prazoMaximo, mapeamentos });
  };

  const handleAdicionarMapeamento = () => {
    if (!novoMapeamento.cfopSugerido || !novoMapeamento.naturezaOperacao) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const novo: MapeamentoFiscal = {
      id: `MAP${String(mapeamentos.length + 1).padStart(3, '0')}`,
      tipoOperacao: novoMapeamento.tipoOperacao as TipoOperacaoFiscal,
      ufDestino: novoMapeamento.ufDestino || "SP",
      tipoCliente: novoMapeamento.tipoCliente || "Contribuinte",
      cfopSugerido: novoMapeamento.cfopSugerido || "",
      cstSugerido: novoMapeamento.cstSugerido || "",
      naturezaOperacao: novoMapeamento.naturezaOperacao || "",
      aliquotaICMS: novoMapeamento.aliquotaICMS,
      observacoes: novoMapeamento.observacoes
    };

    setMapeamentos([...mapeamentos, novo]);
    setNovoMapeamento({
      tipoOperacao: "Venda",
      ufDestino: "SP",
      tipoCliente: "Contribuinte"
    });
    setModoEdicao(false);
    toast.success("Mapeamento fiscal adicionado!");
  };

  const handleRemoverMapeamento = (id: string) => {
    setMapeamentos(mapeamentos.filter(m => m.id !== id));
    toast.success("Mapeamento removido!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parâmetros Fiscais</h1>
          <p className="text-gray-600">Configure as regras fiscais e mapeamentos</p>
        </div>
        <Button onClick={handleSalvarParametros} className="bg-primary">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {/* Parâmetros Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Parâmetros Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataConcessao">Data de Concessão do Regime Especial</Label>
              <Input
                id="dataConcessao"
                type="date"
                value={dataConcessao}
                onChange={(e) => setDataConcessao(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Define o marco temporal para classificação de equipamentos
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazoMaximo">Prazo Máximo para Baixa Fiscal da OS (horas)</Label>
              <Input
                id="prazoMaximo"
                type="number"
                value={prazoMaximo}
                onChange={(e) => setPrazoMaximo(e.target.value)}
                min="1"
              />
              <p className="text-xs text-gray-500">
                Tempo limite antes de disparar alerta de bloqueio (padrão: 24h)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Mapeamento Fiscal */}
      <Card>
        <CardHeader>
          <CardTitle>Tabela de Mapeamento Fiscal</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo Operação</TableHead>
                <TableHead>UF Destino</TableHead>
                <TableHead>Tipo Cliente</TableHead>
                <TableHead>CFOP</TableHead>
                <TableHead>CST</TableHead>
                <TableHead>Natureza Operação</TableHead>
                <TableHead>Alíquota ICMS</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mapeamentos.map((map) => (
                <TableRow key={map.id}>
                  <TableCell className="font-medium">{map.tipoOperacao}</TableCell>
                  <TableCell>{map.ufDestino}</TableCell>
                  <TableCell>{map.tipoCliente}</TableCell>
                  <TableCell className="font-mono">{map.cfopSugerido}</TableCell>
                  <TableCell className="font-mono">{map.cstSugerido}</TableCell>
                  <TableCell>{map.naturezaOperacao}</TableCell>
                  <TableCell>{map.aliquotaICMS ? `${map.aliquotaICMS}%` : '-'}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoverMapeamento(map.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Formulário para Novo Mapeamento */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Adicionar Novo Mapeamento</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setModoEdicao(!modoEdicao)}
              >
                {modoEdicao ? 'Cancelar' : <><Plus className="h-4 w-4 mr-2" /> Adicionar</>}
              </Button>
            </div>

            {modoEdicao && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label>Tipo Operação</Label>
                  <Select
                    value={novoMapeamento.tipoOperacao}
                    onValueChange={(value) => setNovoMapeamento({ ...novoMapeamento, tipoOperacao: value as TipoOperacaoFiscal })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposOperacao.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>UF Destino</Label>
                  <Select
                    value={novoMapeamento.ufDestino}
                    onValueChange={(value) => setNovoMapeamento({ ...novoMapeamento, ufDestino: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ufs.map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo Cliente</Label>
                  <Select
                    value={novoMapeamento.tipoCliente}
                    onValueChange={(value: any) => setNovoMapeamento({ ...novoMapeamento, tipoCliente: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contribuinte">Contribuinte</SelectItem>
                      <SelectItem value="Nao Contribuinte">Não Contribuinte</SelectItem>
                      <SelectItem value="Pessoa Fisica">Pessoa Física</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>CFOP Sugerido *</Label>
                  <Input
                    placeholder="Ex: 5102"
                    value={novoMapeamento.cfopSugerido || ''}
                    onChange={(e) => setNovoMapeamento({ ...novoMapeamento, cfopSugerido: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>CST Sugerido</Label>
                  <Input
                    placeholder="Ex: 000"
                    value={novoMapeamento.cstSugerido || ''}
                    onChange={(e) => setNovoMapeamento({ ...novoMapeamento, cstSugerido: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Natureza Operação *</Label>
                  <Input
                    placeholder="Ex: Venda de Mercadoria"
                    value={novoMapeamento.naturezaOperacao || ''}
                    onChange={(e) => setNovoMapeamento({ ...novoMapeamento, naturezaOperacao: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Alíquota ICMS (%)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 18"
                    value={novoMapeamento.aliquotaICMS || ''}
                    onChange={(e) => setNovoMapeamento({ ...novoMapeamento, aliquotaICMS: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2 md:col-span-4">
                  <Label>Observações</Label>
                  <Input
                    placeholder="Observações adicionais..."
                    value={novoMapeamento.observacoes || ''}
                    onChange={(e) => setNovoMapeamento({ ...novoMapeamento, observacoes: e.target.value })}
                  />
                </div>

                <div className="md:col-span-4 flex justify-end">
                  <Button onClick={handleAdicionarMapeamento} className="bg-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Mapeamento
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParametrosFiscais;
