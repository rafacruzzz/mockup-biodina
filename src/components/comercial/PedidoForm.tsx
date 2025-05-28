
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Save, Plus, Trash2 } from "lucide-react";

interface PedidoFormProps {
  onClose: () => void;
  onSave: (pedido: any) => void;
  oportunidade?: any;
}

const PedidoForm = ({ onClose, onSave, oportunidade }: PedidoFormProps) => {
  const [formData, setFormData] = useState({
    // Campos Gerais
    relacionado: '',
    cliente: oportunidade?.nome || '',
    assunto: '',
    ativo: true,
    situacao: 'em_aberto',
    gerarExpedicao: false,
    localEstoque: '',
    projeto: '',
    categoriaVendas: [],
    dataCadastro: new Date().toISOString().split('T')[0],
    dataVencimento: '',
    previsaoFechamento: '',
    numeroPedido: '',
    numeroContrato: '',
    revisao: '',
    motivoPerda: '',
    operacaoFiscal: '',
    cenarioFiscal: '',
    tabelaPreco: '',
    tags: '',
    
    // Departamentos
    departamentos: [{ departamento: '', tipo: '', valorDistribuicao: 0 }],
    
    // Vendedores
    vendedores: [''],
    
    // Produtos
    produtos: [{
      localEstoque: '',
      produto: '',
      etiqueta: '',
      quantidade: 1,
      valorUnitario: 0,
      tipoDesconto: 'percentual',
      desconto: 0,
      valorTotal: 0,
      utilizadoServico: '',
      largura: 0,
      altura: 0,
      comprimento: 0,
      previsaoCompra: '',
      tabelaPreco: '',
      descricao: '',
      receitaDespesa: 'receita',
      operacaoFiscal: '',
      cenarioFiscal: '',
      icms: 0,
      comissaoVendedor: 0,
      comissaoPercentual: 0,
      comissaoTotal: 0,
      seguro: 0,
      outrasDespesas: 0,
      codigoCFOP: '',
      ordemCompra: '',
      statusOrdemCompra: '',
      deposito: '',
      dataInsercao: new Date().toISOString().split('T')[0],
      dataEstimadaEntrega: '',
      categoriaVendas: ''
    }],
    
    // Serviços
    servicos: [{
      servico: '',
      quantidade: 1,
      valorUnitario: 0,
      tipoDesconto: 'percentual',
      desconto: 0,
      valorTotal: 0,
      descricao: ''
    }],
    
    // Kits
    kits: [{
      kit: '',
      quantidade: 1,
      valorUnitario: 0,
      valorUnitarioPago: 0,
      valorTotal: 0,
      receitaDespesa: 'receita'
    }],
    
    // Itens não cadastrados
    itensNaoCadastrados: [{
      nome: '',
      quantidade: 1,
      valorUnitario: 0,
      tipoDesconto: 'percentual',
      desconto: 0,
      valorTotal: 0,
      descricao: ''
    }],
    
    // Informações Adicionais
    notas: '',
    informacoesNotaFiscal: '',
    termosCondicoes: '',
    
    // Informações de Frete
    tipoFrete: '',
    frete: '',
    aprovado: false,
    transportadora: '',
    valorSeguro: 0,
    outrasDespesasFrete: 0,
    diasEntrega: 0,
    dataEntrega: '',
    numeroLacre: '',
    placaVeiculo: '',
    estadoPlaca: '',
    rntrc: '',
    pesoLiquido: 0,
    pesoBruto: 0,
    quantidadeVolume: 0,
    tipoVolume: '',
    marcaVolume: '',
    numeroVolume: '',
    codigosRastreio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addItem = (section: string) => {
    const newItem = section === 'produtos' ? {
      localEstoque: '', produto: '', etiqueta: '', quantidade: 1, valorUnitario: 0,
      tipoDesconto: 'percentual', desconto: 0, valorTotal: 0, utilizadoServico: '',
      largura: 0, altura: 0, comprimento: 0, previsaoCompra: '', tabelaPreco: '',
      descricao: '', receitaDespesa: 'receita', operacaoFiscal: '', cenarioFiscal: '',
      icms: 0, comissaoVendedor: 0, comissaoPercentual: 0, comissaoTotal: 0,
      seguro: 0, outrasDespesas: 0, codigoCFOP: '', ordemCompra: '',
      statusOrdemCompra: '', deposito: '', dataInsercao: new Date().toISOString().split('T')[0],
      dataEstimadaEntrega: '', categoriaVendas: ''
    } : section === 'servicos' ? {
      servico: '', quantidade: 1, valorUnitario: 0, tipoDesconto: 'percentual',
      desconto: 0, valorTotal: 0, descricao: ''
    } : section === 'kits' ? {
      kit: '', quantidade: 1, valorUnitario: 0, valorUnitarioPago: 0,
      valorTotal: 0, receitaDespesa: 'receita'
    } : section === 'departamentos' ? {
      departamento: '', tipo: '', valorDistribuicao: 0
    } : {
      nome: '', quantidade: 1, valorUnitario: 0, tipoDesconto: 'percentual',
      desconto: 0, valorTotal: 0, descricao: ''
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section as keyof typeof prev] as any[], newItem]
    }));
  };

  const removeItem = (section: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section as keyof typeof prev] as any[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-2xl">Novo Pedido</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="produtos">Produtos</TabsTrigger>
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="kits">Kits</TabsTrigger>
                <TabsTrigger value="adicionais">Adicionais</TabsTrigger>
                <TabsTrigger value="frete">Frete</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="relacionado">Relacionado</Label>
                    <Select value={formData.relacionado} onValueChange={(value) => setFormData({...formData, relacionado: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oportunidade">Oportunidade</SelectItem>
                        <SelectItem value="projeto">Projeto</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cliente">Cliente</Label>
                    <Input
                      id="cliente"
                      value={formData.cliente}
                      onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                      placeholder="Nome do cliente"
                    />
                  </div>

                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input
                      id="assunto"
                      value={formData.assunto}
                      onChange={(e) => setFormData({...formData, assunto: e.target.value})}
                      placeholder="Assunto do pedido"
                    />
                  </div>

                  <div>
                    <Label htmlFor="situacao">Situação</Label>
                    <Select value={formData.situacao} onValueChange={(value) => setFormData({...formData, situacao: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em_aberto">Em Aberto</SelectItem>
                        <SelectItem value="aguardando_importacao">Aguardando Importação</SelectItem>
                        <SelectItem value="faturado">Faturado</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="numeroPedido">Nº do Pedido</Label>
                    <Input
                      id="numeroPedido"
                      value={formData.numeroPedido}
                      onChange={(e) => setFormData({...formData, numeroPedido: e.target.value})}
                      placeholder="Número do pedido"
                    />
                  </div>

                  <div>
                    <Label htmlFor="numeroContrato">Nº do Contrato</Label>
                    <Input
                      id="numeroContrato"
                      value={formData.numeroContrato}
                      onChange={(e) => setFormData({...formData, numeroContrato: e.target.value})}
                      placeholder="Número do contrato"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataCadastro">Data de Cadastro</Label>
                    <Input
                      id="dataCadastro"
                      type="date"
                      value={formData.dataCadastro}
                      onChange={(e) => setFormData({...formData, dataCadastro: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                    <Input
                      id="dataVencimento"
                      type="date"
                      value={formData.dataVencimento}
                      onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ativo" 
                      checked={formData.ativo}
                      onCheckedChange={(checked) => setFormData({...formData, ativo: checked as boolean})}
                    />
                    <Label htmlFor="ativo">Ativo</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gerarExpedicao" 
                      checked={formData.gerarExpedicao}
                      onCheckedChange={(checked) => setFormData({...formData, gerarExpedicao: checked as boolean})}
                    />
                    <Label htmlFor="gerarExpedicao">Gerar Expedição</Label>
                  </div>
                </div>

                {/* Departamentos */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Departamentos</h3>
                    <Button type="button" onClick={() => addItem('departamentos')} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                  {formData.departamentos.map((dept, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded">
                      <div>
                        <Label>Departamento</Label>
                        <Select value={dept.departamento} onValueChange={(value) => {
                          const newDepts = [...formData.departamentos];
                          newDepts[index].departamento = value;
                          setFormData({...formData, departamentos: newDepts});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendas">Vendas</SelectItem>
                            <SelectItem value="tecnico">Técnico</SelectItem>
                            <SelectItem value="financeiro">Financeiro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Tipo</Label>
                        <Select value={dept.tipo} onValueChange={(value) => {
                          const newDepts = [...formData.departamentos];
                          newDepts[index].tipo = value;
                          setFormData({...formData, departamentos: newDepts});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="principal">Principal</SelectItem>
                            <SelectItem value="secundario">Secundário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Valor para Distribuição</Label>
                        <Input
                          type="number"
                          value={dept.valorDistribuicao}
                          onChange={(e) => {
                            const newDepts = [...formData.departamentos];
                            newDepts[index].valorDistribuicao = Number(e.target.value);
                            setFormData({...formData, departamentos: newDepts});
                          }}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button type="button" onClick={() => removeItem('departamentos', index)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vendedores */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Vendedores</h3>
                    <Button type="button" onClick={() => setFormData({...formData, vendedores: [...formData.vendedores, '']})} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                  {formData.vendedores.map((vendedor, index) => (
                    <div key={index} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Label>Vendedor</Label>
                        <Select value={vendedor} onValueChange={(value) => {
                          const newVendedores = [...formData.vendedores];
                          newVendedores[index] = value;
                          setFormData({...formData, vendedores: newVendedores});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o vendedor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="joao">João Silva</SelectItem>
                            <SelectItem value="maria">Maria Santos</SelectItem>
                            <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="button" onClick={() => removeItem('vendedores', index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="produtos" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Produtos</h3>
                  <Button type="button" onClick={() => addItem('produtos')} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </div>
                
                {formData.produtos.map((produto, index) => (
                  <div key={index} className="p-4 border rounded space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Produto {index + 1}</h4>
                      <Button type="button" onClick={() => removeItem('produtos', index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Produto</Label>
                        <Select value={produto.produto} onValueChange={(value) => {
                          const newProdutos = [...formData.produtos];
                          newProdutos[index].produto = value;
                          setFormData({...formData, produtos: newProdutos});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="produto1">Produto 1</SelectItem>
                            <SelectItem value="produto2">Produto 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          value={produto.quantidade}
                          onChange={(e) => {
                            const newProdutos = [...formData.produtos];
                            newProdutos[index].quantidade = Number(e.target.value);
                            setFormData({...formData, produtos: newProdutos});
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label>Valor Unitário</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={produto.valorUnitario}
                          onChange={(e) => {
                            const newProdutos = [...formData.produtos];
                            newProdutos[index].valorUnitario = Number(e.target.value);
                            setFormData({...formData, produtos: newProdutos});
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={produto.descricao}
                        onChange={(e) => {
                          const newProdutos = [...formData.produtos];
                          newProdutos[index].descricao = e.target.value;
                          setFormData({...formData, produtos: newProdutos});
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="servicos" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Serviços</h3>
                  <Button type="button" onClick={() => addItem('servicos')} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Serviço
                  </Button>
                </div>
                
                {formData.servicos.map((servico, index) => (
                  <div key={index} className="p-4 border rounded space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Serviço {index + 1}</h4>
                      <Button type="button" onClick={() => removeItem('servicos', index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Serviço</Label>
                        <Select value={servico.servico} onValueChange={(value) => {
                          const newServicos = [...formData.servicos];
                          newServicos[index].servico = value;
                          setFormData({...formData, servicos: newServicos});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instalacao">Instalação</SelectItem>
                            <SelectItem value="manutencao">Manutenção</SelectItem>
                            <SelectItem value="treinamento">Treinamento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          value={servico.quantidade}
                          onChange={(e) => {
                            const newServicos = [...formData.servicos];
                            newServicos[index].quantidade = Number(e.target.value);
                            setFormData({...formData, servicos: newServicos});
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label>Valor Unitário</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={servico.valorUnitario}
                          onChange={(e) => {
                            const newServicos = [...formData.servicos];
                            newServicos[index].valorUnitario = Number(e.target.value);
                            setFormData({...formData, servicos: newServicos});
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="kits" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Kits</h3>
                  <Button type="button" onClick={() => addItem('kits')} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Kit
                  </Button>
                </div>
                
                {formData.kits.map((kit, index) => (
                  <div key={index} className="p-4 border rounded space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Kit {index + 1}</h4>
                      <Button type="button" onClick={() => removeItem('kits', index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Kit</Label>
                        <Select value={kit.kit} onValueChange={(value) => {
                          const newKits = [...formData.kits];
                          newKits[index].kit = value;
                          setFormData({...formData, kits: newKits});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kit1">Kit Básico</SelectItem>
                            <SelectItem value="kit2">Kit Completo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          value={kit.quantidade}
                          onChange={(e) => {
                            const newKits = [...formData.kits];
                            newKits[index].quantidade = Number(e.target.value);
                            setFormData({...formData, kits: newKits});
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label>Valor Unitário</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={kit.valorUnitario}
                          onChange={(e) => {
                            const newKits = [...formData.kits];
                            newKits[index].valorUnitario = Number(e.target.value);
                            setFormData({...formData, kits: newKits});
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="adicionais" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="notas">Notas</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas}
                    onChange={(e) => setFormData({...formData, notas: e.target.value})}
                    rows={3}
                    placeholder="Observações gerais..."
                  />
                </div>

                <div>
                  <Label htmlFor="informacoesNotaFiscal">Informações de Nota Fiscal</Label>
                  <Textarea
                    id="informacoesNotaFiscal"
                    value={formData.informacoesNotaFiscal}
                    onChange={(e) => setFormData({...formData, informacoesNotaFiscal: e.target.value})}
                    rows={3}
                    placeholder="Informações para nota fiscal..."
                  />
                </div>

                <div>
                  <Label htmlFor="termosCondicoes">Termos & Condições</Label>
                  <Textarea
                    id="termosCondicoes"
                    value={formData.termosCondicoes}
                    onChange={(e) => setFormData({...formData, termosCondicoes: e.target.value})}
                    rows={4}
                    placeholder="Termos e condições do pedido..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="frete" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tipoFrete">Tipo de Frete</Label>
                    <Select value={formData.tipoFrete} onValueChange={(value) => setFormData({...formData, tipoFrete: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cif">CIF</SelectItem>
                        <SelectItem value="fob">FOB</SelectItem>
                        <SelectItem value="por_conta">Por Conta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="transportadora">Transportadora</Label>
                    <Select value={formData.transportadora} onValueChange={(value) => setFormData({...formData, transportadora: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="correios">Correios</SelectItem>
                        <SelectItem value="transportadora1">Transportadora 1</SelectItem>
                        <SelectItem value="transportadora2">Transportadora 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="diasEntrega">Dias para Entrega</Label>
                    <Input
                      id="diasEntrega"
                      type="number"
                      value={formData.diasEntrega}
                      onChange={(e) => setFormData({...formData, diasEntrega: Number(e.target.value)})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataEntrega">Data de Entrega</Label>
                    <Input
                      id="dataEntrega"
                      type="date"
                      value={formData.dataEntrega}
                      onChange={(e) => setFormData({...formData, dataEntrega: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="valorSeguro">Valor do Seguro</Label>
                    <Input
                      id="valorSeguro"
                      type="number"
                      step="0.01"
                      value={formData.valorSeguro}
                      onChange={(e) => setFormData({...formData, valorSeguro: Number(e.target.value)})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="placaVeiculo">Placa do Veículo</Label>
                    <Input
                      id="placaVeiculo"
                      value={formData.placaVeiculo}
                      onChange={(e) => setFormData({...formData, placaVeiculo: e.target.value})}
                      placeholder="ABC-1234"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="aprovado" 
                    checked={formData.aprovado}
                    onCheckedChange={(checked) => setFormData({...formData, aprovado: checked as boolean})}
                  />
                  <Label htmlFor="aprovado">Aprovado</Label>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-6 border-t mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Pedido
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PedidoForm;
