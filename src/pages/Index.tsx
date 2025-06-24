import { Link } from "react-router-dom";
import { ShoppingCart, Users, TrendingUp, DollarSign, FileText, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const modules = [
    {
      title: "Cadastro",
      description: "Gerencie produtos, clientes, fornecedores e usuários",
      icon: Users,
      href: "/cadastro",
      color: "bg-blue-500"
    },
    {
      title: "Comercial",
      description: "Controle vendas, propostas e oportunidades",
      icon: TrendingUp,
      href: "/comercial",
      color: "bg-green-500"
    },
    {
      title: "Compras",
      description: "Gerencie pedidos, compras fiscais e importações",
      icon: Package,
      href: "/compras",
      color: "bg-purple-500"
    },
    {
      title: "Financeiro",
      description: "Controle financeiro e análise de resultados",
      icon: DollarSign,
      href: "/financeiro",
      color: "bg-yellow-500"
    },
    {
      title: "BI Geral",
      description: "Dashboards e relatórios gerenciais",
      icon: FileText,
      href: "/bi-geral",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Gestão
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acesse os módulos do sistema para gerenciar sua empresa de forma integrada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.title} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${module.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild className="w-full">
                    <Link to={module.href}>
                      Acessar Módulo
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
