
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  Plus, Search, Edit, Trash2, Users, Package, Settings, 
  Building, Tag, Clock, CreditCard, Mail, FileText, ChevronDown, ChevronRight 
} from "lucide-react";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('leads');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>(['leads']);

  const toggleModule = (module: string) => {
    if (expandedModules.includes(module)) {
      setExpandedModules(expandedModules.filter(m => m !== module));
    } else {
      setExpandedModules([...expandedModules, module]);
    }
  };

  const modules = {
    leads: {
      name: 'Leads',
      icon: Users,
      subModules: {
        fontes: { name: 'Fontes dos Leads', data: [
          { id: 1, nome: 'Website', tipo: 'Digital', ativo: true, leads: 45 },
          { id: 2, nome: 'Facebook Ads', tipo: 'Redes Sociais', ativo: true, leads: 32 },
          { id: 3, nome: 'Indicação', tipo: 'Orgânico', ativo: true, leads: 28 },
        ]},
        segmentos: { name: 'Segmentos dos Leads', data: [
          { id: 1, segmento: 'Empresas de Grande Porte', descricao: 'Acima de 500 funcionários', leads: 12 },
          { id: 2, segmento: 'PMEs', descricao: 'Entre 50-500 funcionários', leads: 67 },
          { id: 3, segmento: 'Startups', descricao: 'Até 50 funcionários', leads: 26 },
        ]}
      }
    },
    produtos: {
      name: 'Produtos',
      icon: Package,
      subModules: {
        produtos: { name: 'Produtos', data: [
          { id: 1, nome: 'Produto A', codigo: 'PRD001', preco: 150.00, estoque: 100, ativo: true },
          { id: 2, nome: 'Produto B', codigo: 'PRD002', preco: 250.00, estoque: 75, ativo: true },
          { id: 3, nome: 'Produto C', codigo: 'PRD003', preco: 350.00, estoque: 50, ativo: false },
        ]},
        kits: { name: 'Kits', data: [
          { id: 1, nome: 'Kit Básico', produtos: 3, preco: 450.00, ativo: true },
          { id: 2, nome: 'Kit Premium', produtos: 5, preco: 750.00, ativo: true },
        ]},
        precos: { name: 'Tabela de Preço', data: [
          { id: 1, nome: 'Tabela Varejo', tipo: 'Padrão', ativa: true, produtos: 125 },
          { id: 2, nome: 'Tabela Atacado', tipo: 'Desconto 15%', ativa: true, produtos: 98 },
        ]},
        locais: { name: 'Locais de Estoque', data: [
          { id: 1, nome: 'Estoque Principal', endereco: 'Galpão A', capacidade: '1000m²' },
          { id: 2, nome: 'Estoque Filial', endereco: 'Galpão B', capacidade: '500m²' },
        ]},
        movimentacao: { name: 'Movimentação de Estoque', data: [
          { id: 1, produto: 'Produto A', tipo: 'Entrada', quantidade: 50, data: '2024-01-15' },
          { id: 2, produto: 'Produto B', tipo: 'Saída', quantidade: 25, data: '2024-01-14' },
        ]},
        rastreio: { name: 'Rastreio de Lotes ou Séries', data: [
          { id: 1, lote: 'LT001', produto: 'Produto A', validade: '2025-06-30', quantidade: 100 },
          { id: 2, lote: 'LT002', produto: 'Produto B', validade: '2025-08-15', quantidade: 75 },
        ]},
        marcas: { name: 'Marcas', data: [
          { id: 1, nome: 'Marca A', produtos: 45, ativa: true },
          { id: 2, nome: 'Marca B', produtos: 32, ativa: true },
        ]},
        familias: { name: 'Famílias de Produtos', data: [
          { id: 1, nome: 'Eletrônicos', produtos: 67, ativa: true },
          { id: 2, nome: 'Móveis', produtos: 23, ativa: true },
        ]},
        grupos: { name: 'Grupo de Produtos', data: [
          { id: 1, nome: 'Grupo A', familia: 'Eletrônicos', produtos: 35 },
          { id: 2, nome: 'Grupo B', familia: 'Móveis', produtos: 15 },
        ]},
        subgrupos: { name: 'Subgrupos de Produtos', data: [
          { id: 1, nome: 'Subgrupo A1', grupo: 'Grupo A', produtos: 18 },
          { id: 2, nome: 'Subgrupo A2', grupo: 'Grupo A', produtos: 17 },
        ]}
      }
    },
    servicos: {
      name: 'Serviços',
      icon: Settings,
      subModules: {
        categorias: { name: 'Categoria de Serviços', data: [
          { id: 1, categoria: 'Consultoria', servicos: 12, ativa: true },
          { id: 2, categoria: 'Suporte Técnico', servicos: 8, ativa: true },
        ]},
        unidades: { name: 'Unidade de Serviços', data: [
          { id: 1, unidade: 'Hora', sigla: 'h', ativa: true },
          { id: 2, unidade: 'Projeto', sigla: 'proj', ativa: true },
        ]}
      }
    },
    usuarios: {
      name: 'Usuários',
      icon: Users,
      subModules: {
        lista: { name: 'Lista de Usuários', data: [
          { id: 1, nome: 'João Silva', email: 'joao@empresa.com', perfil: 'Admin', ativo: true },
          { id: 2, nome: 'Maria Santos', email: 'maria@empresa.com', perfil: 'Usuário', ativo: true },
        ]}
      }
    },
    camposPersonalizados: {
      name: 'Campos Personalizados',
      icon: Tag,
      subModules: {
        lista: { name: 'Campos Personalizados', data: [
          { id: 1, nome: 'Observações', tipo: 'Texto', obrigatorio: false, ativo: true },
          { id: 2, nome: 'Prioridade', tipo: 'Lista', obrigatorio: true, ativo: true },
        ]}
      }
    },
    camposObrigatorios: {
      name: 'Campos Obrigatórios',
      icon: FileText,
      subModules: {
        lista: { name: 'Campos Obrigatórios', data: [
          { id: 1, campo: 'Nome', modulo: 'Clientes', obrigatorio: true },
          { id: 2, campo: 'E-mail', modulo: 'Leads', obrigatorio: true },
        ]}
      }
    },
    departamentos: {
      name: 'Departamentos',
      icon: Building,
      subModules: {
        lista: { name: 'Departamentos', data: [
          { id: 1, nome: 'Vendas', responsavel: 'João Silva', funcionarios: 12 },
          { id: 2, nome: 'Financeiro', responsavel: 'Maria Santos', funcionarios: 8 },
        ]}
      }
    },
    caracteristicas: {
      name: 'Características',
      icon: Tag,
      subModules: {
        lista: { name: 'Características', data: [
          { id: 1, nome: 'Cor', tipo: 'Lista', valores: 'Azul,Verde,Vermelho' },
          { id: 2, nome: 'Tamanho', tipo: 'Lista', valores: 'P,M,G,GG' },
        ]}
      }
    },
    recorrencia: {
      name: 'Recorrência',
      icon: Clock,
      subModules: {
        lista: { name: 'Recorrência', data: [
          { id: 1, nome: 'Mensal', dias: 30, ativo: true },
          { id: 2, nome: 'Semanal', dias: 7, ativo: true },
        ]}
      }
    },
    contasBancarias: {
      name: 'Contas Bancárias',
      icon: CreditCard,
      subModules: {
        lista: { name: 'Contas Bancárias', data: [
          { id: 1, banco: 'Banco do Brasil', agencia: '1234-5', conta: '67890-1', tipo: 'Corrente' },
          { id: 2, banco: 'Caixa Econômica', agencia: '9876-5', conta: '54321-0', tipo: 'Poupança' },
        ]}
      }
    },
    categorias: {
      name: 'Categorias',
      icon: Tag,
      subModules: {
        lista: { name: 'Categorias', data: [
          { id: 1, nome: 'Receita', tipo: 'Financeira', ativa: true },
          { id: 2, nome: 'Despesa', tipo: 'Financeira', ativa: true },
        ]}
      }
    },
    prazosPagamento: {
      name: 'Prazos de Pagamento',
      icon: Clock,
      subModules: {
        lista: { name: 'Prazos de Pagamento', data: [
          { id: 1, nome: 'À Vista', dias: 0, desconto: 5 },
          { id: 2, nome: '30 dias', dias: 30, desconto: 0 },
        ]}
      }
    },
    modelosEmails: {
      name: 'Modelos de E-mails',
      icon: Mail,
      subModules: {
        lista: { name: 'Modelos de E-mails', data: [
          { id: 1, nome: 'Boas-vindas', assunto: 'Bem-vindo!', ativo: true },
          { id: 2, nome: 'Cobrança', assunto: 'Fatura em atraso', ativo: true },
        ]}
      }
    },
    modelosFormularios: {
      name: 'Modelos de Formulários',
      icon: FileText,
      subModules: {
        lista: { name: 'Modelos de Formulários', data: [
          { id: 1, nome: 'Cadastro Cliente', campos: 8, ativo: true },
          { id: 2, nome: 'Pesquisa Satisfação', campos: 12, ativo: true },
        ]}
      }
    }
  };

  const renderTable = (moduleKey: string, subModuleKey: string) => {
    const subModule = modules[moduleKey as keyof typeof modules]?.subModules[subModuleKey];
    if (!subModule || !subModule.data) return null;

    const data = subModule.data;
    if (data.length === 0) return <p className="text-gray-500 text-center py-8">Nenhum registro encontrado</p>;

    const headers = Object.keys(data[0]).filter(key => key !== 'id');

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map(header => (
              <TableHead key={header} className="font-semibold">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </TableHead>
            ))}
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              {headers.map(header => (
                <TableCell key={header}>
                  {typeof item[header] === 'boolean' ? (
                    <Badge className={item[header] ? 'bg-green-500' : 'bg-red-500'}>
                      {item[header] ? 'Sim' : 'Não'}
                    </Badge>
                  ) : typeof item[header] === 'number' && header === 'preco' ? (
                    `R$ ${item[header].toFixed(2)}`
                  ) : (
                    item[header]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <SidebarLayout>
      <div className="flex h-full">
        {/* Menu lateral do módulo */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-biodina-blue mb-6">Cadastros</h2>
          
          <div className="space-y-2">
            {Object.entries(modules).map(([key, module]) => (
              <div key={key}>
                <button
                  onClick={() => toggleModule(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeModule === key ? 'bg-biodina-blue text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <module.icon className="h-5 w-5" />
                    <span className="font-medium">{module.name}</span>
                  </div>
                  {expandedModules.includes(key) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                
                {expandedModules.includes(key) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {Object.entries(module.subModules).map(([subKey, subModule]) => (
                      <button
                        key={subKey}
                        onClick={() => {
                          setActiveModule(key);
                          setActiveSubModule(subKey);
                        }}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          activeModule === key && activeSubModule === subKey
                            ? 'bg-biodina-gold text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {subModule.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-6 bg-gray-50">
          {activeSubModule ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-biodina-blue">
                    {modules[activeModule as keyof typeof modules]?.subModules[activeSubModule]?.name}
                  </h1>
                  <p className="text-gray-600">
                    Gerencie os registros de {modules[activeModule as keyof typeof modules]?.subModules[activeSubModule]?.name.toLowerCase()}
                  </p>
                </div>
                <Button className="bg-biodina-gold hover:bg-biodina-gold/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Registro
                </Button>
              </div>

              <Card className="shadow-lg">
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>Registros</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {renderTable(activeModule, activeSubModule)}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Selecione um módulo</h2>
                <p className="text-gray-500">Escolha um módulo no menu lateral para começar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Cadastro;
