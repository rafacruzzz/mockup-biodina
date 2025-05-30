import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Save, Download, Filter, Plus, Trash2 } from "lucide-react";
import jsPDF from 'jspdf';

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  oportunidade: any;
  onClose: () => void;
  onSave: (formData: any) => void;
}

const ImportacaoDiretaForm = ({ isOpen, oportunidade, onClose, onSave }: ImportacaoDiretaFormProps) => {
  const [abaSuperior, setAbaSuperior] = useState("COMERCIAL");
  const [abaInferior, setAbaInferior] = useState("Dados Gerais");

  // Add safety check for oportunidade object
  const cliente = oportunidade?.cliente || {};
  const oportunidadeData = oportunidade || {};

  // Estados para dados SPI
  const [dadosSPI, setDadosSPI] = useState({
    numeroSPI: '',
    projeto: '',
    comprador: '',
    cnpj: '',
    vendedor: '',
    telefone: '',
    email: '',
    enderecoEntrega: '',
    prazoEntrega: '',
    condicoesPagamento: '',
    incoterm: '',
    moeda: 'USD',
    observacoes: '',
    produtos: [
      { codigo: '', descricao: '', quantidade: 1, unidade: 'UN', observacoes: '' }
    ]
  });

  // Estados para dados OVC
  const [dadosOVC, setDadosOVC] = useState({
    numeroOVC: '',
    cliente: '',
    projeto: '',
    vendedor: '',
    data: '',
    condicoesPagamento: '',
    prazoEntrega: '',
    produtos: [
      { 
        codigo: '', 
        descricao: '', 
        quantidade: 1, 
        precoUnitario: 0, 
        observacoes: '',
        descontoRmed: 0,
        descontoBiodina: 0
      }
    ]
  });

  // Estados para empréstimos
  const [emprestimos, setEmprestimos] = useState([
    {
      id: 1,
      produto: "Equipamento de Análise ABL800",
      dataEnvio: "2024-01-15",
      status: "Em trânsito",
      responsavel: "João Silva",
      observacoes: "Envio para teste de 30 dias"
    },
    {
      id: 2,
      produto: "Reagentes Kit Teste",
      dataEnvio: "2024-01-10",
      status: "Alocado",
      responsavel: "Maria Santos",
      observacoes: "Cliente solicitou extensão"
    }
  ]);

  const [devolucoes, setDevolucoes] = useState([
    {
      id: 1,
      produto: "Equipamento de Análise ABL700",
      dataEnvio: "2023-12-01",
      dataDevolucao: "2024-01-05",
      status: "Devolvido",
      responsavel: "Carlos Lima",
      observacoes: "Devolvido em perfeito estado"
    }
  ]);

  const [filtroEmprestimos, setFiltroEmprestimos] = useState("");
  const [filtroDevolucoes, setFiltroDevolucoes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      tipo: 'importacao_direta',
      dadosSPI,
      dadosOVC,
      emprestimos,
      devolucoes,
      oportunidadeId: oportunidade.id
    };
    onSave(formData);
  };

  const adicionarProdutoSPI = () => {
    setDadosSPI(prev => ({
      ...prev,
      produtos: [...prev.produtos, { codigo: '', descricao: '', quantidade: 1, unidade: 'UN', observacoes: '' }]
    }));
  };

  const removerProdutoSPI = (index: number) => {
    setDadosSPI(prev => ({
      ...prev,
      produtos: prev.produtos.filter((_, i) => i !== index)
    }));
  };

  const adicionarProdutoOVC = () => {
    setDadosOVC(prev => ({
      ...prev,
      produtos: [...prev.produtos, { 
        codigo: '', 
        descricao: '', 
        quantidade: 1, 
        precoUnitario: 0, 
        observacoes: '',
        descontoRmed: 0,
        descontoBiodina: 0
      }]
    }));
  };

  const removerProdutoOVC = (index: number) => {
    setDadosOVC(prev => ({
      ...prev,
      produtos: prev.produtos.filter((_, i) => i !== index)
    }));
  };

  const gerarPDFSPI = () => {
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFontSize(16);
    doc.text('SPI – SOLICITAÇÃO DE PROFORMA INVOICE', 20, 20);
    
    // Dados do formulário
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Número SPI: ${dadosSPI.numeroSPI}`, 20, y);
    y += 10;
    doc.text(`Projeto: ${dadosSPI.projeto}`, 20, y);
    y += 10;
    doc.text(`Comprador: ${dadosSPI.comprador}`, 20, y);
    y += 10;
    doc.text(`CNPJ: ${dadosSPI.cnpj}`, 20, y);
    y += 10;
    doc.text(`Vendedor: ${dadosSPI.vendedor}`, 20, y);
    y += 20;
    
    // Produtos
    doc.text('PRODUTOS/MERCADORIAS:', 20, y);
    y += 10;
    
    dadosSPI.produtos.forEach((produto, index) => {
      if (produto.codigo || produto.descricao) {
        doc.text(`${index + 1}. ${produto.codigo} - ${produto.descricao}`, 20, y);
        y += 8;
        doc.text(`   Quantidade: ${produto.quantidade} ${produto.unidade}`, 20, y);
        y += 8;
        if (produto.observacoes) {
          doc.text(`   Observações: ${produto.observacoes}`, 20, y);
          y += 8;
        }
        y += 5;
      }
    });
    
    const fileName = `SPI_${dadosSPI.numeroSPI || 'novo'}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };

  const calcularTotalOVC = (produto: any) => {
    const precoTotal = produto.quantidade * produto.precoUnitario;
    const descontoMedio = (produto.descontoRmed + produto.descontoBiodina) / 2;
    const desconto = precoTotal * (descontoMedio / 100);
    const subtotal = precoTotal - desconto;
    const taxaManuseio = subtotal * 0.03;
    const total = subtotal + taxaManuseio;
    const comissao = total * 0.25; // 25% padrão
    const netRadiometer = total - comissao;
    
    return {
      precoTotal,
      descontoMedio,
      desconto,
      subtotal,
      taxaManuseio,
      total,
      comissao,
      netRadiometer
    };
  };

  const calcularTotaisGerais = () => {
    return dadosOVC.produtos.reduce((acc, produto) => {
      const calc = calcularTotalOVC(produto);
      return {
        precoTotal: acc.precoTotal + calc.precoTotal,
        desconto: acc.desconto + calc.desconto,
        subtotal: acc.subtotal + calc.subtotal,
        taxaManuseio: acc.taxaManuseio + calc.taxaManuseio,
        total: acc.total + calc.total,
        comissao: acc.comissao + calc.comissao,
        netRadiometer: acc.netRadiometer + calc.netRadiometer
      };
    }, {
      precoTotal: 0,
      desconto: 0,
      subtotal: 0,
      taxaManuseio: 0,
      total: 0,
      comissao: 0,
      netRadiometer: 0
    });
  };

  const emprestimosFiltrados = emprestimos.filter(emp => 
    filtroEmprestimos === "" || emp.status === filtroEmprestimos
  );

  const devolucoesFiltradas = devolucoes.filter(dev => 
    filtroDevolucoes === "" || dev.status === filtroDevolucoes
  );

  const abasSuperior = ["COMERCIAL", "SPI", "OVC", "NOD/SO", "DDR"];
  const abasInferior = abaSuperior === "COMERCIAL" 
    ? ["Dados Gerais", "Análise Técnica", "Histórico/Chat", "Documentos", "Empréstimos"]
    : [];

  const renderConteudoSPI = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">SPI – SOLICITAÇÃO DE PROFORMA INVOICE</h3>
        <Button 
          onClick={gerarPDFSPI}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="numeroSPI">Número SPI</Label>
          <Input
            id="numeroSPI"
            value={dadosSPI.numeroSPI}
            onChange={(e) => setDadosSPI({...dadosSPI, numeroSPI: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="projeto">Projeto</Label>
          <Input
            id="projeto"
            value={dadosSPI.projeto}
            onChange={(e) => setDadosSPI({...dadosSPI, projeto: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="comprador">Comprador</Label>
          <Input
            id="comprador"
            value={dadosSPI.comprador}
            onChange={(e) => setDadosSPI({...dadosSPI, comprador: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={dadosSPI.cnpj}
            onChange={(e) => setDadosSPI({...dadosSPI, cnpj: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="vendedor">Vendedor</Label>
          <Input
            id="vendedor"
            value={dadosSPI.vendedor}
            onChange={(e) => setDadosSPI({...dadosSPI, vendedor: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={dadosSPI.telefone}
            onChange={(e) => setDadosSPI({...dadosSPI, telefone: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={dadosSPI.email}
            onChange={(e) => setDadosSPI({...dadosSPI, email: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="enderecoEntrega">Endereço de Entrega</Label>
        <Textarea
          id="enderecoEntrega"
          value={dadosSPI.enderecoEntrega}
          onChange={(e) => setDadosSPI({...dadosSPI, enderecoEntrega: e.target.value})}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
          <Input
            id="prazoEntrega"
            value={dadosSPI.prazoEntrega}
            onChange={(e) => setDadosSPI({...dadosSPI, prazoEntrega: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
          <Input
            id="condicoesPagamento"
            value={dadosSPI.condicoesPagamento}
            onChange={(e) => setDadosSPI({...dadosSPI, condicoesPagamento: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="incoterm">Incoterm</Label>
          <Select value={dadosSPI.incoterm} onValueChange={(value) => setDadosSPI({...dadosSPI, incoterm: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o Incoterm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FOB">FOB</SelectItem>
              <SelectItem value="CIF">CIF</SelectItem>
              <SelectItem value="EXW">EXW</SelectItem>
              <SelectItem value="DDP">DDP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="moeda">Moeda</Label>
          <Select value={dadosSPI.moeda} onValueChange={(value) => setDadosSPI({...dadosSPI, moeda: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="BRL">BRL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-semibold">PRODUTOS/MERCADORIAS</h4>
          <Button onClick={adicionarProdutoSPI} size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>
        
        {dadosSPI.produtos.map((produto, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Produto {index + 1}</h5>
              {dadosSPI.produtos.length > 1 && (
                <Button 
                  onClick={() => removerProdutoSPI(index)} 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Código do Produto</Label>
                <Input
                  value={produto.codigo}
                  onChange={(e) => {
                    const novosProdutos = [...dadosSPI.produtos];
                    novosProdutos[index].codigo = e.target.value;
                    setDadosSPI({...dadosSPI, produtos: novosProdutos});
                  }}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Input
                  value={produto.descricao}
                  onChange={(e) => {
                    const novosProdutos = [...dadosSPI.produtos];
                    novosProdutos[index].descricao = e.target.value;
                    setDadosSPI({...dadosSPI, produtos: novosProdutos});
                  }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => {
                    const novosProdutos = [...dadosSPI.produtos];
                    novosProdutos[index].quantidade = Number(e.target.value);
                    setDadosSPI({...dadosSPI, produtos: novosProdutos});
                  }}
                />
              </div>
              <div>
                <Label>Unidade</Label>
                <Select 
                  value={produto.unidade} 
                  onValueChange={(value) => {
                    const novosProdutos = [...dadosSPI.produtos];
                    novosProdutos[index].unidade = value;
                    setDadosSPI({...dadosSPI, produtos: novosProdutos});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UN">Unidade</SelectItem>
                    <SelectItem value="PC">Peça</SelectItem>
                    <SelectItem value="KG">Quilograma</SelectItem>
                    <SelectItem value="L">Litro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Observações</Label>
              <Textarea
                value={produto.observacoes}
                onChange={(e) => {
                  const novosProdutos = [...dadosSPI.produtos];
                  novosProdutos[index].observacoes = e.target.value;
                  setDadosSPI({...dadosSPI, produtos: novosProdutos});
                }}
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="observacoesSPI">Observações Gerais</Label>
        <Textarea
          id="observacoesSPI"
          value={dadosSPI.observacoes}
          onChange={(e) => setDadosSPI({...dadosSPI, observacoes: e.target.value})}
          rows={3}
        />
      </div>
    </div>
  );

  const renderConteudoOVC = () => {
    const totaisGerais = calcularTotaisGerais();
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">OVC – ORÇAMENTO DE VENDA AO CLIENTE</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numeroOVC">Número OVC</Label>
            <Input
              id="numeroOVC"
              value={dadosOVC.numeroOVC}
              onChange={(e) => setDadosOVC({...dadosOVC, numeroOVC: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="clienteOVC">Cliente</Label>
            <Input
              id="clienteOVC"
              value={dadosOVC.cliente}
              onChange={(e) => setDadosOVC({...dadosOVC, cliente: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="projetoOVC">Projeto</Label>
            <Input
              id="projetoOVC"
              value={dadosOVC.projeto}
              onChange={(e) => setDadosOVC({...dadosOVC, projeto: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="vendedorOVC">Vendedor</Label>
            <Input
              id="vendedorOVC"
              value={dadosOVC.vendedor}
              onChange={(e) => setDadosOVC({...dadosOVC, vendedor: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="dataOVC">Data</Label>
            <Input
              id="dataOVC"
              type="date"
              value={dadosOVC.data}
              onChange={(e) => setDadosOVC({...dadosOVC, data: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="condicoesPagamentoOVC">Condições de Pagamento</Label>
            <Input
              id="condicoesPagamentoOVC"
              value={dadosOVC.condicoesPagamento}
              onChange={(e) => setDadosOVC({...dadosOVC, condicoesPagamento: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="prazoEntregaOVC">Prazo de Entrega</Label>
            <Input
              id="prazoEntregaOVC"
              value={dadosOVC.prazoEntrega}
              onChange={(e) => setDadosOVC({...dadosOVC, prazoEntrega: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-semibold">PRODUTOS</h4>
            <Button onClick={adicionarProdutoOVC} size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
          
          {dadosOVC.produtos.map((produto, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Produto {index + 1}</h5>
                {dadosOVC.produtos.length > 1 && (
                  <Button 
                    onClick={() => removerProdutoOVC(index)} 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Código do Produto</Label>
                  <Input
                    value={produto.codigo}
                    onChange={(e) => {
                      const novosProdutos = [...dadosOVC.produtos];
                      novosProdutos[index].codigo = e.target.value;
                      setDadosOVC({...dadosOVC, produtos: novosProdutos});
                    }}
                  />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Input
                    value={produto.descricao}
                    onChange={(e) => {
                      const novosProdutos = [...dadosOVC.produtos];
                      novosProdutos[index].descricao = e.target.value;
                      setDadosOVC({...dadosOVC, produtos: novosProdutos});
                    }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    value={produto.quantidade}
                    onChange={(e) => {
                      const novosProdutos = [...dadosOVC.produtos];
                      novosProdutos[index].quantidade = Number(e.target.value);
                      setDadosOVC({...dadosOVC, produtos: novosProdutos});
                    }}
                  />
                </div>
                <div>
                  <Label>Preço Unitário ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={produto.precoUnitario}
                    onChange={(e) => {
                      const novosProdutos = [...dadosOVC.produtos];
                      novosProdutos[index].precoUnitario = Number(e.target.value);
                      setDadosOVC({...dadosOVC, produtos: novosProdutos});
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Desconto Rmed (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={produto.descontoRmed}
                    onChange={(e) => {
                      const novosProdutos = [...dadosOVC.produtos];
                      novosProdutos[index].descontoRmed = Number(e.target.value);
                      setDadosOVC({...dadosOVC, produtos: novosProdutos});
                    }}
                  />
                </div>
                <div>
                  <Label>Desconto Biodina (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={produto.descontoBiodina}
                    onChange={(e) => {
                      const novosProdutos = [...dadosOVC.produtos];
                      novosProdutos[index].descontoBiodina = Number(e.target.value);
                      setDadosOVC({...dadosOVC, produtos: novosProdutos});
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label>Observações</Label>
                <Textarea
                  value={produto.observacoes}
                  onChange={(e) => {
                    const novosProdutos = [...dadosOVC.produtos];
                    novosProdutos[index].observacoes = e.target.value;
                    setDadosOVC({...dadosOVC, produtos: novosProdutos});
                  }}
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tabela de Resultados/Cálculos */}
        <div className="mt-8">
          <h4 className="text-md font-semibold mb-4">TABELA DE RESULTADOS/CÁLCULOS</h4>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-blue-100">CODE</TableHead>
                  <TableHead className="bg-blue-100">Qty</TableHead>
                  <TableHead className="bg-green-100" colSpan={2}>Price List</TableHead>
                  <TableHead className="bg-yellow-100" colSpan={3}>Customer Discount %</TableHead>
                  <TableHead className="bg-red-100" colSpan={2}>Discount</TableHead>
                  <TableHead className="bg-purple-100" colSpan={2}>Sub total</TableHead>
                  <TableHead className="bg-orange-100">Handling charge (3%)</TableHead>
                  <TableHead className="bg-gray-100">Total</TableHead>
                  <TableHead className="bg-indigo-100">% Commission</TableHead>
                  <TableHead className="bg-pink-100">Commission value</TableHead>
                  <TableHead className="bg-cyan-100">Net Radiometer</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead className="bg-green-100">Unit</TableHead>
                  <TableHead className="bg-green-100">Total</TableHead>
                  <TableHead className="bg-yellow-100">Rmed</TableHead>
                  <TableHead className="bg-yellow-100">Biodina</TableHead>
                  <TableHead className="bg-yellow-100">Total</TableHead>
                  <TableHead className="bg-red-100">Unit</TableHead>
                  <TableHead className="bg-red-100">Total</TableHead>
                  <TableHead className="bg-purple-100">Unit</TableHead>
                  <TableHead className="bg-purple-100">Total</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosOVC.produtos.map((produto, index) => {
                  const calc = calcularTotalOVC(produto);
                  return (
                    <TableRow key={index}>
                      <TableCell>{produto.codigo || '#N/D'}</TableCell>
                      <TableCell>{produto.quantidade}</TableCell>
                      <TableCell className="text-right">${produto.precoUnitario.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${calc.precoTotal.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{produto.descontoRmed}%</TableCell>
                      <TableCell className="text-right">{produto.descontoBiodina}%</TableCell>
                      <TableCell className="text-right">{calc.descontoMedio.toFixed(1)}%</TableCell>
                      <TableCell className="text-right">${(produto.precoUnitario * calc.descontoMedio / 100).toFixed(2)}</TableCell>
                      <TableCell className="text-right">${calc.desconto.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${(calc.subtotal / produto.quantidade).toFixed(2)}</TableCell>
                      <TableCell className="text-right">${calc.subtotal.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${calc.taxaManuseio.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold">${calc.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">25%</TableCell>
                      <TableCell className="text-right">${calc.comissao.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold">${calc.netRadiometer.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-gray-50 font-semibold">
                  <TableCell colSpan={2}>TOTAIS</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">${totaisGerais.precoTotal.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">${totaisGerais.desconto.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">${totaisGerais.subtotal.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${totaisGerais.taxaManuseio.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold">${totaisGerais.total.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">${totaisGerais.comissao.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold">${totaisGerais.netRadiometer.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  };

  const renderConteudoEmprestimos = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Gestão de Empréstimos</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Tabela de Empréstimos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-blue-600">🟣 Empréstimos</h4>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={filtroEmprestimos} onValueChange={setFiltroEmprestimos}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="Preparação">Preparação</SelectItem>
                  <SelectItem value="Alocado">Alocado</SelectItem>
                  <SelectItem value="Em trânsito">Em trânsito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Data de envio</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emprestimosFiltrados.map((emprestimo) => (
                <TableRow key={emprestimo.id}>
                  <TableCell>{emprestimo.produto}</TableCell>
                  <TableCell>{emprestimo.dataEnvio}</TableCell>
                  <TableCell>
                    <Badge variant={
                      emprestimo.status === "Em trânsito" ? "default" :
                      emprestimo.status === "Alocado" ? "secondary" :
                      "outline"
                    }>
                      {emprestimo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{emprestimo.responsavel}</TableCell>
                  <TableCell>{emprestimo.observacoes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Tabela de Devoluções */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-green-600">🟢 Devoluções</h4>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={filtroDevolucoes} onValueChange={setFiltroDevolucoes}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="Devolvido">Devolvido</SelectItem>
                  <SelectItem value="Parcial">Parcial</SelectItem>
                  <SelectItem value="Aguardando conferência">Aguardando conferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Data de envio</TableHead>
                <TableHead>Data da devolução</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devolucoesFiltradas.map((devolucao) => (
                <TableRow key={devolucao.id}>
                  <TableCell>{devolucao.produto}</TableCell>
                  <TableCell>{devolucao.dataEnvio}</TableCell>
                  <TableCell>{devolucao.dataDevolucao}</TableCell>
                  <TableCell>
                    <Badge variant={
                      devolucao.status === "Devolvido" ? "default" :
                      devolucao.status === "Parcial" ? "secondary" :
                      "outline"
                    }>
                      {devolucao.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{devolucao.responsavel}</TableCell>
                  <TableCell>{devolucao.observacoes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );

  const renderConteudo = () => {
    if (abaSuperior === "SPI") {
      return renderConteudoSPI();
    } else if (abaSuperior === "OVC") {
      return renderConteudoOVC();
    } else if (abaSuperior === "COMERCIAL") {
      if (abaInferior === "Empréstimos") {
        return renderConteudoEmprestimos();
      }
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dados Gerais - {abaInferior}</h3>
          <p className="text-gray-600">Conteúdo da aba {abaInferior} em desenvolvimento.</p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{abaSuperior}</h3>
          <p className="text-gray-600">Conteúdo da aba {abaSuperior} em desenvolvimento.</p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nova Importação Direta - {cliente?.nome || oportunidadeData?.cliente || 'Cliente'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Abas Superiores */}
          <div className="flex border-b mb-4">
            {abasSuperior.map((aba) => (
              <button
                key={aba}
                className={`px-4 py-2 font-medium ${
                  abaSuperior === aba
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setAbaSuperior(aba)}
              >
                {aba}
              </button>
            ))}
          </div>

          {/* Abas Inferiores (apenas para COMERCIAL) */}
          {abaSuperior === "COMERCIAL" && (
            <div className="flex border-b mb-4">
              {abasInferior.map((aba) => (
                <button
                  key={aba}
                  className={`px-4 py-2 text-sm ${
                    abaInferior === aba
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setAbaInferior(aba)}
                >
                  {aba}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderConteudo()}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Importação Direta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportacaoDiretaForm;
