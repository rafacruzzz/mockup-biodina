import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Trash2, Download } from "lucide-react";
import { useState } from "react";

interface NovoPedidoModalProps {
  onClose: () => void;
}

const NovoPedidoModal = ({ onClose }: NovoPedidoModalProps) => {
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [nfGerada, setNfGerada] = useState(false);
  const [recebimentoConfirmado, setRecebimentoConfirmado] = useState(false);

  const [formData, setFormData] = useState({
    // Dados Gerais
    numero: "",
    data: "",
    codFornecedor: "",
    fornecedor: "",
    vendedor: "",
    condicaoPagamento: "",
    observacoes: "",
    frete: 0,
    desconto: 0,
    // Processo de Importação
    tipoNota: "entrada",
    naturezaOperacao: "compra",
    finalidade: "normal",
    dataEmissao: "",
    dataSaida: "",
    emitenteRazaoSocial: "",
    emitenteCnpj: "",
    emitenteIe: "",
    emitenteEndereco: "",
    destinatarioRazaoSocial: "",
    destinatarioCnpj: "",
    destinatarioIe: "",
    destinatarioEndereco: "",
    modalidadeFrete: "cif",
    transportadora: "",
    placa: "",
    informacoesAdicionais: ""
  });

  const [produtos, setProdutos] = useState([
    { id: 1, codigo: "", descricao: "", quantidade: 0, valorUnitario: 0, total: 0, ncm: "", cfop: "", origem: "", cst: "", aliqIcms: 0, aliqIpi: 0 }
  ]);

  const [itensRecebimento, setItensRecebimento] = useState([
    { 
      id: 1, 
      produto: "", 
      qtdPedido: 0, 
      qtdRecebida: 0, 
      lote: "", 
      numeroSerie: "", 
      dataVencimento: "", 
      destino: "estoque", 
      cnpjDestino: "", 
      localizacao: "" 
    }
  ]);

  const addProduto = () => {
    setProdutos([...produtos, { id: produtos.length + 1, codigo: "", descricao: "", quantidade: 0, valorUnitario: 0, total: 0, ncm: "", cfop: "", origem: "", cst: "", aliqIcms: 0, aliqIpi: 0 }]);
  };

  const removeProduto = (id: number) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  const updateProduto = (id: number, field: string, value: any) => {
    setProdutos(
      produtos.map((produto) =>
        produto.id === id ? { ...produto, [field]: value, total: produto.quantidade * produto.valorUnitario } : produto
      )
    );
  };

  const calcularTotal = () => {
    return produtos.reduce((acc, produto) => acc + (produto.total || 0), 0);
  };

  const addItemRecebimento = () => {
    setItensRecebimento([
      ...itensRecebimento,
      { id: itensRecebimento.length + 1, produto: "", qtdPedido: 0, qtdRecebida: 0, lote: "", numeroSerie: "", dataVencimento: "", destino: "estoque", cnpjDestino: "", localizacao: "" },
    ]);
  };

  const removeItemRecebimento = (id: number) => {
    setItensRecebimento(itensRecebimento.filter((item) => item.id !== id));
  };

  const updateItemRecebimento = (id: number, field: string, value: any) => {
    setItensRecebimento(
      itensRecebimento.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const gerarXmlNf = () => {
    // Simular preenchimento automático dos campos
    const dadosSimulados = {
      ...formData,
      numero: "000001234",
      dataEmissao: new Date().toISOString().split('T')[0],
      dataSaida: new Date().toISOString().split('T')[0],
      emitenteRazaoSocial: "FORNECEDOR LTDA",
      emitenteCnpj: "12.345.678/0001-90",
      emitenteIe: "123456789",
      emitenteEndereco: "Rua do Fornecedor, 123 - Centro",
      destinatarioRazaoSocial: "MINHA EMPRESA LTDA",
      destinatarioCnpj: "98.765.432/0001-10",
      destinatarioIe: "987654321",
      destinatarioEndereco: "Rua da Empresa, 456 - Industrial",
      transportadora: "TRANSPORTES RAPIDOS LTDA",
      placa: "ABC-1234"
    };

    setFormData(dadosSimulados);

    // Gerar XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<nfeProc versao="4.00">
  <NFe>
    <infNFe Id="NFe${dadosSimulados.destinatarioCnpj.replace(/\D/g, '')}${dadosSimulados.numero}">
      <ide>
        <cUF>35</cUF>
        <cNF>${dadosSimulados.numero}</cNF>
        <natOp>${dadosSimulados.naturezaOperacao}</natOp>
        <mod>55</mod>
        <serie>1</serie>
        <nNF>${dadosSimulados.numero}</nNF>
        <dhEmi>${new Date().toISOString()}</dhEmi>
        <dhSaiEnt>${new Date().toISOString()}</dhSaiEnt>
        <tpNF>0</tpNF>
        <idDest>1</idDest>
        <cMunFG>3550308</cMunFG>
        <tpImp>1</tpImp>
        <tpEmis>1</tpEmis>
        <cDV>1</cDV>
        <tpAmb>2</tpAmb>
        <finNFe>1</finNFe>
        <indFinal>0</indFinal>
        <indPres>1</indPres>
      </ide>
      <emit>
        <CNPJ>${dadosSimulados.emitenteCnpj.replace(/\D/g, '')}</CNPJ>
        <xNome>${dadosSimulados.emitenteRazaoSocial}</xNome>
        <enderEmit>
          <xLgr>Rua do Fornecedor</xLgr>
          <nro>123</nro>
          <xBairro>Centro</xBairro>
          <cMun>3550308</cMun>
          <xMun>São Paulo</xMun>
          <UF>SP</UF>
          <CEP>01000000</CEP>
        </enderEmit>
        <IE>${dadosSimulados.emitenteIe}</IE>
      </emit>
      <dest>
        <CNPJ>${dadosSimulados.destinatarioCnpj.replace(/\D/g, '')}</CNPJ>
        <xNome>${dadosSimulados.destinatarioRazaoSocial}</xNome>
        <enderDest>
          <xLgr>Rua da Empresa</xLgr>
          <nro>456</nro>
          <xBairro>Industrial</xBairro>
          <cMun>3550308</cMun>
          <xMun>São Paulo</xMun>
          <UF>SP</UF>
          <CEP>01000000</CEP>
        </enderDest>
        <IE>${dadosSimulados.destinatarioIe}</IE>
      </dest>
      ${produtos.map((produto, index) => `
      <det nItem="${index + 1}">
        <prod>
          <cProd>${produto.codigo || `PROD${index + 1}`}</cProd>
          <cEAN></cEAN>
          <xProd>${produto.descricao || `Produto ${index + 1}`}</xProd>
          <NCM>${produto.ncm || '12345678'}</NCM>
          <CFOP>${produto.cfop || '1102'}</CFOP>
          <uCom>UN</uCom>
          <qCom>${produto.quantidade || 1}</qCom>
          <vUnCom>${produto.valorUnitario || 100}</vUnCom>
          <vProd>${produto.total || produto.quantidade * produto.valorUnitario}</vProd>
          <cEANTrib></cEANTrib>
          <uTrib>UN</uTrib>
          <qTrib>${produto.quantidade || 1}</qTrib>
          <vUnTrib>${produto.valorUnitario || 100}</vUnTrib>
        </prod>
        <imposto>
          <ICMS>
            <ICMS00>
              <orig>${produto.origem || '0'}</orig>
              <CST>${produto.cst || '00'}</CST>
              <modBC>3</modBC>
              <vBC>${produto.total || 100}</vBC>
              <pICMS>${produto.aliqIcms || 18}</pICMS>
              <vICMS>${((produto.total || 100) * (produto.aliqIcms || 18)) / 100}</vICMS>
            </ICMS00>
          </ICMS>
          <IPI>
            <IPITrib>
              <CST>50</CST>
              <vBC>${produto.total || 100}</vBC>
              <pIPI>${produto.aliqIpi || 0}</pIPI>
              <vIPI>${((produto.total || 100) * (produto.aliqIpi || 0)) / 100}</vIPI>
            </IPITrib>
          </IPI>
        </imposto>
      </det>
      `).join('')}
      <total>
        <ICMSTot>
          <vBC>${calcularTotal()}</vBC>
          <vICMS>${(calcularTotal() * 0.18).toFixed(2)}</vICMS>
          <vICMSDeson>0.00</vICMSDeson>
          <vFCP>0.00</vFCP>
          <vBCST>0.00</vBCST>
          <vST>0.00</vST>
          <vFCPST>0.00</vFCPST>
          <vFCPSTRet>0.00</vFCPSTRet>
          <vProd>${calcularTotal()}</vProd>
          <vFrete>${formData.frete}</vFrete>
          <vSeg>0.00</vSeg>
          <vDesc>${formData.desconto}</vDesc>
          <vII>0.00</vII>
          <vIPI>0.00</vIPI>
          <vIPIDevol>0.00</vIPIDevol>
          <vPIS>0.00</vPIS>
          <vCOFINS>0.00</vCOFINS>
          <vOutro>0.00</vOutro>
          <vNF>${calcularTotal() + formData.frete - formData.desconto}</vNF>
        </ICMSTot>
      </total>
      <transp>
        <modFrete>0</modFrete>
        <transporta>
          <xNome>${dadosSimulados.transportadora}</xNome>
        </transporta>
        <veicTransp>
          <placa>${dadosSimulados.placa}</placa>
          <UF>SP</UF>
        </veicTransp>
      </transp>
      <infAdic>
        <infCpl>${formData.informacoesAdicionais || 'Nota Fiscal gerada automaticamente'}</infCpl>
      </infAdic>
    </infNFe>
  </NFe>
</nfeProc>`;

    // Criar e baixar arquivo XML
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NF_${dadosSimulados.numero}_${new Date().getTime()}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setNfGerada(true);
  };

  const confirmarRecebimento = () => {
    // Simular dados de recebimento baseados nos produtos
    const itensSimulados = produtos.map((produto, index) => ({
      id: index + 1,
      produto: produto.descricao || `Produto ${index + 1}`,
      qtdPedido: produto.quantidade,
      qtdRecebida: produto.quantidade,
      lote: `LOTE${String(index + 1).padStart(3, '0')}`,
      numeroSerie: `SN${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
      dataVencimento: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      destino: "estoque",
      cnpjDestino: "98.765.432/0001-10",
      localizacao: "A-01-001"
    }));

    setItensRecebimento(itensSimulados);
    setRecebimentoConfirmado(true);
    setActiveTab("recebimento");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Novo Pedido de Compra</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="processo-importacao">Processo de Importação</TabsTrigger>
              <TabsTrigger 
                value="recebimento" 
                disabled={!recebimentoConfirmado}
                className={recebimentoConfirmado ? "" : "opacity-50"}
              >
                Recebimento
              </TabsTrigger>
            </TabsList>

            {/* Aba Dados Gerais */}
            <TabsContent value="dados-gerais" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero">Número do Pedido</Label>
                  <Input type="text" id="numero" value={formData.numero} onChange={(e) => setFormData({ ...formData, numero: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="data">Data do Pedido</Label>
                  <Input type="date" id="data" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="codFornecedor">Código do Fornecedor</Label>
                  <Input type="text" id="codFornecedor" value={formData.codFornecedor} onChange={(e) => setFormData({ ...formData, codFornecedor: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="fornecedor">Fornecedor</Label>
                  <Input type="text" id="fornecedor" value={formData.fornecedor} onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="vendedor">Vendedor</Label>
                  <Input type="text" id="vendedor" value={formData.vendedor} onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="condicaoPagamento">Condição de Pagamento</Label>
                  <Input type="text" id="condicaoPagamento" value={formData.condicaoPagamento} onChange={(e) => setFormData({ ...formData, condicaoPagamento: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frete">Frete</Label>
                  <Input type="number" id="frete" value={formData.frete} onChange={(e) => setFormData({ ...formData, frete: parseFloat(e.target.value) })} />
                </div>
                <div>
                  <Label htmlFor="desconto">Desconto</Label>
                  <Input type="number" id="desconto" value={formData.desconto} onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) })} />
                </div>
              </div>

              {/* Produtos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">Produtos</h4>
                  <Button type="button" variant="outline" size="sm" onClick={addProduto}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Valor Unitário</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>NCM</TableHead>
                        <TableHead>CFOP</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>CST</TableHead>
                        <TableHead>Aliq. ICMS</TableHead>
                        <TableHead>Aliq. IPI</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {produtos.map((produto) => (
                        <TableRow key={produto.id}>
                          <TableCell>
                            <Input type="text" value={produto.codigo} onChange={(e) => updateProduto(produto.id, "codigo", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={produto.descricao} onChange={(e) => updateProduto(produto.id, "descricao", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" value={produto.quantidade} onChange={(e) => updateProduto(produto.id, "quantidade", parseFloat(e.target.value))} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" value={produto.valorUnitario} onChange={(e) => updateProduto(produto.id, "valorUnitario", parseFloat(e.target.value))} />
                          </TableCell>
                          <TableCell>{produto.total?.toFixed(2)}</TableCell>
                           <TableCell>
                            <Input type="text" value={produto.ncm} onChange={(e) => updateProduto(produto.id, "ncm", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={produto.cfop} onChange={(e) => updateProduto(produto.id, "cfop", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={produto.origem} onChange={(e) => updateProduto(produto.id, "origem", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={produto.cst} onChange={(e) => updateProduto(produto.id, "cst", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" value={produto.aliqIcms} onChange={(e) => updateProduto(produto.id, "aliqIcms", parseFloat(e.target.value))} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" value={produto.aliqIpi} onChange={(e) => updateProduto(produto.id, "aliqIpi", parseFloat(e.target.value))} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => removeProduto(produto.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="text-right font-bold">
                  Total do Pedido: {calcularTotal().toFixed(2)}
                </div>
              </div>
            </TabsContent>

            {/* Aba Processo de Importação */}
            <TabsContent value="processo-importacao" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoNota">Tipo de Nota</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, tipoNota: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" defaultValue={formData.tipoNota} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="naturezaOperacao">Natureza da Operação</Label>
                  <Input type="text" id="naturezaOperacao" value={formData.naturezaOperacao} onChange={(e) => setFormData({ ...formData, naturezaOperacao: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="finalidade">Finalidade da Emissão</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, finalidade: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" defaultValue={formData.finalidade} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="complementar">Complementar</SelectItem>
                      <SelectItem value="ajuste">Ajuste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataEmissao">Data de Emissão</Label>
                  <Input type="date" id="dataEmissao" value={formData.dataEmissao} onChange={(e) => setFormData({ ...formData, dataEmissao: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="dataSaida">Data de Saída</Label>
                  <Input type="date" id="dataSaida" value={formData.dataSaida} onChange={(e) => setFormData({ ...formData, dataSaida: e.target.value })} />
                </div>
              </div>

              <h4 className="text-sm font-bold">Dados do Emitente</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emitenteRazaoSocial">Razão Social</Label>
                  <Input type="text" id="emitenteRazaoSocial" value={formData.emitenteRazaoSocial} onChange={(e) => setFormData({ ...formData, emitenteRazaoSocial: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="emitenteCnpj">CNPJ</Label>
                  <Input type="text" id="emitenteCnpj" value={formData.emitenteCnpj} onChange={(e) => setFormData({ ...formData, emitenteCnpj: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="emitenteIe">Inscrição Estadual</Label>
                  <Input type="text" id="emitenteIe" value={formData.emitenteIe} onChange={(e) => setFormData({ ...formData, emitenteIe: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="emitenteEndereco">Endereço</Label>
                  <Input type="text" id="emitenteEndereco" value={formData.emitenteEndereco} onChange={(e) => setFormData({ ...formData, emitenteEndereco: e.target.value })} />
                </div>
              </div>

              <h4 className="text-sm font-bold">Dados do Destinatário</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destinatarioRazaoSocial">Razão Social</Label>
                  <Input type="text" id="destinatarioRazaoSocial" value={formData.destinatarioRazaoSocial} onChange={(e) => setFormData({ ...formData, destinatarioRazaoSocial: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="destinatarioCnpj">CNPJ</Label>
                  <Input type="text" id="destinatarioCnpj" value={formData.destinatarioCnpj} onChange={(e) => setFormData({ ...formData, destinatarioCnpj: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="destinatarioIe">Inscrição Estadual</Label>
                  <Input type="text" id="destinatarioIe" value={formData.destinatarioIe} onChange={(e) => setFormData({ ...formData, destinatarioIe: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="destinatarioEndereco">Endereço</Label>
                  <Input type="text" id="destinatarioEndereco" value={formData.destinatarioEndereco} onChange={(e) => setFormData({ ...formData, destinatarioEndereco: e.target.value })} />
                </div>
              </div>

              <h4 className="text-sm font-bold">Dados do Transporte</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modalidadeFrete">Modalidade do Frete</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, modalidadeFrete: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" defaultValue={formData.modalidadeFrete} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cif">CIF</SelectItem>
                      <SelectItem value="fob">FOB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transportadora">Transportadora</Label>
                  <Input type="text" id="transportadora" value={formData.transportadora} onChange={(e) => setFormData({ ...formData, transportadora: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="placa">Placa do Veículo</Label>
                  <Input type="text" id="placa" value={formData.placa} onChange={(e) => setFormData({ ...formData, placa: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="informacoesAdicionais">Informações Adicionais</Label>
                <Textarea id="informacoesAdicionais" value={formData.informacoesAdicionais} onChange={(e) => setFormData({ ...formData, informacoesAdicionais: e.target.value })} />
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col gap-4 pt-6">
                <Button 
                  onClick={gerarXmlNf}
                  className="bg-biodina-blue hover:bg-biodina-blue/90 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Gerar NF de Entrada
                </Button>

                {nfGerada && (
                  <Button 
                    onClick={confirmarRecebimento}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Confirmar Recebimento
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Aba Recebimento */}
            <TabsContent value="recebimento" className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Itens de Recebimento</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Qtd. Pedido</TableHead>
                        <TableHead>Qtd. Recebida</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Número de Série</TableHead>
                        <TableHead>Data de Vencimento</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>CNPJ Destino</TableHead>
                        <TableHead>Localização</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itensRecebimento.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input type="text" value={item.produto} onChange={(e) => updateItemRecebimento(item.id, "produto", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" value={item.qtdPedido} onChange={(e) => updateItemRecebimento(item.id, "qtdPedido", parseFloat(e.target.value))} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" value={item.qtdRecebida} onChange={(e) => updateItemRecebimento(item.id, "qtdRecebida", parseFloat(e.target.value))} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={item.lote} onChange={(e) => updateItemRecebimento(item.id, "lote", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={item.numeroSerie} onChange={(e) => updateItemRecebimento(item.id, "numeroSerie", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="date" value={item.dataVencimento} onChange={(e) => updateItemRecebimento(item.id, "dataVencimento", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={item.destino} onChange={(e) => updateItemRecebimento(item.id, "destino", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={item.cnpjDestino} onChange={(e) => updateItemRecebimento(item.id, "cnpjDestino", e.target.value)} />
                          </TableCell>
                          <TableCell>
                            <Input type="text" value={item.localizacao} onChange={(e) => updateItemRecebimento(item.id, "localizacao", e.target.value)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoPedidoModal;
