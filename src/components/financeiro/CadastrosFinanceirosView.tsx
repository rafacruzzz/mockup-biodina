import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, Search, Building, CreditCard, Users, Package,
  Edit, Trash2, CheckCircle, AlertCircle
} from "lucide-react";

const CadastrosFinanceirosView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data para cadastros
  const contasBancarias = [
    {
      id: 1,
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "67890-1",
      tipo: "Corrente",
      titular: "Empresa ABC Ltda",
      saldo: 285000.00,
      status: "Ativa"
    },
    {
      id: 2,
      banco: "Caixa Econômica Federal",
      agencia: "9876-5", 
      conta: "54321-0",
      tipo: "Poupança",
      titular: "Empresa ABC Ltda",
      saldo: 125000.00,
      status: "Ativa"
    },
    {
      id: 3,
      banco: "Itaú Unibanco",
      agencia: "5555-5",
      conta: "11111-1", 
      tipo: "Corrente",
      titular: "Empresa ABC Ltda",
      saldo: 95000.00,
      status: "Inativa"
    }
  ];

  const cartoesCorporativos = [
    {
      id: 1,
      banco: "Banco do Brasil",
      numero: "****1234",
      titular: "João Silva",
      limite: 15000.00,
      usado: 3500.00,
      vencimento: "15",
      status: "Ativo"
    },
    {
      id: 2,
      banco: "Itaú",
      numero: "****5678", 
      titular: "Maria Santos",
      limite: 10000.00,
      usado: 1200.00,
      vencimento: "20",
      status: "Ativo"
    },
    {
      id: 3,
      banco: "Santander",
      numero: "****9012",
      titular: "Carlos Oliveira", 
      limite: 8000.00,
      usado: 5500.00,
      vencimento: "05",
      status: "Bloqueado"
    }
  ];

  const categoriasDespesas = [
    { id: 1, nome: "Material de Escritório", codigo: "MAT-ESC", tipo: "Operacional", status: "Ativa" },
    { id: 2, nome: "Viagens e Hospedagem", codigo: "VIA-HOS", tipo: "Comercial", status: "Ativa" },
    { id: 3, nome: "Equipamentos TI", codigo: "EQP-TI", tipo: "Investimento", status: "Ativa" },
    { id: 4, nome: "Marketing e Publicidade", codigo: "MKT-PUB", tipo: "Comercial", status: "Inativa" },
    { id: 5, nome: "Consultoria Jurídica", codigo: "CON-JUR", tipo: "Serviços", status: "Ativa" },
    { id: 6, nome: "Energia Elétrica", codigo: "ENE-ELE", tipo: "Utilidade", status: "Ativa" }
  ];

  const fornecedores = [
    {
      id: 1,
      nome: "Fornecedor ABC Ltda",
      cnpj: "12.345.678/0001-90",
      categoria: "Material Escritório",
      contato: "João Silva",
      telefone: "(11) 99999-9999",
      email: "contato@fornecedorabc.com",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Tech Solutions S.A.",
      cnpj: "98.765.432/0001-12", 
      categoria: "Equipamentos TI",
      contato: "Maria Santos",
      telefone: "(11) 88888-8888",
      email: "vendas@techsolutions.com",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Energy Corp",
      cnpj: "11.222.333/0001-44",
      categoria: "Utilidades",
      contato: "Carlos Energy",
      telefone: "(11) 77777-7777", 
      email: "faturas@energycorp.com",
      status: "Inativo"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
      case 'Ativa': 
        return 'bg-green-500 text-white';
      case 'Inativo':
      case 'Inativa':
        return 'bg-gray-500 text-white';
      case 'Bloqueado':
        return 'bg-red-500 text-white';
      default: 
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Cadastros Financeiros</h2>
          <p className="text-muted-foreground">Gestão de contas, cartões, categorias e fornecedores</p>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contas Bancárias</p>
                <p className="text-2xl font-bold text-blue-600">{contasBancarias.filter(c => c.status === 'Ativa').length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cartões Ativos</p>
                <p className="text-2xl font-bold text-green-600">{cartoesCorporativos.filter(c => c.status === 'Ativo').length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categorias</p>
                <p className="text-2xl font-bold text-purple-600">{categoriasDespesas.filter(c => c.status === 'Ativa').length}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fornecedores</p>
                <p className="text-2xl font-bold text-orange-600">{fornecedores.filter(f => f.status === 'Ativo').length}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas dos Cadastros */}
      <Tabs defaultValue="contas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contas">Contas Bancárias</TabsTrigger>
          <TabsTrigger value="cartoes">Cartões</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
        </TabsList>

        <TabsContent value="contas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Contas Bancárias
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Conta
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pesquisar por banco ou titular..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banco</TableHead>
                    <TableHead>Agência/Conta</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Titular</TableHead>
                    <TableHead>Saldo Atual</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasBancarias.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.banco}</TableCell>
                      <TableCell>{conta.agencia} / {conta.conta}</TableCell>
                      <TableCell>{conta.tipo}</TableCell>
                      <TableCell>{conta.titular}</TableCell>
                      <TableCell className="text-right">{formatCurrency(conta.saldo)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(conta.status)}>
                          {conta.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cartoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Cartões Corporativos
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cartão
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banco</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Titular</TableHead>
                    <TableHead>Limite</TableHead>
                    <TableHead>Usado</TableHead>
                    <TableHead>Disponível</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartoesCorporativos.map((cartao) => (
                    <TableRow key={cartao.id}>
                      <TableCell className="font-medium">{cartao.banco}</TableCell>
                      <TableCell>{cartao.numero}</TableCell>
                      <TableCell>{cartao.titular}</TableCell>
                      <TableCell>{formatCurrency(cartao.limite)}</TableCell>
                      <TableCell className="text-red-600">{formatCurrency(cartao.usado)}</TableCell>
                      <TableCell className="text-green-600">{formatCurrency(cartao.limite - cartao.usado)}</TableCell>
                      <TableCell>Dia {cartao.vencimento}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(cartao.status)}>
                          {cartao.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categorias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Categorias de Despesas
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Categoria
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoriasDespesas.map((categoria) => (
                    <TableRow key={categoria.id}>
                      <TableCell className="font-medium">{categoria.nome}</TableCell>
                      <TableCell>{categoria.codigo}</TableCell>
                      <TableCell>{categoria.tipo}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(categoria.status)}>
                          {categoria.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fornecedores" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Fornecedores
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome/Razão Social</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id}>
                      <TableCell className="font-medium">{fornecedor.nome}</TableCell>
                      <TableCell>{fornecedor.cnpj}</TableCell>
                      <TableCell>{fornecedor.categoria}</TableCell>
                      <TableCell>{fornecedor.contato}</TableCell>
                      <TableCell>{fornecedor.telefone}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(fornecedor.status)}>
                          {fornecedor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CadastrosFinanceirosView;