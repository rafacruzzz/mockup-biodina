import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SidebarLayout from "@/components/SidebarLayout";
import ProductForm from "@/components/ProductForm";
import { 
  Plus, Search, Edit, Trash2, Users, Package, Settings, 
  Building, Tag, Clock, CreditCard, Mail, FileText, ChevronDown, ChevronRight,
  Filter, Download, Upload, MoreHorizontal
} from "lucide-react";

const Cadastro = () => {
  const [activeModule, setActiveModule] = useState('produtos');
  const [activeSubModule, setActiveSubModule] = useState('produtos');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>(['produtos']);
  const [showProductForm, setShowProductForm] = useState(false);

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
        fontes: { 
          name: 'Fontes dos Leads', 
          data: [
            { id: 1, nome: 'Website Corporativo', tipo: 'Digital', conversao: '3.2%', leads: 156, custo: 'R$ 2.450', ativo: true },
            { id: 2, nome: 'Facebook Ads', tipo: 'Redes Sociais', conversao: '2.8%', leads: 89, custo: 'R$ 3.200', ativo: true },
            { id: 3, nome: 'Google Ads', tipo: 'Search', conversao: '4.1%', leads: 203, custo: 'R$ 5.800', ativo: true },
            { id: 4, nome: 'Indicação de Clientes', tipo: 'Orgânico', conversao: '8.5%', leads: 45, custo: 'R$ 0', ativo: true },
          ]
        },
        segmentos: { 
          name: 'Segmentos dos Leads', 
          data: [
            { id: 1, segmento: 'Empresas de Grande Porte', descricao: 'Acima de 500 funcionários', leads: 67, ticketMedio: 'R$ 45.000', conversao: '12%' },
            { id: 2, segmento: 'Médias Empresas', descricao: 'Entre 100-500 funcionários', leads: 134, ticketMedio: 'R$ 18.500', conversao: '8%' },
            { id: 3, segmento: 'Pequenas Empresas', descricao: 'Entre 20-100 funcionários', leads: 298, ticketMedio: 'R$ 8.200', conversao: '5%' },
            { id: 4, segmento: 'Startups', descricao: 'Até 20 funcionários', leads: 156, ticketMedio: 'R$ 3.500', conversao: '6%' },
          ]
        }
      }
    },
    produtos: {
      name: 'Produtos',
      icon: Package,
      subModules: {
        produtos: { 
          name: 'Produtos', 
          data: [
            { 
              id: 1, 
              nome: 'Sistema de Gestão ERP Pro', 
              codigo: 'ERP001', 
              valorVenda: 2500.00, 
              precoCusto: 1200.00, 
              estoque: 150, 
              estoqueDisponivel: 142,
              marca: 'Biodina Tech',
              categoria: 'Software',
              ativo: true 
            },
            { 
              id: 2, 
              nome: 'Módulo CRM Advanced', 
              codigo: 'CRM002', 
              valorVenda: 1800.00, 
              precoCusto: 850.00, 
              estoque: 89, 
              estoqueDisponivel: 85,
              marca: 'Biodina Tech',
              categoria: 'Software',
              ativo: true 
            },
            { 
              id: 3, 
              nome: 'Dashboard Analytics', 
              codigo: 'DAS003', 
              valorVenda: 950.00, 
              precoCusto: 450.00, 
              estoque: 67, 
              estoqueDisponivel: 67,
              marca: 'Biodina Analytics',
              categoria: 'Software',
              ativo: false 
            },
          ]
        },
        kits: { 
          name: 'Kits', 
          data: [
            { id: 1, nome: 'Kit Empresarial Básico', codigo: 'KIT001', produtos: 3, valorTotal: 4200.00, margem: '45%', ativo: true },
            { id: 2, nome: 'Kit Premium Completo', codigo: 'KIT002', produtos: 7, valorTotal: 8900.00, margem: '52%', ativo: true },
            { id: 3, nome: 'Kit Startup', codigo: 'KIT003', produtos: 2, valorTotal: 1800.00, margem: '38%', ativo: true },
          ]
        },
        precos: { 
          name: 'Tabela de Preços', 
          data: [
            { id: 1, nome: 'Tabela Varejo Nacional', tipo: 'Padrão', desconto: '0%', produtos: 245, vigencia: '01/01/2024 - 31/12/2024', ativa: true },
            { id: 2, nome: 'Tabela Atacado', tipo: 'Desconto 15%', desconto: '15%', produtos: 198, vigencia: '01/01/2024 - 31/12/2024', ativa: true },
            { id: 3, nome: 'Tabela Parceiros', tipo: 'Desconto 25%', desconto: '25%', produtos: 156, vigencia: '01/01/2024 - 31/12/2024', ativa: true },
          ]
        },
        locais: { 
          name: 'Locais de Estoque', 
          data: [
            { id: 1, codigo: 'EST001', descricao: 'Estoque Principal - Matriz', tipo: 'Físico', endereco: 'Galpão A - Setor Industrial', responsavel: 'João Silva', ativo: true },
            { id: 2, codigo: 'EST002', descricao: 'Estoque Filial SP', tipo: 'Físico', endereco: 'Galpão B - Vila Olimpia', responsavel: 'Maria Santos', ativo: true },
            { id: 3, codigo: 'EST003', descricao: 'Estoque Virtual - Produtos Digitais', tipo: 'Virtual', endereco: 'Cloud Storage', responsavel: 'Sistema Automático', ativo: true },
          ]
        },
        movimentacao: { 
          name: 'Movimentação de Estoque', 
          data: [
            { id: 1, codigo: 'MOV001', tipo: 'Entrada', produto: 'Sistema ERP Pro', quantidade: 25, data: '15/01/2024', origem: 'Fornecedor Tech', destino: 'EST001' },
            { id: 2, codigo: 'MOV002', tipo: 'Saída', produto: 'Módulo CRM', quantidade: 8, data: '14/01/2024', origem: 'EST001', destino: 'Cliente ABC' },
            { id: 3, codigo: 'MOV003', tipo: 'Transferência', produto: 'Dashboard Analytics', quantidade: 12, data: '13/01/2024', origem: 'EST001', destino: 'EST002' },
          ]
        },
        rastreio: { 
          name: 'Rastreio de Lotes/Séries', 
          data: [
            { id: 1, codigo: 'LT001', produto: 'Sistema ERP Pro', lote: 'LT20240115', quantidade: 25, validade: '15/01/2026', nfe: 'NFe 12345', status: 'Ativo' },
            { id: 2, codigo: 'LT002', produto: 'Módulo CRM', lote: 'LT20240110', quantidade: 30, validade: '10/01/2026', nfe: 'NFe 12346', status: 'Ativo' },
            { id: 3, codigo: 'LT003', produto: 'Dashboard Analytics', lote: 'LT20240105', quantidade: 15, validade: '05/01/2026', nfe: 'NFe 12347', status: 'Vencido' },
          ]
        },
        marcas: { 
          name: 'Marcas', 
          data: [
            { id: 1, nome: 'Biodina Tech', produtos: 156, categoria: 'Software', pais: 'Brasil', ativa: true },
            { id: 2, nome: 'Biodina Analytics', produtos: 89, categoria: 'Business Intelligence', pais: 'Brasil', ativa: true },
            { id: 3, nome: 'Biodina Cloud', produtos: 67, categoria: 'Cloud Computing', pais: 'Brasil', ativa: true },
          ]
        },
        familias: { 
          name: 'Famílias de Produtos', 
          data: [
            { id: 1, nome: 'Sistemas de Gestão', descricao: 'ERPs e sistemas administrativos', produtos: 45, categoria: 'Software', ativa: true },
            { id: 2, nome: 'Business Intelligence', descricao: 'Dashboards e relatórios', produtos: 28, categoria: 'Analytics', ativa: true },
            { id: 3, nome: 'CRM e Vendas', descricao: 'Gestão de relacionamento', produtos: 34, categoria: 'Software', ativa: true },
          ]
        },
        grupos: { 
          name: 'Grupos de Produtos', 
          data: [
            { id: 1, nome: 'ERP Empresarial', familia: 'Sistemas de Gestão', produtos: 23, descricao: 'ERPs para grandes empresas' },
            { id: 2, nome: 'ERP PME', familia: 'Sistemas de Gestão', produtos: 22, descricao: 'ERPs para pequenas e médias empresas' },
            { id: 3, nome: 'Dashboards Executivos', familia: 'Business Intelligence', produtos: 15, descricao: 'Painéis para alta gestão' },
          ]
        },
        subgrupos: { 
          name: 'Subgrupos de Produtos', 
          data: [
            { id: 1, nome: 'ERP Financeiro', grupo: 'ERP Empresarial', produtos: 12, descricao: 'Módulos financeiros avançados' },
            { id: 2, nome: 'ERP Comercial', grupo: 'ERP Empresarial', produtos: 11, descricao: 'Módulos de vendas e CRM' },
            { id: 3, nome: 'ERP Estoque', grupo: 'ERP PME', produtos: 9, descricao: 'Controle de estoque simplificado' },
          ]
        }
      }
    },
    servicos: {
      name: 'Serviços',
      icon: Settings,
      subModules: {
        categorias: { 
          name: 'Categorias de Serviços', 
          data: [
            { id: 1, categoria: 'Consultoria Estratégica', descricao: 'Consultoria em gestão e processos', servicos: 15, valorMedio: 'R$ 2.500/dia', ativa: true },
            { id: 2, categoria: 'Suporte Técnico', descricao: 'Suporte e manutenção de sistemas', servicos: 23, valorMedio: 'R$ 150/hora', ativa: true },
            { id: 3, categoria: 'Treinamento', descricao: 'Capacitação de usuários', servicos: 12, valorMedio: 'R$ 800/dia', ativa: true },
          ]
        },
        unidades: { 
          name: 'Unidades de Serviços', 
          data: [
            { id: 1, codigo: 'HORA', nome: 'Hora', descricao: 'Cobrança por hora trabalhada', sigla: 'h', ativa: true },
            { id: 2, codigo: 'DIA', nome: 'Dia', descricao: 'Cobrança por dia de trabalho', sigla: 'd', ativa: true },
            { id: 3, codigo: 'PROJ', nome: 'Projeto', descricao: 'Cobrança por projeto completo', sigla: 'proj', ativa: true },
          ]
        }
      }
    },
    usuarios: {
      name: 'Usuários',
      icon: Users,
      subModules: {
        lista: { 
          name: 'Lista de Usuários', 
          data: [
            { 
              id: 1, 
              nomeUsuario: 'admin.silva', 
              email: 'joao.silva@biodina.com.br', 
              perfil: 'Administrador', 
              departamento: 'TI',
              ultimoAcesso: '15/01/2024 14:30',
              ipUltimoAcesso: '192.168.1.10',
              idadeSenha: '45 dias',
              status: 'Ativo',
              ativo: true 
            },
            { 
              id: 2, 
              nomeUsuario: 'maria.santos', 
              email: 'maria.santos@biodina.com.br', 
              perfil: 'Gerente Comercial', 
              departamento: 'Comercial',
              ultimoAcesso: '15/01/2024 09:15',
              ipUltimoAcesso: '192.168.1.25',
              idadeSenha: '23 dias',
              status: 'Ativo',
              ativo: true 
            },
            { 
              id: 3, 
              nomeUsuario: 'carlos.lima', 
              email: 'carlos.lima@biodina.com.br', 
              perfil: 'Analista Financeiro', 
              departamento: 'Financeiro',
              ultimoAcesso: '12/01/2024 16:45',
              ipUltimoAcesso: '192.168.1.33',
              idadeSenha: '89 dias',
              status: 'Bloqueado',
              ativo: false 
            },
          ]
        }
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
    if (data.length === 0) return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhum registro encontrado</p>
        <p className="text-gray-400 text-sm">Clique em "Novo Registro" para começar</p>
      </div>
    );

    const headers = Object.keys(data[0]).filter(key => key !== 'id');

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              {headers.map(header => (
                <TableHead key={header} className="font-semibold text-gray-700 py-4">
                  {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
                </TableHead>
              ))}
              <TableHead className="w-24 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                {headers.map(header => (
                  <TableCell key={header} className="py-4">
                    {typeof item[header] === 'boolean' ? (
                      <Badge className={`${item[header] ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'} px-2 py-1`}>
                        {item[header] ? 'Sim' : 'Não'}
                      </Badge>
                    ) : typeof item[header] === 'number' && (header.includes('valor') || header.includes('preco') || header.includes('custo')) ? (
                      <span className="font-medium text-biodina-blue">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[header])}
                      </span>
                    ) : header === 'status' || header === 'categoria' || header === 'tipo' ? (
                      <Badge variant="outline" className="border-biodina-gold/30 text-biodina-blue">
                        {item[header]}
                      </Badge>
                    ) : (
                      <span className="text-gray-700">{item[header]}</span>
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <div className="flex justify-center gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-biodina-gold/10">
                      <Edit className="h-4 w-4 text-biodina-gold" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-50">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const handleNewRecord = () => {
    if (activeModule === 'produtos' && activeSubModule === 'produtos') {
      setShowProductForm(true);
    } else {
      console.log(`Criar novo registro para ${activeModule} - ${activeSubModule}`);
    }
  };

  return (
    <SidebarLayout>
      <div className="flex h-full bg-gray-50/50">
        {/* Modern Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200/80 overflow-y-auto shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-biodina-blue mb-2">Cadastros</h2>
            <p className="text-gray-600 text-sm">Gerencie todos os cadastros do sistema</p>
          </div>
          
          <div className="p-4 space-y-2">
            {Object.entries(modules).map(([key, module]) => (
              <div key={key} className="space-y-1">
                <button
                  onClick={() => toggleModule(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    activeModule === key 
                      ? 'bg-gradient-to-r from-biodina-blue to-biodina-lightblue text-white shadow-md' 
                      : 'hover:bg-gray-50 text-gray-700 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      activeModule === key ? 'bg-white/20' : 'bg-biodina-gold/10'
                    }`}>
                      <module.icon className={`h-5 w-5 ${
                        activeModule === key ? 'text-white' : 'text-biodina-gold'
                      }`} />
                    </div>
                    <span className="font-medium">{module.name}</span>
                  </div>
                  {expandedModules.includes(key) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </button>
                
                {expandedModules.includes(key) && (
                  <div className="ml-4 space-y-1 animate-slide-in-left">
                    {Object.entries(module.subModules).map(([subKey, subModule]) => (
                      <button
                        key={subKey}
                        onClick={() => {
                          setActiveModule(key);
                          setActiveSubModule(subKey);
                        }}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                          activeModule === key && activeSubModule === subKey
                            ? 'bg-biodina-gold text-white shadow-sm'
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            activeModule === key && activeSubModule === subKey
                              ? 'bg-white'
                              : 'bg-biodina-gold/60'
                          }`} />
                          {subModule.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modern Main Content */}
        <div className="flex-1">
          {activeSubModule ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-white border-b border-gray-200/80 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-biodina-blue mb-2">
                      {modules[activeModule as keyof typeof modules]?.subModules[activeSubModule]?.name}
                    </h1>
                    <p className="text-gray-600">
                      Gerencie os registros de {modules[activeModule as keyof typeof modules]?.subModules[activeSubModule]?.name.toLowerCase()}
                    </p>
                  </div>
                  <Button 
                    onClick={handleNewRecord}
                    className="bg-gradient-to-r from-biodina-gold to-biodina-gold/90 hover:from-biodina-gold/90 hover:to-biodina-gold text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Registro
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Pesquisar registros..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-biodina-gold rounded-xl"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-auto">
                {renderTable(activeModule, activeSubModule)}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-biodina-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="h-12 w-12 text-biodina-gold" />
                </div>
                <h2 className="text-2xl font-bold text-biodina-blue mb-3">Selecione um módulo</h2>
                <p className="text-gray-600 mb-6">Escolha um módulo no menu lateral para começar a gerenciar seus cadastros</p>
                <Button 
                  onClick={() => {
                    setActiveModule('produtos');
                    setActiveSubModule('produtos');
                    setExpandedModules(['produtos']);
                  }}
                  className="bg-biodina-gold hover:bg-biodina-gold/90 text-white"
                >
                  Começar com Produtos
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm onClose={() => setShowProductForm(false)} />
      )}
    </SidebarLayout>
  );
};

export default Cadastro;
