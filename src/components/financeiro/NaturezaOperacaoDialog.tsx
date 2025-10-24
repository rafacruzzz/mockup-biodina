import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NaturezaOperacaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NaturezaOperacaoDialog = ({ open, onOpenChange }: NaturezaOperacaoDialogProps) => {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("normal");
  const [codigoRegime, setCodigoRegime] = useState("simples_nacional");
  const [serie, setSerie] = useState("1");
  const [consumidorFinal, setConsumidorFinal] = useState("nao");
  const [observacoes, setObservacoes] = useState("");
  const [csosn, setCsosn] = useState("102");
  const [cfop, setCfop] = useState("");
  const [icmsDifal, setIcmsDifal] = useState("nao");
  const [observacoesSimples, setObservacoesSimples] = useState("");
  const [precoConsiderado, setPrecoConsiderado] = useState("ultima_entrada");
  const [considerarCMV, setConsiderarCMV] = useState("nao");
  const [produtorRural, setProdutorRural] = useState("nao");
  const [permiteLancamento, setPermiteLancamento] = useState("sim");
  const [aliquotaFunrural, setAliquotaFunrural] = useState("0,00");
  const [descontarFunrural, setDescontarFunrural] = useState("sim");
  const [reducaoBase, setReducaoBase] = useState("padrao");
  const [somarDespesas, setSomarDespesas] = useState("nao");
  const [atualizarPreco, setAtualizarPreco] = useState("sim");
  const [descontarDesoneracao, setDescontarDesoneracao] = useState("sim");
  const [compoeTotalNF, setCompoeTotalNF] = useState("compoe_total");
  const [mostrarAvancadas, setMostrarAvancadas] = useState(false);
  const [cfopSheetOpen, setCfopSheetOpen] = useState(false);
  const [cfopSearch, setCfopSearch] = useState("");
  const [cfopValue, setCfopValue] = useState("");
  const [excecoesSheetOpen, setExcecoesSheetOpen] = useState(false);
  const [excecoesStep, setExcecoesStep] = useState(1);
  const [excecoesSalvas, setExcecoesSalvas] = useState<Array<{
    id: string;
    estado: string;
    produtos: string;
    cfop: string;
    situacaoTributaria: string;
  }>>([]);
  const [editandoExcecaoId, setEditandoExcecaoId] = useState<string | null>(null);
  const [estadoDestinatario, setEstadoDestinatario] = useState("");
  const [produtos, setProdutos] = useState<Array<{ produto: string; sku: string }>>([]);
  const [novoProduto, setNovoProduto] = useState("");
  const [origens, setOrigens] = useState("");
  const [ncms, setNcms] = useState<string[]>([]);
  const [novoNcm, setNovoNcm] = useState("");
  
  // Campos da segunda página de exceções
  const [excecaoCsosn, setExcecaoCsosn] = useState("");
  const [excecaoCfop, setExcecaoCfop] = useState("");
  const [aliquotaIcmsEfetivo, setAliquotaIcmsEfetivo] = useState("");
  const [baseIcmsEfetivo, setBaseIcmsEfetivo] = useState("");
  const [codigoFiscalOperacao, setCodigoFiscalOperacao] = useState("");
  const [aliquotaIcms, setAliquotaIcms] = useState("");
  const [icmsDifalNaoContribuinte, setIcmsDifalNaoContribuinte] = useState("Não");
  const [icmsUfDestino, setIcmsUfDestino] = useState("");
  const [difalContribuinte, setDifalContribuinte] = useState("Não");
  const [aliquotaAplicavel, setAliquotaAplicavel] = useState("");
  const [codigoBeneficio, setCodigoBeneficio] = useState("");
  const [observacoesExcecao, setObservacoesExcecao] = useState("");
  const [obterIcmsSt, setObterIcmsSt] = useState(false);
  const [aliquotaIcmsSt, setAliquotaIcmsSt] = useState("0,00");
  const [baseCalculoIcmsSt, setBaseCalculoIcmsSt] = useState("0,00");
  const [margemAdicIcmsSt, setMargemAdicIcmsSt] = useState("0,00");
  const [aliquotaFcpIcmsSt, setAliquotaFcpIcmsSt] = useState("");
  const [aliquotaIcmsRetido, setAliquotaIcmsRetido] = useState("");
  const [baseCalculoIcmsRetido, setBaseCalculoIcmsRetido] = useState("");
  const [fundoCombatePobreza, setFundoCombatePobreza] = useState("");
  
  // Estados para IPI
  const [situacaoTributariaIPI, setSituacaoTributariaIPI] = useState("");
  const [observacoesIPI, setObservacoesIPI] = useState("");
  const [aliquotaIPI, setAliquotaIPI] = useState("");
  const [codigoEnquadramentoIPI, setCodigoEnquadramentoIPI] = useState("");
  const [codigoEnquadramentoSheetOpen, setCodigoEnquadramentoSheetOpen] = useState(false);
  const [codigoEnquadramentoSearch, setCodigoEnquadramentoSearch] = useState("");
  
  // Estados para ISSQN
  const [situacaoTributariaISSQN, setSituacaoTributariaISSQN] = useState("");
  const [aliquotaISSQN, setAliquotaISSQN] = useState("0,00");
  const [baseISSQN, setBaseISSQN] = useState("100,0000");
  const [descontarISS, setDescontarISS] = useState("nao");
  const [observacoesISSQN, setObservacoesISSQN] = useState("");
  
  // Estados para PIS
  const [situacaoTributariaPIS, setSituacaoTributariaPIS] = useState("");
  const [aliquotaPIS, setAliquotaPIS] = useState("0,00");
  const [basePIS, setBasePIS] = useState("100,0000");
  const [observacoesPIS, setObservacoesPIS] = useState("");
  
  // Estados para COFINS
  const [situacaoTributariaCOFINS, setSituacaoTributariaCOFINS] = useState("");
  const [aliquotaCOFINS, setAliquotaCOFINS] = useState("0,00");
  const [baseCOFINS, setBaseCOFINS] = useState("100,0000");
  const [observacoesCOFINS, setObservacoesCOFINS] = useState("");

  const handleSalvar = () => {
    // Implementar lógica de salvamento
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Natureza de operação (Tributação)</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Primeira linha: Descrição e Finalidade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Devolução de venda de mercadorias de produção própria"
              />
            </div>
            <div className="space-y-2">
              <Label>Finalidade</Label>
              <Select value={finalidade} onValueChange={setFinalidade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="devolucao">Devolução</SelectItem>
                  <SelectItem value="bonificacao">Bonificação</SelectItem>
                  <SelectItem value="remessa">Remessa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Segunda linha: Código regime, Série, Consumidor final */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Código de regime tributário
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Regime tributário da operação</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select value={codigoRegime} onValueChange={setCodigoRegime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simples_nacional">Simples nacional</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="mei">MEI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Série
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Série da nota fiscal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input type="number" value={serie} onChange={(e) => setSerie(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Consumidor final
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Indica se é consumidor final</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select value={consumidorFinal} onValueChange={setConsumidorFinal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Observações padrões */}
          <div className="space-y-2">
            <Label>Observações padrões para notas desta operação</Label>
            <Textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Para exibir valores nas observações, usar as{" "}
              <span className="text-primary cursor-pointer hover:underline">variáveis disponíveis</span>.
            </p>
          </div>

          {/* Tabs de tributação */}
          <Tabs defaultValue="simples" className="w-full">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="simples">Simples</TabsTrigger>
              <TabsTrigger value="ipi">IPI</TabsTrigger>
              <TabsTrigger value="issqn">ISSQN</TabsTrigger>
              <TabsTrigger value="pis">PIS</TabsTrigger>
              <TabsTrigger value="cofins">COFINS</TabsTrigger>
              <TabsTrigger value="importacao">importação</TabsTrigger>
            </TabsList>

            <TabsContent value="simples" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Código de situação da operação no Simples nacional (CSOSN)</Label>
                <Select value={csosn} onValueChange={setCsosn}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">101 - Tributada com permissão de crédito</SelectItem>
                    <SelectItem value="102">102 - Tributada sem permissão de crédito</SelectItem>
                    <SelectItem value="103">103 - Isenção do ICMS para faixa de receita bruta</SelectItem>
                    <SelectItem value="201">201 - Tributada com permissão de crédito e com cobrança do ICMS por ST</SelectItem>
                    <SelectItem value="202">202 - Tributada sem permissão de crédito e com cobrança do ICMS por ST</SelectItem>
                    <SelectItem value="203">203 - Isenção do ICMS para faixa de receita bruta e com cobrança do ICMS por ST</SelectItem>
                    <SelectItem value="300">300 - Imune</SelectItem>
                    <SelectItem value="400">400 - Não tributada</SelectItem>
                    <SelectItem value="500">500 - ICMS cobrado anteriormente por ST ou por antecipação</SelectItem>
                    <SelectItem value="900">900 - Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>CFOP</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p className="text-sm">
                            Utilize o <strong>?</strong> no início do CFOP para substituí-lo conforme a UF do destinatário.
                          </p>
                          <p className="text-sm mt-2">
                            Ex: CFOP <strong>?.102</strong> será substituído por:
                          </p>
                          <ul className="text-sm mt-1 space-y-1">
                            <li><strong>1</strong> - para operações com mesma UF</li>
                            <li><strong>2</strong> - para interestaduais</li>
                            <li><strong>3</strong> - para exportação.</li>
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Input
                      value={cfopValue}
                      onChange={(e) => setCfopValue(e.target.value)}
                      placeholder="Código fiscal da operação"
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setCfopSheetOpen(true)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ICMS DIFAL para não contribuinte</Label>
                  <Select value={icmsDifal} onValueChange={setIcmsDifal}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Observações do Simples</Label>
                <Textarea
                  value={observacoesSimples}
                  onChange={(e) => setObservacoesSimples(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Para exibir valores nas observações, usar as{" "}
                  <span className="text-primary cursor-pointer hover:underline">variáveis disponíveis</span>.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ipi" className="mt-4">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Situação tributária (CST)</Label>
                    <Select value={situacaoTributariaIPI} onValueChange={setSituacaoTributariaIPI}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selecione">Selecione</SelectItem>
                        <SelectItem value="00">00 - Entrada com recuperação de crédito</SelectItem>
                        <SelectItem value="01">01 - Entrada tributada com alíquota zero</SelectItem>
                        <SelectItem value="02">02 - Entrada isenta</SelectItem>
                        <SelectItem value="03">03 - Entrada não-tributada</SelectItem>
                        <SelectItem value="04">04 - Entrada imune</SelectItem>
                        <SelectItem value="05">05 - Entrada com suspensão</SelectItem>
                        <SelectItem value="49">49 - Outras entradas</SelectItem>
                        <SelectItem value="nao_destacar">Não destacar IPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações do IPI</Label>
                    <Textarea
                      value={observacoesIPI}
                      onChange={(e) => setObservacoesIPI(e.target.value)}
                      placeholder="Observações..."
                      className="min-h-[80px]"
                    />
                  </div>

                  {/* Campos condicionais - aparecem quando NÃO for "Não destacar IPI" */}
                  {situacaoTributariaIPI && situacaoTributariaIPI !== "nao_destacar" && (
                    <>
                      <div className="space-y-2">
                        <Label>Alíquota</Label>
                        <Input
                          value={aliquotaIPI}
                          onChange={(e) => setAliquotaIPI(e.target.value)}
                          placeholder="0,00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Código de enquadramento</Label>
                        <div className="flex gap-2">
                          <Input
                            value={codigoEnquadramentoIPI}
                            readOnly
                            placeholder="Selecione o código"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setCodigoEnquadramentoSheetOpen(true)}
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="issqn" className="mt-4">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Situação tributária (CST)</Label>
                    <Select value={situacaoTributariaISSQN} onValueChange={setSituacaoTributariaISSQN}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selecione">Selecione</SelectItem>
                        <SelectItem value="tributado">tributado</SelectItem>
                        <SelectItem value="isento">isento</SelectItem>
                        <SelectItem value="outra_situacao">outra situação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campos condicionais - aparecem quando houver uma seleção válida */}
                  {situacaoTributariaISSQN && situacaoTributariaISSQN !== "selecione" && (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Alíquota</Label>
                          <div className="relative">
                            <Input
                              value={aliquotaISSQN}
                              onChange={(e) => setAliquotaISSQN(e.target.value)}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Base</Label>
                          <div className="relative">
                            <Input
                              value={baseISSQN}
                              onChange={(e) => setBaseISSQN(e.target.value)}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Descontar ISS</Label>
                          <Select value={descontarISS} onValueChange={setDescontarISS}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nao">Não</SelectItem>
                              <SelectItem value="sim">Sim</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">Considerado no total da nota</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Observações do ISSQN</Label>
                        <Textarea
                          value={observacoesISSQN}
                          onChange={(e) => setObservacoesISSQN(e.target.value)}
                          placeholder="Observações..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pis" className="mt-4">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Situação tributária (CST)</Label>
                    <Select value={situacaoTributariaPIS} onValueChange={setSituacaoTributariaPIS}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selecione">Selecione</SelectItem>
                        <SelectItem value="01">01 - Operação tributável (alíquota normal, cumulativo ou não)</SelectItem>
                        <SelectItem value="02">02 - Operação tributável (alíquota diferenciada)</SelectItem>
                        <SelectItem value="03">03 - Operação tributável (alíquota por unidade de produto)</SelectItem>
                        <SelectItem value="04">04 - Operação tributável (tributação monofásica, alíquota zero)</SelectItem>
                        <SelectItem value="05">05 - Operação Tributável (Substituição Tributária)</SelectItem>
                        <SelectItem value="06">06 - Operação tributável (alíquota zero)</SelectItem>
                        <SelectItem value="07">07 - Operação isenta da contribuição</SelectItem>
                        <SelectItem value="08">08 - Operação sem incidência da contribuição</SelectItem>
                        <SelectItem value="09">09 - Operação com suspensão da contribuição</SelectItem>
                        <SelectItem value="49">49 - Outras Operações de Saída</SelectItem>
                        <SelectItem value="50">50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno</SelectItem>
                        <SelectItem value="51">51 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno</SelectItem>
                        <SelectItem value="52">52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação</SelectItem>
                        <SelectItem value="53">53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno</SelectItem>
                        <SelectItem value="54">54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação</SelectItem>
                        <SelectItem value="55">55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação</SelectItem>
                        <SelectItem value="56">56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação</SelectItem>
                        <SelectItem value="60">60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno</SelectItem>
                        <SelectItem value="61">61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Alíquota</Label>
                      <div className="relative">
                        <Input
                          value={aliquotaPIS}
                          onChange={(e) => setAliquotaPIS(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Base</Label>
                      <div className="relative">
                        <Input
                          value={basePIS}
                          onChange={(e) => setBasePIS(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações do PIS</Label>
                    <Textarea
                      value={observacoesPIS}
                      onChange={(e) => setObservacoesPIS(e.target.value)}
                      placeholder="Observações..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cofins" className="mt-4">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Situação tributária (CST)</Label>
                    <Select value={situacaoTributariaCOFINS} onValueChange={setSituacaoTributariaCOFINS}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selecione">Selecione</SelectItem>
                        <SelectItem value="01">01 - Operação tributável (alíquota normal, cumulativo ou não)</SelectItem>
                        <SelectItem value="02">02 - Operação tributável (alíquota diferenciada)</SelectItem>
                        <SelectItem value="03">03 - Operação tributável (alíquota por unidade de produto)</SelectItem>
                        <SelectItem value="04">04 - Operação tributável (tributação monofásica, alíquota zero)</SelectItem>
                        <SelectItem value="05">05 - Operação Tributável (Substituição Tributária)</SelectItem>
                        <SelectItem value="06">06 - Operação tributável (alíquota zero)</SelectItem>
                        <SelectItem value="07">07 - Operação isenta da contribuição</SelectItem>
                        <SelectItem value="08">08 - Operação sem incidência da contribuição</SelectItem>
                        <SelectItem value="09">09 - Operação com suspensão da contribuição</SelectItem>
                        <SelectItem value="49">49 - Outras Operações de Saída</SelectItem>
                        <SelectItem value="50">50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno</SelectItem>
                        <SelectItem value="51">51 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno</SelectItem>
                        <SelectItem value="52">52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação</SelectItem>
                        <SelectItem value="53">53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno</SelectItem>
                        <SelectItem value="54">54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação</SelectItem>
                        <SelectItem value="55">55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação</SelectItem>
                        <SelectItem value="56">56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação</SelectItem>
                        <SelectItem value="60">60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno</SelectItem>
                        <SelectItem value="61">61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Alíquota</Label>
                      <div className="relative">
                        <Input
                          value={aliquotaCOFINS}
                          onChange={(e) => setAliquotaCOFINS(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Base</Label>
                      <div className="relative">
                        <Input
                          value={baseCOFINS}
                          onChange={(e) => setBaseCOFINS(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações do COFINS</Label>
                    <Textarea
                      value={observacoesCOFINS}
                      onChange={(e) => setObservacoesCOFINS(e.target.value)}
                      placeholder="Observações..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="importacao" className="mt-4">
              <p className="text-muted-foreground">Configurações de importação</p>
            </TabsContent>
          </Tabs>

          {/* Exceções */}
          <div className="space-y-4">
            <h3 className="font-semibold">Exceções</h3>
            
            {excecoesSalvas.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Exceções do Simples</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">Destino(s)</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Produto(s)</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">CFOP</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Situação tributária</th>
                        <th className="px-4 py-2 text-center text-sm font-medium w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {excecoesSalvas.map((excecao) => (
                        <tr key={excecao.id} className="border-t hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm">{excecao.estado}</td>
                          <td className="px-4 py-3 text-sm">{excecao.produtos}</td>
                          <td className="px-4 py-3 text-sm">{excecao.cfop}</td>
                          <td className="px-4 py-3 text-sm">{excecao.situacaoTributaria}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  // Carregar dados da exceção para edição
                                  setEditandoExcecaoId(excecao.id);
                                  setExcecoesSheetOpen(true);
                                }}
                              >
                                <span className="text-primary">✏️</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setExcecoesSalvas(excecoesSalvas.filter(e => e.id !== excecao.id));
                                }}
                              >
                                <span className="text-destructive">🗑️</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <Button 
              variant="link" 
              className="text-primary p-0 h-auto"
              onClick={() => {
                setEditandoExcecaoId(null);
                setExcecoesSheetOpen(true);
              }}
            >
              + adicionar exceção
            </Button>
          </div>

          {/* Configurações avançadas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Configurações avançadas</h3>
              <Button
                variant="link"
                className="text-primary p-0 h-auto"
                onClick={() => setMostrarAvancadas(!mostrarAvancadas)}
              >
                {mostrarAvancadas ? "ocultar" : "mostrar"}
              </Button>
            </div>

            {mostrarAvancadas && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Preço considerado
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preço a ser considerado na operação</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Select value={precoConsiderado} onValueChange={setPrecoConsiderado}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ultima_entrada">Preço da última entrada</SelectItem>
                        <SelectItem value="custo_medio">Custo médio</SelectItem>
                        <SelectItem value="venda">Preço de venda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Considerar CMV no DRE</Label>
                    <Select value={considerarCMV} onValueChange={setConsiderarCMV}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Compra de produtor rural</Label>
                    <Select value={produtorRural} onValueChange={setProdutorRural}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Permite lançamento e reserva de estoque
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Permite movimentação de estoque</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Select value={permiteLancamento} onValueChange={setPermiteLancamento}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Alíquota funrural</Label>
                    <div className="relative">
                      <Input
                        value={aliquotaFunrural}
                        onChange={(e) => setAliquotaFunrural(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Descontar funrural do total faturado</Label>
                    <Select value={descontarFunrural} onValueChange={setDescontarFunrural}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Redução da Base de Cálculo do ICMS-ST</Label>
                    <Select value={reducaoBase} onValueChange={setReducaoBase}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="padrao">Padrão</SelectItem>
                        <SelectItem value="antes_somar_ipi">Antes de somar o IPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Somar despesas na importação</Label>
                    <Select value={somarDespesas} onValueChange={setSomarDespesas}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Atualizar preço de última compra do produto</Label>
                    <Select value={atualizarPreco} onValueChange={setAtualizarPreco}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descontar desoneração do total da nota fiscal</Label>
                  <Select value={descontarDesoneracao} onValueChange={setDescontarDesoneracao}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-sm text-muted-foreground">
                  Somar ICMS, PIS, COFINS e despesas aduaneiras ao total da nota
                </p>

                <div className="space-y-3">
                  <Label>Itens compõem valor total da NF-e</Label>
                  <RadioGroup value={compoeTotalNF} onValueChange={setCompoeTotalNF}>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="compoe_total" id="compoe_total" className="mt-0.5" />
                      <Label htmlFor="compoe_total" className="font-normal cursor-pointer">
                        Compõem total da nota fiscal
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="compoe_sem_xml" id="compoe_sem_xml" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="compoe_sem_xml" className="font-normal cursor-pointer">
                          Compõem total da nota fiscal, mas sem gerar faturas no XML da NFe
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          O valor dos itens também não será considerado nas parcelas da nota fiscal
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="nao_compoe" id="nao_compoe" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="nao_compoe" className="font-normal cursor-pointer">
                          Não
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Todos os totalizadores e valores da nota serão zerados
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-start gap-4 pt-4">
            <Button onClick={handleSalvar}>salvar</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              cancelar
            </Button>
          </div>
        </div>
      </DialogContent>

      <Sheet open={cfopSheetOpen} onOpenChange={setCfopSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Busca de CFOP</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <div>
                <Label>CFOP</Label>
                <Input 
                  placeholder=""
                  value={cfopSearch}
                  onChange={(e) => setCfopSearch(e.target.value)}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <div className="flex gap-2">
                  <Input placeholder="" className="flex-1" />
                  <Button size="icon" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-[120px_1fr] bg-muted/50 border-b">
                <div className="p-3 font-semibold text-sm">CFOP</div>
                <div className="p-3 font-semibold text-sm">Descrição</div>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {[
                  { code: "1.603", desc: "Ressarcimento de ICMS retido por substituição tributária" },
                  { code: "1.205", desc: "Anulação de valor relativo à prestação de serviço de comunicação" },
                  { code: "1.206", desc: "Anulação de valor relativo à prestação de serviço de transporte" },
                  { code: "1.207", desc: "Anulação de valor relativo à venda de energia elétrica" },
                  { code: "1.301", desc: "Aquisição de serviço de comunicação para execução de serviço da mesma natureza" },
                ]
                  .filter(item => 
                    cfopSearch === "" || 
                    item.code.includes(cfopSearch) || 
                    item.desc.toLowerCase().includes(cfopSearch.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item.code}
                      className="grid grid-cols-[120px_1fr] border-b last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => {
                        setCfopValue(item.code);
                        setCfopSheetOpen(false);
                      }}
                    >
                      <div className="p-3 text-sm">{item.code}</div>
                      <div className="p-3 text-sm">{item.desc}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => setCfopSheetOpen(false)}>
                cancelar <span className="ml-2 text-xs text-muted-foreground">ESC</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sheet de Exceções */}
      <Sheet open={excecoesSheetOpen} onOpenChange={(open) => {
        setExcecoesSheetOpen(open);
        if (!open) {
          setExcecoesStep(1);
          // Limpar campos ao fechar
          setEstadoDestinatario("");
          setProdutos([]);
          setNovoProduto("");
          setOrigens("");
          setNcms([]);
          setNovoNcm("");
          setExcecaoCsosn("");
          setExcecaoCfop("");
          setAliquotaIcmsEfetivo("");
          setBaseIcmsEfetivo("");
          setCodigoFiscalOperacao("");
          setAliquotaIcms("");
          setIcmsDifalNaoContribuinte("Não");
          setIcmsUfDestino("");
          setDifalContribuinte("Não");
          setAliquotaAplicavel("");
          setCodigoBeneficio("");
          setObservacoesExcecao("");
          setObterIcmsSt(false);
          setAliquotaIcmsSt("0,00");
          setBaseCalculoIcmsSt("0,00");
          setMargemAdicIcmsSt("0,00");
          setAliquotaFcpIcmsSt("");
          setAliquotaIcmsRetido("");
          setBaseCalculoIcmsRetido("");
          setFundoCombatePobreza("");
          setEditandoExcecaoId(null);
        }
      }}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="space-y-6">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Exceções do Simples</SheetTitle>
                <Button variant="ghost" size="sm" onClick={() => {
                  setExcecoesSheetOpen(false);
                  setExcecoesStep(1);
                }}>
                  fechar
                </Button>
              </div>
            </SheetHeader>

            {excecoesStep === 1 ? (
              <>
                {/* Estados */}
                <div className="space-y-2">
                  <Label>Quando o destinatário for um destes estados</Label>
                  <Select value={estadoDestinatario} onValueChange={setEstadoDestinatario}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualquer">Qualquer estado</SelectItem>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="EX">EX</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Produtos */}
                <div className="space-y-3">
                  <Label>Para os seguintes produtos</Label>
                  
                  {produtos.length > 0 && (
                    <div className="space-y-2">
                      {produtos.map((produto, index) => (
                        <div key={index} className="grid grid-cols-[1fr_200px_auto] gap-2 items-end">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Produto</Label>
                            <Input value={produto.produto} readOnly />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Código (SKU)</Label>
                            <Input value={produto.sku} disabled className="bg-muted" />
                          </div>
                          <Button 
                            variant="link" 
                            className="text-primary text-sm"
                            onClick={() => {
                              setProdutos(produtos.filter((_, i) => i !== index));
                            }}
                          >
                            remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-[1fr_200px] gap-2 items-end">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Produto</Label>
                      <Input 
                        value={novoProduto} 
                        onChange={(e) => setNovoProduto(e.target.value)}
                        placeholder="Digite o nome do produto"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Código (SKU)</Label>
                      <Input 
                        disabled 
                        className="bg-muted"
                        placeholder="Auto"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto text-sm"
                    onClick={() => {
                      if (novoProduto.trim()) {
                        setProdutos([...produtos, { produto: novoProduto, sku: "AUTO-" + Math.random().toString(36).substr(2, 9).toUpperCase() }]);
                        setNovoProduto("");
                      }
                    }}
                  >
                    + adicionar
                  </Button>
                </div>

                {/* Origens */}
                <div className="space-y-2">
                  <Label>Para as seguintes origens</Label>
                  <Select value={origens} onValueChange={setOrigens}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualquer">Qualquer origem</SelectItem>
                      <SelectItem value="0">0 - Nacional, exceto as indicadas nos códigos 3 a 5</SelectItem>
                      <SelectItem value="1">1 - Estrangeira - Importação direta, exceto a indicada no código 6</SelectItem>
                      <SelectItem value="2">2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</SelectItem>
                      <SelectItem value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%</SelectItem>
                      <SelectItem value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes</SelectItem>
                      <SelectItem value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</SelectItem>
                      <SelectItem value="6">6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX</SelectItem>
                      <SelectItem value="7">7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX</SelectItem>
                      <SelectItem value="8">8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* NCMs */}
                <div className="space-y-3">
                  <Label>Para as seguintes NCMs</Label>
                  
                  {ncms.length > 0 && (
                    <div className="space-y-2">
                      {ncms.map((ncm, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={ncm} readOnly />
                          <Button 
                            variant="link" 
                            className="text-primary text-sm"
                            onClick={() => {
                              setNcms(ncms.filter((_, i) => i !== index));
                            }}
                          >
                            remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input 
                        value={novoNcm} 
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setNovoNcm(value);
                        }}
                        placeholder="Digite apenas números"
                        type="text"
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto text-sm"
                    onClick={() => {
                      if (novoNcm.trim()) {
                        setNcms([...ncms, novoNcm]);
                        setNovoNcm("");
                      }
                    }}
                  >
                    + adicionar
                  </Button>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => {
                    setExcecoesSheetOpen(false);
                    setExcecoesStep(1);
                  }}>
                    cancelar
                  </Button>
                  <Button onClick={() => setExcecoesStep(2)}>
                    próximo
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Segunda página - Campos de tributação */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Código de situação da operação no Simples nacional (CSOSN)</Label>
                    <Select value={excecaoCsosn} onValueChange={setExcecaoCsosn}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="101">101 - Tributada com permissão de crédito</SelectItem>
                        <SelectItem value="102">102 - Tributada sem permissão de crédito</SelectItem>
                        <SelectItem value="103">103 - Isenção do ICMS para faixa de receita bruta</SelectItem>
                        <SelectItem value="201">201 - Tributada com permissão de crédito e com cobrança do ICMS por ST</SelectItem>
                        <SelectItem value="202">202 - Tributada sem permissão de crédito e com cobrança do ICMS por ST</SelectItem>
                        <SelectItem value="203">203 - Isenção do ICMS para faixa de receita bruta e com cobrança do ICMS por ST</SelectItem>
                        <SelectItem value="300">300 - Imune</SelectItem>
                        <SelectItem value="400">400 - Não tributada</SelectItem>
                        <SelectItem value="500">500 - ICMS cobrado anteriormente por ST ou por antecipação</SelectItem>
                        <SelectItem value="900">900 - Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>CFOP</Label>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="relative">
                        <Input
                          value={excecaoCfop}
                          onChange={(e) => setExcecaoCfop(e.target.value)}
                          placeholder="Código"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Alíquota ICMS efetivo</Label>
                      <div className="relative">
                        <Input
                          value={aliquotaIcmsEfetivo}
                          onChange={(e) => setAliquotaIcmsEfetivo(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Base ICMS efetivo</Label>
                      <div className="relative">
                        <Input
                          value={baseIcmsEfetivo}
                          onChange={(e) => setBaseIcmsEfetivo(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Código fiscal da operação</Label>
                    <Input
                      value={codigoFiscalOperacao}
                      onChange={(e) => setCodigoFiscalOperacao(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Alíquota ICMS</Label>
                      <div className="relative">
                        <Input
                          value={aliquotaIcms}
                          onChange={(e) => setAliquotaIcms(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>ICMS DIFAL para não contribuinte</Label>
                      <Select value={icmsDifalNaoContribuinte} onValueChange={setIcmsDifalNaoContribuinte}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sim">Sim</SelectItem>
                          <SelectItem value="Não">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ICMS para a UF de Destino</Label>
                      <Input
                        value={icmsUfDestino}
                        onChange={(e) => setIcmsUfDestino(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>DIFAL para contribuinte</Label>
                      <Select value={difalContribuinte} onValueChange={setDifalContribuinte}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sim">Sim</SelectItem>
                          <SelectItem value="Não">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Alíquota Aplicável de Cálculo do Crédito</Label>
                    <div className="relative">
                      <Input
                        value={aliquotaAplicavel}
                        onChange={(e) => setAliquotaAplicavel(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Código de benefício fiscal</Label>
                    <Input
                      value={codigoBeneficio}
                      onChange={(e) => setCodigoBeneficio(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Observações do Simples</Label>
                    <Textarea
                      value={observacoesExcecao}
                      onChange={(e) => setObservacoesExcecao(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      Para exibir valores nas observações, usar as <span className="text-primary cursor-pointer">variáveis disponíveis</span>.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="obterIcmsSt"
                      checked={obterIcmsSt}
                      onChange={(e) => setObterIcmsSt(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="obterIcmsSt" className="text-sm font-normal cursor-pointer">
                      Obter ICMS-ST retido anteriormente a partir de nota fiscal de compra
                    </Label>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Substituição tributária</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Alíquota ICMS</Label>
                        <div className="relative">
                          <Input
                            value={aliquotaIcmsSt}
                            onChange={(e) => setAliquotaIcmsSt(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Base de Cálculo ICMS</Label>
                        <div className="relative">
                          <Input
                            value={baseCalculoIcmsSt}
                            onChange={(e) => setBaseCalculoIcmsSt(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Margem Adic.ICMS</Label>
                        <div className="relative">
                          <Input
                            value={margemAdicIcmsSt}
                            onChange={(e) => setMargemAdicIcmsSt(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Alíquota FCP ICMS-ST</Label>
                        <div className="relative">
                          <Input
                            value={aliquotaFcpIcmsSt}
                            onChange={(e) => setAliquotaFcpIcmsSt(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Alíquota ICMS Retido</Label>
                        <div className="relative">
                          <Input
                            value={aliquotaIcmsRetido}
                            onChange={(e) => setAliquotaIcmsRetido(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Base de Cálculo ICMS Retido</Label>
                        <div className="relative">
                          <Input
                            value={baseCalculoIcmsRetido}
                            onChange={(e) => setBaseCalculoIcmsRetido(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>% Fundo de Combate a Pobreza do ST</Label>
                      <div className="relative">
                        <Input
                          value={fundoCombatePobreza}
                          onChange={(e) => setFundoCombatePobreza(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setExcecoesStep(1)}>
                      voltar
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setExcecoesSheetOpen(false);
                      setExcecoesStep(1);
                    }}>
                      cancelar
                    </Button>
                  </div>
                  <Button onClick={() => {
                    // Salvar exceção
                    const produtosStr = produtos.map(p => p.produto).join(', ') || 'Todos';
                    const estadoStr = estadoDestinatario === 'qualquer' || !estadoDestinatario ? 'Qualquer estado' : estadoDestinatario;
                    const situacaoStr = excecaoCsosn ? `${excecaoCsosn} - ${
                      excecaoCsosn === '101' ? 'Tributada com permissão de crédito' :
                      excecaoCsosn === '102' ? 'Tributada sem permissão de crédito' :
                      excecaoCsosn === '103' ? 'Isenção do ICMS para faixa de receita bruta' :
                      excecaoCsosn === '201' ? 'Tributada com permissão de crédito e com cobrança do ICMS por ST' :
                      excecaoCsosn === '202' ? 'Tributada sem permissão de crédito e com cobrança do ICMS por ST' :
                      excecaoCsosn === '203' ? 'Isenção do ICMS para faixa de receita bruta e com cobrança do ICMS por ST' :
                      excecaoCsosn === '300' ? 'Imune' :
                      excecaoCsosn === '400' ? 'Não tributada' :
                      excecaoCsosn === '500' ? 'ICMS cobrado anteriormente por ST ou por antecipação' :
                      excecaoCsosn === '900' ? 'Outros' : ''
                    }` : '';

                    if (editandoExcecaoId) {
                      // Editar exceção existente
                      setExcecoesSalvas(excecoesSalvas.map(e => 
                        e.id === editandoExcecaoId 
                          ? {
                              id: e.id,
                              estado: estadoStr,
                              produtos: produtosStr,
                              cfop: excecaoCfop || '',
                              situacaoTributaria: situacaoStr
                            }
                          : e
                      ));
                    } else {
                      // Adicionar nova exceção
                      const novaExcecao = {
                        id: Math.random().toString(36).substr(2, 9),
                        estado: estadoStr,
                        produtos: produtosStr,
                        cfop: excecaoCfop || '',
                        situacaoTributaria: situacaoStr
                      };
                      setExcecoesSalvas([...excecoesSalvas, novaExcecao]);
                    }
                    
                    // Limpar campos e fechar
                    setEstadoDestinatario("");
                    setProdutos([]);
                    setOrigens("");
                    setNcms([]);
                    setExcecaoCsosn("");
                    setExcecaoCfop("");
                    setAliquotaIcmsEfetivo("");
                    setBaseIcmsEfetivo("");
                    setEditandoExcecaoId(null);
                    setExcecoesSheetOpen(false);
                    setExcecoesStep(1);
                  }}>
                    salvar
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Sheet para pesquisar código de enquadramento IPI */}
      <Sheet open={codigoEnquadramentoSheetOpen} onOpenChange={setCodigoEnquadramentoSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Pesquisar código de enquadramento IPI</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="relative">
              <Input
                placeholder="Pesquisar"
                value={codigoEnquadramentoSearch}
                onChange={(e) => setCodigoEnquadramentoSearch(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              {[
                { codigo: "101", descricao: "Óleo de menta em bruto, produzido por lavradores - Art. 43 Inciso I do Decreto 7.212/2010" },
                { codigo: "102", descricao: "Produtos remetidos à exposição em feiras de amostras e promoções semelhantes - Art. 43 Inciso II do Decreto 7.212/2010" },
                { codigo: "103", descricao: "Produtos remetidos a depósitos fechados ou armazéns-gerais, bem assim aqueles devolvidos ao remetente - Art. 43 Inciso III do Decreto 7.212/2010" },
                { codigo: "104", descricao: "Produtos industrializados, que contenham matérias-primas (MP), produtos intermediários (PI) e material de embalagem (ME) importados submetidos a regime especial de drawback - suspensão/isenção, remetidos diretamente a empresas industriais exportadoras - Art. 43 Inciso IV do Decreto 7.212/2010" },
                { codigo: "105", descricao: "Produtos, destinados à exportação, que saiam do estabelecimento industrial para empresas comerciais exportadoras, com o fim específico de exportação - Art. 43, Inciso V, alínea 'a' do Decreto 7.212/2010" },
                { codigo: "106", descricao: "Produtos, destinados à exportação, que saiam do estabelecimento industrial para recintos alfandegados onde se processe o despacho aduaneiro de exportação - Art. 43, Inciso V, alínea 'b' do Decreto 7.212/2010" },
                { codigo: "107", descricao: "Produtos, destinados à exportação, que saiam do estabelecimento industrial para outros locais onde se processe o despacho aduaneiro de exportação - Art. 43, Inciso V, alíneas 'c' do Decreto 7.212/2010" },
                { codigo: "108", descricao: "Matérias-primas (MP), produtos intermediários (PI) e material de embalagem (ME) destinados ao executor de industrialização por encomenda - Art. 43 Inciso VI do Decreto 7.212/2010" },
                { codigo: "109", descricao: "Produtos industrializados por encomenda remetidos ao estabelecimento de origem - Art. 43 Inciso VII do Decreto 7.212/2010" },
                { codigo: "110", descricao: "Matérias-primas ou produtos intermediários remetidos para emprego em operação industrial realizada pelo remetente fora do estabelecimento - Art. 43 Inciso VIII do Decreto 7.212/2010" },
              ].filter(item => 
                !codigoEnquadramentoSearch || 
                item.codigo.includes(codigoEnquadramentoSearch) ||
                item.descricao.toLowerCase().includes(codigoEnquadramentoSearch.toLowerCase())
              ).map((item) => (
                <div 
                  key={item.codigo}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                    codigoEnquadramentoIPI === item.codigo ? 'bg-primary text-primary-foreground' : ''
                  }`}
                  onClick={() => setCodigoEnquadramentoIPI(item.codigo)}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-medium">{item.codigo}:</span>
                    <span className="flex-1 text-sm">{item.descricao}</span>
                    {codigoEnquadramentoIPI === item.codigo && (
                      <div className="h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCodigoEnquadramentoSheetOpen(false);
                  setCodigoEnquadramentoSearch("");
                }}
              >
                cancelar
              </Button>
              <Button 
                onClick={() => {
                  setCodigoEnquadramentoSheetOpen(false);
                  setCodigoEnquadramentoSearch("");
                }}
                disabled={!codigoEnquadramentoIPI}
              >
                confirmar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Dialog>
  );
};

export default NaturezaOperacaoDialog;
