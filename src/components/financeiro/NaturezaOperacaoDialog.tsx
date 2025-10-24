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
  const [estadoDestinatario, setEstadoDestinatario] = useState("");
  const [produtos, setProdutos] = useState<Array<{ produto: string; sku: string }>>([]);
  const [novoProduto, setNovoProduto] = useState("");
  const [origens, setOrigens] = useState("");
  const [ncms, setNcms] = useState<string[]>([]);
  const [novoNcm, setNovoNcm] = useState("");

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
              <p className="text-muted-foreground">Configurações de IPI</p>
            </TabsContent>

            <TabsContent value="issqn" className="mt-4">
              <p className="text-muted-foreground">Configurações de ISSQN</p>
            </TabsContent>

            <TabsContent value="pis" className="mt-4">
              <p className="text-muted-foreground">Configurações de PIS</p>
            </TabsContent>

            <TabsContent value="cofins" className="mt-4">
              <p className="text-muted-foreground">Configurações de COFINS</p>
            </TabsContent>

            <TabsContent value="importacao" className="mt-4">
              <p className="text-muted-foreground">Configurações de importação</p>
            </TabsContent>
          </Tabs>

          {/* Exceções */}
          <div className="space-y-2">
            <h3 className="font-semibold">Exceções</h3>
            <Button 
              variant="link" 
              className="text-primary p-0 h-auto"
              onClick={() => setExcecoesSheetOpen(true)}
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
      <Sheet open={excecoesSheetOpen} onOpenChange={setExcecoesSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="space-y-6">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Exceções do Simples</SheetTitle>
                <Button variant="ghost" size="sm" onClick={() => setExcecoesSheetOpen(false)}>
                  fechar
                </Button>
              </div>
            </SheetHeader>

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
                        salvar
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
                        salvar
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

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={() => setExcecoesSheetOpen(false)}>
                Salvar exceções
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Dialog>
  );
};

export default NaturezaOperacaoDialog;
